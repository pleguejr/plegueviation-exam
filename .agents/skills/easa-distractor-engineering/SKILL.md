---
name: easa-distractor-engineering
description: >-
  Methodology and psychometric standards for crafting high-fidelity, balanced, and challenging
  multiple-choice question (MCQ) options and distractors under EASA / Part-FCL and airline command
  standards. Eliminates length bias, giveaways, identical/near-identical options, and absurd distractor formulas.
---

# EASA Distractor Engineering & Psychometric Question Balancing Skill

This skill defines the mandatory methodology and psychometric rules for authoring, modifying, and auditing multiple-choice options ($A, B, C, D$) in aviation question banks. Its primary objective is to **eliminate all giveaway clues (*tells*)** as well as **prevent absurd, identical, or impossible micro-variations**, ensuring that knowing the correct answer requires authentic technical knowledge and operational reasoning.

---

## 1. The 6 Golden Rules of Distractor Crafting

### Rule 1: Strict Symmetry of Length & Grammar ($\pm 15\%$) without Artificial Padding
- All 4 options ($A, B, C, D$) must share an **equivalent length** (number of characters and words) and the **same grammatical syntax**.
- **PROHIBITION OF ARTIFICIAL PADDING**: Never append repetitive generic suffixes (e.g., `"según las listas de chequeo estándar de cabina"`, `"manteniendo los parámetros en rango operativo"`, `"(o mínima velocidad de control según el estado del mar)"`) just to pad distractor character counts. Keep options concise, direct, and balanced naturally.

### Rule 2: Absolute Ban on Identical or Near-Identical Options
- **Never** generate options that are duplicates, near-duplicates, or copy-pastes differing only by punctuation, spaces, or trivial typographical tweaks.
- Every option ($A, B, C, D$) must represent a **substantively distinct, independent conceptual or procedural choice**.
- If two options have $>85\%$ identical wording, rewrite them to represent distinct operational decisions (e.g., different systems, different memory items, different flight phases, or different standard operating limits).

### Rule 3: Absolute Ban on Naive Number/Word Substitution & Absurd Artifacts
- **Never** create distractors by mechanically replacing numbers inside large sentences without operational context.
- **Forbidden Examples**:
  * ❌ *Twin-engine aircraft (E195-E2 / Tecnam)*: Mentioning `"motor 3"`, `"motor 4"`, or `"motor 5"`.
  * ❌ *4-stroke engine*: Generating `"14 tiempos"`, `"1 tiempos"`, `"9 cilindros"`.
  * ❌ *Electrical system*: Generating `"33 VDC"`, `"38 VDC"`, `"23 VDC"`.
  * ❌ *Micro-variations in 200-char paragraphs*: Changing only `"30s"` to `"32s"`, `"26s"`, `"36s"` inside a massive identical paragraph.
- **Correct Approach**: Distractors must represent **real alternative systems, alternative checklists, or typical pilot misconceptions** (e.g., confusing TELSI with NITS; confusing Memory Items with Abnormal Checklists; confusing $V_X$ with $V_Y$; confusing Flaps T/O with Flaps LAND).

### Rule 4: Absolute Ban on Giveaway Parenthetical Notes (*Giveaway Clues*)
- **Never** add explanatory parenthetical notes, sub-clauses, or operational justifications exclusively to the correct answer.
- **Wrong**: `Mínimo: 4.5 L; Máximo: 6.0 L (no despachar por debajo de la marca de mínimo)` vs `Mínimo: 2.0 L; Máximo: 8.0 L`.
- **Correct**: `Mínimo: 4.5 L; Máximo: 6.0 L` vs `Mínimo: 4.0 L; Máximo: 5.5 L` (all options share the exact same structure).
- **Rule of Thumb**: Operational justifications, AFM/POH notes, and background explanations belong in `explanation.text`, NEVER inside the option string.

### Rule 5: Plausible, Technically Competitive Distractors
- Distractors must be constructed using:
  1. **Adjacent limitation values**: Nearby speeds ($V_X$ vs $V_Y$, $V_A$ vs $V_{NO}$, Flap T/O vs Flap LAND), weights (MTOW standard vs modified), or temperatures (Coolant vs Oil).
  2. **Regulatory thresholds**: 30 min vs 45 min final reserve, 72h vs 48h ASR reporting, RFFS 5 vs 6 vs 7, 28 weeks vs 32 weeks for pregnant passengers.
  3. **Operational procedural alternatives**: Using reverse thrust vs wheel braking; holding altitude vs descending; Memory Items vs QRH checklists.

### Rule 6: Elimination of Meta-Options
- Strictly avoid:
  * *"Todas las anteriores"* / *"Todas son correctas"*
  * *"Ninguna de las anteriores"* / *"Ninguna es correcta"*
  * *"A y B son correctas"* / *"Las opciones A y C son verdaderas"*

---

## 2. Before & After Case Studies

