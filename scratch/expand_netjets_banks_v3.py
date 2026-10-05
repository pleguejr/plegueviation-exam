import json
import os

BASE_DIR = r"C:\Users\plegu\My Drive\Antigravity\Plegueviation exam\banks\netjets-interview"

# 1. FUEL SCHEMES EASA (NJ-FUEL-018 a 025)
fuel_v3 = [
    {
        "id": "NJ-FUEL-018",
        "subject_id": "combustible-fuel-schemes",
        "learning_objective": "EASA Fuel Schemes - Combustible de Vaciado Rápido (Fuel Jettisoning)",
        "stem": "¿Bajo qué condiciones exige la normativa de certificación EASA CS-25 un sistema de vaciado rápido de combustible en vuelo (Fuel Jettisoning System) en aeronaves de transporte?",
        "options": [
            {
                "id": "A",
                "text": "Cuando el peso máximo al despegue (MTOW) supere significativamente el peso máximo al aterrizaje (MLW) y la aeronave no pueda cumplir los gradientes de ascenso de aproximación frustrada monomotor a su peso de despegue.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Es obligatorio en todos los aviones comerciales de más de 2 asientos sin excepción.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Solo se instala en aviones monomotores que operan sobre el agua.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Únicamente si la capacidad de combustible supera los 100.000 kg.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Sistema de Vaciado Rápido de Combustible (Fuel Jettison - CS 25.1001)\n* Se requiere sistema de **Fuel Jettison** si la aeronave no puede cumplir los requisitos de gradiente de ascenso de aproximación frustrada monomotor (Approach Climb $\\ge 2.1\\%$ en bimotores) desde el MTOW hasta el MLW.\n* Debe ser capaz de vaciar combustible suficiente en **15 minutos** para reducir el peso desde el MTOW hasta el peso de aterrizaje reglamentario.",
            "references": [
                "EASA CS-25.1001 Fuel jettisoning system",
                "EASA Easy Access Rules for Air Operations, CAT.POL.A.210"
            ]
        },
        "metadata": {"difficulty": 0.4}
    },
    {
        "id": "NJ-FUEL-019",
        "subject_id": "combustible-fuel-schemes",
        "learning_objective": "EASA Fuel Management - Punto de Congelación de Combustible Jet A-1",
        "stem": "¿Cuál es el punto de congelación estándar de referencia para el combustible de aviación JET A-1 y qué margen de temperatura sobre dicho punto exige EASA mantener en los depósitos en crucero?",
        "options": [
            {
                "id": "A",
                "text": "El punto de congelación estándar del JET A-1 es de -47°C; la temperatura del combustible en el depósito más frío debe mantenerse al menos 3°C por encima de este punto (es decir, a no menos de -44°C).",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "El punto de congelación del JET A-1 es de 0°C y debe mantenerse siempre por encima de +10°C con calentadores eléctricos.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "El punto de congelación es de -20°C y no existe requisito de margen de seguridad en vuelo.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "El JET A-1 no se congela bajo ninguna temperatura alcanzable en la atmósfera terrestre.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Temperatura Mínima de Combustible (Fuel Freezing Point)\n* **JET A-1**: Punto de congelación máximo de **-47°C** (JET A americano: -40°C).\n* **Margen de seguridad EASA/AFM**: La temperatura del combustible (Fuel Temp) en los depósitos principales debe mantenerse **al menos 3°C por encima del punto de congelación** (mínimo **-44°C** para Jet A-1).\n* **Mitigación en vuelo si baja la temperatura**: Descender a un nivel de vuelo más cálido, acelerar a mayor número Mach (aumento de calentamiento cinético TAT) o transferir combustible.",
            "references": [
                "EASA Easy Access Rules for Air Operations, CAT.OP.MPA.185",
                "ICAO Doc 9976 Flight Planning and Fuel Management Manual"
            ]
        },
        "metadata": {"difficulty": 0.3}
    },
    {
        "id": "NJ-FUEL-020",
        "subject_id": "combustible-fuel-schemes",
        "learning_objective": "EASA Fuel Schemes - Combustible Adicional Discrecional del Comandante (Extra Fuel)",
        "stem": "Bajo la normativa EASA CAT.OP.MPA.180, ¿cuál es la potestad y responsabilidad del Comandante respecto a la carga de combustible adicional (Extra Fuel / Discretionary Fuel)?",
        "options": [
            {
                "id": "A",
                "text": "El Comandante tiene la potestad final y no revocable de añadir combustible adicional si a su juicio las condiciones meteorológicas, demoras ATC previstas o contingencias de ruta lo aconsejan, dentro de las limitaciones de masa de la aeronave.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "El Comandante no puede añadir más combustible que el calculado estrictamente por el software de despacho de la compañía.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Cualquier carga de combustible extra requiere la autorización escrita y previa de la autoridad nacional de aviación civil.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Solo se puede añadir combustible extra si se desembarca el equipaje de todos los pasajeros.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Potestad del Comandante sobre el Combustible (CAT.OP.MPA.180)\n* El Comandante es el **responsable último de la seguridad del vuelo**.\n* La normativa EASA garantiza explícitamente su derecho a añadir **combustible discrecional (Extra Fuel)** considerando factores meteorológicos, tráfico, NOTAMs o condiciones de los aeródromos, siempre dentro de los límites estructurales de peso (MTOW / MZFW / MLW).",
            "references": [
                "EASA Easy Access Rules for Air Operations, CAT.OP.MPA.180 & CAT.GEN.MPA.105",
                "ICAO Annex 6 Part I, Chapter 4"
            ]
        },
        "metadata": {"difficulty": 0.2}
    },
    {
        "id": "NJ-FUEL-021",
        "subject_id": "combustible-fuel-schemes",
        "learning_objective": "EASA Fuel Management - Protección de Reserva Final en Destino",
        "stem": "Si tras aproximarse al destino la pista queda bloqueada por un incidente y la tripulación estima que tras volar al aeródromo alternativo aterrizará con una cantidad ligeramente inferior a la Reserva Final (FRF), ¿qué llamada radiotelefónica OBLIGATORIA debe transmitirse de inmediato al ATC?",
        "options": [
            {
                "id": "A",
                "text": "MAYDAY MAYDAY MAYDAY FUEL, declarando formalmente una situación de emergencia por combustible y solicitando prioridad absoluta para aterrizar de inmediato.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "PAN PAN PAN FUEL, solicitando espera prioritaria en el alternativo.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "MINIMUM FUEL, informando que no aceptará demoras adicionales.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Ninguna llamada de socorro es necesaria mientras los generadores eléctricos sigan operativos.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Regla de Oro de Emergencia de Combustible (EASA CAT.OP.MPA.185)\n* Si el cálculo de combustible utilizable utilizable a la toma indica que se aterrizará con **MENOS DE LA RESERVA FINAL (Final Reserve Fuel)**, es **OBLIGATORIO transmitir 'MAYDAY MAYDAY MAYDAY FUEL'**.\n* La llamada de 'MINIMUM FUEL' solo se utiliza cuando el remanente está ajustado pero se completará el vuelo con al menos la Reserva Final intacta.",
            "references": [
                "EASA Easy Access Rules for Air Operations, CAT.OP.MPA.185(c)",
                "ICAO Doc 4444 PANS-ATM Section 15.5.3"
            ]
        },
        "metadata": {"difficulty": 0.2}
    }
]

# 2. MÍNIMOS OPERACIONALES & LVO (NJ-MIN-014 a 021)
minimos_v3 = [
    {
        "id": "NJ-MIN-014",
        "subject_id": "minimos-operacionales-lvo",
        "learning_objective": "EASA LVO - Procedimientos de Baja Visibilidad en Tierra (LVP Ground Operations)",
        "stem": "¿Cuándo se activan oficialmente los Procedimientos de Baja Visibilidad (LVP - Low Visibility Procedures) en un aeródromo y qué salvaguardas especiales se aplican a los tráficos en tierra?",
        "options": [
            {
                "id": "A",
                "text": "Se activan típicamente cuando el RVR desciende por debajo de 550 m o el techo de nubes por debajo de 200 ft; se protegen las áreas críticas y sensibles del ILS/MLS (ILS Critical & Sensitive Areas) y se restringe el movimiento de vehículos y aeronaves a puntos de espera CAT II/III.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Se activan siempre que llueva con intensidad moderada independientemente de la visibilidad.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Solo aplican para vuelos no regulares de aviación general con aeronaves monomotor.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Se activan automáticamente a la puesta de sol en todos los aeropuertos civiles europeos.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Procedimientos de Baja Visibilidad (LVP - EASA SPA.LVO.105 / ICAO Doc 9476)\n* **Activación de LVP**: Cuando el RVR cae por debajo de **550 m** o techo $< 200\\text{ ft}$.\n* **Protección del haz ILS**: Se activan los puntos de espera retrasados de pista (**CAT II/III Holding Points**) para evitar que aviones en rodaje interfieran la señal del Localizador o Senda de Planeo.\n* Se activan barras de parada rojas (*Stop Bars*) y monitorización radar de superficie (SMR / A-SMGCS).",
            "references": [
                "EASA Easy Access Rules for Air Operations, SPA.LVO.105",
                "ICAO Doc 9476 Manual of Surface Movement Guidance and Control Systems (SMGCS)"
            ]
        },
        "metadata": {"difficulty": 0.3}
    },
    {
        "id": "NJ-MIN-015",
        "subject_id": "minimos-operacionales-lvo",
        "learning_objective": "EASA Operations Minima - Crédito Operacional por HUD y EVS (SPA.LVO.110)",
        "stem": "Bajo la normativa EASA Part-SPA.LVO.110, ¿qué ventajas operacionales o reducciones de mínimos de aterrizaje ('Crédito Operacional') puede obtener un operador que equipe Head-Up Display (HUD) y Sistemas de Visión Mejorada (EVS / EFVS)?",
        "options": [
            {
                "id": "A",
                "text": "Permite reducir la RVR requerida y la altura de decisión (DH), o descender por debajo de la DA/DH hasta 100 ft AAL utilizando la imagen EVS/infrarroja antes de requerir contacto visual natural con el entorno de pista.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Permite aterrizar sin combustible en los depósitos si la imagen EVS es de alta definición.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Elimina la necesidad de disponer de piloto automático en aproximaciones CAT III.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Autoriza el despegue con viento cruzado superior a 60 nudos.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Crédito Operativo con HUD / EVS (EASA SPA.LVO.110 & AMC1 SPA.LVO.110)\n* Las aeronaves ejecutivas modernas (e.g. Bombardier Global, Falcon, Citation Longitude) equipadas con **EVS/HUD** disfrutan de créditos operacionales:\n  * Permite continuar el descenso **por debajo de la DA/DH hasta 100 ft AAL** utilizando las referencias visuales infrarrojas proyectadas en el HUD.\n  * En o por debajo de 100 ft AAL se exige contacto visual directo natural con las luces de pista para el aterrizaje.",
            "references": [
                "EASA Easy Access Rules for Air Operations, SPA.LVO.110",
                "EASA Decision 2021/005/R (EFVS Operations)"
            ]
        },
        "metadata": {"difficulty": 0.5}
    },
    {
        "id": "NJ-MIN-016",
        "subject_id": "minimos-operacionales-lvo",
        "learning_objective": "EASA Operations Minima - Mínimos de Aproximación en Circuito (Visual Circling)",
        "stem": "Al realizar una aproximación en circuito (Visual Manoeuvring / Circling) bajo EASA CAT.OP.MPA.110, ¿cuál es la velocidad máxima y el radio de protección asociado para aeronaves de Categoría B y Categoría C?",
        "options": [
            {
                "id": "A",
                "text": "Categoría B: Velocidad máx. 120 kt (Radio de protección 2.66 NM) • Categoría C: Velocidad máx. 160 kt (Radio de protección 4.20 NM en PANS-OPS).",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Categoría B: 250 kt • Categoría C: 350 kt con radio de protección de 20 NM.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Categoría B: 90 kt • Categoría C: 100 kt con radio de 1 NM.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "La velocidad de circuito no tiene límite siempre que el tren de aterrizaje esté bloqueado abajo.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Aproximaciones en Circuito (Circling Minima - ICAO PANS-OPS / EASA CAT.OP.MPA.110)\n* **Categoría B**: $V_{\\text{at}} = 91\\text{ a }120\\text{ kt}$, velocidad máx. de circuito **120 kt**, radio de protección **2.66 NM** (margen sobre obstáculos 300 ft).\n* **Categoría C**: $V_{\\text{at}} = 121\\text{ a }140\\text{ kt}$, velocidad máx. de circuito **160 kt**, radio de protección **4.20 NM** (margen sobre obstáculos 400 ft).\n* Si un reactor Categoría B vuela el circuito a 135 kt, **debe aplicar obligatoriamente los mínimos más restrictivos de Categoría C**.",
            "references": [
                "EASA Easy Access Rules for Air Operations, CAT.OP.MPA.110 Table 4",
                "ICAO Doc 8168 PANS-OPS Volume I, Part I, Section 4, Chapter 7"
            ]
        },
        "metadata": {"difficulty": 0.4}
    }
]

# 3. FTL: TIEMPOS DE ACTIVIDAD & DESCANSO (NJ-FTL-013 a 020)
ftl_v3 = [
    {
        "id": "NJ-FTL-013",
        "subject_id": "tiempos-actividad-descanso-ftl",
        "learning_objective": "EASA FTL - Concepto y Estados de Aclimatación (Acclimatisation States)",
        "stem": "Bajo EASA ORO.FTL.105, ¿cuáles son los tres estados de aclimatación de un tripulante aérea respecto a las zonas horarias?",
        "options": [
            {
                "id": "A",
                "text": "Estado B (Aclimatado a la base local), Estado D (Aclimatado a la zona horaria del destino tras el tiempo de estancia reglamentario) y Estado X (Estado de aclimatación desconocido tras cruces rápidos de múltiples husos horarios).",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Estado 1 (Verano), Estado 2 (Invierno) y Estado 3 (Ecuatorial).",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Estado A (Despierto), Estado B (Dormido) y Estado C (En guardia).",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Estado Alpha (Vuelo nacional) y Estado Beta (Vuelo internacional).",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Estados de Aclimatación (ORO.FTL.105 & CS-FTL.1.205)\n* **B (Home Base)**: El tripulante está sincronizado con la hora de su base de origen.\n* **D (Destination)**: El tripulante se ha aclimatado a la hora del destino (requiere descansos específicos según número de zonas horarias cruzadas).\n* **X (Unknown)**: Tras cruzar múltiples zonas horarias sin tiempo de descanso suficiente para sincronizarse, el FDP máximo de las tablas se reduce significativamente por mayor riesgo de fatiga circadiana.",
            "references": [
                "EASA Easy Access Rules for Air Operations, ORO.FTL.105 Definitions",
                "CS-FTL.1.205 Flight Duty Period (FDP) Acclimatisation Tables"
            ]
        },
        "metadata": {"difficulty": 0.4}
    },
    {
        "id": "NJ-FTL-014",
        "subject_id": "tiempos-actividad-descanso-ftl",
        "learning_objective": "EASA FTL - Cómputo de Vuelos de Posicionamiento (Deadheading)",
        "stem": "Si un piloto de NetJets viaja como pasajero en un vuelo comercial para trasladarse desde su Gateway residencial hasta el avión donde comenzará su servicio, ¿cómo computa ese tiempo de posicionamiento (Deadheading) bajo EASA ORO.FTL.105?",
        "options": [
            {
                "id": "A",
                "text": "Computa al 100% como tiempo de servicio (Duty Time) y como período de servicio de vuelo (FDP) si precede inmediatamente a un sector de vuelo operativo sin mediar un descanso legal completo.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Computa como tiempo de descanso legal si el piloto viaja en asiento de primera clase o Business.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "No computa para ningún límite de actividad si el vuelo comercial dura menos de 3 horas.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Computa únicamente como tiempo de vuelo de la aeronave ejecutiva.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Posicionamiento (Deadheading - ORO.FTL.105 / ORO.FTL.215)\n* Todo tiempo empleado en posicionamiento por orden del operador **es TIEMPO DE SERVICIO (Duty Time)**.\n* Si el posicionamiento se realiza inmediatamente antes de un sector de vuelo como tripulación operativa, **dicho tiempo de posicionamiento forma parte integrante del FDP total de la jornada**.",
            "references": [
                "EASA Easy Access Rules for Air Operations, ORO.FTL.105 & ORO.FTL.215",
                "AMC1 ORO.FTL.215 Positioning"
            ]
        },
        "metadata": {"difficulty": 0.3}
    }
]

# 4. ESPACIO RVSM, PBN & OPERACIONES ESPECIALES (NJ-RVSM-012 a 019)
rvsm_v3 = [
    {
        "id": "NJ-RVSM-012",
        "subject_id": "espacio-rvsm-pbn-lvo",
        "learning_objective": "Oceanic & Remote Contingencies - Procedimiento de Contingencia en Vuelo",
        "stem": "Bajo los procedimientos de contingencia en espacio aéreo oceánico y remoto de la OACI (ICAO NAT Doc 007 / Doc 4444), si la aeronave sufre una despresurización o fallo de motor y no puede obtener autorización ATC inmediata, ¿cuál es la maniobra de salida de ruta reglamentaria?",
        "options": [
            {
                "id": "A",
                "text": "Virar al menos 30° a la izquierda o derecha para establecer un desplazamiento lateral de 5 NM respecto al eje de la pista organizada (NAT Track), encender todas las luces exteriores, emitir MAYDAY/PAN en 121.5 y descender por debajo de FL290 estableciendo un nivel intercalado de 500 ft.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Efectuar un viraje de 180° sobre la misma ruta exacta y descender a máxima velocidad sin avisar a nadie.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Mantener el nivel de vuelo actual y apagar los transpondedores para no saturar las pantallas del radar militar.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Aterrizar de inmediato en el agua antes de que se agote el combustible.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Procedimientos de Contingencia Oceánica (ICAO NAT Doc 007 / Doc 4444)\n* **Maniobra lateral**: Virar al menos **30°** a izquierda/derecha para adquirir un **offset lateral de 5 NM** respecto a la ruta.\n* **Desplazamiento vertical**: Una vez establecido a 5 NM, si no se puede mantener el nivel, descender por debajo de **FL290** (o mantenerse a un nivel desplazado en **500 ft** en crucero mientras se esté en espacio RVSM).\n* **Comunicaciones**: Transmitir llamada de socorro en 121.5 MHz y 123.45 MHz, responder Squawk 7700 y encender toda la iluminación exterior.",
            "references": [
                "ICAO Doc 4444 PANS-ATM Section 15.2.2 (Special Procedures for In-flight Contingencies in Oceanic Airspace)",
                "ICAO NAT Doc 007 North Atlantic Operations Manual"
            ]
        },
        "metadata": {"difficulty": 0.5}
    },
    {
        "id": "NJ-RVSM-013",
        "subject_id": "espacio-rvsm-pbn-lvo",
        "learning_objective": "PBN Approach Navigation - Niveles de Mínimos en Cartas RNP (LNAV, LNAV/VNAV, LPV)",
        "stem": "¿Cuál es la diferencia fundamental entre una aproximación RNP con mínimos 'LNAV/VNAV' y una con mínimos 'LPV' (Localizer Performance with Vertical Guidance)?",
        "options": [
            {
                "id": "A",
                "text": "LNAV/VNAV utiliza guiado vertical basado en altimetría barométrica (Baro-VNAV, sensible a la temperatura), mientras que LPV utiliza guiado vertical y lateral de alta precisión aumentado por satélite SBAS/EGNOS con comportamiento similar a un ILS hasta una DH de 200 ft.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "LNAV/VNAV solo se puede volar con pilotos automáticos mecánicos antiguos y LPV es solo para aviones de pistón.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "LPV no proporciona guiado vertical y obliga a realizar aproximaciones escalonadas.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "No existe ninguna diferencia técnica ni operacional entre ambas denominaciones.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Aproximaciones PBN: Baro-VNAV vs SBAS/LPV (EASA Part-SPA.PBN)\n* **LNAV/VNAV (Baro-VNAV)**: Guiado vertical generado por los sistemas de datos de aire de la aeronave a partir de la presión atmosférica barométrica. Requiere aplicar limitaciones y correcciones de temperatura fría.\n* **LPV (SBAS / EGNOS / WAAS)**: Guiado vertical geométrico aumentado por satélites geoestacionarios. No depende de la presión barométrica, no se ve afectado por el frío extremo y permite mínimos tan bajos como **200 ft DH** (equivalente a CAT I).",
            "references": [
                "EASA Easy Access Rules for Air Operations, SPA.PBN.100",
                "ICAO Doc 9613 PBN Manual, Volume II, Implementing RNP APCH"
            ]
        },
        "metadata": {"difficulty": 0.4}
    }
]

# 5. LICENCIAS, HABILITACIONES & AIRCREW (NJ-CREW-010 a 017)
crew_v3 = [
    {
        "id": "NJ-CREW-010",
        "subject_id": "licencias-habilitaciones-aircrew",
        "learning_objective": "Part-FCL - Validez y Revalidación de Habilitación de Tipo (Type Rating)",
        "stem": "Bajo EASA FCL.740, ¿cuál es el período de validez de una habilitación de tipo (Type Rating) multimotor y qué plazo previo existe para revalidarla sin perder la fecha de expiración original?",
        "options": [
            {
                "id": "A",
                "text": "Tiene una validez de 1 año (12 meses calendario); puede revalidarse mediante verificación de competencia en los 3 meses inmediatamente anteriores a la fecha de caducidad conservando la fecha de vencimiento original.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Tiene una validez indefinida siempre que el piloto vuele al menos 10 horas al año.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Tiene una validez de 5 años renovable mediante un examen teórico por internet.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Caduca cada 6 meses conjuntamente con el certificado médico Clase 1.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Validez y Revalidación de Type Rating (FCL.740)\n* **Validez**: **1 año (12 meses calendario)** desde la fecha de emisión o desde la fecha de expiración previa.\n* **Ventana de 3 meses**: Si la verificación de competencia (LPC) se realiza dentro de los **3 meses previos** a la caducidad, la nueva validez se extiende 1 año desde la fecha de caducidad original.",
            "references": [
                "EASA Easy Access Rules for Aircrew, FCL.740 Validity and renewal of class and type ratings",
                "Part-FCL Subpart H Class and Type Ratings"
            ]
        },
        "metadata": {"difficulty": 0.2}
    },
    {
        "id": "NJ-CREW-011",
        "subject_id": "licencias-habilitaciones-aircrew",
        "learning_objective": "Part-CAT Equipment - Máscaras de Oxígeno Quick-Donning (CAT.IDE.A.235)",
        "stem": "¿Cuál es el requisito de tiempo y manejo ergonómico exigido por EASA CAT.IDE.A.235 para las máscaras de oxígeno de colocación rápida (Quick-Donning Masks) de la tripulación de vuelo en aviones presurizados certificados para volar sobre FL250?",
        "options": [
            {
                "id": "A",
                "text": "Debe poder extraerse de su alojamiento y colocarse en la cabeza con una sola mano en menos de 5 segundos, suministrando oxígeno a demanda y asegurando comunicaciones de radio claras.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Debe colocarse con ayuda de un tripulante de cabina en un tiempo máximo de 2 minutos.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Solo se requiere que esté al alcance de la mano en menos de 30 segundos con ambas manos libres.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "No se exige máscara rápida si la aeronave dispone de paracaídas balístico.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Máscaras de Oxígeno Quick-Donning (CAT.IDE.A.235)\n* En caso de despresurización explosiva a FL410, el **Tiempo de Conciencia Útil (TUC - Time of Useful Consciousness)** es de apenas **15 a 30 segundos**.\n* Las máscaras **Quick-Donning** deben poder colocarse **con una sola mano en MENOS DE 5 SEGUNDOS** ajustando el arnés neumático automáticamente.",
            "references": [
                "EASA Easy Access Rules for Air Operations, CAT.IDE.A.235 Supplemental oxygen - pressurised aeroplanes",
                "EASA CS-25.1447 Oxygen equipment and supply"
            ]
        },
        "metadata": {"difficulty": 0.2}
    }
]

# 6. ESCENARIOS OPERACIONALES, MEL & CRM (NJ-CRM-013 a 020)
crm_v3 = [
    {
        "id": "NJ-CRM-013",
        "subject_id": "escenarios-netjets-despacho-crm",
        "learning_objective": "Ground De-icing - Tiempo Límite de Eficacia (Holdover Time / HOT)",
        "stem": "Durante operaciones invernales con precipitación de nieve moderada, la tripulación aplica fluido anticongelante Tipo IV. ¿Cuándo comienza formalmente el cómputo del Tiempo Límite de Eficacia (Holdover Time - HOT) y qué debe hacerse si el HOT expira antes de iniciar la carrera de despegue?",
        "options": [
            {
                "id": "A",
                "text": "El HOT comienza al inicio de la aplicación final del fluido anticongelante; si expira antes del despegue, PROHIBIDO despegar sin realizar una inspección de contaminación previa al despegue (Pre-takeoff Contamination Check) o volver a deshelar si la contaminación no puede verificarse con certeza visual o táctica.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "El HOT comienza al cerrar la puerta de cabina y no expira si los motores están en marcha.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Si el HOT expira, basta con encender la calefacción de pitots y acelerar a fondo.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "El tiempo de eficacia dura 24 horas consecutivas para cualquier tipo de fluido.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Concepto de Clean Aircraft y Holdover Time (EASA CAT.OP.MPA.250)\n* **Inicio del HOT**: En el momento exacto en que **comienza la aplicación final** del fluido anticongelante.\n* **Expiración del HOT**: Si expira antes del despegue y sigue precipitando nieve/aguanieve, la aeronave **NO puede despegar** bajo el *Clean Aircraft Concept* a menos que se realice una inspección exterior detallada o un nuevo ciclo completo de deshielo/antihielo.",
            "references": [
                "EASA Easy Access Rules for Air Operations, CAT.OP.MPA.250 Ice and other contaminants - ground procedures",
                "AEA / SAE De-icing / Anti-icing Holdover Time Guidelines"
            ]
        },
        "metadata": {"difficulty": 0.3}
    },
    {
        "id": "NJ-CRM-014",
        "subject_id": "escenarios-netjets-despacho-crm",
        "learning_objective": "Windshear Operations - Alerta de Windshear durante la Carrera de Despegue",
        "stem": "Durante la carrera de despegue en una pista con tormenta en las proximidades, la tripulación escucha la alerta sonora 'WINDSHEAR, WINDSHEAR' en cabina. ¿Cuál es el criterio de decisión y maniobra operativa según la velocidad alcanzada?",
        "options": [
            {
                "id": "A",
                "text": "Por debajo de V1: Abortar el despegue inmediatamente aplicando frenado máximo, reversas y spoilers. Por encima de V1 o en el aire: Continuar el despegue aplicando empuje máximo (TOGA) y ejecutar la maniobra de escape de windshear (Windshear Escape Maneuver) siguiendo el guiado del FD/HUD sin cambiar la configuración de flaps ni tren hasta salir de la cizalladura.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Abortar el despegue siempre a cualquier velocidad incluso superada la VR.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Subir los flaps inmediatamente en carrera para reducir la resistencia aerodinámica.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Reducir empuje a ralentí y pedir confirmación meteorológica por radio al ATC.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Maniobra de Escape de Cizalladura (Windshear Recovery Maneuver)\n* **Antes de V1**: RTO (Rejected Takeoff) con frenada máxima.\n* **Después de V1 / En vuelo**: TOGA thrust, rotar suavemente hacia el ángulo de cabezo de escape del FD (hasta el límite del stick shaker), **MANTENER CONFIGURACIÓN** (no retraer tren ni flaps durante la cizalladura para evitar pérdidas de sustentación transitorias).",
            "references": [
                "ICAO Doc 9817 Manual on Low-Level Wind Shear",
                "EASA CS-25 Windshear Flight Guidance Systems"
            ]
        },
        "metadata": {"difficulty": 0.4}
    },
    {
        "id": "NJ-CRM-015",
        "subject_id": "escenarios-netjets-despacho-crm",
        "learning_objective": "Mountain Aerodrome Operations - Altitud de Densidad y Factores de Pista en Samedan / Saint-Moritz",
        "stem": "Al planificar un despegue en un aeródromo de gran altitud como Samedan (LSZS, elevación 5.600 ft) con temperatura ambiente veraniega de +25°C, ¿qué efectos aerodinámicos y de performance críticos debe calcular la tripulación?",
        "options": [
            {
                "id": "A",
                "text": "La elevada altitud de densidad (Density Altitude) incrementa sustancialmente la velocidad verdadera (TAS) y la velocidad respecto al suelo (Groundspeed), aumentando enormemente la distancia de carrera de despegue y degradando los gradientes de ascenso de franqueamiento de obstáculos monomotor en el valle.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "El aire en altura frena la aeronave acortando la carrera de despegue a la mitad.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Los motores turbofan generan el doble de empuje en altura que a nivel del mar.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "La velocidad indicada (IAS) necesaria para la rotación aumenta en 100 nudos.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Operación en Aeródromos de Gran Altitud (High Density Altitude Operations)\n* A 5.600 ft con +25°C, la altitud de densidad puede superar los **8.500 ft**.\n* Para una misma velocidad indicada $V_{\\text{IAS}}$ de rotación, la **velocidad verdadera $V_{\\text{TAS}}$ y la velocidad sobre el suelo son mucho más altas**.\n* La carrera de despegue aumenta considerablemente, el frenado se vuelve más crítico (energía en frenos) y el gradiente de ascenso monomotor en el valle montañoso se reduce drásticamente, exigiendo cálculos rigurosos de *Single-Engine Escape Routes*.",
            "references": [
                "ICAO Doc 9137 Airport Services Manual",
                "Samedan Engadin Airport (LSZS) Flight Operational Guidelines"
            ]
        },
        "metadata": {"difficulty": 0.4}
    }
]

# Mapa de archivos a actualizar
updates = [
    ("combustible-fuel-schemes/netjets_easa_fuel_schemes.json", fuel_v3),
    ("minimos-operacionales-lvo/netjets_easa_operations_minima.json", minimos_v3),
    ("tiempos-actividad-descanso-ftl/netjets_easa_ftl_rest_duty.json", ftl_v3),
    ("espacio-rvsm-pbn-lvo/netjets_easa_rvsm_pbn_spec_ops.json", rvsm_v3),
    ("licencias-habilitaciones-aircrew/netjets_easa_aircrew_regulations.json", crew_v3),
    ("escenarios-netjets-despacho-crm/netjets_interview_scenarios_crm.json", crm_v3)
]

for rel_path, new_items in updates:
    full_path = os.path.join(BASE_DIR, rel_path)
    if os.path.exists(full_path):
        with open(full_path, "r", encoding="utf-8") as f:
            existing = json.load(f)
        
        # Filtrar duplicados por ID
        existing_ids = {item["id"] for item in existing}
        to_add = [item for item in new_items if item["id"] not in existing_ids]
        
        updated = existing + to_add
        with open(full_path, "w", encoding="utf-8") as f:
            json.dump(updated, f, indent=2, ensure_ascii=False)
        print(f"[OK] {rel_path}: {len(existing)} -> {len(updated)} preguntas (+{len(to_add)})")
    else:
        print(f"[WARN] No existe {full_path}")

print("\nExpansion script v3 completed successfully.")
