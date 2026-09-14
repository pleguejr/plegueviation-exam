/**
 * shared/sync/syncMerge.js
 * Fusión bidireccional de payloads de sincronización (cliente + servidor).
 * Fuente única compartida entre PWA y API Vercel.
 */

function recordTimestamp(record, fallbackFields = []) {
  if (!record || typeof record !== 'object') return 0;
  if (typeof record.updatedAt === 'number') return record.updatedAt;
  for (const field of fallbackFields) {
    if (typeof record[field] === 'number') return record[field];
  }
  return 0;
}

export function mergeQuestionStats(localStat, remoteStat) {
  if (!localStat) return remoteStat;
  if (!remoteStat) return localStat;

  const combinedHistory = [...(localStat.history || []), ...(remoteStat.history || [])];
  const uniqueHistoryMap = new Map();
  for (const entry of combinedHistory) {
    if (entry && entry.timestamp) {
      uniqueHistoryMap.set(entry.timestamp, entry);
    }
  }
  const mergedHistory = Array.from(uniqueHistoryMap.values()).sort(
    (a, b) => a.timestamp - b.timestamp
  );

  const localLast = localStat.lastAnsweredAt || 0;
  const remoteLast = remoteStat.lastAnsweredAt || 0;
  const localFlash = localStat.flashcardLastViewedAt || 0;
  const remoteFlash = remoteStat.flashcardLastViewedAt || 0;

  return {
    questionId: remoteStat.questionId || localStat.questionId,
    timesAnswered: Math.max(
      localStat.timesAnswered || 0,
      remoteStat.timesAnswered || 0,
      mergedHistory.length
    ),
    timesCorrect: Math.max(localStat.timesCorrect || 0, remoteStat.timesCorrect || 0),
    timesIncorrect: Math.max(localStat.timesIncorrect || 0, remoteStat.timesIncorrect || 0),
    lastAnsweredAt: Math.max(localLast, remoteLast) || null,
    lastResult: remoteLast > localLast ? remoteStat.lastResult : localStat.lastResult,
    isFlagged: Boolean(localStat.isFlagged || remoteStat.isFlagged),
    history: mergedHistory,
    flashcardViews: Math.max(localStat.flashcardViews || 0, remoteStat.flashcardViews || 0),
    flashcardLastRating:
      remoteFlash > localFlash
        ? remoteStat.flashcardLastRating || localStat.flashcardLastRating
        : localStat.flashcardLastRating || remoteStat.flashcardLastRating,
    flashcardLastViewedAt: Math.max(localFlash, remoteFlash) || null
  };
}

export function mergeExamSessions(localSession, remoteSession) {
  if (!localSession) return remoteSession;
  if (!remoteSession) return localSession;

  if (remoteSession.isCompleted && !localSession.isCompleted) {
    return {
      ...localSession,
      isCompleted: true,
      endTime: remoteSession.endTime ?? localSession.endTime,
      score: remoteSession.score ?? localSession.score,
      answers: { ...(localSession.answers || {}), ...(remoteSession.answers || {}) },
      questionIds: remoteSession.questionIds || localSession.questionIds,
      questions: remoteSession.questions?.length ? remoteSession.questions : localSession.questions
    };
  }

  if (localSession.isCompleted && !remoteSession.isCompleted) {
    return localSession;
  }

  const localEnd = localSession.endTime || localSession.startTime || 0;
  const remoteEnd = remoteSession.endTime || remoteSession.startTime || 0;
  return remoteEnd >= localEnd ? remoteSession : localSession;
}

function mergeById(localItems, remoteItems, pickNewer) {
  const map = new Map();
  for (const item of localItems || []) {
    if (item?.id) map.set(item.id, item);
  }
  for (const remoteItem of remoteItems || []) {
    if (!remoteItem?.id) continue;
    const localItem = map.get(remoteItem.id);
    map.set(remoteItem.id, localItem ? pickNewer(localItem, remoteItem) : remoteItem);
  }
  return Array.from(map.values());
}

