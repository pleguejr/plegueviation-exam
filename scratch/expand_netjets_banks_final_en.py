# -*- coding: utf-8 -*-
import json
import os

BASE_DIR = r"c:\Users\plegu\My Drive\Antigravity\Plegueviation exam\banks\netjets-interview"

def load_file(folder, filename):
    p = os.path.join(BASE_DIR, folder, filename)
    with open(p, "r", encoding="utf-8") as f:
        return json.load(f)

def save_file(folder, filename, data):
    p = os.path.join(BASE_DIR, folder, filename)
    with open(p, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Updated {folder}/{filename} -> {len(data)} items")

# Additional Fuel items (21 to 25)
fuel_data = load_file("combustible-fuel-schemes", "netjets_easa_fuel_schemes.json")
fuel_extra = [
  {
    "id": "NJ-FUEL-021",
    "subject_id": "combustible-fuel-schemes",
    "learning_objective": "Fuel Specific Gravity and Fuel Temperature Probes",
    "stem": "Why do modern business jets measure fuel temperature in the main fuel tanks, and what is the typical warning threshold during prolonged high-altitude cruise in polar or winter airmasses?",
    "options": [
      {
        "id": "A",
        "text": "To alert the flight crew when fuel temperature approaches the fuel freezing point (e.g. amber caution when within 3°C of certified fuel freezing point: -44°C for Jet A-1 or -37°C for Jet A), requiring descent, speed increase to increase aerodynamic kinetic friction heating, or routing to warmer air.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "To prevent fuel from boiling and vaporizing inside the wing tanks above FL300.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "To trigger automatic electrical wing heating elements inside the fuel cells.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "To automatically jettison cold fuel overboard.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Fuel Temperature Monitoring\n* Cold temperatures at high flight levels (e.g. $-65^\\circ\\text{C}$ TAT) can chill fuel towards its freezing point (**$-47^\\circ\\text{C}$ for Jet A-1**).\n* Fuel temperature probes alert crew when fuel is **within $3^\\circ\\text{C}$ of freezing**.\n* **Mitigation:** Increase Mach number ($M\\uparrow$ raises Total Air Temperature $TAT = SAT \\times (1 + 0.2 M^2)$ by aerodynamic compression) or descend to warmer air.",
      "references": [
        "EASA CS-25.1309 / CS-25.997",
        "Boeing / Bombardier High Latitude Operating Manual"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-FUEL-022",
    "subject_id": "combustible-fuel-schemes",
    "learning_objective": "Statistical Fuel Scheme Requirements (EASA CAT.OP.MPA.181)",
    "stem": "Under EASA Part-CAT.OP.MPA.181, what conditions must an operator meet to utilize an Individual Aircraft Statistical Fuel Consumption tracking model for contingency fuel?",
    "options": [
      {
        "id": "A",
        "text": "The operator must establish a continuous fuel consumption monitoring fleet database; statistical contingency fuel must be calculated to cover 99% of all statistical fuel deviations on the city-pair, or 95% with an approved Fuel ERA.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Statistical fuel can be used without any historical database if the Captain has 5,000 hours on type.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Statistical fuel allows eliminating the taxi fuel requirement on all flights.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Statistical fuel applies only to single-engine piston aircraft.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Statistical Contingency Fuel Scheme\n* Based on a **Fleet Fuel Monitoring Program** tracking actual versus planned fuel burn.\n* Statistical contingency fuel must cover **99% of historical fuel deviations** (or **95% with Fuel ERA**), replacing the fixed 5% rule.",
      "references": [
        "EASA AMC1 CAT.OP.MPA.181",
        "IATA Airline Fuel Management Toolkit"
      ]
    },
    "metadata": { "difficulty": 0.3 }
  },
  {
    "id": "NJ-FUEL-023",
    "subject_id": "combustible-fuel-schemes",
    "learning_objective": "Engine Fuel Crossfeed Logic and Boost Pump Redundancy",
    "stem": "In executive twin-jet aircraft, how are engine fuel feeds configured during normal operations versus single-engine / crossfeed operations?",
    "options": [
      {
        "id": "A",
        "text": "Each engine is normally gravity/pump-fed independently from its respective wing tank; during crossfeed, the crossfeed valve is opened and the boost pump of the non-supplying tank is turned off (or supply pump selected), allowing one tank to feed both engines or one engine to feed from the opposite tank.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Both engines always feed simultaneously from the center tank only.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Crossfeed valves are mechanically interlocked and cannot be opened in flight.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Crossfeed transfers fuel directly from wing to wing via pressurized air.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Fuel Crossfeed System Architecture\n* Standard configuration is **Independent Tank-to-Engine Feed**.\n* **Crossfeed Valve** connects the left and right fuel manifolds, allowing flexible fuel balancing or engine-out feeding.",
      "references": [
        "AFM Systems: Fuel Distribution System",
        "EASA CS-25.951"
      ]
    },
    "metadata": { "difficulty": 0.2 }
  }
]
fuel_data.extend(fuel_extra)
save_file("combustible-fuel-schemes", "netjets_easa_fuel_schemes.json", fuel_data)

# Additional Minima items (16 to 20)
min_data = load_file("minimos-operacionales-lvo", "netjets_easa_operations_minima.json")
min_extra = [
  {
    "id": "NJ-MIN-016",
    "subject_id": "minimos-operacionales-lvo",
    "learning_objective": "Approach Category Speeds (Vat / Vref Categories A to D)",
    "stem": "How are Aircraft Approach Categories (A, B, C, D) determined under ICAO / EASA PANS-OPS, and what speed parameter is used?",
    "options": [
      {
        "id": "A",
        "text": "Based on the indicated airspeed at the threshold (Vat), which equals 1.3 times the stall speed in landing configuration at maximum certified landing mass: Cat A (< 91 kt), Cat B (91 to 120 kt), Cat C (121 to 140 kt), Cat D (141 to 165 kt).",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Based on aircraft Maximum Takeoff Weight (MTOW) in metric tons.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Based on the maximum cruising Mach number at FL350.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Based on the number of passenger seats installed in the cabin.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Aircraft Approach Categories (ICAO Doc 8168)\n* **$V_{at} = 1.3 \\times V_{so}$** (or $V_{S1g}$) at Maximum Certified Landing Mass.\n* **Category A:** $< 91\\text{ kt}$\n* **Category B:** $91\\text{ to }120\\text{ kt}$ (e.g. Phenom 300, Citation XLS)\n* **Category C:** $121\\text{ to }140\\text{ kt}$ (e.g. Challenger 350, Citation Latitude)\n* **Category D:** $141\\text{ to }165\\text{ kt}$ (e.g. Global 7500, Falcon 7X)",
      "references": [
        "ICAO Doc 8168 (PANS-OPS Vol I)",
        "EASA Part-CAT.OP.MPA.110"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-MIN-017",
    "subject_id": "minimos-operacionales-lvo",
    "learning_objective": "Missed Approach Point (MAPt) on 2D Approaches",
    "stem": "On a 2D Non-Precision Approach (NPA), where is the Missed Approach Point (MAPt) officially located, and when must a missed approach be executed?",
    "options": [
      {
        "id": "A",
        "text": "The MAPt is defined by a navigation fix, DME distance, or elapsed time from FAF; a missed approach must be executed immediately upon reaching the MAPt if required visual references are not established, or immediately upon reaching the MDA/DDA if visual contact is not obtained.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "The MAPt is always at 200 ft AGL regardless of procedure design.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "A missed approach can be delayed until touchdown if the runway is in sight.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "The MAPt is ignored when flying under IFR in Europe.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Missed Approach Point (MAPt)\n* On 2D approaches, **MAPt** is the latest point where a missed approach can be initiated while guaranteeing obstacle clearance along the published missed approach path.\n* When flying **CDFA with a Derived Decision Altitude (DDA)**, the go-around is initiated at the **DDA**, without waiting to reach the MAPt.",
      "references": [
        "ICAO Doc 8168 PANS-OPS",
        "EASA Part-CAT.OP.MPA.115"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-MIN-018",
    "subject_id": "minimos-operacionales-lvo",
    "learning_objective": "Contaminated Runway Takeoff and Landing Performance",
    "stem": "What is the certified definition of a 'Contaminated Runway' under EASA Part-CAT / CS-25?",
    "options": [
      {
        "id": "A",
        "text": "A runway is contaminated when more than 25% of the runway surface area (whether in isolated patches or contiguous) within the required length and width being used is covered by water or slush more than 3 mm deep, or by compacted snow, wet snow, or ice.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "A runway with light dampness causing no reduction in friction.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "A runway with rubber deposits from heavy aircraft landings.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Any runway outside the European Union.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Contaminated Runway Definition (CS-25 & CAT.POL.A)\n* **Contaminated:** **$> 25\\%$** of the runway surface is covered with:\n  - Standing water or slush **$> 3\\text{ mm}$ (0.125 in)** deep.\n  - Loose snow **$> 20\\text{ mm}$** deep.\n  - Compacted snow or ice.\n* Requires **contaminated runway performance tables**, screen height reduction ($15\\text{ ft}$), and no credit for reverse thrust on dry calculations.",
      "references": [
        "EASA CS-25.1591",
        "EASA Part-CAT.POL.A.105"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  }
]
min_data.extend(min_extra)
save_file("minimos-operacionales-lvo", "netjets_easa_operations_minima.json", min_data)

# Additional RVSM items (14 to 17)
rvsm_data = load_file("espacio-rvsm-pbn-lvo", "netjets_easa_rvsm_pbn_spec_ops.json")
rvsm_extra = [
  {
    "id": "NJ-RVSM-014",
    "subject_id": "espacio-rvsm-pbn-lvo",
    "learning_objective": "Wake Turbulence Separation Standards & Categorization",
    "stem": "Under ICAO / EASA wake turbulence classifications (Super, Heavy, Medium, Light), what is the wake turbulence category of executive jets such as the Challenger 350, Citation Latitude, and Phenom 300, and what minimum radar wake separation applies when following a Heavy jet on final approach?",
    "options": [
      {
        "id": "A",
        "text": "Phenom 300 is Light (MTOW <= 7,000 kg), while Citation Latitude and Challenger 350 are Medium (7,000 kg < MTOW < 136,000 kg); when following a Heavy aircraft on final approach, minimum radar wake separation is 5 NM for Medium and 6 NM for Light (or 2 to 3 minutes time separation).",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "All corporate jets are Heavy and require 2 NM separation.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Wake turbulence is negligible behind widebody aircraft above 1,000 ft AGL.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Separation is determined by passenger count rather than certified mass.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### ICAO Wake Turbulence Categories (Doc 4444)\n* **Heavy (H):** MTOW $\\ge 136,000\\text{ kg}$.\n* **Medium (M):** $7,000\\text{ kg} < \\text{MTOW} < 136,000\\text{ kg}$ (Challenger, Latitude, Global).\n* **Light (L):** $\\le 7,000\\text{ kg}$ (Phenom 300, Citation Mustang).\n* **Radar Separation behind Heavy on Approach:**\n  - Behind Heavy -> **Medium = 5 NM**\n  - Behind Heavy -> **Light = 6 NM**",
      "references": [
        "ICAO Doc 4444 (PANS-ATM Chapter 5)",
        "EASA SERA.8015"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-RVSM-015",
    "subject_id": "espacio-rvsm-pbn-lvo",
    "learning_objective": "GNSS RAIM (Receiver Autonomous Integrity Monitoring) Outage",
    "stem": "What is the operational significance of a RAIM (Receiver Autonomous Integrity Monitoring) predictive outage prior to dispatch on an RNP approach?",
    "options": [
      {
        "id": "A",
        "text": "RAIM uses redundant satellite signals (minimum 5 satellites with good geometry, or 4 with Baro-VNAV) to detect satellite faults; if a predictive RAIM outage is forecast at the destination ETA, the crew cannot plan an RNP APCH unless alternative ground-based navigation aids (ILS/VOR) are available.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "RAIM outages only affect aircraft equipped with inertial reference platforms.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "RAIM is only required for military tactical night operations.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "A RAIM outage automatically disconnects the VHF communications transceivers.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### RAIM Prediction & RNP Navigation (SPA.PBN)\n* **RAIM (Receiver Autonomous Integrity Monitoring):** Requires **$\\ge 5$ satellites** (fault detection) or **$\\ge 6$ satellites** (fault exclusion / FDE).\n* If pre-flight RAIM prediction indicates an integrity outage at ETA, dispatch based solely on GPS/RNP approach is **PROHIBITED**; ground-based conventional aids (ILS/VOR) or suitable alternates are required.",
      "references": [
        "EASA Part-SPA.PBN.105",
        "ICAO Doc 9613"
      ]
    },
    "metadata": { "difficulty": 0.3 }
  }
]
rvsm_data.extend(rvsm_extra)
save_file("espacio-rvsm-pbn-lvo", "netjets_easa_rvsm_pbn_spec_ops.json", rvsm_data)

# Additional Aircrew items (12 to 15)
crew_data = load_file("licencias-habilitaciones-aircrew", "netjets_easa_aircrew_regulations.json")
crew_extra = [
  {
    "id": "NJ-CREW-012",
    "subject_id": "licencias-habilitaciones-aircrew",
    "learning_objective": "Pilot Competency Assessment & Evidence-Based Training (EBT)",
    "stem": "What is the core philosophy of Evidence-Based Training (EBT) and Mixed-EBT implemented in modern airline and executive training under EASA Part-ORO.FC.231?",
    "options": [
      {
        "id": "A",
        "text": "Shifting recurrent simulator checking from purely repetitive pass/fail maneuver testing to developing and assessing core pilot behavioral competencies (flight path management, workload management, communication, situational awareness, decision making) based on real airline flight data and incident evidence.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Eliminating all simulator training in favor of oral examinations.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Testing only mechanical engine overhaul knowledge.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Allowing pilots to conduct their own proficiency checks on desktop computers.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Evidence-Based Training (EBT - ORO.FC.231)\n* **EBT** replaces rigid legacy tick-box exams with **competency-based development**.\n* Focuses on the **8 Core ICAO / EASA Behavioral Competencies**:\n  1. Application of Knowledge\n  2. Application of Procedures\n  3. Communication\n  4. Aeroplane Flight Path Management (Manual & Automation)\n  5. Leadership & Teamwork\n  6. Problem Solving & Decision Making\n  7. Situation Awareness\n  8. Workload Management",
      "references": [
        "EASA Part-ORO.FC.231 (Evidence-based training)",
        "ICAO Doc 9995 (Manual on Evidence-Based Training)"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-CREW-013",
    "subject_id": "licencias-habilitaciones-aircrew",
    "learning_objective": "Commercial Pilot Instrument Rating (IR) Revalidation Window",
    "stem": "If an Instrument Rating (IR) is revalidated through a proficiency check within the 3-month window prior to expiration, from what date is the new validity period calculated?",
    "options": [
      {
        "id": "A",
        "text": "From the original expiry date of the current rating (preserving the annual anniversary month for 12 calendar months).",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "From the exact calendar day on which the proficiency check was flown in the simulator.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "From the first day of the calendar month following the check.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "The IR is renewed permanently and never expires once revalidated three times.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### IR Revalidation Rules (Part-FCL.655)\n* Completing the LPC within the **3-month window preceding expiry** ensures the rating is extended for **12 calendar months from the original expiration date**.",
      "references": [
        "EASA Part-FCL.655 (Revalidation of IR)",
        "AMC1 FCL.655"
      ]
    },
    "metadata": { "difficulty": 0.2 }
  }
]
crew_data.extend(crew_extra)
save_file("licencias-habilitaciones-aircrew", "netjets_easa_aircrew_regulations.json", crew_data)

# Additional CRM items (16 to 18)
crm_data = load_file("escenarios-netjets-despacho-crm", "netjets_interview_scenarios_crm.json")
crm_extra = [
  {
    "id": "NJ-CRM-016",
    "subject_id": "escenarios-netjets-despacho-crm",
    "learning_objective": "Low Fuel State Diversion Decision-Making",
    "stem": "Scenario: En-route to Nice (LFMN), strong unforecast headwinds reduce fuel upon arrival. ATC puts the aircraft into a holding pattern. Destination weather is fine, but alternate (Marseille LFML) requires 1,200 kg. You have 1,700 kg onboard (Final Reserve Fuel is 500 kg). What is your definitive holding limit fuel and course of action?",
    "options": [
      {
        "id": "A",
        "text": "Holding Limit Fuel (Divert Fuel) is exactly 1,700 kg (Alternate Fuel 1,200 kg + Final Reserve 500 kg); you cannot accept any holding delay and must immediately inform ATC: 'Unable to hold, proceeding to destination for immediate approach or diverting to alternate'; if holding is enforced, declare 'MINIMUM FUEL' and divert immediately to Marseille.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Hold for 30 minutes and plan to land with zero fuel.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Shut down one engine in the holding pattern to extend endurance.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Divert to an unpaved grass strip 5 NM away without notifying ATC.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Divert Fuel & Minimum Fuel Decision Logic\n* $\\text{Divert Fuel} = \\text{Alternate Fuel} (1,200\\text{ kg}) + \\text{Final Reserve Fuel} (500\\text{ kg}) = 1,700\\text{ kg}$.\n* With $1,700\\text{ kg}$ on board, **Holding Time available = 0 minutes**.\n* Crew must either commence approach immediately or divert to alternate with zero delay.",
      "references": [
        "EASA CAT.OP.MPA.182",
        "ICAO Doc 9976 (Flight Planning and Fuel Management)"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-CRM-017",
    "subject_id": "escenarios-netjets-despacho-crm",
    "learning_objective": "Volcanic Ash Cloud Inadvertent Encounter",
    "stem": "What are the immediate flight crew memory and checklist actions upon an inadvertent volcanic ash encounter in flight?",
    "options": [
      {
        "id": "A",
        "text": "Immediately disengage autothrottle, reduce thrust to flight idle (to reduce turbine operating temperatures below ash melting/glass-vitrification threshold), turn 180° to exit the cloud, turn ON continuous engine ignition and all anti-ice systems, start APU, and don oxygen masks at 100% if smoke/fumes enter the flight deck.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Apply full TOGA thrust and climb at maximum angle of attack.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Open cabin outflow valves and turn off electrical generators.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Extend landing gear and speedbrakes to increase drag.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Volcanic Ash Cloud Encounter (ICAO Doc 9691 & QRH)\n* **Thrust to IDLE:** Prevents volcanic ash from melting inside high-pressure turbine stages and resolidifying into glass that blocks turbine nozzles.\n* **Exit Cloud:** Perform a **descending $180^\\circ$ turn**.\n* **Engine Reliability:** Engage **Continuous Ignition**, start **APU**, don **Oxy Masks** if fumes present.",
      "references": [
        "ICAO Doc 9691 (Manual on Volcanic Ash, Radioactive Material and Toxic Chemical Clouds)",
        "EASA SIB 2010-17"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  }
]
crm_data.extend(crm_extra)
save_file("escenarios-netjets-despacho-crm", "netjets_interview_scenarios_crm.json", crm_data)

print("\nExpansion script completed successfully!")
