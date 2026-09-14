// shared/api/syncHandler.js — Handler sync con merge servidor, historial, KV persistente y validación
import fs from 'fs';
import path from 'path';
import {
  mergeSyncPayload,
  validateSyncPayload,
  normalizeSyncPayload
} from '../sync/syncMerge.js';
import {
  loadSyncRecord,
  saveSyncRecord,
  getStorageBackend
} from './syncStore.js';

const MAX_PAYLOAD_BYTES = 5 * 1024 * 1024;
const MAX_HISTORY = 3;
const RATE_LIMIT_MS = 750;

const ALLOWED_ORIGINS = new Set([
  'https://pleguejr.github.io',
  'https://plegueviation-exam.vercel.app',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
]);

if (!globalThis._plegueSyncRateLimit) {
  globalThis._plegueSyncRateLimit = new Map();
}

function normalizePin(pin) {
  const p = String(pin || '').trim().toLowerCase();
  if (!p || p === 'plegue' || p === 'plegue-mando' || p === 'pleguejr' || p === '070707') {
    return '070707';
  }
  return p;
}

function resolveCorsOrigin(req) {
  const origin = req.headers.origin;
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

function getBootstrapFallback() {
  const possiblePaths = [
    path.join(process.cwd(), 'banks', 'user_backup_070707.json')
  ];
  for (const p of possiblePaths) {
    try {
      if (fs.existsSync(p)) {
        return JSON.parse(fs.readFileSync(p, 'utf-8'));
      }
    } catch {
      // ignore
    }
  }
  return null;
}

function unwrapStoredRecord(stored) {
  if (!stored) return null;
  if (stored.data && typeof stored.data === 'object') return stored;
  return {
    syncedAt: stored.syncedAt || 0,
    data: stored,
    history: []
  };
}

function pushHistory(record) {
  const history = Array.isArray(record.history) ? [...record.history] : [];
  history.unshift({
    syncedAt: record.syncedAt,
    savedAt: Date.now(),
    data: record.data
  });
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
      bootstrap: Boolean(body.bootstrap),
      clientSyncedAt: typeof body.clientSyncedAt === 'number' ? body.clientSyncedAt : 0
    };
  }
  if (req.method === 'GET') {
    return {
      action: 'fetch',
      pin: req.query?.pin,
      bootstrap: req.query?.bootstrap === 'true',
      clientSyncedAt: 0
    };
  }
  return {
    action: 'upload',
    pin: body.pin || req.query?.pin,
    data: body.data !== undefined ? body.data : body,
    bootstrap: false,
    clientSyncedAt: typeof body.clientSyncedAt === 'number' ? body.clientSyncedAt : 0
  };
}

async function fetchRemoteData(cleanPin, bootstrap) {
  const storedRaw = await loadSyncRecord(cleanPin);
  const stored = unwrapStoredRecord(storedRaw);
  if (stored?.data) {
    return { record: stored, data: stored.data };
  }

  if (bootstrap && cleanPin === '070707' && getStorageBackend() === 'memory') {
    const fallback = getBootstrapFallback();
    if (fallback) {
      const record = {
        syncedAt: fallback.syncedAt || Date.now(),
        data: fallback,
        history: []
      };
      await saveSyncRecord('070707', record, ['plegue', 'plegue-mando']);
      return { record, data: fallback };
    }
  }

  return { record: null, data: null };
}

export default async function syncHandler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', resolveCorsOrigin(req));
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET' && req.method !== 'POST' && req.method !== 'PUT') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const parsed = readPayload(req);
  const cleanPin = normalizePin(parsed.pin);
  if (!cleanPin) {
    return res.status(400).json({ error: 'PIN requerido' });
  }

  if (isRateLimited(cleanPin)) {
    return res.status(429).json({ error: 'Demasiadas solicitudes. Espera un momento.' });
  }

  const storageBackend = getStorageBackend();

  if (parsed.action === 'fetch') {
    const { record, data } = await fetchRemoteData(cleanPin, parsed.bootstrap);
    return res.status(200).json({
      found: Boolean(data),
      data,
      serverSyncedAt: record?.syncedAt || 0,
      historyCount: record?.history?.length || 0,
      storageBackend
    });
  }

  const incoming = normalizeSyncPayload(parsed.data);
  if (!incoming) {
    return res.status(400).json({ error: 'Payload vacío o inválido' });
  }
  const validation = validateSyncPayload(incoming);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  const serialized = JSON.stringify(incoming);
  if (serialized.length > MAX_PAYLOAD_BYTES) {
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
}
