---
name: diamond-da40d-tdi-expert
description: Comprehensive knowledge base and validation engine for the Diamond DA 40 D (DA40 TDI Diamond Star, EC-OKC) equipped with the Technify/Thielert TAE 125-01 or TAE 125-02-99 (Centurion 1.7 / 2.0) Diesel/Jet A-1 engine, dual-ECU FADEC, and MT-Propeller MTV-6-A/187-129 3-blade constant-speed propeller, plus Blue Team Flight School SOP Rev 04.
---

# Diamond DA 40 D (TDI) — EC-OKC Expert Reference

Use this skill when authoring, auditing, or validating multiple-choice questions (MCQs), operational tables, or SOP cards for **Flota Diamond DA40 TDI (`EC-OKC`)** (`banks/fleet-da40d`).

## 1. Official Manuals Covered
1. **Diamond DA 40 D Airplane Flight Manual (AFM)** — Doc. # 6.01.05-E, Revision 6 / Revision 7 (2013), EASA Approved.
2. **Blue Team Flight School — Standard Operational Procedures (SOP)** — Rev 04 (Jun/Oct 2025, 77 pages).

## 2. Airframe, Dimensions & Mass/CG Limitations (AFM Ch. 1, 2 & 6)
- **Construction:** GFRP semi-monocoque fuselage, GFRP/CFRP fail-safe sandwich wings (2 spars), T-tail of GFRP semi-monocoque construction.
- **Dimensions:** Span **11.94 m (39 ft 2 in)**, Length **8.01 m (26 ft 3 in)**, Height **1.97 m (6 ft 6 in)**, Wing area **13.54 m² (145.7 sq.ft)**.
- **Mass Limits:**
  - Maximum Take-off Mass (Normal Category): **1150 kg (2535 lb)**
  - Maximum Take-off Mass (Utility Category): **980 kg (2161 lb)**
  - Maximum Landing Mass: **1150 kg (2535 lb)** (with 18 mm landing gear struts, MÄM 40-123) or **1092 kg (2407 lb)** otherwise.
  - Minimum Flight Mass: **780 kg (1720 lb)**
  - Maximum Baggage Compartment Load: **30 kg (66 lb)** (without baggage net, **0 kg** may be loaded).
- **Center of Gravity (CG) & Datum Plane:**
  - Datum Plane (DP): **2.194 m (86.38 in)** forward of the most forward point of the root rib on the stub wing.
  - Forward CG limit: **2.40 m (94.5 in)** aft of DP from 780 kg to 980 kg; linear variation to **2.46 m (96.9 in)** aft of DP at 1150 kg.
  - Rearward CG limit: **2.59 m (102.0 in)** aft of DP (Standard Tank) or **2.55 m (100.4 in)** aft of DP (Long Range Tank).
- **Approved Maneuvers & Load Factors (AFM 2.9 & 2.10):**
  - **Normal Category (up to 1150 kg):** Normal flight maneuvers, stalling (except dynamic stalling), Lazy Eights, Chandelles, steep turns up to **60° bank**. Structural load factors: **+3.8 g / -1.52 g** at $V_A$, **+3.8 g / 0 g** at $V_{NE}$, **+2.0 g / 0 g** with flaps in T/O or LDG.
  - **Utility Category (up to 980 kg, max 2 occupants both in front seats):** Bank up to **90°** (note: attitude/directional gyros affected above 60° bank). Structural load factors: **+4.4 g / -1.76 g** at $V_A$, **+4.4 g / -1.0 g** at $V_{NE}$, **+2.0 g / 0 g** with flaps in T/O or LDG.
  - Aerobatics and intentional spinning are **PROHIBITED** in both categories.
- **Operating Altitude & Temperature (AFM 2.11 & 2.16):**
  - Maximum demonstrated operating altitude: **16,400 ft (5,000 m)** pressure altitude.
  - Ambient temperature limits prior to operation: **-20 °C to +54 °C** (below -20 °C cold-soaked, external pre-heater for engine and cabin is mandatory).

## 3. Airspeed Limitations & Operational Speeds (AFM 2.2, 2.3, 3.1.2, 4A.2, 5.3.5)
- **Airspeed Limitations & ASI Markings:**
  - **$V_{NE}$ (Red Line):** **178 KIAS**
  - **$V_{NO}$ / $V_C$ (Top of Green Arc):** **129 KIAS** (Yellow Arc: **129 – 178 KIAS**)
  - **$V_A$ (Maneuvering Speed):** **108 KIAS** (above 980 kg up to 1150 kg) / **94 KIAS** (from 780 kg up to 980 kg)
  - **$V_{FE}$ Flaps T/O:** **108 KIAS**
  - **$V_{FE}$ Flaps LDG (Top of White Arc):** **91 KIAS**
  - **White Arc:** **49 – 91 KIAS** | **Green Arc:** **52 – 129 KIAS**
