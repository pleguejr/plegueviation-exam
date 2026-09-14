# 📜 Historial de Cambios y Versiones — Plegueviation Exam

Registro cronológico y técnico de la evolución de la plataforma **Plegueviation Exam**, incluyendo desarrollo del simulador PWA, compilación de bancos de preguntas, ingeniería psicométrica de distractores, aislamiento estricto de flotas y sincronización multidispositivo en la nube.

---

## 🚀 Versión Actual: v3.3.0 (2026-09-14)

### 📊 Cabecera, Tendencias y Tarjetas SOP Visuales
- **Versión en navbar:** `vX.Y.Z` inyectada desde `package.json` vía Vite.
- **Tendencia unificada:** gráfica de los últimos **25** resultados incluyendo **tests y flashcards**.
- **SOP modo día:** clases semánticas (`.procedure-*`) con contraste legible en tema claro.
- **Diagramas de aproximación:** circuitos Visual / Circling / NPA (SVG) basados en MOB 2.0.11 y SOPM Sec 2.
- **Infografía SOP:** franja de flujo, acentos por categoría, callouts y chips de rol rediseñados.

> Nota: el PDF SOPM no está en el repositorio (`manuales/` gitignored). Los diagramas reproducen los hitos oficiales de las tarjetas; al montar el SOPM se pueden sustituir por extracciones raster.

---

## 🔐 Versión v3.2.2 (2026-09-14)

### 🔐 Cierre de seguridad y operación
- **Eliminado `user_backup_070707.json` del CDN público** (ya no se sirve en GitHub Pages). El bootstrap server-side sigue disponible solo desde `banks/` cuando no hay KV.
- **Sync Modal** muestra el backend real (`kv` persistente vs `memory` temporal).
- **CLI `sync_reviews.py`:** SSL verificado + fetch vía POST (sin PIN en URL).
- Guía operativa: [`reference/OPERATIONS.md`](reference/OPERATIONS.md).

---

## ☁️ Versión v3.2.1 (2026-09-14)

### Sync Cloud Persistente (Upstash / Vercel KV)
- **Nuevo módulo `shared/api/syncStore.js`:** almacenamiento durable en Redis vía REST API.
- **Variables soportadas:** `UPSTASH_REDIS_REST_*` o `KV_REST_API_*` (Vercel KV nativo).
- **Fallback automático** a memoria si no hay credenciales (con log de error).
- **Bootstrap estático desactivado** cuando KV está activo (evita sobrescribir datos reales).
- Guía de configuración: [`reference/SYNC_SETUP.md`](reference/SYNC_SETUP.md).

---

## 🛡️ Versión v3.2.0 (2026-09-14)

### Robustez, Sync Seguro y Prevención de Regresiones
- **Motor de fusión compartido** (`shared/sync/syncMerge.js`): misma lógica en cliente y servidor; eliminaciones, custom questions y stats se reconcilian por timestamp.
- **Sync serializado:** mutex en cliente evita solapamiento de peticiones entre iPhone, iPad y PC.
- **Servidor con merge + historial:** el API ya no hace last-write-wins ciego; conserva hasta 3 snapshots por PIN para recuperación.
- **PIN fuera de URLs:** lectura cloud vía `POST action: fetch` (sin PIN en query string); CORS restringido a orígenes conocidos.
- **Snapshots locales:** tabla Dexie `syncSnapshots` (últimos 5) antes de sync y restore; rollback manual posible.
- **Restore seguro:** importar backup fusiona en lugar de sobrescribir IndexedDB.
- **Tipos unificados:** PWA reexporta desde `@plegue/core-engine`.
- **CI + tests:** Vitest para merge/sync; workflow `ci.yml`; releases etiquetadas con `release.yml`.
- **Service Worker:** versión de caché alineada automáticamente con `package.json` en cada build.

---

## 📊 Versión v3.1.0 (2026-09-10)

