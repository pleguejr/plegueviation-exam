import json

raw_lote5_updated = [
  {
    'num': 1, 'ans': 'A', 'subj': 'cmd_mnemonicos_mando',
    'stem': 'Según el MOB 2.0.6.1 (Procedimientos Normales E195-E2), ¿cómo se estructura la secuencia RETSE en la MCDU y LIDO para el Briefing de Despegue?',
    'opts': [
      ('A', 'R: ROUTE (RTE, PERF INIT, PROG); E: ENGINE START & PUSH BACK (Tipo de arranque y retroceso); T: TAXI (Ruta de rodaje en LIDO); S: SID (Salida instrumental, puntos, cursos, restricciones); E: EOSID / Emergency Briefing (Fallo de motor en despegue conforme a EOSID en PLAN / FIX INFO)'),
      ('B', 'R: Radar; E: Estado; T: Terreno; S: Salida; E: Espera'),
      ('C', 'R: Rutas; E: Emergencia; T: Torre; S: Senda; E: Elevación'),
      ('D', 'R: Ruedas; E: Equipaje; T: Tanques; S: Sobrecargo; E: Escala')
    ],
    'obj': 'MOB 2.0.6.1 - Secuencia RETSE en Briefing de Despegue (MCDU & LIDO)',
    'exp': 'En el E195-E2 de Binter, tras el TWIN, el PF continúa el briefing de despegue con RETSE: R (Route: RTE/PERF/PROG), E (Engine Start & Push Back), T (Taxi en LIDO), S (SID en NAV/FPL) y E (EOSID / Emergency Briefing en PLAN/FIX INFO).',
    'refs': ['MOB Binter E195-E2 Sección 2.0.6.1 (Pág. 2-19)']
  },
  {
    'num': 2, 'ans': 'B', 'subj': 'cmd_mnemonicos_mando',
    'stem': 'En la operativa de Binter Airlines, ante una anormalidad o emergencia que requiera coordinar con la Sobrecargo (SCC), ¿qué mnemónico oficial se utiliza para estructurar el Briefing a la Tripulación de Cabina (MOB 3.1.1)?',
    'opts': [
      ('A', 'NITS (Nature, Intentions, Time, Special instructions)'),
      ('B', 'TELSI: T: Tipo de Emergencia (Prevista/Imprevista/Aterrizaje Inseguro); E: Estimated Time of Arrival (Cuánto tiempo queda); L: Lugar de Aterrizaje (Pista, campo, agua); S: Señales de Protección convenidas (\"PROTECCIÓN\" a 30s); I: Instrucciones Especiales (Coordinación y Callouts)'),
      ('C', 'GRADE (Gather, Review, Analyze, Decide, Execute)'),
      ('D', 'PIOSEE (Problem, Information, Options, Select, Execute, Evaluate)')
    ],
    'obj': 'MOB 3.1.1 / 3.1.14 - Briefing TELSI a la Tripulación de Cabina',
    'exp': 'En Binter Airlines NO se utiliza NITS; el protocolo oficial del Comandante para informar a la Sobrecargo es TELSI (Tipo de Emergencia, Estimated Time of Arrival, Lugar de Aterrizaje, Señales de Protección e Instrucciones Especiales).',
    'refs': ['MOB Binter E195-E2 Sección 3.1.1 (Pág. 3.1-1), 3.1.14 (Pág. 3.1-26 y 3.1-28)']
  },
  {
    'num': 3, 'ans': 'C', 'subj': 'cmd_mnemonicos_mando',
    'stem': 'Según el MOB 2.0.6.1 y 2.0.6.2, ¿qué elementos evalúa la Secuencia TWIN con la que el PF inicia obligatoriamente tanto el Briefing de Despegue como el de Aproximación?',
    'opts': [
      ('A', 'T: Tiempo; W: Waypoints; I: Instrumentos; N: Navegación'),
      ('B', 'T: Torre; W: Wind; I: ILS; N: Nivel'),
      ('C', 'T: TEM (Threat & Error Management: amenazas generales, tráficos, hot spots, cizalladura, pájaros, terreno, conflicto); W: WEATHER (Meteo, LVP, alternativo, deshielo); I: INOP ITEMS (Diferidos MEL/DDPM); N: NOTAM/SNOWTAMS (RWYCC, calles cerradas, ayudas inservibles, obstáculos)'),
      ('D', 'T: Tanques; W: Peso; I: Inercial; N: Nudos')
    ],
    'obj': 'MOB 2.0.6.1 & 2.0.6.2 - Secuencia TWIN en Briefings de Despegue y Llegada',
    'exp': 'La secuencia TWIN (TEM, Weather, Inop Items, NOTAM/SNOWTAMs) es la apertura obligatoria del PF para evaluar todas las amenazas operacionales antes de pasar a la programación de sistemas.',
    'refs': ['MOB Binter E195-E2 Sección 2.0.6.1 (Pág. 2-18) y 2.0.6.2 (Pág. 2-20)']
  },
  {
    'num': 4, 'ans': 'D', 'subj': 'cmd_mnemonicos_mando',
    'stem': 'Según el MOB 2.0.6.2 (Pág. 2-21), ¿cómo se estructura la secuencia E-DALTA en la MCDU y LIDO para el Briefing de Aproximación y Aterrizaje?',
    'opts': [
      ('A', 'E: Emergencia; D: Descenso; A: Altitud; L: Luces; T: Torre; A: Aproximación'),
      ('B', 'E: Elevación; D: Distancia; A: Autoland; L: Localizador; T: Terreno; A: Aeropuerto'),
      ('C', 'E: Engine; D: Direct; A: Arrival; L: Level; T: Turn; A: ATC'),
      ('D', 'E: ePerf (Performance de aterrizaje InFlight Landing con chequeo cruzado); D: DESCENT (TRANS LVL y SPD/ALT LIM en PERF); A: ARRIVAL (STAR e IAC en NAV/FPL con briefing de frustrada); L: LANDING (PERF LANDING INIT: peso, viento, flap, autobrake, velocidades Vref/Vap/Vac/Vfs, MAP MIN); T: TAXI (Ruta de rodaje post-aterrizaje); A: APRON (Tipo de parking remoto/finger y APU/GPU)')
    ],
    'obj': 'MOB 2.0.6.2 - Secuencia E-DALTA en Briefing de Aproximación (MCDU & LIDO)',
    'exp': 'La secuencia E-DALTA en el E195-E2 cubre: E (ePerf), D (Descent), A (Arrival / STAR / Frustrada), L (Landing en MCDU), T (Taxi) y A (Apron / Parking).',
    'refs': ['MOB Binter E195-E2 Sección 2.0.6.2 (Pág. 2-21)']
  },
  {
    'num': 5, 'ans': 'A', 'subj': 'cmd_mnemonicos_mando',
    'stem': 'En el proceso de toma de decisiones para determinar el aeropuerto de desvío ante fallos técnicos graves (MOB 3.1.10), ¿qué pasos sigue el acrónimo IMFLOCC?',
    'opts': [
      ('A', 'I: Inoperative Items / Incidents (Evaluar sistemas inoperativos o gravedad); M: Meteorological Report (Meteo de aeropuertos adecuados cercanos); F: Fuel Management (Combustible utilizable y tiempo de vuelo); L: Landing Performance (Cálculo ePerf Inflight Landing); O: Options (Opciones que cumplen meteo y pista); C: Choose an Option (1° Salida/Destino, 2° Alternativos Binter, 3° Adecuado); C: Communications (ATC, SCC vía TELSI, PA y ACARS FREE TEXT > EMR o INC / VHF)'),
      ('B', 'I: Instrumentos; M: Motores; F: Flaps; L: Luces; O: Oxígeno; C: Cabina; C: Checklist'),
      ('C', 'I: Identificar; M: Maniobrar; F: Frenar; L: Limpiar; O: Operar; C: Calzos; C: Cerrar'),
      ('D', 'I: Iniciar; M: Mantener; F: Finalizar; L: Liberar; O: Ordenar; C: Coordinar; C: Cortar')
    ],
    'obj': 'MOB 3.1.10 - Acrónimo IMFLOCC para Toma de Decisiones en Desvíos Técnicos',
    'exp': 'IMFLOCC es el proceso estructurado de Binter: Inop items, Meteorological report, Fuel management, Landing performance (ePerf), Options, Choose an option y Communications (ATC, SCC vía TELSI, PA, ACARS).',
    'refs': ['MOB Binter E195-E2 Sección 3.1.10 (Pág. 3.1-22 y 3.1-23)']
  },
  {
    'num': 6, 'ans': 'B', 'subj': 'cmd_mnemonicos_mando',
    'stem': 'Según el MOB 3.1.0 (Pág. 3.1-2), cuando se produce una anormalidad en vuelo y se ha verificado que no aplica FOL ni OB, ¿cuál es el orden estricto de aplicación de las listas de comprobación según el acrónimo MEANA?',
    'opts': [
      ('A', 'M: Mantenimiento, E: Emergencia, A: ATC, N: Navegación, A: Aproximación'),
      ('B', 'M: Memo Items (Pasos de memoria); E: Emergency Checklist; A: Abnormal Checklist; N: Normal Checklist; A: Abnormal Checklist (restantes)'),
      ('C', 'M: Master Warning, E: EICAS, A: Alertas, N: Notificaciones, A: Acciones'),
      ('D', 'M: Motores, E: Eléctrico, A: Aire, N: Navegación, A: Alabeo')
    ],
    'obj': 'MOB 3.1.0 - Orden de Aplicación de Listas de Chequeo (MEANA)',
    'exp': 'El acrónimo MEANA define el orden reglamentario: 1° Memo Items, 2° Emergency Checklist, 3° Abnormal Checklist inicial, 4° Normal Checklist y 5° Abnormal Checklist adicionales.',
    'refs': ['MOB Binter E195-E2 Sección 3.1.0 (Pág. 3.1-2)']
  },
  {
    'num': 7, 'ans': 'C', 'subj': 'cmd_emergency',
    'stem': 'En la coordinación de cabina ante un aterrizaje forzoso o amerizaje (Ditching), ¿qué Callouts oficiales realiza el PM por el PA a los 5 minutos y a los 30 segundos del impacto (MOB 3.0-6 / 3.1-27)?',
    'opts': [
      ('A', 'A los 5 min: \"ATENCIÓN A SUS PUESTOS\"; a los 30s: \"BRACE FOR IMPACT\"'),
      ('B', 'A los 5 min: \"TRIPULACIÓN PREPÁRENSE\"; a los 30s: \"AGÁCHENSE\"'),
      ('C', 'A los 5 minutos: \"TRIPULACIÓN DE CABINA FINALIZAR PREPARACIÓN\"; a los 30 segundos: \"PROTECCIÓN, PROTECCIÓN, PROTECCIÓN\" (la tripulación de cabina grita: \"¡Inclínense y protéjanse la cabeza! / Bend Forward and protect your head!\")'),
      ('D', 'A los 5 min: \"SOBRECARGO A CABINA\"; a los 30s: \"EVACUACIÓN\"')
    ],
    'obj': 'MOB 3.0-6 / 3.1-27 - Callouts de Cabina Previos al Impacto (5 min y 30 seg)',
    'exp': 'A 5 min del aterrizaje forzoso: "TRIPULACIÓN DE CABINA FINALIZAR PREPARACIÓN". A 30 seg: "PROTECCIÓN, PROTECCIÓN, PROTECCIÓN", adoptando la postura de impacto.',
    'refs': ['MOB Binter E195-E2 Sección 3.0-6 (Pág. 3.0-6) y 3.1-27 (Pág. 3.1-27)']
  },
  {
    'num': 8, 'ans': 'D', 'subj': 'cmd_emergency',
    'stem': 'En el procedimiento de Descenso de Emergencia con piloto automático en el E195-E2 (MOB 3.1.4.2.1), ¿cuál es el Callout del LSP por el PA y qué modo vertical se selecciona?',
    'opts': [
      ('A', 'Callout: \"EMERGENCY DIVE\"; modo vertical VS en rojo'),
      ('B', 'Callout: \"DESCENDIENDO\"; modo vertical PITCH'),
      ('C', 'Callout: \"MAYDAY CABINA\"; modo vertical VNAV'),
      ('D', 'Callout por PA: \"DESCENSO DE EMERGENCIA, DESCENSO DE EMERGENCIA, DESCENSO DE EMERGENCIA\"; modo vertical FLCH en VERDE seleccionando 10.000 ft o la MEA (la que sea mayor), gases en IDLE y SPEEDBRAKES en FULL')
    ],
    'obj': 'MOB 3.1.4.2.1 - Procedimiento y Callouts de Descenso de Emergencia con AP/AT',
    'exp': 'El LSP avisa tres veces "DESCENSO DE EMERGENCIA" por PA, selecciona FLCH verde, MEA o 10.000 ft, gases a ralentí y aerofrenos en FULL.',
    'refs': ['MOB Binter E195-E2 Sección 3.1.4.2.1 (Pág. 3.1-10 y 3.1-11)']
  },
  {
    'num': 9, 'ans': 'A', 'subj': 'cmd_emergency',
    'stem': 'Durante el Descenso de Emergencia en el E195-E2, ¿qué Callouts periódicos de altitud realiza en voz alta el PM para monitorizar el perfil (MOB 3.1.4.2.1)?',
    'opts': [
      ('A', 'Cada 10.000 ft: \"THIRTY THOUSAND FT\", \"TWENTY THOUSAND FT\", \"TEN THOUSAND FT\"; a 2000 ft de la altitud de nivelada: \"TWO THOUSAND TO LEVEL OFF\"; a 1000 ft: \"ONE THOUSAND TO LEVEL OFF\" (momento en que se cierran los Speedbrakes)'),
      ('B', 'Solo llama a 10.000 ft'),
      ('C', 'Llama cada 1000 ft desde el inicio del descenso'),
      ('D', 'No realiza callouts de altitud para no interferir con el ATC')
    ],
    'obj': 'MOB 3.1.4.2.1 - Callouts de Altitud del PM durante Descenso de Emergencia',
    'exp': 'El PM canta en voz alta a 30.000, 20.000 y 10.000 ft, a 2000 ft para nivelar ("TWO THOUSAND TO LEVEL OFF") y a 1000 ft ("ONE THOUSAND TO LEVEL OFF"), retrayendo aerofrenos a 1000 ft.',
    'refs': ['MOB Binter E195-E2 Sección 3.1-11 y 3.1-12']
  },
  {
    'num': 10, 'ans': 'B', 'subj': 'cmd_emergency',
    'stem': 'Una vez alcanzada la altitud segura y confirmado que la respiración es efectiva sin oxígeno tras un Descenso de Emergencia, ¿qué aviso transmite el LSP a la cabina de pasaje (MOB 3.1-12)?',
    'opts': [
      ('A', '\"TRIPULACIÓN DE CABINA PERMANEZCAN SENTADOS\"'),
      ('B', '\"TRIPULACIÓN DE CABINA, DESCENSO FINALIZADO\"'),
      ('C', '\"EMERGENCIA TERMINADA\"'),
      ('D', '\"PUEDEN QUITARSE LOS CINTURONES\"')
    ],
    'obj': 'MOB 3.1-12 - Callout al Alcanzar Altitud Segura tras Descenso de Emergencia',
    'exp': 'Al alcanzar altitud segura y recuperar comunicaciones normales, el LSP avisa por PA a los TCPs: "TRIPULACIÓN DE CABINA, DESCENSO FINALIZADO".',
    'refs': ['MOB Binter E195-E2 Sección 3.1-12 (Pág. 3.1-12)']
  },
  {
    'num': 11, 'ans': 'C', 'subj': 'cmd_flight_ground_ops',
    'stem': 'En la maniobra de Aborto de Despegue (RTO) en el E195-E2 (MOB 3.1.1), ¿qué Callout obligatorio debe realizar el LSP antes de desconectar la frenada automática Autobrake RTO para pasar a frenos de pedal?',
    'opts': [
      ('A', '\"I HAVE BRAKES\"'),
      ('B', '\"AUTOBRAKE OFF\"'),
      ('C', '\"MANUAL BRAKES\"'),
      ('D', '\"STOPPING MANUAL\"')
    ],
    'obj': 'MOB 3.1.1 - Callout Obligatorio MANUAL BRAKES en RTO',
    'exp': 'Si se va a desactivar la frenada automática RTO para aplicar frenos de pedal manualmente, es mandatorio cantar "MANUAL BRAKES" antes de la desconexión.',
    'refs': ['MOB Binter E195-E2 Sección 3.1.1 (Pág. 3.1-3 y 3.1-4)']
  },
  {
    'num': 12, 'ans': 'D', 'subj': 'cmd_flight_ground_ops',
    'stem': 'Durante la carrera de despegue en el E195-E2, ¿cuáles son las 3 funciones primordiales del Callout de \"80 KNOTS\" realizado por el PM (MOB 3.1.1)?',
    'opts': [
      ('A', 'Encender luces, mirar flaps y pedir autorización'),
      ('B', 'Trimado de morro, conexión de AP y ajuste de altitud'),
      ('C', 'Calibrar la velocidad de pérdida, conectar bombas y desconectar frenos'),
      ('D', '1° Comprobar y detectar una posible incapacitación de uno de los pilotos durante la carrera; 2° Comprobación cruzada de indicación de velocidad anemométrica; 3° Comprobar que el Autothrottle (A/T) ha pasado a modo HOLD')
    ],
    'obj': 'MOB 3.1.1 - Tres Funciones Primordiales del Callout de 80 Nudos',
    'exp': 'A 80 nudos se valida la respuesta verbal (incapacitación sutil), la concordancia de anemómetros y el paso del FMA de potencia a modo HOLD.',
    'refs': ['MOB Binter E195-E2 Sección 3.1.1 (Pág. 3.1-3)']
  },
  {
    'num': 13, 'ans': 'A', 'subj': 'cmd_emergency',
    'stem': 'En caso de Fallo de Motor en despegue a o por encima de V1 en el E195-E2 (MOB 3.1.8.2), ¿qué función automática de guiñada se activa tras la retracción del tren de aterrizaje?',
    'opts': [
      ('A', 'La función Best Beta (el indicador Slip/Skid del PFD se vuelve color CIAN), debiendo utilizar el timón y el compensador de guiñada para centrar el trapezoide con un ligero banqueo hacia el motor operativo'),
      ('B', 'El piloto automático toma el mando a 50 ft'),
      ('C', 'Se desconecta el timón de dirección'),
      ('D', 'El timón de profundidad baja 5 grados automáticamente')
    ],
    'obj': 'MOB 3.1.8.2 / AOM E195-E2 - Función Best Beta en Fallo de Motor',
    'exp': 'Al retraer el tren con motor inoperativo, el índice de resbale pasa a color cian (Best Beta); centrarlo optimiza la resistencia aerodinámica de guiñada/alabeo.',
    'refs': ['MOB Binter E195-E2 Sección 3.1.8.2 (Pág. 3.1-18)']
  },
  {
    'num': 14, 'ans': 'B', 'subj': 'cmd_emergency',
    'stem': 'Según el MOB 3.1.8.2, en salidas con altitudes de aceleración superiores a 1000 ft AAL, si ocurre un fallo o fuego de motor que requiera acciones de memoria:',
    'opts': [
      ('A', 'Las acciones de memoria deben iniciarse inmediatamente en la rotación'),
      ('B', 'Las acciones se pueden ordenar a una altitud inferior a la de aceleración pero NUNCA por debajo de 400 ft AGL, con el avión estabilizado y en el perfil (limitando el alabeo a 15° en V2 - Low Bank)'),
      ('C', 'Se deben esperar obligatoriamente a los 3000 ft'),
      ('D', 'Nunca se tocan los mandos de motor hasta nivelar en crucero')
    ],
    'obj': 'MOB 3.1.8.2 - Altitud Mínima para Acciones de Memoria en Fallo de Motor (400 ft AGL)',
    'exp': 'Por debajo de 400 ft AGL la prioridad absoluta es volar y mantener control y trayectoria; nunca se ejecutan memory items o paradas de motor por debajo de 400 ft.',
    'refs': ['MOB Binter E195-E2 Sección 3.1.8.2 (Pág. 3.1-18)']
  },
  {
    'num': 15, 'ans': 'C', 'subj': 'cmd_emergency',
    'stem': 'En el procedimiento de Driftdown tras fallo de motor en crucero en el E195-E2 (MOB 3.1.8.3), ¿qué velocidad óptima representa el GREEN DOT en el anemómetro?',
    'opts': [
      ('A', 'La velocidad de máxima aceleración en picado'),
      ('B', 'La velocidad de desplome'),
      ('C', 'La velocidad de máxima eficiencia aerodinámica (L/D max) que reduce el gradiente absoluto de descenso, proporcionando el descenso más suave y permitiendo que el avión se nivele a la mayor altitud posible (Service Ceiling OEI)'),
      ('D', 'La velocidad de extensión de flaps')
    ],
    'obj': 'MOB 3.1.8.3 - Velocidad Green Dot en Driftdown',
    'exp': 'El Green Dot representa la velocidad de mejor relación sustentación/resistencia en configuración limpia, maximizando el techo remanente monomotor.',
    'refs': ['MOB Binter E195-E2 Sección 3.1.8.3 (Pág. 3.1-19)']
  },
  {
    'num': 16, 'ans': 'D', 'subj': 'cmd_emergency',
    'stem': 'En la clasificación de mensajes EICAS y prioridad de atención en cabina de vuelo (MOB 3.0-2), ¿cuál es el criterio jerárquico de resolución?',
    'opts': [
      ('A', 'Advisory cyan, Caution ámbar, Warning rojo'),
      ('B', 'Alfabéticamente por orden de aparición'),
      ('C', 'A discreción de quien lleve los mandos'),
      ('D', '1° WARNING (Rojo) con chevron \'>\'; 2° WARNING (Rojo); 3° CAUTION (Ámbar) con chevron \'>\'; 4° CAUTION (Ámbar); 5° ADVISORY (Cyan) con chevron; 6° ADVISORY (Cyan). Los mensajes con chevron son los mensajes raíz causantes')
    ],
    'obj': 'MOB 3.0-2 - Jerarquía y Prioridad de Mensajes EICAS (Golden Chevron Messages)',
    'exp': 'Los mensajes precedidos por el símbolo de chevron ">" (Golden CAS Messages) identifican la causa raíz y deben resolverse en primer lugar dentro de su jerarquía de color.',
    'refs': ['MOB Binter E195-E2 Sección 3.0-2 (Pág. 3.0-2)']
  },
  {
    'num': 17, 'ans': 'A', 'subj': 'cmd_emergency',
    'stem': '¿Qué clasificación establece el MOB 3.0-2 para coordinar una eventualidad con la Tripulación de Cabina?',
    'opts': [
      ('A', 'Emergencia Imprevista (en despegue/toma/descenso sin tiempo de preparación), Emergencia Prevista (aterrizaje en condiciones marginales con preparación de cabina), y Aterrizaje Inseguro (circunstancias anormales sin evacuación prevista inicial pero cabina prevenida)'),
      ('B', 'Emergencia Grado 1, 2 y 3'),
      ('C', 'Fallo técnico leve y fallo grave'),
      ('D', 'Emergencia comercial y técnica')
    ],
    'obj': 'MOB 3.0-2 - Tipos de Emergencia (Imprevista, Prevista, Aterrizaje Inseguro)',
    'exp': 'El MOB clasifica las contingencias en Emergencia Imprevista, Emergencia Prevista o Aterrizaje Inseguro para coordinar el tipo de preparación del pasaje.',
    'refs': ['MOB Binter E195-E2 Sección 3.0-2 (Pág. 3.0-2)']
  },
  {
    'num': 18, 'ans': 'B', 'subj': 'cmd_emergency',
    'stem': 'En la tabla de llamadas y comunicaciones de socorro/alerta (MOB 3.1.7 / Pág. 3.1-16), ante un fallo de motor en vuelo, ¿qué llamada se efectúa a ATC y qué condición se comunica a la Tripulación de Cabina?',
    'opts': [
      ('A', 'Llamada a ATC: PAN-PAN; Llamada a Cabin Crew: Emergencia Imprevista'),
      ('B', 'Llamada a ATC: MAYDAY inicialmente (revertido a PAN-PAN si se recupera o estabiliza); Llamada a Cabin Crew: Aterrizaje Inseguro'),
      ('C', 'Llamada a ATC: Ninguna; Llamada a Cabin Crew: Evacuación'),
      ('D', 'Llamada a ATC: SECURITE; Llamada a Cabin Crew: Normal')
    ],
    'obj': 'MOB 3.1.7 Tabla de Comunicaciones de Emergencia (Fallo de Motor)',
    'exp': 'Ante fallo de motor se emite MAYDAY inicial a ATC (pudiendo pasar a PAN-PAN) y se declara Aterrizaje Inseguro a la tripulación de cabina vía TELSI.',
    'refs': ['MOB Binter E195-E2 Sección 3.1.7 (Pág. 3.1-16)']
  },
  {
    'num': 19, 'ans': 'C', 'subj': 'cmd_emergency',
    'stem': 'Ante una indicación de Fuego en el escape del motor en tierra sin indicación de fuego en la nacelle ni ITT anormal (Tailpipe Fire / Torching - MOB 3.1.3.3):',
    'opts': [
      ('A', 'Disparar las botellas de halón del motor de inmediato'),
      ('B', 'Acelerar el motor al 100% de potencia'),
      ('C', 'Proceder según la checklist QRH NAP1 ENGINE TAILPIPE FIRE (cortar combustible y molinetear el motor con el arrancador sin aplicar extintores de halón a la nacelle)'),
      ('D', 'Despegar inmediatamente')
    ],
    'obj': 'MOB 3.1.3.3 / QRH E195-E2 - Procedimiento ante Engine Tailpipe Fire (Torching)',
    'exp': 'El fuego de escape se debe a combustible no quemado en la tobera. El halón no llega a la tobera; se extingue cortando combustible y molineteando con el starter.',
    'refs': ['MOB Binter E195-E2 Sección 3.1.3.3 (Pág. 3.1-6)', 'QRH NAP1']
  },
  {
    'num': 20, 'ans': 'D', 'subj': 'cmd_emergency',
    'stem': 'En la operativa con máscaras de oxígeno de tripulación de vuelo Eros/QDM (MOB 3.1.4.2), ¿qué características tiene el modo EMER?',
    'opts': [
      ('A', 'Suministra oxígeno diluido al 50% con aire de cabina'),
      ('B', 'Apaga los micrófonos de la máscara'),
      ('C', 'Es obligatorio durante el rodaje'),
      ('D', 'Suministra oxígeno al 100% no diluido con sobrepresión positiva continua para expulsar humos y gases tóxicos del interior de la máscara (debiendo volver a 100% o NORM una vez despejada la máscara para facilitar las comunicaciones)')
    ],
    'obj': 'MOB 3.1.4.2 / AOM Capítulo 17 - Modos de Máscara de Oxígeno QDM (EMER)',
    'exp': 'El modo EMER genera presión positiva continua para evitar la entrada de humo; una vez libre de gases se retorna a 100% para evitar dificultades de comunicación.',
    'refs': ['MOB Binter E195-E2 Sección 3.1.4.2 (Pág. 3.1-9 y 3.1-10)']
  },
  {
    'num': 21, 'ans': 'A', 'subj': 'cmd_emergency',
    'stem': 'Si se sospecha de un impacto con aves o granizo en vuelo durante la aproximación o aterrizaje (MOB 3.1.6.2):',
    'opts': [
      ('A', 'No retraer los flaps al abandonar la pista y rodar con los flaps extendidos hasta el estacionamiento para que mantenimiento realice la inspección exterior previa'),
      ('B', 'Retraer los flaps a toda velocidad'),
      ('C', 'Apagar los motores en la pista'),
      ('D', 'Declarar emergencia y evacuar por toboganes')
    ],
    'obj': 'MOB 3.1.6.2 - Procedimiento ante Impacto con Aves o Granizo (No retraer flaps)',
    'exp': 'No se deben retraer los flaps para evitar dañar los mecanismos si hay restos atrapados en los carriles hasta que mantenimiento verifique las superficies.',
    'refs': ['MOB Binter E195-E2 Sección 3.1.6.2 (Pág. 3.1-14)']
  },
  {
    'num': 22, 'ans': 'B', 'subj': 'cmd_emergency',
    'stem': 'En un aterrizaje con sobrepeso (Overweight Landing - MOB 3.1.5), ¿cuál es el régimen máximo admisible de descenso en el momento de la toma de contacto?',
    'opts': [
      ('A', '600 pies/minuto'),
      ('B', '300 pies/minuto (no intentar una toma excesivamente suave flotando en pista, usar máxima reversa hasta 60 kts y anotar el peso y régimen en el parte de vuelo para inspección de mantenimiento)'),
      ('C', '100 pies/minuto'),
      ('D', '500 pies/minuto')
    ],
    'obj': 'MOB 3.1.5 / SOPM 3-40 - Aterrizaje con Sobrepeso (Máx 300 fpm en toma)',
    'exp': 'En sobrepeso la tasa máxima de toma es 300 fpm sin flotar; se usa reversa máxima hasta 60 kts y se requiere inspección técnica obligatoria post-aterrizaje.',
    'refs': ['MOB Binter E195-E2 Sección 3.1.5 (Pág. 3.1-14)']
  },
  {
    'num': 23, 'ans': 'C', 'subj': 'cmd_emergency',
    'stem': 'Ante una alerta de proximidad al terreno EGPWS WARNING (\"PULL UP\" / \"TERRAIN TERRAIN PULL UP\"), ¿cuál es la acción de los pilotos respecto a la configuración de la aeronave (MOB 3.1.11)?',
    'opts': [
      ('A', 'Retraer el tren y los flaps inmediatamente'),
      ('B', 'Extender todos los aerofrenos'),
      ('C', 'Mantener la configuración actual de la aeronave (tren y flaps sin tocar) hasta asegurar la separación completa con el terreno y alcanzar la MSA o MORA'),
      ('D', 'Apagar los mandos de vuelo')
    ],
    'obj': 'MOB 3.1.11 / SOPM 3-35 - EGPWS Warning Recovery (Mantener configuración)',
    'exp': 'Durante el escape de EGPWS no se cambia la configuración de flaps ni tren para no generar pérdidas transitorias de sustentación.',
    'refs': ['MOB Binter E195-E2 Sección 3.1.11 (Pág. 3.1-24)']
  },
  {
    'num': 24, 'ans': 'D', 'subj': 'cmd_emergency',
    'stem': 'En la ejecución de una maniobra de escape ante un TCAS RA (MOB 3.1.12), ¿qué acción manual inmediata debe realizar el PF?',
    'opts': [
      ('A', 'Picar a fondo'),
      ('B', 'Esperar la confirmación del controlador ATC'),
      ('C', 'Apagar el transpondedor'),
      ('D', 'Desconectar inmediatamente el AP y el AT cantando \"MY CONTROLS\" y guiar suavemente el símbolo FPA (Flight Path Angle) dentro del rectángulo verde de la FLY-TO-ZONE del PFD')
    ],
    'obj': 'MOB 3.1.12 / SOPM 3-05 - Acciones Inmediatas ante TCAS RA (Fly-to-Zone)',
    'exp': 'El PF toma mandos desconectando AP y AT y ajusta el símbolo FPA dentro del área verde del PFD, mientras el PM canta "TCAS RA" a ATC y enciende luces y señal de cinturones.',
    'refs': ['MOB Binter E195-E2 Sección 3.1.12 (Pág. 3.1-25)']
  },
  {
    'num': 25, 'ans': 'A', 'subj': 'cmd_emergency',
    'stem': 'En el procedimiento de Amerizaje de Emergencia (Ditching - MOB 3.1.14.2), ¿cómo se debe orientar la toma de contacto sobre el agua?',
    'opts': [
      ('A', 'Aterrizar PARALELO al oleaje (a lo largo de la cresta del oleaje o en la depresión), con tren de aterrizaje ARRIBA (UP), flaps máximos disponibles, variómetro de 200 a 300 pies/min y velocidad Vref'),
      ('B', 'Aterrizar perpendicularmente cruzando las olas con tren abajo'),
      ('C', 'Amerizar a 250 nudos sin flaps'),
      ('D', 'Lanzar las balsas salvavidas antes del impacto')
    ],
    'obj': 'MOB 3.1.14.2 / SOPM 3-40 - Procedimiento de Ditching (Paralelo a las Olas)',
    'exp': 'El amerizaje se efectúa paralelo a las crestas del oleaje con tren arriba para evitar que el morro o ala se claven en el agua.',
    'refs': ['MOB Binter E195-E2 Sección 3.1.14.2 (Pág. 3.1-28 y 3.1-29)']
  }
]

