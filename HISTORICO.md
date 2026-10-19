# 📜 Historial de Cambios y Versiones — Plegueviation Exam

Registro cronológico y técnico de la evolución de la plataforma **Plegueviation Exam**, incluyendo desarrollo del simulador PWA, compilación de bancos de preguntas, ingeniería psicométrica de distractores, aislamiento estricto de flotas y sincronización multidispositivo en la nube.

---

## 🚀 Versión Actual: v3.7.0 (2026-10-19)

### 🧠 Simuladores Psicotécnicos AON / cut-e para Selección NetJets Europe (Deductive Logic & Multitasking)
- **Simulador AON Deductive-Logical Reasoning (`scales sx` / Cuadrado Latino Sudoku):**
  - Motor generativo procedural `AonDeductiveGenerator.ts` para matrices Sudoku / Cuadrado Latino (4×4 y 5×5) con figuras geométricas retina (Círculo, Cuadrado, Triángulo, Cruz, Rombo) garantizando unicidad matemática de solución lógica sin adivinación.
  - Modo Examen Oficial de 9 minutos (540s) con cuenta atrás estricta y progresión dinámica (arranque en 4×4 que escala automáticamente a 5×5 al encadenar aciertos).
  - Modo Práctica sin tiempo con sistema interactivo de pistas de deducción paso a paso y descarte guiado.
  - Soporte ergonómico para teclado físico numérico (`1..5`) y teclado táctil de alto rendimiento adaptado a iPad/tabletas.
  - Métricas de rendimiento, precisión neta y baremo NetJets Europe Pass/Review con persistencia local en `localStorage`.
- **Simulador AON Multitasking & Mental Arithmetic (`scales mt` / Capacidad Multitarea):**
  - Motor de doble tarea concurrente a 60 FPS en HTML5 Canvas con avión esquivando obstáculos en corredor vertical (`[←][→]`, `A/D` y controles táctiles en pantalla).
  - Tarea concurrente de cálculo mental rápido de sumas y restas en formato oficial **`[ CORRECTO / INCORRECTO ]`** generado por `AonMathEngine.ts` con distractores sutiles ($\pm 1, \pm 2, \pm 10$). Atajos de teclado: `1` / `C` para Correcto, `2` / `I` para Incorrecto.
  - Modo Examen Oficial de 8 minutos (480s) con cálculo de penalizaciones por colisión e impacto ponderado en el Net Score.
  - Modalidad exclusiva **«Entrenamiento Puro de Cálculo Mental AON»** para práctica intensiva aislada de operaciones mentales rápidas bajo presión temporal antes del dual-task.
  - Síntesis de sonido procedural vía Web Audio API (pitidos correctos, errores, advertencias de tiempo) con control de silencio.
- **Integración de Navegación y Visibilidad PWA:**
  - Nueva pestaña permanente **«Psicotécnicos AON»** con icono cerebral (`Brain`) en el `Navbar.tsx` superior para acceso directo sin necesidad de scroll.
  - Banner destacado de lanzamiento rápido en la cabecera superior del `Dashboard.tsx` y sección dedicada dentro de la tarjeta de NetJets Europe Interview Prep.
  - Soporte completo y contraste optimizado en Modo Día (`.theme-light`) y Modo Noche en `index.css`.

---

## 🚀 Versión: v3.6.0 (2026-10-11)

