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

# =========================================================================
# 3. minimos-operacionales-lvo (20 items)
# =========================================================================
minimos = [
  {
    "id": "NJ-MIN-001",
    "subject_id": "minimos-operacionales-lvo",
    "learning_objective": "Approach Ban Rule under EASA (CAT.OP.MPA.305)",
    "stem": "Under EASA CAT.OP.MPA.305, what is the exact criterion governing the 'Approach Ban' when conducting an instrument approach?",
    "options": [
      {
        "id": "A",
        "text": "The approach may be commenced regardless of reported RVR/VIS, but may not be continued beyond the outer marker or 1,000 ft above aerodrome level (AAL) if reported RVR/VIS is below applicable minimums; if RVR falls below minimums AFTER passing 1,000 ft AAL, the approach may continue to DA/MDA.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "The aircraft cannot start descent from cruising level if destination RVR is below minimums.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "The approach ban applies strictly at the Decision Altitude (DA) only.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "If reported RVR drops below minimums at 500 ft AGL, a missed approach must be initiated immediately without checking visual references.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### EASA Approach Ban Rule (CAT.OP.MPA.305)\n* **Prior to 1,000 ft AAL (or FAF / Outer Marker):** The reported RVR/VIS is **controlling**. If reported below minima, continuing the approach past 1,000 ft AAL is **PROHIBITED**.\n* **After passing 1,000 ft AAL:** If reported RVR subsequently deteriorates below minima, the crew is **legally permitted to continue to DA/MDA**.\n* **At DA/MDA:** Landing is only permitted if the required visual references are distinctly identified and the aircraft is in a position to execute a normal landing.",
      "references": [
        "EASA Part-CAT.OP.MPA.305 (Commencement and continuation of approach)",
        "ICAO Annex 6 Part I"
      ]
    },
    "metadata": { "difficulty": 0.2 }
  },
  {
    "id": "NJ-MIN-002",
    "subject_id": "minimos-operacionales-lvo",
    "learning_objective": "Controlling RVR Requirements",
    "stem": "Under EASA Part-CAT, which Runway Visual Range (RVR) transmissometer value is always controlling for takeoff and landing operations?",
    "options": [
      {
        "id": "A",
        "text": "The Touchdown Zone (TDZ) RVR is always controlling; Midpoint and Stopend RVRs are advisory for standard CAT I / LVTO operations above 175 m, but if reported and relevant, all three RVRs become controlling for operations below 175 m RVR.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "The Stopend RVR is always the primary controlling value on landing.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "The arithmetic average of the three RVR transmissometers.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Only human observer meteorological visibility (VIS) is controlling.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Controlling RVR Reporting (CAT.OP.MPA.110)\n* **Touchdown Zone (TDZ) RVR** is always **controlling** for landing.\n* **Midpoint and Stopend RVR** are advisory for standard operations, but when RVR is **below 175 m** (e.g. CAT III B or LVTO 125 m), all available positions become **mandatory controlling**.",
      "references": [
        "EASA CAT.OP.MPA.110 / AMC1",
        "ICAO Manual of All-Weather Operations (Doc 9365)"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-MIN-003",
    "subject_id": "minimos-operacionales-lvo",
    "learning_objective": "Low Visibility Take-Off (LVTO) Minima",
    "stem": "What is the standard minimum RVR for Low Visibility Take-Off (LVTO) with approved visual guidance under EASA SPA.LVO.100?",
    "options": [
      {
        "id": "A",
        "text": "RVR 125 m for Category A, B, and C aircraft (or 150 m for Category D), provided Low Visibility Procedures (LVP) are in force, runway centerline lights are spaced at 15 m or less, and high-intensity runway markings provide a 90 m visual segment.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "RVR 50 m without requiring runway centerline lights.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "RVR 400 m under standard daytime VFR takeoff rules.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "RVR 300 m with taxiway lights only.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Low Visibility Take-Off (LVTO - SPA.LVO.100)\n* Standard takeoff minimum without LVO: **RVR 400/500 m**.\n* **LVTO (Low Visibility Take-Off):** Permits takeoff down to **RVR 125 m** (Cat A/B/C) or **150 m** (Cat D).\n* Requires: **LVP in force**, operational High-Intensity Runway Centerline Lights ($\le 15\\text{ m}$ spacing), runway edge lights, and a visual segment of $\\ge 90\\text{ m}$.",
      "references": [
        "EASA Part-SPA.LVO.100",
        "AMC1 SPA.LVO.100"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-MIN-004",
    "subject_id": "minimos-operacionales-lvo",
    "learning_objective": "Cold Temperature Altimetry Corrections",
    "stem": "When aerodrome temperature is significantly below 0°C, which altitudes must be corrected for low temperature error, and when is ATC notification mandatory under EASA SERA rules?",
    "options": [
      {
        "id": "A",
        "text": "All published minimum altitudes (MSA, intermediate fix altitudes, stepdowns, and DA/MDA) must be corrected; pilots MUST notify ATC when applying temperature corrections to any altitude assigned by ATC or on intermediate/initial approach segments, but notification is not required for DA/MDA.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Only DA is corrected; no notification to ATC is ever permitted.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Altimeter temperature errors only occur below -40°C.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "ATC automatically adjusts all aircraft altimeters via SSR radar transponders.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Cold Temperature Altimeter Correction (ICAO PANS-OPS & SERA)\n* In cold air, true altitude is **lower than indicated altitude** (*'High to Low, Look out Below'*).\n* Crews must apply temperature corrections to all minimum safe altitudes (MSA, IAF, IF, FAF, DA/MDA) using the ICAO Cold Temperature Correction Table.\n* **ATC Coordination Rule:** When applying corrections to **ATC-assigned altitudes or published tactical segments (IF, FAF)**, crew **MUST notify ATC** (e.g. *'Maintaining 4,300 ft for cold temperature correction'*).",
      "references": [
        "ICAO Doc 8168 (PANS-OPS Vol I)",
        "EASA SERA.8015 / SIB 2019-07"
      ]
    },
    "metadata": { "difficulty": 0.3 }
  },
  {
    "id": "NJ-MIN-005",
    "subject_id": "minimos-operacionales-lvo",
    "learning_objective": "Converted Meteorological Visibility (CMV)",
    "stem": "When is it permissible under EASA CAT.OP.MPA.110 to convert reported meteorological visibility (VIS) into Converted Meteorological Visibility (CMV), and what are the standard multipliers?",
    "options": [
      {
        "id": "A",
        "text": "For RVR calculation in CAT I or non-precision approaches when RVR is not reported; multiplied by 1.5 in daytime with High Intensity Approach Lights (HIALS) and by 2.0 at night with HIALS. It is PROHIBITED for takeoff, CAT II/III, or when reported RVR is available.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "CMV can be used for CAT III autolandings when transmissometers fail.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "The factor is always 3.0 regardless of lighting systems.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "CMV is used exclusively for VFR flight planning.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Converted Meteorological Visibility (CMV)\n* Used when meteorological visibility is reported but **RVR is NOT available**.\n* **Multiplication Factors:**\n  - High Intensity Approach Lighting (HIALS): **Day $\\times 1.5$ | Night $\\times 2.0$**.\n  - Any other lighting: **Day $\\times 1.0$ | Night $\\times 1.5$**.\n  - No lights: **Day $\\times 1.0$ | Night $\\times 1.0$**.\n* **Restrictions:** Never used for takeoff minima, CAT II/III minima, or if actual RVR is reported.",
      "references": [
        "EASA Part-CAT.OP.MPA.110 Table 1",
        "AMC1 CAT.OP.MPA.110"
      ]
    },
    "metadata": { "difficulty": 0.35 }
  },
  {
    "id": "NJ-MIN-006",
    "subject_id": "minimos-operacionales-lvo",
    "learning_objective": "Continuous Descent Final Approach (CDFA) vs Non-CDFA Penalty",
    "stem": "Under EASA Part-CAT, what regulatory penalty is applied to the minimum RVR if a non-precision approach is flown using a non-CDFA (stepdown / dive-and-drive) technique?",
    "options": [
      {
        "id": "A",
        "text": "An RVR increment of +200 m for Category A and B aircraft, or +400 m for Category C and D aircraft, must be added to the published approach minima.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "The MDA must be increased by 1,000 ft without changing RVR.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "The approach must be flown with landing gear retracted until MDA.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Non-CDFA approaches are completely illegal under all EASA operations without exception.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### CDFA Technique vs Non-CDFA Penalty (CAT.OP.MPA.115)\n* EASA mandates the **Continuous Descent Final Approach (CDFA)** technique for all non-precision approaches (NPA) to prevent CFIT and unstabilized approaches.\n* If an approach is flown **non-CDFA** (step-down dive-and-drive), the operator must add a safety penalty:\n  - **Cat A & B:** $+200\\text{ m RVR}$\n  - **Cat C & D:** $+400\\text{ m RVR}$",
      "references": [
        "EASA Part-CAT.OP.MPA.115",
        "AMC1 CAT.OP.MPA.115"
      ]
    },
    "metadata": { "difficulty": 0.3 }
  },
  {
    "id": "NJ-MIN-007",
    "subject_id": "minimos-operacionales-lvo",
    "learning_objective": "CAT I Precision Approach Visual References",
    "stem": "At the Decision Height (DH = 200 ft) on a standard ILS CAT I approach, what minimum visual reference is required to continue descent below DH under EASA rules?",
    "options": [
      {
        "id": "A",
        "text": "At least one visual segment of the approach lighting system, threshold markings/lights, touchdown zone markings/lights, or visual glide slope indicator (PAPI/VASI) distinctly visible and identifiable.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "The entire runway surface from threshold to stopend must be visible.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Visual contact with the control tower and windsock.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "At least 3 crossbars of the approach lighting system and the runway centerline.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Visual References at CAT I DH (CAT.OP.MPA.110)\n* For **CAT I (DH $\\ge 200\\text{ ft}$)**, the pilot must have in view **at least one** of the following:\n  - Elements of the Approach Light System (ALS).\n  - Threshold / threshold markings / threshold lights.\n  - Touchdown zone / TDZ markings / TDZ lights.\n  - Visual approach slope indicator (PAPI / VASI).\n  - Runway edge lights.",
      "references": [
        "EASA Part-CAT.OP.MPA.110",
        "ICAO Annex 6 Part I"
      ]
    },
    "metadata": { "difficulty": 0.2 }
  },
  {
    "id": "NJ-MIN-008",
    "subject_id": "minimos-operacionales-lvo",
    "learning_objective": "CAT II Precision Approach Visual References",
    "stem": "What specific visual reference is required at Decision Height (DH between 100 ft and 200 ft) on a CAT II precision approach to permit landing under EASA SPA.LVO.100?",
    "options": [
      {
        "id": "A",
        "text": "A visual segment containing at least 3 consecutive lights of the approach lighting centerline, touchdown zone lights, runway centerline lights, or runway edge lights, including a lateral element (such as an approach light crossbar, landing threshold, or TDZ barrette).",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "A single flashing strobe light in the approach sequence.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "No visual reference is required if autoland is armed.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Direct view of the runway exit taxiway centerline lights.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Visual References for CAT II Operations\n* For **CAT II ($100\\text{ ft} \\le \\text{DH} < 200\\text{ ft}$)**, visual requirements are stricter than CAT I:\n  - At least **3 consecutive lights** (centerline of ALS, TDZ lights, runway centerline, or runway edge lights).\n  - Must include a **lateral cross element** (e.g. crossbar or threshold) to provide attitude and roll cues.",
      "references": [
        "EASA Part-SPA.LVO.100",
        "AMC1 SPA.LVO.100"
      ]
    },
    "metadata": { "difficulty": 0.3 }
  },
  {
    "id": "NJ-MIN-009",
    "subject_id": "minimos-operacionales-lvo",
    "learning_objective": "Enhanced Flight Vision System (EFVS) Operational Credit",
    "stem": "How does an approved Enhanced Flight Vision System (EFVS) with Head-Up Display (HUD) provide operational credit on a standard CAT I approach under EASA SPA.LVO.120?",
    "options": [
      {
        "id": "A",
        "text": "It allows the pilot to continue the approach below the published DH (200 ft) down to 100 ft above TDZE using real-time sensor imagery (FLIR/infrared) displayed on the HUD, before requiring natural visual reference of the runway threshold or TDZ to land.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "It eliminates the need for any approach briefing or alternate planning.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "It permits landing in zero visibility without flare guidance.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "It replaces the requirement for an operable radar altimeter on CAT II approaches.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### EFVS / EVS Operational Credit (SPA.LVO.120)\n* Modern executive jets (e.g. Bombardier Global, Challenger 3500, Falcon) equipped with **EFVS on HUD** have special operational credits.\n* On a CAT I approach, the crew may continue descent **from 200 ft down to 100 ft** relying entirely on **infrared sensor imagery on the HUD**.\n* At **100 ft**, natural visual contact with threshold lights or touchdown zone lights is required to touchdown.",
      "references": [
        "EASA Part-SPA.LVO.120",
        "FAA 14 CFR 91.176 (EFVS Operations)"
      ]
    },
    "metadata": { "difficulty": 0.35 }
  },
  {
    "id": "NJ-MIN-010",
    "subject_id": "minimos-operacionales-lvo",
    "learning_objective": "Visual Circling Minima & Obstacle Clearance",
    "stem": "What are the standard visual circling criteria, speed categories, and descent rules during a visual circling maneuver under EASA Part-CAT?",
    "options": [
      {
        "id": "A",
        "text": "Descent below the circling MDA/H is prohibited until the aircraft is established on final approach track to the landing runway; visual contact with the runway environment must be maintained continuously throughout the maneuver, within the obstacle clearance radius corresponding to the aircraft category (Cat B: 1,500 m VIS / Cat C: 2,400 m VIS).",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Descent to 500 ft AGL is authorized immediately upon breaking visual contact at MDA.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Circling is flown with autopilot engaged in vertical speed mode down to touchdown.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "If visual contact is lost during circling, the pilot must continue circling visually at low altitude until the runway reappears.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Visual Circling Rules (CAT.OP.MPA.110 & PANS-OPS)\n* **Descent Rule:** **PROHIBITED** to descend below Circling MDA until aligned on final approach.\n* **Visual Contact:** Continuous visual contact with runway environment is mandatory.\n* **Missed Approach during Circling:** If visual contact is lost, initiate immediate missed approach: climb and turn **towards the landing runway** to intercept the published instrument missed approach of the approach originally flown.",
      "references": [
        "EASA CAT.OP.MPA.110",
        "ICAO Doc 8168 (PANS-OPS)"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  }
]

print("Writing minimos-operacionales-lvo...")
with open(os.path.join(BASE_DIR, "minimos-operacionales-lvo", "netjets_easa_operations_minima.json"), "w", encoding="utf-8") as f:
    json.dump(minimos, f, indent=2, ensure_ascii=False)

print("Done minimos.")
