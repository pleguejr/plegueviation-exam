---
name: binter-operations-auditor
description: >-
  Expert verification and operational knowledge base for Binter Canarias Operations (MOA, MOB, SOP, Embraer 195-E2, MTM).
  Enforces strict fidelity to company mnemonics (TWIN, RETSE, E-DALTA, TELSI, IMFLOCC, MEANA),
  callouts, emergency procedures, dispatch tables (RFFS 1A/1B), authority/responsibilities (MOA 1.4/1.5),
  FTL regulations (MOA 7), MOA chapters 8.3 to 12, and Embraer Maintenance Training Manual (MTM ATA 21-80).
---

# Binter Canarias Operations & Emergency Procedures Auditor

This skill enforces strict adherence to Binter Canarias operational manuals, grounded directly in the user's official digital library located in `manuales/`.

---

## 0. Official Document Library Paths

Whenever consulting or verifying Binter operations, use the primary sources located in the project:

- **MOA (Manual de Operaciones Parte A - Ed. 06 RN26)**: `manuales/MOA BinterCanarias ED06 RN26 RT00.pdf`
- **MOB (Manual de Operaciones Parte B - E195-E2)**: `manuales/MOB BinterCanarias ED06 RN26 RT00.pdf`
- **MOC & MOD (Manuales Partes C y D)**: `manuales/MOC BinterCanarias ED06 RN26 RT00.pdf` y `manuales/MOD BinterCanarias ED06 RN26 RT00.pdf`
- **QRH (Quick Reference Handbook - E195-E2 Rev. 19)**: `manuales/QRH-6313-174-REV19-TABLET.PDF`
- **AOM (Aircraft Operating Manual - E195-E2 Rev. 11)**: `manuales/AOM-5875-174-REV11-FULL 11.2.pdf`
- **AFM (Airplane Flight Manual - E195-E2 Rev. 25)**: `manuales/AFM-5693-174-REV25-FULL.PDF`
- **MEL (Minimum Equipment List - E195-E2 RN24)**: `manuales/MEL EMB BA RN24.pdf`
- **DDPM / CDL (Dispatch Deviations Procedures Manual)**: `manuales/DDPM-6130-100-REV TR7.1.PDF`
- **SOPM (Standard Operating Procedures Manual Rev. 14)**: `manuales/SOPM-1755-200-REV14-FULL.PDF`
- **FMS Manual (Honeywell Primus Epic Load 9.0)**: `manuales/FMS_Manual_Epic_LOAD_9.0.pdf`
- **MTM (Maintenance Training Manual - E190/E195-E2 T1+T2)**: `manuales/MTM.pdf` (5.372 páginas, ATA 21 a 80)
- **Mass & Balance Sheet**: `manuales/MB EC-OVY.pdf`

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
En Binter Canarias, NITS está prohibido; **`TELSI`** es el único formato autorizado:
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

## 2. MOA Chapters 8.3 to 12 Operational Regulations

### MOA 8.3: Procedimientos de Vuelo
- **Prioridad Operacional (VNCG)**: **VOLAR -> NAVEGAR -> COMUNICAR -> GESTIONAR**.
- **Cabina Estéril (*Sterile Flight Deck*)**:
  * Para vuelos >= 10.000 ft: desde el cierre de puertas hasta 10.000 ft AFE en ascenso, y desde 10.000 ft AFE en descenso hasta el calzado en destino.
  * Para vuelos < 10.000 ft: desde el cierre de puertas hasta el TOC y desde el TOD hasta el calzado.
  * Prohibidos anuncios comerciales al pasaje, comidas, formularios y conversaciones no operacionales.
  * Interrupción por TCP autorizada solo ante: conato de incendio, humo/olor a quemado, fugas, puertas anormales, hielo, pasajeros conflictivos, emergencias médicas.
- **Auriculares con micrófono de brazo**: Obligatorios en tierra al recibir autorizaciones ATC por voz y con motores en marcha; en vuelo durante despegue, ascenso hasta FL100, descenso desde FL100 y aterrizaje.

### MOA 8.4: Operaciones con Visibilidad Reducida (LVO)
- **LVTO**: RVR mínimo >= 125 m con luces de línea central de pista (CL) y marcas de alta intensidad.
- **Aproximaciones CAT II**: DH 100 ft, RVR mínimo >= 300 m.

