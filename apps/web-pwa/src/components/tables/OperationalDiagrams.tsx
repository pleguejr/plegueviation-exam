import React from 'react';
import { 
  Fuel, 
  Layers, 
  Plane, 
  TrendingDown, 
  ShieldAlert, 
  Clock, 
  Compass, 
  UserCheck, 
  AlertCircle,
  ArrowRight,
  Info,
  Gauge,
  Activity,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export type DiagramId = 
  | 'fuel-scheme'
  | 'planning-minima-flowchart'
  | 'approach-minima-profile'
  | 'rvsm-airspace'
  | 'takeoff-segments'
  | 'mel-timeline'
  | 'cabin-altitude-descent'
  | 'aircrew-age-medical'
  | 'mass-balance-envelope'
  | 'takeoff-speeds-envelope';

interface OperationalDiagramProps {
  diagramId: DiagramId;
  title?: string;
}

export const OperationalDiagram: React.FC<OperationalDiagramProps> = ({ diagramId }) => {
  switch (diagramId) {
    case 'fuel-scheme':
      return <FuelSchemeDiagram />;
    case 'planning-minima-flowchart':
      return <PlanningMinimaFlowchart />;
    case 'approach-minima-profile':
      return <ApproachMinimaProfileDiagram />;
    case 'rvsm-airspace':
      return <RVSMAirspaceDiagram />;
    case 'takeoff-segments':
      return <TakeoffSegmentsDiagram />;
    case 'mel-timeline':
      return <MELTimelineDiagram />;
    case 'cabin-altitude-descent':
      return <CabinAltitudeDescentDiagram />;
    case 'aircrew-age-medical':
      return <AircrewAgeMedicalDiagram />;
    case 'mass-balance-envelope':
      return <MassBalanceEnvelopeDiagram />;
    case 'takeoff-speeds-envelope':
      return <TakeoffSpeedsEnvelopeDiagram />;
    default:
      return null;
  }
};

/* 1. ESQUEMA DE COMBUSTIBLE (EASA AIR OPS FUEL SCHEME) */
const FuelSchemeDiagram: React.FC = () => {
  return (
    <div className="ops-diagram-container p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-emerald-500/30 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Fuel className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white">EASA Fuel Policy & Reservoir Hierarchy</h4>
            <p className="text-[11px] text-slate-400">Desglose secuencial de bloques de combustible para despacho IFR (CAT.OP.MPA.180)</p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
          AMC1 CAT.OP.MPA.180
        </span>
      </div>

      {/* Visual Stack Diagram */}
      <div className="space-y-2">
        {/* Ramp / Block Fuel Bar */}
        <div className="flex flex-col md:flex-row gap-2">
          
          {/* Taxi Fuel */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span>1. TAXI FUEL</span>
              <span className="text-amber-400 font-mono text-[10px]">APU + Rodaje</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Consumo antes del despegue considerando demoras estimadas de rodaje.</p>
          </div>

          {/* Trip Fuel */}
          <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/50 flex-[2] flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
              <span>2. TRIP FUEL</span>
              <span className="text-emerald-400 font-mono text-[10px]">Despegue → Toma</span>
            </div>
            <p className="text-[10px] text-slate-300 mt-1">Despegue + Ascenso + Crucero + Descenso + Aproximación + Aterrizaje en destino.</p>
          </div>

          {/* Contingency Fuel */}
          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-bold text-amber-300">
              <span>3. CONTINGENCY</span>
              <span className="text-amber-400 font-mono text-[10px]">5% o 3% ERA</span>
            </div>
            <p className="text-[10px] text-slate-300 mt-1">Mínimo 5% del Trip (o 3% con Fuel ERA / 20 min o min 5 min holding).</p>
          </div>

          {/* Alternate Fuel */}
          <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-500/40 flex-[1.5] flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-bold text-sky-300">
              <span>4. ALTERNATE</span>
              <span className="text-sky-400 font-mono text-[10px]">Frustrada → Alternativo</span>
            </div>
            <p className="text-[10px] text-slate-300 mt-1">Frustrada en destino + Ascenso + Crucero + Descenso + Aproximación al alternativo.</p>
          </div>

          {/* Final Reserve Fuel */}
          <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/60 flex-1 flex flex-col justify-between ring-1 ring-rose-500/40">
            <div className="flex items-center justify-between text-xs font-black text-rose-300">
              <span>5. FINAL RESERVE</span>
              <span className="text-rose-400 font-mono text-[10px]">¡INTOCABLE!</span>
            </div>
            <p className="text-[10px] text-rose-200 mt-1"><strong>30 min</strong> a 1.500 ft AAL a velocidad de espera (Jet/Turbofan).</p>
          </div>
        </div>

        {/* Total Sum Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex items-center justify-between">
            <span className="font-bold text-slate-300">Take-Off Fuel (TOW Fuel):</span>
            <span className="font-mono font-bold text-emerald-400">Trip + Cont + Alt + Final Reserve</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-amber-500/30 flex items-center justify-between">
            <span className="font-bold text-slate-300">Block / Ramp Fuel:</span>
            <span className="font-mono font-bold text-amber-400">Taxi + TOW Fuel + Extra Fuel</span>
          </div>
        </div>
      </div>

      {/* Footer Callout */}
      <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2 text-[11px] text-rose-300">
        <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
        <span>
          <strong>Declaración de Emergencia:</strong> Se declarará obligatoriamente <code className="bg-rose-950/80 px-1 py-0.5 rounded text-rose-200 font-bold">MAYDAY MAYDAY MAYDAY FUEL</code> cuando el combustible utilizable previsto al aterrizar sea menor que la <strong>Reserva Final (30 min)</strong>.
        </span>
      </div>
    </div>
  );
};

/* 2. FLUJOGRAMA DE MÍNIMOS DE PLANIFICACIÓN (TABLA 1A & 1B) */
const PlanningMinimaFlowchart: React.FC = () => {
  return (
    <div className="ops-diagram-container p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-sky-500/30 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white">Planning Minima Decision Flowchart (Tabla 1A / 1B)</h4>
            <p className="text-[11px] text-slate-400">Cálculo de incrementos meteorológicos para aeródromos alternativos (ETA ± 1 hora)</p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold">
          MOA 8.1.7.2.5 / 1B
        </span>
      </div>

      {/* Decision Tree Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        
        {/* Option 1: 2 Separate Type B Runways */}
        <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-2">
          <div className="flex items-center justify-between font-black text-emerald-300">
            <span>2+ PISTAS SEPARADAS (TIPO B)</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[10px] font-mono text-emerald-300">Óptimo</span>
          </div>
          <p className="text-[11px] text-slate-300">Dos o más aproximaciones Tipo B (CAT I/II/III) a pistas físicamente separadas e independientes.</p>
          <div className="p-2 rounded-lg bg-black/50 border border-emerald-500/30 font-mono text-[11px] text-emerald-400 space-y-0.5">
            <div>Techo: <strong>DA/H + 100 ft</strong></div>
            <div>Visibilidad: <strong>RVR + 300 m</strong></div>
          </div>
        </div>

        {/* Option 2: 1 Type B Runway */}
        <div className="p-3.5 rounded-xl bg-sky-950/30 border border-sky-500/40 space-y-2">
          <div className="flex items-center justify-between font-black text-sky-300">
            <span>1 APROXIMACIÓN TIPO B</span>
            <span className="px-1.5 py-0.5 rounded bg-sky-500/20 text-[10px] font-mono text-sky-300">Estándar</span>
          </div>
          <p className="text-[11px] text-slate-300">Una sola aproximación de precisión Tipo B (ILS / GLS / LPV) en uso en el aeródromo.</p>
          <div className="p-2 rounded-lg bg-black/50 border border-sky-500/30 font-mono text-[11px] text-sky-400 space-y-0.5">
            <div>Techo: <strong>DA/H + 150 ft</strong></div>
            <div>Visibilidad: <strong>RVR + 450 m</strong></div>
          </div>
        </div>

        {/* Option 3: Type A or Circling */}
        <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-2">
          <div className="flex items-center justify-between font-black text-amber-300">
            <span>TIPO A (3D / 2D) O CIRCLING</span>
            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-[10px] font-mono text-amber-300">No Precisión</span>
          </div>
          <p className="text-[11px] text-slate-300">Aproximaciones Tipo A (VOR, RNP, NDB) o maniobras de aproximación visual en circuito.</p>
          <div className="p-2 rounded-lg bg-black/50 border border-amber-500/30 font-mono text-[11px] text-amber-400 space-y-0.5">
            <div>Tipo A (2 ayudas): <strong>+200 ft / +1.000 m</strong></div>
            <div>Tipo A (1 ayuda): <strong>+400 ft / +1.500 m</strong></div>
            <div>Circling: <strong>MDA + 400 ft / VIS + 1.500 m</strong></div>
          </div>
        </div>

      </div>

      <div className="text-[11px] text-slate-400 flex items-center gap-2">
        <Info className="w-4 h-4 text-sky-400 shrink-0" />
        <span><strong>Regla de Selección:</strong> El operador podrá seleccionar la fila de mínimos más ventajosa disponible según las ayudas en servicio en el aeródromo alternativo.</span>
      </div>
    </div>
  );
};

/* 3. PERFIL DE APROXIMACIÓN Y APPROACH BAN (CAT I, II, III) */
const ApproachMinimaProfileDiagram: React.FC = () => {
  return (
    <div className="ops-diagram-container p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-purple-500/30 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
            <TrendingDown className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white">Precision Approach Categories & Approach Ban Profile</h4>
            <p className="text-[11px] text-slate-400">Perfil de descenso vertical, alturas de decisión (DH) y regla de prohibición de aproximación</p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold">
          EASA Part-SPA.LVO
        </span>
      </div>

      {/* Visual Glideslope Infographic */}
      <div className="relative p-4 rounded-xl bg-black/60 border border-slate-800 space-y-3 font-mono text-xs">
        
        {/* 1,000 ft Gate */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/50">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
            <span className="font-bold text-rose-300">1.000 ft AAL / FAF — APPROACH BAN GATE</span>
          </div>
          <span className="text-[11px] text-rose-200">RVR oficial controla obligatoriamente</span>
        </div>

        {/* Approach Categories Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-[11px]">
          
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700">
            <div className="font-bold text-sky-400 pb-1 border-b border-slate-800">CAT I</div>
            <div className="pt-1 text-slate-300">DH ≥ 200 ft</div>
            <div className="text-slate-300">RVR ≥ 550 m</div>
            <div className="text-[10px] text-slate-400 mt-1">1 elemento visual</div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900 border border-purple-500/40">
            <div className="font-bold text-purple-400 pb-1 border-b border-slate-800">CAT II</div>
            <div className="pt-1 text-slate-300">100 ft ≤ DH &lt; 200 ft</div>
            <div className="text-slate-300">RVR ≥ 300 m</div>
            <div className="text-[10px] text-slate-400 mt-1">3 luces consecutivas</div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900 border border-amber-500/40">
            <div className="font-bold text-amber-400 pb-1 border-b border-slate-800">CAT III A</div>
            <div className="pt-1 text-slate-300">DH &lt; 100 ft (o sin DH)</div>
            <div className="text-slate-300">RVR ≥ 175 m</div>
            <div className="text-[10px] text-slate-400 mt-1">Fail-Passive / Autoland</div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900 border border-emerald-500/40">
            <div className="font-bold text-emerald-400 pb-1 border-b border-slate-800">CAT III B</div>
            <div className="pt-1 text-slate-300">DH &lt; 50 ft (o sin DH)</div>
            <div className="text-slate-300">75 m ≤ RVR &lt; 175 m</div>
            <div className="text-[10px] text-slate-400 mt-1">Fail-Operational + Rollout</div>
          </div>

        </div>

        {/* Touchdown Zone */}
        <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-center font-sans text-[11px] text-emerald-300 font-bold">
          PISTA: Contacto con ruedas dentro de la Touchdown Zone (TDZ) • Desaceleración y salida rápida
        </div>
      </div>

      <div className="text-[11px] text-slate-400 leading-relaxed">
        <strong>Regla de Oro:</strong> Antes de 1.000 ft AAL manda el informe RVR de la torre. Pasados los 1.000 ft AAL manda el contacto visual del piloto a la Altitud de Decisión (DA/DH).
      </div>
    </div>
  );
};

/* 4. ESPACIO RVSM, TOLERANCIAS Y SLOP */
const RVSMAirspaceDiagram: React.FC = () => {
  return (
    <div className="ops-diagram-container p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-amber-500/30 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white">RVSM Airspace Architecture & Altimetry Tolerances</h4>
            <p className="text-[11px] text-slate-400">Separación vertical reducida (1.000 ft) entre FL290 y FL410 y procedimiento SLOP</p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
          EASA Part-SPA.RVSM
        </span>
      </div>

      {/* Infographic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        
        {/* 4 Mandatory Systems */}
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <h5 className="font-bold text-amber-300 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>4 Equipos Obligatorios RVSM</span>
          </h5>
          <ul className="space-y-1 text-slate-300 text-[11px]">
            <li>1. <strong>2 Altimétros Primarios Independientes</strong></li>
            <li>2. <strong>1 Piloto Automático con Mantenimiento de Altitud</strong></li>
            <li>3. <strong>1 Avisador de Desviación de Altitud (Alerter)</strong></li>
            <li>4. <strong>1 Transpondedor SSR Modo C / Modo S</strong></li>
          </ul>
          <p className="text-[10px] text-rose-300 font-mono pt-1">Fallo en vuelo: "UNABLE RVSM DUE TO EQUIPMENT"</p>
        </div>

        {/* Tolerances & SLOP */}
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <h5 className="font-bold text-sky-300 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-sky-400" />
            <span>Tolerancias y Procedimiento SLOP</span>
          </h5>
          <div className="space-y-1 text-slate-300 text-[11px]">
            <div>• Crosscheck en tierra: <strong>Máx ±75 ft</strong> (elevación aeródromo)</div>
            <div>• Discrepancia altímetros en vuelo: <strong>Máx 200 ft</strong></div>
            <div>• Mantenimiento AP: <strong>±65 ft</strong> del nivel asignado</div>
            <div>• SLOP: Desplazamiento lateral <strong>0.1 a 2.0 NM a la DERECHA</strong></div>
          </div>
        </div>

      </div>
    </div>
  );
};

/* 5. SEGMENTOS DE DESPEGUE (CS-25 TAKEOFF SEGMENTS) */
const TakeoffSegmentsDiagram: React.FC = () => {
  return (
    <div className="ops-diagram-container p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-rose-500/30 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
            <Plane className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white">CS-25 Takeoff Climb Segments Profile (OEI)</h4>
            <p className="text-[11px] text-slate-400">Trayectoria neta de despegue con fallo de motor y gradientes de subida obligatorios</p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-bold">
          EASA CS-25.121
        </span>
      </div>

      {/* 4 Segments Horizontal Progression */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs font-mono">
        
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
          <div className="font-bold text-slate-300 text-xs">1° SEGMENTO</div>
          <div className="text-[11px] text-slate-400 mt-1">Screen Height → Gear UP</div>
          <div className="text-[11px] text-emerald-400 font-bold mt-1">Gradiente &gt; 0% (Positivo)</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Speed: V2 • Flaps T/O</div>
        </div>

        <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 ring-1 ring-rose-500/30">
          <div className="font-bold text-rose-300 text-xs">2° SEGMENTO (CRÍTICO)</div>
          <div className="text-[11px] text-slate-300 mt-1">Gear UP → Accel Height (400 ft)</div>
          <div className="text-[11px] text-rose-400 font-bold mt-1">Gradiente: 2.4% (Bimotor)</div>
          <div className="text-[10px] text-slate-300 mt-0.5">Speed: V2 • Flaps T/O</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
          <div className="font-bold text-slate-300 text-xs">3° SEGMENTO</div>
          <div className="text-[11px] text-slate-400 mt-1">Aceleración y Limpieza</div>
          <div className="text-[11px] text-amber-400 font-bold mt-1">Gradiente: 1.2%</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Acelerar V2 → VFTO • Flaps UP</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
          <div className="font-bold text-slate-300 text-xs">4° SEGMENTO</div>
          <div className="text-[11px] text-slate-400 mt-1">Final Climb → 1.500 ft AAL</div>
          <div className="text-[11px] text-sky-400 font-bold mt-1">Gradiente: 1.2%</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Speed: VFTO • Max Continuous</div>
        </div>

      </div>

      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
        <span><strong>Screen Height:</strong> 35 ft (Pista Seca) / 15 ft (Pista Mojada / Contaminada)</span>
        <span className="text-rose-400 font-bold">Obstacle Clearance: Min 35 ft vertical</span>
      </div>
    </div>
  );
};

/* 6. LÍNEA DE TIEMPO DE INTERVALOS MEL (CAT A, B, C, D) */
const MELTimelineDiagram: React.FC = () => {
  return (
    <div className="ops-diagram-container p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-teal-500/30 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white">MEL Rectification Intervals Timeline (ORO.MLR.105)</h4>
            <p className="text-[11px] text-slate-400">Plazos legales de subsanación de averías diferidas y regla del Día del Hallazgo</p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20 font-bold">
          EASA CS-MMEL
        </span>
      </div>

      {/* Categories Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
        
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
          <div className="font-bold text-rose-400 text-xs">CATEGORÍA A</div>
          <div className="text-[11px] text-white font-bold mt-1">Intervalo Específico</div>
          <p className="text-[10px] text-slate-400 mt-1">Horas, ciclos, vuelos o fecha expresa en el ítem MEL. No prorrogable.</p>
        </div>

        <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 ring-1 ring-amber-500/30">
          <div className="font-bold text-amber-300 text-xs">CATEGORÍA B</div>
          <div className="text-[11px] text-amber-200 font-bold mt-1">3 días de calendario (72h)</div>
          <p className="text-[10px] text-slate-300 mt-1">Sistemas redundantes críticos. Prorrogable 1 vez por 3 días.</p>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
          <div className="font-bold text-sky-400 text-xs">CATEGORÍA C</div>
          <div className="text-[11px] text-sky-200 font-bold mt-1">10 días de calendario (240h)</div>
          <p className="text-[10px] text-slate-400 mt-1">Categoría más común para aviónica menor y confort. Prorrogable 10 días.</p>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
          <div className="font-bold text-emerald-400 text-xs">CATEGORÍA D</div>
          <div className="text-[11px] text-emerald-200 font-bold mt-1">120 días de calendario</div>
          <p className="text-[10px] text-slate-400 mt-1">Equipos opcionales no esenciales (galley, entretenimiento). No prorrogable.</p>
        </div>

      </div>

      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300">
        <strong>Regla del Día del Hallazgo (Day of Discovery):</strong> El día natural en que se anota la avería en el ATL NO cuenta. El plazo empieza a las 00:00 hora local del día siguiente.
      </div>
    </div>
  );
};

/* 7. PERFIL DE DESCENSO DE EMERGENCIA (CABIN ALTITUDE HIGH) */
const CabinAltitudeDescentDiagram: React.FC = () => {
  return (
    <div className="ops-diagram-container p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-rose-500/40 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
            <TrendingDown className="w-4 h-4 text-rose-400" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white">Emergency Descent Profile (CABIN ALTITUDE HIGH)</h4>
            <p className="text-[11px] text-slate-400">Flujo de acciones inmediatas de memoria y perfil de nivelación a 10.000 ft / MEA</p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-bold">
          QRH Section 1 Memory Item
        </span>
      </div>

      {/* Sequential Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        
        <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/50">
          <div className="font-black text-rose-300">PASO 1 · MÁSCARAS</div>
          <div className="text-[11px] text-white font-bold mt-1">Crew Oxy Masks: DON, 100%</div>
          <p className="text-[10px] text-slate-300 mt-1">Establecer comunicación por interfono inmediatamente.</p>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700">
          <div className="font-black text-amber-300">PASO 2 · CONTROLES</div>
          <div className="text-[11px] text-white font-bold mt-1">Thrust IDLE • Speedbrakes FULL</div>
          <p className="text-[10px] text-slate-300 mt-1">Desconectar A/T, palancas al ralentí, aerofrenos totalmente abiertos.</p>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700">
          <div className="font-black text-sky-300">PASO 3 · VELOCIDAD & TXP</div>
          <div className="text-[11px] text-white font-bold mt-1">Airspeed: MAX / Transponder 7700</div>
          <p className="text-[10px] text-slate-300 mt-1">Descender a VMO/MMO (o velocidad de turbulencia si hay daño estructural).</p>
        </div>

        <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40">
          <div className="font-black text-emerald-300">PASO 4 · NIVELACIÓN</div>
          <div className="text-[11px] text-white font-bold mt-1">Level Off: 10.000 ft o MEA</div>
          <p className="text-[10px] text-slate-300 mt-1">Nivelar en el más alto entre 10.000 ft y la Altitud Mínima en Ruta (MEA).</p>
        </div>

      </div>

      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
        <span><strong>Llamada de Cabina (PA):</strong> "DESCENSO DE EMERGENCIA (x3)"</span>
        <span className="text-emerald-400 font-bold">Al nivelar: "TRIPULACIÓN DE CABINA, DESCENSO FINALIZADO"</span>
      </div>
    </div>
  );
};

/* 8. REGLA AGE 60/65 Y VALIDEZ MÉDICA CLASE 1 */
const AircrewAgeMedicalDiagram: React.FC = () => {
  return (
    <div className="ops-diagram-container p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-indigo-500/30 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white">EASA Aircrew Age 60/65 Rule & Class 1 Medical Validity</h4>
            <p className="text-[11px] text-slate-400">Restricciones de edad en transporte comercial (FCL.065) y períodos de validez médica</p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold">
          EASA Part-FCL.065 / MED.A.045
        </span>
      </div>

      {/* Age Brackets Infographic */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
        
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
          <div className="font-bold text-emerald-400 text-xs">&lt; 40 AÑOS</div>
          <div className="text-[11px] text-white font-bold mt-1">Validez: 12 meses</div>
          <p className="text-[10px] text-slate-400 mt-1">Sin restricciones en CAT monopiloto o multipiloto.</p>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
          <div className="font-bold text-sky-400 text-xs">40 A 59 AÑOS</div>
          <div className="text-[11px] text-white font-bold mt-1">12 meses (Multipiloto)</div>
          <p className="text-[10px] text-slate-400 mt-1">Se reduce a 6 meses solo en vuelos comerciales monopiloto con pasajeros.</p>
        </div>

        <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 ring-1 ring-amber-500/30">
          <div className="font-bold text-amber-300 text-xs">60 A 64 AÑOS</div>
          <div className="text-[11px] text-amber-200 font-bold mt-1">6 meses (Multipiloto SOLO)</div>
          <p className="text-[10px] text-slate-300 mt-1"><strong>Condición obligatoria:</strong> El otro piloto DEBE ser menor de 60 años.</p>
        </div>

        <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/50">
          <div className="font-bold text-rose-300 text-xs">≥ 65 AÑOS</div>
          <div className="text-[11px] text-rose-200 font-bold mt-1">Límite Absoluto CAT</div>
          <p className="text-[10px] text-rose-300 mt-1"><strong>PROHIBIDO</strong> actuar como piloto en transporte comercial (CAT). Permitida instrucción o vuelos privados.</p>
        </div>

      </div>
    </div>
  );
};

/* 9. ENVOLVENTE DE MASA Y CENTRADO */
const MassBalanceEnvelopeDiagram: React.FC = () => {
  return (
    <div className="ops-diagram-container p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-emerald-500/30 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white">Mass & Balance Structural Limits Hierarchy</h4>
            <p className="text-[11px] text-slate-400">Jerarquía estructural de pesos y tolerancias operacionales de carga (MOA 8.1.8)</p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
          MOA 8.1.8 / AFM 2-04
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
          <div className="font-bold text-slate-300 text-xs">DOW / BOW</div>
          <div className="text-[11px] text-emerald-400 font-bold mt-1">Peso Operativo Seco</div>
          <p className="text-[10px] text-slate-400 mt-1">Estructura + Tripulación + Equipamiento de vuelo + Catering.</p>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
          <div className="font-bold text-slate-300 text-xs">MZFW</div>
          <div className="text-[11px] text-amber-400 font-bold mt-1">Max Zero Fuel Weight</div>
          <p className="text-[10px] text-slate-400 mt-1">DOW + Payload (Pasajeros + Equipaje + Carga). Límite estructural de flexión alar.</p>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
          <div className="font-bold text-slate-300 text-xs">MTOW</div>
          <div className="text-[11px] text-sky-400 font-bold mt-1">Max Takeoff Weight</div>
          <p className="text-[10px] text-slate-400 mt-1">MZFW + Takeoff Fuel. Máximo peso al soltar frenos en despegue.</p>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
          <div className="font-bold text-slate-300 text-xs">MLW</div>
          <div className="text-[11px] text-rose-400 font-bold mt-1">Max Landing Weight</div>
          <p className="text-[10px] text-slate-300 mt-1">MTOW - Trip Fuel. Límite de absorción de impacto del tren de aterrizaje.</p>
        </div>
      </div>
    </div>
  );
};

/* 10. VELOCIDADES OPERACIONALES V (ESPECTRO COMPLETO 0 KT -> V_DF / M_DF) */
const TakeoffSpeedsEnvelopeDiagram: React.FC = () => {
  const [activeZone, setActiveZone] = React.useState<'all' | 'takeoff' | 'landing' | 'climb' | 'structural'>('all');
  const [selectedSpeed, setSelectedSpeed] = React.useState<string | null>('V1');

  const speedData = [
    {
      id: 'VS',
      name: 'VS / VSR',
      desc: 'Stall Speed / Reference 1g Stall',
      zone: 'takeoff',
      zoneLabel: 'Baja Velocidad & Control',
      color: 'from-slate-600 to-slate-500',
      tagColor: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
      rule: 'Velocidad base de pérdida aerodinámica calibrada a 1g en configuración específica.',
      below: '0 kt (Parada estática)',
      above: 'VMCG / VMCA / V1',
      inequality: 'Base de cálculo para todas las velocidades operacionales mínimas.',
      order: 1
    },
    {
      id: 'VMCG',
      name: 'VMCG',
      desc: 'Minimum Control Speed Ground',
      zone: 'takeoff',
      zoneLabel: 'Baja Velocidad & Control',
      color: 'from-amber-600 to-amber-500',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      rule: 'Control direccional mantenido SOLO con timón de dirección tras fallo del motor crítico en carrera de despegue (desviación < 30 ft del eje).',
      below: 'VS / 0 kt',
      above: 'VEF (VEF ≥ VMCG)',
      inequality: 'VMCG ≤ VEF < V1',
      order: 2
    },
    {
      id: 'VMCA',
      name: 'VMCA / VMC',
      desc: 'Minimum Control Speed Air',
      zone: 'takeoff',
      zoneLabel: 'Baja Velocidad & Control',
      color: 'from-amber-600 to-amber-500',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      rule: 'Control en vuelo tras fallo de motor crítico manteniendo rumbo con alabeo ≤ 5° hacia el motor operativo.',
      below: 'VMCG',
      above: 'VR (VR ≥ 1.05 VMCA) y V2 (V2 ≥ 1.10 VMCA)',
      inequality: 'VMCA ≤ VR / 1.05 y VMCA ≤ V2 / 1.10',
      order: 3
    },
    {
      id: 'VEF',
      name: 'VEF',
      desc: 'Engine Failure Speed',
      zone: 'takeoff',
      zoneLabel: 'Despegue & Decisión',
      color: 'from-rose-600 to-rose-500',
      tagColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      rule: 'Velocidad calibrada en la que se asume que falla el motor crítico durante el despegue.',
      below: 'VMCG (VEF ≥ VMCG)',
      above: 'V1 (V1 ≥ VEF + tiempo de reacción del piloto ~1 seg)',
      inequality: 'VMCG ≤ VEF < V1',
      order: 4
    },
    {
      id: 'VMU',
      name: 'VMU',
      desc: 'Minimum Unstick Speed',
      zone: 'takeoff',
      zoneLabel: 'Despegue & Decisión',
      color: 'from-sky-600 to-sky-500',
      tagColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
      rule: 'Mínima velocidad a la que el avión puede despegar del suelo con seguridad sin riesgo de entrada en pérdida o contacto de cola (tailstrike).',
      below: 'VEF / V1',
      above: 'VLOF (VLOF ≥ 1.10 VMU all eng / 1.05 VMU OEI)',
      inequality: 'VMU < VLOF',
      order: 5
    },
    {
      id: 'V1',
      name: 'V1',
      desc: 'Takeoff Decision Speed',
      zone: 'takeoff',
      zoneLabel: 'Despegue & Decisión',
      color: 'from-emerald-600 to-emerald-500',
      tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      rule: 'Velocidad máxima para iniciar acción de abortar despegue (RTO) y mínima para continuar tras fallo de motor.',
      below: 'VEF (V1 > VEF) y VMCG (V1 ≥ VMCG)',
      above: 'VR (V1 ≤ VR) y VMBE (V1 ≤ VMBE)',
      inequality: 'VMCG ≤ VEF < V1 ≤ VR ≤ VMBE / VTIRE',
      order: 6
    },
    {
      id: 'VR',
      name: 'VR',
      desc: 'Rotation Speed',
      zone: 'takeoff',
      zoneLabel: 'Despegue & Decisión',
      color: 'from-emerald-600 to-emerald-500',
      tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      rule: 'Velocidad a la que se inicia la rotación para alcanzar V2 a la altura de pantalla (35 ft / 15 ft mojada).',
      below: 'V1 (VR ≥ V1) y VMCA (VR ≥ 1.05 VMCA)',
      above: 'VLOF (VR ≤ VLOF) y V2 (VR < V2)',
      inequality: 'V1 ≤ VR ≤ VLOF < V2',
      order: 7
    },
    {
      id: 'VLOF',
      name: 'VLOF',
      desc: 'Lift-Off Speed',
      zone: 'takeoff',
      zoneLabel: 'Despegue & Decisión',
      color: 'from-sky-600 to-sky-500',
      tagColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
      rule: 'Velocidad a la que el tren principal se separa físicamente de la pista.',
      below: 'VR (VLOF ≥ VR) y VMU (VLOF ≥ 1.05~1.10 VMU)',
      above: 'V2 (VLOF ≤ V2) y VTIRE (VLOF ≤ VTIRE)',
      inequality: 'VR ≤ VLOF ≤ V2 y VLOF ≤ VTIRE_MAX',
      order: 8
    },
    {
      id: 'V2',
      name: 'V2',
      desc: 'Takeoff Safety Speed',
      zone: 'takeoff',
      zoneLabel: 'Despegue & Decisión',
      color: 'from-cyan-600 to-cyan-500',
      tagColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      rule: 'Velocidad de seguridad con un motor inoperativo (OEI) al cruzar la altura de pantalla (35 ft seca / 15 ft mojada) y durante el segundo segmento de ascenso.',
      below: 'VR / VLOF (V2 ≥ VLOF) y VSR (V2 ≥ 1.13 VSR)',
      above: 'V2 + 10 / V2 + 15 / VFTO / VX',
      inequality: 'V2 ≥ 1.13 VSR  |  V2 ≥ 1.10 VMCA  |  V1 ≤ VR < V2',
      order: 9
    },
    {
      id: 'VMBE',
      name: 'VMBE',
      desc: 'Maximum Brake Energy Speed',
      zone: 'takeoff',
      zoneLabel: 'Límites de Pista & Frenos',
      color: 'from-orange-600 to-orange-500',
      tagColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      rule: 'Máxima velocidad a la que un RTO puede ser absorbido por los frenos sin superar su capacidad térmica estructural de absorción.',
      below: 'V1 en condiciones normales (V1 DEBE ser ≤ VMBE)',
      above: 'VMO / VNE',
      inequality: 'V1 ≤ VMBE (Límite superior infranqueable para V1)',
      order: 10
    },
    {
      id: 'VMCL',
      name: 'VMCL',
      desc: 'Minimum Control Speed Landing / Go-Around',
      zone: 'landing',
      zoneLabel: 'Aproximación & Aterrizaje',
      color: 'from-violet-600 to-violet-500',
      tagColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
      rule: 'Mínima velocidad de control direccional y lateral con motor crítico inoperativo en configuración de aterrizaje / motor y al aire (go-around).',
      below: 'VS en configuración limpia',
      above: 'VREF (VREF ≥ 1.05~1.10 VMCL)',
      inequality: 'VMCL ≤ VREF / 1.05',
      order: 11
    },
    {
      id: 'VREF',
      name: 'VREF',
      desc: 'Landing Reference Speed (50 ft)',
      zone: 'landing',
      zoneLabel: 'Aproximación & Aterrizaje',
      color: 'from-purple-600 to-purple-500',
      tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      rule: 'Velocidad de referencia para cruzar el umbral a 50 ft en configuración de aterrizaje. Base del cálculo de distancia de aterrizaje (CS-25.125).',
      below: 'VSR0 (VREF ≥ 1.23 VSR0) y VMCL (VREF ≥ VMCL)',
      above: 'VAPP (VAPP = VREF + adiciones de viento)',
      inequality: 'VREF ≥ 1.23 VSR0  |  VREF ≥ VMCL',
      order: 12
    },
    {
      id: 'VAPP',
      name: 'VAPP / VTARGET',
      desc: 'Approach Target Speed',
      zone: 'landing',
      zoneLabel: 'Aproximación & Aterrizaje',
      color: 'from-purple-600 to-purple-500',
      tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      rule: 'Velocidad volada durante la aproximación final (VREF + corrección de viento de frente y racha, típicamente +5 kt a +15/20 kt max).',
      below: 'VREF (VAPP ≥ VREF)',
      above: 'VFE (VAPP < VFE para el calado de flap seleccionado)',
      inequality: 'VREF ≤ VAPP ≤ VFE_landing',
      order: 13
    },
    {
      id: 'VX',
      name: 'VX / VXSE',
      desc: 'Best Angle of Climb Speed',
      zone: 'climb',
      zoneLabel: 'Subida & Configuración',
      color: 'from-blue-600 to-blue-500',
      tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      rule: 'Máxima ganancia de altitud por unidad de distancia horizontal. Crucial para librar obstáculos cercanos.',
      below: 'V2 / VFTO',
      above: 'VY (VX < VY en aviones convencionales)',
      inequality: 'V2 < VX < VY',
      order: 14
    },
    {
      id: 'VY',
      name: 'VY / VYSE',
      desc: 'Best Rate of Climb Speed',
      zone: 'climb',
      zoneLabel: 'Subida & Configuración',
      color: 'from-blue-600 to-blue-500',
      tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      rule: 'Máxima ganancia de altitud por unidad de tiempo (máximo variómetro).',
      below: 'VX (VY > VX)',
      above: 'VFE / VMO / VNO',
      inequality: 'VX < VY < VNO / VMO',
      order: 15
    },
    {
      id: 'VFTO',
      name: 'VFTO / Green Dot',
      desc: 'Final Takeoff Speed',
      zone: 'climb',
      zoneLabel: 'Subida & Configuración',
      color: 'from-teal-600 to-teal-500',
      tagColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      rule: 'Velocidad de fin de despegue con avión limpio y OEI, que proporciona el mejor régimen de ascenso o planeo en configuración limpia (Green Dot).',
      below: 'V2 / Flap retraction speed',
      above: 'VMO / MMO',
      inequality: 'V2 < VFTO ≈ 1.25 VSR_clean',
      order: 16
    },
    {
      id: 'VFE',
      name: 'VFE',
      desc: 'Max Flap Extended Speed',
      zone: 'climb',
      zoneLabel: 'Subida & Configuración',
      color: 'from-amber-600 to-amber-500',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      rule: 'Límite estructural máximo con hipersustentadores (flaps/slats) desplegados en cada posición.',
      below: 'VREF / VAPP en configuración de flap correspondiente',
      above: 'VMO / VNE',
      inequality: 'VAPP < VFE < VMO',
      order: 17
    },
    {
      id: 'VLE',
      name: 'VLE / VLO',
      desc: 'Max Landing Gear Operating / Extended',
      zone: 'climb',
      zoneLabel: 'Subida & Configuración',
      color: 'from-amber-600 to-amber-500',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      rule: 'VLO: Máxima para operar (extender/retraer) el tren. VLE: Máxima para volar con el tren extendido.',
      below: 'V2 / VFTO',
      above: 'VMO / MMO',
      inequality: 'VLO_retract ≤ VLO_extend ≤ VLE < VMO',
      order: 18
    },
    {
      id: 'VA',
      name: 'VA',
      desc: 'Maneuvering Speed',
      zone: 'structural',
      zoneLabel: 'Límites Estructurales & Alta Velocidad',
      color: 'from-red-600 to-red-500',
      tagColor: 'bg-red-500/20 text-red-300 border-red-500/30',
      rule: 'Velocidad de maniobra: máxima velocidad a la que se puede aplicar deflexión completa y brusca de un mando sin dañar la estructura (el avión entrará en pérdida antes de superar el límite de g).',
      below: 'VFTO / VY',
      above: 'VB / VMO / VNE',
      inequality: 'VA < VMO / MMO',
      order: 19
    },
    {
      id: 'VB',
      name: 'VB / VRA',
      desc: 'Turbulence Penetration Speed',
      zone: 'structural',
      zoneLabel: 'Límites Estructurales & Alta Velocidad',
      color: 'from-red-600 to-red-500',
      tagColor: 'bg-red-500/20 text-red-300 border-red-500/30',
      rule: 'Velocidad de diseño para penetración en turbulencia severa / racha de diseño (Rough Air Speed). Proporciona margen contra pérdida por racha y contra exceso de factor de carga g.',
      below: 'VA (generalmente VB ≤ VA)',
      above: 'VMO / MMO',
      inequality: 'VB < VMO / MMO',
      order: 20
    },
    {
      id: 'VMO',
      name: 'VMO / MMO',
      desc: 'Max Operating Limit Speed / Mach',
      zone: 'structural',
      zoneLabel: 'Límites Estructurales & Alta Velocidad',
      color: 'from-rose-600 to-rose-500',
      tagColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      rule: 'Velocidad y Mach límite operacional máximo que no debe ser excedido deliberadamente en ninguna fase normal de vuelo.',
      below: 'Todas las velocidades normales operativas (V1, VR, V2, VREF, VA, VB)',
      above: 'VDF / MDF (Límite demostrado de ensayo en vuelo)',
      inequality: 'VMO < VDF  |  MMO < MDF',
      order: 21
    },
    {
      id: 'VDF',
      name: 'VDF / MDF',
      desc: 'Demonstrated Flight Diving Speed / Mach',
      zone: 'structural',
      zoneLabel: 'Límites Estructurales & Alta Velocidad',
      color: 'from-red-700 to-red-600',
      tagColor: 'bg-red-500/20 text-red-300 border-red-500/30',
      rule: 'Velocidad / Mach máxima demostrada en ensayos de picado en vuelo durante la certificación (CS-25.335). Límite absoluto antes de flutter o fallos aeroelásticos.',
      below: 'VMO / MMO (VDF > VMO)',
      above: 'Velocidad máxima teórica de destrucción',
      inequality: 'VMO / MMO < VDF / MDF',
      order: 22
    }
  ];

  const filteredSpeeds = activeZone === 'all' 
    ? speedData 
    : speedData.filter(s => s.zone === activeZone);

  const selectedSpeedObj = speedData.find(s => s.id === selectedSpeed) || speedData[5];

  return (
    <div className="ops-diagram-container p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-sky-500/30 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30 shrink-0">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white flex items-center gap-2">
              <span>Aviation V-Speeds Continuous Spectrum & Hierarchy</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                0 kt → VDF / MDF
              </span>
            </h4>
            <p className="text-[11px] text-slate-400">
              Línea continua comparativa ordenada de menor a mayor velocidad, relaciones regulatorias y jerarquía operacional (CS-25 / FAR-25 / EASA Air OPS).
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 self-start sm:self-auto shrink-0">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
            CS-25.107
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold">
            NetJets SOP
          </span>
        </div>
      </div>

      {/* Zone Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
        <button
          onClick={() => setActiveZone('all')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
            activeZone === 'all'
              ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          Todo el Espectro (0 → VDF)
        </button>
        <button
          onClick={() => setActiveZone('takeoff')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
            activeZone === 'takeoff'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          1. Control & Despegue Crítico (VMCG, V1, VR, V2)
        </button>
        <button
          onClick={() => setActiveZone('landing')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
            activeZone === 'landing'
              ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          2. Aproximación & Aterrizaje (VMCL, VREF, VAPP)
        </button>
        <button
          onClick={() => setActiveZone('climb')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
            activeZone === 'climb'
              ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          3. Subida & Configuración (VX, VY, VFTO, VFE, VLE)
        </button>
        <button
          onClick={() => setActiveZone('structural')}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
            activeZone === 'structural'
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          4. Límites Estructurales (VA, VB, VMO, VDF)
        </button>
      </div>

      {/* Continuous Speed Line Spectrum (Infographic Track) */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            0 KT (Ground / Stall Base)
          </span>
          <span className="text-center hidden sm:inline text-slate-400">
            ESPECTRO CONTINUO ASCENDENTE DE VELOCIDADES
          </span>
          <span className="flex items-center gap-1 text-rose-400">
            VDF / MDF (Max Dive Limit)
            <span className="w-2 h-2 rounded-full bg-rose-500" />
          </span>
        </div>

        {/* Speed Bar / Track */}
        <div className="relative pt-2 pb-6 overflow-x-auto custom-scrollbar">
          <div className="min-w-[680px] sm:min-w-full">
            {/* Visual gradient line */}
            <div className="h-2.5 w-full rounded-full bg-gradient-to-r from-slate-600 via-amber-500 via-sky-500 via-purple-500 via-blue-500 to-rose-600 shadow-inner relative" />

            {/* Speed Points Grid */}
            <div className="flex justify-between items-start pt-2 px-1">
              {speedData.map((s) => {
                const isSelected = selectedSpeed === s.id;
                const isVisibleInZone = activeZone === 'all' || s.zone === activeZone;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSpeed(s.id)}
                    className={`flex flex-col items-center group transition-all transform ${
                      isVisibleInZone ? 'opacity-100 scale-100' : 'opacity-30 scale-90'
                    }`}
                    style={{ minWidth: '32px' }}
                    title={`${s.name} - ${s.desc}`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
                        isSelected
                          ? 'bg-white border-sky-400 scale-125 shadow-lg shadow-sky-400/50'
                          : 'bg-slate-900 border-slate-400 group-hover:border-white group-hover:bg-sky-500'
                      }`}
                    />
                    <span
                      className={`text-[10px] font-mono font-black mt-1.5 transition-colors ${
                        isSelected
                          ? 'text-sky-300 font-extrabold underline'
                          : 'text-slate-300 group-hover:text-white'
                      }`}
                    >
                      {s.id}
                    </span>
                    <span className="text-[8px] text-slate-400 hidden md:block">
                      #{s.order}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Speed Interactive Card & "¿Cuál está por encima / por debajo?" */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Main Speed Card */}
        <div className="lg:col-span-2 p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-lg font-mono font-black text-sm border ${selectedSpeedObj.tagColor}`}>
                {selectedSpeedObj.name}
              </span>
              <div>
                <h5 className="text-sm font-bold text-white leading-tight">
                  {selectedSpeedObj.desc}
                </h5>
                <span className="text-[10px] text-slate-400">
                  Fase: <strong className="text-slate-200">{selectedSpeedObj.zoneLabel}</strong> (Posición #{selectedSpeedObj.order} de 22)
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
            {selectedSpeedObj.rule}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20">
              <div className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                <ChevronRight className="w-3 h-3 rotate-90" />
                ¿Qué velocidad está POR DEBAJO (Inferior)?
              </div>
              <div className="font-mono text-xs font-bold text-slate-200 mt-1">
                {selectedSpeedObj.below}
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/20">
              <div className="text-[10px] font-bold text-rose-400 flex items-center gap-1">
                <ChevronRight className="w-3 h-3 -rotate-90" />
                ¿Qué velocidad está POR ENCIMA (Superior)?
              </div>
              <div className="font-mono text-xs font-bold text-slate-200 mt-1">
                {selectedSpeedObj.above}
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-sky-950/30 border border-sky-500/20 text-xs">
            <div className="text-[10px] font-bold text-sky-400">
              Desigualdad Regulatoria & Margen de Certificación (CS-25 / FAR 25):
            </div>
            <div className="font-mono text-xs font-black text-sky-200 mt-1">
              {selectedSpeedObj.inequality}
            </div>
          </div>
        </div>

        {/* Quick Speed Switcher & Golden Rules */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 mb-2">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              <span>Reglas de Oro en Examen (EASA / NetJets)</span>
            </div>
            <ul className="space-y-1.5 text-[11px] text-slate-300 list-disc list-inside">
              <li>
                <strong className="text-amber-300">Cadena de Despegue:</strong>{' '}
                <span className="font-mono text-[10px]">VMCG ≤ VEF &lt; V1 ≤ VR ≤ VLOF ≤ V2</span>
              </li>
              <li>
                <strong className="text-sky-300">Límite Superior V1:</strong> V1 nunca puede superar a <span className="font-mono text-[10px]">VR</span>, <span className="font-mono text-[10px]">VMBE</span> ni <span className="font-mono text-[10px]">VTIRE</span>.
              </li>
              <li>
                <strong className="text-emerald-300">Margen V2:</strong> V2 debe ser al menos <span className="font-mono text-[10px]">1.13 VSR</span> y <span className="font-mono text-[10px]">1.10 VMCA</span>.
              </li>
              <li>
                <strong className="text-purple-300">Margen VREF:</strong> VREF debe ser al menos <span className="font-mono text-[10px]">1.23 VSR0</span> y superar a <span className="font-mono text-[10px]">VMCL</span>.
              </li>
              <li>
                <strong className="text-rose-300">Alta Velocidad:</strong> <span className="font-mono text-[10px]">VB &lt; VA &lt; VMO / MMO &lt; VDF / MDF</span>.
              </li>
            </ul>
          </div>

          <div className="pt-2 border-t border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-1.5 font-bold">
              Seleccionar velocidad para ver detalles:
            </span>
            <div className="flex flex-wrap gap-1">
              {['VMCG', 'VEF', 'V1', 'VR', 'VLOF', 'V2', 'VREF', 'VAPP', 'VFTO', 'VMO'].map((id) => (
                <button
                  key={id}
                  onClick={() => setSelectedSpeed(id)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold transition-colors ${
                    selectedSpeed === id
                      ? 'bg-sky-500 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comparative Ordering Table (All Speeds from 0 to VDF) */}
      <div className="rounded-xl bg-slate-900/90 border border-slate-800 overflow-hidden">
        <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-sky-400" />
            Tabla Comparativa de Relaciones: ¿Cuál está por encima o por debajo?
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            {filteredSpeeds.length} velocidades mostradas
          </span>
        </div>

        <div className="overflow-x-auto max-h-72 custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] sticky top-0 border-b border-slate-800 z-10">
              <tr>
                <th className="p-2.5 w-12 text-center">#</th>
                <th className="p-2.5 w-24">Velocidad</th>
                <th className="p-2.5">Definición Operativa</th>
                <th className="p-2.5 w-36 text-emerald-400">Por Debajo (&lt;)</th>
                <th className="p-2.5 w-36 text-rose-400">Por Encima (&gt;)</th>
                <th className="p-2.5 w-44 text-sky-300">Desigualdad Clave</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredSpeeds.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => setSelectedSpeed(s.id)}
                  className={`cursor-pointer transition-colors ${
                    selectedSpeed === s.id
                      ? 'bg-sky-500/10 hover:bg-sky-500/20'
                      : 'hover:bg-slate-800/40'
                  }`}
                >
                  <td className="p-2 text-center font-mono text-[10px] text-slate-400">
                    {s.order}
                  </td>
                  <td className="p-2 font-mono font-black text-slate-200">
                    <span className={`px-1.5 py-0.5 rounded text-[11px] border ${s.tagColor}`}>
                      {s.id}
                    </span>
                  </td>
                  <td className="p-2 text-slate-300">
                    <div className="font-bold text-white text-[11px]">{s.name}</div>
                    <div className="text-[10px] text-slate-400">{s.desc}</div>
                  </td>
                  <td className="p-2 font-mono text-[10px] text-emerald-400/90">
                    {s.below}
                  </td>
                  <td className="p-2 font-mono text-[10px] text-rose-400/90">
                    {s.above}
                  </td>
                  <td className="p-2 font-mono text-[10px] text-sky-300 font-semibold">
                    {s.inequality}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

