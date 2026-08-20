---
name: easa-distractor-engineering
description: >-
  Methodology and psychometric standards for crafting high-fidelity, balanced, and challenging
  multiple-choice question (MCQ) options and distractors under EASA / Part-FCL and airline command
  standards. Eliminates length bias, giveaways, and structural asymmetry across aviation question banks.
---

# EASA Distractor Engineering & Psychometric Question Balancing Skill

This skill defines the mandatory methodology and psychometric rules for authoring and auditing multiple-choice options ($A, B, C, D$) in aviation question banks. Its primary objective is to **eliminate all giveaway clues (*tells* / *giveaways*)** and ensure that knowing the correct answer requires authentic technical knowledge rather than test-taking heuristics.

---

## 1. The 5 Golden Rules of Distractor Crafting

### Rule 1: Strict Symmetry of Length & Grammar ($\pm 15\%$)
- All 4 options ($A, B, C, D$) must share an **equivalent length** (number of characters and words) and the **same grammatical syntax**.
- **The Length Trap**: In poorly authored questions, the correct answer is frequently 2–4× longer because authors add qualifiers, exceptions, and context only to the correct option. This is strictly prohibited.
- If the correct option contains a conditional clause (*"siempre que..."*), all 3 distractors MUST contain parallel conditional clauses.

### Rule 2: Absolute Ban on Giveaway Parenthetical Notes (*Giveaway Clues*)
- **Never** add explanatory parenthetical notes, sub-clauses, or operational justifications exclusively to the correct answer.
- **Wrong**: `Mínimo: 4.5 litros; Máximo: 6.0 litros (no despachar por debajo de la marca de mínimo)` vs `Mínimo: 2.0 litros; Máximo: 8.0 litros`.
- **Correct**: `Mínimo: 4.5 litros; Máximo: 6.0 litros` vs `Mínimo: 4.0 litros; Máximo: 5.5 litros` (all options share the exact same structure).
- **Rule of Thumb**: Operational justifications, AFM/POH notes, and background explanations belong in `explanation.text`, NEVER inside the option string.

### Rule 3: Homogeneous Units and Notations
- If units or dual conversions are displayed, they must be formatted identically across **all 4 options**.
- **Wrong**: Option D has `60°C (140°F)` while Options A, B, C only show `40°C`, `50°C`, `70°C`.
- **Correct**: All options show `60°C`, `50°C`, `70°C`, `55°C`, and the Fahrenheit conversions are presented inside the explanation.

### Rule 4: Plausible, Technically Competitive Distractors
- Distractors must never be absurd, comical, or obviously impossible (e.g., *"Apagar todas las pantallas"*, *"El manual de catering"*, *"50 nudos de viento cruzado"*).
- Distractors must be constructed using:
  1. **Adjacent limitation values**: Nearby speeds ($V_X$ vs $V_Y$, $V_A$ vs $V_{NO}$, Flap T/O vs Flap LAND), weights (MTOW standard vs modified), or temperatures (Coolant vs Oil).
  2. **Regulatory thresholds**: 30 min vs 45 min final reserve, 72h vs 48h ASR reporting, RFFS 5 vs 6 vs 7, 28 weeks vs 32 weeks for pregnant passengers.
  3. **Common pilot misconceptions**: Typical procedural confusion in emergency flows, memory items, or briefing mnemonics.

### Rule 5: Elimination of Meta-Options
- Strictly avoid:
  - *"Todas las anteriores"* / *"Todas son correctas"*
  - *"Ninguna de las anteriores"* / *"Ninguna es correcta"*
  - *"A y B son correctas"* / *"Las opciones A y C son verdaderas"*
- Every question must present **4 substantive, independent operational options**.

---

## 2. Before & After Case Studies

### Case Study 1: Dual Limitations & Temperatures (AFM Tecnam P2010 TDI)
- ❌ **Flawed (Giveaway)**:
  - A: `Mínima: 40°C; Máxima: 120°C`
  - B: `Mínima: 50°C; Máxima: 95°C`
  - C: `Mínima: 70°C; Máxima: 115°C`
  - D: `Mínima: 60°C (140°F); Máxima permisible: 105°C (221°F)` *(Tells: only one with °F and "permisible")*
- ✅ **Engineered (EASA Standard)**:
  - A: `Mínima operativa: 50°C; Máxima permisible: 105°C`
  - B: `Mínima operativa: 60°C; Máxima permisible: 115°C`
  - C: `Mínima operativa: 55°C; Máxima permisible: 100°C`
  - D: `Mínima operativa: 60°C; Máxima permisible: 105°C` *(Correct)*

### Case Study 2: Aircraft Emergency Procedures & Checklist Steps
- ❌ **Flawed (Giveaway)**:
  - A: `Cortar combustible`
  - B: `Fuel Selector Valve: OFF; Engine Master: OFF; Cabin Heat: OFF; Mantener 84 KIAS y proceder a aterrizaje forzoso` *(Tells: 5x longer, structured like checklist)*
  - C: `Acelerar a 100% Load`
  - D: `Virar 360°`
- ✅ **Engineered (EASA Standard)**:
  - A: `Fuel Selector: OFF | Engine Master: OFF | Cabin Heat: OFF | Velocidad: 84 KIAS y aterrizaje forzoso` *(Correct)*
  - B: `Fuel Selector: ON | Engine Master: ON | Cabin Heat: FULL ON | Velocidad: 100 KIAS para enfriar motor`
  - C: `Fuel Selector: OFF | Engine Master: ON | Cabin Heat: OFF | Velocidad: 65 KIAS con flaps LAND`
  - D: `Fuel Selector: AUTO | Engine Master: OFF | Cabin Heat: OPEN | Velocidad: 119 KIAS en viraje cerrado`

### Case Study 3: Operational Regulations & Equipment (MOA / Medical Kits)
- ❌ **Flawed (Giveaway)**:
  - A: `1 FAK y 1 MEK`
  - B: `2 FAKs y 1 MEK (precintados, con etiqueta y fecha vigente; requerido en rutas a más de 60 min...)`
  - C: `2 FAKs y 2 MEKs`
  - D: `3 FAKs`
- ✅ **Engineered (EASA Standard)**:
  - A: `1 FAK (First Aid Kit) y 1 MEK (Medical Emergency Kit)`
  - B: `2 FAKs (First Aid Kits) y 1 MEK (Medical Emergency Kit)` *(Correct)*
  - C: `2 FAKs (First Aid Kits) y 2 MEKs (Medical Emergency Kits)`
  - D: `3 FAKs (First Aid Kits) y 1 MEK (Medical Emergency Kit)`

---

## 3. Automated Psychometric Audit Checklist

When generating or editing questions in `banks/`, run this checklist mentally or with the audit script:

1. [ ] **Length Ratio**: $\text{Length}(\text{Option}_{\text{Correct}}) / \text{Average}(\text{Length}(\text{Options}_{\text{Distractors}})) \le 1.25$.
2. [ ] **No Exclusive Parentheses**: If Option $A$ contains `(...)`, do Options $B, C, D$ also contain `(...)` with parallel information?
3. [ ] **No Obvious Humor / Absurdities**: Are all distractors plausible enough that an unprepared pilot could choose them?
4. [ ] **No Meta-Options**: Are "Todas las anteriores" and "A + B" completely absent?
5. [ ] **Rich Explanations**: Are tables, charts, and detailed manual quotes placed in `explanation.text` rather than in the options?
