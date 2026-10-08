#!/usr/bin/env python3
"""
enrich_explanations_with_crops.py
Recorre los bancos de preguntas, localiza las referencias oficiales en los PDFs de 'manuales/',
extrae la cita literal del manual, genera un recorte visual PNG a 200 DPI y actualiza la explicación.
Optimizado con caché en memoria para indexación ultrarrápida.
"""

import os
import re
import json
import logging
from pathlib import Path
from typing import Dict, List, Optional, Tuple, Any

import pymupdf

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")

ROOT_DIR = Path(__file__).resolve().parents[2]
MANUALS_DIR = ROOT_DIR / "manuales"
BANKS_DIR = ROOT_DIR / "banks"
CROPS_OUTPUT_DIR = ROOT_DIR / "apps" / "web-pwa" / "public" / "manual-crops"

# Mapeo de categorías a PDFs principales y secundarios
MANUAL_MAPPINGS = {
    "command-upgrade": [
        "MOA BinterCanarias ED06 RN27 RT00.pdf",
        "MOB BinterCanarias ED06 RN27 RT00.pdf",
        "QRH-6313-174-REV20-TABLET.PDF"
    ],
    "binter-ops": [
        "MOA BinterCanarias ED06 RN27 RT00.pdf",
        "MOB BinterCanarias ED06 RN27 RT00.pdf"
    ],
    "simulador-e2": [
        "QRH-6313-174-REV20-TABLET.PDF",
        "SOPM-1755-200-REV14-FULL_1760451613050.PDF",
        "AOM-5875-174-REV12-FULL_compressed.pdf"
    ],
    "fleet-e195e2": [
        "QRH-6313-174-REV20-TABLET.PDF",
        "AOM-5875-174-REV12-FULL_compressed.pdf",
        "AFM-5693-174-REV25-FULL.PDF",
        "MTM.pdf",
        "MEL EMB BA RN24.pdf",
        "DDPM-6130-100-REV TR7.1.PDF"
    ],
    "fleet-c172n": [
        "Cessna-172N-POH-1978.pdf",
        "Analisis_maniobras_C172N.pdf",
        "C-172N_mini.pdf"
    ],
    "fleet-p2010tdi": [
        "AFM P2010 TDI - Ed.2 Rev.13.pdf",
        "procedimientos_tecnam_p2010tdi.pdf",
        "tecnam_p2010tdi_briefing_specs.pdf",
        "G1000 NXi.pdf"
    ],
    "netjets-interview": [
        "4E4220_2026-03-27_19.46.27_EAR-for-Air-Operations_0.pdf",
        "CEB6F1_2025-11-25_18.35.47_EAR-for-Aircrew-Regulation_0.pdf"
    ],
    "regulations-easa-sera": [
        "4E4220_2026-03-27_19.46.27_EAR-for-Air-Operations_0.pdf",
        "CEB6F1_2025-11-25_18.35.47_EAR-for-Aircrew-Regulation_0.pdf"
    ]
}

OPENED_DOCS: Dict[str, pymupdf.Document] = {}
DOC_PAGES_TEXT: Dict[str, List[Tuple[str, str]]] = {} # (raw_text, norm_text)

def normalize_text(text: str) -> str:
    t = text.lower()
    t = re.sub(r'[áàäâ]', 'a', t)
    t = re.sub(r'[éèëê]', 'e', t)
    t = re.sub(r'[íìïî]', 'i', t)
    t = re.sub(r'[óòöô]', 'o', t)
    t = re.sub(r'[úùüû]', 'u', t)
    t = re.sub(r'ñ', 'n', t)
    t = re.sub(r'[^a-z0-9\s]', ' ', t)
    return ' '.join(t.split())

def get_doc_and_cache(pdf_filename: str) -> Optional[Tuple[pymupdf.Document, List[Tuple[str, str]]]]:
    if pdf_filename in OPENED_DOCS and pdf_filename in DOC_PAGES_TEXT:
        return OPENED_DOCS[pdf_filename], DOC_PAGES_TEXT[pdf_filename]
    
    pdf_path = MANUALS_DIR / pdf_filename
    if not pdf_path.exists():
        return None
    try:
        doc = pymupdf.open(str(pdf_path))
        OPENED_DOCS[pdf_filename] = doc
        
        # Pre-extraer texto de todas las páginas para búsqueda instantánea
        pages_data = []
        for p in doc:
            raw = p.get_text()
            norm = normalize_text(raw)
            pages_data.append((raw, norm))
        
        DOC_PAGES_TEXT[pdf_filename] = pages_data
        return doc, pages_data
    except Exception as e:
        logging.error(f"Error cargando PDF {pdf_path}: {e}")
        return None

