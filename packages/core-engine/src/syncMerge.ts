/**
 * Reexporta la fusión de sync compartida (JS) para tests y consumo tipado en la PWA.
 */
import {
  mergeQuestionStats,
  mergeExamSessions,
  mergeSyncPayload,
  validateSyncPayload,
  normalizeSyncPayload
} from '../../../shared/sync/syncMerge.js';

export {
  mergeQuestionStats,
  mergeExamSessions,
  mergeSyncPayload,
  validateSyncPayload,
  normalizeSyncPayload
};
