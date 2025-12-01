import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Difficulty, ProgressData } from './types';
import { gameModes } from './data/words';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import './App.css';

type Screen = 'start' | 'game' | 'result';

interface GameResult {
  score: number;
  accuracy: number;
  wpm: number;
  totalChars: number;
  correctChars: number;
  wrongChars: number;
  difficulty: Difficulty;
}

const defaultProgress: ProgressData = {
  totalGames: 0,
  totalChars: 0,
  bestWpm: 0,
  bestAccuracy: 0,
  currentStreak: 0,
  lastPlayDate: '',
  levelProgress: {
    beginner: 0,
    easy: 0,
    medium: 0,
    hard: 0,
  },
};

function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [result, setResult] = useState<GameResult | null>(null);
  const [progress, setProgress] = useState<ProgressData>(defaultProgress);

  // 从localStorage加载进度
  useEffect(() => {
    const saved = localStorage.getItem('typingGameProgress');
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch {
        setProgress(defaultProgress);
      }
    }
  }, []);

  // 保存进度到localStorage
  const saveProgress = (newProgress: ProgressData) => {
    setProgress(newProgress);
    localStorage.setItem('typingGameProgress', JSON.stringify(newProgress));
  };

  const handleStartGame = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setScreen('game');
  };

  const handleGameEnd = (gameResult: GameResult) => {
    setResult(gameResult);
    
    // 更新进度
    const today = new Date().toDateString();
    const isNewDay = progress.lastPlayDate !== today;
    
    const newProgress: ProgressData = {
      totalGames: progress.totalGames + 1,
      totalChars: progress.totalChars + gameResult.totalChars,
      bestWpm: Math.max(progress.bestWpm, gameResult.wpm),
      bestAccuracy: Math.max(progress.bestAccuracy, gameResult.accuracy),
      currentStreak: isNewDay ? progress.currentStreak + 1 : progress.currentStreak,
      lastPlayDate: today,
      levelProgress: {
        ...progress.levelProgress,
        [gameResult.difficulty]: Math.min(
          100,
          progress.levelProgress[gameResult.difficulty] + Math.floor(gameResult.score / 10)
        ),
      },
    };
    
    saveProgress(newProgress);
    setScreen('result');
  };

  const handleBackToStart = () => {
    setScreen('start');
    setResult(null);
  };

  const handlePlayAgain = () => {
    setScreen('game');
  };

  const currentMode = gameModes.find(m => m.id === difficulty);

  return (
    <div className="app">
      {/* 背景装饰元素 */}
      <div className="background-decorations">
        <motion.div 
          className="decoration star"
          animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >⭐</motion.div>
        <motion.div 
          className="decoration cloud"
          animate={{ x: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >☁️</motion.div>
        <motion.div 
          className="decoration heart"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >💖</motion.div>
        <motion.div 
          className="decoration rocket"
          animate={{ y: [-15, 15, -15], rotate: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >🚀</motion.div>
        <motion.div 
          className="decoration rainbow"
          animate={{ scale: [0.9, 1.1, 0.9], rotate: [-3, 3, -3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >🌈</motion.div>
      </div>

      <AnimatePresence mode="wait">
        {screen === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <StartScreen 
              onStart={handleStartGame} 
              progress={progress}
            />
          </motion.div>
        )}

        {screen === 'game' && currentMode && (
          <motion.div
            key="game"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <GameScreen
              mode={currentMode}
              onGameEnd={handleGameEnd}
              onBack={handleBackToStart}
            />
          </motion.div>
        )}

        {screen === 'result' && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <ResultScreen
              result={result}
              onPlayAgain={handlePlayAgain}
              onBack={handleBackToStart}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

