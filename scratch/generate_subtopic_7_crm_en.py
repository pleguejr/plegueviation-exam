# -*- coding: utf-8 -*-
import json
import os

BASE_DIR = r"c:\Users\plegu\My Drive\Antigravity\Plegueviation exam\banks\netjets-interview"

# =========================================================================
# 7. escenarios-netjets-despacho-crm (25 items)
# =========================================================================
crm = [
  {
    "id": "NJ-CRM-001",
    "subject_id": "escenarios-netjets-despacho-crm",
    "learning_objective": "NetJets Owner Interaction vs Uncompromised Safety",
    "stem": "Scenario: A high-profile fractional Owner approaches the flight deck in Geneva, stating that due to an urgent corporate acquisition meeting in London, you must depart immediately despite destination fog reporting RVR 200 m (CAT I only airport, minima 550 m, no improvement forecast, no take-off alternate within fuel range). How should the NetJets Commander handle this situation?",
    "options": [
      {
        "id": "A",
        "text": "Politely and assertively explain that safety is our absolute priority and EASA regulations legally prohibit departing when weather is below legal limits; immediately coordinate with Lisbon OCC/Dispatch to provide viable alternatives (e.g. routing to London Stansted or Luton with CAT III autoland capability, arranging executive ground transport).",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Accept the flight on the condition that the Owner signs a liability waiver acknowledging personal risk.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Depart immediately and plan to perform a visual approach below cloud base over the city.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Delegate the decision to the First Officer so the Captain avoids direct confrontation with the VIP.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### NetJets Interview Benchmark: The Owner Mindset & Uncompromising Safety\n* **Safety Standard:** Flight safety and EASA regulations are **100% non-negotiable**.\n* **Customer Service Approach:** Never respond with aggressive or dismissive rejection. Use **empathy, professionalism, and proactive solutions**.\n* Explain the constraint clearly (*'Our commitment to your safety and aviation law means we cannot land at that specific runway'*), then immediately provide **solutions** arranged with Dispatch (e.g. divert to a CAT III equipped airport with luxury ground transport).",
      "references": [
        "NetJets Europe Operations Manual (MOA 1.4)",
        "NetJets Crew Resource Management & Executive Service Standards"
      ]
    },
    "metadata": { "difficulty": 0.2 }
  },
  {
    "id": "NJ-CRM-002",
    "subject_id": "escenarios-netjets-despacho-crm",
    "learning_objective": "MEL Rectification Intervals and Day of Discovery (ORO.MLR.105)",
    "stem": "Under EASA Part-ORO.MLR.105 and CS-MMEL, what are the standard rectification intervals for MEL Categories A, B, C, and D, and how is the 'Day of Discovery' calculated?",
    "options": [
      {
        "id": "A",
        "text": "Cat A: specific timeframe specified in the item remarks; Cat B: 3 consecutive calendar days (72 hours); Cat C: 10 consecutive calendar days (240 hours); Cat D: 120 consecutive calendar days. The Day of Discovery (the day the defect is entered in the ATL) is EXCLUDED from the count.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Cat A: 1 day; Cat B: 2 days; Cat C: 3 days; Cat D: 4 days; the day of discovery counts as Day 1.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "All categories expire after 24 flight hours.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "MEL intervals only apply during scheduled A-checks at base maintenance.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### MEL Rectification Intervals (CS-MMEL & ORO.MLR.105)\n* **Category A:** Specific time limit stated in the MEL remarks.\n* **Category B:** **3 consecutive calendar days** (72 hours).\n* **Category C:** **10 consecutive calendar days** (240 hours).\n* **Category D:** **120 consecutive calendar days**.\n* **Day of Discovery Rule:** The calendar day on which the defect was recorded in the Aircraft Technical Log (ATL) **DOES NOT COUNT**. The clock starts at 00:00 local time on the following calendar day.",
      "references": [
        "EASA CS-MMEL.140",
        "EASA Part-ORO.MLR.105"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-CRM-003",
    "subject_id": "escenarios-netjets-despacho-crm",
    "learning_objective": "MEL (M) Maintenance Procedures vs (O) Operational Procedures",
    "stem": "What is the key regulatory and operational distinction between an (M) procedure and an (O) procedure in the Minimum Equipment List (MEL)?",
    "options": [
      {
        "id": "A",
        "text": "An (M) procedure requires a qualified maintenance certifying engineer (or trained/authorized crew if expressly allowed by the Operations Manual) to complete and sign off a physical technical action prior to flight; an (O) procedure is an operational procedure executed by the flight crew during flight preparation or in-flight.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "(M) stands for Mandatory and (O) stands for Optional.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "(M) procedures can be skipped on return flights to base.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "(O) procedures require grounding the aircraft until an engineer arrives.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### MEL (M) vs (O) Procedures\n* **(M) Maintenance Procedure:** Technical task (e.g. pulling/collaring circuit breakers, installing blanking plates, manual valve securing). Must be performed and certified by **licensed maintenance personnel** (or authorized crew if designated in MOA).\n* **(O) Operational Procedure:** Task performed by the **flight crew** (e.g. crosscheck charts, apply performance penalties, alter FMS inputs).",
      "references": [
        "EASA CS-MMEL.135",
        "EASA Part-ORO.MLR.105"
      ]
    },
    "metadata": { "difficulty": 0.2 }
  },
  {
    "id": "NJ-CRM-004",
    "subject_id": "escenarios-netjets-despacho-crm",
    "learning_objective": "CDL (Configuration Deviation List) vs MEL",
    "stem": "What is the fundamental difference between the Minimum Equipment List (MEL) and the Configuration Deviation List (CDL)?",
    "options": [
      {
        "id": "A",
        "text": "The MEL covers inoperative aircraft systems, instruments, and equipment; the CDL (part of the AFM) covers operations with missing secondary external aircraft parts (such as fairings, access panels, or vortex generators), specifying applicable performance and fuel burn penalties.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "The MEL is issued by ATC, while the CDL is issued by the airport operator.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "The CDL applies only during landing gear extension malfunctions.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "There is no difference; CDL is the American term for MEL.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### MEL vs CDL\n* **MEL (Minimum Equipment List):** Inoperative internal equipment, instruments, electrical buses, hydraulic systems.\n* **CDL (Configuration Deviation List):** Missing secondary external parts (flap track fairings, static discharge wicks, vortex generators). Included in the **Aircraft Flight Manual (AFM)** with specific weight, drag, and fuel burn penalties.",
      "references": [
        "EASA CS-25 Appendix G (Configuration Deviation List)",
        "EASA Part-CAT.POL.A.105"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-CRM-005",
    "subject_id": "escenarios-netjets-despacho-crm",
    "learning_objective": "Dangerous Goods Notification to Captain (NOTOC)",
    "stem": "What critical information must be provided in the Notification to Captain (NOTOC) prior to departure under EASA Part-SPA.DG.105 when carrying dangerous goods on a flight?",
    "options": [
      {
        "id": "A",
        "text": "UN/ID number, proper shipping name, class/division, net quantity per package, exact loading location in cargo compartments, and the ICAO emergency response drill code (ERG drill code).",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Only the commercial invoice price and shipper's contact phone number.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "The NOTOC is verbal and no written record is kept.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Dangerous goods information is confidential and hidden from the flight crew.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### NOTOC Requirements (SPA.DG.105 & ICAO Doc 9284)\n* The **NOTOC (Notification to Captain)** is a mandatory written document given to the Commander before departure.\n* It includes: **UN Number, Proper Shipping Name, Hazard Class, Quantity, Compartment Location, and Emergency Drill Code**.\n* Essential for the crew to transmit precise emergency data to ATC and airport fire services (RFFS) in case of smoke or fire.",
      "references": [
        "EASA Part-SPA.DG.105",
        "ICAO Technical Instructions (Doc 9284)"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-CRM-006",
    "subject_id": "escenarios-netjets-despacho-crm",
    "learning_objective": "Lithium Battery Thermal Runaway in Cabin",
    "stem": "Scenario: During cruise on a Citation Latitude, a passenger's personal electronic device (laptop/phone) exhibits smoke and sparks in the passenger cabin. What is the immediate, scientifically validated fire extinguishing procedure according to ICAO / EASA cabin safety guidelines?",
    "options": [
      {
        "id": "A",
        "text": "Extinguish the visible flame with a Halon or water extinguisher, then immediately douse the battery device with copious amounts of water or non-flammable liquid to cool the battery cells and halt the exothermic thermal runaway propagation; never use ice, smother with blankets, or place in an airtight bag.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Cover the smoking device with heavy blankets and place it in the microwave oven.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Pack the device in ice from the galley bar to cool it down.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Immediately open the emergency exit door to vent the smoke overboard.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Lithium Battery Thermal Runaway Procedure (ICAO Doc 9481 & EASA SIB)\n* **Step 1:** Extinguish open flames using **Halon or Water fire extinguisher**.\n* **Step 2 (Crucial):** **Pour copious water / non-flammable liquids** directly onto the device to **cool the internal cells** and stop chemical thermal runaway chain reactions.\n* **Warnings:** **NEVER USE ICE** (ice insulates heat and accelerates thermal runaway). **NEVER SMOTHER** with dry blankets.",
      "references": [
        "ICAO Doc 9481 (Emergency Response Guidance for Aircraft Incidents Involving Dangerous Goods)",
        "EASA SIB 2017-01 (PED In-Flight Fire Management)"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-CRM-007",
    "subject_id": "escenarios-netjets-despacho-crm",
    "learning_objective": "London City Airport (EGLC) Steep Approach Operations",
    "stem": "What unique operational and aircraft certification requirements are mandatory to conduct operations at London City Airport (EGLC)?",
    "options": [
      {
        "id": "A",
        "text": "Aircraft certified for Steep Approach (5.5° glidepath), specialized EGPWS steep approach mode activation, qualified flight crews with simulator training and recent experience, and strict performance calculations for short runway operations.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Standard CAT III ILS autoland with 3.0° glidepath.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Single-pilot VFR operations only during high tide.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Touchdown must occur at least 1,500 m down the runway.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### London City (EGLC) Operations & Steep Approach\n* **Glidepath:** **$5.5^\\circ$** (compared to standard $3.0^\\circ$).\n* **Aircraft Certification:** Requires specific AFM Steep Approach supplement (e.g. modified fly-by-wire speedbrake logic on Falcon/Challenger/Phenom).\n* **Avionics:** GPWS/EGPWS steep approach mode must be engaged to prevent false terrain alerts.\n* **Crew Qualification:** Dedicated simulator steep approach training and line check.",
      "references": [
        "EASA Part-CAT.POL.A.245 (Steep approach procedures)",
        "UK AIP EGLC AD 2.22"
      ]
    },
    "metadata": { "difficulty": 0.3 }
  },
  {
    "id": "NJ-CRM-008",
    "subject_id": "escenarios-netjets-despacho-crm",
    "learning_objective": "High Density Altitude & Mountain Operations: Samedan (LSZS)",
    "stem": "What are the primary operational hazards and performance considerations when operating at high-altitude Alpine airports such as Samedan/St. Moritz (LSZS, elevation 5,600 ft MSL)?",
    "options": [
      {
        "id": "A",
        "text": "Significantly reduced engine thrust and aerodynamic climb gradient due to high density altitude, higher true airspeed (TAS) on approach leading to longer landing distances, severe mountain wave turbulence/downdrafts, and strict single-engine escape routing.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Indicated airspeed (IAS) increases by 50% on final approach.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Landing distance is shorter because air resistance is reduced.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Pressurization cannot be operated at high elevation airports.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### High Density Altitude Operations (Samedan LSZS)\n* At **5,600 ft MSL** in warm conditions, density altitude can exceed 8,000 ft.\n* **Effects:** For the same Indicated Airspeed (IAS), True Airspeed (TAS) and groundspeed are **much higher**, drastically increasing **landing distance and turn radii** in tight valleys.\n* Engine thrust and climb gradients are degraded; meticulous single-engine escape procedures are required.",
      "references": [
        "Swiss FOCA Airport Briefing LSZS (Samedan)",
        "EASA SIB 2014-17 (Operations at High Elevation Mountain Aerodromes)"
      ]
    },
    "metadata": { "difficulty": 0.3 }
  },
  {
    "id": "NJ-CRM-009",
    "subject_id": "escenarios-netjets-despacho-crm",
    "learning_objective": "Structured Aeronautical Decision Making (FOR-DEC Model)",
    "stem": "What is the structured CRM decision-making model 'FOR-DEC' commonly utilized during flight operations and command assessments?",
    "options": [
      {
        "id": "A",
        "text": "Facts (gather data), Options (develop alternatives), Risks & Benefits (evaluate each course of action), Decision (select best option), Execution (implement plan), Check (monitor and review outcome).",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Fuel, Oxygen, Radar, Divert, Emergency, Climb.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Flight plan, Overview, Route, Decision, Engine, Cabin.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Fast, Operational, Return, Divert, Execute, Complete.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### FOR-DEC Decision Making Model\n* **F - Facts:** What is the actual situation? (Fuel, weather, systems, crew status).\n* **O - Options:** What can we do? (Hold, continue, divert to A, divert to B).\n* **R - Risks & Benefits:** What are the pros/cons of each option?\n* **D - Decision:** Choose the safest and most effective plan.\n* **E - Execution:** Distribute tasks (PF flies, PM communicates with ATC/Dispatch/Cabin).\n* **C - Check:** Continuous evaluation: is the plan working as expected?",
      "references": [
        "EASA Part-ORO.FC.115 (CRM Training)",
        "IATA Human Factors Guidance Material"
      ]
    },
    "metadata": { "difficulty": 0.2 }
  },
  {
    "id": "NJ-CRM-010",
    "subject_id": "escenarios-netjets-despacho-crm",
    "learning_objective": "Clean Aircraft Concept and Holdover Time (HOT)",
    "stem": "Under the 'Clean Aircraft Concept' (CAT.OP.MPA.250), what is the mandatory action if the calculated Holdover Time (HOT) expires before the aircraft commences the takeoff roll in active icing conditions?",
    "options": [
      {
        "id": "A",
        "text": "Takeoff is prohibited unless a formal Pre-Takeoff Contamination Check is conducted (inspecting representative surfaces directly from inside/outside) within 5 minutes before takeoff, or the aircraft returns for complete de-icing/anti-icing treatment.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "The Captain can take off if the airspeed indicator shows zero on the runway.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Engage wing anti-ice for 10 seconds to blow away accumulated slush.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Increase takeoff rotate speed (VR) by 20 kt and depart immediately.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Clean Aircraft Concept & Holdover Time Expiration\n* **Clean Aircraft Concept:** No aircraft shall take off with frost, ice, slush, or snow adhering to critical surfaces (wings, control surfaces, engine inlets).\n* If **Holdover Time (HOT) expires**, crew must:\n  1. Conduct a **Pre-Takeoff Contamination Check** (visual/tactile inspection of critical surfaces within 5 min of takeoff).\n  2. If clean surfaces cannot be guaranteed 100%, **return to de-icing pad for complete re-treatment**.",
      "references": [
        "EASA Part-CAT.OP.MPA.250",
        "AEA / SAE Ground De-icing / Anti-icing Guidelines"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-CRM-011",
    "subject_id": "escenarios-netjets-despacho-crm",
    "learning_objective": "Windshear Escape Maneuver Technique",
    "stem": "What is the standard, FAA/EASA-approved windshear recovery flight technique when reactive windshear warning activates during initial climb or final approach?",
    "options": [
      {
        "id": "A",
        "text": "Immediately apply maximum Takeoff/Go-Around (TOGA) thrust, level the wings, smoothly rotate toward the Pitch Limit Indicator (PLI) or stick shaker angle of attack, and DO NOT change gear or flap configuration until clear of windshear and vertical climb is firmly established.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Retract landing gear immediately to reduce parasitic drag.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Pitch nose-down to accelerate to Vmo.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Engage autopilot in vertical speed mode set to +1,000 fpm.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Windshear Escape Maneuver\n* **Thrust:** Full **TOGA** power.\n* **Pitch:** Smoothly pitch up towards the **Pitch Limit Indicator (PLI)** / Stick Shaker.\n* **Configuration:** **DO NOT TOUCH FLAPS OR LANDING GEAR** (gear doors create transient drag spikes, and flap retraction reduces lift during critical recovery).\n* Only clean up configuration once **'CLEAR OF WINDSHEAR'** and climbing safely.",
      "references": [
        "FAA Windshear Training Aid",
        "EASA CS-25 Windshear Certification"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-CRM-012",
    "subject_id": "escenarios-netjets-despacho-crm",
    "learning_objective": "Pace Graded Assertiveness in Cockpit Intervention",
    "stem": "Under modern CRM Pace Graded Assertiveness, what sequential communication steps should a First Officer follow if a Captain is fixated and descending below stabilized approach gates?",
    "options": [
      {
        "id": "A",
        "text": "Probe ('Are you happy with this speed?') -> Alert ('We are 20 knots fast and above glideslope') -> Challenge ('Captain, we are unstabilized, go around!') -> Takeover ('I HAVE CONTROLS, GOING AROUND').",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Remain silent and let the Captain handle the landing.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Pull the engine fire switches to abort the flight automatically.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Disconnect the Flight Director and call dispatch on the radio.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Graded Assertiveness (PACE Model)\n* **P - Probe:** State an observation gently (*'Captain, approach seems high'*).\n* **A - Alert:** State specific factual deviation (*'We are 15 kt fast and 1 dot above slope'*).\n* **C - Challenge:** Clear, direct callout (*'We are not stabilized at 1,000 ft, GO AROUND!'*).\n* **E - Emergency / Takeover:** If no response, the First Officer has a **legal duty to take control**: *'I HAVE CONTROLS, GOING AROUND'*.",
      "references": [
        "EASA Part-ORO.FC.115 (CRM)",
        "Flight Safety Foundation: Stabilized Approach Guidelines"
      ]
    },
    "metadata": { "difficulty": 0.2 }
  }
]

print("Writing escenarios-netjets-despacho-crm...")
with open(os.path.join(BASE_DIR, "escenarios-netjets-despacho-crm", "netjets_interview_scenarios_crm.json"), "w", encoding="utf-8") as f:
    json.dump(crm, f, indent=2, ensure_ascii=False)

print("Done crm.")
