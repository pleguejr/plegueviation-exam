import Dexie, { Table } from 'dexie';
import { QuestionStats, ExamSession, Question, DeletedQuestion, ReviewRequest } from '../types';

export class PlegueviationDB extends Dexie {
  questionStats!: Table<QuestionStats, string>;
  examSessions!: Table<ExamSession, string>;
  customQuestions!: Table<Question, string>;
  deletedQuestions!: Table<DeletedQuestion, string>;
  reviewRequests!: Table<ReviewRequest, string>;

  constructor() {
    super('PlegueviationExamDB');
    this.version(1).stores({
      questionStats: 'questionId, timesAnswered, timesCorrect, timesIncorrect, lastAnsweredAt, isFlagged',
      examSessions: 'sessionId, startTime, isCompleted',
      customQuestions: 'id, subject_id, _category, _subtopic'
    });
    this.version(2).stores({
      deletedQuestions: 'id, deletedAt, [deletedAt+id]'
    });
    this.version(3).stores({
      reviewRequests: 'id, questionId, requestedAt, reasonCategory, status'
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
 * Guarda una pregunta en la lista de eliminadas para que no vuelva a aparecer en exámenes.
 */
export async function deleteQuestion(question: Question, reason?: string): Promise<void> {
  try {
    const deletedRecord: DeletedQuestion = {
      id: question.id,
      question,
      deletedAt: Date.now(),
      reason
    };
    await db.deletedQuestions.put(deletedRecord);
    // Si era una pregunta personalizada, eliminarla de customQuestions
    await db.customQuestions.delete(question.id);
  } catch (err) {
    console.warn('Error deleting question:', question.id, err);
  }
}

/**
 * Restaura una pregunta previamente eliminada devolviéndola al banco activo.
 */
export async function restoreQuestion(questionId: string): Promise<boolean> {
  try {
    const record = await db.deletedQuestions.get(questionId);
    if (!record) return false;

    await db.deletedQuestions.delete(questionId);

    // Si era personalizada, volver a guardarla en customQuestions
    if (record.question.isCustom) {
      await db.customQuestions.put(record.question);
    }
    return true;
  } catch (err) {
    console.warn('Error restoring question:', questionId, err);
    return false;
  }
}

/**
 * Obtiene todas las preguntas eliminadas ordenadas por fecha de eliminación descendente.
 */
export async function getDeletedQuestions(): Promise<DeletedQuestion[]> {
  try {
    const all = await db.deletedQuestions.toArray();
    return all.sort((a, b) => b.deletedAt - a.deletedAt);
  } catch (err) {
    console.warn('Error fetching deleted questions:', err);
    return [];
  }
}

/**
 * Obtiene el conjunto (Set) de IDs de preguntas eliminadas para filtrado rápido.
 */
export async function getDeletedQuestionIds(): Promise<Set<string>> {
  try {
    const all = await db.deletedQuestions.toArray();
    return new Set(all.map((d) => d.id));
  } catch (err) {
    console.warn('Error fetching deleted question ids:', err);
    return new Set();
  }
}

/**
 * Guarda una solicitud de revisión para auditoría.
 */
export async function saveReviewRequest(question: Question, reasonCategory: string, comment?: string): Promise<ReviewRequest> {
  const req: ReviewRequest = {
    id: `rev_${question.id}_${Date.now()}`,
    questionId: question.id,
    question,
    requestedAt: Date.now(),
    reasonCategory,
    comment,
    status: 'pending'
  };
  try {
    await db.reviewRequests.put(req);
  } catch (err) {
    console.warn('Error saving review request:', err);
  }
  return req;
}

/**
 * Obtiene todas las solicitudes de revisión pendientes o resueltas ordenadas por fecha.
 */
export async function getReviewRequests(): Promise<ReviewRequest[]> {
  try {
    const all = await db.reviewRequests.toArray();
    return all.sort((a, b) => b.requestedAt - a.requestedAt);
  } catch (err) {
    console.warn('Error fetching review requests:', err);
    return [];
  }
}

/**
 * Elimina una solicitud de revisión tras ser auditada o resuelta.
 */
export async function deleteReviewRequest(id: string): Promise<void> {
  try {
    await db.reviewRequests.delete(id);
  } catch (err) {
    console.warn('Error deleting review request:', err);
  }
}

/**
 * Obtiene el conjunto de IDs de preguntas con solicitud de revisión activa.
 */
export async function getReviewRequestIds(): Promise<Set<string>> {
  try {
    const all = await db.reviewRequests.toArray();
    return new Set(all.map((r) => r.questionId));
  } catch (err) {
    console.warn('Error fetching review request question IDs:', err);
    return new Set();
  }
}

/**
 * Exporta un backup completo de todo el progreso, sesiones, preguntas custom, eliminadas y solicitudes de revisión.
 */
export async function exportFullBackup(): Promise<string> {
  const [stats, sessions, custom, deleted, reviews] = await Promise.all([
    db.questionStats.toArray(),
    db.examSessions.toArray(),
    db.customQuestions.toArray(),
    db.deletedQuestions.toArray(),
    db.reviewRequests.toArray()
  ]);

  const backupData = {
    app: 'Plegueviation Exam',
    version: '2.1.0',
    exportedAt: new Date().toISOString(),
    questionStats: stats,
    examSessions: sessions,
    customQuestions: custom,
    deletedQuestions: deleted,
    reviewRequests: reviews
  };

  return JSON.stringify(backupData, null, 2);
}

/**
 * Restaura un backup importado desde archivo JSON de Google Drive o local.
 */
export async function restoreFullBackup(jsonContent: string): Promise<{ statsCount: number; sessionsCount: number; customCount: number; deletedCount: number; reviewsCount: number }> {
  const data = JSON.parse(jsonContent);

  let statsCount = 0;
  let sessionsCount = 0;
  let customCount = 0;
  let deletedCount = 0;
  let reviewsCount = 0;

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

  if (Array.isArray(data.deletedQuestions)) {
    for (const d of data.deletedQuestions) {
      await db.deletedQuestions.put(d);
      deletedCount++;
    }
  }

  if (Array.isArray(data.reviewRequests)) {
    for (const r of data.reviewRequests) {
      await db.reviewRequests.put(r);
      reviewsCount++;
    }
  }

  return { statsCount, sessionsCount, customCount, deletedCount, reviewsCount };
}

