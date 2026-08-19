#!/usr/bin/env python3
"""
import_bank.py - Ingesta y Validación Interactiva para Plegueviation Exam
Permite importar preguntas JSON generadas con Gemini o NotebookLM directamente
validándolas contra el esquema, resolviendo la carpeta destino y compilando el catálogo.

Uso:
  python cli/bin/import_bank.py <archivo.json>
  python cli/bin/import_bank.py --paste (modo interactivo para pegar JSON)
"""

import sys
import os
import json
import re
from pathlib import Path
from typing import Dict, List, Any
import jsonschema

# Mapeo estructurado de subject_id hacia directorios destino
SUBJECT_DIR_MAP = {
    # Binter Ops
    "binter_moa": "banks/binter-ops/moa",
    "binter_mob": "banks/binter-ops/mob",
    "binter_ops": "banks/binter-ops/procedimientos-operativos",
    "binter_sop": "banks/binter-ops/procedimientos-operativos",

    # Embraer 195-E2
    "e195e2_limitations": "banks/fleet-e195e2/limitaciones",
    "e195e2_normal": "banks/fleet-e195e2/operacion-normal",
    "e195e2_emergency": "banks/fleet-e195e2/emergencias",
    "e195e2_memory": "banks/fleet-e195e2/memory-items",
    "e195e2_qrh": "banks/fleet-e195e2/memory-items",
    "e195e2_systems": "banks/fleet-e195e2/sistemas-aeronave",
    "e195e2_ddpm": "banks/fleet-e195e2/ddpm",
    "e195e2_mel": "banks/fleet-e195e2/mel",

    # Cessna 172N
    "c172n_limitations": "banks/fleet-c172n/limitaciones",
    "c172n": "banks/fleet-c172n/limitaciones",
    "c172n_normal": "banks/fleet-c172n/operacion-normal",
    "c172n_emergency": "banks/fleet-c172n/emergencias",
    "c172n_memory": "banks/fleet-c172n/memory-items",
    "c172n_systems": "banks/fleet-c172n/sistemas-aeronave",

    # Tecnam P2010 TDI
    "p2010_limitations": "banks/fleet-p2010tdi/limitaciones",
    "p2010_tdi": "banks/fleet-p2010tdi/limitaciones",
    "p2010_normal": "banks/fleet-p2010tdi/operacion-normal",
    "p2010_emergency": "banks/fleet-p2010tdi/emergencias",
    "p2010_memory": "banks/fleet-p2010tdi/memory-items",
    "p2010_systems": "banks/fleet-p2010tdi/sistemas-aeronave",

    # Normativa EASA & SERA
    "reg_sera": "banks/regulations-easa-sera/reglas-del-aire-sera",
    "reg_easa": "banks/regulations-easa-sera/normativa-easa",
    "easa_part_cat": "banks/regulations-easa-sera/normativa-easa",
    "easa_part_oro": "banks/regulations-easa-sera/normativa-easa",
    "easa_part_spa": "banks/regulations-easa-sera/normativa-easa",

    # Preparación Prueba de Comandante
    "cmd_moa_mob": "banks/command-upgrade/partes-aplicables-moa-mob",
    "cmd_dispatch_mel": "banks/command-upgrade/flujo-despacho-mel-ddpm-cdl",
    "cmd_dispatch": "banks/command-upgrade/flujo-despacho-mel-ddpm-cdl",
    "cmd_emergency": "banks/command-upgrade/gestion-emergencias-mando",
    "cmd_decision": "banks/command-upgrade/gestion-emergencias-mando",
    "cmd_disruptive_pax": "banks/command-upgrade/pasajeros-conflictivos",
    "cmd_flight_planning": "banks/command-upgrade/preparacion-planificacion-vuelo",
    "cmd_flight_ground_ops": "banks/command-upgrade/procedimientos-operativos-vuelo-tierra",
    "cmd_dgr": "banks/command-upgrade/mercancias-peligrosas-dgr",
    "cmd_reporting": "banks/command-upgrade/notificacion-incidentes",
    "cmd_air_law": "banks/command-upgrade/reglas-del-aire-normativa",
    "cmd_performance": "banks/command-upgrade/performance",
    "cmd_mnemonicos": "banks/command-upgrade/mnemonicos-flujos-compania",
    "cmd_habituales": "banks/command-upgrade/preguntas-habituales-examen"
}

def get_project_root() -> Path:
    return Path(__file__).resolve().parents[2]

def clean_json_text(raw_text: str) -> str:
    raw = raw_text.strip()
    match = re.search(r'```(?:json)?\s*([\s\S]*?)\s*```', raw)
    if match:
        return match.group(1).strip()
    return raw

