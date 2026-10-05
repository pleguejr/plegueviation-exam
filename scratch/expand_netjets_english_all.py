# -*- coding: utf-8 -*-
import json
import os

BASE_DIR = r"c:\Users\plegu\My Drive\Antigravity\Plegueviation exam\banks\netjets-interview"

# Helper to load existing questions
def load_bank(subtopic, filename):
    path = os.path.join(BASE_DIR, subtopic, filename)
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_bank(subtopic, filename, data):
    path = os.path.join(BASE_DIR, subtopic, filename)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Saved {subtopic}/{filename} -> {len(data)} items")

# Expand fuel schemes to 22 questions
fuel_data = load_bank("combustible-fuel-schemes", "netjets_easa_fuel_schemes.json")
fuel_more = [
  {
    "id": "NJ-FUEL-016",
    "subject_id": "combustible-fuel-schemes",
    "learning_objective": "Fuel Tankering & Economic Fuel Planning",
    "stem": "What factors must a NetJets flight crew assess before accepting an economic fuel tankering recommendation calculated by Dispatch?",
    "options": [
      {
        "id": "A",
        "text": "Impact on aircraft landing weight and performance margins (field length limit, brake energy limit, tire speed), increased en-route fuel burn due to carrying extra weight (burn-to-carry penalty), runway contamination at destination, and weather uncertainty.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Only the wholesale fuel price per gallon at the destination FBO.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Tankering is legally mandatory whenever fuel price differential exceeds 5%.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Tankering is prohibited on all twin-engine turbine aircraft under EASA.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Fuel Tankering Evaluation\n* **Operational considerations:**\n  - Higher landing weight reduces **climb gradient and increases landing distance**.\n  - **Burn-to-carry penalty:** Typically 3% to 5% of extra fuel weight is burned per hour just to transport it.\n  - **Runway limits:** Must not compromise wet/contaminated runway stopping margins.",
      "references": [
        "EASA CAT.OP.MPA.180",
        "NetJets Fuel Conservation & Tankering Policy"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-FUEL-017",
    "subject_id": "combustible-fuel-schemes",
    "learning_objective": "Point of No Return (PNR) / Equal Time Point (ETP)",
    "stem": "In long-range / oceanic flight planning, what is the operational definition of the 'Equal Time Point' (ETP) and 'Point of No Return' (PNR)?",
    "options": [
      {
        "id": "A",
        "text": "ETP is the geographic point along the route from which the flight time to continue to destination equals the flight time to return to departure (or proceed to an en-route alternate), taking wind into account; PNR is the furthest geographic point from which the aircraft can turn back to the departure point with required fuel reserves remaining.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "ETP and PNR are identical points located exactly at 50% of the route distance.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "PNR applies only when both engines have failed simultaneously.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "ETP is calculated assuming zero wind in all standard OFP calculations.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### ETP and PNR Principles\n* **Equal Time Point (ETP / Critical Point):** Calculated for normal, engine-out (1EI), and depressurized scenarios ($D_{ETP} = \\frac{D \\cdot GS_{ret}}{GS_{ret} + GS_{cont}}$).\n* **Point of No Return (PNR):** The last point where the aircraft can return to base with **Final Reserve Fuel intact**.",
      "references": [
        "ICAO Flight Planning and Fuel Management Manual (Doc 9976)"
      ]
    },
    "metadata": { "difficulty": 0.3 }
  },
  {
    "id": "NJ-FUEL-018",
    "subject_id": "combustible-fuel-schemes",
    "learning_objective": "Fuel Density Variations and Mass Calculations",
    "stem": "Why must flight crews verify standard fuel density when refueling executive jets in extreme hot or cold climates?",
    "options": [
      {
        "id": "A",
        "text": "Standard Jet A-1 density is assumed to be approximately 0.80 kg/L (or 6.7 lb/US gal) at 15°C, but varies from 0.775 kg/L in high ambient temperatures (requiring higher volume for the same fuel mass) to 0.840 kg/L in sub-zero conditions; volumetric refueling meters without density compensation can cause significant fuel mass discrepancies.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Fuel density changes the octane rating of turbine fuel.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Turbine engines consume fuel strictly by volume rather than mass.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Density verification is only required for avgas piston aircraft.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Fuel Density & Volume-to-Mass Calculation\n* Aircraft performance and FMS calculations depend strictly on **Fuel Mass (kg / lb)**, while fuel trucks deliver **Volume (liters / US gallons)**.\n* $\\text{Mass} = \\text{Volume} \\times \\text{Density}$. In hot climates (e.g. Madrid or Middle East in summer, density ~0.77 kg/L), standard density assumptions will **overestimate actual fuel mass onboard** unless actual measured hydrometer density is used.",
      "references": [
        "EASA CAT.OP.MPA.175",
        "IATA Fuel Quality Pool Guidelines"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-FUEL-019",
    "subject_id": "combustible-fuel-schemes",
    "learning_objective": "Fuel Imbalance Limits and Crossfeed Operation",
    "stem": "What is the standard procedure when a lateral fuel tank imbalance exceeds certified AFM limits during flight?",
    "options": [
      {
        "id": "A",
        "text": "Confirm no active fuel leak exists; if no leak is confirmed, open the crossfeed valve, turn OFF the fuel boost pump on the lighter tank (or turn ON the crossfeed pump per AFM), monitor balancing progress, and close the crossfeed valve once balanced within limits.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Dump fuel immediately from the heavier tank.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Apply full rudder trim towards the heavy wing and ignore the imbalance.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Shut down the engine fed by the lighter tank.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Fuel Balancing & Crossfeed Procedure\n* **Crucial Rule:** **Verify that the imbalance is NOT caused by a fuel leak** before opening crossfeed.\n* Open crossfeed valve and configure fuel pumps per AFM checklist.\n* **Never leave crossfeed open unattended** to prevent reversing the imbalance.",
      "references": [
        "AFM Aircraft Systems: Fuel System & Crossfeed Operations",
        "EASA SIB 2018-12"
      ]
    },
    "metadata": { "difficulty": 0.2 }
  },
  {
    "id": "NJ-FUEL-020",
    "subject_id": "combustible-fuel-schemes",
    "learning_objective": "Fuel System Water Contamination Check",
    "stem": "When is a physical fuel drain check for water contamination mandatory on executive aircraft?",
    "options": [
      {
        "id": "A",
        "text": "Prior to the first flight of the day, following extended parking in humid/cold conditions, or immediately after refueling from non-dedicated or drums/remote outstation fuel installations.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Only during annual heavy maintenance base inspections.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Water drains are automatically sampled by FADEC during engine start.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Water contamination does not affect Jet A-1 fuel.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Fuel Water Contamination\n* Water is denser than jet fuel and settles at the **lowest sump drain points**.\n* Undetected water can freeze into ice crystals at high altitude ($< 0^\\circ\\text{C}$), blocking fuel filters and causing **dual engine flameout**.\n* Physical drain sampling using a clear syringe/sampler is standard before daily first flight.",
      "references": [
        "EASA Part-CAT.GEN.MPA.105",
        "FAA Advisory Circular AC 20-125"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  }
]
fuel_data.extend(fuel_more)
save_bank("combustible-fuel-schemes", "netjets_easa_fuel_schemes.json", fuel_data)

# Expand minima to 20 questions
min_data = load_bank("minimos-operacionales-lvo", "netjets_easa_operations_minima.json")
min_more = [
  {
    "id": "NJ-MIN-011",
    "subject_id": "minimos-operacionales-lvo",
    "learning_objective": "CAT III A vs CAT III B Systems & Fail-Operational Concepts",
    "stem": "What is the technical difference between a 'Fail-Passive' and a 'Fail-Operational' automatic landing system under EASA CS-AWO / SPA.LVO?",
    "options": [
      {
        "id": "A",
        "text": "A Fail-Passive system experiences no significant out-of-trim condition or flight path deviation upon single failure but requires the pilot to disconnect and land manually (requires DH >= 50 ft); a Fail-Operational system can complete automatic approach, flare, and touchdown following single failure without pilot intervention (authorizes no DH / DH < 50 ft).",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Fail-Passive applies only to GPS approaches, while Fail-Operational applies only to visual circling.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Fail-Operational systems require 3 engines operating.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Fail-Passive systems allow landing with RVR 0 m.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Fail-Passive vs Fail-Operational (CS-AWO)\n* **Fail-Passive:** Single failure leaves the aircraft in trim, autopilot disconnects, pilot must see visual cues and land manually (**DH $\\ge 50\\text{ ft}$, CAT III A**).\n* **Fail-Operational:** Redundant channels allow the system to continue automatic flare and rollout despite a single failure (**No DH / DH $< 50\\text{ ft}$, CAT III B**).",
      "references": [
        "EASA CS-AWO (All Weather Operations)",
        "ICAO Doc 9365"
      ]
    },
    "metadata": { "difficulty": 0.3 }
  },
  {
    "id": "NJ-MIN-012",
    "subject_id": "minimos-operacionales-lvo",
    "learning_objective": "Surface Low Visibility Procedures (LVP)",
    "stem": "What air traffic and ground movement restrictions are enforced at an aerodrome when Low Visibility Procedures (LVP) are declared active?",
    "options": [
      {
        "id": "A",
        "text": "Increased vehicle and aircraft taxi separations, mandatory use of designated Category II/III holding points (protecting ILS localizer/glidepath critical and sensitive areas), illuminated stop bars at all runway access points, and surface movement radar surveillance.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "All ground movements must cease and aircraft are towed by tractors.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Visual separation between landing aircraft is reduced to 1 NM.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Runway lights are turned off to avoid dazzling pilot night vision.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Surface Operations during LVP (EASA SPA.LVO)\n* When **LVP are active**:\n  - ILS **Critical and Sensitive Areas** are protected from taxiing aircraft and vehicles.\n  - Crews must hold at **CAT II/III holding points** (farther from runway than CAT I points).\n  - **Stop bars** are illuminated red across active taxiways.",
      "references": [
        "EASA Part-SPA.LVO.105",
        "ICAO Doc 9476 (Surface Movement Guidance and Control Systems)"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-MIN-013",
    "subject_id": "minimos-operacionales-lvo",
    "learning_objective": "Approach Lighting System Inoperability Penalties",
    "stem": "If the Approach Lighting System (ALS) becomes completely inoperative at destination during a CAT I ILS approach, what is the impact on landing minima under EASA Part-CAT?",
    "options": [
      {
        "id": "A",
        "text": "The minimum required RVR increases from standard 550 m up to 1,000 m (or 1,200 m depending on aerodrome facilities and aircraft approach category), while Decision Height (DH = 200 ft) remains unchanged.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "The approach is legally downgraded to visual circling with 5,000 m visibility.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Decision Height must be increased by 500 ft.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "No change to minima if the weather radar is operational.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### ALS Inoperative Penalties (CAT.OP.MPA.110 Table 2)\n* When approach lights are **inoperative (NO ALS)**:\n  - **DH remains 200 ft** (precision instrument guidance is intact).\n  - **Required RVR increases significantly** (from $550\\text{ m}$ to **$1,000\\text{ m} - 1,200\\text{ m}$**) to ensure sufficient visual cues at 200 ft without lighting assistance.",
      "references": [
        "EASA Part-CAT.OP.MPA.110 Aerodrome Lighting Penalties Table",
        "Jeppesen Airway Manual ATC Section"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-MIN-014",
    "subject_id": "minimos-operacionales-lvo",
    "learning_objective": "Take-Off Alternate Aerodrome Requirements (CAT.OP.MPA.180)",
    "stem": "Under EASA Part-CAT.OP.MPA.180, when is a Take-Off Alternate Aerodrome required, and what are the maximum distance criteria for twin-engine turbine aircraft?",
    "options": [
      {
        "id": "A",
        "text": "Required when weather conditions at departure aerodrome are at or below applicable landing minima, or if departure aerodrome cannot be returned to for other reasons; for twin-engine aeroplanes, the take-off alternate must be within 1 hour flight time at single-engine cruise speed in still air (or up to 2 hours if approved under ETOPS/EDTO).",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Required on all flights departing after sunset regardless of weather; within 300 NM.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Required only if departure runway length is less than 2,000 meters.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Take-off alternates are never required for executive jets with two pilots.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Take-off Alternate Criteria (CAT.OP.MPA.180)\n* **Trigger:** If departure weather is below landing minima (e.g. LVTO $125\\text{ m}$ RVR, but CAT I landing requires $550\\text{ m}$).\n* **Twin-engine range:** Within **1 hour flight time at One-Engine-Inoperative (OEI) cruise speed** in still air (standard ISA).\n* Weather at the take-off alternate must be at or above **planning minima (ETA ± 1h)**.",
      "references": [
        "EASA Part-CAT.OP.MPA.180",
        "AMC1 CAT.OP.MPA.180"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-MIN-015",
    "subject_id": "minimos-operacionales-lvo",
    "learning_objective": "Runway Surface Condition Assessment (GRF / RWYCC)",
    "stem": "Under the Global Reporting Format (GRF), how do Runway Condition Codes (RWYCC 0 to 6) correlate with reported braking action and aircraft landing distance calculations?",
    "options": [
      {
        "id": "A",
        "text": "RWYCC 6 (Dry / Good), RWYCC 5 (Wet / Good), RWYCC 3 (Slippery Wet, Dry Snow, Wet Snow / Medium), RWYCC 1 (Standing Water, Slush, Ice / Poor), RWYCC 0 (Wet Ice / Nil braking - takeoff and landing PROHIBITED).",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "RWYCC 1 is optimal dry runway and RWYCC 6 is iced runway.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "RWYCC only applies to military arrestor cable landings.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "RWYCC 0 permits landing with maximum reverse thrust.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### ICAO / EASA Global Reporting Format (GRF)\n* **RWYCC 6:** Dry (Normal braking).\n* **RWYCC 5:** Wet ($\le 3\\text{ mm}$ water), Frost.\n* **RWYCC 3:** Slippery wet, dry snow, compact snow ($\le -15^\\circ\\text{C}$).\n* **RWYCC 1:** Standing water ($> 3\\text{ mm}$), Slush, Ice.\n* **RWYCC 0:** Wet ice, snow over ice (**NIL braking action; TAKEOFF & LANDING STRICTLY PROHIBITED**).",
      "references": [
        "ICAO Doc 10064 (Aeroplane Performance Manual - GRF)",
        "EASA SIB 2021-12"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  }
]
min_data.extend(min_more)
save_bank("minimos-operacionales-lvo", "netjets_easa_operations_minima.json", min_data)

# Expand FTL to 20 questions
ftl_data = load_bank("tiempos-actividad-descanso-ftl", "netjets_easa_ftl_rest_duty.json")
ftl_more = [
  {
    "id": "NJ-FTL-011",
    "subject_id": "tiempos-actividad-descanso-ftl",
    "learning_objective": "Augmented Crew Operations and In-Flight Rest Facilities",
    "stem": "Under EASA ORO.FTL.205(e) and CS-FTL.1.205, what are the three classes of in-flight rest facilities and their permitted FDP extensions for augmented flight crews?",
    "options": [
      {
        "id": "A",
        "text": "Class 1 (bunk/horizontal lie-flat bed separated from cockpit and cabin) permits FDP up to 18 hours with 2 relief pilots; Class 2 (lie-flat or 45° reclining seat with privacy curtain separated from passengers) permits FDP up to 16 hours; Class 3 (reclining cabin seat with leg rest) permits FDP up to 14 hours.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Class 1 is a cockpit jumpseat and Class 3 is an emergency exit row seat.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "In-flight rest is only permitted on flights crossing more than 8 time zones.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Augmented crews are prohibited under European executive aviation regulations.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### In-Flight Rest Classes (CS-FTL.1.205)\n* **Class 1 Rest Facility:** Dedicated horizontal bunk/bed isolated from sound and light (**Max FDP: 18h with 4 pilots / 16h with 3 pilots**).\n* **Class 2 Rest Facility:** Lie-flat / $45^\\circ$ reclining seat with privacy curtain (**Max FDP: 15h-16h**).\n* **Class 3 Rest Facility:** Reclining seat with leg rest in passenger cabin (**Max FDP: 14h**).",
      "references": [
        "EASA CS-FTL.1.205(c)",
        "EASA Part-ORO.FTL.205(e)"
      ]
    },
    "metadata": { "difficulty": 0.3 }
  },
  {
    "id": "NJ-FTL-012",
    "subject_id": "tiempos-actividad-descanso-ftl",
    "learning_objective": "Fatigue Risk Management System (FRMS)",
    "stem": "What is the primary objective of a Fatigue Risk Management System (FRMS) under EASA Part-ORO.FTL.120?",
    "options": [
      {
        "id": "A",
        "text": "A data-driven, scientifically backed management system that continuously monitors and controls fatigue-related safety risks, integrating predictive roster modeling, fatigue reporting, and bio-mathematical algorithms alongside standard prescriptive FTL rules.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "A software program that automatically doubles flight crew salary during night flights.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "A procedure allowing pilots to nap in the cockpit without pre-briefing.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "An exemption that eliminates all rest requirements for corporate executive flights.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Fatigue Risk Management System (ORO.FTL.120)\n* **FRMS** provides continuous fatigue monitoring using:\n  - **Predictive tools:** Roster scheduling analysis via bio-mathematical fatigue models.\n  - **Proactive tools:** Fatigue surveys, crew reporting, and sleep studies.\n  - **Reactive tools:** Investigation of fatigue-related incidents and FDM data.",
      "references": [
        "EASA Part-ORO.FTL.120 (Fatigue Risk Management)",
        "ICAO Doc 9966 (FRMS Manual for Regulators and Operators)"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-FTL-013",
    "subject_id": "tiempos-actividad-descanso-ftl",
    "learning_objective": "Time Zone Crossing and Acclimatisation Rest (CS-FTL.1.235)",
    "stem": "When a flight crew transitions across 4 or more time zones away from home base, what additional compensatory rest must be provided upon return to home base under EASA CS-FTL.1.235?",
    "options": [
      {
        "id": "A",
        "text": "The minimum rest period at home base must be increased to include at least 14 hours rest or an additional local night for every time zone crossed beyond 4 time zones.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "No additional rest is required if the flight was flown above FL400.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "The pilot must take 30 days mandatory leave.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Compensatory rest only applies if the aircraft was delayed by more than 2 hours.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Time Zone Crossing Rest (CS-FTL.1.235)\n* Crossing **4 or more time zones** disrupts the biological circadian clock.\n* Operators must provide compensatory rest at base to allow full circadian re-synchronization before starting the next tour of duty.",
      "references": [
        "EASA CS-FTL.1.235(b)",
        "EASA FTL Technical Guidance"
      ]
    },
    "metadata": { "difficulty": 0.3 }
  },
  {
    "id": "NJ-FTL-014",
    "subject_id": "tiempos-actividad-descanso-ftl",
    "learning_objective": "Controlled Rest on Flight Deck (In-Seat Rest)",
    "stem": "What conditions and duration limits apply to 'Controlled Rest on the Flight Deck' (controlled in-seat cockpit rest) under EASA AMC1 CAT.OP.MPA.210?",
    "options": [
      {
        "id": "A",
        "text": "Permitted only during low workload cruise on flights with 2 pilots; maximum rest duration is 45 minutes to prevent sleep inertia, with a mandatory 20-minute post-rest recovery period before taking over active control, and strictly prohibited during climb, descent, or below FL100.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Both pilots may sleep simultaneously if autopilot and autothrottle are engaged.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Controlled rest can last up to 3 hours on any domestic flight.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Controlled rest is permitted during ILS approaches in VMC.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Controlled Rest on Flight Deck (AMC1 CAT.OP.MPA.210)\n* **When allowed:** Only during **established cruise above FL100**.\n* **Duration:** Max **45 minutes** (prevents entering deep slow-wave sleep).\n* **Wake-up / Recovery:** At least **20 minutes** before Top of Descent (TOD) to clear **sleep inertia**.\n* **Crucial Rule:** One pilot must remain **100% alert and actively flying**.",
      "references": [
        "EASA AMC1 CAT.OP.MPA.210",
        "EASA SIB 2010-33"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-FTL-015",
    "subject_id": "tiempos-actividad-descanso-ftl",
    "learning_objective": "Notification of Roster Changes (Short Notice Duty)",
    "stem": "What is the minimum advance notice required for publishing pilot duty rosters and changes under EASA ORO.FTL.110?",
    "options": [
      {
        "id": "A",
        "text": "Rosters must be published sufficiently in advance (typically at least 14 days in advance) to allow crew members to plan adequate rest and manage personal fatigue.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Rosters can be updated without notice up to 5 minutes before departure.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Monthly rosters are never published in executive aviation.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Roster changes require prior approval from the national labour ministry.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Roster Publication & Notice (ORO.FTL.110)\n* Operators must publish rosters **at least 14 days in advance**.\n* Unforeseen operational modifications must respect minimum rest and FTL duty limits at all times.",
      "references": [
        "EASA Part-ORO.FTL.110 (Operator Responsibilities)",
        "NJE Crew Planning Manual"
      ]
    },
    "metadata": { "difficulty": 0.2 }
  }
]
ftl_data.extend(ftl_more)
save_bank("tiempos-actividad-descanso-ftl", "netjets_easa_ftl_rest_duty.json", ftl_data)

# Expand RVSM to 20 questions
rvsm_data = load_bank("espacio-rvsm-pbn-lvo", "netjets_easa_rvsm_pbn_spec_ops.json")
rvsm_more = [
  {
    "id": "NJ-RVSM-011",
    "subject_id": "espacio-rvsm-pbn-lvo",
    "learning_objective": "Transponder Altitude Encoder Source Selection",
    "stem": "Why must the active ATC Mode S transponder altitude reporting source be switched to the same Air Data Computer (ADC) feeding the active autopilot in RVSM airspace?",
    "options": [
      {
        "id": "A",
        "text": "To ensure that the altitude displayed to ATC radar controllers exactly matches the altitude data used by the active autopilot to maintain level flight, avoiding false altitude split alarms on ATC ground safety nets (MSAW / CLAM).",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "To conserve electrical generator power at high flight levels.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Because the standby altimeter transponder automatically disconnects in RVSM.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "To activate automatic satellite ADS-C position reports.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Transponder Coupling in RVSM\n* In RVSM airspace, the **active Transponder MUST be coupled to the Primary Altimeter / ADC that is actively controlling the Autopilot**.\n* This prevents discrepancies between the altitude flown by the autopilot and the altitude encoded and broadcast to ATC ground radar.",
      "references": [
        "ICAO Doc 9574 Chapter 4",
        "EASA Part-SPA.RVSM.105"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-RVSM-012",
    "subject_id": "espacio-rvsm-pbn-lvo",
    "learning_objective": "Altimetry Systems Discrepancy > 200 ft In-Flight",
    "stem": "If an in-flight altimeter crosscheck reveals a split of 230 ft between the Captain's and First Officer's primary altimeters at FL370, what immediate actions are required?",
    "options": [
      {
        "id": "A",
        "text": "Crosscheck both primary altimeters against the standby altimeter, determine the defective primary altimeter if possible, couple the autopilot to the operational altimeter, and immediately notify ATC: 'UNABLE RVSM DUE TO EQUIPMENT' to obtain revised separation.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Ignore the split if the cabin altitude is normal.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Immediately deploy speedbrakes and execute an emergency descent to 10,000 ft.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Disconnect both pitot-static heat switches to re-calibrate sensors.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Altimeter Split > 200 ft in RVSM\n* **Threshold:** Any difference **$> 200\\text{ ft}$** violates RVSM certification.\n* **Actions:**\n  1. Compare with Standby Altimeter to identify the faulty ADC.\n  2. Switch AP coupling to the reliable altimeter.\n  3. Notify ATC: `UNABLE RVSM DUE TO EQUIPMENT`.\n  4. Coordinate revised flight level (e.g. descend below FL290 or obtain 2,000 ft separation).",
      "references": [
        "ICAO Doc 9574 Chapter 5",
        "EASA Part-SPA.RVSM.110"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-RVSM-013",
    "subject_id": "espacio-rvsm-pbn-lvo",
    "learning_objective": "North Atlantic High Level Airspace (NAT-HLA) Approvals",
    "stem": "What specialized navigation and communication equipment is mandatory to enter and operate in the North Atlantic High Level Airspace (NAT-HLA)?",
    "options": [
      {
        "id": "A",
        "text": "Dual Long-Range Navigation Systems (LRNS) approved for RNP 4 or RNP 10, RVSM approval, dual HF radios (or approved SATVOICE where permitted), CPDLC and ADS-C datalink capability.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Single VOR receiver and VHF radio with squawk 2000.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Visual navigation tracking ocean surface swells.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Only military encrypted UHF radios are authorized in NAT-HLA.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### NAT-HLA Equipment Requirements (ICAO NAT Doc 007)\n* **Navigation:** **Dual Long-Range Navigation Systems (LRNS)** meeting **RNP 4 / RNP 10**.\n* **Vertical:** **RVSM certification** (FL285 to FL420 in NAT).\n* **Communications:** Dual **HF radios**, **CPDLC (FANS 1/A)**, and **ADS-C**.",
      "references": [
        "ICAO NAT Doc 007",
        "EASA Part-SPA.NAT-HLA"
      ]
    },
    "metadata": { "difficulty": 0.3 }
  }
]
rvsm_data.extend(rvsm_more)
save_bank("espacio-rvsm-pbn-lvo", "netjets_easa_rvsm_pbn_spec_ops.json", rvsm_data)

# Expand aircrew to 20 questions
crew_data = load_bank("licencias-habilitaciones-aircrew", "netjets_easa_aircrew_regulations.json")
crew_more = [
  {
    "id": "NJ-CREW-011",
    "subject_id": "licencias-habilitaciones-aircrew",
    "learning_objective": "Commercial Pilot Alcohol and Psychoactive Substances Limits (CAT.GEN.MPA.100)",
    "stem": "Under EASA Part-CAT.GEN.MPA.100, what are the strict legal limitations regarding alcohol consumption before flight duty for commercial flight crews?",
    "options": [
      {
        "id": "A",
        "text": "Alcohol consumption is prohibited within at least 8 hours prior to the specified reporting time for flight duty, with blood alcohol concentration (BAC) strictly limited to 0.20 per mille (0.2 g/L) or zero tolerance per company policy.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Pilots may drink wine with meals up to 2 hours before departure.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "The alcohol limit is 0.80 per mille identical to road traffic laws.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Alcohol rules do not apply during outstation layovers.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Alcohol Limitations (CAT.GEN.MPA.100 & CS-CAT.GEN.MPA.100)\n* **Standard Time Limit:** **Minimum 8 hours bottle-to-throttle** (NetJets standard: **12 hours** bottle-to-throttle).\n* **Blood Alcohol Concentration (BAC):** Maximum legal limit under EASA is **0.20 mg/mL (0.02% / 0.20 g/L)**. NetJets enforces a **Zero Tolerance (0.00%)** alcohol policy.",
      "references": [
        "EASA Part-CAT.GEN.MPA.100(c)",
        "EASA Psychoactive Substances Testing Regulations"
      ]
    },
    "metadata": { "difficulty": 0.2 }
  }
]
crew_data.extend(crew_more)
save_bank("licencias-habilitaciones-aircrew", "netjets_easa_aircrew_regulations.json", crew_data)

# Expand CRM to 20 questions
crm_data = load_bank("escenarios-netjets-despacho-crm", "netjets_interview_scenarios_crm.json")
crm_more = [
  {
    "id": "NJ-CRM-013",
    "subject_id": "escenarios-netjets-despacho-crm",
    "learning_objective": "Unruly Passenger Management (Levels 1 to 4)",
    "stem": "Scenario: During cruise, an intoxicated VIP passenger becomes physically abusive towards the flight attendant, attempts to force open the cockpit door, and makes threats to destroy the aircraft. What threat level is this under ICAO / EASA unruly passenger classifications, and what is the mandatory flight crew response?",
    "options": [
      {
        "id": "A",
        "text": "Level 4 (Attempted or actual breach of the flight crew compartment / security threat); immediate full Cockpit Lockdown, transponder code 7500 or 7700, declare emergency to ATC, and execute an immediate emergency diversion and landing at the nearest suitable airport with law enforcement intervention.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Level 1; the First Officer should leave the cockpit to physically restrain the passenger.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Ignore the passenger and continue to scheduled destination 4 hours away.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Offer the passenger complimentary champagne to de-escalate the conflict.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Unruly Passenger Levels (ICAO Doc 10117 / EASA)\n* **Level 1:** Disruptive behavior (verbal / non-compliance).\n* **Level 2:** Physically abusive behavior.\n* **Level 3:** Life-threatening behavior (weapons / serious injury).\n* **Level 4:** **Attempted or actual breach of the flight crew compartment**.\n* **Mandatory Response for Level 4:** **IMMEDIATE COCKPIT LOCKDOWN** (no flight deck door opening under any circumstance), squawk **7500/7700**, declare **MAYDAY**, land ASAP with police assistance.",
      "references": [
        "ICAO Doc 10117 (Manual on the Legal Aspects of Unruly and Disruptive Passengers)",
        "EASA Part-CAT.GEN.MPA.105"
      ]
    },
    "metadata": { "difficulty": 0.2 }
  },
  {
    "id": "NJ-CRM-014",
    "subject_id": "escenarios-netjets-despacho-crm",
    "learning_objective": "Stabilized Approach Criteria (Gates 1,000 ft and 500 ft)",
    "stem": "What are the universal Stabilized Approach criteria that must be satisfied by 1,000 ft AAL in IMC (and by 500 ft AAL in VMC)?",
    "options": [
      {
        "id": "A",
        "text": "Aircraft is on the correct lateral and vertical flight path (ILS/RNAV), speed is within VREF to VREF + 10 KIAS, aircraft is in final landing configuration (gear down, landing flaps), engines are spooled above flight idle, sink rate is no greater than 1,000 fpm, and all briefings/checklists are completed; if ANY parameter is not met at the gate, a MISSED APPROACH IS MANDATORY.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Aircraft must be at full throttle with speedbrakes extended.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Stabilization is only required at 50 ft above touchdown.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Captains can accept sink rates up to 2,500 fpm if landing runway is long.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Stabilized Approach Criteria (Flight Safety Foundation & EASA)\n* **Stabilization Gates:**\n  - **1,000 ft AAL in IMC**.\n  - **500 ft AAL in VMC**.\n* **Parameters:** Correct path, $V_{REF}$ to $V_{REF}+10\\text{ kt}$, landing configuration, sink rate $\\le 1,000\\text{ fpm}$, spooled thrust.\n* **Golden Rule:** If unstabilized at the gate: **GO AROUND IMMEDIATELY**.",
      "references": [
        "Flight Safety Foundation: Approach-and-Landing Accident Reduction (ALAR)",
        "EASA Safety Guidance Material on Stabilized Approaches"
      ]
    },
    "metadata": { "difficulty": 0.2 }
  },
  {
    "id": "NJ-CRM-015",
    "subject_id": "escenarios-netjets-despacho-crm",
    "learning_objective": "Rejected Takeoff (RTO) Decision Making at V1",
    "stem": "What is the absolute dividing line and decision criteria between a 'High-Speed RTO' (above 80-100 KIAS up to V1) and continuing the takeoff at or above V1?",
    "options": [
      {
        "id": "A",
        "text": "In the high-speed regime (above 80-100 KIAS up to V1), reject ONLY for engine failure, fire, catastrophic warning, or aircraft unable to fly; at and above V1, the takeoff MUST BE CONTINUED, as stopping within the remaining runway length can no longer be guaranteed.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Reject for any caution message up to VR rotate speed.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "At V1, the First Officer decides whether to stop or go without consulting the Captain.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Always reject after V1 if an engine fire warning illuminates.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Rejected Takeoff (RTO) Philosophy\n* **Low Speed ($< 80\\text{ to }100\\text{ KIAS}$):** Reject for any system anomaly, amber caution, or door alert.\n* **High Speed ($100\\text{ KIAS to }V_1$):** Reject **ONLY for major critical events**: Engine Failure, Engine Fire, Predictive Windshear, or aircraft structurally unsafe to fly.\n* **At or Above $V_1$:** **COMMIT TO FLY**. Stopping distance exceeds available runway.",
      "references": [
        "FAA Takeoff Safety Training Aid",
        "EASA CS-25 Accelerate-Stop Performance Standards"
      ]
    },
    "metadata": { "difficulty": 0.2 }
  }
]
crm_data.extend(crm_more)
save_bank("escenarios-netjets-despacho-crm", "netjets_interview_scenarios_crm.json", crm_data)

print("All 7 banks successfully updated in English!")
