import glob
import json
import os
import sys
from collections import Counter
import difflib

sys.stdout.reconfigure(encoding='utf-8')

banks = glob.glob('banks/**/*.json', recursive=True)
ignored = {'deleted_questions.json', 'questions_for_review.json', 'package.json', 'user_backup_070707.json'}

total_questions = 0
key_distribution = Counter()
bank_key_dist = {}
stem_duplicates = []
all_stems = {}
formatting_issues = []
empty_fields = []

for f in banks:
    fname = os.path.basename(f)
    if fname in ignored or fname.startswith('user_backup'):
        continue
    try:
        with open(f, 'r', encoding='utf-8') as fh:
            data = json.load(fh)
        items = data if isinstance(data, list) else [data]
        bank_key_dist[f] = Counter()
        for item in items:
            total_questions += 1
            qid = item.get('id', 'MISSING_ID')
            stem = item.get('stem', '').strip()
            
            # Check empty fields
            if not stem:
                empty_fields.append((f, qid, 'Stem vacío'))
            if not item.get('learning_objective'):
                empty_fields.append((f, qid, 'Learning objective vacío'))
            if not item.get('explanation', {}).get('text'):
                empty_fields.append((f, qid, 'Explanation text vacía'))
                
            # Check options and correct answer
            opts = item.get('options', [])
            for opt in opts:
                if opt.get('is_correct') is True:
                    opt_id = opt.get('id', 'UNKNOWN')
                    key_distribution[opt_id] += 1
                    bank_key_dist[f][opt_id] += 1
                    
            # Check HTML / Broken formatting
            for text_val in [stem, item.get('explanation', {}).get('text', '')] + [o.get('text', '') for o in opts]:
                if '<script' in text_val.lower() or '<style' in text_val.lower():
                    formatting_issues.append((f, qid, 'Etiqueta HTML peligrosa encontrada'))
                    
            # Check stem duplication / near-duplication
            norm_stem = ' '.join(stem.lower().split())
            if norm_stem in all_stems:
                stem_duplicates.append((f, qid, all_stems[norm_stem], stem[:80]))
            else:
                all_stems[norm_stem] = (f, qid)

    except Exception as e:
        formatting_issues.append((f, 'FILE_ERROR', str(e)))

print(f"============================================================")
print(f"📊 INFORME DE AUDITORÍA AVANZADA ({total_questions} PREGUNTAS ACTIVAS)")
print(f"============================================================")

print(f"\n1. DISTRIBUCIÓN GLOBAL DE RESPUESTAS CORRECTAS (ANSWER KEY):")
for k, count in sorted(key_distribution.items()):
    pct = (count / total_questions) * 100 if total_questions > 0 else 0
    print(f"   Opción {k}: {count:5d} ({pct:5.1f}%)")

print(f"\n2. PREGUNTAS CON CAMPOS VACÍOS: {len(empty_fields)}")
for ef in empty_fields[:10]:
    print(f"   - {ef}")

print(f"\n3. PROBLEMAS DE FORMATO / ETIQUETAS: {len(formatting_issues)}")
for fi in formatting_issues[:10]:
    print(f"   - {fi}")

print(f"\n4. PREGUNTAS CON ENUNCIADOS IDÉNTICOS ENTRE BANCOS: {len(stem_duplicates)}")
for sd in stem_duplicates[:15]:
    print(f"   - [{sd[1]} en {os.path.basename(sd[0])}] DUPLICADO DE [{sd[2][1]} en {os.path.basename(sd[2][0])}]: \"{sd[3]}...\"")

# Check banks with heavily skewed answer key (> 70% in a single option)
skewed_banks = []
for b, dist in bank_key_dist.items():
    b_total = sum(dist.values())
    if b_total >= 10:
        for opt, cnt in dist.items():
            if (cnt / b_total) >= 0.70:
                skewed_banks.append((b, opt, cnt, b_total, (cnt/b_total)*100))

print(f"\n5. BANCOS CON SESGO EXCESIVO EN OPCIÓN CORRECTA (>70% en una misma letra): {len(skewed_banks)}")
for sb in skewed_banks[:10]:
    print(f"   - {os.path.basename(sb[0])}: {sb[4]:.1f}% opción {sb[1]} ({sb[2]}/{sb[3]})")
