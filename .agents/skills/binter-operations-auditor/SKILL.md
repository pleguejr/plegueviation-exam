---
name: binter-operations-auditor
description: >-
  Expert verification and operational knowledge base for Binter Canarias Operations (MOA, MOB, SOP, Embraer 195-E2).
  Enforces strict fidelity to company mnemonics (TWIN, RETSE, E-DALTA, TELSI, IMFLOCC, MEANA),
  callouts, emergency procedures, dispatch tables (RFFS 1A/1B), authority/responsibilities (MOA 1.4/1.5), and FTL regulations (MOA 7).
---

# Binter Canarias Operations & Emergency Procedures Auditor

This skill enforces strict adherence to Binter Canarias operational manuals, grounded directly in the user's official digital library.

---

## 0. Official Document Library Paths

Whenever consulting or verifying Binter operations, use the following primary sources:

- **MOA (Manual de Operaciones Parte A)**:
  `C:\Users\plegu\My Drive\My drive\BINTER\BA tripulantes EMB\Manuales del operador\MOA BinterCanarias ED06 RN25 RT00.pdf` (y subcarpeta `MOA_Por_Capitulos`)
- **MOB (Manual de Operaciones Parte B - E195-E2)**:
  `C:\Users\plegu\My Drive\My drive\BINTER\BA tripulantes EMB\Manuales del operador\MOB BinterCanarias ED06 RN25 RT00.pdf` (y subcarpeta `MOB_Por_Capitulos`)
- **MEL (Minimum Equipment List - E195-E2)**:
  `C:\Users\plegu\My Drive\My drive\BINTER\BA tripulantes EMB\Manuales del operador\MEL EMB BA RN24.pdf`
- **AOM (Aircraft Operating Manual - Embraer E2)**:
  `C:\Users\plegu\My Drive\My drive\BINTER\BA tripulantes EMB\Manuales fabricante Embraer\AOM-5875-174-REV11-FULL 11.2.pdf`
- **SOPM (Standard Operating Procedures Manual - Embraer E2)**:
  `C:\Users\plegu\My Drive\My drive\BINTER\BA tripulantes EMB\Manuales fabricante Embraer\SOPM-1755-200-REV14-FULL_1760451613050.PDF`
- **QRH (Quick Reference Handbook - Embraer E2)**:
  `C:\Users\plegu\My Drive\My drive\BINTER\BA tripulantes EMB\Manuales fabricante Embraer\QRH-6313-174-REV19-TABLET.PDF`
- **DDPM / CDL (Dispatch Deviations Procedures Manual)**:
  `C:\Users\plegu\My Drive\My drive\BINTER\BA tripulantes EMB\Manuales fabricante Embraer\DDPM-6130-100-REV TR7.1.PDF`
- **FMS Manual (Primus Epic Load 9.0)**:
  `C:\Users\plegu\My Drive\My drive\BINTER\BA tripulantes EMB\Manuales fabricante Embraer\FMS_Manual_Epic_LOAD_9.0.pdf`

---

## 1. Company Briefing Mnemonics

### A. Takeoff Briefing: `TWIN` + `RETSE`
- **TWIN**:
  * **T**: Threat / TEM (Amenazas específicas de la operación, pista, entorno, pájaros).
  * **W**: Weather (Viento, visibilidad, techos, cizalladura, estado de pista seca/mojada/contaminada).
  * **I**: Inop Items (MEL, CDL, DDPM aplicables).
  * **N**: NOTAM / SNOWTAMs aplicables a la salida.
- **RETSE**:
  * **R**: Route (FMS RTE page, PERF INIT, PROG, altitud de transición, nivel inicial).
  * **E**: Engine Start & Push Back (Procedimiento de arranque, pushback convencional o towbarless, cruce de líneas).
  * **T**: Taxi (Ruta de rodaje LIDO, puntos calientes / Hot Spots, paradas intermedias).
  * **S**: SID (Salida instrumental, restricciones de altitud y velocidad, radioayudas de respaldo).
  * **E**: EOSID / Emergency Briefing (Fallo de motor antes/después de V1, aborto de despegue RTO, ruta de escape en fallo de motor).

### B. Approach Briefing: `TWIN` + `E-DALTA`
- **TWIN**: Threat, Weather, Inop items, NOTAMs en destino y alternativos.
- **E-DALTA**:
  * **E**: ePerf InFlight Landing (Cálculo de performance de aterrizaje en vuelo, peso, runway condition, margen de parada).
  * **D**: Descent (Top of Descent, restricciones de descenso, perfil vertical).
  * **A**: Arrival (STAR, aproximación frustrada / Missed Approach, altitudes de seguridad MSA).
  * **L**: Landing (Ajustes en MCDU: Flap 4 o Flap FULL, Autobrake LO/MED/HI, velocidades Vref/Vap/Vac/Vfs vs ePerf, MAP MIN).
  * **T**: Taxi (Ruta de salida de pista prevista, calles de rodaje activas).
  * **A**: Apron (Puesto de estacionamiento, guía de atraque, calzos).

