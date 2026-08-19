import Dexie, { Table } from 'dexie';
import { QuestionStats, ExamSession, Question } from '../types';

export class PlegueviationDB extends Dexie {
  questionStats!: Table<QuestionStats, string>;
  examSessions!: Table<ExamSession, string>;
  customQuestions!: Table<Question, string>;

  constructor() {
    super('PlegueviationExamDB');
    this.version(1).stores({
      questionStats: 'questionId, timesAnswered, timesCorrect, timesIncorrect, lastAnsweredAt, isFlagged',
      examSessions: 'sessionId, startTime, isCompleted',
      customQuestions: 'id, subject_id, _category, _subtopic'
    });
  }
}

export const db = new PlegueviationDB();

/**
 * Obtiene o inicializa las estadísticas de una pregunta.
 */
export async function getQuestionStat(questionId: string): Promise<QuestionStats> {
  try {
    const stat = await db.questionStats.get(questionId);
    if (stat) return stat;
  } catch (err) {
    console.warn('Error fetching stat for', questionId, err);
  }
  return {
    questionId,
    timesAnswered: 0,
    timesCorrect: 0,
    timesIncorrect: 0,
    lastAnsweredAt: null,
    lastResult: null,
    isFlagged: false,
    history: []
  };
}

/**
 * Obtiene todas las estadísticas indexadas por questionId en un mapa.
 */
export async function getAllStatsMap(): Promise<Record<string, QuestionStats>> {
  try {
    const all = await db.questionStats.toArray();
    const map: Record<string, QuestionStats> = {};
    for (const s of all) {
      map[s.questionId] = s;
    }
    return map;
  } catch (err) {
    console.warn('Error fetching stats map:', err);
    return {};
  }
}

/**
 * Registra una respuesta de pregunta y actualiza estadísticas.
 */
export async function recordAnswerStat(
  questionId: string,
  selectedOptionId: string,
  isCorrect: boolean,
  timeSpentSeconds: number,
  examMode: 'practice' | 'simulation' | 'smart_review'
): Promise<QuestionStats> {
  const current = await getQuestionStat(questionId);
  const now = Date.now();
  
  const updated: QuestionStats = {
    ...current,
    timesAnswered: current.timesAnswered + 1,
    timesCorrect: current.timesCorrect + (isCorrect ? 1 : 0),
    timesIncorrect: current.timesIncorrect + (isCorrect ? 0 : 1),
    lastAnsweredAt: now,
    lastResult: isCorrect,
    history: [
      ...current.history,
      {
        timestamp: now,
        selectedOptionId,
        isCorrect,
        timeSpentSeconds,
        examMode
      }
    ]
  };

  try {
    await db.questionStats.put(updated);
  } catch (err) {
    console.warn('Error saving question stat:', err);
  }
  return updated;
}

/**
 * Alterna el estado de marcador / flag de una pregunta.
 */
export async function toggleQuestionFlag(questionId: string): Promise<boolean> {
  const current = await getQuestionStat(questionId);
  const newFlag = !current.isFlagged;
  try {
    await db.questionStats.put({
      ...current,
      isFlagged: newFlag
    });
  } catch (err) {
    console.warn('Error saving flag:', err);
  }
  return newFlag;
}

/**
 * Guarda una sesión de examen completa en el historial.
 */
export async function saveExamSession(session: ExamSession): Promise<void> {
  try {
    await db.examSessions.put(session);
  } catch (err) {
    console.warn('Error saving exam session:', err);
  }
}

/**
 * Obtiene el historial reciente de exámenes completados.
 */
export async function getExamHistory(limit: number = 20): Promise<ExamSession[]> {
  try {
    const all = await db.examSessions.toArray();
    return all
      .filter((s) => s.isCompleted)
      .sort((a, b) => (b.startTime || 0) - (a.startTime || 0))
      .slice(0, limit);
  } catch (err) {
    console.warn('Error fetching exam history:', err);
    return [];
  }
}

/**
 * Exporta un backup completo de todo el progreso, sesiones y preguntas custom para Drive.
 */
export async function exportFullBackup(): Promise<string> {
  const [stats, sessions, custom] = await Promise.all([
    db.questionStats.toArray(),
    db.examSessions.toArray(),
    db.customQuestions.toArray()
  ]);

  const backupData = {
    app: 'Plegueviation Exam',
    version: '2.0.0',
    exportedAt: new Date().toISOString(),
    questionStats: stats,
    examSessions: sessions,
    customQuestions: custom
  };

  return JSON.stringify(backupData, null, 2);
}

/**
 * Restaura un backup importado desde archivo JSON de Google Drive o local.
 */
export async function restoreFullBackup(jsonContent: string): Promise<{ statsCount: number; sessionsCount: number; customCount: number }> {
  const data = JSON.parse(jsonContent);

  let statsCount = 0;
  let sessionsCount = 0;
  let customCount = 0;

  if (Array.isArray(data.questionStats)) {
    for (const s of data.questionStats) {
      await db.questionStats.put(s);
      statsCount++;
    }
  }

  if (Array.isArray(data.examSessions)) {
    for (const sess of data.examSessions) {
      await db.examSessions.put(sess);
      sessionsCount++;
    }
  }

  if (Array.isArray(data.customQuestions)) {
    for (const q of data.customQuestions) {
      await db.customQuestions.put(q);
      customCount++;
    }
  }

  return { statsCount, sessionsCount, customCount };
}
