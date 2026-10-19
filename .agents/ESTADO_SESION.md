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
      - **AON Multitasking & Mental Arithmetic (`scales mt` / Capacidad Multitarea)**:
        - Archivo: `apps/web-pwa/src/components/psychometrics/AonMultitaskingScreen.tsx` y motor de cálculo `AonMathEngine.ts`.
        - Tarea motriz: Canal vertical de vuelo a 60 FPS (HTML5 Canvas) esquivando obstáculos con flechas `[←][→]`, teclas `A/D` o botones táctiles en iPad.
        - Tarea cognitiva: Cálculo mental continuo de sumas y restas en formato **`[ CORRECTO / INCORRECTO ]`** con distractores sutiles (±1, ±2, ±10) que obligan a evaluar la ecuación mentalmente. Teclado: tecla `1` / `C` para Correcto, `2` / `I` para Incorrecto.
        - **Modo Examen Oficial**: 8 minutos (480s) de cuenta atrás con cálculo concurrente y puntuación ponderada (precisión matemática % + precisión de trayectoria de vuelo %).
        - **Modo Entrenamiento Puro de Cálculo Mental AON**: Selector directo para practicar únicamente las operaciones matemáticas a máxima velocidad sin carga motriz, para automatizar el cálculo mental previo al dual-task.
        - Efectos de sonido con sintetizador Web Audio API (acierto, fallo, colisión) con toggle de silenciado.
        - Historial local de intentos guardado en `localStorage` con indicadores de pase NetJets.
    - Acceso directo y badges integrados en el dashboard principal dentro del bloque **NetJets Europe Interview Prep**.
    - Compatibilidad plena con Modo Noche (Cockpit) y Modo Día (`.theme-light`).
    - 0 errores de TypeScript (`tsc`) y compilación Vite verificada.

## 🎯 Próximos pasos / Pendientes al retomar
- Probar sesiones de entrenamiento de los simuladores AON en iPad y PC.
- Analizar métricas de velocidad de respuesta en cálculo mental para calibrar dificultad si el usuario lo solicita.
- Probar exámenes personalizados combinando subdivisiones de Flota Cessna 172F y Flota Diamond DA40 TDI.
- Realizar pruebas interactivas de las tarjetas SOP de Blue Team en la PWA.

