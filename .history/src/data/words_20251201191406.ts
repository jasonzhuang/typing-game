import { WordItem, GameMode } from '../types';

// 入门模式 - 单个字母
export const beginnerLetters: string[] = [
  'a', 's', 'd', 'f', 'j', 'k', 'l', ';',
  'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
  'z', 'x', 'c', 'v', 'b', 'n', 'm',
  'g', 'h'
];

// 简单模式 - 3-4个字母的简单单词
export const easyWords: WordItem[] = [
  { word: 'cat', meaning: '猫咪 🐱' },
  { word: 'dog', meaning: '狗狗 🐕' },
  { word: 'sun', meaning: '太阳 ☀️' },
  { word: 'run', meaning: '跑步 🏃' },
  { word: 'big', meaning: '大的 🦣' },
  { word: 'red', meaning: '红色 🔴' },
  { word: 'hat', meaning: '帽子 🎩' },
  { word: 'cup', meaning: '杯子 🥤' },
  { word: 'egg', meaning: '鸡蛋 🥚' },
  { word: 'pig', meaning: '小猪 🐷' },
  { word: 'box', meaning: '盒子 📦' },
  { word: 'bus', meaning: '公交车 🚌' },
  { word: 'car', meaning: '汽车 🚗' },
  { word: 'bed', meaning: '床 🛏️' },
  { word: 'pen', meaning: '钢笔 🖊️' },
  { word: 'book', meaning: '书本 📚' },
  { word: 'fish', meaning: '小鱼 🐟' },
  { word: 'bird', meaning: '小鸟 🐦' },
  { word: 'tree', meaning: '大树 🌳' },
  { word: 'star', meaning: '星星 ⭐' },
  { word: 'moon', meaning: '月亮 🌙' },
  { word: 'cake', meaning: '蛋糕 🎂' },
  { word: 'ball', meaning: '球 ⚽' },
  { word: 'bear', meaning: '熊 🐻' },
  { word: 'duck', meaning: '鸭子 🦆' },
  { word: 'frog', meaning: '青蛙 🐸' },
  { word: 'hand', meaning: '手 ✋' },
  { word: 'milk', meaning: '牛奶 🥛' },
  { word: 'rain', meaning: '下雨 🌧️' },
  { word: 'snow', meaning: '雪 ❄️' },
];

// 中等模式 - 5-7个字母的单词
export const mediumWords: WordItem[] = [
  { word: 'apple', meaning: '苹果 🍎' },
  { word: 'happy', meaning: '开心 😊' },
  { word: 'house', meaning: '房子 🏠' },
  { word: 'water', meaning: '水 💧' },
  { word: 'music', meaning: '音乐 🎵' },
  { word: 'candy', meaning: '糖果 🍬' },
  { word: 'flower', meaning: '花朵 🌸' },
  { word: 'rabbit', meaning: '兔子 🐰' },
  { word: 'banana', meaning: '香蕉 🍌' },
  { word: 'orange', meaning: '橙子 🍊' },
  { word: 'school', meaning: '学校 🏫' },
  { word: 'friend', meaning: '朋友 👫' },
  { word: 'family', meaning: '家庭 👨‍👩‍👧' },
  { word: 'garden', meaning: '花园 🌻' },
  { word: 'monkey', meaning: '猴子 🐵' },
  { word: 'panda', meaning: '熊猫 🐼' },
  { word: 'tiger', meaning: '老虎 🐯' },
  { word: 'pizza', meaning: '披萨 🍕' },
  { word: 'juice', meaning: '果汁 🧃' },
  { word: 'smile', meaning: '微笑 😄' },
  { word: 'dance', meaning: '跳舞 💃' },
  { word: 'dream', meaning: '梦想 💭' },
  { word: 'cloud', meaning: '云朵 ☁️' },
  { word: 'beach', meaning: '沙滩 🏖️' },
  { word: 'zebra', meaning: '斑马 🦓' },
  { word: 'robot', meaning: '机器人 🤖' },
  { word: 'piano', meaning: '钢琴 🎹' },
  { word: 'lunch', meaning: '午餐 🍱' },
  { word: 'super', meaning: '超级 🦸' },
  { word: 'magic', meaning: '魔法 ✨' },
];

