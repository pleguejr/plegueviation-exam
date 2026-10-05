# -*- coding: utf-8 -*-
import json
import os

BASE_DIR = r"c:\Users\plegu\My Drive\Antigravity\Plegueviation exam\banks\netjets-interview"

# =========================================================================
# 1. historia-evolucion-netjets (20 items)
# =========================================================================
from build_all_english_banks import historia

# =========================================================================
# 2. combustible-fuel-schemes (25 items)
# =========================================================================
fuel = [
  {
    "id": "NJ-FUEL-001",
    "subject_id": "combustible-fuel-schemes",
    "learning_objective": "EASA Fuel Schemes - Framework (CAT.OP.MPA.180 & 181)",
    "stem": "Under EASA Part-CAT (CAT.OP.MPA.180/181), what are the fundamental differences between a 'Basic Fuel Scheme' and a 'Basic Fuel Scheme with Variations'?",
    "options": [
      {
        "id": "A",
        "text": "A Basic Fuel Scheme uses standard, fixed regulatory reserves (e.g. standard 5% contingency and full alternate fuel), whereas a Basic Fuel Scheme with Variations allows approved reductions (such as 3% contingency with Fuel ERA, RCF, or isolated aerodrome schemes) based on an advanced operational control system with active flight monitoring.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "The Basic Scheme applies only to turboprops under 5,700 kg, while Variations apply exclusively to widebody transoceanic flights.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Basic with Variations eliminates the legal requirement for final reserve fuel if an airborne FMC recalculation is performed.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "The Basic Scheme does not require an operational flight plan (OFP) for domestic flights.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### EASA Fuel Schemes Architecture\n* **Basic Fuel Scheme (CAT.OP.MPA.180):** Standard conservative pre-flight calculation: Taxi + Trip + 5% Contingency + Destination Alternate + 30 min Final Reserve.\n* **Basic Fuel Scheme with Variations (CAT.OP.MPA.181):** Allows optimized fuel planning (e.g., 3% Contingency with En-route Alternate Fuel ERA, Reduced Contingency Fuel Procedure RCF, Decision Point Procedure, Isolated Aerodrome Scheme), requiring operational control approvals, automated flight planning, and flight monitoring.",
      "references": [
        "EASA Part-CAT.OP.MPA.180 / 181",
        "AMC1/AMC2 CAT.OP.MPA.181"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-FUEL-002",
    "subject_id": "combustible-fuel-schemes",
    "learning_objective": "Final Reserve Fuel for Turbine-Powered Aeroplanes",
    "stem": "What is the mandatory regulatory definition and duration of 'Final Reserve Fuel' for turbine-powered aircraft under EASA Part-CAT?",
    "options": [
      {
        "id": "A",
        "text": "Fuel to fly for 30 minutes at holding speed at 1,500 ft (450 m) above aerodrome elevation in standard ISA conditions.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Fuel to fly for 45 minutes at normal cruising speed at FL100.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Fuel to fly for 20 minutes at long-range cruise speed at optimal altitude.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Fuel to fly for 60 minutes at holding speed at 1,500 ft above the destination alternate.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Final Reserve Fuel (CAT.OP.MPA.180)\n* For **turbine-powered aeroplanes**, final reserve fuel is calculated to fly for **30 minutes at holding speed at 1,500 ft (450 m)** above aerodrome elevation in standard ISA atmosphere.\n* For **reciprocating (piston) aeroplanes**, the final reserve is **45 minutes**.\n* Final reserve fuel is **sacrosanct**; landing with less than final reserve fuel requires declaring `MAYDAY MAYDAY MAYDAY FUEL`.",
      "references": [
        "EASA Part-CAT.OP.MPA.180(b)",
        "ICAO Annex 6 Part I"
      ]
    },
    "metadata": { "difficulty": 0.2 }
  },
  {
    "id": "NJ-FUEL-003",
    "subject_id": "combustible-fuel-schemes",
    "learning_objective": "Destination Alternate Fuel Components",
    "stem": "Which flight phases and navigation segments must be included when calculating 'Alternate Fuel' to a destination alternate under EASA regulations?",
    "options": [
      {
        "id": "A",
        "text": "Missed approach procedure from destination DA/MDA to missed approach altitude, climb from missed approach altitude to cruising level, cruise from destination to alternate, descent to initial approach fix, and instrument approach followed by landing at the destination alternate.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Straight-line direct flight from destination airport reference point to alternate airport reference point at FL100.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Cruise fuel only, assuming radar vectors will eliminate instrument arrival procedures.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "30 minutes of standard cruise fuel regardless of the physical distance to the alternate.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Alternate Fuel Profile (AMC1 CAT.OP.MPA.180)\n* **Alternate Fuel** must cover the complete profile:\n  1. Missed approach at destination from DA/MDA.\n  2. Climb to appropriate cruising level.\n  3. Cruise via routing.\n  4. Descent to Initial Approach Fix (IAF).\n  5. Approach and landing at destination alternate.",
      "references": [
        "EASA AMC1 CAT.OP.MPA.180",
        "NetJets Europe Operations Manual (MOA 8.1.7)"
      ]
    },
    "metadata": { "difficulty": 0.2 }
  },
  {
    "id": "NJ-FUEL-004",
    "subject_id": "combustible-fuel-schemes",
    "learning_objective": "No Destination Alternate Required - Additional Fuel Margin",
    "stem": "If an IFR flight is dispatched without a destination alternate aerodrome (isolated or dual-runway destination with benign weather), what additional fuel must be planned under EASA CAT.OP.MPA.180?",
    "options": [
      {
        "id": "A",
        "text": "Fuel to fly for 15 minutes at holding speed at 1,500 ft (450 m) above destination aerodrome elevation in standard ISA conditions.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Fuel to fly for 45 minutes at long-range cruise speed.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "No additional fuel is required beyond the 5% contingency.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Fuel to return to departure aerodrome regardless of flight duration.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Flights Dispatched Without Destination Alternate\n* Under EASA **CAT.OP.MPA.180**, when an IFR flight is planned without a destination alternate, the operator must carry an additional **15 minutes of fuel at holding speed at 1,500 ft above destination** in standard ISA conditions, on top of trip fuel, contingency, and 30 min final reserve.",
      "references": [
        "EASA CAT.OP.MPA.180(c)(3)",
        "AMC1 CAT.OP.MPA.180"
      ]
    },
    "metadata": { "difficulty": 0.3 }
  },
  {
    "id": "NJ-FUEL-005",
    "subject_id": "combustible-fuel-schemes",
    "learning_objective": "Contingency Fuel - 3% with Fuel ERA (En-Route Alternate)",
    "stem": "Under a Basic Fuel Scheme with Variations, what criteria must a selected En-Route Alternate (Fuel ERA) satisfy to allow reducing contingency fuel from 5% to 3% of planned trip fuel?",
    "options": [
      {
        "id": "A",
        "text": "The Fuel ERA must be located within a circle whose radius is equal to 20% of the planned total flight distance, centered on the planned route at a distance from destination equal to 25% of the total flight distance, or 20% plus 50 NM (whichever is greater).",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "The Fuel ERA must be within 15 minutes flight time from the departure aerodrome at single-engine cruise speed.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "The Fuel ERA must have CAT III autoland capabilities and military radar surveillance.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "The Fuel ERA must be situated exactly halfway along the flight plan route.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### 3% Contingency Fuel with Fuel ERA (AMC1 CAT.OP.MPA.181)\n* Reducing contingency fuel from **5% to 3%** requires an approved **Fuel En-Route Alternate (Fuel ERA)**.\n* The ERA must lie within a designated geographic circle:\n  - Radius: **20% of total route distance**.\n  - Center: Located on the route at **25% of total route distance from destination** (or 20% + 50 NM, whichever is greater).",
      "references": [
        "EASA AMC1 CAT.OP.MPA.181(b)",
        "EASA Part-CAT Fuel Scheme Variations"
      ]
    },
    "metadata": { "difficulty": 0.35 }
  },
  {
    "id": "NJ-FUEL-006",
    "subject_id": "combustible-fuel-schemes",
    "learning_objective": "Reduced Contingency Fuel (RCF) Procedure",
    "stem": "What is the operational concept of the Reduced Contingency Fuel (RCF) Procedure under EASA fuel planning?",
    "options": [
      {
        "id": "A",
        "text": "A procedure dividing the flight at a pre-selected Decision Point: planning fuel to an en-route commercial destination 1 with full contingency and alternates, while carrying sufficient fuel to commit at the Decision Point to proceed to the final destination 2 with contingency calculated only from the Decision Point.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "A procedure permitting zero contingency fuel if the autopilot is engaged throughout climb.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "A waiver allowing pilots to reduce final reserve fuel to 10 minutes in executive charter flights.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "A procedure where air-to-air refueling is designated in the OFP.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Reduced Contingency Fuel (RCF) / Decision Point Procedure\n* **RCF** optimizes payload on long sectors.\n* At dispatch, fuel is calculated to Destination 1 (En-route Alternate) with standard reserves, and to Destination 2 (Final Destination) with contingency fuel calculated **only from the Decision Point to Destination 2**.\n* At the Decision Point, the Commander checks remaining fuel: if above minimum required, proceeds to Destination 2; otherwise, diverts to Destination 1.",
      "references": [
        "EASA AMC1 CAT.OP.MPA.181(c)",
        "ICAO Flight Planning Manual"
      ]
    },
    "metadata": { "difficulty": 0.3 }
  },
  {
    "id": "NJ-FUEL-007",
    "subject_id": "combustible-fuel-schemes",
    "learning_objective": "Isolated Aerodrome Fuel Policy",
    "stem": "When an aerodrome is designated as an 'Isolated Aerodrome' under EASA fuel rules, what specific fuel quantity must be carried in lieu of destination alternate fuel?",
    "options": [
      {
        "id": "A",
        "text": "Fuel to fly for 2 hours at normal cruising consumption above the destination aerodrome (including final reserve fuel).",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Fuel to fly for 45 minutes at maximum range speed.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Fuel to fly 300 NM in any direction at FL250.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Fuel to fly for 4 hours at holding speed at 1,500 ft.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Isolated Aerodrome Fuel Scheme (AMC1 CAT.OP.MPA.181)\n* An aerodrome is isolated when no suitable alternate exists within a reasonable distance.\n* For turbine-powered aircraft, the alternate fuel is replaced by **2 hours of fuel at normal cruising consumption** above the destination aerodrome (which includes the final reserve fuel).",
      "references": [
        "EASA AMC1 CAT.OP.MPA.181",
        "ICAO Annex 6 Part I"
      ]
    },
    "metadata": { "difficulty": 0.3 }
  },
  {
    "id": "NJ-FUEL-008",
    "subject_id": "combustible-fuel-schemes",
    "learning_objective": "In-Flight Fuel Management & Minimum Fuel vs Mayday Fuel",
    "stem": "What is the precise regulatory threshold and phraseology when in-flight fuel degrades such that any change to the existing clearance may result in landing with less than planned final reserve fuel, versus when landing with less than final reserve fuel is inevitable?",
    "options": [
      {
        "id": "A",
        "text": "'MINIMUM FUEL' when commitment to a specific runway is made and any delay may jeopardize final reserve (informational, not an emergency); 'MAYDAY MAYDAY MAYDAY FUEL' when calculated usable fuel upon landing will be less than the planned final reserve fuel (formal declaration of distress).",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "'PAN PAN FUEL' when below final reserve; 'MAYDAY FUEL' when below 100 kg total fuel.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "'PRIORITY FUEL' when alternate fuel is consumed; 'EMERGENCY FUEL' when both low-pressure pumps fail.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "'MINIMUM FUEL' implies immediate ATC priority and priority vectors over all other traffic.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Minimum Fuel vs Mayday Fuel (CAT.OP.MPA.182 & ICAO Doc 4444)\n* **MINIMUM FUEL:** Informs ATC that all planned aerodrome options are committed and any unforeseen delay may result in landing with less than planned final reserve fuel. **It does NOT give priority**, but alerts ATC not to delay the flight.\n* **MAYDAY MAYDAY MAYDAY FUEL:** Mandatory distress call when estimated fuel on touchdown is **LESS THAN FINAL RESERVE FUEL**. Gives absolute distress priority.",
      "references": [
        "EASA CAT.OP.MPA.182",
        "ICAO Annex 6 & Doc 4444 (PANS-ATM)"
      ]
    },
    "metadata": { "difficulty": 0.2 }
  },
  {
    "id": "NJ-FUEL-009",
    "subject_id": "combustible-fuel-schemes",
    "learning_objective": "Jet Fuel Freezing Points & Temperature Limits",
    "stem": "What is the standard freezing point of Jet A-1 compared to Jet A, and what operational rule governs in-flight fuel temperature monitoring?",
    "options": [
      {
        "id": "A",
        "text": "Jet A-1 freezes at -47°C, whereas Jet A freezes at -40°C; the minimum fuel temperature in flight must remain at least 3°C above the certified fuel freezing point.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Jet A-1 freezes at -60°C and Jet A freezes at -50°C; minimum fuel temperature must be maintained above 0°C at all times.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Both fuels freeze at -35°C; fuel heaters operate continuously above FL350.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Jet A-1 has no freezing point because of mandatory anti-icing additive (PRIST) in all European refuelings.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Aviation Fuel Freezing Points\n* **Jet A-1 (Standard worldwide / Europe):** Maximum freezing point is **-47°C**.\n* **Jet A (Standard in the United States):** Maximum freezing point is **-40°C**.\n* **Operational Safety Rule:** In flight, fuel temperature must stay **at least 3°C above freezing point** (e.g. minimum -44°C for Jet A-1 or -37°C for Jet A). If fuel temperature approaches limits, crew must accelerate (increasing aerodynamic kinetic heating) or descend to warmer air.",
      "references": [
        "ASTM D1655 / DEF STAN 91-091 Specifications",
        "EASA CS-25 Fuel System Certification Standards"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-FUEL-010",
    "subject_id": "combustible-fuel-schemes",
    "learning_objective": "Fuel Crosscheck Tolerance Before Departure",
    "stem": "Before departure, what is the standard allowable discrepancy between the total fuel quantity calculated on the Operational Flight Plan (OFP) / Loadsheet and the onboard physical fuel quantity indicators (gauges) before investigation is required?",
    "options": [
      {
        "id": "A",
        "text": "Discrepancy must not exceed ±3% of the required departure fuel (or maximum 100-200 kg depending on aircraft type).",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Discrepancies up to ±10% are acceptable provided the Captain signs the ATL.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "The aircraft may depart with any quantity provided the low-level warning light is extinguished.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Gauges are ignored if the fuel truck delivery meter receipt is signed.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Pre-Flight Fuel Crosscheck (MOA 8.1.7)\n* Standard airline and corporate jet procedures require a three-way crosscheck:\n  1. Fuel remaining before uplift.\n  2. Uplift volume from fuel truck meter / density calculation.\n  3. Total fuel shown on cockpit fuel quantity indicators (FQIS).\n* Maximum allowable discrepancy is **±3%** (or type-specific limit). Discrepancies exceeding this require checking water drains, density, or dipsticks.",
      "references": [
        "EASA Part-CAT.OP.MPA.175",
        "NetJets Europe Operations Manual (MOA 8.1.7.3)"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-FUEL-011",
    "subject_id": "combustible-fuel-schemes",
    "learning_objective": "Fuel Leak In-Flight Diagnosis & Management",
    "stem": "Which of the following symptoms definitively indicates an in-flight fuel leak rather than normal engine consumption or fuel gauge sensor error?",
    "options": [
      {
        "id": "A",
        "text": "An unexplained fuel quantity decrease in one tank with total fuel quantity decreasing faster than total engine fuel flow, or a persistent fuel imbalance requiring frequent crossfeeding with normal engine parameters.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Both fuel flow indicators showing zero while engines operate normally.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Fuel temperature rising 5°C during high-speed cruise.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Fuel tank pressure warning activating during rapid descent.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Fuel Leak Diagnosis & Golden Rule\n* **Symptoms:** Total fuel remaining decreases faster than total fuel consumed (integrated fuel flow); visual fuel spray from wing trailing edge; unexplained rapid imbalance.\n* **Critical Safety Rule:** **NEVER crossfeed fuel to an engine suspected of having a leak**, as this may feed the leak and drain the good tank! Isolate the leak and land at the nearest suitable aerodrome.",
      "references": [
        "QRH Emergency Procedures: Fuel Leak",
        "EASA SIB 2018-12 (In-Flight Fuel Management)"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-FUEL-012",
    "subject_id": "combustible-fuel-schemes",
    "learning_objective": "Fuel Jettisoning (Dumping) Regulations",
    "stem": "What operational precautions and ATC coordination must be observed if fuel jettisoning (dumping) becomes necessary during an emergency return?",
    "options": [
      {
        "id": "A",
        "text": "Coordinate with ATC to jettison in designated dumping areas or over unpopulated terrain/water, generally at or above 5,000 to 6,000 ft AGL to allow fuel vaporization before reaching the surface, maintaining vertical separation from other aircraft.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Jettison fuel immediately on final approach at 500 ft AGL with flaps extended.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Fuel dumping is strictly prohibited under European civil airspace regulations.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Dump fuel only during supersonic flight to ensure immediate dispersion.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Fuel Jettisoning Principles (ICAO Doc 4444 / SERA)\n* Fuel jettisoning requires **immediate ATC notification**.\n* ATC will clear the flight to a dedicated dumping area or over water/unpopulated areas, clear of thunderstorm activity, with **minimum recommended altitude of 5,000 to 6,000 ft AGL**.\n* Other traffic is separated by at least **1,000 ft vertically and 10 NM laterally**.",
      "references": [
        "ICAO Doc 4444 (PANS-ATM Chapter 15)",
        "SERA.8015 (Operational Air Traffic Procedures)"
      ]
    },
    "metadata": { "difficulty": 0.3 }
  },
  {
    "id": "NJ-FUEL-013",
    "subject_id": "combustible-fuel-schemes",
    "learning_objective": "Contingency Fuel - Standard Minimums",
    "stem": "What is the absolute minimum amount of contingency fuel required on an IFR flight under the Basic Fuel Scheme if statistical fuel consumption data is not used?",
    "options": [
      {
        "id": "A",
        "text": "5% of the planned trip fuel, but in no case less than the fuel required to fly for 5 minutes at holding speed at 1,500 ft (450 m) above the destination aerodrome in standard ISA conditions.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "10% of the planned trip fuel, but not less than 30 minutes of cruise fuel.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "A fixed quantity of 250 kg for all executive jets.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "15% of the trip fuel regardless of flight duration.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Standard 5% Contingency Rule (CAT.OP.MPA.180)\n* Under standard EASA rules, contingency fuel is **5% of planned trip fuel**.\n* It is subject to a hard **floor**: it cannot be less than **5 minutes holding fuel at 1,500 ft AAL** in ISA conditions at the destination.",
      "references": [
        "EASA CAT.OP.MPA.180",
        "AMC1 CAT.OP.MPA.180"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-FUEL-014",
    "subject_id": "combustible-fuel-schemes",
    "learning_objective": "Extra Fuel / Commander's Discretionary Fuel",
    "stem": "How is 'Extra Fuel' defined in the Operational Flight Plan, and under whose authority can it be added before flight?",
    "options": [
      {
        "id": "A",
        "text": "Fuel added at the discretion of the Commander and/or Dispatcher to account for anticipated operational delays, weather deviations, holding, or economic tankering, carried above all mandatory regulatory fuel components.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Fuel that replaces the final reserve fuel when flying short hops.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Unusable fuel trapped in the sumps that cannot be consumed by the engines.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Fuel dedicated exclusively to cabin heating during ground embarkation.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Extra Fuel (Discretionary Fuel)\n* **Extra Fuel** is added on top of all regulatory fuel requirements (Taxi + Trip + Contingency + Alternate + Final Reserve + Additional).\n* The **Commander has the ultimate legal authority** to add discretionary fuel based on actual weather, VIP requirements, expected ATC slot delays, or tankering strategy.",
      "references": [
        "EASA CAT.OP.MPA.180",
        "NetJets Europe Operations Manual (MOA 8.1.7)"
      ]
    },
    "metadata": { "difficulty": 0.2 }
  },
  {
    "id": "NJ-FUEL-015",
    "subject_id": "combustible-fuel-schemes",
    "learning_objective": "In-Flight Fuel Monitoring Frequency",
    "stem": "What is the standard required frequency for in-flight fuel checks and log entries under EASA Part-CAT during cruise?",
    "options": [
      {
        "id": "A",
        "text": "At regular intervals not exceeding 30 to 60 minutes, and at each designated operational waypoint, recording actual fuel remaining and comparing it with the OFP planned fuel profile.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Only once at Top of Climb (TOC) and once at Top of Descent (TOD).",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Only if a low fuel warning annunciates on the EICAS/CAS.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Continuously every 5 minutes by the Pilot Monitoring.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### In-Flight Fuel Checks (CAT.OP.MPA.182)\n* Crews must conduct periodic fuel checks at least **every 30 to 60 minutes** (or at planned waypoints).\n* The check verifies: **Actual Fuel Remaining vs. Planned OFP Fuel**, ensuring the flight is burning within expected fuel burn limits and will reach destination with required reserves.",
      "references": [
        "EASA Part-CAT.OP.MPA.182",
        "AMC1 CAT.OP.MPA.182"
      ]
    },
    "metadata": { "difficulty": 0.2 }
  }
]

print("Writing combustible-fuel-schemes...")
with open(os.path.join(BASE_DIR, "combustible-fuel-schemes", "netjets_easa_fuel_schemes.json"), "w", encoding="utf-8") as f:
    json.dump(fuel, f, indent=2, ensure_ascii=False)

print("Done fuel.")