- **Normal & Emergency Speeds by Mass (850 kg / 1000 kg / 1150 kg):**
  - **Rotation Speed $V_R$ (Flaps T/O):** **49 KIAS** (850 kg) / **55 KIAS** (1000 kg) / **59 KIAS** (1150 kg)
  - **Take-off Climb $V_Y$ (Flaps T/O) & Min Go-Around Speed (Flaps T/O):** **54 KIAS** (850 kg) / **60 KIAS** (1000 kg) / **66 KIAS** (1150 kg)
  - **Cruise Climb (Flaps UP) & Best Glide (Flaps UP) & Precautionary Landing:** **60 KIAS** (850 kg) / **68 KIAS** (1000 kg) / **73 KIAS** (1150 kg)
  - **Engine Failure After Take-off (Flaps T/O):** **59 KIAS** (850 kg) / **66 KIAS** (1000 kg) / **72 KIAS** (1150 kg)
  - **Landing Approach $V_{\text{REF}}$ (Flaps LDG):** **58 KIAS** (850 kg) / **63 KIAS** (1000 kg) / **67 KIAS** (1092 kg) / **71 KIAS** (1150 kg)
  - **Stalling Speeds ($V_S$ at 1150 kg, 0° bank):** **52 KIAS** (Flaps UP), **51 KIAS** (Flaps T/O), **49 KIAS** (Flaps LDG). At 60° bank (1150 kg): **79 KIAS** (UP), **78 KIAS** (T/O), **76 KIAS** (LDG).
  - **Glide Ratio (AFM 3.4 & 5.3.14):** **8.8** with windmilling propeller (**1.45 NM / 2.68 km** per 1000 ft); **10.3** with stationary propeller (**1.70 NM / 3.14 km** per 1000 ft).
  - **Max Demonstrated Crosswind (AFM 5.3.6):** **20 kt**.

## 4. Powerplant, Propeller, Fuel & Electrical Systems (AFM Ch. 2, 3, 4A, 4B, 7)
- **Engine:** Thielert/Technify **TAE 125-01** ($1689\text{ cm}^3$) or **TAE 125-02-99** ($1991\text{ cm}^3$, MÄM 40-256), 4-cylinder common-rail turbo-diesel with intercooler, **1:1.69** reduction gearbox, **99 kW (135 DIN-HP)** at **2300 RPM**.
- **Propeller:** MT-Propeller **MTV-6-A/187-129** (diameter **187 cm**, pitch **12° to 28°** at 0.75 R), 3 wood-composite blades, hydraulically regulated via separate gearbox oil circuit (loss of oil pressure sends blades to **fine pitch stop / max RPM**).
- **Instrument Markings (TAE 125-02-99 / CED-125 & AED-125):**
  - **RPM:** Green **0–2300 RPM**, Red **> 2300 RPM** (max overspeed **2500 RPM for max 20 sec**; on TAE 125-01 yellow 2400–2500, red >2500).
  - **Oil Pressure (OP):** Red **< 1.2 bar**, Yellow **1.2–2.3 bar**, Green **2.3–5.2 bar**, Yellow **5.2–6.5 bar**, Red **> 6.5 bar** (cold start up to 6.5 bar max 20 s; must leave red within **3 seconds** of start).
  - **Oil Temperature (OT):** Red **< -32 °C**, Yellow **-32 to 50 °C**, Green **50 to 125 °C**, Yellow **125 to 140 °C**, Red **> 140 °C**.
  - **Coolant Temperature (CT):** Red **< -32 °C**, Yellow **-32 to 60 °C**, Green **60 to 96 °C**, Yellow **96 to 105 °C**, Red **> 105 °C** (thermostat opens radiator at **~80 °C**; freezing point **-36 °C**).
  - **Gearbox Temperature (GT):** Green **up to 115 °C**, Yellow **115 to 120 °C**, Red **> 120 °C**.
  - **Fuel Temperature:** Red **< -30 °C**, Yellow **-30 to +4 °C**, Green **+5 to 69 °C**, Yellow **70 to 75 °C**, Red **> 75 °C** (+65 °C max on TAE 125-01). With Diesel/unknown fuel: flashing yellow (-30 to -6 °C) = no start; steady yellow (-5 to +4 °C) = no takeoff (min +5 °C in LH tank).
  - **Voltmeter:** Red **< 11 V**, Yellow **11 to 12.6 V**, Green **12.6 to 15.0 V**, Yellow **15.0 to 15.5 V**, Red **> 15.5 V**.
  - **Ammeter:** Green **up to 85 A**, Yellow **85 to 90 A**, Red **> 90 A**.
