# Aviation Rules & Strict Manual Verification Standards

When generating or editing aviation questions, flight manuals, operations checklists, or aircraft systems data:

1. **Mnemónicos Oficiales de Binter Canarias**:
   * **Briefing Despegue**: `TWIN` + `RETSE`.
   * **Briefing Aproximación**: `TWIN` + `E-DALTA`.
   * **Briefing a la Sobrecargo**: **`TELSI`** (Tipo de Emergencia, ETA, Lugar, Señales 30s, Instrucciones). **NUNCA usar NITS**.
   * **Toma de Decisiones Desvío Técnico**: **`IMFLOCC`** (Inop items, Meteo, Fuel, Landing Perf ePerf, Options, Choose Option, Communications).
   * **Orden de Listas**: **`MEANA`** (Memo $\rightarrow$ Emergency $\rightarrow$ Abnormal $\rightarrow$ Normal $\rightarrow$ Abnormal).

2. **Velocidades de la Tecnam P2010 TDI (Continental CD-170)**:
   * $V_{NE} = 163\text{ KIAS}$, $V_{NO} = 130\text{ KIAS}$, $V_A = 119\text{ KIAS}$, $V_{FE}\text{ (T/O)} = 100\text{ KIAS}$, $V_{FE}\text{ (LAND)} = 90\text{ KIAS}$.
   * $V_{SO} = 52\text{ KIAS}$, $V_{S1} = 58\text{ KIAS}$, $V_R = 60\text{ KIAS}$, $V_X = 65/72\text{ KIAS}$, $V_Y = 75/82\text{ KIAS}$.
   * **Planeo ($V_{GLIDE}$)**: **`84 KIAS`** (Flap 0° / Clean, ratio 1:12).
   * **Aproximación final**: Flap LAND = `65 KIAS`, Flap T/O = `70 KIAS`, No-Flap = `75 KIAS`.

3. **Velocidades de la Cessna 172N Skyhawk (Lycoming O-320-H2AD)**:
   * $V_{NE} = 160\text{ KIAS}$, $V_{NO} = 128\text{ KIAS}$, $V_A = 97\text{ KIAS}$, $V_{FE} = 85\text{ KIAS}$, $V_{SO} = 40\text{ KIAS}$, $V_{S1} = 47\text{ KIAS}$.
   * $V_R = 55\text{ KIAS}$, $V_X = 59\text{ KIAS}$, $V_Y = 73\text{ KIAS}$, $V_{GLIDE} = 65\text{ KIAS}$.
   * **Aproximación final**: Flaps 40° = `60-70 KIAS`, Short Field = `61 KIAS`.

4. **Reglas Psicométricas de Redacción de Opciones y Distractores (EASA)**:
   * **Simetría de longitud estricta**: Las 4 opciones ($A, B, C, D$) deben tener la misma longitud ($\pm 15\%$) y estructura gramatical idéntica.
   * **Prohibidas las pistas en la opción correcta**: NUNCA incluir aclaraciones parentéticas exclusivas en la opción correcta (ej. notas de manual, conversiones o versiones). Todo el detalle técnico y cuadros deben residir en `explanation.text`.
   * **Distractores realistas y competitivos**: Usar valores limítrofes reales (velocidades adyacentes, pesos de MTOW vs MLW, mínimos operacionales o umbrales FTL).
   * **Prohibidas las meta-opciones**: Nunca usar *"Todas las anteriores"*, *"Ninguna de las anteriores"* ni *"A + B son correctas"*.
