# 📌 Estado Actual de la Sesión — Plegueviation Exam

> Este archivo sirve como memoria compartida entre ordenadores. Se actualiza automáticamente al decir **«graba para continuar luego»** y se lee tras hacer `git pull` al decir **«vamos a continuar desde donde lo dejamos»**.

- **Última sincronización:** 2026-10-19
- **Versión / Commit base:** `v3.7.0`
- **Total de reactivos compilados:** 2.262 preguntas activas (13 excluidas en `deleted_questions.json`)

## ✅ Trabajos completados en esta sesión
1. **Desinstalación y purga de flotas descontinuadas:**
   - Eliminados por completo los bancos y recursos de `fleet-c172n` y `fleet-p2010tdi`.
2. **Creación e integración de Flota Cessna 172F (TAE 125 / EC-NNX):**
   - Banco completo de 90 preguntas EASA en `banks/fleet-c172f/` con recortes visuales del AFM de Cessna 172F, suplemento TAE 125 y SOPs Blue Team.
3. **Creación e integración de Flota Diamond DA40 TDI (TAE 125 / EC-OKC):**
   - Banco completo de 92 preguntas EASA en `banks/fleet-da40d/` divididas en:
     - Limitaciones (`DA40D-LIM-*`): 20 preguntas
     - AFM Operación Normal (`DA40D-NORM-*`): 20 preguntas
     - Blue Team SOPs (`DA40D-SOP-*`): 8 preguntas
     - Emergencias AFM (`DA40D-EMG-*`): 24 preguntas
     - Sistemas de Aeronave (`DA40D-SYS-*`): 20 preguntas
   - 0% asimetría fuera de ±15%, distribución 25% A/B/C/D exacta (23 de cada una), citas literales y 58 recortes visuales oficiales a 200 DPI (`public/manual-crops/fleet-da40d/`).
4. **Tarjetas SOP Blue Team Flight School (Normal Operations):**
   - Añadidas 8 tarjetas operacionales completas en `apps/web-pwa/src/data/procedureCardsData.ts` con 37 recortes de alta resolución en `public/sop-diagrams/`.
   - Selector por Operador en `ProcedureCardsScreen.tsx`: Todos, Binter Canarias, Blue Team y NetJets Europe.
   - Cumplimiento estricto de contraste modo día (`.theme-light`) según skill `day-mode-ui-contrast`.
5. **Corrección de Desbordamiento de Texto en Infografías y UI:**
   - Reestructurado el layout de `.procedure-sop-step-overlay` y `.procedure-sop-step-grid` con `word-break: break-word`, `minmax(220px, 1fr)` y padding controlado para evitar que ningún texto se corte o sobresalga de sus tarjetas.
   - Ajustadas las cajas de texto y rotulación en las infografías SVG (`briefing-twin-autoland.svg`, `emg-egpws-terrain.svg`, `emg-tcas-ra.svg`, `emg-windshear.svg`, `briefing-lvo-lvto.svg`).
6. **Rediseño Ultrarrealista de Siluetas de Aeronaves en Infografías SVG:**
   - Sustituidos los polígonos geométricos simples por modelos vectoriales fieles a la realidad:
     - **Embraer 195-E2**: Turbofán PW1900G con góndolas y pilones, morro parabólico, parabrisas de 4 paneles, ventanillas de cabina, puertas y deriva con librea verde/azul de Binter Canarias (vista lateral y de planta).
     - **Diamond DA40 TDI (EC-OKC)**: Cola en T, cabina de burbuja de composite, hélice MT-Propeller tripala con cono de ogiva y carenados de ruedas aerodinámicos.
     - **Cessna 172F (EC-NNX)**: Ala alta arriostrada con montantes, hélice tripala MT-Propeller, empenaje Omni-Vision y tren triciclo.
   - Generada la nueva infografía vectorial `bt_sop_stabilized_approach_vector.svg` (Criterios de Aproximación Estabilizada 1000/500 ft, puertas de chequeo, técnicas Sideslip vs De-crab) conectada a la tarjeta SOP de Blue Team.
