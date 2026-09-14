import { describe, it, expect } from 'vitest';
import {
  mergeQuestionStats,
  mergeSyncPayload,
  mergeExamSessions,
  validateSyncPayload,
  normalizeSyncPayload
} from './syncMerge.js';

describe('mergeQuestionStats', () => {
  it('combina historial sin duplicar timestamps', () => {
    const local = {
      questionId: 'Q1',
      timesAnswered: 1,
      timesCorrect: 0,
      timesIncorrect: 1,
      lastAnsweredAt: 100,
      lastResult: false,
      isFlagged: false,
      history: [{ timestamp: 100, selectedOptionId: 'A', isCorrect: false, timeSpentSeconds: 10, examMode: 'practice' }]
    };
    const remote = {
      questionId: 'Q1',
      timesAnswered: 2,
      timesCorrect: 1,
      timesIncorrect: 1,
      lastAnsweredAt: 200,
      lastResult: true,
      isFlagged: true,
      history: [{ timestamp: 200, selectedOptionId: 'B', isCorrect: true, timeSpentSeconds: 8, examMode: 'practice' }]
    };
    const merged = mergeQuestionStats(local, remote);
    expect(merged.history).toHaveLength(2);
    expect(merged.timesAnswered).toBeGreaterThanOrEqual(2);
    expect(merged.isFlagged).toBe(true);
    expect(merged.lastResult).toBe(true);
  });
});

describe('mergeSyncPayload', () => {
  it('conserva eliminaciones más recientes de cualquier dispositivo', () => {
    const local = {
      syncedAt: 1000,
      questionStats: [],
      examSessions: [],
      customQuestions: [],
      deletedQuestions: [{ id: 'D1', deletedAt: 500, question: { id: 'D1' } }],
      reviewRequests: []
    };
    const remote = {
      syncedAt: 2000,
      questionStats: [],
      examSessions: [],
      customQuestions: [],
      deletedQuestions: [{ id: 'D1', deletedAt: 1500, question: { id: 'D1' } }],
      reviewRequests: []
    };
    const merged = mergeSyncPayload(local, remote);
    expect(merged.deletedQuestions[0].deletedAt).toBe(1500);
  });

  it('une sesiones completadas aunque lleguen compactas', () => {
    const local = {
      syncedAt: 1000,
      questionStats: [],
      examSessions: [{
        sessionId: 'S1',
        isCompleted: false,
        startTime: 100,
        endTime: null,
        answers: { Q1: { selectedOptionId: 'A' } }
      }],
      customQuestions: [],
      deletedQuestions: [],
      reviewRequests: []
    };
    const remote = {
      syncedAt: 2000,
      questionStats: [],
      examSessions: [{
        sessionId: 'S1',
        isCompleted: true,
        startTime: 100,
        endTime: 300,
        score: { percentage: 80, passed: true },
        answers: { Q1: { selectedOptionId: 'A', isCorrect: true } }
      }],
      customQuestions: [],
      deletedQuestions: [],
      reviewRequests: []
    };
    const merged = mergeSyncPayload(local, remote);
    expect(merged.examSessions[0].isCompleted).toBe(true);
    expect(merged.examSessions[0].score.percentage).toBe(80);
  });
});

describe('mergeExamSessions', () => {
  it('prefiere sesión completada frente a borrador local', () => {
    const merged = mergeExamSessions(
      { sessionId: 'S1', isCompleted: false, startTime: 1 },
      { sessionId: 'S1', isCompleted: true, startTime: 1, endTime: 99, score: { percentage: 75 } }
    );
    expect(merged.isCompleted).toBe(true);
  });
});

describe('validateSyncPayload', () => {
  it('acepta payloads legacy sin syncedAt', () => {
    const normalized = normalizeSyncPayload({ questionStats: [], examSessions: [] });
    expect(validateSyncPayload(normalized).valid).toBe(true);
    expect(typeof normalized.syncedAt).toBe('number');
  });
});
