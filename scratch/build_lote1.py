import json

raw_q = [
  {
    'num': 1, 'ans': 'C', 'subj': 'cmd_dispatch_mel',
    'stem': 'Cuando encontramos el símbolo (O) en la columna de un ítem diferido en la MEL, ¿dónde podemos encontrar el procedimiento a realizar?',
    'opts': [
      ('A', 'En el Airplane Flight Manual (AFM)'),
      ('B', 'En el Manual de Operaciones parte B (MOB)'),
      ('C', 'En la misma Minimum Equipment List (MEL)'),
      ('D', 'En el manual de mantenimiento (AMM)')
    ],
    'obj': 'MEL / DDPM - Procedimientos Operacionales (O)',
    'exp': 'Los procedimientos (O) son operacionales para la tripulación de vuelo o despacho y se encuentran recogidos dentro de la propia MEL.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P1)', 'MEL EMB BA RN24']
  },
  {
    'num': 2, 'ans': 'D', 'subj': 'cmd_performance',
    'stem': '¿Cuál es la altura de aceleración después de Go Around en caso de un BALKED LANDING?',
    'opts': [
      ('A', '500 ft sobre la DA/MDA'),
      ('B', '500 ft sobre la elevación del aeropuerto'),
      ('C', '1000 ft sobre la DA/MDA'),
      ('D', '1000 ft sobre la elevación del aeropuerto')
    ],
    'obj': 'Operaciones / Performance - Aceleración en Balked Landing',
    'exp': 'La aceleración y retracción de flaps en una frustrada tras balked landing se inicia a 1000 ft AAL (sobre la elevación del aeródromo).',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P2)', 'MOA 8.1.4', 'SOPM E195-E2']
  },
  {
    'num': 3, 'ans': 'C', 'subj': 'cmd_dispatch_mel',
    'stem': 'En el chequeo del ATL en el primer salto de la mañana es importante verificar:',
    'opts': [
      ('A', 'Comprobar que la documentación legal del vuelo esté en fecha'),
      ('B', 'El que todos los diferidos estén cerrados o en fecha y que pueden ser despachados acorde a la Minimum Equipment List (MEL)'),
      ('C', 'B + el comprobar que se han realizado las inspecciones rutinarias y específicas que deben realizarse a la aeronave (line check por ejemplo)'),
      ('D', 'Ninguna es correcta')
    ],
    'obj': 'MOA 8.1.1 - Aceptación de la Aeronave y Chequeo ATL',
    'exp': 'El comandante debe verificar tanto el estado y vigencia de diferidos MEL como el cumplimiento de las inspecciones de mantenimiento obligatorias (Daily/Line Check).',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P3)', 'MOA 8.1.1 Acceptance of Aircraft']
  },
  {
    'num': 4, 'ans': 'B', 'subj': 'cmd_performance',
    'stem': '¿Cuál es el gradiente de ascenso que hemos de cumplir en caso de "Go Around"?',
    'opts': [
      ('A', '2,4%'),
      ('B', '2,5%'),
      ('C', '2,7%'),
      ('D', '3,0%')
    ],
    'obj': 'EASA CS-25 / MOA 8.1.4 - Gradiente de Frustrada',
    'exp': 'El gradiente neto de diseño estándar en aproximación frustrada para franqueamiento de obstáculos en operaciones comerciales es del 2,5%.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P4)', 'MOA 8.1.4.4', 'EASA CS-25.119']
  },
  {
    'num': 5, 'ans': 'C', 'subj': 'cmd_flight_ground_ops',
    'stem': '¿Está permitido el despegue en una pista con acción de frenado POOR?',
    'opts': [
      ('A', 'Sí, cuando el contaminante es retirado'),
      ('B', 'Sí, con el SNOWTAM apropiado'),
      ('C', 'No, nunca en esta condición'),
      ('D', 'Sí, en el caso de que el coeficiente de fricción está por encima de 2,3')
    ],
    'obj': 'MOA 8.1.4.3 - Límites de Pistas Contaminadas POOR',
    'exp': 'El despegue con frenado reportado como POOR (pobre) está terminantemente prohibido en la normativa operacional de Binter.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P5)', 'MOA 8.1.4.3', 'Manual Operación Invernal']
  },
  {
    'num': 6, 'ans': 'D', 'subj': 'cmd_flight_planning',
    'stem': 'Al añadir la Carga de Tráfico (TLD) al Dry Operating Weight (DOW), obtendremos:',
    'opts': [
      ('A', 'Landing Weight (LW)'),
      ('B', 'Taxi Weight (TW)'),
      ('C', 'Take Off Weight (TOW)'),
      ('D', 'Zero Fuel Weight (ZFW)')
    ],
    'obj': 'Masa y Centrado - Ecuación ZFW',
    'exp': 'DOW (Dry Operating Weight) + TLD (Traffic Load) = ZFW (Zero Fuel Weight).',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P6)', 'MOA 8.1.8 Masa y Centrado']
  },
  {
    'num': 7, 'ans': 'C', 'subj': 'cmd_dispatch_mel',
    'stem': '¿Cuántos ítems CDL podemos tener diferidos como máximo por cada sistema / ATA?',
    'opts': [
      ('A', 'Máximo de 2 puntos CDL diferidos, salvo las combinaciones específicamente indicadas'),
      ('B', 'No hay límite, siempre y cuando no afecte a la seguridad del vuelo'),
      ('C', 'Máximo de 1 punto CDL diferidos, salvo las combinaciones específicamente indicadas'),
      ('D', 'Depende de mantenimiento ver la aeronavegabilidad o no de la aeronave')
    ],
    'obj': 'DDPM / CDL - Límites de Diferidos por Sistema',
    'exp': 'Como regla general, no se permite diferir más de 1 ítem CDL por sistema/ATA a menos que la CDL autorice combinaciones específicas.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P7)', 'DDPM Sección 4 CDL Preamble']
  },
  {
    'num': 8, 'ans': 'D', 'subj': 'cmd_moa_mob',
    'stem': '¿En qué capítulo del Manual de Operaciones parte A podemos encontrar las precauciones de salud para tripulaciones?',
    'opts': [
      ('A', 'MO parte A capítulo 9'),
      ('B', 'MO parte A capítulo 7'),
      ('C', 'MO parte A capítulo 8'),
      ('D', 'MO parte A capítulo 6')
    ],
    'obj': 'MOA Estructura - Capítulo 6 Salud',
    'exp': 'El Capítulo 6 del MOA está dedicado íntegramente a las precauciones de salud para tripulantes.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P8)', 'MOA Capítulo 6']
  },
  {
    'num': 9, 'ans': 'A', 'subj': 'cmd_flight_planning',
    'stem': 'En caso de requerir un alternativo despegue, ¿cómo tienen que estar las condiciones meteorológicas del mismo según el MOA 8.1.2.4 para ser aceptado como tal?',
    'opts': [
      ('A', 'Tienen que estar por encima de los mínimos de operación aplicables'),
      ('B', 'Tienen que estar por encima de los mínimos de planificación aplicables'),
      ('C', 'Tienen que estar por encima de los mínimos de operación aplicables más 200 metros y 100 ft sobre DA/MDA'),
      ('D', 'Tienen que estar por encima de los mínimos de planificación aplicables más 200 metros y 100 ft sobre DA/MDA')
    ],
    'obj': 'MOA 8.1.2.4 - Mínimos Meteorológicos de Alternativo de Despegue',
    'exp': 'El alternativo de despegue debe estar en o por encima de los mínimos de OPERACIÓN aplicables para la hora estimada de uso.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P9)', 'MOA 8.1.2.4']
  },
  {
    'num': 10, 'ans': 'B', 'subj': 'cmd_flight_planning',
    'stem': '¿Cuál es el final reserve cuando tenemos un alternativo al destino?',
    'opts': [
      ('A', '45 minutos a 1500 FT'),
      ('B', '30 minutos at 1500 FT sobre la elevación del aeródromo de alternativo'),
      ('C', '30 minutos at 1500 FT sobre la elevación del aeródromo de destino'),
      ('D', 'Combustible para el alternativo + Combustible de contingencia')
    ],
    'obj': 'MOA 8.1.7 - Final Reserve con Alternativo',
    'exp': 'La reserva final son 30 minutos a 1500 ft sobre la elevación del aeródromo alternativo a velocidad de espera.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P10)', 'MOA 8.1.7 Combustible']
  },
  {
    'num': 11, 'ans': 'D', 'subj': 'cmd_flight_planning',
    'stem': '¿Cuál es la TLD (Traffic Load)?',
    'opts': [
      ('A', 'Payload únicamente'),
      ('B', 'Valores de peso como: "Comail, Comat, Valijas"'),
      ('C', 'Peso de pasajeros y equipaje de mano DAA'),
      ('D', 'Payload (carga comercial) más la carga no comercial (Comail, Comat, Valijas)')
    ],
    'obj': 'Masa y Centrado - Definición de TLD',
    'exp': 'Traffic Load (TLD) engloba tanto el payload comercial (pasajeros + equipajes facturados + carga aérea) como la carga no comercial (material de compañía, comail, valijas).',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P11)', 'MOA 8.1.8']
  },
  {
    'num': 12, 'ans': 'A', 'subj': 'cmd_flight_planning',
    'stem': '¿Cuál es el peso standard de la tripulación de vuelo según el MOA 8.1.8?',
    'opts': [
      ('A', '85 kilos'),
      ('B', '88 kilos'),
      ('C', '75 kilos'),
      ('D', '70 kilos')
    ],
    'obj': 'MOA 8.1.8 - Pesos Estándar Tripulación de Vuelo',
    'exp': 'Según el MOA 8.1.8, el peso estándar de cada tripulante de vuelo (Flight Crew) es de 85 kg (incluye equipaje de mano). El tripulante de cabina es de 75 kg.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P12)', 'MOA 8.1.8 Tablas de Pesos Estándar']
  },
  {
    'num': 13, 'ans': 'C', 'subj': 'cmd_disruptive_pax',
    'stem': '¿Cuál es el número máximo UMs de edad comprendida entre 5 y 8 años (MOA 8.2.2.5)?',
    'opts': [
      ('A', 'Máximo de 4 UMs dentro de esas edades'),
      ('B', 'No hay limitación, salvo los asientos de salidas de emergencia'),
      ('C', 'Máximo de 6 UMs dentro de esas edades'),
      ('D', 'Depende la limitación del número de chalecos salvavidas BABY que tengamos a bordo')
    ],
    'obj': 'MOA 8.2.2.5 - Limitación de UMs de 5 a 8 años',
    'exp': 'El número máximo de UMs (Menores no acompañados) de 5 a 8 años autorizados en un vuelo es de 6.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P13)', 'MOA 8.2.2.5 Pasajeros Especiales']
  },
  {
    'num': 14, 'ans': 'D', 'subj': 'cmd_disruptive_pax',
    'stem': '¿Cuándo es necesario un pliego descargo en embarazadas (MOA 8.2.2.5)?',
    'opts': [
      ('A', 'A partir de las 25 semanas'),
      ('B', 'Siempre será necesario'),
      ('C', 'Solo es necesario en caso de prescripción médica'),
      ('D', 'Cuando pasa de las 28 semanas e incluso después de 7 días después del parto')
    ],
    'obj': 'MOA 8.2.2.5 - Transporte de Mujeres Embarazadas',
    'exp': 'A partir de la semana 28 de gestación y hasta 7 días posteriores al parto se exige el pliego de descargo de responsabilidad / autorización médica.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P14)', 'MOA 8.2.2.5']
  },
  {
    'num': 15, 'ans': 'A', 'subj': 'cmd_disruptive_pax',
    'stem': '¿Es necesario que un pasajero DEAF realice un pliego de descargo de responsabilidades (MOA 8.2.2.5)?',
    'opts': [
      ('A', 'No es necesario efectuarlo están exentos los pasajeros DEAF, BLND y WCHR'),
      ('B', 'Si, es necesario siempre'),
      ('C', 'Solo en caso de no llevar acompañante válido'),
      ('D', 'No es necesario si lleva perro de acompañamiento o lazarillo')
    ],
    'obj': 'MOA 8.2.2.5 - Exención de Pliego de Descargo (DEAF, BLND, WCHR)',
    'exp': 'Los pasajeros DEAF (sordos), BLND (invidentes) y WCHR (silla de ruedas para rampas) están legalmente exentos de cumplimentar pliego de descargo.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P15)', 'MOA 8.2.2.5']
  },
  {
    'num': 16, 'ans': 'C', 'subj': 'cmd_disruptive_pax',
    'stem': '¿Cuántos "MEDA STCR" (Pasajeros en Camilla) pueden ser aceptados por vuelo?',
    'opts': [
      ('A', 'Solo podrá ser aceptado 2 por vuelo y sin acompañante'),
      ('B', 'Solo podrá ser aceptado 1 por vuelo y sin acompañante'),
      ('C', 'Solo podrá ser aceptado 1 por vuelo y con acompañante'),
      ('D', 'Solo podrá ser aceptado 2 por vuelo y con acompañante')
    ],
    'obj': 'MOA 8.2.2.5 - Transporte de Pasajeros en Camilla (STCR)',
    'exp': 'Solo se admite un máximo de 1 pasajero en camilla (MEDA STCR) por vuelo, siendo obligatorio que viaje asistido por un acompañante cualificado.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P16)', 'MOA 8.2.2.5']
  },
  {
    'num': 17, 'ans': 'B', 'subj': 'cmd_disruptive_pax',
    'stem': 'Pasajeros DEPA y DEPU, ¿Cuál es la diferencia entre ambos (MOA 8.2.2.6)?',
    'opts': [
      ('A', 'DEPU es de salida y DEPA es referente a arrival, ambos casos son deportados'),
      ('B', 'DEPU va sin escolta, y DEPA va siempre con escolta'),
      ('C', 'Ambos siempre llevan escolta'),
      ('D', 'Ambos no requieren escolta')
    ],
    'obj': 'MOA 8.2.2.6 - Diferencia DEPA vs DEPU',
    'exp': 'DEPU significa Deportee Unaccompanied (Deportado sin escolta policial) y DEPA significa Deportee Accompanied (Deportado escoltado por fuerzas de seguridad).',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P17)', 'MOA 8.2.2.6 Pasajeros Inadmisibles y Deportados']
  },
  {
    'num': 18, 'ans': 'A', 'subj': 'cmd_dispatch_mel',
    'stem': 'Tenemos un DIFERIDO tipo "B" antes del inicio del vuelo, ¿Cuál es el tiempo máximo permitido hasta su completa reparación?',
    'opts': [
      ('A', '3 días'),
      ('B', '120 días'),
      ('C', 'Según autorización específica'),
      ('D', '10 días')
    ],
    'obj': 'MEL / DDPM - Intervalo de Rectificación Categoría B',
    'exp': 'Los ítems categoría B de la MEL deben rectificarse en un plazo máximo de 3 días consecutivos (72 horas), contados a partir de las 00:00 UTC del día siguiente.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P18)', 'MEL Preámbulo', 'MOA 8.1.1']
  },
  {
    'num': 19, 'ans': 'B', 'subj': 'cmd_dispatch_mel',
    'stem': 'Tenemos un DIFERIDO tipo "D" antes del inicio del vuelo, ¿Cuál es el tiempo máximo permitido hasta su completa reparación?',
    'opts': [
      ('A', '3 días'),
      ('B', '120 días'),
      ('C', 'Según autorización específica'),
      ('D', '10 días')
    ],
    'obj': 'MEL / DDPM - Intervalo de Rectificación Categoría D',
    'exp': 'Los ítems categoría D de la MEL disponen de un intervalo máximo de rectificación de 120 días consecutivos.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P19)', 'MEL Preámbulo']
  },
  {
    'num': 20, 'ans': 'D', 'subj': 'cmd_flight_planning',
    'stem': 'Según la cartografía LIDO, ¿dónde podremos encontrar información relativa a las peculiaridades locales del aeropuerto tanto en llegada como en salida del aeródromo?',
    'opts': [
      ('A', 'SIDPT CHARTS'),
      ('B', 'EOSID CHARTS'),
      ('C', 'AGC CHARTS'),
      ('D', 'AOI CHARTS')
    ],
    'obj': 'Cartografía LIDO - Aerodrome Operational Information (AOI)',
    'exp': 'Las cartas AOI (Aerodrome Operational Information) de LIDO recogen las notas y peculiaridades locales de operación, restricciones de ruido, rodaje y procedimientos locales.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P20)', 'Manual LIDO RouteManual AOI']
  },
  {
    'num': 21, 'ans': 'D', 'subj': 'cmd_dispatch_mel',
    'stem': '¿Quién efectúa la MEL?',
    'opts': [
      ('A', 'La MEL la realiza el fabricante de la aeronave y posteriormente es autorizada por el estado de matrícula del operador'),
      ('B', 'La MMEL la realiza el operador del estado de matrícula de la aeronave'),
      ('C', 'La MEL la realiza el operador y es autorizada por el estado del fabricante'),
      ('D', 'La MEL la realiza el operador y es autorizada por el estado de matrícula del mismo')
    ],
    'obj': 'Marco Regulatorio MEL vs MMEL',
    'exp': 'La MEL la elabora el operador basándose en la Master MEL (MMEL) del fabricante y es formalmente aprobada/autorizada por la autoridad de aviación del Estado del operador (AESA).',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P21)', 'EASA ORO.MLR.105', 'MOA 8.1.1']
  },
  {
    'num': 22, 'ans': 'A', 'subj': 'cmd_flight_planning',
    'stem': 'Se debe seleccionar dos aeródromos alternativos de destino cuando:',
    'opts': [
      ('A', 'Cuando las condiciones del aeródromo de destino estén por debajo de mínimos una hora antes y una hora después de la hora estimada de uso o no se disponga información meteorológica del mismo'),
      ('B', 'Siempre'),
      ('C', 'El aeródromo de destino sea de CAT B en materia de requisitos de calificación para el comandante'),
      ('D', 'B es correcta siempre que el aeródromo alternativo a destino esté a más de 60 minutos del aeródromo de destino e incluyendo un punto de replanificación')
    ],
    'obj': 'MOA 8.1.2.5 - Requisito de Dos Alternativos de Destino',
    'exp': 'Se deben seleccionar dos alternativos de destino cuando los partes/pronósticos meteorológicos indiquen condiciones por debajo de los mínimos de planificación (+/- 1h) o cuando no haya información meteorológica disponible.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P22)', 'MOA 8.1.2.5']
  },
  {
    'num': 23, 'ans': 'A', 'subj': 'cmd_moa_mob',
    'stem': '¿En qué capítulo del Manual de Operaciones parte A podemos encontrar información relativa a mercancías peligrosas y armas?',
    'opts': [
      ('A', 'MO parte A capítulo 9'),
      ('B', 'MO parte A capítulo 7'),
      ('C', 'MO parte A capítulo 8'),
      ('D', 'MO parte A capítulo 6')
    ],
    'obj': 'MOA Estructura - Capítulo 9 MMPP y Armas',
    'exp': 'El Capítulo 9 del MOA regula el transporte aéreo de Mercancías Peligrosas (MMPP / DGR) y Armas de Fuego.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P23)', 'MOA Capítulo 9']
  },
  {
    'num': 24, 'ans': 'D', 'subj': 'cmd_dispatch_mel',
    'stem': 'Tenemos un DIFERIDO tipo "C" antes del inicio del vuelo, ¿Cuál es el tiempo máximo permitido hasta su completa reparación?',
    'opts': [
      ('A', '3 días'),
      ('B', '120 días'),
      ('C', 'Según autorización específica'),
      ('D', '10 días')
    ],
    'obj': 'MEL / DDPM - Intervalo de Rectificación Categoría C',
    'exp': 'Los ítems categoría C de la MEL disponen de un plazo de rectificación de 10 días consecutivos (sin contar el día del descubrimiento).',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P24)', 'MEL Preámbulo']
  },
  {
    'num': 25, 'ans': 'A', 'subj': 'cmd_dispatch_mel',
    'stem': '¿Cuándo empieza a contar el tiempo de un diferido?',
    'opts': [
      ('A', 'Al inicio (00:00) del día siguiente del descubrimiento'),
      ('B', 'A las 24 Horas posteriores a su descubrimiento'),
      ('C', 'Desde el momento que es anotado en el ATL'),
      ('D', 'Instantáneamente desde el día y hora de su descubrimiento')
    ],
    'obj': 'MEL / DDPM - Cómputo de Intervalos de Rectificación',
    'exp': 'Todos los intervalos de rectificación (Categorías B, C y D) comienzan a computar a las 00:00 UTC del día natural siguiente al día en que la avería fue detectada y anotada en el ATL.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P25)', 'EASA ORO.MLR.105', 'MEL Preámbulo']
  },
  {
    'num': 26, 'ans': 'D', 'subj': 'cmd_moa_mob',
    'stem': 'En caso de transportar MMPP, el comandante deberá cerciorarse de:',
    'opts': [
      ('A', 'Disponer de NOTOC debidamente cumplimentado'),
      ('B', 'Asegurarse de que están cargadas debidamente'),
      ('C', 'Dar un briefing a la tripulación haciendo hincapié en el código de respuesta'),
      ('D', 'Todas son correctas')
    ],
    'obj': 'MOA Cap. 9 - Obligaciones del Comandante con MMPP',
    'exp': 'El comandante debe firmar la NOTOC, verificar la adecuada estiba y compatibilidad, y realizar el briefing de emergencia con la tripulación indicando el código de intervención de emergencia (DRI / Red Book).',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P26)', 'MOA 9.1 Transporte de MMPP']
  },
  {
    'num': 27, 'ans': 'B', 'subj': 'cmd_flight_planning',
    'stem': 'En la planificación de combustible del plan de vuelo operacional. ¿Qué ALTERNATIVO aparece reflejado en el cálculo de Alternate Fuel si se seleccionan dos?',
    'opts': [
      ('A', 'El más cercano que reúna las condiciones meteorológicas correctas'),
      ('B', 'El más lejano que reúna las condiciones meteorológicas correctas'),
      ('C', 'El más operativo desde el punto de vista comercial'),
      ('D', 'El más cercano dentro de 200 NM, desde el aeropuerto previsto de destino')
    ],
    'obj': 'MOA 8.1.7 - Cómputo de Combustible con Dos Alternativos',
    'exp': 'Cuando se requieren dos alternativos de destino, el cálculo de combustible de alternativo en el OFP debe cubrir el vuelo hasta el alternativo que requiera mayor cantidad de combustible (el más restrictivo/lejano).',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P27)', 'MOA 8.1.7']
  },
  {
    'num': 28, 'ans': 'D', 'subj': 'cmd_flight_planning',
    'stem': '¿Cuál de los siguientes conceptos forma el combustible mínimo requerido (REQD)?',
    'opts': [
      ('A', 'Taxi fuel + Trip fuel + Alternativo + Final reserve + Contingencia + Fuel policy'),
      ('B', 'Taxi fuel + Trip fuel + Alternativo + Final reserve + Contingencia + Extra fuel'),
      ('C', 'Taxi fuel + Trip fuel + Alternativo + Final reserve + Extra fuel'),
      ('D', 'Taxi fuel + Trip fuel + Alternativo + Final reserve + Contingencia')
    ],
    'obj': 'MOA 8.1.7 - Componentes del Combustible Mínimo Requerido (REQD)',
    'exp': 'El Combustible Mínimo Requerido para el despacho legal (REQD Fuel) se compone estrictamente de: Taxi + Trip + Contingency + Alternate + Final Reserve (el combustible adicional o Extra Fuel no forma parte del mínimo legal).',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P28)', 'MOA 8.1.7']
  },
  {
    'num': 29, 'ans': 'B', 'subj': 'cmd_flight_planning',
    'stem': 'Sobre el combustible a bordo que debemos llevar, ¿podemos realizar un despegue con el FOB por debajo del mínimo requerido mostrado en el OFPL?',
    'opts': [
      ('A', 'Solo con el mínimo Fuel Policy'),
      ('B', 'No podemos despachar ni despegar un vuelo por debajo del combustible mínimo requerido (REQD)'),
      ('C', 'Sí podemos despachar un vuelo con menos del combustible mínimo requerido (REQD)'),
      ('D', 'No podemos despachar un vuelo por debajo del combustible mínimo al MAP (MAP MIN)')
    ],
    'obj': 'MOA 8.1.7 - Prohibición de Despacho bajo Mínimo Requerido',
    'exp': 'Bajo ninguna circunstancia se puede iniciar un vuelo comercial si la cantidad de combustible a bordo (FOB) es inferior al Combustible Mínimo Requerido (REQD).',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P29)', 'MOA 8.1.7.1']
  },
  {
    'num': 30, 'ans': 'A', 'subj': 'cmd_moa_mob',
    'stem': 'Respecto al transporte de MMPP, los HUM (Restos Humanos no incinerados):',
    'opts': [
      ('A', 'No deben ser estibados en las proximidades de animales ni alimentos'),
      ('B', 'No deben ser estibados en las proximidades de animales, pero sí en la de alimentos'),
      ('C', 'No deben ser estibados en las proximidades de alimentos, pero si en la de animales'),
      ('D', 'No tienen ningún tipo de limitación en cuanto a la segregación de MMPP')
    ],
    'obj': 'MOA 9.1 / Carga - Segregación de Restos Humanos (HUM)',
    'exp': 'Los féretros con restos humanos no incinerados (HUM) deben estibarse completamente segregados y alejados de animales vivos (AVIH) y de productos alimenticios.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P30)', 'MOA Capítulo 9']
  },
  {
    'num': 31, 'ans': 'A', 'subj': 'cmd_flight_planning',
    'stem': '¿Cuándo NO es posible emplear la conversión de visibilidad notificada a RVR (CMV) de acuerdo al MOA 8.1.3.6?',
    'opts': [
      ('A', 'Todas son correctas (para el despegue, para mínimos RVR < 800m y cuando se disponga de RVR reportado)'),
      ('B', 'Para el despegue únicamente'),
      ('C', 'Para valores mínimos de RVR inferiores a 800 m únicamente'),
      ('D', 'Cuando dispongamos de un reporte de RVR únicamente')
    ],
    'obj': 'MOA 8.1.3.6 - Restricciones de Conversión de Visibilidad a RVR (CMV)',
    'exp': 'La conversión CMV está prohibida para el cálculo de mínimos de despegue (LVTO), cuando se disponga de RVR medido por transmisómetros, y para aproximaciones con mínimos de RVR inferiores a 800 m.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P31)', 'MOA 8.1.3.6 CMV']
  },
  {
    'num': 32, 'ans': 'B', 'subj': 'cmd_flight_planning',
    'stem': '¿Qué significado tiene la letra "N" en este reporte meteorológico: RVR 30/0800N?',
    'opts': [
      ('A', 'RVR 800 al Norte'),
      ('B', 'RVR 800 sin cambios esperados (No change)'),
      ('C', 'RVR 800 pero "NO" reportado'),
      ('D', 'RVR 800 no por niebla')
    ],
    'obj': 'Meteorología / METAR - Tendencia de RVR (N / U / D)',
    'exp': 'En los grupos de RVR del METAR: N = No change (sin cambio durante los 10 min anteriores), U = Upward (aumentando), D = Downward (disminuyendo).',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P32)', 'MOA 8.1.3 Meteorología']
  },
  {
    'num': 33, 'ans': 'C', 'subj': 'cmd_flight_planning',
    'stem': '¿Qué significa el descriptor PRFG en un informe meteorológico METAR?',
    'opts': [
      ('A', 'Niebla presente'),
      ('B', 'Niebla en las proximidades'),
      ('C', 'Parcialmente con niebla (bancos de niebla)'),
      ('D', 'Niebla previamente al reporte')
    ],
    'obj': 'Meteorología / METAR - Descriptores PR (Partial) y FG (Fog)',
    'exp': 'PR = Partial (Parcial / bancos que cubren parte del aeródromo); FG = Fog (Niebla con visibilidad < 1000m).',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P33)', 'MOA 8.1.3 Meteorología']
  },
  {
    'num': 34, 'ans': 'B', 'subj': 'cmd_flight_ground_ops',
    'stem': 'Si tenemos un SLOT (CTOT) de salida a las 10:55 UTC, y el tiempo de rodaje estándar del aeropuerto son 10 minutos, ¿cuál sería la hora más temprana de BLOCK OFF para cumplir con la ventana del slot?',
    'opts': [
      ('A', '10:35 (tolerancia del SLOT +/- 10 minutos)'),
      ('B', '10:40 (tolerancia del SLOT -5 / +10 minutos)'),
      ('C', '10:30 (tolerancia del SLOT -15 / +10 minutos)'),
      ('D', '10:45 (tolerancia del SLOT -0 / +10 minutos)')
    ],
    'obj': 'Gestión ATC / Eurocontrol - Tolerancia de Slot CTOT (-5 / +10 min)',
    'exp': 'La ventana de cumplimiento de un SLOT CTOT es de -5 minutos a +10 minutos. Para un CTOT de 10:55, el despegue más temprano permitido es 10:50 UTC. Con 10 minutos de rodaje, el fuera calzos más temprano es 10:40 UTC.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P34)', 'MOA 8.1.5 Gestión de Vuelo & Slots ATC']
  },
  {
    'num': 35, 'ans': 'D', 'subj': 'cmd_disruptive_pax',
    'stem': '¿Qué requisitos y formularios son obligatorios para que un agente armado viaje a bordo de una aeronave en comisión de servicio?',
    'opts': [
      ('A', 'Formulario SA-09 cumplimentado'),
      ('B', 'Formulario SA-14 cumplimentado'),
      ('C', 'Identificación como POLICÍA, miembro de seguridad del Estado o escolta'),
      ('D', 'A + C son correctas (Formulario SA-09 cumplimentado e identificación oficial)')
    ],
    'obj': 'MOA Cap. 9 & 10 - Transporte de Agentes Armados (Formulario SA-09)',
    'exp': 'Todo agente de la autoridad que viaje armado en comisión de servicio debe identificarse con su acreditación oficial y presentar el formulario oficial SA-09 cumplimentado y firmado.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P35)', 'MOA Capítulo 9 / 10 Security']
  },
  {
    'num': 36, 'ans': 'A', 'subj': 'cmd_dispatch_mel',
    'stem': '¿Dónde se encuentra oficialmente contenida la Lista de Desviación de Configuración (CDL)?',
    'opts': [
      ('A', 'En el Airplane Flight Manual (AFM)'),
      ('B', 'En el avión, anexa a la MEL'),
      ('C', 'Al contener ítems estructurales solo pueden trabajar con ella el personal de mantenimiento'),
      ('D', 'En el Manual de Operaciones parte B (MOB)')
    ],
    'obj': 'Estructura de Manuales - Ubicación de la CDL en el AFM',
    'exp': 'La CDL es un documento aprobado por la autoridad certificadora que forma parte integrante del Manual de Vuelo de la Aeronave (AFM) o de su documentación asociada aprobada.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P36)', 'DDPM Sección 4', 'AFM E195-E2']
  },
  {
    'num': 37, 'ans': 'C', 'subj': 'cmd_moa_mob',
    'stem': 'En relación al transporte de Mercancías Peligrosas de Clase 1 (Explosivos) en Binter (MOA 9.1.1):',
    'opts': [
      ('A', 'Se admiten todo tipo de mercancías de clase 1'),
      ('B', 'Se admiten todo tipo de mercancías de clase 1 siempre que se tenga aprobación de la autoridad competente'),
      ('C', 'Solo se admite la división 1.4S'),
      ('D', 'El transporte de mercancías de clase 1 viene regulado por la reglamentación local de cada país')
    ],
    'obj': 'MOA 9.1.1 - Admisión Exclusiva de Explosivos Clase 1.4S',
    'exp': 'Binter solo tiene autorización operativa para transportar explosivos de la división 1.4, grupo de compatibilidad S (cartuchos de armas de fuego embalados de forma segura con un límite de 5 kg por pasajero).',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P37)', 'MOA 9.1.1 Transporte de Explosivos']
  },
  {
    'num': 38, 'ans': 'A', 'subj': 'cmd_flight_planning',
    'stem': '¿Cuál es el valor reglamentario del combustible de contingencia ("Contingency Fuel") en la planificación del vuelo operacional?',
    'opts': [
      ('A', 'El mayor valor entre: 5 minutos de espera a 1500 ft en destino (51 kg ATR / 166 kg E195-E2) y el 5% del Trip Fuel (o 3% con Fuel ERA)'),
      ('B', '5 minutos a velocidad de espera a 1500 ft sobre el aeródromo de destino'),
      ('C', '5 minutos a velocidad de espera a 1500 ft sobre el aeródromo alternativo'),
      ('D', '5% del trip fuel o bien 3% del trip fuel')
    ],
    'obj': 'MOA 8.1.7 - Cómputo del Combustible de Contingencia',
    'exp': 'El combustible de contingencia es el mayor valor entre el 5% del trip fuel (o 3% si se dispone de aeródromo alternativo en ruta ERA) y el combustible necesario para volar 5 minutos a velocidad de espera a 1500 ft sobre el aeródromo de destino (51 kg en ATR-72 / 166 kg en E195-E2).',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P38)', 'MOA 8.1.7 Combustible de Contingencia']
  },
  {
    'num': 39, 'ans': 'C', 'subj': 'cmd_flight_planning',
    'stem': '¿Cuál es el peso estándar asignado a los niños ("Children" de 2 a 11 años) en la Hoja de Carga y Centrado?',
    'opts': [
      ('A', '30 Kg'),
      ('B', '10 Kg'),
      ('C', '35 Kg'),
      ('D', '20 Kg')
    ],
    'obj': 'MOA 8.1.8 - Masa Estándar de Niños (Children)',
    'exp': 'En el MOA 8.1.8, el peso estándar reglamentario para niños (2 a 11 años cumplidos) es de 35 kg.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P39)', 'MOA 8.1.8 Pesos Estándar']
  },
  {
    'num': 40, 'ans': 'D', 'subj': 'cmd_performance',
    'stem': '¿En qué situaciones operacionales nos podemos encontrar más fácilmente limitados por la Masa Máxima de Aterrizaje (Maximum Landing Weight - MLW)?',
    'opts': [
      ('A', 'Vuelos de muy corta duración'),
      ('B', 'Alta carga de pago (High Payload)'),
      ('C', 'Vuelos de larga duración con poco pasaje'),
      ('D', 'A + B son correctas (vuelos de muy corta duración con alta carga de pago)')
    ],
    'obj': 'Performance / Masa y Centrado - Limitación por MLW',
    'exp': 'En vuelos interinsulares o de muy corta duración con cabina llena (alta carga de pago), el bajo consumo de combustible en ruta no reduce suficientemente el peso total, haciendo que el peso al aterrizaje supere fácilmente el MLW estructural o de pista.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P40)', 'MOA 8.1.8', 'Performance E195-E2']
  },
  {
    'num': 41, 'ans': 'C', 'subj': 'cmd_moa_mob',
    'stem': '¿Cuál es la diferencia conceptual entre el transporte de animales clasificados como AVI (AVIH) y PET (PETC)?',
    'opts': [
      ('A', 'AVI va en cabina de pasaje y PET va en la bodega'),
      ('B', 'Ambos son animales en bodega, varia el concepto según embalaje'),
      ('C', 'AVI (AVIH) va en la bodega y PET (PETC) va en la cabina de pasaje'),
      ('D', 'Todas son incorrectas')
    ],
    'obj': 'Transporte de Animales Vivos - AVIH vs PETC',
    'exp': 'AVIH (Animal in Hold) se transporta en los compartimentos de carga/bodega ventilados, mientras que PETC (Pet in Cabin) viaja dentro de su transportín homologado bajo el asiento en la cabina de pasaje.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P41)', 'MOA 8.2.2 Transporte de Animales Vivos']
  },
  {
    'num': 42, 'ans': 'A', 'subj': 'cmd_flight_planning',
    'stem': '¿Qué condiciones meteorológicas son requeridas para un aeródromo alternativo en vuelo (durante la replanificación de alternativos en ruta y de destino)?',
    'opts': [
      ('A', 'Las condiciones esperadas +/- 1H deben estar en o por encima de los mínimos de OPERACIÓN aplicables'),
      ('B', 'Las condiciones esperadas +/- 1H están por encima de 1000 metros de visibilidad'),
      ('C', 'Las condiciones esperadas +/- 1H están por encima de los mínimos de planificación'),
      ('D', 'Las condiciones esperadas a la hora de la operación, estén por encima de los mínimos de operación')
    ],
    'obj': 'MOA 8.1.2 - Mínimos Meteorológicos de Alternativo en Vuelo',
    'exp': 'Una vez en vuelo, para replanificar o seleccionar un alternativo en ruta o de destino, se requiere que la meteorología estimada durante la ventana +/- 1 hora esté en o por encima de los mínimos de OPERACIÓN (los márgenes de planificación solo aplican en el despacho previo al despegue).',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P42)', 'MOA 8.1.2.6 Replanificación en Vuelo']
  },
  {
    'num': 43, 'ans': 'B', 'subj': 'cmd_flight_planning',
    'stem': 'Si a nuestra llegada al aeródromo de destino las condiciones meteorológicas reportadas estuvieran por debajo de mínimos, ¿cuál de las siguientes afirmaciones sobre la política de aproximación (Approach Ban) es correcta?',
    'opts': [
      ('A', 'No podemos comenzar una aproximación en ningún caso si el aeródromo está bajo mínimos'),
      ('B', 'Podemos efectuar la aproximación hasta 1000 ft AGL (o hasta el FAF / último segmento de aproximación si la DA/MDA es superior a 1000 ft)'),
      ('C', 'Se podrá comenzar la aproximación solo si el RVR de la zona de touchdown está por encima del mínimo requerido'),
      ('D', 'Solo en caso que el RVR esté por encima de 550 metros (ILS CAT I)')
    ],
    'obj': 'EASA Part-CAT / MOA 8.1.3.8 - Prohibición de Aproximación (Approach Ban)',
    'exp': 'La aeronave puede iniciar la aproximación y descender hasta 1000 ft sobre el aeródromo (o FAF). Si a partir de los 1000 ft el RVR reportado cae por debajo del mínimo, se puede continuar hasta DA/MDA; si antes de los 1000 ft el RVR está bajo mínimos, no se debe continuar el descenso.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P43)', 'MOA 8.1.3.8 Prohibición de Aproximación']
  },
  {
    'num': 44, 'ans': 'B', 'subj': 'cmd_moa_mob',
    'stem': '¿En qué capítulo del Manual de Operaciones parte A encontramos las limitaciones del tiempo de vuelo y actividad aérea (FTL)?',
    'opts': [
      ('A', 'MO parte A capítulo 9'),
      ('B', 'MO parte A capítulo 7'),
      ('C', 'MO parte A capítulo 8'),
      ('D', 'MO parte A capítulo 6')
    ],
    'obj': 'MOA Estructura - Capítulo 7 FTL',
    'exp': 'El Capítulo 7 del MOA contiene toda la normativa de Limitaciones de Tiempo de Vuelo, Períodos de Actividad Aérea y Requisitos de Descanso (EASA ORO.FTL).',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P44)', 'MOA Capítulo 7']
  },
  {
    'num': 45, 'ans': 'D', 'subj': 'cmd_flight_ground_ops',
    'stem': 'Durante el vuelo en crucero, ¿cada cuánto tiempo debe la Sobrecargo / Tripulante de Cabina realizar comprobaciones periódicas de seguridad con la cabina de vuelo vía interfono?',
    'opts': [
      ('A', 'Cada 15 minutos'),
      ('B', 'Cada 20 minutos'),
      ('C', 'A discreción de la tripulación de cabina'),
      ('D', 'Cada 30 minutos')
    ],
    'obj': 'MOA / SOPM - Comprobación Periódica de Cabina (Incapacitación / Seguridad)',
    'exp': 'Para prevenir y detectar de forma temprana posibles incapacitaciones de pilotos o incidentes de seguridad, la tripulación de cabina debe contactar con la cabina de pilotaje cada 30 minutos.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P45)', 'MOA 8.3 Procedimientos en Vuelo']
  },
  {
    'num': 46, 'ans': 'B', 'subj': 'cmd_dispatch_mel',
    'stem': 'Todos aquellos sistemas o componentes de la aeronave que NO se encuentren explícitamente recogidos en la MEL se entienden que:',
    'opts': [
      ('A', 'No son necesarios para el despacho del vuelo'),
      ('B', 'Son estrictamente requeridos para el despacho del vuelo (deben estar operativos)'),
      ('C', 'Están contenidos en la CDL'),
      ('D', 'Su despacho queda a discreción exclusiva del comandante')
    ],
    'obj': 'Filosofía Fundamental de la MEL',
    'exp': 'La MEL es una lista de elementos permitidos inoperativos. Todo sistema, instrumento o componente del avión que NO figure en la MEL debe estar plenamente operativo para poder despachar la aeronave.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P46)', 'MEL EMB BA RN24 Preámbulo']
  },
  {
    'num': 47, 'ans': 'D', 'subj': 'cmd_moa_mob',
    'stem': 'De acuerdo con los requisitos de mantenimiento de la experiencia reciente del comandante (EASA ORO.FC.100 / MOA Cap. 5), ¿cuál es la exigencia mínima?',
    'opts': [
      ('A', '20 sectores de ruta en los últimos seis meses'),
      ('B', '20 sectores de ruta en los últimos tres meses'),
      ('C', '6 tomas y 6 despegues en los últimos tres meses'),
      ('D', '3 tomas y 3 despegues en los últimos tres meses (90 días)')
    ],
    'obj': 'EASA ORO.FC.100 / MOA Cap. 5 - Experiencia Reciente de Pilotos',
    'exp': 'El piloto al mando debe haber realizado al menos 3 despegues, aproximaciones y aterrizajes en el tipo de aeronave o simulador certificado durante los 90 días precedentes.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P47)', 'MOA Capítulo 5 Cualificaciones']
  },
  {
    'num': 48, 'ans': 'A', 'subj': 'cmd_moa_mob',
    'stem': 'En relación con el transporte de Mercancías Peligrosas (MMPP) en Binter, ¿qué limitación estricta aplica sobre materiales radiactivos?',
    'opts': [
      ('A', 'Binter no admite el transporte de materiales radiactivos fisibles'),
      ('B', 'Binter admite el transporte de MMPP en bultos consolidados'),
      ('C', 'Las MMPP no tienen limitada su cantidad máxima por avión'),
      ('D', 'B y C son correctas')
    ],
    'obj': 'MOA 9.1 - Prohibición de Material Radiactivo Fisible',
    'exp': 'La política de mercancías peligrosas de Binter prohíbe taxativamente el transporte de material radiactivo clasificado como fisible.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P48)', 'MOA 9.1']
  },
  {
    'num': 49, 'ans': 'C', 'subj': 'cmd_flight_planning',
    'stem': 'En la selección y planificación de aeródromos alternativos, ¿cuál de las siguientes afirmaciones es correcta según el MOA?',
    'opts': [
      ('A', 'Un aeródromo de destino a menos de 1h de vuelo con N-1 puede servir como alternativo de despegue'),
      ('B', 'El aeródromo de origen puede ser seleccionado como alternativo de destino si reúne los requisitos'),
      ('C', 'Las afirmaciones A y B son correctas'),
      ('D', 'Ninguna es correcta')
    ],
    'obj': 'MOA 8.1.2 - Criterios de Selección de Alternativos',
    'exp': 'El aeródromo de destino puede utilizarse como alternativo de despegue si está dentro de 1 hora de vuelo a velocidad de crucero con motor inoperativo (N-1), y el aeródromo de salida puede ser planificado como alternativo de destino.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P49)', 'MOA 8.1.2 Selección de Alternativos']
  },
  {
    'num': 50, 'ans': 'A', 'subj': 'cmd_flight_planning',
    'stem': 'Para la selección de un aeródromo alternativo en ruta o de destino cuya aproximación principal sea de No Precisión (NPA), ¿cuáles son los mínimos de planificación?',
    'opts': [
      ('A', 'Mínimos de No Precisión + 200 ft de techo / 1000 m de visibilidad (o MDA/H + 400 ft / 1500 m en plan básico)'),
      ('B', 'Mínimos de No Precisión puros sin incremento'),
      ('C', 'Mínimos de CAT I estándar'),
      ('D', 'Mínimos de aproximación en circuito (Circling)')
    ],
    'obj': 'MOA 8.1.7.2 - Mínimos de Planificación para Alternativos de No Precisión',
    'exp': 'De acuerdo con las tablas de planificación de alternativos del MOA (Tablas 1A y 1B), para aproximaciones de no precisión se añaden los márgenes reglamentarios sobre los mínimos de aproximación en uso.',
    'refs': ['Examen Mando Binter FOR-ENT-006 (P50)', 'MOA 8.1.7.2.5 Tabla 1A']
  }
]

final_data = []
for q in raw_q:
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
    final_data.append(item)

out_file = 'banks/command-upgrade/examen-oficial/examen_mando_binter_p1_50.json'
with open(out_file, 'w', encoding='utf-8') as f:
    json.dump(final_data, f, ensure_ascii=False, indent=2)

print(f'[SUCCESS] {len(final_data)} reactivos de Lote 1 escritos en {out_file}')
