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
    const [resQ, resDel] = await Promise.all([
      fetch(`${cleanBase}banks/all_questions.json`),
      fetch(`${cleanBase}banks/deleted_questions.json`).catch(() => null)
    ]);
    if (resQ && resQ.ok) {
      bundled = await resQ.json();
    }
    if (resDel && resDel.ok) {
      const bundledDeleted = await resDel.json();
      if (Array.isArray(bundledDeleted)) {
        for (const item of bundledDeleted) {
          const dId = item.id || (item.question && item.question.id);
          if (dId) {
            const existing = await db.deletedQuestions.get(dId);
            if (!existing) {
              await db.deletedQuestions.put({
                id: dId,
                question: item.question || item,
                deletedAt: item.deletedAt || Date.now(),
                reason: item.reason || 'Eliminada del catálogo maestro'
              });
              await db.customQuestions.delete(dId);
            }
          }
        }
      }
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
 * Carga el manifiesto de categorías con soporte y fallback 100% offline.
 */
export async function loadManifest(forceRefresh = false): Promise<BankManifest> {
  if (!forceRefresh && cachedManifest && cachedManifest.categories && cachedManifest.categories.length > 0) {
    return cachedManifest;
  }
  try {
    const baseUrl = import.meta.env.BASE_URL || './';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const res = await fetch(`${cleanBase}banks/manifest.json`);
    if (res && res.ok) {
      const parsed = await res.json();
      if (parsed && Array.isArray(parsed.categories) && parsed.categories.length > 0) {
        cachedManifest = parsed;
        return cachedManifest!;
      }
    }
  } catch (err) {
    console.warn('Error cargando manifest remoto, usando generador dinámico:', err);
  }

  // Fallback 100% Offline: Generar categorías en tiempo de ejecución a partir del catálogo de preguntas
  const allQ = await loadAllQuestions();
  const categoryMap: Record<string, { id: string; title: string; icon: string; color: string; total_questions: number; subtopics: Record<string, { id: string; title: string; count: number }> }> = {};

  const titles: Record<string, { title: string; icon: string; color: string }> = {
    'command-upgrade': { title: 'Preparación Prueba de Comandante', icon: 'ShieldCheck', color: 'rose' },
    'fleet-c172n': { title: 'Flota Cessna 172N', icon: 'Compass', color: 'amber' },
    'fleet-p2010tdi': { title: 'Flota Tecnam P2010 TDI', icon: 'Gauge', color: 'indigo' },
    'simulador-e2': { title: 'Simulador E2', icon: 'Cpu', color: 'sky' },
    'binter-ops': { title: 'Binter Ops (MOA/MOB)', icon: 'PlaneTakeoff', color: 'emerald' },
    'fleet-e195e2': { title: 'Flota Embraer 195-E2', icon: 'Plane', color: 'sky' }
  };

  for (const q of allQ) {
    const cat = q._category || q.subject_id || 'command-upgrade';
    if (!categoryMap[cat]) {
      const meta = titles[cat] || { title: cat.replace(/-/g, ' ').toUpperCase(), icon: 'BookOpen', color: 'sky' };
      categoryMap[cat] = {
        id: cat,
        title: meta.title,
        icon: meta.icon,
        color: meta.color,
        total_questions: 0,
        subtopics: {}
      };
    }
    categoryMap[cat].total_questions += 1;
    const sub = q._subtopic || 'general';
    if (!categoryMap[cat].subtopics[sub]) {
      categoryMap[cat].subtopics[sub] = {
        id: sub,
        title: sub.replace(/-/g, ' ').toUpperCase(),
        count: 0
      };
    }
    categoryMap[cat].subtopics[sub].count += 1;
  }

  cachedManifest = {
    app: 'Plegueviation Exam',
    version: '2.0.0',
    generated_at: new Date().toISOString(),
    total_questions: allQ.length,
    categories: Object.values(categoryMap)
  };

  return cachedManifest;
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

