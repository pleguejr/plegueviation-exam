import glob
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

banks = glob.glob('banks/**/*.json', recursive=True)
ignored = {'deleted_questions.json', 'questions_for_review.json', 'package.json', 'user_backup_070707.json'}

patterns = [
    'manteniendo el cumplimiento de las limitaciones',
    'requiriendo autorización expresa del comandante y verificación',
    'siempre que se notifique previamente a la autoridad competente',
    'autorización expresa del comandante y verificación de pesos',
    'notifique previamente a la autoridad competente y al cco'
]

hits = []
for f in banks:
    if os.path.basename(f) in ignored: continue
    with open(f, 'r', encoding='utf-8') as fh:
        data = json.load(fh)
    items = data if isinstance(data, list) else [data]
    for item in items:
        qid = item.get('id')
        for opt in item.get('options', []):
            t = opt.get('text', '').lower()
            for p in patterns:
                if p in t:
                    hits.append((f, qid, opt.get('id'), opt.get('text'), p))

print(f"Total occurrences of boilerplates: {len(hits)}")
for h in hits:
    print(f"File: {os.path.basename(h[0])} | ID: {h[1]} | Opt {h[2]}: {h[3]}")