### MOA 8.6: Despacho con MEL, CDL y DDPM
- **Jerarquía**: El MEL de Binter no puede ser menos restrictivo que el MMEL aprobado por EASA.
- **Plazos de Rectificación**:
  * **Cat A**: Plazo específico estipulado individualmente en el ítem.
  * **Cat B**: 3 días de calendario (excluyendo el día del descubrimiento).
  * **Cat C**: 10 días de calendario.
  * **Cat D**: 120 días de calendario.

### MOA 8.8: Requisitos de Oxígeno
- Oxígeno suplementario para tripulación técnica obligatorio cuando la altitud de presión de cabina exceda 10.000 ft.

### MOA 9: Mercancías Peligrosas (DGR) y Armas
- Obligatoria entrega y firma del **NOTOC** (Notification to Captain) antes de la salida.
- Baterías de litio de repuesto (powerbanks/PED): **exclusivamente en equipaje de mano**.
- Armas de fuego de pasajeros: descargadas, desmontadas o en estuche cerrado, en bodega inaccesible y con guía de la Guardia Civil.

### MOA 10: Seguridad (Security / AVSEC)
- Puerta blindada de cabina de pilotaje: **cerrada y bloqueada** desde el arranque hasta la parada de motores (CAT.GEN.MPA.135).
- Niveles de amenaza OACI: Nivel 1 (Disruptivo verbal), Nivel 2 (Físico leve), Nivel 3 (Amenaza a la vida / armas), Nivel 4 (Intrusión en cabina técnica).
- Localización de artefacto explosivo: **LRBL** (Least Risk Bomb Location) en puerta de servicio trasera.
- Squawk de secuestro: **7500**.

### MOA 11: Notificación y Reporte de Sucesos (Safety / SMS)
- Plazo reglamentario de reporte **MOR (Mandatory Occurrence Report)**: <= 72 horas (Reglamento UE 376/2014).
- Preservación de CVR y FDR: Desconectar disyuntores (CBs) inmediatamente en tierra tras accidente o incidente grave.
- Notificación de interferencia/suplantación GNSS (Jamming/Spoofing): Notificación inmediata AIREP a ATC y formulario **R-MGNT-04.015**.

### MOA 12: Reglas del Aire (SERA)
- Fallo de comunicaciones IFR en IMC (SERA.8035): Mantener último nivel y velocidad asignados durante **20 minutos** tras la última hora prevista de reporte, y luego continuar según plan de vuelo.
- Interceptación militar: Seguir instrucciones, sintonizar **121.500 MHz** y responder a señales visuales OACI Anexo 2.

---

## 3. Embraer E190/E195-E2 Maintenance Training Manual (MTM ATA Index)

Grounded in `manuales/MTM.pdf` (5.372 páginas):

- **ATA 21**: Air Conditioning, Pressurization Control & Cooling Packs.
- **ATA 22**: Auto Flight (AP / FD / AT).
- **ATA 23**: Communications (VHF, HF, CVR, Intercom, ACP).
- **ATA 24**: Electrical Power (IDG, APU GEN, RAT, TRUs, SPDA, MAU).
- **ATA 26**: Fire Protection (Engine, APU, Cargo FWD/AFT, Lavatory, E-Bays).
- **ATA 27**: Flight Controls (Fly-By-Wire, PFCU, High Lift Flaps/Slats).
- **ATA 28**: Fuel (Collector tanks, Ejector pumps, Crossfeed, Refueling).
- **ATA 29**: Hydraulic Power (System 1, 2, 3: EDP, ACMP, PTU).
- **ATA 30**: Ice and Rain Protection (Wing/Engine bleed anti-ice, probe heaters, windshields).
- **ATA 31**: Indicating & Recording (DU, EICAS, FDR, CMS).
- **ATA 32**: Landing Gear (Extension/Retraction, Brakes, Antiskid, NWS).
- **ATA 36**: Pneumatic (Bleed air, PRSOV, Crossbleed, Overheat detection).
- **ATA 47**: Inert Gas System (OBIGGS Nitrogen fuel tank inerting).
- **ATA 49**: APU (Pratt & Whitney APS2600).
- **ATA 71-80**: Powerplant (Pratt & Whitney PW1900G Geared Turbofan, FADEC dual channel).
