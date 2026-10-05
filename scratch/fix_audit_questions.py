import json

# 1. Update examen_mando_binter_p51_100.json
f1 = 'banks/command-upgrade/command-course/examen_mando_binter_p51_100.json'
with open(f1, 'r', encoding='utf-8') as fh:
    data1 = json.load(fh)

for item in data1:
    if item['id'] == 'CMD-EXAM-060':
        item['stem'] = "¿Cuáles son las limitaciones reglamentarias sobre el consumo de alcohol para los miembros de la tripulación técnica y de cabina según el MOA?"
        item['options'] = [
            {"id": "A", "text": "Prohibido el consumo durante las 12 horas previas a la hora de presentación (con recomendación de 24 horas) y tasa máxima de 0,0 g/l en sangre durante el servicio.", "is_correct": True},
            {"id": "B", "text": "Prohibido el consumo durante las 8 horas previas a la presentación, permitiéndose una tasa máxima residual de 0,2 g/l al inicio del servicio.", "is_correct": False},
            {"id": "C", "text": "Prohibido el consumo durante las 24 horas previas exclusivamente para vuelos de noche, con límite de 0,1 g/l para vuelos diurnos.", "is_correct": False},
            {"id": "D", "text": "Prohibido únicamente durante el período de vuelo efectivo, debiendo estar por debajo de 0,4 g/l en el momento del despegue.", "is_correct": False}
        ]
        item['explanation']['text'] = "El MOA Cap. 6 prohíbe taxativamente el consumo de bebidas alcohólicas dentro de las 12 horas previas a la presentación (recomendando 24 horas) y exige tolerancia cero (0,0 g/l en sangre) durante todo el período de servicio."
    elif item['id'] == 'CMD-EXAM-068':
        item['stem'] = "¿Qué consecuencia inmediata y significado operacional tiene la radiotransmisión de la llamada de socorro 'MAYDAY, MAYDAY, MAYDAY FUEL'?"
        item['options'] = [
            {"id": "A", "text": "Informa a ATC de una situación de urgencia que requiere prioridad condicional solo si existen otros tráficos en el circuito de espera.", "is_correct": False},
            {"id": "B", "text": "Solicita una autorización de espera técnica de 15 minutos en el fijo de aproximación inicial antes de iniciar el descenso.", "is_correct": False},
            {"id": "C", "text": "Declara un estado oficial de EMERGENCIA y otorga prioridad absoluta e inmediata de aproximación y aterrizaje para evitar aterrizar con menos de la Reserva Final.", "is_correct": True},
            {"id": "D", "text": "Comunica al CCO la necesidad de modificar el plan de vuelo operacional sin requerir asistencia prioritaria de los servicios ATS.", "is_correct": False}
        ]
    elif item['id'] == 'CMD-EXAM-073':
        item['stem'] = "Según la normativa operacional y el MOA, el piloto no puede continuar una aproximación por debajo de la DA/H o MDA/H a no ser que mantenga contacto visual con referencias de la pista. ¿Cuál de las siguientes agrupaciones de referencias visuales es válida?"
        item['options'] = [
            {"id": "A", "text": "Únicamente las luces del sistema PAPI o VASI, requiriendo contacto visual con la manga de viento antes del umbral.", "is_correct": False},
            {"id": "B", "text": "Elementos del sistema de luces de aproximación, el umbral de pista (sus marcas o luces), la zona de toma de contacto (sus marcas o luces), o las luces de borde de pista.", "is_correct": True},
            {"id": "C", "text": "Exclusivamente la iluminación de la plataforma y los edificios terminales adyacentes a la pista de aterrizaje.", "is_correct": False},
            {"id": "D", "text": "Las luces de calle de rodaje de salida rápida y los letreros de señalización vertical de pista únicamente.", "is_correct": False}
        ]

with open(f1, 'w', encoding='utf-8') as fh:
    json.dump(data1, fh, ensure_ascii=False, indent=2)

# 2. Update moa_operaciones_despacho_profundizacion.json
f2 = 'banks/command-upgrade/partes-aplicables-moa-mob/moa_operaciones_despacho_profundizacion.json'
with open(f2, 'r', encoding='utf-8') as fh:
    data2 = json.load(fh)

for item in data2:
    if item['id'] == 'CMD-MOA-023':
        item['stem'] = "En el transporte de animales domésticos en cabina de pasaje (PETC) en la operativa de Binter, ¿cuáles son los límites reglamentarios aplicables?"
        item['options'] = [
            {"id": "A", "text": "Máximo 2 contenedores por avión en total, peso máximo 10 kg con transportín y solo 1 animal por recipiente sin excepción.", "is_correct": False},
            {"id": "B", "text": "Máximo 6 contenedores por avión (máx. 2 por sección con 1 fila libre de separación salvo convivientes), peso máx. 8 kg incluido transportín, y hasta 3 animales de la misma camada por recipiente.", "is_correct": True},
            {"id": "C", "text": "Máximo 10 contenedores por avión ubicados libremente en cualquier fila, peso máximo 12 kg y sin límite de animales por contenedor.", "is_correct": False},
            {"id": "D", "text": "Máximo 4 contenedores situados exclusivamente en filas de salida de emergencia, peso máximo 6 kg y autorización previa de sanidad exterior.", "is_correct": False}
        ]

