#!/usr/bin/env python3
"""
build_banks.py - Compilador de Bancos de Preguntas para Plegueviation Exam
Escanea todos los archivos JSON en 'banks/', valida la integridad de los reactivos y empaqueta
el manifiesto y catálogo completo para la app Web PWA (public/banks/).
Funciona en cualquier entorno con la biblioteca estándar de Python.
"""

import sys
import json
from pathlib import Path
from typing import Dict, List, Any

try:
    import jsonschema
    HAS_JSONSCHEMA = True
except ImportError:
    HAS_JSONSCHEMA = False

def get_project_root() -> Path:
    return Path(__file__).resolve().parents[2]

def validate_question_structure(item: Dict[str, Any]) -> List[str]:
    """Validación nativa de estructura sin dependencias externas."""
    errors = []
    required_fields = ["id", "subject_id", "learning_objective", "stem", "options", "explanation"]
    for field in required_fields:
        if field not in item:
            errors.append(f"Campo obligatorio faltante '{field}'")

    options = item.get("options", [])
    if not isinstance(options, list) or len(options) < 2:
        errors.append("Debe contener una lista de al menos 2 opciones")
    else:
        correct_count = sum(1 for opt in options if opt.get("is_correct") is True)
        if correct_count != 1:
            errors.append(f"Debe tener exactamente 1 opción correcta (encontradas {correct_count})")

    return errors