### 📊 Tablas Operacionales de Consulta Rápida
- **Nueva vista `OperationalTablesScreen`:** Pantalla dedicada con tablas de referencia consultables sin conexión.
- **Contenido integrado:**
  - Planificación alterna y mínimos operacionales (MOA 8.1.7).
  - Memory Items Embraer 195-E2.
  - Limitaciones operacionales E2.
  - Estructura MOA (capítulos aplicables).
  - Mínimos VFR.
- **Datos estáticos en** [`apps/web-pwa/src/data/operationalTablesData.ts`](apps/web-pwa/src/data/operationalTablesData.ts).

### 📈 Estado del Catálogo (compilado)
| Flota / categoría | Preguntas |
| :--- | ---: |
| Preparación Prueba de Comandante (Binter Ops) | 1.375 |
| Flota Cessna 172N | 257 |
| Flota Tecnam P2010 TDI | 254 |
| Simulador E2 | 237 |
| Flota Embraer 195-E2 | 20 |
| **Total activo** (`all_questions.json`) | **2.143** |
| Excluidas por usuario (`deleted_questions.json`) | 13 |
| Pendientes de revisión | 1 |

---

## 🎛️ Versión v3.0.0 (2026-09-08)

### 🃏 Tarjetas de Procedimientos SOP y Emergencias
- **Nueva vista `ProcedureCardsScreen`:** Consulta interactiva de procedimientos operativos y emergencias desde el Centro de Control.
- **Mnemónicos Binter auditados:** TWIN, RETSE, E-DALTA, TELSI, IMFLOCC, MEANA con callouts de cabina corregidos.
- **Datos en** [`apps/web-pwa/src/data/procedureCardsData.ts`](apps/web-pwa/src/data/procedureCardsData.ts).

---

## 🔄 Versión v2.9.0 (2026-09-06)

### ☁️ Sincronización Cloud Robusta
- **PIN unificado `070707`** en todos los dispositivos y scripts CLI.
- **Baseline estática CDN** (`user_backup_070707.json`) como fallback cuando el servidor no tiene datos en memoria.
- **Inclusión de `reviewRequests`** en el payload de sync y auto-sync al enviar auditorías.
- **Botón de force-update PWA** en ajustes con listener de Service Worker para recarga inmediata.
- **Exclusión de 13 preguntas** eliminadas por el usuario durante la compilación de bancos.

---

## 📚 Versión v2.8.0 (2026-08-28)

### ✈️ Expansión Masiva del Banco Binter Ops y Simulador E2
- **Banco Comandante ampliado** con MOA 8.2–8.4, 8.7–8.8, 9–12, MOB 2.0/3.0, escenarios de mando, DDPM/MEL/CDL y sistemas E195-E2.
- **Simulador E2 (237 reactivos):** Flashcards atómicas (1 concepto por pregunta) derivadas de RemNote (Memory Items, NUMBERS, K KNOWLEDGE).
- **Skills MTM indexados** con conocimiento oficial del Embraer Maintenance Training Manual.
- **Corrección offline:** Eliminados timestamps de cache-busting para que el Service Worker sirva bancos en modo avión.

---

## 🧠 Versión v2.7.0 (2026-08-25)

### 🔁 Flashcards con Repetición Espaciada Inteligente
- **Priorización dinámica:** Preguntas difíciles y no vistas primero.
- **Tracking de visualizaciones:** `flashcardViews`, `flashcardLastRating`, `flashcardLastViewedAt` sincronizados en la nube.
- **Selector de lote:** 15 / 25 / 50 / todas las tarjetas por sesión.
- **Botones de dominio** inmediatamente bajo la respuesta revelada.

---

## 🌓 Versión v2.6.0 (2026-08-23)

### 🎨 Tema Día / Noche y Paleta Corporativa Binter
- **Toggle instantáneo** en Navbar y panel de Ajustes.
- **Modo Día completo** con contraste optimizado en examen, flashcards, modales y Centro de Control.
- **Gráfico de progreso** por banco con colores corporativos Binter Canarias.

---

## 🛡️ Versión v2.3.0 (2026-08-22)