7. **Selector Granular de Subdivisiones Temáticas en Configuración de Examen:**
   - Rediseñado el modal de configuración de examen (`ExamConfigModal.tsx`) para permitir la selección no solo de bancos globales, sino de **subdivisiones específicas** por banco:
     - Acordeón interactivo por banco con botón desplegable (`ChevronDown` / `ChevronRight`).
     - Botones individuales para activar/desactivar subtemas específicos (ej. en Cessna 172F o DA40 TDI: *Emergencias*, *Limitaciones*, *Operación Normal*, *Sistemas Aeronave*).
     - Accesos directos para *«Marcar todas»* y *«Desmarcar»* dentro de cada banco, junto con contador en tiempo real de subtemas seleccionados (`X/Y subtemas`) y preguntas disponibles en el pool.
     - Presets directos añadidos para *Cessna 172F (EC-NNX)* y *Diamond DA40 TDI (EC-OKC)*.
     - Total compatibilidad con modo oscuro y modo día (`.theme-light`).
8. **Incorporación de Checklists Oficiales Cessna 172F (Normal V.6 y Emergencias V.4) con Soporte Multipágina:**
   - Creadas 2 tarjetas SOP exhaustivas añadidas a la sección de Blue Team (`procedureCardsData.ts`):
     - **Cessna 172F Normal Checklist V.6 (EC-NNX / TAE 125)**: Las 2 páginas oficiales integradas. Página 1 (Cabina, prevuelo, Before Engine Start, arranque motor TAE 125, comprobación de presión de aceite <3s, FADEC Backup Battery Test 10s, prueba de FADEC Test Button mantenido, Force B, rodaje) y Página 2 (Velocidades de despegue Vr 60, Vx 60-65, Vy 75, crucero, aproximación, Vref Flap 0-40º, frustrada, enfriamiento de turbo de 2 min y parada).
     - **Cessna 172F Emergency & Abnormal Checklist V.4 (EC-NNX / TAE 125)**: Las 2 páginas oficiales integradas. Página 1 (Fallo motor en carrera y tras despegue 65/60 kt, planeo y rearranque en vuelo 65 kt, luces FADEC y Force B, aterrizaje sin potencia, aterrizaje preventivo, amerizaje ditching) y Página 2 (Fuegos en arranque/vuelo/ala, fuego eléctrico con aislamiento de buses manteniendo FADEC, engelamiento inadvertido, estática alternativa y rueda desinflada).
   - Generados los 4 recortes visuales oficiales a 150 DPI de ambas páginas: `bt_c172f_normal_checklist_page-1.png`, `bt_c172f_normal_checklist_page-2.png`, `bt_c172f_emergency_checklist_page-1.png` y `bt_c172f_emergency_checklist_page-2.png`.
   - **Visor Interactivo Multipágina en `ProcedureCardsScreen.tsx`**: Botones selectores `[Pág. 1]` y `[Pág. 2]` en la cabecera de la figura para alternar instantáneamente entre ambas carillas de la lista sin perder los hitos operacionales.
9. **Verificación y Calidad:**
   - 0 errores de TypeScript (`tsc`).
   - Compilación completa con Vite (`npm run build`) validada con 10 tarjetas Blue Team activas y soporte interactivo multipágina.