### Case Study 1: Briefing Mnemonic & Formatting
- ❌ **Flawed (Micro-difference in massive paragraph / Copy-Paste)**:
  - A: `TELSI: Tipo de Emergencia, Estimated Time, Lugar, Señales ("PROTECCIÓN" a 32s), Instrucciones especiales`
  - B: `TELSI: Tipo de Emergencia, Estimated Time, Lugar, Señales ("PROTECCIÓN" a 30s), Instrucciones especiales`
  - C: `TELSI: Tipo de Emergencia, Estimated Time, Lugar, Señales ("PROTECCIÓN" a 26s), Instrucciones especiales`
  - D: `TELSI: Tipo de Emergencia, Estimated Time, Lugar, Señales ("PROTECCIÓN" a 36s), Instrucciones especiales`
- ✅ **Engineered (EASA Standard - Real Conceptual Alternatives)**:
  - A: `Formato TELSI: Tipo de Emergencia, Estimated Time, Lugar de aterrizaje, Señales de protección, Instrucciones especiales` *(Correct - Binter Standard)*
  - B: `Formato NITS: Nature of emergency, Intentions of commander, Time remaining, Special instructions` *(Forbidden in Binter)*
  - C: `Formato PIREP: Position report, Altitude, Estimated time of arrival, Passengers on board`
  - D: `Formato CRAM: Cockpit readiness, Altitude alert, Medical priority, Evacuation decision`

### Case Study 2: Engine Failure & Memory Items
- ❌ **Flawed (Absurd Engine Numbers & Naive Substitutions)**:
  - A: `Apagar motor 1 dejando motor 2 a ralentí, calzar tren de morro y conectar GPU` *(Correct)*
  - B: `Apagar motor 2 dejando motor 3 a ralentí, calzar tren de morro y conectar GPU` *(Absurd on twin)*
  - C: `Apagar motor 1 dejando motor 1 a ralentí, calzar tren de morro y conectar GPU` *(Identical/nonsensical)*
  - D: `Apagar motor 4 dejando motor 5 a ralentí, calzar tren de morro y conectar GPU` *(Absurd on twin)*
- ✅ **Engineered (EASA Standard - Real Operational Choices)**:
  - A: `Detener avión por completo, apagar motor 1 dejando motor 2 a ralentí, apagar beacon, calzar tren de morro y conectar GPU; no calzar tren principal hasta corte total de motores` *(Correct)*
  - B: `Detener avión por completo, apagar motor 2 dejando motor 1 a plena potencia, mantener beacon encendido y calzar tren principal de inmediato`
  - C: `Apagar ambos motores durante el rodaje por inercia hacia el puesto de estacionamiento sin conectar fuente eléctrica externa`
  - D: `Calzar las cuatro ruedas del tren principal con ambos motores acelerados a potencia de empuje antes de conectar la GPU`

### Case Study 3: Emergency Descent / Go-Around Actions
- ❌ **Flawed (Artificial Number Tampering)**:
  - A: `FLCH seleccionando 10.000 ft o MEA, gases IDLE, Speedbrakes FULL` *(Correct)*
  - B: `FLCH seleccionando 12.1 ft o MEA, gases IDLE, Speedbrakes FULL` *(Absurd decimal)*
  - C: `FLCH seleccionando 6.1 ft o MEA, gases IDLE, Speedbrakes FULL` *(Absurd decimal)*
  - D: `FLCH seleccionando 16.3 ft o MEA, gases IDLE, Speedbrakes FULL` *(Absurd decimal)*
- ✅ **Engineered (EASA Standard - Alternative Flight Modes & Procedures)**:
  - A: `Callout por PA: 'DESCENSO DE EMERGENCIA (x3)'; modo FLCH, seleccionar 10.000 ft o MEA (la que sea mayor), gases en IDLE y SPEEDBRAKES en FULL` *(Correct)*
  - B: `Callout por PA: 'ATENCIÓN TRIPULACIÓN DE CABINA'; modo VNAV, seleccionar 5.000 ft, mantener gases en crucero y Speedbrakes recogidos`
  - C: `Callout por PA: 'DESCENSO INMEDIATO'; modo VS seleccionando -6.000 ft/min, gases a fondo y tren de aterrizaje abajo`
  - D: `Callout por PA: 'EVACUACIÓN EN VUELO'; desconectar piloto automático, poner avión en invertido y cortar ambos motores`

---

## 3. Automated Psychometric Pre-Flight Checklist

Before adding or committing new questions to `banks/`:

1. [ ] **Distinctness**: Are all 4 options completely distinct in wording and meaning (no identical or $>85\%$ similar text)?
2. [ ] **No Absurdities**: Do options respect the aircraft type (no 3/4/5 engines on twins, no absurd units or decimals)?
3. [ ] **Natural Length Symmetry**: Is the length ratio $\le 1.25$ WITHOUT using artificial padding phrases?
4. [ ] **No Exclusive Parentheses**: Are all parenthetical explanations and version tags in `explanation.text`?
5. [ ] **No Meta-Options**: Are "Todas las anteriores" and "A y B son correctas" absent?
6. [ ] **Single Correct Answer**: Does exactly one option have `"is_correct": true`?
