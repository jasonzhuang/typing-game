import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameMode, Character, Difficulty } from '../types';
import { getWordsForDifficulty } from '../data/words';
import KeyboardGuide from './KeyboardGuide';
import './GameScreen.css';

interface Props {
  mode: GameMode;
  onGameEnd: (result: {
    score: number;
    accuracy: number;
    wpm: number;
    totalChars: number;
    correctChars: number;
    wrongChars: number;
    difficulty: Difficulty;
  }) => void;
  onBack: () => void;
}

const WORDS_PER_ROUND = 10;

export default function GameScreen({ mode, onGameEnd, onBack }: Props) {
  const [currentWord, setCurrentWord] = useState('');
  const [currentMeaning, setCurrentMeaning] = useState('');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalWrong, setTotalWrong] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const wordListRef = useRef(getWordsForDifficulty(mode.id));

  // 获取随机单词
  const getRandomWord = useCallback(() => {
    const words = wordListRef.current;
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }, []);

  // 初始化新单词
  const initWord = useCallback(() => {
    const wordItem = getRandomWord();
    setCurrentWord(wordItem.word);
    setCurrentMeaning(wordItem.meaning || '');
    setCharacters(wordItem.word.split('').map(char => ({
      char,
      status: 'pending'
    })));
    setCurrentIndex(0);
    
    // 设置第一个字符为当前
    setCharacters(chars => 
      chars.map((c, i) => ({
        ...c,
        status: i === 0 ? 'current' : 'pending'
      }))
    );
  }, [getRandomWord]);

  // 初始化游戏
  useEffect(() => {
    initWord();
    inputRef.current?.focus();
    setStartTime(Date.now());
  }, [initWord]);

  // 保持输入框焦点
  useEffect(() => {
    const handleClick = () => {
      if (!isPaused) {
        inputRef.current?.focus();
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isPaused]);

  // 处理按键
  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isPaused) return;
    
    const key = e.key;
    
    // 忽略特殊键
    if (key === 'Shift' || key === 'Control' || key === 'Alt' || key === 'Meta') {
      return;
    }

    const expectedChar = characters[currentIndex]?.char;
    
    if (!expectedChar) return;

    if (key === expectedChar) {
      // 正确输入
      setTotalCorrect(prev => prev + 1);
      setCombo(prev => prev + 1);
      setMaxCombo(prev => Math.max(prev, combo + 1));
      
      setCharacters(chars => 
        chars.map((c, i) => {
          if (i === currentIndex) return { ...c, status: 'correct' };
          if (i === currentIndex + 1) return { ...c, status: 'current' };
          return c;
        })
      );

      // 检查是否完成当前单词
      if (currentIndex === characters.length - 1) {
        // 单词完成
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 500);
        
        const newWordsCompleted = wordsCompleted + 1;
        setWordsCompleted(newWordsCompleted);

        // 检查是否完成一轮
        if (newWordsCompleted >= WORDS_PER_ROUND) {
          // 游戏结束
          const endTime = Date.now();
          const duration = (endTime - (startTime || endTime)) / 1000 / 60; // 分钟
          const totalChars = totalCorrect + totalWrong + 1;
          const wpm = Math.round((totalCorrect + 1) / 5 / Math.max(duration, 0.1));
          const accuracy = Math.round(((totalCorrect + 1) / totalChars) * 100);
          
          onGameEnd({
            score: Math.round(accuracy * (1 + maxCombo / 20)),
            accuracy,
            wpm,
            totalChars,
            correctChars: totalCorrect + 1,
            wrongChars: totalWrong,
            difficulty: mode.id,
          });
        } else {
          // 加载下一个单词
          setTimeout(initWord, 300);
        }
      } else {
        setCurrentIndex(prev => prev + 1);
      }
    } else {
      // 错误输入
      setTotalWrong(prev => prev + 1);
      setCombo(0);
      setShowError(true);
      setTimeout(() => setShowError(false), 300);
      
      setCharacters(chars =>
        chars.map((c, i) => {
          if (i === currentIndex) return { ...c, status: 'wrong' };
          return c;
        })
      );

      // 短暂显示错误后恢复
      setTimeout(() => {
        setCharacters(chars =>
          chars.map((c, i) => {
            if (i === currentIndex) return { ...c, status: 'current' };
            return c;
          })
        );
      }, 200);
    }
  }, [characters, currentIndex, wordsCompleted, startTime, totalCorrect, totalWrong, combo, maxCombo, mode.id, onGameEnd, initWord, isPaused]);

  // 计算当前进度
  const progress = (wordsCompleted / WORDS_PER_ROUND) * 100;
  
  // 计算实时WPM
  const currentWpm = startTime 
    ? Math.round((totalCorrect / 5) / Math.max((Date.now() - startTime) / 1000 / 60, 0.1))
    : 0;
  
  // 计算实时准确率
  const totalAttempts = totalCorrect + totalWrong;
  const currentAccuracy = totalAttempts > 0 
    ? Math.round((totalCorrect / totalAttempts) * 100) 
    : 100;

  return (
    <div className={`game-screen ${showError ? 'shake' : ''}`}>
      {/* 顶部栏 */}
      <div className="game-header">
        <button className="back-btn" onClick={onBack}>
          ← 返回
        </button>
        
        <div className="game-mode-info">
          <span className="mode-icon">{mode.icon}</span>
          <span className="mode-name">{mode.name}</span>
        </div>

        <button 
          className="pause-btn" 
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? '▶️ 继续' : '⏸️ 暂停'}
        </button>
      </div>

      {/* 进度条 */}
      <div className="progress-section">
        <div className="progress-bar">
          <motion.div 
            className="progress-fill"
            style={{ backgroundColor: mode.color }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 100 }}
          />
        </div>
        <span className="progress-text">{wordsCompleted} / {WORDS_PER_ROUND}</span>
      </div>

      {/* 实时统计 */}
      <div className="live-stats">
        <div className="stat">
          <span className="stat-icon">⚡</span>
          <span className="stat-value">{currentWpm}</span>
          <span className="stat-label">WPM</span>
        </div>
        <div className="stat">
          <span className="stat-icon">🎯</span>
          <span className="stat-value">{currentAccuracy}%</span>
          <span className="stat-label">准确率</span>
        </div>
        <div className="stat">
          <span className="stat-icon">🔥</span>
          <span className="stat-value">{combo}</span>
          <span className="stat-label">连击</span>
        </div>
      </div>

      {/* 主游戏区域 */}
      <div className="game-main">
        {isPaused ? (
          <motion.div 
            className="pause-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="pause-content">
              <span className="pause-icon">⏸️</span>
              <h2>游戏暂停</h2>
              <p>点击"继续"按钮继续游戏</p>
            </div>
          </motion.div>
        ) : (
          <>
            {/* 当前单词含义 */}
            {currentMeaning && (
              <motion.div 
                className="word-meaning"
                key={currentWord + '-meaning'}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {currentMeaning}
              </motion.div>
            )}

            {/* 当前要打的单词/字母 */}
            <motion.div 
              className="word-display"
              key={currentWord}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {characters.map((char, index) => (
                <motion.span
                  key={index}
                  className={`char ${char.status}`}
                  animate={
                    char.status === 'correct' 
                      ? { scale: [1, 1.2, 1] }
                      : char.status === 'wrong'
                      ? { x: [-3, 3, -3, 0] }
                      : {}
                  }
                  transition={{ duration: 0.2 }}
                >
                  {char.char}
                </motion.span>
              ))}
            </motion.div>

            {/* 成功动画 */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  className="success-burst"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  ✨
                </motion.div>
              )}
            </AnimatePresence>

            {/* 连击提示 */}
            <AnimatePresence>
              {combo > 0 && combo % 5 === 0 && (
                <motion.div
                  className="combo-notice"
                  initial={{ scale: 0, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  🔥 {combo}连击！
                </motion.div>
              )}
            </AnimatePresence>

            {/* 隐藏的输入框 */}
            <input
              ref={inputRef}
              type="text"
              className="hidden-input"
              onKeyDown={handleKeyPress}
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />

            {/* 提示文字 */}
            <div className="typing-hint">
              在键盘上输入上面显示的{mode.id === 'beginner' ? '字母' : mode.id === 'hard' ? '句子' : '单词'}
            </div>

            {/* 键盘指南（仅入门模式显示） */}
            {mode.id === 'beginner' && (
              <KeyboardGuide currentKey={characters[currentIndex]?.char || ''} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

