/**
 * types.ts - Definiciones de tipos para el motor de Plegueviation Exam
 */

export interface Option {
  id: string;
  text: string;
  is_correct: boolean;
}

export interface Annex {
  id: string;
  src: string;
  title: string;
}

export interface Explanation {
  text: string;
  references?: string[];
}

export interface QuestionMetadata {
  easa_ecqb_ref?: string;
  difficulty?: number; // 0.0 to 1.0
  created_at?: string;
  tags?: string[];
}

export interface Question {
  id: string;
  subject_id: string;
  learning_objective: string;
  stem: string;
  annexes?: Annex[];
  options: Option[];
  explanation: Explanation;
  metadata?: QuestionMetadata;
  _category?: string;
  _subtopic?: string;
}

export type ExamMode = 'practice' | 'simulation' | 'smart_review';

export type ExamSelectionStrategy = 'random' | 'unseen' | 'most_failed' | 'flagged';

export interface ExamConfig {
  categories: string[]; // ['binter-ops', 'fleet-e195e2', etc.]
  subtopics?: string[];
  count: number;
  mode: ExamMode;
  strategy: ExamSelectionStrategy;
  timeLimitMinutes?: number;
  passMarkPercentage: number; // e.g. 75
}

export interface AnswerHistoryEntry {
  timestamp: number;
  selectedOptionId: string;
  isCorrect: boolean;
  timeSpentSeconds: number;
  examMode: ExamMode;
}

export interface QuestionStats {
  questionId: string;
  timesAnswered: number;
  timesCorrect: number;
  timesIncorrect: number;
  lastAnsweredAt: number | null;
  lastResult: boolean | null;
  isFlagged: boolean;
  history: AnswerHistoryEntry[];
}

export interface ExamSessionAnswer {
  questionId: string;
  selectedOptionId: string | null;
  isCorrect: boolean | null;
  timeSpentSeconds: number;
  isFlagged: boolean;
}

export interface ExamSession {
  sessionId: string;
  config: ExamConfig;
  startTime: number;
  endTime: number | null;
  currentIndex: number;
  questions: Question[];
  answers: Record<string, ExamSessionAnswer>;
  isCompleted: boolean;
  score: {
    totalQuestions: number;
    answeredQuestions: number;
    correctCount: number;
    incorrectCount: number;
    percentage: number;
    passed: boolean;
  } | null;
}

export interface CategorySummary {
  id: string;
  title: string;
  icon: string;
  color: string;
  totalQuestions: number;
  answeredQuestions: number;
  masteredQuestions: number; // e.g. answered >= 2 times with >= 80% accuracy
  failedQuestions: number;
  accuracyPercentage: number;
}
