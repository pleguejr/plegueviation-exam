import { mergeSyncPayload, validateSyncPayload, normalizeSyncPayload } from '@plegue/core-engine';
import { db, getAllStatsMap, saveSyncSnapshot } from './db';
import { QuestionStats, ExamSession, SyncPayload } from '../types';

const SYNC_PIN_STORAGE_KEY = 'plegue_sync_pin';
const LAST_SYNC_STORAGE_KEY = 'plegue_last_sync_timestamp';
const DEVICE_ID_STORAGE_KEY = 'plegue_device_id';
const SYNC_VERSION = '3.1.0';

const PRIMARY_ENDPOINT = '/api/sync';
const VERCEL_FALLBACK_ENDPOINT = 'https://plegueviation-exam.vercel.app/api/sync';

let syncInFlight: Promise<{ success: boolean; message: string; syncedAt?: number }> | null = null;

export function getStoredSyncPin(): string {
  const pin = localStorage.getItem(SYNC_PIN_STORAGE_KEY)?.trim().toLowerCase();
  if (!pin || pin === 'plegue' || pin === 'plegue-mando' || pin === 'pleguejr') {
    return '070707';
  }
  return pin;
}

export function setStoredSyncPin(pin: string): void {
  const cleanPin = pin.trim().toLowerCase();
  if (cleanPin) {
    localStorage.setItem(SYNC_PIN_STORAGE_KEY, cleanPin);
  } else {
    localStorage.removeItem(SYNC_PIN_STORAGE_KEY);
  }
}

export function getLastSyncTimestamp(): number | null {
  const saved = localStorage.getItem(LAST_SYNC_STORAGE_KEY);
  return saved ? parseInt(saved, 10) : null;
}

export function setLastSyncTimestamp(ts: number): void {
  localStorage.setItem(LAST_SYNC_STORAGE_KEY, ts.toString());
}

