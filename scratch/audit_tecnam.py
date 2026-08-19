import json
import glob

files = glob.glob('banks/fleet-p2010tdi/**/*.json', recursive=True)
for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        qs = json.load(fp)
    print(f"=== {f} ({len(qs)} questions) ===")
    for q in qs:
        corr = [o for o in q['options'] if o['is_correct']][0]
        print(f"[{q['id']}] {q['learning_objective']}")
        print(f"   Correct: {corr['text']}")
        print(f"   Ref: {q['explanation']['references']}")
        print()
