import json

raw_lote3 = [
  {
    'num': 1, 'ans': 'A', 'subj': 'cmd_flight_planning',
    'stem': 'Según el MOA 8.1.7.2.5 (Tabla 1A: Plan Básico con Variaciones), ¿cuáles son los mínimos de planificación para un aeródromo alternativo con dos o más operaciones de aproximación por instrumentos Tipo B (de precisión) a dos pistas separadas?',
    'opts': [
      ('A', 'Techo: DA/H + 100 ft; Visibilidad/RVR: RVR + 300 m'),
      ('B', 'Techo: DA/H + 200 ft; Visibilidad/RVR: RVR + 800 m'),
      ('C', 'Techo: DA/H + 150 ft; Visibilidad/RVR: RVR + 450 m'),
      ('D', 'Techo: Mínimos de CAT I puros')
    ],
    'obj': 'MOA 8.1.7.2.5 Tabla 1A - Mínimos Plan Básico con Variaciones (2 pistas Tipo B)',
    'exp': 'En el Plan Básico con Variaciones (Tabla 1A), cuando se dispone de dos o más aproximaciones Tipo B en uso a pistas separadas, el incremento reglamentario es DA/H + 100 ft y RVR + 300 m.',
    'refs': ['MOA Binter 8.1.7.2.5 Tabla 1A', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 6-7']
  },
  {
    'num': 2, 'ans': 'C', 'subj': 'cmd_flight_planning',
    'stem': 'En la Tabla 1A del MOA 8.1.7.2.5, si el aeródromo alternativo dispone de una única operación de aproximación por instrumentos de Tipo B en uso, ¿qué incremento se debe aplicar a los mínimos?',
    'opts': [
      ('A', 'DA/H + 100 ft y RVR + 300 m'),
      ('B', 'DA/H + 200 ft y RVR + 800 m'),
      ('C', 'DA/H + 150 ft y RVR + 450 m'),
      ('D', 'MDA/H + 400 ft y VIS + 1500 m')
    ],
    'obj': 'MOA 8.1.7.2.5 Tabla 1A - Mínimos Plan con Variaciones (1 aproximación Tipo B)',
    'exp': 'Para una sola aproximación Tipo B en servicio en el alternativo, los mínimos de planificación son DA/H + 150 ft y RVR + 450 m.',
    'refs': ['MOA Binter 8.1.7.2.5 Tabla 1A']
  },
  {
    'num': 3, 'ans': 'B', 'subj': 'cmd_flight_planning',
    'stem': '¿Qué requisitos organizativos y técnicos exige la autoridad para que Binter pueda acogerse al Plan Básico con Variaciones en la planificación de alternativos?',
    'opts': [
      ('A', 'Flota 100% reactor y dos pilotos de mando en cabina'),
      ('B', 'Sistema de Seguimiento de Vuelo (Flight Monitoring), aprobación de operaciones LVO y sistema automatizado de planificación de vuelos'),
      ('C', 'Autorización de ETOPS 120 minutos y radar meteorológico Doppler'),
      ('D', 'Contar con despachador presencial en todos los aeropuertos de destino')
    ],
    'obj': 'MOA 8.1.7.2.5 - Requisitos Operacionales para Plan con Variaciones',
    'exp': 'El operador debe disponer de Flight Monitoring activo, aprobación operacional para operaciones todo tiempo (LVO) y un sistema computarizado de planificación de vuelos.',
    'refs': ['MOA Binter 8.1.7.2.5', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 6']
  },
  {
    'num': 4, 'ans': 'A', 'subj': 'cmd_flight_planning',
    'stem': 'En el Plan Básico Estándar sin Variaciones (MOA 8.1.7.2.6 / Tabla 1B), ¿cuál es el incremento aplicable a las aproximaciones instrumentales Tipo B en el alternativo?',
    'opts': [
      ('A', 'Base del techo: DA/H + 200 ft; Visibilidad: RVR/VIS + 800 m'),
      ('B', 'Base del techo: DA/H + 100 ft; Visibilidad: RVR + 300 m'),
      ('C', 'Base del techo: DA/H + 150 ft; Visibilidad: RVR + 450 m'),
      ('D', 'Base del techo: DA/H + 400 ft; Visibilidad: RVR + 1500 m')
    ],
    'obj': 'MOA 8.1.7.2.6 Tabla 1B - Plan Básico sin Variaciones (Tipo B)',
    'exp': 'En el Plan Básico tradicional sin variaciones (Tabla 1B), las aproximaciones Tipo B requieren sumar DA/H + 200 ft y RVR/VIS + 800 m.',
    'refs': ['MOA Binter 8.1.7.2.6 Tabla 1B']
  },
  {
    'num': 5, 'ans': 'D', 'subj': 'cmd_flight_planning',
    'stem': 'Para aproximaciones de No Precisión (Tipo A) en el Plan Básico (Tabla 1B), ¿cuál es el margen de planificación exigido?',
    'opts': [
      ('A', 'DA/H + 100 ft y RVR + 300 m'),
      ('B', 'DA/H + 200 ft y RVR + 800 m'),
      ('C', 'MDA/H + 200 ft y VIS + 1000 m'),
      ('D', 'DA/H o MDA/H + 400 ft y RVR/VIS + 1500 m')
    ],
    'obj': 'MOA 8.1.7.2.6 Tabla 1B - Plan Básico (Tipo A)',
    'exp': 'Para aproximaciones Tipo A en el Plan Básico, el incremento reglamentario es DA/MDA + 400 ft y visibilidad/RVR + 1500 m.',
    'refs': ['MOA Binter 8.1.7.2.6 Tabla 1B']
  },
  {
    'num': 6, 'ans': 'A', 'subj': 'cmd_flight_planning',
    'stem': '¿Cuál es la categoría básica de Rescate y Extinción de Incendios (RFFS) requerida para la operación de la flota Embraer 195-E2?',
    'opts': [
      ('A', 'Categoría RFFS 7 (RFFS >= 7)'),
      ('B', 'Categoría RFFS 5'),
      ('C', 'Categoría RFFS 6'),
      ('D', 'Categoría RFFS 8')
    ],
    'obj': 'MOA Cap. 8 - Categoría RFFS Base Flota E195-E2',
    'exp': 'La flota Embraer 195-E2 tiene asignada reglamentariamente la Categoría RFFS 7 en el MOA de Binter.',
    'refs': ['MOA Binter Capítulo 8 RFFS', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 5']
  },
  {
    'num': 7, 'ans': 'B', 'subj': 'cmd_flight_planning',
    'stem': 'En la fase de planificación, si el aeródromo de origen o destino sufre una degradación temporal de RFFS por NOTAM, ¿cuáles son los niveles mínimos aceptables?',
    'opts': [
      ('A', 'RFFS 4 en cualquier caso'),
      ('B', 'RFFS 6 si el NOTAM es > 72h; RFFS 5 si el NOTAM es <= 72h (con alternativo RFFS >= 7 y sin diferidos en ATA 26, 27 y 32)'),
      ('C', 'RFFS 5 si NOTAM > 72h; RFFS 4 si NOTAM <= 72h'),
      ('D', 'No se permite ninguna reducción de categoría RFFS en destino')
    ],
    'obj': 'MOA Cap. 8 - Rebaja de Categoría RFFS en Origen/Destino',
    'exp': 'Para origen/destino se autoriza RFFS 6 con NOTAM > 72h y RFFS 5 con NOTAM <= 72h, exigiendo alternativo con RFFS >= 7 y avión limpio de diferidos en protección de fuego (ATA 26), mandos de vuelo (ATA 27) y tren de aterrizaje (ATA 32).',
    'refs': ['MOA Binter Capítulo 8 RFFS']
  },
  {
    'num': 8, 'ans': 'C', 'subj': 'cmd_flight_planning',
    'stem': 'Para un aeródromo alternativo de origen o destino degradado por NOTAM, ¿qué categoría RFFS es admisible en la planificación?',
    'opts': [
      ('A', 'RFFS 6 si NOTAM > 72h; RFFS 5 si NOTAM <= 72h'),
      ('B', 'RFFS 7 en todos los casos'),
      ('C', 'RFFS 5 si NOTAM > 72h; RFFS 4 si NOTAM <= 72h (cumpliendo condicionantes de origen/destino y sistemas no diferidos)'),
      ('D', 'RFFS 3 con preaviso')
    ],
    'obj': 'MOA Cap. 8 - Rebaja de Categoría RFFS en Alternativos',
    'exp': 'En alternativos de origen/destino se admite RFFS 5 si NOTAM > 72h y RFFS 4 si NOTAM <= 72h bajo cumplimiento de los condicionantes operacionales de sistemas.',
    'refs': ['MOA Binter Capítulo 8 RFFS']
  },
  {
    'num': 9, 'ans': 'D', 'subj': 'cmd_flight_planning',
    'stem': 'Para alternativos en ruta (ERAs), si se dispone de un tiempo de preaviso de desvío inferior a 30 minutos, ¿cuál es la categoría RFFS mínima con NOTAM <= 72h?',
    'opts': [
      ('A', 'RFFS 6'),
      ('B', 'RFFS 5'),
      ('C', 'RFFS 7'),
      ('D', 'RFFS 4')
    ],
    'obj': 'MOA Cap. 8 - RFFS en Alternativos en Ruta (ERAs)',
    'exp': 'Con preaviso menor a 30 minutos y degradación por NOTAM <= 72h, la categoría RFFS mínima admisible para un ERA es RFFS 4.',
    'refs': ['MOA Binter Capítulo 8 RFFS']
  },
  {
    'num': 10, 'ans': 'A', 'subj': 'cmd_flight_planning',
    'stem': '¿Qué sistemas de la aeronave NO pueden tener ningún defecto diferido en la MEL si se despacha el vuelo hacia un aeródromo con categoría RFFS reducida?',
    'opts': [
      ('A', 'Sistema de Protección contra Incendios (ATA 26), Mandos de Vuelo (ATA 27) y Tren de Aterrizaje / Frenos (ATA 32)'),
      ('B', 'Sistema Eléctrico (ATA 24) y Sistema de Combustible (ATA 28)'),
      ('C', 'Sistema de Oxígeno (ATA 35) y Luces (ATA 33)'),
      ('D', 'Piloto Automático (ATA 22) y Radar Meteorológico (ATA 34)')
    ],
    'obj': 'MOA Cap. 8 - Sistemas Críticos No Diferibles con RFFS Reducida',
    'exp': 'El despacho a aeropuertos con RFFS degradada exige que la aeronave esté 100% operativa y libre de diferidos en los capítulos ATA 26 (Fire Protection), ATA 27 (Flight Controls) y ATA 32 (Landing Gear).',
    'refs': ['MOA Binter Capítulo 8 RFFS']
  },
  {
    'num': 11, 'ans': 'B', 'subj': 'cmd_flight_planning',
    'stem': '¿Cómo se define la Altitud Mínima de Recepción / Radar (MRA)?',
    'opts': [
      ('A', 'La altitud máxima a la que se puede volar en espera'),
      ('B', 'La altitud mínima a la que el control ATC puede vectorizar a la aeronave manteniendo cobertura radar y franqueamiento de terreno'),
      ('C', 'La altitud de decisión barométrica en un ILS CAT II'),
      ('D', 'La altitud donde se desconecta el radar primario')
    ],
    'obj': 'MOA 8.1.3 - Definición de MRA (Minimum Radar Altitude)',
    'exp': 'MRA es la altitud mínima a la que el controlador de tránsito aéreo puede efectuar guiado vectorial por radar garantizando franqueamiento seguro de obstáculos.',
    'refs': ['MOA Binter 8.1.3 Navegación']
  },
  {
    'num': 12, 'ans': 'C', 'subj': 'cmd_flight_planning',
    'stem': '¿Qué garantías proporciona la Altitud Mínima en Ruta (Minimum En-route Altitude - MEA)?',
    'opts': [
      ('A', 'Separación visual con otras aeronaves en VFR'),
      ('B', 'Cobertura de comunicaciones HF transoceánicas únicamente'),
      ('C', 'Garantiza la adecuada recepción de las radioayudas a la navegación en la aerovía y asegura un franqueamiento de obstáculos de 1000 ft dentro de un corredor de 5 NM a cada lado del eje'),
      ('D', 'Garantiza la velocidad óptima de crucero económico')
    ],
    'obj': 'MOA 8.1.3 - Definición de MEA',
    'exp': 'La MEA en una aerovía asegura la recepción continua de señales de navegación y 1000 ft de libramiento de obstáculos dentro del margen de 5 NM a ambos lados de la ruta.',
    'refs': ['MOA Binter 8.1.3']
  },
  {
    'num': 13, 'ans': 'D', 'subj': 'cmd_flight_planning',
    'stem': '¿Cómo define LIDO la Altitud Mínima de Franqueamiento de Terreno (MTCA)?',
    'opts': [
      ('A', 'La altitud del circuito de tránsito estándar'),
      ('B', 'La altitud de transición en espacio aéreo no controlado'),
      ('C', 'La altitud de nivel de crucero asignada por ATC'),
      ('D', 'La altitud calculada por LIDO en cada segmento de ruta para garantizar franqueamiento seguro del terreno más elevado en caso de descenso de emergencia')
    ],
    'obj': 'Cartografía LIDO - Definición de MTCA',
    'exp': 'La MTCA (Minimum Terrain Clearance Altitude) es calculada por LIDO y mostrada en las fichas para proporcionar margen de seguridad sobre el terreno en contingencias en ruta.',
    'refs': ['LIDO RouteManual General']
  },
  {
    'num': 14, 'ans': 'A', 'subj': 'cmd_flight_planning',
    'stem': '¿Cuál es la distancia máxima autorizada a un aeródromo adecuado en la operativa de Binter?',
    'opts': [
      ('A', '320 NM'),
      ('B', '180 NM'),
      ('C', '500 NM'),
      ('D', '250 NM')
    ],
    'obj': 'MOA 8.1.2 - Distancia Máxima a Aeródromo Adecuado (320 NM)',
    'exp': 'El MOA de Binter establece una distancia máxima de 320 NM a un aeródromo adecuado evaluado en performance y características de pista.',
    'refs': ['MOA Binter 8.1.2', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 3']
  },
  {
    'num': 15, 'ans': 'B', 'subj': 'cmd_flight_planning',
    'stem': '¿Cuáles son los anchos mínimos de pista y calle de rodaje autorizados para la operación estándar?',
    'opts': [
      ('A', 'Pista 45 m / Calle de rodaje 23 m'),
      ('B', 'Pista 30 m / Calle de rodaje 15 m'),
      ('C', 'Pista 23 m / Calle de rodaje 10 m'),
      ('D', 'Pista 18 m / Calle de rodaje 9 m')
    ],
    'obj': 'MOA 8.1.4 - Anchura Mínima de Pista (30m) y Rodaje (15m)',
    'exp': 'La anchura mínima admisible de pista es de 30 metros y la anchura mínima de calle de rodaje es de 15 metros.',
    'refs': ['MOA Binter 8.1.4.1', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 4']
  },
  {
    'num': 16, 'ans': 'C', 'subj': 'cmd_flight_planning',
    'stem': 'En la política de combustible del MOA, ¿en qué porcentaje se puede reducir el combustible de contingencia si se selecciona un alternativo en ruta por combustible (Fuel ERA)?',
    'opts': [
      ('A', 'Se reduce al 1% del Trip Fuel'),
      ('B', 'Se elimina totalmente la contingencia'),
      ('C', 'Se reduce del 5% al 3% del Trip Fuel (siempre respetando los 5 min de espera en destino: 51 kg ATR / 166 kg E195-E2)'),
      ('D', 'Se reduce al 2% fijo')
    ],
    'obj': 'MOA 8.1.7 - Reducción de Contingencia con Fuel ERA (3%)',
    'exp': 'Disponiendo de un Fuel ERA adecuado a lo largo de la ruta, el porcentaje de combustible de contingencia puede calcularse al 3% del trip fuel en vez del 5% estándar.',
    'refs': ['MOA Binter 8.1.7 Combustible de Contingencia']
  },
  {
    'num': 17, 'ans': 'D', 'subj': 'cmd_flight_planning',
    'stem': '¿Cuál es el valor en kilogramos de los 5 minutos de espera a 1500 ft en destino que marcan el mínimo de contingencia en ATR-72 y E195-E2?',
    'opts': [
      ('A', '100 kg en ATR-72 y 300 kg en E195-E2'),
      ('B', '25 kg en ATR-72 y 100 kg en E195-E2'),
      ('C', '80 kg en ATR-72 y 220 kg en E195-E2'),
      ('D', '51 kg en ATR-72 y 166 kg en E195-E2')
    ],
    'obj': 'MOA 8.1.7 - Cifras Exactas de Contingencia Mínima (51 kg / 166 kg)',
    'exp': 'El mínimo absoluto de contingencia corresponde al consumo de 5 minutos de espera a 1500 ft: 51 kg para ATR-72 y 166 kg para Embraer 195-E2.',
    'refs': ['MOA Binter 8.1.7', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 9']
  },
  {
    'num': 18, 'ans': 'A', 'subj': 'cmd_flight_planning',
    'stem': '¿Cuál es el número máximo de aproximaciones frustradas sucesivas que Binter Airlines recomienda realizar antes de proceder al alternativo?',
    'opts': [
      ('A', 'Máximo de 2 aproximaciones sucesivas (solo salvable por una mejora clara y contrastada de las condiciones)'),
      ('B', 'Máximo de 4 aproximaciones si hay combustible suficiente'),
      ('C', '1 única aproximación sin posibilidad de segundo intento'),
      ('D', 'A discreción libre de ATC')
    ],
    'obj': 'MOA 8.1.3 - Límite de 2 Aproximaciones Sucesivas',
    'exp': 'Binter establece como criterio de seguridad un máximo de 2 aproximaciones consecutivas; un tercer intento solo se justifica ante una mejora sustancial y confirmada del tiempo.',
    'refs': ['MOA Binter 8.1.3', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 4']
  },
  {
    'num': 19, 'ans': 'B', 'subj': 'cmd_flight_planning',
    'stem': 'Para continuar una aproximación instrumental en condiciones de baja visibilidad, ¿qué valor de RVR es el mandatorio a considerar?',
    'opts': [
      ('A', 'El RVR del punto de parada únicamente'),
      ('B', 'El RVR de la zona de toma de contacto (Touchdown Zone RVR); si no está reportado, el del punto medio (Midpoint RVR) será el valor de referencia'),
      ('C', 'La visibilidad meteorológica general de la estación'),
      ('D', 'El valor visual estimado por la tripulación a 2000 ft')
    ],
    'obj': 'MOA 8.1.3.8 - RVR de Referencia (Touchdown Zone / Midpoint)',
    'exp': 'El TDZ RVR es siempre el parámetro determinante. Si está inoperativo o no se reporta, el Midpoint RVR pasa a ser el valor de referencia legal.',
    'refs': ['MOA Binter 8.1.3.8']
  },
  {
    'num': 20, 'ans': 'C', 'subj': 'cmd_moa_mob',
    'stem': '¿Cuál es el valor máximo declarado o asegurado de mercancía de alto valor (Valuable Cargo) autorizado a transportar por aeronave?',
    'opts': [
      ('A', '1.000.000 €'),
      ('B', '5.500.000 €'),
      ('C', '9.616.000 € (o valor equivalente en otra divisa)'),
      ('D', '15.000.000 €')
    ],
    'obj': 'MOA Cap. 9 - Límite de Mercancía de Alto Valor (9.616.000 €)',
    'exp': 'El límite máximo de valor asegurado o declarado autorizado a transportar en un vuelo comercial de la compañía es de 9.616.000 euros.',
    'refs': ['MOA Binter Capítulo 9', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 5']
  },
  {
    'num': 21, 'ans': 'D', 'subj': 'cmd_moa_mob',
    'stem': 'En relación con el transporte de Hielo Seco (Dióxido de Carbono sólido, UN 1845) como refrigerante en bodegas:',
    'opts': [
      ('A', 'Solo se permite en bodega trasera hasta 50 kg'),
      ('B', 'Se puede transportar junto a animales vivos en la misma bodega'),
      ('C', 'Está completamente prohibido en aviones de pasaje'),
      ('D', 'Hasta 200 kg en la bodega delantera siempre que NO viajen animales vivos en ella (o máx 60 kg si se desconoce la tasa de sublimación)')
    ],
    'obj': 'MOA Cap. 9 / DGR - Límites de Transporte de Hielo Seco',
    'exp': 'El hielo seco desprende CO2 por sublimación que asfixiaría a animales; se permite hasta 200 kg en bodega delantera ventilada sin animales vivos (o máx 60 kg sin ratio conocido).',
    'refs': ['MOA Binter Capítulo 9', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 3 y 5']
  },
  {
    'num': 22, 'ans': 'A', 'subj': 'cmd_moa_mob',
    'stem': '¿En qué bodega y con qué cantidad máxima autorizada se debe estibar el material magnetizado (Magnetized Material, UN 2807)?',
    'opts': [
      ('A', 'Únicamente en la bodega trasera con un límite máximo de 118 kg'),
      ('B', 'En la bodega delantera hasta 200 kg'),
      ('C', 'En cualquier bodega sin límite si está blindado'),
      ('D', 'Bajo los asientos de la cabina de pasaje')
    ],
    'obj': 'MOA Cap. 9 / DGR - Estiba de Material Magnetizado (Bodega Trasera / 118 kg)',
    'exp': 'Para no interferir con las brújulas y sistemas de navegación AHRS/flux valves del morro, el material magnetizado se transporta exclusivamente en la bodega trasera hasta 118 kg.',
    'refs': ['MOA Binter Capítulo 9', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 3']
  },
  {
    'num': 23, 'ans': 'B', 'subj': 'cmd_disruptive_pax',
    'stem': 'En el transporte de animales domésticos en cabina (PETC), ¿cuáles son los límites reglamentarios?',
    'opts': [
      ('A', 'Máximo 10 contenedores y 12 kg por animal'),
      ('B', 'Máximo 6 contenedores por avión (máx 2 por cabina/compartimento con 1 fila de separación salvo convivientes), peso máx 8 kg incluido transportín, y máx 3 animales por contenedor'),
      ('C', 'Máximo 4 contenedores de hasta 10 kg en cualquier asiento'),
      ('D', 'Ilimitado en asientos de ventanilla')
    ],
    'obj': 'MOA 8.2.2 - Normativa de Animales en Cabina (PETC)',
    'exp': 'PETC admite máx 6 contenedores por vuelo, 2 por sección con fila libre de separación, peso máx 8 kg con transportín y hasta 3 animales de la misma camada por recipiente.',
    'refs': ['MOA Binter 8.2.2.5', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 1']
  },
  {
    'num': 24, 'ans': 'C', 'subj': 'cmd_disruptive_pax',
    'stem': '¿Qué especies de animales domésticos están explícitamente autorizadas como PETC por la compañía?',
    'opts': [
      ('A', 'Únicamente perros y gatos'),
      ('B', 'Perros, gatos y serpientes no venenosas'),
      ('C', 'Perros, gatos, pájaros, tortugas, hámsters, conejos/cobayas y peces'),
      ('D', 'Cualquier mamífero de menos de 5 kg')
    ],
    'obj': 'MOA 8.2.2 - Especies Autorizadas como PETC',
    'exp': 'Las especies permitidas en cabina son: perros, gatos, aves de compañía, tortugas, hámsters, conejos/cobayas y peces.',
    'refs': ['MOA Binter 8.2.2.5', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 1']
  },
  {
    'num': 25, 'ans': 'D', 'subj': 'cmd_disruptive_pax',
    'stem': 'Respecto a los perros guía / lazarillo (SVAN / ESAN) que acompañan a pasajeros invidentes (BLND) o sordos (DEAF):',
    'opts': [
      ('A', 'Deben viajar siempre en bodega facturados como AVIH'),
      ('B', 'Computan dentro del límite máximo de PETC de la cabina'),
      ('C', 'Deben abonar billete de pasaje independiente'),
      ('D', 'No computan para el cupo máximo de facturación de animales, viajan en cabina a los pies del pasajero y son reconocidos como acompañantes válidos')
    ],
    'obj': 'MOA 8.2.2 - Perros Guía / Lazarillo (BLND / DEAF)',
    'exp': 'Los perros lazarillo viajan en cabina sin coste, no computan dentro del cupo de PETC y están homologados como acompañantes de asistencia.',
    'refs': ['MOA Binter 8.2.2.5', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 1-2']
  },
  {
    'num': 26, 'ans': 'A', 'subj': 'cmd_disruptive_pax',
    'stem': 'En el transporte de animales en bodega (AVIH), ¿cuál es el tiempo máximo de antelación con el que pueden ser cargados en el avión antes del cierre de puertas?',
    'opts': [
      ('A', 'Máximo 2 horas de antelación en bodega'),
      ('B', 'Máximo 4 horas'),
      ('C', 'Máximo 30 minutos'),
      ('D', 'No hay límite si la compuerta permanece abierta')
    ],
    'obj': 'MOA 8.2.2 - Tiempo Máximo de AVIH en Bodega (2 horas)',
    'exp': 'Por bienestar animal y control térmico, los animales vivos en bodega no deben permanecer cargados más de 2 horas antes de la salida.',
    'refs': ['MOA Binter 8.2.2.5', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 5']
  },
  {
    'num': 27, 'ans': 'B', 'subj': 'cmd_disruptive_pax',
    'stem': '¿En qué bodega se transportan prioritariamente los animales vivos AVIH en la flota Embraer 195-E2?',
    'opts': [
      ('A', 'En la bodega trasera exclusivamente'),
      ('B', 'En la bodega delantera H1 (y si fuera necesario H2 asegurando ventilación adecuada)'),
      ('C', 'En el compartimento de aviónica'),
      ('D', 'En la bodega de granel trasera')
    ],
    'obj': 'MOA Cap. 8 / AOM E195-E2 - Ubicación de AVIH en Bodega Delantera',
    'exp': 'Los AVIH se ubican en la bodega delantera H1/H2 dotada de control de ventilación y calefacción.',
    'refs': ['MOA Binter 8.2.2.5', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 5']
  },
  {
    'num': 28, 'ans': 'C', 'subj': 'cmd_disruptive_pax',
    'stem': '¿Qué equipaje especial se designa con el código CBBG y cuál es su peso límite?',
    'opts': [
      ('A', 'Equipaje no acompañado en bodega de 32 kg'),
      ('B', 'Instrumentos musicales en bodega de 50 kg'),
      ('C', 'Equipaje voluminoso o frágil transportado en un asiento de cabina de pasaje (Cabin Baggage), con peso máximo de 75 kg asegurado con cinturón'),
      ('D', 'Carga comercial de 100 kg')
    ],
    'obj': 'MOA 8.1.8 - Equipaje en Asiento de Cabina (CBBG / 75 kg)',
    'exp': 'CBBG (Cabin Baggage Cargo) corresponde a objetos voluminosos (como violonchelos o equipos delicados) amarrados en un asiento de cabina hasta 75 kg.',
    'refs': ['MOA Binter 8.1.8', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 1']
  },
  {
    'num': 29, 'ans': 'D', 'subj': 'cmd_disruptive_pax',
    'stem': 'En la clasificación de pasajeros en silla de ruedas, ¿qué define al código WCHC (Wheelchair Cabin)?',
    'opts': [
      ('A', 'Pasajero que camina perfectamente pero lleva silla plegada'),
      ('B', 'Pasajero que solo necesita silla para subir escalones'),
      ('C', 'Pasajero que puede caminar por el pasillo del avión'),
      ('D', 'Pasajero completamente inmóvil que requiere ser transportado en silla de cabina estrecha hasta su asiento (la categoría más limitativa)')
    ],
    'obj': 'IATA / MOA - Definición de Pasajero WCHC',
    'exp': 'WCHC es la categoría de máxima dependencia: el pasajero no puede moverse ni ascender escalones y precisa silla especial de a bordo hasta su butaca.',
    'refs': ['MOA Binter 8.2.2.5', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 3']
  },
  {
    'num': 30, 'ans': 'A', 'subj': 'cmd_disruptive_pax',
    'stem': '¿Qué define al código WCHS (Wheelchair Steps)?',
    'opts': [
      ('A', 'Pasajero que no puede subir ni bajar escaleras de acceso al avión, pero es capaz de caminar por sí mismo por el pasillo de la cabina hasta su asiento'),
      ('B', 'Pasajero en camilla'),
      ('C', 'Pasajero invidente que viaja con perro guía'),
      ('D', 'Pasajero con fractura de brazo')
    ],
    'obj': 'IATA / MOA - Definición de Pasajero WCHS',
    'exp': 'WCHS requiere asistencia/elevador para subir las escaleras del avión pero se desplaza autónomamente dentro de la cabina de pasaje.',
    'refs': ['MOA Binter 8.2.2.5']
  },
  {
    'num': 31, 'ans': 'B', 'subj': 'cmd_disruptive_pax',
    'stem': 'Para sillas de ruedas accionadas por baterías de iones de litio (WCLB), si la batería debe desmontarse para su transporte en cabina, ¿cuáles son los límites de capacidad energética autorizados?',
    'opts': [
      ('A', 'Máximo 500 Wh por batería'),
      ('B', 'Batería principal desmontada de máximo 300 Wh (con bornes aislados en cabina), permitiéndose un repuesto de máx 300 Wh o dos repuestos de máx 160 Wh cada uno'),
      ('C', 'No se permiten baterías de litio desmontables'),
      ('D', 'Hasta 1000 Wh sin restricción')
    ],
    'obj': 'DGR / MOA Cap. 9 - Baterías de Iones de Litio en Sillas de Ruedas (WCLB)',
    'exp': 'Si la batería de litio no está protegida en la estructura, debe extraerse, aislar sus terminales y llevarse en cabina con un límite de 300 Wh (o 2 repuestos de 160 Wh).',
    'refs': ['MOA Binter Capítulo 9 MMPP', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 4']
  },
  {
    'num': 32, 'ans': 'C', 'subj': 'cmd_disruptive_pax',
    'stem': '¿Qué son los pasajeros ABP (Able-Bodied Passengers) y qué funciones pueden desempeñar en caso de emergencia?',
    'opts': [
      ('A', 'Pasajeros VIP con preferencia de evacuación'),
      ('B', 'Personal de tierra que viaja en salto de servicio'),
      ('C', 'Pasajeros seleccionados e instruidos por su condición física para ayudar en la apertura de salidas de emergencia, manejo de equipos y asistencia a SCP/heridos'),
      ('D', 'Fuerzas de seguridad del Estado armadas exclusivamente')
    ],
    'obj': 'MOA 8.2.2 - Definición y Cometidos de Pasajeros ABP',
    'exp': 'Los ABPs son personas capacitadas seleccionadas por la tripulación para colaborar en la evacuación, bloqueo de salidas inutilizadas y auxilio a personas con movilidad reducida.',
    'refs': ['MOA Binter 8.2.2.5', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 2']
  },
  {
    'num': 33, 'ans': 'D', 'subj': 'cmd_disruptive_pax',
    'stem': '¿A partir de qué edad un menor deja de ser considerado Menor No Acompañado (UM) en la normativa de Binter?',
    'opts': [
      ('A', 'A partir de los 8 años'),
      ('B', 'A partir de los 10 años'),
      ('C', 'A partir de los 16 años'),
      ('D', 'A partir de los 12 años cumplidos (la categoría UM aplica de 5 a 11 años cumplidos)')
    ],
    'obj': 'MOA 8.2.2.5 - Rango de Edad de Menores No Acompañados (UMs)',
    'exp': 'Se considera UM a todo menor entre 5 y 11 años cumplidos que viaje sin un acompañante de al menos 16 años.',
    'refs': ['MOA Binter 8.2.2.5', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 2']
  },
  {
    'num': 34, 'ans': 'A', 'subj': 'cmd_disruptive_pax',
    'stem': '¿Dónde se ubican preferentemente los Menores No Acompañados (UMs) en la cabina de pasaje?',
    'opts': [
      ('A', 'En la parte trasera del avión, próximos a la estación de la tripulación de cabina'),
      ('B', 'En la primera fila de la cabina (Fila 1)'),
      ('C', 'En las filas de salida de emergencia sobre el plano'),
      ('D', 'En cualquier asiento de pasillo al azar')
    ],
    'obj': 'MOA 8.2.2.5 - Ubicación de UMs en Cabina',
    'exp': 'Los UMs se sientan preferiblemente en las filas traseras para facilitar su monitorización constante por parte del personal de cabina.',
    'refs': ['MOA Binter 8.2.2.5', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 2']
  },
  {
    'num': 35, 'ans': 'B', 'subj': 'cmd_moa_mob',
    'stem': '¿Cuántos botiquines de primeros auxilios (FAK) y kits médicos de emergencia (MEK/EMK) debe llevar a bordo la aeronave?',
    'opts': [
      ('A', '1 FAK y ningún MEK'),
      ('B', '2 FAKs (precintados, con etiqueta y fecha vigente) y 1 MEK (requerido en rutas a más de 60 min de asistencia médica cualificada)'),
      ('C', '4 FAKs y 2 MEKs'),
      ('D', '1 FAK por cada 20 pasajeros')
    ],
    'obj': 'MOA Cap. 8 / Equipos Médicos - Dotación FAK y MEK',
    'exp': 'La dotación estándar incluye 2 First Aid Kits (FAKs) y 1 Medical Emergency Kit (MEK) con vida útil controlada (12 meses / ampliable según normativa).',
    'refs': ['MOA Binter Capítulo 8 Equipos de Emergencia', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 5']
  },
  {
    'num': 36, 'ans': 'C', 'subj': 'cmd_moa_mob',
    'stem': 'Si un botiquín FAK o kit MEK se utiliza en vuelo, ¿cuántos días de calendario puede operar el avión con el kit incompleto para retornar a una base de reposición?',
    'opts': [
      ('A', 'Hasta 10 días'),
      ('B', 'Hasta 5 días'),
      ('C', 'Máximo 2 días de calendario'),
      ('D', 'Debe reponerse de inmediato en la siguiente escala sin excepción')
    ],
    'obj': 'MOA Cap. 8 / MEL - Tolerancia de Reposición de FAK/MEK (2 días)',
    'exp': 'Se autoriza la operación hasta un máximo de 2 días de calendario con un FAK o MEK incompleto tras su uso asistencial para permitir el vuelo a una base de mantenimiento donde reponerlo.',
    'refs': ['MOA Binter Capítulo 8', 'MEL EMB BA RN24', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 5']
  },
  {
    'num': 37, 'ans': 'D', 'subj': 'cmd_flight_ground_ops',
    'stem': '¿Cuáles son los avisos y comprobaciones periódicas que debe realizar la tripulación de cabina (TCPs) durante el vuelo de acuerdo con el MOA?',
    'opts': [
      ('A', 'Llamada a cabina de pilotaje cada 30 min y recordatorio de no fumar cada 90 min'),
      ('B', 'Comprobación visual de lavabos cada 30 min'),
      ('C', 'Recordatorio de cinturones cada 15 min si la señal luminosa continúa encendida'),
      ('D', 'Todas son correctas')
    ],
    'obj': 'MOA 8.3 - Rutinas de Seguridad y Comprobaciones de Cabina',
    'exp': 'Las rutinas de cabina estipulan chequeo a pilotos c/30m, revisión lavabos c/30m, aviso no fumar c/90m y aviso de cinturón puesto c/15m.',
    'refs': ['MOA Binter 8.3 Procedimientos en Vuelo', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 5']
  },
  {
    'num': 38, 'ans': 'A', 'subj': 'cmd_flight_ground_ops',
    'stem': '¿Cuál es el número mínimo de lavabos que deben encontrarse plenamente operativos para autorizar la salida de un vuelo comercial con pasajeros?',
    'opts': [
      ('A', 'Al menos 1 lavabo debe estar completamente operativo'),
      ('B', 'Todos los lavabos instalados deben estar operativos'),
      ('C', 'No es obligatorio ningún lavabo en vuelos de menos de 1 hora'),
      ('D', 'Al menos 2 lavabos operativos')
    ],
    'obj': 'MEL / MOA 8.1 - Mínimo de Lavabos Operativos (1)',
    'exp': 'Para despachar con pasaje se exige como mínimo 1 lavabo en perfecto estado de funcionamiento según la MEL.',
    'refs': ['MEL EMB BA RN24 ATA 38', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 6']
  },
  {
    'num': 39, 'ans': 'B', 'subj': 'cmd_flight_planning',
    'stem': '¿Cuál es el requisito reglamentario de suministro de oxígeno de emergencia suplementario en aeronaves comerciales presurizadas certificadas para volar por encima de 25.000 ft?',
    'opts': [
      ('A', 'Suministro continuo de 30 minutos'),
      ('B', 'Suministro continuo de al menos 2 horas para la tripulación de vuelo'),
      ('C', 'Suministro continuo de 45 minutos'),
      ('D', 'Suministro de 10 minutos exclusivamente')
    ],
    'obj': 'EASA CAT.IDE.A.235 / MOA 8.1 - Oxígeno para Aviones > 25.000 ft (2 horas)',
    'exp': 'Las aeronaves certificadas por encima de FL250 deben contar con una reserva de oxígeno para la tripulación de pilotaje suficiente para al menos 2 horas de vuelo continuo.',
    'refs': ['MOA Binter Capítulo 8 Oxígeno', 'EASA Part-CAT', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 6']
  },
  {
    'num': 40, 'ans': 'C', 'subj': 'cmd_flight_planning',
    'stem': '¿Cuándo se clasifica una maleta facturada con la etiqueta identificativa \"HEAVY\"?',
    'opts': [
      ('A', 'Cuando supera los 15 kg'),
      ('B', 'Cuando supera los 20 kg'),
      ('C', 'Cuando su peso supera los 23 kg (hasta el límite máximo laboral de 32 kg)'),
      ('D', 'Cuando supera los 40 kg')
    ],
    'obj': 'MOA 8.1.8 - Etiqueta de Equipaje HEAVY (> 23 kg)',
    'exp': 'Se etiqueta como HEAVY todo bulto de equipaje facturado que exceda los 23 kg para advertir al personal de rampa en prevención de riesgos laborales.',
    'refs': ['MOA Binter 8.1.8', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 4']
  },
  {
    'num': 41, 'ans': 'D', 'subj': 'cmd_flight_ground_ops',
    'stem': '¿Cuál es el ángulo máximo de giro del tren de morro durante la maniobra de remolque/retroceso (Pushback) en el Embraer 195-E2?',
    'opts': [
      ('A', 'Máximo +/- 60 grados'),
      ('B', 'Máximo +/- 90 grados'),
      ('C', 'Máximo +/- 120 grados'),
      ('D', 'Máximo +/- 170 grados (utilizando la línea roja de la puerta del tren a 95° como referencia visual)')
    ],
    'obj': 'AOM / SOPM E195-E2 - Límites de Giro en Pushback (+/- 170° / 95° roja)',
    'exp': 'El tren de morro del E195-E2 permite un giro de hasta +/- 170° con barra/tractor, teniendo como referencia la línea roja pintada a 95° en la compuerta.',
    'refs': ['AOM E195-E2 Sección 3', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 4']
  },
  {
    'num': 42, 'ans': 'A', 'subj': 'cmd_flight_ground_ops',
    'stem': 'En el procedimiento de llegada a calzos con APU inoperativo (Engines-Running Arrival), ¿cuál es la secuencia correcta de seguridad?',
    'opts': [
      ('A', 'Detener avión por completo, apagar motor 1 dejando motor 2 a ralentí, apagar beacon, calzar tren de morro y conectar GPU; no calzar tren principal hasta que ambos motores estén parados'),
      ('B', 'Dejar ambos motores encendidos al 50% de potencia mientras se desembarca'),
      ('C', 'Calzar inmediatamente el tren principal con motor 2 encendido'),
      ('D', 'Desembarcar al pasaje por la puerta trasera con motores en marcha')
    ],
    'obj': 'SOPM / MOA 8.2 - Procedimiento de Llegada con APU Inoperativo',
    'exp': 'Por seguridad, con motor 2 encendido en ralentí solo se calza el morro y se conecta GPU; el personal no se aproxima al tren principal hasta el corte total de motores.',
    'refs': ['SOPM E195-E2 Normal Procedures', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 4']
  },
  {
    'num': 43, 'ans': 'B', 'subj': 'cmd_moa_mob',
    'stem': '¿Por qué motivo está expresamente prohibido el transporte de restos humanos en féretros/ataúdes en la flota Embraer de Binter?',
    'opts': [
      ('A', 'Por motivos de presurización de bodega'),
      ('B', 'Debido a las dimensiones físicas de las puertas y bodegas de carga de la aeronave, que no permiten la maniobra y estiba reglamentaria de ataúdes rígidos'),
      ('C', 'Por restricciones de aduanas en vuelos insulares'),
      ('D', 'Por limitaciones de centrado en cola')
    ],
    'obj': 'MOA Cap. 9 / Carga E195-E2 - Restricción de Féretros HUM',
    'exp': 'Las dimensiones de las compuertas de bodega del Embraer impiden introducir féretros estándar sin inclinaciones antirreglamentarias, prohibiéndose su transporte.',
    'refs': ['MOA Binter Capítulo 9', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 5']
  },
  {
    'num': 44, 'ans': 'C', 'subj': 'cmd_disruptive_pax',
    'stem': 'En la asignación de asientos de pasajeros PMR en la cabina del Embraer 195-E2, ¿qué asientos están terminantemente PROHIBIDOS por seguridad?',
    'opts': [
      ('A', 'Los asientos de ventanilla'),
      ('B', 'Los asientos de pasillo'),
      ('C', 'Los asientos situados en las filas de salidas de emergencia sobre el plano (Tipo III) y filas adyacentes a salidas de emergencia principales'),
      ('D', 'Las últimas dos filas de la cabina')
    ],
    'obj': 'MOA 8.2.2.5 / Diagrama E195-E2 - Asientos Prohibidos para PMR',
    'exp': 'Ningún pasajero PMR o con movilidad reducida puede ocupar salidas de emergencia para no obstaculizar la vía de evacuación del pasaje.',
    'refs': ['MOA Binter 8.2.2.5 Diagrama PMR E195-E2', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 2']
  },
  {
    'num': 45, 'ans': 'D', 'subj': 'cmd_moa_mob',
    'stem': '¿Qué peso estándar reglamentario se aplica a los equipajes facturados en vuelos internacionales intercontinentales (a otro continente)?',
    'opts': [
      ('A', '11 kg por maleta'),
      ('B', '13 kg por maleta'),
      ('C', '20 kg por maleta'),
      ('D', '15 kg por maleta (frente a 11 kg en doméstico y 13 kg en europeo)')
    ],
    'obj': 'MOA 8.1.8 - Pesos Estándar de Equipaje por Tipo de Ruta',
    'exp': 'Los pesos estándar de equipaje en el MOA son: 11 kg en vuelos domésticos, 13 kg en vuelos europeos y 15 kg en vuelos intercontinentales.',
    'refs': ['MOA Binter 8.1.8 Tablas de Equipaje', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 3']
  },
  {
    'num': 46, 'ans': 'A', 'subj': 'cmd_moa_mob',
    'stem': 'En la gestión de tripulaciones, ¿cuál es el peso estándar asignado a un pasajero varón (Male) y a una mujer (Female) en la hoja de carga estándar?',
    'opts': [
      ('A', 'Hombre: 88 kg; Mujer: 70 kg'),
      ('B', 'Hombre: 85 kg; Mujer: 75 kg'),
      ('C', 'Hombre: 80 kg; Mujer: 65 kg'),
      ('D', 'Hombre: 90 kg; Mujer: 70 kg')
    ],
    'obj': 'MOA 8.1.8 - Pesos Estándar Hombre (88 kg) y Mujer (70 kg)',
    'exp': 'El estándar de Binter MOA 8.1.8 computa 88 kg por pasajero hombre adulto y 70 kg por mujer adulta (incluyendo equipaje de mano).',
    'refs': ['MOA Binter 8.1.8', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 3']
  },
  {
    'num': 47, 'ans': 'B', 'subj': 'cmd_flight_planning',
    'stem': '¿Cómo se define la Altitud Mínima de Cuadrícula (Minimum Grid Altitude - MGA)?',
    'opts': [
      ('A', 'La altitud sobre la senda de planeo ILS'),
      ('B', 'La altitud más baja utilizable para volar fuera de rutas publicadas en una cuadrícula geográfica, garantizando 1000 ft de franqueamiento en terreno llano y 2000 ft en terreno montañoso'),
      ('C', 'La altitud mínima para entrar en espacio aéreo RVSM'),
      ('D', 'La altitud de patrón visual de aeródromo')
    ],
    'obj': 'MOA 8.1.3 / Cartografía - Definición de MGA',
    'exp': 'MGA es la altitud de cuadrícula que garantiza libramiento de obstáculos fuera de aerovías (1000 ft en zonas llanas o 2000 ft en áreas montañosas).',
    'refs': ['MOA Binter 8.1.3 Navegación', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 3']
  },
  {
    'num': 48, 'ans': 'C', 'subj': 'cmd_disruptive_pax',
    'stem': 'En relación con pasajeros bajo custodia policial clasificados con nivel de peligrosidad ALTO, ¿cuál es el número máximo admitido a bordo?',
    'opts': [
      ('A', 'Hasta 4 pasajeros'),
      ('B', 'Hasta 7 pasajeros'),
      ('C', 'Máximo 2 pasajeros de alta peligrosidad (debidamente escoltados)'),
      ('D', 'No se admite ningún pasajero de alta peligrosidad')
    ],
    'obj': 'MOA 8.2.2.6 - Cupos de Custodia Policial según Riesgo (Alto: máx 2)',
    'exp': 'La escala de custodia autoriza hasta 7 de riesgo bajo, hasta 4 de riesgo medio y como máximo 2 si el nivel de peligrosidad es alto.',
    'refs': ['MOA Binter 8.2.2.6', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 1']
  },
  {
    'num': 49, 'ans': 'D', 'subj': 'cmd_moa_mob',
    'stem': '¿Qué información y documentos específicos debe contener el pliego de descargo de responsabilidad en caso de transporte de mujeres embarazadas?',
    'opts': [
      ('A', 'Certificado del ginecólogo confirmando fecha prevista de parto y aptitud para el vuelo'),
      ('B', 'Firma de exención de responsabilidad hacia la compañía aérea'),
      ('C', 'Número de semanas de gestación'),
      ('D', 'Todas son correctas')
    ],
    'obj': 'MOA 8.2.2.5 - Documentación de Embarazadas',
    'exp': 'El pliego a partir de la semana 28 requiere certificado facultativo de aptitud, semanas de gestación y descargo formal de responsabilidad.',
    'refs': ['MOA Binter 8.2.2.5']
  },
  {
    'num': 50, 'ans': 'A', 'subj': 'cmd_flight_planning',
    'stem': 'En la selección de mínimos de planificación con el Plan Básico con Variaciones (Tabla 1A), si el aeródromo alternativo dispone de aproximaciones 3D Tipo A con mínimos de 200 ft o menos (ILS / GLS / LPV), ¿cuál es el incremento aplicable?',
    'opts': [
      ('A', 'Techo: DA/H + 200 ft; Visibilidad: RVR/VIS + 800 m'),
      ('B', 'Techo: DA/H + 100 ft; Visibilidad: RVR + 300 m'),
      ('C', 'Techo: DA/H + 400 ft; Visibilidad: RVR + 1500 m'),
      ('D', 'Mínimos de CAT I puros')
    ],
    'obj': 'MOA 8.1.7.2.5 Tabla 1A - Aproximación 3D Tipo A (DA + 200 ft / RVR + 800 m)',
    'exp': 'Para aproximaciones 3D Tipo A con mínimos <= 200 ft en la Tabla 1A, el incremento requerido es DA/H + 200 ft y RVR/VIS + 800 m.',
    'refs': ['MOA Binter 8.1.7.2.5 Tabla 1A', 'TÍPICAS PREGUNTAS EXAMEN COMANDANTE Pág. 6-7']
  }
]

final_data_lote3 = []
for q in raw_lote3:
    options_list = []
    for opt_id, opt_text in q['opts']:
        options_list.append({
            'id': opt_id,
            'text': opt_text,
            'is_correct': (opt_id == q['ans'])
        })
    item = {
        'id': f'CMD-MOA-{q["num"]:03d}',
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
    final_data_lote3.append(item)

out_file = 'banks/command-upgrade/partes-aplicables-moa-mob/moa_operaciones_despacho_profundizacion.json'
with open(out_file, 'w', encoding='utf-8') as f:
    json.dump(final_data_lote3, f, ensure_ascii=False, indent=2)

print(f'[SUCCESS] {len(final_data_lote3)} reactivos de Lote 3 escritos en {out_file}')
