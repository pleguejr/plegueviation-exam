---
name: binter-operations-auditor
description: >-
  Expert verification and operational knowledge base for Binter Canarias Operations (MOA, MOB, SOP, Embraer 195-E2).
  Enforces strict fidelity to company mnemonics (TWIN, RETSE, E-DALTA, TELSI, IMFLOCC, MEANA),
  callouts, emergency procedures, dispatch tables (RFFS 1A/1B), and FTL regulations.
---

# Binter Canarias Operations & Emergency Procedures Auditor

This skill enforces strict adherence to Binter Canarias operational manuals, specifically the **MOB (Manual de Operaciones – Parte B: Avión E195-E2 - Ed.06 RN21/RN22)** and **MOA (Manual de Operaciones – Parte A: Generalidades y Despacho)**.

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
