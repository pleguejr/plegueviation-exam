---
name: cessna-172f-tae125-expert
description: Comprehensive knowledge base and validation engine for the Reims/Cessna F172F (EC-NNX) equipped with the Technify TAE 125-01 / TAE 125-02-99 (Centurion 1.7 / 2.0) Diesel/Jet A-1 engine, dual-channel FADEC, and MT-Propeller 3-blade constant-speed propeller. Covers 1965 Cessna 172F Owner's Manual, POH Supplement Doc.-No. 20-0310-21023 (Issue 3 Rev 8/9), Blue Team Flight School Checklists (Normal V6 & Emergency V4), and SOP Rev 04.
---

# Reims/Cessna F172F (TAE 125 Diesel / EC-NNX) Expert

This skill provides exact, verified operational limitations, speeds, FADEC procedures, and system specifications for the **Reims/Cessna F172F (`EC-NNX`)** powered by the **Technify TAE 125-01 / TAE 125-02-99** turbocharged common-rail diesel engine (`99 kW / 135 HP @ 2300 RPM`).

## 1. Primary Reference Manuals (`manuales/cessna-172F/`)
- `OM+EC-NNX+++suplemento+motor.pdf`:
  - **1965 Cessna Model 172F Owner's Manual** (Pages 1–30).
  - **Supplement POH Reims/Cessna (F)172 F,G,H,I,K,L,M equipped with TAE 125-01 and TAE 125-02-99 Installation**, Issue 3 Rev. 8/9, Doc.-No. `20-0310-21023`.
- `NORMAL+VERTICAL+V6.pdf`: Blue Team Flight School C172F Normal Checklist V6.
- `EMERGENCIAS+VERTICAL+V4.pdf`: Blue Team Flight School C172F Emergency Checklist V4.
- `STANDAR+OPERATIONAL+PROCEDURES+rev+04+signed.pdf`: Blue Team Flight School Standard Operational Procedures (SOP Rev 04, June 2025).

## 2. Airspeeds, Weights & Structural Limitations
- **Airspeed Indicator Markings (1965 C172F OM & Checklist V6)**:
  - $V_{NE}$ (Red Line): `174 MPH` (`151 KCAS`).
  - Caution Range (Yellow Arc): `140 – 174 MPH` (`122 – 151 KCAS`).
  - Normal Range (Green Arc, $V_{S1}$ to $V_{NO}$): `59 – 140 MPH` (`51 – 122 KCAS`).
  - Flap Operating Range (White Arc, $V_{SO}$ to $V_{FE}$): `52 – 100 MPH` (`45 – 87 KCAS`).
  - $V_{FE}$ ($0^\circ - 10^\circ$): `110 KIAS`; $V_{FE}$ ($10^\circ - 40^\circ$): `85 KIAS (100 MPH)`.
  - $V_A$ (Maneuvering Speed): `106 KTS (122 MPH)`.
- **Stall Speeds at MTOM (2300 lb, Power Off, Aft CG — Checklist V6)**:
  - **Flap UP**: 0° bank `49 KIAS` | 20° `51 KIAS` | 40° `56 KIAS` | 60° `70 KIAS`.
  - **Flap 10°**: 0° bank `45 KIAS` | 20° `47 KIAS` | 40° `51 KIAS` | 60° `64 KIAS`.
  - **Flap 40°**: 0° bank `43 KIAS` | 20° `44 KIAS` | 40° `49 KIAS` | 60° `60 KIAS`.
- **Weights & Load Factors**:
  - **Normal Category**: Max Ramp `1044 kg (2302 lb)`, MTOW/MLW `1043 kg (2300 lb)`. Load factor: `+3.8g / -1.52g` (Flaps Up), `+3.5g` (Flaps Down).
  - **Utility Category**: Max Ramp `908 kg (2002 lb)`, MTOW/MLW `907 kg (2000 lb)`. Load factor: `+4.4g / -1.76g` (Flaps Up), `+3.5g` (Flaps Down).
  - **TAE 125 Supplement Prohibitions (Section 2, Page 2-1)**: Intentionally initiating **negative G maneuvers** is prohibited; in Utility Category, intentionally initiating **spins** is prohibited.
  - **Baggage Limits (Section 6, Page 6-6)**: Area 1 `54 kg (120 lb)`, Area 2 `23 kg`, combined max (Area 1 + Area 2) = `54 kg`.

## 3. TAE 125 Engine, CED-125 / AED-125 & Fuel System
- **Engine**: 4-cylinder in-line DOHC liquid-cooled common-rail diesel with turbocharger & intercooler, integrated reduction gearbox ($i = 1.69$), dual-channel FADEC (`A-FADEC` & `B-FADEC`), single-lever control. Displacement: `1689 ccm` (TAE 125-01) / `1991 ccm` (TAE 125-02-99). Max power: `99 kW (135 HP) @ 2300 RPM`. Certified ceiling: `17,500 ft`.
- **CED-125 Limits**:
  - RPM: Green `0–2300 RPM`, Red `> 2300 RPM` (Overspeed emergency: `2400–2500 RPM > 10 s` or `> 2500 RPM`).
  - Oil Pressure: Min idle `1.2 bar`, Min flight `2.3 bar`, Max `6.0 bar`, Cold start (<20s) `6.5 bar` (must reach $\ge 1\text{ bar}$ within `3 seconds` after start).
  - Coolant Temp (CT): Min start `-32°C`, Green `60–100°C`, Amber `101–105°C`, Red `> 105°C`. Thermostat: `< 84°C` small circuit, `84–94°C` both, `> 94°C` large circuit.
  - Oil Temp (OT): Min start `-32°C`, Green `50–129°C`, Amber `130–140°C`, Red `> 140°C`.
  - Gearbox Temp (GT): Min `-30°C`, Green `< 115°C`, Amber `115–120°C`, Red `> 120°C`.
- **AED-125 & Fuel Limits**:
  - Standard Tanks (Models F, G, H): Total `125.7 L (33.2 gal)`, Usable `114.3 L (30.2 gal)` (`57.2 L` per tank), Unusable `11.4 L (3 gal)`.
  - Low fuel warning (`Fuel L` / `Fuel R` amber light): `< 10 L (2.6 gal)` usable in respective tank. Return line goes exclusively to the **LEFT tank**.
  - Min fuel temp in tanks: Jet A-1 `-30°C` before T/O (`-35°C` in flight); Diesel EN 590 (>10% Diesel) `> 0°C` before T/O (`-5°C` in flight).
  - Alternator current: Green `0–52.4 A`, Amber `52.5–60 A`, Red `> 60 A` (must be `< 20 A` before takeoff). Voltage: Green `12.6–14 V`, Red `0–10 V` & `> 15 V`.
  - FADEC Backup Battery: supplies **A-FADEC only for max 30 minutes** if both alternator and main battery fail (**NEVER activate Force B when on backup battery only!**).