### C. Cabin Crew Emergency Briefing: `TELSI` (NEVER NITS)
In Binter Canarias, NITS is strictly forbidden; **`TELSI`** is the only authorized format:
- **T**: **Tipo de Emergencia** (*Prevista, Imprevista, Aterrizaje Inseguro*).
- **E**: **Estimated Time of Arrival** (*Tiempo disponible hasta la toma*).
- **L**: **Lugar de Aterrizaje** (*Pista, Tierra fuera de aeródromo, Agua / Amerizaje*).
- **S**: **Señales de Protección convenidas** (*Callout a 30s: "PROTECCIÓN, PROTECCIÓN, PROTECCIÓN"*).
- **I**: **Instrucciones Especiales** (*Evacuación prevista sí/no, preparación de cabina, uso de salidas de emergencia*).

### D. Technical Diversion Decision-Making: `IMFLOCC`
- **I**: Inoperative Items / Incidents (Naturaleza de la avería técnica o condición médica).
- **M**: Meteorological Report (METAR/TAF de alternativas).
- **F**: Fuel Management (Combustible a bordo vs combustible remanente sobre alternativa).
- **L**: Landing Performance (Cálculo ePerf con fallos de sistemas).
- **O**: Options (Aeródromos disponibles).
- **C**: Choose an Option (Prioridad: 1° Origen/Destino de la línea, 2° Aeropuerto de la red Binter con mantenimiento, 3° Aeropuerto adecuado más cercano).
- **C**: Communications (ATC, SCC vía TELSI, PA a pasajeros, ACARS FREE TEXT > EMR o INC___, VHF compañía).

### E. Checklist Order of Precedence: `MEANA`
1. **M**: Memo Items (Acciones de memoria inmediatas).
2. **E**: Emergency Checklist (Listas de emergencia con recuadro rojo/gris).
3. **A**: Abnormal Checklist (Listas anormales).
4. **N**: Normal Checklist (Listas normales de fase de vuelo).
5. **A**: Abnormal Checklist restantes (Lectura y seguimiento de notas de sistemas degradados).

---

## 2. Company Callouts & Key Operations

- **Emergency Descent**: *"DESCENSO DE EMERGENCIA (x3)"* (Cantadas a 30.000, 20.000, 10.000 ft; a 2.000 ft *"TWO THOUSAND TO LEVEL OFF"*; a 1.000 ft *"ONE THOUSAND TO LEVEL OFF"*; al nivelar *"TRIPULACIÓN DE CABINA, DESCENSO FINALIZADO"*).
- **Rejected Takeoff (RTO)**: *"REJECT"*, *"SIXTY KNOTS"*, *"MANUAL BRAKES"* antes de desactivar Autobrake RTO, *"TRIPULACIÓN DE CABINA, ESPEREN INSTRUCCIONES"* o *"TRIPULACIÓN DE CABINA, PERMANEZCAN SENTADOS"*.
- **Cabin Preparation Callouts**: A 5 min de la toma: *"TRIPULACIÓN DE CABINA FINALIZAR PREPARACIÓN"*; a 30 seg de la toma: *"PROTECCIÓN, PROTECCIÓN, PROTECCIÓN"*.
- **Engine Failure on Takeoff (>V1)**: *"CHECK THRUST"*, *"THRUST CHECKED"*, Best Beta cian tras Gear UP, acciones de memoria nunca por debajo de 400 ft AGL.
- **Driftdown Speed**: *GREEN DOT*.
- **MOA Dispatch with Degraded RFFS**: Tablas 1A (Aeropuertos principales) y 1B (Alternativos). Despacho permitido con RFFS degradado hasta 1 categoría durante un periodo máximo de 72 horas previa evaluación de riesgos.

---

## 3. MOA 1.4 & 1.5: Authority & Crew Responsibilities

- **MOA 1.4 Commander Authority (4F Philosophy: Safe, Fit, Fair, Fast)**:
  * El Comandante ostenta la autoridad suprema desde que toma a cargo el avión antes del vuelo hasta su entrega formal tras el servicio (CAT.GEN.MPA.105).
  * Potestad de desviación de cualquier norma en caso de emergencia.
  * Potestad de denegación de embarque / desembarque de pasajeros disruptivos o no aptos.
  * Firma obligatoria de ATL, OFP, Loadsheet y NOTOC.
- **MOA 1.5.1 General & CRM**:
  * Subordinación jerárquica y funcional de toda la tripulación al Comandante.
  * Cooperación, monitorización cruzada (*Cross-Monitoring*) y regla de los dos avisos (*Two-Challenge Rule*).
  * Cabina Estéril (*Sterile Cockpit*): llamadas a cabina técnica prohibidas < 10.000 ft salvo estricta emergencia.
