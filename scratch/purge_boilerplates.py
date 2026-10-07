import glob
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

banks = glob.glob('banks/**/*.json', recursive=True)
ignored = {'deleted_questions.json', 'questions_for_review.json', 'package.json', 'user_backup_070707.json'}

patterns_to_strip = [
    ', manteniendo el cumplimiento de las limitaciones operacionales del manual',
    ', requiriendo autorización expresa del comandante y verificación de pesos',
    ', siempre que se notifique previamente a la autoridad competente y al CCO',
    ', siempre que se notifique previamente a la autoridad competente y al cco',
    ', requiriendo autorización expresa del comandante y verificación',
    ', sin que ello exima de la responsabilidad del operador',
    'manteniendo el cumplimiento de las limitaciones operacionales del manual',
    'requiriendo autorización expresa del comandante y verificación de pesos',
    'siempre que se notifique previamente a la autoridad competente y al CCO'
]

total_cleaned = 0
affected_files = set()

for f in banks:
    fname = os.path.basename(f)
    if fname in ignored or fname.startswith('user_backup'):
        continue
    try:
        with open(f, 'r', encoding='utf-8') as fh:
            data = json.load(fh)
        items = data if isinstance(data, list) else [data]
        file_modified = False
        
        for item in items:
            for opt in item.get('options', []):
                orig_text = opt.get('text', '')
                new_text = orig_text
                for p in patterns_to_strip:
                    if p in new_text:
                        new_text = new_text.replace(p, '').strip()
                        # Clean any trailing commas or double spaces
                        new_text = new_text.rstrip(',').rstrip('.').strip()
                        if not new_text.endswith('.'):
                            new_text += '.'
                
                if new_text != orig_text:
                    opt['text'] = new_text
                    total_cleaned += 1
                    file_modified = True
                    affected_files.add(f)
                    
        if file_modified:
            with open(f, 'w', encoding='utf-8') as fh:
                json.dump(items if isinstance(data, list) else items[0], fh, ensure_ascii=False, indent=2)

    except Exception as e:
        print(f"Error processing {f}: {e}")

print(f"Total options cleaned: {total_cleaned} across {len(affected_files)} files!")
for af in sorted(affected_files):
    print(f"  - {af}")
