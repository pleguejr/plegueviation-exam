---
name: manual-literal-extractor
description: >-
  Expert methodology and automated toolchain for extracting verbatim literal manual text
  and generating high-resolution visual PDF screenshot snippets (crops) directly from official
  aviation manuals (MOA, MOB, QRH, AFM, POH, MEL, DDPM, EASA Part-CAT). Use when enriching
  question bank explanations with literal citations and visual manual evidence.
---

# Manual Literal Extractor & PDF Visual Snippet Pipeline

## Overview & Core Objective
Aviation exam explanations must provide indisputable fidelity to the source of truth. Rather than generic summaries or vague chapter pointers, every explanation must present:
1. **The Verbatim Literal Text (Extracto Literal Oficial):** The exact wording, numerical values, tables, and phrasing from the official manual enclosed in a dedicated markdown blockquote (`> ...`).
2. **The Visual Manual Snippet / Screenshot Crop (`![Extracto Oficial del Manual](./manual-crops/.../*.png)`):** A crisp, 200–300 DPI high-contrast visual crop of the exact paragraph or table from the source PDF.
3. **Structured Context & References:** An introductory summary explaining why the correct option is true and how distractors deviate from the rule, followed by official manual chapter and page references.

---

## Technical Architecture

```
manuales/*.PDF (Drive / Local)
       │
       ▼ (PyMuPDF / cli/bin/extract_manual_snippets.py)
   ┌───┴───────────────────────────────┐
   │ 1. Index & Section Locator        │
   │ 2. Verbatim String Match          │
   │ 3. Bounding-Box Calculation       │
   │ 4. DPI-200 Visual Snippet Crop    │
   └───────────────┬───────────────────┘
                   │
                   ▼
  apps/web-pwa/public/manual-crops/<bank_category>/<question_id>.png
                   │
                   ▼
  JSON `explanation.text` Update:
  - Markdown Summary
  - `> 📖 **Extracto Literal del Manual (MOA 8.X / POH / AFM):**`
  - `> "[Texto exacto extraído]"`
  - `![Extracto Oficial del Manual](./manual-crops/<bank_category>/<question_id>.png)`
```

---

## Explanation Formatting Standards

Every question's `explanation` field in `banks/**/*.json` must follow this structure:

```json
{
  "explanation": {
    "text": "### Resumen y Clave de la Pregunta\n[Explicación estructurada y razonada de la respuesta correcta frente a los distractores].\n\n> 📖 **Extracto Literal del Manual — [Referencia Oficial]:**\n> \"[Cita literal exacta, palabra por palabra, con valores numéricos y tablas idénticas al PDF original]\"\n\n![Extracto Oficial del Manual (MOA 8.2)](./manual-crops/command-upgrade/MOA-82-014.png)",
    "references": [
      "MOA BinterCanarias ED06 RN27, Capítulo 8.2, Sección 8.2.2.12"
    ]
  }
}
```

---

## Best Practices for Visual PDF Cropping

1. **Resolution & DPI:** Render crops at `dpi=200` (or `dpi=300` for dense tabular data) with anti-aliasing.
2. **Context Margin:** Include 15–20pt of top/bottom margin around the target paragraph or table header so the reader has full context of the section title.
3. **Naming Convention:**
   `apps/web-pwa/public/manual-crops/<subject_category>/<question_id>.png`
   (e.g., `apps/web-pwa/public/manual-crops/command-upgrade/MOA-84-005.png`).
4. **Day & Night Mode Readiness:** Ensure borders, text sharpness, and contrast in the PWA Lightbox modal.
