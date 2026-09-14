export function mergeQuestionStats(localStat: any, remoteStat: any): any;
export function mergeExamSessions(localSession: any, remoteSession: any): any;
export function mergeSyncPayload(localPayload: any, remotePayload: any): any;
export function validateSyncPayload(payload: any): { valid: boolean; error?: string };
export function normalizeSyncPayload(payload: any): any;
