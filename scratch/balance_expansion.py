import json

f = 'banks/command-upgrade/command-course/examen_mando_expansion_tematica.json'
with open(f, 'r', encoding='utf-8') as fh:
    data = json.load(fh)

balanced = {
    'CMD-EXP26-034': {
        'options': [
            {"id": "A", "text": "Aplicar empuje máximo (MAX thrust / TO/GA), seguir la guía de pitch del Flight Director hacia la actitud de escape sin modificar la configuración de flaps ni tren de aterrizaje hasta confirmar la salida segura del fenómeno.", "is_correct": True},
            {"id": "B", "text": "Retraer inmediatamente el tren de aterrizaje y reducir flaps a posición 0 para disminuir la resistencia parásita mientras se acelera en vuelo horizontal.", "is_correct": False},
            {"id": "C", "text": "Reducir palancas de empuje a IDLE para evitar una sobrevelocidad estructural y mantener el régimen de descenso estándar hacia la pista.", "is_correct": False},
            {"id": "D", "text": "Ejecutar un viraje escarpado inmediato de 90 grados hacia el viento relativo desconectando todos los directores de vuelo para evitar la microrráfaga.", "is_correct": False}
        ]
    },
    'CMD-EXP26-039': {
        'options': [
            {"id": "A", "text": "90 kg (200 lb), ya que hasta 3 ítems no conllevan penalización y se deducen 45 kg (100 lb) por cada ítem adicional a partir del cuarto (2 ítems x 45 kg).", "is_correct": True},
            {"id": "B", "text": "225 kg (500 lb), calculados aplicando una deducción lineal acumulada de 45 kg (100 lb) por cada uno de los 5 elementos faltantes desde el primer ítem.", "is_correct": False},
            {"id": "C", "text": "0 kg (sin penalización), ya que cualquier elemento catalogado bajo CDL como individualmente despreciable no genera impacto en peso sin importar la cantidad.", "is_correct": False},
            {"id": "D", "text": "450 kg (1.000 lb), correspondientes a la penalización fija de seguridad requerida por el fabricante al superarse el límite básico de 3 ítems CDL.", "is_correct": False}
        ]
    },
    'CMD-EXP26-042': {
        'options': [
            {"id": "A", "text": "Disponer de un aeropuerto alternativo en ruta por combustible (Fuel ERA) que cumpla con los mínimos de planificación aplicables dentro del círculo de radio correspondiente a lo largo de la ruta.", "is_correct": True},
            {"id": "B", "text": "Que el vuelo tenga una duración de etapa programada inferior a 45 minutos y se opere exclusivamente dentro del espacio aéreo controlado interinsular.", "is_correct": False},
            {"id": "C", "text": "Que la operación se realice como vuelo ferry de posicionamiento sin pasaje a bordo y con autorización expresa del Director de Operaciones.", "is_correct": False},
            {"id": "D", "text": "Que el aeródromo de destino disponga de al menos dos pistas independientes en servicio con aproximaciones de precisión CAT II/III operativas.", "is_correct": False}
        ]
    },
    'CMD-EXP26-049': {
        'options': [
            {"id": "A", "text": "+/- 5 kts respecto de la velocidad deseada (sin tener en cuenta fluctuaciones rápidas por turbulencia) y sin fallos en sistemas relevantes.", "is_correct": True},
            {"id": "B", "text": "+/- 10 kts respecto de la Vapp calculada, admitiéndose desviaciones transitorias de hasta 15 kts si el empuje automático está en modo retard.", "is_correct": False},
            {"id": "C", "text": "+/- 15 kts respecto de la velocidad de aproximación siempre que no se active el sistema Stick Shaker ni se superen los límites de Flap.", "is_correct": False},
            {"id": "D", "text": "Cualquier velocidad estabilizada comprendida entre la Vref de aterrizaje y la velocidad máxima de extensión de flaps (Vfe) para esa configuración.", "is_correct": False}
        ]
    },
    'CMD-EXP26-055': {
        'options': [
            {"id": "A", "text": "Un viento de 25 kt durante el viraje y un alabeo medio de 20° o un régimen de 3° por segundo (lo que requiera menor alabeo).", "is_correct": True},
            {"id": "B", "text": "Viento en calma en toda el área protegida y un alabeo fijo estándar de 25° mantenido a velocidad constante de aproximación.", "is_correct": False},
            {"id": "C", "text": "Un viento constante de 15 kt en cola durante el tramo base y un ángulo de alabeo máximo limitado a 15° por seguridad de pasaje.", "is_correct": False},
            {"id": "D", "text": "Un viento de 40 kt de componente cruzada y un alabeo continuo de 30° para minimizar el radio de giro sobre obstáculos.", "is_correct": False}
        ]
    },
    'CMD-EXP26-057': {
        'options': [
            {"id": "A", "text": "Mediante una pesada cada 4 años, o cuando las modificaciones en el registro superen el 0,5% de la masa máxima de aterrizaje (MLM) o el 0,5% de la cuerda media aerodinámica (%MAC).", "is_correct": True},
            {"id": "B", "text": "Mediante una pesada anual obligatoria en hangar, o cuando las reparaciones estructurales acumuladas superen los 250 kg de masa seca.", "is_correct": False},
            {"id": "C", "text": "Mediante pesada cada 2 años para reactores y 3 años para turbohélices, o tras cualquier cambio de motor o unidad de potencia auxiliar.", "is_correct": False},
            {"id": "D", "text": "Únicamente tras la realización de una gran parada de mantenimiento (C-Check) o cuando la aeronave se someta a un repintado completo de fuselaje.", "is_correct": False}
        ]
    },
    'CMD-EXP26-060': {
        'options': [
            {"id": "A", "text": "Comprobar que las cantidades de aceite hayan sido controladas al menos una vez en los últimos dos días por personal de mantenimiento a través de la entrada correspondiente en el Libro Técnico de Vuelo (ATL).", "is_correct": True},
            {"id": "B", "text": "Realizar una inspección visual directa con varilla en cada motor durante la escala intermedia antes de autorizar el cierre de compuertas.", "is_correct": False},
            {"id": "C", "text": "Efectuar el rellenado manual de los depósitos de lubricante antes del primer despegue del día anotando los litros exactos en la hoja de carga.", "is_correct": False},
            {"id": "D", "text": "Calcular el consumo horario teórico en base al tiempo de vuelo previsto y descontarlo de la capacidad nominal registrada en el manual de vuelo.", "is_correct": False}
        ]
    },
    'CMD-EXP26-061': {
        'options': [
            {"id": "A", "text": "Cumplimentar las casillas CAT II/III del ATL marcando con 'x' la casilla S (simulada), anotar 'Satisfactorio' en Observaciones, rellenar el formulario 'CAT II/III Status' para mantenimiento e informar vía ACARS mediante el formato 'POST FLIGHT REPORT'.", "is_correct": True},
            {"id": "B", "text": "Notificar verbalmente el resultado positivo a la frecuencia de coordinación de rampa de la escala y registrar únicamente las horas de vuelo en el sistema EFB.", "is_correct": False},
            {"id": "C", "text": "Emitir y firmar un Certificado de Aptitud para el Servicio (CRS) operacional provisional en el libro técnico en sustitución del técnico de mantenimiento.", "is_correct": False},
            {"id": "D", "text": "Solicitar a la autoridad aeronáutica (AESA) una inspección presencial en rampa antes de poder despachar nuevamente el avión para vuelos en baja visibilidad.", "is_correct": False}
        ]
    },
    'CMD-EXP26-064': {
        'options': [
            {"id": "A", "text": "Hasta 2 horas en tripulación estándar (o hasta 3 horas en tripulación aumentada con descanso en vuelo).", "is_correct": True},
            {"id": "B", "text": "Hasta 4 horas de prolongación para cualquier composición de tripulación previa autorización verbal del CCO.", "is_correct": False},
            {"id": "C", "text": "Máximo 45 minutos si el vuelo de regreso es el último sector de la serie y no existen tráficos en espera.", "is_correct": False},
            {"id": "D", "text": "Hasta 1 hora exclusivamente en vuelos diurnos que no incluyan cruces de sectores nocturnos (WN4).", "is_correct": False}
        ]
    },
    'CMD-EXP26-065': {
        'options': [
            {"id": "A", "text": "Desconectar los circuitos de alimentación de los registradores (o no reactivarlos tras el corte de motores) para preservar las grabaciones y evitar su sobreescritura, poniéndolos bajo custodia de la autoridad investigadora (CIAIAC/AESA).", "is_correct": True},
            {"id": "B", "text": "Rebobinar y borrar inmediatamente las pistas de audio de cabina antes de abandonar el avión para salvaguardar la privacidad de la tripulación técnica.", "is_correct": False},
            {"id": "C", "text": "Desmontar manualmente las unidades de memoria blindadas de la cola del avión y trasladarlas en mano a la sede central de la aerolínea.", "is_correct": False},
            {"id": "D", "text": "Mantener todos los generadores y bombas eléctricas activados durante la escala para que los micrófonos de ambiente continúen registrando el sonido en tierra.", "is_correct": False}
        ]
    }
}

for item in data:
    if item['id'] in balanced:
        item['options'] = balanced[item['id']]['options']

with open(f, 'w', encoding='utf-8') as fh:
    json.dump(data, fh, ensure_ascii=False, indent=2)

print('Successfully balanced distractors in examen_mando_expansion_tematica.json!')