### 🛩️ Incorporación Diamond DA40 TDI (EC-OKC), Flota C172F, Purga C172N/P2010 y Tarjetas SOP Blue Team
- **Desinstalación y purga de flotas descontinuadas:** Retirada completa de los bancos y recursos de `fleet-c172n` y `fleet-p2010tdi`.
- **Nueva Flota Cessna 172F (TAE 125 / EC-NNX):** Banco de 90 preguntas EASA con extractos literales del manual y suplemento TAE 125 y SOPs Blue Team.
- **Nueva Flota Diamond DA40 TDI (TAE 125 / EC-OKC):**
  - Banco de 92 preguntas EASA en `banks/fleet-da40d/` (Limitaciones, Operación Normal AFM, SOPs Blue Team, Emergencias y Sistemas).
  - Distribución perfectamente equilibrada (~25% por opción: 23 A, 23 B, 23 C, 23 D), 0% asimetría fuera de ±15%, y 58 recortes visuales a 200 DPI extraídos del AFM oficial (`DA40-TDI-AFM.pdf`, Doc. # 6.01.05-E).
- **Tarjetas SOP Blue Team Flight School (Normal Operations & Checklists):**
  - **10 tarjetas operacionales completas** en `procedureCardsData.ts` integrando figuras oficiales en `public/sop-diagrams/`:
    - Briefing Normal IFR y Briefing Visual Corto (SOP 6.8 & 6.9)
    - Briefing de Despegue y 4 Escenarios de Fallo Monomotor (SOP 6.10)
    - Despegue «Luces, Cámara y Acción» y Flujo 500 ft AGL (SOP 6.11)
    - Crucero y Chequeo Periódico FREDA cada 20 min (SOP 6.13)
    - Criterios de Aproximación Estabilizada y Viento Cruzado De-crab vs Sideslip (SOP 4 & 6.16)
    - Go-Around «POTENCIA, MORRO Y FLAP» (SOP 6.17)
    - Maniobras Avanzadas VFR, 5 Tipos de Pérdidas y Vuelo Lento (SOP 9.9)
    - Procedimientos Locales Tenerife Sur (GCTS) y Norte (GCXO / Anaga F22) (SOP 7)
    - Callouts Oficiales de Cabina y Parámetros (SOP 11)
    - **Cessna 172F Normal Checklist V.6 (EC-NNX / TAE 125)**: Integradas las 2 páginas oficiales. Pág. 1: Cabina, prevuelo, arranque TAE 125, presión aceite <3s, FADEC backup test, botón FADEC, Force B y rodaje. Pág. 2: Despegue (Vr 60, Vx 60-65, Vy 75), crucero, aproximación, Vref, frustrada, enfriamiento de turbo 2 min y parada.
    - **Cessna 172F Emergency & Abnormal Checklist V.4 (EC-NNX / TAE 125)**: Integradas las 2 páginas oficiales. Pág. 1: Fallo motor despegue/vuelo, planeo (65 kt), rearranque, luces FADEC y Force B, toma forzosa y amerizaje. Pág. 2: Fuegos (puesta en marcha, vuelo, ala, fuego eléctrico aislando buses sin cortar FADEC), engelamiento, toma estática y rueda pinchada.
    - **Visor Multipágina con selector interactivo**: Botones `[Pág. 1]` y `[Pág. 2]` en cada tarjeta para alternar cómodamente entre ambas carillas de la lista original.
  - Filtro por Operador en `ProcedureCardsScreen.tsx`: Todos, Binter Canarias, Blue Team Flight School y NetJets Europe.
- **Rediseño Ultrarrealista de Infografías Vectoriales & Corrección de Textos:**
  - Sustituidos los polígonos geométricos simples por siluetas detalladas con libreas y fisonomía real:
    - **Embraer 195-E2**: Motores PW1900G con pilones, 4 paneles de cabina, ventanillas y librea oficial Binter Canarias (verde y azul) en planta y perfil.
    - **Diamond DA40 TDI (EC-OKC)**: Cola en T, cabina de composite, hélice tripala MT-Propeller con cono y carenados de ruedas.
    - **Cessna 172F (EC-NNX)**: Ala alta con montantes de arriostramiento, hélice MT-Propeller, deriva Omni-Vision de 1965 y tren triciclo.
  - Corrección integral de desbordamientos de texto en el overlay de pasos SOP (`.procedure-sop-step-overlay`, `ProcedureCardsScreen.tsx` e `index.css`) y en las infografías SVG.
  - Nueva infografía vectorial `bt_sop_stabilized_approach_vector.svg` incorporada en la tarjeta SOP de Blue Team sobre aproximación estabilizada (1.000 ft / 500 ft, puertas y técnicas de viento Sideslip vs De-crab).
- **Selector Granular de Subdivisiones Temáticas en Configuración de Examen:**
  - Rediseñado el modal `ExamConfigModal.tsx` con soporte de acordeón desplegable para cada banco de preguntas.
  - Selección individual y combinada de subdivisiones operacionales (ej. en Cessna 172F y Diamond DA40: *Emergencias*, *Limitaciones*, *Operación Normal*, *Sistemas Aeronave*).
  - Acciones rápidas para *«Marcar todas»* y *«Desmarcar»* dentro de cada categoría, conteo de preguntas disponibles en el pool en tiempo real y nuevos accesos directos (*Cessna 172F* y *Diamond DA40 TDI*).
- **Compilación de catálogo:** Compilados y validados los 2.262 reactivos activos con 0 errores de esquema y 0 errores de TypeScript (`npm run build` exitoso).

---

## 🚀 Versión: v3.5.6 (2026-10-10)

### 📖 Evidencia Literal de Manuales + Recortes PDF (200 DPI) + Infografías SOP 1600×1150 y Compilación de Bancos
- **Enriquecimiento con extractos literales y recortes visuales (200 DPI):** Script `cli/bin/enrich_explanations_with_crops.py` y skill `manual-literal-extractor` para inyectar citas textuales (`> 📖 Extracto Literal del Manual...`) y recortes PNG a 200 DPI (`apps/web-pwa/public/manual-crops/`) extraídos de los manuales oficiales (MOA, MOB, QRH, AFM, POH, MEL, DDPM, EASA) en las explicaciones de los **2.573 reactivos**, renderizados en `FormattedText.tsx`.
- **Rediseño de las 16 infografías vectoriales SOP (`1600×1150`):** Sustitución de imágenes raster por diagramas SVG vectoriales de alta resolución con librea oficial Binter Canarias del Embraer 195-E2 en todas las tarjetas SOP (normales, especiales, emergencias y NetJets).
- **Flujo de Emergencia del Comandante (`flow-emergencia-comandante`):** Tarjeta e infografía dedicada con secuencia íntegra Binter (Golden Rules, Fuel/Time, MEANA, IMFLOCC, E-DALTA, TELSI y las 4 Últimas Listas).
- **Compilación general de bancos (`build_banks.py`):** Empaquetado y validación de los **2.573 reactivos** en `apps/web-pwa/public/banks/all_questions.json` y `manifest.json`, sincronizando versión y caché PWA a `v3.5.6`.

---

## 🎯 Versión v3.5.1 (2026-10-08)

### 🎯 Optimización Psicométrica NetJets & Espectro de Velocidades Jet (`0 – VDF`)
- **NetJets Europe (9 bancos):** Rebalanceo integral de distractores y eliminación de sesgo de longitud en todas las preguntas de preparación de entrevista.
- **Aerodinámica y V-Speeds:** Optimización de distractores de performance jet e incorporación de infografía técnica de espectro continuo de velocidades (`0 – VDF`).

---

## 🃏 Versión v3.4.9 (2026-10-07)

### 🃏 Flashcards en las 18 Tablas Operacionales, Panel de Auditoría y Purga Psicométrica
- **Flashcards interactivas en TABLAS:** Mazo completo de flashcards y botones disparadores en las **18 tablas operacionales**, más botones de navegación rápida `Volver arriba` en cada tabla y tarjeta SOP.
- **Panel de Auditoría (`AuditModificationsPanel`):** Sustitución del panel de PDF por registro interactivo de auditoría y adición de nuevos reactivos de velocidades V y MOA 8.2 / 9.
- **Purga de muletillas y balanceo de claves:** Eliminación de 170 cláusulas repetitivas en 16 bancos, limpieza de artefactos de fórmulas y distribución equilibrada (~25% A/B/C/D) en todo el catálogo.
- **Fix de rendimiento UI:** Eliminación de bucle de re-renderizado en cascada al montar el Dashboard.

---

## 🌍 Versión v3.4.8 (2026-10-05)

### 🌍 NetJets Europe 100% English (121 preguntas), Tablas 1/1A/1B Alternativos y Diagramas Técnicos
- **NetJets Europe Interview Prep:** Implementación y traducción íntegra al inglés de 9 subbancos (121 reactivos: Historia, Fuel Schemes, LVO/Approach Ban, ORO.FTL, RVSM/PBN, Aircrew, Jet Aero, Meteo IFR y CRM), tablas sintéticas EASA y simulador de entrevista ampliado con 8 modos de lanzamiento rápido.
- **Mínimos de Planificación de Alternativos (Tabla 1 / 1A vs 1B):** Banco específico de mínimos de planificación y rectificación de mínimos Circling (`MDA/H + 400 ft` y `VIS + 1500 m`).
- **Flashcards Típicas Comandante:** Modo de estudio con repetición espaciada **Leitner** y presets en el banco Command Course.
- **Diagramas vectoriales en TABLAS:** Infografías técnicas vectoriales con soporte nativo modo día/noche en todas las tablas operacionales y sustitución de tokens LaTeX por símbolos Unicode limpios.

---

## 📋 Versión v3.4.7 (2026-09-24)

### 📋 Alineación MOA ED06 RN27 RT00, APU INOP, Pesos Estándar y Consolidación Command Course
- **Alineación MOA ED06 RN27 RT00:** Sincronización 100% fiel de tarjetas SOP y tablas operacionales; nueva pestaña de procedimientos especiales/complementarios con tarjetas de **Arranque con APU INOP** y **Llegada con APU INOP**.
- **Tabla de Masas Estándar (MOA 8.1.8):** Nueva tabla operacional de pesos estándar de pasajeros (88 kg / 70 kg), equipaje y tripulación, actualizando `CMD-EXP26-015`, `CMD-EXP26-066` y añadiendo 8 preguntas de MOA 8.2 y 8.1.8.
- **Consolidación Command Course:** Integración de «Típicas Preguntas Comandante» en el banco especial (190 ítems), filtro estricto de las 25 preguntas oficiales en inglés (`FOR-ENT-006`) y guía de referencias de estudio con contraste mejorado en modo día.

---

## ☀️ Versión v3.4.6 (2026-09-19)

### ☀️ Command Course — título y contraste día
- Eliminado el encabezado «Examen Convocatoria Anterior (Command Course)» del banco especial (queda el badge + descripción).
- Overrides `.theme-light` para `.command-course-hero-card` y botones de acceso rápido (fondo claro, textos oscuros legibles).

---

## 🔍 Versión v3.4.5 (2026-09-15)

### 🔍 Auditoría reportes PWA (BIN-SOP)
- **BIN-SOP-124**: Vra bajo 10.000 ft corregida **240 → 250 KIAS** (RemNote NUMBERS / AOM).
- **BIN-SOP-119**: Vle corregida **250 → 265 KIAS**; Vlo Ext 250 / Ret 220 confirmadas.
- **BIN-SOP-128**: dato SERA 20 min confirmado; stem y distractores reforzados (sin “controlled rest”).
- TABLAS UI (`operationalTablesData`) alineada con las mismas cifras.

---

## 🔄 Versión v3.4.4 (2026-09-15)

### 🔄 Sync + banco SOP/TABLAS
- Modal **Sincronización Multi-Dispositivo**: tarjeta «Flujo de creación de preguntas» (Drive → NotebookLM → skills TRE → `banks/` → Vercel/PIN) con overrides modo día.
- Nuevo banco **Binter Ops → Procedimientos Operativos / SOPs**: 85 reactivos sobre tarjetas SOP y TABLAS (MCQ + alto ratio flashcards numéricas/acrónimos), fidelidad a `procedureCardsData` / `operationalTablesData`.

---

## 🧾 Versión v3.4.3 (2026-09-15)

### 🧾 Skill proceso creación de preguntas
- Nuevo skill orquestador `.agents/skills/question-creation-process/SKILL.md`: flujo completo acotar → Metaprompt/NotebookLM → auditoría TRE → Antigravity → `banks/`.
- Complementa `manual-bank-expansion`, `aviation-question-authoring` y `easa-distractor-engineering`.

---

## 📚 Versión v3.4.2 (2026-09-15)

### 📚 Flujo seguro Manuales Drive → bancos
- Documentado el pipeline **Drive (`Antigravity/manuales`) → NotebookLM/Gemini → Cursor (skills TRE) → Antigravity (schema) → `banks/`**.
- Skills: `manual-bank-expansion`; Metaprompt reforzado (distractores difíciles legítimos).
- PDFs de manuales **no** entran en GitHub (`manuales/` gitignored).

---

## ☀️ Versión v3.4.1 (2026-09-15)

### ☀️ Contraste modo día — Comunicados Ops
- Corrige panel Comunicados que quedaba en fondo cockpit oscuro en modo día (texto ilegible).
- Skill `day-mode-ui-contrast` para exigir overrides `.theme-light` en cada superficie nueva.

---

## 📬 Versión v3.4.0 (2026-09-15)

### 📬 Comunicados Ops (PDF empresa → banco)
- Panel colapsable bajo la bitácora: **Comunicados & notificaciones**.
- Flujo rápido (2 gestos en app): **subir PDF** (extracción local) → **Copiar para Gemini** (prompt+texto) → pegar JSON → banco `comunicados-ops`.
- Sin conexión al correo de empresa (más seguro).

---

## 📒 Versión v3.3.9 (2026-09-15)

### 📒 Bitácora de vivencias + Memory Items en negro
- **Memory Items / acciones inmediatas:** texto negro intenso (`#0a0a0a`) para resaltar sobre el resto de la tarjeta.
- **Dashboard:** panel **Vivencias de vuelo y simulador** bajo el Centro de información — registra eventos (real/sim) y crea banco personalizado `vivencias-ops`.

---

## 🎨 Versión v3.3.8 (2026-09-15)

### 🎨 Paleta suave SOP + TABLAS
- **Emergencias SOP:** fondo rojo suave (`#fef2f2`), sin tonos salmón intensos.
- **Memory Items:** marco rojo-anaranjado (`#fff4ed`); acciones inmediatas con chips naranja (`#f97316`) que resaltan sin marrón.
- **Limitaciones TABLAS:** fondo naranja suave (`#fff7ed` / `#fdba74`).

---

## 🎨 Versión v3.3.7 (2026-09-14)

### 🎨 SOP emergencias + TABLAS modo día
- **SOP Emergencias:** marco salmón sustituido por rosa polvo suave (`#f3ecee` / `#a67a82`), menos chillón en modo día y noche.
- **TABLAS OPS:** contraste completo en modo día (hero, pestañas, tarjetas, tablas) con clases semánticas `ops-tables-*`.
- **Memory Items (tabla):** columna «Acciones inmediatas» con pasos numerados diferenciados (no agolpados en un bloque).

---

## 🔋 Versión v3.3.6 (2026-09-14)

### 🔋 Tarjeta SOP Power Banks 2026
- Nueva tarjeta **Power Banks en Vuelo — Normativa 2026** (BOE / OACI / IATA): reglas de pasajeros, uso operativo ≤100 Wh, riesgos (fuga térmica) y marco legal (vigencia 27/03/2026).
- Figura de referencia en `apps/web-pwa/public/sop-diagrams/powerbanks-normativa-2026-fig.jpg`.

---

## 🎨 Versión v3.3.5 (2026-09-14)

### 🎨 SOP modo día + Memory Items legibles
- **Cabecera SOP y marco de tarjetas** con más contraste en modo día (marco tintado por categoría + cuerpo blanco).
- **Memory Items** priorizados: pasos numerados espaciados, tipografía mono destacada y secciones «Acciones inmediatas» a ancho completo.
---

## 🔎 Versión v3.3.3 (2026-09-14)

### 🔎 Buscador modo día + test desde resultados
- **Modo día:** contraste del cuadro de búsqueda del dashboard (fondo claro, texto oscuro, borde verde).
- **Questions:** banner «Hacer test con estas N» tras buscar; también desde la vista previa del dashboard.

---

## 🔎 Versión v3.3.2 (2026-09-14)

### 🔎 Buscador, Sync info y SOP limpio
- **Dashboard:** el banner de sistema se sustituye por un **buscador de preguntas** (stem, LO, opciones, explicación).
- **Sync Modal:** aloja la info de sistema (Binter/flotas, offline, reactivos, flashcards) + botón **Actualizar PWA**.
- **SOP:** eliminados los esquemas SVG de estudio; las figuras SOPM llevan **hitos coloreados** profesionales.

---

## 🧾 Versión v3.3.1 (2026-09-14)

### 📊 Cabecera, Tendencias y Tarjetas SOP Visuales
- **Versión en navbar:** `vX.Y.Z` inyectada desde `package.json` vía Vite.
- **Tendencia unificada:** gráfica de los últimos **25** resultados incluyendo **tests y flashcards**.
- **SOP modo día:** clases semánticas (`.procedure-*`) con contraste legible en tema claro.
- **Figuras SOPM (raster landscape):** recortes oficiales 16:10 en `apps/web-pwa/public/sop-diagrams/` (Visual, Circling, NPA/RNAV, ILS, OEI ILS, OEI Visual, OEI Circling, OEI NPA, No Slat/Flap) con visor horizontal (scroll) para evitar cortes verticales.
- **Tarjetas nuevas (sin sustituir las actuales):** ILS precisión, ILS OEI, Visual OEI, Circling OEI, NPA OEI, No Slat/Flap Landing.
- **Esquemas SVG estilo Embraer:** cinta isométrica + callouts + chips para todas las aproximaciones (complemento de estudio a la figura SOPM).
- **Infografía SOP:** figura hero, hitos numerados, secuencia visual y secciones en rejilla; contenido textual intacto.

> Nota: el PDF SOPM no está en el repositorio (`manuales/` gitignored). Las figuras raster se extraen de capturas del manual del usuario para estudio personal.

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
