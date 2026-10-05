# -*- coding: utf-8 -*-
import json
import os

BASE_DIR = r"c:\Users\plegu\My Drive\Antigravity\Plegueviation exam\banks\netjets-interview"

# =========================================================================
# 1. historia-evolucion-netjets (20 items)
# =========================================================================
from build_all_english_banks import historia

# =========================================================================
# 2. combustible-fuel-schemes (20 items)
# =========================================================================
from build_all_7_english_banks import fuel
from expand_netjets_english_all import fuel_more

fuel_all = fuel + fuel_more
# Ensure IDs are unique
seen_f = set()
fuel_clean = []
for q in fuel_all:
    if q["id"] not in seen_f:
        seen_f.add(q["id"])
        fuel_clean.append(q)

# =========================================================================
# 3. minimos-operacionales-lvo (15 items)
# =========================================================================
from build_full_netjets_catalog_en import minimos
from expand_netjets_english_all import min_more

min_all = minimos + min_more
seen_m = set()
min_clean = []
for q in min_all:
    if q["id"] not in seen_m:
        seen_m.add(q["id"])
        min_clean.append(q)

# =========================================================================
# 4. tiempos-actividad-descanso-ftl (15 items)
# =========================================================================
from generate_all_7_subtopics_en import ftl
from expand_netjets_english_all import ftl_more

ftl_all = ftl + ftl_more
seen_ftl = set()
ftl_clean = []
for q in ftl_all:
    if q["id"] not in seen_ftl:
        seen_ftl.add(q["id"])
        ftl_clean.append(q)

# =========================================================================
# 5. espacio-rvsm-pbn-lvo (13 items)
# =========================================================================
from generate_subtopics_5_6_7_en import rvsm
from expand_netjets_english_all import rvsm_more

rvsm_all = rvsm + rvsm_more
seen_r = set()
rvsm_clean = []
for q in rvsm_all:
    if q["id"] not in seen_r:
        seen_r.add(q["id"])
        rvsm_clean.append(q)

# =========================================================================
# 6. licencias-habilitaciones-aircrew (12 items)
# =========================================================================
from generate_subtopics_6_7_en import aircrew
from expand_netjets_english_all import crew_more

crew_all = aircrew + crew_more
seen_c = set()
crew_clean = []
for q in crew_all:
    if q["id"] not in seen_c:
        seen_c.add(q["id"])
        crew_clean.append(q)

# =========================================================================
# 7. escenarios-netjets-despacho-crm (15 items)
# =========================================================================
from generate_subtopic_7_crm_en import crm
from expand_netjets_english_all import crm_more

crm_all = crm + crm_more
seen_crm = set()
crm_clean = []
for q in crm_all:
    if q["id"] not in seen_crm:
        seen_crm.add(q["id"])
        crm_clean.append(q)

# Write all clean files
banks = {
    ("historia-evolucion-netjets", "netjets_historia_creacion_evolucion.json"): historia,
    ("combustible-fuel-schemes", "netjets_easa_fuel_schemes.json"): fuel_clean,
    ("minimos-operacionales-lvo", "netjets_easa_operations_minima.json"): min_clean,
    ("tiempos-actividad-descanso-ftl", "netjets_easa_ftl_rest_duty.json"): ftl_clean,
    ("espacio-rvsm-pbn-lvo", "netjets_easa_rvsm_pbn_spec_ops.json"): rvsm_clean,
    ("licencias-habilitaciones-aircrew", "netjets_easa_aircrew_regulations.json"): crew_clean,
    ("escenarios-netjets-despacho-crm", "netjets_interview_scenarios_crm.json"): crm_clean,
}

total_q = 0
for (folder, fname), data in banks.items():
    path = os.path.join(BASE_DIR, folder, fname)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Written {folder}/{fname}: {len(data)} items")
    total_q += len(data)

print(f"\nSUCCESS: Written all 7 English banks with {total_q} total unique questions.")
