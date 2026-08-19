import { db, getAllStatsMap, getExamHistory } from './db';
import { QuestionStats, ExamSession, Question } from '../types';

const SYNC_PIN_STORAGE_KEY = 'plegue_sync_pin';
const LAST_SYNC_STORAGE_KEY = 'plegue_last_sync_timestamp';

// Endpoints de sincronización (relativo para Vercel, absoluto como fallback para GitHub Pages y Localhost)
const PRIMARY_ENDPOINT = '/api/sync';
const VERCEL_PRODUCTION_ENDPOINT = 'https://plegueviation-exam.vercel.app/api/sync';

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
 * Realiza una petición fetch con timeout seguro.
 */
async function safeFetch(url: string, options: RequestInit, timeoutMs = 8000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
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

  const endpointsToTry = [
    PRIMARY_ENDPOINT,
    VERCEL_PRODUCTION_ENDPOINT
  ];

  let remotePayload: any = null;
  let successfulEndpoint: string | null = null;

  // Paso 1: Intentar leer datos de la nube
  for (const endpoint of endpointsToTry) {
    try {
      const url = `${endpoint}?pin=${encodeURIComponent(activePin)}`;
      const res = await safeFetch(url, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });

      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const json = await res.json();
        // Si la API devuelve { found: true, data: {...} } o directamente el payload
        remotePayload = json.data !== undefined ? json.data : json;
        successfulEndpoint = endpoint;
        break;
      }
    } catch (e) {
      // Probar siguiente endpoint
    }
  }

  // Paso 2: Si encontramos datos remotos, fusionarlos con los locales
  if (remotePayload) {
    await mergeRemoteData(remotePayload);
  }

  // Paso 3: Obtener el estado local final (fusionado) y subirlo a la nube
  const finalPayload = await getLocalPayload();
  let uploadSuccess = false;

  const targetEndpoints = successfulEndpoint ? [successfulEndpoint] : endpointsToTry;

  for (const endpoint of targetEndpoints) {
    try {
      const res = await safeFetch(endpoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          pin: activePin, 
          data: finalPayload 
        })
      });

      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        uploadSuccess = true;
        break;
      }
    } catch (e) {
      // Probar siguiente endpoint
    }
  }

  if (uploadSuccess) {
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
      message: 'No se pudo conectar con el servidor de sincronización. Vercel se está actualizando; prueba de nuevo en unos segundos.'
    };
  }
}
