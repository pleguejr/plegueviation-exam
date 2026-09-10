import React from 'react';

export interface TableRow {
  col1: string;
  col2: string;
  col3?: string;
  col4?: string;
  col5?: string;
  highlight?: boolean;
  notes?: string;
}

export interface OperationalTable {
  id: string;
  category: 'alternates' | 'memory-items' | 'limitations' | 'moa' | 'vfr';
  title: string;
  subtitle: string;
  manualRef: string;
  description: string;
  headers: string[];
  rows: TableRow[];
  extraNotes?: string[];
  warningAlert?: string;
  badge: string;
}

export const OPERATIONAL_TABLES: OperationalTable[] = [
  // 1. MÍNIMOS DE PLANIFICACIÓN - PLAN BÁSICO ESTÁNDAR (TABLA 1B)
  {
    id: 'alternates-basic',
    category: 'alternates',
    title: 'Mínimos de Planificación: Plan Básico Estándar (Sin Variaciones)',
    subtitle: 'Márgenes de seguridad para aeródromos alternativos sin aprobaciones especiales de despacho',
    manualRef: 'MOA 8.1.7.2.6 (Tabla 1B) • EASA Part-CAT.OP.MPA.181',
    badge: 'Despacho Alternativos',
    description: 'Aplicable para la selección de aeródromo alternativo de despegue, en ruta (ERA) y de destino cuando el operador no cumple los requisitos para aplicar el Plan Básico con Variaciones. Se añaden incrementos a los mínimos de aproximación del aeródromo.',
    warningAlert: 'En el Plan Básico Estándar, se exige un margen fijo de 200 ft / 800 m para Tipo B y 400 ft / 1.500 m para Tipo A, independientemente del número de aproximaciones o pistas.',
    headers: ['Tipo de Aproximación Disponible en Alternativo', 'Incremento de Techo (Base de Nubes)', 'Incremento de Visibilidad / RVR', 'Condición Meteorológica Requerida'],
    rows: [
      {
        col1: 'Aproximación Tipo B (CAT I / ILS de Precisión) — 1 sola en uso',
        col2: 'DA/H + 200 ft',
        col3: 'RVR/VIS + 800 m',
        col4: 'Techo ≥ DA/H + 200 ft | Visibilidad/RVR ≥ Mínimo + 800 m',
        highlight: false,
        notes: 'Aproximación de precisión tradicional 3D con mínimos estándar de 200 ft.'
      },
      {
        col1: 'Aproximación Tipo B — 2 o más pistas separadas',
        col2: 'DA/H + 200 ft',
        col3: 'RVR/VIS + 800 m',
        col4: 'Techo ≥ DA/H + 200 ft | Visibilidad/RVR ≥ Mínimo + 800 m',
        highlight: false,
        notes: 'En el Plan Básico no hay reducción por disponer de dos pistas separadas.'
      },
      {
        col1: 'Aproximación Tipo A (No Precisión / 2D) — 1 sola en uso',
        col2: 'MDA/H + 400 ft',
        col3: 'RVR/VIS + 1.500 m',
        col4: 'Techo ≥ MDA/H + 400 ft | Visibilidad/RVR ≥ Mínimo + 1.500 m',
        highlight: false,
        notes: 'Aproximación basada en VOR, NDB o LNAV con mínimos 2D.'
      },
      {
        col1: 'Aproximación Tipo A — 2 o más basadas en ayudas distintas',
        col2: 'MDA/H + 400 ft',
        col3: 'RVR/VIS + 1.500 m',
        col4: 'Techo ≥ MDA/H + 400 ft | Visibilidad/RVR ≥ Mínimo + 1.500 m',
        highlight: false,
        notes: 'No aplica descuento en el Plan Básico estándar.'
      },
      {
        col1: 'Aproximación en Circuito (Circling Approach)',
        col2: 'MDA/H + 400 ft',
        col3: 'VIS + 1.500 m',
        col4: 'Techo ≥ MDA/H + 400 ft | Visibilidad ≥ Mínimo + 1.500 m',
        highlight: true,
        notes: 'Siempre requiere visibilidad meteorológica (VIS), no RVR.'
      }
    ],
    extraNotes: [
      'El pronóstico meteorológico (TAF / METAR) para la hora prevista de llegada (ETA) ± 1 hora debe ser igual o superior a los mínimos calculados.',
      'El término "pistas separadas" exige superficies de aterrizaje distintas que puedan ser utilizadas simultáneamente y con procedimientos de aproximación independientes.'
    ]
  },

  // 2. MÍNIMOS DE PLANIFICACIÓN - PLAN BÁSICO CON VARIACIONES (TABLA 1A)
  {
    id: 'alternates-variations',
    category: 'alternates',
    title: 'Mínimos de Planificación: Plan Básico con Variaciones Operacionales',
    subtitle: 'Márgenes reducidos y créditos operacionales de Binter Canarias',
    manualRef: 'MOA 8.1.7.2.5 (Tabla 1A) • EASA Part-SPA.LVO',
    badge: 'Despacho Lido / Binter Ops',
    description: 'Tabla oficial autorizada a Binter Canarias en sus Especificaciones de Operación (OpSpecs). Permite optimizar la selección de aeródromos alternativos reduciendo los márgenes adicionales requeridos gracias a la tecnología de monitorización y despacho de compañía.',
    warningAlert: 'Requisitos indispensables para aplicar esta tabla: 1) Flight Monitoring en tiempo real desde el CCO, 2) Aprobación LVO en OpSpecs, 3) Software automático de despacho (Lido Flight).',
    headers: ['Instalaciones y Aproximaciones Disponibles', 'Incremento de Techo (Base Nubes)', 'Incremento Visibilidad / RVR', 'Mínimo Operacional Resultante'],
    rows: [
      {
        col1: 'Dos o más aproximaciones Tipo B (ILS / GLS / MLS) en uso a dos pistas separadas',
        col2: 'DA/H + 100 ft',
        col3: 'RVR + 300 m',
        col4: 'Techo ≥ DA/H + 100 ft | RVR ≥ Mínimo CAT I + 300 m (ej: 550 m + 300 m = 850 m)',
        highlight: true,
        notes: 'Máxima ventaja operacional en aeropuertos con pistas paralelas independientes.'
      },
      {
        col1: 'Una sola aproximación Tipo B en uso (o dos aproximaciones a la misma pista)',
        col2: 'DA/H + 150 ft',
        col3: 'RVR + 450 m',
        col4: 'Techo ≥ DA/H + 150 ft | RVR ≥ Mínimo CAT I + 450 m (ej: 550 m + 450 m = 1.000 m)',
        highlight: false,
        notes: 'Caso habitual de aeropuertos con una sola pista instrumental CAT I.'
      },
      {
        col1: 'Aproximación 3D Tipo A con mínimos de DH ≤ 200 ft (ILS / LPV / GLS / RNP con BARO-VNAV)',
        col2: 'DA/H + 200 ft',
        col3: 'RVR/VIS + 800 m',
        col4: 'Techo ≥ DA/H + 200 ft | RVR/VIS ≥ Mínimo + 800 m',
        highlight: false,
        notes: 'Aproximaciones con guiado vertical de precisión o APV.'
      },
      {
        col1: 'Dos o más aproximaciones Tipo A (2D) utilizables basadas en radioayudas distintas',
        col2: 'DA/H o MDA/H + 200 ft',
        col3: 'RVR/VIS + 1.000 m',
        col4: 'Techo ≥ MDA/H + 200 ft | RVR/VIS ≥ Mínimo + 1.000 m',
        highlight: false,
        notes: 'Ej: Pista con aproximación VOR y otra aproximación RNP independiente.'
      },
      {
        col1: 'Una sola aproximación Tipo A (2D / No Precisión) en uso',
        col2: 'DA/H o MDA/H + 400 ft',
        col3: 'RVR/VIS + 1.500 m',
        col4: 'Techo ≥ MDA/H + 400 ft | RVR/VIS ≥ Mínimo + 1.500 m',
        highlight: false,
        notes: 'Aeródromos con una sola radioayuda básica (VOR o NDB).'
      },
      {
        col1: 'Aproximación en Circuito (Circling Approach)',
        col2: 'MDA/H + 400 ft',
        col3: 'VIS + 1.500 m',
        col4: 'Techo ≥ MDA/H Circling + 400 ft | Visibilidad ≥ Mínimo + 1.500 m',
        highlight: false,
        notes: 'Nunca se aplica sobre RVR, solo sobre visibilidad meteorológica general.'
      }
    ],
    extraNotes: [
      'Validez temporal: Las condiciones previstas en el alternativo deben cumplirse desde 1 hora antes hasta 1 hora después de la hora estimada de llegada (ETA ± 1 h).',
      'Para Alternativo de Despegue: Las condiciones deben ser iguales o superiores a los mínimos de aterrizaje aplicables en ese aeródromo.'
    ]
  },

  // 3. TABLA COMPLETA DE MEMORY ITEMS - EMBRAER 195-E2
  {
    id: 'memory-items-e2',
    category: 'memory-items',
    title: 'Memory Items Oficiales del Embraer 195-E2',
    subtitle: 'Acciones inmediatas de memoria requeridas por el fabricante y Binter Ops',
    manualRef: 'QRH Section 1 (Memory Items Rev 19) • MOB Binter Cap. 3.1',
    badge: 'QRH Rev 19 / Mandatory Recall',
    description: 'Procedimientos de emergencia que deben ejecutarse inmediatamente de memoria sin consultar listas de chequeo. Una vez completadas las acciones de memoria, se solicitará la lectura y confirmación de la lista de emergencia (QRH) correspondiente.',
    warningAlert: '¡REGLA MEANA!: 1° M (Memo Items) -> 2° E (Emergency Checklist) -> 3° A (Abnormal Checklist) -> 4° N (Normal Checklist) -> 5° A (Abnormal restantes).',
    headers: ['Condición EICAS / Emergencia', 'Acciones Inmediatas de Memoria (Memory Items)', 'Parámetros Clave', 'Llamada de Cabina / Acciones Posteriores'],
    rows: [
      {
        col1: 'CABIN ALTITUDE HIGH',
        col2: '1. Crew Oxy Masks: DON, 100%\n2. Crew Communication: ESTABLISH\n3. Altitude: 10.000 ft or MEA (whichever is higher)\n4. Thrust Levers: IDLE\n5. Speedbrake Lever: FULL OPEN\n6. Airspeed: MAX / APPROPRIATE\n7. Transponder: 7700',
        col3: 'Nivelar a 10.000 ft o MEA | Vmo/Mmo o turbulencia si hay daño estructural',
        col4: 'Megafonía (PA): "DESCENSO DE EMERGENCIA (x3)"\nAl nivelar seguro: "TRIPULACIÓN DE CABINA, DESCENSO FINALIZADO"',
        highlight: true,
        notes: 'Si la altitud de cabina no baja, pulsar DUMP button en el panel de presurización.'
      },
      {
        col1: 'ENG 1(2) FIRE',
        col2: '1. Autothrottle: DISENGAGE\n2. N1 (Operative Engine): MIN 5% ABOVE N1 IDLE\n3. Affected Engine - Thrust Lever: IDLE\n4. Affected Engine - START/STOP Selector: STOP\n5. Affected Engine - FIRE EXT HANDLE: PULL',
        col3: 'Esperar 30s antes de descargar 2ª botella si el fuego persiste',
        col4: 'PM monitoriza parámetros de motor operativo y confirma antes de cortar START/STOP.',
        highlight: true,
        notes: 'Girar la maneta hacia el lado de la botella elegida para descargar el agente extintor.'
      },
      {
        col1: 'ENGINE SEVERE DAMAGE OR SEPARATION',
        col2: '1. Autothrottle: DISENGAGE\n2. N1 (Operative Engine): MIN 5% ABOVE N1 IDLE\n3. Affected Engine - Thrust Lever: IDLE\n4. Affected Engine - START/STOP Selector: STOP\n5. Affected Engine - FIRE EXT HANDLE: PULL',
        col3: 'N1 operativo +5% sobre IDLE para asegurar guiado FADEC y sangrado',
        col4: 'Completar procedimiento monomotor y evaluar IMFLOCC para desvío técnico.',
        highlight: false,
        notes: 'No intentar reencendido en vuelo tras daño severo o vibraciones extremas.'
      },
      {
        col1: 'DUAL ENGINE FAILURE',
        col2: '1. Airspeed: MIN 270 KIAS\n2. RAT MANUAL DEPLOY Lever: PULL',
        col3: 'Velocidad mínima 270 KIAS (windmilling óptimo y generador RAT)',
        col4: 'Ajustar transponder 7700 y declarar MAYDAY a ATC. Planear hacia campo adecuado.',
        highlight: true,
        notes: 'Aunque la RAT se despliega automáticamente, el tirón manual asegura el enclavamiento mecánico.'
      },
      {
        col1: 'ENGINE ABNORMAL START (en tierra)',
        col2: '1. Affected Engine - START/STOP Selector: STOP',
        col3: 'Aplicable ante: No light-off en 20s, ITT excedida, N2 estancada o pérdida de presión de aceite',
        col4: 'Completar ciclo de ventilación (Dry Motor) según procedimiento de mantenimiento.',
        highlight: false,
        notes: 'Es la única acción de memoria requerida. No pulsar extintor salvo fuego externo confirmado.'
      },
      {
        col1: 'APU FIRE',
        col2: '1. APU EMER STOP Button: PUSH IN',
        col3: 'En tierra el APU se apaga y descarga extintor automáticamente tras 10s',
        col4: 'En vuelo no hay descarga automática; pulsar APU BOTTLE DISCH tras 10s si persiste.',
        highlight: false,
        notes: 'El botón APU EMER STOP corta combustible y sangrado instantáneamente.'
      },
      {
        col1: 'BATT 1(2) OVERTEMP',
        col2: '1. Associated BATT Knob: OFF',
        col3: 'Aislar la batería de litio/níquel de la red de carga DC',
        col4: 'Monitorizar mensaje EICAS y temperatura en página de sinóptico eléctrico.',
        highlight: false,
        notes: 'Único Memory Item para evitar el embalamiento térmico de la batería afectada.'
      },
      {
        col1: 'CARGO FWD(AFT) SMOKE',
        col2: '1. Associated Cargo Smoke Button: PUSH',
        col3: 'Descarga inmediata de botella de alta (High-Rate) y arma botella dosificada (Low-Rate)',
        col4: 'Aterrizar en el aeródromo adecuado más cercano sin demora (Land ASAP).',
        highlight: false,
        notes: 'El sistema mantiene atmósfera inerte de Halón hasta 120 minutos en bodega.'
      },
      {
        col1: 'SMOKE / FIRE / FUMES (Sin aviso EICAS)',
        col2: '1. Crew Oxy Masks: DON, 100%\n2. Crew Communication: ESTABLISH',
        col3: 'Protección respiratoria inmediata ante humo tóxico en cabina de pilotaje',
        col4: 'Continuar con la lista de verificación SMOKE / FIRE / FUMES del QRH.',
        highlight: false,
        notes: 'Gafas de humo puestas si el humo dificulta la visión de los instrumentos.'
      },
      {
        col1: 'SMOKE EVACUATION',
        col2: '1. Crew Oxy Masks: DON, 100%\n2. Crew Communication: ESTABLISH\n3. DUMP Button: PUSH IN',
        col3: 'Apertura de válvula Outflow para ventilación forzada y despresurización',
        col4: 'Descender a altitud de respiración segura (10.000 ft o MEA).',
        highlight: false,
        notes: 'El botón DUMP abre la válvula de salida al máximo en modo automático.'
      },
      {
        col1: 'EMERGENCY DESCENT',
        col2: '1. FSTN BELTS Switch: ON\n2. Altitude: 10.000 ft or MEA (whichever is higher)\n3. Thrust Levers: IDLE\n4. Speedbrake Lever: FULL OPEN\n5. Airspeed: MAX / APPROPRIATE\n6. Transponder: 7700',
        col3: 'FSTN BELTS ON es el primer paso obligatorio',
        col4: 'Comunicar con ATC: "MAYDAY, MAYDAY, MAYDAY... EMERGENCY DESCENT".',
        highlight: false,
        notes: 'Se aplica cuando se ordena descenso de emergencia sin aviso previo de fallo de presurización.'
      },
      {
        col1: 'JAMMED CONTROL WHEEL (ROLL)',
        col2: '1. AILERON DISCONNECT Handle: PULL',
        col3: 'Desconexión mecánica del eje de alabeo izquierdo y derecho',
        col4: 'El piloto sin atasco toma el control del avión (Fly-By-Wire en modo normal/degradado).',
        highlight: false,
        notes: 'No intentar volver a conectar la maneta en vuelo una vez tirada.'
      },
      {
        col1: 'JAMMED CONTROL COLUMN (PITCH)',
        col2: '1. ELEVATOR DISCONNECT Handle: PULL',
        col3: 'Desconexión mecánica del eje de cabeceo de ambas columnas de mando',
        col4: 'Controlar cabeceo con la columna libre y compensador Pitch Trim.',
        highlight: false,
        notes: 'Ambas mitades del timón de profundidad quedan operadas independientemente.'
      },
      {
        col1: 'GEAR LEVER CAN NOT BE MOVED UP',
        col2: '1. DN LOCK REL Button: PRESS and HOLD\n2. LANDING GEAR Lever: UP\n3. DN LOCK REL Button: RELEASE',
        col3: 'Liberación manual del solenoide de bloqueo del tren de aterrizaje',
        col4: 'Mantener pulsado mientras se sube la palanca y soltar tras enclavamiento.',
        highlight: false,
        notes: 'Usar únicamente si no hay indicación de falso peso sobre ruedas en despegue.'
      },
      {
        col1: 'PITCH TRIM RUNAWAY',
        col2: '1. AP DISC Button: PRESS and HOLD\n2. PITCH TRIM SYS 1 & 2 CUTOUT Buttons: PUSH IN',
        col3: 'Desconexión eléctrica de ambos canales del compensador de profundidad',
        col4: 'Volar manualmente manteniendo compensación aerodinámica constante.',
        highlight: false,
        notes: 'Los botones CUTOUT aíslan físicamente los actuadores del estabilizador horizontal.'
      },
      {
        col1: 'STEERING RUNAWAY (en tierra)',
        col2: '1. STEER DISC Switch: PRESS',
        col3: 'Desconexión del actuador electrohidráulico de la rueda de morro (NWS)',
        col4: 'Mantener el eje de pista mediante pedales de dirección y frenado diferencial.',
        highlight: false,
        notes: 'El pulsador en el volante corta el control eléctrico del timón de morro.'
      }
    ],
    extraNotes: [
      'Una vez estabilizada la trayectoria del avión y asegurada la altitud segura, el PF solicitará: "QRH CHECKLIST [Nombre del procedimiento]".',
      'Ningún Memory Item debe interrumpir la senda de vuelo ni comprometer el control primario de la aeronave (Regla de oro: VOLAR -> NAVEGAR -> COMUNICAR -> GESTIONAR).'
    ]
  },

  // 4. TABLA DE LIMITACIONES Y NÚMEROS OPERACIONALES - E195-E2
  {
    id: 'limitations-e2',
    category: 'limitations',
    title: 'Limitaciones y Números Operacionales: Embraer 195-E2',
    subtitle: 'Envolvente de vuelo, velocidades de diseño, altitudes, pesos y sistemas',
    manualRef: 'AFM Section 2 • AOM Rev 11 • QRH Limitations',
    badge: 'AFM / AOM Envolvente',
    description: 'Valores límite certificados para la operación segura del Embraer 195-E2 (motores Pratt & Whitney PW1900G Geared Turbofan). Las excedencias de estos valores requieren inspección obligatoria de mantenimiento.',
    warningAlert: 'Las limitaciones aquí reflejadas son de obligado cumplimiento bajo normativa EASA y Binter Canarias.',
    headers: ['Sistema / Parámetro Operacional', 'Valor Límite Oficial', 'Condición / Restricción Operativa', 'Referencia Técnica'],
    rows: [
      {
        col1: 'Techo Máximo Operativo (Maximum Operating Ceiling)',
        col2: '41.000 ft (FL410)',
        col3: 'Altitud máxima de presión en cualquier fase de vuelo',
        col4: 'AFM 2-01 / AOM 1-02',
        highlight: true
      },
      {
        col1: 'Altitud Máxima con Flaps Extendidos',
        col2: '20.000 ft',
        col3: 'Prohibido operar con Flap 1, 2, 3, 4, 5 o FULL por encima de FL200',
        col4: 'AFM 2-04 / AOM 1-02',
        highlight: false
      },
      {
        col1: 'Altitud Máxima para Operación de Autoland',
        col2: '7.249 ft',
        col3: 'Elevación máxima de pista autorizada para aproximación y toma automática',
        col4: 'AFM 2-03 / AOM 1-04',
        highlight: true
      },
      {
        col1: 'Flag HI FIELD (EICAS) y Oxígeno en Tierra',
        col2: '9.200 ft',
        col3: 'Requiere al menos un piloto con oxígeno continuo en todas las operaciones en tierra',
        col4: 'AOM 1-02 / QRH',
        highlight: false
      },
      {
        col1: 'Altitud Máxima de Despliegue de Máscaras PAX',
        col2: '14.000 ft a 14.750 ft',
        col3: 'Altitud de presión de cabina en la que se despliegan automáticamente',
        col4: 'AFM 2-06 / AOM 1-05',
        highlight: false
      },
      {
        col1: 'Altitud Máxima para Limpiaparabrisas (Wipers)',
        col2: '14.000 ft (250 KIAS)',
        col3: 'Uso de limpiaparabrisas prohibido por encima de 14.000 ft o 250 KIAS',
        col4: 'AFM 2-08 / AOM 1-06',
        highlight: false
      },
      {
        col1: 'APU: Altitud Máxima de Arranque (Start)',
        col2: '39.000 ft',
        col3: 'Envolvente garantizada de encendido del APU APS2600 en vuelo',
        col4: 'AFM 2-10 / AOM 1-08',
        highlight: true
      },
      {
        col1: 'APU: Altitud Máxima de Suministro Eléctrico (Generator)',
        col2: '39.000 ft (40 kVA)',
        col3: 'Generador de APU disponible hasta el techo de arranque',
        col4: 'AFM 2-10 / AOM 1-08',
        highlight: false
      },
      {
        col1: 'APU: Altitud Máxima de Sangrado Neumático (Bleed)',
        col2: '15.000 ft (o 20.000 ft para arranque de motor asistido)',
        col3: 'Sangrado para aire acondicionado y presurización limitado a FL150',
        col4: 'AFM 2-10 / AOM 1-08',
        highlight: true
      },
      {
        col1: 'Velocidad Máxima Operativa (Vmo / Mmo)',
        col2: '320 KIAS / M 0.82',
        col3: 'Límite estructural en atmósfera estándar (la que sea más restrictiva)',
        col4: 'AFM 2-02 / AOM 1-03',
        highlight: true
      },
      {
        col1: 'Velocidad de Turbulencia (Vra / Mra)',
        col2: 'Bajo 10.000 ft: 240 KIAS | Sobre 10.000 ft: 270 KIAS / M 0.76',
        col3: 'Velocidad de penetración en turbulencia severa recomendada',
        col4: 'AOM 1-03 / QRH',
        highlight: false
      },
      {
        col1: 'Velocidades Límite de Flaps (Vfe)',
        col2: 'Flap 1: 230 kt | Flap 2: 215 kt | Flap 3: 200 kt | Flap 4: 180 kt | Flap 5: 180 kt | Flap FULL: 165 kt',
        col3: 'Velocidades máximas con superficies hipersustentadoras desplegadas',
        col4: 'AFM 2-04 / AOM 1-03',
        highlight: true
      },
      {
        col1: 'Velocidades de Tren de Aterrizaje (Vlo / Vle)',
        col2: 'Vlo Extensión: 250 KIAS | Vlo Retracción: 220 KIAS | Vle Extendido: 250 KIAS',
        col3: 'Límites mecánicos de las compuertas y patas del tren',
        col4: 'AFM 2-05 / AOM 1-03',
        highlight: false
      },
      {
        col1: 'Viento Cruzado Máximo Demostrado (Crosswind)',
        col2: 'Pista Seca: 38 kt | Pista Mojada: 31 kt | Contaminada (Compact Snow): 20 kt | Hielo: 12 kt',
        col3: 'Componente máxima a 90° para despegue y aterrizaje',
        col4: 'AFM 2-01 / MOB 2.0',
        highlight: true
      },
      {
        col1: 'Viento en Cola Máximo (Tailwind)',
        col2: '15 kt (Despegue y Aterrizaje)',
        col3: 'Componente máxima de cola autorizada en pistas aprobadas',
        col4: 'AFM 2-01 / MOB 2.0',
        highlight: false
      },
      {
        col1: 'Alturas Mínimas de Conexión del Piloto Automático (AP)',
        col2: 'Despegue: 200 ft AGL | ILS/LPV: 80 ft AGL | NPA: 190 ft AGL | Crucero: 1.000 ft AGL',
        col3: 'Pérdida de altura en Coupled Go-Around: 100 ft',
        col4: 'AFM 2-03 / AOM 1-04',
        highlight: true
      },
      {
        col1: 'Desbalance Máximo de Combustible (Fuel Imbalance)',
        col2: '360 kg (800 lb)',
        col3: 'Desbalance lateral máximo permitido entre tanque izquierdo y derecho',
        col4: 'AFM 2-07 / AOM 1-07',
        highlight: false
      }
    ],
    extraNotes: [
      'Temperatura mínima de combustible en vuelo: -37°C para Jet A-1 (-40°C para Jet A).',
      'El sistema de drenaje y sangrado de combustible garantiza operación continua con bombas eyectoras principales activadas por flujo motriz.'
    ]
  },

  // 5. TABLA DE ESTRUCTURA Y CAPÍTULOS DEL MOA (BINTER)
  {
    id: 'moa-chapters',
    category: 'moa',
    title: 'Estructura y Capítulos del MOA (Manual de Operaciones Parte A)',
    subtitle: 'Marco normativo y regulatorio de Binter Canarias (Edición 06 RN26)',
    manualRef: 'MOA BinterCanarias ED06 RN26 RT00 • EASA Air Ops ORO/CAT',
    badge: 'MOA Ed06 RN26',
    description: 'Índice y resumen de contenido de los capítulos generales del Manual de Operaciones Parte A (MOA), documento matriz que define las políticas operativas, jerarquías de mando, despacho, planificación y seguridad de la compañía.',
    warningAlert: 'El MOA es de conocimiento y aplicación obligatoria para todos los comandantes y primeros oficiales de la compañía.',
    headers: ['Capítulo MOA', 'Denominación Oficial', 'Contenido y Temas Clave Regulados', 'Subcapítulos Críticos de Examen'],
    rows: [
      {
        col1: 'MOA Cap. 0',
        col2: 'Administración y Control del Manual',
        col3: 'Sistema de enmiendas, revisiones temporales (RT), lista de páginas efectivas (LEP) y aprobaciones de la Autoridad (AESA).',
        col4: '0.1 Organización del manual • 0.2 Revisiones',
        highlight: false
      },
      {
        col1: 'MOA Cap. 1',
        col2: 'Organización y Responsabilidades',
        col3: 'Estructura orgánica de Binter, directores responsables, cadena de mando, autoridad y responsabilidades indelegables del Comandante (PIC).',
        col4: '1.4 Autoridad del Comandante • 1.5 Obligaciones de la tripulación',
        highlight: true
      },
      {
        col1: 'MOA Cap. 2',
        col2: 'Control y Supervisión de las Operaciones',
        col3: 'Centro de Control de Operaciones (CCO), funciones del despachador de vuelo, seguimiento de aeronaves (Flight Monitoring) y habilitaciones.',
        col4: '2.1 Sistema de control operacional • 2.2 Despacho',
        highlight: false
      },
      {
        col1: 'MOA Cap. 3',
        col2: 'Sistema de Gestión de Seguridad (SMS) y Calidad',
        col3: 'Política de seguridad, gestión de riesgos operacionales (FRMS), cultura justa (Just Culture) y auditorías de calidad operativa.',
        col4: '3.1 Política SMS • 3.3 Reporte no punitivo',
        highlight: false
      },
      {
        col1: 'MOA Cap. 4',
        col2: 'Composición y Cualificación de las Tripulaciones',
        col3: 'Requisitos mínimos de experiencia, cualificación de ruta y aeródromo (Categorías A, B, C de aeródromos), entrenamiento periódico y chequeos OPC/LPC.',
        col4: '4.1 Composición mínima • 4.3 Clasificación de aeródromos',
        highlight: false
      },
      {
        col1: 'MOA Cap. 5',
        col2: 'Requisitos de Aptitud Médica y Salud',
        col3: 'Certificados médicos Clase 1, restricciones por alcohol (0.0 g/l y 8 horas previas), medicamentos no autorizados, fatiga y vacunación.',
        col4: '5.1 Aptitud médica • 5.2 Sustancias psicoactivas',
        highlight: false
      },
      {
        col1: 'MOA Cap. 6 / 7',
        col2: 'Limitaciones de Tiempo de Vuelo y Descanso (FTL)',
        col3: 'Regulación Subpart FTL: Periodo de Actividad de Vuelo (FDP), descansos mínimos en base/fuera de base, extensiones por el PIC y discreción del comandante.',
        col4: '7.1 Tablas FDP • 7.3 Discreción del Comandante (Commander Discretion)',
        highlight: true
      },
      {
        col1: 'MOA Cap. 8.1',
        col2: 'Preparación y Planificación del Vuelo',
        col3: 'Altitudes mínimas de vuelo (MORA/MEA), mínimos de utilización de aeródromos, política de combustible (Fuel Policy), masa y centrado, OFP, LTV.',
        col4: '8.1.3 Mínimos aeródromo • 8.1.7 Combustible y Alternativos (Tablas 1A/1B)',
        highlight: true
      },
      {
        col1: 'MOA Cap. 8.2',
        col2: 'Operaciones en Tierra y Rampa',
        col3: 'Repostaje de combustible con pasajeros a bordo (procedimiento de evacuación armada), procedimientos de deshielo/antihielo (Holdover Time) y seguridad en rampa.',
        col4: '8.2.1 Repostaje con pasaje • 8.2.4 Deshielo/Antihielo',
        highlight: false
      },
      {
        col1: 'MOA Cap. 8.3',
        col2: 'Procedimientos de Vuelo y Reglas de Cabina',
        col3: 'Prioridad VNCG (Volar -> Navegar -> Comunicar -> Gestionar), política de Cabina Estéril (< 10.000 ft), uso obligatorio de auriculares y briefings estándar.',
        col4: '8.3.1 Cabina estéril • 8.3.2 Briefings de vuelo',
        highlight: true
      },
      {
        col1: 'MOA Cap. 8.4',
        col2: 'Operaciones con Visibilidad Reducida (LVO)',
        col3: 'Despegues con baja visibilidad (LVTO ≥ 125 m), aproximaciones de precisión CAT II y CAT III, requisitos de pista (CL y HIRL) y procedimientos LVO.',
        col4: '8.4.1 Requisitos LVTO • 8.4.2 Mínimos CAT II/III',
        highlight: true
      },
      {
        col1: 'MOA Cap. 8.6',
        col2: 'Despacho con MEL, CDL y DDPM',
        col3: 'Jerarquía del MEL, procedimientos operacionales (O) y de mantenimiento (M), plazos de rectificación: Cat A (específico), Cat B (3 días), Cat C (10 días), Cat D (120 días).',
        col4: '8.6.1 Plazos de rectificación MEL • 8.6.3 Despacho CDL',
        highlight: true
      },
      {
        col1: 'MOA Cap. 8.7 / 8.8',
        col2: 'Operaciones Especiales y Requisitos de Oxígeno',
        col3: 'Vuelos Ferry, vuelos de verificación de mantenimiento (MCF), requisitos de oxígeno suplementario y de emergencia para tripulación y pasaje (> 10.000 ft).',
        col4: '8.7 Vuelos MCF • 8.8 Tablas de oxígeno',
        highlight: false
      },
      {
        col1: 'MOA Cap. 9',
        col2: 'Mercancías Peligrosas (DGR) y Transporte de Armas',
        col3: 'Instrucciones técnicas OACI / IATA DGR, entrega y firma del NOTOC por el PIC, baterías de litio (powerbanks solo en cabina) y custodia de armas de fuego.',
        col4: '9.1 NOTOC • 9.3 Transporte de armas con escolta',
        highlight: false
      },
      {
        col1: 'MOA Cap. 10',
        col2: 'Seguridad en la Aviación (AVSEC / Security)',
        col3: 'Protección de cabina de pilotaje (puerta blindada bloqueada CAT.GEN.MPA.135), niveles de amenaza OACI 1 a 4, ubicación de bomba de menor riesgo (LRBL) y squawk 7500.',
        col4: '10.2 Niveles de amenaza • 10.4 LRBL puerta de servicio trasera',
        highlight: true
      },
      {
        col1: 'MOA Cap. 11',
        col2: 'Notificación y Reporte de Sucesos (Safety / SMS)',
        col3: 'Reglamento UE 376/2014, plazo de reporte MOR (≤ 72 horas), sucesos notificables obligatorios, preservación de registradores CVR y FDR (desconectar CBs en tierra).',
        col4: '11.1 Notificación MOR (72h) • 11.3 Preservación CVR/FDR',
        highlight: false
      },
      {
        col1: 'MOA Cap. 12',
        col2: 'Reglas del Aire y SERA',
        col3: 'Reglamento SERA, fallo de comunicaciones en IMC (mantener nivel y velocidad 20 minutos tras última hora prevista de reporte), interceptación militar y señales visuales.',
        col4: '12.1 Fallo de comunicaciones (20 min) • 12.3 Interceptación militar',
        highlight: true
      }
    ],
    extraNotes: [
      'El MOA se complementa con la Parte B (MOB - Manual específico de la flota E195-E2), Parte C (MOC - Rutas y Aeródromos) y Parte D (MOD - Formación y Entrenamiento).'
    ]
  },

  // 6. TABLA DE MÍNIMOS METEOROLÓGICOS VFR
  {
    id: 'vfr-minimums',
    category: 'vfr',
    title: 'Mínimos Meteorológicos de Vuelo Visual (VFR & Special VFR)',
    subtitle: 'Requisitos de visibilidad, distancia a nubes y techos según espacio aéreo y SERA',
    manualRef: 'SERA.5001 • SERA.5005 • MOA Binter Subcapítulo 8.1.4',
    badge: 'SERA / VFR Ops',
    description: 'Límites meteorológicos para vuelos visuales en las distintas clases de espacio aéreo europeo y en operaciones de VFR Especial (Special VFR) o VFR Nocturno.',
    warningAlert: 'En espacio aéreo controlado (CTR/TMA), ningún vuelo VFR despegará ni aterrizará si el techo de nubes es inferior a 1.500 ft (450 m) o la visibilidad en tierra es menor de 5 km (salvo autorización de VFR Especial).',
    headers: ['Clase de Espacio Aéreo', 'Altitud / Nivel de Vuelo', 'Visibilidad en Vuelo Mínima', 'Distancia a las Nubes (Separación)'],
    rows: [
      {
        col1: 'Espacio Aéreo Clases A, B, C, D, E (Controlado)',
        col2: 'A o por encima de FL100 (10.000 ft AMSL)',
        col3: '8 km',
        col4: '1.500 m en horizontal | 1.000 ft (300 m) en vertical',
        highlight: true,
        notes: 'En Clase A el vuelo VFR no está permitido de forma general.'
      },
      {
        col1: 'Espacio Aéreo Clases B, C, D, E (Controlado)',
        col2: 'Por debajo de FL100 / a o por encima de 3.000 ft AMSL (o 1.000 ft AGL, la mayor)',
        col3: '5 km',
        col4: '1.500 m en horizontal | 1.000 ft (300 m) en vertical',
        highlight: false,
        notes: 'Separación visual constante con las formaciones nubosas.'
      },
      {
        col1: 'Espacio Aéreo Clases F, G (No Controlado)',
        col2: 'A o por encima de FL100 (10.000 ft AMSL)',
        col3: '8 km',
        col4: '1.500 m en horizontal | 1.000 ft (300 m) en vertical',
        highlight: false,
        notes: 'Mismos mínimos que en espacio controlado sobre FL100.'
      },
      {
        col1: 'Espacio Aéreo Clases F, G (No Controlado)',
        col2: 'Por debajo de FL100 / a o por encima de 3.000 ft AMSL (o 1.000 ft AGL, la mayor)',
        col3: '5 km',
        col4: '1.500 m en horizontal | 1.000 ft (300 m) en vertical',
        highlight: false,
        notes: 'Mantiene el estándar de 1.500 m horizontal y 1.000 ft vertical.'
      },
      {
        col1: 'Espacio Aéreo Clases F, G (No Controlado)',
        col2: 'A o por debajo de 3.000 ft AMSL (o 1.000 ft AGL, la mayor)',
        col3: '5 km (* Reducible a 1.500 m si IAS ≤ 140 kt)',
        col4: 'Libre de nubes y con la superficie del suelo o del agua a la vista continua',
        highlight: true,
        notes: 'Permite 1.500 m para aeronaves volando a velocidades reducidas que permitan ver y evitar tráfico.'
      },
      {
        col1: 'VFR Especial (Special VFR en zona CTR)',
        col2: 'Dentro de zona de control (CTR) por debajo de mínimos VFR estándar',
        col3: 'Visibilidad en tierra ≥ 1.500 m (≥ 800 m para helicópteros)',
        col4: 'Libre de nubes y con la superficie a la vista continua | Techo de nubes ≥ 600 ft (180 m)',
        highlight: true,
        notes: 'Requiere autorización ATC expresa. Velocidad máxima aconsejada ≤ 140 kt IAS.'
      },
      {
        col1: 'VFR Nocturno (Night VFR — SERA.5005)',
        col2: 'En cualquier altitud durante la noche oficial',
        col3: 'Visibilidad en vuelo ≥ 5 km | Techo de nubes ≥ 1.500 ft (450 m)',
        col4: 'Mantener a la vista continua el terreno o el agua | Distancia a nubes estándar',
        highlight: false,
        notes: 'Prohibido VFR nocturno en nubes o sin referencias luminosas de superficie.'
      }
    ],
    extraNotes: [
      'Límite de velocidad: En espacio aéreo clase C, D, E, F y G por debajo de FL100 (10.000 ft), la velocidad indicada máxima para vuelos VFR es de 250 kt IAS.',
      'Altitudes mínimas de seguridad VFR: Excepto para despegue o aterrizaje, no se volará sobre aglomeraciones urbanas a menos de 1.000 ft sobre el obstáculo más alto en un radio de 600 m; en cualquier otro lugar, a no menos de 500 ft sobre el suelo o agua.'
    ]
  }
];