10. **Simuladores Psicotécnicos AON / cut-e para Selección NetJets Europe (Stage 1 Aptitude & Reasoning Tests):**
    - Implementados dos simuladores completos con estándar oficial AON / cut-e bajo especificaciones exactas del candidato NetJets:
      - **AON Deductive Logical Reasoning (`scales sx` / Cuadrado Latino Sudoku)**:
        - Archivo: `apps/web-pwa/src/components/psychometrics/AonDeductiveScreen.tsx` y motor procedural `AonDeductiveGenerator.ts`.
        - Símbolos oficiales: Círculo (ámbar), Cuadrado (azul), Triángulo (verde), Cruz (rojo) y Rombo (púrpura).
        - Generador con algoritmo de satisfacción de restricciones y garantía matemática de solución única sin conjeturas.
        - Arranque progresivo en 4×4 que escala automáticamente a 5×5 al encadenar aciertos.
        - **Modo Examen Oficial**: 9 minutos (540s) de cuenta atrás, avance instantáneo, evaluación NetJets Performance Goal (≥80% aciertos, ≥18 resueltas).
        - **Modo Práctica**: Sin tiempo, con pistas lógicas interactivas (resaltado de fila/columna) y desglose paso a paso de la deducción.
        - Soporte para teclado numérico (teclas 1..5) y toques táctiles para iPad.
      - **AON Multitasking Capability (`scales mt` / Triple-Task Oficial 3-en-1)**:
        - Archivo: `apps/web-pwa/src/components/psychometrics/AonMultitaskingScreen.tsx`, motor de cálculo `AonMathEngine.ts` y motor de duplicados `AonDuplicateEngine.ts`.
        - **Tarea 1 (Flechas & Obstáculos)**: 4 carriles a 60 FPS (HTML5 Canvas) con oleadas descendentes de barreras y exactamente 1 carril libre/seguro. Control de aeronave con flechas `[←][→]`, teclas `A/D` o botones táctiles en iPad.
        - **Tarea 2 (Sumas y Restas Mentales)**: Operaciones continuas en formato `[ CORRECTO / INCORRECTO ]` (teclas `1` / `2`).
        - **Tarea 3 (Duplicados o No)**: Fila de 7 figuras geométricas de colores con detección inmediata de repeticiones en formato `[ DUPLICADO (2X) / ÚNICOS (1X) ]` (teclas `3` / `4`).
        - **Modo Examen Oficial**: 5 min (oficial), 8 min (resistencia) o 3 min (rápido) con ponderación oficial (30% Flechas + 40% Mates + 30% Duplicados).
        - **Modos Aislados de Entrenamiento Puro**: Selector directo para entrenar cada una de las 3 tareas por separado (Solo Flechas, Solo Mates, Solo Duplicados).
        - Efectos de sonido con sintetizador Web Audio API (acierto, fallo, paso de barrera, colisión) con control de silencio.
        - Historial local de intentos guardado en `localStorage` con indicadores de pase NetJets.
    - Acceso directo y badges integrados en el dashboard principal dentro del bloque **NetJets Europe Interview Prep**.
    - Compatibilidad plena con Modo Noche (Cockpit) y Modo Día (`.theme-light`).
    - 0 errores de TypeScript (`tsc`) y compilación Vite verificada.
11. **Fortificación y Soporte 100% Offline (PWA Offline-First):**
    - Sincronizado `CACHE_NAME` a `plegueviation-cache-v3.7.0` en Service Worker y package.json.
    - Plugin de Vite (`vite.config.ts`) configurado para inyectar automáticamente los bundles JS (`index-[hash].js`) y CSS (`index-[hash].css`) en `ASSETS_TO_CACHE` en `dist/sw.js`.
    - Pre-caching resiliente en `install` con `Promise.allSettled`, asegurando la descarga completa de la SPA, manifest y bancos de 2.262 preguntas.
    - Registro de Service Worker robusto en `App.tsx` para arranque inmediato en iPad y dispositivos móviles.
    - Acceso 100% offline garantizado tanto para los exámenes de preguntas como para los nuevos simuladores psicotécnicos AON.
