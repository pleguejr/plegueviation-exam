#!/usr/bin/env python3
"""
build_banks.py - Compilador de Bancos de Preguntas para Plegueviation Exam
Escanea todos los archivos JSON en 'banks/', valida el esquema, genera índices y empaqueta
el manifiesto y catálogo completo para la app Web PWA (public/banks/).
"""

import sys
import json
from pathlib import Path
from typing import Dict, List, Any
import jsonschema

def get_project_root() -> Path:
    return Path(__file__).resolve().parents[2]

def compile_banks() -> int:
    root = get_project_root()
    banks_dir = root / "banks"
    schema_file = root / "cli" / "schema" / "question.schema.json"
    pwa_banks_dir = root / "apps" / "web-pwa" / "public" / "banks"

    if not schema_file.exists():
        print(f"[FATAL] Schema no encontrado: {schema_file}", file=sys.stderr)
        return 1

    with open(schema_file, 'r', encoding='utf-8') as f:
        schema = json.load(f)

    pwa_banks_dir.mkdir(parents=True, exist_ok=True)

    all_questions: List[Dict[str, Any]] = []
    seen_ids = set()
    errors = 0
    categories_stats: Dict[str, Any] = {}

    # Metadatos limpios y estructurados de categorías
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
        }
    }

    subtopic_labels = {
        # Binter Ops
        "moa": "Manual de Operaciones Parte A (MOA)",
        "mob": "Manual de Operaciones Parte B (MOB)",
        "procedimientos-operativos": "Procedimientos Operativos / SOPs",
        
        # Flotas (Estructura Común)
        "limitaciones": "Limitaciones",
        "operacion-normal": "Operación Normal",
        "emergencias": "Emergencias",
        "memory-items": "Memory Items",
        "sistemas-aeronave": "Sistemas Aeronave",
        "ddpm": "DDPM (Dispatch Deviations)",
        "mel": "MEL (Minimum Equipment List)",

        # Normativa
        "reglas-del-aire-sera": "Reglas del Aire (SERA)",
        "normativa-easa": "Normativa EASA (Part-CAT/ORO/SPA/NCO)",

        # Preparación de Comandante
        "partes-aplicables-moa-mob": "Partes Aplicables MOA / MOB",
        "flujo-despacho-mel-ddpm-cdl": "Flujo de Despacho MEL / DDPM / CDL",
        "gestion-emergencias-mando": "Gestión de Emergencias y Mando",
        "pasajeros-conflictivos": "Pasajeros Conflictivos (Disruptive Pax)",
        "preparacion-planificacion-vuelo": "Preparación y Planificación de Vuelo",
        "procedimientos-operativos-vuelo-tierra": "Procedimientos en Vuelo y en Tierra",
        "mercancias-peligrosas-dgr": "Mercancías Peligrosas (DGR)",
        "notificacion-incidentes": "Notificación de Incidentes (ASR/MOR)",
        "reglas-del-aire-normativa": "Reglas del Aire y Normativa Aeronáutica",
        "performance": "Performance y Límites Operacionales",
        "mnemonicos-flujos-compania": "Mnemónicos y Flujos Binter (RETSE, E-DALTA, IMFLOCC)",
        "preguntas-habituales-examen": "Preguntas Habituales de Examen de Mando"
    }

    print(f"[*] Escaneando bancos en: {banks_dir}")

    for json_file in sorted(banks_dir.rglob("*.json")):
        rel_path = json_file.relative_to(banks_dir)
        parts = rel_path.parts
        category = parts[0] if len(parts) > 1 else "general"
        subtopic = parts[1] if len(parts) > 2 else (parts[0] if len(parts) > 1 else "default")

        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            items = data if isinstance(data, list) else [data]

            for item in items:
                # Validar schema
                jsonschema.validate(instance=item, schema=schema)
                q_id = item["id"]
                if q_id in seen_ids:
                    print(f"[ERROR] ID duplicado '{q_id}' en {json_file}", file=sys.stderr)
                    errors += 1
                seen_ids.add(q_id)

                # Validar exactamente una respuesta correcta
                correct_opts = [opt for opt in item.get("options", []) if opt.get("is_correct") is True]
                if len(correct_opts) != 1:
                    print(f"[ERROR] Pregunta '{q_id}' tiene {len(correct_opts)} opciones correctas (debe tener exactamente 1)", file=sys.stderr)
                    errors += 1

                # Enriquecer metadatos de categoría interna
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

    # Generar manifest.json
    manifest = {
        "app": "Plegueviation Exam",
        "version": "2.0.0",
        "generated_at": str(Path(__file__).stat().st_mtime),
        "total_questions": len(all_questions),
        "categories": list(categories_stats.values())
    }

    manifest_path = pwa_banks_dir / "manifest.json"
    questions_path = pwa_banks_dir / "all_questions.json"

    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

    with open(questions_path, 'w', encoding='utf-8') as f:
        json.dump(all_questions, f, indent=2, ensure_ascii=False)

    print(f"[SUCCESS] {len(all_questions)} reactivos compilados exitosamente.")
    print(f"          - Manifiesto: {manifest_path}")
    print(f"          - Catálogo Completo: {questions_path}")
    return 0

if __name__ == "__main__":
    sys.exit(compile_banks())
