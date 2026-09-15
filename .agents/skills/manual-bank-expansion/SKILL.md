---
name: manual-bank-expansion
description: >-
  Secure and efficient workflow to expand Plegueviation Exam question banks from
  official manuals stored only in Google Drive (Antigravity/manuales), using NotebookLM
  or Gemini plus project skills (aviation-question-authoring, easa-distractor-engineering)
  and Antigravity schema validation. Use when the user asks to create questions from
  manuals, expand banks, or set up Drive/NotebookLM generation.
---

# Manual → Bank Expansion (Drive + NotebookLM + Cursor + Antigravity)

## Security (non-negotiable)

1. **Manuals NEVER enter GitHub.** Keep PDFs only in Google Drive (`…/Antigravity/manuales/`). The repo already gitignores `manuales/`.
2. **Do not paste full manual text into chat** unless the user explicitly attaches a scoped extract for a chapter batch.
3. Generated JSON may live in `banks/` (questions only). References cite manual + page; binary manuals stay in Drive.
4. Prefer **NotebookLM with Drive sources** so PDFs are not re-uploaded to random tools or committed to the repo.

## Canonical pipeline (most efficient + safe)

```text
Google Drive: Antigravity/manuales/*.PDF
        │  (link / sync as NotebookLM sources — do not git add)
        ▼
NotebookLM (or Gemini with the same PDF)
        │  + Metaprompt Maestro + chapter scope
        │  Skills policy: zero invention, hard plausible distractors
        ▼
JSON array (4–15 questions / batch)
        │
        ├─ Permanent catalog → Cursor places file under banks/<cat>/<sub>/
        │                      then Antigravity validates banks/**/*.json
        │                      then npm run build:banks + commit/push
        │
        └─ Quick study only → PWA «Importar IA» / Comunicados Ops (customQuestions)
```

## Who does what

| Role | Responsibility |
|------|----------------|
| **Drive** | Single source of truth for AFM/QRH/MOA/MOB/SOPM/MEL PDFs |
| **NotebookLM / Gemini** | Extract facts from linked PDF; draft MCQs with Metaprompt |
| **Cursor (this agent)** | Audit vs `aviation-question-authoring` + `easa-distractor-engineering`; check `banks/deleted_questions.json` and existing IDs; write `banks/…` files; build & push |
| **Antigravity** | On `banks/**/*.json` change → `.antigravity/skills/bank_validator.py` schema + duplicate ID check |

## Batch rules (quality)

Before generating or accepting a batch:

1. Apply **aviation-question-authoring** (fidelity, dual MCQ/flashcard yield, citations with page).
2. Apply **easa-distractor-engineering** (no micro-number swaps, no absurd engines, ±15% length symmetry, no meta-options).
3. Check `banks/deleted_questions.json` — never resurrect discarded items.
4. Check existing files in the target chapter — zero duplicate stems/IDs.
5. Exactly one `"is_correct": true` per question.
6. Prefer difficulty **0.4–0.7** for command/ops batches unless the user asks for pure recall flashcards (0.1–0.3).

## Operator prompt template (paste into NotebookLM after Metaprompt)

```text
LOTE:
- Manual / fuente Drive: [ej. MOA ED06 / QRH Rev19 / AFM E195-E2]
- Capítulo / páginas: [ej. MOA 8.1.7 — solo esas secciones]
- subject_id: [tabla INSTRUCCIONES_BANCOS_PREGUNTAS.txt]
- Prefijo ID + rango libre: [ej. BIN-MOA-240 …]
- Cantidad: [8–12]
- Idioma: español operacional Binter
- Distractores: errores reales de pilotaje / límites adyacentes / procedimientos alternativos (NUNCA inventar cifras no citadas)
```

## Cursor acceptance checklist

- [ ] Every fact appears in the cited manual section/page
- [ ] Distractors are hard but operationally sensible (skill easa-distractor-engineering)
- [ ] IDs unique vs active banks + deleted
- [ ] File path matches taxonomy (`banks/binter-ops/…`, `banks/fleet-e195e2/…`, etc.)
- [ ] Antigravity / `bank_validator.py` would pass
- [ ] `npm run build:banks` after permanent catalog changes

## Related skills

- **Entry point:** `question-creation-process` — proceso completo de creación
- `aviation-question-authoring` — calidad / fidelidad
- `easa-distractor-engineering` — distractores

## Related files

- `prompts/METAPROMPT_NOTEBOOKLM_GEMINI.md` — generation policy + subject_id taxonomy
- `prompts/FLUJO_MANUALES_DRIVE.md` — operator steps (Drive notebook setup)
- `INSTRUCCIONES_BANCOS_PREGUNTAS.txt` — folders and ID prefixes
- `.antigravity/tasks/auto_build.json` — validate on bank file modify
- `.agents/skills/aviation-question-authoring/SKILL.md`
- `.agents/skills/easa-distractor-engineering/SKILL.md`
- `.agents/skills/question-creation-process/SKILL.md`
