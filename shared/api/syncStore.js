/**
 * shared/api/syncStore.js
 * Almacenamiento persistente de sync (Upstash / Vercel KV) con caché en memoria como L1.
 */

const KEY_PREFIX = 'plegue:sync:';

if (!globalThis._plegueSyncStore) {
  globalThis._plegueSyncStore = new Map();
}

function getKvConfig() {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL ||
    '';
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    '';
  if (url && token) {
    return { url: url.replace(/\/$/, ''), token };
  }
  return null;
}

export function getStorageBackend() {
  return getKvConfig() ? 'kv' : 'memory';
}

function storageKey(pin) {
  return `${KEY_PREFIX}${pin}`;
}

async function kvRequest(path, init = {}) {
  const cfg = getKvConfig();
  if (!cfg) return null;

  const res = await fetch(`${cfg.url}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      ...(init.headers || {})
    }
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`KV ${res.status}: ${text.slice(0, 200)}`);
  }

  return res.json();
}

async function kvGet(pin) {
  const json = await kvRequest(`/get/${encodeURIComponent(storageKey(pin))}`);
  if (!json?.result) return null;
  try {
    return JSON.parse(json.result);
  } catch {
    return null;
  }
}

async function kvSet(pin, record) {
  const body = JSON.stringify(record);
  await kvRequest(`/set/${encodeURIComponent(storageKey(pin))}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
}

export async function loadSyncRecord(pin) {
  const cached = globalThis._plegueSyncStore.get(pin);
  if (cached) return cached;

  const cfg = getKvConfig();
  if (!cfg) return null;

  try {
    const record = await kvGet(pin);
    if (record) {
      globalThis._plegueSyncStore.set(pin, record);
    }
    return record;
  } catch (err) {
    console.error('[syncStore] KV read failed:', err.message);
    return null;
  }
}

export async function saveSyncRecord(pin, record, aliasPins = []) {
  globalThis._plegueSyncStore.set(pin, record);
  for (const alias of aliasPins) {
    globalThis._plegueSyncStore.set(alias, record);
  }

  const cfg = getKvConfig();
  if (!cfg) return { persisted: false, backend: 'memory' };

  try {
    await kvSet(pin, record);
    return { persisted: true, backend: 'kv' };
  } catch (err) {
    console.error('[syncStore] KV write failed:', err.message);
    return { persisted: false, backend: 'memory', error: err.message };
  }
}
