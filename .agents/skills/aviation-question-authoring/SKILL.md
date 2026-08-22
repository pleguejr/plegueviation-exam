---
name: aviation-question-authoring
description: >-
  Expert guidelines and methodology for authoring high-precision, EASA/Part-FCL style
  multiple choice questions (MCQs) for airline command upgrades and flight school fleet exams.
  Use when designing, reviewing, or validating questions from official aircraft flight manuals (AFM/POH),
  Operations Manuals (MOA/MOB), MEL, and company standard operating procedures.
---

# Aviation Question Authoring & Validation Skill

This skill governs the creation, review, and verification of multiple-choice questions for aviation examinations (Command Upgrades, Type Ratings, and Flight School Fleet).

---

## 1. Core Principles of Aviation Question Design

1. **Absolute Manual Fidelity**:
   - Every question stem, correct option, and explanation MUST be directly grounded in official aircraft manuals (AFM, POH, AOM, FCOM, QRH) or company manuals (MOA, MOB, SOPs, MEL/DDPM/CDL).
   - No assumptions or generic textbook approximations are permitted when a specific manual value exists.

2. **Unambiguous Question Stem**:
   - State the aircraft model, engine type, weight configuration (e.g., MTOW standard vs modified), and flight condition explicitly in the stem.
   - Use direct, affirmative phrasing whenever possible. If negative phrasing is unavoidable, capitalize and bold: **NO**, **EXCEPTO**, **INCORRECTA**.

3. **High-Quality Distractors & Psychometric Balance (Strict Compliance with `easa-distractor-engineering`)**:
   - **No Identical or Copy-Pasted Options**: All 4 options ($A, B, C, D$) must be distinct, independent operational choices. Never generate options with duplicate or near-duplicate texts.
   - **No Naive Regex/Number Substitutions**: Never fabricate distractors by blindly swapping numbers in massive sentences (e.g., `"motor 3/4/5"` on twin-engine jets, absurd decimal numbers, or `"14 tiempos"` on 4-stroke engines).
   - **No Artificial Padding Suffixes**: Never append repetitive boilerplate phrases (e.g., `"según las listas estándar..."`) to force length balance. Keep options naturally balanced and concise.
   - **Plausibility**: Distractors must represent real-world pilot misconceptions, adjacent limitation values, or alternative operational procedures (e.g., $V_X$ vs $V_Y$, Flap T/O vs Flap LAND, Memory Items vs QRH checklists).
   - **No Parenthetical Clues in Options**: Explanations, citations, and manual justification notes belong in `explanation.text`, never inside the option text.
   - **No Meta-Options**: Never use "Todas las anteriores", "Ninguna de las anteriores", or "A y B son correctas".

4. **Detailed Explanations & Citations**:
   - Explanations must clarify both why the correct answer is right and why key distractors are incorrect.
   - Exact references must cite: Document Name, Edition/Revision, Chapter/Section, Paragraph, and Page Number.

---

## 2. Plegueviation Schema Specification

Every generated question must strictly follow this JSON schema:

```json
{
  "id": "CMD-XXX-001 | P2010-XXX-001 | C172N-XXX-001",
  "subject_id": "string",
  "learning_objective": "Exact section or regulatory objective",
  "stem": "Clear, contextualized question in Spanish",
  "options": [
    { "id": "A", "text": "Option text", "is_correct": true },
    { "id": "B", "text": "Option text", "is_correct": false },
    { "id": "C", "text": "Option text", "is_correct": false },
    { "id": "D", "text": "Option text", "is_correct": false }
  ],
  "explanation": {
    "text": "Detailed explanation explaining rationale and operational context.",
    "references": [
      "Exact Manual Name - Section X: Title - Paragraph Y (Page Z)"
    ]
  },
  "metadata": {
    "difficulty": 0.3
  }
}
```

---

## 3. Question Difficulty Classification

- **0.1 - 0.3 (Basic Knowledge / Recall)**: Direct recall of memory items, limiting speeds ($V_{NE}, V_{FE}, V_A$), callouts, and acronym definitions.
- **0.4 - 0.6 (Operational Application)**: Calculating crosswind components, applying MEL dispatch conditions, deciding diversion actions with $IMFLOCC$, applying flap corrections for gusts.
- **0.7 - 0.9 (Complex Decision-Making / Multi-Factor)**: Fuel planning with degraded alternates, FTL rest calculations with duty extensions, engine failure during Go-Around with degraded RFFS.

---

## 4. Mandatory Audit & Cross-Checking of Deleted Questions (`banks/deleted_questions.json`)

Whenever you are asked to author new questions, replace defective items, or expand question banks:

1. **Mandatory Pre-Generation Check**:
   - You MUST first inspect `banks/deleted_questions.json` (and any user-provided list or export of deleted questions).
   - Review the IDs, stems, options, and reasons for discard before generating new questions.

2. **Strict Prohibition on Re-Introducing Discarded Concepts**:
   - **Never resurrect or replicate** a question that was eliminated by the user.
   - If a question on a specific topic was eliminated due to ambiguity, obsolete values, or poor distractors (noted in `reason`), any replacement or expansion in that topic MUST be authored from scratch directly from the official, current manual section with explicit operational grounding.

3. **ID Collision Prevention**:
   - Never assign an ID that matches any existing active question in `banks/` or any record in `banks/deleted_questions.json`.

4. **Pre-Commit Verification Checklist**:
   - [ ] Checked against `banks/deleted_questions.json` to ensure zero collisions with discarded items.
   - [ ] Exactly 1 option with `"is_correct": true`.
   - [ ] Strict distractor symmetry ($\pm 15\%$ length) per `easa-distractor-engineering`.
   - [ ] Official documentary citations in `explanation.references` (Manual, Edition, Section, Paragraph).

