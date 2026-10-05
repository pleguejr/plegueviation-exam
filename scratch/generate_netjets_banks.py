#!/usr/bin/env python3
"""
generate_netjets_banks.py
Generates the comprehensive NetJets Europe Interview & EASA Air Ops / Aircrew question bank.
Grounded directly in:
- Regulation (EU) No 965/2012 (Easy Access Rules for Air Operations)
- Regulation (EU) No 1178/2011 (Easy Access Rules for Aircrew)
- NetJets Europe Technical & Behavioral Interview Gouge
"""

import json
from pathlib import Path

def get_root() -> Path:
    return Path(__file__).resolve().parents[1]

def write_bank_file(subfolder: str, filename: str, data: list):
    root = get_root()
    target_dir = root / "banks" / "netjets-interview" / subfolder
    target_dir.mkdir(parents=True, exist_ok=True)
    target_path = target_dir / filename
    with open(target_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"[OK] Wrote {len(data)} questions to {target_path.relative_to(root)}")

def main():
    # 1. FUEL SCHEMES & FUEL PLANNING
    fuel_questions = [
        {
            "id": "NJ-FUEL-001",
            "subject_id": "combustible-fuel-schemes",
            "learning_objective": "EASA Part-CAT.OP.MPA.181 / AMC1 CAT.OP.MPA.181(c)(1) - Final Reserve Fuel en reactores y turborreactores",
            "stem": "¿Cuál es la definición reglamentaria y el valor mínimo del Combustible de Reserva Final (Final Reserve Fuel - FRF) para un avión propulsado por turbina (jet/turboprop) según la normativa EASA Air Operations (CAT.OP.MPA.181)?",
            "options": [
                {
                    "id": "A",
                    "text": "Combustible para volar durante 30 minutos a velocidad de espera (holding speed) a 1.500 ft (450 m) sobre la elevación del aeródromo en condiciones estándar ISA.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "Combustible para volar durante 45 minutos a régimen de crucero de largo alcance a nivel de crucero asignado en atmósfera real.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "Combustible para 30 minutos calculados al consumo promedio de aproximación frustrada y circuito de tráfico a 1.000 ft AGL.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "Combustible para volar durante 45 minutos a velocidad de espera a 1.500 ft sobre el aeródromo alternativo.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "De acuerdo con **CAT.OP.MPA.181** y **AMC1 CAT.OP.MPA.181(c)(1)**:\n\n* **Aviones con motor de turbina (Turbine-engine aircraft)**: El Combustible de Reserva Final (*Final Reserve Fuel*) es la cantidad calculada para volar durante **30 minutos** a velocidad de espera (*holding speed*) a **1.500 ft (450 m)** por encima de la elevación del aeródromo en condiciones de atmósfera estándar (ISA), con la masa estimada a la llegada al aeródromo alternativo de destino (o de destino si no se requiere alternativo).\n* **Aviones con motor de pistón**: El tiempo requerido es de **45 minutos** bajo las mismas condiciones.\n\n### Resumen de Reserva Final EASA\n| Tipo de Planta Motriz | Tiempo de Vuelo | Altitud de Referencia | Velocidad / Condiciones |\n| :--- | :--- | :--- | :--- |\n| **Turbina (Jet / Turboprop)** | **30 minutos** | 1.500 ft (450 m) sobre aeródromo | Holding speed, ISA |\n| **Pistón (Reciprocating)** | **45 minutos** | 1.500 ft (450 m) sobre aeródromo | Holding speed, ISA |",
                "references": [
                    "Regulation (EU) No 965/2012 - Part-CAT.OP.MPA.181: Fuel schemes - fuel planning and in-flight re-planning policy",
                    "AMC1 CAT.OP.MPA.181(c)(1) Fuel planning and in-flight re-planning policy - basic fuel scheme"
                ]
            },
            "metadata": { "difficulty": 0.2 }
        },
        {
            "id": "NJ-FUEL-002",
            "subject_id": "combustible-fuel-schemes",
            "learning_objective": "EASA Part-CAT.OP.MPA.181 / AMC1 CAT.OP.MPA.181 - Cálculo del Combustible de Contingencia (Contingency Fuel)",
            "stem": "En el marco del plan básico de combustible EASA para transporte aéreo comercial (CAT), ¿cómo se calcula reglamentariamente el Combustible de Contingencia (Contingency Fuel) estándar sin variaciones especiales?",
            "options": [
                {
                    "id": "A",
                    "text": "El 5 % del combustible de viaje (trip fuel) planificado, o una cantidad para volar 5 minutos a velocidad de espera a 1.500 ft sobre el destino, lo que sea mayor.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "El 10 % del combustible de viaje planificado o 15 minutos a velocidad de crucero normal en cualquier caso.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "El 3 % del combustible de viaje planificado de forma obligatoria e incondicional para cualquier ruta europea.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "Una cantidad fija equivalente a 20 minutos de consumo horario medio del avión con independencia de la duración del vuelo.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "De acuerdo con **AMC1 CAT.OP.MPA.181(c)(1)**, el combustible de contingencia en el esquema básico estándar no debe ser inferior a:\n\n1. **El 5 % del Trip Fuel planificado** o, en caso de re-planificación en vuelo, el 5 % del Trip Fuel restante; o\n2. Una cantidad que permita volar durante **5 minutos a velocidad de espera a 1.500 ft (450 m)** sobre el aeródromo de destino en condiciones estándar;\n**lo que sea mayor** de los dos valores.\n\n*Nota:* Puede reducirse al **3 % del Trip Fuel** únicamente si el operador cuenta con un alternativo en ruta adecuado (*En-Route Alternate - ERA*) ubicado dentro del 20 % de la distancia total de la ruta o a no más de 50 NM del eje.",
                "references": [
                    "Regulation (EU) No 965/2012 - CAT.OP.MPA.181",
                    "AMC1 CAT.OP.MPA.181(c)(1)(i) Contingency fuel"
                ]
            },
            "metadata": { "difficulty": 0.3 }
        },
        {
            "id": "NJ-FUEL-003",
            "subject_id": "combustible-fuel-schemes",
            "learning_objective": "EASA Part-CAT.OP.MPA.182 / GM1 CAT.OP.MPA.182 - Declaración en vuelo de 'MINIMUM FUEL'",
            "stem": "¿Bajo qué circunstancia operativa exacta debe el Comandante declarar 'MINIMUM FUEL' a la dependencia ATC según la normativa EASA CAT.OP.MPA.182?",
            "options": [
                {
                    "id": "A",
                    "text": "Cuando el vuelo está comprometido a aterrizar en un aeródromo específico y cualquier cambio en la autorización actual puede resultar en un aterrizaje con menos del Combustible de Reserva Final previsto.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "Cuando el combustible utilizable a bordo es exactamente igual a la reserva final y se requiere prioridad inmediata de aproximación.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "En el instante en que se consume la totalidad del combustible de contingencia durante la fase de crucero.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "Únicamente cuando se ha iniciado el desvío al alternativo y el combustible restante es inferior al Trip Fuel del FMS.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "Según **CAT.OP.MPA.182(d)** y **GM1 CAT.OP.MPA.182**:\n\n* **MINIMUM FUEL**: El comandante debe notificar al control de tránsito aéreo (ATC) declarando `MINIMUM FUEL` cuando el vuelo está **comprometido a aterrizar en un aeródromo específico** y calcula que cualquier cambio en la autorización existente puede dar lugar a aterrizar con **menos del Combustible de Reserva Final (FRF)** planificado.\n* **Importante**: La declaración `MINIMUM FUEL` informa al ATC de que todas las opciones de aeródromos previstos se han reducido a un aeródromo específico y que la situación de combustible no tolera demoras imprevistas, pero **NO confiere prioridad de tráfico** por sí misma.",
                "references": [
                    "Regulation (EU) No 965/2012 - CAT.OP.MPA.182: In-flight fuel management",
                    "GM1 CAT.OP.MPA.182 In-flight fuel management - Declaration of MINIMUM FUEL"
                ]
            },
            "metadata": { "difficulty": 0.4 }
        },
        {
            "id": "NJ-FUEL-004",
            "subject_id": "combustible-fuel-schemes",
            "learning_objective": "EASA Part-CAT.OP.MPA.182 / AMC1 CAT.OP.MPA.182 - Declaración de emergencia 'MAYDAY MAYDAY MAYDAY FUEL'",
            "stem": "¿Cuándo es obligatorio declarar una situación de peligro mediante la llamada radiotelefónica 'MAYDAY MAYDAY MAYDAY FUEL' según EASA Air Operations?",
            "options": [
                {
                    "id": "A",
                    "text": "Cuando la cantidad calculada de combustible utilizable al aterrizar en el aeródromo seguro más cercano es inferior al Combustible de Reserva Final (FRF) planificado.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "Cuando el combustible remanente a bordo es inferior a la suma del combustible de alternativo más la reserva de contingencia.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "Cuando se experimenta una fuga de combustible no controlada independientemente de la cantidad total remanente en los tanques.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "Cuando el controlador aéreo no puede conceder un descenso inmediato tras haber declarado previamente 'MINIMUM FUEL'.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "De acuerdo con **CAT.OP.MPA.182(e)**:\n\n* El piloto al mando debe declarar una situación de socorro/emergencia mediante **`MAYDAY MAYDAY MAYDAY FUEL`** cuando la cantidad calculada de combustible utilizable disponible para el aterrizaje en el aeródromo seguro más cercano donde se pueda realizar un aterrizaje seguro sea **inferior al combustible de reserva final (Final Reserve Fuel)** previsto.\n\n### Comparativa de Llamadas de Combustible\n| Mensaje R/T | Condición Disparadora | ¿Otorga Prioridad ATC? |\n| :--- | :--- | :--- |\n| **`MINIMUM FUEL`** | Comprometido a un aeródromo y cualquier demora adicional puede comprometer el FRF | **NO** (Informa al ATC de no demoras) |\n| **`MAYDAY MAYDAY MAYDAY FUEL`** | Se calcula aterrizar con menos del Combustible de Reserva Final (FRF) | **SÍ** (Prioridad absoluta de emergencia) |",
                "references": [
                    "Regulation (EU) No 965/2012 - CAT.OP.MPA.182(e)",
                    "ICAO Doc 4444 (PANS-ATM) Section 15.5.4"
                ]
            },
            "metadata": { "difficulty": 0.3 }
        },
        {
            "id": "NJ-FUEL-005",
            "subject_id": "combustible-fuel-schemes",
            "learning_objective": "EASA Part-CAT.OP.MPA.181 / AMC1 CAT.OP.MPA.181 - Esquema de Aeródromo Aislado (Isolated Aerodrome Fuel Policy)",
            "stem": "En una operación IFR hacia un aeródromo aislado (isolated aerodrome) para el cual no existe ningún alternativo de destino disponible, ¿qué cantidad de combustible adicional (Additional Fuel) exige EASA planificar para un avión bimotor a reacción?",
            "options": [
                {
                    "id": "A",
                    "text": "Combustible para volar durante 2 horas al régimen de consumo normal de crucero sobre el aeródromo de destino, incluyendo la reserva final.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "Combustible para volar durante 45 minutos a velocidad de espera a 1.500 ft más un 15 % del combustible de viaje total.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "Combustible equivalente al 50 % del Trip Fuel más 30 minutos a régimen de crucero rápido.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "Únicamente el combustible de contingencia incrementado al 10 % del Trip Fuel sin reservas adicionales obligatorias.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "Según **AMC1 CAT.OP.MPA.181(c)(1)(iv)**, cuando un aeródromo de destino es designado como **aeródromo aislado** (*isolated aerodrome*) y no existe aeródromo alternativo de destino disponible:\n\n* **Aviones con turbina**: La cantidad de combustible antes del vuelo debe incluir el *Trip Fuel*, el *Contingency Fuel*, más una cantidad de combustible adicional que no debe ser inferior a **2 horas de vuelo al consumo normal de crucero** por encima del aeródromo de destino (lo cual incluye el combustible de reserva final).\n* **Aviones de pistón**: El combustible adicional debe ser de al menos **45 minutos más un 15 % del tiempo de vuelo en crucero** (hasta un máximo de 2 horas) o 2 horas de crucero, lo que sea menor.",
                "references": [
                    "Regulation (EU) No 965/2012 - AMC1 CAT.OP.MPA.181(c)(1)(iv) Isolated aerodrome fuel scheme"
                ]
            },
            "metadata": { "difficulty": 0.5 }
        },
        {
            "id": "NJ-FUEL-006",
            "subject_id": "combustible-fuel-schemes",
            "learning_objective": "EASA Part-CAT.OP.MPA.185 - Criterios de Selección de Alternativo de Destino IFR",
            "stem": "¿En qué condición reglamentaria permite EASA no seleccionar ningún aeródromo alternativo de destino en el plan operacional de vuelo para una operación IFR en transporte comercial?",
            "options": [
                {
                    "id": "A",
                    "text": "Cuando la duración del vuelo no excede de 6 horas y el destino cuenta con dos pistas utilizables independientes con previsiones meteorológicas en o por encima de los mínimos aplicables durante ETA ±1 hora.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "Cuando la duración del vuelo sea inferior a 3 horas y el RVR en el destino esté por encima de 800 m en el momento del despegue.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "Siempre que el avión disponga de combustible extra equivalente a 60 minutos de espera independientemente del estado del tiempo.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "En cualquier vuelo doméstico dentro del territorio de la Unión Europea operado bajo supervisión de control radar.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "Según **CAT.OP.MPA.185(b)** y **AMC1 CAT.OP.MPA.185**:\nPara un vuelo IFR, no es necesario seleccionar un aeródromo alternativo de destino si:\n1. La **duración del vuelo planificado no supera las 6 horas**; Y\n2. En el aeródromo de destino existen **dos pistas utilizables separadas e independientes**; Y\n3. Los partes e informes meteorológicos apropiados indican que, durante un período que comienza **1 hora antes y finaliza 1 hora después de la hora estimada de llegada (ETA ±1 h)**, el techo de nubes estará al menos a **2.000 ft o a la altitud de aproximación en circuito (circling height) + 500 ft** (lo que sea mayor), y la visibilidad será de al menos **5 km**.\n\n*Alternativamente:* Cuando el destino se planifica bajo el procedimiento de *aeródromo aislado*.",
                "references": [
                    "Regulation (EU) No 965/2012 - CAT.OP.MPA.185: Selection of aerodromes and operating sites - aeroplanes",
                    "AMC1 CAT.OP.MPA.185 Selection of aerodromes"
                ]
            },
            "metadata": { "difficulty": 0.5 }
        },
        {
            "id": "NJ-FUEL-007",
            "subject_id": "combustible-fuel-schemes",
            "learning_objective": "EASA Part-CAT.OP.MPA.185 - Obligatoriedad de 2 Alternativos de Destino",
            "stem": "¿Cuándo exige la normativa EASA CAT.OP.MPA.185 seleccionar obligatoriamente DOS (2) aeródromos alternativos de destino en el plan de vuelo operacional para una operación IFR?",
            "options": [
                {
                    "id": "A",
                    "text": "Cuando las previsiones meteorológicas para el destino indiquen condiciones por debajo de los mínimos de planificación aplicables (ETA ±1 h), o cuando no se disponga de información meteorológica.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "Cuando el vuelo tenga una duración superior a 4 horas o se opere en espacio aéreo de navegación basada en performance (PBN).",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "Siempre que la pista de destino esté mojada o contaminada en el momento del despacho inicial.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "Cuando la categoría de salvamento y extinción de incendios (RFFS) del destino sea inferior a la requerida por el manual de operaciones.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "De acuerdo con **CAT.OP.MPA.185(c)**:\nEl operador debe seleccionar **al menos dos aeródromos alternativos de destino** cuando:\n\n1. Los informes o pronósticos meteorológicos apropiados para el aeródromo de destino indiquen que, durante el período desde **1 hora antes hasta 1 hora después de la ETA**, las condiciones meteorológicas estarán **por debajo de los mínimos de planificación aplicables**; O\n2. **No se dispone de información meteorológica** adecuada para el aeródromo de destino.\n\n*Nota para NetJets / Executive Ops:* En destinos corporativos no controlados o con estaciones meteorológicas de horario restringido (sin METAR/TAF continuo), se deben despachar 2 alternativos con información meteorológica completa.",
                "references": [
                    "Regulation (EU) No 965/2012 - CAT.OP.MPA.185(c)",
                    "AMC1 CAT.OP.MPA.185 Selection of aerodromes - two destination alternates"
                ]
            },
            "metadata": { "difficulty": 0.4 }
        },
        {
            "id": "NJ-FUEL-008",
            "subject_id": "combustible-fuel-schemes",
            "learning_objective": "EASA Part-CAT.OP.MPA.181 / AMC1 CAT.OP.MPA.181 - Procedimiento de Punto de Decisión (Decision Point Procedure)",
            "stem": "En el esquema de combustible con procedimiento de Punto de Decisión (Decision Point Procedure - DPP), ¿cómo se dimensiona el combustible de contingencia desde el punto de decisión hasta el destino?",
            "options": [
                {
                    "id": "A",
                    "text": "No menos del 5 % del combustible estimado de viaje desde el punto de decisión hasta el destino, o 5 minutos de espera a 1.500 ft sobre el destino.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "El 10 % del combustible total de la ruta desde el aeródromo de salida hasta el punto de decisión exclusivamente.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "Una cantidad fija de 30 minutos calculada a régimen económico de crucero sin considerar la distancia restante.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "El 3 % del combustible total de viaje entre la salida y el aeródromo alternativo en ruta (En-Route Alternate).",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "Bajo **AMC1 CAT.OP.MPA.181(c)(2)** (*Decision Point Procedure - DPP*):\n\nEl combustible de contingencia se calcula en dos tramos:\n* **Tramo 1 (Salida al alternativo en ruta vía Punto de Decisión)**: No menos del 5 % del Trip Fuel desde la salida hasta el alternativo en ruta (*ERA*);\n* **Tramo 2 (Punto de Decisión al Destino)**: No menos del **5 % del combustible de viaje desde el Punto de Decisión (DP) hasta el aeródromo de destino** (o 5 minutos a velocidad de espera a 1.500 ft sobre el destino, lo que sea mayor).\n\nEste procedimiento permite reducir significativamente el combustible total a cargar en vuelos transcontinentales o de largo alcance.",
                "references": [
                    "Regulation (EU) No 965/2012 - AMC1 CAT.OP.MPA.181(c)(2) Decision point procedure"
                ]
            },
            "metadata": { "difficulty": 0.6 }
        }
    ]

    # 2. OPERATIONS MINIMA, LVO & APPROACH BAN
    minima_questions = [
        {
            "id": "NJ-MIN-001",
            "subject_id": "minimos-operacionales-lvo",
            "learning_objective": "EASA Part-CAT.OP.MPA.305 - Regla de Prohibición de Aproximación (Approach Ban Rule)",
            "stem": "Según la regla de prohibición de aproximación de EASA (CAT.OP.MPA.305), ¿en qué punto exacto no debe continuarse la aproximación instrumental si el RVR/visibilidad notificado es inferior a los mínimos aplicables?",
            "options": [
                {
                    "id": "A",
                    "text": "No se debe continuar la aproximación más allá del marcador exterior (Outer Marker) o de 1.000 ft sobre la elevación del aeródromo (lo que sea más alto o aplicable en el segmento final).",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "No se debe descender por debajo de la Altitud de Decisión (DA/DH) o Altitud Mínima de Descenso (MDA/MDH) bajo ninguna circunstancia.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "Se debe frustrar inmediatamente en el punto de aproximación frustrada (MAPt) si no hay contacto visual.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "No se puede iniciar el viraje de procedimiento o interceptación de localizador si el METAR emitido está por debajo de mínimos.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "De acuerdo con **CAT.OP.MPA.305(a)** (*Commencement and continuation of approach*):\n\n1. El comandante o el piloto que vuela la aeronave puede iniciar una aproximación instrumental independientemente del RVR/visibilidad notificado.\n2. **Punto de la Prohibición (Approach Ban)**: Si el RVR/visibilidad notificado es **inferior al mínimo aplicable**, la aproximación **NO debe continuarse más allá** de:\n   - El **marcador exterior (Outer Marker - OM)** o posición equivalente en la senda de aproximación; O\n   - **1.000 ft por encima del aeródromo** (*1.000 ft AAL*), si no existe OM ni punto de referencia equivalente.\n3. **Si el RVR cae por debajo de mínimos DESPUÉS de haber cruzado los 1.000 ft AAL / OM**: La aproximación **PUEDE continuarse** hasta la DA/H o MDA/H aplicable, frustrando únicamente si no se obtienen las referencias visuales requeridas al alcanzarla.",
                "references": [
                    "Regulation (EU) No 965/2012 - CAT.OP.MPA.305: Commencement and continuation of approach",
                    "AMC1 CAT.OP.MPA.305 Commencement and continuation of approach"
                ]
            },
            "metadata": { "difficulty": 0.2 }
        },
        {
            "id": "NJ-MIN-002",
            "subject_id": "minimos-operacionales-lvo",
            "learning_objective": "EASA Part-CAT.OP.MPA.110 / Part-SPA.LVO - Despegue de Baja Visibilidad (LVTO)",
            "stem": "¿A partir de qué valor de RVR se considera un despegue como Operación de Baja Visibilidad (Low Visibility Take-Off - LVTO) y qué valor mínimo absoluto permite EASA para aviones CAT con aprobación LVO e iluminación de eje de pista?",
            "options": [
                {
                    "id": "A",
                    "text": "Se considera LVTO cuando el RVR es inferior a 400 m; el mínimo estándar con iluminación de eje de pista y marcas de pista de alta intensidad es de 125 m (o 150 m para ciertas categorías).",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "Se considera LVTO por debajo de 550 m; el mínimo absoluto permitido es de 75 m de RVR con HUD/EVS únicamente.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "Se considera LVTO por debajo de 800 m de visibilidad meteorológica; el límite inferior es de 200 m de RVR.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "Se considera LVTO por debajo de 1.000 m; requiere obligatoriamente copiloto con más de 500 horas en tipo.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "De acuerdo con **Part-SPA.LVO.100** y **AMC1 CAT.OP.MPA.110**:\n\n* **Definición de LVTO**: Todo despegue en una pista con un **RVR inferior a 400 m**.\n* **Requisitos para LVTO < 400 m**:\n  - Deben estar en vigor los Procedimientos de Baja Visibilidad (**LVP - Low Visibility Procedures**) en el aeródromo.\n  - Requiere aprobación operacional específica (**SPA.LVO**).\n  - **RVR 125 m / 150 m**: Requiere luces de eje de pista de alta intensidad (*Runway Centerline Lights* espaciadas $\le 15\\text{ m}$), luces de borde de pista y marcas de eje, proporcionando un segmento visual mínimo de **90 metros** desde la cabina.",
                "references": [
                    "Regulation (EU) No 965/2012 - Part-SPA.LVO.100: Low visibility operations",
                    "AMC1 CAT.OP.MPA.110 Aerodrome operating minima - Take-off operations"
                ]
            },
            "metadata": { "difficulty": 0.4 }
        },
        {
            "id": "NJ-MIN-003",
            "subject_id": "minimos-operacionales-lvo",
            "learning_objective": "EASA Part-CAT.OP.MPA.110 / Part-SPA.LVO - Referencias Visuales en CAT II",
            "stem": "En una aproximación de precisión ILS CAT II (DH entre 100 ft y 200 ft), ¿cuál es el requisito mínimo reglamentario de referencias visuales que debe tener el piloto al alcanzar la DH para poder continuar y aterrizar?",
            "options": [
                {
                    "id": "A",
                    "text": "Un segmento visual de al menos 3 luces consecutivas que incluyan la línea central de las luces de aproximación, o de la zona de contacto (TDZ), o del eje de pista, o una combinación de ellas.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "Visión clara y completa del umbral de pista y de las luces PAPIS en todo momento durante el descenso final.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "Al menos una luz aislada del sistema de luces de aproximación antes de los 100 ft sobre el terreno.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "Contacto visual con cualquier elemento del terreno adyacente a la pista o señales de rodaje laterales.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "Según **AMC1 CAT.OP.MPA.110** y **SPA.LVO.100**:\n\n* **CAT II Visual Reference Requirement**: Al alcanzar la Altitud/Altura de Decisión (**DH 100-200 ft**), el piloto no debe continuar el descenso por debajo de la DH a menos que mantenga contacto visual con un segmento de al menos **tres (3) luces consecutivas** que correspondan a:\n  1. La línea central de las luces de aproximación (*centerline of the approach lights*); O\n  2. Las luces de la zona de toma de contacto (*Touchdown Zone - TDZ lights*); O\n  3. Las luces de la línea central de pista (*Runway Centerline lights*); O\n  4. Las luces de borde de pista; O\n  5. Una combinación de estos elementos luminosos.\n\nEste segmento visual debe incluir un elemento transversal (como una barra transversal del sistema de aproximación o del umbral).",
                "references": [
                    "Regulation (EU) No 965/2012 - AMC1 CAT.OP.MPA.110: Visual reference for CAT II operations",
                    "Part-SPA.LVO.100 Low visibility operations"
                ]
            },
            "metadata": { "difficulty": 0.5 }
        },
        {
            "id": "NJ-MIN-004",
            "subject_id": "minimos-operacionales-lvo",
            "learning_objective": "EASA Part-CAT.OP.MPA.115 / AMC1 CAT.OP.MPA.115 - Técnica CDFA en Aproximaciones No de Precisión",
            "stem": "¿Qué penalización reglamentaria de visibilidad/RVR impone EASA si una aproximación no de precisión (NPA) o de tipo A se vuela utilizando una técnica que NO sea de Descenso Continuo en Aproximación Final (Non-CDFA)?",
            "options": [
                {
                    "id": "A",
                    "text": "Se debe incrementar el RVR mínimo en 200 m para aeronaves de Categoría A y B, y en 400 m para aeronaves de Categoría C y D, debiendo además añadir un margen a la MDA/H.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "Se debe duplicar obligatoriamente el RVR mínimo de la carta y requerir la presencia de un segundo alternativo de destino.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "No existe penalización de RVR, únicamente se prohíbe realizar la aproximación de noche o con pista mojada.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "Se debe sumar 500 ft a la altitud de decisión sin alterar el RVR ni la visibilidad requerida.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "De acuerdo con **AMC1 CAT.OP.MPA.115** (*Continuous Descent Final Approach - CDFA*):\n\n* Las operaciones comerciales de transporte aéreo deben volar las aproximaciones de No Precisión (NPA) usando la técnica **CDFA** (Continuous Descent Final Approach).\n* Si una aproximación no puede volarse en CDFA (técnica escalonada *step-down* / *dive and drive*):\n  - El RVR mínimo requerido **se incrementa en 200 m** para aeronaves de **Categoría A y B**.\n  - El RVR mínimo requerido **se incrementa en 400 m** para aeronaves de **Categoría C y D**.\n  - La aproximación debe tratarse con una MDA/H convencional sin descender de ella hasta avistar la pista.",
                "references": [
                    "Regulation (EU) No 965/2012 - AMC1 CAT.OP.MPA.115: Continuous descent final approach (CDFA)"
                ]
            },
            "metadata": { "difficulty": 0.6 }
        },
        {
            "id": "NJ-MIN-005",
            "subject_id": "minimos-operacionales-lvo",
            "learning_objective": "EASA Part-CAT.OP.MPA.186 - Mínimos de Planificación para Alternativo de Destino (Tabla 1B)",
            "stem": "Al seleccionar un aeródromo como alternativo de destino en la fase de planificación de vuelo bajo el plan básico EASA (Tabla 1B), si dicho aeródromo alternativo dispone de una aproximación instrumental Tipo A (NPA/3D con mínimos > 200 ft), ¿qué márgenes deben añadirse a los mínimos del aeródromo para el cálculo de meteorología requerida?",
            "options": [
                {
                    "id": "A",
                    "text": "DA/H o MDA/H + 400 ft en el techo de nubes (o visibilidad vertical) y RVR/VIS + 1.500 m.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "DA/H + 200 ft en el techo de nubes y RVR/VIS + 800 m.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "MDA/H + 100 ft en el techo de nubes y RVR/VIS + 300 m.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "Únicamente los mínimos de publicación de la carta instrumental sin ningún incremento adicional.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "Según **AMC6 CAT.OP.MPA.182 / CAT.OP.MPA.186 (Tabla 1B - Plan Básico)**:\n\n### Mínimos de Planificación para Alternativos de Destino y ERA (Plan Básico)\n| Tipo de Aproximación en Alternativo | Techo de Nubes / Visibilidad Vertical | RVR / Visibilidad |\n| :--- | :--- | :--- |\n| **Aproximación Tipo B (Precision / CAT I)** | **DA/H + 200 ft** | **RVR/VIS + 800 m** |\n| **Aproximación Tipo A (Non-Precision / 3D > 200 ft)** | **DA/H o MDA/H + 400 ft** | **RVR/VIS + 1.500 m** |\n| **Aproximación en Circuito (Circling)** | **MDA/H + 400 ft** | **VIS + 1.500 m** |\n\n*Para Tipo A:* Se deben sumar obligatoriamente **+400 ft** al techo y **+1.500 m** a la visibilidad requerida en el período ETA ±1 hora.",
                "references": [
                    "Regulation (EU) No 965/2012 - CAT.OP.MPA.186: Destination alternate aerodromes",
                    "AMC6 CAT.OP.MPA.182 Fuel planning - Planning minima (Table 1B)"
                ]
            },
            "metadata": { "difficulty": 0.4 }
        },
        {
            "id": "NJ-MIN-006",
            "subject_id": "minimos-operacionales-lvo",
            "learning_objective": "EASA Part-CAT.OP.MPA.186 - Mínimos de Planificación con 2 Pistas Separadas (Tabla 1A)",
            "stem": "Bajo el esquema de mínimos de planificación con variaciones (Tabla 1A), si el aeródromo alternativo dispone de dos o más aproximaciones Tipo B utilizables a dos pistas separadas, ¿qué incremento de planificación se aplica?",
            "options": [
                {
                    "id": "A",
                    "text": "DA/H + 100 ft en el techo y RVR + 300 m aplicados sobre la aproximación más ventajosa.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "DA/H + 200 ft en el techo y RVR + 800 m aplicados a la pista secundaria.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "Cero incremento (mínimos directos de la carta CAT I de 200 ft y 550 m).",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "MDA/H + 300 ft y RVR + 1.000 m.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "De acuerdo con **AMC8 / AMC9 CAT.OP.MPA.182 / CAT.OP.MPA.186 (Tabla 1A - Plan con Variaciones)**:\n\n* **Dos o más aproximaciones Tipo B a 2 pistas separadas**: Se requiere que la meteo (ETA ±1 h) sea superior a **DA/H + 100 ft** y **RVR + 300 m**.\n* **Una aproximación Tipo B**: **DA/H + 150 ft** y **RVR + 450 m**.\n* Esto otorga gran flexibilidad a operadores con monitorización de vuelo activa (Flight Monitoring) y autorizaciones LVO como NetJets.",
                "references": [
                    "Regulation (EU) No 965/2012 - AMC8/AMC9 CAT.OP.MPA.182 Planning minima with variations (Table 1A)"
                ]
            },
            "metadata": { "difficulty": 0.5 }
        }
    ]

    # 3. FLIGHT TIME LIMITATIONS (FTL) & REST REQUIREMENTS
    ftl_questions = [
        {
            "id": "NJ-FTL-001",
            "subject_id": "tiempos-actividad-descanso-ftl",
            "learning_objective": "EASA Part-ORO.FTL.105 / CS FTL.1.205 - Definición de WOCL (Window of Circadian Low)",
            "stem": "¿Cómo define reglamentariamente EASA la 'Ventana de Mínimo Circadiano' (Window of Circadian Low - WOCL) en la normativa Part-ORO.FTL?",
            "options": [
                {
                    "id": "A",
                    "text": "El período comprendido entre las 02:00 y las 05:59 horas en la zona horaria en la que el tripulante se encuentra aclimatado.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "El período entre las 00:00 y las 06:00 horas en tiempo universal coordinado (UTC) incondicionalmente.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "Cualquier período nocturno superior a 4 horas continuas de servicio de vuelo.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "El tramo horario de 01:00 a 07:00 en la base de operaciones de la compañía.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "De acuerdo con **ORO.FTL.105(26)**:\n\n* **Window of Circadian Low (WOCL)**: Significa el período comprendido entre las **02:00 y las 05:59 horas**.\n* Dentro de una franja de 3 husos horarios, el WOCL se refiere a la hora de la base de operaciones (*home base*).\n* Más allá de 3 husos horarios, se calcula en función de la hora local del lugar en el que el tripulante está **aclimatado** (*acclimatised*).\n* Las horas de servicio que invaden la WOCL penalizan drásticamente el período máximo diario de actividad de vuelo (FDP).",
                "references": [
                    "Regulation (EU) No 965/2012 - Part-ORO.FTL.105 Definitions (26) Window of circadian low",
                    "CS FTL.1.205 Flight Duty Period (FDP)"
                ]
            },
            "metadata": { "difficulty": 0.2 }
        },
        {
            "id": "NJ-FTL-002",
            "subject_id": "tiempos-actividad-descanso-ftl",
            "learning_objective": "EASA Part-ORO.FTL.205 / CS FTL.1.205 - Período Máximo Diario de Actividad de Vuelo (FDP Básico)",
            "stem": "Para una tripulación aclimatada que se presenta a firmar (report) a las 08:30 hora local para realizar 2 sectores de vuelo, ¿cuál es el Período Máximo Diario de Actividad de Vuelo (FDP) básico permitido por la tabla EASA ORO.FTL.205 sin extensiones?",
            "options": [
                {
                    "id": "A",
                    "text": "13 horas y 00 minutos.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "14 horas y 30 minutos.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "11 horas y 45 minutos.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "12 horas y 15 minutos.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "De acuerdo con la tabla de **CS FTL.1.205(b)(1)** (*Maximum daily FDP for acclimatised crew members*):\n\n### Tabla EASA de FDP Diario Básico (Extracto)\n| Hora de Inicio (Report) | 1-2 Sectores | 3 Sectores | 4 Sectores | 5 Sectores |\n| :--- | :--- | :--- | :--- | :--- |\n| **06:00 - 13:29** | **13:00** | **12:30** | **12:00** | **11:30** |\n| 13:30 - 13:59 | 12:45 | 12:15 | 11:45 | 11:15 |\n| 14:00 - 14:29 | 12:30 | 12:00 | 11:30 | 11:00 |\n| 17:00 - 04:59 (WOCL) | 11:00 | 10:30 | 10:00 | 09:30 |\n\nPresentándose entre **06:00 y 13:29** con **1 o 2 sectores**, el FDP máximo permitido es exactamente **13:00 horas**.",
                "references": [
                    "Regulation (EU) No 965/2012 - ORO.FTL.205 Flight duty period (FDP)",
                    "CS FTL.1.205 Flight duty period - acclimatised crew members"
                ]
            },
            "metadata": { "difficulty": 0.3 }
        },
        {
            "id": "NJ-FTL-003",
            "subject_id": "tiempos-actividad-descanso-ftl",
            "learning_objective": "EASA Part-ORO.FTL.235 - Período Mínimo de Descanso en Base y Fuera de Base",
            "stem": "¿Cuáles son los períodos mínimos reglamentarios de descanso que debe disfrutar un tripulante en su base de operaciones (home base) y fuera de su base (outstation) según EASA Part-ORO.FTL.235?",
            "options": [
                {
                    "id": "A",
                    "text": "En la base: al menos la duración de la actividad precedente o 12 horas (lo que sea mayor). Fuera de base: al menos la duración de la actividad precedente o 10 horas (que garantice 8 horas de sueño), lo que sea mayor.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "En la base: 10 horas incondicionales. Fuera de base: 8 horas incluyendo traslados al hotel.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "En la base: 14 horas continuas. Fuera de base: 12 horas en hotel de categoría superior.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "En la base y fuera de base: exactamente el doble de la duración de las horas de vuelo realizadas.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "De acuerdo con **ORO.FTL.235(a) y (b)** (*Rest periods*):\n\n1. **En la base de operaciones (Home Base)**: El período mínimo de descanso que debe concederse antes de comenzar un FDP debe ser **al menos tan largo como el período de actividad precedente, o 12 horas**, lo que sea mayor.\n2. **Fuera de la base de operaciones (Outstation / Away from base)**: El período mínimo de descanso debe ser **al menos tan largo como el período de actividad precedente, o 10 horas**, lo que sea mayor. Este período de 10 horas debe incluir la posibilidad de disfrutar de **8 horas de sueño ininterrumpido**, teniendo en cuenta los tiempos de traslado hacia y desde el alojamiento adecuado.",
                "references": [
                    "Regulation (EU) No 965/2012 - Part-ORO.FTL.235: Rest periods",
                    "CS FTL.1.235 Rest periods"
                ]
            },
            "metadata": { "difficulty": 0.3 }
        },
        {
            "id": "NJ-FTL-004",
            "subject_id": "tiempos-actividad-descanso-ftl",
            "learning_objective": "EASA Part-ORO.FTL.210 / AMC1 ORO.FTL.205 - Límites Acumulativos de Actividad (Duty Limits)",
            "stem": "¿Cuáles son los límites acumulativos máximos de tiempo total de servicio (Duty Time) permitidos por EASA en 7, 14 y 28 días consecutivos?",
            "options": [
                {
                    "id": "A",
                    "text": "60 horas en 7 días consecutivos, 110 horas en 14 días consecutivos y 190 horas en 28 días consecutivos.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "50 horas en 7 días consecutivos, 100 horas en 14 días consecutivos y 180 horas en 28 días consecutivos.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "70 horas en 7 días consecutivos, 120 horas en 14 días consecutivos y 210 horas en 28 días consecutivos.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "40 horas en 7 días consecutivos, 80 horas en 14 días consecutivos y 160 horas en 28 días consecutivos.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "De acuerdo con **ORO.FTL.210(a)** (*Cumulative duty periods*):\n\nEl tiempo total de servicio (*Duty Time*) asignado a un miembro de la tripulación no debe exceder de:\n* **60 horas** en cualquier período de **7 días consecutivos**;\n* **110 horas** en cualquier período de **14 días consecutivos**; Y\n* **190 horas** en cualquier período de **28 días consecutivos**, distribuidas lo más uniformemente posible a lo largo de este período.\n\n### Resumen de Límites Acumulados EASA\n| Concepto | 7 días | 14 días | 28 días | Año Calendario | 12 meses |\n| :--- | :--- | :--- | :--- | :--- | :--- |\n| **Total Duty Time** | **60 h** | **110 h** | **190 h** | - | - |\n| **Flight Time (Block)** | - | - | **100 h** | **900 h** | **1.000 h** |",
                "references": [
                    "Regulation (EU) No 965/2012 - Part-ORO.FTL.210: Flight times and duty periods"
                ]
            },
            "metadata": { "difficulty": 0.3 }
        },
        {
            "id": "NJ-FTL-005",
            "subject_id": "tiempos-actividad-descanso-ftl",
            "learning_objective": "EASA Part-ORO.FTL.210 - Límites Acumulativos de Tiempo de Vuelo (Block Hours)",
            "stem": "¿Cuáles son los límites máximos de tiempo de vuelo (Block Hours / Flight Time) que puede realizar un piloto comercial según EASA ORO.FTL.210?",
            "options": [
                {
                    "id": "A",
                    "text": "100 horas en 28 días consecutivos, 900 horas en un año calendario y 1.000 horas en 12 meses consecutivos.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "90 horas en 28 días consecutivos, 800 horas en un año calendario y 900 horas en 12 meses consecutivos.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "120 horas en 30 días consecutivos, 1.000 horas en un año y 1.200 horas en 12 meses.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "80 horas en 28 días consecutivos, 750 horas en un año calendario y 900 horas en 12 meses.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "De acuerdo con **ORO.FTL.210(b)** (*Cumulative flight time*):\n\nEl tiempo total de vuelo (*Flight Time* / tiempo calzo a calzo) en el que un miembro de la tripulación ejerce sus funciones no debe exceder de:\n* **100 horas** en cualquier período de **28 días consecutivos**;\n* **900 horas** en un **año civil/calendario** (*calendar year*); Y\n* **1.000 horas** en cualquier período de **12 meses consecutivos**.",
                "references": [
                    "Regulation (EU) No 965/2012 - Part-ORO.FTL.210(b)"
                ]
            },
            "metadata": { "difficulty": 0.2 }
        },
        {
            "id": "NJ-FTL-006",
            "subject_id": "tiempos-actividad-descanso-ftl",
            "learning_objective": "EASA Part-ORO.FTL.205 / CS FTL.1.205(f) - Discrecionalidad del Comandante (Commander's Discretion)",
            "stem": "En caso de circunstancias imprevistas excepcionales ocurridas después de presentarse al servicio (report time), ¿en cuánto puede el Comandante ampliar el FDP diario básico utilizando su discrecionalidad (Commander's Discretion)?",
            "options": [
                {
                    "id": "A",
                    "text": "Hasta un máximo de 2 horas con tripulación estándar (o hasta 3 horas con tripulación reforzada / augmented crew), debiendo consultar a todos los miembros de la tripulación sobre su estado de alerta.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "Hasta un máximo de 4 horas siempre que el vuelo sea directo al aeropuerto base de la compañía.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "Hasta 1 hora sin necesidad de consultar con la tripulación ni remitir informe posterior.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "No se permite ninguna extensión discrecional del FDP bajo normativa EASA una vez comenzado el vuelo.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "Según **ORO.FTL.205(f)** y **CS FTL.1.205(f)** (*Commander's discretion*):\n\n1. **Condición**: Circunstancias imprevistas en operaciones de vuelo que ocurran **después de la hora de presentación** (*reporting time*).\n2. **Límites de Extensión**:\n   - Tripulación estándar (no reforzada): **Máximo 2 horas** sobre el FDP diario permitido.\n   - Tripulación reforzada (*augmented crew*): **Máximo 3 horas**.\n3. **Proceso Obligatorio**:\n   - El Comandante debe evaluar y consultar a **todos los miembros de la tripulación** sobre su estado de fatiga y aptitud (*fitness for duty*).\n   - Si la extensión es superior a **1 hora**, el Comandante debe remitir un informe (*Commander's Discretion Report*) al operador en un plazo no superior a **28 días**.",
                "references": [
                    "Regulation (EU) No 965/2012 - Part-ORO.FTL.205(f) Commander's discretion",
                    "CS FTL.1.205(f) Commander's discretion"
                ]
            },
            "metadata": { "difficulty": 0.4 }
        },
        {
            "id": "NJ-FTL-007",
            "subject_id": "tiempos-actividad-descanso-ftl",
            "learning_objective": "EASA Part-ORO.FTL.220 - Servicio Fraccionado (Split Duty)",
            "stem": "¿Cuál es la duración mínima reglamentaria del descanso intermedio en tierra para poder acogerse a una extensión por Servicio Fraccionado (Split Duty) según CS FTL.1.220?",
            "options": [
                {
                    "id": "A",
                    "text": "Una pausa continua de al menos 3 horas en un alojamiento adecuado o instalación adecuada en tierra.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "Una pausa de al menos 1 hora y 30 minutos en la sala de firmas de tripulaciones.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "Cualquier escala entre vuelos superior a 45 minutos si el avión permanece apagado.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "Un descanso en tierra de exactamente 6 horas consecutivas con asignación de hotel de 4 estrellas.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "De acuerdo con **CS FTL.1.220** (*Split duty*):\n\n* La pausa continua en tierra debe ser de **al menos 3 horas consecutivas** (*break on the ground*).\n* El tiempo en tierra inferior a 3 horas no se considera *break* para extensión de servicio fraccionado.\n* Si la pausa es de 3 horas o más en una instalación o alojamiento adecuado, el FDP puede incrementarse en una cantidad equivalente a una fracción del descanso disfrutado (normalmente el 50% del descanso si se dispone de alojamiento adecuado).",
                "references": [
                    "Regulation (EU) No 965/2012 - Part-ORO.FTL.220: Split duty",
                    "CS FTL.1.220 Split duty"
                ]
            },
            "metadata": { "difficulty": 0.5 }
        }
    ]

    # 4. RVSM AIRSPACE, PBN & SPECIAL OPERATIONS
    rvsm_questions = [
        {
            "id": "NJ-RVSM-001",
            "subject_id": "espacio-rvsm-pbn-lvo",
            "learning_objective": "EASA Part-SPA.RVSM.100 / ICAO Doc 9574 - Definición y Separación Vertical RVSM",
            "stem": "¿Cuál es la separación vertical estándar aplicada en el espacio aéreo con Mínimos Reducidos de Separación Vertical (RVSM) y en qué banda de niveles de vuelo se aplica?",
            "options": [
                {
                    "id": "A",
                    "text": "1.000 ft de separación vertical aplicable entre FL290 y FL410 inclusive.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "2.000 ft de separación vertical aplicable entre FL240 y FL450.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "1.000 ft de separación vertical entre FL180 y FL350 exclusivamente.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "500 ft de separación vertical entre FL290 y FL390 en vuelos ejecutivos con aprobación especial.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "De acuerdo con **Part-SPA.RVSM.100** e **ICAO Doc 9574**:\n\n* **RVSM (Reduced Vertical Separation Minimum)** reduce la separación vertical de 2.000 ft a **1.000 ft (300 m)** entre aeronaves que vuelan entre el nivel de vuelo **FL290 y FL410 inclusive**.\n* Por encima de FL410, la separación vertical estándar vuelve a ser de **2.000 ft**.",
                "references": [
                    "Regulation (EU) No 965/2012 - Part-SPA.RVSM.100: RVSM operations",
                    "ICAO Doc 9574: Manual on Implementation of a 300 m (1,000 ft) Vertical Separation Minimum"
                ]
            },
            "metadata": { "difficulty": 0.1 }
        },
        {
            "id": "NJ-RVSM-002",
            "subject_id": "espacio-rvsm-pbn-lvo",
            "learning_objective": "EASA Part-SPA.RVSM.110 - Equipamiento Mínimo Obligatorio para Operar en RVSM",
            "stem": "¿Cuáles son los CUATRO (4) sistemas de a bordo obligatorios que debe tener operativos una aeronave para ingresar y operar en espacio aéreo RVSM?",
            "options": [
                {
                    "id": "A",
                    "text": "Dos sistemas primarios independientes de medición de altitud, un sistema automático de control de altitud (autopilot altitude-hold), un sistema de alerta de desviación de altitud y un transponder SSR con reporte de altitud (Modo C o S).",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "Tres altímetros barométricos, dos pilotos automáticos acoplados, un radar meteorológico Doppler y doble DME.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "Un altímetro primario asistido por GPS satelital, un autothrottle operativo, TCAS II versión 7.0 y doble ADF.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "Dos sistemas de gestión de vuelo (FMS), un sistema inercial de referencia láser (IRS), un altímetro y radiobaliza VHF.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "Según **SPA.RVSM.110(a)** y **AMC1 SPA.RVSM.105**:\n\nPara operar en espacio aéreo RVSM, la aeronave debe estar equipada con al menos:\n1. **Dos sistemas primarios independientes de medición de altitud** (*Two independent primary altimetry systems*);\n2. **Un sistema automático de mantenimiento de altitud (Piloto Automático)** (*One automatic altitude-control system*);\n3. **Un sistema de alerta de desviación de altitud** (*One altitude-alerting system*);\n4. **Un transpondedor secundario (SSR)** con capacidad de reporte de altitud de presión (*Mode C or Mode S*).\n\n*Regla mnemotécnica RVSM:* **2 Altímetros + 1 AP + 1 Alerta de Altitud + 1 Transponder**.",
                "references": [
                    "Regulation (EU) No 965/2012 - Part-SPA.RVSM.110: Equipment requirements for RVSM operations"
                ]
            },
            "metadata": { "difficulty": 0.2 }
        },
        {
            "id": "NJ-RVSM-003",
            "subject_id": "espacio-rvsm-pbn-lvo",
            "learning_objective": "EASA Part-SPA.RVSM / AMC1 SPA.RVSM.105 - Tolerancias de Altímetros en Tierra y en Vuelo",
            "stem": "¿Cuáles son las tolerancias máximas admisibles de diferencia de altitud entre los altímetros primarios antes del despegue en tierra y en crucero dentro del espacio RVSM?",
            "options": [
                {
                    "id": "A",
                    "text": "En tierra: diferencia máxima típica de ±75 ft respecto a la elevación conocida del aeródromo (o ±50 ft entre ellos según tipo). En vuelo: diferencia máxima de 200 ft entre los altímetros primarios.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "En tierra: diferencia máxima de ±150 ft. En vuelo: diferencia máxima de 300 ft entre altímetros primarios.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "En tierra: diferencia máxima de ±25 ft. En vuelo: diferencia máxima de 100 ft con el altímetro de emergencia.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "En tierra: sin tolerancia fija. En vuelo: tolerancia de hasta 500 ft si el TCAS está en modo TA ONLY.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "De acuerdo con **AMC1 SPA.RVSM.105** e **ICAO Doc 9574**:\n\n1. **Comprobación en Tierra (Pre-flight Altimeter Check)**:\n   - Con el QNH local fijado, los dos altímetros primarios deben coincidir con la **elevación conocida del aeródromo dentro de ±75 ft (23 m)** (muchos AFM de jets corporativos fijan ±50 ft).\n   - La diferencia entre los dos altímetros primarios no debe exceder de los límites del manual del fabricante (generalmente entre 50 y 75 ft).\n2. **Comprobación en Vuelo (In-Flight RVSM Altimeter Check)**:\n   - Se deben realizar cotejos cruzados iniciales y a intervalos periódicos (al menos cada hora).\n   - La diferencia máxima admisible entre los dos altímetros primarios en vuelo es de **200 ft (60 m)**.\n3. **Mantenimiento de Altitud**:\n   - El piloto automático debe mantener el nivel asignado dentro de una tolerancia de **±65 ft (±20 m)** en vuelo horizontal sin turbulencia.",
                "references": [
                    "Regulation (EU) No 965/2012 - AMC1 SPA.RVSM.105 RVSM operational approval",
                    "ICAO Doc 9574 Chapter 4"
                ]
            },
            "metadata": { "difficulty": 0.4 }
        },
        {
            "id": "NJ-RVSM-004",
            "subject_id": "espacio-rvsm-pbn-lvo",
            "learning_objective": "EASA Part-SPA.RVSM / Contingencias OACI - Fallo de Equipamiento RVSM en Vuelo",
            "stem": "¿Qué acción debe tomar de inmediato la tripulación si en vuelo a FL370 en espacio aéreo RVSM falla el piloto automático o la discrepancia entre altímetros primarios supera los 200 ft?",
            "options": [
                {
                    "id": "A",
                    "text": "Notificar inmediatamente al ATC indicando 'UNABLE RVSM DUE TO EQUIPMENT' solicitando una nueva autorización o vector, vigilando el tráfico mediante TCAS y manteniendo el nivel con precisión manual hasta recibir instrucciones.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "Descender de inmediato 1.000 ft sin comunicar al ATC y desconectar el transpondedor para evitar falsas alarmas.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "Declarar obligatoriamente MAYDAY MAYDAY y abandonar la aerovía 90 grados a la izquierda ascendiendo 500 ft.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "Continuar en silencio hasta la próxima transferencia de sector y reportarlo únicamente en el libro de mantenimiento al aterrizar.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "De acuerdo con **AMC1 SPA.RVSM.105** y los procedimientos de contingencia RVSM de OACI:\n\n* Si ocurre un fallo en cualquiera de los equipos requeridos (fallo del AP, pérdida de un altímetro primario, fallo del transpondedor o discrepancia de altímetros $> 200\\text{ ft}$):\n  1. La tripulación debe **notificar inmediatamente al ATC** utilizando la fraseología reglamentaria: **`UNABLE RVSM DUE TO EQUIPMENT`**.\n  2. El ATC aplicará una separación convencional de **2.000 ft** con el resto del tráfico o coordinará la salida/descenso del espacio aéreo RVSM por debajo de FL290.\n  3. La tripulación debe maximizar la vigilancia visual y mediante **TCAS**.",
                "references": [
                    "Regulation (EU) No 965/2012 - AMC1 SPA.RVSM.105 Section (d) Contingency procedures",
                    "ICAO Doc 4444 (PANS-ATM) Chapter 15"
                ]
            },
            "metadata": { "difficulty": 0.4 }
        },
        {
            "id": "NJ-RVSM-005",
            "subject_id": "espacio-rvsm-pbn-lvo",
            "learning_objective": "ICAO Doc 4444 / Doc 7030 - Procedimiento de Desplazamiento Lateral Estratégico (SLOP)",
            "stem": "¿En qué consiste el procedimiento SLOP (Strategic Lateral Offset Procedure) aplicable en rutas oceánicas y continentales designadas y cuál es el desplazamiento máximo permitido a la derecha del eje?",
            "options": [
                {
                    "id": "A",
                    "text": "Desplazamiento lateral automático o manual a la DERECHA del eje de la ruta de hasta un máximo de 2 Millas Náuticas (NM) (en incrementos de 0.1 NM o 1 y 2 NM) para mitigar el riesgo de colisión y estela turbulenta.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "Desplazamiento a la IZQUIERDA de 5 NM exclusivo para aeronaves en descenso de emergencia.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "Desplazamiento aleatorio a derecha o izquierda de hasta 10 NM sin autorización de control.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "Un desvío táctico de 3 NM exclusivamente cuando el radar meteorológico detecte tormentas severas.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "De acuerdo con **ICAO Doc 4444 (PANS-ATM 16.5)** e **ICAO Doc 7030**:\n\n* **SLOP (Strategic Lateral Offset Procedure)** es una medida de seguridad diseñada para reducir la probabilidad de colisión debida a la extrema precisión de navegación satelital (GPS/RNAV) y mitigar encuentros con estela turbulenta (*wake turbulence*).\n* **Dirección**: Siempre a la **DERECHA** del eje de la ruta (*Right of centerline*).\n* **Magnitud**: Hasta un máximo de **2 NM** (típicamente 0.0, 0.1, 0.2 ... hasta 2.0 NM a la derecha).\n* **Aviso a ATC**: No requiere autorización previa de ATC en espacios aéreos autorizados donde SLOP está publicado en la AIP.",
                "references": [
                    "ICAO Doc 4444: Procedures for Air Navigation Services - Air Traffic Management (PANS-ATM)",
                    "ICAO Doc 7030 Regional Supplementary Procedures"
                ]
            },
            "metadata": { "difficulty": 0.3 }
        },
        {
            "id": "NJ-RVSM-006",
            "subject_id": "espacio-rvsm-pbn-lvo",
            "learning_objective": "EASA Part-CAT.OP.MPA.295 / Part-AUR - Respuesta Operacional obligatoria ante un TCAS II RA",
            "stem": "Al recibir un aviso de resolución (Resolution Advisory - RA) del sistema TCAS II (versión 7.1), ¿cuál es la prioridad y el tiempo máximo de respuesta reglamentario que debe observar el piloto al mando?",
            "options": [
                {
                    "id": "A",
                    "text": "Seguir la orden del TCAS RA de forma inmediata desconectando el piloto automático si es necesario, teniendo prioridad absoluta sobre cualquier instrucción contraria de ATC, iniciando la maniobra en no más de 5 segundos.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "Contactar primero al controlador aéreo para verificar si el tráfico en conflicto está bajo control positivo antes de maniobrar.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "Ignorar la orden del TCAS si se encuentra en espacio aéreo RVSM para evitar violar la separación de 1.000 ft asignada.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "Seguir el RA únicamente si se obtiene contacto visual confirmado con el tráfico exterior.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "De acuerdo con **Part-CAT.OP.MPA.295** e **ICAO Doc 8168 (PANS-OPS)**:\n\n1. **Prioridad Absoluta**: La tripulación de vuelo debe **obedecer de inmediato** todos los avisos de resolución (*Resolution Advisories - RA*) generados por el TCAS II, incluso si entran en conflicto directo con una instrucción emitida por el controlador ATC.\n2. **Tiempos de Reacción EASA / OACI**:\n   - Ante un **RA inicial**: La respuesta en cabeceo debe iniciarse dentro de los **5 segundos**.\n   - Ante un **RA de modificación o inversión** (*Reversal / Strengthening RA*): La respuesta debe iniciarse dentro de los **2,5 segundos**.\n3. **Acción subsiguiente**: Notificar al ATC tan pronto como la carga de trabajo lo permita: *`[Callsign] TCAS RA`*, y posteriormente *`[Callsign] CLEAR OF CONFLICT, RETURNING TO [Assigned Level]`*.",
                "references": [
                    "Regulation (EU) No 965/2012 - CAT.OP.MPA.295: Use of airborne collision avoidance system (ACAS)",
                    "ICAO Doc 8168 PANS-OPS Vol I Section 3"
                ]
            },
            "metadata": { "difficulty": 0.3 }
        }
    ]

    # 5. AIRCREW REGULATIONS (PART-FCL, PART-MED, PART-ORO.FC)
    aircrew_questions = [
        {
            "id": "NJ-CREW-001",
            "subject_id": "licencias-habilitaciones-aircrew",
            "learning_objective": "EASA Part-MED.A.045 - Validez del Certificado Médico Clase 1",
            "stem": "¿Cuál es el período de validez reglamentario de un Certificado Médico Clase 1 según EASA Part-MED para un piloto de transporte comercial menor de 40 años, y a partir de qué edad y condición se reduce a 6 meses?",
            "options": [
                {
                    "id": "A",
                    "text": "12 meses para menores de 40 años; se reduce a 6 meses para pilotos que realicen operaciones comerciales monoploto con pasajeros mayores de 40 años, o cualquier operación comercial multipiloto mayores de 60 años.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "24 meses hasta los 40 años y 12 meses hasta los 65 años de edad sin excepciones.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "6 meses para todos los comandantes de reactores de negocios independientemente de su edad biológica.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "12 meses universales renovables hasta el límite de 65 años sin reducción a 6 meses.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "De acuerdo con **Part-MED.A.045(a)** (*Validity of medical certificates*):\n\n* **Certificado Médico Clase 1 (Class 1)**:\n  1. **Validez general**: **12 meses**.\n  2. **Reducción a 6 meses** cuando el titular:\n     - Realiza operaciones de **transporte comercial de pasajeros con un solo piloto** (*single-pilot CAT*) habiendo cumplido los **40 años** de edad; O\n     - Ha cumplido los **60 años** de edad en cualquier operación de transporte aéreo comercial (incluyendo multipiloto).\n\n### Resumen Validez Médico Clase 1 EASA\n| Edad del Piloto | Tipo de Operación CAT | Período de Validez |\n| :--- | :--- | :--- |\n| **< 40 años** | Cualquier operación CAT | **12 meses** |\n| **40 - 59 años** | Multipiloto | **12 meses** |\n| **40 - 59 años** | Monopiloto con pasajeros | **6 meses** |\n| **$\ge$ 60 años** | Cualquier operación CAT | **6 meses** |",
                "references": [
                    "Regulation (EU) No 1178/2011 - Part-MED.A.045: Validity, revalidation and renewal of medical certificates"
                ]
            },
            "metadata": { "difficulty": 0.3 }
        },
        {
            "id": "NJ-CREW-002",
            "subject_id": "licencias-habilitaciones-aircrew",
            "learning_objective": "EASA Part-FCL.065 - Limitación de Edad para Pilotos en Transporte Aéreo Comercial",
            "stem": "¿Cuáles son las restricciones de edad que establece EASA Part-FCL.065 para ejercer atribuciones de piloto en operaciones de transporte aéreo comercial (CAT)?",
            "options": [
                {
                    "id": "A",
                    "text": "Entre 60 y 64 años solo se puede operar como miembro de una tripulación multipiloto si el otro piloto es menor de 60 años; a los 65 años cumplidos no se puede actuar como piloto en CAT.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "A los 60 años queda prohibido actuar como Comandante, pudiendo ser copiloto hasta los 67 años.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "Se puede volar en CAT monopiloto y multipiloto hasta los 65 años sin ninguna restricción sobre la edad del copiloto.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "El límite máximo absoluto en aviación ejecutiva europea es de 60 años para vuelos internacionales.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "De acuerdo con **Part-FCL.065** (*Curtailment of privileges of licence holders aged 60 and 65 in commercial air transport*):\n\n1. **Titulares de entre 60 y 64 años (Age 60-64)**:\n   - No pueden actuar como pilotos en transporte aéreo comercial (CAT) **excepto como miembros de una tripulación multipiloto**, siempre que **el otro piloto sea menor de 60 años** (*only one pilot over 60 rule*).\n2. **Titulares de 65 años o más (Age 65)**:\n   - El titular de una licencia de piloto que haya cumplido los **65 años no puede actuar como piloto en operaciones de transporte aéreo comercial (CAT)** bajo ninguna circunstancia.",
                "references": [
                    "Regulation (EU) No 1178/2011 - Part-FCL.065 Curtailment of privileges of licence holders aged 60 and 65"
                ]
            },
            "metadata": { "difficulty": 0.3 }
        },
        {
            "id": "NJ-CREW-003",
            "subject_id": "licencias-habilitaciones-aircrew",
            "learning_objective": "EASA Part-FCL.060 - Experiencia Reciente (Recency Requirements)",
            "stem": "¿Qué requisitos mínimos de experiencia reciente (Recency) exige EASA Part-FCL.060 a un piloto para operar en transporte comercial?",
            "options": [
                {
                    "id": "A",
                    "text": "Haber realizado al menos 3 despegues, aproximaciones y aterrizajes en los 90 días precedentes como piloto a los mandos (PF) en el mismo tipo/clase de aeronave o en un simulador FFS cualificado del tipo.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "Haber volado un mínimo de 10 horas de vuelo y 5 aterrizajes en los últimos 60 días en cualquier avión multimotor.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "Haber realizado 1 aproximación de precisión y 1 frustrada en los últimos 30 días en condiciones reales IMC.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "Completar un vuelo con instructor cada 45 días calendario independientemente del número de tomas.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "De acuerdo con **Part-FCL.060(b)** (*Recent experience - aeroplanes, helicopters, powered-lift, airships and sailplanes*):\n\n* Un piloto **no actuará como piloto al mando ni como copiloto** a menos que haya realizado en los **90 días precedentes al menos 3 despegues, aproximaciones y aterrizajes** en una aeronave del mismo tipo o clase o en un simulador de vuelo completo (**FFS**) que represente dicho tipo o clase.\n* **Vuelo nocturno**: Si el piloto no posee una habilitación de vuelo instrumental (**IR**) en vigor, al menos 1 de estos aterrizajes debe haberse realizado de noche.",
                "references": [
                    "Regulation (EU) No 1178/2011 - Part-FCL.060: Recent experience"
                ]
            },
            "metadata": { "difficulty": 0.2 }
        },
        {
            "id": "NJ-CREW-004",
            "subject_id": "licencias-habilitaciones-aircrew",
            "learning_objective": "EASA Part-ORO.FC.230 - Verificaciones de Competencia del Operador (OPC y Line Check)",
            "stem": "¿Cuál es la periodicidad de validez reglamentaria para la Verificación de Competencia del Operador (OPC) y la Verificación en Línea (Line Check) según EASA Part-ORO.FC.230?",
            "options": [
                {
                    "id": "A",
                    "text": "OPC (Operator Proficiency Check): validez de 6 meses calendario. Line Check: validez de 12 meses calendario.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "OPC: validez de 12 meses. Line Check: validez de 24 meses.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "OPC: validez de 3 meses. Line Check: validez de 6 meses.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "OPC y Line Check: validez idéntica y simultánea de 12 meses calendario en el mismo chequeo.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "De acuerdo con **Part-ORO.FC.230(b) y (c)** (*Recurrent training and checking*):\n\n1. **Operator Proficiency Check (OPC)**: El período de validez de una verificación de competencia del operador es de **6 meses calendario**. Debe realizarse en un simulador FFS o avión si procede.\n2. **Line Check (Verificación en Línea)**: El período de validez de una verificación de línea es de **12 meses calendario**, operando en una ruta representativa del operador.\n\n*Ventana de revalidación:* Si se realiza dentro de los **3 meses calendario anteriores** a la fecha de expiración, el nuevo período de validez se cuenta a partir de la fecha de expiración original.",
                "references": [
                    "Regulation (EU) No 965/2012 - Part-ORO.FC.230: Recurrent training and checking",
                    "AMC1 ORO.FC.230 Recurrent training and checking"
                ]
            },
            "metadata": { "difficulty": 0.3 }
        }
    ]

    # 6. NETJETS INTERVIEW SCENARIOS, DISPATCH & CRM
    crm_questions = [
        {
            "id": "NJ-CRM-001",
            "subject_id": "escenarios-netjets-despacho-crm",
            "learning_objective": "EASA Part-ORO.MLR.105 - Intervalos de Rectificación MEL (Categorías A, B, C, D)",
            "stem": "¿Cuáles son los intervalos de rectificación estándar para las Categorías B, C y D de la Lista de Equipo Mínimo (MEL) según EASA Part-ORO.MLR.105?",
            "options": [
                {
                    "id": "A",
                    "text": "Cat B: 3 días consecutivos (72 horas); Cat C: 10 días consecutivos (240 horas); Cat D: 120 días consecutivos; excluyendo el día del descubrimiento.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "Cat B: 5 días; Cat C: 15 días; Cat D: 90 días; contando desde el minuto exacto del fallo.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "Cat B: 24 horas; Cat C: 72 horas; Cat D: 30 días naturales.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "Cat B: 7 días; Cat C: 21 días; Cat D: 180 días según criterio exclusivo del comandante.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "De acuerdo con **Part-ORO.MLR.105** y **CS-MMEL**:\n\n* **Categoría A**: No tiene un intervalo estándar; debe rectificarse dentro del intervalo especificado en las observaciones (horas, ciclos, vuelos o fecha fija).\n* **Categoría B**: Debe rectificarse dentro de **3 días consecutivos** (72 horas).\n* **Categoría C**: Debe rectificarse dentro de **10 días consecutivos** (240 horas).\n* **Categoría D**: Debe rectificarse dentro de **120 días consecutivos**.\n\n*Regla del Día del Descubrimiento:* El día en que se registra la discrepancia en el Registro Técnico de Vuelo (*ATL*) **NO se cuenta** para el cómputo del plazo; el intervalo comienza a las 00:00 del día siguiente.",
                "references": [
                    "Regulation (EU) No 965/2012 - Part-ORO.MLR.105: Minimum equipment list",
                    "CS-MMEL.140 Rectification intervals"
                ]
            },
            "metadata": { "difficulty": 0.3 }
        },
        {
            "id": "NJ-CRM-002",
            "subject_id": "escenarios-netjets-despacho-crm",
            "learning_objective": "NetJets Operational Philosophy / CRM - Manejo de Presión de Propietario (Owner Focus vs Safety)",
            "stem": "Durante una escala en un aeropuerto no controlado con un cliente VIP (Owner) a bordo, la niebla reduce el RVR por debajo de los mínimos de despegue (LVTO). El pasajero insiste en despegar inmediatamente indicando que perderá una reunión multimillonaria y que otros jets han salido. ¿Cuál es la respuesta y actuación adecuada esperada por NetJets?",
            "options": [
                {
                    "id": "A",
                    "text": "Mantener firmemente la decisión de no despegar por razones legales y de seguridad, explicar al pasajero de forma profesional y empática los límites reglamentarios y coordinar proactivamente con operaciones de NetJets las alternativas disponibles.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "Aceptar la solicitud del propietario realizando un despegue visual sin plan IFR asumiendo el riesgo bajo discrecionalidad del comandante.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "Delegar la decisión en el despachador de la base y despegar si la oficina de ventas autoriza una excepción de servicio.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "Solicitar al propietario que firme un documento de exención de responsabilidad civil antes de iniciar la carrera de despegue.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "En las entrevistas de NetJets Europe se evalúa intensamente el equilibrio entre **Customer Service de excelencia** y **Seguridad Operacional Absoluta**:\n\n1. **Seguridad no negociable**: Ningún requerimiento comercial, presión de cliente corporativo o urgencia de agenda puede comprometer las limitaciones legales (mínimos AOM, FTL, masa y centrado, MEL).\n2. **Comunicación Profesional y Asertiva**: Explicar la situación con calma, lenguaje claro, sin tecnicismos excesivos pero con firmeza, transmitiendo que la prioridad de NetJets es proteger la vida del propietario.\n3. **Proactividad**: Involucrar de inmediato al centro de operaciones (*Dispatch / Operations Control*) para ofrecer soluciones alternativas (transporte terrestre, retraso coordinado, desvío o reposicionamiento cuando mejore el techo).",
                "references": [
                    "NetJets Pilot Core Competencies & Crew Resource Management (CRM)",
                    "Regulation (EU) No 965/2012 - CAT.GEN.MPA.100 Crew responsibilities & Commander authority"
                ]
            },
            "metadata": { "difficulty": 0.2 }
        },
        {
            "id": "NJ-CRM-003",
            "subject_id": "escenarios-netjets-despacho-crm",
            "learning_objective": "EASA Part-CAT.GEN.MPA.105 - Autoridad del Comandante (Commander's Authority)",
            "stem": "Según EASA CAT.GEN.MPA.105, ¿qué autoridad legal tiene el Comandante respecto a la operación de la aeronave y el desembarque de pasajeros o carga?",
            "options": [
                {
                    "id": "A",
                    "text": "Tiene autoridad decisoria absoluta en todo lo relativo a la operación segura del vuelo, pudiendo desembarcar a cualquier persona o carga que represente un peligro potencial para la seguridad de la aeronave o de sus ocupantes.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "Debe obtener siempre autorización por escrito del director de operaciones de la compañía antes de denegar el embarque a un pasajero.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "La autoridad del comandante se limita a las decisiones de pilotaje en vuelo, dependiendo de la policía en tierra para cualquier acción.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "Puede tomar decisiones solo si existe unanimidad con el copiloto y el despachador de vuelo.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "De acuerdo con **CAT.GEN.MPA.105** (*Responsibilities of the commander*):\n\n* El comandante tiene la **autoridad decisoria final** para disponer sobre la aeronave y mantener la disciplina y seguridad a bordo.\n* Tiene autoridad para **desembarcar a cualquier persona o cualquier parte de la carga** que, a su juicio, pueda representar un riesgo para la seguridad de la aeronave o de sus ocupantes.\n* Tiene potestad para rechazar el transporte de personas bajo la influencia de alcohol o drogas o que muestren una conducta perturbadora (*unruly / disruptive passengers*).",
                "references": [
                    "Regulation (EU) No 965/2012 - Part-CAT.GEN.MPA.105: Responsibilities of the commander"
                ]
            },
            "metadata": { "difficulty": 0.2 }
        },
        {
            "id": "NJ-CRM-004",
            "subject_id": "escenarios-netjets-despacho-crm",
            "learning_objective": "EASA Part-CAT.GEN.MPA.100 / CRM - Discrepancia entre Pilotos en el Cockpit",
            "stem": "Durante la aproximación final en condiciones IMC, el copiloto observa que la velocidad indicada está cayendo 10 kt por debajo de VREF y la senda ILS se desvía más de 1 punto, pero el comandante no realiza ninguna corrección tras el callout estándar. ¿Cuál es la actuación adecuada del copiloto según los principios de CRM y SOP de EASA?",
            "options": [
                {
                    "id": "A",
                    "text": "Repetir el callout en tono enérgico y claro ('SPEED 10 LOW, GLIDEPATH ONE DOT LOW'); si no hay respuesta inmediata ni corrección a la altura de estabilización, cantar 'GO AROUND' y, si el Comandante no responde, asumir los mandos ('I HAVE CONTROLS') y ejecutar la frustrada.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "Esperar en silencio hasta la altura de decisión para ver si el comandante avista la pista.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "Aplicar suavemente potencia con la palanca sin avisar al comandante para no distraerlo.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "Desconectar los directores de vuelo y seleccionar el piloto automático en modo Altitude Hold.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "De acuerdo con los principios de **Crew Resource Management (CRM)** y los procedimientos de aproximación estabilizada (**CAT.OP.MPA.115 / AMC1 CAT.OP.MPA.115**):\n\n1. **Monitorización Activa**: El PM (Pilot Monitoring) debe realizar los callouts estandarizados ante cualquier desviación de los parámetros de estabilización (velocidad, senda, localizador, régimen de descenso $> 1.000\\text{ ft/min}$).\n2. **Escalada Asertiva (Pace Graded Assertiveness)**: Si el PF no responde al primer aviso, el PM debe usar una orden directa e inequívoca.\n3. **Criterio de Aproximación No Estabilizada**: Si la aproximación no está estabilizada a los **1.000 ft en IMC (o 500 ft en VMC)**, la maniobra de **Aproximación Frustrada (Go-Around) es obligatoria**.\n4. **Incapacitación o Falta de Respuesta**: Si el Comandante no reacciona ante una desviación que compromete la seguridad, el Copiloto tiene la obligación reglamentaria de asumir el control y frustrar (*Takeover procedure*).",
                "references": [
                    "Regulation (EU) No 965/2012 - AMC1 CAT.GEN.MPA.100 Crew resource management",
                    "EASA Guidance Material on Stabilised Approaches & Takeover Procedures"
                ]
            },
            "metadata": { "difficulty": 0.4 }
        },
        {
            "id": "NJ-CRM-005",
            "subject_id": "escenarios-netjets-despacho-crm",
            "learning_objective": "EASA Part-ORO.MLR.105 / Mel Dispatch - Ítems con procedimiento (M) y (O)",
            "stem": "¿Cuál es la diferencia operativa fundamental entre un elemento de la MEL que contiene un procedimiento marcado con (M) y uno marcado con (O)?",
            "options": [
                {
                    "id": "A",
                    "text": "(M) indica un procedimiento de mantenimiento obligatorio que normalmente debe ejecutar personal técnico cualificado antes del vuelo; (O) indica un procedimiento operacional que debe ser ejecutado por la tripulación de vuelo.",
                    "is_correct": True
                },
                {
                    "id": "B",
                    "text": "(M) indica fallo mayor y (O) indica fallo opcional que puede ser ignorado.",
                    "is_correct": False
                },
                {
                    "id": "C",
                    "text": "(M) solo se aplica de noche y (O) se aplica de día en vuelos comerciales.",
                    "is_correct": False
                },
                {
                    "id": "D",
                    "text": "(M) requiere aprobación de la autoridad nacional y (O) de la oficina de control de tráfico aéreo.",
                    "is_correct": False
                }
            ],
            "explanation": {
                "text": "De acuerdo con **Part-ORO.MLR.105** y **CS-MMEL**:\n\n* **Símbolo `(M)` (Maintenance Procedure)**: Indica que se requiere una acción o verificación de mantenimiento específica antes del despacho (e.g., asegurar una válvula, desactivar un freno, colocar un pin o realizar una prueba técnica). Debe ser efectuada por personal de mantenimiento certificado (LMA) a menos que el AFM/MEL autorice tareas específicas a la tripulación debidamente entrenada.\n* **Símbolo `(O)` (Operational Procedure)**: Indica que se requiere un procedimiento operativo específico que debe ser ejecutado por la **tripulación de vuelo** (e.g., ajuste de cálculos de performance, limitación de altitud, comprobación previa en cabina o modificación de configuración de sistemas).",
                "references": [
                    "Regulation (EU) No 965/2012 - Part-ORO.MLR.105 Minimum equipment list",
                    "CS-MMEL.130 MEL operations and maintenance procedures"
                ]
            },
            "metadata": { "difficulty": 0.2 }
        }
    ]

    # Write all bank files
    write_bank_file("combustible-fuel-schemes", "netjets_easa_fuel_schemes.json", fuel_questions)
    write_bank_file("minimos-operacionales-lvo", "netjets_easa_operations_minima.json", minima_questions)
    write_bank_file("tiempos-actividad-descanso-ftl", "netjets_easa_ftl_rest_duty.json", ftl_questions)
    write_bank_file("espacio-rvsm-pbn-lvo", "netjets_easa_rvsm_pbn_spec_ops.json", rvsm_questions)
    write_bank_file("licencias-habilitaciones-aircrew", "netjets_easa_aircrew_regulations.json", aircrew_questions)
    write_bank_file("escenarios-netjets-despacho-crm", "netjets_interview_scenarios_crm.json", crm_questions)

if __name__ == "__main__":
    main()
