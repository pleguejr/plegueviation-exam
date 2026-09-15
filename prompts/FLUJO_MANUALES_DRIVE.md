# Flujo seguro: Manuales (Google Drive) → Preguntas Plegueviation

**Objetivo:** ampliar bancos con calidad TRE, **cero invención**, distractores difíciles pero sensatos, **sin subir PDFs al repositorio**.

**Ubicación de manuales (tuya):** Google Drive → carpeta `Antigravity` → `manuales/`  
**Repo:** `manuales/` está en `.gitignore` a propósito.

---

## Por qué este flujo (y no otros)

| Opción | ¿Seguro? | ¿Eficiente? | Notas |
|--------|----------|-------------|--------|
| **NotebookLM + fuentes Drive** | ✅ | ✅ Mejor | El PDF no sale de tu Drive/NotebookLM; ideal para tomos grandes (AFM, MOA, QRH). |
| Gemini + PDF adjunto | ✅ | ✅ | Bueno por capítulo; menos cómodo si el manual es enorme. |
| Pegar manual entero en GitHub/Cursor | ❌ | — | Riesgo copyright + repo hinchado. Prohibido. |
| Generar sin PDF (solo memoria del modelo) | ❌ | — | Inventa. Prohibido por skill del proyecto. |

---

## Setup una sola vez (5–10 min)

### 1. Drive
1. Confirma: `Google Drive / Antigravity / manuales/` con AFM, QRH, MOA, MOB, SOPM, MEL, etc.
2. No copies esos PDF al clon de Git.

### 2. NotebookLM
1. Crea un notebook por dominio (recomendado):
   - `Plegue · Binter MOA/MOB`
   - `Plegue · E195-E2 (AFM/AOM/QRH/MEL)`
   - `Plegue · C172N / P2010` (si aplica)
2. Añade fuentes **desde Drive** (no descargues al PC para “subir otra vez” si puedes enlazar).
3. Guarda en favoritos el archivo del repo:  
   `prompts/METAPROMPT_NOTEBOOKLM_GEMINI.md`

### 3. Antigravity (en el proyecto)
- Al guardar JSON bajo `banks/**/*.json`, se dispara la validación de schema:  
  `.antigravity/skills/bank_validator.py`
- No genera preguntas; **valida** que el lote no rompa el schema ni duplique IDs.

### 4. Skills del proyecto (ya grabados)
- `.agents/skills/aviation-question-authoring/SKILL.md` — fidelidad + citas + flashcards
- `.agents/skills/easa-distractor-engineering/SKILL.md` — distractores difíciles y legítimos
- `.agents/skills/manual-bank-expansion/SKILL.md` — este flujo (para Cursor)

---

## Cada lote (operación normal) — ~3 pasos

### Paso A — Acotar (imprescindible)
En NotebookLM, **no** pidas “todo el AFM”. Pide un capítulo:

```text
Capítulo/páginas: [ej. QRH Memory Items Rev19 — solo CABIN ALT / ENG FIRE]
subject_id: e195e2_memory
IDs: E195E2-MEM-0xx (elige rango libre)
Cantidad: 8–12
```

### Paso B — Generar
1. Abre el notebook con el manual en Drive.
2. Pega el **Metaprompt Maestro** (`prompts/METAPROMPT_NOTEBOOKLM_GEMINI.md`).
3. Añade el acotado del Paso A.
4. Exige: JSON único, 1 correcta + 3 distractores realistas, referencia con **página**.

### Paso C — Integrar
**Opción 1 — Banco permanente (recomendado para manuales):**  
Pide a Cursor (este chat): *“Audita e integra este JSON en banks/…”*  
Cursor aplica skills, evita IDs borrados/duplicados, escribe el archivo, Antigravity valida, `build:banks` + push.

**Opción 2 — Estudio rápido en el iPad:**  
PWA → **Importar IA** → pegar JSON (customQuestions; sync entre dispositivos).

---

## Checklist de calidad (antes de aceptar el lote)

- [ ] Cada cifra/procedimiento está en el PDF citado (página en `references`)
- [ ] Distractores = confusiones reales / límites adyacentes / procedimientos alternativos  
      (no “motor 3” en bimotor, no ±2 s en el mismo párrafo)
- [ ] Longitud de opciones equilibrada (±15%), sin relleno artificial
- [ ] Ningún ID en `banks/deleted_questions.json`
- [ ] Sin stems duplicados en el mismo capítulo
- [ ] `difficulty` coherente (0.4–0.7 ops/mando; 0.1–0.3 recall/flashcard)

---

## Qué hacer tú vs Cursor vs Antigravity

```text
Tú + NotebookLM     →  extraer del PDF de Drive y borrador JSON
Cursor              →  auditar skills, escribir banks/, build, PR/push
Antigravity         →  validar schema/IDs al tocar banks/**
```

Con suscripción Gemini/NotebookLM, **no hace falta** API ni conectar el correo: el cuello de botella es acotar capítulo + revisión TRE, no la herramienta.
