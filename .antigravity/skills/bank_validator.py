import sys
import json
from pathlib import Path
import jsonschema

def validate(banks_dir: str, schema_file: str) -> int:
    s_path = Path(schema_file)
    b_path = Path(banks_dir)
    
    if not s_path.exists() or not b_path.exists():
        print(f"[FATAL] Rutas no encontradas: {schema_file} o {banks_dir}", file=sys.stderr)
        return 1

    with open(s_path, 'r', encoding='utf-8') as f:
        schema = json.load(f)

    seen_ids = set()
    errors = 0

    for json_file in b_path.rglob("*.json"):
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            items = data if isinstance(data, list) else [data]
            for item in items:
                jsonschema.validate(instance=item, schema=schema)
                q_id = item["id"]
                if q_id in seen_ids:
                    print(f"[ERROR] ID duplicado '{q_id}' en {json_file}", file=sys.stderr)
                    errors += 1
                seen_ids.add(q_id)
        except Exception as e:
            print(f"[FAIL] {json_file}: {e}", file=sys.stderr)
            errors += 1

    if errors > 0:
        print(f"[RESULT] Validación de Plegueviation Exam fallida ({errors} errores).", file=sys.stderr)
        return 1

    print(f"[SUCCESS] {len(seen_ids)} reactivos de Plegueviation Exam validados correctamente.")
    return 0

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Uso: python bank_validator.py <banks_dir> <schema_path>")
        sys.exit(1)
    sys.exit(validate(sys.argv[1], sys.argv[2]))