### Aislamiento Estricto de Flotas y Renderizado de Tablas Técnicas
- **Corrección de mezcla visual de flotas:** Eliminado el *fallback* automático hacia la Tecnam P2010 en [`ExamScreen`](apps/web-pwa/src/components/ExamScreen.tsx), [`ExamResults`](apps/web-pwa/src/components/ExamResults.tsx) y [`QuestionExplorer`](apps/web-pwa/src/components/QuestionExplorer.tsx).
- **Módulo [`aircraftRules.ts`](apps/web-pwa/src/utils/aircraftRules.ts):** Clasificación determinista de flotas y reglas de visualización de tablas auxiliares.
- **Auditoría de contaminación cruzada** entre flotas en enunciados, opciones y referencias.

---

## 🎯 Versión v2.2.0 (2026-08-22)

### ⚖️ Ingeniería Psicométrica EASA y Calidad de Distractores
- Rebalanceo de longitud de opciones para eliminar sesgo hacia la respuesta correcta.
- Corrección de distractores idénticos o de relleno en P2010, C172N y Command Upgrade.
- Skill [`easa-distractor-engineering`](.agents/skills/easa-distractor-engineering/SKILL.md).

---

## 📚 Versión v2.1.0 (2026-08-20)

### Expansión Inicial a 810 Preguntas
- Preparación Comandante / Binter Ops (310), Tecnam P2010 TDI (250), Cessna 172N (250).

---

## ⚡ Versión v2.0.0 (2026-08-19)

### PWA 100% Offline, Sync en la Nube y Flujo de Examen
- Auto-avance inteligente en aciertos.
- Cloud Sync REST con IndexedDB (Dexie.js) y API serverless Vercel.
- Explorador de preguntas, estadísticas y tablas `<SpeedSummaryTable>` / `<PlanningMinimaTable>`.

---

## 🏗️ Arquitectura y Componentes Clave

```
plegueviation-exam/
├── apps/web-pwa/          ← PWA React + Vite (frontend principal)
├── packages/core-engine/  ← Motor compartido: selección, scoring, tipos
├── banks/                 ← Fuente de verdad de preguntas JSON
├── cli/bin/               ← build_banks.py, import, sync_reviews
├── shared/api/            ← Handler sync serverless (fuente única)
└── api/                   ← Entrypoint Vercel (raíz del repo)
```

| Componente / Archivo | Propósito |
| :--- | :--- |
| [`packages/core-engine/`](packages/core-engine/) | Algoritmos de selección de examen, scoring y tipos compartidos |
| [`apps/web-pwa/src/utils/aircraftRules.ts`](apps/web-pwa/src/utils/aircraftRules.ts) | Clasificación de flota y reglas de tablas auxiliares |
| [`apps/web-pwa/src/services/questionsService.ts`](apps/web-pwa/src/services/questionsService.ts) | Carga de bancos, I/O IndexedDB y generación de exámenes |
| [`apps/web-pwa/src/services/db.ts`](apps/web-pwa/src/services/db.ts) | Persistencia Dexie, stats, backup y restore |
| [`apps/web-pwa/src/services/sync.ts`](apps/web-pwa/src/services/sync.ts) | Cliente de sincronización cloud |
| [`cli/bin/build_banks.py`](cli/bin/build_banks.py) | Compilador y validador hacia `public/banks/all_questions.json` |
| [`shared/api/syncHandler.js`](shared/api/syncHandler.js) | Lógica única del endpoint `/api/sync` |
| [`banks/`](banks/) | Bancos clasificados por flota y categoría |

### Decisiones de limpieza arquitectónica (2026-09-14)
- **`core-engine` integrado en la PWA** vía alias Vite; elimina duplicación con `questionsService` y `App.tsx`.
- **`shared/api/syncHandler.js`** como fuente única del handler; los entrypoints en `api/` y `apps/web-pwa/api/` reexportan.
- **Extractos AFM** (`sec*.txt`) movidos a [`reference/extracts/p2010-afm/`](reference/extracts/p2010-afm/) — material de referencia para autoría, no usado en runtime.
