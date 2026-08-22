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
  difficulty?: number;
  created_at?: string;
  tags?: string[];
}

export interface DeletedQuestion {
  id: string;
  question: Question;
  deletedAt: number;
  reason?: string;
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
  isCustom?: boolean;
}


export type ExamMode = 'practice' | 'simulation' | 'smart_review';
export type ExamSelectionStrategy = 'random' | 'unseen' | 'most_failed' | 'flagged';

export interface ExamConfig {
  categories: string[];
  subtopics?: string[];
  count: number;
  mode: ExamMode;
  strategy: ExamSelectionStrategy;
  timeLimitMinutes?: number;
  passMarkPercentage: number;
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
  id?: string;
  sessionId: string;
  config: ExamConfig;
  startTime: number;
  endTime: number | null;
  currentIndex: number;
  questions: Question[];
  answers: Record<string, ExamSessionAnswer>;
  isCompleted: boolean;
  score?: {
    totalQuestions: number;
    answeredQuestions: number;
    correctCount: number;
    incorrectCount: number;
    percentage: number;
    passed: boolean;
  } | null;
}

export interface CategoryMetadata {
  id: string;
  title: string;
  icon: string;
  color: string;
  total_questions: number;
  subtopics: Record<string, {
    id: string;
    title: string;
    count: number;
  }>;
}

export interface BankManifest {
  app: string;
  version: string;
  generated_at: string;
  total_questions: number;
  categories: CategoryMetadata[];
}
