import json

raw_lote5 = [
  {
    'num': 1, 'ans': 'A', 'subj': 'cmd_mnemonicos_mando',
    'stem': 'En la sistemática de briefings operacionales de Binter, ¿qué elementos evalúa el mnemónico RETSE?',
    'opts': [
      ('A', 'R: Rutas y SID/STAR; E: Estado de la aeronave (MEL/diferidos/combustible); T: Terreno y Meteorología; S: Servicios y dependencias ATC; E: Expectativas, amenazas y gestión de errores (TEM)'),
      ('B', 'R: Radio; E: Emergencia; T: Torre; S: Salida; E: Espera'),
      ('C', 'R: Ruedas; E: Equipaje; T: Tanques; S: Sobrecargo; E: Escala'),
      ('D', 'R: Radar; E: Empuje; T: Tráfico; S: Senda; E: Elevación')
    ],
    'obj': 'Mnemónicos Binter - RETSE Briefing Estructurado',
    'exp': 'RETSE estructura el briefing previo al vuelo: Rutas, Estado de la aeronave, Terreno/Meteo, Servicios y Expectativas/Amenazas TEM.',
    'refs': ['SOPM Binter Briefing Guide', 'MOA 8.3 CRM & TEM']
  },
  {
    'num': 2, 'ans': 'B', 'subj': 'cmd_mnemonicos_mando',
    'stem': 'En la comunicación de contingencias entre el Comandante y la Sobrecargo / Tripulación de Cabina, ¿qué estructura sigue el briefing NITS?',
    'opts': [
      ('A', 'Nivel de vuelo, Instrumentos, Tiempo estimado, Salidas'),
      ('B', 'N: Nature (Naturaleza de la anomalía); I: Intentions (Intenciones del Comandante); T: Time (Tiempo disponible hasta la toma/contacto); S: Special instructions (Instrucciones especiales de preparación de cabina o evacuación)'),
      ('C', 'Novedades, Información técnica, Turbulencia, Servicios'),
      ('D', 'Notificación, Identificación, Temperatura, Señales')
    ],
    'obj': 'CRM / Emergencias - Briefing NITS a la Tripulación de Cabina',
    'exp': 'El formato NITS asegura la transmisión clara y concisa de la situación crítica a la sobrecargo: Naturaleza, Intenciones, Tiempo e Instrucciones especiales.',
    'refs': ['MOA 8.3 / MOB Procedimientos de Emergencia', 'ICAO Doc 9683 Human Factors']
  },
  {
    'num': 3, 'ans': 'C', 'subj': 'cmd_mnemonicos_mando',
    'stem': 'En el modelo de toma de decisiones aeronáuticas para comandantes PIOSEE (o DODAR/FORDEC), ¿cuáles son las etapas secuenciales del proceso?',
    'opts': [
      ('A', 'Planificar, Ignorar, Ordenar, Salir, Entrar, Evaluar'),
      ('B', 'Pilotar, Informar, Operar, Sintonizar, Estabilizar, Esperar'),
      ('C', 'P: Problem (Identificar el problema); I: Information (Recopilar datos); O: Options (Generar alternativas); S: Select (Elegir la mejor opción); E: Execute (Ejecutar); E: Evaluate (Evaluar los resultados continuamente)'),
      ('D', 'Prevenir, Iniciar, Organizar, Solicitar, Exigir, Entregar')
    ],
    'obj': 'Toma de Decisiones de Mando (Aeronautical Decision Making - PIOSEE)',
    'exp': 'PIOSEE guía el razonamiento estructurado del comandante ante situaciones imprevistas complejas: Problema, Información, Opciones, Selección, Ejecución y Evaluación.',
    'refs': ['EASA AMC1 ORO.FC.115 CRM', 'MOA Capítulo 3 / 8 CRM']
  },
  {
    'num': 4, 'ans': 'D', 'subj': 'cmd_disruptive_pax',
    'stem': 'De acuerdo con la clasificación ICAO/EASA de Pasajeros Conflictivos (Disruptive / Unruly Passengers), ¿cómo se define el Nivel 2 de amenaza?',
    'opts': [
      ('A', 'Conducta verbalmente abusiva o desafiante sin violencia física'),
      ('B', 'Intento de asalto o intrusión en la cabina de pilotaje'),
      ('C', 'Amenaza con arma de fuego o artefacto explosivo'),
      ('D', 'Violencia física directa (empujones, forcejeos, agresiones físicas a tripulantes o pasajeros o daños intencionados a elementos de la cabina)')
    ],
    'obj': 'Seguridad / Disruptive Pax - Clasificación de Amenazas (Nivel 2)',
    'exp': 'Nivel 1: Insubordinación verbal; Nivel 2: Violencia física / agresión; Nivel 3: Amenaza vital / exhibición de armas; Nivel 4: Intento de asalto a la cabina de vuelo.',
    'refs': ['ICAO Cir 288', 'MOA Capítulo 10 Security']
  },
  {
    'num': 5, 'ans': 'A', 'subj': 'cmd_disruptive_pax',
    'stem': 'Ante un incidente de Pasajero Conflictivo clasificado como Nivel 3 o Nivel 4 a bordo en vuelo:',
    'opts': [
      ('A', 'El comandante debe mantener la puerta de cabina blindada bloqueada en modo LOCK, declarar emergencia a ATC con transponder 7500 (o 7700), coordinar la inmovilización/contención del agresor con tripulantes y ABPs y proceder al aterrizaje no programado más inmediato'),
      ('B', 'El comandante debe salir a la cabina de pasaje para negociar personalmente con el agresor'),
      ('C', 'Se debe continuar el vuelo hasta el destino programado sin avisar a las autoridades'),
      ('D', 'Se deben apagar las luces de emergencia')
    ],
    'obj': 'MOA Cap. 10 Security - Protocolo ante Amenazas Nivel 3 y 4',
    'exp': 'La puerta blindada no se abre bajo ningún concepto; los pilotos permanecen a los mandos, declaran emergencia y ejecutan el desvío inmediato mientras la cabina es contenida por TCPs y ABPs.',
    'refs': ['MOA Capítulo 10 Security', 'EASA Part-CAT Security']
  },
  {
    'num': 6, 'ans': 'B', 'subj': 'cmd_emergency',
    'stem': 'En caso de incapacitación súbita de uno de los pilotos en vuelo (Pilot Incapacitation), ¿cuál es la primera prioridad del piloto superviviente?',
    'opts': [
      ('A', 'Administrar reanimación cardiopulmonar abandonando los mandos'),
      ('B', 'Asumir el control unívoco de la aeronave (\"I HAVE CONTROLS\"), enganchar el Piloto Automático y asegurar la trayectoria de vuelo segura y la altitud antes de solicitar auxilio médico'),
      ('C', 'Desconectar todos los generadores'),
      ('D', 'Apagar los motores')
    ],
    'obj': 'CRM / Incapacitación de Tripulante en Vuelo',
    'exp': 'La regla de oro es volar el avión: asumir mandos, conectar automatismos, llamar a la sobrecargo para retirar al piloto incapacitado y reclinar/bloquear su asiento fuera de los controles.',
    'refs': ['SOPM Emergency Procedures - Crew Incapacitation', 'MOA 8.3']
  },
  {
    'num': 7, 'ans': 'C', 'subj': 'cmd_performance',
    'stem': '¿Cuáles son los parámetros y compuertas obligatorias de la Política de Aproximación Estabilizada (Stabilized Approach Criteria) en condiciones IMC y VMC en la compañía?',
    'opts': [
      ('A', 'Estar estabilizado a 200 ft AGL en cualquier condición'),
      ('B', 'Estar en velocidad de pérdida y flaps arriba'),
      ('C', 'Estar completamente estabilizado a no menos de 1000 ft AAL en IMC y 500 ft AAL en VMC: en senda y localizador correctos, velocidad Vref a Vref+10 KT, configuración de aterrizaje completa, potencia estabilizada y régimen de descenso <= 1000 fpm'),
      ('D', 'No existe criterio fijo de altitud si la pista está a la vista')
    ],
    'obj': 'MOA 8.1.3 / SOPM - Criterios de Aproximación Estabilizada (1000 ft IMC / 500 ft VMC)',
    'exp': 'Si a 1000 ft en IMC o a 500 ft en VMC no se cumplen todos los parámetros de velocidad, senda, configuración y potencia, la frustrada (Go-Around) es obligatoria e ineludible.',
    'refs': ['MOA Binter 8.1.3.8', 'SOPM Stabilized Approach Criteria']
  },
  {
    'num': 8, 'ans': 'D', 'subj': 'cmd_reporting',
    'stem': 'En la filosofía de Cultura Justa (Just Culture) y Gestión de Seguridad Operacional (SMS):',
    'opts': [
      ('A', 'Todo error humano involuntario es sancionado económicamente'),
      ('B', 'Los tripulantes tienen prohibido reportar incidencias técnicas'),
      ('C', 'Solo se investigan los accidentes con daños mortales'),
      ('D', 'Se garantiza la no adopción de medidas punitivas ante errores humanos honestos o fallos involuntarios notificados de buena fe, distinguiéndolos claramente de la negligencia grave o el dolo deliberado')
    ],
    'obj': 'SMS / MOA Cap. 3 - Principios de Cultura Justa (Just Culture)',
    'exp': 'La cultura justa promueve el reporte abierto de sucesos para mejorar la seguridad global protegiendo al informante salvo ante actos deliberados o temeridad temeraria.',
    'refs': ['EASA Reg (UE) 376/2014', 'MOA Capítulo 3 SMS']
  },
  {
    'num': 9, 'ans': 'A', 'subj': 'cmd_emergency',
    'stem': 'Ante una indicación o sospecha de fuego o humo no controlable en la cabina de pasaje o bodega en vuelo (Uncontrollable Fire / Smoke):',
    'opts': [
      ('A', 'El comandante debe iniciar inmediatamente el descenso de emergencia y proceder a tomar tierra en el aeropuerto adecuado más próximo en un tiempo máximo preferible no superior a 15 minutos'),
      ('B', 'Continuar el vuelo al destino para no generar retrasos comerciales'),
      ('C', 'Abrir las ventanillas de cabina a FL300'),
      ('D', 'Desconectar todas las bombas de combustible')
    ],
    'obj': 'Emergencias Mayores - Regla de Oro en Fuego en Vuelo (Toma < 15 min)',
    'exp': 'Las estadísticas históricas demuestran que un fuego no extinguido puede causar fallo estructural o de control en menos de 15-20 minutos. La prioridad es aterrizar de inmediato.',
    'refs': ['QRH E195-E2 Fire & Smoke Procedures', 'MOA 8.3']
  },
  {
    'num': 10, 'ans': 'B', 'subj': 'cmd_moa_mob',
    'stem': '¿Cuál es la autoridad legal del Comandante sobre la operación y seguridad de la aeronave según el Reglamento EASA CAT.GEN.MPA.105 y las Leyes de Navegación Aérea?',
    'opts': [
      ('A', 'Solo puede decidir sobre el menú de a bordo'),
      ('B', 'Ostenta la autoridad definitiva sobre la aeronave, su tripulación, pasajeros y carga, con potestad para desembarcar a cualquier persona que comprometa la seguridad, negarse a transportar carga insegura y tomar cualquier acción necesaria para la seguridad del vuelo'),
      ('C', 'Está subordinado a las instrucciones comerciales del handling en tierra'),
      ('D', 'No puede desviar el vuelo sin aprobación previa del Consejo de Administración')
    ],
    'obj': 'EASA CAT.GEN.MPA.105 - Autoridad y Deberes del Comandante',
    'exp': 'El comandante tiene la potestad suprema y responsabilidad directa sobre la operación, seguridad y disciplina de la aeronave desde el cierre de puertas hasta la apertura final.',
    'refs': ['EASA Part-CAT CAT.GEN.MPA.105', 'MOA Capítulo 1 Organización y Responsabilidades']
  },
  {
    'num': 11, 'ans': 'C', 'subj': 'cmd_mnemonicos_mando',
    'stem': 'En la preparación de llegadas complejas y aproximaciones instrumentales, ¿qué aspectos cubre el mnemónico IMFLOCC?',
    'opts': [
      ('A', 'Instrucción, Mando, Frenos, Luces, Oxígeno, Compensador, Checklist'),
      ('B', 'Indicadores, Motores, Fuselaje, Llantas, OAT, Calzos, Cabina'),
      ('C', 'I: Identificación de la carta; M: Mínimos meteorológicos y MSA; F: Frecuencias de radioayudas; L: Límites de velocidad/altitud en STAR; O: Obstáculos y terreno; C: Configuración y frustrada; C: Comunicaciones ATC'),
      ('D', 'Inercial, Magnético, Flaps, Luces, Outflow, Combustible, Contacto')
    ],
    'obj': 'Mnemónicos Operacionales - IMFLOCC para Aproximación',
    'exp': 'IMFLOCC asegura un repaso metódico de todos los elementos críticos de la ficha de aproximación y la trayectoria de descenso.',
    'refs': ['SOPM Briefing Standards', 'MOA 8.3']
  },
  {
    'num': 12, 'ans': 'D', 'subj': 'cmd_emergency',
    'stem': 'En una aproximación visual o por instrumentos, si se produce una alarma EGPWS / TAWS de tipo \"PULL UP\" o \"TERRAIN, TERRAIN, PULL UP\":',
    'opts': [
      ('A', 'El piloto debe buscar visualmente el terreno antes de actuar'),
      ('B', 'Preguntar a ATC si hay obstáculos en la zona'),
      ('C', 'Acelerar suavemente manteniendo la altitud'),
      ('D', 'Ejecutar inmediatamente la maniobra de escape EGPWS de memoria: desconectar AP/AT, aplicar empuje máximo MAX THRUST de inmediato, levantar morro a la actitud de máximo ángulo de ascenso (Pitch to Stick Shaker) y mantener alas niveladas')
    ],
    'obj': 'QRH / SOPM E195-E2 - EGPWS Warning Recovery Escape Maneuver',
    'exp': 'Una advertencia PULL UP no admite demora: se aplica empuje máximo y se vuela al límite de sustentación (Pitch to Shaker) para librar el terreno inmediatamente.',
    'refs': ['QRH E195-E2 Terrain Warning', 'SOPM E195-E2']
  },
  {
    'num': 13, 'ans': 'A', 'subj': 'cmd_performance',
    'stem': 'Ante un aviso de cizalladura reactiva (Windshear Warning) generado por el sistema de alerta durante el despegue o aproximación:',
    'opts': [
      ('A', 'Desconectar piloto automático, aplicar empuje máximo MAX THRUST (avanzando palancas al tope mecánico), seguir la guía del Flight Director de escape o volar al ángulo de ataque de protección contra pérdida, sin cambiar la configuración de flaps ni tren hasta librar la cizalladura'),
      ('B', 'Retraer el tren y los flaps inmediatamente'),
      ('C', 'Picar el morro para ganar velocidad'),
      ('D', 'Cortar motores')
    ],
    'obj': 'QRH / SOPM E195-E2 - Maniobra de Escape de Windshear',
    'exp': 'En Windshear Warning se demanda máxima potencia, se sigue la guía de escape manteniendo la configuración fija (no tocar tren ni flaps) para no degradar sustentación.',
    'refs': ['QRH E195-E2 Windshear Escape Maneuver', 'SOPM E195-E2']
  },
  {
    'num': 14, 'ans': 'B', 'subj': 'cmd_moa_mob',
    'stem': 'En la gestión de tiempos de descanso y fatiga de la tripulación (EASA ORO.FTL.235):',
    'opts': [
      ('A', 'El descanso en la base puede ser de 6 horas'),
      ('B', 'El período mínimo de descanso en la base de operaciones debe ser al menos tan largo como el período de actividad precedente, o un mínimo de 12 horas (el que sea mayor)'),
      ('C', 'El descanso fuera de base puede reducirse a 8 horas sin justificación'),
      ('D', 'No se computa descanso si el hotel está en el aeropuerto')
    ],
    'obj': 'EASA ORO.FTL.235 / MOA Cap. 7 - Requisitos Mínimos de Descanso',
    'exp': 'El descanso en base debe igualar el FDP previo con un mínimo de 12 horas; fuera de base el descanso mínimo es de 10 horas garantizando 8 horas de sueño ininterrumpido.',
    'refs': ['MOA Capítulo 7 FTL', 'EASA ORO.FTL.235']
  },
  {
    'num': 15, 'ans': 'C', 'subj': 'cmd_flight_planning',
    'stem': '¿Qué es el Punto de Decisión / Punto de Replanificación en Ruta (Reduced Contingency Fuel Procedure / Decision Point)?',
    'opts': [
      ('A', 'El punto donde se enciende el radar'),
      ('B', 'El punto donde se avisa a los pasajeros'),
      ('C', 'Un punto predeterminado en la ruta donde el comandante evalúa el combustible remanente real para decidir si continúa al destino principal con contingencia reducida o se desvía a un aeródromo en ruta'),
      ('D', 'El punto de aceleración en despegue')
    ],
    'obj': 'MOA 8.1.7 - Procedimiento de Replanificación en Vuelo (RCF / Decision Point)',
    'exp': 'El Decision Point permite optimizar el combustible cargado evaluando en vuelo el cumplimiento de mínimos para destino o desvío a la alternativa planificada.',
    'refs': ['MOA Binter 8.1.7', 'EASA AMC1 CAT.OP.MPA.181']
  },
  {
    'num': 16, 'ans': 'D', 'subj': 'cmd_disruptive_pax',
    'stem': 'En el transporte de armas de fuego y munición pertenecientes a particulares o deportistas:',
    'opts': [
      ('A', 'Pueden llevarse en el bolsillo del pasajero'),
      ('B', 'Se guardan en el armario de cabina'),
      ('C', 'Solo se permite en vuelos sin pasaje'),
      ('D', 'Las armas deben viajar descargadas, desmontadas o precintadas en bodega de carga dentro de estuches rígidos bloqueados, separadas de la munición (división 1.4S máx 5 kg) y con guía de circulación de la Guardia Civil')
    ],
    'obj': 'MOA Cap. 9 & 10 - Transporte de Armas de Fuego y Munición',
    'exp': 'Las armas de particulares viajan exclusivamente en bodega, descargadas, con la documentación de la intervención de armas y la munición embalada según la división 1.4S.',
    'refs': ['MOA Binter Capítulo 9 / 10', 'Programa Nacional de Seguridad']
  },
  {
    'num': 17, 'ans': 'A', 'subj': 'cmd_emergency',
    'stem': '¿Cuál es el código transponder estándar internacional a seleccionar en caso de Emergencia General no especificada?',
    'opts': [
      ('A', 'Código 7700'),
      ('B', 'Código 7600'),
      ('C', 'Código 7500'),
      ('D', 'Código 2000')
    ],
    'obj': 'OACI / SERA - Códigos Transponder de Emergencia (7700)',
    'exp': '7700 indica emergencia general; 7600 fallo de comunicaciones de radio; 7500 acto de interferencia ilícita o secuestro.',
    'refs': ['SERA.4001', 'MOA Capítulo 12 Reglas del Aire']
  },
  {
    'num': 18, 'ans': 'B', 'subj': 'cmd_emergency',
    'stem': '¿Cuál es el código transponder a seleccionar en caso de Acto de Interferencia Ilícita (Secuestro de la aeronave)?',
    'opts': [
      ('A', 'Código 7700'),
      ('B', 'Código 7500'),
      ('C', 'Código 7600'),
      ('D', 'Código 1200')
    ],
    'obj': 'OACI / SERA - Código Transponder de Secuestro (7500)',
    'exp': 'El código 7500 alerta discretamente a todos los centros de control y defensa aérea sobre una situación de interferencia ilícita a bordo.',
    'refs': ['SERA.4001', 'MOA Capítulo 10 Security']
  },
  {
    'num': 19, 'ans': 'C', 'subj': 'cmd_flight_planning',
    'stem': '¿Cuál es la tolerancia máxima permitida de desviación en peso entre el Loadsheet final y los datos introducidos en el FMS / Takeoff Data para no requerir un recálculo de prestaciones?',
    'opts': [
      ('A', '50 kg'),
      ('B', '200 kg'),
      ('C', 'Tolerancia estándar de +/- 500 kg en el TOW (o el límite especificado en el SOPM de la compañía)'),
      ('D', '2000 kg')
    ],
    'obj': 'SOPM / Masa y Centrado - Tolerancia de Peso en Hoja de Carga (LMC)',
    'exp': 'Las variaciones de última hora (LMC) que superen las tolerancias autorizadas (+/- 500 kg en peso o variaciones significativas de CG) obligan a recalcular velocidades V1, Vr, V2 y empuje.',
    'refs': ['SOPM E195-E2 Performance', 'MOA 8.1.8']
  },
  {
    'num': 20, 'ans': 'D', 'subj': 'cmd_flight_ground_ops',
    'stem': 'En la gestión de la aproximación visual nocturna (Night Visual Approach):',
    'opts': [
      ('A', 'No se requiere ninguna ayuda visual'),
      ('B', 'Se puede descender por debajo de la MSA en cualquier momento'),
      ('C', 'Solo se permite en vuelos de entrenamiento'),
      ('D', 'Requiere que la pista cuente con iluminación de borde y sistema visual indicador de pendiente de aproximación operativo (PAPI o VASI), manteniendo la senda visual hasta la toma')
    ],
    'obj': 'MOA 8.1.3 - Aproximaciones Visuales Nocturnas',
    'exp': 'Las aproximaciones visuales de noche exigen iluminación completa de pista y guía vertical PAPI/VASI para mitigar ilusiones ópticas como el efecto agujero negro (Black Hole Effect).',
    'refs': ['MOA Binter 8.1.3.5 Aproximaciones Visuales']
  },
  {
    'num': 21, 'ans': 'A', 'subj': 'cmd_mnemonicos_mando',
    'stem': 'En la gestión de amenazas y errores (Threat & Error Management - TEM), ¿cómo se clasifican las amenazas externas (Latent / Environmental Threats)?',
    'opts': [
      ('A', 'Eventos fuera del control directo de la tripulación como meteorología adversa, congestión ATC, terreno montañoso o contaminación de pista'),
      ('B', 'Errores cometidos por el propio piloto en la selección de botones'),
      ('C', 'Averías del FMS exclusivamente'),
      ('D', 'Falta de combustible por mala planificación')
    ],
    'obj': 'CRM / TEM - Definición de Amenazas Ambientales',
    'exp': 'Las amenazas son factores externos al cockpit que aumentan la complejidad operativa; su identificación proactiva en el briefing permite implementar contramedidas.',
    'refs': ['ICAO Doc 9803 Line Operations Safety Audit', 'MOA 8.3']
  },
  {
    'num': 22, 'ans': 'B', 'subj': 'cmd_reporting',
    'stem': '¿Qué suceso operacional relativo a la proximidad con el terreno exige la emisión prioritaria de un informe de seguridad ASR y notificación a la autoridad?',
    'opts': [
      ('A', 'Sobrevolar una montaña a FL300'),
      ('B', 'Cualquier activación de aviso de advertencia EGPWS/TAWS (Warning: \"PULL UP\", \"TERRAIN\") que requiera maniobra evasiva o aviso de proximidad no previsto'),
      ('C', 'Ver el terreno en una aproximación visual diurna'),
      ('D', 'El encendido de las luces de aterrizaje')
    ],
    'obj': 'MOA Cap. 11 - Notificación Obligatoria de Alertas EGPWS / CFIT',
    'exp': 'Toda activación de alerta de proximidad al terreno de nivel Warning es un incidente grave que debe ser investigado por el departamento de Safety y reportado a la autoridad.',
    'refs': ['MOA Capítulo 11 Safety Management', 'EASA Reg 376/2014']
  },
  {
    'num': 23, 'ans': 'C', 'subj': 'cmd_performance',
    'stem': 'En la operación con pista mojada (Wet Runway), ¿qué coeficiente de fricción o Runway Condition Code (RWY CC) se asocia habitualmente según el Global Reporting Format (GRF)?',
    'opts': [
      ('A', 'RWY CC 6'),
      ('B', 'RWY CC 1'),
      ('C', 'RWY CC 5 (Frenado Bueno / Good)'),
      ('D', 'RWY CC 0')
    ],
    'obj': 'GRF / ICAO - Códigos de Condición de Pista (RWY CC 5 Wet)',
    'exp': 'En el sistema GRF, una pista mojada (hasta 3 mm de agua) se clasifica como RWY CC 5 con acción de frenado buena (Good).',
    'refs': ['ICAO Doc 9981 GRF', 'MOA 8.1.4.3']
  },
  {
    'num': 24, 'ans': 'D', 'subj': 'cmd_performance',
    'stem': '¿Qué condición de pista se codifica como RWY CC 2 según el sistema GRF?',
    'opts': [
      ('A', 'Pista seca y limpia'),
      ('B', 'Pista mojada con 1 mm de agua'),
      ('C', 'Hielo húmedo con frenado POOR'),
      ('D', 'Agua estancada (Standing Water > 3 mm) o aguanieve (Slush > 3 mm) con acción de frenado Medio a Pobre (Medium to Poor)')
    ],
    'obj': 'GRF / ICAO - Código RWY CC 2 (Standing Water / Slush)',
    'exp': 'El agua estancada o aguanieve de más de 3 mm de espesor genera riesgo severo de aquaplaning y se codifica como RWY CC 2.',
    'refs': ['ICAO Doc 9981', 'Manual de Operación Invernal']
  },
  {
    'num': 25, 'ans': 'A', 'subj': 'cmd_flight_planning',
    'stem': 'En la navegación PBN (Performance Based Navigation), ¿qué precisión de contención lateral en millas náuticas exige la especificación RNP 1?',
    'opts': [
      ('A', 'El avión debe mantenerse dentro de +/- 1,0 NM del eje de la ruta durante al menos el 95% del tiempo de vuelo'),
      ('B', 'Dentro de +/- 5 NM'),
      ('C', 'Dentro de +/- 10 NM'),
      ('D', 'Dentro de 100 metros')
    ],
    'obj': 'Navegación PBN - Especificación RNP 1 (SID / STAR)',
    'exp': 'RNP 1 requiere que el sistema FMS/GPS garantice contención lateral de 1 milla náutica en salidas y llegadas terminales.',
    'refs': ['ICAO Doc 9613 PBN Manual', 'MOA 8.1.3 Navegación']
  },
  {
    'num': 26, 'ans': 'B', 'subj': 'cmd_flight_planning',
    'stem': '¿Qué precisión lateral de navegación se exige en el segmento de aproximación final en una aproximación RNP APCH (LNAV/VNAV)?',
    'opts': [
      ('A', 'RNP 1.0 NM'),
      ('B', 'RNP 0.3 NM en el segmento de aproximación final (desde el FAF hasta el MAPt)'),
      ('C', 'RNP 5.0 NM'),
      ('D', 'RNP 0.01 NM')
    ],
    'obj': 'Navegación PBN - RNP APCH Final Approach Segment (0.3 NM)',
    'exp': 'En el tramo final de una RNP APCH, la sensibilidad del FMS pasa automáticamente a +/- 0,3 NM con monitorización de integridad RAIM/SBAS.',
    'refs': ['MOA Binter 8.1.3 Navegación PBN']
  },
  {
    'num': 27, 'ans': 'C', 'subj': 'cmd_emergency',
    'stem': 'En caso de fallo simultáneo de ambos motores en altitud de crucero (Dual Engine Failure / All Engines Out):',
    'opts': [
      ('A', 'Intentar aterrizar inmediatamente picando verticalmente'),
      ('B', 'Llenar los depósitos de combustible al máximo'),
      ('C', 'Adoptar de inmediato la velocidad de planeo óptimo para máximo alcance (Driftdown / Best Glide Speed), verificar despliegue de la RAT, seleccionar encendido continuo e iniciar la lista de rearranque en vuelo del QRH'),
      ('D', 'Apagar los mandos de vuelo fly-by-wire')
    ],
    'obj': 'QRH E195-E2 - Procedimiento ante Fallo Doble de Motor',
    'exp': 'Se debe trimar a velocidad de planeo óptimo para maximizar el tiempo y distancia disponibles mientras se intenta el encendido asistido por molineteo (Windmilling) o APU.',
    'refs': ['QRH E195-E2 Dual Engine Failure', 'AOM Emergency Procedures']
  },
  {
    'num': 28, 'ans': 'D', 'subj': 'cmd_disruptive_pax',
    'stem': '¿Qué autoridad ostenta el Comandante respecto a pasajeros en estado evidente de embriaguez o bajo el efecto de sustancias estupefacientes?',
    'opts': [
      ('A', 'Debe permitirles volar si viajan en ventanilla'),
      ('B', 'Solo puede advertirles verbalmente'),
      ('C', 'Debe servirles café caliente'),
      ('D', 'Tiene la obligación legal y potestad de denegar el embarque o desembarcar al pasajero antes del vuelo si su estado representa un peligro potencial para la seguridad o el orden a bordo')
    ],
    'obj': 'MOA 8.2.2 - Denegación de Embarque por Intoxicación o Drogas',
    'exp': 'El comandante denegará el transporte a cualquier individuo bajo intoxicación alcohólica o estupefacientes que amenace la seguridad o disciplina del vuelo.',
    'refs': ['EASA CAT.GEN.MPA.105', 'MOA 8.2.2 Pasajeros Inadmisibles']
  },
  {
    'num': 29, 'ans': 'A', 'subj': 'cmd_flight_planning',
    'stem': 'En la planificación de combustible, ¿qué es el \"Fuel Policy\" / Combustible de Políticas de Compañía?',
    'opts': [
      ('A', 'Combustible adicional establecido por las directrices de la compañía para cubrir contingencias operativas específicas en determinadas escalas o rutas'),
      ('B', 'El combustible que se tira en vuelo'),
      ('C', 'El combustible exclusivo para el calentamiento de motores en tierra'),
      ('D', 'El combustible de reserva de los vehículos de rampa')
    ],
    'obj': 'MOA 8.1.7 - Definición de Fuel Policy',
    'exp': 'El Fuel Policy es combustible programado por la aerolínea para optimizar costes de repostaje (Tankering) o mitigar demoras sistemáticas en determinados aeropuertos.',
    'refs': ['MOA Binter 8.1.7 Política de Combustible']
  },
  {
    'num': 30, 'ans': 'B', 'subj': 'cmd_moa_mob',
    'stem': '¿Cuál es la antelación mínima de presentación (Reporting Time) reglamentaria para la tripulación de vuelo antes de la salida programada del primer vuelo?',
    'opts': [
      ('A', '15 minutos'),
      ('B', '45 a 60 minutos antes de la hora programada de salida (según base y tipo de operación nacional/internacional en el MOA Cap. 7)'),
      ('C', '2 horas obligatorias'),
      ('D', '10 minutos')
    ],
    'obj': 'MOA Cap. 7 FTL - Tiempo de Presentación al Servicio (Reporting Time)',
    'exp': 'El tiempo de firma/presentación oficial está fijado entre 45 y 60 minutos antes del STD para realizar los briefings, revisión del ATL, meteo y despacho técnico.',
    'refs': ['MOA Capítulo 7 FTL', 'EASA ORO.FTL']
  },
  {
    'num': 31, 'ans': 'C', 'subj': 'cmd_mnemonicos_mando',
    'stem': 'En la gestión del modelo de liderazgo y toma de decisiones del comandante, ¿qué principio define la regla de \"Aviate, Navigate, Communicate, Manage\"?',
    'opts': [
      ('A', 'Hablar primero con la compañía y luego volar'),
      ('B', 'Navegar sin mirar los instrumentos'),
      ('C', 'Prioridad jerárquica estricta: 1° Mantener el control del avión (Volar); 2° Guiar la trayectoria hacia zona segura (Navegar); 3° Notificar a ATC y cabina (Comunicar); 4° Resolver sistemas y pasaje (Gestionar)'),
      ('D', 'Delegar el vuelo a la sobrecargo')
    ],
    'obj': 'CRM / Jerarquía de Prioridades en Vuelo (Aviate, Navigate, Communicate, Manage)',
    'exp': 'La jerarquía básica de seguridad nunca debe invertirse: volar la aeronave siempre precede a la comunicación por radio o la resolución de anomalías secundarias.',
    'refs': ['EASA CRM Guidelines', 'MOA 8.3']
  },
  {
    'num': 32, 'ans': 'D', 'subj': 'cmd_emergency',
    'stem': 'En caso de detección de humo denso en la cabina de vuelo que impida la visión de los instrumentos:',
    'opts': [
      ('A', 'Apagar todas las pantallas'),
      ('B', 'Abrir la puerta de cabina para ventilar hacia el pasaje'),
      ('C', 'Ponerse gafas de sol'),
      ('D', 'Colocarse máscaras de oxígeno con gafas de protección antifumo (Smoke Goggles) seleccionando 100% / Emergency Overpressure para presurizar las gafas y expulsar el humo de los ojos')
    ],
    'obj': 'QRH E195-E2 - Uso de Smoke Goggles y Presión Positiva de Oxígeno',
    'exp': 'Las gafas antihumo acopladas a la máscara con sobrepresión de emergencia evitan la entrada de gases tóxicos y garantizan la visibilidad del panel.',
    'refs': ['QRH E195-E2 Smoke / Fumes in Cockpit', 'AOM Capítulo 17']
  },
  {
    'num': 33, 'ans': 'A', 'subj': 'cmd_performance',
    'stem': '¿Qué es la velocidad de mínima sustentación y control monomotor en el aire (Vmca)?',
    'opts': [
      ('A', 'La velocidad calibrada mínima a la que, cuando falla súbitamente el motor crítico, es posible mantener el control direccional de la aeronave en vuelo con un alabeo máximo de 5° hacia el motor operativo'),
      ('B', 'La velocidad de crucero con viento en cola'),
      ('C', 'La velocidad a la que se tocan los frenos'),
      ('D', 'La velocidad de retracción de spoilers')
    ],
    'obj': 'EASA CS-25 - Definición de Vmca',
    'exp': 'Por debajo de Vmca la fuerza del timón de dirección es insuficiente para contrarrestar el momento de guiñada asimétrico generado por el motor operativo.',
    'refs': ['CS-25.149', 'AFM E195-E2 Sección 1']
  },
  {
    'num': 34, 'ans': 'B', 'subj': 'cmd_performance',
    'stem': '¿Qué es la velocidad de mínima sustentación y control monomotor en tierra (Vmcg)?',
    'opts': [
      ('A', 'La velocidad de rodaje en plataforma'),
      ('B', 'La velocidad mínima durante la carrera de despegue en la que, tras el fallo repentino del motor crítico, se puede mantener el control direccional utilizando únicamente el timón de dirección aerodinámico sin desviarse más de 30 ft del eje'),
      ('C', 'La velocidad de frenado con reversas'),
      ('D', 'La velocidad de rotación con sobrepeso')
    ],
    'obj': 'EASA CS-25 - Definición de Vmcg',
    'exp': 'V1 nunca puede ser inferior a Vmcg para garantizar que si el motor falla en tierra el piloto pueda mantener el avión dentro del ancho de pista sin salirse.',
    'refs': ['CS-25.149', 'AFM E195-E2']
  },
  {
    'num': 35, 'ans': 'C', 'subj': 'cmd_flight_planning',
    'stem': 'En la planificación de un vuelo bajo reglas IFR, si el aeródromo de destino cuenta con dos pistas independientes y ambas disponen de aproximación instrumental de precisión utilizable:',
    'opts': [
      ('A', 'No se requiere cargar combustible de reserva'),
      ('B', 'Se puede volar sin plan de vuelo'),
      ('C', 'Se puede despachar el vuelo sin aeródromo alternativo de destino (Destination Alternate) si las condiciones meteorológicas previstas indican techos y visibilidad holgadamente por encima de los límites fijados en el MOA (vuelo a destino aislado / sin alternativo)'),
      ('D', 'Se requiere obligatoriamente tres alternativos')
    ],
    'obj': 'MOA 8.1.2 - Condiciones para Despacho Sin Alternativo de Destino',
    'exp': 'Se autoriza la no inclusión de alternativo de destino si el vuelo es de corta duración y el destino dispone de 2 pistas separadas con meteorología excelente durante +/- 1h.',
    'refs': ['MOA Binter 8.1.2.2 Despacho Sin Alternativo']
  },
  {
    'num': 36, 'ans': 'D', 'subj': 'cmd_emergency',
    'stem': 'En caso de amerizaje forzoso de emergencia (Ditching) en el mar:',
    'opts': [
      ('A', 'Aterrizar con el tren de aterrizaje extendido y velocidad máxima'),
      ('B', 'Despresurizar el avión y abrir las puertas antes del impacto'),
      ('C', 'Llenar los depósitos de combustible de agua'),
      ('D', 'Aterrizar con tren de aterrizaje ARRIBA (UP), flaps en configuración de aproximación, tren y compuertas cerradas, Outflow Valve cerrada (Ditching switch ON) y amerizar paralelamente a las olas/oleaje (swell)')
    ],
    'obj': 'QRH / SOPM E195-E2 - Procedimiento de Ditching (Amerizaje Forzoso)',
    'exp': 'El pulsador Ditching sella todas las válvulas bajo la línea de flotación; el contacto se realiza con tren retraído y en la dirección paralela a las crestas del oleaje.',
    'refs': ['QRH E195-E2 Ditching Checklist', 'MOA 8.3']
  },
  {
    'num': 37, 'ans': 'A', 'subj': 'cmd_reporting',
    'stem': '¿Qué plazo reglamentario establece la normativa europea (Reglamento UE 376/2014) para la notificación oficial de sucesos a la Agencia Estatal de Seguridad Ferroviaria y Aérea (AESA)?',
    'opts': [
      ('A', 'Máximo 72 horas desde que se tuvo conocimiento del suceso'),
      ('B', '10 días naturales'),
      ('C', '24 horas en todos los casos'),
      ('D', '30 días de calendario')
    ],
    'obj': 'EASA Reg (UE) 376/2014 - Plazo de Notificación de Sucesos (72 horas)',
    'exp': 'El reglamento europeo establece que todo suceso de notificación obligatoria debe reportarse a la autoridad competente en un plazo improrrogable de 72 horas.',
    'refs': ['Reglamento (UE) 376/2014', 'MOA Capítulo 11']
  },
  {
    'num': 38, 'ans': 'B', 'subj': 'cmd_flight_ground_ops',
    'stem': 'En la operativa de deshielo y antihielo en tierra (De-icing / Anti-icing):',
    'opts': [
      ('A', 'El fluido Tipo I se utiliza para dar protección prolongada de varias horas'),
      ('B', 'El Holdover Time (HOT: Tiempo de Protección) es el tiempo estimado durante el cual el fluido antihielo previene la formación de hielo en las superficies críticas; comienza a computar en el momento en que se inicia la aplicación del fluido antihielo final'),
      ('C', 'El HOT comienza cuando el avión despega'),
      ('D', 'No es necesario aplicar fluido si nieva suavemente')
    ],
    'obj': 'Manual de Operación Invernal - Holdover Time (HOT) y Deshielo',
    'exp': 'El Holdover Time protege la aeronave entre la aplicación y el despegue; el cronómetro de HOT se inicia en el momento exacto en que comienza a pulverizarse el fluido protector final.',
    'refs': ['Manual de Operación Invernal Binter', 'EASA Winter Ops Guidelines']
  },
  {
    'num': 39, 'ans': 'C', 'subj': 'cmd_flight_ground_ops',
    'stem': 'Si durante la espera en rodaje para el despegue se sobrepasa el tiempo de protección (Holdover Time excedido) bajo precipitación activa de nieve o lluvia engelante:',
    'opts': [
      ('A', 'Se puede despegar acelerando más rápido'),
      ('B', 'El comandante puede autorizar el despegue con el radar meteorológico'),
      ('C', 'El despegue está PROHIBIDO; se debe realizar una inspección visual de contaminación de superficies críticas (Pre-Takeoff Contamination Check) o regresar a la plataforma para un nuevo tratamiento completo de deshielo/antihielo'),
      ('D', 'Basta con encender el antihielo de motores')
    ],
    'obj': 'Manual de Operación Invernal - Superación del Holdover Time',
    'exp': 'Con el HOT vencido bajo precipitación, el fluido pierde su eficacia protectora y se prohíbe el despegue sin previa reinspección o nuevo tratamiento en bahía de deshielo.',
    'refs': ['MOA 8.1.4.3 Operación Invernal', 'ICAO Doc 9640']
  },
  {
    'num': 40, 'ans': 'D', 'subj': 'cmd_disruptive_pax',
    'stem': 'En el orden jerárquico de embarque de pasajeros en los vuelos de Binter, ¿cuál es la secuencia reglamentaria establecida en el MOA?',
    'opts': [
      ('A', '1° Pasajeros normales, 2° Familias, 3° UMs, 4° Deportados, 5° PMR'),
      ('B', '1° Deportados, 2° Pasajeros normales, 3° UMs, 4° PMR'),
      ('C', 'Embarque aleatorio sin orden'),
      ('D', '1° Pasajeros con condiciones físicas especiales (PMR, SCP); 2° Pasajeros bajo custodia/deportados (DEPA/DEPU); 3° Menores no acompañados (UM); 4° Familias con niños y ancianos; 5° Resto de pasajeros')
    ],
    'obj': 'MOA 8.2.2 - Orden Reglamentario de Embarque',
    'exp': 'El orden de embarque estandarizado es: 1° PMR/SCP, 2° DEPA/DEPU, 3° UMs, 4° Familias con niños y mayores, 5° Pasaje general.',
    'refs': ['MOA Binter 8.2.2', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 1']
  },
  {
    'num': 41, 'ans': 'A', 'subj': 'cmd_moa_mob',
    'stem': '¿Qué establece el concepto de Cabina Estéril (Sterile Cockpit Rule) en la normativa de operaciones?',
    'opts': [
      ('A', 'Durante las fases críticas de vuelo (rodaje, despegue, ascenso por debajo de 10.000 ft, aproximación y aterrizaje), se prohíbe cualquier conversación, actividad o comunicación que no sea estrictamente esencial para la operación segura de la aeronave'),
      ('B', 'La cabina de pilotaje debe desinfectarse con alcohol tras cada vuelo'),
      ('C', 'Los pilotos no pueden beber agua en vuelo'),
      ('D', 'La tripulación de cabina no puede entrar a la cabina en ningún momento')
    ],
    'obj': 'MOA 8.3 / EASA - Regla de Cabina Estéril (Sterile Cockpit)',
    'exp': 'La cabina estéril elimina distracciones por debajo de 10.000 ft AAL y durante el rodaje para concentrar la atención total en la navegación y control de la aeronave.',
    'refs': ['MOA Binter 8.3 Procedimientos en Vuelo', 'EASA AMC1 CAT.GEN.MPA.100']
  },
  {
    'num': 42, 'ans': 'B', 'subj': 'cmd_emergency',
    'stem': 'En la gestión de una despresurización en altitud con fallo estructural o daño en el fuselaje:',
    'opts': [
      ('A', 'Se debe descender a la máxima velocidad Vmo/Mmo para llegar antes'),
      ('B', 'Se debe descender a velocidad reducida moderada evitando sobrecargas aerodinámicas que pudieran agravar el daño estructural en el fuselaje'),
      ('C', 'Se deben extender los flaps a FL350'),
      ('D', 'Se debe virar continuamente en círculos')
    ],
    'obj': 'QRH / CRM - Descenso de Emergencia con Daño Estructural',
    'exp': 'Si se sospecha daño estructural en el fuselaje o rotura de ventanilla, no se acelera a Vmo sino que se desciende con suavidad para limitar las cargas dinámicas.',
    'refs': ['QRH E195-E2 Emergency Descent', 'MOA 8.3']
  },
  {
    'num': 43, 'ans': 'C', 'subj': 'cmd_performance',
    'stem': '¿Qué es el hidroplaneo dinámico (Dynamic Hydroplaning) y a qué velocidad mínima aproximada se produce en función de la presión de los neumáticos (P en psi)?',
    'opts': [
      ('A', 'Ocurre solo en pistas con hielo seco'),
      ('B', 'Se produce a 20 nudos en cualquier avión'),
      ('C', 'Ocurre cuando una película de agua acumulada separa completamente el neumático del pavimento, calculándose la velocidad mínima como Vp = 9 * raíz cuadrada de la presión de inflado del neumático (psi)'),
      ('D', 'Se produce cuando los frenos se sobrecalientan')
    ],
    'obj': 'Aerodinámica / Performance - Fórmula de Hidroplaneo Dinámico (Vp = 9*sqrt(P))',
    'exp': 'La fórmula de Horne establece que la velocidad de hidroplaneo en despegue o rodaje dinámico equivale aproximadamente a 9 veces la raíz cuadrada de la presión del neumático.',
    'refs': ['FAA AC 91-6A', 'MOA 8.1.4 Performance']
  },
  {
    'num': 44, 'ans': 'D', 'subj': 'cmd_flight_planning',
    'stem': 'En el cálculo de prestaciones de despegue con pista mojada (Wet Runway Takeoff), ¿cuál es la reducción autorizada de la altura sobre el obstáculo en el extremo de pista (Screen Height)?',
    'opts': [
      ('A', 'No se permite ninguna reducción'),
      ('B', 'Se reduce a 0 pies'),
      ('C', 'Se aumenta a 50 pies'),
      ('D', 'La altura sobre el obstáculo en el extremo de la distancia de despegue con pista mojada se reduce de 35 ft (en pista seca) a 15 ft (en pista mojada)')
    ],
    'obj': 'EASA CS-25 / Performance - Screen Height en Pista Mojada (15 ft vs 35 ft)',
    'exp': 'La certificación CS-25 permite reducir la altura de la pantalla (Screen Height) a 15 pies en despegues con pista mojada manteniendo los márgenes de aceleración-parada.',
    'refs': ['CS-25.113', 'AFM E195-E2 Performance']
  },
  {
    'num': 45, 'ans': 'A', 'subj': 'cmd_flight_ground_ops',
    'stem': 'En la operativa con vientos fuertes racheados en aproximación final y toma:',
    'opts': [
      ('A', 'Se añade a la Vref un factor de corrección de velocidad equivalente a la mitad de la componente de viento de cara sostenido más la totalidad de la racha (hasta un incremento máximo estándar de 15-20 KT)'),
      ('B', 'Se vuela 30 nudos por debajo de Vref'),
      ('C', 'Se aterriza con el freno de estacionamiento puesto'),
      ('D', 'Se seleccionan Flaps 0° para cualquier aproximación')
    ],
    'obj': 'SOPM E195-E2 - Corrección de Vref con Viento Racheado (Gust Factor)',
    'exp': 'El incremento de velocidad de aproximación por viento racheado garantiza margen frente a la pérdida por desplome y controlabilidad en cizalladuras de baja cota.',
    'refs': ['SOPM E195-E2 Approach & Landing', 'MOA 8.1.3']
  },
  {
    'num': 46, 'ans': 'B', 'subj': 'cmd_mnemonicos_mando',
    'stem': 'En la gestión de recursos de mando, ¿qué significa la técnica de \"Two-Challenge Rule\" (Regla de las Dos Llamadas)?',
    'opts': [
      ('A', 'Llamar dos veces a la torre de control antes de entrar a pista'),
      ('B', 'Si un piloto no responde tras dos llamadas sucesivas de alerta o desviación por parte del otro piloto, se debe asumir inmediatamente su incapacitación psicofisiológica y tomar el control del avión'),
      ('C', 'Revisar dos veces la lista de chequeo'),
      ('D', 'Pedir dos opiniones al despachador')
    ],
    'obj': 'CRM / Detección de Incapacitación Sutil (Two-Challenge Rule)',
    'exp': 'La regla de las dos llamadas evita la parálisis en cabina ante incapacitaciones sutiles (ictus, hipoxia, bloqueo mental); a la segunda llamada no contestada se toma el mando.',
    'refs': ['EASA CRM Training Manual', 'MOA 8.3 CRM']
  },
  {
    'num': 47, 'ans': 'C', 'subj': 'cmd_reporting',
    'stem': 'En caso de producirse un incidente grave o accidente aeronáutico durante la operación:',
    'opts': [
      ('A', 'La tripulación debe borrar las grabadoras de voz de cabina (CVR)'),
      ('B', 'Los tripulantes deben abandonar el aeropuerto inmediatamente'),
      ('C', 'El comandante (o el operador si aquel está impedido) debe preservar las grabaciones del CVR y FDR desconectando sus interruptores automáticos tras el corte de motores y notificar de inmediato a la Comisión de Investigación de Accidentes (CIAIAC)'),
      ('D', 'Se debe formatear el FMS')
    ],
    'obj': 'MOA Cap. 11 / Investigación de Accidentes - Preservación de CVR/FDR',
    'exp': 'La ley exige la custodia y preservación inmediata de los registros de vuelo (CVR y FDR) desconectando su alimentación para evitar sobreescritura.',
    'refs': ['MOA Capítulo 11', 'Reglamento UE 996/2010']
  },
  {
    'num': 48, 'ans': 'D', 'subj': 'cmd_flight_planning',
    'stem': '¿Qué información proporciona la ficha LIDO EOSID (Engine Out Standard Instrument Departure)?',
    'opts': [
      ('A', 'La ruta de llegada visual nocturna'),
      ('B', 'El horario del restaurante del aeropuerto'),
      ('C', 'El procedimiento de vuelo en espera con ambos motores'),
      ('D', 'La trayectoria de escape y perfil de ascenso monomotor específico diseñado para garantizar el franqueamiento reglamentario de obstáculos en caso de fallo de motor durante el despegue')
    ],
    'obj': 'Cartografía LIDO / SOPM - Procedimiento EOSID Monomotor',
    'exp': 'La EOSID define la derrota exacta a seguir tras fallo de motor en despegue cuando la SID normal no garantiza márgenes de libramiento de obstáculos con N-1.',
    'refs': ['LIDO RouteManual EOSID Charts', 'SOPM E195-E2']
  },
  {
    'num': 49, 'ans': 'A', 'subj': 'cmd_moa_mob',
    'stem': '¿Cuál es el período máximo admisible entre revisiones periódicas de la cualificación de tipo y verificación de competencia del operador (OPC / LPC) para un Comandante?',
    'opts': [
      ('A', 'Verificación de competencia (LPC/OPC) cada 6 meses en simulador de vuelo certificado de nivel D'),
      ('B', 'Cada 2 años'),
      ('C', 'Cada 5 años'),
      ('D', 'Una sola vez al obtener la habilitación de tipo')
    ],
    'obj': 'EASA ORO.FC.230 / MOA Cap. 5 - Verificación Periódica de Competencia (OPC / LPC)',
    'exp': 'El entrenamiento y verificación de competencia en simulador (LPC y OPC) se realiza semestralmente (cada 6 meses) conforme a la normativa EASA Part-ORO.',
    'refs': ['MOA Capítulo 5 Cualificaciones', 'EASA ORO.FC.230']
  },
  {
    'num': 50, 'ans': 'B', 'subj': 'cmd_mnemonicos_mando',
    'stem': 'En la toma de decisiones críticas bajo presión, ¿qué actitud peligrosa (Hazardous Attitude) se contrarresta con el antídoto: \"Sigue los procedimientos y listas de chequeo, no te precipites\"?',
    'opts': [
      ('A', 'Macho (\"Puedo hacerlo\")'),
      ('B', 'Impulsividad (\"Haz algo rápido\")'),
      ('C', 'Invulnerabilidad (\"A mí no me va a pasar\")'),
      ('D', 'Resignación (\"¿Qué puedo hacer yo?\")')
    ],
    'obj': 'CRM / Factores Humanos - Actitudes Peligrosas y Antídotos',
    'exp': 'El antídoto contra la Impulsividad es calmarse, reflexionar metódicamente y seguir las listas de chequeo y procedimientos normalizados sin precipitación.',
    'refs': ['FAA / EASA Human Factors Training Manual', 'MOA 8.3 CRM']
  }
]

final_data_lote5 = []
for q in raw_lote5:
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

print(f'[SUCCESS] {len(final_data_lote5)} reactivos de Lote 5 escritos en {out_file}')
