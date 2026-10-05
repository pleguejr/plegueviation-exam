# -*- coding: utf-8 -*-
import json
import os

BASE_DIR = r"c:\Users\plegu\My Drive\Antigravity\Plegueviation exam\banks\netjets-interview"

# =========================================================================
# 5. espacio-rvsm-pbn-lvo (20 items)
# =========================================================================
rvsm = [
  {
    "id": "NJ-RVSM-001",
    "subject_id": "espacio-rvsm-pbn-lvo",
    "learning_objective": "RVSM Altitude Limits and Separation Standards",
    "stem": "What is the operational airspace vertical band for Reduced Vertical Separation Minimum (RVSM) and the standard vertical separation applied within it?",
    "options": [
      {
        "id": "A",
        "text": "Between FL290 and FL410 inclusive, with 1,000 ft (300 m) vertical separation between approved aircraft.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Between FL100 and FL250, with 500 ft vertical separation.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Between FL410 and FL600, with 1,000 ft vertical separation.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Between FL195 and FL285, with 2,000 ft vertical separation.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### RVSM Airspace Band & Separation (ICAO Doc 9574 & SPA.RVSM)\n* **RVSM Airspace:** **FL290 to FL410 inclusive**.\n* **Vertical Separation:** **1,000 ft (300 m)** between RVSM-approved aircraft.\n* Above FL410, standard separation reverts to **2,000 ft (600 m)**.\n* Aircraft not approved for RVSM must operate at or below **FL280** (or under specific non-RVSM climb/descent clearance with 2,000 ft separation provided by ATC).",
      "references": [
        "ICAO Doc 9574 (Manual on RVSM Implementation)",
        "EASA Part-SPA.RVSM.100"
      ]
    },
    "metadata": { "difficulty": 0.2 }
  },
  {
    "id": "NJ-RVSM-002",
    "subject_id": "espacio-rvsm-pbn-lvo",
    "learning_objective": "Mandatory RVSM Equipment (4 Essential Systems)",
    "stem": "What four mandatory aircraft systems must be operational to enter and operate in RVSM airspace under EASA SPA.RVSM.110?",
    "options": [
      {
        "id": "A",
        "text": "Two independent Primary Altimetry Systems, one Automatic Altitude-Control System (Autopilot with altitude hold), one Altitude-Alerting Device, and one Secondary Surveillance Radar (SSR) Altitude Reporting Transponder (Mode C or S).",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Dual Inertial Reference Systems (IRS), dual GPS receivers, stormscope, and head-up display.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "One primary altimeter, one standby pneumatic altimeter, autothrottle, and TCAS I.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Dual FMS, satellite phone, weather radar, and forward-looking infrared sensor.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Mandatory 4 RVSM Systems (SPA.RVSM.110)\n* To operate in RVSM airspace, the aircraft must have **ALL 4 systems operational**:\n  1. **Two independent primary altimeters** (ADC / air data computers).\n  2. **One Automatic Altitude Control System (Autopilot)** maintaining level within $\\pm 65\\text{ ft}$.\n  3. **One Altitude Alerting System** (warning at deviations > $200\\text{ ft}$ or $300\\text{ ft}$).\n  4. **One SSR Mode C/S Transponder** connected to the active primary altimeter.",
      "references": [
        "EASA Part-SPA.RVSM.110",
        "ICAO Doc 9574"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-RVSM-003",
    "subject_id": "espacio-rvsm-pbn-lvo",
    "learning_objective": "Altimeter Tolerances: Ground Check and In-Flight Cruise",
    "stem": "What are the maximum allowable altimeter tolerances during the pre-flight ground crosscheck and in-flight cruise within RVSM airspace?",
    "options": [
      {
        "id": "A",
        "text": "On the ground: primary altimeters must agree within ±75 ft of known aerodrome elevation and within 50 to 75 ft between each other; In cruise: difference between primary altimeters must not exceed 200 ft (60 m).",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "On the ground: ±200 ft; In cruise: ±500 ft.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "On the ground: ±10 ft; In cruise: 0 ft discrepancy.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Altimeters do not require crosschecking if satellite GPS altitude is displayed.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### RVSM Altimetry Tolerances\n* **Ground Check (with local QNH):**\n  - Primary altimeter vs. Surveyed Field Elevation: max **$\\pm 75\\text{ ft}$** (or $\\pm 50\\text{ ft}$ per AFM).\n  - Difference between Pilot & Co-pilot Primary Altimeters: max **$50\\text{ to }75\\text{ ft}$**.\n* **In-Flight Cruise Crosscheck (Standard 1013.25 hPa):**\n  - Max allowable discrepancy between primary altimeters: **$200\\text{ ft}$ (60 m)**.\n  - Autopilot must maintain level within **$\\pm 65\\text{ ft}$ ($\\pm 20\\text{ m}$)**.",
      "references": [
        "ICAO Doc 9574 (Chapter 4 - Operating Procedures)",
        "EASA AMC1 SPA.RVSM.105"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-RVSM-004",
    "subject_id": "espacio-rvsm-pbn-lvo",
    "learning_objective": "RVSM Equipment Failure Phraseology",
    "stem": "What is the mandatory ICAO / EASA standard phraseology when an equipment malfunction (such as autopilot failure or altimeter split > 200 ft) occurs in RVSM airspace?",
    "options": [
      {
        "id": "A",
        "text": "'UNABLE RVSM DUE TO EQUIPMENT' (or 'UNABLE RVSM DUE TO TURBULENCE' if severe turbulence prevents altitude maintenance).",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "'MAYDAY RVSM FAILURE'.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "'CANCEL RVSM CLEARANCE'.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "'PAN PAN ALTIMETER OUT'.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### RVSM Contingency Phraseology (ICAO Doc 4444)\n* If an aircraft loses RVSM capability in flight, the crew must notify ATC immediately with the exact phraseology:\n  - `UNABLE RVSM DUE TO EQUIPMENT`\n  - `UNABLE RVSM DUE TO TURBULENCE`\n* ATC will establish **2,000 ft vertical separation** from other aircraft or clear the flight to descend below FL290.",
      "references": [
        "ICAO Doc 4444 (PANS-ATM)",
        "EASA SERA.8015"
      ]
    },
    "metadata": { "difficulty": 0.2 }
  },
  {
    "id": "NJ-RVSM-005",
    "subject_id": "espacio-rvsm-pbn-lvo",
    "learning_objective": "Strategic Lateral Offset Procedures (SLOP)",
    "stem": "Under ICAO Doc 4444, what are the parameters and rules governing the execution of Strategic Lateral Offset Procedures (SLOP) in oceanic and remote continental airspace?",
    "options": [
      {
        "id": "A",
        "text": "Offsets are flown exclusively to the RIGHT of the airway centerline, up to a maximum of 2.0 NM in 0.1 NM increments (or 1 NM / 2 NM), without requiring prior ATC clearance in designated SLOP airspace, to mitigate collision risk from high-precision GPS navigation and wake turbulence.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Offsets may be flown up to 5 NM to the left or right at the pilot's discretion.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "SLOP is mandatory over all European domestic terminal areas.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "SLOP requires filing a revised ICAO flight plan with Lisbon Dispatch 30 minutes in advance.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Strategic Lateral Offset Procedures (SLOP)\n* **Purpose:** Mitigates the risk of mid-air collision caused by extreme GPS navigation precision and avoids wake turbulence from preceding aircraft.\n* **Standard Rules:**\n  - **Direction:** **RIGHT ONLY** (offsets to the left are strictly prohibited).\n  - **Magnitude:** **0.1 NM to 2.0 NM** (in tenths of a nautical mile) or 1 NM / 2 NM.\n  - **ATC Clearance:** In published oceanic/remote airspace, **NO ATC clearance is required**.",
      "references": [
        "ICAO Doc 4444 (PANS-ATM Chapter 16.5)",
        "ICAO NAT Doc 007 (North Atlantic Operations)"
      ]
    },
    "metadata": { "difficulty": 0.3 }
  },
  {
    "id": "NJ-RVSM-006",
    "subject_id": "espacio-rvsm-pbn-lvo",
    "learning_objective": "TCAS II Version 7.1 Response Timing",
    "stem": "What are the mandatory flight crew reaction times and hierarchy rules when responding to a TCAS II Version 7.1 Resolution Advisory (RA)?",
    "options": [
      {
        "id": "A",
        "text": "Initiate vertical pitch maneuver within 5 seconds of the initial RA (or within 2.5 seconds for a Reversal or Strengthening RA); the TCAS RA takes absolute legal precedence over conflicting ATC instructions.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Wait 15 seconds to confirm ATC instructions before disconnecting the autopilot.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "ATC instructions always override a TCAS RA in European controlled airspace.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Manually roll into a 45° bank turn within 3 seconds.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### TCAS II Version 7.1 Response Standards\n* **Reaction Time:**\n  - **Initial RA:** Crew must initiate pitch response within **$\\le 5\\text{ seconds}$**.\n  - **Reversal / Strengthening RA:** Crew must respond within **$\\le 2.5\\text{ seconds}$**.\n* **Absolute Priority:** A TCAS RA **ALWAYS OVERRIDES ATC INSTRUCTIONS**. Never maneuver opposite to an RA.\n* **Phraseology:** Notify ATC: `[Callsign] TCAS RA`, and upon return: `CLEAR OF CONFLICT, RETURNING TO [FL]`.",
      "references": [
        "ICAO Doc 9863 (Airborne Collision Avoidance System Manual)",
        "EASA SERA.11014"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-RVSM-007",
    "subject_id": "espacio-rvsm-pbn-lvo",
    "learning_objective": "Oceanic Contingency Maneuver (NAT-HLA / Remote)",
    "stem": "What is the standard ICAO contingency procedure in oceanic/remote airspace (NAT-HLA) when an aircraft is unable to maintain assigned level and two-way ATC clearance cannot be obtained?",
    "options": [
      {
        "id": "A",
        "text": "Turn at least 30° left or right of the track to establish a 5 NM parallel offset, then climb or descend 500 ft (or 300 ft in specific designated airspace) while broadcasting intentions on 121.5 MHz and 123.45 MHz with all exterior lights on.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Perform a 180° turn on the exact centerline and descend to sea level immediately.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Remain on track, maintain altitude, and reduce airspeed to Vmin.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Descend directly without lateral offset, maintaining transponder code 7000.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### ICAO Oceanic Contingency Procedure (Doc 4444 / NAT Doc 007)\n* **Maneuver:**\n  1. Turn **at least $30^\\circ$** away from the track to establish a **$5\\text{ NM}$ parallel offset**.\n  2. Once established at $5\\text{ NM}$, **climb or descend by $500\\text{ ft}$** (to place the aircraft between standard flight levels).\n  3. Set transponder code **7700** if emergency, turn **all exterior lights ON**, and broadcast on **121.5 MHz & 123.45 MHz**.",
      "references": [
        "ICAO NAT Doc 007 (North Atlantic Airspace Operations)",
        "ICAO Doc 4444 Chapter 15"
      ]
    },
    "metadata": { "difficulty": 0.3 }
  },
  {
    "id": "NJ-RVSM-008",
    "subject_id": "espacio-rvsm-pbn-lvo",
    "learning_objective": "Performance-Based Navigation (PBN) Specifications",
    "stem": "What is the core distinction between RNAV specifications (e.g. RNAV 5, RNAV 1) and RNP specifications (e.g. RNP 1, RNP APCH) under the ICAO PBN Manual (Doc 9613)?",
    "options": [
      {
        "id": "A",
        "text": "RNP specifications require On-Board Performance Monitoring and Alerting (OBPMA) that alerts the crew if total system error exceeds accuracy requirements, whereas RNAV specifications do not require onboard integrity alerting.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "RNAV applies exclusively to military fighters, while RNP applies only to general aviation.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "RNAV uses only VOR/DME ground beacons, while RNP prohibits the use of GNSS.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "There is no technical difference; RNAV and RNP are completely interchangeable acronyms.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### RNAV vs RNP (ICAO Doc 9613 PBN Manual)\n* **RNAV (Area Navigation):** Navigation along any desired flight path within covered navigational aid limits. **No On-Board Performance Monitoring & Alerting (OBPMA) required**.\n* **RNP (Required Navigation Performance):** Area navigation that **REQUIRES on-board performance monitoring and alerting (OBPMA)**. If the system cannot maintain the specified lateral accuracy (e.g. $\\pm 0.3\\text{ NM}$ in RNP APCH) 95% of the time, it immediately alerts the crew.",
      "references": [
        "ICAO Doc 9613 (PBN Manual)",
        "EASA Part-SPA.PBN"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-RVSM-009",
    "subject_id": "espacio-rvsm-pbn-lvo",
    "learning_objective": "Barometric Altimeter Transition Setting",
    "stem": "Under standard European ICAO procedures, when must the altimeter reference setting be changed from local QNH to Standard (1013.25 hPa) during climb, and from Standard to QNH during descent?",
    "options": [
      {
        "id": "A",
        "text": "Changed to Standard (1013.25 hPa) when climbing through Transition Altitude (TA); changed to local QNH when descending through Transition Level (TL).",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Changed to Standard at 10,000 ft on climb; changed to QNH at 500 ft AGL.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Standard is set at gear retraction; QNH is set on base leg.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Standard is set only when entering RVSM airspace at FL290.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Altimeter Setting Transition\n* **Climb:** Change from local QNH to **Standard (1013.25 hPa / 29.92 inHg)** upon passing **Transition Altitude (TA)** (published on SID charts).\n* **Descent:** Change from Standard to **local QNH** upon passing **Transition Level (TL)** (issued by ATC or ATIS).\n* The vertical layer between TA and TL is the **Transition Layer** (cruising level flight is prohibited in the Transition Layer).",
      "references": [
        "ICAO Doc 8168 (PANS-OPS)",
        "EASA SERA.8015"
      ]
    },
    "metadata": { "difficulty": 0.2 }
  },
  {
    "id": "NJ-RVSM-010",
    "subject_id": "espacio-rvsm-pbn-lvo",
    "learning_objective": "RNP APCH Minima Lines: LNAV vs LNAV/VNAV vs LPV",
    "stem": "On an RNP APCH chart, what is the difference between LNAV/VNAV minima and LPV minima?",
    "options": [
      {
        "id": "A",
        "text": "LNAV/VNAV relies on Barometric VNAV (Baro-VNAV) subject to cold temperature limits and provides 3D guidance with a Decision Altitude (DA); LPV relies on Satellite-Based Augmentation Systems (SBAS / EGNOS in Europe) providing geometric lateral and vertical guidance down to CAT I-like minima (200 ft DA) unaffected by temperature.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "LNAV/VNAV is a 2D approach with an MDA, whereas LPV is a circling approach.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "LPV can only be flown with ILS ground transmitters operational.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "LNAV/VNAV requires radar altimeter minimums of 50 ft.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### LNAV/VNAV vs LPV (EGNOS / SBAS)\n* **LNAV/VNAV:** Uses barometric vertical guidance (**Baro-VNAV**). It has temperature limits (e.g. valid only between -15°C and +50°C unless aircraft has temperature compensation).\n* **LPV (Localizer Performance with Vertical Guidance):** Uses **SBAS (EGNOS in Europe / WAAS in US)** to generate geometric vertical guidance. Unaffected by atmospheric temperature, delivering **CAT I precision equivalent minima (DH 200 ft / RVR 550 m)**.",
      "references": [
        "EASA Part-SPA.PBN.100",
        "ICAO Doc 9613"
      ]
    },
    "metadata": { "difficulty": 0.3 }
  }
]

print("Writing espacio-rvsm-pbn-lvo...")
with open(os.path.join(BASE_DIR, "espacio-rvsm-pbn-lvo", "netjets_easa_rvsm_pbn_spec_ops.json"), "w", encoding="utf-8") as f:
    json.dump(rvsm, f, indent=2, ensure_ascii=False)

print("Done rvsm.")
