# Antigravity — rol en Plegueviation Exam

## Qué hace

| Pieza | Función |
|-------|---------|
| `tasks/auto_build.json` | Al modificar `banks/**/*.json`, ejecuta el validador |
| `skills/bank_validator.py` | Schema JSON oficial + detección de IDs duplicados |

## Qué no hace

- No lee Google Drive.
- No genera preguntas.
- No sustituye NotebookLM/Gemini ni la auditoría TRE de Cursor.

## Flujo recomendado con manuales en Drive

Ver `prompts/FLUJO_MANUALES_DRIVE.md` y skill Cursor `manual-bank-expansion`.

1. Manuales solo en Drive (`Antigravity/manuales/`).
2. NotebookLM genera JSON con Metaprompt.
3. Cursor integra en `banks/…` tras auditoría.
4. Antigravity valida automáticamente el JSON.
5. `npm run build:banks` + commit/push para la PWA.

## Ejecución manual del validador

```bash
python3 .antigravity/skills/bank_validator.py banks cli/schema/question.schema.json
```
