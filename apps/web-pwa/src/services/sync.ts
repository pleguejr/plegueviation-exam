import { db, getAllStatsMap, getExamHistory } from './db';
import { QuestionStats, ExamSession, Question } from '../types';

const SYNC_PIN_STORAGE_KEY = 'plegue_sync_pin';
const LAST_SYNC_STORAGE_KEY = 'plegue_last_sync_timestamp';

// Infraestructura de Cloud Sync Global (API REST directa con alta disponibilidad y soporte CORS completo)
const REST_API_BASE = 'https://api.restful-api.dev/objects';
const MASTER_REGISTRY_ID = 'ff8081819ff5b11001a01b65c491544b';

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
 * Realiza una petición fetch con timeout de seguridad (8s)
 */
async function apiFetch(url: string, options: RequestInit = {}, timeoutMs = 8000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
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
    // Paso 1: Consultar el Registro Maestro de PINs en la nube
    let masterPinsMap: Record<string, string> = {};
    try {
      const regRes = await apiFetch(`${REST_API_BASE}/${MASTER_REGISTRY_ID}`, { method: 'GET' });
      if (regRes.ok) {
        const regJson = await regRes.json();
        masterPinsMap = regJson.data?.pins || {};
      }
    } catch (e) {
      console.warn('Error reading master registry:', e);
    }

    let docId = masterPinsMap[activePin];
    let remotePayload: any = null;

    // Paso 2: Si el PIN ya existe en la nube, descargar y fusionar sus datos
    if (docId) {
      try {
        const docRes = await apiFetch(`${REST_API_BASE}/${docId}`, { method: 'GET' });
        if (docRes.ok) {
          const docJson = await docRes.json();
          remotePayload = docJson.data;
        }
      } catch (e) {
        console.warn('Error reading remote data doc:', e);
      }
    }

    if (remotePayload) {
      await mergeRemoteData(remotePayload);
    }

    // Paso 3: Obtener el estado local final (fusionado) y subirlo a la nube
    const finalPayload = await getLocalPayload();
    let savedSuccessfully = false;

    if (docId) {
      // Actualizar documento existente
      const putRes = await apiFetch(`${REST_API_BASE}/${docId}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: `plegue-sync-${activePin}`,
          data: finalPayload
        })
      });
      if (putRes.ok) {
        savedSuccessfully = true;
      }
    }

    // Si no existía o falló el PUT, crear nuevo documento y registrarlo
    if (!savedSuccessfully) {
      const postRes = await apiFetch(REST_API_BASE, {
        method: 'POST',
        body: JSON.stringify({
          name: `plegue-sync-${activePin}`,
          data: finalPayload
        })
      });

      if (postRes.ok) {
        const newDocJson = await postRes.json();
        docId = newDocJson.id;
        savedSuccessfully = true;

        // Actualizar el Registro Maestro con el nuevo PIN -> docId
        masterPinsMap[activePin] = docId;
        try {
          await apiFetch(`${REST_API_BASE}/${MASTER_REGISTRY_ID}`, {
            method: 'PUT',
            body: JSON.stringify({
              name: 'plegueviation-master-registry-v1',
              data: { pins: masterPinsMap }
            })
          });
        } catch (regErr) {
          console.warn('Error updating master registry with new PIN:', regErr);
        }
      }
    }

    if (savedSuccessfully) {
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
        message: 'No se pudo guardar los datos en la nube. Revisa tu conexión a internet.'
      };
    }
  } catch (err: any) {
    console.error('Error during cloud sync:', err);
    return {
      success: false,
      message: `Error al sincronizar: ${err?.message || err}`
    };
  }
}
