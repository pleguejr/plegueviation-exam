import { Question } from '../types';
import { ComunicadoType, OperationalComunicado } from '../types/operationalComunicados';
import { db } from './db';
import { importCustomQuestions } from './questionsService';

function newId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `com-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function normalizeQuestions(items: Question[], comunicado?: OperationalComunicado): Question[] {
  return items.map((q, idx) => {
    const n = String(idx + 1).padStart(3, '0');
    const refSlug = (comunicado?.reference || 'COM').replace(/[^A-Za-z0-9_-]/g, '').slice(0, 24) || 'COM';
    const id = q.id?.trim() || `BIN-COM-${refSlug}-${n}`;
    return {
      ...q,
      id,
      subject_id: q.subject_id || 'binter_comunicados',
      _category: q._category || 'comunicados-ops',
      _subtopic: q._subtopic || comunicado?.type || 'operaciones',
      isCustom: true,
      metadata: {
        ...(q.metadata || {}),
        tags: Array.from(
          new Set([
            ...(q.metadata?.tags || []),
            'comunicado',
            ...(comunicado?.reference ? [comunicado.reference] : []),
            ...(comunicado?.type ? [comunicado.type] : [])
          ])
        )
      },
      explanation: {
        text: q.explanation?.text || '',
        references: Array.from(
          new Set([
            ...(q.explanation?.references || []),
            ...(comunicado
              ? [`${comunicado.reference || 'Comunicado'} — ${comunicado.title} (${comunicado.issuedAt})`]
              : [])
          ])
        )
      }
    };
  });
}

export async function listOperationalComunicados(): Promise<OperationalComunicado[]> {
  try {
    const rows = await db.operationalComunicados.toArray();
    return rows.sort((a, b) => (b.updatedAt || b.createdAt) - (a.updatedAt || a.createdAt));
  } catch (err) {
    console.warn('Error listing comunicados:', err);
    return [];
  }
}

export async function saveOperationalComunicado(
  input: Omit<OperationalComunicado, 'id' | 'createdAt' | 'updatedAt' | 'importedQuestionCount' | 'lastImportAt'> & {
    id?: string;
    importedQuestionCount?: number;
    lastImportAt?: number | null;
    sourceFileName?: string;
    extractedText?: string;
    extractedPages?: number;
  }
): Promise<OperationalComunicado> {
  const now = Date.now();
  const existing = input.id ? await db.operationalComunicados.get(input.id) : undefined;
  const record: OperationalComunicado = {
    id: input.id || existing?.id || newId(),
    title: input.title.trim(),
    type: input.type,
    reference: (input.reference || '').trim(),
    issuedAt: input.issuedAt || new Date().toISOString().slice(0, 10),
    summary: (input.summary || '').trim(),
    createdAt: existing?.createdAt || now,
    updatedAt: now,
    importedQuestionCount: input.importedQuestionCount ?? existing?.importedQuestionCount ?? 0,
    lastImportAt: input.lastImportAt ?? existing?.lastImportAt ?? null,
    sourceFileName: input.sourceFileName ?? existing?.sourceFileName,
    extractedText: input.extractedText ?? existing?.extractedText,
    extractedPages: input.extractedPages ?? existing?.extractedPages
  };

  if (!record.title) {
    throw new Error('El título del comunicado es obligatorio.');
  }

  await db.operationalComunicados.put(record);
  return record;
}

export async function deleteOperationalComunicado(id: string): Promise<void> {
  await db.operationalComunicados.delete(id);
}

export function parseComunicadosJson(rawText: string): Question[] {
  let cleaned = rawText.trim();
  const match = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (match) cleaned = match[1].trim();
  if (!cleaned) throw new Error('Pega el JSON generado por Gemini o NotebookLM.');

  const parsed = JSON.parse(cleaned);
  const items: Question[] = Array.isArray(parsed) ? parsed : [parsed];
  if (items.length === 0) throw new Error('El JSON no contiene preguntas.');

  for (let i = 0; i < items.length; i++) {
    const q = items[i];
    if (!q.stem || !q.options || !q.explanation) {
      throw new Error(`Pregunta #${i + 1} incompleta (requiere stem, options, explanation).`);
    }
    const correctCount = q.options.filter((o) => o.is_correct === true).length;
    if (correctCount !== 1) {
      throw new Error(`Pregunta #${i + 1} tiene ${correctCount} opciones correctas (debe ser exactamente 1).`);
    }
  }

  return items;
}

export async function importComunicadosQuestions(
  rawText: string,
  comunicadoId?: string
): Promise<{ count: number; questionIds: string[]; comunicado?: OperationalComunicado }> {
  const items = parseComunicadosJson(rawText);
  const comunicado = comunicadoId ? await db.operationalComunicados.get(comunicadoId) : undefined;
  const normalized = normalizeQuestions(items, comunicado);
  const count = await importCustomQuestions(normalized);

  let updated = comunicado;
  if (comunicado) {
    updated = {
      ...comunicado,
      importedQuestionCount: (comunicado.importedQuestionCount || 0) + count,
      lastImportAt: Date.now(),
      updatedAt: Date.now()
    };
    await db.operationalComunicados.put(updated);
  }

  return { count, questionIds: normalized.map((q) => q.id), comunicado: updated };
}

export type { ComunicadoType };
