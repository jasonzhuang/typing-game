export type Difficulty = "beginner" | "easy" | "medium" | "hard";

export interface GameMode {
  id: Difficulty;
  name: string;
  icon: string;
  description: string;
  color: string;
  minLength: number;
  maxLength: number;
  timeLimit?: number; // 秒，可选
}

export interface GameStats {
  totalChars: number;
  correctChars: number;
  wrongChars: number;
  startTime: number;
  endTime?: number;
  wpm: number; // Words per minute
  accuracy: number;
}

export interface ProgressData {
  totalGames: number;
  totalChars: number;
  bestWpm: number;
  bestAccuracy: number;
  currentStreak: number;
  lastPlayDate: string;
  levelProgress: Record<Difficulty, number>;
}

export interface Character {
  char: string;
  status: "pending" | "correct" | "wrong" | "current";
}

export interface WordItem {
  word: string;
  pinyin?: string;
  meaning?: string;
}
