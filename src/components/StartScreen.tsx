import { motion } from "framer-motion";
import { Difficulty, ProgressData } from "../types";
import { gameModes } from "../data/words";
import "./StartScreen.css";

interface Props {
  onStart: (difficulty: Difficulty) => void;
  progress: ProgressData;
}

export default function StartScreen({ onStart, progress }: Props) {
  return (
    <div className="start-screen">
      {/* 标题 */}
      <motion.div
        className="title-section"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <motion.div
          className="title-icon"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          ⌨️
        </motion.div>
        <h1 className="title">打字小勇士</h1>
        <p className="subtitle">让打字变得超级有趣！🎮</p>
      </motion.div>

      {/* 进度统计卡片 */}
      {progress.totalGames > 0 && (
        <motion.div
          className="stats-card"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="stat-item">
            <span className="stat-icon">🎯</span>
            <span className="stat-value">{progress.totalGames}</span>
            <span className="stat-label">游戏次数</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">⚡</span>
            <span className="stat-value">{progress.bestWpm}</span>
            <span className="stat-label">最佳速度</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">✨</span>
            <span className="stat-value">{progress.bestAccuracy}%</span>
            <span className="stat-label">最佳准确率</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🔥</span>
            <span className="stat-value">{progress.currentStreak}</span>
            <span className="stat-label">连续天数</span>
          </div>
        </motion.div>
      )}

      {/* 难度选择 */}
      <div className="mode-selection">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          选择练习模式
        </motion.h2>

        <div className="mode-grid">
          {gameModes.map((mode, index) => (
            <motion.button
              key={mode.id}
              className="mode-card"
              style={{ "--mode-color": mode.color } as React.CSSProperties}
              onClick={() => onStart(mode.id)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="mode-icon">{mode.icon}</span>
              <span className="mode-name">{mode.name}</span>
              <span className="mode-desc">{mode.description}</span>

              {/* 进度条 */}
              <div className="mode-progress">
                <div
                  className="mode-progress-bar"
                  style={{ width: `${progress.levelProgress[mode.id]}%` }}
                />
              </div>
              <span className="mode-progress-text">
                {progress.levelProgress[mode.id]}% 完成
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* 提示 */}
      <motion.div
        className="tips"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p>💡 小提示：保持手指在正确的位置，用正确的手指按键哦！</p>
      </motion.div>
    </div>
  );
}
