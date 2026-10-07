import glob
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

banks = glob.glob('banks/**/*.json', recursive=True)
ignored = {'deleted_questions.json', 'questions_for_review.json', 'package.json', 'user_backup_070707.json'}

target_ids = {
    'CMD-EXAM-051', 'P2010-SPD-003',
    'CMD-E2-012', 'CMD-EXAM-062', 'CMD-MOA-FTL-010',
    'P2010-EMG-017', 'P2010-LIM-022', 'P2010-PERF-003', 'P2010-PERF-013', 'P2010-PERF-017', 'P2010-SEC4-005'
}

found_items = {}
for f in banks:
    if os.path.basename(f) in ignored: continue
    try:
        with open(f, 'r', encoding='utf-8') as fh:
            data = json.load(fh)
        items = data if isinstance(data, list) else [data]
        for item in items:
            qid = item.get('id')
            if qid in target_ids:
                found_items[qid] = (f, item)
    except Exception as e:
        pass

print(f"Total target questions found: {len(found_items)}")
for qid in sorted(target_ids):
    if qid in found_items:
        fpath, item = found_items[qid]
        print("="*60)
        print(f"ID: {qid} | File: {os.path.basename(fpath)}")
        print(f"Stem: {item.get('stem')}")
        for opt in item.get('options', []):
            corr = " [CORRECTA]" if opt.get('is_correct') else ""
            print(f"   [{opt.get('id')}]{corr}: {opt.get('text')}")
        print(f"Explanation: {item.get('explanation', {}).get('text')}")
        print(f"References: {item.get('explanation', {}).get('references')}")
    else:
        print(f"ID: {qid} -> NO ENCONTRADO EN BANCOS ACTIVOS")