with open(f2, 'w', encoding='utf-8') as fh:
    json.dump(data2, fh, ensure_ascii=False, indent=2)

# 3. Update moa_8_1_7_combustible_aerodromos_minimos.json
f3 = 'banks/command-upgrade/preparacion-planificacion-vuelo/moa_8_1_7_combustible_aerodromos_minimos.json'
with open(f3, 'r', encoding='utf-8') as fh:
    data3 = json.load(fh)

for item in data3:
    if item['id'] == 'CMD-MOA-AER-004':
        item['stem'] = "¿Cuáles son los tres (3) requisitos operativos obligatorios que Binter Airlines debe cumplir para poder aplicar los Mínimos de Planificación del 'Plan Básico con Variaciones' (Tabla 1A) según el MOA 8.1.7.2.5?"
        item['options'] = [
            {"id": "A", "text": "1) Flight Monitoring (seguimiento operacional continuo), 2) Aprobación LVO (Operaciones en Baja Visibilidad), y 3) Sistema automático de planificación de vuelos certificado.", "is_correct": True},
            {"id": "B", "text": "1) Aprobación ETOPS 120 minutos, 2) Flota equipada con radar RDR-4000, y 3) Despachador de vuelo a bordo en cada tramo interinsular.", "is_correct": False},
            {"id": "C", "text": "1) Notificación previa a AESA con 24 horas de antelación, 2) Dos tripulaciones técnicas completas, y 3) Carta de vientos de alta cota impresa.", "is_correct": False},
            {"id": "D", "text": "1) Exclusividad de operaciones diurnas, 2) Pistas de longitud superior a 2.500 metros, y 3) Asistencia de handling propia en todas las escalas.", "is_correct": False}
        ]

with open(f3, 'w', encoding='utf-8') as fh:
    json.dump(data3, fh, ensure_ascii=False, indent=2)

# 4. Update e195e2_despacho_sistemas_profundizacion.json
f4 = 'banks/command-upgrade/flujo-despacho-mel-ddpm-cdl/e195e2_despacho_sistemas_profundizacion.json'
with open(f4, 'r', encoding='utf-8') as fh:
    data4 = json.load(fh)