- **MOA 1.5.2 Copiloto**: Asunción automática del mando como PIC ante incapacitación del Comandante; comprobación cruzada independiente de ePerf, FMS y MEL.
- **MOA 1.5.3 Piloto de Relevo (Cruise Relief Pilot)**: Relevo del copiloto exclusivamente en crucero (> FL200). Prohibido actuar en mandos durante despegue, < FL200 o aproximación/toma.
- **MOA 1.5.4 TCPs**: Seguridad de cabina y ocupantes, chequeo prevuelo de equipo de emergencia (LOPA), protocolo de lucha contra incendios (Bombero, Comunicador, Asistente).
- **MOA 1.5.5 Sobrecargo (SCCM)**: Enlace único con cabina técnica, recepción del briefing `TELSI`, reporte de *"Cabina Lista"* (*Cabin Ready*) con puertas armadas (*Cross-check*), supervisión de SCPs (PMR, UM, custodias).
- **MOA 1.5.6 Tripulantes en Posicionamiento / Deadhead**: Considerados pasajeros a efectos operativos; subordinados al Comandante de servicio; inspectores de aviación (AESA/EASA) requieren autorización del PIC para entrar a cabina si se compromete la seguridad.

---

## 4. MOA 7: Flight and Duty Time Limitations (FTL) & Rest

- **Definiciones**:
  * **Tiempo de vuelo (Flight Time / Block Time)**: Calzo a calzo por fuerza motriz propia para despegar hasta calzos finales.
  * **Período de Actividad de Vuelo (FDP)**: Desde hora de presentación hasta calzos del último sector operativo.
  * **WOCL (Window of Circadian Low)**: 02:00 a 05:59 horas en el huso de aclimatación.
- **Límites Máximos de Tiempo de Vuelo**:
  * $100\text{ horas}$ en 28 días consecutivos.
  * $900\text{ horas}$ en 12 meses consecutivos.
  * $1.000\text{ horas}$ en año civil calendario.
- **Límites Máximos de Actividad (Duty Periods)**:
  * $60\text{ horas}$ en 7 días consecutivos ($168\text{ h}$).
  * $110\text{ horas}$ en 14 días consecutivos ($336\text{ h}$).
  * $190\text{ horas}$ en 28 días consecutivos ($672\text{ h}$).
- **Descansos Mínimos**:
  * **En Base (Home Base)**: El mayor entre la actividad precedente o $12\text{ horas}$.
  * **Fuera de Base (Away from Base)**: El mayor entre la actividad precedente o $10\text{ horas}$ (garantizando $8\text{ horas}$ de sueño).
  * **Descanso Semanal Extendido (ERRP)**: $\ge 36\text{ horas}$ continuas que incluyan $2\text{ noches locales}$ en cualquier período de $168\text{ horas}$.
  * **Actividad Dividida (Split Duty)**: Pausa en tierra $\ge 3\text{ horas}$ continuas en alojamiento adecuado.
- **Discrecionalidad del Comandante (Commander's Discretion - MOA 7.2)**:
  * Extensión máxima de FDP antes del despegue: hasta $+2\text{ horas}$ (tripulación estándar) o $+3\text{ horas}$ (reforzada), previa consulta individual de fatiga (*Fit for Duty*).
  * Extensión tras despegue del último sector: lo necesario hasta aterrizar seguro en destino o alternativo.
  * Reducción máxima de descanso fuera de base: máximo $-1\text{ hora}$ (mínimo absoluto $10\text{ horas}$).
  * Notificación oficial a AESA: plazo máximo de $28\text{ días}$ si la extensión o reducción supera $1\text{ hora}$. Registro obligatorio en ATL y formulario FOR-DISC / ASR.

---

## 5. Protocolo de Auditoría y Depuración Activa (Comando "auditoría" / "auditoria")

Siempre que el usuario ejecute la instrucción **"auditoría"** o **"auditoria"** en el chat de Auditoría & Depuración:

1. **Inspección de Solicitudes y Registros**:
   - **Registro de Preguntas a Revisar**: Comprobar `banks/questions_for_review.json` y el listado de solicitudes generadas desde el botón **"Revisión"** de la PWA.
   - **Registro de Eliminadas**: Comprobar `banks/deleted_questions.json` para verificar si alguna pregunta reportada debe ser purgada o corregida de raíz.

2. **Auditoría Técnica contra Manuales Oficiales**:
   - Cotejar cada pregunta reportada con los manuales oficiales de la Sección 0 (MOA, MOB, MEL, AOM, SOPM, AFM, POH).
   - Verificar si la discrepancia reportada por el piloto afecta a:
     * Datos numéricos (velocidades, pesos, altitudes, plazos MEL, tiempos FTL).
     * Siglas, acrónimos o mnemónicos (RETSE, E-DALTA, IMFLOCC, TELSI, MEANA, etc.).
     * Ambigüedad en distractores o redacción confusa.
     * Citas documentales o tablas oficiales en `explanation.text`.

3. **Ejecución de Corrección y Compilación**:
   - Aplicar los cambios exactos en el archivo JSON del banco correspondiente en `banks/`.
   - Ejecutar `python cli/bin/build_banks.py` y `npm run build` en `apps/web-pwa`.
   - Actualizar el estado de la solicitud de revisión a resuelta.

4. **Informe de Auditoría al Usuario**:
   - Presentar una tabla clara con: ID de pregunta, motivo reportado, referencia al manual oficial (Capítulo/Página), y corrección implementada.