# Append the remaining 25 questions from the original pool (questions 26 to 50 from previous lote5)
with open('banks/command-upgrade/gestion-emergencias-mando/cmd_mnemonicos_gestion_mando.json', 'r', encoding='utf-8') as f:
    old_data = json.load(f)

for old_q in old_data[25:]:
    num = len(raw_lote5_updated) + 1
    raw_lote5_updated.append({
        'num': num,
        'ans': [opt['id'] for opt in old_q['options'] if opt['is_correct']][0],
        'subj': old_q['subject_id'],
        'stem': old_q['stem'],
        'opts': [(opt['id'], opt['text']) for opt in old_q['options']],
        'obj': old_q['learning_objective'],
        'exp': old_q['explanation']['text'],
        'refs': old_q['explanation']['references']
    })

final_data_lote5 = []
for q in raw_lote5_updated:
    options_list = []
    for opt_id, opt_text in q['opts']:
        options_list.append({
            'id': opt_id,
            'text': opt_text,
            'is_correct': (opt_id == q['ans'])
        })
    item = {
        'id': f'CMD-MGT-{q["num"]:03d}',
        'subject_id': q['subj'],
        'learning_objective': q['obj'],
        'stem': q['stem'],
        'options': options_list,
        'explanation': {
            'text': q['exp'],
            'references': q['refs']
        },
        'metadata': {
            'difficulty': 0.4
        }
    }
    final_data_lote5.append(item)

out_file = 'banks/command-upgrade/gestion-emergencias-mando/cmd_mnemonicos_gestion_mando.json'
with open(out_file, 'w', encoding='utf-8') as f:
    json.dump(final_data_lote5, f, ensure_ascii=False, indent=2)

print(f'[SUCCESS] {len(final_data_lote5)} reactivos de Lote 5 auditados y actualizados en {out_file}')
