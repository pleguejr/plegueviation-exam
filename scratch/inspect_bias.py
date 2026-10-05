import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

f = 'banks/command-upgrade/command-course/examen_mando_expansion_tematica.json'
with open(f, 'r', encoding='utf-8') as fh:
    data = json.load(fh)

for item in data:
    qid = item['id']
    opts = item.get('options', [])
    c_opts = [o for o in opts if o.get('is_correct') is True]
    w_opts = [o for o in opts if o.get('is_correct') is False]
    if c_opts and w_opts:
        c_len = len(c_opts[0]['text'])
        w_avg = sum(len(w['text']) for w in w_opts) / len(w_opts)
        if w_avg > 15 and c_len > 2.8 * w_avg:
            print('='*50)
            print(f"ID: {qid} (Correct: {c_len} chars vs Distractors avg: {w_avg:.0f} chars)")
            print(f"Stem: {item['stem']}")
            for o in opts:
                print(f"  [{o['id']}] ({o.get('is_correct')}): {o['text']}")