def compile_banks() -> int:
    root = get_project_root()
    banks_dir = root / "banks"
    schema_file = root / "cli" / "schema" / "question.schema.json"
    pwa_banks_dir = root / "apps" / "web-pwa" / "public" / "banks"

    schema = None
    if HAS_JSONSCHEMA and schema_file.exists():
        try:
            with open(schema_file, 'r', encoding='utf-8') as f:
                schema = json.load(f)
        except Exception:
            pass

    pwa_banks_dir.mkdir(parents=True, exist_ok=True)

    all_questions: List[Dict[str, Any]] = []
    seen_ids = set()
    errors = 0
    categories_stats: Dict[str, Any] = {}

    category_labels = {
        "binter-ops": {
            "title": "Binter Ops (MOA, MOB y Proc. Operativos)", 
            "icon": "PlaneTakeoff", 
            "color": "emerald"
        },
        "fleet-e195e2": {
            "title": "Flota Embraer 195-E2", 
            "icon": "Plane", 
            "color": "sky"
        },
        "fleet-c172n": {
            "title": "Flota Cessna 172N", 
            "icon": "Compass", 
            "color": "amber"
        },
        "fleet-p2010tdi": {
            "title": "Flota Tecnam P2010 TDI", 
            "icon": "Gauge", 
            "color": "indigo"
        },
        "regulations-easa-sera": {
            "title": "Normativa EASA & SERA", 
            "icon": "BookOpen", 
            "color": "violet"
        },
        "command-upgrade": {
            "title": "Preparación Prueba de Comandante", 
            "icon": "ShieldCheck", 
            "color": "rose"
        },
        "simulador-e2": {
            "title": "Simulador E2", 
            "icon": "Cpu", 
            "color": "sky"
        }
    }

    subtopic_labels = {
        "moa": "Manual de Operaciones Parte A (MOA)",
        "mob": "Manual de Operaciones Parte B (MOB)",
        "procedimientos-operativos": "Procedimientos Operativos / SOPs",
        "limitaciones": "Limitaciones",
        "operacion-normal": "Operación Normal",
        "emergencias": "Emergencias",
        "memory-items": "Memory Items",
        "sistemas-aeronave": "Sistemas Aeronave",
        "ddpm": "DDPM (Dispatch Deviations)",
        "mel": "MEL (Minimum Equipment List)",
        "reglas-del-aire-sera": "Reglas del Aire (SERA)",
        "normativa-easa": "Normativa EASA (Part-CAT/ORO/SPA/NCO)",
        "partes-aplicables-moa-mob": "Partes Aplicables MOA / MOB",
        "flujo-despacho-mel-ddpm-cdl": "Flujo de Despacho MEL / DDPM / CDL",
        "gestion-emergencias-mando": "Gestión de Emergencias y Mando",
        "examen-oficial": "Examen Oficial de Mando (FOR-ENT-006)",
        "pasajeros-conflictivos": "Pasajeros Conflictivos (Disruptive Pax)",
        "preparacion-planificacion-vuelo": "Preparación y Planificación de Vuelo",
        "procedimientos-operativos-vuelo-tierra": "Procedimientos en Vuelo y en Tierra",
        "mercancias-peligrosas-dgr": "Mercancías Peligrosas (DGR)",
        "notificacion-incidentes": "Notificación de Incidentes (ASR/MOR)",
        "reglas-del-aire-normativa": "Reglas del Aire y Normativa Aeronáutica",
        "performance": "Performance y Límites Operacionales",
        "mnemonicos-flujos-compania": "Mnemónicos y Flujos Binter (RETSE, E-DALTA, IMFLOCC)",
        "preguntas-habituales-examen": "Preguntas Habituales de Examen de Mando",
        "mercancias-peligrosas-y-seguridad": "Mercancías Peligrosas y Seguridad (MOA 9 y 10)",
        "operaciones-en-tierra": "Operaciones en Tierra y Rampa (MOA 8.2)",
        "operaciones-especiales": "Operaciones Especiales y Requisitos (MOA 8.7 y 8.8)",
        "procedimientos-de-vuelo": "Procedimientos de Vuelo y LVO (MOA 8.3 y 8.4)",
        "seguridad-y-normativa": "Seguridad, SMS y Normativa SERA (MOA 11 y 12)",
        "memory-items-e2": "Memory Items (Simulador E2)",
        "limitaciones-y-numeros": "Limitaciones y Números Operacionales (E2)",
        "conocimiento-operacional": "Conocimiento Operacional & Procedimientos (E2)"
    }

    print(f"[*] Escaneando bancos en: {banks_dir}")

    deleted_file = banks_dir / "deleted_questions.json"
    deleted_ids = set()
    if deleted_file.exists():
        try:
            with open(deleted_file, 'r', encoding='utf-8') as f:
                del_data = json.load(f)
            if isinstance(del_data, list):
                for d in del_data:
                    if isinstance(d, dict):
                        if "id" in d:
                            deleted_ids.add(d["id"])
                        elif "question" in d and isinstance(d["question"], dict) and "id" in d["question"]:
                            deleted_ids.add(d["question"]["id"])
            if deleted_ids:
                print(f"[*] {len(deleted_ids)} preguntas marcadas como eliminadas en {deleted_file.name} serán excluidas.")
        except Exception as e:
            print(f"[AVISO] Error leyendo deleted_questions.json: {e}")

    if banks_dir.exists():
        for json_file in sorted(banks_dir.rglob("*.json")):
            if json_file.name == "deleted_questions.json":
                continue
            rel_path = json_file.relative_to(banks_dir)
            parts = rel_path.parts
            category = parts[0] if len(parts) > 1 else "general"
            subtopic = parts[1] if len(parts) > 2 else (parts[0] if len(parts) > 1 else "default")

            try:
                with open(json_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                items = data if isinstance(data, list) else [data]

                for item in items:
                    q_id = item.get("id")
                    if q_id in deleted_ids:
                        continue

                    if schema and HAS_JSONSCHEMA:
                        jsonschema.validate(instance=item, schema=schema)
                    else:
                        struct_errors = validate_question_structure(item)
                        if struct_errors:
                            for err_msg in struct_errors:
                                print(f"[ERROR] {err_msg} en {json_file}", file=sys.stderr)
                            errors += len(struct_errors)

                    q_id = item.get("id")
                    if q_id in seen_ids:
                        print(f"[ERROR] ID duplicado '{q_id}' en {json_file}", file=sys.stderr)
                        errors += 1
                    if q_id:
                        seen_ids.add(q_id)

                    item["_category"] = category
                    item["_subtopic"] = subtopic
                    all_questions.append(item)

                    if category not in categories_stats:
                        cat_info = category_labels.get(category, {
                            "title": category.replace("-", " ").title(), 
                            "icon": "Folder", 
                            "color": "blue"
                        })
                        categories_stats[category] = {
                            "id": category,
                            "title": cat_info["title"],
                            "icon": cat_info["icon"],
                            "color": cat_info["color"],
                            "total_questions": 0,
                            "subtopics": {}
                        }

                    categories_stats[category]["total_questions"] += 1
                    
                    if subtopic not in categories_stats[category]["subtopics"]:
                        st_title = subtopic_labels.get(subtopic, subtopic.replace("-", " ").title())
                        categories_stats[category]["subtopics"][subtopic] = {
                            "id": subtopic,
                            "title": st_title,
                            "count": 0
                        }
                    categories_stats[category]["subtopics"][subtopic]["count"] += 1

            except Exception as e:
                print(f"[FAIL] Error leyendo {json_file}: {e}", file=sys.stderr)
                errors += 1

    if errors > 0:
        print(f"[RESULT] Compilación abortada con {errors} errores.", file=sys.stderr)
        return 1

    manifest = {
        "app": "Plegueviation Exam",
        "version": "2.0.0",
        "generated_at": str(Path(__file__).stat().st_mtime),
        "total_questions": len(all_questions),
        "categories": list(categories_stats.values())
    }

    manifest_path = pwa_banks_dir / "manifest.json"
    questions_path = pwa_banks_dir / "all_questions.json"
    pwa_deleted_path = pwa_banks_dir / "deleted_questions.json"

    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

    with open(questions_path, 'w', encoding='utf-8') as f:
        json.dump(all_questions, f, indent=2, ensure_ascii=False)

    if deleted_file.exists():
        import shutil
        shutil.copyfile(deleted_file, pwa_deleted_path)

    print(f"[SUCCESS] {len(all_questions)} reactivos compilados exitosamente.")
    return 0

if __name__ == "__main__":
    sys.exit(compile_banks())
