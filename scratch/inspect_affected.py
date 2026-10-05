import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

def show(fpath, qids):
    with open(fpath, 'r', encoding='utf-8') as fh:
        data = json.load(fh)
    items = [x for x in (data if isinstance(data, list) else [data]) if x.get('id') in qids]
    for it in items:
        print('='*60)
        print(f"FILE: {fpath} | ID: {it['id']}")
        print(f"Stem: {it['stem']}")
        for opt in it.get('options', []):
            print(f"  [{opt['id']}] (Correct: {opt.get('is_correct')}): {opt['text']}")
        print(f"Explanation: {it.get('explanation', {}).get('text', '')}")

show('banks/command-upgrade/command-course/examen_mando_binter_p51_100.json', ['CMD-EXAM-060', 'CMD-EXAM-068', 'CMD-EXAM-073'])
show('banks/command-upgrade/partes-aplicables-moa-mob/moa_operaciones_despacho_profundizacion.json', ['CMD-MOA-023'])
show('banks/command-upgrade/preparacion-planificacion-vuelo/moa_8_1_7_combustible_aerodromos_minimos.json', ['CMD-MOA-AER-004'])
