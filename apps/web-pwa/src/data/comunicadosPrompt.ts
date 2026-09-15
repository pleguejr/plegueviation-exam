/**
 * Prompt listo para pegar en Gemini / NotebookLM junto con el PDF del comunicado.
 * Devuelve SOLO JSON compatible con el importador de Plegueviation Exam.
 */
export function buildComunicadosPrompt(meta?: {
  title?: string;
  reference?: string;
  typeLabel?: string;
  issuedAt?: string;
}): string {
  const title = meta?.title?.trim() || '[título del comunicado]';
  const reference = meta?.reference?.trim() || '[referencia / nº]';
  const typeLabel = meta?.typeLabel?.trim() || 'comunicado operativo';
  const issuedAt = meta?.issuedAt?.trim() || '[fecha]';

  return `Eres un examinador TRE/TRI de aerolínea. Genera reactivos MCQ EXCLUSIVAMENTE a partir del PDF aportado (${typeLabel}: "${title}", ref. ${reference}, fecha ${issuedAt}).

REGLAS:
1. Cero invención: solo hechos, cifras, plazos, responsabilidades y procedimientos explícitos en el documento.
2. Exactamente 4 opciones A–D; exactamente 1 con "is_correct": true; 3 distractores realistas (confusiones operativas habituales).
3. Cada explicación debe citar el comunicado (título, referencia, apartado/página si aparece).
4. Devuelve ÚNICAMENTE un array JSON válido (sin texto fuera del JSON).

TAXONOMÍA OBLIGATORIA PARA ESTE LOTE:
- subject_id: "binter_comunicados"
- _category: "comunicados-ops"
- _subtopic: "notificaciones" | "interno" | "operaciones" | "circular" (elige el más cercano)
- id: "BIN-COM-XXX" (XXX secuencial desde 001 en este lote; no reutilices IDs)
- metadata.tags: incluir "comunicado", la referencia si existe, y 1–3 palabras clave del tema

FORMATO DE CADA REACTIVO:
{
  "id": "BIN-COM-001",
  "subject_id": "binter_comunicados",
  "learning_objective": "…",
  "stem": "…",
  "options": [
    { "id": "A", "text": "…", "is_correct": true },
    { "id": "B", "text": "…", "is_correct": false },
    { "id": "C", "text": "…", "is_correct": false },
    { "id": "D", "text": "…", "is_correct": false }
  ],
  "explanation": {
    "text": "…",
    "references": ["Comunicado ${reference} — ${title} (${issuedAt})"]
  },
  "metadata": { "difficulty": 0.4, "tags": ["comunicado", "${reference}"] },
  "_category": "comunicados-ops",
  "_subtopic": "operaciones"
}

Genera entre 4 y 12 preguntas de alto valor operacional según la densidad del PDF. Prioriza vigencia, destinatarios, acciones obligatorias, plazos y excepciones.`;
}
