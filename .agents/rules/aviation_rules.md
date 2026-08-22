# Aviation Rules & Strict Manual Verification Standards

When generating or editing aviation questions, flight manuals, operations checklists, or aircraft systems data:

## 0. Master Library Paths for Manual Verification
- **MOA Binter (Ed.06 RN25)**: `C:\Users\plegu\My Drive\My drive\BINTER\BA tripulantes EMB\Manuales del operador\MOA BinterCanarias ED06 RN25 RT00.pdf`
- **MOB Binter (Ed.06 RN25)**: `C:\Users\plegu\My Drive\My drive\BINTER\BA tripulantes EMB\Manuales del operador\MOB BinterCanarias ED06 RN25 RT00.pdf`
- **MEL Binter (RN24)**: `C:\Users\plegu\My Drive\My drive\BINTER\BA tripulantes EMB\Manuales del operador\MEL EMB BA RN24.pdf`
- **AOM Embraer E2 (Rev.11)**: `C:\Users\plegu\My Drive\My drive\BINTER\BA tripulantes EMB\Manuales fabricante Embraer\AOM-5875-174-REV11-FULL 11.2.pdf`
- **SOPM Embraer E2 (Rev.14)**: `C:\Users\plegu\My Drive\My drive\BINTER\BA tripulantes EMB\Manuales fabricante Embraer\SOPM-1755-200-REV14-FULL_1760451613050.PDF`
- **Tecnam P2010 TDI (Ed.2 Rev.13 & G1000)**: `C:\Users\plegu\My Drive\My drive\ATPL(A)\type ratings\Tecnam\`
- **Cessna 172N Skyhawk (POH 1978-1980 & Supl)**: `C:\Users\plegu\My Drive\My drive\ATPL(A)\type ratings\cessna 172\`

---

## 1. Bugs & Screenshots Workflow (Carpeta `bugs/`)
- **Ruta de Pantallazos de Errores**: `C:\Users\plegu\My Drive\Antigravity\Plegueviation exam\bugs\`
- **Protocolo de Acción Obligatorio**:
  * Siempre que el usuario solicite corregir fallos, errores o bugs en preguntas, el agente debe **revisar en primer lugar esta carpeta `bugs/`** usando `list_dir` y `view_file` para examinar los pantallazos colocados por el usuario.
  * Analizar la captura del error, identificar el ID del reactivo o contenido afectado, cotejar con los manuales oficiales de la Sección 0, e implementar la solución correspondiente.

---

## 2. Mnemónicos Oficiales de Binter Canarias
* **Briefing Despegue**: `TWIN` + `RETSE`.
* **Briefing Aproximación**: `TWIN` + `E-DALTA`.
* **Briefing a la Sobrecargo**: **`TELSI`** (Tipo de Emergencia, ETA, Lugar, Señales 30s, Instrucciones). **NUNCA usar NITS**.
* **Toma de Decisiones Desvío Técnico**: **`IMFLOCC`** (Inop items, Meteo, Fuel, Landing Perf ePerf, Options, Choose Option, Communications).
* **Orden de Listas**: **`MEANA`** (Memo $\rightarrow$ Emergency $\rightarrow$ Abnormal $\rightarrow$ Normal $\rightarrow$ Abnormal).

---

## 3. Velocidades de la Tecnam P2010 TDI (Continental CD-170)
* $V_{NE} = 163\text{ KIAS}$, $V_{NO} = 130\text{ KIAS}$, $V_A = 119\text{ KIAS}$, $V_{FE}\text{ (T/O)} = 100\text{ KIAS}$, $V_{FE}\text{ (LAND)} = 90\text{ KIAS}$.
* $V_{SO} = 52\text{ KIAS}$, $V_{S1} = 58\text{ KIAS}$, $V_R = 60\text{ KIAS}$, $V_X = 65/72\text{ KIAS}$, $V_Y = 75/82\text{ KIAS}$.
* **Planeo ($V_{GLIDE}$)**: **`84 KIAS`** (Flap 0° / Clean, ratio 1:12).
* **Aproximación final**: Flap LAND = `65 KIAS`, Flap T/O = `70 KIAS`, No-Flap = `75 KIAS`.

---

## 4. Velocidades de la Cessna 172N Skyhawk (Lycoming O-320-H2AD)
* $V_{NE} = 160\text{ KIAS}$, $V_{NO} = 128\text{ KIAS}$, $V_A = 97\text{ KIAS}$, $V_{FE} = 85\text{ KIAS}$, $V_{SO} = 40\text{ KIAS}$, $V_{S1} = 47\text{ KIAS}$.
* $V_R = 55\text{ KIAS}$, $V_X = 59\text{ KIAS}$, $V_Y = 73\text{ KIAS}$, $V_{GLIDE} = 65\text{ KIAS}$.
* **Aproximación final**: Flaps 40° = `60-70 KIAS`, Short Field = `61 KIAS`.

---

## 5. Reglas Psicométricas de Redacción de Opciones y Distractores (EASA)
* **Simetría de longitud estricta**: Las 4 opciones ($A, B, C, D$) deben tener la misma longitud ($\pm 15\%$) y estructura gramatical idéntica sin usar coletillas artificiales.
* **Prohibidas las opciones idénticas**: Todas las 4 opciones deben ser conceptualmente y textualmente distintas.
* **Prohibidos los distractores absurdos**: No inventar números irreales ni sustituciones mecánicas (e.g. `motor 3/4/5` en bimotores).
* **Prohibidas las pistas en la opción correcta**: NUNCA incluir aclaraciones parentéticas exclusivas en la opción correcta. Todo el detalle técnico y cuadros deben residir en `explanation.text`.
* **Distractores realistas y competitivos**: Usar valores limítrofes reales (velocidades adyacentes, pesos de MTOW vs MLW, mínimos operacionales o umbrales FTL).
* **Prohibidas las meta-opciones**: Nunca usar *"Todas las anteriores"*, *"Ninguna de las anteriores"* ni *"A + B son correctas"*.
