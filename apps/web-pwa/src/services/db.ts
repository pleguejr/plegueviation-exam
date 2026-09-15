import { updateQuestionStats } from '@plegue/core-engine';
import Dexie, { Table } from 'dexie';
import { QuestionStats, ExamSession, Question, DeletedQuestion, ReviewRequest, SyncPayload } from '../types';
import { OperationalEvent } from '../types/operationalEvents';

export interface SyncSnapshot {
  id: string;
  label: string;
  createdAt: number;
  payload: SyncPayload;
}

export class PlegueviationDB extends Dexie {
  questionStats!: Table<QuestionStats, string>;
  examSessions!: Table<ExamSession, string>;
  customQuestions!: Table<Question, string>;
  deletedQuestions!: Table<DeletedQuestion, string>;
  reviewRequests!: Table<ReviewRequest, string>;
  syncSnapshots!: Table<SyncSnapshot, string>;
  operationalEvents!: Table<OperationalEvent, string>;

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
    this.version(4).stores({
      syncSnapshots: 'id, createdAt, label'
    });
    this.version(5).stores({
      operationalEvents: 'id, source, occurredAt, updatedAt, linkedQuestionId'
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
  const updated = updateQuestionStats(
    current,
    questionId,
    selectedOptionId,
    isCorrect,
    timeSpentSeconds,
    examMode
  ) as QuestionStats;

  try {
    await db.questionStats.put(updated);
  } catch (err) {
    console.warn('Error saving question stat:', err);
  }
  return updated;
}
/**
 * Registra la visualización y autoevaluación de una flashcard para repetición espaciada y memoria a largo plazo.
 */
export async function recordFlashcardRating(
  questionId: string,
  rating: 'hard' | 'medium' | 'easy'
): Promise<QuestionStats> {
  const current = await getQuestionStat(questionId);
  const now = Date.now();
  const isCorrect = rating === 'easy' || rating === 'medium';
  
  const updated: QuestionStats = {
    ...current,
    timesAnswered: current.timesAnswered + 1,
    timesCorrect: current.timesCorrect + (isCorrect ? 1 : 0),
    timesIncorrect: current.timesIncorrect + (rating === 'hard' ? 1 : 0),
    lastAnsweredAt: now,
    lastResult: isCorrect,
    flashcardViews: (current.flashcardViews || 0) + 1,
    flashcardLastRating: rating,
    flashcardLastViewedAt: now,
    history: [
      ...current.history,
      {
        timestamp: now,
        selectedOptionId: rating === 'easy' ? 'MASTERED' : rating === 'medium' ? 'REGULAR' : 'HARD',
        isCorrect,
        timeSpentSeconds: 5,
        examMode: 'smart_review'
      }
    ]
  };

  try {
    await db.questionStats.put(updated);
  } catch (err) {
    console.warn('Error saving flashcard stat:', err);
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

const MAX_LOCAL_SNAPSHOTS = 5;

/**
 * Guarda un snapshot local del progreso para rollback manual.
 */
export async function saveSyncSnapshot(label: string): Promise<void> {
  const { getLocalPayload } = await import('./sync');
  const payload = await getLocalPayload();
  const snapshot: SyncSnapshot = {
    id: `snap_${Date.now()}`,
    label,
    createdAt: Date.now(),
    payload
  };
  await db.syncSnapshots.put(snapshot);

  const all = await db.syncSnapshots.orderBy('createdAt').reverse().toArray();
  if (all.length > MAX_LOCAL_SNAPSHOTS) {
    const stale = all.slice(MAX_LOCAL_SNAPSHOTS);
    await db.syncSnapshots.bulkDelete(stale.map((s) => s.id));
  }
}

/**
 * Exporta un backup completo de todo el progreso, sesiones, preguntas custom, eliminadas y solicitudes de revisión.
 */
export async function exportFullBackup(): Promise<string> {
  const { getLocalPayload } = await import('./sync');
  const payload = await getLocalPayload();
  const backupData = {
    ...payload,
    exportedAt: new Date().toISOString()
  };
  return JSON.stringify(backupData, null, 2);
}

/**
 * Restaura un backup importado fusionándolo con el estado local (no sobrescribe a ciegas).
 */
export async function restoreFullBackup(jsonContent: string): Promise<{
  statsCount: number;
  sessionsCount: number;
  customCount: number;
  deletedCount: number;
  reviewsCount: number;
}> {
  const data = JSON.parse(jsonContent);
  await saveSyncSnapshot('pre-restore');

  const { mergeRemoteData } = await import('./sync');
  const merged = await mergeRemoteData(data as SyncPayload);

  return {
    statsCount: merged.mergedStatsCount,
    sessionsCount: merged.mergedSessionsCount,
    customCount: merged.mergedCustomCount,
    deletedCount: merged.mergedDeletedCount,
    reviewsCount: merged.mergedReviewsCount
  };
}

/**
 * Lista snapshots locales disponibles para rollback manual.
 */
export async function listSyncSnapshots(): Promise<SyncSnapshot[]> {
  return db.syncSnapshots.orderBy('createdAt').reverse().toArray();
}

/**
 * Restaura un snapshot local previamente guardado.
 */
export async function restoreSyncSnapshot(snapshotId: string): Promise<boolean> {
  const snapshot = await db.syncSnapshots.get(snapshotId);
  if (!snapshot) return false;
  await saveSyncSnapshot('pre-snapshot-restore');
  const { mergeRemoteData } = await import('./sync');
  await mergeRemoteData(snapshot.payload);
  return true;
}

