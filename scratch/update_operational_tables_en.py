# -*- coding: utf-8 -*-
import os
import re

TARGET_FILE = r"c:\Users\plegu\My Drive\Antigravity\Plegueviation exam\apps\web-pwa\src\data\operationalTablesData.ts"

with open(TARGET_FILE, "r", encoding="utf-8") as f:
    content = f.read()

# Locate the start of the NetJets EASA tables section
split_marker = "// SECCIÓN ESPECIAL: PREPARACIÓN ENTREVISTA NETJETS & NORMATIVA EASA AIR OPS"
if split_marker not in content:
    # Try alternative marker
    split_marker = "category: 'easa-netjets'"
    pos = content.find(split_marker)
    # find previous table start
    table_start_pos = content.rfind("  // 12.", 0, pos)
else:
    table_start_pos = content.find(split_marker)

prefix = content[:table_start_pos]

english_easa_tables = """// =========================================================================
  // SPECIAL SECTION: NETJETS INTERVIEW PREP & EASA AIR OPS SYNTHETIC TABLES (ENGLISH)
  // =========================================================================

  // 12. EASA FUEL SCHEMES: BASIC SCHEME, CONTINGENCY & FINAL RESERVES
  {
    id: 'netjets-easa-fuel-schemes',
    category: 'easa-netjets',
    title: 'EASA Fuel Schemes: Basic Scheme, Contingency & Final Reserves',
    subtitle: 'Official Breakdown of Fuel Blocks, Isolated Aerodrome Policy, and Emergency Calls (CAT.OP.MPA.180/181/182)',
    manualRef: 'EASA Part-CAT.OP.MPA.180 / 181 / 182 • AMC1 CAT.OP.MPA.181 • ICAO Doc 4444',
    badge: 'EASA Fuel Schemes',
    description: 'Regulatory fuel planning framework under European Commercial Air Transport (CAT) and executive aviation. Accurately defines Taxi, Trip, Contingency, Alternate, Final Reserve, and Additional fuel components.',
    warningAlert: 'MAYDAY FUEL Emergency Call: Mandatory whenever the estimated usable fuel on touchdown at the nearest safe aerodrome is LESS than the Final Reserve Fuel (30 min for jet aircraft). Imparts absolute distress landing priority.',
    headers: ['Fuel Component', 'Regulatory Definition & Calculation', 'Turbine / Jet Aircraft', 'Piston Aircraft', 'Operational Considerations'],
    rows: [
      {
        col1: 'Taxi Fuel',
        col2: 'Fuel calculated for APU operation and taxiing before takeoff, accounting for local airport departure delays.',
        col3: 'Actual expected consumption or aircraft type standard',
        col4: 'Standard per AFM',
        col5: 'Cannot be used to compensate for in-flight fuel deficits.',
        highlight: false,
        notes: 'Includes APU consumption during passenger boarding and pushback.'
      },
      {
        col1: 'Trip Fuel',
        col2: 'Fuel required from brake release on takeoff roll to touchdown and landing at the destination aerodrome.',
        col3: 'Takeoff, climb, cruise, descent, approach, and landing',
        col4: 'Takeoff to full stop landing',
        col5: 'Calculated using actual performance data and forecasted wind/temperature profiles.',
        highlight: false,
        notes: 'Based on optimal FMS routing and cruising flight levels.'
      },
      {
        col1: 'Contingency Fuel (Standard 5%)',
        col2: '5% of planned Trip Fuel or 5 minutes holding at 1,500 ft above destination elevation (whichever is greater).',
        col3: '5% Trip Fuel (Min 5 min holding at 1,500 ft ISA)',
        col4: '5% Trip Fuel (Min 5 min)',
        col5: 'Reducible to 3% if an approved En-Route Alternate (Fuel ERA) is designated on route.',
        highlight: true,
        notes: 'May also be determined via an approved statistical fuel consumption scheme (99% / 95%).'
      },
      {
        col1: 'Alternate Fuel',
        col2: 'Missed approach at destination from DA/MDA, climb, cruise to alternate, descent, approach, and landing.',
        col3: 'Missed Approach + Climb + Cruise + Descent + Landing',
        col4: 'Identical complete flight profile',
        col5: 'If two alternates are selected, calculated for the alternate requiring the greater fuel quantity.',
        highlight: false,
        notes: 'Not required if flight < 6h and destination has 2 independent runways with benign weather.'
      },
      {
        col1: 'Final Reserve Fuel (FRF)',
        col2: 'Fuel to fly at holding speed at 1,500 ft (450 m) above aerodrome elevation in standard ISA conditions.',
        col3: '30 minutes (Holding Speed at 1,500 ft AAL)',
        col4: '45 minutes (Holding Speed at 1,500 ft AAL)',
        col5: 'SACROSANCT INVIOLABLE RESERVE. If landing with less than FRF is anticipated: MAYDAY MAYDAY MAYDAY FUEL.',
        highlight: true,
        notes: 'Calculated with the estimated landing mass at the destination alternate.'
      },
      {
        col1: 'Additional Fuel: Isolated Aerodrome',
        col2: 'Mandatory additional fuel required when no suitable destination alternate aerodrome is available.',
        col3: '2 hours at normal cruising consumption above destination (includes Final Reserve Fuel)',
        col4: '45 min + 15% cruise (or 2 hours, whichever is less)',
        col5: 'Guarantees the ability to hold overhead destination with maximum safety margin.',
        highlight: false,
        notes: 'Applicable to remote oceanic or island destinations.'
      },
      {
        col1: 'MINIMUM FUEL (ATC Call)',
        col2: 'Transmission informing ATC that all aerodrome options are committed and any delay may jeopardize Final Reserve Fuel.',
        col3: 'Informs ATC: cannot accept delays',
        col4: 'Informs ATC: cannot accept delays',
        col5: 'DOES NOT IMPART PRIORITY by itself; alerts ATC not to assign vector delays or unexpected holding.',
        highlight: false,
        notes: 'Must be declared before invading final reserve fuel.'
      },
      {
        col1: 'MAYDAY FUEL (Distress Call)',
        col2: 'Mandatory distress declaration when calculated usable fuel upon touchdown is LESS than Final Reserve Fuel.',
        col3: 'Absolute landing priority (MAYDAY x3)',
        col4: 'Absolute landing priority (MAYDAY x3)',
        col5: 'MANDATORY under CAT.OP.MPA.182(e). Grants immediate radar priority and direct approach routing.',
        highlight: true,
        notes: 'Requires filing an Air Safety Report (ASR / MOR) within 72 hours.'
      }
    ],
    extraNotes: [
      'In-Flight Fuel Monitoring: Actual fuel remaining must be checked and recorded at least every 30 to 60 minutes or at planned waypoints (CAT.OP.MPA.182).',
      'Decision Point Procedure (RCF): Optimizes payload by calculating contingency fuel from the Decision Point to destination.',
      'Take-Off Alternate: Mandatory if departure weather is below landing minima. In twin-engine jets, located within 1 hour flight time at OEI cruise speed in still air.'
    ]
  },

  // 13. EASA FTL LIMITS: BASIC DAILY FDP, REST & CUMULATIVE DUTY
  {
    id: 'netjets-easa-ftl-fdp',
    category: 'easa-netjets',
    title: 'EASA Flight Time Limitations (FTL): Maximum Daily FDP, Rest & Cumulative Duty',
    subtitle: 'Maximum Flight Duty Period Table (ORO.FTL.205), Home Base / Outstation Rest, Split Duty and Commander\\'s Discretion',
    manualRef: 'EASA Part-ORO.FTL.105 / 205 / 210 / 225 / 235 • CS-FTL.1.205',
    badge: 'EASA FTL / Rest',
    description: 'Comprehensive European regulation on flight and duty time limitations (FTL). Essential for operational decision-making by Commanders and flight crews in executive and airline operations.',
    warningAlert: 'WOCL (Window of Circadian Low): Period between 02:00 and 05:59 in the crew member\\'s acclimatised time zone. Heavily reduces maximum permitted daily FDP.',
    headers: ['FTL Concept / Parameter', 'Standard EASA Limit', 'Condition / Sectors', 'Extensions / Variations', 'Critical Operational Rules'],
    rows: [
      {
        col1: 'Basic Daily FDP: Report 06:00 - 13:29',
        col2: '13:00 hours',
        col3: '1 to 2 flight sectors (Acclimatised crew)',
        col4: '3 sectors: 12:30 | 4 sectors: 12:00 | 5 sectors: 11:30',
        col5: 'Maximum standard FDP for daytime operations.',
        highlight: true,
        notes: 'Stepped reduction of 30 minutes for each additional sector.'
      },
      {
        col1: 'Basic Daily FDP: WOCL Encroachment (02:00 - 04:59)',
        col2: '11:00 hours',
        col3: '1 to 2 sectors (Report in Window of Circadian Low)',
        col4: '3 sectors: 10:30 | 4 sectors: 10:00 | 5 sectors: 09:30',
        col5: 'Heavy reduction to prevent acute fatigue degradation.',
        highlight: false,
        notes: 'WOCL spans from 02:00 to 05:59 local time.'
      },
      {
        col1: 'Unacclimatised Crew (State X)',
        col2: '11:00 hours (Max)',
        col3: '1 to 2 sectors regardless of report time',
        col4: 'Reduction of 30 min per sector down to minimum of 09:00 h',
        col5: 'Applies when crossing multiple time zones without 48h adaptation.',
        highlight: false,
        notes: 'Common in long-range executive operations.'
      },
      {
        col1: 'FDP Extension without In-Flight Rest',
        col2: 'Up to +1 hour (Max 2 times in 7 days)',
        col3: 'Max 2 sectors; requires pre-duty rest +2h or post-duty rest +4h',
        col4: 'Prohibited if FDP encroaches the WOCL',
        col5: 'Must be pre-planned before the start of the duty period.',
        highlight: false,
        notes: 'Not to be confused with Commander\\'s Discretion.'
      },
      {
        col1: 'Split Duty (ORO.FTL.220)',
        col2: 'Extension equal to 50% of ground break duration',
        col3: 'Continuous ground break of at least 3 hours in suitable accommodation',
        col4: 'Requires private quiet room with bed (suitable accommodation)',
        col5: 'Break time does not count as part of FDP sector limit.',
        highlight: false,
        notes: 'Breaks under 3 hours do not qualify for split duty extension.'
      },
      {
        col1: 'Commander\\'s Discretion (ORO.FTL.205(f))',
        col2: 'Up to +2 hours (Unaugmented) | Up to +3 hours (Augmented)',
        col3: 'Unforeseen operational delays occurring AFTER report time',
        col4: 'Mandatory crew consultation on fatigue before exercising discretion',
        col5: 'Formal report required if extension exceeds 1 hour (28-day deadline).',
        highlight: true,
        notes: 'Non-delegable authority of the Commander to protect the flight.'
      },
      {
        col1: 'Minimum Rest at Home Base',
        col2: 'Length of preceding duty period or 12 hours (whichever is greater)',
        col3: 'At crew member\\'s permanent home residence',
        col4: 'Includes time for commuting and physiological needs',
        col5: 'Guarantees complete recovery before next duty tour.',
        highlight: false,
        notes: 'If previous duty was 14h, rest must be at least 14h.'
      },
      {
        col1: 'Minimum Rest Away from Base (Outstation)',
        col2: 'Length of preceding duty period or 10 hours (whichever is greater)',
        col3: 'In suitable accommodation provided by the operator',
        col4: 'Must guarantee at least 8 hours uninterrupted sleep opportunity in bed',
        col5: 'Actual travel time to/from hotel must be added on top.',
        highlight: true,
        notes: 'If hotel transfer takes 1h each way, minimum total rest is 12h.'
      },
      {
        col1: 'Cumulative Duty Limits (All Work)',
        col2: '60 h (7 days) | 110 h (14 days) | 190 h (28 days)',
        col3: 'Sum of all flight hours, airport standby, and ground duties',
        col4: 'Evenly distributed across scheduling periods',
        col5: 'Strict legal ceiling that cannot be extended.',
        highlight: false,
        notes: 'Includes simulator sessions, ground training, and administrative duties.'
      },
      {
        col1: 'Cumulative Flight Block Time Limits',
        col2: '100 h (28 days) | 900 h (Calendar Year) | 1,000 h (12 Months)',
        col3: 'Block-to-block flight time (chock-to-chock)',
        col4: 'Applies across all commercial flights logged by the pilot',
        col5: 'Prevents long-term chronic pilot fatigue.',
        highlight: true,
        notes: '900 hours applies from January 1 to December 31.'
      },
      {
        col1: 'Extended Recovery Rest Period (Weekly Rest)',
        col2: '36 continuous hours including 2 local nights',
        col3: 'Maximum interval of 168 hours (7 days) between rest periods',
        col4: 'Mandatory at home base or outstation',
        col5: 'Ensures full biological circadian synchronization.',
        highlight: false,
        notes: 'A local night is defined as 8 hours between 22:00 and 08:00.'
      }
    ],
    extraNotes: [
      'Airport Standby: Counts 100% as duty time. If assigned to a flight, FDP starts at the beginning of the airport standby period.',
      'Augmented Crew: Extends FDP up to 16h-18h depending on in-flight rest class (Class 1: horizontal bunk; Class 2: lie-flat seat with curtain; Class 3: reclining cabin seat).'
    ]
  },

  // 14. AERODROME MINIMA, LVTO AND APPROACH BAN
  {
    id: 'netjets-easa-aom-minima',
    category: 'easa-netjets',
    title: 'Aerodrome Operating Minima (AOM), LVTO and Approach Ban Rule',
    subtitle: 'Visibility, RVR, Visual Reference Requirements at DA/DH, and Approach Continuation Rules (CAT.OP.MPA.110/305)',
    manualRef: 'EASA Part-CAT.OP.MPA.110 / 115 / 305 • Part-SPA.LVO.100 • ICAO Annex 6',
    badge: 'AOM & LVO Minima',
    description: 'Synthetic guide to European takeoff and landing operational minima. Details the Approach Ban decision point, visual reference requirements across CAT I, II, and III, and non-CDFA penalties.',
    warningAlert: 'Approach Ban at 1,000 ft AAL / OM: If reported RVR is below applicable minima, continuing the approach beyond 1,000 ft above aerodrome level or outer marker is STRICTLY PROHIBITED. If RVR drops below minima AFTER 1,000 ft AAL, the approach may legally continue to DA/MDA.',
    headers: ['Flight Phase / Operation', 'Regulatory Minimum', 'Decision Point / Ban Gate', 'Required Visual Reference', 'Operational Penalties / Variations'],
    rows: [
      {
        col1: 'Standard Takeoff',
        col2: 'RVR $\\\\ge$ 400 m (or 500 m per aircraft category)',
        col3: 'Prior to commencing takeoff roll',
        col4: 'Runway markings and runway edge lights visible',
        col5: 'Does not require specific Low Visibility Operations (LVO) approval.',
        highlight: false,
        notes: 'Standard day/night takeoff.'
      },
      {
        col1: 'Low Visibility Take-Off (LVTO)',
        col2: 'RVR < 400 m down to 125 m (or 150 m Cat D)',
        col3: 'Requires Low Visibility Procedures (LVP) in force',
        col4: 'High-intensity runway centerline lights + markings (90 m visual segment)',
        col5: 'Requires specific SPA.LVO operational approval and qualified crew.',
        highlight: true,
        notes: 'Centerline light spacing $\\\\le$ 15 m for RVR 125 m.'
      },
      {
        col1: 'CAT I Precision Approach',
        col2: 'DH $\\\\ge$ 200 ft | RVR $\\\\ge$ 550 m (or 800 m without ALS)',
        col3: 'Approach Ban at 1,000 ft AAL / Outer Marker',
        col4: 'At least 1 visual element visible (approach lights, threshold, markings, TDZ, PAPI)',
        col5: 'LVP not formally required for standard CAT I.',
        highlight: false,
        notes: 'Standard 3D precision approach.'
      },
      {
        col1: 'CAT II Precision Approach',
        col2: '100 ft $\\\\le$ DH < 200 ft | RVR $\\\\ge$ 300 m',
        col3: 'Approach Ban at 1,000 ft AAL / OM',
        col4: 'At least 3 consecutive lights (centerline ALS, TDZ, runway centerline) with crossbar',
        col5: 'Requires active LVP, radar altimeter, and SPA.LVO approval.',
        highlight: true,
        notes: 'Autopilot coupled with manual disconnect at DH or autoland.'
      },
      {
        col1: 'CAT III A Approach',
        col2: 'DH < 100 ft (or no DH) | RVR $\\\\ge$ 175 m',
        col3: 'Approach Ban at 1,000 ft AAL / OM',
        col4: 'At least 3 consecutive centerline or TDZ lights at DH',
        col5: 'Fail-Passive or Fail-Operational system with autoland.',
        highlight: false,
        notes: 'Standard capability on modern executive business jets.'
      },
      {
        col1: 'CAT III B Approach',
        col2: 'DH < 50 ft (or no DH) | 75 m $\\\\le$ RVR < 175 m',
        col3: 'Approach Ban at 1,000 ft AAL / OM',
        col4: 'At least 1 centerline light visible at DH (or none if no DH)',
        col5: 'Requires Fail-Operational system with rollout guidance.',
        highlight: false,
        notes: 'Near-zero visibility automatic landing and rollout.'
      },
      {
        col1: 'Non-Precision Approach (NPA) - CDFA',
        col2: 'Chart minima (MDH/MDA + RVR per system)',
        col3: 'Continuous Descent Final Approach (CDFA) mandatory',
        col4: 'Threshold elements or approach lights at Derived Decision Altitude (DDA)',
        col5: 'Add safety margin (e.g. +50 ft) to MDA to prevent losing altitude on go-around.',
        highlight: false,
        notes: 'Drastically improves stabilized approach profile and CFIT prevention.'
      },
      {
        col1: 'Non-CDFA Approach (Penalty)',
        col2: 'Chart RVR + 200 m (Cat A/B) | Chart RVR + 400 m (Cat C/D)',
        col3: 'Step-down / Dive & Drive technique',
        col4: 'Full visual contact before descending below MDA',
        col5: 'Strict regulatory penalty due to higher risk of unstabilized approach.',
        highlight: true,
        notes: 'EASA strongly discourages flying non-CDFA profiles.'
      },
      {
        col1: 'Visual Circling Approach',
        col2: 'Circling MDA/H + minimum visibility per category (Cat B 1,500 m / Cat C 2,400 m)',
        col3: 'Maintain continuous visual contact with runway throughout circling maneuver',
        col4: 'Runway environment permanently in sight',
        col5: 'PROHIBITED to descend below Circling MDA until established on final approach.',
        highlight: false,
        notes: 'Fly within the obstacle clearance radius of the aircraft category.'
      }
    ],
    extraNotes: [
      'Golden Rule of Approach Ban: Prior to 1,000 ft AAL, the official weather report controls. After passing 1,000 ft AAL, pilot visual contact at DA/MDA controls.',
      'Inoperative Approach Lights: If ALS fails, the minimum required RVR increases according to aerodrome lighting penalty tables.'
    ]
  },

  // 15. RVSM AIRSPACE OPERATIONS, ALTIMETRY & CONTINGENCIES
  {
    id: 'netjets-easa-rvsm-equipment',
    category: 'easa-netjets',
    title: 'RVSM Airspace Operations, Altimetry Tolerances and Contingency Procedures',
    subtitle: 'Equipment Mandate (2 Primary Altimeters + 1 Altitude-Hold AP + 1 Altitude Alert + 1 Mode C/S Transponder), In-Flight Tolerances, and SLOP',
    manualRef: 'EASA Part-SPA.RVSM.100 / 110 • ICAO Doc 9574 • ICAO Doc 4444 • SERA.8015',
    badge: 'RVSM & Navigation',
    description: 'Mandatory operational procedures for Reduced Vertical Separation Minimum (1,000 ft) navigation between FL290 and FL410. Covers ground and in-flight altimetry crosschecks, system failures, and SLOP.',
    warningAlert: 'RVSM System Failure in Flight: Immediately notify ATC with the mandatory phraseology: "UNABLE RVSM DUE TO EQUIPMENT". ATC will establish 2,000 ft conventional separation or coordinate descent below FL290.',
    headers: ['RVSM Parameter / System', 'Operational Requirements', 'Allowable Tolerances', 'Contingency Procedure', 'Radiotelephony Phraseology'],
    rows: [
      {
        col1: 'RVSM Airspace Limits',
        col2: 'FL290 to FL410 inclusive (1,000 ft vertical separation)',
        col3: 'Above FL410 vertical separation reverts to 2,000 ft',
        col4: 'If not RVSM approved, operate at or below FL280',
        col5: '`NEGATIVE RVSM` (if non-approved aircraft).',
        highlight: true,
        notes: 'Optimizes upper airspace capacity and fuel efficiency.'
      },
      {
        col1: 'Mandatory 4 Equipment Systems',
        col2: '2 Primary Altimeters + 1 Altitude-Hold AP + 1 Altitude Alert + 1 Mode C/S Transponder',
        col3: 'All 4 systems must be 100% operational when entering RVSM airspace',
        col4: 'Failure of any of these 4 systems invalidates RVSM capability',
        col5: 'Verify system status during pre-flight check before passing FL290.',
        highlight: true,
        notes: 'Mnemonic: 2 Altimeters + AP + Alerter + SSR.'
      },
      {
        col1: 'Pre-Flight Ground Altimeter Crosscheck',
        col2: 'Set local QNH on both primary altimeters',
        col3: 'Max ±75 ft from known surveyed airport elevation (or ±50 ft per AFM)',
        col4: 'Max difference between primary altimeters: $\\\\le$ 50 to 75 ft',
        col5: 'If tolerance is exceeded, aircraft cannot be dispatched for RVSM flights.',
        highlight: false,
        notes: 'Mandatory crosscheck before taxiing.'
      },
      {
        col1: 'In-Flight Cruise Altimeter Crosscheck',
        col2: 'Set Standard 1013.25 hPa climbing through Transition Altitude (TA)',
        col3: 'Max difference between primary altimeters: 200 ft (60 m)',
        col4: 'Autopilot must maintain assigned flight level within ±65 ft (±20 m)',
        col5: 'Record hourly crosscheck entries in the operational navigation log.',
        highlight: false,
        notes: 'Discrepancy > 200 ft requires declaring RVSM degradation to ATC.'
      },
      {
        col1: 'In-Flight Equipment Failure in RVSM',
        col2: 'Autopilot failure, loss of primary altimeter, or split > 200 ft',
        col3: 'Maintain assigned level manually with maximum precision',
        col4: 'Monitor traffic on TCAS; request revised clearance or level change from ATC',
        col5: '`UNABLE RVSM DUE TO EQUIPMENT`.',
        highlight: true,
        notes: 'ATC will provide 2,000 ft vertical separation from other traffic.'
      },
      {
        col1: 'Strategic Lateral Offset Procedure (SLOP)',
        col2: 'Voluntary lateral offset to the RIGHT of airway centerline up to 2.0 NM',
        col3: 'Increments of 0.1 NM or fixed steps of 1 NM and 2 NM to the RIGHT',
        col4: 'Mitigates mid-air collision risk from GPS accuracy and wake turbulence encounters',
        col5: 'No ATC clearance required in published SLOP oceanic/remote airspace.',
        highlight: false,
        notes: 'NEVER execute SLOP to the left of the centerline.'
      },
      {
        col1: 'TCAS II Resolution Advisory (RA) Response',
        col2: 'Immediate vertical pitch maneuver disconnecting AP if necessary',
        col3: 'Initiate pitch within $\\\\le$ 5 sec (initial RA) or $\\\\le$ 2.5 sec (Reversal RA)',
        col4: 'ABSOLUTE PRIORITY over any conflicting ATC instruction',
        col5: '`[Callsign] TCAS RA` and upon return: `CLEAR OF CONFLICT, RETURNING TO [FL]`.',
        highlight: true,
        notes: 'Never maneuver in the direction opposite to a TCAS RA command.'
      },
      {
        col1: 'PBN Specifications (RNAV 5 vs RNAV 1 vs RNP APCH)',
        col2: 'RNAV 5 (±5 NM en-route) | RNAV 1 (±1 NM SID/STAR) | RNP APCH (±0.3 NM Final)',
        col3: 'Total lateral containment accuracy required 95% of flight time',
        col4: 'RNP requires On-Board Performance Monitoring and Alerting (OBPMA)',
        col5: 'Notify ATC immediately if GPS/RNP navigation capability is lost.',
        highlight: false,
        notes: 'RNAV 5 (B-RNAV) is mandatory in all European upper airspace.'
      }
    ],
    extraNotes: [
      'Severe Turbulence in RVSM: Notify ATC "UNABLE RVSM DUE TO TURBULENCE" if severe turbulence prevents altitude maintenance.',
      'Altimeter Transition Setting: Change from QNH to Standard at Transition Altitude (TA) on climb; change from Standard to QNH at Transition Level (TL) on descent.'
    ]
  },

  // 16. AIRCREW REGULATIONS: LICENSING, RECENCY & MEDICAL REQUIREMENTS
  {
    id: 'netjets-easa-aircrew-recency',
    category: 'easa-netjets',
    title: 'Aircrew Regulations: License Validity, Recency & Medical Requirements',
    subtitle: 'Class 1 Medical Validity, Age 60/65 Rules, 90-Day Recency, and OPC / Line Checks',
    manualRef: 'EASA Part-FCL.055 / 060 / 065 • Part-MED.A.045 • Part-ORO.FC.230',
    badge: 'Aircrew & Licensing',
    description: 'Comprehensive summary of privileges, limitations, and recency requirements for commercial air transport (CAT) and executive aviation flight crews in Europe.',
    warningAlert: 'Age 60/65 Rule (FCL.065): Pilots aged 60 to 64 may only operate in CAT as part of a multi-pilot crew if the OTHER pilot is under age 60. At age 65, acting as a pilot in commercial air transport is STRICTLY PROHIBITED.',
    headers: ['License / Rating / Check', 'Validity Period', 'Special Conditions / Reductions', 'Revalidation Window', 'Operational Criteria'],
    rows: [
      {
        col1: 'Class 1 Medical Certificate (< 40 years)',
        col2: '12 months',
        col3: 'Valid for all CAT operations (single-pilot or multi-pilot)',
        col4: 'Up to 45 days prior to expiry preserving anniversary date',
        col5: 'Periodic examination by an Aero-Medical Examiner (AME).',
        highlight: false,
        notes: 'Standard European Class 1.'
      },
      {
        col1: 'Class 1 Medical Certificate (40 to 59 years)',
        col2: '12 months (Multi-pilot) | 6 months (Single-pilot with pax)',
        col3: 'Reduced to 6 months if flying single-pilot commercial passenger flights',
        col4: '45 days prior to expiry',
        col5: 'Increased cardiovascular and ECG surveillance.',
        highlight: true,
        notes: 'At NetJets (multi-pilot), 12-month validity is maintained until age 60.'
      },
      {
        col1: 'Class 1 Medical Certificate ($\\\\ge$ 60 years)',
        col2: '6 months',
        col3: 'Applies to all commercial air transport (CAT) operations without exception',
        col4: '45 days prior to expiry',
        col5: 'Mandatory bi-annual medical examination.',
        highlight: true,
        notes: 'Universal reduction to 6 months for pilots 60 and older in CAT.'
      },
      {
        col1: 'Age Limitation: 60 to 64 years (Age 60-64)',
        col2: 'Until reaching 65th birthday',
        col3: 'May only operate in CAT as member of a MULTI-PILOT crew',
        col4: 'Mandatory condition: The other pilot must be UNDER AGE 60',
        col5: 'Prohibited for both pilots to be 60 or older on the same commercial flight.',
        highlight: true,
        notes: 'EASA FCL.065 "Only one pilot over 60" rule.'
      },
      {
        col1: 'Age 65 Ceiling Limit (Age 65)',
        col2: 'Immediate cessation of CAT privileges at age 65',
        col3: 'Absolute prohibition against acting as PIC or co-pilot in CAT',
        col4: 'No regulatory waivers for commercial transport',
        col5: 'May continue in flight instruction, private operations (Part-NCC/NCO), or ferry flights.',
        highlight: false,
        notes: 'Strict ICAO/EASA safety standard.'
      },
      {
        col1: 'Recent Flight Experience (Recency - FCL.060)',
        col2: 'Preceding 90 days before the flight',
        col3: 'At least 3 takeoffs, approaches, and landings as Pilot Flying (PF)',
        col4: 'On the same type/class or in a Level D qualified Full Flight Simulator',
        col5: 'Night flying: At least 1 night landing in 90 days (satisfied if holding valid IR).',
        highlight: true,
        notes: 'Indispensable legal condition to be rostered on a commercial flight.'
      },
      {
        col1: 'Type Rating / Instrument Rating (IR)',
        col2: '1 year (12 calendar months)',
        col3: 'Revalidation via Licence Proficiency Check (LPC)',
        col4: 'Within the 3 months immediately preceding the expiry date',
        col5: 'Preserves the original annual anniversary date.',
        highlight: false,
        notes: 'Normally combined with the operator OPC.'
      },
      {
        col1: 'Operator Proficiency Check (OPC)',
        col2: '6 calendar months',
        col3: 'Bi-annual simulator check covering abnormal and emergency procedures',
        col4: 'Within 3 months preceding expiry',
        col5: 'Mandatory requirement under Part-ORO.FC.230.',
        highlight: true,
        notes: 'Evaluates SOP compliance, emergency memory items, and CRM.'
      },
      {
        col1: 'Annual Line Check',
        col2: '12 calendar months',
        col3: 'Evaluation on a real commercial line flight over a typical route',
        col4: 'Within 3 months preceding expiry',
        col5: 'Evaluates line operations, SOPs, decision-making, and customer service.',
        highlight: false,
        notes: 'Conducted by a Type Rating Examiner (TRE/TRI).'
      },
      {
        col1: 'ICAO English Language Proficiency',
        col2: 'Level 4: 4 years | Level 5: 6 years | Level 6: Permanent (Lifetime)',
        col3: 'Official endorsement on the pilot licence (FCL.055)',
        col4: 'Formal evaluation before expiry date',
        col5: 'Mandatory standard for operating in the international NetJets network.',
        highlight: false,
        notes: 'Level 6 never expires.'
      }
    ],
    extraNotes: [
      'Quick-Donning Oxygen Mask (CAT.IDE.A.235): Mandatory on all pressurised aircraft operating above FL250. Must be donned with one hand in less than 5 seconds.',
      'Decrease in Medical Fitness: Pilot must suspend flight privileges and notify AME in writing upon illness/injury causing incapacity > 21 days, surgery, pregnancy, or regular medication.'
    ]
  },

  // 17. MEL / DDPM DISPATCH, NETJETS SCENARIOS AND CRM
  {
    id: 'netjets-easa-mel-dispatch',
    category: 'easa-netjets',
    title: 'MEL / DDPM Technical Dispatch, NetJets Scenarios & CRM',
    subtitle: 'MEL Rectification Intervals (A, B, C, D), (M)/(O) Procedures, VIP Passenger Management, and Corporate Decision-Making',
    manualRef: 'EASA Part-ORO.MLR.105 • CS-MMEL • Part-SPA.DG • ICAO Doc 9811',
    badge: 'MEL & NetJets CRM',
    description: 'Master guidelines for technical dispatch with inoperative equipment, dangerous goods (NOTOC), steep approaches (London City EGLC), and high-net-worth Owner interactions.',
    warningAlert: 'Day of Discovery in MEL: The calendar day on which a defect is recorded in the Aircraft Technical Log (ATL) DOES NOT COUNT towards the rectification timeframe. The interval begins at 00:00 local time on the following day.',
    headers: ['Category / Procedure', 'Rectification Interval', 'Day of Discovery Rule', 'Executing Authority', 'Operational Impact'],
    rows: [
      {
        col1: 'MEL Category A',
        col2: 'Specific interval stipulated in the MEL remarks (hours, cycles, flights, or calendar date)',
        col3: 'As expressly stated in the item',
        col4: 'Maintenance / Flight Crew per procedure',
        col5: 'No standard extension permitted.',
        highlight: false,
        notes: 'Example: 3 consecutive flight sectors or 24 calendar hours.'
      },
      {
        col1: 'MEL Category B',
        col2: '3 consecutive calendar days (72 hours)',
        col3: 'Excludes the calendar day recorded in the ATL',
        col4: 'Licensed Maintenance Engineer (LAME)',
        col5: 'Applies to critical redundant systems (e.g. one weather radar, one generator).',
        highlight: true,
        notes: 'Extendable once under approved operator extension procedures.'
      },
      {
        col1: 'MEL Category C',
        col2: '10 consecutive calendar days (240 hours)',
        col3: 'Excludes the calendar day recorded in the ATL',
        col4: 'Licensed Maintenance Engineer',
        col5: 'Most common category for minor avionics, passenger comfort, or secondary lighting.',
        highlight: false,
        notes: 'Standard 10-day rectification period.'
      },
      {
        col1: 'MEL Category D',
        col2: '120 consecutive calendar days',
        col3: 'Excludes the calendar day recorded in the ATL',
        col4: 'Maintenance Personnel',
        col5: 'Applies to optional non-essential equipment (e.g. cabin entertainment, galley ovens).',
        highlight: false,
        notes: 'Normally not extendable.'
      },
      {
        col1: 'MEL (M) Procedure',
        col2: 'Mandatory technical maintenance action prior to flight',
        col3: 'Prior to aircraft dispatch',
        col4: 'Licensed Maintenance Engineer (LAME)',
        col5: 'Ensures physical system safety (e.g. pulling/collaring breakers, blanking valves, securing brakes).',
        highlight: true,
        notes: 'Flight crew may only execute if expressly authorized in the Operations Manual after training.'
      },
      {
        col1: 'MEL (O) Procedure',
        col2: 'Operational procedure executed by the flight crew',
        col3: 'During cockpit preparation or in flight',
        col4: 'Commander and First Officer (Flight Crew)',
        col5: 'Performance chart adjustments, altitude limits, special checklists, or system configurations.',
        highlight: false,
        notes: 'Mandatory entry on operational flight plan and crew briefing.'
      },
      {
        col1: 'MEL vs CDL (Configuration Deviation List)',
        col2: 'MEL = Inoperative internal systems/instruments | CDL = Missing secondary external parts',
        col3: 'CDL covers external panels, flap track fairings, seals, or vortex generators',
        col4: 'Requires applying weight, fuel burn, or speed penalties from the AFM CDL',
        col5: 'Both documents must be checked together during pre-flight technical dispatch.',
        highlight: false,
        notes: 'CDL is an integral part of the manufacturer\\'s AFM.'
      },
      {
        col1: 'VIP Owner Management (Owner Focus vs Safety)',
        col2: 'Uncompromised safety + Empathetic, proactive executive service excellence',
        col3: 'When Owner requests landing below minima, overweight takeoff, or exceeding FTL',
        col4: 'Commander as safety leader and NetJets Brand Ambassador',
        col5: 'Assertive and professional communication; coordinate immediate alternate travel with Dispatch.',
        highlight: true,
        notes: 'Core foundational pillar evaluated during NetJets interviews.'
      },
      {
        col1: 'Unruly Passengers (ICAO / EASA Levels)',
        col2: 'Level 1: Verbal | Level 2: Physical | Level 3: Life threat | Level 4: Flight deck breach',
        col3: 'Standard 4-level threat classification',
        col4: 'Commander has absolute authority to offload disruptive passengers (CAT.GEN.MPA.105)',
        col5: 'Level 4 triggers immediate full Cockpit Lockdown and emergency landing.',
        highlight: false,
        notes: 'Cabin crew coordinates de-escalation under company protocol.'
      },
      {
        col1: 'Dangerous Goods: NOTOC',
        col2: 'Mandatory written notification delivered to the Commander before takeoff',
        col3: 'Contains: UN number, hazard class, packages, net mass, cargo location, and drill code',
        col4: 'Ground Handling Agent / Flight Dispatcher',
        col5: 'Essential for Commander to coordinate emergency response with ATC and fire services.',
        highlight: false,
        notes: 'Signed copy must be retained at departure station.'
      },
      {
        col1: 'Steep Approaches (e.g. London City EGLC)',
        col2: 'Approach glidepath $\\\\ge$ 4.5° (e.g. London City 5.5°, Sion, Lugano)',
        col3: 'Requires AFM steep approach certification, Operations Manual approval, and crew simulator training',
        col4: 'More restrictive wind limits and specific thrust/speedbrake profiles',
        col5: 'Prestigious and frequent operation across the NetJets European fleet.',
        highlight: false,
        notes: 'Higher visibility minima than standard 3.0° approaches.'
      }
    ],
    extraNotes: [
      'Pace Graded Assertiveness CRM: Probe -> Alert -> Challenge -> Emergency / Takeover. If the Commander fails to respond to critical deviations at the stabilization gate, the First Officer HAS THE LEGAL OBLIGATION to assume control ("I HAVE CONTROLS") and go around.',
      'Stabilized Approach Gate: Every approach must be 100% stabilized by 1,000 ft in IMC (500 ft in VMC): on glidepath, on localizer, speed VREF to VREF+10 kt, engines spooled, and landing configuration set.'
    ]
  }
];
"""

new_content = prefix + english_easa_tables

with open(TARGET_FILE, "w", encoding="utf-8") as f:
    f.write(new_content)

print(f"Successfully updated {TARGET_FILE} with English EASA tables.")
