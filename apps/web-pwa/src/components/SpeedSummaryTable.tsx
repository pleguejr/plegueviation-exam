import React from 'react';
import { Gauge, AlertTriangle, Shield, Plane, Zap } from 'lucide-react';

interface SpeedSummaryTableProps {
  aircraftType?: 'p2010' | 'c172n' | 'e195e2' | 'general';
  highlightSpeed?: string;
}

export const SpeedSummaryTable: React.FC<SpeedSummaryTableProps> = ({
  aircraftType = 'p2010',
  highlightSpeed
}) => {
  if (aircraftType === 'p2010') {
    return (
      <div className="rounded-2xl bg-[#081224] border border-sky-500/30 overflow-hidden shadow-xl mt-4 font-sans animate-fade-in">
        {/* Table Header */}
        <div className="bg-gradient-to-r from-[#0f244a] to-[#16366b] px-4 py-3 border-b border-sky-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-xs sm:text-sm">
            <Gauge className="w-4 h-4 text-sky-400" />
            <span>Cuadro Resumen de Velocidades — Tecnam P2010 TDI (CD-170)</span>
          </div>
          <span className="text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 px-2 py-0.5 rounded-full">
            AFM Ed.2 Rev.13
          </span>
        </div>

        {/* Speeds Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900/80 text-[11px] font-mono text-slate-400 uppercase border-b border-slate-800">
                <th className="py-2.5 px-3">Categoría</th>
                <th className="py-2.5 px-3">Símbolo</th>
                <th className="py-2.5 px-3 font-bold text-sky-300">Valor (MTOW 1160 kg)</th>
                <th className="py-2.5 px-3 hidden sm:table-cell">Modificaciones (1200 / 1220 kg)</th>
                <th className="py-2.5 px-3">Significado / Arco Anemómetro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
              
              {/* Vne */}
              <tr className="hover:bg-rose-950/20 transition-colors">
                <td className="py-2 px-3 text-rose-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span>Limitante</span>
                </td>
                <td className="py-2 px-3 font-black text-rose-300">Vne</td>
                <td className="py-2 px-3 font-black text-rose-400 text-xs">163 KIAS (164 KCAS)</td>
                <td className="py-2 px-3 text-slate-400 hidden sm:table-cell">163 KIAS</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Velocidad de Nunca Exceder (Línea Roja)</td>
              </tr>

              {/* Vno */}
              <tr className="hover:bg-amber-950/20 transition-colors">
                <td className="py-2 px-3 text-amber-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>Limitante</span>
                </td>
                <td className="py-2 px-3 font-black text-amber-300">Vno</td>
                <td className="py-2 px-3 font-black text-amber-400 text-xs">130 KIAS (130 KCAS)</td>
                <td className="py-2 px-3 text-slate-400 hidden sm:table-cell">130 KIAS</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Máximo Crucero Estructural (Inicio Arco Amarillo)</td>
              </tr>

              {/* Va / Vo */}
              <tr className="hover:bg-sky-950/20 transition-colors">
                <td className="py-2 px-3 text-sky-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span>Limitante</span>
                </td>
                <td className="py-2 px-3 font-black text-sky-300">Va / Vo</td>
                <td className="py-2 px-3 font-black text-sky-400 text-xs">119 KIAS (119 KCAS)</td>
                <td className="py-2 px-3 text-slate-400 hidden sm:table-cell">119 KIAS</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Velocidad de Maniobra (Turbulencia Severa)</td>
              </tr>

              {/* Vfe Flap TO */}
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2 px-3 text-slate-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                  <span>Flaps</span>
                </td>
                <td className="py-2 px-3 font-bold text-white">Vfe (T/O)</td>
                <td className="py-2 px-3 font-bold text-emerald-400">100 KIAS (101 KCAS)</td>
                <td className="py-2 px-3 text-slate-400 hidden sm:table-cell">102 KIAS (1200kg) / 104 KIAS (1220kg)</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Máxima con Flap T/O extendido</td>
              </tr>

              {/* Vfe Flap LAND */}
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2 px-3 text-slate-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                  <span>Flaps</span>
                </td>
                <td className="py-2 px-3 font-bold text-white">Vfe (LAND)</td>
                <td className="py-2 px-3 font-bold text-emerald-400">90 KIAS (92 KCAS)</td>
                <td className="py-2 px-3 text-slate-400 hidden sm:table-cell">92 KIAS (1200kg) / 93 KIAS (1220kg)</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Máxima con Flap LAND (Fin Arco Blanco)</td>
              </tr>

              {/* Vso */}
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2 px-3 text-purple-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>Pérdida</span>
                </td>
                <td className="py-2 px-3 font-bold text-purple-300">Vso</td>
                <td className="py-2 px-3 font-bold text-purple-400">52 KIAS (52 KCAS)</td>
                <td className="py-2 px-3 text-slate-400 hidden sm:table-cell">53 KIAS (1200kg) / 54 KIAS (1220kg)</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Pérdida con Flap LAND (Inicio Arco Blanco)</td>
              </tr>

              {/* Vs1 */}
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2 px-3 text-purple-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>Pérdida</span>
                </td>
                <td className="py-2 px-3 font-bold text-purple-300">Vs1</td>
                <td className="py-2 px-3 font-bold text-purple-400">58 KIAS (58 KCAS)</td>
                <td className="py-2 px-3 text-slate-400 hidden sm:table-cell">59 KIAS (1200kg) / 60 KIAS (1220kg)</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Pérdida Limpia Flap 0° (Inicio Arco Verde)</td>
              </tr>

              {/* Vr */}
              <tr className="bg-sky-950/30 hover:bg-sky-950/50 transition-colors">
                <td className="py-2 px-3 text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Despegue</span>
                </td>
                <td className="py-2 px-3 font-black text-white">Vr</td>
                <td className="py-2 px-3 font-black text-emerald-400 text-xs">60 KIAS</td>
                <td className="py-2 px-3 text-slate-400 hidden sm:table-cell">60 KIAS</td>
                <td className="py-2 px-3 text-slate-200 font-sans">Velocidad de Rotación (Flap T/O)</td>
              </tr>

              {/* Vx */}
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2 px-3 text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Subida</span>
                </td>
                <td className="py-2 px-3 font-bold text-white">Vx</td>
                <td className="py-2 px-3 font-bold text-slate-200">65 KIAS (T/O) / 72 KIAS (Clean)</td>
                <td className="py-2 px-3 text-slate-400 hidden sm:table-cell">65 / 72 KIAS</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Mejor Ángulo de Subida (Franqueamiento obstáculo)</td>
              </tr>

              {/* Vy */}
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2 px-3 text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Subida</span>
                </td>
                <td className="py-2 px-3 font-bold text-white">Vy</td>
                <td className="py-2 px-3 font-bold text-slate-200">75 KIAS (T/O) / 82 KIAS (Clean)</td>
                <td className="py-2 px-3 text-slate-400 hidden sm:table-cell">75 / 82 KIAS</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Mejor Régimen de Subida (Ganancia de altitud en tiempo)</td>
              </tr>

              {/* Vref / Final */}
              <tr className="bg-sky-950/30 hover:bg-sky-950/50 transition-colors">
                <td className="py-2 px-3 text-sky-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span>Aterrizaje</span>
                </td>
                <td className="py-2 px-3 font-black text-white">Vref / Final</td>
                <td className="py-2 px-3 font-black text-sky-300 text-xs">65 KIAS (LAND) / 70 KIAS (T/O)</td>
                <td className="py-2 px-3 text-slate-400 hidden sm:table-cell">66 KIAS (Flap LAND)</td>
                <td className="py-2 px-3 text-slate-200 font-sans">Aproximación Final Normal (1.3 Vso)</td>
              </tr>

              {/* Best Glide / Vglide */}
              <tr className="bg-amber-950/30 border-l-4 border-amber-500 hover:bg-amber-950/50 transition-colors">
                <td className="py-2.5 px-3 text-amber-400 font-black flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Emergencia</span>
                </td>
                <td className="py-2.5 px-3 font-black text-amber-300 text-xs">Vglide</td>
                <td className="py-2.5 px-3 font-black text-amber-400 text-xs">84 KIAS (84 KCAS)</td>
                <td className="py-2.5 px-3 text-slate-300 font-bold hidden sm:table-cell">84 KIAS</td>
                <td className="py-2.5 px-3 text-amber-200 font-sans font-semibold">
                  Mejor Planeo (Flap 0°, Ratio 1:12, ~2.0 NM / 1000 ft)
                </td>
              </tr>

              {/* No-Flap Landing */}
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2 px-3 text-amber-400 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-amber-400" />
                  <span>Anormal</span>
                </td>
                <td className="py-2 px-3 font-bold text-white">No-Flap App</td>
                <td className="py-2 px-3 font-bold text-slate-200">75 KIAS</td>
                <td className="py-2 px-3 text-slate-400 hidden sm:table-cell">76 KIAS</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Aproximación con fallo de flaps (Flap 0°)</td>
              </tr>

              {/* Max Crosswind */}
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2 px-3 text-slate-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                  <span>Operacional</span>
                </td>
                <td className="py-2 px-3 font-bold text-white">Viento Cruzado</td>
                <td className="py-2 px-3 font-bold text-sky-400">15 knots (15 kts)</td>
                <td className="py-2 px-3 text-slate-400 hidden sm:table-cell">15 kts</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Componente máxima demostrada en despegue/toma</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (aircraftType === 'c172n') {
    return (
      <div className="rounded-2xl bg-[#081224] border border-sky-500/30 overflow-hidden shadow-xl mt-4 font-sans animate-fade-in">
        <div className="bg-gradient-to-r from-[#0f244a] to-[#16366b] px-4 py-3 border-b border-sky-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-xs sm:text-sm">
            <Gauge className="w-4 h-4 text-sky-400" />
            <span>Cuadro Resumen de Velocidades — Cessna 172N Skyhawk (160 HP)</span>
          </div>
          <span className="text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 px-2 py-0.5 rounded-full">
            C172N POH
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900/80 text-[11px] font-mono text-slate-400 uppercase border-b border-slate-800">
                <th className="py-2.5 px-3">Categoría</th>
                <th className="py-2.5 px-3">Símbolo</th>
                <th className="py-2.5 px-3 font-bold text-sky-300">Valor (MTOW 2300 lbs)</th>
                <th className="py-2.5 px-3">Significado / Arco Anemómetro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
              <tr className="hover:bg-rose-950/20 transition-colors">
                <td className="py-2 px-3 text-rose-400 font-bold">Limitante</td>
                <td className="py-2 px-3 font-black text-rose-300">Vne</td>
                <td className="py-2 px-3 font-black text-rose-400 text-xs">160 KIAS (158 KCAS)</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Never Exceed (Línea Roja)</td>
              </tr>
              <tr className="hover:bg-amber-950/20 transition-colors">
                <td className="py-2 px-3 text-amber-400 font-bold">Limitante</td>
                <td className="py-2 px-3 font-black text-amber-300">Vno</td>
                <td className="py-2 px-3 font-black text-amber-400 text-xs">128 KIAS (127 KCAS)</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Max Structural Cruising (Inicio Arco Amarillo)</td>
              </tr>
              <tr className="hover:bg-sky-950/20 transition-colors">
                <td className="py-2 px-3 text-sky-400 font-bold">Limitante</td>
                <td className="py-2 px-3 font-black text-sky-300">Va</td>
                <td className="py-2 px-3 font-black text-sky-400 text-xs">97 KIAS (a 2300 lbs)</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Velocidad de Maniobra (89 kts @ 1950 lbs; 80 kts @ 1600 lbs)</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2 px-3 text-slate-400 font-bold">Flaps</td>
                <td className="py-2 px-3 font-bold text-white">Vfe</td>
                <td className="py-2 px-3 font-bold text-emerald-400">85 KIAS (87 KCAS)</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Flaps Extended (10° - 40°, Fin Arco Blanco)</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2 px-3 text-purple-400 font-bold">Pérdida</td>
                <td className="py-2 px-3 font-bold text-purple-300">Vso</td>
                <td className="py-2 px-3 font-bold text-purple-400">40 KIAS (33 KCAS)</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Pérdida Flaps 40° (Inicio Arco Blanco)</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2 px-3 text-purple-400 font-bold">Pérdida</td>
                <td className="py-2 px-3 font-bold text-purple-300">Vs1</td>
                <td className="py-2 px-3 font-bold text-purple-400">47 KIAS (44 KCAS)</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Pérdida Limpia Flaps UP (Inicio Arco Verde)</td>
              </tr>
              <tr className="bg-sky-950/30 hover:bg-sky-950/50 transition-colors">
                <td className="py-2 px-3 text-emerald-400 font-bold">Despegue</td>
                <td className="py-2 px-3 font-black text-white">Vr</td>
                <td className="py-2 px-3 font-black text-emerald-400 text-xs">55 KIAS</td>
                <td className="py-2 px-3 text-slate-200 font-sans">Rotación Flaps UP</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2 px-3 text-emerald-400 font-bold">Subida</td>
                <td className="py-2 px-3 font-bold text-white">Vx / Vy</td>
                <td className="py-2 px-3 font-bold text-slate-200">59 KIAS (Vx) / 73 KIAS (Vy)</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Mejor Ángulo (59 kts) / Mejor Régimen (73 kts) a nivel del mar</td>
              </tr>
              <tr className="bg-sky-950/30 hover:bg-sky-950/50 transition-colors">
                <td className="py-2 px-3 text-sky-400 font-bold">Aterrizaje</td>
                <td className="py-2 px-3 font-black text-white">Vref / Final</td>
                <td className="py-2 px-3 font-black text-sky-300 text-xs">60 – 70 KIAS (Flaps 40°)</td>
                <td className="py-2 px-3 text-slate-200 font-sans">Aproximación Final Normal (Short Field a 61 KIAS)</td>
              </tr>
              <tr className="bg-amber-950/30 border-l-4 border-amber-500 hover:bg-amber-950/50 transition-colors">
                <td className="py-2.5 px-3 text-amber-400 font-black">Emergencia</td>
                <td className="py-2.5 px-3 font-black text-amber-300 text-xs">Vglide</td>
                <td className="py-2.5 px-3 font-black text-amber-400 text-xs">65 KIAS (2300 lbs)</td>
                <td className="py-2.5 px-3 text-amber-200 font-sans font-semibold">Mejor Planeo Flaps UP (~1.5 NM / 1000 ft)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return null;
};
