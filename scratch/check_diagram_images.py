import re
import os

with open('apps/web-pwa/src/data/procedureCardsData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

images = re.findall(r'diagramImage:\s*[\'"]([^\'"]+)[\'"]', content)
print(f'Total diagram images in procedureCardsData: {len(images)}')
missing = []
for img in images:
    img_clean = img.lstrip('./').lstrip('/')
    pwa_path = os.path.join('apps', 'web-pwa', 'public', img_clean)
    if not os.path.exists(pwa_path):
        missing.append((img, pwa_path))

print(f'Missing diagram images: {len(missing)}')
for m in missing:
    print('   -', m)
