/**
 * api/sync.js — Serverless sync endpoint (self-contained for Vercel).
 * No external imports: Vercel file-tracing often fails on ../shared from Vite apps.
 */

const MAX_PAYLOAD_BYTES = 5 * 1024 * 1024;
const MAX_HISTORY = 3;
const RATE_LIMIT_MS = 750;
const KEY_PREFIX = 'plegue:sync:';

const ALLOWED_ORIGINS = new Set([
  'https://pleguejr.github.io',
  'https://plegueviation-exam.vercel.app',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
]);

if (!globalThis._plegueSyncStore) globalThis._plegueSyncStore = new Map();
if (!globalThis._plegueSyncRateLimit) globalThis._plegueSyncRateLimit = new Map();

function normalizePin(pin) {
  const p = String(pin || '').trim().toLowerCase();
  if (!p || p === 'plegue' || p === 'plegue-mando' || p === 'pleguejr' || p === '070707') {
    return '070707';
  }
  return p;
}

function resolveCorsOrigin(req) {
  const origin = req.headers?.origin;
  if (origin && ALLOWED_ORIGINS.has(origin)) return origin;
  return 'https://pleguejr.github.io';
}

function isRateLimited(pin) {
  const now = Date.now();
  const last = globalThis._plegueSyncRateLimit.get(pin) || 0;
  if (now - last < RATE_LIMIT_MS) return true;
  globalThis._plegueSyncRateLimit.set(pin, now);
  return false;
}

function getKvConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || '';
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || '';
  if (url && token) return { url: url.replace(/\/$/, ''), token };
  return null;
}

function getStorageBackend() {
  return getKvConfig() ? 'kv' : 'memory';
}

function storageKey(pin) {
  return `${KEY_PREFIX}${pin}`;
}