def import_questions(raw_json_str: str, default_subject: str = None) -> int:
    root = get_project_root()
    schema_file = root / "cli" / "schema" / "question.schema.json"
    banks_dir = root / "banks"

    with open(schema_file, 'r', encoding='utf-8') as f:
        schema = json.load(f)

    # 1. Parsear JSON
    clean_text = clean_json_text(raw_json_str)
    try:
        data = json.loads(clean_text)
    except json.JSONDecodeError as e:
        print(f"[ERROR FATAL] JSON inválido: {e}", file=sys.stderr)
        return 1

    items: List[Dict[str, Any]] = data if isinstance(data, list) else [data]

    if not items:
        print("[AVISO] No se encontraron reactivos para importar.")
        return 0

    # 2. Recolectar IDs existentes para prevenir duplicados
    existing_ids = set()
    for jf in banks_dir.rglob("*.json"):
        try:
            with open(jf, 'r', encoding='utf-8') as f:
                content = json.load(f)
                arr = content if isinstance(content, list) else [content]
                for x in arr:
                    if isinstance(x, dict) and "id" in x:
                        existing_ids.add(x["id"])
        except Exception:
            pass

    # 3. Validar y agrupar por directorio
    grouped_items: Dict[str, List[Dict[str, Any]]] = {}
    validation_errors = 0

    for idx, item in enumerate(items, start=1):
        q_id = item.get("id", f"Item #{idx}")
        # Validar con schema
        try:
            jsonschema.validate(instance=item, schema=schema)
        except jsonschema.ValidationError as ve:
            print(f"[ERROR Validación] Pregunta '{q_id}': {ve.message}", file=sys.stderr)
            validation_errors += 1
            continue

        # Validar exactamente 1 opción correcta
        correct_count = sum(1 for opt in item["options"] if opt.get("is_correct") is True)
        if correct_count != 1:
            print(f"[ERROR Opciones] Pregunta '{q_id}': Tiene {correct_count} opciones correctas marcadas (debe tener 1).", file=sys.stderr)
            validation_errors += 1
            continue

        # Verificar ID duplicado
        if item["id"] in existing_ids:
            print(f"[ERROR Duplicado] El ID '{item['id']}' ya existe en los bancos.", file=sys.stderr)
            validation_errors += 1
            continue

        # Determinar directorio destino
        subj = item.get("subject_id") or default_subject or "binter_moa"
        target_subfolder = SUBJECT_DIR_MAP.get(subj, f"banks/custom/{subj}")
        target_dir = root / target_subfolder
        target_dir.mkdir(parents=True, exist_ok=True)

        rel_dir = str(target_dir)
        if rel_dir not in grouped_items:
            grouped_items[rel_dir] = []
        grouped_items[rel_dir].append(item)
        existing_ids.add(item["id"])

    if validation_errors > 0:
        print(f"\n[FATAL] Se encontraron {validation_errors} errores. La importación fue cancelada.", file=sys.stderr)
        return 1

    # 4. Guardar archivos por lote
    total_saved = 0
    for target_dir_str, q_list in grouped_items.items():
        td = Path(target_dir_str)
        batch_num = 1
        while (td / f"batch_{batch_num:02d}.json").exists():
            batch_num += 1
        output_file = td / f"batch_{batch_num:02d}.json"

        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(q_list, f, indent=2, ensure_ascii=False)

        print(f"[OK] Guardadas {len(q_list)} preguntas en: {output_file.relative_to(root)}")
        total_saved += len(q_list)

    print(f"\n[ÉXITO] {total_saved} preguntas importadas correctamente.")

    # 5. Compilar catálogo
    print("[*] Recompilando catálogo para la aplicación web...")
    from build_banks import compile_banks
    compile_banks()
    return 0

def main():
    if len(sys.argv) < 2:
        print("Plegueviation Exam - Ingesta de Reactivos")
        print("Uso:")
        print("  python import_bank.py <ruta_archivo.json>")
        print("  python import_bank.py --paste (para pegar JSON directamente)")
        sys.exit(1)

    arg = sys.argv[1]
    if arg == "--paste":
        print("Pega tu JSON a continuación (termina con Ctrl+Z en Windows o Ctrl+D en Unix + Enter):")
        lines = []
        try:
            while True:
                line = input()
                lines.append(line)
        except EOFError:
            pass
        content = "\n".join(lines)
        sys.exit(import_questions(content))
    else:
        file_path = Path(arg)
        if not file_path.exists():
            print(f"[ERROR] Archivo no encontrado: {file_path}", file=sys.stderr)
            sys.exit(1)
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        sys.exit(import_questions(content))

if __name__ == "__main__":
    main()
