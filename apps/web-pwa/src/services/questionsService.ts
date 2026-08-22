import { Question, BankManifest, QuestionStats, ExamConfig, Option, DeletedQuestion } from '../types';
import { db, getAllStatsMap, getDeletedQuestionIds, deleteQuestion, restoreQuestion, getDeletedQuestions } from './db';

let cachedQuestions: Question[] | null = null;
let cachedManifest: BankManifest | null = null;

/**
 * Carga el catálogo completo de preguntas activas (empaquetadas + custom),
 * excluyendo permanentemente todas aquellas registradas en la lista de eliminadas.
 */
export async function loadAllQuestions(forceRefresh = false): Promise<Question[]> {
  if (forceRefresh) {
    cachedQuestions = null;
    cachedManifest = null;
  } else if (cachedQuestions) {
    return cachedQuestions;
  }

  let bundled: Question[] = [];
  try {
    const baseUrl = import.meta.env.BASE_URL || './';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const res = await fetch(`${cleanBase}banks/all_questions.json?t=${Date.now()}`);
    if (res.ok) {
      bundled = await res.json();
    }
  } catch (err) {
    console.warn('No se pudieron cargar preguntas remotas, usando base local:', err);
  }

  // Cargar preguntas personalizadas de IndexedDB y el set de IDs eliminadas
  const [custom, deletedIds] = await Promise.all([
    db.customQuestions.toArray(),
    getDeletedQuestionIds()
  ]);
  const customMarked = custom.map((q) => ({ ...q, isCustom: true }));

  // Unir y filtrar IDs repetidos (prioridad a custom)
  const map = new Map<string, Question>();
  for (const q of bundled) {
    if (!deletedIds.has(q.id)) {
      map.set(q.id, q);
    }
  }
  for (const q of customMarked) {
    if (!deletedIds.has(q.id)) {
      map.set(q.id, q);
    }
  }

  cachedQuestions = Array.from(map.values());
  return cachedQuestions;
}


/**
 * Carga el manifiesto de categorías.
 */
export async function loadManifest(forceRefresh = false): Promise<BankManifest> {
  if (!forceRefresh && cachedManifest) return cachedManifest;
  try {
    const baseUrl = import.meta.env.BASE_URL || './';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const res = await fetch(`${cleanBase}banks/manifest.json?t=${Date.now()}`);
    if (res.ok) {
      cachedManifest = await res.json();
      return cachedManifest!;
    }
  } catch (err) {
    console.warn('Error cargando manifest:', err);
  }

  return {
    app: 'Plegueviation Exam',
    version: '1.0.0',
    generated_at: new Date().toISOString(),
    total_questions: cachedQuestions?.length || 0,
    categories: []
  };
}

/**
 * Mezcla Fisher-Yates genérica.
 */
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Mezcla y reasigna las opciones A, B, C, D de forma aleatoria para que la respuesta correcta
 * no aparezca siempre en la misma posición y cambie cada vez que se realice el test.
 */
export function randomizeQuestionOptions(question: Question): Question {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  const shuffledOpts = shuffle(question.options);
  const remappedOpts = shuffledOpts.map((opt, idx) => ({
    ...opt,
    id: letters[idx] || String.fromCharCode(65 + idx)
  }));

  return {
    ...question,
    options: remappedOpts
  };
}

/**
 * Genera el pool de preguntas para una sesión según la configuración,
 * aleatorizando tanto el orden de las preguntas como el orden de las opciones A, B, C, D.
 */
export async function generateExamQuestions(config: ExamConfig): Promise<Question[]> {
  const all = await loadAllQuestions();
  const statsMap = await getAllStatsMap();

  // 1. Filtrar por categorías
  let pool = all.filter((q) => {
    if (config.categories.length === 0) return true;
    return config.categories.includes(q._category || '') || config.categories.includes(q.subject_id);
  });

  // 2. Filtrar por subtemas si aplica
  if (config.subtopics && config.subtopics.length > 0) {
    pool = pool.filter((q) => config.subtopics!.includes(q._subtopic || ''));
  }

  if (pool.length === 0) return [];

  let selected: Question[] = [];

  switch (config.strategy) {
    case 'unseen': {
      // Priorizar preguntas nunca antes respondidas
      const unseen = pool.filter((q) => {
        const s = statsMap[q.id];
        return !s || s.timesAnswered === 0;
      });
      const seen = pool.filter((q) => {
        const s = statsMap[q.id];
        return s && s.timesAnswered > 0;
      });

      seen.sort((a, b) => {
        const tA = statsMap[a.id]?.lastAnsweredAt || 0;
        const tB = statsMap[b.id]?.lastAnsweredAt || 0;
        return tA - tB;
      });

      selected = [...shuffle(unseen), ...seen];
      break;
    }

    case 'most_failed': {
      // Priorizar preguntas con más fallos
      const scored = pool.map((q) => {
        const s = statsMap[q.id];
        let score = 0;
        if (s && s.timesAnswered > 0) {
          const failRate = s.timesIncorrect / s.timesAnswered;
          const lastFailed = s.lastResult === false ? 0.35 : 0;
          score = failRate + lastFailed + (s.timesIncorrect * 0.1);
        }
        return { question: q, score, incorrect: s?.timesIncorrect || 0 };
      });

      scored.sort((a, b) => b.score - a.score || b.incorrect - a.incorrect);
      selected = scored.map((x) => x.question);
      break;
    }

    case 'flagged': {
      selected = pool.filter((q) => statsMap[q.id]?.isFlagged);
      selected = shuffle(selected);
      break;
    }

    case 'random':
    default: {
      selected = shuffle(pool);
      break;
    }
  }

  // Si count es mayor que 0, recortar
  if (config.count > 0 && selected.length > config.count) {
    selected = selected.slice(0, config.count);
  }

  // Aleatorizar opciones A, B, C, D para cada pregunta seleccionada
  return selected.map(randomizeQuestionOptions);
}

/**
 * Importa y persiste reactivos en la base de datos IndexedDB local.
 */
export async function importCustomQuestions(questions: Question[]): Promise<number> {
  let count = 0;
  for (const q of questions) {
    await db.customQuestions.put({ ...q, isCustom: true });
    count++;
  }
  cachedQuestions = null;
  return count;
}

/**
 * Elimina una pregunta del banco activo, la añade al registro de eliminadas
 * y purga la caché para evitar que vuelva a salir en futuros exámenes.
 */
export async function deleteQuestionFromBank(question: Question, reason?: string): Promise<void> {
  await deleteQuestion(question, reason);
  cachedQuestions = null;
}

/**
 * Restaura una pregunta previamente eliminada, haciéndola disponible de nuevo en el banco.
 */
export async function restoreQuestionToBank(questionId: string): Promise<boolean> {
  const success = await restoreQuestion(questionId);
  if (success) {
    cachedQuestions = null;
  }
  return success;
}

/**
 * Carga la lista completa de preguntas eliminadas.
 */
export async function loadDeletedQuestions(): Promise<DeletedQuestion[]> {
  return await getDeletedQuestions();
}

