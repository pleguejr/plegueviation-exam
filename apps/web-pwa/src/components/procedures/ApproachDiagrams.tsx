import React from 'react';

interface ApproachDiagramProps {
  type: 'visual' | 'circling' | 'npa';
}

/**
 * Diagramas SVG de aproximaciones E195-E2 (perfiles SOPM Sec 2 / MOB 2.0.11).
 * El PDF SOPM no está en el repo (manuales/ gitignored); estos esquemas reproducen
 * los hitos oficiales de las tarjetas SOP: alturas, flaps, cronómetros y callouts.
 */
export const ApproachDiagram: React.FC<ApproachDiagramProps> = ({ type }) => {
  if (type === 'visual') {
    return (
      <div className="procedure-diagram rounded-2xl border border-sky-500/30 bg-sky-950/20 p-3 sm:p-4 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] font-black uppercase tracking-wide text-sky-300">
            Circuito Visual E195-E2 · 1.500 ft AFE
          </p>
          <span className="text-[10px] font-mono text-slate-400">SOPM Sec 2 / MOB 2.0.11</span>
        </div>
        <svg viewBox="0 0 640 280" className="w-full h-auto" role="img" aria-label="Circuito de aproximación visual">
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#38bdf8" />
            </marker>
          </defs>
          {/* Runway */}
          <rect x="250" y="210" width="160" height="28" rx="3" fill="#334155" stroke="#94a3b8" />
          <text x="330" y="228" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="700">RWY</text>
          {/* Circuit path */}
          <path
            d="M 120 180 L 120 70 L 520 70 L 520 150 L 410 210"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
            strokeDasharray="6 4"
            markerEnd="url(#arrow)"
          />
          {/* Labels */}
          <g fontSize="10" fill="#7dd3fc" fontFamily="ui-monospace, monospace">
            <text x="40" y="100">DOWNWIND</text>
            <text x="40" y="114">1.500 ft AFE</text>
            <text x="40" y="128">FLAP 1 · 180 kt</text>
            <text x="40" y="142">2 NM</text>

            <text x="200" y="50">ABEAM</text>
            <text x="200" y="64">FLAP 2 · 160 kt · ⏱ 30 s</text>

            <text x="470" y="100">BASE</text>
            <text x="470" y="114">GEAR ↓ + FLAP 3</text>
            <text x="470" y="128">150 kt · 3°</text>

            <text x="430" y="180">FINAL</text>
            <text x="430" y="194">FLAPS LDG · VAP</text>
            <text x="430" y="250" fill="#34d399">Estable ≥ 500 ft AFE</text>
          </g>
          {/* Abeam marker */}
          <line x1="330" y1="70" x2="330" y2="210" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
          {[
            ['Downwind', 'FLAP 1 · 180 kt'],
            ['Abeam', 'FLAP 2 · ⏱ 30 s'],
            ['Base', 'GEAR + FLAP 3'],
            ['Final', 'LDG FLAPS · VAP']
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl bg-black/30 border border-white/10 px-2 py-1.5">
              <div className="font-black text-sky-300">{k}</div>
              <div className="font-mono text-slate-300">{v}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'circling') {
    return (
      <div className="procedure-diagram rounded-2xl border border-indigo-500/30 bg-indigo-950/20 p-3 sm:p-4 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] font-black uppercase tracking-wide text-indigo-300">
            Circling Approach · AEO Gear↓ Flap 3
          </p>
          <span className="text-[10px] font-mono text-slate-400">SOPM Sec 2 / MOB 2.0.11</span>
        </div>
        <svg viewBox="0 0 640 280" className="w-full h-auto" role="img" aria-label="Maniobra de circling">
          <rect x="280" y="200" width="140" height="26" rx="3" fill="#334155" stroke="#94a3b8" />
          <text x="350" y="217" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="700">RWY</text>
          {/* Approach track then circle */}
          <path d="M 80 120 L 280 120" stroke="#a78bfa" strokeWidth="3" fill="none" />
          <path
            d="M 280 120 Q 360 60 440 100 Q 500 140 470 180 Q 430 220 350 200"
            fill="none"
            stroke="#818cf8"
            strokeWidth="3"
            strokeDasharray="5 4"
          />
          <circle cx="350" cy="160" r="70" fill="none" stroke="#fbbf24" strokeWidth="1" strokeDasharray="4 4" opacity="0.7" />
          <text x="430" y="145" fill="#fbbf24" fontSize="10" fontFamily="monospace">3 NM ARC</text>
          <g fontSize="10" fill="#c4b5fd" fontFamily="ui-monospace, monospace">
            <text x="90" y="100">MDA / Circling Min</text>
            <text x="90" y="140">45° · ⏱ 30 s → 1,5 NM</text>
            <text x="460" y="90">DOWNWIND</text>
            <text x="460" y="104">Abeam: 20 s + 30 s/1000 ft</text>
            <text x="300" y="255" fill="#34d399">FINAL · AP OFF &lt; 500 ft AFE</text>
          </g>
        </svg>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px]">
          {[
            ['AEO', 'GEAR ↓ + FLAP 3'],
            ['OEI', 'FLAP 2 (GEAR en base)'],
            ['Abeam', '20 s + 30 s / 1000 ft']
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl bg-black/30 border border-white/10 px-2 py-1.5">
              <div className="font-black text-indigo-300">{k}</div>
              <div className="font-mono text-slate-300">{v}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // NPA
  return (
    <div className="procedure-diagram rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-3 sm:p-4 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-black uppercase tracking-wide text-emerald-300">
          NPA 2D · VGP / FPA Profile
        </p>
        <span className="text-[10px] font-mono text-slate-400">SOPM Sec 2 / MOB 2.0.11</span>
      </div>
      <svg viewBox="0 0 640 260" className="w-full h-auto" role="img" aria-label="Perfil NPA">
        <line x1="40" y1="200" x2="600" y2="200" stroke="#64748b" strokeWidth="2" />
        <rect x="520" y="190" width="70" height="20" rx="2" fill="#334155" />
        <text x="555" y="204" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="700">TDZ</text>
        {/* Descent path */}
        <path d="M 60 80 L 220 80 L 520 190" fill="none" stroke="#34d399" strokeWidth="3" />
        <g fontSize="10" fill="#6ee7b7" fontFamily="ui-monospace, monospace">
          <text x="70" y="70">FLAP 2</text>
          <text x="160" y="70">2 NM FAF</text>
          <text x="160" y="98">GEAR ↓ + FLAP 3</text>
          <text x="300" y="120">FAF · FLAP LDG · VAP</text>
          <text x="300" y="134">VGP / FPA −3.0°</text>
          <text x="420" y="170">MDA / DA</text>
        </g>
        {/* Vertical markers */}
        <line x1="220" y1="60" x2="220" y2="200" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 3" />
        <text x="225" y="55" fill="#fbbf24" fontSize="10">FAF−2NM</text>
      </svg>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
        {[
          ['8 NM', 'FLAP 2'],
          ['FAF−2 NM', 'GEAR + FLAP 3'],
          ['FAF', 'LDG FLAPS · VAP'],
          ['Autoland', '800·150·50·30 ft']
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl bg-black/30 border border-white/10 px-2 py-1.5">
            <div className="font-black text-emerald-300">{k}</div>
            <div className="font-mono text-slate-300">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export function diagramTypeForCard(cardId: string): ApproachDiagramProps['type'] | null {
  if (cardId === 'card-norm-visual-approach') return 'visual';
  if (cardId === 'card-norm-circling') return 'circling';
  if (cardId === 'card-norm-npa-autoland-callouts') return 'npa';
  return null;
}
