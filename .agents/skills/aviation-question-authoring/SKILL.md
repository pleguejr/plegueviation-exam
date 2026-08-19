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

## 1. Core Principles of Aviation Question Design

1. **Absolute Manual Fidelity**:
   - Every question stem, correct option, and explanation MUST be directly grounded in the official aircraft manuals (AFM, POH, AOM, FCOM, QRH) or company manuals (MOA, MOB, SOPs, MEL/DDPM/CDL).
   - No assumptions or generic textbook approximations are permitted when a specific manual value exists.

2. **Unambiguous Question Stem**:
   - State the aircraft model, engine type, weight configuration (e.g., MTOW standard vs modified), and flight condition explicitly in the stem.
   - Use direct, affirmative phrasing whenever possible. If negative phrasing is unavoidable, capitalize and bold: **NO**, **EXCEPTO**, **INCORRECTA**.

3. **High-Quality Distractors (Plausible Alternatives)**:
   - Distractors must represent real-world pilot misconceptions, adjacent configuration values, or related phase-of-flight figures (e.g., confusing $V_X$ with $V_Y$, Flap T/O with Flap LAND, or standard MTOW with modified MTOW).
   - Never use "Todas las anteriores" or "Ninguna de las anteriores".
   - Keep options approximately equal in length, grammatical structure, and precision.

4. **Detailed Explanations & Citations**:
   - Explanations must not only identify why the correct answer is right, but briefly clarify why key distractors are incorrect.
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
