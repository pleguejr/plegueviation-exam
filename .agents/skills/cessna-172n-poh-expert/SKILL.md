---
name: cessna-172n-poh-expert
description: >-
  Comprehensive knowledge base and validation engine for the Cessna 172N Skyhawk (Lycoming O-320-H2AD, 160 HP).
  Covers Pilot's Operating Handbook (POH 1978/1979/1980) limitations, speeds, procedures, systems, weights, and Section 9 Supplements.
---

# Cessna 172N Skyhawk Pilot's Operating Handbook (POH) Expert

This skill provides exact, verified performance data, limitations, operational procedures, and supplemental equipment descriptions for the **Cessna 172N Skyhawk** (Lycoming O-320-H2AD engine, 160 BHP @ 2700 RPM, POH 1978-1980).

---

## 0. Official Document Library Paths

All questions and technical procedures for the Cessna 172N fleet must be directly verified against the official documents in `manuales/`:

- **Manuales Cessna 172 en el Proyecto**:
  * `manuales/C-172N_mini.pdf` (Guía Rápida de Cabina y Checklists)
  * `manuales/Analisis_maniobras_C172N.pdf` (Análisis Operativo y Maniobras de Vuelo)
  * `manuales/Cessna-172N-POH-1978.pdf` (POH 1978)

---

## 1. Master Airspeed Limitations (POH Section 2)

| Speed Symbol | Description | KIAS | KCAS | Instrument Marking |
| :--- | :--- | :--- | :--- | :--- |
| **VNE** | Never Exceed Speed | **160 KIAS** | 158 KCAS | Red Radial Line |
| **VNO** | Max Structural Cruising | **128 KIAS** | 127 KCAS | Green/Yellow Arc boundary |
| **VA** | Manoeuvring Speed (2300 lbs) | **97 KIAS** | 96 KCAS | Structural limit |
| **VA** | Manoeuvring Speed (1950 lbs) | **89 KIAS** | 88 KCAS | Structural limit |
| **VA** | Manoeuvring Speed (1600 lbs) | **80 KIAS** | 80 KCAS | Structural limit |
| **VFE** | Max Flap Extended Speed (10°-40°) | **85 KIAS** | 87 KCAS | White Arc upper limit |
| **VSO** | Stall Speed (Flaps 40°, 2300 lbs) | **40 KIAS** | 33 KCAS | White Arc lower limit |
| **VS1** | Stall Speed (Flaps UP, 2300 lbs) | **47 KIAS** | 44 KCAS | Green Arc lower limit |

---

## 2. Normal Operating Speeds (POH Section 4)

- **Rotation Speed (VR)**: **55 KIAS** (Flaps UP).
- **Best Angle of Climb (VX)**: **59 KIAS** (Sea Level) to **61 KIAS** (10,000 ft).
- **Best Rate of Climb (VY)**: **73 KIAS** (Sea Level) to **68 KIAS** (10,000 ft).
- **Enroute Climb (Cruise Climb)**: **75 - 85 KIAS** (Flaps UP).
- **Short Field Takeoff**: Flaps 0°, brakes applied at full throttle, rotate at **55 KIAS**, climb at **59 KIAS** over 50 ft.
- **Final Approach (VREF)**:
  * Flaps UP: **65 - 75 KIAS**.
  * Flaps 40°: **60 - 70 KIAS**.
  * Short Field (Flaps 40° over 50 ft): **61 KIAS**.
- **Balked Landing / Go-Around**: Full throttle, Carb Heat COLD, Flaps 20°, initial climb **55 KIAS**, retract to 10° then UP.
- **Maximum Demonstrated Crosswind**: **15 knots**.

---

## 3. Emergency Procedures & Speeds (POH Section 3)

- **Best Glide Speed (VGLIDE)**: **65 KIAS** (Flaps UP, 2300 lbs) -> Glide ratio ~ 9:1 (~ 1.5 NM per 1,000 ft AGL).
- **Engine Failure Immediately After Takeoff**: **65 KIAS** (Flaps UP) / **60 KIAS** (Flaps DOWN). Land straight ahead without attempting 180° turn.
- **Engine Restart in Flight**: Glide 65 KIAS, Carb Heat ON, Fuel BOTH, Mixture RICH, Primer IN & LOCKED, Ignition BOTH/START.
- **Forced Landing Without Engine Power**: Approach 65 KIAS (Flaps UP), Final 60 KIAS (Flaps 40°), Master OFF, Ignition OFF, Fuel OFF.
- **Precautionary Landing With Engine Power**: 60 KIAS (Flaps 20°), Final 55 KIAS (Flaps 40°).
- **Ditching**: 55 - 60 KIAS with Flaps 20°-40° into wind or parallel to swell; unlatch cabin doors before touchdown.
- **Engine Fire in Flight**: Mixture IDLE CUT-OFF, Fuel OFF, Master OFF, Cabin Heat/Air OFF, 100 KIAS forced dive.
- **Electrical Fire**: Master OFF, Avionics Master OFF, Vents CLOSED, discharge fire extinguisher, ventilate only after extinguished.
- **Wing Fire**: Nav/Strobe OFF, Pitot Heat OFF, Sideslip to keep flames away from cabin and wing tank.
- **Spin Recovery (PARE)**: Throttle IDLE, Ailerons NEUTRAL, Rudder FULL OPPOSITE, Elevator briskly FORWARD, neutralize rudder upon stopping and pull out gently.

---

## 4. Powerplant, Weight & Systems Specifications (POH Section 1, 6 & 7)

- **Engine**: Lycoming O-320-H2AD (4 cylinders, horizontally opposed, carbureted with Marvel-Schebler MA-4SPA, dual magnetos Bendix D4LN, 160 BHP @ 2700 RPM).
- **Propeller**: McCauley 1C160/DTM7557, 2-blade fixed pitch, 75 inches diameter.
- **Fuel**: Approved Grade 100LL (Blue) or 100 (Green). Standard 43 US gal (39 usable); Long Range 54 US gal (50 usable).
- **Oil**: Capacity 6 US quarts (minimum safe for flight: 4 US quarts). Normal pressure 60-90 psi; Max temp 245°F (118°C).
- **Electrical**: 28V DC with 60A 28V alternator, 24V battery, Over-voltage sensor (disconnects at ~31.5V).
- **Weights**: Max Ramp 2307 lbs; MTOW 2300 lbs; Max Landing Weight 2300 lbs.
