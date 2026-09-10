import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  BookOpen, 
  ShieldAlert, 
  Plane, 
  FileText, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  CheckCircle2, 
  Flame, 
  Layers, 
  Compass, 
  Zap, 
  SlidersHorizontal,
  Bookmark,
  Share2
} from 'lucide-react';
import { PROCEDURE_CARDS, ProcedureCard, ProcedureSection, ProcedureItem } from '../../data/procedureCardsData';

interface ProcedureCardsScreenProps {
  onBackToDashboard: () => void;
}

export const ProcedureCardsScreen: React.FC<ProcedureCardsScreenProps> = ({ onBackToDashboard }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'briefings' | 'normal' | 'emergency'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCardIds, setExpandedCardIds] = useState<Record<string, boolean>>(() => {
    // Iniciar con las 3 primeras tarjetas expandidas por defecto
    const initial: Record<string, boolean> = {};
    PROCEDURE_CARDS.slice(0, 3).forEach(c => { initial[c.id] = true; });
    return initial;
  });

  const toggleExpand = (id: string) => {
    setExpandedCardIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    PROCEDURE_CARDS.forEach(c => { all[c.id] = true; });
    setExpandedCardIds(all);
  };

  const collapseAll = () => {
    setExpandedCardIds({});
  };

  // Filtrado reactivo de tarjetas
  const filteredCards = useMemo(() => {
    return PROCEDURE_CARDS.filter(card => {
      // Filtro por categoría
      if (selectedCategory !== 'all' && card.category !== selectedCategory) {
        return false;
      }

      // Filtro por búsqueda de texto
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const inTitle = card.title.toLowerCase().includes(query);
        const inSubtitle = card.subtitle.toLowerCase().includes(query);
        const inSummary = card.summary.toLowerCase().includes(query);
        const inRef = card.manualRef.toLowerCase().includes(query);
        const inBadges = card.badges.some(b => b.toLowerCase().includes(query));
        const inRules = card.goldenRules?.some(r => r.toLowerCase().includes(query)) || false;
        const inMemory = card.memoryItems?.some(m => m.toLowerCase().includes(query)) || false;
        const inItems = card.sections.some(s => 
          s.title.toLowerCase().includes(query) ||
          s.items.some(it => 
            it.action.toLowerCase().includes(query) ||
            (it.callout && it.callout.toLowerCase().includes(query)) ||
            (it.details && it.details.toLowerCase().includes(query))
          )
        );

        return inTitle || inSubtitle || inSummary || inRef || inBadges || inRules || inMemory || inItems;
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  const counts = useMemo(() => {
    return {
      all: PROCEDURE_CARDS.length,
      briefings: PROCEDURE_CARDS.filter(c => c.category === 'briefings').length,
      normal: PROCEDURE_CARDS.filter(c => c.category === 'normal').length,
      emergency: PROCEDURE_CARDS.filter(c => c.category === 'emergency').length,
    };
  }, []);

  const getCategoryBadge = (cat: ProcedureCard['category']) => {
    switch (cat) {
      case 'briefings':
        return {
          label: 'Briefing',
          bg: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
          icon: <BookOpen className="w-3.5 h-3.5" />
        };
      case 'normal':
        return {
          label: 'Operación Normal',
          bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          icon: <Compass className="w-3.5 h-3.5" />
        };
      case 'emergency':
        return {
          label: 'Emergencia / QRH',
          bg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          icon: <Flame className="w-3.5 h-3.5 text-rose-400" />
        };
    }
  };

  const getRoleBadge = (role?: ProcedureItem['role']) => {
    switch (role) {
      case 'PF':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/40">PF</span>;
      case 'PM':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-sky-500/20 text-sky-300 border border-sky-500/40">PM</span>;
      case 'PA':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">PA Megafonía</span>;
      case 'ATC':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-purple-500/20 text-purple-300 border border-purple-500/40">ATC Radio</span>;
      case 'ALERT':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-red-600 text-white shadow-sm">⚠️ ALERTA</span>;
      case 'NOTE':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">NOTA</span>;
      case 'STEP':
      default:
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-emerald-400 border border-slate-700">PASO</span>;
    }
  };

  const getSectionBorderColor = (color?: ProcedureSection['color']) => {
    switch (color) {
      case 'rose':
        return 'border-rose-500/30 bg-[#160b13]/60';
      case 'amber':
        return 'border-amber-500/30 bg-[#1a1308]/60';
      case 'emerald':
        return 'border-emerald-500/30 bg-[#071912]/60';
      case 'indigo':
        return 'border-indigo-500/30 bg-[#0c142b]/60';
      case 'purple':
        return 'border-purple-500/30 bg-[#160c29]/60';
      case 'sky':
      default:
        return 'border-sky-500/30 bg-[#0a1733]/60';
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-24 font-sans animate-fade-in">
      
      {/* Top Navigation & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sky-500/20">
        <button
          onClick={onBackToDashboard}
          className="flex items-center gap-2 text-sky-400 hover:text-sky-300 font-bold text-sm transition-colors group self-start"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Volver al Centro de Control</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="px-3 py-1 rounded-lg bg-[#0e1933] hover:bg-[#14264d] text-slate-300 text-xs font-semibold border border-slate-800 transition-colors"
          >
            Expandir Todas
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1 rounded-lg bg-[#0e1933] hover:bg-[#14264d] text-slate-300 text-xs font-semibold border border-slate-800 transition-colors"
          >
            Contraer Todas
          </button>
        </div>
      </div>

      {/* Main Header Banner */}
      <div className="bg-gradient-to-br from-[#002f59] via-[#004b87] to-[#00522c] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-3 relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-emerald-300 shadow-inner">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-emerald-300 block">
              SOPM • MOB • AOM • QRH
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Tarjetas de Consulta Rápida (SOPs)
            </h1>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-sky-100 max-w-3xl leading-relaxed">
          Guías estandarizadas de procedimientos normales, de emergencia y briefings de compañía para el <strong>Embraer 195-E2 (Binter Ops)</strong>, optimizadas para estudio, memorización activa de llamadas de cabina y consulta táctica.
        </p>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
          
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              selectedCategory === 'all'
                ? 'bg-sky-500 text-white shadow-glow-sky'
                : 'bg-[#0e1933] text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <span>Todos los Procedimientos</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/30 font-mono">
              {counts.all}
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory('briefings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              selectedCategory === 'briefings'
                ? 'bg-sky-600 text-white shadow-glow-sky'
                : 'bg-[#0e1933] text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Briefings</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/30 font-mono">
              {counts.briefings}
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory('normal')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              selectedCategory === 'normal'
                ? 'bg-emerald-600 text-white shadow-glow-emerald'
                : 'bg-[#0e1933] text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Procedimientos Normales</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/30 font-mono">
              {counts.normal}
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory('emergency')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              selectedCategory === 'emergency'
                ? 'bg-rose-600 text-white shadow-glow-rose'
                : 'bg-[#0e1933] text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>Emergencias & QRH</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/30 font-mono">
              {counts.emergency}
            </span>
          </button>

        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por procedimiento, llamada verbal (PF/PM/PA), mnemónico (TELSI, MEANA), velocidad, limitación..."
            className="w-full bg-[#0e1933] border border-sky-500/20 focus:border-sky-400 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none shadow-md transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Cards List */}
      <div className="space-y-5">
        {filteredCards.length === 0 ? (
          <div className="text-center py-16 bg-[#0e1933] border border-slate-800 rounded-3xl space-y-3">
            <Search className="w-10 h-10 text-slate-500 mx-auto" />
            <p className="text-base font-bold text-slate-300">No se encontraron procedimientos</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Prueba con otro término de búsqueda o selecciona otra categoría superior.
            </p>
          </div>
        ) : (
          filteredCards.map((card) => {
            const isExpanded = !!expandedCardIds[card.id];
            const catBadge = getCategoryBadge(card.category);

            return (
              <div
                key={card.id}
                className="bg-[#0b1426] border border-sky-500/20 hover:border-sky-500/40 rounded-3xl shadow-xl transition-all overflow-hidden"
              >
                {/* Card Top Clickable Header */}
                <div
                  onClick={() => toggleExpand(card.id)}
                  className="p-5 sm:p-6 cursor-pointer select-none flex items-start justify-between gap-4 group"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1.5 ${catBadge.bg}`}>
                        {catBadge.icon}
                        <span>{catBadge.label}</span>
                      </span>

                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#070e1c] text-slate-400 border border-slate-800">
                        {card.airplane}
                      </span>

                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#070e1c] text-sky-400 border border-sky-500/30">
                        📖 {card.manualRef}
                      </span>
                    </div>

                    <div>
                      <h2 className="text-lg sm:text-xl font-black text-white group-hover:text-sky-300 transition-colors">
                        {card.title}
                      </h2>
                      <p className="text-xs text-slate-300 font-medium">
                        {card.subtitle}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {card.badges.map((b, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 font-semibold">
                          #{b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-sky-400 transition-colors shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-5 animate-fade-in">
                    
                    {/* Summary text */}
                    <div className="p-3.5 rounded-2xl bg-black/40 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                      <strong>Resumen Táctico:</strong> {card.summary}
                    </div>

                    {/* Memory Items Highlight Box */}
                    {card.memoryItems && card.memoryItems.length > 0 && (
                      <div className="p-4 rounded-2xl bg-rose-950/40 border-2 border-rose-500/60 space-y-2.5 shadow-lg shadow-rose-950/30">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                            <Flame className="w-4 h-4 fill-current text-rose-400" />
                            <span>ACCIONES DE MEMORIA OBLIGATORIAS (MEMORY ITEMS)</span>
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-600 text-white font-black animate-pulse">
                            RECALL REQUERIDO
                          </span>
                        </div>

                        <div className="space-y-1.5 pt-1 font-mono text-xs">
                          {card.memoryItems.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-rose-200">
                              <span className="text-rose-400 font-black">{idx + 1}.</span>
                              <strong className="text-white">{item}</strong>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Golden Rules Box */}
                    {card.goldenRules && card.goldenRules.length > 0 && (
                      <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-black text-amber-300 uppercase tracking-wide">
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                          <span>Reglas de Oro & Parámetros Críticos (Golden Rules)</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-amber-100 list-disc list-inside">
                          {card.goldenRules.map((rule, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {rule}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Diagram Note if present */}
                    {card.diagramNote && (
                      <div className="p-3.5 rounded-2xl bg-sky-950/30 border border-sky-500/30 text-xs font-mono text-sky-200 flex items-center gap-2.5">
                        <Compass className="w-4 h-4 text-sky-400 shrink-0" />
                        <span><strong>Esquema de Circuito / Perfil:</strong> {card.diagramNote}</span>
                      </div>
                    )}

                    {/* Sections Flow */}
                    <div className="space-y-4 pt-1">
                      {card.sections.map((section, sIdx) => {
                        const borderClass = getSectionBorderColor(section.color);

                        return (
                          <div
                            key={sIdx}
                            className={`p-4 sm:p-5 rounded-2xl border ${borderClass} space-y-3`}
                          >
                            <h3 className="text-xs sm:text-sm font-black text-white flex items-center justify-between pb-2 border-b border-white/10">
                              <span>{section.title}</span>
                              {section.badge && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-slate-300">
                                  {section.badge}
                                </span>
                              )}
                            </h3>

                            <div className="space-y-3">
                              {section.items.map((it, itIdx) => (
                                <div
                                  key={itIdx}
                                  className="flex flex-col sm:flex-row sm:items-start gap-2.5 sm:gap-3 text-xs p-2.5 rounded-xl bg-black/30 border border-white/5"
                                >
                                  <div className="shrink-0 self-start">
                                    {getRoleBadge(it.role)}
                                  </div>

                                  <div className="space-y-1 flex-1">
                                    <p className="text-slate-200 leading-relaxed font-medium">
                                      {it.action}
                                    </p>

                                    {it.callout && (
                                      <div className="pt-1">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                                          Llamada reglamentaria (Callout):
                                        </span>
                                        <span className="font-mono font-black text-xs text-white bg-slate-900 border border-sky-500/30 px-2.5 py-1 rounded inline-block shadow-sm">
                                          {it.callout}
                                        </span>
                                      </div>
                                    )}

                                    {it.details && (
                                      <p className="text-[11px] text-slate-400 leading-normal pt-0.5">
                                        ℹ️ {it.details}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
