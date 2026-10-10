# Plegueviation Exam — Reglas Activas del Agente

Este proyecto cuenta con reglas operativas, psicométricas y de continuidad multi-ordenador de cumplimiento obligatorio:

- **Reglas completas del proyecto:** Ver [`.agents/rules/aviation_rules.md`](.agents/rules/aviation_rules.md).
- **Estado de la última sesión entre ordenadores:** Ver [`.agents/ESTADO_SESION.md`](.agents/ESTADO_SESION.md).

## Comandos Rápidos de Continuidad Multi-Ordenador

1. **«Vamos a continuar desde donde lo dejamos» / «Continuamos» / «Retoma donde lo dejé»**:
   - Ejecuta siempre `git pull origin main` antes de nada.
   - Lee `.agents/ESTADO_SESION.md` y `HISTORICO.md`.
   - Resume al usuario el estado dejado en el otro ordenador y continúa desde ese punto.

2. **«Graba para continuar luego» / «Guarda sesión» / «Cerramos por hoy»**:
   - Si hubo cambios en `banks/`, ejecuta `python3 cli/bin/build_banks.py`.
   - Actualiza `.agents/ESTADO_SESION.md` (y `HISTORICO.md` si procede) con todo el contexto de lo realizado en esta conversación y lo que queda pendiente.
   - Haz `git add -A`, `git commit` y `git push origin main` para dejar GitHub y Vercel sincronizados para el otro ordenador.