export function getDeviceId(): string {
  let deviceId = localStorage.getItem(DEVICE_ID_STORAGE_KEY);
  if (!deviceId) {
    deviceId = `dev_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(DEVICE_ID_STORAGE_KEY, deviceId);
  }
  return deviceId;
}

export async function getLocalPayload(): Promise<SyncPayload> {
  const [stats, sessions, custom, deleted, reviews] = await Promise.all([
    db.questionStats.toArray(),
    db.examSessions.toArray(),
    db.customQuestions.toArray(),
    db.deletedQuestions.toArray(),
    db.reviewRequests.toArray()
  ]);

  const compactSessions = sessions.map((sess) => ({
    sessionId: sess.sessionId,
    config: sess.config,
    startTime: sess.startTime,
    endTime: sess.endTime,
    isCompleted: sess.isCompleted,
    score: sess.score,
    questionIds: (sess.questions || []).map((q) => q.id),
    answers: sess.answers || {}
  }));

  return {
    app: 'Plegueviation Exam',
    version: SYNC_VERSION,
    syncedAt: Date.now(),
    deviceId: getDeviceId(),
    questionStats: stats,
    examSessions: compactSessions,
    customQuestions: custom,
    deletedQuestions: deleted,
    reviewRequests: reviews
  };
}

export async function mergeRemoteData(remoteData: SyncPayload | null | undefined): Promise<{
  mergedStatsCount: number;
  mergedSessionsCount: number;
  mergedCustomCount: number;
  mergedDeletedCount: number;
  mergedReviewsCount: number;
}> {
  if (!remoteData || typeof remoteData !== 'object') {
    return {
      mergedStatsCount: 0,
      mergedSessionsCount: 0,
      mergedCustomCount: 0,
      mergedDeletedCount: 0,
      mergedReviewsCount: 0
    };
  }

  const localPayload = await getLocalPayload();
  const merged = mergeSyncPayload(localPayload, remoteData) as SyncPayload;

  const beforeStats = await db.questionStats.count();
  const beforeSessions = await db.examSessions.count();
  const beforeCustom = await db.customQuestions.count();
  const beforeDeleted = await db.deletedQuestions.count();
  const beforeReviews = await db.reviewRequests.count();

  for (const stat of merged.questionStats || []) {
    if (stat?.questionId) await db.questionStats.put(stat as QuestionStats);
  }

  for (const remoteSess of merged.examSessions || []) {
    if (!remoteSess.sessionId) continue;
    const localSess = await db.examSessions.get(remoteSess.sessionId);
    const fullSession: ExamSession = {
      sessionId: remoteSess.sessionId,
      config: remoteSess.config || { categories: [], count: 20, mode: 'practice', strategy: 'random', passMarkPercentage: 75 },
      startTime: remoteSess.startTime || Date.now(),
      endTime: remoteSess.endTime || null,
      currentIndex: localSess?.currentIndex || 0,
      questions: localSess?.questions?.length ? localSess.questions : remoteSess.questions || [],
      answers: remoteSess.answers || localSess?.answers || {},
      isCompleted: remoteSess.isCompleted !== false,
      score: remoteSess.score ?? localSess?.score ?? null
    };
    await db.examSessions.put(fullSession);
  }

  for (const question of merged.customQuestions || []) {
    if (question?.id) await db.customQuestions.put(question);
  }

  for (const deleted of merged.deletedQuestions || []) {
    if (!deleted?.id) continue;
    await db.deletedQuestions.put(deleted);
    await db.customQuestions.delete(deleted.id);
  }

  for (const review of merged.reviewRequests || []) {
    if (review?.id) await db.reviewRequests.put(review);
  }

  const afterStats = await db.questionStats.count();
  const afterSessions = await db.examSessions.count();
  const afterCustom = await db.customQuestions.count();
  const afterDeleted = await db.deletedQuestions.count();
  const afterReviews = await db.reviewRequests.count();

  return {
    mergedStatsCount: Math.max(0, afterStats - beforeStats),
    mergedSessionsCount: Math.max(0, afterSessions - beforeSessions),
    mergedCustomCount: Math.max(0, afterCustom - beforeCustom),
    mergedDeletedCount: Math.max(0, afterDeleted - beforeDeleted),
    mergedReviewsCount: Math.max(0, afterReviews - beforeReviews)
  };
}

async function apiFetch(url: string, options: RequestInit = {}, timeoutMs = 12000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(options.headers || {})
      },
      signal: controller.signal
    });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

async function fetchRemotePayload(
  endpoints: string[],
  activePin: string,
  bootstrap: boolean
): Promise<{ payload: SyncPayload | null; endpoint: string | null; serverSyncedAt: number }> {
  for (const ep of endpoints) {
    try {
      const res = await apiFetch(ep, {
        method: 'POST',
        body: JSON.stringify({
          action: 'fetch',
          pin: activePin,
          bootstrap
        })
      });
      const ct = res.headers.get('content-type') || '';
      if (res.ok && ct.includes('application/json')) {
        const json = await res.json();
        if (json?.found && json.data) {
          return {
            payload: json.data as SyncPayload,
            endpoint: ep,
            serverSyncedAt: json.serverSyncedAt || 0
          };
        }
        return { payload: null, endpoint: ep, serverSyncedAt: json.serverSyncedAt || 0 };
      }
    } catch {
      // Probar siguiente endpoint
    }
  }
  return { payload: null, endpoint: null, serverSyncedAt: 0 };
}

async function hasLocalProgress(): Promise<boolean> {
  const [statsCount, sessionsCount, customCount, deletedCount, reviewsCount] = await Promise.all([
    db.questionStats.count(),
    db.examSessions.count(),
    db.customQuestions.count(),
    db.deletedQuestions.count(),
    db.reviewRequests.count()
  ]);
  return statsCount + sessionsCount + customCount + deletedCount + reviewsCount > 0;
}

async function performCloudSync(pin?: string): Promise<{
  success: boolean;
  message: string;
  syncedAt?: number;
}> {
  const activePin = (pin || getStoredSyncPin())?.trim().toLowerCase();
  if (!activePin) {
    return { success: false, message: 'No hay ningún código PIN de enlace configurado.' };
  }

  if (!navigator.onLine) {
    return { success: false, message: 'Sin conexión a internet. Se sincronizará automáticamente al reconectar.' };
  }

  const endpoints = [PRIMARY_ENDPOINT, VERCEL_FALLBACK_ENDPOINT];
  const localHasData = await hasLocalProgress();
  const bootstrap = !localHasData;

  await saveSyncSnapshot('pre-sync');

  const { payload: remotePayload, endpoint: successfulEndpoint } = await fetchRemotePayload(
    endpoints,
    activePin,
    bootstrap
  );

  if (remotePayload) {
    const normalized = normalizeSyncPayload(remotePayload);
    const validation = validateSyncPayload(normalized);
    if (validation.valid && normalized) {
      await mergeRemoteData(normalized as SyncPayload);
    }
  }

  const finalPayload = await getLocalPayload();
  const targetEndpoints = successfulEndpoint ? [successfulEndpoint] : endpoints;
  let uploadSuccess = false;
  let syncedAt = finalPayload.syncedAt;

  for (const ep of targetEndpoints) {
    try {
      const res = await apiFetch(ep, {
        method: 'POST',
        body: JSON.stringify({
          action: 'upload',
          pin: activePin,
          clientSyncedAt: getLastSyncTimestamp() || 0,
          data: finalPayload
        })
      });
      const ct = res.headers.get('content-type') || '';
      if (res.ok && ct.includes('application/json')) {
        const json = await res.json();
        if (json?.success) {
          uploadSuccess = true;
          syncedAt = json.syncedAt || syncedAt;
          break;
        }
      }
    } catch {
      // Probar siguiente endpoint
    }
  }

  if (uploadSuccess) {
    setLastSyncTimestamp(syncedAt);
    return {
      success: true,
      message: 'Sincronización completada exitosamente.',
      syncedAt
    };
  }

  return {
    success: false,
    message: 'No se pudo conectar con el servidor de sincronización. Tus datos locales están intactos.'
  };
}

export async function syncWithCloud(pin?: string): Promise<{
  success: boolean;
  message: string;
  syncedAt?: number;
}> {
  if (syncInFlight) {
    return syncInFlight;
  }

  syncInFlight = performCloudSync(pin).finally(() => {
    syncInFlight = null;
  });

  return syncInFlight;
}
