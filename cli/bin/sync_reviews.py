#!/usr/bin/env python3
"""
sync_reviews.py - Sincroniza automáticamente las solicitudes de revisión técnica 
reportadas desde el iPad, iPhone o PC en la nube con el catálogo maestro local.
"""

import sys
import json
import ssl
import urllib.request
from pathlib import Path

def sync_cloud_reviews(pin='plegue'):
    root = Path(__file__).resolve().parent.parent.parent
    review_file = root / 'banks' / 'questions_for_review.json'
    
    url = f"https://plegueviation-exam.vercel.app/api/sync?pin={pin}"
    print(f"[*] Consultando solicitudes de revision en la nube (PIN: {pin})...")
    
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    
    cloud_reviews = []
    try:
        req = urllib.request.Request(
            url, 
            headers={
                'User-Agent': 'Plegueviation-CLI/2.0',
                'Accept': 'application/json'
            }
        )
        with urllib.request.urlopen(req, context=ctx, timeout=8) as response:
            if response.status == 200:
                body = json.loads(response.read().decode('utf-8'))
                if body.get('found') and body.get('data'):
                    data = body['data']
                    if 'reviewRequests' in data and isinstance(data['veviewRequests'], list):
                        cloud_reviews = data['reviewRequests']
    except Exception as e:
        print(f"[AVISO] No se pudo conectar con la nube ({e}). Usando base local.")
        
    local_reviews = []
    if review_file.exists():
        try:
            local_reviews = json.loads(review_file.read_text(encoding='utf-8'))
            if not isinstance(local_reviews, list):
                local_reviews = []
        except Exception:
            local_reviews = []
            
    combined_map = {}
    for r in local_reviews:
        rid = r.get('id') or r.get('questionId')
        if rid:
            combined_map[rid] = r
            
    for r in cloud_reviews:
        rid = r.get('id') or r.get('questionId')
        if rid:
            combined_map[rid] = r
            
    final_list = list(combined_map.values())
    review_file.write_text(json.dumps(final_list, indent=2, ensure_ascii=False), encoding='utf-8')
    print(f"[SUCCESS] {len(final_list)} solicitudes de revision registradas en {review_file.name}.")
    return final_list

if __name__ == '__main__':
    pin_arg = sys.argv[1] if len(sys.argv) > 1 else 'plegue'
    sync_cloud_reviews(pin_arg)