- **Fuel System (MAIN Left Wing / AUX Right Wing):**
  - **Standard Tank:** Total **2 × 15.0 US gal (2 × 56.8 L)**, Usable **2 × 14.0 US gal (2 × 53.0 L)**.
  - **Long Range Tank:** Total **2 × 20.5 US gal (2 × 77.6 L)**, Usable **2 × 19.5 US gal (2 × 73.8 L)**; max indicated **15 US gal** per tank (when indicator shows 15 US gal, **19.5 US gal** must be assumed for imbalance calculation!). Max difference LH/RH tank: **9 US gal (approx. 34 L)**.
  - **Normal Operation:** Engine draws fuel ONLY from **MAIN tank (left wing)**; uninjected return fuel flows through **AUX tank (right wing)** and Fuel Cooler (remove baffle when **OAT > 20 °C / 68 °F**) back to MAIN tank. Electric transfer pump moves fuel from AUX to MAIN at **~60 US gal/h (227 L/h)** and stops automatically when MAIN is full or AUX is empty.
  - **Fuel Transfer Pump Failure (`EMERG. TRANSFER`):** Emergency fuel valve has 3 positions (**NORMAL, EMERG. TRANSFER, OFF**). Selecting `EMERG. TRANSFER` draws fuel from AUX tank and returns excess to MAIN tank at **18–21 US gal/h (70–80 L/h)**. Must return valve to `NORMAL` **before AUX tank reads 0** (keep AUX $\ge 1\text{ US gal}$, MAIN $\le 15\text{ US gal}$), or engine will stop!
  - **LOW FUEL Caution:** Illuminates when usable fuel in MAIN tank is **< 3 US gal (+2/-1 US gal)**.
- **Electrical System (12V DC, 4 Batteries):**
  - **Alternator:** **90 A** (12–14 V), connected to Battery Bus via **100 A fuse**.
  - **1. Main Battery:** **12 V, 23 Ah** lead-acid (right firewall), connected to Hot Battery Bus (50 A fuse) and Battery Bus. Powers system for **min 30 minutes** after alternator failure.
  - **2. Excitation Battery:** **12 V, 1.3 Ah** sealed lead-acid (behind instrument panel, 5 A fuse) — energizes alternator field if main battery fails.
  - **3. ECU Backup Battery:** **12 V, 12 Ah** sealed lead-acid (under rear right seat, 30 A fuse) — automatically powers **ECU B only** if alternator fails and main battery is depleted. Red `ECU BACKUP UNSAFE` light illuminates if charge **< 70%** (IFR flights prohibited).
  - **4. Emergency Battery (IFR model):** Non-rechargeable dry battery controlled by sealed **EMERGENCY switch**; powers **Attitude Gyro (Artificial Horizon) and Flood Light for 1 hour** (replace every **2 years** or after use; IFR prohibited if seal broken).
- **Normal & Emergency Highlights:**
  - **Starter limit:** Max **10 s** cranking, **20 s** cooling; after **6 attempts**, cool for **30 minutes**.
  - **Warm-up:** **2 min at IDLE** (890 ± 20 RPM), then **1400 RPM** until OT and CT in green.
  - **Run-up (`Before Take-off`):** Power lever MAX for **10 s** (**2240–2300 RPM**, **90–100% Load**), then IDLE and hold **ECU TEST** until complete, then test **ECU SWAP to ECU B** and return to **AUTOMATIC**.
  - **Descent:** Above **5000 ft**, power lever **not less than 30%** (combustion may stop unrecognized at idle above 5000 ft with OAT < -10 °C).
  - **Shut-down:** Run at **IDLE for at least 2 minutes** before `ENGINE MASTER OFF` to prevent turbocharger heat damage.
  - **In-flight Restart:** Max restart altitude **8000 ft** (TAE 125-02-99) / **6500 ft** (TAE 125-01) / **6000 ft** (TAE 125-01 R5). Windmilling restart airspeed **73 to 110 KIAS** (above 110 KIAS risk of propeller overspeed; propeller windmills down to **60 KIAS**).
  - **CO Contamination / Smoke:** Unlatch front canopy to **'Cooling Gap'** position below **120 KIAS**.
  - **DOOR Warning Light:** Reduce speed **below 140 KIAS**; **NEVER try to lock the rear door in flight** (safety latch may disengage causing door separation).
