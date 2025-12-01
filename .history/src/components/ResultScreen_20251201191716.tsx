import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Difficulty } from '../types';
import { getEncouragement, gameModes } from '../data/words';
import './ResultScreen.css';

interface Props {
  result: {
    score: number;
    accuracy: number;
    wpm: number;
    totalChars: number;
    correctChars: number;
    wrongChars: number;
    difficulty: Difficulty;
  };
  onPlayAgain: () => void;
  onBack: () => void;
}

export default function ResultScreen({ result, onPlayAgain, onBack }: Props) {
  const [encouragement] = useState(() => getEncouragement(result.accuracy));
  const [showConfetti, setShowConfetti] = useState(false);
  
  const mode = gameModes.find(m => m.id === result.difficulty);
  
  // 计算星级 (1-3颗星)
  const stars = result.accuracy >= 95 ? 3 : result.accuracy >= 80 ? 2 : result.accuracy >= 60 ? 1 : 0;

  useEffect(() => {
    if (result.accuracy >= 80) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [result.accuracy]);

  return (
    <div className="result-screen">
      {/* 彩带效果 */}
      {showConfetti && (
        <div className="confetti-container">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#7ED957', '#FF9F43'][Math.floor(Math.random() * 5)],
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
              }}
              initial={{ y: -20, opacity: 1, rotate: 0 }}
              animate={{ 
                y: '100vh', 
                opacity: 0,
                rotate: Math.random() * 720 - 360
              }}
              transition={{ 
                duration: Math.random() * 2 + 2,
                delay: Math.random() * 0.5,
                ease: 'easeOut'
              }}
            />
          ))}
        </div>
      )}

      {/* 主要内容 */}
      <motion.div 
        className="result-card"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        {/* 模式标识 */}
        <div className="result-mode" style={{ borderColor: mode?.color }}>
          <span className="mode-icon">{mode?.icon}</span>
          <span className="mode-name">{mode?.name}</span>
        </div>

        {/* 星级评价 */}
        <motion.div 
          className="stars-container"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          {[1, 2, 3].map((star) => (
            <motion.span
              key={star}
              className={`star ${star <= stars ? 'active' : ''}`}
              initial={{ rotateY: 0, scale: 0 }}
              animate={{ 
                rotateY: star <= stars ? 360 : 0,
                scale: 1
              }}
              transition={{ 
                delay: 0.4 + star * 0.2,
                duration: 0.5,
                type: 'spring'
              }}
            >
              {star <= stars ? '⭐' : '☆'}
            </motion.span>
          ))}
        </motion.div>

        {/* 鼓励语 */}
        <motion.h2 
          className="encouragement"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {encouragement}
        </motion.h2>

        {/* 分数展示 */}
        <motion.div 
          className="score-display"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, type: 'spring' }}
        >
          <span className="score-label">得分</span>
          <motion.span 
            className="score-value"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {result.score}
          </motion.span>
        </motion.div>

        {/* 详细统计 */}
        <motion.div 
          className="stats-grid"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="stat-box">
            <span className="stat-icon">🎯</span>
            <span className="stat-value">{result.accuracy}%</span>
            <span className="stat-label">准确率</span>
          </div>
          <div className="stat-box">
            <span className="stat-icon">⚡</span>
            <span className="stat-value">{result.wpm}</span>
            <span className="stat-label">打字速度</span>
          </div>
          <div className="stat-box">
            <span className="stat-icon">✅</span>
            <span className="stat-value">{result.correctChars}</span>
            <span className="stat-label">正确字符</span>
          </div>
          <div className="stat-box">
            <span className="stat-icon">❌</span>
            <span className="stat-value">{result.wrongChars}</span>
            <span className="stat-label">错误次数</span>
          </div>
        </motion.div>

        {/* 进步提示 */}
        <motion.div 
          className="tip-box"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {result.accuracy < 70 && (
            <p>💡 小提示：不要着急，慢慢打，准确率比速度更重要哦！</p>
          )}
          {result.accuracy >= 70 && result.accuracy < 90 && (
            <p>💡 小提示：做得很好！多练习几次，你会更棒的！</p>
          )}
          {result.accuracy >= 90 && (
            <p>🌟 太厉害了！你已经是打字小高手了！试试更难的模式吧！</p>
          )}
        </motion.div>

        {/* 按钮 */}
        <motion.div 
          className="action-buttons"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <motion.button 
            className="btn-primary"
            onClick={onPlayAgain}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            🔄 再来一次
          </motion.button>
          <motion.button 
            className="btn-secondary"
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            🏠 返回首页
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

