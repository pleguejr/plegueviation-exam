---
name: tecnam-p2010-afm-expert
description: >-
  Comprehensive knowledge base and validation engine for the Tecnam P2010 TDI (Continental CD-170).
  Covers official Aircraft Flight Manual (AFM Ed.2 Rev.13) limitations, speeds, normal operations,
  emergency procedures, G1000 NXi avionics, weights, dimensions, and FADEC dual-channel engine management.
---

# Tecnam P2010 TDI Aircraft Flight Manual (AFM) Expert

This skill provides verified, exact specifications and procedures for the **Tecnam P2010 TDI** (Continental CD-170, 170 HP turbocharged common-rail diesel / Jet A-1 engine, AFM Ed.2 Rev.13).

---

## 0. Official Document Library Paths

All questions and technical procedures for the Tecnam fleet must be directly verified against the official documents in:

- **Directorio de Manuales Tecnam**:
  `C:\Users\plegu\My Drive\My drive\ATPL(A)\type ratings\Tecnam\`
- **Archivos Clave**:
  * `AFM P2010 TDI - Ed.2 Rev.13.pdf` (Aircraft Flight Manual Oficial)
  * `G1000 NXi.pdf` (Manual de Aviónica Garmin G1000 NXi)
  * `Tecnam_P2010tdi_Transition.pdf` (Manual de Transición y Sistemas)
  * `procedimientos_tecnam_p2010tdi.pdf` (Listas de Chequeo y Procedimientos)
  * `tecnam_p2010tdi_briefing_specs.pdf` (Especificaciones Técnicas de Briefing)
  * `Guía_de_Velocidades_de_Operación tecnam 2010tdi.png`

---

## 1. Master Airspeed Limitations (AFM Section 2)

| Speed Symbol | Description | Standard (MTOW 1160 kg) | MOD2010/207 (1200 kg) | MOD2010/269 (1220 kg) | Anemometer Color |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **$V_{NE}$** | Never Exceed Speed | **163 KIAS** (164 KCAS) | 163 KIAS | 163 KIAS | Red Radial Line |
| **$V_{NO}$** | Max Structural Cruising | **130 KIAS** (130 KCAS) | 130 KIAS | 130 KIAS | Green/Yellow Arc boundary |
| **$V_A / V_O$** | Design / Operating Manoeuvring | **119 KIAS** (119 KCAS) | 119 KIAS | 119 KIAS | Structural limit |
| **$V_{FE}$ Flap T/O** | Max Flap Extended (Takeoff) | **100 KIAS** (101 KCAS) | 102 KIAS | 104 KIAS | Flap limitation |
| **$V_{FE}$ Flap LAND**| Max Flap Extended (Landing) | **90 KIAS** (92 KCAS) | 92 KIAS | 93 KIAS | White Arc upper limit |
| **$V_{SO}$** | Stall Speed (Flap LAND, 1G) | **52 KIAS** (52 KCAS) | 53 KIAS | 54 KIAS | White Arc lower limit |
| **$V_{S1}$** | Stall Speed (Clean / Flap 0°, 1G) | **58 KIAS** (58 KCAS) | 59 KIAS | 60 KIAS | Green Arc lower limit |
| **$V_{S1}$** | Stall Speed (Flap T/O, 1G) | **55 KIAS** (55 KCAS) | 56 KIAS | 57 KIAS | Stall performance |

---

## 2. Normal Operating Speeds & Procedures (AFM Section 4)

- **Rotation Speed ($V_R$)**: **60 KIAS** (Flap T/O).
- **Best Angle of Climb ($V_X$)**: Flap T/O: **65 KIAS**; Flap Clean: **72 KIAS**.
- **Best Rate of Climb ($V_Y$)**: Flap T/O: **75 KIAS**; Flap Clean: **82 KIAS**.
- **Cruise Climb**: **85 – 90 KIAS** (Flap 0°).
- **Final Approach ($V_{REF}$)**:
  * Flap T/O: **70 KIAS**.
  * Flap LAND: **65 KIAS** (66 KIAS at 1200/1220 kg).
  * No-Flap Landing (Flap 0° / Inop): **75 KIAS** (76 KIAS at 1200/1220 kg) $\rightarrow$ Add +35% to landing distance.
- **Short Field Obstacle Clearance (50 ft)**:
  * Takeoff (50 ft over obstacle): **65 KIAS** (Flap T/O, brakes held at 100% Load, rotate at 55 KIAS).
  * Landing (50 ft over threshold): **60 KIAS** (Flap LAND).
- **Balked Landing / Go-Around**: **65 KIAS** initial climb with Flap T/O at 100% Load.
- **Maximum Demonstrated Crosswind**: **15 knots**.
- **FADEC Ground Run-Up**: Engine warm, hold FADEC Test button; FADEC cycles channels A and B automatically with RPM peaking at $\sim 1900\text{ RPM}$.
- **Turbocharger Cooldown**: Idle for **2 minutes** before engine shutdown.

---

## 3. Emergency Speeds & Procedures (AFM Section 3)

- **Best Glide Speed ($V_{GLIDE}$)**: **84 KIAS** (Flap 0° / Clean) $\rightarrow$ Glide Ratio **1:12** (~2.0 NM per 1,000 ft AGL).
- **Engine In-Flight Restart (Windmilling / Starter)**: **84 KIAS**.
- **Forced Landing without Engine Power**: Glide at **84 KIAS**; Final at **65 KIAS** (Flap LAND).
- **Precautionary Landing with Engine Power**: Inspection run at **75 KIAS** (Flap T/O); final at **65 KIAS** (Flap LAND).
- **Ditching**: Final approach at **65 KIAS** with Flap LAND parallel to swell.
- **Dual FADEC Warning**: Switch `FADEC FORCE B` if FADEC A fails to automatically transfer.
- **Propeller Governor Failure (Low Pitch / Overspeed)**: Modulate power lever to keep RPM $\le 2300\text{ RPM}$.
- **Electrical Fire / Smoke**: Master OFF, Emergency Switch OFF, Cabin Vents OPEN.

---

## 4. Powerplant, Dimensions & Systems Specifications (AFM Section 1, 2 & 7)

- **Engine**: Continental CD-170 (4 cylinders in-line, liquid cooled, common rail turbo-diesel, 170 HP @ 2300 RPM).
  * Fuel: Jet A-1, Jet A, or Automotive Diesel EN 590. Total 240 L (63.4 US gal); Usable 231 L (61.0 US gal). Maximum fuel imbalance: 30 L (8 US gal).
  * Coolant: 50% distilled water + 50% BASF Glysantin G48 (expansion tank 0.5 L).
  * Oil: Wet sump, capacity 6.0 L; minimum for flight 4.5 L. Pressure 2.5–6.0 bar (min 1.0, max 6.5 bar).
  * CHT: Maximum 250°C. Gearbox oil: 1.0 L, max temp 120°C.
- **Electrical System**: 28V DC with 70A main alternator, 24V main battery, and 30-minute dedicated FADEC backup battery. Over-voltage protection at 32V.
- **Hot Fuel Return Line**: Heated fuel returned from common rail rail pre-warms wing fuel tanks at high altitudes.
- **Avionics**: Garmin G1000 NXi with GDU 1050 PFD/MFD, GSU 75 ADAHRS, GMU 44 magnetometer, GMA 1360 audio with `DISPLAY BACKUP` button, GTX 345R ADS-B In/Out transponder, and MD302 Standby Module.
- **Autopilot (Garmin GFC 700)**: Minimum engagement altitudes: 400 ft on takeoff/climb; 80 ft on ILS approaches.
- **Airframe Dimensions & Limits**:
  * Wing Span: 10.30 m (33.8 ft); Length: 7.97 m (26.15 ft); Height: 2.64 m (8.66 ft); Wing Area: 13.90 m² (149.6 sq ft).
  * Wheel track: 2.26 m; Wheelbase: 1.94 m; Propeller ground clearance: 28 cm.
  * Baggage compartment capacity: 40 kg (88 lbs).
  * Load factors: $+3.8g / -1.52g$ (Flaps UP), $+2.0g / 0g$ (Flaps DOWN).
  * Airframe: Carbon fiber cabin safety cell with light aluminum semimonocoque tail cone and wings.
