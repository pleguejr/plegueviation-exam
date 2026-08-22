---
name: aviation-question-authoring
description: >-
  Expert guidelines and methodology for authoring high-precision, EASA/Part-FCL style
  multiple choice questions (MCQs) for airline command upgrades and flight school fleet exams.
  Use when designing, reviewing, or validating questions from official aircraft flight manuals (AFM/POH),
  Operations Manuals (MOA/MOB), MEL, and company standard operating procedures.
---

# Aviation Question Authoring & Validation Skill

This skill governs the creation, review, and verification of multiple-choice questions (MCQs) and high-yield flashcards for aviation examinations (Command Upgrades, Type Ratings, and Flight School Fleet).

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

4. **Detailed Explanations with Markdown Tables & Citations**:
   - Explanations must clarify why the correct answer is right and why key distractors are incorrect.
   - When a question references a table from the manual (e.g. Planning Minima, RFFS categories, MEL rectification intervals, Oxygen requirements, DGR classes, Speed tables), the explanation **MUST include the complete table formatted in Markdown**.
   - Exact references must cite: Document Name, Edition/Revision, Chapter/Section, Paragraph, and Page Number.

---

## 2. Mandatory Dual Generation: MCQs & Flashcard Engine Integration

Every question creation and bank expansion batch MUST be authored with dual utility: as robust multiple-choice exam questions AND as high-yield items for the **PWA Flashcards Mode**.

In every generated batch, you MUST ensure a solid, systematic proportion of:

1. **Numerical Data & Limitations Items (`isNumericalQuestion`)**:
   - Speeds: $V_1, V_R, V_2, V_{\text{APP}}, V_{\text{REF}}, V_{\text{FE}}, V_{\text{LE}}, V_{\text{LO}}, V_{\text{NE}}, V_{\text{NO}}, V_{\text{MO}}, M_{\text{MO}}, V_A, V_{\text{GLIDE}}, V_X, V_Y, V_S, V_{SO}, V_{S1}$.
   - Altitudes & Heights: Obstacle clearance, RVSM levels, minimum radar vectoring, CAT I/II/III minimums (DH, MDH, MDA, DA, DDA), transition altitude/level.
   - Times, Durations & Deadlines: 72 hours for MOR/ASR, 30 days for fatality classification, MEL rectification intervals (Cat A specific, Cat B 3 days/72h, Cat C 10 days, Cat D 120 days), 45 min Controlled Rest, 10 min FDP buffers, 20 min radio failure hold.
   - Weights & Masses: MTOW, MLW, MZFW, BOW, DOW, structural payload limits, baggage limits, DGR sporting arms ($\le 5\text{ kg}$).
   - Percentages: Supplemental passenger oxygen percentages (10%, 30%, 100%, PSU +10%, First Aid 2%), climb gradient percentages, flap positions.
   - Pressures & Temperatures: Hydraulic system pressures (psi), tire pressures, differential pressure limits ($\Delta P$), DGR Flash Point limits ($\le 60^\circ\text{C}$), fuel freezing points.
   - Distances & Visibilities: Weather deviation (5 NM offset), RVR minimums (LVTO 125m / 150m, CAT II 300m, LVP 550m), cloud clearances (SERA 1.500m / 1.000 ft).

2. **Acronyms, Mnemonics & Definitions Items (`isAcronymQuestion`)**:
   - Company Mnemonics: `RETSE`, `E-DALTA`, `IMFLOCC`, `TELSI`, `MEANA`, `TWIN`, `NITS`, `PIBA`.
   - Flight & Navigation Terminology: `CDFA`, `DDA`, `NPA`, `LPV`, `LVO`, `LVTO`, `LVP`, `AWO`, `RVR`, `PBN`, `RNP`, `RNAV`, `ILS`, `LOC`, `GS`, `VMC`, `IMC`, `SVFR`, `CTR`, `CTA`, `TMA`, `ATIS`, `NOTAM`, `METAR`, `TAF`, `SIGMET`, `AIRMET`.
   - Regulatory, SMS & Equipment Codes: `MEL`, `CDL`, `MMEL`, `HIL`, `ATL`, `NOTOC`, `DGR`, `LRBL`, `AVSEC`, `SMS`, `MOR`, `ASR`, `CSR`, `FDM`, `SPI`, `ALOSP`, `CIAIAC`, `SERA`, `SAR`, `PBE`, `RVSM`, `RFFS`, `TCAS`, `TAWS`, `EGPWS`, `FADEC`, `APU`, `GPU`, `ASU`, `LMA`, `CAMO`, `FTL`.
   - Each acronym question must clearly test the complete spelling, meaning, and operational application of the concept.

---

## 3. Plegueviation Schema Specification

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
    "text": "Detailed explanation explaining rationale, full Markdown tables if applicable, and operational context.",
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

## 4. Question Difficulty Classification

- **0.1 - 0.3 (Basic Knowledge / Recall / Flashcards)**: Direct recall of memory items, limiting speeds, callouts, and acronym definitions.
- **0.4 - 0.6 (Operational Application)**: Calculating crosswind components, applying MEL dispatch conditions, deciding diversion actions with $IMFLOCC$, applying flap corrections.
- **0.7 - 0.9 (Complex Decision-Making / Multi-Factor)**: Fuel planning with degraded alternates, FTL rest calculations with duty extensions, engine failure during Go-Around with degraded RFFS.

---

## 5. Mandatory Audit & Cross-Checking Protocols (Deleted & Existing Questions)

Whenever you are asked to author new questions, replace defective items, or expand question banks:

1. **Mandatory Pre-Generation Check of Deleted Questions (`banks/deleted_questions.json`)**:
   - You MUST first inspect `banks/deleted_questions.json` (and `apps/web-pwa/public/banks/deleted_questions.json`).
   - Review the IDs, stems, options, and reasons for discard before generating new questions.
   - **Never resurrect or replicate** a question that was eliminated by the user. If an item was eliminated due to ambiguity or obsolete data, author a fresh, clean item directly from the official current manual.

2. **Mandatory Check of Existing Questions in Requested Chapters**:
   - Before authoring questions for any chapter or subchapter (e.g. MOA 8.1, 8.2, 8.3, etc.), review the existing question files in `banks/` to ensure **ZERO repetition or duplicate stems**.

3. **ID Collision Prevention**:
   - Never assign an ID that matches any existing active question in `banks/` or any record in `deleted_questions.json`.

4. **Pre-Commit Verification Checklist**:
   - [ ] Checked against `banks/deleted_questions.json` to ensure zero collisions with discarded items.
   - [ ] Checked against existing active bank files in `banks/` to prevent duplicate questions.
   - [ ] Authoring includes high-yield numerical data and acronym definitions for Flashcard mode.
   - [ ] Exactly 1 option with `"is_correct": true`.
   - [ ] Strict distractor symmetry ($\pm 15\%$ length) per `easa-distractor-engineering`.
   - [ ] Explanations contain full Markdown tables and exact manual references.

