# 📌 Estado Actual de la Sesión — Plegueviation Exam

> Este archivo sirve como memoria compartida entre ordenadores. Se actualiza automáticamente al decir **«graba para continuar luego»** y se lee tras hacer `git pull` al decir **«vamos a continuar desde donde lo dejamos»**.

- **Última sincronización:** 2026-10-20
- **Versión / Commit base:** `v3.8.0`
- **Total de reactivos compilados:** 2.287 preguntas activas (13 excluidas en `deleted_questions.json`)

## ✅ Trabajos completados en esta sesión
1. **Reorientación del Banco de Expresiones en Inglés a Traducción y Significado Directo:**
   - Reformulado el 100% del banco `banks/netjets-interview/expresiones-ingles-psicotecnico/netjets_eng_psychometrics.json` (25 preguntas):
     - Enunciados enfocados directamente en la traducción exacta y significado en español: *«En el test psicotécnico de personalidad en inglés (IPIP-NEO / cut-e), ¿cuál es la traducción y significado correcto en español de la afirmación: «...»?»*.
     - Opciones A, B, C, D limpias, plausibles y equilibradas (6/6/6/7) con expresiones comunes (*«on a whim»*, *«soft-hearted»*, *«seldom get mad»*, *«down in the dumps»*, *«coddle»*, *«splurge»*, *«wary of others»*, etc.).
     - Explicación estructurada conservando la traducción literal, constructo IPIP-NEO Big Five, subfaceta, relevancia CRM para tripulación y orientación de respuesta psicométrica recomendada (1 a 5).
2. **Nuevo Mazo de Flashcards de Expresiones en Inglés (25 Tarjetas):**
   - Integrado en `FlashcardScreen.tsx` bajo la categoría especial `custom_english_expressions` con título *«🇬🇧 Expresiones en Inglés Psicotécnico (25)»*.
   - Añadido en el selector desplegable de mazos especiales (`<optgroup label="⭐ Mazos Especiales">`).
   - Insignia visual propia (`getFlashcardBadge`): *«🇬🇧 Inglés / Traducción»*.
   - Compatible con modo de recuerdo activo puro (ocultando opciones en el anverso para evocar mentalmente el significado de la expresión) y modo con opciones.
3. **Acceso Dual en el Dashboard (Stage 2 NetJets):**
   - Tarjeta de Stage 2 en el Dashboard actualizada con dos botones de acción directa:
     - `📖 Modo Test (25)`: Lanza el examen de práctica para poner a prueba las traducciones.
     - `🗂️ Flashcards (25)`: Abre inmediatamente el mazo de tarjetas de memoria con repetición espaciada y recuerdo activo.
   - Ajuste de contraste para modo claro (`.theme-light .netjets-aon-english-card button`) cumpliendo estrictamente con `day-mode-ui-contrast`.
4. **Actualización de Terminología NetJets (Stage 1 ➔ Stage 2):**
   - Corregida la denominación oficial del proceso de selección de NetJets Europe en la interfaz de la PWA:
     - Banner superior del Dashboard: *«NetJets Stage 2 • Tests Psicotécnicos AON / cut-e & Expresiones»*.
     - Subtítulo del panel: *«Simuladores Oficiales AON (Deductive Logic & Multitasking) y Expresiones en Inglés»*.
     - Encabezado de sección: *«Stage 2: AON / cut-e Aptitude, Reasoning & Psychometrics»* y badge *«NetJets Pilot Selection Stage 2»*.
     - Simulador Multitarea (`AonMultitaskingScreen.tsx`): actualizado a *«Stage 2 NetJets Europe»*.
5. **Garantía 100% Offline-First en la PWA:**
   - Compilación exitosa del catálogo completo a `apps/web-pwa/public/banks/all_questions.json` (2.287 preguntas) y `manifest.json`.
   - Service Worker actualizado a la caché versionada `plegueviation-cache-v3.8.0`.
   - Inyección automática por Vite de los nuevos bundles JS/CSS generados y recursos críticos en `dist/sw.js` con pre-cacheo atómico en segundo plano.
6. **Cumplimiento de Contraste Modo Día (`day-mode-ui-contrast`):**
   - Agregada regla `.theme-light .netjets-aon-english-card` y botones asociados en `apps/web-pwa/src/index.css` garantizando legibilidad y contraste superior sobre fondos claros.
7. **Verificación Técnica:**
   - 0 errores de TypeScript (`tsc`).
   - Compilación Vite limpia sin errores (`npm --prefix apps/web-pwa run build`).
   - Suite de tests unitarios ejecutada exitosamente con Vitest (7/7 tests pasando).
8. **Calibración Psicométrica y Dificultad Real KURA / PASS-Pilot (Deductive Logic `scales sx`):**
   - **Control de Profundidad Deductiva (Depth ≥ 2 o ≥ 3):**
     - Eliminada por completo la resolución directa de la incógnita `[ ? ]` en 1 paso. El motor procedural exige de 1 a 3 deducciones intermedias encadenadas antes de que la incógnita sea matemáticamente deducible, reproduciendo el desafío real de PASS-pilot assessments y el test oficial de Kura.
     - Densidad de celdas vacías calibrada al estándar de aerolínea: 4×4 con 8-10 celdas vacías (50-62.5% vacías); 5×5 con 14-17 celdas vacías (56-68% vacías); modo Hardcore con 16-19 celdas vacías (hasta 76% vacías).
     - En Modo Examen (9 min): 1 puzzle 4×4 de warmup y luego el **100% de la prueba en matrices 5×5 multi-paso**.
     - Selector de perfiles de calibración: *«Oficial KURA / PASS»*, *«Hardcore 5×5 (Máxima Dificultad)»* y *«Entrenamiento 4×4»*.
   - **Fundamentación Científica y Baremos EASA / NetJets Europe:**
     - Fórmula oficial TCT de corrección por conjetura: $X_{\text{net}} = C - \frac{W_4}{3} - \frac{W_5}{4}$.
     - Baremos empíricos del grupo normativo *European Commercial Airline Pilot Applicants*: $\mu = 18.2$ pts netos, $\sigma = 3.6$ pts netos en 9 min.
     - Umbral de corte NetJets en Kura: **Stanine ≥ 6 (Percentil ≥ 60%, Puntuación Neta ≥ 19.1 pts)**.
     - Nivel competitivo superior: **Stanine ≥ 7 (Percentil ≥ 77%, Puntuación Neta ≥ 20.9 pts)** con ritmo objetivo de $\le 26$s por puzzle.
     - Tarjeta visual de desglose psicométrico en la pantalla de resultados con fórmulas, corte y análisis de ritmo.
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
    - **Transición Automática Instantánea y Feedback Auditivo:** Al resolver correctamente un puzzle en cualquiera de los dos modos (Examen o Práctica), la celda `[ ? ]` se ilumina en verde con el símbolo resuelto, suena un chime armónico (Web Audio API) y la plataforma avanza automáticamente al siguiente puzzle (200-350ms) sin pausas manuales. En caso de error en modo práctica, se detiene para mostrar la deducción lógica paso a paso. Al colocar una figura rayada, el foco vuelve automáticamente a `[ ? ]` para responder de inmediato.
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


