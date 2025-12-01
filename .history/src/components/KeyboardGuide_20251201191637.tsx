import { motion } from 'framer-motion';
import './KeyboardGuide.css';

interface Props {
  currentKey: string;
}

const keyboardLayout = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

// 手指分配
const fingerMap: Record<string, string> = {
  'q': 'pinky-left', 'a': 'pinky-left', 'z': 'pinky-left',
  'w': 'ring-left', 's': 'ring-left', 'x': 'ring-left',
  'e': 'middle-left', 'd': 'middle-left', 'c': 'middle-left',
  'r': 'index-left', 'f': 'index-left', 'v': 'index-left',
  't': 'index-left', 'g': 'index-left', 'b': 'index-left',
  'y': 'index-right', 'h': 'index-right', 'n': 'index-right',
  'u': 'index-right', 'j': 'index-right', 'm': 'index-right',
  'i': 'middle-right', 'k': 'middle-right',
  'o': 'ring-right', 'l': 'ring-right',
  'p': 'pinky-right', ';': 'pinky-right',
};

// 手指颜色
const fingerColors: Record<string, string> = {
  'pinky-left': '#FF6B6B',
  'ring-left': '#FFE66D',
  'middle-left': '#7ED957',
  'index-left': '#4ECDC4',
  'index-right': '#45B7D1',
  'middle-right': '#96E6A1',
  'ring-right': '#DDA0DD',
  'pinky-right': '#F8B4B4',
};

export default function KeyboardGuide({ currentKey }: Props) {
  const currentFinger = fingerMap[currentKey.toLowerCase()];

  return (
    <div className="keyboard-guide">
      <div className="keyboard">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((key) => {
              const finger = fingerMap[key];
              const isActive = key === currentKey.toLowerCase();
              const color = fingerColors[finger];
              
              return (
                <motion.div
                  key={key}
                  className={`key ${isActive ? 'active' : ''}`}
                  style={{
                    backgroundColor: isActive ? color : `${color}30`,
                    borderColor: color,
                  }}
                  animate={isActive ? { 
                    scale: [1, 1.15, 1],
                    boxShadow: ['0 2px 5px rgba(0,0,0,0.1)', `0 0 20px ${color}`, '0 2px 5px rgba(0,0,0,0.1)']
                  } : {}}
                  transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
                >
                  {key.toUpperCase()}
                </motion.div>
              );
            })}
          </div>
        ))}
        
        {/* 空格键 */}
        <div className="keyboard-row">
          <div className="key spacebar">SPACE</div>
        </div>
      </div>

      {/* 手指提示 */}
      {currentFinger && (
        <motion.div 
          className="finger-hint"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          key={currentKey}
        >
          <span 
            className="finger-dot"
            style={{ backgroundColor: fingerColors[currentFinger] }}
          />
          <span className="finger-text">
            用 <strong>{getFingerName(currentFinger)}</strong> 按下 <strong>{currentKey.toUpperCase()}</strong>
          </span>
        </motion.div>
      )}
    </div>
  );
}

function getFingerName(finger: string): string {
  const names: Record<string, string> = {
    'pinky-left': '左手小拇指',
    'ring-left': '左手无名指',
    'middle-left': '左手中指',
    'index-left': '左手食指',
    'index-right': '右手食指',
    'middle-right': '右手中指',
    'ring-right': '右手无名指',
    'pinky-right': '右手小拇指',
  };
  return names[finger] || finger;
}

