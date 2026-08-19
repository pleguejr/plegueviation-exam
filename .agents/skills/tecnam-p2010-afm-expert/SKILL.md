---
name: tecnam-p2010-afm-expert
description: >-
  Comprehensive knowledge base and validation engine for the Tecnam P2010 TDI (Continental CD-170).
  Covers official Aircraft Flight Manual (AFM Ed.2 Rev.13) limitations, speeds, normal operations,
  emergency procedures, G1000 NXi avionics, and FADEC dual-channel engine management.
---

# Tecnam P2010 TDI Aircraft Flight Manual (AFM) Expert

This skill provides verified, exact specifications and procedures for the **Tecnam P2010 TDI** (Continental CD-170, 170 HP turbocharged diesel/Jet A-1 engine).

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

## 2. Normal Operating Speeds (AFM Section 4)

- **Rotation Speed ($V_R$)**: **60 KIAS** (Flap T/O).
- **Best Angle of Climb ($V_X$)**:
  * Flap T/O: **65 KIAS**.
  * Flap Clean (0°): **72 KIAS**.
- **Best Rate of Climb ($V_Y$)**:
  * Flap T/O: **75 KIAS**.
  * Flap Clean (0°): **82 KIAS**.
- **Cruise Climb**: **85 – 90 KIAS** (Flap 0°).
- **Traffic Pattern**: Downwind **80 – 85 KIAS**; Base **75 – 80 KIAS**.
- **Final Approach ($V_{REF}$)**:
  * Flap T/O: **70 KIAS**.
  * Flap LAND: **65 KIAS** (66 KIAS at 1200/1220 kg).
  * No-Flap Landing (Flap 0° / Inop): **75 KIAS** (76 KIAS at 1200/1220 kg).
- **Short Field Obstacle Clearance (50 ft)**:
  * Takeoff (50 ft over obstacle): **65 KIAS** (Flap T/O).
  * Landing (50 ft over threshold): **60 KIAS** (Flap LAND).
- **Balked Landing / Go-Around**: **65 KIAS** initial climb with Flap T/O.
- **Maximum Demonstrated Crosswind**: **15 knots**.

## 3. Emergency Speeds & Procedures (AFM Section 3)

- **Best Glide Speed ($V_{GLIDE}$)**: **84 KIAS** (Flap 0° / Clean).
  * Glide Ratio: **1:12** (~2.0 NM per 1,000 ft altitude loss).
- **Engine In-Flight Restart (Windmilling / Starter)**: **84 KIAS**.
- **Forced Landing without Engine Power**:
  * Glide descent: **84 KIAS**.
  * Final approach before touchdown: **65 KIAS** (Flap LAND) or **70 KIAS** (Flap T/O).
- **Precautionary Landing with Engine Power**: Inspection run at **75 KIAS** (Flap T/O); final at **65 KIAS** (Flap LAND).
- **Ditching**: Final approach at **65 KIAS** with Flap LAND.
- **Severe Turbulence Penetration**: Adjust power to maintain **$\le 119\text{ KIAS}$ ($V_A$)**.

## 4. Powerplant & Systems (Continental CD-170)

- **Engine**: Liquid-cooled, 4-cylinder in-line, turbocharged, common-rail diesel (170 HP @ 2300 RPM).
- **Fuel**: Jet A-1 (or Diesel EN 590). Total capacity: 240 L (63.4 US gal); Usable: 231 L (61.0 US gal).
- **FADEC**: Dual-channel (FADEC A / FADEC B) with automatic transfer and backup battery (30 min emergency power).
- **Propeller**: MT-Propeller 3-blade constant speed with electronic governor.
