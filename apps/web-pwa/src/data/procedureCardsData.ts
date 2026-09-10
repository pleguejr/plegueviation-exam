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
  category: 'briefings' | 'normal' | 'emergency';
  title: string;
  subtitle: string;
  manualRef: string;
  airplane: string;
  badges: string[];
  memoryItems?: string[];
  goldenRules?: string[];
  summary: string;
  diagramNote?: string;
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
  // 3. PROCEDIMIENTOS DE EMERGENCIA Y ANORMALIDADES
  // =========================================================================
  {
    id: 'card-emg-flow-decision',
    category: 'emergency',
    title: 'Flow de Emergencias / Anormalidades & Toma de Decisiones',
    subtitle: 'Prioridad EICAS, MEANA, IMFLOCC y Reglas de Oro de Compañía',
    manualRef: 'MOB 3.0, 3.1 & QRH Rev19',
    airplane: 'Embraer 195-E2 / Binter Ops',
    badges: ['MEANA', 'IMFLOCC', 'EICAS', 'TELSI', 'Golden Rules'],
    goldenRules: [
      '¿Fuga de combustible sospechada (Fuel Leak)? -> ¡PROHIBIDO transferir combustible!',
      'Prioridad de Decisiones: 1° Dónde ir (Where to go), 2° Estimar peso de toma, 3° Calcular ePerf.',
      'Comunicaciones estructuradas: TELSI a tripulación de cabina, MAYDAY/PAN-PAN a ATC, PA a pasajeros y ACARS (EMR/INC) a Operaciones.'
    ],
    summary: 'Flujo completo de procesamiento de fallos técnicos desde el aviso en EICAS hasta la toma de decisión estratégica en vuelo y coordinación con todos los actores.',
    sections: [
      {
        title: '1. Reconocimiento y Prioridad de Mensajes EICAS',
        color: 'rose',
        items: [
          { role: 'STEP', action: '1° Abrir System Page en MFD sin tocar interruptores.' },
          { role: 'STEP', action: '2° Verificar la avería y hacer pre-evaluación con el otro piloto.' },
          { role: 'NOTE', action: 'Jerarquía de mensajes EICAS con Chevron (>) :', details: '1° Warning (Rojo con >) -> 2° Caution (Ámbar con >) -> 3° Advisory (Cyan con >).' },
          { role: 'NOTE', action: 'Jerarquía de mensajes sin Chevron:', details: '1° Fallos AC/DC -> 2° Fallos MAU -> 3° Fallos SPDA.' }
        ]
      },
      {
        title: '2. Secuencia de Ejecución MEANA (Checklists)',
        color: 'purple',
        items: [
          { role: 'STEP', action: '1° M - Memory Items:', details: 'Acciones inmediatas de memoria si el procedimiento lo requiere.' },
          { role: 'STEP', action: '2° E - Emergency Checklist:', details: 'Listas de emergencia con recuadro rojo/gris en QRH.' },
          { role: 'STEP', action: '3° A - Abnormal Checklist principal:', details: 'Lista anormal que ataca la raíz del fallo.' },
          { role: 'STEP', action: '4° N - Normal Checklist:', details: 'Listas normales correspondientes a la fase de vuelo.' },
          { role: 'STEP', action: '5° A - Abnormal Checklists restantes:', details: 'Listas secundarias y lectura de sistemas degradados.' }
        ]
      },
      {
        title: '3. Proceso de Toma de Decisiones IMFLOCC',
        color: 'indigo',
        items: [
          { role: 'STEP', action: 'I (Inoperative Items): Evaluación de sistemas perdidos y redundancias restantes.' },
          { role: 'STEP', action: 'M (Meteo Report): METAR/TAF y estado de pistas de alternativas.' },
          { role: 'STEP', action: 'F (Fuel Assessment): Autonomía y combustible remanente sobre destino vs reserva final.' },
          { role: 'STEP', action: 'L (Landing Performance): Cálculo ePerf con multiplicadores de fallo de QRH.' },
          { role: 'STEP', action: 'O (Options): Aeródromos disponibles (Prioridad: 1° Línea/Binter base, 2° Red Binter con mantenimiento, 3° Adecuado más cercano).' },
          { role: 'STEP', action: 'C (Choose an Option): Decisión firme del Comandante consensuada con la tripulación.' },
          { role: 'STEP', action: 'C (Communications): Cabin Crew (TELSI), ATC (Mayday/Pan-Pan), Pasajeros (PA), CCO Operaciones (ACARS FREE TEXT > EMR/INC).' }
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
  }
];