updates_f4 = {
    'CMD-E2-001': {
        'stem': "En la arquitectura motopropulsora del Embraer 195-E2 con motores Pratt & Whitney PW1900G Geared Turbofan (GTF), ¿qué función técnica desempeña la caja reductora Fan Drive Gear System (FDGS)?",
        'options': [
            {"id": "A", "text": "Conecta directamente el eje de alta presión (N2) con la bomba de combustible de alta presión para eliminar la caja de accesorios mecánica.", "is_correct": False},
            {"id": "B", "text": "Desacopla el compresor de alta presión de la turbina de baja presión durante la reversa para evitar sobrepresiones en el difusor.", "is_correct": False},
            {"id": "C", "text": "Desacopla la velocidad del Fan frontal y de la turbina de baja presión (ratio ~3:1), permitiendo al Fan girar a menor velocidad óptima y a la turbina a alto régimen de máxima eficiencia.", "is_correct": True},
            {"id": "D", "text": "Regula la apertura de los alabes variables del estator (VSV) para sincronizar el empuje entre ambos motores en crucero.", "is_correct": False}
        ]
    },
    'CMD-E2-008': {
        'stem': "En el sistema de mandos de vuelo Fly-by-Wire (FBW) del Embraer 195-E2, ¿cuál es la diferencia fundamental entre el Modo Normal y el Modo Directo de los Flight Control Modules (FCM)?",
        'options': [
            {"id": "A", "text": "En Modo Normal los mandos actúan mediante cables mecánicos de acero y en Modo Directo mediante señales analógicas electrohidráulicas.", "is_correct": False},
            {"id": "B", "text": "En Modo Normal los FCMs proporcionan protección activa de envolvente de vuelo (alta/baja velocidad, alabeo y factor de carga), mientras que en Modo Directo los actuadores responden directamente a las órdenes de palanca sin protecciones de envolvente.", "is_correct": True},
            {"id": "C", "text": "En Modo Normal solo se controlan los alerones y en Modo Directo se transfiere el mando exclusivo a los spoilers multifunción.", "is_correct": False},
            {"id": "D", "text": "En Modo Normal el piloto automático está permanentemente bloqueado en ON y en Modo Directo se requiere desconexión del FADEC.", "is_correct": False}
        ]
    },
    'CMD-E2-018': {
        'stem': "En el Embraer 195-E2, ¿en qué condiciones operacionales de pista o del sistema de frenos NO está recomendado o permitido el uso del sistema Autobrake para el aterrizaje?",
        'options': [
            {"id": "A", "text": "En aproximaciones con viento cruzado superior a 10 nudos o con temperaturas exteriores superiores a 30°C.", "is_correct": False},
            {"id": "B", "text": "Únicamente en pistas secas con longitud superior a 3.000 metros donde se deba maximizar el rodaje libre.", "is_correct": False},
            {"id": "C", "text": "En pistas contaminadas con agarre impredecible, cuando el sistema de antiskid esté inoperativo o cuando existan fallos en los sensores de velocidad de rueda.", "is_correct": True},
            {"id": "D", "text": "Siempre que se aterrice con configuración de Flap 5 en lugar de Flap Full.", "is_correct": False}
        ]
    },
    'CMD-E2-024': {
        'stem': "En la aviónica Honeywell Primus Epic 2 del Embraer 195-E2, ¿qué función proporciona el sistema de Visión Sintética (SVS) en el Primary Flight Display (PFD)?",
        'options': [
            {"id": "A", "text": "Muestra una imagen térmica en tiempo real captada por una cámara infrarroja instalada en el cono de morro del avión.", "is_correct": False},
            {"id": "B", "text": "Presenta una representación gráfica tridimensional en tiempo real del terreno, obstáculos, pistas y entorno exterior basada en la base de datos topográfica y la posición GPS/IRS.", "is_correct": True},
            {"id": "C", "text": "Sustituye la indicación barométrica de altitud por una lectura radar en todas las fases de vuelo por encima de FL100.", "is_correct": False},
            {"id": "D", "text": "Proyecta las cartas de navegación de aproximación Jeppesen superpuestas sobre el horizonte artificial analógico.", "is_correct": False}
        ]
    },
    'CMD-E2-033': {
        'stem': "Según el MOA 8.2.1.3 y los procedimientos de Binter, ¿qué requisitos de seguridad deben cumplirse obligatoriamente durante el repostaje de combustible con pasajeros embarcando, a bordo o desembarcando?",
        'options': [
            {"id": "A", "text": "Todos los pasajeros deben permanecer de pie en el pasillo central y la tripulación técnica debe abandonar la cabina de vuelo.", "is_correct": False},
            {"id": "B", "text": "Las luces de cabina deben apagarse totalmente y los motores deben mantenerse al ralentí para alimentar las bombas eléctricas de achique.", "is_correct": False},
            {"id": "C", "text": "Tripulación y pasaje informados, señal de no fumar encendida, cinturones desabrochados, pasillos despejados, salidas principales expeditas con medios de evacuación listos y enlace de comunicación tierra-cabina establecido.", "is_correct": True},
            {"id": "D", "text": "Únicamente se permite el repostaje con pasaje si la cantidad a cargar es inferior a 500 kg de Jet A-1 y se dispone de un camión de bomberos al costado del ala.", "is_correct": False}
        ]
    },
    'CMD-E2-034': {
        'stem': "¿Qué elementos sensores y tomas de datos de aire disponen de calefacción eléctrica automática permanente (Electrical Ice Protection) en el Embraer 195-E2?",
        'options': [
            {"id": "A", "text": "Únicamente las luces de aterrizaje y las antenas de comunicaciones VHF.", "is_correct": False},
            {"id": "B", "text": "Las sondas inteligentes ADSP (tubos Pitot y tomas estáticas integradas), las sondas de ángulo de ataque (AOA) y los sensores TAT (Total Air Temperature).", "is_correct": True},
            {"id": "C", "text": "Exclusivamente el borde de ataque del estabilizador vertical y los limpiaparabrisas.", "is_correct": False},
            {"id": "D", "text": "Las llantas del tren principal y las tomas de llenado de combustible de los planos.", "is_correct": False}
        ]
    },
    'CMD-E2-037': {
        'stem': "En la operación del radar meteorológico Honeywell RDR-4000 con tecnología 3D Volumetric Scanning en el E195-E2, ¿cuál es su característica principal de funcionamiento?",
        'options': [
            {"id": "A", "text": "Requiere que el piloto ajuste manualmente la inclinación de la antena (Tilt) en cada nivel de vuelo cada 5 minutos.", "is_correct": False},
            {"id": "B", "text": "Escanea automáticamente el volumen atmosférico frontal de 0 a 60.000 ft, almacena la reflectividad en memoria 3D y genera vistas de tormentas, cizalladura predictiva y turbulencia sin ajuste manual continuo de Tilt.", "is_correct": True},
            {"id": "C", "text": "Solo detecta nubes de tipo estratus y niebla en superficie a menos de 5 millas náuticas.", "is_correct": False},
            {"id": "D", "text": "Emite señales continuas en banda X exclusivamente durante el carreteo en tierra para evitar interferencias en vuelo.", "is_correct": False}
        ]
    },
    'CMD-E2-038': {
        'stem': "¿Qué fases de vuelo y perfiles operacionales están incluidos reglamentariamente en el cálculo del combustible de reserva para desvío a alternativo (Alternate Fuel)?",
        'options': [
            {"id": "A", "text": "Solo el crucero en línea recta desde el punto de desvío hasta el umbral del alternativo al nivel de vuelo actual.", "is_correct": False},
            {"id": "B", "text": "Frustrada en destino desde la DA/MDA, ascenso en ruta, crucero a altitud óptima, descenso, aproximación instrumental completa y aterrizaje en el aeródromo alternativo seleccionado.", "is_correct": True},
            {"id": "C", "text": "Una espera fija de 45 minutos sobre el VOR del alternativo a 1.500 ft sobre el terreno sin incluir aproximación.", "is_correct": False},
            {"id": "D", "text": "El rodaje de regreso a la plataforma de origen más una reserva contingente del 10%.", "is_correct": False}
        ]
    },
    'CMD-E2-040': {
        'stem': "Durante la ejecución del procedimiento de descenso de emergencia (Emergency Descent) en el Embraer 195-E2, ¿cuál es la configuración de vuelo requerida?",
        'options': [
            {"id": "A", "text": "Palancas de gases a máxima potencia TO/GA, Flaps en posición 5 y tren de aterrizaje abajo para frenar la caída.", "is_correct": False},
            {"id": "B", "text": "Palancas de gases en crucero, aerofrenos retraídos y viraje escarpado constante de 45° de alabeo.", "is_correct": False},
            {"id": "C", "text": "Gases al 50% de N1, velocidad mantenida en Vfe y descenso suave a 500 ft/min.", "is_correct": False},
            {"id": "D", "text": "Palancas de potencia en IDLE, Speed Brakes completamente desplegados (FULL OPEN), velocidad ajustada a Vmo/Mmo (o velocidad apropiada si hay daño estructural) y descenso hacia 10.000 ft o la MEA/MORA más alta.", "is_correct": True}
        ]
    },
    'CMD-E2-043': {
        'stem': "¿Cuál es la política operacional y autoridad del Comandante respecto a la adición de combustible discrecional ('Extra Fuel') según el MOA?",
        'options': [
            {"id": "A", "text": "El Comandante no puede modificar la cantidad de combustible calculada por el sistema automático de despacho bajo ninguna circunstancia.", "is_correct": False},
            {"id": "B", "text": "Requiere autorización escrita previa del Director de Operaciones con al menos 2 horas de antelación al vuelo.", "is_correct": False},
            {"id": "C", "text": "El Comandante tiene la potestad y autoridad de añadir combustible adicional justificado por meteorología adversa, esperas previstas, contingencias operacionales o limitaciones de aeródromo.", "is_correct": True},
            {"id": "D", "text": "Solo se puede añadir combustible extra si el peso al despegue está por debajo del 50% del MTOW.", "is_correct": False}
        ]
    },
    'CMD-E2-048': {
        'stem': "En la arquitectura de comunicaciones por enlace de datos (Data Link / CPDLC / ACARS) del Embraer 195-E2, ¿qué capacidades operativas proporciona a la tripulación?",
        'options': [
            {"id": "A", "text": "Sustituye la radiobaliza ELT de emergencia mediante transmisión satelital continua de la voz de cabina.", "is_correct": False},
            {"id": "B", "text": "Transmite video en alta definición de la cabina de pasaje al centro de mantenimiento cada 10 minutos.", "is_correct": False},
            {"id": "C", "text": "Permite el control remoto de los mandos de vuelo por parte del despachador de guardia en caso de incapacitación.", "is_correct": False},
            {"id": "D", "text": "Permite la recepción de planes de vuelo y autorizaciones DCL, partes D-ATIS/METAR, comunicaciones ATS por texto (CPDLC) y reportes automáticos de eventos operacionales y de mantenimiento (OOOI / ACARS) a la compañía.", "is_correct": True}
        ]
    }
}

for item in data4:
    if item['id'] in updates_f4:
        u = updates_f4[item['id']]
        item['stem'] = u['stem']
        item['options'] = u['options']

with open(f4, 'w', encoding='utf-8') as fh:
    json.dump(data4, fh, ensure_ascii=False, indent=2)

print('Successfully updated all 16 questions!')
