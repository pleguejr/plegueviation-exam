import json

raw_lote4 = [
  {
    'num': 1, 'ans': 'A', 'subj': 'cmd_e2_systems',
    'stem': 'En la arquitectura motopropulsor del Embraer 195-E2 con motores Pratt & Whitney PW1900G Geared Turbofan (GTF), ¿qué función desempeña la caja reductora Fan Drive Gear System (FDGS)?',
    'opts': [
      ('A', 'Permite que el Fan frontal gire a menor velocidad óptima mientras la turbina de baja presión gira a alta velocidad óptima (ratio ~3:1), reduciendo ruido, emisiones y consumo de combustible'),
      ('B', 'Conecta el motor al generador eléctrico exclusivamente'),
      ('C', 'Es una transmisión manual sincronizada para empuje inverso'),
      ('D', 'Acciona la bomba mecánica de combustible sin relación con el fan')
    ],
    'obj': 'AOM E195-E2 - Arquitectura del Motor PW1900G Geared Turbofan',
    'exp': 'El sistema FDGS desacopla la velocidad del fan y de la turbina de baja presión, permitiendo al gran fan girar más despacio y a la turbina a régimen óptimo de máxima eficiencia térmica y acústica.',
    'refs': ['AOM E195-E2 Capítulo 14 Powerplant', 'Pratt & Whitney PW1900G Engine Manual']
  },
  {
    'num': 2, 'ans': 'B', 'subj': 'cmd_e2_systems',
    'stem': 'Tras el aterrizaje en el Embraer 195-E2, ¿cuál es el tiempo mínimo requerido de funcionamiento de los motores en ralentí (IDLE) antes de cortar el Master para su apagado?',
    'opts': [
      ('A', '1 minuto'),
      ('B', '3 minutos de funcionamiento en ralentí (o ralentí de rodaje) para permitir la estabilización térmica homogénea de los rotores y el enfriamiento de los cojinetes'),
      ('C', '5 minutos continuos sin aplicar frenos'),
      ('D', 'No requiere tiempo de enfriamiento por ser motor moderno')
    ],
    'obj': 'SOPM / AOM E195-E2 - Enfriamiento de Motores PW1900G (3 minutos)',
    'exp': 'Los motores PW1900G exigen al menos 3 minutos de operación a ralentí antes del corte para prevenir el arqueamiento térmico del rotor (Rotor Bow) y la carbonización de aceite en cojinetes.',
    'refs': ['SOPM E195-E2 Normal Procedures - Engine Shutdown', 'AOM Sección Motores']
  },
  {
    'num': 3, 'ans': 'C', 'subj': 'cmd_e2_systems',
    'stem': '¿A qué cantidad de combustible restante en cada tanque alar se activa el mensaje de precaución EICAS \"FUEL LO LEVEL\" en el Embraer 195-E2?',
    'opts': [
      ('A', 'Aproximadamente 100 kg (220 lb) en cada tanque'),
      ('B', 'Aproximadamente 550 kg (1210 lb) en cada tanque'),
      ('C', 'Aproximadamente 300 kg (660 lb) en el tanque alar correspondiente (suministrando ~30 minutos de reserva final)'),
      ('D', 'Aproximadamente 800 kg en total')
    ],
    'obj': 'AOM E195-E2 - Mensaje EICAS FUEL LO LEVEL (~300 kg / tanque)',
    'exp': 'El aviso amarillo FUEL LO LEVEL se ilumina en el EICAS cuando la cantidad en un tanque alar desciende por debajo de aproximadamente 300 kg (660 lb).',
    'refs': ['AOM E195-E2 Capítulo 12 Fuel System', 'QRH E195-E2']
  },
  {
    'num': 4, 'ans': 'D', 'subj': 'cmd_e2_systems',
    'stem': '¿Cuál es el valor límite de desbalance de combustible entre tanques alares que dispara el mensaje de precaución EICAS \"FUEL IMBALANCE\" en el E195-E2?',
    'opts': [
      ('A', '100 kg (220 lb)'),
      ('B', '200 kg (440 lb)'),
      ('C', '500 kg (1100 lb)'),
      ('D', 'Aproximadamente 360 kg (800 lb) de diferencia entre tanques')
    ],
    'obj': 'AOM E195-E2 - Mensaje EICAS FUEL IMBALANCE (360 kg / 800 lb)',
    'exp': 'El sistema de combustible activa FUEL IMBALANCE cuando la diferencia entre el tanque alar izquierdo y derecho supera los 360 kg (800 lb). Se extingue al reducir el desbalance a menos de 45 kg (100 lb).',
    'refs': ['AOM E195-E2 Capítulo 12 Fuel System']
  },
  {
    'num': 5, 'ans': 'A', 'subj': 'cmd_e2_systems',
    'stem': 'En caso de fallo total de generación eléctrica de corriente alterna (All AC Power Loss), ¿qué fuente de energía de emergencia se despliega automáticamente en el Embraer 195-E2?',
    'opts': [
      ('A', 'La Ram Air Turbine (RAT: Turbina de Impacto de Aire), que genera potencia eléctrica de 115 VAC para las barras esenciales y presuriza el Sistema Hidráulico de emergencia'),
      ('B', 'Un motor auxiliar de gasolina en el cono de cola'),
      ('C', 'Paneles fotovoltaicos en el extradós alar'),
      ('D', 'El alternador de imanes permanentes del FADEC')
    ],
    'obj': 'AOM E195-E2 - Ram Air Turbine (RAT) y Pérdida Total AC',
    'exp': 'La RAT se despliega automáticamente en el flujo de aire al perderse todas las fuentes AC principales, alimentando las barras esenciales y el sistema de mandos críticos.',
    'refs': ['AOM E195-E2 Capítulo 7 Electrical System']
  },
  {
    'num': 6, 'ans': 'B', 'subj': 'cmd_e2_systems',
    'stem': '¿Cuál es la presión nominal operativa de trabajo de los tres sistemas hidráulicos independientes del Embraer 195-E2?',
    'opts': [
      ('A', '1500 psi'),
      ('B', '3000 psi'),
      ('C', '5000 psi'),
      ('D', '2100 psi')
    ],
    'obj': 'AOM E195-E2 - Presión Nominal del Sistema Hidráulico (3000 psi)',
    'exp': 'Los Sistemas Hidráulicos 1, 2 y 3 del Embraer 195-E2 operan a una presión de trabajo estándar de 3000 psi.',
    'refs': ['AOM E195-E2 Capítulo 13 Hydraulic System']
  },
  {
    'num': 7, 'ans': 'C', 'subj': 'cmd_e2_systems',
    'stem': '¿Qué función cumple la Unidad de Transferencia de Potencia (Power Transfer Unit - PTU) en el sistema hidráulico del E195-E2?',
    'opts': [
      ('A', 'Mezcla el líquido hidráulico del Sistema 1 con el Sistema 2 en caso de fuga'),
      ('B', 'Alimenta el tren de morro exclusivamente con aire a presión'),
      ('C', 'Transfiere potencia mecánica de presurización entre el Sistema Hidráulico 1 y el Sistema Hidráulico 2 sin transferir ni mezclar fluido hidráulico entre ambos'),
      ('D', 'Refrigera el líquido hidráulico de los frenos')
    ],
    'obj': 'AOM E195-E2 - Función de la PTU Hidráulica',
    'exp': 'La PTU utiliza la presión del Sistema 1 para mover una bomba en el Sistema 2 (o viceversa) asistiendo en la retracción del tren tras fallo de motor sin mezcla de fluidos.',
    'refs': ['AOM E195-E2 Capítulo 13 Hydraulic System']
  },
  {
    'num': 8, 'ans': 'D', 'subj': 'cmd_e2_systems',
    'stem': 'En el sistema de Mandos de Vuelo Fly-By-Wire (FBW) del Embraer 195-E2, ¿cuál es la diferencia fundamental entre el Modo Normal (Normal Mode) y el Modo Directo (Direct Mode)?',
    'opts': [
      ('A', 'En Modo Directo el avión solo puede ser pilotado por el piloto automático'),
      ('B', 'En Modo Normal los mandos están conectados por cables de acero mecánicos'),
      ('C', 'En Modo Directo no funcionan los alerones'),
      ('D', 'En Modo Normal los FCMs proporcionan protección activa de envolvente de vuelo (alta/baja velocidad, alabeo y factor de carga), mientras que en Modo Directo los actuadores responden directamente a las palancas sin protecciones de envolvente')
    ],
    'obj': 'AOM E195-E2 - Modos de Control FBW (Normal Mode vs Direct Mode)',
    'exp': 'El Normal Mode procesa las leyes de control a través de los FCMs garantizando protecciones completas de envolvente; el Direct Mode degrada el control a través de las ACEs con respuesta lineal sin protecciones.',
    'refs': ['AOM E195-E2 Capítulo 9 Flight Controls']
  },
  {
    'num': 9, 'ans': 'A', 'subj': 'cmd_e2_systems',
    'stem': '¿Cuál es el techo máximo de altitud operativa certificado para el Embraer 195-E2?',
    'opts': [
      ('A', '41.000 ft (FL410)'),
      ('B', '37.000 ft (FL370)'),
      ('C', '45.000 ft (FL450)'),
      ('D', '33.000 ft (FL330)'),
    ],
    'obj': 'AFM / AOM E195-E2 - Techo Máximo Operativo (FL410)',
    'exp': 'La altitud máxima operativa de servicio certificada en el AFM del Embraer 195-E2 es de 41.000 pies.',
    'refs': ['AFM E195-E2 Sección 2 Limitaciones', 'AOM Capítulo 2']
  },
  {
    'num': 10, 'ans': 'B', 'subj': 'cmd_e2_systems',
    'stem': '¿A qué altitud de cabina (Cabin Altitude) se produce el despliegue automático de las máscaras de oxígeno de los pasajeros en la cabina del Embraer 195-E2?',
    'opts': [
      ('A', '10.000 ft'),
      ('B', 'Entre 14.000 ft y 14.750 ft de altitud de cabina'),
      ('C', '18.000 ft'),
      ('D', '25.000 ft')
    ],
    'obj': 'AOM E195-E2 - Despliegue Automático de Máscaras de Pasaje (14.000 ft)',
    'exp': 'Las compuertas de las cajas PSU de pasaje se abren automáticamente liberando las máscaras de oxígeno cuando la altitud de presión en cabina supera los 14.000 ft.',
    'refs': ['AOM E195-E2 Capítulo 17 Oxygen System']
  },
  {
    'num': 11, 'ans': 'C', 'subj': 'cmd_dispatch_mel',
    'stem': 'En el despacho técnico con la MEL del Embraer 195-E2, si la Unidad de Potencia Auxiliar (APU) está inoperativa (Diferido Cat C):',
    'opts': [
      ('A', 'El avión no puede ser despachado comercialmente'),
      ('B', 'Se requiere despresurizar el avión antes del despegue'),
      ('C', 'Se permite el despacho requiriendo arranque de motor en tierra con unidad neumática externa (Air Starter Unit / Huffer) y fuente eléctrica GPU, y arranque cruzado (Crossbleed Start) para el segundo motor'),
      ('D', 'Se restringe el techo de vuelo a FL150')
    ],
    'obj': 'MEL EMB BA RN24 / DDPM - Despacho con APU Inoperativo',
    'exp': 'La MEL autoriza el despacho con APU inoperativa mediante los procedimientos (M) y (O) correspondientes de arranque asistido por medios de tierra y crossbleed.',
    'refs': ['MEL EMB BA RN24 ATA 49 APU', 'DDPM Sección 3']
  },
  {
    'num': 12, 'ans': 'D', 'subj': 'cmd_dispatch_mel',
    'stem': '¿Qué limitación operacional en el cálculo de performance de despegue y aterrizaje aplica si se despacha el avión con un inversor de empuje (Thrust Reverser) inoperativo según la MEL?',
    'opts': [
      ('A', 'No se permite despegar con peso superior a 40 toneladas'),
      ('B', 'Se reduce la velocidad Vne en 30 nudos'),
      ('C', 'El viento cruzado se limita a 5 nudos'),
      ('D', 'Se debe bloquear mecánicamente el inversor en posición plegada/forward (M), no tomar crédito de reversa en los cálculos de rendimiento (O) y aplicar las penalizaciones de distancia en pista mojada o contaminada')
    ],
    'obj': 'MEL EMB BA RN24 - Despacho con Reversa Inoperativa (ATA 78)',
    'exp': 'La MEL exige bloqueo físico del inversor inop, cálculo sin reversas y penalizaciones adicionales en pistas con coeficiente de frenado reducido.',
    'refs': ['MEL EMB BA RN24 ATA 78', 'DDPM Sección 3']
  },
  {
    'num': 13, 'ans': 'A', 'subj': 'cmd_e2_systems',
    'stem': '¿Cómo está constituido el sistema de detección de hielo en vuelo del Embraer 195-E2?',
    'opts': [
      ('A', 'Dos sensores ultrasónicos de vibración en el fuselaje delantero que detectan la frecuencia de resonancia al acumularse masa de hielo en su superficie'),
      ('B', 'Cámaras térmicas ópticas en las alas'),
      ('C', 'Sensores de presión pitot modificados'),
      ('D', 'Observación visual obligatoria por los pilotos con foco de plano')
    ],
    'obj': 'AOM E195-E2 - Detección Automática de Hielo',
    'exp': 'Los detectores de hielo constan de sondas que vibran a frecuencia ultrasónica. La masa de hielo depositada cambia su frecuencia natural disparando la señal y activando automáticamente el antihielo.',
    'refs': ['AOM E195-E2 Capítulo 11 Ice & Rain Protection']
  },
  {
    'num': 14, 'ans': 'B', 'subj': 'cmd_e2_systems',
    'stem': '¿Qué superficies de la aeronave reciben protección antihielo por aire caliente de sangrado (Thermal Bleed Air Anti-ice) en el E195-E2?',
    'opts': [
      ('A', 'Los bordes de ataque de los flaps y el timón de profundidad'),
      ('B', 'Los bordes de ataque alares externos (Slats 2, 3 y 4) y las tomas de aire de los motores (Engine Cowl Inlets)'),
      ('C', 'El estabilizador vertical y cono de morro'),
      ('D', 'El tren de aterrizaje y compuertas de bodega')
    ],
    'obj': 'AOM E195-E2 - Zonas Protegidas por Aire Térmico',
    'exp': 'El aire caliente de sangrado protege térmicamente las tomas de admisión del motor (Cowls) y los slats exteriores del borde de ataque alar.',
    'refs': ['AOM E195-E2 Capítulo 11']
  },
  {
    'num': 15, 'ans': 'C', 'subj': 'cmd_performance',
    'stem': '¿Cuál es la limitación máxima demostrada de componente de viento cruzado (Crosswind) para despegue y aterrizaje en pista seca en el Embraer 195-E2?',
    'opts': [
      ('A', '20 nudos'),
      ('B', '25 nudos'),
      ('C', '35 nudos (o hasta 38 nudos según versión del AFM / certificado)'),
      ('D', '50 nudos')
    ],
    'obj': 'AFM E195-E2 - Límite Máximo Demostrado de Viento Cruzado en Pista Seca',
    'exp': 'El límite máximo demostrado de viento cruzado en pista seca para el Embraer 195-E2 está establecido en 35-38 nudos según el AFM y manual de operaciones.',
    'refs': ['AFM E195-E2 Sección 2 Limitaciones', 'SOPM E195-E2']
  },
  {
    'num': 16, 'ans': 'D', 'subj': 'cmd_performance',
    'stem': 'En pista contaminada con nieve compactada o hielo (RWY CC 1 / Frenado Pobre o Acción de Frenado reducida), ¿cuál es el límite operativo máximo de viento cruzado recomendado en el E195-E2?',
    'opts': [
      ('A', '30 nudos'),
      ('B', '25 nudos'),
      ('C', '20 nudos'),
      ('D', '10 a 15 nudos máximo')
    ],
    'obj': 'MOA 8.1.4 / SOPM E195-E2 - Viento Cruzado en Pistas Contaminadas',
    'exp': 'Con coeficientes de rozamiento muy bajos o acción de frenado reducida, el viento cruzado se restringe a un máximo de 10-15 nudos para evitar excursiones de pista.',
    'refs': ['MOA Binter 8.1.4.3', 'Manual de Operación Invernal']
  },
  {
    'num': 17, 'ans': 'A', 'subj': 'cmd_e2_systems',
    'stem': '¿Qué función cumple la función de despegue con empuje reducido (Flex Takeoff / Reduced Thrust Takeoff) mediante temperatura asumida en el E195-E2?',
    'opts': [
      ('A', 'Reduce el desgaste térmico y mecánico del motor alargando su vida útil y disminuyendo los costes de mantenimiento cuando la longitud de pista y el peso lo permiten'),
      ('B', 'Aumenta el consumo de combustible para evitar sobrepeso'),
      ('C', 'Permite despegar con un generador apagado'),
      ('D', 'Es obligatoria en pistas con nieve contaminada')
    ],
    'obj': 'AOM / SOPM E195-E2 - Despegue con Empuje Flexible (Assumed Temperature)',
    'exp': 'El empuje flexible reduce el estrés térmico en las turbinas de alta presión del motor cuando el avión no está limitado por longitud de pista o franqueamiento de obstáculos.',
    'refs': ['AOM E195-E2 Performance', 'SOPM Takeoff Procedures']
  },
  {
    'num': 18, 'ans': 'B', 'subj': 'cmd_flight_ground_ops',
    'stem': '¿Bajo qué condiciones está PROHIBIDO realizar un despegue con empuje reducido (Flex Takeoff)?',
    'opts': [
      ('A', 'Con temperatura ambiente inferior a 20°C'),
      ('B', 'En pistas contaminadas (agua estancada, aguanieve, nieve o hielo) o cuando los frenos o el sistema de antiskid estén inoperativos'),
      ('C', 'En aeropuertos al nivel del mar'),
      ('D', 'Con viento en calma')
    ],
    'obj': 'AFM / SOPM E195-E2 - Prohibición de Despegue Flexible (Flex Takeoff)',
    'exp': 'El despegue con empuje reducido está estrictamente prohibido en pistas contaminadas o cuando existen averías en antiskid/frenos.',
    'refs': ['AFM E195-E2 Sección 2', 'SOPM E195-E2']
  },
  {
    'num': 19, 'ans': 'C', 'subj': 'cmd_e2_systems',
    'stem': 'En el sistema de frenos y antiskid del Embraer 195-E2, ¿qué sistema proporciona la protección contra hidroplaneo (Locked Wheel Protection) y control diferencial de frenado?',
    'opts': [
      ('A', 'Las palancas de mando mecánicas'),
      ('B', 'La palanca de flaps exclusivamente'),
      ('C', 'El módulo digital BCM (Brake Control Module) que modula electrohidráulicamente la presión en cada conjunto de frenos de disco de carbono'),
      ('D', 'El piloto automático GFC')
    ],
    'obj': 'AOM E195-E2 - Sistema de Control de Frenos (BCM / Carbon Brakes)',
    'exp': 'El BCM monitoriza la velocidad angular de cada rueda mediante transductores de tacómetro, aliviando la presión para evitar bloqueos y optimizar la parada.',
    'refs': ['AOM E195-E2 Capítulo 15 Landing Gear & Brakes']
  },
  {
    'num': 20, 'ans': 'D', 'subj': 'cmd_e2_systems',
    'stem': '¿Qué función cumple el sistema de frenado automático (Autobrake) en el modo RTO (Rejected Takeoff)?',
    'opts': [
      ('A', 'Aplica frenado suave para no asustar al pasaje'),
      ('B', 'Solo frena la rueda de morro'),
      ('C', 'Acelera los motores al máximo'),
      ('D', 'Aplica automáticamente la máxima presión hidráulica de frenado disponible tan pronto como los mandos de potencia se retrasan a ralentí a velocidades superiores a 60 KIAS')
    ],
    'obj': 'AOM E195-E2 - Modo Autobrake RTO',
    'exp': 'Al seleccionar RTO en el despegue, si se aborta por encima de 60 KIAS y se cortan gases, el sistema aplica inmediatamente la máxima fuerza de frenado hidráulico.',
    'refs': ['AOM E195-E2 Capítulo 15']
  },
  {
    'num': 21, 'ans': 'A', 'subj': 'cmd_e2_systems',
    'stem': 'En caso de abortar el despegue (RTO) a alta velocidad (cerca de V1) en el Embraer 195-E2, ¿qué precaución crítica debe tener la tripulación respecto a la temperatura de frenos?',
    'opts': [
      ('A', 'Monitorizar la indicación de temperatura de frenos en la sinóptica del MFD y coordinar con los bomberos de pista (RFFS), no aplicando el freno de estacionamiento a menos que sea imprescindible para evitar la soldadura de discos'),
      ('B', 'Despegar de inmediato para enfriar los frenos en el aire'),
      ('C', 'Regar los frenos con cubos de agua fría inmediatamente'),
      ('D', 'Apagar todos los generadores eléctricos')
    ],
    'obj': 'SOPM / QRH E195-E2 - Gestión Térmica de Frenos tras RTO',
    'exp': 'Tras un RTO de alta energía los frenos de carbono alcanzan cientos de grados. Se debe evitar el parking brake para no fusionar los conjuntos y solicitar asistencia RFFS.',
    'refs': ['SOPM E195-E2 Emergency Procedures - High Energy RTO', 'QRH E195-E2']
  },
  {
    'num': 22, 'ans': 'B', 'subj': 'cmd_e2_systems',
    'stem': '¿Cuál es la función del sistema de presurización en modo \"DUMP\" activado mediante el pulsador de cabina en el E195-E2?',
    'opts': [
      ('A', 'Llenar los depósitos de agua de los lavabos'),
      ('B', 'Abre completamente la válvula de escape de flujo (Outflow Valve) y apaga la recirculación para igualar rápidamente la presión de cabina con la exterior (hasta 12.400 ft) en caso de humo o evacuación'),
      ('C', 'Lanza combustible fuera del avión'),
      ('D', 'Dispara los extintores de motor')
    ],
    'obj': 'AOM E195-E2 - Pulsador CABIN DUMP',
    'exp': 'El pulsador DUMP despresuriza rápidamente la cabina abriendo la Outflow Valve para evacuación de humo o apertura de puertas en emergencia.',
    'refs': ['AOM E195-E2 Capítulo 6 Air Conditioning & Pressurization']
  },
  {
    'num': 23, 'ans': 'C', 'subj': 'cmd_e2_systems',
    'stem': 'En la suite de aviónica Honeywell Primus Epic 2 del Embraer 195-E2, ¿qué pantallas componen el panel de instrumentos principal de la cabina de pilotaje?',
    'opts': [
      ('A', '6 pantallas de tubo de rayos catódicos tradicionales'),
      ('B', '2 relojes analógicos y 1 iPad'),
      ('C', '4 pantallas LCD panorámicas de gran formato (DU 1 a DU 4) de 13x10 pulgadas de alta resolución'),
      ('D', '8 pantallas táctiles pequeñas')
    ],
    'obj': 'AOM E195-E2 - Arquitectura de Pantallas Primus Epic 2 (4 DUs)',
    'exp': 'La cabina dispone de 4 pantallas panorámicas de cristal líquido (Display Units) que presentan PFD y MFD de forma flexible y redundante.',
    'refs': ['AOM E195-E2 Capítulo 16 Avionics Suite Primus Epic 2']
  },
  {
    'num': 24, 'ans': 'D', 'subj': 'cmd_e2_systems',
    'stem': '¿Qué función cumple la Synthetic Vision System (SVS) integrada en el PFD del Primus Epic 2?',
    'opts': [
      ('A', 'Controla la potencia de los motores'),
      ('B', 'Calcula la masa y centrado en vuelo'),
      ('C', 'Sustituye a la tripulación en el aterrizaje'),
      ('D', 'Presenta una representación gráfica tridimensional en tiempo real del terreno, obstáculos, pistas y entorno exterior basada en base de datos topográfica y posición GPS/IRS')
    ],
    'obj': 'AOM E195-E2 - Visión Sintética (SVS)',
    'exp': 'La Visión Sintética proyecta el relieve del terreno y la pista en 3D en el PFD para aumentar la consciencia situacional nocturna y en IMC.',
    'refs': ['AOM E195-E2 Capítulo 16 Avionics']
  },
  {
    'num': 25, 'ans': 'A', 'subj': 'cmd_dispatch_mel',
    'stem': 'Si durante la inspección prevuelo exterior se detecta que falta una descarga estática (Static Discharger) en el empenaje o ala del E195-E2, ¿qué documento técnico regula su despacho?',
    'opts': [
      ('A', 'La Lista de Desviaciones de Configuración (CDL - Configuration Deviation List) contenida en el DDPM / AFM'),
      ('B', 'El manual de catering'),
      ('C', 'El manual de ventas de pasaje'),
      ('D', 'El libro de quejas de cabina')
    ],
    'obj': 'DDPM Sección 4 - Despacho de Descargadores Estáticos en la CDL',
    'exp': 'Los elementos aerodinámicos o secundarios faltantes en el exterior de la aeronave (como descargadores de estática o tapas) se despachan a través de la CDL.',
    'refs': ['DDPM Sección 4 CDL ATA 23 Static Dischargers', 'AFM E195-E2']
  },
  {
    'num': 26, 'ans': 'B', 'subj': 'cmd_dispatch_mel',
    'stem': 'En la CDL del Embraer 195-E2, ¿qué tipo de penalizaciones operacionales se asocian habitualmente a los elementos exteriores faltantes?',
    'opts': [
      ('A', 'Reducción del número de pasajeros a la mitad'),
      ('B', 'Penalizaciones de masa máxima de despegue/aterrizaje (Weight Penalty) o incrementos porcentuales en el consumo de combustible de crucero (Fuel Burn Penalty) debido al aumento de resistencia parásita'),
      ('C', 'Prohibición de aterrizar con viento de cara'),
      ('D', 'Obligación de volar con el tren extendido')
    ],
    'obj': 'DDPM Sección 4 - Penalizaciones CDL (Weight & Fuel Drag Penalties)',
    'exp': 'Los ítems CDL imponen reducciones en los límites de peso o incrementos de consumo por aumento de resistencia aerodinámica.',
    'refs': ['DDPM Sección 4 CDL Preamble']
  },
  {
    'num': 27, 'ans': 'C', 'subj': 'cmd_e2_systems',
    'stem': '¿Cómo se abastece y conmuta la alimentación de combustible entre los motores en vuelo si se produce un desbalance en el E195-E2?',
    'opts': [
      ('A', 'Mediante trasvase directo de combustible de un tanque alar al otro mediante bombas de trasvase alar'),
      ('B', 'Abriendo la válvula de vertido al exterior'),
      ('C', 'Abriendo la válvula de alimentación cruzada (Crossfeed Valve a LOW 1 o LOW 2), alimentando ambos motores desde el tanque que contiene mayor cantidad de combustible'),
      ('D', 'Apagando el motor del lado con menos combustible')
    ],
    'obj': 'AOM E195-E2 - Procedimiento de Crossfeed de Combustible',
    'exp': 'El E195-E2 no trasvasa combustible entre alas; el crossfeed alimenta ambos motores desde el tanque con más combustible hasta corregir el desbalance.',
    'refs': ['AOM E195-E2 Capítulo 12 Fuel System']
  },
  {
    'num': 28, 'ans': 'D', 'subj': 'cmd_e2_systems',
    'stem': '¿Qué tipo de extintores fijos de fuego equipa el compartimento de carga (bodegas) del Embraer 195-E2?',
    'opts': [
      ('A', 'Extintores de agua a presión'),
      ('B', 'Extintores de CO2 manuales únicamente'),
      ('C', 'Sistema de espuma química en polvo'),
      ('D', 'Sistema de extinción por gas Halón con dos botellas: una de descarga rápida inmediata (High-Rate Bottle) y una de descarga lenta dosificada continua (Low-Rate Metered Bottle) para mantener la concentración durante el vuelo hasta el aterrizaje')
    ],
    'obj': 'AOM E195-E2 - Sistema de Extinción de Bodega (High-Rate / Metered Discharge)',
    'exp': 'El sistema de bodegas cuenta con 2 botellas de halón: descarga inicial rápida para extinguir la llama y descarga lenta continua para evitar la reignición durante el desvío.',
    'refs': ['AOM E195-E2 Capítulo 8 Fire Protection']
  },
  {
    'num': 29, 'ans': 'A', 'subj': 'cmd_e2_systems',
    'stem': 'En la protección contra el fuego de motores y APU en el Embraer 195-E2:',
    'opts': [
      ('A', 'Los motores disponen de 2 botellas extintoras de halón compartidas y el APU dispone de 1 botella extintora dedicada con capacidad de descarga automática en tierra'),
      ('B', 'El APU no tiene extintor'),
      ('C', 'Los motores tienen 6 botellas'),
      ('D', 'Solo se apagan cortando el combustible')
    ],
    'obj': 'AOM E195-E2 - Protección contra Incendios en Motores y APU',
    'exp': 'Cada motor puede recibir hasta 2 disparos de las botellas de halón compartidas; el APU tiene 1 botella que se dispara automáticamente si detecta fuego en tierra con motores parados.',
    'refs': ['AOM E195-E2 Capítulo 8 Fire Protection']
  },
  {
    'num': 30, 'ans': 'B', 'subj': 'cmd_e2_systems',
    'stem': '¿Qué función cumple el sistema TCAS II Versión 7.1 instalado en el Embraer 195-E2 ante un encuentro de tráfico conflictivo?',
    'opts': [
      ('A', 'Maniobra el timón de dirección para virar a la derecha automáticamente'),
      ('B', 'Genera avisos de tráfico (TA) sonoros y visuales y avisos de resolución (RA) verticales en el PFD instruyendo regímenes específicos de ascenso o descenso (o inversión de maniobra) para garantizar separación vertical'),
      ('C', 'Apaga el transpondedor del avión intruso'),
      ('D', 'Frena el avión en el aire')
    ],
    'obj': 'AOM E195-E2 - TCAS II Versión 7.1',
    'exp': 'El TCAS 7.1 emite TAs preventivos y RAs verticales coordinados entre aeronaves para evitar colisiones aéreas.',
    'refs': ['AOM E195-E2 Capítulo 16 Navigation']
  },
  {
    'num': 31, 'ans': 'C', 'subj': 'cmd_performance',
    'stem': '¿Cómo se define la velocidad de decisión de despegue (V1) en la certificación de reactores de transporte como el E195-E2?',
    'opts': [
      ('A', 'La velocidad a la que el avión empieza a volar'),
      ('B', 'La velocidad máxima a la que se pueden extender los flaps'),
      ('C', 'La velocidad máxima a la que el piloto puede iniciar la primera acción de frenado/aborto de despegue y la velocidad mínima a la que el despegue debe continuarse con seguridad en caso de fallo del motor crítico'),
      ('D', 'La velocidad de contacto de la rueda de morro')
    ],
    'obj': 'Performance E195-E2 / CS-25 - Definición Operacional de V1',
    'exp': 'V1 es la velocidad límite de decisión: antes de V1 se aborta ante cualquier fallo grave; superada V1 el despegue se continúa obligatoriamente.',
    'refs': ['AFM E195-E2 Sección 1 Performance', 'SOPM Takeoff Briefing']
  },
  {
    'num': 32, 'ans': 'D', 'subj': 'cmd_performance',
    'stem': '¿Qué define la velocidad de rotación (Vr) y la velocidad de seguridad en el despegue (V2) en el Embraer 195-E2?',
    'opts': [
      ('A', 'Vr es la velocidad de parada y V2 es la de crucero'),
      ('B', 'Vr es la velocidad de flaps y V2 la de tren'),
      ('C', 'Vr es la velocidad de turbulencia y V2 la de planeo'),
      ('D', 'Vr es la velocidad a la que se inicia la maniobra de rotación para adoptar la actitud de ascenso, y V2 es la velocidad mínima que se debe alcanzar a 35 ft sobre la pista con un motor inoperativo (Takeoff Safety Speed)')
    ],
    'obj': 'Performance E195-E2 - Definición de Vr y V2',
    'exp': 'Vr inicia la rotación a régimen constante (aprox. 3°/s); V2 garantiza el gradiente de ascenso reglamentario en el segundo segmento con N-1.',
    'refs': ['AFM E195-E2 Sección 1', 'AOM Performance']
  },
  {
    'num': 33, 'ans': 'A', 'subj': 'cmd_flight_ground_ops',
    'stem': 'En la operativa de reabastecimiento de combustible con pasajeros embarcando o a bordo:',
    'opts': [
      ('A', 'Debe estar informada la tripulación, la señal de no fumar encendida, la señal de cinturones apagada, los pasillos despejados, las puertas principales practicables con medios de evacuación listos y comunicación establecida con el personal de repostaje'),
      ('B', 'Los pasajeros deben permanecer con cinturones abrochados'),
      ('C', 'Se prohíbe terminantemente el repostaje con pasajeros a bordo en todos los casos'),
      ('D', 'Los motores deben estar encendidos al ralentí')
    ],
    'obj': 'MOA 8.2.1 / EASA - Repostaje con Pasaje a Bordo',
    'exp': 'Se autoriza el repostaje con pasaje asegurando cinturones desabrochados, pasillos libres, salidas operativas y coordinación constante con el operador de combustible.',
    'refs': ['MOA Binter 8.2.1 Procedimientos de Combustible']
  },
  {
    'num': 34, 'ans': 'B', 'subj': 'cmd_e2_systems',
    'stem': '¿Qué elementos calefactores eléctricos (Electrical Ice Protection) están activos permanentemente en el suelo y en vuelo en el Embraer 195-E2?',
    'opts': [
      ('A', 'Los bordes de ataque de las alas'),
      ('B', 'Los tubos Pitot primarios y secundarios, tomas de presión estática, sondas de ángulo de ataque (AOA) y sensores TAT (Total Air Temperature) gobernados automáticamente por los ADSPs'),
      ('C', 'Las luces de navegación'),
      ('D', 'Los neumáticos del tren de aterrizaje')
    ],
    'obj': 'AOM E195-E2 - Protección Eléctrica de Sensores de Aire (ADSPs / Sondas)',
    'exp': 'Las sondas de datos de aire inteligentes (ADSPs), sensores AOA y TAT cuentan con calefacción eléctrica automática para prevenir bloqueos de presión en cualquier fase de vuelo.',
    'refs': ['AOM E195-E2 Capítulo 11 Ice & Rain Protection']
  },
  {
    'num': 35, 'ans': 'C', 'subj': 'cmd_e2_systems',
    'stem': '¿Cuál es la función del sistema de presurización en modo manual (Manual Pressurization Control)?',
    'opts': [
      ('A', 'Abre las puertas de pasaje en vuelo'),
      ('B', 'Apaga los packs de aire acondicionado'),
      ('C', 'Permite a los pilotos controlar directamente la apertura y cierre de la Outflow Valve mediante el mando basculante manual en el panel superior si fallan ambos controladores automáticos (ECMs)'),
      ('D', 'Inyecta oxígeno en los motores')
    ],
    'obj': 'AOM E195-E2 - Control Manual de Presurización',
    'exp': 'El modo manual se utiliza en caso de fallo de ambos canales automáticos de presurización, accionando directamente la válvula de escape.',
    'refs': ['AOM E195-E2 Capítulo 6 Air Conditioning & Pressurization']
  },
  {
    'num': 36, 'ans': 'D', 'subj': 'cmd_dispatch_mel',
    'stem': 'En la MEL del Embraer 195-E2, ¿qué indica la presencia de una marca (M) junto al código de un ítem diferido?',
    'opts': [
      ('A', 'Que es un procedimiento exclusivo para el comandante'),
      ('B', 'Que solo aplica en condiciones meteorológicas de niebla'),
      ('C', 'Que el ítem puede permanecer inoperativo durante 1 año'),
      ('D', 'Que el ítem requiere una acción técnica previa obligatoria por parte del personal de mantenimiento cualificado (como bloqueo mecánico, desconexión eléctrica o precintado) antes del despacho')
    ],
    'obj': 'MEL / DDPM - Procedimientos de Mantenimiento (M)',
    'exp': 'Los procedimientos (M) exigen tareas físicas de mantenimiento por personal de TMA certificado con registro previo en el ATL antes del vuelo.',
    'refs': ['MEL EMB BA RN24 Preámbulo', 'DDPM Sección 3']
  },
  {
    'num': 37, 'ans': 'A', 'subj': 'cmd_e2_systems',
    'stem': 'En la operación del radar meteorológico Honeywell RDR-4000 con tecnología 3D Volumetric Scanning en el E195-E2:',
    'opts': [
      ('A', 'El radar escanea automáticamente el volumen atmosférico frontal desde 0 hasta 60.000 ft y almacena los datos en memoria, mostrando cortes transversales de tormentas, cizalladura (Windshear) y turbulencia sin necesidad de ajustar manualmente la inclinación de antena (Tilt)'),
      ('B', 'El piloto debe girar la antena con manivela manual'),
      ('C', 'Solo detecta nubes si llueve en el aeropuerto'),
      ('D', 'Requiere apagar el piloto automático')
    ],
    'obj': 'AOM E195-E2 - Radar Meteorológico 3D RDR-4000',
    'exp': 'El RDR-4000 realiza barridos volumétricos automáticos continuos generando mapas tridimensionales de reflectividad, cizalladura predictiva y turbulencia.',
    'refs': ['AOM E195-E2 Capítulo 16 Avionics']
  },
  {
    'num': 38, 'ans': 'B', 'subj': 'cmd_flight_planning',
    'stem': '¿Cuál es la función del cálculo de combustible de reserva para desvío a alternativo (Alternate Fuel)?',
    'opts': [
      ('A', 'Volar durante 2 horas en espera sobre el alternativo'),
      ('B', 'Cubrir la frustrada en el destino (Go-Around), el ascenso, crucero en ruta hasta el alternativo, el descenso, la aproximación instrumental completa y el aterrizaje en el aeródromo alternativo seleccionado'),
      ('C', 'Alimentar únicamente la APU en tierra'),
      ('D', 'Cubrir el rodaje en el alternativo')
    ],
    'obj': 'MOA 8.1.7 - Cómputo del Combustible de Alternativo (Alternate Fuel)',
    'exp': 'El Alternate Fuel incluye el perfil completo: frustrada desde DA/MDA en destino, ascenso en ruta, crucero a FL óptimo, descenso y aproximación en el alternativo.',
    'refs': ['MOA Binter 8.1.7 Combustible']
  },
  {
    'num': 39, 'ans': 'C', 'subj': 'cmd_emergency',
    'stem': 'Ante un fallo de presurización rápido (Rapid Depressurization) en altitud de crucero en el E195-E2, ¿cuál es la primera acción de memoria (Memory Item) inmediata de los pilotos?',
    'opts': [
      ('A', 'Buscar el manual de vuelo en la cartera'),
      ('B', 'Declarar emergencia por radio antes de colocarse la máscara'),
      ('C', 'Colocarse de inmediato las máscaras de oxígeno al 100% de flujo y establecer comunicación entre ambos tripulantes de vuelo vía interfono (OXYGEN MASKS: DON, 100%, CREW COMM: ESTABLISH)'),
      ('D', 'Desconectar el piloto automático y picar a fondo')
    ],
    'obj': 'QRH E195-E2 - Memory Items: Despresurización Rápida de Cabina',
    'exp': 'El tiempo de conciencia útil a FL410 es de segundos; el primer paso ineludible es colocarse y asegurarse la máscara de oxígeno al 100% y verificar comunicación.',
    'refs': ['QRH E195-E2 Emergency Procedures - Cabin Altitude Hi', 'SOPM E195-E2']
  },
  {
    'num': 40, 'ans': 'D', 'subj': 'cmd_emergency',
    'stem': 'Durante el descenso de emergencia (Emergency Descent) en el Embraer 195-E2:',
    'opts': [
      ('A', 'Se seleccionan Flaps Full y tren de aterrizaje abajo a 400 nudos'),
      ('B', 'Se apagan los motores'),
      ('C', 'Se vira 180° a velocidad de pérdida'),
      ('D', 'Se seleccionan palancas de potencia en IDLE, se extienden completamente los Speed Brakes (aerofrenos), se ajusta velocidad máxima Vmo/Mmo (o velocidad estructural si hay daño) y se desciende hacia 10.000 ft o la MEA/MORA')
    ],
    'obj': 'QRH / SOPM E195-E2 - Procedimiento de Descenso de Emergencia',
    'exp': 'El descenso de emergencia busca perder altitud al máximo régimen seguro mediante aerofrenos extendidos, gases cortados y velocidad de penetración máxima.',
    'refs': ['QRH E195-E2 Emergency Descent', 'SOPM Normal/Emergency Procedures']
  },
  {
    'num': 41, 'ans': 'A', 'subj': 'cmd_e2_systems',
    'stem': '¿Qué función cumple la válvula de aislamiento de purga de aire (Bleed Crossbleed Valve) en el sistema neumático del E195-E2?',
    'opts': [
      ('A', 'Permite interconectar los conductos neumáticos izquierdo y derecho para suministrar aire a ambos packs o permitir el arranque cruzado de motor (Crossbleed Engine Start)'),
      ('B', 'Expulsa el aire sobrante fuera del ala'),
      ('C', 'Presuriza el tanque de combustible'),
      ('D', 'Refrigera los frenos del tren principal')
    ],
    'obj': 'AOM E195-E2 - Sistema Neumático y Crossbleed Valve',
    'exp': 'La válvula crossbleed comunica los colectores de sangrado de ambos motores permitiendo alimentar el sistema neumático con un solo motor o APU.',
    'refs': ['AOM E195-E2 Capítulo 10 Pneumatic System']
  },
  {
    'num': 42, 'ans': 'B', 'subj': 'cmd_e2_systems',
    'stem': 'En caso de aproximación con fallo de un motor (Single Engine Approach / N-1) en el Embraer 195-E2, ¿cuál es la configuración de flaps estándar de aterrizaje recomendada por el fabricante y el SOPM?',
    'opts': [
      ('A', 'Flaps FULL únicamente'),
      ('B', 'Flaps 5 (o Flaps 4 según manual de operaciones para optimizar el margen de ascenso en frustrada con un motor)'),
      ('C', 'Aterrizaje sin flaps obligatorio'),
      ('D', 'Flaps 1')
    ],
    'obj': 'QRH / SOPM E195-E2 - Aterrizaje N-1 (Flaps 5 / Flap 4)',
    'exp': 'En aproximación monomotor se utiliza Flap 5 (o Flap 4) para reducir la resistencia aerodinámica y asegurar el gradiente reglamentario de motor y al aire con N-1.',
    'refs': ['QRH E195-E2 Single Engine Procedures', 'SOPM E195-E2']
  },
  {
    'num': 43, 'ans': 'C', 'subj': 'cmd_flight_planning',
    'stem': '¿Cuál es la política operacional de Binter respecto al combustible adicional (\"Extra Fuel\" / \"Captain Discretionary Fuel\")?',
    'opts': [
      ('A', 'Está terminantemente prohibido añadir combustible adicional al plan de vuelo'),
      ('B', 'Debe solicitarse por escrito al Director General 24 horas antes'),
      ('C', 'El comandante tiene la potestad de añadir combustible extra justificado por meteorología adversa, esperas previstas, contingencias operacionales o limitaciones de aeródromo'),
      ('D', 'Solo se permite en vuelos internacionales de más de 3 horas')
    ],
    'obj': 'MOA 8.1.7 - Discrecionalidad del Comandante en Extra Fuel',
    'exp': 'El comandante tiene la autoridad última y responsabilidad de cargar combustible adicional en función de las condiciones operacionales previstas.',
    'refs': ['MOA Binter 8.1.7 Política de Combustible']
  },
  {
    'num': 44, 'ans': 'D', 'subj': 'cmd_e2_systems',
    'stem': 'En la protección de sobrevelocidad de la aeronave, ¿qué aviso acústico y visual genera el sistema EICAS si se supera la velocidad máxima operativa (Vmo / Mmo)?',
    'opts': [
      ('A', 'Un mensaje informativo blanco sin sonido'),
      ('B', 'Una campana suave'),
      ('C', 'Una luz verde en el pedestal central'),
      ('D', 'Aviso visual en rojo de sobrevelocidad en la cinta del anemómetro del PFD y tono acústico continuo tipo \"Overspeed Clacker / Siren\" en los auriculares y altavoces de cabina')
    ],
    'obj': 'AOM E195-E2 - Aviso de Sobrevelocidad (Overspeed Warning)',
    'exp': 'Al superar Vmo/Mmo se dispara inmediatamente el clacker sonoro de alta prioridad y la advertencia roja en el velocímetro hasta reducir la velocidad.',
    'refs': ['AOM E195-E2 Capítulo 3 Warning System']
  },
  {
    'num': 45, 'ans': 'A', 'subj': 'cmd_flight_ground_ops',
    'stem': 'En el procedimiento de despegue con viento en cola (Tailwind Takeoff), ¿cuál es la limitación máxima de viento en cola permitida por el AFM en el Embraer 195-E2?',
    'opts': [
      ('A', '10 nudos de viento en cola (o hasta 15 nudos si está específicamente certificado en el suplemento del AFM)'),
      ('B', '20 nudos'),
      ('C', '25 nudos'),
      ('D', 'No está permitido el despegue con viento en cola bajo ningún concepto')
    ],
    'obj': 'AFM E195-E2 - Limitación Máxima de Viento en Cola (10 / 15 kts)',
    'exp': 'El límite operativo estándar certificado para componentes de viento en cola en despegue y aterrizaje es de 10 nudos (ampliable a 15 kts con suplemento del AFM).',
    'refs': ['AFM E195-E2 Sección 2 Limitaciones']
  },
  {
    'num': 46, 'ans': 'B', 'subj': 'cmd_e2_systems',
    'stem': '¿Qué función desempeña el sistema Stick Pusher (Empujador de Palanca) en el sistema de protección contra la pérdida (Stall Protection) del E195-E2?',
    'opts': [
      ('A', 'Tira de la palanca hacia atrás cuando el avión aterriza'),
      ('B', 'Aplica una fuerza automática y decidida hacia adelante en las palancas de mando de ambos pilotos para reducir el ángulo de ataque si se alcanzan valores críticos de pérdida aerodinámica inminente'),
      ('C', 'Bloquea el timón de dirección'),
      ('D', 'Extiende los aerofrenos')
    ],
    'obj': 'AOM E195-E2 - Stick Pusher y Protección contra la Pérdida',
    'exp': 'El Stick Pusher interviene activamente empujando los mandos hacia adelante para reducir el ángulo de ataque y recuperar el flujo laminar sobre el ala antes de la pérdida completa.',
    'refs': ['AOM E195-E2 Capítulo 9 Flight Controls']
  },
  {
    'num': 47, 'ans': 'C', 'subj': 'cmd_dispatch_mel',
    'stem': 'Si durante el rodaje previo al despegue aparece un fallo en el EICAS de un sistema que NO está en la MEL:',
    'opts': [
      ('A', 'El comandante puede continuar el despegue si el destino tiene buen tiempo'),
      ('B', 'Se puede ignorar el mensaje apagando la pantalla MFD'),
      ('C', 'El avión no está en condiciones de aeronavegabilidad legal para el despegue; se debe regresar a calzos o consultar con mantenimiento/CCO antes de iniciar la carrera de despegue'),
      ('D', 'Se puede anotar en el ATL al aterrizar en destino')
    ],
    'obj': 'MOA 8.1.1 / EASA - Filosofía de Fallos antes del Despegue',
    'exp': 'Aparecido un fallo antes del inicio de la carrera de despegue, si el elemento no es diferible por la MEL o requiere acciones no cumplidas, el despegue está prohibido.',
    'refs': ['MOA Binter 8.1.1', 'MEL Preámbulo']
  },
  {
    'num': 48, 'ans': 'D', 'subj': 'cmd_e2_systems',
    'stem': 'En la arquitectura de comunicaciones por enlace de datos (Data Link / CPDLC / ACARS) en el Embraer 195-E2:',
    'opts': [
      ('A', 'Solo funciona con conexión Bluetooth en tierra'),
      ('B', 'Solo se utiliza para enviar correos electrónicos personales'),
      ('C', 'Sustituye a los mandos de vuelo'),
      ('D', 'Permite la recepción de planes de vuelo, partes meteorológicos D-ATIS/METAR, autorizaciones de salida DCL, comunicaciones ATC por CPDLC y reportes automáticos de mantenimiento OOOI (Out-Off-On-In) a la compañía')
    ],
    'obj': 'AOM E195-E2 / MGNT 30 - Sistema Data Link (CPDLC / ACARS)',
    'exp': 'El sistema Data Link integra comunicaciones de texto ATS con el control aéreo y mensajes automáticos operacionales ACARS con el CCO de Binter.',
    'refs': ['MGNT 30 Data Link Binter', 'AOM E195-E2 Capítulo 5 Communications']
  },
  {
    'num': 49, 'ans': 'A', 'subj': 'cmd_performance',
    'stem': '¿Qué efecto tiene el sangrado de aire de los motores para aire acondicionado y antihielo (Bleeds ON / Anti-Ice ON) sobre las prestaciones de despegue?',
    'opts': [
      ('A', 'Reduce el empuje neto disponible del motor, incrementando la carrera de despegue y penalizando el peso máximo admisible de despegue (MTOW)'),
      ('B', 'Aumenta el empuje en un 10%'),
      ('C', 'No produce ningún efecto en las prestaciones'),
      ('D', 'Reduce la temperatura de gases de escape (EGT)')
    ],
    'obj': 'Performance E195-E2 - Efecto de Sangrados (Bleeds) en el Despegue',
    'exp': 'La extracción de aire comprimido del compresor disminuye el caudal de masa de gas para la turbina, reduciendo el empuje y aumentando las distancias de pista requeridas.',
    'refs': ['AFM E195-E2 Performance', 'AOM Performance']
  },
  {
    'num': 50, 'ans': 'B', 'subj': 'cmd_e2_systems',
    'stem': '¿Cuál es la función del sistema de orientación de la rueda de morro (Nosewheel Steering) en el E195-E2 y cuáles son sus límites de deflexión con los pedales y con el volante de mano (Tiller)?',
    'opts': [
      ('A', 'Pedales +/- 20° y Tiller +/- 30°'),
      ('B', 'Control por pedales de +/- 8° (para control direccional en carrera de despegue y toma) y control por volante de mano (Tiller) de hasta +/- 76° para maniobras de giro cerrado en rodaje'),
      ('C', 'Pedales +/- 45° y Tiller +/- 90°'),
      ('D', 'El tren de morro no es orientable por pedales')
    ],
    'obj': 'AOM E195-E2 - Sistema de Dirección del Tren de Morro (Rudder +/-8° / Tiller +/-76°)',
    'exp': 'La dirección electrohidráulica de morro ofrece +/- 8° con los pedales de timón para alta velocidad y hasta +/- 76° con el volante de rodaje (Tiller) en plataforma.',
    'refs': ['AOM E195-E2 Capítulo 15 Landing Gear']
  }
]

final_data_lote4 = []
for q in raw_lote4:
    options_list = []
    for opt_id, opt_text in q['opts']:
        options_list.append({
            'id': opt_id,
            'text': opt_text,
            'is_correct': (opt_id == q['ans'])
        })
    item = {
        'id': f'CMD-E2-{q["num"]:03d}',
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
    final_data_lote4.append(item)

out_file = 'banks/command-upgrade/flujo-despacho-mel-ddpm-cdl/e195e2_despacho_sistemas_profundizacion.json'
with open(out_file, 'w', encoding='utf-8') as f:
    json.dump(final_data_lote4, f, ensure_ascii=False, indent=2)

print(f'[SUCCESS] {len(final_data_lote4)} reactivos de Lote 4 escritos en {out_file}')
