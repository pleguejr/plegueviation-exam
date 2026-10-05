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
  category: 'alternates' | 'memory-items' | 'limitations' | 'moa' | 'vfr' | 'mass-balance' | 'easa-netjets';
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
    title: 'Tabla 1B: Mínimos de Planificación de aeródromos alternativos en ruta (ERA, FUEL ERA) y alternativo de destino. Plan básico',
    subtitle: 'Limitaciones por visibilidad / techo de nubes (MOA 8.1.7.2.6)',
    manualRef: 'MOA 8.1.7.2.6 (Tabla 1B) • AMC6 CAT.OP.MPA.182',
    badge: 'Plan Básico',
    description: 'Binter Airlines en caso de no poder aplicar los mínimos de planificación con variaciones utilizará mínimos de planificación del plan básico de combustible. Seleccionará un aeródromo como aeródromo alternativo de destino o alternativo en ruta por combustible (FUEL ERA) cuando los informes y/o pronósticos meteorológicos apropiados (ETA ± 1 HR) indiquen que las condiciones meteorológicas estarán en o por encima de los mínimos de planificación de la Tabla 1B.',
    warningAlert: 'Limitaciones por viento: Las limitaciones por viento se deben aplicar considerando las condiciones de la pista (seca, mojada o contaminada), según tabla apartado MOA 8.1.7.2.8.',
    headers: ['Tipo de aproximación', 'Base del techo de nubes o visibilidad vertical', 'RVR/VIS'],
    rows: [
      {
        col1: 'Aproximaciones instrumentales Tipo B',
        col2: 'DA/H + 200 ft',
        col3: 'RVR/VIS + 800 m',
        highlight: false
      },
      {
        col1: 'Aproximaciones instrumentales Tipo A',
        col2: 'DA/H o MDA/H + 400 ft',
        col3: 'RVR/VIS + 1 500 m',
        highlight: false
      },
      {
        col1: 'Aproximaciones en circuito',
        col2: 'MDA/H + 400 ft',
        col3: 'VIS + 1 500 m',
        highlight: true
      }
    ],
    extraNotes: [
      'Limitaciones por viento: Las limitaciones por viento se deben aplicar considerando las condiciones de la pista (seca, mojada o contaminada), según tabla apartado MOA 8.1.7.2.8.'
    ]
  },

  // 2. MÍNIMOS DE PLANIFICACIÓN - PLAN BÁSICO CON VARIACIONES (TABLA 1A)
  {
    id: 'alternates-variations',
    category: 'alternates',
    title: 'Tabla 1A: Mínimos de Planificación de aeródromos alternativos en ruta (ERA, FUEL ERA) y alternativo de destino. Plan básico con variaciones',
    subtitle: 'Plan básico con variaciones (MOA 8.1.7.2.5)',
    manualRef: 'MOA 8.1.7.2.5 (Tabla 1A) • AMC8 / AMC9 CAT.OP.MPA.182',
    badge: 'Plan Básico con Variaciones',
    description: 'Binter Airlines puede utilizar mínimos de planificación reducidos para aeródromo alternativo en ruta (ERA), alternativo en ruta por combustible (Fuel ERA) y aeródromo alternativo de destino, de acuerdo con el plan básico con variaciones. Para poder acogerse a esta variación, Binter Airlines dispone de un sistema de planificación de vuelo automático adecuado y ha establecido un sistema de control operacional que incluye monitorización del vuelo (Flight Monitoring) y dispone de aprobación de operaciones de baja visibilidad (operaciones LVO).',
    warningAlert: 'Nota: se podrá seleccionar la fila de mínimos de planificación más ventajosos. Por ejemplo, un aeródromo con dos aproximaciones tipo B: una CAT3 (0 ft/75 m) otra CAT1 (200 ft/550 m). Se podrán seleccionar para planificación los mínimos CAT3 (0 + 150 ft / 75 + 450 m) en vez de los mínimos CAT1 (200 + 100 ft / 550 + 300 m).',
    headers: ['Tipo de aproximación', 'Techo en el aeródromo (base de nubes o visibilidad vertical)', 'RVR/VIS'],
    rows: [
      {
        col1: 'Dos o más operaciones de aproximación por instrumentos del tipo B en uso a dos pistas separadas***',
        col2: 'DA/H* + 100 ft',
        col3: 'RVR** + 300 m',
        highlight: true
      },
      {
        col1: 'Una operación de aproximación por instrumentos del tipo B en uso',
        col2: 'DA/H + 150 ft',
        col3: 'RVR + 450 m',
        highlight: false
      },
      {
        col1: 'Operación de aproximación 3D por instrumentos tipo A, asociada a una ayuda con mínimos de 200 ft o menos',
        col2: 'DA/H + 200 ft',
        col3: 'RVR/VIS + 800 m',
        highlight: false
      },
      {
        col1: 'Dos o más operaciones*** de aproximación por instrumentos del tipo A en uso, cada una de ellas basada en una ayuda de navegación distinta',
        col2: 'DA/H o MDA/H* + 200 ft',
        col3: 'RVR/VIS** + 1 000 m',
        highlight: false
      },
      {
        col1: 'Una operación de aproximación por instrumentos del tipo A en uso',
        col2: 'DA/H o MDA/H + 400 ft',
        col3: 'RVR/VIS + 1 500 m',
        highlight: false
      },
      {
        col1: 'Aproximaciones en circuito',
        col2: 'MDA/H + 400 ft',
        col3: 'VIS + 1 500 m',
        highlight: false
      }
    ],
    extraNotes: [
      '* El más alto de la DA/H o MDA/H en uso.',
      '** El más alto de la RVR o VIS en uso.',
      '*** Para cada vuelo IFR, el operador se asegurará de que haya suficientes medios disponibles para navegar y aterrizar en el aeródromo de destino o en cualquier aeródromo alternativo de destino en caso de pérdida de capacidad (GNSS) para la operación de aproximación y aterrizaje prevista.',
      'Mínimos de planificación de viento cruzado: Las limitaciones por viento se deben aplicar considerando las condiciones de la pista (seca, mojada o contaminada), según tabla apartado MOA 8.1.7.2.8.'
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
        col2: 'Bajo 10.000 ft: 250 KIAS | Sobre 10.000 ft: 270 KIAS / M 0.76',
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
        col2: 'Vlo Extensión: 250 KIAS | Vlo Retracción: 220 KIAS | Vle Extendido: 265 KIAS',
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
  },

  // 7. TABLA OFICIAL DE MASAS Y PESOS ESTÁNDAR (MOA 8.1.8 / EASA)
  {
    id: 'mass-balance-standards',
    category: 'mass-balance',
    title: 'Tabla Oficial de Masas y Pesos Estándar: Pasajeros, Equipajes y Tripulación',
    subtitle: 'Valores estándar de masa para despacho, DOW y hoja de carga (MOA 8.1.8.3 y EASA CAT.POL.MAB.100)',
    manualRef: 'MOA Binter 8.1.8.3 • EASA Part-CAT.POL.MAB.100 • AMC1 CAT.POL.MAB.100(e)',
    badge: 'MOA 8.1.8 / EASA Mass',
    description: 'Valores oficiales de masas estándar utilizados en la confección de la hoja de carga (Loadsheet), cálculo del Peso Operativo en Seco (DOW/DOM) y determinación del centrado (CG) para las operaciones comerciales de Binter Canarias.',
    warningAlert: '¡REGLAS MOA 8.1.8!: 1° El peso del pasaje adulto incluye por defecto 6 kg de equipaje de mano en cabina. 2° El peso de tripulante incluye 10 kg de maletín de vuelo/equipaje de servicio en DOW. 3° Si la masa real de los pasajeros o equipajes excede notablemente estos valores, el Comandante exigirá el uso de masas reales.',
    headers: ['Categoría / Colectivo', 'Masa Persona / Bulto', 'Equipaje Incluido', 'Masa Total Computada', 'Regulación / Aplicación Operativa'],
    rows: [
      {
        col1: 'Adulto Varón (Male Passenger)',
        col2: '82 kg (persona)',
        col3: '6 kg (equipaje de mano en cabina)',
        col4: '88 kg',
        col5: 'Pasajeros varones en aeronaves de transporte comercial (≥ 30 asientos).',
        highlight: true,
        notes: 'Valor oficial de tabla MOA 8.1.8.3 / EASA CAT.POL.MAB.100.'
      },
      {
        col1: 'Adulto Mujer (Female Passenger)',
        col2: '64 kg (persona)',
        col3: '6 kg (equipaje de mano en cabina)',
        col4: '70 kg',
        col5: 'Pasajeros mujeres en aeronaves de transporte comercial (≥ 30 asientos).',
        highlight: true,
        notes: 'Valor oficial de tabla MOA 8.1.8.3 / EASA CAT.POL.MAB.100.'
      },
      {
        col1: 'Adulto Mixto (All Adult - Ambos Sexos)',
        col2: '78 kg (persona)',
        col3: '6 kg (equipaje de mano en cabina)',
        col4: '84 kg',
        col5: 'Cómputo estándar indistinto de género si se utiliza peso único por adulto.',
        highlight: false,
        notes: 'Aplica en vuelos donde no se segregue por sexo en el sistema de facturación.'
      },
      {
        col1: 'Niño / Child (2 a 12 años cumplidos)',
        col2: '35 kg',
        col3: 'Incluido en el peso',
        col4: '35 kg',
        col5: 'Asiento propio asignado en cabina de pasaje.',
        highlight: false,
        notes: 'Menores de 2 a 12 años. A partir de los 12 años computan como adultos.'
      },
      {
        col1: 'Bebé / Infant (< 2 años sin asiento)',
        col2: '0 kg',
        col3: '—',
        col4: '0 kg',
        col5: 'Viajan en el regazo del adulto acompañante (sin asiento propio).',
        highlight: false,
        notes: 'Si el bebé ocupa un asiento homologado propio, se computa como niño (35 kg).'
      },
      {
        col1: 'Tripulante Técnico / Vuelo (Flight Crew)',
        col2: '75 kg (piloto)',
        col3: '10 kg (maletín de vuelo y equipaje técnico)',
        col4: '85 kg por piloto',
        col5: 'Cómputo en Dry Operating Weight (DOW) para Comandante y Primer Oficial.',
        highlight: true,
        notes: 'MOA 8.1.8.3 / AMC1 CAT.POL.MAB.100(e). Incluye documentación y maleta.'
      },
      {
        col1: 'Tripulante de Cabina (Cabin Crew / TCP)',
        col2: '65 kg (TCP)',
        col3: '10 kg (equipaje de servicio de cabina)',
        col4: '75 kg por TCP',
        col5: 'Cómputo en Dry Operating Weight (DOW) para cada TCP asignado al vuelo.',
        highlight: true,
        notes: 'MOA 8.1.8.3 / AMC1 CAT.POL.MAB.100(e). Incluye uniforme y equipaje.'
      },
      {
        col1: 'Tripulación Estándar E195-E2 (2 Pilotos + 3 TCPs)',
        col2: '345 kg (personas)',
        col3: '50 kg (equipajes de tripulación)',
        col4: '395 kg total tripulación',
        col5: 'Masa total de tripulación incluida en el DOW base de la flota Embraer 195-E2.',
        highlight: true,
        notes: '2 × 85 kg (170 kg) + 3 × 75 kg (225 kg) = 395 kg.'
      },
      {
        col1: 'Equipaje Facturado en Bodega: Doméstico / Interinsular',
        col2: '11 kg por pieza',
        col3: '—',
        col4: '11 kg / bulto',
        col5: 'Vuelos interinsulares del Archipiélago Canario y vuelos domésticos peninsulares (MOA 8.1.8.5.2).',
        highlight: true,
        notes: 'Valor oficial MOA 8.1.8.5.2 por bulto registrado en el manifiesto de carga.'
      },
      {
        col1: 'Equipaje Facturado en Bodega: Europeo',
        col2: '13 kg por pieza',
        col3: '—',
        col4: '13 kg / bulto',
        col5: 'Vuelos internacionales dentro del espacio de la Unión Europea (MOA 8.1.8.5.2).',
        highlight: false,
        notes: 'Rutas continentales europeas.'
      },
      {
        col1: 'Equipaje Facturado en Bodega: Intercontinental',
        col2: '15 kg por pieza',
        col3: '—',
        col4: '15 kg / bulto',
        col5: 'Vuelos intercontinentales (rutas hacia/desde África y terceros países) (MOA 8.1.8.5.2).',
        highlight: false,
        notes: 'Aplicable en operaciones con terceros países y África.'
      },
      {
        col1: 'Equipaje DAA (Delivery At Aircraft - A pie de avión)',
        col2: '10 kg por bulto',
        col3: 'Estibado en bodega',
        col4: '10 kg / bulto',
        col5: 'Equipaje entregado a pie de avión por limitación de cabina (MOA 8.1.8.5.3).',
        highlight: false,
        notes: 'Su peso se considera incluido en el estándar del pasajero si no excede franquicia.'
      },
      {
        col1: 'Chárter Vacacional (Adulto Varón / Mujer / All Adult)',
        col2: '83 kg (Varón) | 69 kg (Mujer)',
        col3: 'Equipaje de mano incluido',
        col4: '76 kg (All Adult)',
        col5: 'Valores específicos aplicables a vuelos bajo contrato de chárter vacacional (MOA 8.1.8.5.1).',
        highlight: false,
        notes: 'Niño en chárter vacacional: 35 kg.'
      },
      {
        col1: 'Equipaje en Asiento de Pasaje (CBBG / Cargo Baggage)',
        col2: 'Peso real del bulto',
        col3: 'Fijado con arnés/cinturón suplementario',
        col4: 'Peso real (Máx. 75 kg por asiento)',
        col5: 'Instrumentos musicales, valijas diplomáticas o equipos especiales en cabina.',
        highlight: false,
        notes: 'No puede bloquear salidas de emergencia ni superar la resistencia del asiento.'
      },
      {
        col1: 'Equipaje Pesado (Heavy Baggage)',
        col2: '> 23 kg',
        col3: 'Etiquetado obligatorio HEAVY',
        col4: 'Peso real (Límite máx. 32 kg)',
        col5: 'Cualquier bulto facturado individual que supere los 23 kg de masa.',
        highlight: false,
        notes: 'Límite máximo por pieza de 32 kg por seguridad de estiba y salud laboral.'
      }
    ],
    extraNotes: [
      'Densidad estándar de combustible Jet A-1: 0.79 kg/L (MOA 8.1.8.8).',
      'Menores no acompañados (UM): se computan según su rango de edad (35 kg si tienen de 2 a 12 años o peso adulto si son mayores de 12 años).',
      'Animales en cabina (PETC): viajan bajo el asiento y se computan como peso de tráfico real (peso animal + transportín ≤ 8 kg).',
      'Animales en bodega (AVIH): viajan en compartimento ventilado y se computan con su peso real verificado en báscula.'
    ]
  },

  // =========================================================================
  // SECCIÓN ESPECIAL: PREPARACIÓN ENTREVISTA NETJETS & NORMATIVA EASA AIR OPS
  // =========================================================================

  // 12. ESQUEMAS DE COMBUSTIBLE EASA: PLAN BÁSICO, CONTINGENCIA Y RESERVA FINAL
  {
    id: 'netjets-easa-fuel-schemes',
    category: 'easa-netjets',
    title: 'Esquemas de Combustible EASA: Plan Básico, Contingencia y Reservas Finales',
    subtitle: 'Desglose oficial de bloques de combustible, políticas de aeródromo aislado y llamadas de emergencia (CAT.OP.MPA.180/181/182)',
    manualRef: 'EASA Part-CAT.OP.MPA.180 / 181 / 182 • AMC1 CAT.OP.MPA.181 • ICAO Doc 4444',
    badge: 'EASA Fuel Schemes',
    description: 'Estructura normativa de planificación de combustible para transporte aéreo comercial (CAT) y aviación corporativa. Define con precisión el combustible de rodaje (Taxi), viaje (Trip), contingencia, alternativo, reserva final (Final Reserve) y combustible adicional.',
    warningAlert: 'Llamada de Emergencia MAYDAY FUEL: Es obligatoria cuando la cantidad estimada de combustible utilizable al aterrizar en el aeródromo seguro más cercano es INFERIOR al Combustible de Reserva Final (30 min en reactores). Otorga prioridad absoluta.',
    headers: ['Componente de Combustible', 'Definición & Cálculo Reglamentario', 'Reactores / Turbina', 'Pistón', 'Consideraciones Operacionales'],
    rows: [
      {
        col1: 'Taxi Fuel (Rodaje)',
        col2: 'Cantidad calculada para el consumo de la APU y rodaje antes del despegue considerando demoras locales.',
        col3: 'Consumo real previsto o estándar del tipo',
        col4: 'Estándar según AFM',
        col5: 'No puede utilizarse para compensar déficits de vuelo.',
        highlight: false,
        notes: 'Incluye consumo de APU en rampa antes del calzo.'
      },
      {
        col1: 'Trip Fuel (Viaje)',
        col2: 'Combustible desde la carrera de despegue hasta la toma y aterrizaje en el destino.',
        col3: 'Despegue, ascenso, crucero, descenso, aproximación y aterrizaje',
        col4: 'Despegue a toma completa',
        col5: 'Basado en datos de consumo real y meteorología pronosticada (viento y temp).',
        highlight: false,
        notes: 'Calculado a los niveles de vuelo óptimos del FMS.'
      },
      {
        col1: 'Contingency Fuel (Contingencia Estándar)',
        col2: '5 % del Trip Fuel planificado o 5 minutos de espera a 1.500 ft sobre el destino (el mayor de ambos).',
        col3: '5 % Trip Fuel (Mín. 5 min holding a 1.500 ft ISA)',
        col4: '5 % Trip Fuel (Mín. 5 min)',
        col5: 'Reducible al 3 % si se dispone de un alternativo en ruta adecuado (ERA) en ruta.',
        highlight: true,
        notes: 'También aplicable bajo esquema estadístico de combustible (99% / 95%).'
      },
      {
        col1: 'Alternate Fuel (Alternativo)',
        col2: 'Aproximación frustrada en destino desde DA/MDA, ascenso, crucero al alternativo, descenso, aproximación y toma.',
        col3: 'Frustrada + Ascenso + Crucero + Descenso + Toma',
        col4: 'Mismo perfil completo',
        col5: 'Si se seleccionan dos alternativos, se calcula para el que requiera mayor cantidad.',
        highlight: false,
        notes: 'No requerido si el vuelo < 6h y destino tiene 2 pistas independientes con meteo adecuada.'
      },
      {
        col1: 'Final Reserve Fuel (Reserva Final - FRF)',
        col2: 'Combustible para volar a velocidad de espera a 1.500 ft sobre el aeródromo en condiciones estándar ISA.',
        col3: '30 minutos (Holding Speed a 1.500 ft AAL)',
        col4: '45 minutos (Holding Speed a 1.500 ft AAL)',
        col5: 'RESERVA INVIOLABLE. Si se prevé aterrizar con menos de este valor: MAYDAY MAYDAY MAYDAY FUEL.',
        highlight: true,
        notes: 'Calculado con la masa estimada de aterrizaje en el alternativo.'
      },
      {
        col1: 'Additional Fuel: Aeródromo Aislado',
        col2: 'Combustible adicional obligatorio cuando no existe ningún alternativo de destino disponible.',
        col3: '2 horas a régimen de consumo normal de crucero sobre destino (incluye FRF)',
        col4: '45 min + 15 % crucero (o 2 horas, lo que sea menor)',
        col5: 'Permite volar al destino y mantener una espera prolongada con máxima seguridad.',
        highlight: false,
        notes: 'Aplicable a destinos remotos o islas oceánicas.'
      },
      {
        col1: 'MINIMUM FUEL (Llamada ATC)',
        col2: 'Declaración cuando el vuelo está comprometido a aterrizar en un aeródromo y cualquier demora puede comprometer el FRF.',
        col3: 'Informa al ATC: no tolera demoras',
        col4: 'Informa al ATC: no tolera demoras',
        col5: 'NO CONFIERE PRIORIDAD por sí misma; alerta a control de no impartir desvíos adicionales.',
        highlight: false,
        notes: 'Debe notificarse antes de que se invada la reserva final.'
      },
      {
        col1: 'MAYDAY FUEL (Llamada de Emergencia)',
        col2: 'Declaración de socorro cuando el combustible estimado en la toma en el aeródromo seguro más cercano es menor que el FRF.',
        col3: 'Prioridad absoluta de aterrizaje (MAYDAY x3)',
        col4: 'Prioridad absoluta de aterrizaje (MAYDAY x3)',
        col5: 'OBLIGATORIA según CAT.OP.MPA.182(e). Da prioridad inmediata de vectores y aproximación.',
        highlight: true,
        notes: 'Requiere reporte de seguridad formal posterior (ASR / MOR).'
      }
    ],
    extraNotes: [
      'Monitorización en vuelo: Se deben registrar y comprobar los consumos y remanentes a intervalos no superiores a 60 minutos o en cada waypoint principal (CAT.OP.MPA.182).',
      'Punto de Decisión (Decision Point Procedure): Permite optimizar el contingency fuel calculando el 5% desde el DP al destino.',
      'Alternativo de Despegue (Take-off Alternate): Requerido si la meteo de salida está por debajo de los mínimos de aterrizaje. En bimotores a no más de 1 hora a velocidad OEI en aire en calma.'
    ]
  },

  // 13. LÍMITES FTL EASA: FDP DIARIO BÁSICO, DESCANSOS Y ACUMULADOS
  {
    id: 'netjets-easa-ftl-fdp',
    category: 'easa-netjets',
    title: 'Límites FTL EASA: FDP Diario Básico, Descansos y Acumulados',
    subtitle: 'Tabla de Período Máximo de Actividad de Vuelo (ORO.FTL.205), Descansos en Base / Fuera de Base y Discrecionalidad',
    manualRef: 'EASA Part-ORO.FTL.105 / 205 / 210 / 225 / 235 • CS FTL.1.205',
    badge: 'EASA FTL / Rest',
    description: 'Regulación europea integral sobre limitaciones de tiempo de vuelo y actividad de servicio (FTL). Esencial para la toma de decisiones operativas de comandantes y tripulaciones en aviación ejecutiva y de línea.',
    warningAlert: 'WOCL (Window of Circadian Low): Tramo de 02:00 a 05:59 en el huso donde la tripulación está aclimatada. Penaliza severamente el FDP máximo permitido.',
    headers: ['Concepto / Parámetro FTL', 'Límite Estándar EASA', 'Condición / Sectores', 'Extensiones / Variaciones', 'Notas Críticas'],
    rows: [
      {
        col1: 'FDP Diario Básico: Presentación 06:00 - 13:29',
        col2: '13:00 horas',
        col3: '1 a 2 sectores de vuelo (Tripulación aclimatada)',
        col4: '3 sectores: 12:30 | 4 sectores: 12:00 | 5 sectores: 11:30',
        col5: 'Máxima duración estándar para vuelos diurnos.',
        highlight: true,
        notes: 'Reducción escalonada de 30 min por cada sector adicional.'
      },
      {
        col1: 'FDP Diario Básico: Invasión WOCL (02:00 - 04:59)',
        col2: '11:00 horas',
        col3: '1 a 2 sectores (Inicio en ventana de mínimo circadiano)',
        col4: '3 sectores: 10:30 | 4 sectores: 10:00 | 5 sectores: 09:30',
        col5: 'Fuerte penalización por degradación del estado de alerta.',
        highlight: false,
        notes: 'WOCL comprende de 02:00 a 05:59 horas.'
      },
      {
        col1: 'Tripulación No Aclimatada (Unacclimatised)',
        col2: '11:00 horas (Máx)',
        col3: '1 a 2 sectores independientemente de la hora de firma',
        col4: 'Reducción de 30 min por sector hasta mínimo de 09:00 h',
        col5: 'Aplica cuando se cruzan más de 3 husos horarios sin 48h de adaptación.',
        highlight: false,
        notes: 'Común en vuelos transatlánticos corporativos.'
      },
      {
        col1: 'Extensión del FDP sin descanso a bordo',
        col2: 'Hasta +1 hora (Máx. 2 veces en 7 días)',
        col3: 'Máximo 2 sectores; requiere descanso previo incrementado en 2h o posterior en 4h',
        col4: 'No permitida si el FDP invade la WOCL',
        col5: 'Planificada previamente antes del servicio.',
        highlight: false,
        notes: 'No confundir con la discrecionalidad del comandante.'
      },
      {
        col1: 'Servicio Fraccionado (Split Duty)',
        col2: 'Extensión equivalente a una fracción del descanso en tierra',
        col3: 'Pausa continua en tierra de al menos 3 horas en instalación/alojamiento adecuado',
        col4: 'Normalmente 50 % del descanso si hay alojamiento adecuado',
        col5: 'El tiempo de descanso no computa como parte del FDP.',
        highlight: false,
        notes: 'Pausa < 3h no cuenta para split duty.'
      },
      {
        col1: 'Discrecionalidad del Comandante (Commander\'s Discretion)',
        col2: 'Hasta +2 horas (Estándar) | Hasta +3 horas (Reforzada)',
        col3: 'Circunstancias imprevistas ocurridas DESPUÉS de la hora de presentación',
        col4: 'Requiere consulta obligatoria a todos los tripulantes sobre fatiga',
        col5: 'Informe formal obligatorio al operador si la extensión es > 1 hora (plazo 28 días).',
        highlight: true,
        notes: 'Potestad indelegable del Comandante en defensa de la operación.'
      },
      {
        col1: 'Descanso Mínimo en Base de Operaciones (Home Base)',
        col2: 'Al menos la duración de la actividad previa o 12 horas (el mayor)',
        col3: 'En el domicilio o alojamiento habitual del tripulante',
        col4: 'Incluye tiempo para traslados y necesidades fisiológicas',
        col5: 'Garantiza recuperación completa antes del siguiente servicio.',
        highlight: false,
        notes: 'Si la actividad previa fue de 14h, el descanso debe ser de 14h.'
      },
      {
        col1: 'Descanso Mínimo Fuera de Base (Outstation)',
        col2: 'Al menos la duración de la actividad previa o 10 horas (el mayor)',
        col3: 'En alojamiento adecuado proporcionado por el operador',
        col4: 'Debe permitir al menos 8 horas de sueño ininterrumpido en cama',
        col5: 'Se deben sumar los tiempos reales de traslado hacia/desde el hotel.',
        highlight: true,
        notes: 'Si el traslado dura 1h por trayecto, el descanso mínimo total será 12h.'
      },
      {
        col1: 'Límites Acumulativos de Actividad (Duty Time)',
        col2: '60 h (7 días) | 110 h (14 días) | 190 h (28 días)',
        col3: 'Suma de todos los tiempos de vuelo, guardias en aeropuerto y tareas en tierra',
        col4: 'Distribución uniforme a lo largo del período',
        col5: 'Límite legal estricto no prorrogable.',
        highlight: false,
        notes: 'Incluye simulador, cursos de tierra y guardias.'
      },
      {
        col1: 'Límites Acumulativos de Tiempo de Vuelo (Block Hours)',
        col2: '100 h (28 días) | 900 h (Año Calendario) | 1.000 h (12 Meses)',
        col3: 'Tiempo calzo a calzo (Block to Block time)',
        col4: 'Límite aplicable a todas las licencias de vuelo operadas en CAT',
        col5: 'Previene la fatiga acumulada a largo plazo.',
        highlight: true,
        notes: '900 horas aplica de 1 de enero a 31 de diciembre.'
      },
      {
        col1: 'Descanso Extendido de Recuperación (Weekly Rest)',
        col2: '36 horas continuas incluyendo 2 noches locales',
        col3: 'Intervalo máximo de 168 horas (7 días) entre descansos extendidos',
        col4: 'Obligatorio en base o fuera de base',
        col5: 'Permite sincronización de ritmos circadianos.',
        highlight: false,
        notes: 'Una noche local comprende un período de 8 horas entre 22:00 y 08:00.'
      }
    ],
    extraNotes: [
      'Guardia en Aeropuerto (Airport Standby): Computa al 100% como tiempo de servicio (Duty). Si se asigna vuelo, el FDP comienza en la hora de inicio de la guardia.',
      'Tripulación Reforzada (Augmented Crew): Permite FDP de hasta 16h-18h según la clase de descanso a bordo (Clase 1: litera horizontal separada; Clase 2: asiento reclinable con cortina; Clase 3: asiento reclinable).'
    ]
  },

  // 14. MÍNIMOS DE AERÓDROMO, LVTO Y APPROACH BAN
  {
    id: 'netjets-easa-aom-minima',
    category: 'easa-netjets',
    title: 'Mínimos de Aeródromo, LVTO y Regla de Prohibición de Aproximación (Approach Ban)',
    subtitle: 'Requisitos de visibilidad, RVR, referencias visuales a la DA/DH y condiciones para continuar aproximaciones (CAT.OP.MPA.110/305)',
    manualRef: 'EASA Part-CAT.OP.MPA.110 / 115 / 305 • Part-SPA.LVO.100 • ICAO Annex 6',
    badge: 'AOM & LVO Minima',
    description: 'Guía sintética de mínimos operacionales de despegue y aterrizaje bajo normativa europea. Detalla los puntos de corte de Approach Ban, exigencias visuales en CAT I, II y III, y penalizaciones por aproximaciones no CDFA.',
    warningAlert: 'Approach Ban a 1.000 ft AAL / OM: Si el RVR notificado está por debajo del mínimo aplicable, PROHIBIDO continuar la aproximación más allá de 1.000 ft sobre el aeródromo o del marcador exterior. Si cae por debajo de mínimos DESPUÉS de 1.000 ft, se permite continuar hasta la DA/MDA.',
    headers: ['Fase / Tipo de Operación', 'Mínimo Reglamentario', 'Punto de Decisión / Ban', 'Requisito Visual Requerido', 'Penalizaciones / Variaciones'],
    rows: [
      {
        col1: 'Despegue Estándar (Take-Off)',
        col2: 'RVR $\ge$ 400 m (o 500 m según tipo)',
        col3: 'Antes de iniciar la carrera de despegue',
        col4: 'Marcas de pista y luces de borde visibles',
        col5: 'No requiere aprobación de operaciones de baja visibilidad (LVO).',
        highlight: false,
        notes: 'Despegue diurno/nocturno convencional.'
      },
      {
        col1: 'Despegue de Baja Visibilidad (LVTO)',
        col2: 'RVR < 400 m hasta 125 m (o 150 m Cat D)',
        col3: 'Requiere LVP en vigor en el aeródromo',
        col4: 'Luces de eje de pista de alta intensidad + marcas de eje (segmento visual 90 m)',
        col5: 'Requiere aprobación específica SPA.LVO y tripulación cualificada.',
        highlight: true,
        notes: 'Espaciado de luces de eje $\le$ 15 m para RVR de 125 m.'
      },
      {
        col1: 'Aproximación de Precisión CAT I',
        col2: 'DH $\ge$ 200 ft | RVR $\ge$ 550 m (o 800 m sin luces de aprox)',
        col3: 'Approach Ban a 1.000 ft AAL / Outer Marker',
        col4: 'Al menos 1 elemento visual visible (luces de aprox, umbral, marcas, TDZ, PAPI)',
        col5: 'LVP no requeridas formalmente para CAT I.',
        highlight: false,
        notes: 'Aproximación 3D de precisión básica.'
      },
      {
        col1: 'Aproximación de Precisión CAT II',
        col2: '100 ft $\le$ DH < 200 ft | RVR $\ge$ 300 m',
        col3: 'Approach Ban a 1.000 ft AAL / OM',
        col4: 'Al menos 3 luces consecutivas (eje de aprox, TDZ, eje de pista) con elemento transversal',
        col5: 'Requiere LVP activas, radaraltímetro operativo y aprobación SPA.LVO.',
        highlight: true,
        notes: 'Piloto automático acoplado con desacople a DH o aterrizaje automático.'
      },
      {
        col1: 'Aproximación CAT III A',
        col2: 'DH < 100 ft (o sin DH) | RVR $\ge$ 175 m',
        col3: 'Approach Ban a 1.000 ft AAL / OM',
        col4: 'Al menos 3 luces consecutivas de eje o TDZ en la DH',
        col5: 'Sistema con modo Fail-Passive o Fail-Operational y autoland.',
        highlight: false,
        notes: 'Muy habitual en reactores ejecutivos modernos con HUD/EVS.'
      },
      {
        col1: 'Aproximación CAT III B',
        col2: 'DH < 50 ft (o sin DH) | 75 m $\le$ RVR < 175 m',
        col3: 'Approach Ban a 1.000 ft AAL / OM',
        col4: 'Al menos 1 luz de eje de pista visible en DH (o ninguna si no hay DH)',
        col5: 'Requiere sistema Fail-Operational con guiado de rodadura (Rollout).',
        highlight: false,
        notes: 'Capacidad de aterrizaje y parada casi totalmente automática.'
      },
      {
        col1: 'Aproximaciones No de Precisión (NPA) - CDFA',
        col2: 'Mínimos de carta (MDH/MDA + RVR según sistema)',
        col3: 'Técnica de Descenso Continuo (CDFA) obligatoria',
        col4: 'Elementos del umbral o luces de aproximación en la DDA/MDA',
        col5: 'Se añade un margen de seguridad a la MDA para no perderla en la frustrada (DDA).',
        highlight: false,
        notes: 'Mejora radicalmente el perfil de estabilización y CFIT avoidance.'
      },
      {
        col1: 'Aproximaciones No-CDFA (Penalización)',
        col2: 'RVR de la carta + 200 m (Cat A/B) | RVR + 400 m (Cat C/D)',
        col3: 'Técnica escalonada (Step-down / Dive & Drive)',
        col4: 'Contacto visual pleno antes de iniciar el descenso desde MDA',
        col5: 'Penalización reglamentaria estricta por mayor riesgo de aproximación desestabilizada.',
        highlight: true,
        notes: 'EASA desaconseja fuertemente volar fuera de CDFA.'
      },
      {
        col1: 'Aproximación en Circuito (Visual Circling)',
        col2: 'MDA/H de circuito + Visibilidad mínima según categoría (Cat B 1.500m / Cat C 2.400m)',
        col3: 'Mantener contacto visual continuo con la pista durante toda la maniobra',
        col4: 'Entorno de pista permanentemente a la vista',
        col5: 'PROHIBIDO descender de la MDA de circuito hasta estar alineado en final.',
        highlight: false,
        notes: 'Volar dentro del radio de protección de la categoría de velocidad.'
      }
    ],
    extraNotes: [
      'Regla de Oro de Approach Ban: Antes de 1.000 ft AAL manda el reporte meteorológico (RVR oficial). Pasados los 1.000 ft AAL manda la visión del piloto (contacto visual a la DA/MDA).',
      'Fallo de Luces de Aproximación: Si falla el sistema ALS, el RVR mínimo se incrementa según las tablas de penalización de aeródromo del manual de operaciones.'
    ]
  },

  // 15. ESPACIO AÉREO RVSM, PBN Y CONTINGENCIAS
  {
    id: 'netjets-easa-rvsm-equipment',
    category: 'easa-netjets',
    title: 'Operación en Espacio Aéreo RVSM, Tolerancias y Contingencias',
    subtitle: 'Requisitos de equipamiento (2 Altímetros + 1 AP + 1 Alerta + 1 Transponder), tolerancias y procedimientos de contingencia',
    manualRef: 'EASA Part-SPA.RVSM.100 / 110 • ICAO Doc 9574 • ICAO Doc 4444 • SERA.8015',
    badge: 'RVSM & Navigation',
    description: 'Procedimientos obligatorios para la navegación con separación vertical reducida (1.000 ft) entre FL290 y FL410. Incluye tolerancias de altimetría en tierra y crucero, contingencias por fallo de sistemas y técnica SLOP.',
    warningAlert: 'Fallo de RVSM en Vuelo: Notificar de inmediato al ATC con la fraseología obligatoria "UNABLE RVSM DUE TO EQUIPMENT". ATC aplicará 2.000 ft de separación convencional o coordinará el descenso por debajo de FL290.',
    headers: ['Elemento / Parámetro RVSM', 'Límites / Requisitos', 'Tolerancias Admisibles', 'Procedimiento de Contingencia', 'Fraseología Radiotelefónica'],
    rows: [
      {
        col1: 'Espacio Aéreo RVSM (Límites)',
        col2: 'FL290 a FL410 inclusive (Separación vertical 1.000 ft)',
        col3: 'Por encima de FL410 la separación vuelve a ser de 2.000 ft',
        col4: 'Si no se cuenta con aprobación RVSM, volar a o por debajo de FL280',
        col5: '`NEGATIVE RVSM` (si no dispone de aprobación).',
        highlight: true,
        notes: 'Optimiza el espacio aéreo aumentando la capacidad de tráfico.'
      },
      {
        col1: 'Equipamiento Mínimo: 4 Sistemas Obligatorios',
        col2: '2 Altímetros Primarios + 1 AP con Altitude-Hold + 1 Alerta Altitud + 1 Transponder Modo C/S',
        col3: 'Los 4 sistemas deben estar 100% operativos al ingresar al espacio RVSM',
        col4: 'La pérdida de cualquiera de estos 4 sistemas invalida la capacidad RVSM',
        col5: 'Verificar estado de sistemas en el chequeo previo al cruce de FL290.',
        highlight: true,
        notes: 'Regla mnemotécnica: 2 Altímetros + AP + Alertador + SSR.'
      },
      {
        col1: 'Cotejo Altimétrico en Tierra (Pre-flight Check)',
        col2: 'Ajuste de QNH local en ambos altímetros primarios',
        col3: 'Máx. ±75 ft respecto a la elevación conocida del campo (o ±50 ft según AFM del jet)',
        col4: 'Diferencia máxima entre altímetros primarios: generalmente $\le$ 50 a 75 ft',
        col5: 'Si se supera la tolerancia, el avión no puede despacharse para vuelos RVSM.',
        highlight: false,
        notes: 'Comprobación obligatoria antes de iniciar el rodaje.'
      },
      {
        col1: 'Cotejo Altimétrico en Vuelo (In-Flight Crosscheck)',
        col2: 'Ajuste Standard 1013.25 hPa al pasar la Altitud de Transición (TA)',
        col3: 'Diferencia máxima entre altímetros primarios: 200 ft (60 m)',
        col4: 'El piloto automático debe mantener el nivel dentro de ±65 ft (±20 m)',
        col5: 'Registrar lecturas periódicas al menos una vez por hora en crucero.',
        highlight: false,
        notes: 'Discrepancia > 200 ft obliga a declarar degradación RVSM.'
      },
      {
        col1: 'Fallo de Equipamiento en Vuelo RVSM',
        col2: 'Fallo de AP, pérdida de altímetro primario o discrepancia > 200 ft',
        col3: 'Mantener nivel asignado manualmente con máxima precisión',
        col4: 'Vigilar tráfico con TCAS; solicitar cambio de nivel o vectores a ATC',
        col5: '`UNABLE RVSM DUE TO EQUIPMENT`.',
        highlight: true,
        notes: 'ATC proveerá 2.000 ft de separación vertical con otros tráficos.'
      },
      {
        col1: 'Desplazamiento Lateral Estratégico (SLOP)',
        col2: 'Desvío voluntario a la DERECHA del eje de ruta hasta 2 NM',
        col3: 'Incrementos de 0.1 NM o escalones de 1 y 2 NM a la DERECHA',
        col4: 'Mitiga riesgo de colisión por extrema precisión GPS y encuentros de estela turbulenta',
        col5: 'No requiere autorización de ATC en espacios aéreos publicados con SLOP.',
        highlight: false,
        notes: 'NUNCA realizar SLOP a la izquierda del eje.'
      },
      {
        col1: 'Respuesta ante TCAS II RA (Versión 7.1)',
        col2: 'Maniobra vertical inmediata desconectando AP si es preciso',
        col3: 'Iniciar cabeceo en $\le$ 5 seg (RA inicial) o $\le$ 2.5 seg (Reversal / Strengthening)',
        col4: 'PRIORIDAD ABSOLUTA sobre cualquier instrucción contradictoria del ATC',
        col5: '`[Callsign] TCAS RA` y tras resolver: `CLEAR OF CONFLICT, RETURNING TO [FL]`.',
        highlight: true,
        notes: 'Nunca maniobrar en sentido opuesto a la indicación del TCAS RA.'
      },
      {
        col1: 'Especificaciones PBN (RNAV 5 vs RNAV 1 vs RNP APCH)',
        col2: 'RNAV 5 (±5 NM en ruta) | RNAV 1 (±1 NM en SID/STAR) | RNP APCH (±0.3 NM en Final)',
        col3: 'Precisión lateral de contención requerida el 95 % del tiempo de vuelo',
        col4: 'RNP exige monitorización de integridad y alerta a bordo (OBPMA)',
        col5: 'Notificar a ATC si se pierde la capacidad de navegación GPS/RNP.',
        highlight: false,
        notes: 'RNAV 5 (B-RNAV) es obligatoria en todo el espacio aéreo europeo superior.'
      }
    ],
    extraNotes: [
      'Turbulencia Severa en RVSM: Notificar a ATC "UNABLE RVSM DUE TO TURBULENCE" si la turbulencia impide mantener el nivel dentro de los márgenes admisibles.',
      'Transición Barométrica: En ascenso, cambio de QNH a Standard en la Altitud de Transición (TA). En descenso, cambio de Standard a QNH en el Nivel de Transición (TL).'
    ]
  },

  // 16. NORMATIVA AIRCREW: VALIDEZ DE LICENCIAS, CHEQUEOS Y REQUISITOS MÉDICOS
  {
    id: 'netjets-easa-aircrew-recency',
    category: 'easa-netjets',
    title: 'Normativa Aircrew: Validez de Licencias, Chequeos y Requisitos Médicos',
    subtitle: 'Validez de Médico Clase 1, regla de edad 60/65 años, experiencia reciente (Recency 90 días) y chequeos OPC / Line Check',
    manualRef: 'EASA Part-FCL.055 / 060 / 065 • Part-MED.A.045 • Part-ORO.FC.230',
    badge: 'Aircrew & Licensing',
    description: 'Resumen sistemático de las atribuciones, limitaciones y períodos de mantenimiento de competencia para pilotos de transporte aéreo comercial (CAT) y aviación ejecutiva en Europa.',
    warningAlert: 'Regla de Edad 60/65 (FCL.065): Entre 60 y 64 años solo se puede volar en CAT como tripulación multipiloto si el OTRO piloto es menor de 60 años. A los 65 años cumplidos queda PROHIBIDO actuar como piloto en CAT.',
    headers: ['Título / Habilitación / Chequeo', 'Período de Validez', 'Condición Especial / Reducción', 'Ventana de Revalidación', 'Criterio Operativo'],
    rows: [
      {
        col1: 'Certificado Médico Clase 1 (< 40 años)',
        col2: '12 meses',
        col3: 'Válido para cualquier operación CAT (monopiloto o multipiloto)',
        col4: 'Hasta 45 días antes de la caducidad conservando fecha',
        col5: 'Examen periódico por Médico Examinador Aéreo (AME).',
        highlight: false,
        notes: 'Clase 1 estándar europeo.'
      },
      {
        col1: 'Certificado Médico Clase 1 (40 a 59 años)',
        col2: '12 meses (Multipiloto) | 6 meses (Monopiloto con pax)',
        col3: 'Se reduce a 6 meses si se opera transporte comercial de pasajeros con un solo piloto',
        col4: '45 días previos a caducidad',
        col5: 'Vigilancia cardiovascular y electrocardiograma más frecuente.',
        highlight: true,
        notes: 'En NetJets (multipiloto) se mantiene a 12 meses hasta los 60 años.'
      },
      {
        col1: 'Certificado Médico Clase 1 ($\ge$ 60 años)',
        col2: '6 meses',
        col3: 'Aplica a cualquier operación de transporte aéreo comercial (CAT) sin excepción',
        col4: '45 días previos a caducidad',
        col5: 'Chequeo semestral obligatorio.',
        highlight: true,
        notes: 'Reducción universal a 6 meses para mayores de 60 años en CAT.'
      },
      {
        col1: 'Limitación de Edad 60 a 64 años (Age 60-64)',
        col2: 'Hasta el cumplimiento de los 65 años',
        col3: 'Solo puede operar en CAT como miembro de tripulación MULTIPILOTO',
        col4: 'Condición obligatoria: El otro piloto debe ser MENOR DE 60 AÑOS',
        col5: 'Prohibido que ambos pilotos tengan 60 o más años en el mismo vuelo.',
        highlight: true,
        notes: 'Regla "Only one pilot over 60" de EASA FCL.065.'
      },
      {
        col1: 'Límite Máximo de Edad 65 años (Age 65)',
        col2: 'Cese de atribuciones CAT al cumplir los 65 años',
        col3: 'Prohibición absoluta para actuar como Comandante o Copiloto en CAT',
        col4: 'Sin excepciones para transporte comercial',
        col5: 'Puede continuar en instrucción, vuelos privados (Part-NCO/NCC) o ferry.',
        highlight: false,
        notes: 'Límite estricto de seguridad psicofisiológica de OACI/EASA.'
      },
      {
        col1: 'Experiencia Reciente de Vuelo (Recency - FCL.060)',
        col2: 'Últimos 90 días precedentes al vuelo',
        col3: 'Al menos 3 despegues, aproximaciones y aterrizajes como Pilot Flying (PF)',
        col4: 'En el mismo tipo/clase de aeronave o en un simulador FFS cualificado del tipo',
        col5: 'Vuelo nocturno: Al menos 1 toma nocturna en 90 días (salvo si posee IR en vigor).',
        highlight: true,
        notes: 'Condición legal indispensable para poder ser programado a un vuelo.'
      },
      {
        col1: 'Habilitación de Tipo (Type Rating) / IR',
        col2: '1 año (12 meses calendario)',
        col3: 'Revalidación mediante verificación de competencia (LPC - Licence Proficiency Check)',
        col4: 'Dentro de los 3 meses anteriores a la fecha de caducidad',
        col5: 'Conserva la fecha de expiración original anual.',
        highlight: false,
        notes: 'Generalmente combinado con el OPC del operador.'
      },
      {
        col1: 'Verificación de Competencia del Operador (OPC)',
        col2: '6 meses calendario',
        col3: 'Chequeo semestral en simulador FFS que cubre fallos y procedimientos de emergencia',
        col4: 'Dentro de los 3 meses previos a la expiración',
        col5: 'Exigencia obligatoria de la Parte ORO.FC.230.',
        highlight: true,
        notes: 'Evalúa procedimientos de compañía, CRM y operación anormal.'
      },
      {
        col1: 'Verificación en Línea (Line Check)',
        col2: '12 meses calendario',
        col3: 'Evaluación en vuelo real de línea operando una ruta típica de la red',
        col4: 'Dentro de los 3 meses previos a la expiración',
        col5: 'Evalúa operación normal, cumplimiento de SOP, toma de decisiones y servicio al cliente.',
        highlight: false,
        notes: 'Supervisado por un Comandante Examinador (TRE/TRI).'
      },
      {
        col1: 'Competencia Lingüística en Inglés (ICAO English)',
        col2: 'Nivel 4: 4 años | Nivel 5: 6 años | Nivel 6: Permanente',
        col3: 'Anotación oficial en la licencia de piloto FCL.055',
        col4: 'Evaluación formal antes de la fecha de caducidad',
        col5: 'Estándar indispensable para operar en el entorno internacional de NetJets.',
        highlight: false,
        notes: 'Nivel 6 no caduca nunca.'
      }
    ],
    extraNotes: [
      'Máscara de Oxígeno Quick-Donning (CAT.IDE.A.235): Obligatoria en todos los aviones presurizados certificados para operar por encima de FL250. Debe colocarse con una sola mano en menos de 5 segundos.',
      'Incapacidad Temporal: El titular de un certificado médico debe suspender sus atribuciones si sufre una enfermedad o lesión que dure más de 21 días o tras cualquier intervención quirúrgica.'
    ]
  },

  // 17. DESPACHO MEL / DDPM, ESCENARIOS NETJETS Y CRM
  {
    id: 'netjets-easa-mel-dispatch',
    category: 'easa-netjets',
    title: 'Despacho MEL / DDPM, Escenarios NetJets y CRM',
    subtitle: 'Intervalos de rectificación MEL (A, B, C, D), procedimientos (M)/(O), pasajeros conflictivos y toma de decisiones corporativas',
    manualRef: 'EASA Part-ORO.MLR.105 • CS-MMEL • Part-SPA.DG • ICAO Doc 9811',
    badge: 'MEL & NetJets CRM',
    description: 'Directrices maestras de despacho técnico con elementos inoperativos, gestión de mercancías peligrosas (NOTOC), aproximaciones empinadas (Steep Approaches) y manejo de situaciones complejas con propietarios VIP (Owners).',
    warningAlert: 'Día del Descubrimiento en MEL: El día en que la avería o discrepancia se anota en el Aircraft Technical Log (ATL) NO cuenta para el cómputo del plazo de rectificación. El plazo comienza a las 00:00 del día siguiente.',
    headers: ['Categoría / Procedimiento', 'Intervalo de Rectificación', 'Día de Descubrimiento', 'Responsable de Ejecución', 'Impacto Operacional'],
    rows: [
      {
        col1: 'MEL Categoría A',
        col2: 'Intervalo específico fijado en las observaciones de la MEL (horas, ciclos, vuelos o fecha límite)',
        col3: 'Según se especifique expresamente en el ítem',
        col4: 'Mantenimiento / Tripulación según procedimiento',
        col5: 'Sin margen de extensión estándar.',
        highlight: false,
        notes: 'Ejemplo: 3 vuelos consecutivos o 24 horas calendario.'
      },
      {
        col1: 'MEL Categoría B',
        col2: '3 días consecutivos (72 horas)',
        col3: 'Excluye el día en que se registró en el ATL',
        col4: 'Personal técnico de mantenimiento certificado (LMA)',
        col5: 'Aplica a sistemas redundantes críticos (e.g. un radar meteo, un generador eléctrico).',
        highlight: true,
        notes: 'Prorrogable una sola vez bajo procedimiento formal de extensión del operador.'
      },
      {
        col1: 'MEL Categoría C',
        col2: '10 días consecutivos (240 horas)',
        col3: 'Excluye el día del reporte en el ATL',
        col4: 'Personal técnico de mantenimiento certificado',
        col5: 'Categoría más común para elementos de confort, duplicidades de aviónica menor o luces secundarias.',
        highlight: false,
        notes: 'Plazo estándar de 10 días.'
      },
      {
        col1: 'MEL Categoría D',
        col2: '120 días consecutivos',
        col3: 'Excluye el día del reporte en el ATL',
        col4: 'Personal de mantenimiento',
        col5: 'Aplica a equipos opcionales o sistemas no esenciales (e.g. entretenimiento de pasaje, hornos de galley).',
        highlight: false,
        notes: 'No prorrogable habitualmente.'
      },
      {
        col1: 'Procedimiento (M) de la MEL',
        col2: 'Acción técnica de mantenimiento obligatoria antes del vuelo',
        col3: 'Previo al despacho del avión',
        col4: 'Técnico de Mantenimiento Certificado (LMA)',
        col5: 'Asegura la configuración física segura del sistema (e.g. colocar pines, puentear válvulas, bloquear frenos).',
        highlight: true,
        notes: 'La tripulación solo puede realizarlo si el manual lo autoriza expresamente tras entrenamiento.'
      },
      {
        col1: 'Procedimiento (O) de la MEL',
        col2: 'Procedimiento operativo ejecutado por la tripulación de vuelo',
        col3: 'Durante la preparación de cabina o en vuelo',
        col4: 'Comandante y Copiloto (Tripulación de Vuelo)',
        col5: 'Ajuste de cartas de performance, limitaciones de nivel, checklists especiales o configuraciones de sistemas.',
        highlight: false,
        notes: 'Anotación en el plan de vuelo y briefing conjunto obligatorio.'
      },
      {
        col1: 'MEL vs CDL (Configuration Deviation List)',
        col2: 'MEL = Sistemas e instrumentos inoperativos | CDL = Partes exteriores secundarias faltantes',
        col3: 'La CDL cubre paneles, carenas, sellos o generadores de vórtice exteriores',
        col4: 'Requiere aplicar penalizaciones de peso, combustible o velocidad según la CDL del AFM',
        col5: 'Ambos documentos deben verificarse conjuntamente en el despacho técnico.',
        highlight: false,
        notes: 'CDL forma parte integrante del AFM del fabricante.'
      },
      {
        col1: 'Manejo de Propietarios VIP (Owner Focus vs Safety)',
        col2: 'Seguridad innegociable + Servicio de excelencia empático y proactivo',
        col3: 'Ante peticiones de aterrizar bajo mínimos, despegar con sobrepeso o saltar FTL',
        col4: 'Comandante como líder de seguridad y embajador de NetJets',
        col5: 'Explicación asertiva y profesional, transmitiendo que se protege su vida; coordinación inmediata de alternativas con Dispatch.',
        highlight: true,
        notes: 'Pilar fundamental evaluado en las entrevistas de NetJets.'
      },
      {
        col1: 'Pasajeros Conflictivos (Niveles OACI / EASA)',
        col2: 'Nivel 1: Verbal | Nivel 2: Físico leve | Nivel 3: Amenaza vital | Nivel 4: Violación de cabina',
        col3: 'Clasificación de 4 niveles de amenaza para seguridad',
        col4: 'Comandante tiene autoridad absoluta para desembarcar pasajeros disruptivos (CAT.GEN.MPA.105)',
        col5: 'Nivel 4 activa Cockpit Lockdown total y aterrizaje de emergencia inmediato.',
        highlight: false,
        notes: 'La tripulación de cabina coordina la desescalada aplicando protocolos de compañía.'
      },
      {
        col1: 'Mercancías Peligrosas: NOTOC',
        col2: 'Notificación escrita obligatoria entregada al Comandante antes del despegue',
        col3: 'Contiene: Número UN, clase de peligro, bultos, masa neta, ubicación en bodega y Drill Code',
        col4: 'Agente de rampa / Despachador de vuelo',
        col5: 'Imprescindible para que el Comandante coordine la respuesta con ATC y bomberos en caso de emergencia.',
        highlight: false,
        notes: 'Debe guardarse una copia firmada en la escala de salida.'
      },
      {
        col1: 'Aproximaciones Empinadas (Steep Approaches)',
        col2: 'Senda de aproximación $\ge$ 4.5° (e.g. London City 5.5°, Sion, Lugano)',
        col3: 'Requiere avión certificado en AFM, aprobación en Manual de Operaciones y tripulación entrenada en simulador',
        col4: 'Límites de viento más restrictivos y perfiles de empuje / speedbrakes específicos',
        col5: 'Operación muy habitual y prestigiosa en la flota europea de NetJets.',
        highlight: false,
        notes: 'Mínimos de visibilidad más elevados que en aproximaciones convencionales.'
      }
    ],
    extraNotes: [
      'Cadena de Decisión CRM (Pace Graded Assertiveness): Probe -> Alert -> Challenge -> Emergency -> Takeover. Si el Comandante no responde a desviaciones críticas a la altura de estabilización, el Copiloto TIENE LA OBLIGACIÓN LEGAL de asumir los mandos ("I HAVE CONTROLS") y frustrar.',
      'Aproximación Estabilizada: Todo vuelo debe estar 100% estabilizado a 1.000 ft en IMC (500 ft en VMC): en senda, localizador, velocidad VREF a VREF+10 kt, empuje adecuado y configuración final de aterrizaje.'
    ]
  }
];

