---
name: question-creation-process
description: >-
  End-to-end proceso de creación de preguntas MCQ para Plegueviation Exam:
  acotar capítulo del manual (Drive), generar con Metaprompt/NotebookLM/Gemini,
  auditar con skills TRE (fidelidad + distractores), validar Antigravity e integrar
  en banks/. Use when the user asks to create questions, expand banks, generate
  MCQs from manuals, or follow the official question-creation process.
---

# Proceso oficial de creación de preguntas (Plegueviation Exam)

Este skill es el **punto de entrada**. Orquesta el proceso completo; la calidad
detallada vive en los skills enlazados (léelos y aplícalos en cada lote).

## Skills obligatorios (leer y aplicar)

| Skill | Rol |
|-------|-----|
| `aviation-question-authoring` | Fidelidad al manual, stem claro, citas con página, dual MCQ/flashcard |
| `easa-distractor-engineering` | Distractores difíciles pero legítimos; sin micro-números ni absurdos |
| `manual-bank-expansion` | Seguridad Drive + pipeline NotebookLM/Gemini + Antigravity |
| Fleet/ops experts (`binter-operations-auditor`, `tecnam-p2010-afm-expert`, `cessna-172n-poh-expert`) | Solo cuando el lote es de esa flota/manual |

## Flujo paso a paso (agente)

### 0. Entrada del usuario
- Tema / manual / capítulo (ej. «MOA 8.1.7», «QRH Memory Items ENG FIRE»).
- Cantidad deseada (por defecto 8–12).
- Destino: `banks/` permanente **o** Importar IA (custom).

### 1. Seguridad
- Manuales solo en Google Drive `Antigravity/manuales/` — **nunca** `git add` de PDF.
- No inventar: si no hay extracto/fuente citada, pedir acotación o JSON de NotebookLM.
- Ver `prompts/FLUJO_MANUALES_DRIVE.md`.

### 2. Pre-chequeos (antes de generar o aceptar JSON)
1. Revisar `banks/deleted_questions.json` — no resucitar descartadas.
2. Revisar archivos existentes del capítulo en `banks/` — cero stems/IDs duplicados.
3. Elegir `subject_id`, prefijo ID y carpeta según `INSTRUCCIONES_BANCOS_PREGUNTAS.txt`.
4. Anotar próximo ID libre.

### 3. Generación (fuera o con el usuario)
- Fuente: NotebookLM/Gemini con PDF Drive + `prompts/METAPROMPT_NOTEBOOKLM_GEMINI.md`.
- Acotar **capítulo/páginas**, no el manual entero.
- Salida: array JSON schema Plegueviation (id, subject_id, learning_objective, stem, options×4, explanation+references, metadata.difficulty).

### 4. Auditoría TRE (obligatoria antes de escribir en banks/)
Para cada pregunta:
- [ ] Hecho/cifra en el manual citado (página en `references`)
- [ ] Exactamente 1× `"is_correct": true`
- [ ] Distractores = confusiones reales / límites adyacentes / procedimientos alternativos (`easa-distractor-engineering`)
- [ ] Sin meta-opciones, sin relleno artificial, simetría ±15% longitud
- [ ] Explicación didáctica; tablas Markdown si el ítem es tabular
- [ ] Mezcla útil flashcards: numéricos + acrónimos cuando el lote lo permita
- [ ] `difficulty` coherente (0.1–0.3 recall; 0.4–0.7 ops; 0.7–0.9 multi-factor)

### 5. Integración
1. Escribir JSON en `banks/<categoría>/<subtema>/…json`.
2. Ejecutar validación:  
   `python3 .antigravity/skills/bank_validator.py banks cli/schema/question.schema.json`
3. `npm run build:banks` (y tests/build PWA si el cambio va a producción).
4. Commit + push / PR.

### 6. Atajo iPad (no permanente)
Si el usuario solo quiere estudiar ya: PWA → **Importar IA** (o panel Comunicados) → customQuestions.  
Para el catálogo oficial del repo, preferir siempre el paso 5.

## Plantilla de acotación (pegar en NotebookLM tras el Metaprompt)

```text
LOTE PLEGUEVIATION:
- Manual Drive: […]
- Capítulo / páginas: […]
- subject_id: […]
- Prefijo ID + desde: […]
- Cantidad: 8–12
- Idioma: español operacional Binter
- Reglas: cero invención; distractores difíciles pero reales; cita con página
```

## Qué NO hacer

- Generar sin fuente de manual / sin cita de página.
- Micro-cambiar un solo número en el mismo párrafo como distractor.
- Subir o commitear PDFs de `manuales/`.
- Saltarse deleted_questions o IDs duplicados.
- Usar «Todas/Ninguna de las anteriores».

## Referencias rápidas

- Flujo operador: `prompts/FLUJO_MANUALES_DRIVE.md`
- Metaprompt: `prompts/METAPROMPT_NOTEBOOKLM_GEMINI.md`
- Taxonomía carpetas/IDs: `INSTRUCCIONES_BANCOS_PREGUNTAS.txt`
- Schema: `cli/schema/question.schema.json`
- Antigravity: `.antigravity/README.md`
