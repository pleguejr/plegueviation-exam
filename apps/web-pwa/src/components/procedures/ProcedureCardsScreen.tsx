import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  BookOpen,
  Flame,
  Layers,
  Compass,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { PROCEDURE_CARDS, ProcedureCard, ProcedureSection, ProcedureItem } from '../../data/procedureCardsData';
import { ApproachDiagram, diagramTypeForCard } from './ApproachDiagrams';

interface ProcedureCardsScreenProps {
  onBackToDashboard: () => void;
}

export const ProcedureCardsScreen: React.FC<ProcedureCardsScreenProps> = ({ onBackToDashboard }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'briefings' | 'normal' | 'emergency'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCardIds, setExpandedCardIds] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    PROCEDURE_CARDS.slice(0, 3).forEach((c) => {
      initial[c.id] = true;
    });
    return initial;
  });

  const toggleExpand = (id: string) => {
    setExpandedCardIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    PROCEDURE_CARDS.forEach((c) => {
      all[c.id] = true;
    });
    setExpandedCardIds(all);
  };

  const collapseAll = () => setExpandedCardIds({});

  const filteredCards = useMemo(() => {
    return PROCEDURE_CARDS.filter((card) => {
      if (selectedCategory !== 'all' && card.category !== selectedCategory) return false;
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        card.title.toLowerCase().includes(query) ||
        card.subtitle.toLowerCase().includes(query) ||
        card.summary.toLowerCase().includes(query) ||
        card.manualRef.toLowerCase().includes(query) ||
        card.badges.some((b) => b.toLowerCase().includes(query)) ||
        card.goldenRules?.some((r) => r.toLowerCase().includes(query)) ||
        card.memoryItems?.some((m) => m.toLowerCase().includes(query)) ||
        card.sections.some(
          (s) =>
            s.title.toLowerCase().includes(query) ||
            s.items.some(
              (it) =>
                it.action.toLowerCase().includes(query) ||
                it.callout?.toLowerCase().includes(query) ||
                it.details?.toLowerCase().includes(query)
            )
        )
      );
    });
  }, [selectedCategory, searchQuery]);

  const counts = useMemo(
    () => ({
      all: PROCEDURE_CARDS.length,
      briefings: PROCEDURE_CARDS.filter((c) => c.category === 'briefings').length,
      normal: PROCEDURE_CARDS.filter((c) => c.category === 'normal').length,
      emergency: PROCEDURE_CARDS.filter((c) => c.category === 'emergency').length
    }),
    []
  );

  const getCategoryBadge = (cat: ProcedureCard['category']) => {
    switch (cat) {
      case 'briefings':
        return { label: 'Briefing', className: 'procedure-badge-briefing', icon: <BookOpen className="w-3.5 h-3.5" /> };
      case 'normal':
        return { label: 'Ops Normal', className: 'procedure-badge-normal', icon: <Compass className="w-3.5 h-3.5" /> };
      case 'emergency':
        return { label: 'Emergencia', className: 'procedure-badge-emergency', icon: <Flame className="w-3.5 h-3.5" /> };
    }
  };

  const getRoleBadge = (role?: ProcedureItem['role']) => {
    const map: Record<string, string> = {
      PF: 'procedure-role-pf',
      PM: 'procedure-role-pm',
      PA: 'procedure-role-pa',
      ATC: 'procedure-role-atc',
      ALERT: 'procedure-role-alert',
      NOTE: 'procedure-role-note',
      STEP: 'procedure-role-step',
      CREW: 'procedure-role-note'
    };
    const labels: Record<string, string> = {
      PF: 'PF',
      PM: 'PM',
      PA: 'PA',
      ATC: 'ATC',
      ALERT: 'ALERTA',
      NOTE: 'NOTA',
      STEP: 'PASO',
      CREW: 'CREW'
    };
    const key = role || 'STEP';
    return <span className={`procedure-role ${map[key]}`}>{labels[key]}</span>;
  };

  const sectionTone = (color?: ProcedureSection['color']) =>
    `procedure-section procedure-section-${color || 'sky'}`;

  const tabClass = (active: boolean, tone: string) =>
    `procedure-tab ${active ? `procedure-tab-active procedure-tab-${tone}` : ''}`;

  return (
    <div className="procedure-screen max-w-5xl mx-auto space-y-6 pb-24 font-sans animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sky-500/20">
        <button
          onClick={onBackToDashboard}
          className="flex items-center gap-2 text-sky-400 hover:text-sky-300 font-bold text-sm transition-colors group self-start"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Volver al Centro de Control</span>
        </button>
        <div className="flex items-center gap-2">
          <button onClick={expandAll} className="procedure-ghost-btn">
            Expandir
          </button>
          <button onClick={collapseAll} className="procedure-ghost-btn">
            Contraer
          </button>
        </div>
      </div>

      <div className="procedure-hero rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-3 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,#34d399,transparent_45%),radial-gradient(circle_at_80%_0%,#38bdf8,transparent_40%)]" />
        <div className="relative flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-emerald-200">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-emerald-200 block">
              SOPM · MOB · AOM · QRH
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Tarjetas SOP · Infografía Operacional</h1>
          </div>
        </div>
        <p className="relative text-xs sm:text-sm text-sky-50 max-w-3xl leading-relaxed">
          Flujos visuales para memorizar briefings, aproximaciones E195-E2 y emergencias. Diagramas de circuito/perfil
          basados en MOB 2.0.11 y SOPM Sec 2 (esquemas de estudio; consulta el PDF oficial a bordo).
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
          {(
            [
              ['all', 'Todos', counts.all, 'sky'],
              ['briefings', 'Briefings', counts.briefings, 'sky'],
              ['normal', 'Normales', counts.normal, 'emerald'],
              ['emergency', 'Emergencias', counts.emergency, 'rose']
            ] as const
          ).map(([id, label, count, tone]) => (
            <button
              key={id}
              onClick={() => setSelectedCategory(id)}
              className={tabClass(selectedCategory === id, tone)}
            >
              <span>{label}</span>
              <span className="procedure-tab-count">{count}</span>
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar: TELSI, MEANA, visual, circling, callout, flap…"
            className="procedure-search w-full rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-5">
        {filteredCards.length === 0 ? (
          <div className="procedure-card text-center py-16 rounded-3xl space-y-3">
            <Search className="w-10 h-10 text-slate-500 mx-auto" />
            <p className="text-base font-bold">No se encontraron procedimientos</p>
          </div>
        ) : (
          filteredCards.map((card) => {
            const isExpanded = !!expandedCardIds[card.id];
            const catBadge = getCategoryBadge(card.category);
            const diagramType = diagramTypeForCard(card.id);
            const accent =
              card.category === 'emergency'
                ? 'procedure-card-accent-rose'
                : card.category === 'normal'
                  ? 'procedure-card-accent-emerald'
                  : 'procedure-card-accent-sky';

            return (
              <article key={card.id} className={`procedure-card rounded-3xl shadow-xl overflow-hidden ${accent}`}>
                <button
                  type="button"
                  onClick={() => toggleExpand(card.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 group"
                >
                  <div className="space-y-3 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`procedure-chip ${catBadge.className}`}>
                        {catBadge.icon}
                        {catBadge.label}
                      </span>
                      <span className="procedure-meta">{card.airplane}</span>
                      <span className="procedure-meta procedure-meta-ref">📖 {card.manualRef}</span>
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-black group-hover:text-sky-500 transition-colors">
                        {card.title}
                      </h2>
                      <p className="text-xs procedure-subtitle font-medium mt-0.5">{card.subtitle}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {card.badges.map((b) => (
                        <span key={b} className="procedure-tag">
                          #{b}
                        </span>
                      ))}
                    </div>
                    {!isExpanded && card.goldenRules?.[0] && (
                      <p className="text-[11px] procedure-preview flex items-start gap-1.5 pt-1">
                        <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-500" />
                        <span>{card.goldenRules[0]}</span>
                      </p>
                    )}
                  </div>
                  <div className="procedure-expand-btn shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-800/50 space-y-5 animate-fade-in">
                    <div className="procedure-summary rounded-2xl p-3.5 text-xs leading-relaxed">
                      <strong>Resumen táctico:</strong> {card.summary}
                    </div>

                    {card.memoryItems && card.memoryItems.length > 0 && (
                      <div className="procedure-memory rounded-2xl p-4 space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                            <Flame className="w-4 h-4" /> Memory Items
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-600 text-white font-black">
                            RECALL
                          </span>
                        </div>
                        <ol className="space-y-1.5 font-mono text-xs list-decimal list-inside">
                          {card.memoryItems.map((item) => (
                            <li key={item} className="font-bold">
                              {item}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {card.goldenRules && card.goldenRules.length > 0 && (
                      <div className="procedure-golden rounded-2xl p-4 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wide">
                          <AlertTriangle className="w-4 h-4" />
                          Reglas de oro
                        </div>
                        <ul className="space-y-1.5 text-xs list-disc list-inside">
                          {card.goldenRules.map((rule) => (
                            <li key={rule} className="leading-relaxed">
                              {rule}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {diagramType && <ApproachDiagram type={diagramType} />}

                    {card.diagramNote && !diagramType && (
                      <div className="procedure-diagram-note rounded-2xl p-3.5 text-xs font-mono flex items-center gap-2.5">
                        <Compass className="w-4 h-4 shrink-0" />
                        <span>{card.diagramNote}</span>
                      </div>
                    )}

                    {/* Infographic flow strip for key steps */}
                    {card.sections[0]?.items?.length > 0 && (
                      <div className="procedure-flow overflow-x-auto pb-1">
                        <div className="flex min-w-max gap-2">
                          {card.sections[0].items.slice(0, 5).map((it, idx) => (
                            <div key={`${card.id}-flow-${idx}`} className="procedure-flow-step">
                              <span className="procedure-flow-num">{idx + 1}</span>
                              <span className="procedure-flow-text">{it.callout || it.action}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      {card.sections.map((section, sIdx) => (
                        <div key={sIdx} className={`${sectionTone(section.color)} rounded-2xl border p-4 sm:p-5 space-y-3`}>
                          <h3 className="text-xs sm:text-sm font-black flex items-center justify-between pb-2 border-b border-current/10">
                            <span>{section.title}</span>
                            {section.badge && <span className="procedure-meta">{section.badge}</span>}
                          </h3>
                          <div className="space-y-2.5">
                            {section.items.map((it, itIdx) => (
                              <div key={itIdx} className="procedure-item rounded-xl p-2.5 flex flex-col sm:flex-row sm:items-start gap-2.5 text-xs">
                                <div className="shrink-0">{getRoleBadge(it.role)}</div>
                                <div className="space-y-1 flex-1 min-w-0">
                                  <p className="font-medium leading-relaxed">{it.action}</p>
                                  {it.callout && (
                                    <div className="pt-0.5">
                                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-70 block">
                                        Callout
                                      </span>
                                      <span className="procedure-callout">{it.callout}</span>
                                    </div>
                                  )}
                                  {it.details && <p className="text-[11px] opacity-80 leading-normal">ℹ️ {it.details}</p>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};