// 困难模式 - 简单句子
export const hardSentences: WordItem[] = [
  { word: 'I love my cat.', meaning: '我爱我的猫咪 🐱' },
  { word: 'The sun is hot.', meaning: '太阳很热 ☀️' },
  { word: 'I like to run.', meaning: '我喜欢跑步 🏃' },
  { word: 'Birds can fly.', meaning: '鸟儿会飞 🐦' },
  { word: 'I eat an apple.', meaning: '我吃苹果 🍎' },
  { word: 'The dog is big.', meaning: '狗狗很大 🐕' },
  { word: 'I go to school.', meaning: '我去上学 🏫' },
  { word: 'Mom loves me.', meaning: '妈妈爱我 ❤️' },
  { word: 'I am happy now.', meaning: '我现在很开心 😊' },
  { word: 'The fish swims.', meaning: '鱼儿游泳 🐟' },
  { word: 'I play with toys.', meaning: '我玩玩具 🧸' },
  { word: 'The sky is blue.', meaning: '天空是蓝色的 🌤️' },
  { word: 'I read a book.', meaning: '我读一本书 📖' },
  { word: 'Stars at night.', meaning: '夜晚的星星 ⭐' },
  { word: 'I drink water.', meaning: '我喝水 💧' },
  { word: 'Trees are green.', meaning: '树是绿色的 🌲' },
  { word: 'I am a student.', meaning: '我是学生 📚' },
  { word: 'The cake is yum.', meaning: '蛋糕很好吃 🎂' },
  { word: 'I love my family.', meaning: '我爱我的家人 👨‍👩‍👧' },
  { word: 'Music is fun.', meaning: '音乐很有趣 🎵' },
];

// 游戏模式配置
export const gameModes: GameMode[] = [
  {
    id: 'beginner',
    name: '字母入门',
    icon: '🌱',
    description: '从单个字母开始，认识键盘',
    color: '#7ED957',
    minLength: 1,
    maxLength: 1,
  },
  {
    id: 'easy',
    name: '简单单词',
    icon: '🌟',
    description: '3-4个字母的简单单词',
    color: '#4ECDC4',
    minLength: 3,
    maxLength: 4,
  },
  {
    id: 'medium',
    name: '进阶挑战',
    icon: '🚀',
    description: '5-7个字母的单词',
    color: '#FFE66D',
    minLength: 5,
    maxLength: 7,
  },
  {
    id: 'hard',
    name: '句子大师',
    icon: '🏆',
    description: '完整的英语句子',
    color: '#FF6B6B',
    minLength: 10,
    maxLength: 20,
  },
];

// 鼓励语
export const encouragements = {
  perfect: [
    '太棒了！完美无缺！🎉',
    '你是打字小天才！⭐',
    '厉害！满分通过！🏆',
    '哇！一个都没错！🌟',
    '完美！你真的太厉害了！💯',
  ],
  great: [
    '做得真好！继续加油！👏',
    '非常棒！再接再厉！🎊',
    '很不错哦！你在进步！📈',
    '好样的！继续努力！💪',
    '真棒！你越来越熟练了！🌈',
  ],
  good: [
    '不错！继续练习会更好！😊',
    '有进步！加油哦！🙌',
    '挺好的！熟能生巧！✨',
    '继续努力，你可以的！💫',
    '别灰心，多练习就会更棒！🌻',
  ],
  tryAgain: [
    '没关系，再试一次！💪',
    '别着急，慢慢来！🐢',
    '继续加油，你能行！🎯',
    '多练习几次就会了！📚',
    '相信自己，你可以的！🌟',
  ],
};

// 获取随机鼓励语
export const getEncouragement = (accuracy: number): string => {
  const list = accuracy >= 100 ? encouragements.perfect
    : accuracy >= 90 ? encouragements.great
    : accuracy >= 70 ? encouragements.good
    : encouragements.tryAgain;
  return list[Math.floor(Math.random() * list.length)];
};

// 获取指定难度的单词列表
export const getWordsForDifficulty = (difficulty: string): WordItem[] => {
  switch (difficulty) {
    case 'beginner':
      return beginnerLetters.map(letter => ({ word: letter }));
    case 'easy':
      return easyWords;
    case 'medium':
      return mediumWords;
    case 'hard':
      return hardSentences;
    default:
      return easyWords;
  }
};

