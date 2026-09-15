import { Question } from '../types';
import { OperationalEvent, OperationalEventSource } from '../types/operationalEvents';
import { db } from './db';
import { importCustomQuestions } from './questionsService';

const SOURCE_LABEL: Record<OperationalEventSource, string> = {
  'vuelo-real': 'Vuelo real',
  simulador: 'Simulador',
  entrenamiento: 'Entrenamiento',
  otro: 'Otro'
};

const FALLBACK_DISTRACTORS = [
  'Continuar sin cambios y revisar el evento solo en tierra si se repite.',
  'Ignorar el evento si no hay mensaje EICAS o aviso activo en ese momento.',
  'Delegar la gestión completa al ATC sin acción de cabina ni coordinación PF/PM.'
];

function newId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `evt-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export async function listOperationalEvents(): Promise<OperationalEvent[]> {
  try {
    const rows = await db.operationalEvents.toArray();
    return rows.sort((a, b) => (b.updatedAt || b.createdAt) - (a.updatedAt || a.createdAt));
  } catch (err) {
    console.warn('Error listing operational events:', err);
    return [];
  }
}

export async function saveOperationalEvent(
  input: Omit<OperationalEvent, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }
): Promise<OperationalEvent> {
  const now = Date.now();
  const existing = input.id ? await db.operationalEvents.get(input.id) : undefined;
  const record: OperationalEvent = {
    id: input.id || existing?.id || newId(),
    title: input.title.trim(),
    source: input.source,
    aircraft: input.aircraft.trim() || 'Embraer 195-E2',
    occurredAt: input.occurredAt || new Date().toISOString().slice(0, 10),
    narrative: input.narrative.trim(),
    lesson: input.lesson.trim(),
    tags: (input.tags || []).map((t) => t.trim()).filter(Boolean),
    createdAt: existing?.createdAt || now,
    updatedAt: now,
    linkedQuestionId: input.linkedQuestionId ?? existing?.linkedQuestionId ?? null
  };

  if (!record.title || !record.narrative || !record.lesson) {
    throw new Error('Título, narración y aprendizaje son obligatorios.');
  }

  await db.operationalEvents.put(record);
  return record;
}

export async function deleteOperationalEvent(id: string): Promise<void> {
  await db.operationalEvents.delete(id);
}

function buildQuestionFromEvent(event: OperationalEvent): Question {
  const sourceLabel = SOURCE_LABEL[event.source] || event.source;
  const questionId = event.linkedQuestionId || `viv-${event.id}`;

  return {
    id: questionId,
    subject_id: 'vivencias-ops',
    learning_objective: event.lesson.slice(0, 160),
    stem: `[Vivencia · ${sourceLabel}] ${event.title}\n\nSituación: ${event.narrative}\n\n¿Cuál es el aprendizaje / acción clave a retener?`,
    options: [
      { id: 'a', text: event.lesson, is_correct: true },
      { id: 'b', text: FALLBACK_DISTRACTORS[0], is_correct: false },
      { id: 'c', text: FALLBACK_DISTRACTORS[1], is_correct: false },
      { id: 'd', text: FALLBACK_DISTRACTORS[2], is_correct: false }
    ],
    explanation: {
      text: `Derivado de vivencia operativa (${sourceLabel}). ${event.lesson}`,
      references: [
        `Bitácora operativa · ${event.occurredAt}`,
        event.aircraft,
        ...(event.tags.length ? [`Tags: ${event.tags.join(', ')}`] : [])
      ]
    },
    metadata: {
      tags: ['vivencia', event.source, ...event.tags],
      created_at: new Date().toISOString(),
      difficulty: 0.45
    },
    _category: 'vivencias-ops',
    _subtopic: event.source,
    isCustom: true
  };
}

/**
 * Convierte vivencias en reactivos del banco personalizado (categoría vivencias-ops).
 * Por defecto solo genera las que aún no tienen pregunta vinculada.
 */
export async function createBankFromOperationalEvents(options?: {
  onlyUnlinked?: boolean;
}): Promise<{ created: number; questionIds: string[] }> {
  const onlyUnlinked = options?.onlyUnlinked !== false;
  const events = await listOperationalEvents();
  const targets = onlyUnlinked ? events.filter((e) => !e.linkedQuestionId) : events;

  if (targets.length === 0) {
    return { created: 0, questionIds: [] };
  }

  const questions = targets.map(buildQuestionFromEvent);
  await importCustomQuestions(questions);

  const now = Date.now();
  for (let i = 0; i < targets.length; i++) {
    const event = targets[i];
    const q = questions[i];
    await db.operationalEvents.put({
      ...event,
      linkedQuestionId: q.id,
      updatedAt: now
    });
  }

  return { created: questions.length, questionIds: questions.map((q) => q.id) };
}
