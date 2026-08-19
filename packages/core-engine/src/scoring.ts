/**
 * scoring.ts - Motor de calificación, estadísticas y cálculo del umbral del 75%
 */

import { Question, ExamSession, QuestionStats, ExamConfig, AnswerHistoryEntry } from './types';

export interface EvaluationResult {
  totalQuestions: number;
  answeredQuestions: number;
  correctCount: number;
  incorrectCount: number;
  percentage: number;
  passed: boolean;
  passThreshold: number;
  subjectBreakdown: Record<string, {
    subjectId: string;
    total: number;
    correct: number;
    percentage: number;
    passed: boolean;
  }>;
}

/**
 * Evalúa una sesión de examen completada.
 */
export function evaluateExam(session: ExamSession): EvaluationResult {
  const total = session.questions.length;
  let correct = 0;
  let answered = 0;
  const passThreshold = session.config.passMarkPercentage || 75;

  const subjectStats: Record<string, { total: number; correct: number }> = {};

  for (const q of session.questions) {
    const subj = q._category || q.subject_id;
    if (!subjectStats[subj]) {
      subjectStats[subj] = { total: 0, correct: 0 };
    }
    subjectStats[subj].total += 1;

    const answer = session.answers[q.id];
    if (answer && answer.selectedOptionId !== null) {
      answered += 1;
      const correctOption = q.options.find((opt) => opt.is_correct);
      const isCorrect = correctOption?.id === answer.selectedOptionId;
      answer.isCorrect = isCorrect;

      if (isCorrect) {
        correct += 1;
        subjectStats[subj].correct += 1;
      }
    }
  }

  const percentage = total > 0 ? Math.round((correct / total) * 1000) / 10 : 0;
  const passed = percentage >= passThreshold;

  const subjectBreakdown: EvaluationResult['subjectBreakdown'] = {};
  for (const [subj, data] of Object.entries(subjectStats)) {
    const subjPct = data.total > 0 ? Math.round((data.correct / data.total) * 1000) / 10 : 0;
    subjectBreakdown[subj] = {
      subjectId: subj,
      total: data.total,
      correct: data.correct,
      percentage: subjPct,
      passed: subjPct >= passThreshold
    };
  }

  return {
    totalQuestions: total,
    answeredQuestions: answered,
    correctCount: correct,
    incorrectCount: total - correct,
    percentage,
    passed,
    passThreshold,
    subjectBreakdown
  };
}

/**
 * Actualiza las estadísticas acumuladas de una pregunta tras responderla.
 */
export function updateQuestionStats(
  currentStats: QuestionStats | undefined,
  questionId: string,
  selectedOptionId: string,
  isCorrect: boolean,
  timeSpentSeconds: number,
  examMode: ExamConfig['mode']
): QuestionStats {
  const now = Date.now();
  const historyEntry: AnswerHistoryEntry = {
    timestamp: now,
    selectedOptionId,
    isCorrect,
    timeSpentSeconds,
    examMode
  };

  const prev = currentStats || {
    questionId,
    timesAnswered: 0,
    timesCorrect: 0,
    timesIncorrect: 0,
    lastAnsweredAt: null,
    lastResult: null,
    isFlagged: false,
    history: []
  };

  return {
    ...prev,
    timesAnswered: prev.timesAnswered + 1,
    timesCorrect: prev.timesCorrect + (isCorrect ? 1 : 0),
    timesIncorrect: prev.timesIncorrect + (isCorrect ? 0 : 1),
    lastAnsweredAt: now,
    lastResult: isCorrect,
    history: [...(prev.history || []), historyEntry]
  };
}
