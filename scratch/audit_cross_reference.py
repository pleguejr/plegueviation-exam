import json
import glob
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

banks = glob.glob('banks/**/*.json', recursive=True)
ignored = {'deleted_questions.json', 'questions_for_review.json', 'package.json', 'user_backup_070707.json'}

checks = [
    {
        'name': 'Masa Adulto Varón (88 kg)',
        'pattern': r'(?:adulto\s+var[oó]n|male\s+passenger|pasajero\s+masculino).*?(\d{2,3})\s*kg',
        'expected': '88',
        'exclude': ['chárter', 'charter', '75', '82']
    },
    {
        'name': 'Masa Adulto Mujer (70 kg)',
        'pattern': r'(?:adulto\s+mujer|female\s+passenger|pasajera\s+femenina).*?(\d{2,3})\s*kg',
        'expected': '70',
        'exclude': ['chárter', 'charter', '64']
    },
    {
        'name': 'Masa Adulto Indistinto / All Adult (84 kg)',
        'pattern': r'(?:all\s+adult|adulto\s+indistinto|ambos\s+sexos).*?(\d{2,3})\s*kg',
        'expected': '84',
        'exclude': ['chárter', 'charter', '78']
    },
    {
        'name': 'Densidad Jet A-1 (0,79 o 0.79 kg/L)',
        'pattern': r'densidad.*?(?:jet\s*a-?1|combustible).*?(\d+[.,]\d+)\s*kg/l',
        'expected': ['0.79', '0,79'],
        'exclude': []
    },
    {
        'name': 'Vle Embraer 195-E2 (265 KIAS)',
        'pattern': r'(?:vle|velocidad\s+máxima\s+con\s+tren\s+extendido).*?(\d{3})\s*(?:kt|kias|nudos)',
        'expected': '265',
        'exclude': ['c172', 'p2010']
    },
    {
        'name': 'Vlo Extensión Tren E2 (250 KIAS)',
        'pattern': r'(?:vlo\s+ext|extensi[oó]n\s+del\s+tren).*?(\d{3})\s*(?:kt|kias|nudos)',
        'expected': '250',
        'exclude': ['c172', 'p2010']
    },
    {
        'name': 'Vlo Retracción Tren E2 (220 KIAS)',
        'pattern': r'(?:vlo\s+ret|retracci[oó]n\s+del\s+tren).*?(\d{3})\s*(?:kt|kias|nudos)',
        'expected': '220',
        'exclude': ['c172', 'p2010']
    }
]

print("=== AUDITORÍA CRUZADA DE PARÁMETROS OPERACIONALES Y VALORES NUMÉRICOS ===")
findings = []
for f in banks:
    if any(x in f for x in ignored): continue
    with open(f, 'r', encoding='utf-8') as fh:
        data = json.load(fh)
    items = data if isinstance(data, list) else [data]
    for item in items:
        qid = item.get('id')
        correct_opts = [o for o in item.get('options', []) if o.get('is_correct') is True]
        if not correct_opts: continue
        c_text = correct_opts[0].get('text', '')
        stem = item.get('stem', '')
        full_text = f"{stem} {c_text}"
        
        # Check specific known parameters
        if 'masa estándar' in full_text.lower() or 'peso estándar' in full_text.lower():
            if 'varón' in full_text.lower() and '88' not in full_text and '83' not in full_text:
                findings.append((f, qid, 'Masa varón no estándar (falta 88 kg o 83 kg charter)', full_text[:120]))
            if 'tripulante de vuelo' in full_text.lower() and '85' not in full_text:
                findings.append((f, qid, 'Masa tripulante técnico no estándar (falta 85 kg)', full_text[:120]))
            if 'tripulante de cabina' in full_text.lower() and '75' not in full_text:
                findings.append((f, qid, 'Masa TCP no estándar (falta 75 kg)', full_text[:120]))

print(f"Total inconsistencias numéricas detectadas: {len(findings)}")
for fd in findings:
    print(f"File: {fd[0]} | ID: {fd[1]} | {fd[2]}")
