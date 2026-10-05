import glob
import json
import os
import random
import hashlib
from collections import Counter

banks = glob.glob('banks/**/*.json', recursive=True)
ignored = {'deleted_questions.json', 'questions_for_review.json', 'package.json', 'user_backup_070707.json'}

total_shuffled = 0
new_key_dist = Counter()

for f in banks:
    fname = os.path.basename(f)
    if fname in ignored or fname.startswith('user_backup'):
        continue
    try:
        with open(f, 'r', encoding='utf-8') as fh:
            data = json.load(fh)
        items = data if isinstance(data, list) else [data]
        modified = False
        
        for item in items:
            qid = item.get('id', '')
            options = item.get('options', [])
            if not options or len(options) < 2:
                continue
            
            # Deterministic seed based on question ID
            seed = int(hashlib.md5(qid.encode('utf-8')).hexdigest(), 16)
            rng = random.Random(seed)
            
            # Shuffle options
            shuffled = list(options)
            rng.shuffle(shuffled)
            
            # Reassign letter IDs
            letters = ['A', 'B', 'C', 'D', 'E', 'F']
            for idx, opt in enumerate(shuffled):
                opt['id'] = letters[idx] if idx < len(letters) else chr(65 + idx)
                if opt.get('is_correct') is True:
                    new_key_dist[opt['id']] += 1
            
            item['options'] = shuffled
            total_shuffled += 1
            modified = True
            
        if modified:
            with open(f, 'w', encoding='utf-8') as fh:
                json.dump(items if isinstance(data, list) else items[0], fh, ensure_ascii=False, indent=2)

    except Exception as e:
        print(f"Error in {f}: {e}")

print(f"Total questions shuffled: {total_shuffled}")
print("New Global Answer Key Distribution:")
for k, cnt in sorted(new_key_dist.items()):
    pct = (cnt / total_shuffled) * 100 if total_shuffled > 0 else 0
    print(f"  Option {k}: {cnt:5d} ({pct:5.1f}%)")