def extract_section_numbers(ref_str: str) -> List[str]:
    matches = re.findall(r'[0-9]+(?:\.[0-9]+)+(?:\.[0-9]+)*', ref_str)
    easa_matches = re.findall(r'[A-Z]{3,4}\.[A-Z]{2,4}\.[A-Z]{3,4}\.[0-9]{3,4}', ref_str)
    return matches + easa_matches

def clean_paragraph_text(raw_text: str) -> str:
    lines = [l.strip() for l in raw_text.split('\n') if l.strip()]
    cleaned = []
    for l in lines:
        if l.startswith("Manual de Operaciones") or l.startswith("NOTA: Este documento") or l.startswith("Pág."):
            continue
        cleaned.append(l)
    return ' '.join(cleaned)

def find_evidence_in_cached_doc(
    doc: pymupdf.Document,
    pages_data: List[Tuple[str, str]],
    doc_name: str,
    sections: List[str],
    keywords: List[str],
    correct_option_text: str
) -> Optional[Dict[str, Any]]:
    correct_clean = normalize_text(correct_option_text)
    kw_clean = [normalize_text(k) for k in keywords if len(k) > 3]

    # Estrategia 1: Coincidencia de número de sección exacto
    for sec in sections:
        sec_norm = normalize_text(sec)
        for page_num, (raw_text, norm_text) in enumerate(pages_data):
            if sec_norm in norm_text:
                has_kw = any(k in norm_text for k in kw_clean)
                if has_kw or len(kw_clean) == 0:
                    page = doc[page_num]
                    rects = page.search_for(sec)
                    if rects:
                        r = rects[0]
                        crop_rect = pymupdf.Rect(
                            30,
                            max(20, r.y0 - 25),
                            page.rect.width - 30,
                            min(page.rect.height - 20, r.y0 + 260)
                        )
                        region_text = page.get_text("text", clip=crop_rect)
                        return {
                            "doc_name": doc_name,
                            "page_num": page_num,
                            "crop_rect": crop_rect,
                            "literal_text": clean_paragraph_text(region_text) or clean_paragraph_text(raw_text[:400])
                        }

    # Estrategia 2: Búsqueda de frase de la respuesta correcta
    if len(correct_clean) > 10:
        words = correct_clean.split()
        for i in range(max(1, len(words) - 3)):
            phrase = ' '.join(words[i:i+4])
            if len(phrase) > 12:
                for page_num, (raw_text, norm_text) in enumerate(pages_data):
                    if phrase in norm_text:
                        page = doc[page_num]
                        # buscar la frase o una de las palabras
                        rects = page.search_for(words[i])
                        if rects:
                            r = rects[0]
                            crop_rect = pymupdf.Rect(
                                30,
                                max(20, r.y0 - 30),
                                page.rect.width - 30,
                                min(page.rect.height - 20, r.y0 + 260)
                            )
                            region_text = page.get_text("text", clip=crop_rect)
                            return {
                                "doc_name": doc_name,
                                "page_num": page_num,
                                "crop_rect": crop_rect,
                                "literal_text": clean_paragraph_text(region_text)
                            }

    # Estrategia 3: Densidad de keywords
    best_page = None
    best_score = 0

    for page_num, (raw_text, norm_text) in enumerate(pages_data):
        score = sum(2 for k in kw_clean if k in norm_text)
        if any(w in norm_text for w in correct_clean.split() if len(w) > 4):
            score += 1
        if score > best_score and score >= 3:
            best_score = score
            best_page = page_num

    if best_page is not None:
        page = doc[best_page]
        best_rect = None
        for k in kw_clean:
            r_list = page.search_for(k)
            if r_list:
                r = r_list[0]
                best_rect = pymupdf.Rect(
                    30,
                    max(20, r.y0 - 30),
                    page.rect.width - 30,
                    min(page.rect.height - 20, r.y0 + 260)
                )
                break
        if not best_rect:
            best_rect = pymupdf.Rect(30, 80, page.rect.width - 30, min(page.rect.height - 50, 400))

        region_text = page.get_text("text", clip=best_rect)
        return {
            "doc_name": doc_name,
            "page_num": best_page,
            "crop_rect": best_rect,
            "literal_text": clean_paragraph_text(region_text)
        }

    return None

