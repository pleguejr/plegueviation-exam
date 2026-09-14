import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('syncStore', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    globalThis._plegueSyncStore = new Map();
    process.env = { ...originalEnv };
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    delete process.env.KV_REST_API_URL;
    delete process.env.KV_REST_API_TOKEN;
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.unstubAllGlobals();
  });

  it('uses memory backend when KV env vars are missing', async () => {
    const { getStorageBackend, saveSyncRecord, loadSyncRecord } = await import('./syncStore.js');
    expect(getStorageBackend()).toBe('memory');

    const record = { syncedAt: 123, data: { questionStats: [] }, history: [] };
    const result = await saveSyncRecord('070707', record);
    expect(result.backend).toBe('memory');

    const loaded = await loadSyncRecord('070707');
    expect(loaded).toEqual(record);
  });

  it('persists to KV when credentials are configured', async () => {
    process.env.UPSTASH_REDIS_REST_URL = 'https://kv.example.com';
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token';

    const fetchMock = vi.fn(async (url, init) => {
      if (url.endsWith('/get/plegue%3Async%3A070707')) {
        return { ok: true, json: async () => ({ result: null }) };
      }
      if (url.includes('/set/plegue%3Async%3A070707')) {
        expect(init.method).toBe('POST');
        return { ok: true, json: async () => ({ result: 'OK' }) };
      }
      throw new Error(`Unexpected fetch: ${url}`);
    });
    vi.stubGlobal('fetch', fetchMock);

    const { getStorageBackend, saveSyncRecord } = await import('./syncStore.js');
    expect(getStorageBackend()).toBe('kv');

    const record = { syncedAt: 999, data: { questionStats: [] }, history: [] };
    const result = await saveSyncRecord('070707', record);
    expect(result.persisted).toBe(true);
    expect(result.backend).toBe('kv');
    expect(fetchMock).toHaveBeenCalled();
  });
});
