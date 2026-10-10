import React from 'react';
import { Gauge } from 'lucide-react';

interface SpeedSummaryTableProps {
  aircraftType?: 'c172f' | 'da40d' | 'e195e2' | 'general' | null;
  highlightSpeed?: string;
}

export const SpeedSummaryTable: React.FC<SpeedSummaryTableProps> = ({
  aircraftType
}) => {
  if (!aircraftType) return null;

  if (aircraftType === 'da40d') {
    return (
      <div className="rounded-2xl bg-[#081224] border border-cyan-500/30 overflow-hidden shadow-xl mt-4 font-sans animate-fade-in">
        <div className="bg-gradient-to-r from-[#082236] to-[#0e3b5e] px-4 py-3 border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-xs sm:text-sm">
            <Gauge className="w-4 h-4 text-cyan-400" />
            <span>Cuadro Resumen de Velocidades — Diamond DA40 D (TAE 125 / EC-OKC)</span>
          </div>
          <span className="text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 px-2 py-0.5 rounded-full">
            DA40 D AFM Doc 6.01.05-E
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900/80 text-[11px] font-mono text-slate-400 uppercase border-b border-slate-800">
                <th className="py-2.5 px-3">Categoría</th>
                <th className="py-2.5 px-3">Símbolo</th>
                <th className="py-2.5 px-3 font-bold text-cyan-300">Valor Oficial (KIAS)</th>
                <th className="py-2.5 px-3">Significado / Configuración Operativa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
              <tr className="hover:bg-rose-950/20 transition-colors">
                <td className="py-2 px-3 text-rose-400 font-bold">Limitante</td>
                <td className="py-2 px-3 font-black text-rose-300">Vne</td>
                <td className="py-2 px-3 font-black text-rose-400 text-xs">178 KIAS</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Never Exceed Speed (Línea Roja Radial)</td>
              </tr>
              <tr className="hover:bg-amber-950/20 transition-colors">
                <td className="py-2 px-3 text-amber-400 font-bold">Limitante</td>
                <td className="py-2 px-3 font-black text-amber-300">Vno</td>
                <td className="py-2 px-3 font-black text-amber-400 text-xs">129 KIAS</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Velocidad Máxima Estructural de Crucero (Arco Amarillo: 129–178 KIAS)</td>
              </tr>
              <tr className="hover:bg-sky-950/20 transition-colors">
                <td className="py-2 px-3 text-sky-400 font-bold">Limitante</td>
                <td className="py-2 px-3 font-black text-sky-300">Va</td>
                <td className="py-2 px-3 font-black text-sky-400 text-xs">108 KIAS (&gt;980 kg) / 94 KIAS (≤980 kg)</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Velocidad de Maniobra (Maneuvering Speed)</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2 px-3 text-slate-400 font-bold">Flaps</td>
                <td className="py-2 px-3 font-bold text-white">Vfe (T/O)</td>
                <td className="py-2 px-3 font-bold text-emerald-400">108 KIAS</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Máxima permitida con Flaps en posición T/O</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2 px-3 text-slate-400 font-bold">Flaps</td>
                <td className="py-2 px-3 font-bold text-white">Vfe (LDG)</td>
                <td className="py-2 px-3 font-bold text-emerald-400">91 KIAS</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Máxima permitida con Flaps en posición LDG (Fin Arco Blanco)</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2 px-3 text-purple-400 font-bold">Pérdida</td>
                <td className="py-2 px-3 font-bold text-purple-300">Vso (LDG)</td>
                <td className="py-2 px-3 font-bold text-purple-400">49 KIAS (1150 kg) / 45 KIAS (1000 kg)</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Pérdida en configuración de aterrizaje (Inicio Arco Blanco)</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2 px-3 text-purple-400 font-bold">Pérdida</td>
                <td className="py-2 px-3 font-bold text-purple-300">Vs1 (UP)</td>
                <td className="py-2 px-3 font-bold text-purple-400">52 KIAS (1150 kg) / 49 KIAS (1000 kg)</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Pérdida en configuración limpia (Inicio Arco Verde)</td>
              </tr>
              <tr className="bg-sky-950/30 hover:bg-sky-950/50 transition-colors">
                <td className="py-2 px-3 text-emerald-400 font-bold">Despegue</td>
                <td className="py-2 px-3 font-black text-white">Vr</td>
                <td className="py-2 px-3 font-black text-emerald-400 text-xs">59 KIAS (1150 kg) / 55 KIAS (1000 kg)</td>
                <td className="py-2 px-3 text-slate-200 font-sans">Rotación con Flap T/O</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2 px-3 text-emerald-400 font-bold">Subida</td>
                <td className="py-2 px-3 font-bold text-white">Vx / Vy</td>
                <td className="py-2 px-3 font-bold text-slate-200">Vx: 66 KIAS (Flap T/O) · Vy: 66 KIAS (1150 kg) / 60 KIAS (1000 kg)</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Mejor Ángulo (66 kt) / Mejor Régimen · Crucero: 73 KIAS (1150 kg) / 68 KIAS (1000 kg)</td>
              </tr>
              <tr className="bg-sky-950/30 hover:bg-sky-950/50 transition-colors">
                <td className="py-2 px-3 text-sky-400 font-bold">Aterrizaje</td>
                <td className="py-2 px-3 font-black text-white">Vref</td>
                <td className="py-2 px-3 font-black text-sky-300 text-xs">71 KIAS (Flap LDG / 1150 kg) · 63 KIAS (1000 kg)</td>
                <td className="py-2 px-3 text-slate-200 font-sans">Aproximación final normal (Flap T/O: 73 KIAS; Go-around: 66 KIAS)</td>
              </tr>
              <tr className="bg-amber-950/30 border-l-4 border-amber-500 hover:bg-amber-950/50 transition-colors">
                <td className="py-2.5 px-3 text-amber-400 font-black">Emergencia</td>
                <td className="py-2.5 px-3 font-black text-amber-300 text-xs">Vglide</td>
                <td className="py-2.5 px-3 font-black text-amber-400 text-xs">73 KIAS (1150 kg) / 68 KIAS (1000 kg)</td>
                <td className="py-2.5 px-3 text-amber-200 font-sans font-semibold">Mejor Planeo (Flaps UP) · Ratio: 8.8 (hélice girando) / 10.3 (hélice parada)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (aircraftType === 'c172f') {
    return (
      <div className="rounded-2xl bg-[#081224] border border-amber-500/30 overflow-hidden shadow-xl mt-4 font-sans animate-fade-in">
        <div className="bg-gradient-to-r from-[#0f244a] to-[#16366b] px-4 py-3 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-xs sm:text-sm">
            <Gauge className="w-4 h-4 text-amber-400" />
            <span>Cuadro Resumen de Velocidades — Reims/Cessna F172F (TAE 125 / EC-NNX)</span>
          </div>
          <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full">
            C172F OM & Supl. TAE 125
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900/80 text-[11px] font-mono text-slate-400 uppercase border-b border-slate-800">
                <th className="py-2.5 px-3">Categoría</th>
                <th className="py-2.5 px-3">Símbolo</th>
                <th className="py-2.5 px-3 font-bold text-amber-300">Valor Oficial (MTOW 1043 kg / 2300 lb)</th>
                <th className="py-2.5 px-3">Significado / Configuración Operativa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
              <tr className="hover:bg-rose-950/20 transition-colors">
                <td className="py-2 px-3 text-rose-400 font-bold">Limitante</td>
                <td className="py-2 px-3 font-black text-rose-300">Vne</td>
                <td className="py-2 px-3 font-black text-rose-400 text-xs">174 MPH (151 KCAS)</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Never Exceed Speed (Línea Roja del Anemómetro)</td>
              </tr>
              <tr className="hover:bg-amber-950/20 transition-colors">
                <td className="py-2 px-3 text-amber-400 font-bold">Limitante</td>
                <td className="py-2 px-3 font-black text-amber-300">Vno</td>
                <td className="py-2 px-3 font-black text-amber-400 text-xs">140 MPH (122 KCAS)</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Máximo Crucero Estructural (Arco Amarillo: 140–174 MPH)</td>
              </tr>
              <tr className="hover:bg-sky-950/20 transition-colors">
                <td className="py-2 px-3 text-sky-400 font-bold">Limitante</td>
                <td className="py-2 px-3 font-black text-sky-300">Va</td>
                <td className="py-2 px-3 font-black text-sky-400 text-xs">106 KTS (122 MPH)</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Velocidad de Maniobra (Deflexión total de mandos)</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2 px-3 text-slate-400 font-bold">Flaps</td>
                <td className="py-2 px-3 font-bold text-white">Vfe (10°)</td>
                <td className="py-2 px-3 font-bold text-emerald-400">110 KIAS</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Máxima para extensión de Flaps 0° – 10°</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2 px-3 text-slate-400 font-bold">Flaps</td>
                <td className="py-2 px-3 font-bold text-white">Vfe (10°–40°)</td>
                <td className="py-2 px-3 font-bold text-emerald-400">85 KIAS (100 MPH)</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Máxima con Flaps 20° – 40° (Fin Arco Blanco)</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2 px-3 text-purple-400 font-bold">Pérdida</td>
                <td className="py-2 px-3 font-bold text-purple-300">Vso (Flap 40°)</td>
                <td className="py-2 px-3 font-bold text-purple-400">43 KIAS (0° bank) / 60 KIAS (60° bank)</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Pérdida en configuración de aterrizaje (Flap 10°: 45 KIAS)</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2 px-3 text-purple-400 font-bold">Pérdida</td>
                <td className="py-2 px-3 font-bold text-purple-300">Vs1 (Flap UP)</td>
                <td className="py-2 px-3 font-bold text-purple-400">49 KIAS (0° bank) / 70 KIAS (60° bank)</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Pérdida en configuración limpia (Inicio Arco Verde: 59 MPH)</td>
              </tr>
              <tr className="bg-sky-950/30 hover:bg-sky-950/50 transition-colors">
                <td className="py-2 px-3 text-emerald-400 font-bold">Despegue</td>
                <td className="py-2 px-3 font-black text-white">Vr</td>
                <td className="py-2 px-3 font-black text-emerald-400 text-xs">60 KIAS (Flap 10°) / 65 KIAS (Flap 0°)</td>
                <td className="py-2 px-3 text-slate-200 font-sans">Rotación Normal (Short Field lift-off: 44 KIAS, ascenso 50/58 KIAS)</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2 px-3 text-emerald-400 font-bold">Subida</td>
                <td className="py-2 px-3 font-bold text-white">Vx / Vy</td>
                <td className="py-2 px-3 font-bold text-slate-200">60–65 KIAS (Vx) / 75 KIAS (Vy)</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Mejor Ángulo (60 kt Flap 10° / 65 kt Flap 0°) · Mejor Régimen (75 kt)</td>
              </tr>
              <tr className="bg-sky-950/30 hover:bg-sky-950/50 transition-colors">
                <td className="py-2 px-3 text-sky-400 font-bold">Aterrizaje</td>
                <td className="py-2 px-3 font-black text-white">Vref</td>
                <td className="py-2 px-3 font-black text-sky-300 text-xs">70 KT (0°–10°) · 65 KT (20°–30°) · 60 KT (40°)</td>
                <td className="py-2 px-3 text-slate-200 font-sans">Velocidades de aproximación final estabilizada a 300 ft AGL</td>
              </tr>
              <tr className="bg-amber-950/30 border-l-4 border-amber-500 hover:bg-amber-950/50 transition-colors">
                <td className="py-2.5 px-3 text-amber-400 font-black">Emergencia</td>
                <td className="py-2.5 px-3 font-black text-amber-300 text-xs">Vglide</td>
                <td className="py-2.5 px-3 font-black text-amber-400 text-xs">65 KIAS (Flap UP) / 60 KIAS (Flap DOWN)</td>
                <td className="py-2.5 px-3 text-amber-200 font-sans font-semibold">Mejor Planeo · Rearranque: 65–85 KIAS (máx 100 KT, ≤13.000 ft) · Parar hélice: &lt;55 KT</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return null;
};