async function kvCommand(command) {
  const cfg = getKvConfig();
  if (!cfg) return null;
  const res = await fetch(cfg.url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(command)
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`KV ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

async function loadSyncRecord(pin) {
  const cached = globalThis._plegueSyncStore.get(pin);
  if (cached) return cached;
  if (!getKvConfig()) return null;
  try {
    const json = await kvCommand(['GET', storageKey(pin)]);
    if (!json?.result) return null;
    const record = typeof json.result === 'string' ? JSON.parse(json.result) : json.result;
    if (record) globalThis._plegueSyncStore.set(pin, record);
    return record;
  } catch (err) {
    console.error('[sync] KV read failed:', err.message);
    return null;
  }
}

async function saveSyncRecord(pin, record, aliasPins = []) {
  globalThis._plegueSyncStore.set(pin, record);
  for (const alias of aliasPins) globalThis._plegueSyncStore.set(alias, record);
  if (!getKvConfig()) return { persisted: false, backend: 'memory' };
  try {
    await kvCommand(['SET', storageKey(pin), JSON.stringify(record)]);
    return { persisted: true, backend: 'kv' };
  } catch (err) {
    console.error('[sync] KV write failed:', err.message);
    return { persisted: false, backend: 'memory', error: err.message };
  }
}

function mergeQuestionStats(localStat, remoteStat) {
  if (!localStat) return remoteStat;
  if (!remoteStat) return localStat;
  const combinedHistory = [...(localStat.history || []), ...(remoteStat.history || [])];
  const uniqueHistoryMap = new Map();
  for (const entry of combinedHistory) {
    if (entry?.timestamp) uniqueHistoryMap.set(entry.timestamp, entry);
  }
  const mergedHistory = Array.from(uniqueHistoryMap.values()).sort((a, b) => a.timestamp - b.timestamp);
  const localLast = localStat.lastAnsweredAt || 0;
  const remoteLast = remoteStat.lastAnsweredAt || 0;
  const localFlash = localStat.flashcardLastViewedAt || 0;
  const remoteFlash = remoteStat.flashcardLastViewedAt || 0;
  return {
    questionId: remoteStat.questionId || localStat.questionId,
    timesAnswered: Math.max(localStat.timesAnswered || 0, remoteStat.timesAnswered || 0, mergedHistory.length),
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

function mergeExamSessions(localSession, remoteSession) {
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
  if (localSession.isCompleted && !remoteSession.isCompleted) return localSession;
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

function mergeSyncPayload(localPayload, remotePayload) {
  if (!localPayload) return remotePayload || null;
  if (!remotePayload) return localPayload;
  const statsMap = new Map();
  for (const stat of localPayload.questionStats || []) {
    if (stat?.questionId) statsMap.set(stat.questionId, stat);
  }
  for (const remoteStat of remotePayload.questionStats || []) {
    if (!remoteStat?.questionId) continue;
    statsMap.set(remoteStat.questionId, mergeQuestionStats(statsMap.get(remoteStat.questionId), remoteStat));
  }
  const sessionsMap = new Map();
  for (const session of localPayload.examSessions || []) {
    if (session?.sessionId) sessionsMap.set(session.sessionId, session);
  }
  for (const remoteSession of remotePayload.examSessions || []) {
    if (!remoteSession?.sessionId) continue;
    sessionsMap.set(remoteSession.sessionId, mergeExamSessions(sessionsMap.get(remoteSession.sessionId), remoteSession));
  }
  return {
    app: localPayload.app || remotePayload.app || 'Plegueviation Exam',
    version: localPayload.version || remotePayload.version || '3.2.2',
    syncedAt: Math.max(localPayload.syncedAt || 0, remotePayload.syncedAt || 0, Date.now()),
    deviceId: localPayload.deviceId || remotePayload.deviceId,
    questionStats: Array.from(statsMap.values()),
    examSessions: Array.from(sessionsMap.values()),
    customQuestions: mergeById(localPayload.customQuestions, remotePayload.customQuestions, (a, b) => b),
    deletedQuestions: mergeById(
      localPayload.deletedQuestions,
      remotePayload.deletedQuestions,
      (a, b) => ((b.deletedAt || 0) >= (a.deletedAt || 0) ? b : a)
    ),
    reviewRequests: mergeById(
      localPayload.reviewRequests,
      remotePayload.reviewRequests,
      (a, b) => ((b.requestedAt || 0) >= (a.requestedAt || 0) ? b : a)
    )
  };
}

function validateSyncPayload(payload) {
  if (!payload || typeof payload !== 'object') return { valid: false, error: 'Payload vacío o inválido' };
  for (const key of ['questionStats', 'examSessions', 'customQuestions', 'deletedQuestions', 'reviewRequests']) {
    if (payload[key] !== undefined && !Array.isArray(payload[key])) {
      return { valid: false, error: `Campo ${key} debe ser un array` };
    }
  }
  if (payload.syncedAt !== undefined && typeof payload.syncedAt !== 'number') {
    return { valid: false, error: 'syncedAt debe ser numérico' };
  }
  return { valid: true };
}

function normalizeSyncPayload(payload) {
  if (!payload || typeof payload !== 'object') return null;
  return {
    app: payload.app || 'Plegueviation Exam',
    version: payload.version || '3.2.2',
    syncedAt: typeof payload.syncedAt === 'number' ? payload.syncedAt : Date.now(),
    deviceId: payload.deviceId,
    questionStats: Array.isArray(payload.questionStats) ? payload.questionStats : [],
    examSessions: Array.isArray(payload.examSessions) ? payload.examSessions : [],
    customQuestions: Array.isArray(payload.customQuestions) ? payload.customQuestions : [],
    deletedQuestions: Array.isArray(payload.deletedQuestions) ? payload.deletedQuestions : [],
    reviewRequests: Array.isArray(payload.reviewRequests) ? payload.reviewRequests : []
  };
}

function unwrapStoredRecord(stored) {
  if (!stored) return null;
  if (stored.data && typeof stored.data === 'object') return stored;
  return { syncedAt: stored.syncedAt || 0, data: stored, history: [] };
}

function pushHistory(record) {
  const history = Array.isArray(record.history) ? [...record.history] : [];
  history.unshift({ syncedAt: record.syncedAt, savedAt: Date.now(), data: record.data });
  record.history = history.slice(0, MAX_HISTORY);
  return record;
}

function readPayload(req) {
  const body = req.body || {};
  if (body.action === 'fetch' || body.action === 'upload') {
    return {
      action: body.action,
      pin: body.pin,
      data: body.data,
      bootstrap: Boolean(body.bootstrap)
    };
  }
  if (req.method === 'GET') {
    return { action: 'fetch', pin: req.query?.pin, bootstrap: req.query?.bootstrap === 'true' };
  }
  return {
    action: 'upload',
    pin: body.pin || req.query?.pin,
    data: body.data !== undefined ? body.data : body,
    bootstrap: false
  };
}

export default async function handler(req, res) {
  try {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', resolveCorsOrigin(req));
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'GET' && req.method !== 'POST' && req.method !== 'PUT') {
      return res.status(405).json({ error: 'Método no permitido' });
    }

    const parsed = readPayload(req);
    const cleanPin = normalizePin(parsed.pin);
    if (!cleanPin) return res.status(400).json({ error: 'PIN requerido' });
    if (isRateLimited(cleanPin)) {
      return res.status(429).json({ error: 'Demasiadas solicitudes. Espera un momento.' });
    }

    const storageBackend = getStorageBackend();

    if (parsed.action === 'fetch') {
      const stored = unwrapStoredRecord(await loadSyncRecord(cleanPin));
      const data = stored?.data || null;
      return res.status(200).json({
        found: Boolean(data),
        data,
        serverSyncedAt: stored?.syncedAt || 0,
        historyCount: stored?.history?.length || 0,
        storageBackend
      });
    }

    const incoming = normalizeSyncPayload(parsed.data);
    if (!incoming) return res.status(400).json({ error: 'Payload vacío o inválido' });
    const validation = validateSyncPayload(incoming);
    if (!validation.valid) return res.status(400).json({ error: validation.error });

    if (JSON.stringify(incoming).length > MAX_PAYLOAD_BYTES) {
      return res.status(413).json({ error: 'Payload demasiado grande' });
    }

    const existing = unwrapStoredRecord(await loadSyncRecord(cleanPin));
    let mergedData = incoming;
    if (existing?.data) {
      mergedData = mergeSyncPayload(existing.data, incoming);
      mergedData.syncedAt = Math.max(
        mergedData.syncedAt || 0,
        existing.syncedAt || 0,
        incoming.syncedAt || 0,
        Date.now()
      );
    } else {
      mergedData = { ...incoming, syncedAt: incoming.syncedAt || Date.now() };
    }

    const nextRecord = pushHistory({
      syncedAt: mergedData.syncedAt,
      data: mergedData,
      history: existing?.history || []
    });

    const aliasPins = cleanPin === '070707' ? ['plegue', 'plegue-mando'] : [];
    const saveResult = await saveSyncRecord(cleanPin, nextRecord, aliasPins);

    return res.status(200).json({
      success: true,
      message: 'Progreso sincronizado en la nube con éxito',
      syncedAt: mergedData.syncedAt,
      merged: Boolean(existing?.data),
      historyCount: nextRecord.history.length,
      storageBackend: saveResult.backend,
      persisted: saveResult.persisted
    });
  } catch (err) {
    console.error('[sync] unhandled:', err);
    return res.status(500).json({ error: 'Error interno de sincronización', detail: String(err?.message || err) });
  }
}
