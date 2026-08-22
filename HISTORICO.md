# 📜 Historial de Cambios y Versiones — Plegueviation Exam

Registro cronológico y técnico de la evolución de la plataforma **Plegueviation Exam**, incluyendo desarrollo del simulador PWA, compilación de bancos de preguntas, ingeniería psicométrica de distractores, aislamiento estricto de flotas y sincronización multidispositivo en la nube.

---

## 🚀 Versión Actual: v2.3.0 (2026-08-22)

### 🛡️ Aislamiento Estricto de Flotas y Renderizado de Tablas Técnicas
- **Corrección de Mezcla Visual de Flotas:** Se eliminó el *fallback* automático hacia la Tecnam P2010 en los componentes de visualización de preguntas ([`ExamScreen`](file:///c:/Users/plegu/My%20Drive/Antigravity/Plegueviation%20exam/apps/web-pwa/src/components/ExamScreen.tsx), [`ExamResults`](file:///c:/Users/plegu/My%20Drive/Antigravity/Plegueviation%20exam/apps/web-pwa/src/components/ExamResults.tsx) y [`QuestionExplorer`](file:///c:/Users/plegu/My%20Drive/Antigravity/Plegueviation%20exam/apps/web-pwa/src/components/QuestionExplorer.tsx)).
- **Módulo [`aircraftRules.ts`](file:///c:/Users/plegu/My%20Drive/Antigravity/Plegueviation%20exam/apps/web-pwa/src/utils/aircraftRules.ts):** Implementación de funciones deterministas para la clasificación de flotas:
  - `getQuestionFleet(q)`: Identifica `p2010`, `c172n`, `e195e2`, `binter_ops` o `general`.
  - `getSpeedSummaryTableType(q)`: Garantiza que los cuadros resumen de velocidades de aviones ligeros **solo** se muestren en preguntas de su propia flota (P2010 o C172N) y nunca en Binter Ops / Examen de Comandante / E195-E2.
  - `getPlanningMinimaTableType(q)`: Restringe las tablas de Mínimos de Planificación con Variaciones y llamadas radiotelefónicas de combustible (MOA 8.1.7) exclusivamente al banco de Binter Ops / Comandante.
- **Auditoría Completa de la Base de Datos (810 reactivos):** Verificación automatizada de 0 contaminaciones cruzadas en el texto de enunciados, opciones y referencias oficiales.

---

## 🎯 Versión v2.2.0 (2026-08-22)

### ⚖️ Ingeniería Psicometría EASA y Calidad de Distractores
- **Eliminación de Sesgos de Longitud:** Rebalanceo estructural de todas las opciones en los bancos de preguntas para asegurar que la opción correcta no sea sistemáticamente más larga o detallada que los distractores.
- **Eliminación de Opciones Idénticas o Rellenos:** Corrección de sustituciones ingenuas en distractores numéricos y operacionales en las flotas P2010 TDI, C172N y Command Upgrade.
- **Skill Especializado [`easa-distractor-engineering`](file:///c:/Users/plegu/My%20Drive/Antigravity/Plegueviation%20exam/.agents/skills/easa-distractor-engineering/SKILL.md):** Creación del estándar de distracción plausible basado en trampas de examen oficiales, confusiones operacionales reales y paralelismo gramatical.

---

## 📚 Versión v2.1.0 (2026-08-20)

### ✈️ Expansión Masiva del Banco Oficial a 810 Preguntas
- **Preparación Prueba de Comandante / Binter Ops (310 reactivos):**
  - Examen Oficial FOR-ENT-006 (100 preguntas oficiales de mando).
  - Gestión de Emergencias y Mando: Mnemónicos Binter (RETSE, TWIN, E-DALTA, TELSI, IMFLOCC, MEANA) y toma de decisiones.
  - Despacho y Sistemas E195-E2: Flujo MEL / DDPM / CDL, fallos de combustible, hidráulica y aviónica.
  - MOA 1.4 & 1.5: Autoridad del comandante y responsabilidades de la tripulación.
  - MOA 7: Limitaciones de tiempo de vuelo, actividad y descanso (FTL EASA Part-ORO.FTL).
  - MOA 8.1.7: Planificación de combustible, selección de aeródromos y Mínimos con Variaciones.
- **Flota Tecnam P2010 TDI CD-170 (250 reactivos):**
  - AFM Ed.2 Rev.13 (Limitaciones, Operación Normal, Emergencias, Sistemas G1000 NXi, Performance y Suplementos Sección 9).
- **Flota Cessna 172N Skyhawk (250 reactivos):**
  - POH C172N Lycoming O-320-H2AD (General, Limitaciones de velocidad y peso a 2300 lbs, Emergencias, Procedimientos Normales, Sistemas y Suplementos Sección 9).

---

## ⚡ Versión v2.0.0 (2026-08-19)

### 📲 PWA 100% Offline, Sincronización en la Nube y Flujo de Examen
- **Auto-Avance Inteligente:** El simulador avanza automáticamente a la siguiente pregunta solo ante respuestas correctas; se detiene ante respuestas incorrectas desplegando inmediatamente la explicación técnica.
- **Cloud Sync Multidispositivo REST:** Sincronización bidireccional automática mediante PIN entre iPad, iPhone y PC usando IndexedDB (Dexie.js) y backend serverless en Vercel API.
- **Explorador de Preguntas y Estadísticas:** Análisis de preguntas falladas, marcadas con bandera (flagged) y cálculo de tasa de éxito por subtema.
- **Componentes Visuales Ricos:** Integración de `<SpeedSummaryTable>` y `<PlanningMinimaTable>` con diseño inspirado en AviationExam.

---

## 🏗️ Resumen de Archivos y Componentes Clave

| Componente / Archivo | Propósito Principal |
| :--- | :--- |
| [`apps/web-pwa/src/utils/aircraftRules.ts`](file:///c:/Users/plegu/My%20Drive/Antigravity/Plegueviation%20exam/apps/web-pwa/src/utils/aircraftRules.ts) | Motor de clasificación estricta de flota y reglas de visualización |
| [`apps/web-pwa/src/components/SpeedSummaryTable.tsx`](file:///c:/Users/plegu/My%20Drive/Antigravity/Plegueviation%20exam/apps/web-pwa/src/components/SpeedSummaryTable.tsx) | Cuadros de velocidades oficiales (AFM P2010 / POH C172N) |
| [`apps/web-pwa/src/components/PlanningMinimaTable.tsx`](file:///c:/Users/plegu/My%20Drive/Antigravity/Plegueviation%20exam/apps/web-pwa/src/components/PlanningMinimaTable.tsx) | Cuadros de Mínimos Binter MOA 8.1.7 (Variaciones y Combustible) |
| [`apps/web-pwa/src/services/questionsService.ts`](file:///c:/Users/plegu/My%20Drive/Antigravity/Plegueviation%20exam/apps/web-pwa/src/services/questionsService.ts) | Carga, filtrado por categorías, aleatorización de opciones y pool de examen |
| [`cli/bin/build_banks.py`](file:///c:/Users/plegu/My%20Drive/Antigravity/Plegueviation%20exam/cli/bin/build_banks.py) | Compilador y validador de los 810 reactivos JSON hacia `all_questions.json` |
| [`banks/`](file:///c:/Users/plegu/My%20Drive/Antigravity/Plegueviation%20exam/banks) | Directorio maestro de bancos clasificados por categorías y flotas |