def process_question(
    q: Dict[str, Any],
    bank_category: str
) -> bool:
    q_id = q.get("id", "UNKNOWN")
    explanation = q.get("explanation", {})
    existing_text = explanation.get("text", "")
    references = explanation.get("references", [])
    
    # Comprobar si ya tiene bloque de extracto
    if "> 📖 **Extracto Literal del Manual" in existing_text:
        return False

    options = q.get("options", [])
    correct_opt = next((opt.get("text", "") for opt in options if opt.get("is_correct")), "")
    stem = q.get("stem", "")
    learning_obj = q.get("learning_objective", "")

    all_ref_text = " ".join(references) + " " + learning_obj
    sections = extract_section_numbers(all_ref_text)
    
    keywords = re.findall(r'[a-zA-ZáéíóúÁÉÍÓÚñÑ]{4,}', stem + " " + correct_opt)
    stopwords = {"cual", "donde", "cuando", "como", "sobre", "entre", "para", "este", "esta", "estos", "estas", "segun", "indica", "senale", "opcion", "correcta", "incorrecta"}
    keywords = [kw for kw in keywords if kw.lower() not in stopwords]

    candidate_manuals = MANUAL_MAPPINGS.get(bank_category, MANUAL_MAPPINGS["command-upgrade"])
    
    evidence = None
    for man_file in candidate_manuals:
        doc_cached = get_doc_and_cache(man_file)
        if not doc_cached:
            continue
        doc, pages_data = doc_cached
        evidence = find_evidence_in_cached_doc(doc, pages_data, man_file, sections, keywords, correct_opt)
        if evidence:
            break

    if not evidence:
        return False

    crop_filename = f"{q_id}.png"
    crop_rel_path = f"./manual-crops/{bank_category}/{crop_filename}"
    crop_full_path = CROPS_OUTPUT_DIR / bank_category / crop_filename
    
    doc_cached = get_doc_and_cache(evidence["doc_name"])
    if doc_cached:
        doc, _ = doc_cached
        page = doc[evidence["page_num"]]
        crop_full_path.parent.mkdir(parents=True, exist_ok=True)
        pix = page.get_pixmap(clip=evidence["crop_rect"], dpi=200)
        pix.save(str(crop_full_path))

    literal = evidence["literal_text"]
    if len(literal) > 500:
        literal = literal[:497] + "..."

    ref_title = references[0] if references else evidence["doc_name"]

    new_explanation_parts = []
    clean_existing = existing_text.split("> 📖 **Extracto")[0].strip()
    if clean_existing:
        new_explanation_parts.append(clean_existing)

    new_explanation_parts.append(f"\n> 📖 **Extracto Literal del Manual — {ref_title} (Pág. {evidence['page_num'] + 1}):**\n> \"{literal}\"")
    new_explanation_parts.append(f"\n![Recorte Oficial del Manual — {ref_title}]({crop_rel_path})")

    q["explanation"]["text"] = "\n".join(new_explanation_parts)
    return True

def process_all_banks():
    json_files = list(BANKS_DIR.rglob("*.json"))
    logging.info(f"Iniciando procesamiento acelerado de {len(json_files)} bancos de preguntas...")

    total_enriched = 0
    total_questions = 0

    for json_file in json_files:
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                questions = json.load(f)

            if not isinstance(questions, list):
                continue

            rel_parts = json_file.relative_to(BANKS_DIR).parts
            bank_category = rel_parts[0] if len(rel_parts) > 0 else "command-upgrade"

            modified = False
            for q in questions:
                total_questions += 1
                if process_question(q, bank_category):
                    total_enriched += 1
                    modified = True

            if modified:
                with open(json_file, 'w', encoding='utf-8') as f:
                    json.dump(questions, f, ensure_ascii=False, indent=2)
                logging.info(f"Actualizado banco: {json_file.name}")

        except Exception as e:
            logging.error(f"Error procesando {json_file}: {e}")

    logging.info(f"PROCESO COMPLETADO: {total_enriched}/{total_questions} preguntas enriquecidas con citas y recortes visuales.")

if __name__ == "__main__":
    process_all_banks()
