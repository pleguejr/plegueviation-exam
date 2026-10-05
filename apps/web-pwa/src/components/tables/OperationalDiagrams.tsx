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
  Info
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
  | 'mass-balance-envelope';

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
