# -*- coding: utf-8 -*-
import json
import os

BASE_DIR = r"c:\Users\plegu\My Drive\Antigravity\Plegueviation exam\banks\netjets-interview"

# =========================================================================
# 4. tiempos-actividad-descanso-ftl (20 items)
# =========================================================================
ftl = [
  {
    "id": "NJ-FTL-001",
    "subject_id": "tiempos-actividad-descanso-ftl",
    "learning_objective": "EASA ORO.FTL.205 Maximum Daily Flight Duty Period (FDP)",
    "stem": "Under EASA ORO.FTL.205, what is the maximum basic daily Flight Duty Period (FDP) for an unaugmented two-pilot crew starting duty at 08:00 local time (fully acclimatised) for a 2-sector flight?",
    "options": [
      {
        "id": "A",
        "text": "13 hours 00 minutes.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "11 hours 15 minutes.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "14 hours 30 minutes.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "10 hours 00 minutes.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Maximum Daily FDP Matrix (ORO.FTL.205 Table)\n* When a crew member is **acclimatised**:\n  - Start of FDP between **06:00 and 13:29**:\n    - **1 to 2 sectors:** Max FDP = **13h 00m**.\n    - **3 sectors:** Max FDP = **12h 30m**.\n    - **4 sectors:** Max FDP = **12h 00m**.\n    - **5 sectors:** Max FDP = **11h 30m**.\n  - Start during the Window of Circadian Low (WOCL, 02:00-05:59): FDP is reduced significantly (down to 9h 00m).",
      "references": [
        "EASA Part-ORO.FTL.205 Table 1",
        "CS-FTL.1.205 (Flight Duty Period Limits)"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-FTL-002",
    "subject_id": "tiempos-actividad-descanso-ftl",
    "learning_objective": "Split Duty Provisions (ORO.FTL.220)",
    "stem": "What are the regulatory conditions and extensions permitted under EASA Split Duty (ORO.FTL.220)?",
    "options": [
      {
        "id": "A",
        "text": "A break on the ground of at least 3 consecutive hours in suitable accommodation allows extending the basic maximum daily FDP by 50% of the break duration; the break does not count as part of the FDP for sector calculations.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Any break of 30 minutes in the aircraft cabin extends the FDP by 2 hours.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Split duty allows up to 24 hours of continuous duty without a bed.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Split duty is strictly prohibited on multi-engine turbine aircraft.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Split Duty Extension (ORO.FTL.220 & CS-FTL.1.220)\n* **Minimum Break:** Must be at least **3 consecutive hours**.\n* **Accommodation:** Must be in **suitable accommodation** (a private, quiet bedroom with a bed).\n* **FDP Extension:** The maximum FDP is increased by **50% of the break duration** (e.g., a 4-hour break in a hotel room extends FDP by +2 hours).",
      "references": [
        "EASA Part-ORO.FTL.220",
        "CS-FTL.1.220 (Split Duty)"
      ]
    },
    "metadata": { "difficulty": 0.3 }
  },
  {
    "id": "NJ-FTL-003",
    "subject_id": "tiempos-actividad-descanso-ftl",
    "learning_objective": "Commander's Discretion to Extend FDP / Reduce Rest",
    "stem": "Under EASA ORO.FTL.205(f), what is the maximum allowable FDP extension and rest reduction under the Commander's Discretion in unforeseen operational circumstances?",
    "options": [
      {
        "id": "A",
        "text": "Maximum FDP extension of up to 2 hours for an unaugmented crew (or 3 hours for augmented crew), and maximum rest reduction of up to 2 hours, provided minimum rest never falls below 10 hours and crew members confirm fitness to fly.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Maximum FDP extension of 5 hours with telephone approval from the Chief Pilot.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Rest can be reduced to 6 hours if breakfast is provided by the hotel.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "The Commander can extend duty without any limit on private charter flights.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Commander's Discretion (ORO.FTL.205(f))\n* **FDP Extension:** Maximum **+2 hours** (unaugmented crew) or **+3 hours** (augmented crew).\n* **Rest Reduction:** Maximum **-2 hours**, but the reduced rest **CAN NEVER BE LESS THAN 10 HOURS**.\n* **Reporting:** The Commander must consult all crew members, record the decision, and submit a Commander's Discretion Report to the operator within **28 days** (and to the National Aviation Authority if required).",
      "references": [
        "EASA Part-ORO.FTL.205(f)",
        "AMC1 ORO.FTL.205(f)"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-FTL-004",
    "subject_id": "tiempos-actividad-descanso-ftl",
    "learning_objective": "Cumulative Duty and Flight Time Limits",
    "stem": "What are the strict cumulative Duty and Flight Block Time limits established under EASA ORO.FTL.210 for commercial flight crews?",
    "options": [
      {
        "id": "A",
        "text": "Duty Time: 60 h in 7 days, 110 h in 14 days, 190 h in 28 days; Flight Block Time: 100 h in 28 days, 900 h in a calendar year, 1,000 h in 12 consecutive months.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Duty Time: 100 h in 7 days; Flight Time: 1,500 h in a calendar year.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Duty Time: 40 h in 7 days; Flight Time: 50 h in 28 days.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "There are no cumulative duty limits if daily rest exceeds 14 hours.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Cumulative Limits (ORO.FTL.210)\n* **Duty Period Limits (all work / ground / flight / standby):**\n  - **60 hours** in any 7 consecutive days.\n  - **110 hours** in any 14 consecutive days.\n  - **190 hours** in any 28 consecutive days.\n* **Flight Block Time Limits (chock-to-chock):**\n  - **100 hours** in any 28 consecutive days.\n  - **900 hours** in a calendar year (Jan 1 - Dec 31).\n  - **1,000 hours** in any 12 consecutive calendar months.",
      "references": [
        "EASA Part-ORO.FTL.210 (Flight Times and Duty Periods)",
        "ICAO Annex 6 Part I"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-FTL-005",
    "subject_id": "tiempos-actividad-descanso-ftl",
    "learning_objective": "Minimum Rest Periods: Home Base vs Outstation",
    "stem": "Under EASA ORO.FTL.235, what is the minimum required rest period when operating away from home base versus at home base?",
    "options": [
      {
        "id": "A",
        "text": "At home base: equal to the preceding duty period or at least 12 hours (whichever is greater); Away from home base: equal to the preceding duty period or at least 10 hours (whichever is greater), which must include an 8-hour sleep opportunity plus travel and physiological time.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "8 hours flat at home base and 6 hours at outstations.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "24 hours rest after every landing regardless of duty length.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Rest is only required after completing 5 consecutive sectors.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Minimum Rest Period Standards (ORO.FTL.235)\n* **At Home Base:** Minimum **12 hours** or the duration of the preceding duty period, whichever is greater.\n* **Away from Base (Outstation):** Minimum **10 hours** or the duration of the preceding duty period, whichever is greater.\n* The outstation rest must guarantee an **8-hour uninterrupted sleep opportunity** in suitable accommodation, taking into account travel time to and from the hotel.",
      "references": [
        "EASA Part-ORO.FTL.235",
        "CS-FTL.1.235 (Rest Periods)"
      ]
    },
    "metadata": { "difficulty": 0.2 }
  },
  {
    "id": "NJ-FTL-006",
    "subject_id": "tiempos-actividad-descanso-ftl",
    "learning_objective": "Deadhead / Positioning Accounting",
    "stem": "How is 'Positioning' (Deadheading) accounted for in terms of duty time and rest under EASA FTL regulations?",
    "options": [
      {
        "id": "A",
        "text": "Positioning counts 100% as Duty Period; positioning immediately prior to an operating sector forms part of the Flight Duty Period (FDP), whereas positioning following the last operating sector counts as Duty but not as FDP; positioning can NEVER count as rest.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Positioning in business class seats counts as rest period.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Positioning is excluded completely from monthly cumulative duty calculations.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Positioning only counts if the flight is on a NetJets aircraft.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Positioning (Deadhead) Rules (ORO.FTL.105 & 205)\n* **Positioning = 100% Duty Time**.\n* If a pilot deadheads from Paris to Nice and then flies an Owner to London, the deadhead leg is **included in the FDP**.\n* If the deadhead occurs after the flight to return home, it is **Duty Time** (requiring post-duty rest) but **not FDP**.\n* Positioning in an aircraft or passenger train **CAN NEVER COUNT AS REST**.",
      "references": [
        "EASA Part-ORO.FTL.105 Definitions ('Positioning')",
        "EASA Part-ORO.FTL.205(c)"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-FTL-007",
    "subject_id": "tiempos-actividad-descanso-ftl",
    "learning_objective": "Extended Recovery Rest Period (Weekly Rest)",
    "stem": "What is the mandatory frequency and duration of an 'Extended Recovery Rest Period' under EASA ORO.FTL.235(d)?",
    "options": [
      {
        "id": "A",
        "text": "A continuous period of 36 hours, including 2 local nights, such that there shall never be more than 168 hours (7 days) between the end of one extended recovery rest period and the start of the next.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "24 hours every 14 days.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "48 hours every calendar month.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "72 hours every 6 months during simulator checks.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Extended Recovery Rest Period (ORO.FTL.235(d))\n* Crew members must be given an **Extended Recovery Rest Period** of at least **36 continuous hours including 2 local nights**.\n* Maximum interval between extended rest periods is **168 hours (7 days)**.\n* A *'Local Night'* is defined as a period of 8 hours falling between 22:00 and 08:00 local time.",
      "references": [
        "EASA Part-ORO.FTL.235(d)",
        "CS-FTL.1.235"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  },
  {
    "id": "NJ-FTL-008",
    "subject_id": "tiempos-actividad-descanso-ftl",
    "learning_objective": "Acclimatisation States: B, D, and X",
    "stem": "What does an 'Unknown State of Acclimatisation' (State X) imply under EASA FTL regulations, and how does it impact the allowed daily FDP?",
    "options": [
      {
        "id": "A",
        "text": "State X occurs when crew time-zone transitions prevent establishing acclimatisation to either departure or destination; it forces the operator to apply the most restrictive FDP limits in the FTL tables.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "State X allows the Commander to extend FDP by 4 hours without report.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "State X applies only when flying south across zero time zones.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "State X requires all flights to be conducted under VFR.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Acclimatisation States (CS-FTL.1.205)\n* **State B:** Acclimatised to base / departure time zone.\n* **State D:** Acclimatised to local destination time zone.\n* **State X (Unknown):** Transitioning across multiple time zones without sufficient local rest (takes 48-72h in local time zone to acclimatise). In State X, the **maximum allowable daily FDP is heavily penalized** (typically capped at 11h for 1-2 sectors).",
      "references": [
        "CS-FTL.1.205 Table 2 (Unacclimatised FDP)",
        "EASA FTL Acclimatisation Guidance"
      ]
    },
    "metadata": { "difficulty": 0.3 }
  },
  {
    "id": "NJ-FTL-009",
    "subject_id": "tiempos-actividad-descanso-ftl",
    "learning_objective": "Disruptive Schedules: Early Starts and Late Finishes",
    "stem": "How are 'Disruptive Schedules' defined under EASA FTL, and what operational restrictions apply when combining early starts and late finishes?",
    "options": [
      {
        "id": "A",
        "text": "Early type schedules start between 05:00 and 06:59, and Late type schedules end between 23:00 and 01:59; transitions between early starts and late finishes require compensatory rest to prevent acute circadian disruption.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Disruptive schedules only apply when flight delay exceeds 10 hours.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Any flight landing after sunset is classified as a disruptive schedule.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Disruptive schedules are exempt from weekly rest requirements.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Disruptive Schedules (CS-FTL.1.235)\n* **Early Type:** Duty period starting between **05:00 and 06:59**.\n* **Late Type:** Duty period ending between **23:00 and 01:59**.\n* **Night Duty:** Duty period encroaching any portion of the Window of Circadian Low (02:00-05:59).\n* Operators must prevent alternating rapidly between Early and Late duties without adequate recovery rest.",
      "references": [
        "EASA CS-FTL.1.235",
        "EASA Safety Guidance on Crew Fatigue"
      ]
    },
    "metadata": { "difficulty": 0.3 }
  },
  {
    "id": "NJ-FTL-010",
    "subject_id": "tiempos-actividad-descanso-ftl",
    "learning_objective": "Airport Standby vs Home Standby",
    "stem": "How is 'Airport Standby' accounted for in terms of duty time and FDP when a flight is assigned under EASA ORO.FTL.225?",
    "options": [
      {
        "id": "A",
        "text": "Airport Standby counts 100% as Duty Period; if a flight is assigned, the allowable FDP is calculated from the start of the airport standby period.",
        "is_correct": True
      },
      {
        "id": "B",
        "text": "Airport standby is treated as off-duty rest until boarding starts.",
        "is_correct": False
      },
      {
        "id": "C",
        "text": "Airport standby can last up to 24 hours continuously.",
        "is_correct": False
      },
      {
        "id": "D",
        "text": "Only 10% of airport standby time counts towards cumulative duty.",
        "is_correct": False
      }
    ],
    "explanation": {
      "text": "### Standby Accounting (ORO.FTL.225)\n* **Airport Standby:** The pilot is at the airport ready for immediate dispatch. **It counts 100% as Duty Time**.\n* If assigned to a flight, the **maximum allowable FDP begins at the start of the Airport Standby**.\n* Maximum duration of Airport Standby is **capped at 8 hours** (or equivalent FDP limit).",
      "references": [
        "EASA Part-ORO.FTL.225 (Standby and Duties at Airport)",
        "CS-FTL.1.225"
      ]
    },
    "metadata": { "difficulty": 0.25 }
  }
]

print("Writing tiempos-actividad-descanso-ftl...")
with open(os.path.join(BASE_DIR, "tiempos-actividad-descanso-ftl", "netjets_easa_ftl_rest_duty.json"), "w", encoding="utf-8") as f:
    json.dump(ftl, f, indent=2, ensure_ascii=False)

print("Done ftl.")
