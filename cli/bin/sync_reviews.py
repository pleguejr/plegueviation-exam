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

def sync_cloud_reviews(pin='070707'):
    root = Path(__file__).resolve().parent.parent.parent
    review_file = root / 'banks' / 'questions_for_review.json'
    
    pins_to_check = [pin] if pin != '070707' else ['070707', 'plegue']
    cloud_reviews = []
    
    ctx = ssl.create_default_context()
    
    for p in pins_to_check:
        url = "https://plegueviation-exam.vercel.app/api/sync"
        print(f"[*] Consultando solicitudes de revision en la nube (PIN: {p})...")
        try:
            body = json.dumps({
                "action": "fetch",
                "pin": p,
                "bootstrap": False
            }).encode("utf-8")
            req = urllib.request.Request(
                url,
                data=body,
                method="POST",
                headers={
                    "User-Agent": "Plegueviation-CLI/3.2",
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            )
            with urllib.request.urlopen(req, context=ctx, timeout=12) as response:
                if response.status == 200:
                    payload = json.loads(response.read().decode('utf-8'))
                    if payload.get('found') and payload.get('data'):
                        data = payload['data']
                        if 'reviewRequests' in data and isinstance(data['reviewRequests'], list):
                            cloud_reviews.extend(data['reviewRequests'])
                        print(f"    backend={payload.get('storageBackend', 'unknown')}")
        except Exception as e:
            print(f"[AVISO] No se pudo conectar con la nube para PIN {p} ({e}). Usando base local.")
        
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
    pin_arg = sys.argv[1] if len(sys.argv) > 1 else '070707'
    sync_cloud_reviews(pin_arg)
