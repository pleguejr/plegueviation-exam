/**
 * algorithms.ts - Algoritmos de selección, filtrado y spaced repetition para Plegueviation Exam
 */

import { Question, QuestionStats, ExamConfig, ExamSelectionStrategy } from './types';

/**
 * Mezcla un array utilizando el algoritmo Fisher-Yates (aleatoriedad uniforme).
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Calcula el ratio de fallo ponderado para el modo de preguntas más falladas.
 */
export function calculateFailureScore(stats?: QuestionStats): number {
  if (!stats || stats.timesAnswered === 0) {
    return 0.5; // Neutral si nunca se ha hecho
  }
  const failRate = stats.timesIncorrect / stats.timesAnswered;
  // Si la última vez se falló, se penaliza aún más
  const lastFailedBonus = stats.lastResult === false ? 0.3 : 0;
  return failRate + lastFailedBonus;
}

/**
 * Filtra y selecciona las preguntas para una sesión de examen según la estrategia seleccionada.
 */
export function selectQuestions(
  allQuestions: Question[],
  statsMap: Record<string, QuestionStats>,
  config: ExamConfig
): Question[] {
  // 1. Filtrar por categorías seleccionadas
  let pool = allQuestions.filter((q) => {
    if (config.categories.length === 0) return true;
    return config.categories.includes(q._category || '') || config.categories.includes(q.subject_id);
  });

  // 2. Filtrar por subtemas si se especificaron
  if (config.subtopics && config.subtopics.length > 0) {
    pool = pool.filter((q) => config.subtopics!.includes(q._subtopic || ''));
  }

  if (pool.length === 0) {
    return [];
  }

  let selected: Question[] = [];

  switch (config.strategy) {
    case 'unseen': {
      // Priorizar preguntas nunca antes respondidas (sistema para no dejar preguntas atrás)
      const unseen = pool.filter((q) => {
        const stats = statsMap[q.id];
        return !stats || stats.timesAnswered === 0;
      });
      const seen = pool.filter((q) => {
        const stats = statsMap[q.id];
        return stats && stats.timesAnswered > 0;
      });

      // Ordenar las vistas por las que se hicieron hace más tiempo
      seen.sort((a, b) => {
        const statsA = statsMap[a.id]?.lastAnsweredAt || 0;
        const statsB = statsMap[b.id]?.lastAnsweredAt || 0;
        return statsA - statsB;
      });

      selected = [...shuffleArray(unseen), ...seen];
      break;
    }

    case 'most_failed': {
      // Priorizar preguntas con mayor tasa de error o falladas recientemente
      const scored = pool.map((q) => ({
        question: q,
        score: calculateFailureScore(statsMap[q.id]),
        incorrectCount: statsMap[q.id]?.timesIncorrect || 0
      }));

      // Ordenar descendentemente por score de fallo y número de fallos
      scored.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return b.incorrectCount - a.incorrectCount;
      });

      // Tomar los más fallados mezclando ligeramente para variedad
      selected = scored.map((s) => s.question);
      break;
    }

    case 'flagged': {
      // Preguntas marcadas para revisión / favoritas
      selected = pool.filter((q) => statsMap[q.id]?.isFlagged);
      selected = shuffleArray(selected);
      break;
    }

    case 'random':
    default: {
      selected = shuffleArray(pool);
      break;
    }
  }

  // 3. Limitar a la cantidad solicitada (o todas si count <= 0 o mayor al total)
  if (config.count > 0 && selected.length > config.count) {
    selected = selected.slice(0, config.count);
  }

  return selected;
}
