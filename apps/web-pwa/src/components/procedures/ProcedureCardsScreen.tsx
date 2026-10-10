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
  Sparkles,
  ArrowUp
} from 'lucide-react';
import { PROCEDURE_CARDS, ProcedureCard, ProcedureSection, ProcedureItem } from '../../data/procedureCardsData';

interface ProcedureCardsScreenProps {
  onBackToDashboard: () => void;
}

const STEP_TONES = ['sky', 'teal', 'amber', 'indigo', 'rose', 'emerald'] as const;

export const ProcedureCardsScreen: React.FC<ProcedureCardsScreenProps> = ({ onBackToDashboard }) => {
  const [selectedOperator, setSelectedOperator] = useState<'all' | 'binter' | 'blueteam' | 'netjets'>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'briefings' | 'normal' | 'emergency' | 'special'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCardIds, setExpandedCardIds] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    PROCEDURE_CARDS.slice(0, 3).forEach((c) => {
      initial[c.id] = true;
    });
    return initial;
  });
  const [activePageIndices, setActivePageIndices] = useState<Record<string, number>>({});

  const scrollToCategoryTabs = () => {
    const el = document.getElementById('procedures-category-tabs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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

  const cardMatchesOperator = (card: ProcedureCard, op: 'all' | 'binter' | 'blueteam' | 'netjets') => {
    if (op === 'all') return true;
    const a = card.airplane.toLowerCase();
    const b = card.badges.join(' ').toLowerCase();
    if (op === 'binter') return a.includes('binter') || a.includes('e195') || b.includes('binter');
    if (op === 'blueteam') return a.includes('blue team') || a.includes('c172') || a.includes('da40') || b.includes('blue team');
    if (op === 'netjets') return a.includes('netjets') || b.includes('netjets');
    return true;
  };

  const operatorFilteredCards = useMemo(() => {
    return PROCEDURE_CARDS.filter((card) => cardMatchesOperator(card, selectedOperator));
  }, [selectedOperator]);

  const filteredCards = useMemo(() => {
    return operatorFilteredCards.filter((card) => {
      if (selectedCategory !== 'all' && card.category !== selectedCategory) return false;
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        card.title.toLowerCase().includes(query) ||
        card.subtitle.toLowerCase().includes(query) ||
        card.summary.toLowerCase().includes(query) ||
        card.manualRef.toLowerCase().includes(query) ||
        card.airplane.toLowerCase().includes(query) ||
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
  }, [operatorFilteredCards, selectedCategory, searchQuery]);

  const counts = useMemo(
    () => ({
      all: operatorFilteredCards.length,
      briefings: operatorFilteredCards.filter((c) => c.category === 'briefings').length,
      normal: operatorFilteredCards.filter((c) => c.category === 'normal').length,
      special: operatorFilteredCards.filter((c) => c.category === 'special').length,
      emergency: operatorFilteredCards.filter((c) => c.category === 'emergency').length
    }),
    [operatorFilteredCards]
  );

  const operatorCounts = useMemo(
    () => ({
      all: PROCEDURE_CARDS.length,
      binter: PROCEDURE_CARDS.filter((c) => cardMatchesOperator(c, 'binter')).length,
      blueteam: PROCEDURE_CARDS.filter((c) => cardMatchesOperator(c, 'blueteam')).length,
      netjets: PROCEDURE_CARDS.filter((c) => cardMatchesOperator(c, 'netjets')).length
    }),
    []
  );

  const getCategoryBadge = (cat: ProcedureCard['category']) => {
    switch (cat) {
      case 'briefings':
        return { label: 'Briefing', className: 'procedure-badge-briefing', icon: <BookOpen className="w-3.5 h-3.5" /> };
      case 'normal':
        return { label: 'Ops Normal', className: 'procedure-badge-normal', icon: <Compass className="w-3.5 h-3.5" /> };
      case 'special':
        return { label: 'Especial / Compl.', className: 'procedure-badge-special', icon: <Sparkles className="w-3.5 h-3.5" /> };
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

  const diagramStepsFor = (card: ProcedureCard) => {
    const fromSection = card.sections[0]?.items?.slice(0, 6) || [];
    if (fromSection.length > 0) {
      return fromSection.map((it) => ({
        label: (it.callout || it.action).replace(/:$/, ''),
        detail: it.details
      }));
    }
    return (card.goldenRules || []).slice(0, 5).map((rule) => ({
      label: rule,
      detail: undefined as string | undefined
    }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-24 font-sans">
      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={onBackToDashboard} className="procedure-ghost-btn">
          <ArrowLeft className="w-4 h-4" />
          Volver al Centro de Control
        </button>
        <div className="flex items-center gap-2">
          <button type="button" onClick={expandAll} className="procedure-ghost-btn text-[11px]">
            Expandir
          </button>
          <button type="button" onClick={collapseAll} className="procedure-ghost-btn text-[11px]">
            Contraer
          </button>
        </div>
      </div>

      <div className="procedure-hero rounded-3xl p-5 sm:p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none procedure-hero-glow" />
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2 procedure-hero-kicker text-xs font-black uppercase tracking-widest">
            <Layers className="w-4 h-4" />
            SOPM · MOB · AOM · QRH
          </div>
          <h1 className="procedure-hero-title text-2xl sm:text-3xl font-black tracking-tight">
            Tarjetas SOP · Infografía Operacional
          </h1>
          <p className="procedure-hero-sub text-sm max-w-2xl leading-relaxed">
            Flujos visuales para memorizar briefings, aproximaciones E195-E2 y emergencias. Figuras oficiales SOPM
            con hitos resaltados; consulta el PDF a bordo como referencia definitiva.
          </p>
        </div>
      </div>

      <div id="procedures-operator-tabs" className="flex flex-wrap items-center gap-2 pt-1 border-b border-slate-800/40 pb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          Operador / Flota:
        </span>
        {(
          [
            ['all', 'Todos los Operadores', operatorCounts.all],
            ['binter', 'Binter Canarias (E195-E2)', operatorCounts.binter],
            ['blueteam', 'Blue Team (C172F / DA40D)', operatorCounts.blueteam],
            ['netjets', 'NetJets Europe', operatorCounts.netjets]
          ] as const
        ).map(([id, label, count]) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setSelectedOperator(id);
              setSelectedCategory('all');
            }}
            className={`procedure-tab ${selectedOperator === id ? 'procedure-tab-active' : ''}`}
          >
            {label}
            <span className="procedure-tab-count">{count}</span>
          </button>
        ))}
      </div>

      <div id="procedures-category-tabs" className="flex flex-col sm:flex-row gap-3 sm:items-center pt-1">
        <div className="flex flex-wrap gap-2">
          {(
            [
              ['all', 'Todos', counts.all],
              ['briefings', 'Briefings', counts.briefings],
              ['normal', 'Normales', counts.normal],
              ['special', 'Especiales / Compl.', counts.special],
              ['emergency', 'Emergencias', counts.emergency]
            ] as const
          ).map(([id, label, count]) => (
            <button
              key={id}
              type="button"
              onClick={() => setSelectedCategory(id)}
              className={`procedure-tab ${selectedCategory === id ? 'procedure-tab-active' : ''}`}
            >
              {label}
              <span className="procedure-tab-count">{count}</span>
            </button>
          ))}
        </div>
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar: TELSI, MEANA, visual, circling, callout, flap..."
            className="procedure-search w-full pl-9"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredCards.map((card) => {
          const isExpanded = !!expandedCardIds[card.id];
          const badge = getCategoryBadge(card.category);
          const diagramSteps = diagramStepsFor(card);

          return (
            <article key={card.id} className={`procedure-card procedure-card-${card.category} rounded-2xl overflow-hidden`}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => toggleExpand(card.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleExpand(card.id);
                  }
                }}
                className="procedure-card-header w-full text-left p-5 sm:p-6 flex gap-4 cursor-pointer select-none group"
              >
                <div className="flex-1 min-w-0 space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`procedure-badge ${badge.className}`}>
                      {badge.icon}
                      {badge.label}
                    </span>
                    <span className="procedure-meta">{card.airplane}</span>
                    <span className="procedure-meta flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {card.manualRef}
                    </span>
                  </div>
                  <h2 className="procedure-card-title text-lg sm:text-xl font-black leading-snug group-hover:opacity-90 transition-opacity">{card.title}</h2>
                  <p className="procedure-card-subtitle text-xs sm:text-sm leading-relaxed">{card.subtitle}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {card.badges.map((b) => (
                      <span key={b} className="procedure-chip">
                        #{b}
                      </span>
                    ))}
                  </div>
                  {!isExpanded && card.goldenRules?.[0] && (
                    <p className="procedure-preview-hint flex items-start gap-1.5 pt-1">
                      <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{card.goldenRules[0]}</span>
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0 mt-1">
                  {/* Botón rápido para volver arriba */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollToCategoryTabs();
                    }}
                    className="procedure-icon-btn text-sky-400 hover:text-sky-300"
                    title="Volver a la selección de categorías (Arriba)"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold hidden md:inline">Arriba</span>
                  </button>

                  <div className="procedure-expand-btn shrink-0">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

                {isExpanded && (
                  <div className="procedure-card-body px-4 sm:px-6 pb-6 pt-2 border-t border-slate-800/50 space-y-5 animate-fade-in">
                  {card.diagramImage && (
                    <figure className="procedure-sop-figure">
                      {card.diagramImages && card.diagramImages.length > 1 && (
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700/40">
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5" />
                            Páginas de la Lista Oficial ({card.diagramImages.length}):
                          </span>
                          <div className="flex items-center gap-1.5">
                            {card.diagramImages.map((_, pIdx) => {
                              const activeP = activePageIndices[card.id] ?? 0;
                              return (
                                <button
                                  key={`${card.id}-page-${pIdx}`}
                                  type="button"
                                  onClick={() => setActivePageIndices((prev) => ({ ...prev, [card.id]: pIdx }))}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                                    activeP === pIdx
                                      ? 'bg-sky-500 text-white shadow-glow-sky'
                                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                  }`}
                                >
                                  Pág. {pIdx + 1}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <div className="procedure-sop-figure-scroll">
                        <div className="procedure-sop-figure-frame">
                          <img
                            src={
                              card.diagramImages && card.diagramImages.length > 0
                                ? card.diagramImages[activePageIndices[card.id] ?? 0] || card.diagramImage
                                : card.diagramImage
                            }
                            alt={card.diagramCaption || card.title}
                            className="procedure-sop-figure-img"
                            loading="lazy"
                            decoding="async"
                          />
                          {diagramSteps.length > 0 && (
                            <div className="procedure-sop-step-overlay" aria-label="Hitos del procedimiento">
                              <div className="procedure-sop-step-header col-span-full flex items-center justify-between pb-1 mb-1 border-b border-slate-700/40">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                                  <Sparkles className="w-3.5 h-3.5" />
                                  Hitos Operacionales Clave
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  {diagramSteps.length} pasos resumidos
                                </span>
                              </div>
                              <div className="procedure-sop-step-grid col-span-full">
                                {diagramSteps.map((step, idx) => (
                                  <div
                                    key={`${card.id}-step-${idx}`}
                                    className={`procedure-sop-step-box procedure-sop-step-${STEP_TONES[idx % STEP_TONES.length]}`}
                                  >
                                    <span className="procedure-sop-step-num">{idx + 1}</span>
                                    <div className="min-w-0 flex-1">
                                      <p className="procedure-sop-step-label">{step.label}</p>
                                      {step.detail && <p className="procedure-sop-step-detail">{step.detail}</p>}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <figcaption className="procedure-sop-figure-caption">
                        <span className="procedure-sop-figure-badge">
                          {card.diagramImages && card.diagramImages.length > 1
                            ? `Página ${(activePageIndices[card.id] ?? 0) + 1} de ${card.diagramImages.length}`
                            : 'Figura SOPM'}
                        </span>
                        {card.diagramCaption && <span>{card.diagramCaption}</span>}
                        {card.diagramNote && <span className="procedure-sop-figure-note">{card.diagramNote}</span>}
                        <span className="procedure-sop-figure-hint">
                          {card.diagramImages && card.diagramImages.length > 1
                            ? 'Usa los botones superiores para alternar entre páginas de la lista · desliza en horizontal si hace falta'
                            : 'Hitos coloreados sobre la figura · desliza en horizontal si hace falta'}
                        </span>
                      </figcaption>
                    </figure>
                  )}

                  {card.memoryItems && card.memoryItems.length > 0 && (
                    <div className="procedure-memory rounded-2xl p-4 sm:p-5 space-y-4">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="procedure-memory-heading text-sm font-black uppercase tracking-wider flex items-center gap-2">
                          <Flame className="w-5 h-5" />
                          Memory Items · Acciones inmediatas
                        </span>
                        <span className="procedure-memory-recall text-[10px] font-mono px-2.5 py-1 rounded-lg tracking-wide">
                          RECALL · PRIORIDAD
                        </span>
                      </div>
                      <p className="procedure-memory-hint text-[11px] leading-relaxed">
                        Secuencia de memoria — estudiar paso a paso. Confirmación cruzada PF/PM cuando aplique.
                      </p>
                      <ol className="procedure-memory-list">
                        {card.memoryItems.map((item, idx) => (
                          <li key={item} className="procedure-memory-step">
                            <span className="procedure-memory-step-num" aria-hidden>
                              {idx + 1}
                            </span>
                            <span className="procedure-memory-step-text">{item}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  <div className="procedure-summary rounded-2xl p-3.5 text-xs leading-relaxed">
                    <strong>Resumen táctico:</strong> {card.summary}
                  </div>

                  {card.goldenRules && card.goldenRules.length > 0 && (
                    <div className="procedure-golden rounded-2xl p-4 space-y-3">
                      <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wide">
                        <AlertTriangle className="w-4 h-4" />
                        Reglas de oro · Hitos
                      </div>
                      <div className="procedure-golden-grid">
                        {card.goldenRules.map((rule, idx) => (
                          <div key={rule} className="procedure-golden-item">
                            <span className="procedure-golden-num">{idx + 1}</span>
                            <p>{rule}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {!card.diagramImage && card.diagramNote && (
                    <div className="procedure-diagram-note rounded-2xl p-3.5 text-xs font-mono flex items-center gap-2.5">
                      <Compass className="w-4 h-4 shrink-0" />
                      <span>{card.diagramNote}</span>
                    </div>
                  )}

                  {card.sections[0]?.items?.length > 0 && (
                    <div className="procedure-flow-wrap">
                      <div className="procedure-flow-label">
                        <Sparkles className="w-3.5 h-3.5" />
                        Secuencia visual
                      </div>
                      <div className="procedure-flow overflow-x-auto pb-1">
                        <div className="flex min-w-max gap-2">
                          {card.sections[0].items.slice(0, 6).map((it, idx) => (
                            <div key={`${card.id}-flow-${idx}`} className="procedure-flow-step">
                              <span className="procedure-flow-num">{idx + 1}</span>
                              <span className="procedure-flow-text">{it.callout || it.action}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="procedure-sections-grid">
                    {card.sections.map((section, sIdx) => {
                      const isMemorySection = /memoria|memory items|acciones inmediatas/i.test(section.title);
                      return (
                        <div
                          key={sIdx}
                          className={`${sectionTone(section.color)} rounded-2xl border p-4 sm:p-5 space-y-3 ${
                            isMemorySection ? 'procedure-section-memory-focus procedure-section-span' : ''
                          }`}
                        >
                          <h3 className="text-xs sm:text-sm font-black flex items-center justify-between gap-2 pb-2 border-b border-current/10">
                            <span className="flex items-center gap-1.5">
                              {isMemorySection && <Flame className="w-4 h-4 procedure-memory-icon shrink-0" />}
                              {section.title}
                            </span>
                            {section.badge && <span className="procedure-meta">{section.badge}</span>}
                            {isMemorySection && (
                              <span className="procedure-memory-recall text-[9px] font-mono px-2 py-0.5 rounded">
                                RECALL
                              </span>
                            )}
                          </h3>
                          <div className={isMemorySection ? 'procedure-memory-section-items' : 'space-y-2.5'}>
                            {section.items.map((it, itIdx) => (
                              <div
                                key={itIdx}
                                className={`procedure-item rounded-xl p-2.5 flex flex-col sm:flex-row sm:items-start gap-2.5 text-xs ${
                                  isMemorySection ? 'procedure-item-memory' : ''
                                }`}
                              >
                                <div className="shrink-0 flex items-center gap-2">
                                  <span className="procedure-step-idx">{itIdx + 1}</span>
                                  {getRoleBadge(it.role)}
                                </div>
                                <div className="space-y-1.5 flex-1 min-w-0">
                                  <p className={`leading-relaxed ${isMemorySection ? 'font-bold text-sm' : 'font-medium'}`}>
                                    {it.action}
                                  </p>
                                  {it.callout && (
                                    <div className="pt-0.5">
                                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-70 block">
                                        Callout
                                      </span>
                                      <span className="procedure-callout">{it.callout}</span>
                                    </div>
                                  )}
                                  {it.details && (
                                    <p className="text-[11px] opacity-80 leading-relaxed">ℹ️ {it.details}</p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Botón al pie de cada tarjeta para regresar a categorías */}
                  <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-800/80 gap-2">
                    <span className="text-[11px] text-slate-400 font-mono">
                      📖 {card.airplane} · {card.manualRef}
                    </span>
                    <button
                      type="button"
                      onClick={scrollToCategoryTabs}
                      className="procedure-back-top-btn"
                      title="Subir a la parte superior de las tarjetas SOP"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                      <span>Volver a Categorías / Arriba</span>
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}

        {filteredCards.length === 0 && (
          <div className="procedure-empty rounded-2xl p-8 text-center text-sm">
            No hay tarjetas para ese filtro. Prueba con “TELSI”, “visual” o “RTO”.
          </div>
        )}
      </div>

      {/* Botón Flotante para subir a las categorías de tarjetas */}
      <button
        type="button"
        onClick={scrollToCategoryTabs}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-sky-600 hover:bg-sky-500 text-white shadow-2xl border border-sky-400/50 flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
        title="Volver a los botones de categorías de tarjetas"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </div>
  );
};