export function mergeSyncPayload(localPayload, remotePayload) {
  if (!localPayload) return remotePayload || null;
  if (!remotePayload) return localPayload;

  const statsMap = new Map();
  for (const stat of localPayload.questionStats || []) {
    if (stat?.questionId) statsMap.set(stat.questionId, stat);
  }
  for (const remoteStat of remotePayload.questionStats || []) {
    if (!remoteStat?.questionId) continue;
    statsMap.set(
      remoteStat.questionId,
      mergeQuestionStats(statsMap.get(remoteStat.questionId), remoteStat)
    );
  }

  const sessionsMap = new Map();
  for (const session of localPayload.examSessions || []) {
    if (session?.sessionId) sessionsMap.set(session.sessionId, session);
  }
  for (const remoteSession of remotePayload.examSessions || []) {
    if (!remoteSession?.sessionId) continue;
    sessionsMap.set(
      remoteSession.sessionId,
      mergeExamSessions(sessionsMap.get(remoteSession.sessionId), remoteSession)
    );
  }

  const customQuestions = mergeById(
    localPayload.customQuestions,
    remotePayload.customQuestions,
    (localItem, remoteItem) =>
      recordTimestamp(remoteItem, ['metadata.created_at']) >=
      recordTimestamp(localItem, ['metadata.created_at'])
        ? remoteItem
        : localItem
  );

  const deletedQuestions = mergeById(
    localPayload.deletedQuestions,
    remotePayload.deletedQuestions,
    (localItem, remoteItem) =>
      (remoteItem.deletedAt || 0) >= (localItem.deletedAt || 0) ? remoteItem : localItem
  );

  const reviewRequests = mergeById(
    localPayload.reviewRequests,
    remotePayload.reviewRequests,
    (localItem, remoteItem) =>
      (remoteItem.requestedAt || 0) >= (localItem.requestedAt || 0) ? remoteItem : localItem
  );

  return {
    app: localPayload.app || remotePayload.app || 'Plegueviation Exam',
    version: localPayload.version || remotePayload.version || '3.1.0',
    syncedAt: Math.max(localPayload.syncedAt || 0, remotePayload.syncedAt || 0, Date.now()),
    deviceId: localPayload.deviceId || remotePayload.deviceId,
    questionStats: Array.from(statsMap.values()),
    examSessions: Array.from(sessionsMap.values()),
    customQuestions,
    deletedQuestions,
    reviewRequests
  };
}

export function validateSyncPayload(payload) {
  if (!payload || typeof payload !== 'object') {
    return { valid: false, error: 'Payload vacío o inválido' };
  }
  const requiredArrays = [
    'questionStats',
    'examSessions',
    'customQuestions',
    'deletedQuestions',
    'reviewRequests'
  ];
  for (const key of requiredArrays) {
    if (payload[key] !== undefined && !Array.isArray(payload[key])) {
      return { valid: false, error: `Campo ${key} debe ser un array` };
    }
  }
  if (payload.syncedAt !== undefined && typeof payload.syncedAt !== 'number') {
    return { valid: false, error: 'syncedAt debe ser numérico' };
  }
  return { valid: true };
}

export function normalizeSyncPayload(payload) {
  if (!payload || typeof payload !== 'object') return null;
  return {
    app: payload.app || 'Plegueviation Exam',
    version: payload.version || '3.1.0',
    syncedAt: typeof payload.syncedAt === 'number' ? payload.syncedAt : Date.now(),
    deviceId: payload.deviceId,
    questionStats: Array.isArray(payload.questionStats) ? payload.questionStats : [],
    examSessions: Array.isArray(payload.examSessions) ? payload.examSessions : [],
    customQuestions: Array.isArray(payload.customQuestions) ? payload.customQuestions : [],
    deletedQuestions: Array.isArray(payload.deletedQuestions) ? payload.deletedQuestions : [],
    reviewRequests: Array.isArray(payload.reviewRequests) ? payload.reviewRequests : []
  };
}
