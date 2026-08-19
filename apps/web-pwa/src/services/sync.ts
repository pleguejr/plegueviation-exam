import { db, getAllStatsMap, getExamHistory } from './db';
import { QuestionStats, ExamSession, Question } from '../types';

const SYNC_PIN_STORAGE_KEY = 'plegue_sync_pin';
const LAST_SYNC_STORAGE_KEY = 'plegue_last_sync_timestamp';

// URL base de sincronización (utiliza el endpoint serverless de Vercel con fallback a KV público)
const SYNC_API_ENDPOINT = '/api/sync';
const FALLBACK_KV_BASE = 'https://kvdb.io/4y27V3K9w9g2p8W4pZ2h7x/'; // Free global KV store

export interface SyncStatus {
  pin: string | null;
  lastSyncedAt: number | null;
  isSyncing: boolean;
  error: string | null;
}

export function getStoredSyncPin(): string | null {
  return localStorage.getItem(SYNC_PIN_STORAGE_KEY);
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

/**
 * Empaqueta todos los datos locales actuales para subir a la nube.
 */
export async function getLocalPayload() {
  const [stats, sessions, custom] = await Promise.all([
    db.questionStats.toArray(),
    db.examSessions.toArray(),
    db.customQuestions.toArray()
  ]);

  return {
    app: 'Plegueviation Exam',
    version: '2.0.0',
    syncedAt: Date.now(),
    questionStats: stats,
    examSessions: sessions,
    customQuestions: custom
  };
}

/**
 * Fusiona de forma inteligente los datos remotos con los datos locales (Merge bi-direccional).
 */
export async function mergeRemoteData(remoteData: any): Promise<{
  mergedStatsCount: number;
  mergedSessionsCount: number;
  mergedCustomCount: number;
}> {
  if (!remoteData || typeof remoteData !== 'object') {
    return { mergedStatsCount: 0, mergedSessionsCount: 0, mergedCustomCount: 0 };
  }

  let mergedStatsCount = 0;
  let mergedSessionsCount = 0;
  let mergedCustomCount = 0;

  // 1. Merge de questionStats (toma el que tenga más respuestas o el más reciente)
  if (Array.isArray(remoteData.questionStats)) {
    for (const remoteStat of remoteData.questionStats) {
      if (!remoteStat.questionId) continue;
      const localStat = await db.questionStats.get(remoteStat.questionId);

      if (!localStat) {
        await db.questionStats.put(remoteStat);
        mergedStatsCount++;
      } else {
        // Combinar historiales sin duplicados por timestamp
        const combinedHistory = [...(localStat.history || []), ...(remoteStat.history || [])];
        const uniqueHistoryMap = new Map();
        for (const h of combinedHistory) {
          if (h && h.timestamp) {
            uniqueHistoryMap.set(h.timestamp, h);
          }
        }
        const mergedHistory = Array.from(uniqueHistoryMap.values()).sort((a, b) => a.timestamp - b.timestamp);

        const merged: QuestionStats = {
          questionId: remoteStat.questionId,
          timesAnswered: Math.max(localStat.timesAnswered || 0, remoteStat.timesAnswered || 0, mergedHistory.length),
          timesCorrect: Math.max(localStat.timesCorrect || 0, remoteStat.timesCorrect || 0),
          timesIncorrect: Math.max(localStat.timesIncorrect || 0, remoteStat.timesIncorrect || 0),
          lastAnsweredAt: Math.max(localStat.lastAnsweredAt || 0, remoteStat.lastAnsweredAt || 0) || null,
          lastResult: (remoteStat.lastAnsweredAt || 0) > (localStat.lastAnsweredAt || 0) ? remoteStat.lastResult : localStat.lastResult,
          isFlagged: localStat.isFlagged || remoteStat.isFlagged,
          history: mergedHistory
        };

        await db.questionStats.put(merged);
        mergedStatsCount++;
      }
    }
  }

  // 2. Merge de examSessions (combina sesiones únicas por sessionId)
  if (Array.isArray(remoteData.examSessions)) {
    for (const remoteSess of remoteData.examSessions) {
      if (!remoteSess.sessionId) continue;
      const localSess = await db.examSessions.get(remoteSess.sessionId);
      if (!localSess) {
        await db.examSessions.put(remoteSess);
        mergedSessionsCount++;
      } else if (remoteSess.isCompleted && !localSess.isCompleted) {
        await db.examSessions.put(remoteSess);
        mergedSessionsCount++;
      }
    }
  }

  // 3. Merge de customQuestions
  if (Array.isArray(remoteData.customQuestions)) {
    for (const remoteQ of remoteData.customQuestions) {
      if (!remoteQ.id) continue;
      const localQ = await db.customQuestions.get(remoteQ.id);
      if (!localQ) {
        await db.customQuestions.put(remoteQ);
        mergedCustomCount++;
      }
    }
  }

  return { mergedStatsCount, mergedSessionsCount, mergedCustomCount };
}

/**
 * Realiza una sincronización completa en la nube usando el PIN especificado.
 */
export async function syncWithCloud(pin?: string): Promise<{
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

  try {
    // Paso 1: Intentar leer datos remotos existentes
    let remotePayload: any = null;
    let readSuccess = false;

    // Intento 1: API de Vercel
    try {
      const res = await fetch(`${SYNC_API_ENDPOINT}?pin=${encodeURIComponent(activePin)}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        remotePayload = await res.json();
        readSuccess = true;
      }
    } catch (e) {
      // Continuar con fallback
    }

    // Intento 2 (Fallback si API local no responde, ej. en GitHub Pages o static): KV Store
    if (!readSuccess) {
      try {
        const res = await fetch(`${FALLBACK_KV_BASE}${encodeURIComponent(activePin)}`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          const text = await res.text();
          if (text) {
            remotePayload = JSON.parse(text);
            readSuccess = true;
          }
        }
      } catch (e) {
        // Puede ser primer uso sin datos previos
      }
    }

    // Paso 2: Si hay datos remotos, fusionarlos con los locales
    if (remotePayload) {
      await mergeRemoteData(remotePayload);
    }

    // Paso 3: Obtener el estado fusionado final y subirlo a la nube
    const finalPayload = await getLocalPayload();
    const payloadStr = JSON.stringify(finalPayload);
    let writeSuccess = false;

    // Subida a API Vercel
    try {
      const res = await fetch(SYNC_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: activePin, data: finalPayload })
      });
      if (res.ok) {
        writeSuccess = true;
      }
    } catch (e) {
      // Continuar con fallback
    }

    // Subida a KV Store
    try {
      const res = await fetch(`${FALLBACK_KV_BASE}${encodeURIComponent(activePin)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payloadStr
      });
      if (res.ok) {
        writeSuccess = true;
      }
    } catch (e) {
      // Error de subida fallback
    }

    if (writeSuccess || readSuccess) {
      const now = Date.now();
      setLastSyncTimestamp(now);
      return {
        success: true,
        message: 'Sincronización completada exitosamente.',
        syncedAt: now
      };
    } else {
      return {
        success: false,
        message: 'No se pudo contactar con el servidor de sincronización.'
      };
    }
  } catch (err: any) {
    console.warn('Error during cloud sync:', err);
    return {
      success: false,
      message: `Error al sincronizar: ${err?.message || err}`
    };
  }
}
