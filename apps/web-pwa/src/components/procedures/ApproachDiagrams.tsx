import React from 'react';

export type ApproachDiagramType =
  | 'visual'
  | 'circling'
  | 'npa'
  | 'ils'
  | 'oei-visual'
  | 'oei-circling'
  | 'oei-npa'
  | 'oei-ils'
  | 'no-slat';

interface ApproachDiagramProps {
  type: ApproachDiagramType;
}

interface Milestone {
  x: number;
  y: number;
  title: string;
  lines: string[];
  tone?: 'sky' | 'amber' | 'rose' | 'emerald' | 'indigo';
}

const TONE: Record<NonNullable<Milestone['tone']>, string> = {
  sky: '#0ea5e9',
  amber: '#f59e0b',
  rose: '#f43f5e',
  emerald: '#10b981',
  indigo: '#818cf8'
};

function Aircraft({ x, y, rot = 0, fill = '#0f172a' }: { x: number; y: number; rot?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <ellipse cx="0" cy="0" rx="14" ry="4.5" fill={fill} />
      <path d="M -2 -1 L 10 -10 L 12 -8 L 4 1 Z" fill={fill} />
      <path d="M -2 1 L 10 10 L 12 8 L 4 -1 Z" fill={fill} />
      <path d="M -12 -1 L -16 -6 L -14 -6 L -10 0 Z" fill={fill} />
      <path d="M -12 1 L -16 6 L -14 6 L -10 0 Z" fill={fill} />
    </g>
  );
}

function Runway({ x, y, w = 120, h = 18 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="2" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
      <line x1={x + 10} y1={y + h / 2} x2={x + w - 10} y2={y + h / 2} stroke="#f8fafc" strokeWidth="1.5" strokeDasharray="8 6" />
    </g>
  );
}

function Callout({
  x,
  y,
  title,
  lines,
  tone = 'sky',
  align = 'left'
}: Milestone & { align?: 'left' | 'right' }) {
  const width = 148;
  const height = 18 + lines.length * 12;
  const bx = align === 'right' ? x - width : x;
  const color = TONE[tone];
  return (
    <g>
      <rect x={bx} y={y} width={width} height={height} rx="6" fill="#ffffff" stroke={color} strokeWidth="1.5" opacity="0.97" />
      <rect x={bx} y={y} width="4" height={height} rx="2" fill={color} />
      <text x={bx + 10} y={y + 13} fill="#0f172a" fontSize="9" fontWeight="800" fontFamily="system-ui,sans-serif">
        {title}
      </text>
      {lines.map((line, i) => (
        <text
          key={line}
          x={bx + 10}
          y={y + 26 + i * 12}
          fill="#334155"
          fontSize="8"
          fontFamily="ui-monospace,monospace"
        >
          · {line}
        </text>
      ))}
    </g>
  );
}