12. **Estandarización Psicométrica Científica AON / cut-e (TCT, TRI, Stanine 1-9 y Percentiles):**
    - Archivo central: `apps/web-pwa/src/components/psychometrics/AonPsychometricsNorms.ts`.
    - Implementada aproximación analítica de alta precisión de la función de distribución acumulada normal estándar $\Phi(z)$ (Abramowitz & Stegun, error residual $< 7.5 \times 10^{-8}$).
    - Mapeo exacto de puntuaciones Z a **Escala Típica Stanine (1 a 9, $\mu=5, \sigma=2$)** y **Rango Percentil (PR 1% a 99%)**.
    - Calibración estricta contra baremos de grupos normativos de pilotos comerciales europeos (EASA Airline Pilot Applicants):
      - *Deductive Logic (`scales sx`)*: Examen oficial de 9 min, media $\mu = 18.2$, desviación típica $\sigma = 3.6$, con corrección de azar por fórmula psicométrica TCT $X_{\text{net}} = C - \frac{W}{k-1} = C - \frac{W}{3}$.
      - *Multitasking Capability (`scales mt`)*: Examen oficial de 5 min, baremos individuales para Triángulo ($\mu=72, \sigma=14$), Mates ($\mu=38, \sigma=7.5$) y Números ($\mu=42, \sigma=8$). Z-Score compuesto ponderado: $Z_{\text{comp}} = 0.35 Z_{\text{tri}} + 0.35 Z_{\text{math}} + 0.30 Z_{\text{num}}$.
      - Criterio de corte NetJets Europe / EASA Command: **Stanine $\ge 6$ (Percentil $\ge 60\%$)** calificado como *APTO / COMPETITIVO*, y **Stanine $\ge 7$ (Percentil $\ge 77\%$)** como *SUPERIOR / SOBRESALIENTE*.
    - Informes visuales en pantalla con barra gráfica de los 9 Estaninos (Campana de Gauss), percentil alcanzado, net score y dictamen psicométrico sin complacencia.
13. **Fidelidad Canónica AON / cut-e y Mecánica de Borradores Rayados (Deductive Logic):**
    - Colores canónicos exactos según especificación de Kura/AON: Cuadrado Rojo (`#dc2626`), Círculo Verde (`#65a30d`), Cruz Azul (`#0284c7`), Triángulo Amarillo (`#eab308`) y Rombo Púrpura (`#9333ea`).
    - Patrón SVG diagonal de figuras rayadas (`isHatched: true`) para marcas de borrador/lápiz.
    - Interacción ergonómica: pulsar cualquier celda vacía permite colocar y alternar figuras rayadas de ayuda; pulsar la casilla objetivo `[ ? ]` activa la selección final de la respuesta correcta en la botonera azul inferior idéntica a la plataforma oficial.
14. **Reestructuración Oficial AON Multitasking Capability (`scales mt` 3-en-1):**
    - Arquitectura fiel a la plataforma oficial de Kura / NetJets dividida en 3 zonas concurrentes:
      - **Zona Izquierda**: Fila de 7 figuras con 1 triángulo direccional `[ ◀ ]` o `[ ▶ ]` y barra temporal azul vertical que se vacía progresivamente (timeout oficial AON de 5.5s).
      - **Zona Superior Derecha**: Ecuación aritmética de 4 términos `[ CORRECTO ]` / `[ INCORRECTO ]`.
      - **Zona Inferior Derecha**: Secuencia numérica de 7 dígitos `[ DUPLICADO ]` / `[ NO DUPLICADO ]`.
    - Motor procedural `AonMultitaskingEngine.ts` con generación continua balanceada 50/50 y efectos sonoros sintetizados por Web Audio API 100% offline.
15. **Cumplimiento Riguroso de Contraste Modo Día (`day-mode-ui-contrast`):**
    - Estilos semánticos `.theme-light` en `apps/web-pwa/src/index.css` cubriendo tarjetas, cuadrículas, celdas de Cuadrado Latino, botonera azul, paneles de tareas y tarjetas de Estaninos y Percentiles, garantizando legibilidad perfecta sin fondos oscuros residuales.

## 🎯 Próximos pasos / Pendientes al retomar
- Entrenar sesiones diarias de 9 min en Deductive Logic y 5 min en Multitasking apuntando a Stanine $\ge 6$ (Percentil $\ge 60\%$).
- Probar el manejo táctil con figuras rayadas y atajos en iPad para maximizar la velocidad de resolución (<25s por reactivo).
- Probar exámenes personalizados combinando subdivisiones de Flota Cessna 172F y Flota Diamond DA40 TDI.
- Realizar pruebas interactivas de las tarjetas SOP de Blue Team en la PWA.


