export interface ProcedureItem {
  role?: 'PF' | 'PM' | 'PA' | 'ATC' | 'CREW' | 'NOTE' | 'STEP' | 'ALERT';
  action: string;
  callout?: string;
  details?: string;
}

export interface ProcedureSection {
  title: string;
  badge?: string;
  color?: 'sky' | 'emerald' | 'amber' | 'rose' | 'purple' | 'indigo';
  items: ProcedureItem[];
}

export interface ProcedureCard {
  id: string;
  category: 'briefings' | 'normal' | 'emergency' | 'special';
  title: string;
  subtitle: string;
  manualRef: string;
  airplane: string;
  badges: string[];
  memoryItems?: string[];
  goldenRules?: string[];
  summary: string;
  diagramNote?: string;
  /** Ruta pública a figura SOPM (ej. ./sop-diagrams/visual-approach-fig.jpg) */
  diagramImage?: string;
  diagramCaption?: string;
  sections: ProcedureSection[];
}

export const PROCEDURE_CARDS: ProcedureCard[] = [
  // =========================================================================
  // 1. BRIEFINGS
  // =========================================================================
  {
    id: 'card-briefing-prep-vuelo',
    category: 'briefings',
    title: 'Preparación de Vuelo y Briefing de Tripulación',
    subtitle: 'Flujo de Sala Delivery, Sobre de Vuelo y Briefing Vuelo-Cabina (TELSI)',
    manualRef: 'MOA Caps 1.4, 8.1, 8.3 & MOB 2.0.6',
    airplane: 'Embraer 195-E2 / Binter Ops',
    badges: ['Prevuelo', 'Briefing Tripulación', 'TELSI', 'SOP'],
    goldenRules: [
      'Discrecional de combustible >500 kg requiere recálculo y nuevo PVO.',
      'En LVO / LVTO chequear siempre alternativo de despegue y que ELM < MLM (54.000 kg).',
      'Briefing de emergencia a cabina estructurado bajo mnemónico TELSI (¡Nunca NITS!).'
    ],
    summary: 'Guía metódica para la preparación del vuelo en Sala Delivery (ePerf, Lido, Taillog), análisis del Sobre de Vuelo y realización del Briefing conjunto con la Tripulación de Cabina.',
    diagramImage: './sop-diagrams/briefing-prep-vuelo.svg',
    diagramCaption: 'Infografía Oficial: Preparación de Vuelo y Briefing de Tripulación (TELSI)',
    diagramNote: 'Flujo Sala Delivery · Sobre de Vuelo PVO · Briefing Tripulación TELSI · Protocolo Emergencias Cabina',
    sections: [
      {
        title: '1. Sala Delivery / iPad Reserva',
        color: 'sky',
        items: [
          { role: 'STEP', action: 'MPO: Actualizar vuelo y documentación operacional.', details: 'Verificar revisiones vigentes de manuales y avisos de flota.' },
          { role: 'STEP', action: 'Actualizar App ePerf.', details: 'Comprobar base de datos de aeródromos y pesos vigentes.' },
          { role: 'STEP', action: 'Actualizar App Lido mPilot.', details: 'Descargar ciclo AIRAC activo y cartas de aeródromo/ruta.' },
          { role: 'STEP', action: 'Taillog: Descargar PVOs del día.', details: 'Verificar estado técnico de la aeronave asignada y diferidos MEL.' }
        ]
      },
      {
        title: '2. Sobre de Vuelo (PVO / OFP)',
        color: 'indigo',
        items: [
          { role: 'STEP', action: 'Dejar 1 copia del manifiesto de tripulación en despacho.' },
          { role: 'STEP', action: 'Verificar matrícula, número de pasajeros esperados y tiempo de vuelo programado.' },
          { role: 'STEP', action: 'Combustible: Analizar Tankering vs EASA Re-fuel.', details: '¿Extra? ¿Discrecional? Si discrecional > 500 kg -> solicitar New PVO.' },
          { role: 'STEP', action: 'Información Adicional de Salida y Llegada:', details: 'Pistas esperadas (AeroWeather), waypoints SID/STAR, nivel de crucero planificado, ítems MEL diferidos (Lido Document), previsión de turbulencia y mercancías peligrosas (MMPP / NOTOC).' },
          { role: 'ALERT', action: 'Si LVTO aplicable:', details: 'Chequear alternativo de despegue en PVO, distancia máxima (1h monomotor) y peso estimado de aterrizaje ELM < MLM (54.000 kg).' }
        ]
      },
      {
        title: '3. Briefing Tripulación de Vuelo - Cabina',
        color: 'emerald',
        items: [
          { role: 'STEP', action: 'Comprobación de licencias, certificado médico y pasaporte.' },
          { role: 'STEP', action: 'Tiempos de vuelo, escalas, número de pasajeros y pasajeros con necesidades especiales (SPC / PRM / UM).' },
          { role: 'STEP', action: 'Meteorología en ruta, destino y aeropuertos alternativos.' },
          { role: 'STEP', action: 'Rodajes cortos, operaciones LVO y política de no utilización de dispositivos electrónicos personales.' },
          { role: 'STEP', action: 'Protocolo de repostaje con pasajeros a bordo (2 salidas libres y expeditas).' },
          { role: 'STEP', action: 'Armado/desarmado correcto de rampas (Cross-check obligatorio).' },
          { role: 'STEP', action: 'Elementos MEL inoperativos que afecten al pasaje o a la operación.' },
          { role: 'STEP', action: 'Seguridad / AVSEC: Palabra clave de interferencia ilícita y pasajeros conflictivos.' },
          { role: 'STEP', action: 'Gestión de Amenazas y Errores (TEM): Vuelos bajo supervisión, cambios de rutina o regreso tras larga inactividad.' }
        ]
      },
      {
        title: '4. Protocolo de Llamadas en Emergencia de Cabina',
        color: 'rose',
        items: [
          { role: 'PA', callout: '"SOBRECARGO A CABINA"', action: 'Llamada inicial para briefing TELSI cara a cara en cockpit.' },
          { role: 'PA', callout: '"TRIPULACIÓN DE CABINA, FINALIZAR PREPARACIÓN"', action: 'Aviso a 5 minutos del aterrizaje en emergencia prevista.' },
          { role: 'PA', callout: '"PROTECCIÓN, PROTECCIÓN, PROTECCIÓN"', action: 'Aviso a 30 segundos del impacto (Prevista e Imprevista).' },
          { role: 'PA', callout: '"TRIPULACIÓN DE CABINA, ESPEREN INSTRUCCIONES"', action: 'Tras detenerse el avión: evaluación de situación (Posible evacuación).' },
          { role: 'PA', callout: '"TRIPULACIÓN DE CABINA, PERMANEZCAN SENTADAS"', action: 'Situación controlada: no se requiere evacuación (Posible desalojo).' },
          { role: 'PA', callout: '"EVACUACIÓN, EVACUACIÓN, EVACUACIÓN"', action: 'Orden verbal de evacuación inmediata por salidas operativas.' }
        ]
      }
    ]
  },

  {
    id: 'card-briefing-lvo',
    category: 'briefings',
    title: 'Briefing LVO / LVTO & Condiciones Engelantes',
    subtitle: 'Mínimos de despegue con visibilidad reducida (RVR 125m), Anti-Ice y LVP',
    manualRef: 'MOA 8.4, MOB 2.0.6.1 & SOPM Sec 2',
    airplane: 'Embraer 195-E2 / Binter Ops',
    badges: ['LVTO', 'LVP', 'TWIN', 'Anti-Ice', 'Engelamiento'],
    goldenRules: [
      'El Comandante actuará siempre como Pilot Flying (PF) en despegues LVTO.',
      'Mínimo absoluto de despegue Binter: RVR 125 m (con luces de eje pista <= 15 m y borde <= 60 m).',
      'ENG RUN-UP obligatorio si OAT <= 3°C cada 30 min: 60% N1 durante 10 s y volver a IDLE.',
      'Anti-Ice en MCDU (TO): <5°C ALL; entre 5°C y 10°C ENG si hay humedad visible.'
    ],
    summary: 'Procedimiento de despegue con visibilidad reducida (LVTO), criterios de selección de potencia (No FLEX), chequeo de 3 transmisómetros RVR y precauciones en rodaje bajo LVP.',
    diagramImage: './sop-diagrams/briefing-lvo-lvto.svg',
    diagramCaption: 'Infografía Oficial: Briefing LVO / LVTO & Condiciones Engelantes',
    diagramNote: 'Mínimos LVTO (RVR 125m) · Engine Run-Up · Estructura TWIN · Rodaje bajo LVP',
    sections: [
      {
        title: 'Parámetros y Limitaciones de Despegue LVTO',
        color: 'sky',
        items: [
          { role: 'NOTE', action: 'Tripulación: Comandante siempre PF; ambos pilotos deben estar cualificados y en vigor LVO.' },
          { role: 'NOTE', action: 'Empuje: NO FLEX TAKEOFF permitido. Usar empuje nominal o DERATED según ePerf.' },
          { role: 'NOTE', action: 'Engine Run-up en tierra si OAT <= 3°C con engelamiento:', details: 'Cada 30 minutos acelerar a 60% N1 durante 10 segundos antes de volver a IDLE.' },
          { role: 'NOTE', action: 'Flaps de despegue:', details: 'Seleccionar según condiciones de pista y ASD. Valorar mayor flap para ampliar margen de parada.' },
          { role: 'NOTE', action: 'Requisitos de Pista para LVTO (RVR 125 m a 150 m):', details: 'Luces de eje de pista de alta intensidad (HIL) espaciadas <= 15 m y luces de borde <= 60 m. Visibles al menos 6 intervalos o 7 luces de eje.' },
          { role: 'NOTE', action: 'SVS (Synthetic Vision):', details: 'SVS en ON. Si estuviera INOP -> PM sintoniza ILS de pista en curso de despegue.' }
        ]
      },
      {
        title: 'Estructura TWIN aplicada a LVO / Bad Weather',
        color: 'amber',
        items: [
          { role: 'STEP', action: 'T (Threats / LVP): Procedimientos LVP en vigor en el aeródromo. Revisar Hot Spots de rodaje y orografía circundante (MSA elevada).' },
          { role: 'STEP', action: 'W (Weather / Pista): Estado de pista (WET/Contaminated), RVR de 3 segmentos > mínimos (1er segmento evaluable por piloto). Ajuste MCDU Anti-Ice.' },
          { role: 'STEP', action: 'I (Inop Items): Diferidos MEL revisados que no degraden la capacidad LVO del avión.' },
          { role: 'STEP', action: 'N (NOTAMs): NOTAMs revisados sin fallos de balizamiento que degraden el LVTO.' }
        ]
      },
      {
        title: 'Técnica de Rodaje en LVP',
        color: 'emerald',
        items: [
          { role: 'STEP', action: 'Velocidad máxima de rodaje: 10 kt en recta y 5 kt en virajes.' },
          { role: 'STEP', action: 'Ambos pilotos mirando fuera, excepto verificación puntual de nombres de calles en carta.' },
          { role: 'ALERT', action: 'Ante cualquier duda de posición:', details: 'PARAR EL AVIÓN INMEDIATAMENTE Y PONER FRENO DE ESTACIONAMIENTO.' },
          { role: 'STEP', action: 'Antes de entrar en pista: Solicitar último RVR a la torre.' }
        ]
      }
    ]
  },

  {
    id: 'card-briefing-autoland',
    category: 'briefings',
    title: 'Briefing TWIN — CAT II / CAT III & Autoland',
    subtitle: 'Mínimos de aproximación ILS CAT II/III, referencias visuales y fallos en corta',
    manualRef: 'MOA 8.4, MOB 2.0.6.2 & SOPM Sec 2',
    airplane: 'Embraer 195-E2 / Binter Ops',
    badges: ['CAT II', 'CAT III', 'Autoland', 'LVO', 'Go-Around'],
    goldenRules: [
      'Comandante siempre PF y ambos pilotos cualificados para aproximaciones CAT II/III.',
      'CAT II: RVR 300 / 125 / 125 m. DH con 3 luces consecutivas + 1 elemento transversal.',
      'CAT III: RVR 200 / 125 / 125 m. DH con 3 luces consecutivas de eje de pista.',
      'Go-Around mandatorio si: A 150 ft RA no aparece "ALIGN" o a 50 ft RA no aparece "FLARE".'
    ],
    summary: 'Requisitos operacionales para aproximaciones ILS de precisión CAT II y CAT III con aterrizaje automático (Autoland), verificación de sistemas degradados y puertas de frustrada.',
    diagramImage: './sop-diagrams/briefing-twin-autoland.svg',
    diagramCaption: 'Infografía Oficial: Briefing TWIN – CAT II / CAT III & Autoland (Binter SOP)',
    diagramNote: 'Mínimos CAT II/III · Verificación MCDU · Callouts Autoland (ALIGN, FLARE, RETARD)',
    sections: [
      {
        title: 'Mínimos y Referencias Visuales en DH',
        color: 'indigo',
        items: [
          { role: 'NOTE', action: 'CAT II (DH típica 100 ft RA):', details: 'RVR mínimo TDZ 300 m (intermedio/final 125 m). Requiere ver segmento de 3 luces consecutivas de eje/aproximación + 1 elemento transversal (barra de luces).' },
          { role: 'NOTE', action: 'CAT III (DH típica 50 ft RA):', details: 'RVR mínimo TDZ 200 m (intermedio/final 125 m). Requiere ver segmento de al menos 3 luces consecutivas de eje de pista.' },
          { role: 'NOTE', action: 'RVR Determinante:', details: 'El RVR determinante es siempre el de la zona de toma de contacto (TDZ). Si falta TDZ, se utiliza el intermedio.' }
        ]
      },
      {
        title: 'Verificación de Estado Autoland en MCDU',
        color: 'sky',
        items: [
          { role: 'STEP', action: 'Comprobar degradaciones de sistemas en MCDU:', details: 'Navegar a MENU > MISC > OPR CONFIG > AUTOLAND para confirmar capacidad AUTOLAND 1 / APPR 2.' },
          { role: 'STEP', action: 'Ajuste de posición de asiento: Alinear con las bolas de referencia del parabrisas para ángulo de visión óptimo.' },
          { role: 'STEP', action: 'Iluminación de cabina: Atenuada al mínimo, luces estroboscópicas (Strobe) en OFF si entran en nubes para evitar deslumbramiento.' }
        ]
      },
      {
        title: 'Secuencia de Callouts y Modos Autoland',
        color: 'emerald',
        items: [
          { role: 'PM', callout: '"AUTOLAND 1"', action: 'Entre 1500 ft y 800 ft RA (con Flap 5 y modos ALIGN/FLARE armados en FMA).' },
          { role: 'PM', callout: '"FIVE HUNDRED"', action: 'A 500 ft RA tras verificar estabilidad de parámetros.' },
          { role: 'PM', callout: '"ALIGN"', action: 'A 150 ft RA: ALIGN engaged (FMA verde) y RLOUT/RETD armados. Si no engancha: cantar "NO ALIGN" -> ¡Go-Around!' },
          { role: 'PM', callout: '"FLARE"', action: 'A 50 ft RA: FLARE engaged y D-ROT armado. Si no engancha: cantar "NO FLARE" -> ¡Go-Around!' },
          { role: 'PM', callout: '"RETARD"', action: 'A 30 ft RA: RETD engaged, reducción automática de palancas de empuje a IDLE.' },
          { role: 'PM', callout: '"ROLLOUT"', action: 'En la toma de contacto: RLOUT y D-ROT engaged. Guiado automático de eje de pista.' },
          { role: 'NOTE', action: 'Desconexión de AP:', details: 'El piloto automático se desconecta automáticamente a los 5 segundos de la carrera de frenada o al intervenir sobre pedales/yoke.' }
        ]
      }
    ]
  },

  // =========================================================================
  // 2. PROCEDIMIENTOS NORMALES
  // =========================================================================
  {
    id: 'card-norm-visual-approach',
    category: 'normal',
    title: 'Aproximación Visual (Visual Approach)',
    subtitle: 'Circuito de tráfico estándar a 1.500 ft AFE, hitos de configuración y frustrada',
    manualRef: 'MOB 2.0.11 & SOPM Sec 2',
    airplane: 'Embraer 195-E2 / Binter Ops',
    badges: ['Visual', 'Tráfico', 'VMC', 'SOP'],
    goldenRules: [
      'Entrada en viento en cola a 1.500 ft AFE con Flap 1 (180 kt) y separación de 2 NM de pista.',
      'Través de umbral (Abeam): Flap 2 (160 kt) y cronómetro 30 s (+1 s/kt viento cara, -1 s/kt viento cola).',
      'Viraje a base: Tren abajo (Gear Down) + Flap 3 (150 kt).',
      'Aeronave totalmente estabilizada a 500 ft AFE en configuración final de aterrizaje (VAP).'
    ],
    summary: 'Diagrama y secuencia de perfiles, velocidades y configuraciones para la realización segura y estandarizada de aproximaciones visuales en el E195-E2.',
    diagramNote: 'Circuito de tráfico a 1.500 ft AFE | Separación lateral 2 NM | Viento en cola 30 s corregido por viento | Base 700-500 ft AFE | Final estabilizado a 500 ft AFE.',
    diagramImage: './sop-diagrams/visual-approach-fig.jpg',
    diagramCaption: 'SOPM-1755-200 · 3-35-10 · Visual Approach (E-Jets E2)',
    sections: [
      {
        title: 'Hitos de Configuración del Circuito Visual',
        color: 'sky',
        items: [
          { role: 'STEP', action: 'Entrada en Viento en Cola (Downwind):', details: 'Altitud 1.500 ft AFE, separación 2 NM paralela a pista. Configuración: FLAP 1 (180 kt).' },
          { role: 'STEP', action: 'Través de Umbral (Abeam Threshold):', details: 'Seleccionar FLAP 2 (160 kt). Iniciar cronómetro de viento en cola: 30 segundos (+1 s/kt frente / -1 s/kt cola).' },
          { role: 'STEP', action: 'Viraje a Base (Turning Base):', details: 'LANDING GEAR DOWN + FLAP 3 (150 kt). Iniciar descenso con senda visual de 3°.' },
          { role: 'STEP', action: 'Tramo de Base:', details: 'Seleccionar LANDING FLAPS (Flap 4 o FULL) a velocidad de aproximación VAP. Completar Before Landing Checklist.' },
          { role: 'ALERT', action: 'Ventana de Estabilización:', details: 'A 500 ft AFE la aeronave debe estar 100% estabilizada en velocidad, senda y configuración.' }
        ]
      },
      {
        title: 'Procedimiento de Aproximación Frustrada Visual (Missed Approach)',
        color: 'rose',
        items: [
          { role: 'PF', callout: '"GO-AROUND, FLAPS"', action: 'Pulsar botón TO/GA en palancas de empuje y avanzar a empuje GA.' },
          { role: 'PF', action: 'Rotar y establecer actitud de frustrada: 8° Nose Up en el Flight Director.' },
          { role: 'PM', action: 'Verificar empuje GA y seleccionar Flaps de frustrada: Flap 2 (desde Flap 4) o Flap 4 (desde Flap FULL).' },
          { role: 'PM', callout: '"POSITIVE RATE"', action: 'Verificar ascenso positivo en variómetro y altímetro.' },
          { role: 'PF', callout: '"GEAR UP"', action: 'Ordenar retracción del tren de aterrizaje.' },
          { role: 'STEP', action: 'Al alcanzar altitud de aceleración (ACC ALT):', details: 'Acelerar, retraer flaps a FLAP ZERO y pedir After Takeoff Checklist.' }
        ]
      }
    ]
  },

  {
    id: 'card-norm-circling',
    category: 'normal',
    title: 'Aproximación Circling (Circling Approach)',
    subtitle: 'Maniobra visual tras aproximación por instrumentos, Fix Info y cronometraje',
    manualRef: 'MOB 2.0.11 & SOPM Sec 2',
    airplane: 'Embraer 195-E2 / Binter Ops',
    badges: ['Circling', 'Maniobra Visual', 'AEO vs OEI', 'Fix Info'],
    goldenRules: [
      'Configuración inicial: Con 2 motores (AEO) Gear Down + Flaps 3; Con 1 motor inop (OEI) Flap 2.',
      'Uso de Fix Info en MCDU: Trazar prolongación de pista y arco de 3 NM (1.000 ft AFE).',
      'Viraje de 45° con cronómetro de 30 segundos para alcanzar separación lateral de 1,5 NM.',
      'Al través de umbral: Cronómetro 20 s + 30 s por cada 1.000 ft AFE de Circling Altitude.'
    ],
    summary: 'Técnica reglamentaria de circling visual para el E195-E2 manteniendo referencias visuales constantes con la pista y aplicando márgenes de franqueamiento de obstáculos.',
    diagramNote: 'Nivelación a Circling Minimums | Viraje 45° 30 s -> Viento en cola a 1,5 NM | Cronómetro través 20 s + 30 s/1000 ft | Base y Final con desconexión de AP.',
    diagramImage: './sop-diagrams/circling-approach-fig.jpg',
    diagramCaption: 'SOPM-1755-200 · 3-35-10 · Circling Approach (E-Jets E2)',
    sections: [
      {
        title: 'Preparación y Configuración Inicial',
        color: 'sky',
        items: [
          { role: 'STEP', action: 'MCDU Fix Info Tip:', details: 'Configurar prolongación de eje de pista de aterrizaje y crear anillo/arco de 3 NM para referencia visual en MFD.' },
          { role: 'STEP', action: 'Configuración de aproximación inicial:', details: 'AEO (2 motores): LANDING GEAR DOWN + FLAPS 3. OEI (1 motor inop): FLAP 2 (tren abajo al iniciar viraje base).' },
          { role: 'STEP', action: 'Ajuste de mínimos: Seleccionar Circling Minimums en MDA/MDH.' }
        ]
      },
      {
        title: 'Secuencia de la Maniobra de Circling',
        color: 'indigo',
        items: [
          { role: 'STEP', action: 'Pista a la vista (Runway in sight):', details: 'Nivelar a Circling Altitude, ajustar altitud de Missed Approach en FGS y virar 45° respecto al eje durante 30 segundos.' },
          { role: 'STEP', action: 'Tramo de Viento en Cola:', details: 'Virar a rumbo paralelo a pista (distancia lateral ~1,5 NM). Mantener referencias visuales exteriores continuas.' },
          { role: 'STEP', action: 'Través de Umbral de Pista (Abeam Threshold):', details: 'Iniciar cronómetro: 20 segundos base + 30 segundos por cada 1.000 ft de altura sobre el terreno (AFE).' },
          { role: 'STEP', action: 'Viraje a Base y Final:', details: 'Seleccionar Landing Flaps y Before Landing Checklist. Desconectar piloto automático en final antes de 500 ft AFE e interceptar senda visual.' }
        ]
      }
    ]
  },

  {
    id: 'card-norm-npa-autoland-callouts',
    category: 'normal',
    title: 'Aproximación de No Precisión (NPA 2D) & Callouts Autoland',
    subtitle: 'Técnica VGP vs FPA/VS (LOC, VOR, NDB, RNP) y llamadas estándar de Autoland',
    manualRef: 'MOB 2.0.11 & SOPM Sec 2',
    airplane: 'Embraer 195-E2 / Binter Ops',
    badges: ['NPA', 'VGP', 'FPA', 'Autoland Callouts'],
    goldenRules: [
      'NPA con perfil vertical: Usar preferentemente VGP o FPA (Flight Path Angle).',
      'A 2 NM antes del FAF: Landing Gear Down + Flap 3. En FAF: Flap Landing + VAP.',
      'Go-around mandatorio si deflexión > 1/2 escala CDI en LOC o > 5° en NDB.',
      'Llamadas críticas Autoland: "AUTOLAND 1" (800ft), "ALIGN" (150ft), "FLARE" (50ft), "RETARD" (30ft).'
    ],
    summary: 'Procedimiento de gestión de aproximaciones de no precisión tipo A (2D) con técnicas VGP/FPA y cuadro de llamadas verbales obligatorias para aterrizajes automáticos.',
    diagramImage: './sop-diagrams/npa-gps-rnav-fig.jpg',
    diagramCaption: 'SOPM-1755-200 · 3-35-10 · Non-Precision / GPS / RNAV Approach',
    sections: [
      {
        title: 'Técnica NPA con VGP (Vertical Glide Path)',
        color: 'sky',
        items: [
          { role: 'STEP', action: 'Configuración antes del FAF:', details: 'Flap 2 antes de interceptar segmento final. A 2 NM del FAF: LANDING GEAR DOWN + FLAP 3.' },
          { role: 'STEP', action: 'En captura de VGP / FAF:', details: 'Seleccionar FLAP LANDING (Flap 4/5) y ajustar VAP. Ajustar altitud de Missed Approach en FGS y completar checklist.' },
          { role: 'PM', callout: '"LNAV & VGP ARMED" / "GLIDEPATH ALIVE"', action: 'Verificación cruzada de captura de senda vertical y lateral en FMA.' }
        ]
      },
      {
        title: 'Técnica NPA con FPA (LOC / VOR / V/S)',
        color: 'indigo',
        items: [
          { role: 'STEP', action: 'A 8 NM de pista: Flap 2. A 2 NM del FAF: Tren abajo + Flap 3.' },
          { role: 'STEP', action: 'A 1 NM del FAF:', details: 'Estando en modo ALT, seleccionar altitud de Missed Approach en FGS y armar FPA en 0°.' },
          { role: 'STEP', action: 'A 0,3 NM del FAF:', details: 'Ajustar FPA al ángulo de descenso requerido por la carta (típicamente -3.0°).' }
        ]
      },
      {
        title: 'Cuadro de Callouts Oficiales de Autoland',
        color: 'emerald',
        items: [
          { role: 'PM', callout: '"AUTOLAND 1"', action: 'Entre 1500 ft y 800 ft RA con Flap 5.' },
          { role: 'PM', callout: '"FIVE HUNDRED"', action: 'A 500 ft RA.' },
          { role: 'PM', callout: '"ALIGN" (o "NO ALIGN" -> GA)', action: 'A 150 ft RA.' },
          { role: 'PM', callout: '"FLARE" (o "NO FLARE" -> GA)', action: 'A 50 ft RA.' },
          { role: 'PM', callout: '"RETARD"', action: 'A 30 ft RA (palancas a ralentí).' },
          { role: 'PM', callout: '"ROLLOUT"', action: 'En la toma de contacto.' }
        ]
      }
    ]
  },

  // =========================================================================
  // 2b. APROXIMACIONES SOPM ADICIONALES (figuras oficiales E-Jets E2)
  // =========================================================================
  {
    id: 'card-norm-ils-precision',
    category: 'normal',
    title: 'Aproximación de Precisión ILS',
    subtitle: 'Localizer / Glide Slope, configuración y Missed Approach estándar',
    manualRef: 'SOPM-1755-200 · 3-35-05 / 3-35-10',
    airplane: 'Embraer 195-E2 / Binter Ops',
    badges: ['ILS', 'Precisión', 'APP Mode', 'SOPM'],
    goldenRules: [
      'Interceptar con FLAPS 2 y APP mode armado.',
      'En Glide Slope intercept: Landing Flaps + GA heading/altitude + Before Landing Checklist.',
      'A “ONE DOT” bajo GS: GEAR DOWN + FLAPS 3 (según secuencia SOPM).',
      'Missed Approach: TO/GA → thrust → attitude → GA flaps → positive rate / gear up.'
    ],
    summary: 'Perfil SOPM de aproximación ILS AEO con hitos de captura LOC/GS, checklists y frustrada.',
    diagramImage: './sop-diagrams/ils-precision-fig.jpg',
    diagramCaption: 'SOPM-1755-200 · Precision Approach (ILS)',
    sections: [
      {
        title: 'Secuencia ILS (AEO)',
        color: 'sky',
        items: [
          { role: 'STEP', action: 'Approaching intercept heading:', details: 'ARM APP MODE. Intercept with FLAPS 2.' },
          { role: 'STEP', action: 'Approaching field:', details: 'Appropriate vertical and lateral modes. Complete Approach Checklist at FIX.' },
          { role: 'STEP', action: 'Glide Slope intercept:', details: 'Set Landing Flaps. Set Go-Around Heading and Altitude. Before Landing Checklist.' },
          { role: 'STEP', action: 'ONE DOT (below GS):', details: 'GEAR DOWN + FLAPS 3.' }
        ]
      },
      {
        title: 'Missed Approach',
        color: 'rose',
        items: [
          { role: 'PF', action: 'PRESS TO/GA BUTTON' },
          { role: 'PF', action: 'GO AROUND THRUST · GO AROUND ATTITUDE · SET GO AROUND FLAPS' },
          { role: 'PM', callout: '"POSITIVE RATE"', action: 'GEAR UP · Complete Go Around Procedure · After Takeoff Checklist' }
        ]
      }
    ]
  },
  {
    id: 'card-norm-oei-ils',
    category: 'normal',
    title: 'Aproximación ILS con un Motor Inoperativo (OEI)',
    subtitle: 'Precision Approach OEI — APP, flaps y checklist monomotor',
    manualRef: 'SOPM-1755-200 · 3-35-05',
    airplane: 'Embraer 195-E2 / Binter Ops',
    badges: ['OEI', 'ILS', 'Flap 5', 'SOPM'],
    goldenRules: [
      'Completar One Engine Inoperative Approach and Landing Checklist antes de la fase final.',
      'Intercept con FLAPS 2 y APP armado.',
      'En GS intercept: FLAPS 5 + GA heading/altitude + Before Landing Checklist.',
      'A ONE DOT: GEAR DOWN + FLAPS 3 (secuencia SOPM OEI).'
    ],
    summary: 'Perfil SOPM de ILS monomotor con hitos de configuración y frustrada.',
    diagramImage: './sop-diagrams/oei-ils-fig.jpg',
    diagramCaption: 'SOPM-1755-200 · One Engine Inoperative Precision Approach (ILS)',
    sections: [
      {
        title: 'Hitos OEI ILS',
        color: 'amber',
        items: [
          { role: 'ALERT', action: 'Complete ONE ENGINE INOPERATIVE APPROACH AND LANDING CHECKLIST.' },
          { role: 'STEP', action: 'Approaching intercept heading: ARM APP MODE · Intercept with FLAPS 2.' },
          { role: 'STEP', action: 'Glide Slope intercept: FLAPS 5 · Set GA heading/altitude · Before Landing Checklist.' },
          { role: 'STEP', action: 'ONE DOT: GEAR DOWN · FLAPS 3.' }
        ]
      },
      {
        title: 'Missed Approach OEI',
        color: 'rose',
        items: [
          { role: 'PF', action: 'TO/GA · GA thrust · GA attitude · Set GA flaps' },
          { role: 'PM', callout: '"POSITIVE RATE"', action: 'GEAR UP · Complete GA procedure · After Takeoff Checklist' }
        ]
      }
    ]
  },
  {
    id: 'card-norm-oei-visual',
    category: 'normal',
    title: 'Aproximación Visual OEI (Un Motor Inoperativo)',
    subtitle: 'Circuito AEO vs OEI: Flaps 1→2→3→5, gear en base',
    manualRef: 'SOPM-1755-200 · 3-35-10',
    airplane: 'Embraer 195-E2 / Binter Ops',
    badges: ['OEI', 'Visual', 'Flaps 5', 'SOPM'],
    goldenRules: [
      'Downwind: FLAPS 1 · 1.500 ft.',
      'Abeam: FLAPS 2 · ⏱ 30 SEC.',
      'Turning base: GEAR DOWN + FLAPS 3.',
      'Final: FLAPS 5 + Before Landing Checklist (≈1000 ft / 2.5 NM según figura).'
    ],
    summary: 'Circuito visual monomotor según figura SOPM One Engine Inoperative Approach.',
    diagramImage: './sop-diagrams/oei-approach-fig.jpg',
    diagramCaption: 'SOPM-1755-200 · One Engine Inoperative Approach',
    sections: [
      {
        title: 'Configuración del circuito OEI',
        color: 'amber',
        items: [
          { role: 'STEP', action: 'Entering downwind: FLAPS 1 · 1500 FT.' },
          { role: 'STEP', action: 'Abeam threshold: FLAPS 2 · 30 SEC.' },
          { role: 'STEP', action: 'Turning base: GEAR DOWN · FLAPS 3.' },
          { role: 'STEP', action: 'Final: FLAPS 5 · BEFORE LANDING CHECKLIST.' }
        ]
      },
      {
        title: 'Missed Approach',
        color: 'rose',
        items: [
          { role: 'PF', action: 'TO/GA · GA thrust · GA attitude · Set GA flaps · Positive rate / Gear up' },
          { role: 'STEP', action: 'Complete Go Around Procedure · After Takeoff Checklist' }
        ]
      }
    ]
  },
  {
    id: 'card-norm-oei-circling',
    category: 'normal',
    title: 'Circling Approach OEI',
    subtitle: 'Circling monomotor: Flap 2 inicial, gear en base, Flap 5 en final',
    manualRef: 'SOPM-1755-200 · 3-35-10',
    airplane: 'Embraer 195-E2 / Binter Ops',
    badges: ['OEI', 'Circling', '1.5 NM', 'SOPM'],
    goldenRules: [
      'Inicial: GEAR UP · FLAPS 2 · Set Circling Minimums.',
      'Runway in sight: level off at circling altitude · set GA altitude.',
      'Abeam: start chronometer · maintain visual refs · ⏱ 20 SEC.',
      'Turning base (~1.5 NM): GEAR DOWN · FLAPS 3. Final: FLAPS 5 · AP OFF · rudder trim neutral.'
    ],
    summary: 'Maniobra circling con un motor inoperativo según figura SOPM.',
    diagramImage: './sop-diagrams/oei-circling-approach-fig.jpg',
    diagramCaption: 'SOPM-1755-200 · One Engine Inoperative Circling Approach',
    sections: [
      {
        title: 'Secuencia Circling OEI',
        color: 'indigo',
        items: [
          { role: 'STEP', action: 'Initial: GEAR UP · FLAPS 2 · SET CIRCLING MINIMUMS.' },
          { role: 'STEP', action: 'Runway in sight: LEVEL OFF · DOWNWIND · SET GA ALTITUDE.' },
          { role: 'STEP', action: 'Abeam threshold: START CHRONOMETER · 20 SEC · maintain visual references.' },
          { role: 'STEP', action: 'Turning base: GEAR DOWN · FLAPS 3 (~1.5 NM).' },
          { role: 'STEP', action: 'Final: FLAPS 5 · intercept visual path · AP disconnected · rudder trim neutral · BLC.' }
        ]
      },
      {
        title: 'Missed Approach',
        color: 'rose',
        items: [
          { role: 'PF', action: 'TO/GA · thrust · attitude · GA flaps · positive rate / gear up' },
          { role: 'STEP', action: 'Complete GA procedure · After Takeoff Checklist' }
        ]
      }
    ]
  },
  {
    id: 'card-norm-oei-npa',
    category: 'normal',
    title: 'NPA OEI (Non-Precision / GPS monomotor)',
    subtitle: 'Perfil OEI hacia MDA con checklist monomotor y VGP/non-VGP',
    manualRef: 'SOPM-1755-200 · 3-35-10',
    airplane: 'Embraer 195-E2 / Binter Ops',
    badges: ['OEI', 'NPA', 'MDA', 'SOPM'],
    goldenRules: [
      'Completar One Engine Inoperative Approach and Landing Checklist.',
      'Intercept with FLAPS 2 · appropriate vertical/lateral modes.',
      'Approaching FAF: FLAPS 5 · set MDA or GA altitude (VGP) · BLC · GPS APPR annunciator.',
      'Inbound: GEAR DOWN · FLAPS 3. Runway in sight: intercept landing profile · set GA altitude (NON-VGP).'
    ],
    summary: 'Aproximación de no precisión monomotor según figura SOPM.',
    diagramImage: './sop-diagrams/oei-npa-fig.jpg',
    diagramCaption: 'SOPM-1755-200 · One Engine Inoperative Non-Precision Approach',
    sections: [
      {
        title: 'Perfil NPA OEI',
        color: 'amber',
        items: [
          { role: 'ALERT', action: 'Complete OEI Approach and Landing Checklist.' },
          { role: 'STEP', action: 'Approaching intercept heading: Intercept with FLAPS 2.' },
          { role: 'STEP', action: 'Approaching FAF: FLAPS 5 · Set MDA or GA ALT (VGP) · Before Landing Checklist · GPS APPR check.' },
          { role: 'STEP', action: 'Inbound: GEAR DOWN · FLAPS 3. Descend to MDA (precision-like).' },
          { role: 'STEP', action: 'Runway in sight: Intercept landing profile · Set GA altitude (NON-VGP).' }
        ]
      },
      {
        title: 'Missed Approach',
        color: 'rose',
        items: [
          { role: 'PF', action: 'TO/GA · GA thrust · attitude · GA flaps · positive rate / gear up' },
          { role: 'STEP', action: 'Complete GA · After Takeoff Checklist' }
        ]
      }
    ]
  },
  {
    id: 'card-norm-no-slat-flap',
    category: 'normal',
    title: 'Aterrizaje sin Slat / Flap (No Slat/Flap Landing)',
    subtitle: 'Circuito extendido 4 NM, gear en base, idle en umbral',
    manualRef: 'SOPM-1755-200 · 3-35-10',
    airplane: 'Embraer 195-E2 / Binter Ops',
    badges: ['No Flap', 'Emergencia técnica', '4 NM', 'SOPM'],
    goldenRules: [
      'Abeam / downwind a 1500 FT.',
      'Longitud de viento en cola ≈ 4 NM desde abeam hasta viraje a base.',
      'Turning base: GEAR DOWN. Final: Before Landing Checklist.',
      'Over threshold: THRUST LEVERS IDLE. Missed Approach estándar TO/GA.'
    ],
    summary: 'Técnica SOPM para aterrizaje sin slats/flaps operativos (circuito largo y gestión de energía).',
    diagramImage: './sop-diagrams/no-slat-flap-landing-fig.jpg',
    diagramCaption: 'SOPM-1755-200 · No Slat / Flap Landing',
    sections: [
      {
        title: 'Circuito No Slat/Flap',
        color: 'rose',
        items: [
          { role: 'STEP', action: 'Entering downwind / abeam: 1500 FT.' },
          { role: 'STEP', action: 'Downwind leg length: ≈ 4 NM to turning base.' },
          { role: 'STEP', action: 'Turning base: GEAR DOWN.' },
          { role: 'STEP', action: 'Final (~6.5 NM / 1500 FT según figura): BEFORE LANDING CHECKLIST.' },
          { role: 'ALERT', action: 'Over threshold: THRUST LEVERS IDLE.' }
        ]
      },
      {
        title: 'Missed Approach',
        color: 'rose',
        items: [
          { role: 'PF', action: 'PRESS TO/GA · GA thrust · GA attitude' },
          { role: 'PM', callout: '"POSITIVE RATE"', action: 'GEAR UP · Complete GA procedure · After Takeoff Checklist' }
        ]
      }
    ]
  },

  {
    id: 'card-norm-powerbanks-2026',
    category: 'normal',
    title: 'Power Banks en Vuelo — Normativa 2026',
    subtitle: 'Guía de seguridad BOE / OACI / IATA: pasajeros, tripulación y riesgos',
    manualRef: 'BOE 2026-9940 · Adenda OACI Doc 9284 · Guía IATA DGR',
    airplane: 'Embraer 195-E2 / Binter Ops',
    badges: ['Power Bank', 'DGR', 'BOE 2026', 'OACI', 'IATA', 'AVSEC'],
    goldenRules: [
      'Máximo 2 power banks por persona (pasajeros y tripulación) para uso personal.',
      'Solo equipaje de mano: prohibido en bodega / checked baggage.',
      'Prohibido recargar el power bank con energía del asiento/avión en cualquier fase de vuelo.',
      'Uso operativo tripulación (EFB, lectores): límite estricto ≤ 100 Wh y cumplimiento UN 38.3.'
    ],
    summary:
      'Informar a pasajeros y tripulación sobre las nuevas restricciones y requisitos de seguridad para el transporte y uso de bancos de energía según actualizaciones del BOE, OACI e IATA de 2026 (vigencia adenda OACI desde 27/03/2026).',
    diagramImage: './sop-diagrams/powerbanks-normativa-2026-fig.jpg',
    diagramCaption: 'Nueva Normativa 2026 · Guía de Seguridad para Power Banks en Vuelos (BOE / OACI / IATA)',
    diagramNote:
      'BOE 2026-9940 · Adenda OACI Doc 9284-AN/905 vigente desde 27/03/2026 · Guía IATA previa a DGR 68.ª ed. (2027).',
    sections: [
      {
        title: 'Reglas de Oro para Pasajeros (Uso Personal)',
        color: 'emerald',
        items: [
          {
            role: 'ALERT',
            action: 'Máximo 2 unidades por persona',
            details: 'Pasajeros y tripulación: límite de dos power banks para uso personal.'
          },
          {
            role: 'ALERT',
            action: 'Equipaje de mano exclusivamente',
            details:
              'Prohibido transportarlos en equipaje facturado/bodega. Deben ir en cabina para respuesta rápida ante un incidente.'
          },
          {
            role: 'ALERT',
            action: 'Prohibido recargar en vuelo',
            details:
              'No recargar el power bank usando la toma de corriente del asiento/aeronave en ninguna fase del vuelo.'
          },
          {
            role: 'STEP',
            action: 'Protección individual obligatoria',
            details:
              'Cada unidad protegida contra cortocircuitos: embalaje original o aislamiento de terminales (cinta / bolsas individuales).'
          }
        ]
      },
      {
        title: 'Uso Operativo de la Tripulación',
        color: 'sky',
        items: [
          {
            role: 'ALERT',
            action: 'Límite estricto de 100 Wh',
            details:
              'Power banks para tareas operativas (EFB, lectores de tarjetas, etc.) no deben superar 100 Wh.'
          },
          {
            role: 'STEP',
            action: 'Integración en Manuales de Operación',
            details:
              'El operador debe detallar condiciones de uso y transporte en los manuales de operaciones de vuelo y de cabina.'
          },
          {
            role: 'STEP',
            action: 'Verificación de estándares UN 38.3',
            details:
              'Asegurar que los dispositivos proceden de proveedores que demuestren cumplimiento de los ensayos de seguridad UN 38.3.'
          }
        ]
      },
      {
        title: 'Riesgos de Seguridad y Alerta',
        color: 'rose',
        items: [
          {
            role: 'ALERT',
            action: 'Amenaza de fuga térmica (thermal runaway)',
            details:
              'Sobrecalentamiento que puede derivar en incendio o autodestrucción del dispositivo: principal riesgo operacional.'
          },
          {
            role: 'ALERT',
            action: 'Peligro en power banks inalámbricos',
            details:
              'Mayor riesgo en dispositivos de inducción/inalámbricos: más propensos a falsificaciones o falta de control de calidad.'
          },
          {
            role: 'NOTE',
            action: 'Recomendación OACI de uso a bordo',
            details:
              'OACI recomienda que los pasajeros no usen power banks para cargar otros dispositivos electrónicos a bordo, reduciendo riesgos.'
          }
        ]
      },
      {
        title: 'Marco Legal y Referencias',
        color: 'indigo',
        items: [
          {
            role: 'NOTE',
            action: 'BOE 2026-9940 (España)',
            details:
              'Resolución que publica la adenda a las Instrucciones Técnicas de OACI de aplicación obligatoria en España.'
          },
          {
            role: 'NOTE',
            action: 'Vigencia de la Adenda OACI',
            details: 'Modificaciones al Doc 9284-AN/905 aplicables desde el 27 de marzo de 2026.'
          },
          {
            role: 'NOTE',
            action: 'Guía IATA para operadores',
            details:
              'Documento de orientación para gestionar el cambio antes de su formalización en la 68.ª edición del DGR (2027).'
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 3. PROCEDIMIENTOS DE EMERGENCIA Y ANORMALIDADES
  // =========================================================================
  {
    id: 'card-emg-flow-decision',
    category: 'emergency',
    title: 'Flujo de Gestión de Emergencia del Comandante (Flow Completo)',
    subtitle: 'Golden Rules, Prioridad Fuel/Tiempo, MEANA, IMFLOCC, E-DALTA y 4 Últimas Listas',
    manualRef: 'MOB 3.0, 3.1, MOA 8.3 & QRH Rev19',
    airplane: 'Embraer 195-E2 / Binter Ops',
    badges: ['Flow Comandante', 'Golden Rules', 'Fuel vs Tiempo', 'MEANA', 'IMFLOCC', 'E-DALTA', '4 Últimas Listas', 'SOP'],
    goldenRules: [
      'CHECK FMA ALWAYS: Monitorizar y cantar siempre los cambios de modos en el FMA ante cualquier fallo o cambio de estado.',
      'CHECK SYS PAGE ON FAILURE: Abrir siempre la página de sistemas correspondiente en MFD (Synoptic) ante aviso EICAS antes de accionar interruptores.',
      'SEGUIR TECHNICAL ABNORMAL FLOW: Taxi Out > FOL/OEB > QRH > Ground Reset (Non Standard DDPM).',
      'CRITERIO DE PRIORIDAD: FUEL (problemas que no requieran aterrizaje inmediato) vs TIEMPO (fuegos inextinguibles, problemas de estructura o mandos de vuelo).'
    ],
    summary: 'Flujo estratégico y secuencial ante una emergencia o anormalidad en vuelo como Comandante: Golden Rules, discriminación Fuel vs Tiempo, orden de listas MEANA, toma de decisiones IMFLOCC, briefing E-DALTA y las 4 Últimas Listas antes de toma.',
    diagramImage: './sop-diagrams/flow-emergencia-comandante.svg',
    diagramCaption: 'Infografía Oficial: Flow Completo ante una Emergencia como Comandante',
    diagramNote: 'Golden Rules · Criterio Fuel/Tiempo · 1. MEANA · 2. IMFLOCC · 3. E-DALTA · 4. 4 Últimas Listas',
    sections: [
      {
        title: '¡¡ GOLDEN RULES !! & TECHNICAL ABNORMAL FLOW',
        color: 'amber',
        items: [
          {
            role: 'ALERT',
            action: 'CHECK FMA ALWAYS',
            details: 'Monitorizar y confirmar en voz alta todos los cambios en el Flight Mode Annunciator (FMA) para garantizar el conocimiento del estado de guiado lateral, vertical y velocidad.'
          },
          {
            role: 'ALERT',
            action: 'CHECK SYS PAGE ON FAILURE',
            details: 'Ante cualquier mensaje EICAS o fallo, abrir la SYS Page (Synoptic) en el MFD sin tocar interruptores para verificar visualmente parámetros y componentes afectados.'
          },
          {
            role: 'STEP',
            action: 'SEGUIR TECHNICAL ABNORMAL FLOW:',
            details: '1° TAXI OUT / EN VUELO -> 2° FOL / OEB (Flight Operations Letters / Operational Evaluation Board) -> 3° QRH (Quick Reference Handbook) -> 4° GROUND RESET (Non Standard DDPM).'
          },
          {
            role: 'NOTE',
            action: 'Jerarquía de mensajes EICAS con Chevron (>):',
            details: '1° Warning (Rojo con >) -> 2° Caution (Ámbar con >) -> 3° Advisory (Cyan con >). Sin Chevron: 1° AC/DC -> 2° MAU -> 3° SPDA.'
          }
        ]
      },
      {
        title: 'PRIORIDAD TRAS EMERGENCIA / ANORMALIDAD: FUEL O TIEMPO',
        color: 'rose',
        items: [
          {
            role: 'STEP',
            action: 'FUEL: Problemas que NO requieran aterrizaje inmediato',
            details: 'Permite tomar tiempo en espera/órbita para aplicar listas QRH completas, evaluar alternativas en red, calcular ePerf con calma, coordinar con CCO/Handling y preparar aproximación sin prisas.'
          },
          {
            role: 'ALERT',
            action: 'TIEMPO: Fuegos inextinguibles, problemas de estructura o mandos de vuelo',
            details: 'Prioridad absoluta al aterrizaje en el aeródromo adecuado más cercano minimizando el tiempo de permanencia en el aire (aproximación directa y vectorización radar expedita).'
          }
        ]
      },
      {
        title: '① MEANA (Orden de Aplicación de Listas de Chequeo)',
        color: 'purple',
        items: [
          { role: 'STEP', action: '1° M - Memory Items:', details: 'Acciones inmediatas de memoria si el procedimiento lo requiere (cantar y confirmar con rigor).' },
          { role: 'STEP', action: '2° E - Emergency Checklist:', details: 'Listas de emergencia identificadas con recuadro rojo/gris en QRH.' },
          { role: 'STEP', action: '3° A - Abnormal Checklist principal:', details: 'Lista anormal que ataca la raíz del fallo primario.' },
          { role: 'STEP', action: '4° N - Normal Checklist:', details: 'Listas normales correspondientes a la fase de vuelo (After Takeoff, Cruise, Descent, etc.).' },
          { role: 'STEP', action: '5° A - Abnormal Checklists restantes:', details: 'Lectura y seguimiento de notas de sistemas degradados e información de sistemas inoperativos.' }
        ]
      },
      {
        title: '② IMFLOCC (Toma de Decisiones Estratégica & Desvío Técnico)',
        color: 'indigo',
        items: [
          { role: 'STEP', action: 'I (Inoperative Items / Incidents):', details: 'Evaluación técnica de sistemas perdidos y redundancias operativas restantes.' },
          { role: 'STEP', action: 'M (Meteo Report):', details: 'Análisis de METAR, TAF, RVR, estado de pistas y viento cruzado en aeródromos candidatos.' },
          { role: 'STEP', action: 'F (Fuel Assessment):', details: 'Autonomía y combustible remanente sobre la alternativa vs Reserva Final sacrosanta (30 min).' },
          { role: 'STEP', action: 'L (Landing Performance):', details: 'Cálculo en ePerf InFlight Landing con multiplicadores y factores de corrección de QRH.' },
          { role: 'STEP', action: 'O (Options):', details: 'Aeródromos disponibles según jerarquía Binter: 1° Base de línea, 2° Red con mantenimiento, 3° Adecuado más cercano.' },
          { role: 'STEP', action: 'C (Choose an Option):', details: 'Decisión firme del Comandante consensuada con la tripulación.' },
          { role: 'STEP', action: 'C (Communications):', details: '• ATC: Declaración de estado (MAYDAY/PAN-PAN) y requerimientos.\n• Cabina: Briefing TELSI cara a cara (¡NUNCA NITS!).\n• Pasajeros: Megafonía del Comandante (PA) clara y tranquilizadora.\n• CCO: ACARS (FREE TEXT > EMR o INC___) y VHF Operaciones.' }
        ]
      },
      {
        title: '③ E-DALTA (Briefing de Aproximación & Aterrizaje en MCDU & LIDO)',
        color: 'sky',
        items: [
          { role: 'STEP', action: 'E (ePerf InFlight Landing):', details: 'Performance de aterrizaje en vuelo, peso estimado de toma (ELW), estado de pista (RWYCC) y margen de parada.' },
          { role: 'STEP', action: 'D (Descent):', details: 'Top of Descent (TOD), perfil de descenso vertical, restricciones de altitud y velocidad de la carta.' },
          { role: 'STEP', action: 'A (Arrival):', details: 'STAR, aproximación frustrada (Missed Approach) y altitudes mínimas de seguridad (MSA / MORA / Grid).' },
          { role: 'STEP', action: 'L (Landing):', details: 'MCDU PERF: Flap de aterrizaje (Flap 4 o Flap FULL), Autobrake (LO/MED/HI), velocidades Vref/Vap/Vac/Vfs y mínimos DA/MDA.' },
          { role: 'STEP', action: 'T (Taxi):', details: 'Ruta de salida de pista prevista y calles de rodaje activas hacia la plataforma.' },
          { role: 'STEP', action: 'A (Apron):', details: 'Puesto de estacionamiento asignado (Stand/Gate), guía de atraque, calzos y servicios de emergencia en tierra.' }
        ]
      },
      {
        title: '④ 4 ÚLTIMAS LISTAS (Secuencia Final de Checklists antes de Toma)',
        color: 'emerald',
        items: [
          {
            role: 'STEP',
            action: '// 1. EQUIPO MÍNIMO //',
            details: 'Comprobación del equipo mínimo requerido para la aproximación prevista (RVR, navaids, luces, radioaltímetros).'
          },
          {
            role: 'STEP',
            action: '// 2. SUPLEM. CHECK. AUTOLAND o RNP //',
            details: 'Ejecución de la lista suplementaria aplicable (Supplementary Checklist para CAT II/III Autoland o RNP AR/APCH si aplica).'
          },
          {
            role: 'STEP',
            action: '// 3. ONE ENGINE INOPERATIVE APPROACH & LANDING //',
            details: 'Ejecución de la lista de aproximación y toma monomotor (si el escenario implica fallo de motor / OEI).'
          },
          {
            role: 'STEP',
            action: '// 4. APPROACH CHECKLIST //',
            details: 'Lista normal de aproximación estándar leída y completada antes de alcanzar el FAF/FAP.'
          }
        ]
      }
    ]
  },

  {
    id: 'card-emg-engine-fail-driftdown',
    category: 'emergency',
    title: 'Fallo de Motor en Despegue & Driftdown en Crucero',
    subtitle: 'Secuencia V1, perfiles de ascenso OEI, velocidades y técnica de Driftdown',
    manualRef: 'MOB 3.1.2, 3.1.6 & QRH Rev19',
    airplane: 'Embraer 195-E2 / Binter Ops',
    badges: ['Fallo Motor', 'V1', 'Driftdown', 'Green Dot', 'Memory Items'],
    memoryItems: [
      'AUTOTHROTTLE DISCONNECT',
      'OPERATIVE ENGINE PF: Min 5% above N1 IDLE',
      'AFFECTED ENGINE PF: "THRUST LEVER IDLE, CONFIRM" -> PM: "CONFIRM"',
      'AFFECTED ENGINE PF: "ENG START/STOP STOP, CONFIRM" -> PM: "CONFIRM"',
      'AFFECTED ENGINE PF: "FIRE HANDLE 1(2) PULL, CONFIRM" -> PM: "CONFIRM"'
    ],
    goldenRules: [
      'Fallo en despegue: Rotar inicialmente a 10° nose up hacia el FD. CERO acciones de cabina por debajo de 400 ft AGL excepto tren arriba y cancelar avisos.',
      'En Driftdown (crucero): Desconectar A/T, empuje TOGA/CON y seleccionar inmediatamente velocidad GREEN DOT (máximo planeo / mejor régimen).',
      'Nivelar en EO MAX ALT con márgenes de franqueamiento de obstáculos (2.000 ft ruta / 1.000 ft NET).'
    ],
    summary: 'Manejo integral del fallo de motor en despegue a V1 o superior y procedimiento de descenso continuo (Driftdown) en fallo de motor en ruta con el E195-E2.',
    diagramImage: './sop-diagrams/emg-engine-fail-driftdown.svg',
    diagramCaption: 'Infografía Oficial: Fallo de Motor en Despegue (EFATO) & Driftdown en Ruta',
    diagramNote: 'Secuencia V1 / Vr / V2 · Aceleración Flaps · MCT · Velocidad Green Dot / Vfs · Techo Monomotor',
    sections: [
      {
        title: 'Fallo de Motor en Carrera de Despegue (V1 o Superior)',
        color: 'rose',
        items: [
          { role: 'PM', callout: '"ENGINE FAILURE"', action: 'V1 alcanzada: Continuar despegue, mantener control de guiñada con pedales y rotar a VR inicialmente a 10° pitch up hacia el FD.' },
          { role: 'PM', callout: '"POSITIVE RATE"', action: 'Verificar ascenso positivo en instrumentos.' },
          { role: 'PF', callout: '"GEAR UP"', action: 'Ordenar subir el tren de aterrizaje. (No tocar nada más por debajo de 400 ft AGL).' },
          { role: 'STEP', action: 'De 400 ft a ACC ALT:', details: 'Comprobar HDG / LNAV / EOSID y Low Bank. Pedir "SELECT HDG", "SELECT AUTOPILOT".' },
          { role: 'STEP', action: 'Al alcanzar ACC ALT:', details: 'Seleccionar FLCH (manual) a VFS o Green Dot - 10. Retraer flaps secuencialmente hasta FLAP ZERO.' },
          { role: 'PF', callout: '"CONTINUOUS"', action: 'Con Flap Zero: seleccionar empuje continuo (CON). Ejecutar Memory Items si aplica y abrir QRH/MEANA.' }
        ]
      },
      {
        title: 'Técnica de Driftdown en Crucero (Fallo OEI en Ruta)',
        color: 'amber',
        items: [
          { role: 'STEP', action: '1° Configuración Inicial de Empuje:', details: 'En modo Auto: Confirmar EO prompt en FMS. En manual: Desconectar A/T, avanzar palanca operativa a TOGA y seleccionar CONTINUOUS.' },
          { role: 'PF', callout: '"GREEN DOT SET"', action: '2° Velocidad de Descenso: Seleccionar en FGS la velocidad GREEN DOT para máximo alcance de planeo.' },
          { role: 'PF', callout: '"EO MAX ALT SET, FLCH"', action: '3° Inicio del Descenso: Comprobar techo monomotor EO MAX ALT en FMS y activar FLCH.' },
          { role: 'STEP', action: '4° Nivelación y Navegación:', details: 'Nivelar en EO MAX ALT, monitorizar combustible y ejecutar lista anormal aplicable ("I HAVE ATC").' }
        ]
      },
      {
        title: 'Distinción de Fallos y Acciones de Memoria (Memory Items)',
        color: 'indigo',
        items: [
          { role: 'NOTE', action: 'Engine Failure simple (N1 en molinete sin daños):', details: 'NO requiere Memory Items. Se gestiona con la lista del QRH.' },
          { role: 'ALERT', action: 'Severe Damage / Fire / Separation (Vibración severa, ruido, fuego o guiones ámbar):', details: 'Requiere aplicar inmediatamente MEMORY ITEMS con confirmación cruzada rigurosa entre PF y PM antes de mover palancas, selector de arranque o tirar del maneral de fuego.' }
        ]
      }
    ]
  },

  {
    id: 'card-emg-emergency-descent',
    category: 'emergency',
    title: 'Descenso de Emergencia (Emergency Descent)',
    subtitle: 'Despresurización de cabina (CABIN ALT HI), máscaras 100%, DUMP y perfil',
    manualRef: 'MOB 3.1.4 & QRH Rev19 S1-3',
    airplane: 'Embraer 195-E2 / Binter Ops',
    badges: ['Memory Items', 'CABIN ALT HI', 'DUMP', 'Oxígeno', '7700'],
    memoryItems: [
      'DEPRESSURIZATION: CREW OXY MASK DON 100%',
      'CREW COMM ESTABLISH',
      'NO DEPRESSURIZATION: FSTN BELTS SWITCH ON',
      'ALTITUDE: 10.000 FT OR MEA (WHICHEVER IS HIGHER)',
      'THRUST LEVERS: IDLE',
      'SPEEDBRAKE LEVER: FULL OPEN',
      'AIRSPEED: MAX / APPROPRIATE',
      'TRANSPONDER: 7700'
    ],
    goldenRules: [
      'Despliegue automático de máscaras PAX ocurre entre 14.000 y 14.750 ft de altitud de cabina.',
      'Aviso inmediato a cabina por megafonía: "DESCENSO DE EMERGENCIA, DESCENSO DE EMERGENCIA, DESCENSO DE EMERGENCIA".',
      'Nivelación objetivo: 10.000 ft o la Altitud Mínima en Ruta (MEA/MORA), la que sea más alta.',
      'A 2.000 ft de nivelar reducir a 250 kt; a 1.000 ft retraer aerofrenos (Speedbrakes).'
    ],
    summary: 'Procedimiento de descenso de máxima tasa ante despresurización o indicación CABIN ALT HI, gestión de oxígeno de tripulación/pasaje y función DUMP.',
    diagramImage: './sop-diagrams/emg-emergency-descent.svg',
    diagramCaption: 'Infografía Oficial: Descenso de Emergencia y Despresurización de Cabina',
    diagramNote: 'Máscaras 100% · Throttles IDLE · Speedbrakes FULL · Descenso FL100/MEA · Transponder 7700',
    sections: [
      {
        title: 'Acciones Inmediatas de Memoria (Memory Items)',
        color: 'rose',
        items: [
          { role: 'PF', callout: '"DESCENSO DE EMERGENCIA"', action: 'Anuncio inicial en cabina técnica.' },
          { role: 'CREW', action: 'Colocarse máscaras de oxígeno al 100% y establecer comunicaciones por interfono.' },
          { role: 'PA', callout: '"DESCENSO DE EMERGENCIA x3"', action: 'Aviso por megafonía a pasajeros y tripulantes de cabina.' },
          { role: 'PF', action: 'Ajustar altitud a 10.000 ft o MEA y pulsar FLCH.' },
          { role: 'PF', action: 'Palancas de empuje a ralentí (IDLE).' },
          { role: 'PF', action: 'Palanca de aerofrenos a FULL OPEN.' },
          { role: 'PF', action: 'Seleccionar velocidad MANUAL al máximo apropiado (VMO/MMO si la estructura está intacta).' },
          { role: 'PM', action: 'Transponder a 7700 y llamada de Mayday a ATC: "MAYDAY x3, BINTER XXX, DESCENSO DE EMERGENCIA".' }
        ]
      },
      {
        title: 'Nivelación y Normalización a Altitud Segura',
        color: 'emerald',
        items: [
          { role: 'PM', callout: '"2 THOUSAND TO LEVEL OFF"', action: 'A 2.000 ft de la altitud objetivo: Reducir velocidad a 250 kt.' },
          { role: 'PM', callout: '"1 THOUSAND TO LEVEL OFF"', action: 'A 1.000 ft de la altitud objetivo: Retraer aerofrenos suavemente.' },
          { role: 'PA', callout: '"TRIPULACIÓN DE CABINA, DESCENSO FINALIZADO"', action: 'Al nivelar seguro en altitud respirable.' },
          { role: 'STEP', action: 'Completar Cabin Altitude Hi Emergency Checklist con QRH.' }
        ]
      },
      {
        title: 'Régimen de la Función DUMP de Presurización',
        color: 'indigo',
        items: [
          { role: 'NOTE', action: 'Modo Automático:', details: 'Asciende la cabina a +2.000 ft/min hasta 12.400 ft (modo normal) o hasta 14.500 ft (modo H ALTO).' },
          { role: 'NOTE', action: 'Modo Manual:', details: 'Asciende la cabina a +3.000 ft/min hasta un techo máximo de 14.500 ft.' }
        ]
      }
    ]
  },

  {
    id: 'card-emg-reject-takeoff',
    category: 'emergency',
    title: 'Reject Takeoff (RTO)',
    subtitle: 'Aborto de despegue estándar (<80 kt vs >80 kt) e incapacitación del PF',
    manualRef: 'MOB 3.1.2 & QRH Rev19',
    airplane: 'Embraer 195-E2 / Binter Ops',
    badges: ['RTO', '80 KTS', 'V1', 'Incapacitación', 'Frenada Máxima'],
    goldenRules: [
      'Por debajo de 80 kt: Se aborta por cualquier fallo excepto "ENG TLA NOT TOGA" y "FUEL LO LEVEL".',
      'Por encima de 80 kt hasta V1: SOLO se aborta por Fuego de motor, Fallo de motor, Humo, Alerta de Cizalladura (Predictive Windshear), EICAS Warning o condición insegura de vuelo.',
      'Tras parar el avión: Poner freno de parking y cantar inmediatamente por PA: "TRIPULACIÓN DE CABINA, ESPEREN INSTRUCCIONES".'
    ],
    summary: 'Criterios de decisión para abortar la carrera de despegue según el régimen de velocidad y protocolo de asunción de mandos por el PM en caso de incapacitación del PF a 80 kt.',
    diagramImage: './sop-diagrams/emg-reject-takeoff-rto.svg',
    diagramCaption: 'Infografía Oficial: Despegue Rechazado (Reject Takeoff - RTO)',
    diagramNote: 'Baja Velocidad (<80 kt) vs Alta Velocidad (>80 kt hasta V1) · Acciones PF/PM · Two-Challenge Rule',
    sections: [
      {
        title: 'Criterios de Decisión según Régimen de Velocidad',
        color: 'rose',
        items: [
          { role: 'NOTE', action: 'Baja Velocidad (< 80 KIAS):', details: 'Abortar ante cualquier fallo del sistema, aviso sonoro o anomalía, excepto alertas menores de TLA o nivel bajo de combustible.' },
          { role: 'ALERT', action: 'Alta Velocidad (> 80 KIAS hasta V1):', details: 'ZONA DE ALTA ENERGÍA. Solo abortar por: 1° Fallo de motor / Fuego, 2° Humo denso en cabina, 3° Alerta de cizalladura (WSHEAR AHEAD), 4° Mensajes EICAS WARNING (Rojo), 5° Aeronave incapaz de volar con seguridad.' }
        ]
      },
      {
        title: 'Procedimiento de RTO por Incapacitación del PF (PM asume mandos)',
        color: 'amber',
        items: [
          { role: 'PM', callout: '"80 KNOTS"... "80 KNOTS"', action: 'Si el PF no responde a la doble llamada consecutiva de 80 nudos (Two-challenge rule).' },
          { role: 'PM', action: 'Tomar inmediatamente los mandos ("I HAVE CONTROLS"), palancas de empuje a IDLE y desconectar A/T.' },
          { role: 'PM', action: 'Verificar actuación del freno automático RTO o aplicar MÁXIMA FRENADA MANUAL con pedales.' },
          { role: 'PM', action: 'Aplicar reversas simétricas apropiadas y mantener eje de pista hasta detener por completo el avión.' },
          { role: 'PM', action: 'Poner freno de estacionamiento (PARK BRAKE).' },
          { role: 'PA', callout: '"TRIPULACIÓN DE CABINA, ESPEREN INSTRUCCIONES"', action: 'Aviso inmediato a cabina para evitar pánico y evacuación indebida.' },
          { role: 'STEP', action: 'Comprobar página STATUS para evaluar temperatura de frenos.' },
          { role: 'ATC', callout: '"PAN-PAN MEDICAL & FIRE FIGHTING SERVICES"', action: 'Solicitar asistencia médica inmediata y bomberos a pie de pista.' },
          { role: 'STEP', action: 'Arranque de APU, llamada a sobrecargo para coordinar médico y parada de motores mediante Shutdown Checklist.' }
        ]
      }
    ]
  },

  {
    id: 'card-emg-tcas-ra',
    category: 'emergency',
    title: 'Maniobra TCAS RA (Resolution Advisory)',
    subtitle: 'Respuesta ante aviso de resolución de colisión, Fly-to-Zone y llamada ATC',
    manualRef: 'MOB 3.1.8 & SOPM Sec 3',
    airplane: 'Embraer 195-E2 / Binter Ops',
    badges: ['TCAS RA', 'Fly-to-Zone', 'ATC Callout', 'Memory Items'],
    memoryItems: [
      'PF: DISENGAGE AUTOPILOT & AUTOTHROTTLE ("MY CONTROLS")',
      'PF: FLY-TO-ZONE (Seguir trapecio verde en PFD)',
      'PM: TURN ON ALL EXTERNAL LIGHTS',
      'PM: FSN BELT SWITCH ON & INTERNAL STERIL LIGHT ON',
      'PM: ATC CALLOUT: "TCAS RA"'
    ],
    goldenRules: [
      'Las órdenes de resolución de TCAS RA prevalecen sobre cualquier instrucción previa del ATC.',
      'Seguir con suavidad y precisión el trapecio verde del variómetro en el PFD sin maniobras bruscas.',
      'Al resolver el conflicto, regresar a la última altitud autorizada y cantar a ATC: "CLEAR OF CONFLICT".'
    ],
    summary: 'Protocolo de actuación y reparto de tareas entre PF y PM ante una alarma de resolución anticolisión TCAS RA.',
    diagramImage: './sop-diagrams/emg-tcas-ra.svg',
    diagramCaption: 'Infografía Oficial: Maniobra de Escape TCAS RA (Resolution Advisory)',
    diagramNote: 'Fly-to-Zone · Desconexión AP/AT · Prioridad TCAS vs ATC · Luces Exteriores y Llamada ATC',
    sections: [
      {
        title: 'Acciones Inmediatas del Pilot Flying (PF)',
        color: 'rose',
        items: [
          { role: 'PF', action: 'Colocar inmediatamente las manos sobre los mandos de vuelo.' },
          { role: 'PF', callout: '"MY CONTROLS"', action: 'Desconectar piloto automático (AP) y autothrottle (AT).' },
          { role: 'PF', action: 'Volar hacia la zona verde (Fly-to-Zone) indicada en el PFD con variómetro suave (evitar factor de carga excesivo).' },
          { role: 'PF', action: 'Escanear visualmente el exterior y la pantalla de tráfico TCAS.' },
          { role: 'PF', action: 'Al resolver el aviso: Regresar suavemente al nivel de vuelo o altitud previamente asignada.' }
        ]
      },
      {
        title: 'Acciones Inmediatas del Pilot Monitoring (PM)',
        color: 'sky',
        items: [
          { role: 'PM', action: 'Encender todas las luces exteriores (Landing, Taxi, Strobe, Logo).' },
          { role: 'PM', action: 'Encender señal de cinturones (FSN BELTS ON) y luz de cabina estéril (STERIL ON).' },
          { role: 'ATC', callout: '"[CALLSIGN], TCAS RA"', action: 'Comunicar inmediatamente al control de tráfico aéreo.' },
          { role: 'PM', action: 'Monitorizar la trayectoria del PF y escanear tráfico fuera y en TCAS.' },
          { role: 'ATC', callout: '"[CALLSIGN], CLEAR OF CONFLICT, RETURNING TO [ALTITUDE]"', action: 'Comunicar resolución del aviso y reincorporación a la autorización.' }
        ]
      }
    ]
  },

  {
    id: 'card-emg-windshear',
    category: 'emergency',
    title: 'Maniobra Windshear (Cizalladura)',
    subtitle: 'Cizalladura predictiva vs reactiva, modo de escape WSHR y empuje FADEC RSV',
    manualRef: 'MOB 3.1.9 & SOPM Sec 3',
    airplane: 'Embraer 195-E2 / Binter Ops',
    badges: ['Windshear', 'Modo WSHR', 'FADEC RSV', 'PLI', 'TOGA'],
    goldenRules: [
      'Callouts inmediatos: PF: "WINDSHEAR" -> PM: "MAX".',
      'Palancas a tope (MAX) y pulsar botón TO/GA. Seguir la barra del FD hasta 15° de cabeceo o el límite del PLI (Pitch Limit Indicator).',
      '¡PROHIBIDO CAMBIAR LA CONFIGURACIÓN! Mantener tren y flaps intactos hasta salir de la cizalladura.',
      'El FADEC cancela automáticamente cualquier desclasificación (FLEX/DERATE) y entrega empuje máximo GO/AROUND RSV.'
    ],
    summary: 'Distinción entre cizalladura predictiva (radar) y reactiva, activación del modo Windshear Escape Guidance (WSHR) entre 10 y 1.500 ft AGL y recuperación.',
    diagramImage: './sop-diagrams/emg-windshear.svg',
    diagramCaption: 'Infografía Oficial: Maniobra de Escape por Windshear (Cizalladura)',
    diagramNote: 'Alarma Predictiva/Reactiva · Empuje MAX / TOGA · Mantener Configuración Tren/Flaps · PLI Pitch',
    sections: [
      {
        title: 'Alertas Predictivas vs Reactivas',
        color: 'amber',
        items: [
          { role: 'ALERT', action: 'Predictiva en Despegue:', details: '"WINDSHEAR AHEAD x2" (Aviso rojo) o "MONITOR RADAR DISPLAY" (Precaución ámbar).' },
          { role: 'ALERT', action: 'Predictiva en Aproximación:', details: '"GO AROUND, WINDSHEAR AHEAD" (Rojo) -> Ejecutar frustrada inmediata.' },
          { role: 'ALERT', action: 'Reactiva en Vuelo:', details: '"WINDSHEAR, WINDSHEAR, WINDSHEAR" (Rojo) o "CAUTION WINDSHEAR" (Ámbar).' }
        ]
      },
      {
        title: 'Maniobra de Escape de Cizalladura (Windshear Escape)',
        color: 'rose',
        items: [
          { role: 'PF', callout: '"WINDSHEAR"', action: 'Avanzar palancas a MAX DETENT y pulsar botón TO/GA.' },
          { role: 'PM', callout: '"MAX"', action: 'Verificar empuje máximo de reserva en EICAS.' },
          { role: 'PF', action: 'Seguir indicaciones del Flight Director o cabeceo de 15° Nose Up respetando el Pitch Limit Indicator (PLI).' },
          { role: 'ALERT', action: 'MANTENER CONFIGURACIÓN:', details: 'NO retraer tren de aterrizaje ni mover flaps mientras se esté en cizalladura.' }
        ]
      },
      {
        title: 'Salida del Modo WSHR (> 1.500 ft AGL y fuera de cizalladura)',
        color: 'emerald',
        items: [
          { role: 'PF', action: 'Retrasar palancas a TO/GA, pulsar botón TO/GA y seleccionar manualmente otro modo vertical (FLCH/LNAV/HDG).' },
          { role: 'PF', callout: '"GO AROUND" / "GO AROUND FLAP 2(4)"', action: 'Ordenar secuencia de ascenso tras salir de la zona de peligro.' },
          { role: 'PM', callout: '"POSITIVE RATE"', action: 'Verificar ascenso sostenido.' },
          { role: 'PF', callout: '"GEAR UP"', action: 'Subir tren de aterrizaje y continuar aceleración a VFS.' }
        ]
      }
    ]
  },

  {
    id: 'card-emg-egpws-terrain',
    category: 'emergency',
    title: 'Maniobra EGPWS Terrain Warning',
    subtitle: 'Maniobra correctiva ante aviso de proximidad al terreno ("PULL UP")',
    manualRef: 'MOB 3.1.7 & SOPM Sec 3',
    airplane: 'Embraer 195-E2 / Binter Ops',
    badges: ['EGPWS', 'PULL UP', 'Terrain', '15° Pitch', 'MSA'],
    goldenRules: [
      'Ante alarma de terreno "TERRAIN, TERRAIN, PULL UP": Desconectar AP ("MY CONTROLS"), palancas a MAX ("MAX").',
      'Nivelar planos inmediatamente y establecer cabeceo de ascenso de 15° Nose Up o límite PLI.',
      'Mantener configuración intacta (no mover tren ni flaps hasta haber superado el terreno y estar en ascenso seguro).',
      'Ascender hasta la altitud mínima de seguridad (MSA o MORA).'
    ],
    summary: 'Maniobra de escape vertical de máxima performance ante aviso acústico o visual de colisión inminente contra el terreno.',
    diagramImage: './sop-diagrams/emg-egpws-terrain.svg',
    diagramCaption: 'Infografía Oficial: Maniobra EGPWS Terrain Warning (Pull Up)',
    diagramNote: 'Alarma PULL UP · Máxima Potencia TOGA · Pitch 15° / PLI · Prohibición de Modificar Tren/Flaps · Ascenso a MSA',
    sections: [
      {
        title: 'Acciones Inmediatas del Pilot Flying (PF)',
        color: 'rose',
        items: [
          { role: 'PF', callout: '"MY CONTROLS"', action: 'Desconectar piloto automático (AP) y autothrottle (AT).' },
          { role: 'PF', callout: '"MAX"', action: 'Avanzar palancas de empuje al tope máximo (MAX DETENT).' },
          { role: 'PF', action: 'Nivelar planos inmediatamente (Wings Level) para maximizar la componente de sustentación vertical.' },
          { role: 'PF', action: 'Tirar con decisión del mando de cabeceo hasta 15° Nose Up o límite del Pitch Limit Indicator (PLI).' },
          { role: 'ALERT', action: 'MANTENER CONFIGURACIÓN:', details: 'NO modificar la posición de flaps ni tren de aterrizaje.' },
          { role: 'STEP', action: 'Continuar ascenso con potencia máxima hasta alcanzar la MSA o MORA.' },
          { role: 'STEP', action: 'Una vez libre de terreno y obstáculos: Nivelar, conectar piloto automático y restablecer velocidad normal.' }
        ]
      },
      {
        title: 'Acciones Inmediatas del Pilot Monitoring (PM)',
        color: 'sky',
        items: [
          { role: 'PM', action: 'Encender señal de cinturones (FSN BELTS ON).' },
          { role: 'PM', action: 'Escanear referencias visuales exteriores y pantalla de terreno MFD.' },
          { role: 'PM', callout: 'Cantadas de radioaltímetro', action: 'Cantar activamente indicaciones de radioaltímetro y tasa de ascenso.' },
          { role: 'ATC', callout: '"[CALLSIGN], TERRAIN PULL UP CLIMBING TO [MSA]"', action: 'Notificar maniobra de escape de emergencia al control de tráfico aéreo.' }
        ]
      }
    ]
  },

  // =========================================================================
  // 4. PROCEDIMIENTOS ESPECIALES / COMPLEMENTARIOS
  // =========================================================================
  {
    id: 'card-special-engine-start-apu-inop',
    category: 'special',
    title: 'Puesta en Marcha con APU Inoperativo en Flota E195-E2',
    subtitle: 'Secuencia oficial Cabina-Tierra con ASU en toma inferior, arranque Motor 2 y Crossbleed Motor 1',
    manualRef: 'MOA Binter ED06 RN27 - Subcapítulo 8.2.2.12.3.1 (Pág. 8.2-108 a 8.2-111)',
    airplane: 'Embraer 195-E2 / Binter Ops',
    badges: ['MOA 8.2.2.12.3.1', 'APU INOP', 'ASU', 'GPU / 400Hz', 'Motor 2 primero', 'Crossbleed Motor 1'],
    goldenRules: [
      'La toma de ASU en el E195-E2 está en la parte inferior del fuselaje (extremar precauciones en conexión/desconexión).',
      'Si hay pasarela/finger conectado, se desconectará antes de la puesta en marcha de motores.',
      'Generalmente se arranca primero el Motor 2, ya que el ASU se posiciona enfrente del Motor 1.',
      'Confirmación obligatoria de giro de motor por tierra: "Cabina, motor número 2 (1) girando" (de no girar es indicación de arranque insatisfactorio).'
    ],
    summary: 'Procedimiento oficial del MOA 8.2.2.12.3.1 para la puesta en marcha con APU inoperativo en el Embraer 195-E2, detallando la fraseología exacta cabina-tierra, arranque de Motor 2 con ASU y arranque cruzado de Motor 1 tras incremento de potencia.',
    diagramImage: './sop-diagrams/special-engine-start-apu-inop.svg',
    diagramCaption: 'Infografía Oficial: Puesta en Marcha con APU Inoperativo y Crossbleed Start (E195-E2)',
    diagramNote: 'MOA 8.2.2.12.3.1 · Equipos ASU/GPU en Tierra · Arranque Motor 2 · Arranque Cruzado Motor 1',
    sections: [
      {
        title: '1. Actuaciones Previas y Coordinación Inicial',
        color: 'indigo',
        items: [
          { role: 'STEP', action: 'Posicionamiento previo de ASU (Air Starter Unit) y GPU/400Hz antes de la salida.', details: 'Si se utiliza 400Hz del finger, se separará a distancia suficiente si hubiera que arrancar motor 1 primero.' },
          { role: 'STEP', action: 'Vuelta de seguridad previa por el coordinador/agente de handling.', details: 'Comprobar área libre de personal, vehículos, equipos y FOD.' },
          { role: 'STEP', action: 'Conexión de cascos intercomunicadores.', details: 'Verificar ausencia de tormenta eléctrica y posicionarse enfrente del avión a distancia prudencial de motores.' },
          { role: 'CREW', callout: '"Tierra de Cabina / Ground from cockpit"', action: 'Inicia comunicación de puesta en marcha.' },
          { role: 'CREW', callout: '"Adelante / Go ahead"', action: 'Tierra confirma enlace.' },
          { role: 'PF', callout: '"Autorizados para puesta en marcha, confirme, walk-around completo, puertas y registros cerrados"', action: 'Cockpit solicita confirmación de cierre.' },
          { role: 'CREW', callout: '"Le confirmo walk-around completo, puertas y registros cerrados"', action: 'Tierra confirma avión cerrado y listo.' }
        ]
      },
      {
        title: '2. Puesta en Marcha de Motor Número 2 con ASU',
        color: 'sky',
        items: [
          { role: 'PF', callout: '"Tierra de cabina, confirme libre el motor número 2"', action: 'Comandante solicita motor 2 libre (área de seguridad sin obstáculos).' },
          { role: 'CREW', callout: '"Motor número 2 libre / Engine number 2 is clear"', action: 'Tierra verifica y confirma motor libre.' },
          { role: 'PF', callout: '"Recibido, pueden empezar a incrementar potencia del ASU"', action: 'Comandante autoriza aceleración de la unidad neumática.' },
          { role: 'CREW', callout: '"Recibido incrementando / Roger, increasing power"', action: 'Tierra activa incremento de potencia de ASU a valores nominales de arranque.' },
          { role: 'PF', callout: '"Potencia correcta, arrancando motor número 2"', action: 'Comandante comprueba presión correcta y gira selector START/STOP a START.' },
          { role: 'CREW', callout: '"Cabina, motor número 2 girando / Cockpit, engine number 2 turning"', action: 'Tierra confirma rotación inicial del motor (arranque a primeras horas puede ser más lento).' },
          { role: 'NOTE', action: 'Comandante monitoriza indicaciones de cockpit y mantiene escucha activa ante cualquier indicación de humo o fuego.' },
          { role: 'PF', callout: '"Puesta en marcha del número 2 correcta. GPU y ASU fuera"', action: 'Motor 2 estabilizado; Comandante autoriza retirada de equipos externos.' },
          { role: 'CREW', callout: '"GPU y ASU fuera / GPU and ASU removed"', action: 'Tierra desconecta y retira GPU y manguera ASU.' }
        ]
      },
      {
        title: '3. Puesta en Marcha de Motor Número 1 (Crossbleed Start)',
        color: 'amber',
        items: [
          { role: 'ALERT', action: 'Para arrancar Motor 1, la tripulación técnica debe aumentar potencia en Motor 2.', details: 'Extremar precauciones en el área de escape y zonas adyacentes al Motor 2.' },
          { role: 'PF', callout: '"¿Está libre zona del motor número 2 para incrementar potencia?"', action: 'Cockpit consulta seguridad de blast area.' },
          { role: 'CREW', callout: '"Libre área del número 2 para potencia / Area number 2 is clear to increase power"', action: 'Tierra confirma zona despejada.' },
          { role: 'PF', action: 'Comandante incrementa potencia en Motor 2 hasta obtener los valores de presión requeridos.' },
          { role: 'PF', callout: '"Confirme libre el motor número 1 / Confirm engine number 1 is clear"', action: 'Cockpit solicita motor 1 libre.' },
          { role: 'CREW', callout: '"Libre el motor número 1 / Engine number 1 is clear"', action: 'Tierra confirma libre.' },
          { role: 'PF', callout: '"Arrancando motor número 1 / Starting engine number 1"', action: 'Comandante gira selector START/STOP a START.' },
          { role: 'CREW', callout: '"Cabina, motor número 1 girando / Cockpit, engine number 1 turning"', action: 'Tierra confirma rotación del motor 1.' }
        ]
      },
      {
        title: '4. Finalización, Retirada de Calzos y Despedida',
        color: 'emerald',
        items: [
          { role: 'PF', callout: '"Motor número 1 estabilizado, dos puestas en marcha correctas. Calzos fuera, puede desconectarse. Señal por la izquierda/derecha"', action: 'Cockpit confirma motores estabilizados y ordena retirar calzos.' },
          { role: 'CREW', callout: '"Calzos fuera. Mantenga posición y aguarde la señal de todo despejado a su izquierda/derecha"', action: 'Tierra retira calzos, desconecta cascos intercomunicadores y cierra registro de rampa.' },
          { role: 'STEP', action: 'El coordinador/agente de handling se dirige a la posición de despedida manteniendo distancia de seguridad y da señal visual de OK (todo despejado).' },
          { role: 'STEP', action: 'El agente de handling permanece en la posición de despedida hasta que la aeronave empiece a rodar.' }
        ]
      }
    ]
  },

  {
    id: 'card-special-arrival-apu-inop',
    category: 'special',
    title: 'Procedimiento de Llegada en Flota Embraer con APU Inoperativo',
    subtitle: 'Protocolo estricto de acceso a la ERA, calzos, conexión de GPU y parada de motores',
    manualRef: 'MOA Binter ED06 RN27 - Subcapítulo 8.2.2.12.4.2 (Pág. 8.2-113 a 8.2-114)',
    airplane: 'Embraer 195-E2 / Binter Ops',
    badges: ['MOA 8.2.2.12.4.2', 'APU INOP', 'Acceso ERA', 'Calzo Tren Delantero', 'GPU en Zona Segura', 'Beacon ON'],
    goldenRules: [
      'Informar al handling de la escala de destino de la llegada con APU inoperativo.',
      'Nadie accederá a la ERA hasta: 1° Avión detenido, 2° Luz roja de Parking Brake encendida, y 3° UNO de los motores completamente parado con el otro al ralentí.',
      'Calzar tren delantero exclusivamente por la zona segura alejada del motor que permanece al ralentí (respetando línea de zona de succión).',
      'Las luces BEACON se mantendrán encendidas hasta la parada total de los DOS motores.',
      'Sólo tras la parada total de ambos motores se apagan beacons y se calza el tren principal (caminando paralelo al fuselaje).'
    ],
    summary: 'Protocolo oficial y de estricto obligado cumplimiento del MOA 8.2.2.12.4.2 para la llegada a stand con APU inoperativo en la flota Embraer, detallando los 3 requisitos simultáneos para acceder a la ERA y la secuencia de calzos y GPU.',
    diagramImage: './sop-diagrams/special-arrival-apu-inop.svg',
    diagramCaption: 'Infografía Oficial: Llegada y Parada en Parking con APU Inoperativo (E195-E2)',
    diagramNote: 'MOA 8.2.2.12.4.2 · 3 Requisitos Acceso ERA · Calzo Delantero Seguro · Conexión GPU · Parada Motor 2 y Beacons',
    sections: [
      {
        title: '1. Notificación Previa y Precauciones en Llegada',
        color: 'indigo',
        items: [
          { role: 'STEP', action: 'Informar al handling de la escala de destino que la aeronave llega con APU inoperativo.' },
          { role: 'STEP', action: 'Extremar las precauciones en la operación de llegada, haciendo uso de la señalética establecida (MOA 8.2.2.12.1.2) hasta poder conectar cascos de forma segura.' },
          { role: 'STEP', action: 'Asegurar disponibilidad previa en stand de: Calzos, Conos, GPU / 400Hz y Cascos intercomunicadores.' }
        ]
      },
      {
        title: '2. Requisitos de Acceso a la ERA (Equipment Restriction Area)',
        color: 'rose',
        items: [
          { role: 'ALERT', action: 'PROHIBICIÓN TOTAL DE ACCESO A LA ERA hasta que se cumplan 3 condiciones simultáneas:', details: '1. La aeronave esté completamente detenida.\n2. La tripulación dé confirmación de frenos puestos y la luz indicadora de parking brake esté encendida (luz roja).\n3. Uno de los motores esté completamente parado, con el otro motor al ralentí.' },
          { role: 'NOTE', action: 'Las luces BEACON se mantendrán ENCENDIDAS hasta la parada total de los dos motores.' }
        ]
      },
      {
        title: '3. Calzado de Tren Delantero y Conexión de GPU',
        color: 'amber',
        items: [
          { role: 'STEP', action: 'Calzar el tren delantero del avión:', details: 'El personal encargado accederá siempre a través de la zona segura alejada del motor que permanece al ralentí, sin rebasar nunca la línea indicadora de zona de succión.' },
          { role: 'STEP', action: 'Conexión de la GPU:', details: 'Cuando la aeronave esté calzada en su tren delantero, el GPU accederá para su conexión a través de la zona segura, manteniéndose fuera de la ERA el resto del personal y equipos.' },
          { role: 'STEP', action: 'Conexión de Intercomunicador:', details: 'A partir de este momento se conecta el coordinador por cascos tierra-cabina y se confirma colocación de calzos delanteros y conexión de GPU a la tripulación técnica.' }
        ]
      },
      {
        title: '4. Parada del Segundo Motor, Beacon y Calzado Principal',
        color: 'emerald',
        items: [
          { role: 'PF', action: 'Tras confirmar GPU conectada y suministrando energía: Proceder a la parada del segundo motor.' },
          { role: 'STEP', action: 'Apagado de luces BEACON:', details: 'Sólo después de la parada total de los dos motores de la aeronave se procederá al apagado de las luces beacon.' },
          { role: 'STEP', action: 'Calzado del tren principal:', details: 'Posteriormente al apagado de beacons, el personal calza el tren principal, caminando hacia éste de forma paralela al fuselaje del avión.' },
          { role: 'STEP', action: 'Aproximación de pasarelas, escaleras y equipos GSE:', details: 'El resto de equipos de asistencia en tierra podrá acercarse al avión tras la vuelta inicial de seguridad.' }
        ]
      }
    ]
  },

  // =========================================================================
  // SECCIÓN ESPECIAL: PREPARACIÓN ENTREVISTA NETJETS & TOMA DE DECISIONES EASA
  // =========================================================================

  // 14. FLUJO DE DECISIÓN DE COMBUSTIBLE EN VUELO (EASA CAT.OP.MPA.182)
  {
    id: 'card-netjets-fuel-decision-flow',
    category: 'special',
    title: 'Flujo de Decisión de Combustible en Vuelo & Declaraciones ATC (EASA)',
    subtitle: 'Monitorización regular, cálculo de Mínimo Desvío (MDF), MINIMUM FUEL y MAYDAY FUEL',
    manualRef: 'EASA Part-CAT.OP.MPA.180 / 181 / 182 • AMC1 CAT.OP.MPA.182 • ICAO Doc 4444',
    airplane: 'NetJets Corporate Fleet / EASA CAT',
    badges: ['Fuel Policy', 'In-Flight Decision', 'MINIMUM FUEL', 'MAYDAY FUEL'],
    goldenRules: [
      'Monitorización continua cada ≤60 minutos o en cada waypoint principal de la ruta.',
      'El Combustible de Reserva Final (30 min en reactores a 1.500 ft ISA) es INVIOLABLE.',
      'Si se prevé aterrizar en el aeródromo seguro más cercano con menos del FRF: MAYDAY MAYDAY MAYDAY FUEL obligatorio.'
    ],
    summary: 'Árbol de decisión y procedimiento operativo para la gestión del combustible en vuelo, re-planificación por esperas o meteorología adversa, y criterios exactos para la emisión de llamadas radiotelefónicas según EASA.',
    diagramImage: './sop-diagrams/netjets-fuel-decision-flow.svg',
    diagramCaption: 'Infografía Oficial: Flujo de Decisión de Combustible en Vuelo & Declaraciones ATC (EASA)',
    diagramNote: 'Monitoreo FOB vs Plan · Combustible MDF · MINIMUM FUEL vs MAYDAY FUEL · Reserva Final (30 min)',
    sections: [
      {
        title: '1. Monitorización Rutinaria en Crucero (Cada ≤ 60 min)',
        color: 'sky',
        items: [
          { role: 'STEP', action: 'Registrar remanente utilizable en el Plan de Vuelo Operacional (OFP).', details: 'Comparar consumo real frente al previsto en el plan del FMS.' },
          { role: 'STEP', action: 'Calcular el Combustible Mínimo de Desvío (Minimum Diversion Fuel - MDF):', details: 'MDF = Alternate Fuel (vía ruta de desvío más desfavorable) + Final Reserve Fuel (30 min jet).' },
          { role: 'NOTE', action: 'Verificar remanente estimado en destino (EFOB Destination):', details: 'EFOB en destino debe ser siempre ≥ MDF antes de iniciar la aproximación.' }
        ]
      },
      {
        title: '2. Entrada en Espera o Demoras no Planificadas',
        color: 'amber',
        items: [
          { role: 'PF', action: 'Determinar el Tiempo Máximo de Espera (Holding Time):', details: 'Tiempo de Espera = (Combustible a Bordo - MDF) / Consumo Horario de Espera.' },
          { role: 'PM', action: 'Solicitar al ATC la Hora Prevista de Aproximación (EAT - Expected Approach Time).', details: 'Verificar que la EAT sea anterior a la expiración del tiempo máximo de espera disponible.' },
          { role: 'ALERT', action: 'Al alcanzar el combustible MDF sin autorización de aproximación:', details: 'Abandonar la espera e iniciar inmediatamente el desvío hacia el aeródromo alternativo.' }
        ]
      },
      {
        title: '3. Declaración de MINIMUM FUEL',
        color: 'purple',
        items: [
          { role: 'PF', action: 'Condición de activación:', details: 'El vuelo está comprometido a aterrizar en un aeródromo específico y cualquier cambio en la autorización actual puede resultar en un aterrizaje con menos del Final Reserve Fuel.' },
          { role: 'PM', action: 'Llamada radiotelefónica al ATC:', callout: '`[Callsign] MINIMUM FUEL`', details: 'Informa al ATC de que no se toleran demoras. NO confiere prioridad, pero previene vectores o esperas innecesarias.' }
        ]
      },
      {
        title: '4. Declaración de MAYDAY MAYDAY MAYDAY FUEL',
        color: 'rose',
        items: [
          { role: 'ALERT', action: 'Condición de activación obligatoria (CAT.OP.MPA.182(e)):', details: 'La cantidad estimada de combustible utilizable al aterrizar en el aeródromo seguro más cercano es MENOR que el Combustible de Reserva Final planificado (30 min).' },
          { role: 'PM', action: 'Llamada de socorro radiotelefónica:', callout: '`MAYDAY MAYDAY MAYDAY FUEL, [Callsign], REQUESTING IMMEDIATE VECTORS FOR LANDING`', details: 'Otorga prioridad absoluta e incondicional sobre cualquier otro tráfico.' },
          { role: 'NOTE', action: 'Acción posterior:', details: 'Cumplimentar y remitir informe formal ASR / MOR de seguridad al operador en el plazo estipulado.' }
        ]
      }
    ]
  },

  // 15. EVALUACIÓN DE APPROACH BAN, MÍNIMOS LVO Y REFERENCIAS VISUALES
  {
    id: 'card-netjets-approach-ban-lvo',
    category: 'special',
    title: 'Evaluación de Approach Ban, Mínimos LVO y Referencias Visuales',
    subtitle: 'Punto de corte a 1.000 ft AAL / OM, verificación de RVR y transición visual en DH/MDH',
    manualRef: 'EASA Part-CAT.OP.MPA.305 / 110 • Part-SPA.LVO.100 • AMC1 CAT.OP.MPA.110',
    airplane: 'NetJets Corporate Fleet / EASA CAT',
    badges: ['LVO', 'Approach Ban', 'CAT I/II/III', 'SOP'],
    goldenRules: [
      'Antes de 1.000 ft AAL / OM manda el RVR notificado por la torre.',
      'Pasados los 1.000 ft AAL manda el contacto visual del piloto a la DA/DH o MDA.',
      'En CAT II se requieren al menos 3 luces consecutivas con elemento transversal para aterrizar.'
    ],
    summary: 'Procedimiento operativo para la aplicación rigurosa de la regla de prohibición de aproximación de EASA (CAT.OP.MPA.305) y criterios de toma de decisión ante degradación de visibilidad durante la aproximación final.',
    diagramImage: './sop-diagrams/netjets-approach-ban-lvo.svg',
    diagramCaption: 'Infografía Oficial: Evaluación de Approach Ban, Mínimos LVO y Referencias Visuales (EASA)',
    diagramNote: 'Punto de Corte 1.000 ft AAL / OM · Regla RVR · Continuación a DA/DH · Referencias Visuales CAT I vs CAT II',
    sections: [
      {
        title: '1. Comprobación Previa antes del Segmento Final (Por encima de 1.000 ft AAL / OM)',
        color: 'sky',
        items: [
          { role: 'PM', action: 'Verificar el último reporte de RVR / visibilidad transmitido por ATC / ATIS:', details: 'Comparar con los mínimos requeridos de la carta de aproximación (AOM) ajustados si hay elementos inoperativos en la MEL.' },
          { role: 'PF', action: 'Regla de Approach Ban (CAT.OP.MPA.305):', details: 'Si el RVR notificado es MENOR al mínimo aplicable, PROHIBIDO descender o continuar más allá del Outer Marker (OM) o de 1.000 ft sobre el terreno.' },
          { role: 'ALERT', action: 'Si RVR < Mínimo antes de 1.000 ft AAL / OM:', callout: '`GO AROUND / HOLDING / DIVERT`', details: 'Frustrar de inmediato, solicitar espera para ver si mejora o proceder al alternativo.' }
        ]
      },
      {
        title: '2. Continuación por debajo de 1.000 ft AAL / OM',
        color: 'emerald',
        items: [
          { role: 'NOTE', action: 'Si el RVR cae por debajo de mínimos DESPUÉS de haber cruzado los 1.000 ft AAL / OM:', details: 'La aproximación PUEDE continuarse reglamentariamente hasta la DA/DH o MDA/MDH aplicable.' },
          { role: 'PF', action: 'Mantener vuelo estabilizado en trayectoria:', details: 'Monitorear parámetros de estabilización (senda, localizador, velocidad, régimen ≤1.000 ft/min).' }
        ]
      },
      {
        title: '3. Decisión en DA/H o MDA/H según Categoría',
        color: 'amber',
        items: [
          { role: 'PM', action: 'Aviso a 100 ft sobre mínimos:', callout: '`ONE HUNDRED TO MINIMUMS`' },
          { role: 'PM', action: 'Al alcanzar la altitud/altura de decisión:', callout: '`MINIMUMS`' },
          { role: 'PF', action: 'CAT I (DH ≥ 200 ft):', details: 'Requiere al menos 1 elemento visual visible (luces de aproximación, umbral, TDZ, marcas o PAPI).' },
          { role: 'PF', action: 'CAT II (DH 100-200 ft):', details: 'Requiere segmento visual de al menos 3 luces consecutivas (eje de aprox, TDZ o eje de pista) con barra transversal.' },
          { role: 'PF', action: 'Si hay referencias visuales requeridas:', callout: '`CONTINUE / LANDING`', details: 'Completar el aterrizaje dentro de la zona de toma de contacto (TDZ).' },
          { role: 'PF', action: 'Si NO hay referencias visuales requeridas a la DA/DH:', callout: '`GO AROUND, FLAPS [X], SET GO-AROUND THRUST`', details: 'Ejecutar maniobra de frustrada inmediata sin demora.' }
        ]
      }
    ]
  },

  // 16. OPERACIÓN RVSM, COTEJO ALTIMÉTRICO Y CONTINGENCIAS
  {
    id: 'card-netjets-rvsm-contingency',
    category: 'special',
    title: 'Operación RVSM, Cotejo Altimétrico y Procedimientos de Contingencia',
    subtitle: 'Verificación de 4 equipos, cotejo de tolerancias (200 ft), SLOP y pérdida de capacidad',
    manualRef: 'EASA Part-SPA.RVSM.100 / 110 • ICAO Doc 9574 • ICAO Doc 4444 • Doc 7030',
    airplane: 'NetJets Corporate Fleet / EASA CAT',
    badges: ['RVSM', 'Altimetry', 'SLOP', 'Contingency'],
    goldenRules: [
      '4 equipos obligatorios: 2 Altímetros primarios + 1 AP + 1 Alerta Altitud + 1 Transponder.',
      'Diferencia máxima entre altímetros primarios en vuelo: 200 ft.',
      'SLOP: Desplazamiento estratégico siempre a la DERECHA del eje hasta 2 NM.'
    ],
    summary: 'Guía práctica para la operación en espacio RVSM (FL290 a FL410), tolerancias de comprobación en cabina, técnicas de mitigación de estela mediante SLOP y gestión ante fallos de sistemas.',
    diagramImage: './sop-diagrams/netjets-rvsm-contingency.svg',
    diagramCaption: 'Infografía Oficial: Operación RVSM, Cotejo Altimétrico, SLOP y Contingencias',
    diagramNote: '4 Equipos Obligatorios · Tolerancia Vuelo ≤200 ft · SLOP 0.1/1.0/2.0 NM Dcha · Contingencia "UNABLE RVSM"',
    sections: [
      {
        title: '1. Comprobación Previa al Despegue y en Ascenso',
        color: 'sky',
        items: [
          { role: 'STEP', action: 'En tierra con QNH local fijado:', details: 'Verificar ambos altímetros primarios contra elevación de campo (tolerancia máx. ±75 ft o ±50 ft según AFM).' },
          { role: 'STEP', action: 'Al cruzar la Altitud de Transición (TA) en ascenso:', details: 'Fijar simultáneamente en ambos puestos Standard 1013.25 hPa (29.92 inHg). Comprobar crosscheck.' },
          { role: 'STEP', action: 'Nivelación en crucero (FL290 a FL410):', details: 'Acoplar el Piloto Automático con modo Altitude Hold activado (mantenimiento ±65 ft).' }
        ]
      },
      {
        title: '2. Monitoreo Periódico en Crucero & SLOP',
        color: 'emerald',
        items: [
          { role: 'PM', action: 'Cotejo de altímetros primarios a intervalos regulares (cada hora):', details: 'Diferencia máxima admisible entre altímetros primarios del Comandante y Copiloto: ≤ 200 ft.' },
          { role: 'PF', action: 'Aplicación de SLOP (Strategic Lateral Offset Procedure):', details: 'Desplazar el guiado del FMS a la DERECHA del eje de ruta hasta 2 NM (en pasos de 0.1, 1.0 o 2.0 NM) para mitigar riesgo de estela y colisión. Nunca a la izquierda.' }
        ]
      },
      {
        title: '3. Procedimiento ante Fallo de Capacidad RVSM',
        color: 'rose',
        items: [
          { role: 'ALERT', action: 'Disparadores de fallo:', details: 'Fallo de piloto automático, pérdida de un altímetro primario, fallo de alertador de altitud o discrepancia altimétrica > 200 ft.' },
          { role: 'PF', action: 'Mantener nivel asignado manualmente con máxima atención; vigilar TCAS.' },
          { role: 'PM', action: 'Notificar inmediatamente a la dependencia de control:', callout: '`[Callsign] UNABLE RVSM DUE TO EQUIPMENT`', details: 'ATC aumentará la separación vertical a 2.000 ft o autorizará el descenso por debajo de FL290.' }
        ]
      }
    ]
  },

  // 17. PROTOCOLO CRM NETJETS: GESTIÓN DE PROPIETARIOS VIP Y LIDERAZGO
  {
    id: 'card-netjets-crm-owner-dilemma',
    category: 'special',
    title: 'Protocolo CRM NetJets: Gestión de Propietarios VIP y Liderazgo de Seguridad',
    subtitle: 'Equilibrio entre servicio de excelencia, asertividad y autoridad indelegable del Comandante',
    manualRef: 'EASA Part-CAT.GEN.MPA.100 / 105 • NetJets Pilot Core Values',
    airplane: 'NetJets Corporate Fleet / Business Aviation',
    badges: ['NetJets Interview', 'CRM', 'Owner Focus', 'Safety Leadership'],
    goldenRules: [
      'Seguridad no negociable: Ningún imperativo comercial vulnera los límites legales (AOM, FTL, MTOW, MEL).',
      'Comunicación profesional y empática: Transmitir siempre que las decisiones protegen la vida del propietario.',
      'Proactividad: No presentar solo un problema, involucrar a Dispatch para presentar soluciones alternativas.'
    ],
    summary: 'Modelo de resolución de conflictos operacionales y dilemas éticos evaluados en la entrevista personal de NetJets Europe (TMAAT - Tell Me About A Time), combinando liderazgo aeronáutico con vocación de servicio al cliente corporativo.',
    diagramImage: './sop-diagrams/netjets-crm-owner-dilemma.svg',
    diagramCaption: 'Infografía Oficial: Protocolo CRM VIP NetJets, Autoridad y Modelo PACE',
    diagramNote: 'Pilar Seguridad Inviolable · Atención VIP Empática y Soluciones · Escalada PACE · Aproximación Estabilizada',
    sections: [
      {
        title: '1. Principio Fundamental de Mando en NetJets',
        color: 'indigo',
        items: [
          { role: 'NOTE', action: 'La seguridad es el valor nuclear absoluto.', details: 'El Comandante ostenta la autoridad decisoria final (CAT.GEN.MPA.105) para garantizar la seguridad de la aeronave, los ocupantes y la operación.' },
          { role: 'NOTE', action: 'Orientación al Cliente (Owner Mindset):', details: 'Tratar a los propietarios con máxima cortesía, transparencia, anticipación y empatía.' }
        ]
      },
      {
        title: '2. Escenario: Presión por Salir bajo Mínimos o con Límite de FTL',
        color: 'amber',
        items: [
          { role: 'STEP', action: 'Paso 1 - Mantener la serenidad y la firmeza técnica:', details: 'No ceder ante presiones de tiempo, reuniones urgentes o comparaciones con otros operadores.' },
          { role: 'STEP', action: 'Paso 2 - Explicación asertiva al propietario en persona:', details: 'Explicar de forma comprensible sin tecnicismos complejos: "Nuestra máxima prioridad es su seguridad absoluta. Las condiciones meteorológicas actuales están por debajo de los límites seguros certificados para operar. En cuanto mejoren o tengamos una ventana segura, despegaremos de inmediato".' },
          { role: 'STEP', action: 'Paso 3 - Proactividad y Soluciones con Dispatch:', details: 'Contactar de inmediato con NetJets Operations Control / Dispatch para gestionar opciones: reposicionamiento de otro avión, desvío a aeropuerto cercano con mejor meteo o transporte VIP por tierra.' }
        ]
      },
      {
        title: '3. Escenario: Desacuerdo Técnico en Cabina (Cockpit Gradient)',
        color: 'purple',
        items: [
          { role: 'STEP', action: 'Fomentar la comunicación abierta (Speak-Up Culture):', details: 'El Comandante debe invitar activamente al Copiloto a expresar cualquier duda o preocupación sobre la operación.' },
          { role: 'STEP', action: 'Escalada asertiva ante desviaciones no corregidas (Pace Model):', details: 'Probe ("¿Confirmas la altitud?") -> Alert ("Estamos 10 kt por debajo de VREF") -> Challenge ("Comandante, senda un punto baja, corrige senda") -> Emergency ("GO AROUND OBLIGATORIO") -> Takeover ("I HAVE CONTROLS").' },
          { role: 'ALERT', action: 'Aproximación No Estabilizada:', details: 'Si a 1.000 ft en IMC o 500 ft en VMC el avión no está perfectamente estabilizado, la frustrada es MANDATORIA.' }
        ]
      }
    ]
  }
,
// =========================================================================
  // BLUE TEAM FLIGHT SCHOOL — SOPs OPERACIÓN NORMAL (C172F & DA40D)
  // =========================================================================
  {
    id: 'card-bt-briefing-normal-ifr',
    category: 'briefings',
    title: 'Blue Team: Briefing Normal IFR y Briefing Visual Corto',
    subtitle: 'Estructura formal para briefing instrumental extendido y briefing corto en visual (C172 / DA40)',
    manualRef: 'Blue Team SOP Rev 04 Caps 6.8 & 6.9',
    airplane: 'Blue Team Flight School (C172F / DA40D)',
    badges: ['Blue Team', 'Briefing IFR', 'Briefing Corto VFR', 'SOP Rev 04'],
    goldenRules: [
      'El briefing debe ser breve, estructurado y claro; nunca rodando hacia la pista.',
      'En IFR: repasar SID completa, altitudes mínimas (MSA), primer nivel asignado, frecuencias y radios 1 y 2.',
      'En VFR Corto: pista en servicio, tipo de despegue, viento esperado, salida visual y altitud máxima.'
    ],
    summary: 'Procedimiento operativo de Blue Team Flight School para la realización de briefings de salida normalizados tanto en operativa instrumental extendida (IFR) como en operaciones visuales reducidas (VFR).',
    diagramImage: './sop-diagrams/bt_sop_briefing_corto_c172.png',
    diagramCaption: 'Blue Team SOP: Guía de Briefing Corto VFR y Normal IFR',
    diagramNote: 'Briefing IFR Extendido · Briefing Corto VFR · Radios COM1/COM2 · MSA y Altitudes',
    sections: [
      {
        title: '1. Normal Briefing Extendido (IFR) — Estructura',
        color: 'sky',
        items: [
          { role: 'STEP', action: 'Meteorología y NOTAMs:', details: 'Revisión de METAR/TAF de salida, destino y alternativos; NOTAMs activos y estado de la aeronave.' },
          { role: 'STEP', action: 'Rodaje y Pista:', details: 'Ruta de rodaje autorizada, puntos calientes (hot spots), pista en servicio y punto de espera para run-up.' },
          { role: 'STEP', action: 'Salida Instrumental (SID):', details: 'Nombre de la SID, ruta inicial, primer fix, restricciones de velocidad y altitud, altitud de transición y nivel inicial.' },
          { role: 'STEP', action: 'Frecuencias de Radio y Radionavegación:', details: 'COM1 en Torre/Salidas; COM2 en emergencia/tierra; NAV1/NAV2 sintonizados e identificados con rumbos y radiales.' }
        ]
      },
      {
        title: '2. Briefing Corto VFR (C172F / DA40D)',
        color: 'emerald',
        items: [
          { role: 'STEP', action: 'Pista y Tipo de Despegue:', details: 'Pista en uso, longitud disponible, despegue normal, campo corto o campo blando.' },
          { role: 'STEP', action: 'Viento y Corrección:', details: 'Componente de viento en cara y cruzado; aplicación de alerones al viento en la carrera inicial.' },
          { role: 'STEP', action: 'Salida Visual:', details: 'Rumbo de salida, altitud de incorporación al circuito o abandono hacia puntos visuales (W/E en TFS, N en TFN).' },
          { role: 'ALERT', action: 'Esterilidad en Cabina:', details: 'Cabina estéril estricta desde encendido y rodaje hasta 1.000 ft AGL; cero distracciones hasta 3.000 ft AGL.' }
        ]
      }
    ]
  },
  {
    id: 'card-bt-briefing-emg-takeoff',
    category: 'briefings',
    title: 'Blue Team: Briefing de Despegue y 4 Escenarios de Fallo Monomotor',
    subtitle: 'Protocolo mandatorio de emergencia en despegue y toma de decisiones según altura sobre el terreno',
    manualRef: 'Blue Team SOP Rev 04 Cap 6.10',
    airplane: 'Blue Team Flight School (C172F / DA40D)',
    badges: ['Blue Team', 'Take-off Emergency', '4 Escenarios', 'Fallo Motor'],
    goldenRules: [
      'Escenario 1 (en pista): Cortar gases inmediatamente, mantener eje con timón, frenar según sea necesario y notificar despegue abortado.',
      'Escenario 2 (en aire con pista remanente): Gases a IDLE, BAJAR MORRO (mínimo 60 kt), flap as required, aterrizar y comunicar.',
      'Escenario 3 (<1000 ft AGL sin pista): Morro abajo para 65 kt (sin flap) / 60 kt (con flap), aterrizar ±30°-45° del morro, contra el viento. ¡PROHIBIDO virar a pista!',
      'Escenario 4 (>1000 ft AGL sin pista): Morro abajo para 65 kt (C172) / 73 kt (DA40), viraje 180° hacia la pista SIEMPRE contra el viento.'
    ],
    summary: 'Briefing verbal obligatorio que debe realizarse antes de cada despegue, repasando las acciones inmediatas ante parada de motor en pista, en el aire con pista remanente, a menos de 1.000 ft AGL y por encima de 1.000 ft AGL.',
    diagramImage: './sop-diagrams/bt_sop_briefing_emg_single_engine.png',
    diagramCaption: 'Blue Team SOP: Briefing de Emergencia Monomotor y 4 Escenarios',
    diagramNote: 'Pista remanente · <1000 ft AGL (±30-45°) · >1000 ft AGL (Viraje 180° al viento) · Mando de instructor en real',
    sections: [
      {
        title: '1. Caso 1 y Caso 2: Pista Disponible',
        color: 'rose',
        items: [
          { role: 'STEP', action: 'Caso 1 — Fallo durante la carrera en pista:', details: 'Cortar gases inmediatamente a IDLE, mantener control direccional con pedales, aplicar frenos firmes según necesidad, notificar a ATC despegue abortado y ejecutar Checklist de Emergencia.' },
          { role: 'STEP', action: 'Caso 2 — Fallo en el aire con pista remanente:', details: 'Cortar gases a IDLE, BAJAR EL MORRO de inmediato (mantener velocidad mínima 60 kt), configurar flaps según necesidad para detener la aeronave dentro de la pista, aterrizar, avisar a ATC y ejecutar Checklist.' }
        ]
      },
      {
        title: '2. Caso 3 y Caso 4: Sin Pista Remanente',
        color: 'amber',
        items: [
          { role: 'ALERT', action: 'Caso 3 — Fallo sin pista a MENOS de 1.000 ft AGL:', details: '¡NUNCA INTENTAR VOLVER A LA PISTA! Bajar morro de inmediato para velocidad de mejor planeo (65 kt sin flaps, 60 kt con flaps en C172; 73 kt en DA40). Seleccionar aterrizaje forzoso dentro de un cono de ±30° a 45° con respecto al morro, preferiblemente viento en cara. Declarar MAYDAY si el tiempo lo permite y asegurar corte de combustible/eléctrico antes del impacto.' },
          { role: 'STEP', action: 'Caso 4 — Fallo sin pista a MÁS de 1.000 ft AGL:', details: 'Bajar morro buscando mejor planeo (65 kt C172 / 73 kt DA40). Realizar viraje coordinado de 180° hacia la pista de despegue SIEMPRE virando en contra del viento. Comunicar MAYDAY a ATC, configurar para aterrizaje forzoso en pista o calle de rodaje y aplicar checklist.' },
          { role: 'NOTE', action: 'Mando en Emergencia Real:', details: 'Durante una emergencia real, el Instructor de Vuelo (PIC) asume inmediatamente los mandos (“I have controls”).' }
        ]
      }
    ]
  },
  {
    id: 'card-bt-despegue-luces-camara-accion',
    category: 'normal',
    title: 'Blue Team: Despegue, «Luces, Cámara y Acción» y Flujo 500 ft AGL',
    subtitle: 'Mnemónico de entrada en pista, callouts de despegue y transición After Take-off a 500 ft',
    manualRef: 'Blue Team SOP Rev 04 Cap 6.11',
    airplane: 'Blue Team Flight School (C172F / DA40D)',
    badges: ['Blue Team', 'Luces Cámara Acción', 'Take-off Flow', 'Flujo 500 ft'],
    goldenRules: [
      'Al recibir autorización para entrar en pista: ejecutar de memoria «Luces, Cámara y Acción».',
      'Pies abajo talones al suelo para evitar frenar involuntariamente al aplicar potencia.',
      'Comprobación mandatoria: 40 kt («Anemómetro vivo»), 55 kt («Instrumentos de motor en verde»), 60 kt («Rotate»).',
      'A 500 ft AGL: Flap 0°, BAJAR MORRO para Vy (75 kt C172 / 66 kt DA40), reducir potencia a 92% aprox, Fuel Pump OFF, Landing Light OFF.'
    ],
    summary: 'Procedimiento normalizado paso a paso para la alineación en pista («Luces, Cámara y Acción»), aceleración, callouts verbales de cabina y reconfiguración del avión al cruzar 500 ft AGL.',
    diagramImage: './sop-diagrams/bt_sop_takeoff_luces_camara_accion.png',
    diagramCaption: 'Blue Team SOP: Flujo de Despegue, Callouts y Mnemónico',
    diagramNote: 'Luces · Cámara · Acción · Callouts 40/55/60 kt · Transición y Flujo 500 ft AGL',
    sections: [
      {
        title: '1. Entrada en Pista: Mnemónico «Luces, Cámara, Acción»',
        color: 'sky',
        items: [
          { role: 'STEP', action: 'LUCES:', details: 'Taxi Light OFF, Landing Light ON (y luces estroboscópicas activadas).' },
          { role: 'STEP', action: 'CÁMARA:', details: 'Transpondedor verificado y ajustado en modo ALT con código asignado por ATC.' },
          { role: 'STEP', action: 'ACCIÓN:', details: 'Fuel Pump ON (o chequeada), sector de aproximación final y pista completamente libres de tráfico.' }
        ]
      },
      {
        title: '2. Carrera de Despegue y Callouts Verbales',
        color: 'emerald',
        items: [
          { role: 'STEP', action: 'Alineación y Pies:', details: 'Pies abajo con talones apoyados en el suelo para no presionar frenos de punta. Comprobar concordancia: "RWY Heading [XXX]".' },
          { role: 'STEP', action: 'Potencia al Máximo:', details: 'Aplicar potencia al 100% de forma progresiva. Comprobar al menos 94% de carga y 2.240 RPM. Cantar en voz alta: "Take-off power set".' },
          { role: 'STEP', action: 'Callout 40 KIAS:', callout: '"Airspeed alive"', details: 'Comprobar que la aguja del anemómetro se mueve y marca velocidad fiable.' },
          { role: 'STEP', action: 'Callout 55 KIAS:', callout: '"Instrumentos de motor en verde"', details: 'Comprobar presiones, temperaturas y parámetros FADEC/CED en arco verde.' },
          { role: 'STEP', action: 'Rotación:', callout: '"Rotate"', details: 'Al alcanzar Vr (60 kt C172 / 59 kt DA40), levantar suavemente la rueda de morro para adoptar actitud de Vx (65 kt C172 / 66 kt DA40).' }
        ]
      },
      {
        title: '3. Transición After Take-off al cruzar 500 ft AGL',
        color: 'indigo',
        items: [
          { role: 'STEP', action: 'Flaps a 0° (Up):', details: 'Retraer flap si se utilizó despegue con flap (C172 Flap 10° o DA40 Flap T/O).' },
          { role: 'STEP', action: 'Actitud de Morro y Potencia:', details: 'BAJAR MORRO para adoptar velocidad Vy (75 kt C172 / 66 kt DA40) y reducir potencia a régimen de ascenso (92% aprox).' },
          { role: 'STEP', action: 'Sistemas:', details: 'Electric Fuel Pump OFF, Landing Light OFF.' },
          { role: 'STEP', action: 'After Take-off Checklist:', details: 'Ejecutar After Take-off Checklist por lectura cuando la carga de trabajo lo permita.' }
        ]
      }
    ]
  },
  {
    id: 'card-bt-crucero-freda',
    category: 'normal',
    title: 'Blue Team: Régimen de Crucero y Chequeo Periódico FREDA',
    subtitle: 'Gestión de potencia (45%–55%), velocidades y regla nemotécnica FREDA cada 20 minutos',
    manualRef: 'Blue Team SOP Rev 04 Cap 6.13',
    airplane: 'Blue Team Flight School (C172F / DA40D)',
    badges: ['Blue Team', 'Crucero', 'FREDA', 'Gestión Motor'],
    goldenRules: [
      'Potencia normal en crucero: ajustar entre un 45% y un 55% de carga.',
      'C172 velocidades: Crucero bajo 80 KIAS, crucero medio 90 KIAS, crucero alto 100 KIAS.',
      'Ejecutar el chequeo nemotécnico FREDA periódicamente cada 20 minutos de vuelo nivelado.',
      'Discrepancia altimétrica en chequeo cruzado (Cross-check) no debe superar los 50 ft.'
    ],
    summary: 'Procedimiento de crucero para el monitoreo sistemático de la aeronave mediante el chequeo nemotécnico FREDA (Fuel, Radio, Engine, Directional, Altitude), asegurando el equilibrio de combustible y navegación precisa.',
    diagramImage: './sop-diagrams/bt_sop_cruise_freda.png',
    diagramCaption: 'Blue Team SOP: Mnemónico FREDA y Chequeos en Vuelo de Crucero',
    diagramNote: 'Fuel · Radio · Engine · Directional · Altitude cada 20 minutos',
    sections: [
      {
        title: '1. Desglose del Mnemónico FREDA',
        color: 'sky',
        items: [
          { role: 'STEP', action: 'F — FUEL (Combustible):', details: 'Verificar cantidad restante en cada depósito, comprobar equilibrio entre tanques (en C172 selector BOTH; en DA40 trasvase según proceda), estado de la bomba eléctrica de combustible y consumo estimado.' },
          { role: 'STEP', action: 'R — RADIO (Comunicaciones y Radionavegación):', details: 'Ajustar frecuencias activas y en espera, comprobar volumen y selector de audio; sintonizar e identificar ayudas a la navegación (VOR/DME).' },
          { role: 'STEP', action: 'E — ENGINE (Parámetros de Motor):', details: 'Monitorear instrumentos en arco verde: presión y temperatura de aceite, temperatura de refrigerante (coolant), temperatura de caja reductora (gearbox) y carga eléctrica del alternador/batería.' },
          { role: 'STEP', action: 'D — DIRECTIONAL (Girodireccional / Rumbos):', details: 'Nivelar planos perfectamente en vuelo recto y calar el girodireccional comparándolo con el rumbo indicado por la brújula magnética actual.' },
          { role: 'STEP', action: 'A — ALTITUDE (Altimetría y Nivel):', details: 'Comprobar calaje altimétrico más reciente (QNH de la estación más cercana o 1013.25 QNE si se vuela en nivel de vuelo). Realizar cross-check entre altímetros primario y secundario (máxima discrepancia permitida 50 ft).' }
        ]
      }
    ]
  },
  {
    id: 'card-bt-aproximacion-estabilizada',
    category: 'normal',
    title: 'Blue Team: Criterios de Aproximación Estabilizada y Técnicas de Viento',
    subtitle: 'Ventana de estabilización (1.000 ft IMC / 500 ft VMC), técnica Sideslip vs De-crab y viento cruzado',
    manualRef: 'Blue Team SOP Rev 04 Caps 4 & 6.16',
    airplane: 'Blue Team Flight School (C172F / DA40D)',
    badges: ['Blue Team', 'Aproximación Estabilizada', 'Sideslip', 'De-crab', 'Viento Cruzado'],
    goldenRules: [
      'Estabilización obligatoria: a 1.000 ft AGL en IMC y a 500 ft AGL en VMC.',
      'Criterios de velocidad: estrictamente entre Vref -5 kt y Vref +10 kt.',
      'Régimen de descenso no mayor a 1.000 ft/min. Planos nivelados y sin virajes por debajo de 300 ft AGL en visual.',
      'Técnicas de viento cruzado: Sideslip preferente en plano alto (C172); De-crab preferente en plano bajo (DA40).',
      'Desestabilización por debajo de la altura mínima: ¡Go-Around INMEDIATO y MANDATORIO!'
    ],
    summary: 'Estándar operacional para aproximaciones estabilizadas según Blue Team SOP, incluyendo límites de velocidad y descenso, política de frustrada obligatoria y diferenciación de técnicas de corrección de deriva según la arquitectura alar.',
    diagramImage: './sop-diagrams/bt_sop_stabilized_approach_vector.svg',
    diagramCaption: 'Blue Team SOP: Infografía Vectorial de Aproximación Estabilizada (C172F & DA40D)',
    diagramNote: '1000 ft IMC / 500 ft VMC · Vref -5/+10 kt · Max 1000 ft/min · Sideslip (C172) vs De-crab (DA40)',
    sections: [
      {
        title: '1. Requisitos Mandatorios de Estabilización',
        color: 'rose',
        items: [
          { role: 'ALERT', action: 'Altura de Estabilización:', details: '1.000 ft AGL en condiciones meteorológicas instrumentales (IMC) / 500 ft AGL en condiciones meteorológicas visuales (VMC).' },
          { role: 'STEP', action: 'Velocidad y Configuración:', details: 'Velocidad entre Vref -5 kt y Vref +10 kt; flaps y tren (si aplica) en configuración final de aterrizaje; lista Before Landing completada.' },
          { role: 'STEP', action: 'Régimen y Trayectoria:', details: 'Régimen de descenso máximo 1.000 ft/min; desviaciones en aproximación instrumental no superiores a 1 punto de localizador y senda de planeo.' },
          { role: 'ALERT', action: 'Aproximaciones Visuales:', details: 'Alas niveladas alineadas con el eje de pista antes de 300 ft AGL; prohibido realizar virajes por debajo de 300 ft AGL.' },
          { role: 'ALERT', action: 'Política de Go-Around:', details: 'Si en cualquier punto por debajo de 1.000 ft AGL el vuelo deja de estar estabilizado, la frustrada es MANDATORIA.' }
        ]
      },
      {
        title: '2. Técnicas de Aterrizaje con Viento Cruzado',
        color: 'amber',
        items: [
          { role: 'STEP', action: 'Técnica Sideslip (Resbale de ala baja):', details: 'Técnica preferente para aviones de plano alto (C172F). Se baja el plano hacia el viento para compensar la deriva y se aplica timón contrario para mantener el morro alineado con el eje de la pista. Nota: En C172 no se permite resbale con flap 40°.' },
          { role: 'STEP', action: 'Técnica De-crab (Alineación en la recogida):', details: 'Técnica preferente para aviones de plano bajo (DA40D) para evitar el riesgo de impacto de punta de plano contra la pista. Se mantiene el ángulo de corrección de deriva en final y, justo antes de la toma (en la recogida/flare), se aplica pedal para alinear el morro con la pista mientras se mantiene el avión nivelado.' }
        ]
      }
    ]
  },
  {
    id: 'card-bt-go-around',
    category: 'normal',
    title: 'Blue Team: Maniobra de Motor y al Aire «POTENCIA, MORRO Y FLAP»',
    subtitle: 'Secuencia de memoria para frustrada normal y escape ante aproximación no estabilizada o rebote',
    manualRef: 'Blue Team SOP Rev 04 Cap 6.17',
    airplane: 'Blue Team Flight School (C172F / DA40D)',
    badges: ['Blue Team', 'Go-Around', 'Potencia Morro Flap', 'Maniobra Normal'],
    goldenRules: [
      'El Go-Around es una maniobra normal que nunca requiere justificación.',
      'Secuencia de memoria inalterable: POTENCIA, MORRO y FLAP.',
      'Potencia: Full power compensando con pie derecho el par motor.',
      'Morro: Actitud de cabeceo para velocidad de mejor ángulo de ascenso Vx (65 kt).',
      'Flap: Retraer inicialmente solo UN punto (si flap 30° -> flap 20°; al confirmar ascenso positivo -> flap 10°).'
    ],
    summary: 'Procedimiento de frustrada normalizado por Blue Team Flight School. Destaca su carácter seguro y no sancionador ante cualquier situación de duda, pista ocupada, aproximación inestable o rebote en la toma.',
    diagramImage: './sop-diagrams/bt_sop_go_around.png',
    diagramCaption: 'Blue Team SOP: Secuencia de Go-Around (Potencia, Morro y Flap)',
    diagramNote: 'Potencia al Máximo · Actitud Morro Vx 65 kt · Retracción escalonada de Flaps',
    sections: [
      {
        title: '1. Secuencia de Memoria «POTENCIA, MORRO y FLAP»',
        color: 'rose',
        items: [
          { role: 'PF', action: '1. POTENCIA:', callout: '"GO-AROUND / MOTOR Y AL AIRE"', details: 'Aplicar potencia al máximo (100% / full power) de forma decidida. Pisar pedal derecho con firmeza para compensar el par motor y mantener rigurosamente el rumbo de pista.' },
          { role: 'PF', action: '2. MORRO:', details: 'Ajustar la actitud de cabeceo para buscar y mantener velocidad Vx (65 kt C172 / 66 kt DA40) y asegurar ascenso positivo.' },
          { role: 'PF', action: '3. FLAP (Retracción escalonada):', details: 'Según POH, subir únicamente UN punto de flap inicialmente (si estábamos con flap 30°, subir a flap 20°). Una vez confirmado régimen de ascenso positivo en el variómetro, retraer a flap 10°. A partir de este momento se continúa el ascenso como un despegue normal con flap 10°.' },
          { role: 'NOTE', action: 'Caso sin flaps previos:', details: 'Si durante el Go-Around no teníamos flaps seleccionados (aterrizaje sin flaps), ¡NO se seleccionan flaps 10°! Se ejecuta la maniobra limpia a velocidad Vx.' },
          { role: 'STEP', action: 'Aterrizaje con Rebote (Bounce Landing):', details: 'Si se produce un rebote en la recogida, no forzar la toma: ejecutar de inmediato la maniobra de Go-Around (POTENCIA, MORRO Y FLAP).' }
        ]
      }
    ]
  },
  {
    id: 'card-bt-maniobras-vfr-perdidas',
    category: 'normal',
    title: 'Blue Team: Maniobras Avanzadas VFR, Pérdidas y Vuelo Lento',
    subtitle: 'Requisitos de zona (3.000 ft AGL / barrido), 5 tipos de pérdidas y recuperación estándar',
    manualRef: 'Blue Team SOP Rev 04 Cap 9.9',
    airplane: 'Blue Team Flight School (C172F / DA40D)',
    badges: ['Blue Team', 'Pérdidas', 'Vuelo Lento', 'Maniobras VFR', 'SOP 9.9'],
    goldenRules: [
      '3 Requisitos previos mandatorios: Altitud mínima 3.000 ft AGL, virajes de barrido y Fuel Pump ON.',
      'Recuperación de cualquier pérdida: altura final nunca inferior a 1.500 ft AGL.',
      'Secuencia de recuperación: morro abajo aliviando presión -> planos nivelados por debajo del horizonte -> potencia suave.',
      'En pérdida con motor / viraje: centrar la bola estrictamente con pedal, jamás con alerones.',
      'En vuelo lento: volar a Vref para la configuración sin caer por debajo ni perder altitud.'
    ],
    summary: 'Guía detallada de entrenamiento de maniobras visuales avanzadas de Blue Team, cubriendo la preparación de cabina en zona de maniobras, los cinco perfiles de pérdidas reglamentarios y el ejercicio de vuelo lento.',
    diagramImage: './sop-diagrams/bt_sop_stalls_maneuvers.png',
    diagramCaption: 'Blue Team SOP: Maniobras de Pérdida, Vuelo Lento y Requisitos de Zona',
    diagramNote: 'Altitud 3000 ft AGL · Virajes de barrido · Recuperación >1500 ft AGL · Morro, Planos, Potencia',
    sections: [
      {
        title: '1. Requisitos Previos al Ingreso en Zona de Maniobras',
        color: 'sky',
        items: [
          { role: 'STEP', action: '1. Altitud de Seguridad:', details: 'Nunca realizar maniobras por debajo de 3.000 ft AGL. Chequear altitud antes de cada maniobra.' },
          { role: 'STEP', action: '2. Virajes de Barrido (Clearing Turns):', details: 'Realizar dos virajes de 90° o uno de 180° para verificar visualmente la ausencia de tráficos antes de iniciar el ejercicio.' },
          { role: 'STEP', action: '3. Bomba Eléctrica (Fuel Pump):', details: 'Electric Fuel Pump ON durante todas las maniobras de pérdidas.' }
        ]
      },
      {
        title: '2. Cinco Tipos de Pérdidas Entrenadas',
        color: 'rose',
        items: [
          { role: 'STEP', action: '1. Pérdida sin motor (Power-off stall):', details: 'Gases a IDLE, mantener altitud subiendo morro, alas niveladas. Al sonar avisador: reducir cabeceo aliviando presión del mando, por debajo del horizonte nivelar planos y aplicar potencia solo tras nivelar.' },
          { role: 'STEP', action: '2. Pérdida con motor (Power-on stall):', details: 'Potencia 20%, a 65 kt subir morro a 15° Nose Up, bola centrada con pedal. Al sonar la pérdida: morro abajo y gases a IDLE (para contrarrestar par motor); bajo el horizonte nivelar planos y meter potencia suavemente.' },
          { role: 'STEP', action: '3. Pérdida en viraje (Turning stall):', details: 'Potencia 20%, 15° cabeceo y 20° de alabeo. Al sonar avisador: morro abajo sin importar el alabeo; al estar por debajo del horizonte nivelar planos y aplicar potencia.' },
          { role: 'STEP', action: '4. Pérdida característica en recogida (Flare / Landing stall):', details: 'Simula pérdida durante la recogida en pista imaginaria a 3.500 ft AGL (límite inferior 3.000 ft AGL). Al sonar avisador: FULL POWER, mantener altitud y rumbo, y al llegar a 60 kt ejecutar Go-Around estándar.' },
          { role: 'STEP', action: '5. Pérdida acelerada / Virajes escarpados:', details: 'Reconocimiento de entrada en pérdida por incremento del factor de carga (g) a alta velocidad en virajes de gran inclinación.' }
        ]
      }
    ]
  },
  {
    id: 'card-bt-operativa-bases-gcts-gcxo',
    category: 'special',
    title: 'Blue Team: Procedimientos Locales Tenerife Sur (GCTS) y Norte (GCXO)',
    subtitle: 'Circuito visual GCTS, abandono a 500 ft mar, Zona Norte GCXO (3 NM costa), F22 Anaga y Hot Spots',
    manualRef: 'Blue Team SOP Rev 04 Cap 7 (7.6 & 7.7)',
    airplane: 'Blue Team Flight School (C172F / DA40D)',
    badges: ['Blue Team', 'GCTS', 'GCXO', 'Procedimientos Locales', 'Tenerife'],
    goldenRules: [
      'TFS (GCTS): Abandono de circuito de tráfico a 500 ft sobre el mar bordeando la costa hacia punto W o E.',
      'TFS llegada: En final de pista 07 cruzar umbral a altitud AIP; prever turbulencia por vientos de ladera.',
      'TFN (GCXO): Zona Norte delimitada desde Punto N hasta el Este del Parque Rural de Anaga, con separación mínima de 3 NM de la costa.',
      'TFN F22 Anaga: Respeto estricto del pasillo visual de salida/entrada F22 y vigilancia de Hot Spots en calles de rodaje.'
    ],
    summary: 'Instrucciones locales de operación para las bases de entrenamiento de Blue Team en el archipiélago canario: circuito de tráfico costero en Tenerife Sur y sectores de maniobra sobre el mar en Tenerife Norte.',
    diagramImage: './sop-diagrams/bt_sop_gcts_circuit.png',
    diagramCaption: 'Blue Team SOP: Procedimientos de Base Tenerife Sur (GCTS) y Tráfico Visual',
    diagramNote: 'Salida costera a 500 ft sobre el mar · Puntos visuales W/E · Zonas GCXO Anaga',
    sections: [
      {
        title: '1. Tenerife Sur (GCTS) — Operativa Local',
        color: 'sky',
        items: [
          { role: 'STEP', action: 'Salida y Abandono:', details: 'Seguir rigurosamente el AIP. En TFS siempre se abandona el circuito de tráfico descendiendo/manteniendo 500 ft sobre el mar bordeando la línea de costa hacia los puntos W o E para no interferir con las sendas IFR comerciales.' },
          { role: 'STEP', action: 'Circuito de Tráfico:', details: 'Tráfico visual VFR estándar al sur del campo sobre el mar. Reportes obligatorios en viento en cola, base y final.' }
        ]
      },
      {
        title: '2. Tenerife Norte (GCXO) — Zonas de Maniobra y Hot Spots',
        color: 'emerald',
        items: [
          { role: 'STEP', action: 'Delimitación de la Zona Norte:', details: 'Desde el punto visual N hasta el extremo este del Parque Rural de Anaga. Se establece obligatoriamente una zona de separación de al menos 3 NM mar adentro respecto a la línea de costa para seguridad orográfica y atenuación de ruidos.' },
          { role: 'STEP', action: 'Pasillo F22 y Parque de Anaga:', details: 'Cumplimiento exhaustivo de altitudes y puntos de notificación en el pasillo visual F22. Especial atención a la meteorología cambiante del norte de Tenerife (mar de nubes y vientos del noreste).' },
          { role: 'ALERT', action: 'Hot Spots en Rodaje:', details: 'Verificar minuciosamente el plano de aeródromo de GCXO en intersecciones conflictivas entre calles de rodaje y accesos a pista activa.' }
        ]
      }
    ]
  },
  {
    id: 'card-bt-callouts-estandar',
    category: 'normal',
    title: 'Blue Team: Callouts Oficiales de Cabina y Parámetros Operacionales',
    subtitle: 'Fraseología estándar de cabina obligatoria en voz alta durante todas las fases de vuelo',
    manualRef: 'Blue Team SOP Rev 04 Cap 11',
    airplane: 'Blue Team Flight School (C172F / DA40D)',
    badges: ['Blue Team', 'Callouts', 'Cockpit Communication', 'SOP 11'],
    goldenRules: [
      'Los callouts se dicen alto y claro ante procedimientos críticos o cambios de parámetros.',
      'Prevuelo y rodaje: «Clear prop», «Left side clear / Right side clear».',
      'Despegue: «RWY Heading [XXX]», «Take-off power set», «Airspeed alive» (40 kt), «Engine instruments on green» (55 kt), «Rotate» (60 kt).',
      'Ascenso e IFR: «Positive rate», «500 ft», «One thousand to level off», «Transition level / Standard set».',
      'Aproximación: «Localizer alive / Glideslope alive», «Flaps T/O / Flaps LDG», «Stable».'
    ],
    summary: 'Compendio de llamadas estándar de cabina de Blue Team Flight School diseñadas para promover la disciplina operativa de un solo piloto y la conciencia situacional compartida con el instructor.',
    diagramImage: './sop-diagrams/bt_sop_callouts_table_1.png',
    diagramCaption: 'Blue Team SOP: Tabla de Callouts Estandarizados de Cabina',
    diagramNote: 'Puesta en marcha · Rodaje · Despegue · Ascenso · Aproximación y Frustrada',
    sections: [
      {
        title: '1. Prevuelo, Rodaje y Despegue',
        color: 'sky',
        items: [
          { role: 'STEP', action: 'Antes de puesta en marcha:', callout: '"Clear prop"' },
          { role: 'STEP', action: 'En rodaje antes de virajes e intersecciones:', callout: '"Left side clear, Right side clear"' },
          { role: 'STEP', action: 'Listas de chequeo:', callout: '"[Name] checklist" / "[Name] checklist completed"' },
          { role: 'STEP', action: 'Alineación en pista:', callout: '"Runway heading [XXX]"' },
          { role: 'STEP', action: 'Al aplicar potencia de despegue:', callout: '"Take off power set"' },
          { role: 'STEP', action: 'Al alcanzar 40 KIAS:', callout: '"Airspeed alive"' },
          { role: 'STEP', action: 'Al alcanzar 55 KIAS:', callout: '"Engine instruments on green"' },
          { role: 'STEP', action: 'Al alcanzar Vr (60 kt C172 / 59 kt DA40):', callout: '"Rotate"' }
        ]
      },
      {
        title: '2. Ascenso, Crucero y Aproximación',
        color: 'emerald',
        items: [
          { role: 'STEP', action: 'Confirmación de ascenso positivo:', callout: '"Positive rate"' },
          { role: 'STEP', action: 'Al cruzar 500 ft AGL en ascenso:', callout: '"500 ft"' },
          { role: 'STEP', action: 'A 1.000 ft de la altitud o nivel asignado:', callout: '"One thousand to level off"' },
          { role: 'STEP', action: 'Paso por nivel / altitud de transición:', callout: '"Transition level, Standard set" / "Transition altitude, QNH [XXXX] set"' },
          { role: 'STEP', action: 'Captura de guiado instrumental:', callout: '"Localizer alive" / "Glideslope alive" / "Approaching final track"' },
          { role: 'STEP', action: 'Selección y confirmación de flaps:', callout: '"Flaps T/O" / "Flaps LDG"' }
        ]
      }
    ]
  }
];
