import React from 'react';
import { Table, ShieldAlert, CheckCircle, Navigation, Fuel, AlertOctagon } from 'lucide-react';

interface PlanningMinimaTableProps {
  type?: 'variaciones' | 'estandar' | 'seleccion' | 'fuel_calls';
}

export const PlanningMinimaTable: React.FC<PlanningMinimaTableProps> = ({ type = 'variaciones' }) => {
  if (type === 'variaciones') {
    return (
      <div className="rounded-2xl bg-[#081224] border border-sky-500/30 overflow-hidden shadow-xl mt-4 font-sans animate-fade-in">
        {/* Table Header */}
        <div className="bg-gradient-to-r from-[#0f244a] to-[#16366b] px-4 py-3 border-b border-sky-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-xs sm:text-sm">
            <Navigation className="w-4 h-4 text-sky-400" />
            <span>Mínimos de Planificación — Plan Básico con Variaciones</span>
          </div>
          <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full">
            MOA 8.1.7.2.5
          </span>
        </div>

        {/* Requirements Banner */}
        <div className="bg-[#050b17] px-4 py-2 text-[11px] text-slate-300 border-b border-slate-800/80 flex flex-wrap gap-3 items-center">
          <span className="text-sky-400 font-bold">Requisitos Binter para aplicación:</span>
          <span className="bg-sky-950/60 px-2 py-0.5 rounded border border-sky-500/30 text-sky-200">1. Flight Monitoring</span>
          <span className="bg-sky-950/60 px-2 py-0.5 rounded border border-sky-500/30 text-sky-200">2. Aprobación LVO</span>
          <span className="bg-sky-950/60 px-2 py-0.5 rounded border border-sky-500/30 text-sky-200">3. Sistema Automático Planificación</span>
        </div>

        {/* Minima Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900/90 text-[11px] font-mono text-slate-400 uppercase border-b border-slate-800">
                <th className="py-2.5 px-3">Tipo de Aproximación en Uso</th>
                <th className="py-2.5 px-3 text-sky-300 font-bold">Mínimo de Techo (Base nubes / VV)</th>
                <th className="py-2.5 px-3 text-emerald-300 font-bold">Mínimo de Visibilidad / RVR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
              <tr className="hover:bg-sky-950/30 transition-colors">
                <td className="py-2 px-3 text-slate-200 font-sans font-semibold">
                  Dos o más aproximaciones Tipo B en uso a dos pistas separadas
                </td>
                <td className="py-2 px-3 text-sky-300 font-bold">DA/H + 100 ft</td>
                <td className="py-2 px-3 text-emerald-400 font-bold">RVR + 300 m</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2 px-3 text-slate-200 font-sans font-semibold">
                  Una operación de aproximación Tipo B en uso
                </td>
                <td className="py-2 px-3 text-sky-300 font-bold">DA/H + 150 ft</td>
                <td className="py-2 px-3 text-emerald-400 font-bold">RVR + 450 m</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2 px-3 text-slate-200 font-sans">
                  Aproximación 3D Tipo A asociada a ayuda con mínimos ≤ 200 ft
                </td>
                <td className="py-2 px-3 text-sky-300 font-bold">DA/H + 200 ft</td>
                <td className="py-2 px-3 text-emerald-400 font-bold">RVR/VIS + 800 m</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2 px-3 text-slate-200 font-sans">
                  Dos o más aproximaciones Tipo A basadas en ayudas distintas
                </td>
                <td className="py-2 px-3 text-sky-300 font-bold">DA/H o MDA/H + 200 ft</td>
                <td className="py-2 px-3 text-emerald-400 font-bold">RVR/VIS + 1000 m</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2 px-3 text-slate-200 font-sans">
                  Una operación de aproximación Tipo A en uso
                </td>
                <td className="py-2 px-3 text-sky-300 font-bold">DA/H o MDA/H + 400 ft</td>
                <td className="py-2 px-3 text-emerald-400 font-bold">RVR/VIS + 1500 m</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2 px-3 text-slate-200 font-sans">
                  Aproximación en circuito (Circling)
                </td>
                <td className="py-2 px-3 text-sky-300 font-bold">MDA/H + 400 ft</td>
                <td className="py-2 px-3 text-emerald-400 font-bold">VIS + 1500 m</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (type === 'fuel_calls') {
    return (
      <div className="rounded-2xl bg-[#081224] border border-sky-500/30 overflow-hidden shadow-xl mt-4 font-sans animate-fade-in">
        <div className="bg-gradient-to-r from-[#0f244a] to-[#16366b] px-4 py-3 border-b border-sky-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-xs sm:text-sm">
            <Fuel className="w-4 h-4 text-amber-400" />
            <span>Gestión de Combustible en Vuelo — Llamadas Radiotelefónicas</span>
          </div>
          <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full">
            MOA 8.1.7.3
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900/90 text-[11px] font-mono text-slate-400 uppercase border-b border-slate-800">
                <th className="py-2.5 px-3">Llamada Radiotelefónica</th>
                <th className="py-2.5 px-3">Condición de Activación</th>
                <th className="py-2.5 px-3">Prioridad ATC / Estatus</th>
                <th className="py-2.5 px-3">Acción Posterior</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
              <tr className="bg-amber-950/20 hover:bg-amber-950/30 transition-colors">
                <td className="py-2.5 px-3 font-black text-amber-300 text-xs">
                  "MINIMUM FUEL"
                </td>
                <td className="py-2.5 px-3 text-slate-200 font-sans">
                  Combustible previsto al aterrizar se aproxima a la <strong className="text-amber-400">Reserva Final (30 min)</strong> ante demoras no previstas adicionales.
                </td>
                <td className="py-2.5 px-3 text-amber-300 font-sans font-bold">
                  Informa estado a ATC.<br /><strong>NO confiere prioridad</strong>.
                </td>
                <td className="py-2.5 px-3 text-slate-400 font-sans">
                  Monitoreo continuo de demoras y vectores.
                </td>
              </tr>
              <tr className="bg-rose-950/30 border-l-4 border-rose-500 hover:bg-rose-950/40 transition-colors">
                <td className="py-2.5 px-3 font-black text-rose-400 text-xs">
                  "MAYDAY MAYDAY MAYDAY FUEL"
                </td>
                <td className="py-2.5 px-3 text-slate-100 font-sans">
                  Combustible utilizable previsto al aterrizar en el aeródromo más cercano es <strong className="text-rose-400">INFERIOR a la Reserva Final (30 min)</strong>.
                </td>
                <td className="py-2.5 px-3 text-rose-300 font-sans font-black">
                  DECLARACIÓN DE EMERGENCIA.<br /><strong>PRIORIDAD ABSOLUTA</strong>.
                </td>
                <td className="py-2.5 px-3 text-slate-300 font-sans">
                  Reporte ASR/PNS obligatorio &lt;72h a AESA.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return null;
};
