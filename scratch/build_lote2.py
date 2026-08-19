import json

raw_q_51_100 = [
  {
    'num': 51, 'ans': 'A', 'subj': 'cmd_flight_planning',
    'stem': 'Para la selección de un aeródromo alternativo en ruta o de destino cuya aproximación principal sea en circuito (Circling), ¿cuáles son los mínimos de planificación?',
    'opts': [
      ('A', 'Mínimos de Circling + 200 ft de techo / 1000 m de visibilidad (o MDA/H + 400 ft / 1500 m en plan básico)'),
      ('B', 'Mínimos de No Precisión'),
      ('C', 'Mínimos de CAT I'),
      ('D', 'Mínimos de Circuito puros')
    ],
    'obj': 'MOA 8.1.7.2 - Mínimos de Planificación para Circling',
    'exp': 'Para alternativos con aproximación en circuito (Circling) se aplican los incrementos de planificación reglamentarios sobre los mínimos de circuito publicados.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P51)', 'MOA 8.1.7.2.5 Tabla 1A']
  },
  {
    'num': 52, 'ans': 'D', 'subj': 'cmd_emergency',
    'stem': 'Si realizamos una aproximación frustrada (Go Around) por debajo de los mínimos de aproximación:',
    'opts': [
      ('A', 'Se debe notificar a ATC el procedimiento que se pretende realizar'),
      ('B', 'La aceleración se realizará a 1000 ft sobre la elevación del aeropuerto'),
      ('C', 'Realizaremos el procedimiento de EOSID para garantizar el franqueamiento de obstáculos si procede'),
      ('D', 'Todas son correctas')
    ],
    'obj': 'SOPM / MOA - Procedimiento de Frustrada por Debajo de Mínimos',
    'exp': 'En frustrada por debajo de mínimos se ejecuta la maniobra estándar de go-around, se notifica a ATC, se acelera a 1000 ft AAL y se sigue la trayectoria de escape o EOSID si hay fallo de motor.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P52)', 'MOA 8.1.4', 'SOPM E195-E2']
  },
  {
    'num': 53, 'ans': 'B', 'subj': 'cmd_flight_planning',
    'stem': 'La información meteorológica que es proporcionada en cada salto (METAR y TAFOR):',
    'opts': [
      ('A', 'Tiene validez para ese salto indefinidamente'),
      ('B', 'Tiene una validez no superior a una hora desde su publicación'),
      ('C', 'Nos vale cualquier suministrador de información y tiene validez no superior a una hora de su publicación'),
      ('D', 'Nos vale cualquier suministrador de información y tiene validez para ese salto')
    ],
    'obj': 'MOA 8.1.3 - Validez de Información Meteorológica Operacional',
    'exp': 'La información meteorológica de despacho y vuelo debe provenir de fuentes oficiales autorizadas y tiene una validez temporal no superior a una hora desde su emisión.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P53)', 'MOA 8.1.3 Meteorología']
  },
  {
    'num': 54, 'ans': 'C', 'subj': 'cmd_disruptive_pax',
    'stem': 'Durante el transporte de Pasajeros con Condiciones Especiales (SCP), ¿cuál es el procedimiento de desembarque?',
    'opts': [
      ('A', 'Desembarcan todos en primer lugar'),
      ('B', 'En caso de desvío a un alternativo deberán desembarcar en primer lugar'),
      ('C', 'Desembarcan por norma general en último lugar, a excepción de los UMs que podrían hacerlo en primer lugar'),
      ('D', 'Su desembarque es a elección del pasajero o de su acompañante')
    ],
    'obj': 'MOA 8.2.2.5 - Orden de Desembarque de Pasajeros SCP',
    'exp': 'Por motivos de seguridad y fluidez, los pasajeros SCP desembarcan al final tras el pasaje general, salvo los menores no acompañados (UMs) que pueden desembarcar en primer lugar custodiados por el personal de tierra.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P54)', 'MOA 8.2.2 Pasajeros Especiales']
  },
  {
    'num': 55, 'ans': 'A', 'subj': 'cmd_disruptive_pax',
    'stem': 'La limitación general de Pasajeros con Condiciones Especiales (SCP) a bordo de un vuelo será de:',
    'opts': [
      ('A', '18 pasajeros, pudiéndose aumentar esta cifra si hay el mismo número de pasajeros capacitados (ABPs) a bordo para prestarles ayuda'),
      ('B', '18 pasajeros debido a las limitaciones propias de las vías de evacuación'),
      ('C', '18 pasajeros, y en caso de llevar un STCR se reduce a 10'),
      ('D', '18 pasajeros si el 50% viaja con acompañante, y en caso contrario 10')
    ],
    'obj': 'MOA 8.2.2.5 - Limitación Máxima de Pasajeros SCP',
    'exp': 'El número máximo de SCP es de 18, pudiendo incrementarse si existen a bordo pasajeros válidos y capacitados (ABPs) en número suficiente para asistirlos.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P55)', 'MOA 8.2.2.5']
  },
  {
    'num': 56, 'ans': 'B', 'subj': 'cmd_flight_ground_ops',
    'stem': 'Para el transporte de un equipaje extraviado en tránsito rápido (Equipaje RUSH):',
    'opts': [
      ('A', 'Debe ir acompañado de la documentación correspondiente únicamente'),
      ('B', 'Debe ir acompañado de la documentación correspondiente y ha debido superar los correspondientes controles e inspecciones de seguridad'),
      ('C', 'Se podrá prescindir del chequeo de seguridad si no abandonó la zona restringida'),
      ('D', 'Debe ir acompañado de una fotocopia del original sellada por el handling')
    ],
    'obj': 'MOA Cap. 10 Security - Requisitos de Equipaje RUSH',
    'exp': 'Todo equipaje no acompañado que vuele en régimen RUSH debe portar su etiqueta y documentación reglamentaria y haber sido sometido a inspección de seguridad del 100% de acuerdo con el Programa Nacional de Seguridad.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P56)', 'MOA Capítulo 10 Security']
  },
  {
    'num': 57, 'ans': 'D', 'subj': 'cmd_moa_mob',
    'stem': '¿En qué capítulo del Manual de Operaciones Parte A podemos encontrar la categoría mínima requerida del servicio de rescate y extinción de incendios (RFFS)?',
    'opts': [
      ('A', 'En el Capítulo 7 del MOA'),
      ('B', 'En el Capítulo 6 del MOA'),
      ('C', 'En el Capítulo 9 del MOA'),
      ('D', 'En el Capítulo 8 del MOA')
    ],
    'obj': 'MOA Estructura - Categorías RFFS en Capítulo 8',
    'exp': 'El Capítulo 8 del MOA (Procedimientos Operativos) contiene las tablas de categoría RFFS mínima de aeródromo por flota y las condiciones de degradación por NOTAM.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P57)', 'MOA Capítulo 8']
  },
  {
    'num': 58, 'ans': 'C', 'subj': 'cmd_flight_planning',
    'stem': '¿Cuál es la finalidad operativa de utilizar una DDA (\"Derived Decision Altitude\") en aproximaciones de No Precisión con técnica CDFA?',
    'opts': [
      ('A', 'No es aplicable en la operativa de Binter'),
      ('B', 'Se utiliza para iniciar una aproximación por debajo de mínimos'),
      ('C', 'Se añade un margen sobre la MDA/H para proteger al avión del hundimiento transitorio en caso de frustrada y evitar descender por debajo de la MDA'),
      ('D', 'Son los mínimos que aparecen en la carta adaptados por LIDO')
    ],
    'obj': 'MOA 8.1.3 / LIDO - Derived Decision Altitude (DDA)',
    'exp': 'En aproximaciones CDFA de no precisión se incrementa la MDA publicada (normalmente +50 ft) convirtiéndola en DDA, garantizando que el avión no infrinja la MDA durante la pérdida de altura transitoria al iniciar el motor y al aire.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P58)', 'MOA 8.1.3.7 CDFA & DDA']
  },
  {
    'num': 59, 'ans': 'D', 'subj': 'cmd_flight_ground_ops',
    'stem': 'En relación con el uso de Dispositivos Electrónicos Portátiles (PEDs) a bordo de la aeronave:',
    'opts': [
      ('A', 'No podrán ser utilizados en condiciones de baja visibilidad (LVO), durante el repostaje, turbulencia severa o emergencia'),
      ('B', 'Para usarlos en rodaje, despegue y aterrizaje deben pesar menos de 1 kg y manejarse con una sola mano'),
      ('C', 'El comandante tiene autoridad para restringir su uso en cualquier circunstancia'),
      ('D', 'Todas son correctas')
    ],
    'obj': 'MOA 8.3 / EASA - Política de Uso de Dispositivos PED',
    'exp': 'Los PEDs están restringidos en LVO, repostaje y emergencias; los pequeños (< 1 kg) pueden usarse sujetos con una mano en fases críticas, y el comandante puede prohibir su uso ante cualquier sospecha de interferencia.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P59)', 'MOA 8.3.1 Uso de PEDs']
  },
  {
    'num': 60, 'ans': 'A', 'subj': 'cmd_moa_mob',
    'stem': '¿Cuáles son las limitaciones reglamentarias sobre el consumo de alcohol para los miembros de la tripulación?',
    'opts': [
      ('A', 'Prohibido durante las 12h anteriores a la hora de presentación (con recomendación de no consumir en las 24h previas), con tasa de alcohol 0,0 g/l'),
      ('B', 'Durante las 24h anteriores a la presentación (recomendación 48h)'),
      ('C', 'Permitido hasta 0,25 g/l de alcohol en sangre'),
      ('D', 'Permitido hasta 0,15 g/l de alcohol en sangre')
    ],
    'obj': 'MOA Cap. 6 / EASA CAT.GEN.MPA.100 - Restricciones de Alcohol',
    'exp': 'El MOA Cap. 6 prohíbe taxativamente el consumo de bebidas alcohólicas dentro de las 12 horas previas a la presentación (recomendando 24 horas) y exige tolerancia cero (0,0 g/l en sangre).',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P60)', 'MOA Capítulo 6 Salud']
  },
  {
    'num': 61, 'ans': 'C', 'subj': 'cmd_performance',
    'stem': 'En la operativa de Binter y los cálculos de rendimiento de aterrizaje (ePerf / Performance):',
    'opts': [
      ('A', 'No se pueden utilizar las reversas en pista seca, pero sí en pista contaminada'),
      ('B', 'Nunca se pueden usar las reversas para los cálculos de aterrizaje'),
      ('C', 'Siempre se calcula la distancia de aterrizaje considerando el uso de reversas según el modelo de performance aprobado'),
      ('D', 'Las reversas solo se usan con viento en cola o pendiente negativa')
    ],
    'obj': 'Performance de Aterrizaje - Crédito de Reversas',
    'exp': 'En el cálculo de performance operacional de aterrizaje de Binter se toma como premisa estándar de cálculo el uso operativo de las reversas.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P61)', 'MOA 8.1.4 Performance', 'Manual ePerf']
  },
  {
    'num': 62, 'ans': 'B', 'subj': 'cmd_moa_mob',
    'stem': 'Los miembros de la tripulación no deberán realizar inmersiones de submarinismo con botella a profundidades superiores:',
    'opts': [
      ('A', 'A 22 metros en las 48h antes de iniciar un servicio de vuelo'),
      ('B', 'A 22 metros en las 24h antes de iniciar un servicio de vuelo (o inmersiones con descompresión)'),
      ('C', 'A 12 metros en las 48h antes de iniciar un servicio de vuelo'),
      ('D', 'A 12 metros en las 24h antes de iniciar un servicio de vuelo')
    ],
    'obj': 'MOA Cap. 6 - Submarinismo y Vuelo (Enfermedad Descompresiva)',
    'exp': 'Para prevenir el aeroembolismo y la enfermedad por descompresión en vuelo presurizado, el MOA Cap. 6 exige dejar transcurrir al menos 24 horas tras inmersiones con botella a profundidades superiores a 12-22 metros o con paradas de descompresión.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P62)', 'MOA Capítulo 6 Precauciones de Salud']
  },
  {
    'num': 63, 'ans': 'A', 'subj': 'cmd_flight_planning',
    'stem': '¿Cuál es el peso estándar de un bebé (\"Infant\" menor de 2 años) en la Hoja de Carga y Centrado cuando no ocupa asiento propio?',
    'opts': [
      ('A', '0 Kg (su masa se considera absorbida en el peso estándar del adulto que lo transporta en brazos)'),
      ('B', '10 Kg'),
      ('C', '15 Kg'),
      ('D', '20 Kg')
    ],
    'obj': 'MOA 8.1.8 - Masa Estándar de Bebés (Infants)',
    'exp': 'Los menores de 2 años que viajen en brazos de un adulto no computan peso adicional (0 kg) en la hoja de carga. Si el bebé ocupa un asiento independiente propio, computa como niño (35 kg).',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P63)', 'MOA 8.1.8 Masa y Centrado']
  },
  {
    'num': 64, 'ans': 'A', 'subj': 'cmd_flight_planning',
    'stem': '¿Cuál es el peso estándar reglamentario asignado a cada Tripulante de Cabina de Pasajeros (TCP) según el MOA 8.1.8?',
    'opts': [
      ('A', '75 kilos'),
      ('B', '88 kilos'),
      ('C', '85 kilos'),
      ('D', '70 kilos')
    ],
    'obj': 'MOA 8.1.8 - Pesos Estándar Tripulación de Cabina',
    'exp': 'El peso reglamentario asignado en la hoja de carga para cada TCP es de 75 kg (incluye su equipaje de mano de servicio).',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P64)', 'MOA 8.1.8 Tablas de Pesos']
  },
  {
    'num': 65, 'ans': 'A', 'subj': 'cmd_flight_planning',
    'stem': 'De acuerdo con los procedimientos de salida instrumental y protección de obstáculos, ¿cuál es la altitud mínima para iniciar un viraje tras el despegue?',
    'opts': [
      ('A', '400 ft sobre la elevación del aeródromo, no considerándose viraje los cambios de rumbo de 15° o inferiores'),
      ('B', '500 ft no considerando viraje aquellos cambios de rumbo de 15° o inferiores'),
      ('C', '400 ft en cualquier caso'),
      ('D', '500 ft en cualquier caso')
    ],
    'obj': 'PANS-OPS / MOA 8.1.4 - Altitud Mínima de Viraje en Salida (400 ft)',
    'exp': 'No se iniciará ningún viraje de más de 15° antes de alcanzar 400 ft sobre la elevación de la pista (DERA), salvo procedimiento especial publicado o autorización ATC.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P65)', 'MOA 8.1.4 Procedimientos de Salida']
  },
  {
    'num': 66, 'ans': 'D', 'subj': 'cmd_reporting',
    'stem': '¿En qué situaciones es de carácter obligatorio que el comandante realice una notificación directa al Centro de Control de Operaciones (CCO)?',
    'opts': [
      ('A', 'Finalización del servicio, cambio de aeronave o escala larga con desembarque'),
      ('B', 'Inspección de rampa de autoridades aeronáuticas (SAFA / SACA / AESA)'),
      ('C', 'Incidentes con Mercancías Peligrosas o pasajeros conflictivos (Disruptive Pax)'),
      ('D', 'Todas son correctas')
    ],
    'obj': 'MOA 2 & 8 - Notificaciones Obligatorias del Comandante al CCO',
    'exp': 'El comandante debe comunicar de inmediato al CCO cualquier inspección de rampa SAFA/SACA, incidentes graves con pasaje/MMPP o cambios en la rotación y escalas operativas.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P66)', 'MOA Capítulo 2 Control de Operaciones']
  },
  {
    'num': 67, 'ans': 'B', 'subj': 'cmd_flight_planning',
    'stem': '¿Qué implicaciones y obligaciones operacionales conlleva la declaración a ATC de la condición de \"MINIMUM FUEL\" (Combustible Mínimo)?',
    'opts': [
      ('A', 'Informa a ATC de que cualquier cambio sobre la autorización recibida pudiera ocasionar el aterrizaje por debajo de la reserva final únicamente'),
      ('B', 'Informa de que cualquier cambio sobre la autorización ocasionaría aterrizar con menos de la reserva final; NO otorga prioridad pero obliga a ATC a informar de demoras adicionales y coordinar con otras dependencias'),
      ('C', 'Otorga prioridad de aterrizaje inmediata frente a otros tráficos'),
      ('D', 'Todas son correctas')
    ],
    'obj': 'SERA.4005 / MOA 8.1.7 - Declaración de MINIMUM FUEL',
    'exp': 'MINIMUM FUEL advierte a ATC de la situación justa de combustible sin otorgar prioridad, requiriendo que ATC informe de cualquier retraso previsto y transfiera la información a los sectores siguientes.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P67)', 'MOA 8.1.7.5 Gestión de Combustible en Vuelo']
  },
  {
    'num': 68, 'ans': 'C', 'subj': 'cmd_emergency',
    'stem': '¿Qué consecuencia inmediata tiene la radiotransmisión de la llamada de socorro \"MAYDAY, MAYDAY, MAYDAY FUEL\"?',
    'opts': [
      ('A', 'Informa a ATC de un posible retraso sin prioridad'),
      ('B', 'Coordina con control una espera de 15 minutos en el fijo de aproximación'),
      ('C', 'Declara estado oficial de EMERGENCIA y otorga prioridad absoluta de aproximación y aterrizaje para evitar aterrizar con menos de la Reserva Final'),
      ('D', 'Todas son correctas')
    ],
    'obj': 'SERA.4005 / MOA 8.1.7 - Declaración de MAYDAY FUEL',
    'exp': 'MAYDAY FUEL es la declaración explícita de emergencia que otorga prioridad operacional inmediata cuando el combustible calculado al aterrizar desciende por debajo de la Reserva Final obligatoria (30 min).',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P68)', 'MOA 8.1.7.5', 'SERA.4005']
  },
  {
    'num': 69, 'ans': 'D', 'subj': 'cmd_emergency',
    'stem': 'Ante la activación de un aviso de resolución de tráfico TCAS RA (Resolution Advisory):',
    'opts': [
      ('A', 'Cualquier maniobra en sentido contrario al aviso es extremadamente peligrosa y está terminantemente prohibida'),
      ('B', 'Las maniobras evasivas deben realizarse volando manualmente (piloto automático desconectado) ajustando el régimen al área verde'),
      ('C', 'Prevalecen las órdenes del TCAS sobre cualquier instrucción contradictoria de ATC hasta completar el aviso'),
      ('D', 'Todas son correctas')
    ],
    'obj': 'SOPM / MOA - Protocolo de Respuesta ante TCAS RA',
    'exp': 'Un RA exige desconectar el piloto automático, seguir inmediatamente la guía visual del VSI en verde, no obedecer instrucciones contrarias de ATC y notificar "TCAS RA" a la frecuencia tan pronto sea posible.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P69)', 'SOPM E195-E2 TCAS Procedures', 'MOA 8.3']
  },
  {
    'num': 70, 'ans': 'A', 'subj': 'cmd_flight_planning',
    'stem': '¿Cómo se define reglamentariamente la Altitud Mínima de Sector (Minimum Sector Altitude - MSA)?',
    'opts': [
      ('A', 'Altitud más baja utilizable en emergencias que garantiza un margen vertical mínimo de 1000 ft sobre todos los obstáculos dentro de un sector circular de 25 NM centrado en una radioayuda'),
      ('B', 'Altitud más baja a lo largo de una aerovía que garantiza la recepción de radioayudas'),
      ('C', 'Altitud mínima fuera de ruta con margen de 2000 ft en zonas montañosas'),
      ('D', 'Altitud que cubre la aproximación final hasta el umbral de pista')
    ],
    'obj': 'Navegación / Cartografía - Definición de MSA',
    'exp': 'La MSA proporciona 1000 ft de franqueamiento de obstáculos dentro de un radio de 25 NM alrededor de la radioayuda o punto de referencia en el que se basa el procedimiento.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P70)', 'MOA 8.1.3 Navegación']
  },
  {
    'num': 71, 'ans': 'A', 'subj': 'cmd_flight_planning',
    'stem': 'Para seleccionar un aeródromo alternativo en ruta o destino cuya aproximación instrumental principal sea un ILS CAT I, ¿cuáles son los mínimos de planificación aplicables?',
    'opts': [
      ('A', 'Mínimos de CAT I (visibilidad/RVR y techo requeridos para CAT I)'),
      ('B', 'Mínimos de No Precisión'),
      ('C', 'Mínimos de No Precisión + 200 ft / 1000 m'),
      ('D', 'Mínimos de Aproximación en Circuito')
    ],
    'obj': 'MOA 8.1.7.2 - Mínimos de Planificación para Alternativos con ILS',
    'exp': 'Para una aproximación de precisión CAT I en el alternativo, los mínimos de planificación requeridos equivalen a los mínimos de aproximación de precisión de CAT I.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P71)', 'MOA 8.1.7.2.5']
  },
  {
    'num': 72, 'ans': 'B', 'subj': 'cmd_flight_planning',
    'stem': '¿Cuál es la tolerancia máxima aceptable en grados de derrota entre la cartografía LIDO y las bases de datos de navegación FMS por variaciones de declinación magnética?',
    'opts': [
      ('A', '2 grados'),
      ('B', '3 grados'),
      ('C', '4 grados'),
      ('D', 'No hay tolerancia')
    ],
    'obj': 'Cartografía LIDO / FMS - Tolerancia de Declinación Magnética (+/- 3°)',
    'exp': 'Se acepta una discrepancia máxima de hasta 3 grados entre las derrotas de la cartografía LIDO y las codificadas en la base de datos de navegación del FMS debido a modelos de declinación magnética.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P72)', 'LIDO RouteManual General']
  },
  {
    'num': 73, 'ans': 'B', 'subj': 'cmd_flight_planning',
    'stem': 'El piloto no puede continuar una aproximación por debajo de la MDA/H a no ser que establezca referencias visuales con la pista. ¿Cuál de las siguientes afirmaciones es la correcta?',
    'opts': [
      ('A', 'Solo el umbral y sus luces son válidos'),
      ('B', 'Todas son referencias visuales válidas: el umbral/marcas/luces, la zona de toma de contacto/marcas, o las luces de borde de pista'),
      ('C', 'Las luces de aproximación sin ver la pista nunca permiten continuar'),
      ('D', 'Solo las marcas de toma de contacto permiten aterrizar')
    ],
    'obj': 'EASA Part-CAT / MOA 8.1.3 - Referencias Visuales Requeridas para Descenso bajo MDA/DA',
    'exp': 'Son elementos de referencia visual válidos: elementos del sistema de luces de aproximación, umbral y sus marcas/luces, zona de toma de contacto y marcas/luces, o luces de borde de pista.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P73)', 'MOA 8.1.3.8']
  },
  {
    'num': 74, 'ans': 'D', 'subj': 'cmd_air_law',
    'stem': 'De acuerdo con las reglas de vuelo visual (SERA.5001 / MOA Cap. 12), ¿cuáles son los mínimos de visibilidad y distancia a las nubes para vuelos VFR en espacio aéreo no controlado por debajo de 10.000 ft (o 3000 ft AMSL)?',
    'opts': [
      ('A', '5 km de visibilidad y libres de nubes'),
      ('B', '8 km de visibilidad y libres de nubes con superficie a la vista'),
      ('C', '5 km de visibilidad, 1500 m horizontal y 1000 ft vertical'),
      ('D', '8 km de visibilidad (o 5 km < 10.000 ft AMSL), 1500 m horizontal y 1000 ft vertical de las nubes')
    ],
    'obj': 'SERA.5001 / MOA Cap. 12 - Mínimos VMC de Visibilidad y Nubes',
    'exp': 'En espacio aéreo controlado y no controlado, los mínimos VMC estándar por debajo de FL100 exigen 5 km (u 8 km a/por encima de FL100) y separación de 1500 m en horizontal y 1000 ft en vertical de las nubes.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P74)', 'MOA Capítulo 12 Reglas del Aire', 'SERA.5001']
  },
  {
    'num': 75, 'ans': 'D', 'subj': 'cmd_flight_planning',
    'stem': 'En la codificación de informes meteorológicos aeronáuticos (METAR / TAF), ¿a partir de qué cobertura nubosa se considera formalmente la existencia de \"Techo de Nubes\" (Ceiling)?',
    'opts': [
      ('A', 'A partir de cobertura FEW (1-2 octas)'),
      ('B', 'A partir de cobertura SCT (3-4 octas)'),
      ('C', 'Únicamente con cobertura OVC (8 octas)'),
      ('D', 'A partir de cobertura BKN (5-7 octas) u OVC (8 octas) que cubra más de la mitad del cielo')
    ],
    'obj': 'Meteorología Aeronáutica - Definición de Techo de Nubes (BKN / OVC)',
    'exp': 'Se define techo de nubes como la altura sobre la superficie de la base de la capa inferior de nubes que cubra más de la mitad del cielo (cobertura Broken de 5 a 7 octas u Overcast de 8 octas).',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P75)', 'MOA 8.1.3 Meteorología']
  },
  {
    'num': 76, 'ans': 'D', 'subj': 'cmd_dispatch_mel',
    'stem': '¿Cuáles son los componentes y secciones que integran el Libro Técnico de Vuelo de la Aeronave (Aircraft Technical Log - ATL)?',
    'opts': [
      ('A', 'Parte técnico de vuelo (hojas de vuelo y consumos)'),
      ('B', 'Informe de estado y mantenimiento de la aeronave'),
      ('C', 'Lista de defectos diferidos y acciones de mantenimiento realizadas'),
      ('D', 'Todas son correctas')
    ],
    'obj': 'MOA 8.1.1 / EASA Part-M - Estructura y Contenido del ATL',
    'exp': 'El ATL contiene los registros de vuelos, tiempos, consumos, firma de CRS, estado de diferidos MEL y registros de mantenimiento de línea de la aeronave.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P76)', 'MOA 8.1.1 Acceptance of Aircraft']
  },
  {
    'num': 77, 'ans': 'B', 'subj': 'cmd_moa_mob',
    'stem': 'En situaciones de limitación de carga útil (Payload), ¿cuál es el orden reglamentario de prioridad de embarque de pasaje, carga, equipaje y correo?',
    'opts': [
      ('A', 'Pasajeros confirmados, HUM, Carga general, Equipaje de pasajeros confirmados'),
      ('B', 'Pasajeros con plaza confirmada, Restos Humanos (HUM), Equipaje de pasajeros confirmados, Carga general'),
      ('C', 'Pasajeros confirmados, Equipaje de pasajeros confirmados, HUM, Carga general'),
      ('D', 'Pasajeros confirmados, Equipaje confirmados, Carga general, HUM')
    ],
    'obj': 'MOA Cap. 8 - Prioridades de Embarque y Carga',
    'exp': 'El orden de prioridad operacional establece: 1° Pasajeros confirmados, 2° Restos humanos no incinerados (HUM), 3° Equipaje facturado de pasajeros confirmados, 4° Correo y carga comercial.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P77)', 'MOA 8.2 Prioridad de Embarque']
  },
  {
    'num': 78, 'ans': 'D', 'subj': 'cmd_reporting',
    'stem': '¿Cuáles de los siguientes sucesos operacionales conllevan la emisión obligatoria de un parte de seguridad de vuelo (Air Safety Report - ASR)?',
    'opts': [
      ('A', 'Cualquier aborto de despegue (RTO)'),
      ('B', 'Continuación de una aproximación no estabilizada en contra de los criterios de aproximación estabilizada'),
      ('C', 'Desvío del nivel de vuelo asignado o vuelo con reglaje altimétrico incorrecto'),
      ('D', 'Todas son correctas')
    ],
    'obj': 'MOA Cap. 11 - Notificación Obligatoria de Sucesos de Seguridad (ASR)',
    'exp': 'El MOA Cap. 11 y el reglamento de sucesos exigen reportar formalmente mediante ASR cualquier RTO, aproximación desestabilizada no frustrada, o desvíos significativos de altitud o navegación.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P78)', 'MOA Capítulo 11 Safety Reporting']
  },
  {
    'num': 79, 'ans': 'A', 'subj': 'cmd_disruptive_pax',
    'stem': '¿Quién se considera reglamentariamente un acompañante válido para un Pasajero con Condiciones Especiales (SCP)?',
    'opts': [
      ('A', 'Persona mayor de 16 años que viaje junto al SCP, que no sea a su vez SCP y no tenga responsabilidades que le impidan prestarle asistencia completa'),
      ('B', 'Un animal de servicio para un ciego, sordo o discapacitado físico que viaje solo'),
      ('C', 'A y B son correctas'),
      ('D', 'Cualquier pasajero asignado a las filas de salidas de emergencia')
    ],
    'obj': 'MOA 8.2.2.5 - Requisitos de Acompañante Válido de SCP',
    'exp': 'Un acompañante válido debe ser una persona autónoma de al menos 16 años, físicamente capacitada para prestar auxilio en caso de evacuación y libre de otras cargas.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P79)', 'MOA 8.2.2.5']
  },
  {
    'num': 80, 'ans': 'D', 'subj': 'cmd_disruptive_pax',
    'stem': '¿En cuáles de los siguientes casos un pasajero NO puede ser aceptado para el transporte aéreo a bordo?',
    'opts': [
      ('A', 'Personas que padezcan enfermedades infecciosas o altamente contagiosas'),
      ('B', 'Personas que requieran aparatos médicos neumáticos o eléctricos no autorizados a bordo'),
      ('C', 'Personas que requieran inyecciones en vuelo y no puedan autoadministrárselas ni viajen con acompañante sanitario'),
      ('D', 'Todas son correctas')
    ],
    'obj': 'MOA 8.2.2 - Denegación de Embarque por Causas Médicas',
    'exp': 'La aerolínea denegará el embarque a pasajeros con enfermedades infectocontagiosas activas, dispositivos médicos no certificados para vuelo o necesidad de medicación parenteral no asistida.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P80)', 'MOA 8.2.2 Pasajeros Inadmisibles por Salud']
  },
  {
    'num': 81, 'ans': 'B', 'subj': 'cmd_disruptive_pax',
    'stem': 'La cantidad máxima de bebés a bordo está establecida en 7 (ATR-72) y 12 (E195-E2). ¿Puede incrementarse legalmente este número?',
    'opts': [
      ('A', 'En ningún caso'),
      ('B', 'Sí, siempre que se verifique la disponibilidad de máscaras de oxígeno suplementarias, cinturones de bucle adicionales y chalecos salvavidas infantiles para el total de bebés'),
      ('C', 'Sí, siempre que se disponga únicamente de chalecos salvavidas adicionales'),
      ('D', 'Solo en vuelos internacionales con autorización de la Dirección de Operaciones')
    ],
    'obj': 'MOA 8.2.2 - Aumento del Cupo de Bebés a Bordo',
    'exp': 'El número de bebés puede incrementarse siempre que la dotación de equipos de emergencia del avión garantice chaleco salvavidas de bebé, cinturón suplementario y toma de oxígeno en el PSU para cada infante.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P81)', 'MOA 8.2.2.5']
  },
  {
    'num': 82, 'ans': 'B', 'subj': 'cmd_disruptive_pax',
    'stem': 'En el transporte de grupos organizados de menores (entre 5 y 11 años cumplidos), ¿cuál es la ratio mínima obligatoria de adultos acompañantes?',
    'opts': [
      ('A', 'Al menos 1 adulto por cada 9 niños hasta un máximo de 59 niños'),
      ('B', 'Al menos 1 adulto (mayor de edad) por cada 10 niños hasta un máximo de 60 niños'),
      ('C', 'Al menos 1 adulto por cada 8 niños hasta un máximo de 49 niños'),
      ('D', 'No existe ninguna limitación específica')
    ],
    'obj': 'MOA 8.2.2.5 - Ratios de Acompañantes en Grupos de Menores',
    'exp': 'Para grupos de menores de 5 a 11 años se exige un mínimo de 1 acompañante mayor de edad por cada 10 niños, con un límite máximo de 60 menores por aeronave.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P82)', 'MOA 8.2.2.5 Grupos de Menores']
  },
  {
    'num': 83, 'ans': 'A', 'subj': 'cmd_disruptive_pax',
    'stem': '¿Qué tipologías de pasajeros con movilidad reducida se clasifican como PMR AMBULATORIOS?',
    'opts': [
      ('A', 'Pasajeros BLND (invidentes), DEAF (sordos), WCHR (silla para rampas) y personas de avanzada edad u obesas con movilidad reducida que pueden desplazarse por la cabina'),
      ('B', 'Pasajeros BLND, DEAF y WCHS'),
      ('C', 'Pasajeros BLND, DEAF y WCHC'),
      ('D', 'Pasajeros WCHR, WCHS y WCHC conjuntamente')
    ],
    'obj': 'MOA 8.2.2 - Clasificación de PMR Ambulatorios',
    'exp': 'Son ambulatorios aquellos capaces de subir/bajar escalones o caminar hasta su asiento sin ayuda (WCHR, invidentes BLND, sordos DEAF).',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P83)', 'MOA 8.2.2.5 PMR']
  },
  {
    'num': 84, 'ans': 'A', 'subj': 'cmd_disruptive_pax',
    'stem': '¿Cuál es el código IATA para un pasajero que puede subir y bajar escaleras y caminar por la cabina, pero precisa silla de ruedas para largas distancias en terminal y rampa?',
    'opts': [
      ('A', 'PMR WCHR (Wheelchair Ramp)'),
      ('B', 'PMR WCHS (Wheelchair Steps)'),
      ('C', 'PMR WCHC (Wheelchair Cabin)'),
      ('D', 'PMR WCLB (Wheelchair Lithium Battery)')
    ],
    'obj': 'Códigos IATA PMR - WCHR vs WCHS vs WCHC',
    'exp': 'WCHR (Wheelchair Ramp) corresponde a quien solo requiere asistencia para cubrir distancias en el aeropuerto pero es autónomo para subir escaleras y sentarse en el avión.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P84)', 'MOA 8.2.2.5']
  },
  {
    'num': 85, 'ans': 'B', 'subj': 'cmd_disruptive_pax',
    'stem': '¿Cuáles son las limitaciones cuantitativas máximas de pasajeros PMR por vuelo en la flota?',
    'opts': [
      ('A', 'Máximo 15 PMR, de los cuales como máximo 7 no ambulatorios'),
      ('B', 'Máximo 15 PMR, de los cuales como máximo 9 no ambulatorios (WCHC / WCHS)'),
      ('C', 'Máximo 10 PMR, de los cuales como máximo 7 no ambulatorios'),
      ('D', 'No existe ninguna limitación de número')
    ],
    'obj': 'MOA 8.2.2.5 - Cupo Máximo de PMR por Vuelo',
    'exp': 'Se admite un total máximo de 15 PMR por vuelo, limitando los no ambulatorios (WCHC/WCHS que no pueden subir escaleras o moverse) a un máximo de 9.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P85)', 'MOA 8.2.2.5']
  },
  {
    'num': 86, 'ans': 'D', 'subj': 'cmd_disruptive_pax',
    'stem': '¿Cuántos pasajeros PMR no ambulatorios (WCHC / WCHS) pueden ser transportados viajando solos (sin acompañante)?',
    'opts': [
      ('A', 'Máximo 4 PMR no ambulatorios que viajen solos'),
      ('B', 'Máximo 3 PMR no ambulatorios que viajen solos'),
      ('C', 'Máximo 2 PMR no ambulatorios que viajen solos'),
      ('D', 'Como máximo 1 PMR no ambulatorio que viaje solo (sus necesidades de seguridad son asumidas por la tripulación y con máx 2 UMs a bordo)')
    ],
    'obj': 'MOA 8.2.2.5 - PMR No Ambulatorios No Acompañados',
    'exp': 'Solo se autoriza 1 PMR no ambulatorio sin acompañante por vuelo, quedando condicionada la atención de emergencia a la tripulación de cabina.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P86)', 'MOA 8.2.2.5']
  },
  {
    'num': 87, 'ans': 'D', 'subj': 'cmd_emergency',
    'stem': 'En los procedimientos de emergencia en tierra, ¿cómo se define formalmente la maniobra de \"Desalojo\" (Rapid Disembarkation / Deplaning)?',
    'opts': [
      ('A', 'Evacuación de emergencia utilizando las rampas hinchables de todas las salidas'),
      ('B', 'Desembarque con equipaje de mano por las escaleras principales'),
      ('C', 'Desembarque por las compuertas de bodega'),
      ('D', 'Desembarque rápido y ordenado del pasaje a través de las puertas convencionales con escaleras/pasarela practicables, SIEMPRE SIN equipaje de mano')
    ],
    'obj': 'Procedimientos de Emergencia - Desalojo vs Evacuación',
    'exp': 'El desalojo (rapid disembarkation) es una salida preventiva ágil por escaleras o pasarelas regulares ante situaciones de riesgo potencial pero sin peligro inminente que exija toboganes, dejando siempre el equipaje a bordo.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P87)', 'MOA 8.3 / MOB Procedimientos de Emergencia']
  },
  {
    'num': 88, 'ans': 'A', 'subj': 'cmd_emergency',
    'stem': 'En la certificación de cabina de aeronaves comerciales de transporte de pasaje, ¿cómo se clasifican las vías de evacuación de emergencia?',
    'opts': [
      ('A', 'Las puertas principales a nivel de suelo como Tipo I y las salidas de emergencia sobre el plano como Tipo III'),
      ('B', 'Las puertas como Tipo III y las ventanas como Tipo I'),
      ('C', 'Las puertas como Tipo II y las ventanas como Tipo III'),
      ('D', 'Las puertas como Tipo III y las ventanas como Tipo II')
    ],
    'obj': 'Certificación Aeronáutica CS-25 - Tipos de Salidas de Emergencia',
    'exp': 'Las puertas de cabina a nivel de suelo con rampa/escalera son de Tipo I y las salidas de emergencia de sobreplano operadas manualmente son de Tipo III.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P88)', 'EASA CS-25.807']
  },
  {
    'num': 89, 'ans': 'C', 'subj': 'cmd_dispatch_mel',
    'stem': 'Tenemos un DIFERIDO de Categoría \"A\" en el ATL antes del inicio del vuelo. ¿Cuál es el tiempo máximo permitido para su reparación?',
    'opts': [
      ('A', '3 días consecutivos'),
      ('B', '120 días consecutivos'),
      ('C', 'El intervalo o plazo específicamente indicado en la columna de observaciones de la MEL para ese ítem concreto'),
      ('D', '10 días consecutivos')
    ],
    'obj': 'MEL / DDPM - Intervalo de Rectificación Categoría A',
    'exp': 'Los ítems categoría A no tienen un plazo estándar fijo; deben rectificarse en el período específico establecido en la propia MEL (en horas, ciclos de vuelo o días naturales).',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P89)', 'MEL Preámbulo']
  },
  {
    'num': 90, 'ans': 'B', 'subj': 'cmd_disruptive_pax',
    'stem': '¿Cuál es el número máximo de pasajeros bajo custodia legal (deportados o detenidos) que pueden ser admitidos a bordo?',
    'opts': [
      ('A', 'Está limitado a 2 pasajeros en todos los casos sin excepción'),
      ('B', 'Como norma general está limitado a 2, pero por razones operativas puede aumentarse hasta 7 atendiendo a su grado de peligrosidad (bajo: 7, medio: 4, alto: 2)'),
      ('C', 'Está limitado a 4 pasajeros'),
      ('D', 'Hasta 10 pasajeros si viajan con el doble de escoltas')
    ],
    'obj': 'MOA 8.2.2.6 - Pasajeros Bajo Custodia Legal (DEPA / DEPU)',
    'exp': 'La norma general admite 2 deportados/custodiados, permitiéndose ampliar hasta 7 según su nivel de riesgo evaluado por las autoridades (hasta 7 si riesgo bajo, hasta 4 si medio, máximo 2 si alto).',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P90)', 'MOA 8.2.2.6']
  },
  {
    'num': 91, 'ans': 'C', 'subj': 'cmd_air_law',
    'stem': '¿Cuál es la fraseología aeronáutica reglamentaria para comunicar a la dependencia ATC la cancelación de un plan de vuelo IFR para proseguir en VFR?',
    'opts': [
      ('A', 'Ninguna, la transferencia se efectúa automáticamente por el plan de vuelo'),
      ('B', 'Notificar intenciones de descenso visual únicamente'),
      ('C', 'Utilizar expresamente la fraseología normalizada: \"CANCELING MY IFR FLIGHT\" (Cancelo mi vuelo IFR)'),
      ('D', 'A discreción libre del comandante')
    ],
    'obj': 'SERA / OACI Fraseología - Cancelación de Plan de Vuelo IFR',
    'exp': 'El Reglamento del Aire (SERA.5005) exige que el piloto declare explícitamente "CANCELING MY IFR FLIGHT" cuando decida cambiar de reglas de vuelo instrumentales a visuales.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P91)', 'MOA Capítulo 12 Reglas del Aire', 'SERA.5005']
  },
  {
    'num': 92, 'ans': 'D', 'subj': 'cmd_mnemonicos_mando',
    'stem': '¿Qué herramientas y principios del CRM son esenciales para la ejecución segura de una aproximación de No Precisión (NPA)?',
    'opts': [
      ('A', 'Comunicación precisa, inmediata y monitorización cruzada por parte del Pilot Monitoring (PM)'),
      ('B', 'Cumplimiento estricto del concepto de cabina estéril (Sterile Cockpit)'),
      ('C', 'Uso y consciencia situacional del EGPWS/TAWS para mitigar riesgos de CFIT por alto régimen de descenso'),
      ('D', 'Todas son correctas')
    ],
    'obj': 'CRM / TEM - Gestión de Riesgos en Aproximaciones de No Precisión',
    'exp': 'La ejecución de NPAs requiere máxima monitorización del PM, cabina estéril y supervisión continua de las llamadas de altitud y régimen de descenso del EGPWS para evitar accidentes CFIT.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P92)', 'MOA 8.3 CRM & TEM']
  },
  {
    'num': 93, 'ans': 'A', 'subj': 'cmd_flight_planning',
    'stem': 'Si se inicia una aproximación frustrada durante la maniobra visual en circuito (Circling) en el tramo de viento en cola:',
    'opts': [
      ('A', 'Se debe realizar un viraje inicial en ascenso hacia la pista de aterrizaje (hacia el interior del campo) para mantenerse dentro del área protegida y unirse a la frustrada publicada'),
      ('B', 'Se asciende manteniendo el rumbo de viento en cola directamente hasta la MSA'),
      ('C', 'Se vira 180° hacia el exterior de la pista'),
      ('D', 'Se prosigue el descenso en visual hacia la cabecera opuesta')
    ],
    'obj': 'PANS-OPS / MOA - Maniobra de Frustrada en Circling',
    'exp': 'La frustrada en maniobra de circling exige virar inicialmente hacia la pista activa ascendiendo dentro del área protegida de obstáculos para luego interceptar la derrota de aproximación frustrada publicada.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P93)', 'MOA 8.1.4 / PANS-OPS Circling Missed Approach']
  },
  {
    'num': 94, 'ans': 'D', 'subj': 'cmd_disruptive_pax',
    'stem': 'En una situación de acto de interferencia ilícita o secuestro de la aeronave:',
    'opts': [
      ('A', 'El objetivo principal es la protección de vidas humanas y la seguridad del vuelo'),
      ('B', 'El comandante informará a los agresores de las consecuencias legales y actuará conforme al protocolo de seguridad del MOA'),
      ('C', 'Se pondrá en riesgo la integridad estructural de la aeronave para neutralizar la amenaza'),
      ('D', 'A + B son correctas')
    ],
    'obj': 'MOA Cap. 10 Security - Respuesta ante Interferencia Ilícita',
    'exp': 'La prioridad absoluta es la preservación de la vida de pasajeros y tripulantes, siguiendo las directrices del programa de seguridad aérea y el código transpondedor 7500.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P94)', 'MOA Capítulo 10 Security']
  },
  {
    'num': 95, 'ans': 'C', 'subj': 'cmd_disruptive_pax',
    'stem': 'En materia de Seguridad (Security) y control de acceso a la cabina de vuelo:',
    'opts': [
      ('A', 'Solo tripulantes o inspectores acreditados pueden ser admitidos, siendo la decisión final potestad exclusiva del comandante'),
      ('B', 'Cualquier empleado de la compañía puede viajar en transportín sin autorización'),
      ('C', 'El comandante tiene la potestad final de admisión y velará siempre porque ninguna presencia en cabina cause distracción o interferencia operativa'),
      ('D', 'Los inspectores de aviación tienen derecho a acceder incluso si el comandante lo considera inseguro')
    ],
    'obj': 'MOA Cap. 10 Security - Autoridad del Comandante sobre la Cabina de Pilotaje',
    'exp': 'El comandante ostenta la autoridad última para permitir o denegar el acceso a la cabina de pilotaje, priorizando en todo momento la ausencia de distracciones en la operación.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P95)', 'MOA Capítulo 10 Security']
  },
  {
    'num': 96, 'ans': 'D', 'subj': 'cmd_reporting',
    'stem': 'Respecto al sistema de reporte y notificación de sucesos de seguridad al departamento de Safety:',
    'opts': [
      ('A', 'Se dispone de formularios físicos en la cartera de vuelo y de plataforma digital para el envío de ASRs'),
      ('B', 'Se dispone de un plazo máximo de 72 horas desde que se tiene conocimiento del suceso para remitir el reporte formal'),
      ('C', 'Se pueden realizar reportes de seguridad confidenciales o no punitivos a través del canal de reporte voluntario SMS'),
      ('D', 'Todas son correctas')
    ],
    'obj': 'MOA Cap. 11 / EASA Reg 376/2014 - Sistema de Reporte de Seguridad (SMS / ASR)',
    'exp': 'El sistema de reporte de seguridad de Binter permite formatos digitales/papel, otorga 72h para notificaciones obligatorias y fomenta el reporte confidencial y voluntario dentro de la cultura justa.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P96)', 'MOA Capítulo 11 Safety Management']
  },
  {
    'num': 97, 'ans': 'B', 'subj': 'cmd_emergency',
    'stem': 'En caso de fallo de comunicaciones en condiciones meteorológicas de vuelo por instrumentos (IMC), se seleccionará el código transponder 7600 y:',
    'opts': [
      ('A', 'Se mantendrá el último nivel y velocidad asignados durante 20 minutos'),
      ('B', 'Se mantendrá el último nivel y velocidad asignados durante un período de 7 minutos si se disponía de guía radar por parte de ATC antes de proceder conforme al plan de vuelo'),
      ('C', 'Se descenderá inmediatamente a la altitud mínima de sector'),
      ('D', 'Se buscarán condiciones visuales en el aeropuerto más cercano')
    ],
    'obj': 'SERA.8035 / OACI Anexo 2 - Procedimiento de Fallo de Comunicaciones en IMC (7 min radar)',
    'exp': 'Bajo control radar en espacio aéreo controlado, tras poner 7600 se debe mantener el último nivel de vuelo y velocidad asignados durante 7 minutos antes de ajustar la altitud y ruta del FPL presentado.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P97)', 'MOA Capítulo 12', 'SERA.8035']
  },
  {
    'num': 98, 'ans': 'D', 'subj': 'cmd_emergency',
    'stem': 'En caso de que la aeronave civil sea interceptada en vuelo por aeronaves militares:',
    'opts': [
      ('A', 'El comandante seguirá de inmediato las señales e instrucciones dadas por la aeronave interceptora'),
      ('B', 'Notificará de inmediato la interceptación a la dependencia de control de tránsito aéreo apropiada'),
      ('C', 'Seleccionará inmediatamente el código 7700 en el transponder (Modo A/C/S) salvo que reciba otra instrucción de ATC'),
      ('D', 'Todas son correctas')
    ],
    'obj': 'SERA / OACI Anexo 2 - Procedimiento de Interceptación de Aeronaves Civiles',
    'exp': 'El protocolo internacional exige obedecer a la interceptora, sintonizar 121.5 MHz, seleccionar transponder 7700 e informar a ATC.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P98)', 'MOA Capítulo 12 Reglas del Aire', 'SERA Apéndice 2']
  },
  {
    'num': 99, 'ans': 'B', 'subj': 'cmd_air_law',
    'stem': 'Según el Reglamento (UE) 923/2012 de EASA (SERA.4001), respecto al mantenimiento de la escucha continua en la frecuencia de radio:',
    'opts': [
      ('A', 'Siempre que se opere como vuelo controlado'),
      ('B', 'La escucha continua de voz en frecuencia podrá ser omitida cuando se mantengan comunicaciones aeroterrestres de enlace de datos vía CPDLC autorizadas'),
      ('C', 'No es necesaria fuera de espacio aéreo controlado'),
      ('D', 'A + B es correcta')
    ],
    'obj': 'SERA.4001 - Mantenimiento de Escucha de Radio y Excepciones CPDLC',
    'exp': 'El reglamento autoriza la exención de escucha continua por voz en áreas donde se establezca y autorice comunicación de control por enlace de datos CPDLC.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P99)', 'SERA.4001', 'MGNT 30 Data Link']
  },
  {
    'num': 100, 'ans': 'C', 'subj': 'cmd_moa_mob',
    'stem': 'En lo relativo a la aplicación de la discrecionalidad del comandante para extender el período de actividad de vuelo (FDP sin descanso en vuelo):',
    'opts': [
      ('A', 'El período máximo diario podrá extenderse en función de los saltos acumulados y la hora de inicio'),
      ('B', 'El período de actividad de vuelo máximo diario podrá extenderse hasta un máximo de 1 hora (o 2 horas en tripulación reforzada)'),
      ('C', 'A + B son correctas'),
      ('D', 'El período máximo de vuelo nunca podrá ser extendido bajo ninguna circunstancia')
    ],
    'obj': 'EASA ORO.FTL.205 / MOA Cap. 7 - Discreción del Comandante en FTL',
    'exp': 'El comandante puede extender el FDP básico hasta un máximo de 1 hora en tripulación estándar (o hasta 2 horas en tripulación reforzada) previa consulta obligatoria con todos los tripulantes.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P100)', 'MOA Capítulo 7 FTL', 'EASA ORO.FTL.205']
  }
]

final_data_51_100 = []
for q in raw_q_51_100:
    options_list = []
    for opt_id, opt_text in q['opts']:
        options_list.append({
            'id': opt_id,
            'text': opt_text,
            'is_correct': (opt_id == q['ans'])
        })
    item = {
        'id': f'CMD-EXAM-{q["num"]:03d}',
        'subject_id': q['subj'],
        'learning_objective': q['obj'],
        'stem': q['stem'],
        'options': options_list,
        'explanation': {
            'text': q['exp'],
            'references': q['refs']
        },
        'metadata': {
            'difficulty': 0.35
        }
    }
    final_data_51_100.append(item)

out_file = 'banks/command-upgrade/examen-oficial/examen_mando_binter_p51_100.json'
with open(out_file, 'w', encoding='utf-8') as f:
    json.dump(final_data_51_100, f, ensure_ascii=False, indent=2)

print(f'[SUCCESS] {len(final_data_51_100)} reactivos de Lote 2 escritos en {out_file}')
