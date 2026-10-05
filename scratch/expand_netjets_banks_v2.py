import json
import os

BASE_DIR = r"C:\Users\plegu\My Drive\Antigravity\Plegueviation exam\banks\netjets-interview"

# 1. HISTORIA Y EVOLUCIÓN NETJETS (NJ-HIST-011 a 020)
historia_new = [
    {
        "id": "NJ-HIST-011",
        "subject_id": "historia-evolucion-netjets",
        "learning_objective": "NetJets Share Sizing - Equivalencias de Fracción y Horas Anuales",
        "stem": "¿Cuál es la equivalencia estándar entre el tamaño de la fracción de aeronave adquirida por un Propietario (Owner) en NetJets y el número de horas de vuelo anuales garantizadas?",
        "options": [
            {
                "id": "A",
                "text": "Una participación de 1/16 equivale a 50 horas anuales, 1/8 a 100 horas, 1/4 a 200 horas y 1/2 a 400 horas de vuelo por año.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Una participación de 1/16 equivale a 25 horas anuales, 1/8 a 50 horas y 1/4 a 100 horas de vuelo por año.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Las participaciones no se miden en horas fijas, sino en días de disponibilidad exclusivos por trimestre (10, 20 o 30 días).",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "El estándar único de entrada es la compra del 50% (1/2) con un derecho ilimitado de vuelos pagando solo combustible.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Estructura de Horas en la Propiedad Fraccional de NetJets\n* El modelo original de Richard Santulli se basa en un año operativo de **800 horas estándar** por avión.\n* **1/16 de cuota = 50 horas de vuelo anuales** (el umbral mínimo de acceso a propiedad fraccional).\n* **1/8 de cuota = 100 horas de vuelo anuales**.\n* **1/4 de cuota = 200 horas de vuelo anuales**.\n* **1/2 de cuota = 400 horas de vuelo anuales**.\n* Los propietarios pueden solicitar aeronaves de su tipo o hacer 'interchange' a modelos de mayor o menor tamaño según las necesidades del viaje.",
            "references": [
                "NetJets Fractional Ownership Program Structure & Guidelines",
                "NBAA Fractional Aircraft Ownership Compendium"
            ]
        },
        "metadata": {"difficulty": 0.2}
    },
    {
        "id": "NJ-HIST-012",
        "subject_id": "historia-evolucion-netjets",
        "learning_objective": "NetJets Jet Card Program - Adquisición de Marquis Jet (2010)",
        "stem": "¿Qué producto comercial adquirió NetJets en 2010 para permitir a clientes volar en la flota de NetJets en bloques de 25 horas sin necesidad de adquirir una cuota fraccional de propiedad?",
        "options": [
            {
                "id": "A",
                "text": "Marquis Jet Card (creada en 2001 por Jesse Itzler y Kenny Dichter), que comercializaba tarjetas prepago de 25 horas de vuelo utilizando exclusivamente la flota de NetJets.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "VistaJet Program, que integraba aviones Bombardier en una red de vuelos compartidos bajo demanda.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Wheels Up Membership, dedicada exclusivamente a reactores monomotor de corto alcance.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Flexjet Card Services, que competía en vuelos transatlánticos fraccionales.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Programa de Tarjetas de Vuelo (NetJets Jet Card / Marquis Jet)\n* En **2001**, Marquis Jet se asoció con NetJets para vender **tarjetas de 25 horas** de vuelo prepagadas que volaban en la flota de NetJets.\n* En **2010**, NetJets adquirió directamente **Marquis Jet**, integrando la tarjeta de 25 horas como su producto de entrada más popular para clientes corporativos y privados que no vuelan suficientes horas como para justificar una cuota fraccional (mínimo 50 h).",
            "references": [
                "NetJets Company Milestones & Acquisitions (2010 Archive)",
                "Marquis Jet Acquisition Report - Berkshire Hathaway"
            ]
        },
        "metadata": {"difficulty": 0.3}
    },
    {
        "id": "NJ-HIST-013",
        "subject_id": "historia-evolucion-netjets",
        "learning_objective": "NetJets Europe Fleet - Composición y Segmentación de Flota Europea",
        "stem": "¿Cuáles son las familias de aeronaves que componen el núcleo principal de la flota de NetJets Europe (NJE) para cubrir misiones de corto, medio y largo alcance?",
        "options": [
            {
                "id": "A",
                "text": "Embraer Phenom 300 (Light Jet), Cessna Citation Latitude / Longitude (Midsize / Super-Midsize), Bombardier Challenger 350 / 3500 (Super-Midsize) y Bombardier Global 5500 / 6000 (Large Cabin / Ultra-Long Range).",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Airbus A320 Corporate Jet y Boeing 737 BBJ exclusivamente para todas las rutas europeas.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Pilatus PC-12 y Beechcraft King Air turbohélices para el 80% de las rutas secundarias de Europa.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Flota 100% monomarca compuesta únicamente por reactores Dassault Falcon 7X y 8X.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Segmentación de Flota de NetJets Europe\n* **Light Jet**: Embraer Phenom 300 / 300E (líder indiscutible en volumen de misiones intra-europeas).\n* **Midsize / Super-Midsize**: Cessna Citation Latitude, Citation Longitude, Bombardier Challenger 350 / 3500.\n* **Large Cabin / Ultra-Long Range**: Bombardier Global 5500, Global 6000 y los nuevos Global 7500 / 8000 para vuelos intercontinentales sin escalas.",
            "references": [
                "NetJets Europe Fleet Overview & Specifications",
                "EASA AOC PT.AOC.002 Operations Specifications (NetJets Transportes Aéreos S.A.)"
            ]
        },
        "metadata": {"difficulty": 0.2}
    },
    {
        "id": "NJ-HIST-014",
        "subject_id": "historia-evolucion-netjets",
        "learning_objective": "NetJets Pilot Rostering - Modelo de Trabajo Tour / Roster en NetJets Europe",
        "stem": "¿Cuál es la estructura de programación laboral típica (Roster / Tour System) para los pilotos de NetJets Europe?",
        "options": [
            {
                "id": "A",
                "text": "Un sistema de períodos de servicio ('tours') típicamente de 6 días de servicio seguidos de 5 días libres (6 ON / 5 OFF) o variantes pactadas (7 ON / 7 OFF), volando por toda Europa con base de salida y retorno desde su Gateway designado.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Regreso diario obligatorio a la base principal de Lisboa tras cada jornada de 2 a 4 sectores.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Guardia de 24 horas continuas durante 30 días seguidos con descanso variable bajo aviso de 1 hora.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Programación mensual fija de lunes a viernes con fines de semana siempre libres.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Modelo Operativo de Tripulaciones (Gateway / Tour System)\n* A diferencia de una aerolínea tradicional con vuelos radiales (hub & spoke), NetJets Europe opera en una red **punto a punto flotante (floating fleet)**.\n* Los pilotos residen cerca de sus **Gateways** asignados en distintos países europeos. Al comenzar su tour (e.g. 6 ON / 5 OFF), la compañía los traslada en vuelo comercial o posicionado al avión donde inician el tour y pernoctan en hoteles de alta categoría por toda Europa hasta el último día, donde son repatriados a su Gateway.",
            "references": [
                "NetJets Europe Pilot Employment & Operations Guidelines",
                "EASA Part-ORO.FTL Tour Roster Provisions"
            ]
        },
        "metadata": {"difficulty": 0.3}
    },
    {
        "id": "NJ-HIST-015",
        "subject_id": "historia-evolucion-netjets",
        "learning_objective": "NetJets Culture - Concepto 'Owner' vs 'Passenger'",
        "stem": "¿Por qué en la cultura corporativa y operativa de NetJets se insiste en referirse a los clientes como 'Owners' (Propietarios) en lugar de 'pasajeros'?",
        "options": [
            {
                "id": "A",
                "text": "Porque son literalmente copropietarios de la aeronave en la que vuelan (o titulares de derechos de flota), lo que exige un trato de máxima exclusividad, respeto por su inversión, discreción absoluta y proactividad de servicio.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Porque la legislación tributaria portuguesa prohíbe el uso de la palabra pasajero en aeronaves con matrícula fraccional.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Para diferenciarse legalmente de las aerolíneas comerciales y evitar someterse a la normativa EASA Part-CAT.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Es una denominación que solo se utiliza con los miembros del consejo de administración de Berkshire Hathaway.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### El Concepto de 'Owner' en NetJets\n* En el modelo fraccional, el cliente ha adquirido una parte alícuota de la aeronave. Por lo tanto, cuando sube a bordo, **está subiendo a su propio avión**.\n* Este concepto define toda la cultura de la compañía: los pilotos no son solo operadores de vuelo, sino los custodios de la seguridad y los embajadores de confianza del Propietario.",
            "references": [
                "NetJets Corporate Philosophy & Flight Crew Handbook",
                "Warren Buffett Letters to Shareholders (Berkshire Hathaway Archive)"
            ]
        },
        "metadata": {"difficulty": 0.2}
    },
    {
        "id": "NJ-HIST-016",
        "subject_id": "historia-evolucion-netjets",
        "learning_objective": "NetJets Scale - Dimensiones Globales de la Flota y Operaciones",
        "stem": "¿Aproximadamente cuántas aeronaves componen la flota global de NetJets en la actualidad, consolidándola como la compañía de aviación privada más grande del mundo?",
        "options": [
            {
                "id": "A",
                "text": "Más de 900 a 1.000 aeronaves ejecutivas activas a nivel global (incluyendo NetJets US y NetJets Europe), operando en más de 5.000 aeropuertos en todo el mundo.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Alrededor de 150 aeronaves concentradas exclusivamente en el corredor de la costa este de Estados Unidos.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Unas 3.000 aeronaves, superando en número de unidades a las tres mayores aerolíneas comerciales combinadas.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Aproximadamente 50 reactores compartidos con aerolíneas regionales europeas.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Escala Global de NetJets\n* Con una flota global superior a las **900-1.000 aeronaves** y órdenes multimillonarias continuas con Textron (Cessna Citation), Embraer y Bombardier, NetJets opera la mayor flota privada del planeta con un promedio de más de 1.200 vuelos diarios a nivel mundial.",
            "references": [
                "NetJets Fact Sheet & Corporate Profile",
                "Berkshire Hathaway Annual Report (Aviation Segment)"
            ]
        },
        "metadata": {"difficulty": 0.3}
    },
    {
        "id": "NJ-HIST-017",
        "subject_id": "historia-evolucion-netjets",
        "learning_objective": "NetJets Safety Focus - Inversión en Seguridad y Simulación",
        "stem": "¿Cuál es el estándar de entrenamiento en simulador de vuelo (FFS) que aplica NetJets para sus tripulaciones, en colaboración principal con FlightSafety International?",
        "options": [
            {
                "id": "A",
                "text": "Entrenamiento recurrente semestral riguroso en simuladores de nivel D de última generación, superando ampliamente los mínimos legales exigidos, complementado con programas de entrenamiento avanzado de UPRT y aeródromos especiales.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Una sesión anual de 2 horas en simulador de base fija (FTD) para ahorrar costes de explotación.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Entrenamiento únicamente en avión real durante vuelos de posicionamiento sin pasajeros.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Entrenamiento por ordenador desde casa sin exigencia de simulador de movimiento completo.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Estándar de Entrenamiento y Seguridad NetJets\n* Tanto NetJets como **FlightSafety International** forman parte del ecosistema de **Berkshire Hathaway**.\n* NetJets invierte masivamente en centros de simuladores de Nivel D con programas específicos para aproximaciones difíciles (London City, Samedan, Innsbruck), recuperación de actitudes anormales (UPRT) y toma de decisiones CRM.",
            "references": [
                "NetJets Safety & Training Standards Whitepaper",
                "FlightSafety International Advanced Pilot Training Program"
            ]
        },
        "metadata": {"difficulty": 0.2}
    },
    {
        "id": "NJ-HIST-018",
        "subject_id": "historia-evolucion-netjets",
        "learning_objective": "NetJets Aircraft Interchange - Flexibilidad Operacional del Propietario",
        "stem": "¿En qué consiste el principio de 'Interchange' en el contrato de propiedad fraccional de NetJets?",
        "options": [
            {
                "id": "A",
                "text": "En el derecho contractual del Propietario de solicitar una aeronave de una categoría superior (Upgrade) o inferior (Downgrade) a la de su cuota de propiedad, ajustando la tasa horaria de cobro según el modelo volado.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "En la obligación del piloto de cambiar de avión en cada escala intermedia para equilibrar horas de vuelo.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "En el intercambio obligatorio de asientos entre pasajeros durante el vuelo de crucero.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "En la cesión temporal del certificado de operador aéreo a terceros durante los fines de semana.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Regla de Interchange en NetJets\n* Si un Propietario de un Phenom 300 necesita viajar con 10 personas a través del Atlántico, puede solicitar un **Bombardier Global 6000** mediante el sistema de **Interchange**, deduciendo horas con el factor de conversión aplicable.\n* Esto garantiza que el Propietario siempre dispone del avión perfecto para cada misión concreta.",
            "references": [
                "NetJets Owner Agreement - Interchange & Aircraft Upgrade Terms",
                "NBAA Fractional Aircraft Operations Manual"
            ]
        },
        "metadata": {"difficulty": 0.2}
    },
    {
        "id": "NJ-HIST-019",
        "subject_id": "historia-evolucion-netjets",
        "learning_objective": "NetJets Call Signs - Identificadores Oficiales OACI e IATA",
        "stem": "¿Cuáles son los identificadores oficiales de radiotelefonía OACI (Telephony / 3-Letter Code) e IATA para NetJets Europe?",
        "options": [
            {
                "id": "A",
                "text": "Indicativo de llamada (Call Sign): FRACTION • Código OACI de 3 letras: NJE • Código IATA: 1I.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Indicativo de llamada: NETJET • Código OACI: NET • Código IATA: NJ.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Indicativo de llamada: EXECUTIVE • Código OACI: EXJ • Código IATA: EJ.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Indicativo de llamada: LISBON JET • Código OACI: NTA • Código IATA: NT.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Identificadores Aeronáuticos de NetJets Europe\n* **Callsign OACI**: `FRACTION` (evoca la propiedad fraccional).\n* **Designador 3L OACI**: `NJE` (*NetJets Europe*).\n* **Código IATA**: `1I`.\n* (Nota: NetJets US utiliza el callsign `EXECJET` con designador OACI `EJA`).",
            "references": [
                "ICAO Doc 8585 - Designators for Aircraft Operating Agencies",
                "EASA Air Operations AOC Certificate PT.AOC.002"
            ]
        },
        "metadata": {"difficulty": 0.2}
    },
    {
        "id": "NJ-HIST-020",
        "subject_id": "historia-evolucion-netjets",
        "learning_objective": "NetJets Dispatch Operations - Centro de Control de Operaciones (OCC) en Lisboa",
        "stem": "¿Dónde se encuentra ubicado el Centro de Control de Operaciones (OCC - Operations Control Centre) centralizado de NetJets Europe y qué funciones críticas coordina?",
        "options": [
            {
                "id": "A",
                "text": "En Paço de Arcos (Lisboa, Portugal), coordinando en tiempo real el despacho técnico de vuelos, monitorización meteorológica, slots ATC (Eurocontrol), handling FBO, catering VIP y asignación de tripulaciones.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "En el Aeropuerto de Londres Heathrow, subcontratado a British Airways Dispatch.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "En la sede central de Berkshire Hathaway en Omaha, Nebraska, mediante control remoto transoceánico.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "En Ginebra, Suiza, gestionado exclusivamente por la autoridad de Eurocontrol.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Centro de Operaciones OCC de NetJets Europe\n* El cuartel general operativo de NetJets Europe está en **Paço de Arcos (Lisboa)**.\n* Cuenta con un equipo multidisciplinar 24/7 (Flight Planning, Meteorology, ATC slot managers, Crew Schedulers, Owner Services y Maintenance Control) que asiste permanentemente a las tripulaciones en vuelo por toda Europa.",
            "references": [
                "NetJets Europe Headquarters & Operations Control Profile",
                "EASA Part-ORO.GEN.110 Operator Infrastructure"
            ]
        },
        "metadata": {"difficulty": 0.2}
    }
]

# 2. FUEL SCHEMES EASA (NJ-FUEL-012 a 025)
fuel_new = [
    {
        "id": "NJ-FUEL-012",
        "subject_id": "combustible-fuel-schemes",
        "learning_objective": "EASA Fuel Policy - Combustible Adicional sin Alternativo de Destino",
        "stem": "Bajo la normativa EASA CAT.OP.MPA.181, si se despacha un vuelo IFR sin requerir aeródromo alternativo de destino (debido a dos pistas independientes y meteorología VMC garantizada), ¿qué combustible adicional de espera es obligatorio cargar?",
        "options": [
            {
                "id": "A",
                "text": "Combustible suficiente para volar durante al menos 15 minutos a velocidad de espera a 1.500 ft (450 m) sobre la elevación del aeródromo de destino en condiciones estándar.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Combustible adicional equivalente a 45 minutos de crucero con todos los motores operativos.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "No se requiere ningún combustible extra más allá del combustible de contingencia del 5%.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Combustible suficiente para ascender a nivel de crucero y retornar al aeródromo de origen.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Requisito de Combustible sin Alternativo de Destino (CAT.OP.MPA.181)\n* Cuando no se requiere aeródromo alternativo de destino según CAT.OP.MPA.180, el plan de vuelo debe incluir una cantidad de combustible adicional que permita a la aeronave **mantener la espera durante al menos 15 minutos a 1.500 ft (450 m)** sobre la elevación del aeródromo de destino en condiciones estándar, además de la Reserva Final.",
            "references": [
                "EASA Easy Access Rules for Air Operations, CAT.OP.MPA.181(b)(1)",
                "AMC1 CAT.OP.MPA.181 Basic fuel scheme with variations"
            ]
        },
        "metadata": {"difficulty": 0.4}
    },
    {
        "id": "NJ-FUEL-013",
        "subject_id": "combustible-fuel-schemes",
        "learning_objective": "EASA Fuel Policy - Criterios de Selección de un Aeródromo Alternativo en Ruta por Combustible (Fuel ERA)",
        "stem": "Bajo el esquema básico de combustible EASA con reducción de contingencia al 3% mediante aeródromo alternativo en ruta (ERA), ¿qué condiciones geográficas de ubicación debe cumplir el aeródromo Fuel ERA seleccionado?",
        "options": [
            {
                "id": "A",
                "text": "Debe estar ubicado dentro de un círculo cuyo radio sea igual al 20% de la distancia total del plan de vuelo, con centro en la ruta a una distancia del destino igual al 25% de la distancia total o al 20% más 50 NM (lo que sea menor).",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Debe encontrarse estrictamente a mitad exacta de la ruta (a 50% de la distancia total).",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Puede ser cualquier aeródromo con pista de más de 3.000 metros sin importar su posición respecto a la ruta.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Debe estar ubicado a no más de 30 minutos de vuelo a velocidad de crucero monomotor desde el origen.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Criterios de Selección de En-Route Alternate (Fuel ERA - AMC1 CAT.OP.MPA.181)\n* Para beneficiarse de la reducción de contingencia al **3%** (o contingencia estadística):\n* El aeródromo ERA debe situarse dentro de una envolvente geométrica definida por EASA: dentro de un círculo con radio del **20% de la distancia total**, centrado en la ruta nominal a una distancia de destino del **25% de la distancia total de la ruta** (o 20% + 50 NM, lo que resulte menor).",
            "references": [
                "EASA Easy Access Rules for Air Operations, AMC1 CAT.OP.MPA.181",
                "AMC8 CAT.OP.MPA.182 En-route alternate aerodrome selection"
            ]
        },
        "metadata": {"difficulty": 0.6}
    },
    {
        "id": "NJ-FUEL-014",
        "subject_id": "combustible-fuel-schemes",
        "learning_objective": "EASA Fuel Policy - Procedimiento de Re-planificación en Vuelo (RCF)",
        "stem": "¿En qué consiste el procedimiento de combustible por Re-planificación en Vuelo (Reduced Contingency Fuel / RCF) bajo la normativa EASA CAT.OP.MPA.181?",
        "options": [
            {
                "id": "A",
                "text": "En planificar el vuelo hacia un destino intermedio comercial con reserva estándar, pero llevando combustible suficiente para que al llegar a un Punto de Decisión predeterminado (Decision Point), si el remanente es adecuado, se pueda re-despachar en vuelo hacia el destino final con contingencia calculada solo desde dicho punto.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "En eliminar por completo el combustible de reserva final y sustituirlo por combustible de rodaje.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "En apagar un motor en crucero para extender la autonomía de vuelo en un 20%.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "En transferir combustible entre depósitos de alas para compensar el viento en cola.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Procedimiento RCF (Reduced Contingency Fuel / Re-planning in Flight)\n* El procedimiento **RCF** permite optimizar la carga útil reduciendo la masa de combustible al despegue.\n* Se define un **Destino 1 (intermedio)** y un **Punto de Decisión (DP)** en ruta. Al cruzar el DP, si el combustible a bordo es igual o superior al combustible requerido desde el DP hasta el **Destino 2 (final)** más la contingencia desde el DP, el Comandante continúa hacia el Destino 2; de lo contrario, se desvía al Destino 1.",
            "references": [
                "EASA Easy Access Rules for Air Operations, CAT.OP.MPA.181 & AMC2 CAT.OP.MPA.181",
                "ICAO Annex 6 Part I, Attachment C (In-flight Re-planning)"
            ]
        },
        "metadata": {"difficulty": 0.5}
    },
    {
        "id": "NJ-FUEL-015",
        "subject_id": "combustible-fuel-schemes",
        "learning_objective": "EASA Fuel Management - Comprobaciones Periódicas de Combustible en Vuelo (In-Flight Fuel Checks)",
        "stem": "Bajo EASA CAT.OP.MPA.185, ¿con qué periodicidad mínima y en qué puntos debe la tripulación de vuelo registrar y verificar el consumo y remanente de combustible?",
        "options": [
            {
                "id": "A",
                "text": "A intervalos regulares no superiores a 60 minutos (típicamente en cada waypoint principal de navegación) y siempre en el punto de inicio del descenso (Top of Descent / TOD).",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Únicamente una vez durante el vuelo al alcanzar la mitad de la distancia total.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Solo cuando se encienda la luz ámbar de aviso de bajo nivel de combustible en cabina.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Cada 15 minutos en aeronaves bimotores y cada 4 horas en aeronaves cuatrimotores.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Monitorización de Combustible en Vuelo (CAT.OP.MPA.185)\n* El Comandante debe asegurarse de que se comprueba y registra el combustible remanente utilizable a **intervalos regulares (máximo cada hora / waypoints de OFP)** para:\n  1. Comparar el combustible real consumido con el previsto en el plan operacional.\n  2. Verificar que el combustible utilizable restante es suficiente para completar el vuelo hasta el destino y alternativo con la Reserva Final intacta.\n  3. Detectar precozmente cualquier fuga de combustible imprevista (*Fuel Leak*).",
            "references": [
                "EASA Easy Access Rules for Air Operations, CAT.OP.MPA.185(a)",
                "AMC1 CAT.OP.MPA.185 In-flight fuel management"
            ]
        },
        "metadata": {"difficulty": 0.3}
    },
    {
        "id": "NJ-FUEL-016",
        "subject_id": "combustible-fuel-schemes",
        "learning_objective": "EASA Fuel Emergency - Acciones ante Detección de Fuga de Combustible en Vuelo (Fuel Leak)",
        "stem": "¿Cuál es la primera acción operativa y de gestión de vuelo obligatoria si la tripulación confirma una fuga activa de combustible (Fuel Leak) proveniente de un motor o depósito de ala?",
        "options": [
            {
                "id": "A",
                "text": "PROHIBIDO realizar trasvase cruzado (Crossfeed) hacia el lado de la fuga para evitar alimentar la fuga con el combustible sano, aplicar la checklist de emergencia del QRH y aterrizar en el aeródromo adecuado más cercano.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Abrir inmediatamente la válvula de crossfeed para vaciar los depósitos equilibradamente hacia ambos motores.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Continuar hacia el destino final acelerando a velocidad máxima de crucero (VMO) para llegar antes de que se agote el combustible.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Declarar 'MINIMUM FUEL' y solicitar mantener la espera a nivel óptimo para verificar el ritmo de consumo.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Procedimiento ante Fuga de Combustible (Fuel Leak)\n* **Regla de oro de seguridad**: ¡NUNCA realizar Crossfeed hacia un motor o zona con fuga sospechosa! Si se abre el crossfeed incorrectamente, se transferirá y perderá también el combustible del ala sana.\n* Se debe identificar el origen, aislar el depósito/motor según QRH, declarar **MAYDAY (emergencia)** y proceder al **aeródromo adecuado más cercano (Land at nearest suitable airport)**.",
            "references": [
                "QRH Section: Fuel System Abnormal / Fuel Leak Procedure",
                "ICAO Doc 9976 Flight Planning and Fuel Management Manual"
            ]
        },
        "metadata": {"difficulty": 0.4}
    },
    {
        "id": "NJ-FUEL-017",
        "subject_id": "combustible-fuel-schemes",
        "learning_objective": "EASA Fuel Scheme - Desvío al Alternativo y Decisión de Frustrada",
        "stem": "Al aproximarse al aeródromo de destino, la tripulación observa que el combustible remanente se aproxima al 'Divert Fuel' (Alternate Fuel + Final Reserve). ¿Cuándo es OBLIGATORIO iniciar el desvío hacia el aeródromo alternativo?",
        "options": [
            {
                "id": "A",
                "text": "Antes de que el combustible utilizable a bordo caiga por debajo de la suma de Alternate Fuel + Final Reserve Fuel, de modo que el avión aterrice en el alternativo con al menos la Reserva Final intacta.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Solo cuando los motores comiencen a experimentar oscilaciones de presión por bajo nivel en colectores.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Una vez consumida la mitad de la reserva final en la espera del destino.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "A criterio exclusivo del ATC cuando no haya disponibilidad de vectores de aproximación.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Punto de Desvío Obligatorio (Divert Decision)\n* El combustible de desvío (**Divert Fuel**) es la cantidad exacta necesaria para ejecutar una aproximación frustrada en destino, volar al alternativo y realizar la aproximación y aterrizaje, **llegando a la toma con la Reserva Final (FRF) íntegra**.\n* Por tanto, la decisión de desvío debe tomarse **antes de comprometer los mínimos del Alternate Fuel**.",
            "references": [
                "EASA Easy Access Rules for Air Operations, CAT.OP.MPA.185",
                "AMC1 CAT.OP.MPA.185 In-flight fuel management"
            ]
        },
        "metadata": {"difficulty": 0.3}
    }
]

# 3. MÍNIMOS OPERACIONALES & LVO (NJ-MIN-010 a 020)
minimos_new = [
    {
        "id": "NJ-MIN-010",
        "subject_id": "minimos-operacionales-lvo",
        "learning_objective": "Cold Temperature Altimeter Corrections - Corrección de Altitudes por Baja Temperatura",
        "stem": "Bajo EASA CAT.OP.MPA.145 y procedimientos OACI PANS-OPS, cuando la temperatura ambiente en el aeródromo es muy fría (generalmente $\le 0^\circ\\text{C}$), ¿por qué es vital aplicar correcciones altimétricas y a qué altitudes del procedimiento se debe aplicar?",
        "options": [
            {
                "id": "A",
                "text": "Porque el altímetro barométrico sobre-estima la altitud real (el avión vuela más bajo de lo que indica el instrumento); la tripulación debe corregir la DA/MDA, altitudes de paso en el FAF/IF, circuito y la MSA.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Porque el aire frío hace que el avión vuele mucho más alto de lo que indica el altímetro, arriesgando salir del espacio aéreo controlado.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "La corrección solo se aplica en crucero por encima de FL290 y nunca en la aproximación final.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "El altímetro barométrico compensa automáticamente la temperatura sin intervención de la tripulación en ningún avión civil.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Corrección por Bajas Temperaturas (Cold Temp Correction)\n* **Regla mnemónica clásica**: *'High to Low or Hot to Cold, Look out Below'*.\n* El aire frío es más denso; los planos isobáricos se comprimen hacia el suelo. A una altitud indicada fija, la **altitud verdadera (True Altitude) es MENOR que la indicada**.\n* La tripulación debe sumar los valores tabulados de la tabla OACI de corrección a la DA/DH, MDA/MDH, altitudes mínimas de sector (MSA) y altitudes de cruce de fijos de aproximación (FAF/IF).",
            "references": [
                "EASA Easy Access Rules for Air Operations, CAT.OP.MPA.145",
                "ICAO Doc 8168 PANS-OPS Vol I, Part III, Section 1, Chapter 4 (Cold Temperature Corrections)"
            ]
        },
        "metadata": {"difficulty": 0.4}
    },
    {
        "id": "NJ-MIN-011",
        "subject_id": "minimos-operacionales-lvo",
        "learning_objective": "Cold Temperature Corrections - Comunicación con ATC",
        "stem": "Cuando la tripulación aplica correcciones de altitud por baja temperatura en una llegada o aproximación por instrumentos, ¿cómo debe coordinarse con el Control de Tránsito Aéreo (ATC)?",
        "options": [
            {
                "id": "A",
                "text": "La tripulación debe notificar al ATC las altitudes corregidas que pretende volar en los tramos de aproximación inicial e intermedia (y en la MSA si aplica), pero la DA/MDA se corrige en cabina sin necesidad de renegociar mínimos con ATC.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "El piloto nunca debe informar al ATC de ninguna corrección aplicada.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "El ATC ajusta los altímetros de todos los aviones transmitiendo un QNH falso más alto.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Se prohíbe volar aproximaciones IFR si la temperatura es inferior a 0°C.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Notificación al ATC de Altitudes Corregidas\n* Las altitudes asignadas por ATC o los mínimos de sector publicados garantizan franqueamiento de obstáculos en base a altitud verdadera.\n* Si el piloto corrige una altitud de tramo (e.g. cruzar FAF a 3.300 ft en vez de 3.000 ft publicados debido al frío extremo), **debe notificar al ATC**: *'Due temperature, climbing/crossing at 3,300 ft'* para mantener la separación reglamentaria con otros tráficos.",
            "references": [
                "ICAO Doc 4444 PANS-ATM Chapter 12",
                "EASA AMC1 CAT.OP.MPA.145 Altimeter corrections"
            ]
        },
        "metadata": {"difficulty": 0.5}
    },
    {
        "id": "NJ-MIN-012",
        "subject_id": "minimos-operacionales-lvo",
        "learning_objective": "EASA Approach Minima - Conversión de Visibilidad Meteorológica a RVR (CMV)",
        "stem": "¿Cuándo está permitido utilizar el concepto de Visibilidad Meteorológica Convertida (CMV - Converted Meteorological Visibility) para evaluar los mínimos de aproximación según EASA CAT.OP.MPA.110?",
        "options": [
            {
                "id": "A",
                "text": "Solo para aproximaciones 2D (o Tipo A) cuando no se dispone de informe oficial de RVR; se calcula multiplicando la visibilidad meteorológica por un factor (1.5 de día con luces de alta intensidad / 2.0 de noche con luces de alta intensidad). No se puede usar para despegues ni para CAT II/III.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Para calcular el RVR de despegue en pistas sin luces en cualquier aeropuerto internacional.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Únicamente en aproximaciones CAT III autoland cuando falla el transmisómetro central.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Siempre que la visibilidad meteorológica reportada en el METAR sea inferior a 50 metros.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Conversión de Visibilidad a RVR (CMV - Table CAT.OP.MPA.110)\n* **Factores de conversión (VIS a CMV)**:\n  * Con sistema de luces de aproximación de alta intensidad (HIRL/HIALS):\n    * Día: $\\text{VIS} \\times 1.5$\n    * Noche: $\\text{VIS} \\times 2.0$\n  * Con luces de baja intensidad o sin luces:\n    * Día: $\\text{VIS} \\times 1.0$\n    * Noche: $\\text{VIS} \\times 1.5$\n* **Prohibiciones**: PROHIBIDO usar CMV para despegue (LVTO), aproximaciones CAT II/III o cuando exista RVR instrumental disponible.",
            "references": [
                "EASA Easy Access Rules for Air Operations, CAT.OP.MPA.110",
                "AMC1 CAT.OP.MPA.110 Aerodrome operating minima - Table 1 (Conversion of reported meteorological visibility to RVR/CMV)"
            ]
        },
        "metadata": {"difficulty": 0.5}
    },
    {
        "id": "NJ-MIN-013",
        "subject_id": "minimos-operacionales-lvo",
        "learning_objective": "EASA Operations Minima - RVR Requerido en Pista con Múltiples Puntos de Medición",
        "stem": "En una aproximación de precisión CAT II o CAT III con tres mediciones de RVR publicadas (Touchdown, Midpoint y Stopend), ¿cuál de ellas es estrictamente controlante (mandatory) para la regla de Approach Ban a 1.000 ft?",
        "options": [
            {
                "id": "A",
                "text": "El RVR de la zona de toma de contacto (Touchdown RVR / TDZ) es siempre el valor determinante y obligatorio. Si se reportan Midpoint y Stopend, deben cumplir los mínimos de desaceleración y rodaje aplicables.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "El valor de Stopend es el único que decide si se puede iniciar la aproximación.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Se hace la media aritmética de los tres transmisómetros y ese valor medio debe superar 100 metros.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Ninguno de los tres es obligatorio si la tripulación dispone de radar meteorológico operativo.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Transmisómetros de RVR Controlantes (EASA SPA.LVO.100 / CAT.OP.MPA.305)\n* **Touchdown RVR (TDZ)**: Siempre es el **valor controlante principal** para autorizar la continuación de la aproximación bajo la regla de Approach Ban.\n* **Midpoint RVR**: Es controlante para garantizar la fase de deceleración (habitualmente mínimo 125 m en CAT II y 75 m en CAT III).\n* **Stopend RVR**: Relevante para la fase final de frenado y salida de pista.",
            "references": [
                "EASA Easy Access Rules for Air Operations, SPA.LVO.100",
                "AMC1 SPA.LVO.100 Low visibility operations - RVR assessment"
            ]
        },
        "metadata": {"difficulty": 0.4}
    }
]

# 4. FTL: TIEMPOS DE ACTIVIDAD & DESCANSO (NJ-FTL-010 a 020)
ftl_new = [
    {
        "id": "NJ-FTL-010",
        "subject_id": "tiempos-actividad-descanso-ftl",
        "learning_objective": "EASA FTL - Descanso Fraccionado en Tierra (Split Duty)",
        "stem": "Bajo EASA ORO.FTL.220, ¿cuáles son los requisitos para aplicar una extensión de FDP mediante servicio fraccionado (Split Duty) con descanso intermedio en tierra?",
        "options": [
            {
                "id": "A",
                "text": "La pausa en tierra debe ser de al menos 3 horas continuas en un alojamiento adecuado (o descanso silencioso para pausas menores); el FDP máximo permitido puede incrementarse en un 50% de la duración de la pausa consecutiva.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Cualquier escala de 30 minutos en la terminal de pasajeros permite extender la jornada en 4 horas.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "El Split Duty solo puede aplicarse si la tripulación permanece sentada en la cabina de pilotaje con puertas cerradas.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Solo está permitido para vuelos diurnos con tripulación de cuatro pilotos en aviones de fuselaje ancho.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Servicio Fraccionado (Split Duty - ORO.FTL.220)\n* **Pausa mínima**: $\\ge 3\\text{ horas}$ continuas sin tareas operativas asignadas.\n* **Alojamiento (Accommodation)**: Habitación privada, tranquila, insonorizada y con cama cuando la pausa sea $\\ge 3\\text{ h}$.\n* **Extensión de FDP**: El FDP máximo de las tablas se incrementa en una cantidad típicamente equivalente al **50% del tiempo de descanso real** disfrutado en tierra.",
            "references": [
                "EASA Easy Access Rules for Air Operations, ORO.FTL.220 Split Duty",
                "CS-FTL.1.220 Split Duty Accommodation Requirements"
            ]
        },
        "metadata": {"difficulty": 0.5}
    },
    {
        "id": "NJ-FTL-011",
        "subject_id": "tiempos-actividad-descanso-ftl",
        "learning_objective": "EASA FTL - Reducción de Descanso Mínimo por Discreción del Comandante",
        "stem": "Bajo circunstancias operativas imprevistas en escala fuera de base, ¿en cuánto puede el Comandante reducir el período de descanso previo antes del siguiente vuelo según EASA ORO.FTL.205(f)?",
        "options": [
            {
                "id": "A",
                "text": "Puede reducirse en un máximo de 2 horas, pero nunca por debajo de 10 horas mínimas de descanso (garantizando al menos 8 horas de oportunidad ininterrumpida de sueño en el alojamiento).",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Puede reducirse hasta un mínimo absoluto de 4 horas de descanso si todos los tripulantes firman su conformidad.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "No se puede reducir el descanso en ningún caso bajo normativa europea; la reducción solo aplica a vuelos de carga militar.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Puede eliminarse el descanso siempre que se compense con 48 horas libres a la vuelta a base.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Discreción del Comandante sobre Descanso (Commander Discretion on Rest - ORO.FTL.205(f))\n* En caso de circunstancias excepcionales e imprevistas después de iniciarse el servicio:\n  * El Comandante, tras consultar a todos los tripulantes sobre su nivel de fatiga, puede **reducir el descanso en un máximo de 2 horas**, **NUNCA bajando de 10 horas totales** (ni comprometiendo las 8 horas de sueño en la cama).\n  * Debe reportarse formalmente al operador y a la autoridad competente (ANAC/EASA).",
            "references": [
                "EASA Easy Access Rules for Air Operations, ORO.FTL.205(f)",
                "AMC1 ORO.FTL.205(f) Commander's Discretion"
            ]
        },
        "metadata": {"difficulty": 0.4}
    },
    {
        "id": "NJ-FTL-012",
        "subject_id": "tiempos-actividad-descanso-ftl",
        "learning_objective": "EASA FTL - Programaciones con Horarios Perturbadores (Disruptive Schedules)",
        "stem": "¿Qué clasifica EASA ORO.FTL.105 como 'Horario Perturbador' (Disruptive Schedule) para una tripulación aérea?",
        "options": [
            {
                "id": "A",
                "text": "Aquel servicio que incluye un inicio temprano (Early Type: inicio entre 05:00 y 05:59 en base local) o una finalización tardía (Late Type: finalización entre 23:00 y 01:59 en base local), o servicios que invaden la ventana circadiana de mínimo rendimiento (WOCL).",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Cualquier vuelo en el que viaje un pasajero en estado de embriaguez o agresividad.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Vuelos que sufren retrasos por huelgas de controladores de más de 45 minutos.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Operar exclusivamente en días festivos nacionales o fines de semana.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Horarios Perturbadores (Disruptive Schedules - ORO.FTL.105)\n* **Early Type**: Comienza entre 05:00 y 05:59 hora local.\n* **Late Type**: Finaliza entre 23:00 y 01:59 hora local.\n* **Night Duty**: Cualquier servicio que abarque cualquier porción entre 02:00 y 04:59.\n* La normativa exige descansos de recuperación específicos cuando se encadenan múltiples servicios perturbadores consecutivos para evitar la desincronización circadiana.",
            "references": [
                "EASA Easy Access Rules for Air Operations, ORO.FTL.105 Definitions",
                "CS-FTL.1.235 Rest Requirements for Disruptive Schedules"
            ]
        },
        "metadata": {"difficulty": 0.3}
    }
]

# 5. ESPACIO RVSM, PBN & OPERACIONES ESPECIALES (NJ-RVSM-009 a 020)
rvsm_new = [
    {
        "id": "NJ-RVSM-009",
        "subject_id": "espacio-rvsm-pbn-lvo",
        "learning_objective": "RVSM Altimetry - Tolerancia Máxima entre Altímetros Primarios en Crucero",
        "stem": "Durante el vuelo en espacio aéreo RVSM (FL290–FL410), ¿cuál es la diferencia máxima admisible entre las lecturas de los dos altímetros primarios principales de la tripulación?",
        "options": [
            {
                "id": "A",
                "text": "200 ft (60 m). Si la discrepancia supera los 200 ft, el sistema pierde la cualificación RVSM y la tripulación debe notificar de inmediato al ATC.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "50 ft (15 m) en cualquier altitud de vuelo.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "500 ft siempre que el piloto automático esté acoplado al canal del copiloto.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "No existe límite numérico si el radaraltímetro indica menos de 40.000 ft.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Tolerancias Altimétricas en Crucero RVSM (SPA.RVSM.110)\n* **En tierra (Before Takeoff)**: Máximo $\\pm 75\\text{ ft}$ respecto a la elevación conocida del campo y $\\pm 50\\text{ ft}$ entre ambos altímetros primarios.\n* **En vuelo de crucero (RVSM Level)**: La discrepancia máxima permitida entre el altímetro del Comandante (PF) y del Copiloto (PM) es de **200 ft**.\n* Si supera los 200 ft, se considera fallo altimétrico y se debe informar al ATC: *'UNABLE RVSM DUE TO EQUIPMENT'*.",
            "references": [
                "EASA Easy Access Rules for Air Operations, SPA.RVSM.110",
                "ICAO Doc 9574 Manual on Implementation of a 300 m (1,000 ft) Vertical Separation Minimum"
            ]
        },
        "metadata": {"difficulty": 0.3}
    },
    {
        "id": "NJ-RVSM-010",
        "subject_id": "espacio-rvsm-pbn-lvo",
        "learning_objective": "PBN Navigation - Especificaciones RNP 1 vs RNP 4 vs RNP APCH",
        "stem": "¿Qué significa la designación 'RNP 1' en una carta de salida normalizada por instrumentos (SID) o llegada (STAR) bajo navegación basada en prestaciones (PBN)?",
        "options": [
            {
                "id": "A",
                "text": "Que el sistema de navegación a bordo debe mantener la posición de la aeronave dentro de un margen de $\\pm 1\\text{ NM}$ del eje nominal durante al menos el 95% del tiempo de vuelo, disponiendo de monitorización y alerta de integridad a bordo (On-Board Performance Monitoring and Alerting).",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Que solo se permite el uso de 1 único receptor GPS sin soporte inercial.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Que la aeronave debe volar a no más de 100 nudos durante toda la maniobra.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Que la precisión requerida es de 0.1 NM exclusivamente en el tramo de aproximación final.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Navegación Basada en Prestaciones (PBN - ICAO Doc 9613 / EASA Part-SPA.PBN)\n* **RNP (Required Navigation Performance)** se diferencia de RNAV en que **RNP EXIGE monitorización y alerta de contención a bordo** (*On-Board Performance Monitoring & Alerting*).\n* **RNP 1**: Precisión de $\\pm 1.0\\text{ NM}$ durante el 95% del tiempo. Estándar para SIDs y STARs en entornos terminales concurridos.",
            "references": [
                "ICAO Doc 9613 PBN Manual, Volume II, Part C",
                "EASA Easy Access Rules for Air Operations, SPA.PBN.100"
            ]
        },
        "metadata": {"difficulty": 0.4}
    },
    {
        "id": "NJ-RVSM-011",
        "subject_id": "espacio-rvsm-pbn-lvo",
        "learning_objective": "TCAS II Version 7.1 - Comportamiento ante un Aviso de Resolución Invertido (Reversal RA)",
        "stem": "¿Cuál es el tiempo de respuesta máximo exigido a la tripulación de vuelo para reaccionar ante un aviso de resolución de tráfico TCAS II (Resolution Advisory / RA) inicial y ante un aviso de reversión (Reversal RA)?",
        "options": [
            {
                "id": "A",
                "text": "5 segundos para iniciar la maniobra ante un RA inicial, y 2.5 segundos de reacción ante un aviso de reversión (Reversal RA: e.g. 'CLIMB, CLIMB NOW' tras un previo 'DESCEND').",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "15 segundos ante un RA inicial y 10 segundos ante una reversión.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "30 segundos para permitir consultar primero la instrucción con el controlador de tránsito aéreo.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "La respuesta debe ser automática mediante desconexión forzada de los mandos en menos de 1 segundo.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Tiempos de Reacción ante TCAS II v7.1 (ICAO Doc 9863 / SERA.11014)\n* **RA Inicial**: Desconectar AP/FD y seguir el guiado vertical en un máximo de **5 segundos**, aplicando aproximadamente $0.25\\text{ g}$.\n* **Reversal / Modified RA**: Reaccionar en un máximo de **2.5 segundos** aplicando hasta $0.35\\text{ g}$.\n* **Regla suprema**: El TCAS RA prevalece SIEMPRE sobre cualquier instrucción del ATC.",
            "references": [
                "EASA AMC1 CAT.OP.MPA.290 TCAS resolution advisories",
                "ICAO Doc 9863 Airborne Collision Avoidance System (ACAS) Manual"
            ]
        },
        "metadata": {"difficulty": 0.3}
    }
]

# 6. LICENCIAS, HABILITACIONES & AIRCREW (NJ-CREW-007 a 020)
crew_new = [
    {
        "id": "NJ-CREW-007",
        "subject_id": "licencias-habilitaciones-aircrew",
        "learning_objective": "Part-FCL - Experiencia Reciente de Noche (Night Recency)",
        "stem": "Bajo EASA FCL.060(b)(2), ¿cuál es el requisito de experiencia reciente para que un piloto pueda actuar como piloto al mando en transporte aéreo comercial de noche con pasajeros?",
        "options": [
            {
                "id": "A",
                "text": "Haber realizado al menos 1 despegue, 1 aproximación y 1 aterrizaje de noche en los 90 días precedentes (o mantener una habilitación de vuelo por instrumentos IR válida).",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Haber acumulado al menos 50 horas de vuelo nocturno en los últimos 30 días.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Realizar un chequeo en simulador con un examinador cada 30 días naturales.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "No se exige experiencia reciente nocturna si el piloto tiene más de 40 años.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Recencia Nocturna (FCL.060(b)(2))\n* Para operar con pasajeros de noche como PIC:\n  * Debe haber efectuado al menos **1 despegue, aproximación y toma de noche en los últimos 90 días**, O BIEN disponer de una **habilitación de instrumentos (IR) en vigor**.",
            "references": [
                "EASA Easy Access Rules for Aircrew, FCL.060(b)(2) Recent experience",
                "Part-FCL Subpart A General Requirements"
            ]
        },
        "metadata": {"difficulty": 0.3}
    },
    {
        "id": "NJ-CREW-008",
        "subject_id": "licencias-habilitaciones-aircrew",
        "learning_objective": "Part-ORO.FC - Entrenamiento UPRT (Upset Prevention and Recovery Training)",
        "stem": "¿Con qué periodicidad y bajo qué condiciones exige EASA ORO.FC.220/230 el entrenamiento periódico en Prevención y Recuperación de Actitudes Anormales (UPRT) para pilotos en transporte aéreo comercial?",
        "options": [
            {
                "id": "A",
                "text": "Debe realizarse periódicamente dentro del ciclo de entrenamiento trienal del operador en un simulador de vuelo FFS calificado para UPRT, integrando escenarios de pérdida de sustentación, guiñada adversa, turbulencia de estela y desorientación espacial.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Solo se realiza una vez en la vida al obtener la licencia inicial CPL.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Solo es obligatorio para pilotos de aviones monomotores de pistón.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Se sustituye por un examen teórico de 10 preguntas por internet cada 5 años.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Entrenamiento Recurrente en UPRT (EASA ORO.FC.220/230)\n* EASA introdujo requisitos obligatorios de **UPRT (Upset Prevention & Recovery Training)** para mitigar el riesgo de pérdida de control en vuelo (LOC-I, la principal causa histórica de accidentes fatales).\n* Se practica semestralmente en el ciclo de entrenamiento recurrente de simulador FFS nivel D.",
            "references": [
                "EASA Easy Access Rules for Aircrew, FCL.745.A & ORO.FC.220/230",
                "EASA ED Decision 2019/005/R (UPRT Implementation Guidelines)"
            ]
        },
        "metadata": {"difficulty": 0.3}
    },
    {
        "id": "NJ-CREW-009",
        "subject_id": "licencias-habilitaciones-aircrew",
        "learning_objective": "Part-MED - Requisitos Psicofísicos y Declaración de Medicamentos",
        "stem": "Bajo la normativa médica EASA Part-MED.A.020, ¿cuál es la responsabilidad legal de un piloto titular de un certificado médico Clase 1 si inicia un nuevo tratamiento farmacológico prescrito?",
        "options": [
            {
                "id": "A",
                "text": "Debe abstenerse de ejercer las atribuciones de su licencia y consultar previamente a un Médico Examinador Aéreo (AME) o al Centro Médico Aeronáutico (AeMC) para confirmar que el fármaco no produce efectos secundarios que comprometan la seguridad de vuelo.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Puede seguir volando con normalidad sin informar a nadie siempre que la dosis sea baja.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Debe transferir la responsabilidad médica a su copiloto durante el despegue y aterrizaje.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Solo debe notificarlo si el medicamento es un antibiótico oral de venta libre.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Disminución de la Aptitud Médica (MED.A.020)\n* Los pilotos tienen la **obligación legal estricta** de no ejercer los privilegios de su licencia cuando sean conscientes de cualquier disminución de su aptitud médica o al iniciar cualquier tratamiento médico/farmacológico que pueda interferir con el rendimiento seguro.",
            "references": [
                "EASA Easy Access Rules for Aircrew, MED.A.020 Decrease in medical fitness",
                "AMC1 MED.A.020 Medication and flying"
            ]
        },
        "metadata": {"difficulty": 0.2}
    }
]

# 7. ESCENARIOS OPERACIONALES, MEL & CRM (NJ-CRM-009 a 024)
crm_new = [
    {
        "id": "NJ-CRM-009",
        "subject_id": "escenarios-netjets-despacho-crm",
        "learning_objective": "NetJets VIP Owner Management - Manejo de Presión por Meteorología Severa",
        "stem": "Escenario de Entrevista NetJets: Está al mando de un Phenom 300 listo para salir de Niza hacia Samedan (aeródromo de montaña visual). El Propietario VIP insiste en que tiene una reunión crucial y exige despegar de inmediato. Sin embargo, el pronóstico en Samedan indica techo de nubes cubierto a 500 ft y nevada moderada (muy por debajo de mínimos visuales VMC). ¿Cuál es la respuesta y actuación esperada por el panel de NetJets?",
        "options": [
            {
                "id": "A",
                "text": "Mantener una postura de seguridad inquebrantable (Safety is Non-Negotiable), explicar al Propietario con empatía y profesionalismo que las condiciones violan los límites de seguridad y la ley, y presentar de forma proactiva una solución coordinada con Dispatch (e.g. volar a Zúrich / Milán y coordinar transfer en limusina privada VIP a Samedan).",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Despegar de inmediato para complacer al cliente y realizar una aproximación rasante bajo las nubes a ver si se ve la pista.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Negarse a hablar con el cliente y encerrarse en la cabina de pilotaje hasta que el handling desembarque el equipaje.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Permitir que el cliente firme un documento de exención de responsabilidad civil para volar bajo mínimos.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Liderazgo y 'Owner Mindset' en NetJets\n* Este es el escenario clásico número uno en las entrevistas de NetJets Europe.\n* **Evaluación buscada**:\n  1. **Seguridad**: No se compromete jamás bajo ninguna presión comercial o de cliente.\n  2. **Servicio y Empatía**: El cliente VIP paga por excelencia. No se le dice solo 'no'; se le explica que se protege su vida y la de su familia.\n  3. **Solución Proactiva**: Ofrecer de inmediato una alternativa de viaje sin fisuras (vuelo a alternativo IFR + traslado VIP terrestre).",
            "references": [
                "NetJets Command & First Officer Assessment Behavioral Standards",
                "ICAO Doc 9992 Manual on Threat and Error Management (TEM)"
            ]
        },
        "metadata": {"difficulty": 0.2}
    },
    {
        "id": "NJ-CRM-010",
        "subject_id": "escenarios-netjets-despacho-crm",
        "learning_objective": "Dangerous Goods - Baterías de Litio y Dispositivos Electrónicos en Cabina (PED)",
        "stem": "Durante el vuelo en crucero, un dispositivo electrónico portátil (PED / iPad) de un pasajero en cabina sufre un desbocamiento térmico (Thermal Runaway) emitiendo humo denso y llamas. Según los procedimientos EASA y de aviación ejecutiva, ¿cuál es la técnica de extinción y enfriamiento correcta?",
        "options": [
            {
                "id": "A",
                "text": "Extinguir las llamas iniciales con extintor Halon / Halotron / Agua, y seguidamente verter agua u otro líquido no alcohólico en gran cantidad directamente sobre el dispositivo para enfriar las celdas y evitar la reignición por propagación térmica.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Cubrir el dispositivo con mantas y almohadas de pluma para sofocar el fuego.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Recoger inmediatamente el dispositivo al rojo vivo con las manos desnudas y arrojarlo al inodoro del avión.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Usar únicamente extintor de polvo químico seco y no aplicar jamás agua bajo ninguna circunstancia.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Procedimiento ante Embalamiento Térmico de Baterías de Litio (ICAO Doc 9481 / EASA SIB 2017-01)\n* **Paso 1**: Sofocar las llamas con extintor adecuado de cabina (Halon).\n* **Paso 2**: ¡**ENFRIAR CON AGUA**! Las baterías de litio generan su propio oxígeno al quemarse químicamente. La única forma de detener la reacción en cadena de las celdas adyacentes es verter agua fría abundante.\n* **Paso 3**: Dejar el dispositivo sumergido o en bolsa de contención térmica ignífuga (*Fire Containment Bag*).",
            "references": [
                "ICAO Doc 9481 Emergency Response Guidance for Aircraft Incidents Involving Dangerous Goods",
                "EASA Safety Information Bulletin SIB 2017-01 (Lithium Batteries in Cabin)"
            ]
        },
        "metadata": {"difficulty": 0.3}
    },
    {
        "id": "NJ-CRM-011",
        "subject_id": "escenarios-netjets-despacho-crm",
        "learning_objective": "Steep Approach Operations - Aproximación Empinada en London City (EGLC)",
        "stem": "¿Cuáles son los requisitos operacionales y de aeronave exigidos por EASA y la CAA británica para autorizar operaciones de aproximación empinada (Steep Approach $\ge 4.5^\circ$, como los 5.5° de London City EGLC)?",
        "options": [
            {
                "id": "A",
                "text": "Certificación específica del fabricante en el AFM que apruebe la senda empinada (modos especiales de spoilers/speedbrakes), aprobación operacional en el AOC del operador y cualificación de la tripulación en simulador FFS nivel D con entrenamiento de aeródromo especial.",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Cualquier aeronave bimotor puede realizarla siempre que el viento en cola no supere 25 nudos.",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Solo requiere que el piloto al mando tenga más de 5.000 horas totales de vuelo en cualquier avión.",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Únicamente se permite con helicópteros y aviones turbohélice de menos de 9 asientos.",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Aproximaciones Empinadas (Steep Approach Operations - EASA CAT.POL.A.245)\n* London City (EGLC) tiene una senda de planeo de **5.5°** (frente a los 3.0° convencionales) debido a las restricciones de ruido y obstáculos urbanos.\n* **Exigencias**:\n  1. Aprobación en AFM del fabricante (e.g. modo 'Steep Approach' en Citation Latitude, Falcon, Phenom).\n  2. Aprobación SPA en el AOC.\n  3. Entrenamiento y chequeo formal en simulador para las tripulaciones.",
            "references": [
                "EASA Easy Access Rules for Air Operations, CAT.POL.A.245 & AMC1 CAT.POL.A.245",
                "London City Airport (EGLC) Aerodrome Operations Manual"
            ]
        },
        "metadata": {"difficulty": 0.4}
    },
    {
        "id": "NJ-CRM-012",
        "subject_id": "escenarios-netjets-despacho-crm",
        "learning_objective": "CRM Decision Models - Modelo FOR-DEC / DODAR en Cabina",
        "stem": "¿Qué significan las siglas del modelo estructurado de toma de decisiones aeronáuticas 'FOR-DEC' ampliamente utilizado en la aviación ejecutiva europea y en NetJets?",
        "options": [
            {
                "id": "A",
                "text": "Facts (Hechos) -> Options (Opciones) -> Risks (Riesgos) -> Decision (Decisión) -> Execution (Ejecución) -> Check/Control (Comprobación y Seguimiento).",
                "is_correct": True
            },
            {
                "id": "B",
                "text": "Fuel (Combustible) -> Oxygen (Oxígeno) -> Route (Ruta) -> Descent (Descenso) -> Emergency (Emergencia) -> Clearance (Autorización).",
                "is_correct": False
            },
            {
                "id": "C",
                "text": "Fast (Rápido) -> Operational (Operacional) -> Reliable (Fiable) -> Direct (Directo) -> Easy (Fácil) -> Clear (Claro).",
                "is_correct": False
            },
            {
                "id": "D",
                "text": "Flight (Vuelo) -> Owner (Propietario) -> Radar (Radar) -> Duty (Servicio) -> Engine (Motor) -> Checklist (Lista de chequeo).",
                "is_correct": False
            }
        ],
        "explanation": {
            "text": "### Modelo de Toma de Decisiones FOR-DEC\n* **F (Facts)**: ¿Cuál es el problema exacto? Recopilar datos objetivos (averías, meteo, combustible, pasaje).\n* **O (Options)**: ¿Qué alternativas tenemos? (Continuar, esperar, frustrar, desviar a Alternativo A o B).\n* **R (Risks)**: Analizar los pros y contras de cada opción.\n* **D (Decision)**: El Comandante toma la decisión clara tras consultar al Copiloto.\n* **E (Execution)**: Reparto de tareas y comunicación con ATC, tripulación de cabina y Propietarios.\n* **C (Check)**: Monitorizar el plan y reevaluar si las condiciones cambian.",
            "references": [
                "EASA CRM Training Guidelines (AMC1 ORO.FC.115)",
                "ICAO Human Factors Training Manual (Doc 9683)"
            ]
        },
        "metadata": {"difficulty": 0.3}
    }
]

# Mapa de archivos a actualizar
updates = [
    ("historia-evolucion-netjets/netjets_historia_creacion_evolucion.json", historia_new),
    ("combustible-fuel-schemes/netjets_easa_fuel_schemes.json", fuel_new),
    ("minimos-operacionales-lvo/netjets_easa_operations_minima.json", minimos_new),
    ("tiempos-actividad-descanso-ftl/netjets_easa_ftl_rest_duty.json", ftl_new),
    ("espacio-rvsm-pbn-lvo/netjets_easa_rvsm_pbn_spec_ops.json", rvsm_new),
    ("licencias-habilitaciones-aircrew/netjets_easa_aircrew_regulations.json", crew_new),
    ("escenarios-netjets-despacho-crm/netjets_interview_scenarios_crm.json", crm_new)
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

print("\nExpansion script completed successfully.")