function DiagramShell({
  title,
  refLabel,
  children,
  chips
}: {
  title: string;
  refLabel: string;
  children: React.ReactNode;
  chips: [string, string][];
}) {
  return (
    <div className="procedure-diagram procedure-diagram-emb">
      <div className="procedure-diagram-head">
        <div>
          <p className="procedure-diagram-kicker">SOPM E-Jets E2 · Esquema de estudio</p>
          <p className="procedure-diagram-title">{title}</p>
        </div>
        <span className="procedure-diagram-ref">{refLabel}</span>
      </div>
      <div className="procedure-diagram-canvas">
        <svg viewBox="0 0 720 320" className="procedure-diagram-svg" role="img" aria-label={title}>
          <defs>
            <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.55" />
            </linearGradient>
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#0f172a" floodOpacity="0.18" />
            </filter>
          </defs>
          <rect x="0" y="0" width="720" height="320" fill="#f8fafc" rx="12" />
          <ellipse cx="360" cy="270" rx="300" ry="28" fill="url(#ground)" />
          {children}
        </svg>
      </div>
      <div className="procedure-diagram-chips">
        {chips.map(([k, v]) => (
          <div key={k} className="procedure-diagram-chip">
            <span>{k}</span>
            <strong>{v}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Ribbon path with ground shadow — Embraer-like isometric feel */
function Ribbon({
  d,
  shadowD,
  stroke = '#0f172a'
}: {
  d: string;
  shadowD: string;
  stroke?: string;
}) {
  return (
    <g>
      <path d={shadowD} fill="none" stroke="#94a3b8" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" />
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#softShadow)"
      />
    </g>
  );
}

function FixCone({ x, y, h = 70, label = 'FIX' }: { x: number; y: number; h?: number; label?: string }) {
  return (
    <g opacity="0.55">
      <path d={`M ${x} ${y - h} L ${x - 16} ${y} L ${x + 16} ${y} Z`} fill="#94a3b8" />
      <text x={x} y={y + 12} textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="700">
        {label}
      </text>
    </g>
  );
}

const VisualLike: React.FC<{
  title: string;
  chips: [string, string][];
  flaps: [string, string, string, string];
  oei?: boolean;
}> = ({ title, chips, flaps, oei }) => (
  <DiagramShell title={title} refLabel="3-35-10" chips={chips}>
    <Ribbon
      shadowD="M 560 250 L 560 160 L 160 160 L 160 210 L 420 250"
      d="M 560 220 L 560 110 L 160 110 L 160 170 L 420 230"
      stroke={oei ? '#b45309' : '#0f172a'}
    />
    <path d="M 470 230 Q 520 200 560 150" fill="none" stroke="#94a3b8" strokeWidth="5" strokeDasharray="6 5" />
    <Runway x={400} y={248} w={130} />
    <Aircraft x={540} y={110} rot={180} />
    <Aircraft x={360} y={110} rot={180} />
    <Aircraft x={160} y={140} rot={-90} />
    <Aircraft x={280} y={200} rot={20} />
    <line x1="360" y1="110" x2="360" y2="248" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
    <text x="368" y="190" fill="#b45309" fontSize="9" fontWeight="700">
      1500 FT
    </text>
    <Callout x={470} y={28} title="ENTERING DOWNWIND" lines={[flaps[0]]} tone={oei ? 'amber' : 'sky'} />
    <Callout x={250} y={28} title="ABEAM THRESHOLD" lines={[flaps[1], '⏱ 30 SEC']} tone="amber" />
    <Callout x={20} y={90} title="TURNING BASE" lines={[flaps[2]]} tone="indigo" />
    <Callout x={20} y={200} title="FINAL" lines={[flaps[3], 'BEFORE LANDING CKL']} tone="emerald" />
    <Callout
      x={560}
      y={150}
      align="right"
      title="MISSED APPROACH"
      lines={['TO/GA', 'GA THRUST / ATT', 'GA FLAPS', 'POS RATE · GEAR UP']}
      tone="rose"
    />
  </DiagramShell>
);

const CirclingLike: React.FC<{ title: string; chips: [string, string][]; oei?: boolean }> = ({
  title,
  chips,
  oei
}) => (
  <DiagramShell title={title} refLabel="3-35-10" chips={chips}>
    <Ribbon
      shadowD="M 80 200 L 220 150 L 420 150 L 520 210 L 460 250"
      d="M 80 170 L 220 110 L 420 110 L 540 180 L 470 230"
      stroke={oei ? '#b45309' : '#312e81'}
    />
    <path d="M 470 230 Q 520 200 560 140" fill="none" stroke="#94a3b8" strokeWidth="5" strokeDasharray="6 5" />
    <Runway x={300} y={248} w={140} />
    <Aircraft x={120} y={145} rot={-25} />
    <Aircraft x={320} y={110} rot={0} />
    <Aircraft x={500} y={165} rot={40} />
    <Aircraft x={470} y={230} rot={10} />
    <line x1="360" y1="110" x2="360" y2="248" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
    <text x="368" y="180" fill="#b45309" fontSize="9" fontWeight="700">
      CIRCLING ALT
    </text>
    <text x="430" y={268} fill="#64748b" fontSize="9" fontWeight="700">
      1.5 NM · ⏱ 20 SEC
    </text>
    <Callout
      x={20}
      y={40}
      title="INITIAL"
      lines={oei ? ['GEAR UP', 'FLAPS 2', 'SET MDA'] : ['GEAR DOWN', 'FLAPS 3', 'SET MDA']}
      tone={oei ? 'amber' : 'indigo'}
    />
    <Callout x={230} y={28} title="RUNWAY IN SIGHT" lines={['LEVEL OFF', 'DOWNWIND', 'SET GA ALT']} tone="sky" />
    <Callout x={20} y={210} title="ABEAM" lines={['START CHRONO', 'VISUAL REFS']} tone="amber" />
    <Callout
      x={560}
      y={40}
      align="right"
      title="TURNING BASE / FINAL"
      lines={oei ? ['GEAR DOWN · FLAP 3', 'FLAPS 5 · AP OFF', 'RUDDER TRIM NTRL'] : ['LANDING FLAPS', 'BLC', 'AP DISCONNECTED']}
      tone="emerald"
    />
    <Callout
      x={560}
      y={150}
      align="right"
      title="MISSED APPROACH"
      lines={['TO/GA', 'GA THRUST / ATT', 'POS RATE · GEAR UP']}
      tone="rose"
    />
  </DiagramShell>
);

const ProfileLike: React.FC<{
  title: string;
  chips: [string, string][];
  oei?: boolean;
  ils?: boolean;
}> = ({ title, chips, oei, ils }) => (
  <DiagramShell title={title} refLabel={ils ? '3-35-05' : '3-35-10'} chips={chips}>
    <Ribbon
      shadowD="M 80 220 L 160 220 L 280 210 L 520 250"
      d="M 70 120 Q 140 90 200 130 L 280 150 L 360 175 L 520 230"
      stroke={oei ? '#b45309' : '#0f172a'}
    />
    <path d="M 500 225 Q 560 180 600 120" fill="none" stroke="#94a3b8" strokeWidth="5" strokeDasharray="6 5" />
    <Runway x={480} y={248} w={130} />
    <FixCone x={280} y={248} h={90} label={ils ? 'GS / FIX' : 'FAF'} />
    <FixCone x={400} y={248} h={55} label={ils ? 'ONE DOT' : 'MDA'} />
    <Aircraft x={120} y={105} rot={-10} />
    <Aircraft x={250} y={145} rot={15} />
    <Aircraft x={360} y={175} rot={18} />
    <Aircraft x={500} y={225} rot={12} />
    <Callout
      x={20}
      y={28}
      title="INTERCEPT"
      lines={ils ? ['ARM APP MODE', 'FLAPS 2'] : ['FLAPS 2', 'LAT/VERT MODES']}
      tone="sky"
    />
    <Callout
      x={200}
      y={28}
      title={ils ? 'GS INTERCEPT' : 'APPROACHING FAF'}
      lines={
        oei
          ? ils
            ? ['FLAPS 5', 'GA HDG/ALT', 'BLC']
            : ['FLAPS 5', 'SET MDA/GA', 'BLC · APPR']
          : ils
            ? ['LANDING FLAPS', 'GA HDG/ALT', 'BLC']
            : ['LANDING FLAPS', 'SET MDA/GA', 'BLC']
      }
      tone="amber"
    />
    <Callout
      x={20}
      y={200}
      title={ils ? 'ONE DOT' : 'INBOUND'}
      lines={['GEAR DOWN', 'FLAPS 3']}
      tone="indigo"
    />
    <Callout
      x={560}
      y={40}
      align="right"
      title="MISSED APPROACH"
      lines={['TO/GA', 'GA THRUST / ATT', 'GA FLAPS', 'POS RATE · GEAR UP']}
      tone="rose"
    />
    {oei && (
      <text x={360} y={300} textAnchor="middle" fill="#b45309" fontSize="9" fontWeight="800">
        COMPLETE OEI APPROACH & LANDING CHECKLIST
      </text>
    )}
  </DiagramShell>
);

const NoSlatDiagram: React.FC = () => (
  <DiagramShell
    title="No Slat / Flap Landing"
    refLabel="3-35-10"
    chips={[
      ['Abeam', '1500 FT'],
      ['Downwind', '≈ 4 NM'],
      ['Final', '6.5 NM / 1500 FT'],
      ['Threshold', 'THRUST IDLE']
    ]}
  >
    <Ribbon
      shadowD="M 560 250 L 560 160 L 140 160 L 140 210 L 430 250"
      d="M 560 220 L 560 100 L 140 100 L 140 165 L 430 230"
      stroke="#881337"
    />
    <path d="M 470 230 Q 530 190 580 140" fill="none" stroke="#94a3b8" strokeWidth="5" strokeDasharray="6 5" />
    <Runway x={400} y={248} w={130} />
    <Aircraft x={540} y={100} rot={180} />
    <Aircraft x={340} y={100} rot={180} />
    <Aircraft x={140} y={130} rot={-90} />
    <Aircraft x={280} y={200} rot={25} />
    <line x1="360" y1="100" x2="360" y2="248" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
    <text x="368" y={180} fill="#b45309" fontSize="9" fontWeight="700">
      1500 FT
    </text>
    <text x={200} y={88} fill="#64748b" fontSize="9" fontWeight="700">
      ≈ 4 NM
    </text>
    <Callout x={470} y={28} title="ENTERING DOWNWIND" lines={['1500 FT']} tone="rose" />
    <Callout x={250} y={28} title="ABEAM" lines={['1500 FT']} tone="amber" />
    <Callout x={20} y={100} title="TURNING BASE" lines={['GEAR DOWN']} tone="indigo" />
    <Callout x={20} y={200} title="FINAL" lines={['BLC', '6.5 NM / 1500 FT']} tone="sky" />
    <Callout x={430} y={200} title="THRESHOLD" lines={['THRUST LEVERS IDLE']} tone="rose" />
    <Callout
      x={560}
      y={140}
      align="right"
      title="MISSED APPROACH"
      lines={['TO/GA', 'GA THRUST / ATT', 'POS RATE · GEAR UP']}
      tone="rose"
    />
  </DiagramShell>
);

export const ApproachDiagram: React.FC<ApproachDiagramProps> = ({ type }) => {
  switch (type) {
    case 'visual':
      return (
        <VisualLike
          title="Visual Approach"
          flaps={['FLAPS 1', 'FLAPS 2', 'GEAR DOWN · FLAPS 3', 'LANDING FLAPS']}
          chips={[
            ['Downwind', 'FLAP 1 · 1500 FT'],
            ['Abeam', 'FLAP 2 · 30 s'],
            ['Base', 'GEAR + FLAP 3'],
            ['Final', 'LDG FLAPS · BLC']
          ]}
        />
      );
    case 'oei-visual':
      return (
        <VisualLike
          title="One Engine Inoperative Approach"
          oei
          flaps={['FLAPS 1', 'FLAPS 2', 'GEAR DOWN · FLAPS 3', 'FLAPS 5']}
          chips={[
            ['Downwind', 'FLAP 1 · 1500 FT'],
            ['Abeam', 'FLAP 2 · 30 s'],
            ['Base', 'GEAR + FLAP 3'],
            ['Final', 'FLAPS 5 · BLC']
          ]}
        />
      );
    case 'circling':
      return (
        <CirclingLike
          title="Circling Approach"
          chips={[
            ['Initial', 'GEAR ↓ · FLAP 3'],
            ['Abeam', '⏱ 20 SEC'],
            ['Lateral', '1.5 NM'],
            ['Final', 'AP OFF']
          ]}
        />
      );
    case 'oei-circling':
      return (
        <CirclingLike
          title="OEI Circling Approach"
          oei
          chips={[
            ['Initial', 'GEAR UP · FLAP 2'],
            ['Abeam', '⏱ 20 SEC'],
            ['Base', 'GEAR ↓ · FLAP 3'],
            ['Final', 'FLAPS 5']
          ]}
        />
      );
    case 'npa':
      return (
        <ProfileLike
          title="Non-Precision / GPS / RNAV"
          chips={[
            ['Intercept', 'FLAPS 2'],
            ['Inbound', 'GEAR · FLAP 3'],
            ['FAF', 'LDG FLAPS'],
            ['MDA', 'Precision-like']
          ]}
        />
      );
    case 'oei-npa':
      return (
        <ProfileLike
          title="OEI Non-Precision Approach"
          oei
          chips={[
            ['Intercept', 'FLAPS 2'],
            ['FAF', 'FLAPS 5'],
            ['Inbound', 'GEAR · FLAP 3'],
            ['MDA', 'OEI BLC']
          ]}
        />
      );
    case 'ils':
      return (
        <ProfileLike
          title="Precision Approach (ILS)"
          ils
          chips={[
            ['Intercept', 'APP · FLAP 2'],
            ['One Dot', 'GEAR · FLAP 3'],
            ['GS', 'LDG FLAPS'],
            ['GA', 'TO/GA sequence']
          ]}
        />
      );
    case 'oei-ils':
      return (
        <ProfileLike
          title="OEI Precision Approach (ILS)"
          ils
          oei
          chips={[
            ['Intercept', 'APP · FLAP 2'],
            ['GS', 'FLAPS 5'],
            ['One Dot', 'GEAR · FLAP 3'],
            ['Checklist', 'OEI A&L']
          ]}
        />
      );
    case 'no-slat':
      return <NoSlatDiagram />;
    default:
      return null;
  }
};

export function diagramTypeForCard(cardId: string): ApproachDiagramType | null {
  const map: Record<string, ApproachDiagramType> = {
    'card-norm-visual-approach': 'visual',
    'card-norm-circling': 'circling',
    'card-norm-npa-autoland-callouts': 'npa',
    'card-norm-ils-precision': 'ils',
    'card-norm-oei-ils': 'oei-ils',
    'card-norm-oei-visual': 'oei-visual',
    'card-norm-oei-circling': 'oei-circling',
    'card-norm-oei-npa': 'oei-npa',
    'card-norm-no-slat-flap': 'no-slat'
  };
  return map[cardId] ?? null;
}
