import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Table as TableIcon, 
  Compass, 
  Flame, 
  BookOpen, 
  Sun, 
  ShieldAlert, 
  FileText, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Copy, 
  Check, 
  Layers, 
  Zap, 
  Plane,
  Scale
} from 'lucide-react';
import { OPERATIONAL_TABLES, OperationalTable, TableRow } from '../../data/operationalTablesData';

interface OperationalTablesScreenProps {
  onBackToDashboard: () => void;
}

export const OperationalTablesScreen: React.FC<OperationalTablesScreenProps> = ({ onBackToDashboard }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'alternates' | 'memory-items' | 'limitations' | 'moa' | 'vfr'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTableIds, setExpandedTableIds] = useState<Record<string, boolean>>(() => {
    // Todas las tablas expandidas por defecto para consulta inmediata
    const initial: Record<string, boolean> = {};
    OPERATIONAL_TABLES.forEach(t => { initial[t.id] = true; });
    return initial;
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedTableIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    OPERATIONAL_TABLES.forEach(t => { all[t.id] = true; });
    setExpandedTableIds(all);
  };

  const collapseAll = () => {
    setExpandedTableIds({});
  };

  const handleCopyTable = (table: OperationalTable) => {
    const headerLine = table.headers.join(' | ');
    const rowLines = table.rows.map(r => [r.col1, r.col2, r.col3, r.col4, r.col5].filter(Boolean).join(' | ')).join('\n');
    const fullText = `${table.title} (${table.manualRef})\n\n${headerLine}\n${rowLines}`;
    
    navigator.clipboard.writeText(fullText).then(() => {
      setCopiedId(table.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  // Filtrado de tablas
  const filteredTables = useMemo(() => {
    return OPERATIONAL_TABLES.filter(t => {
      if (selectedCategory !== 'all' && t.category !== selectedCategory) {
        return false;
      }

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const inTitle = t.title.toLowerCase().includes(q);
        const inSub = t.subtitle.toLowerCase().includes(q);
        const inRef = t.manualRef.toLowerCase().includes(q);
        const inDesc = t.description.toLowerCase().includes(q);
        const inHeaders = t.headers.some(h => h.toLowerCase().includes(q));
        const inRows = t.rows.some(r => 
          r.col1.toLowerCase().includes(q) ||
          r.col2.toLowerCase().includes(q) ||
          (r.col3 && r.col3.toLowerCase().includes(q)) ||
          (r.col4 && r.col4.toLowerCase().includes(q)) ||
          (r.notes && r.notes.toLowerCase().includes(q))
        );

        return inTitle || inSub || inRef || inDesc || inHeaders || inRows;
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  const counts = useMemo(() => {
    return {
      all: OPERATIONAL_TABLES.length,
      alternates: OPERATIONAL_TABLES.filter(t => t.category === 'alternates').length,
      memoryItems: OPERATIONAL_TABLES.filter(t => t.category === 'memory-items').length,
      limitations: OPERATIONAL_TABLES.filter(t => t.category === 'limitations').length,
      moa: OPERATIONAL_TABLES.filter(t => t.category === 'moa').length,
      vfr: OPERATIONAL_TABLES.filter(t => t.category === 'vfr').length,
    };
  }, []);

  const getCategoryTheme = (cat: OperationalTable['category']) => {
    switch (cat) {
      case 'alternates':
        return {
          label: 'Planificación Alternativos',
          icon: <Compass className="w-3.5 h-3.5" />,
          badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          headerBg: 'from-[#0a2318] to-[#06140e]'
        };
      case 'memory-items':
        return {
          label: 'Memory Items E195-E2',
          icon: <Flame className="w-3.5 h-3.5 text-rose-400" />,
          badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          headerBg: 'from-[#240c15] to-[#14060b]'
        };
      case 'limitations':
        return {
          label: 'Limitaciones & Números',
          icon: <Scale className="w-3.5 h-3.5 text-amber-400" />,
          badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          headerBg: 'from-[#241a0a] to-[#140f06]'
        };
      case 'moa':
        return {
          label: 'Estructura MOA',
          icon: <BookOpen className="w-3.5 h-3.5 text-sky-400" />,
          badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
          headerBg: 'from-[#0a182e] to-[#050e1c]'
        };
      case 'vfr':
        return {
          label: 'Mínimos VFR & SERA',
          icon: <Sun className="w-3.5 h-3.5 text-yellow-400" />,
          badgeBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
          headerBg: 'from-[#1e1c08] to-[#121105]'
        };
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-24 font-sans animate-fade-in">
      
      {/* Top Breadcrumb & Controls */}
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
            <TableIcon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-emerald-300 block">
              MOA • MOB • QRH • AFM • SERA
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Tablas Operacionales de Referencia Rápida
            </h1>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-sky-100 max-w-3xl leading-relaxed">
          Consulta rápida de tablas oficiales de mínimos de planificación para aeródromos alternativos (Plan Básico y con Variaciones), acciones de memoria <strong>Memory Items del E195-E2</strong>, envolvente de limitaciones, índice normativo del <strong>MOA Binter</strong> y mínimos <strong>VFR / Special VFR</strong>.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
          
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              selectedCategory === 'all'
                ? 'bg-sky-500 text-white shadow-glow-sky'
                : 'bg-[#0e1933] text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <span>Todas las Tablas</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/30 font-mono">
              {counts.all}
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory('alternates')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              selectedCategory === 'alternates'
                ? 'bg-emerald-600 text-white shadow-glow-emerald'
                : 'bg-[#0e1933] text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Alternativos (Básico & Variaciones)</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/30 font-mono">
              {counts.alternates}
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory('memory-items')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              selectedCategory === 'memory-items'
                ? 'bg-rose-600 text-white shadow-glow-rose'
                : 'bg-[#0e1933] text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>Memory Items E195-E2</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/30 font-mono">
              {counts.memoryItems}
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory('limitations')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              selectedCategory === 'limitations'
                ? 'bg-amber-600 text-white shadow-glow-amber'
                : 'bg-[#0e1933] text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Limitaciones E2</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/30 font-mono">
              {counts.limitations}
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory('moa')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              selectedCategory === 'moa'
                ? 'bg-sky-600 text-white shadow-glow-sky'
                : 'bg-[#0e1933] text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Capítulos MOA</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/30 font-mono">
              {counts.moa}
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory('vfr')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              selectedCategory === 'vfr'
                ? 'bg-yellow-600 text-white shadow-md'
                : 'bg-[#0e1933] text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Mínimos VFR</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/30 font-mono">
              {counts.vfr}
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
            placeholder="Buscar por tabla, número de limitación, memory item, mínimos de alternativo, capítulo del MOA, clase de espacio aéreo..."
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

      {/* Tables Container */}
      <div className="space-y-6">
        {filteredTables.length === 0 ? (
          <div className="text-center py-16 bg-[#0e1933] border border-slate-800 rounded-3xl space-y-3">
            <Search className="w-10 h-10 text-slate-500 mx-auto" />
            <p className="text-base font-bold text-slate-300">No se encontraron tablas</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Prueba con otro término o selecciona otra categoría superior.
            </p>
          </div>
        ) : (
          filteredTables.map((table) => {
            const isExpanded = !!expandedTableIds[table.id];
            const theme = getCategoryTheme(table.category);

            return (
              <div
                key={table.id}
                className="bg-[#0b1426] border border-sky-500/20 hover:border-sky-500/40 rounded-3xl shadow-xl transition-all overflow-hidden"
              >
                {/* Header Row Clickable */}
                <div
                  onClick={() => toggleExpand(table.id)}
                  className="p-5 sm:p-6 cursor-pointer select-none flex items-start justify-between gap-4 group"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1.5 ${theme.badgeBg}`}>
                        {theme.icon}
                        <span>{theme.label}</span>
                      </span>

                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#070e1c] text-sky-400 border border-sky-500/30 font-semibold">
                        📖 {table.manualRef}
                      </span>

                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#070e1c] text-slate-400 border border-slate-800">
                        {table.rows.length} filas
                      </span>
                    </div>

                    <div>
                      <h2 className="text-lg sm:text-xl font-black text-white group-hover:text-sky-300 transition-colors">
                        {table.title}
                      </h2>
                      <p className="text-xs text-slate-300 font-medium">
                        {table.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 mt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyTable(table);
                      }}
                      className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-sky-400 text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1"
                      title="Copiar contenido de la tabla al portapapeles"
                    >
                      {copiedId === table.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[10px] text-emerald-300 font-bold hidden sm:inline">¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-[10px] font-bold hidden sm:inline">Copiar</span>
                        </>
                      )}
                    </button>

                    <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-sky-400 transition-colors">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Table Content */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-4 animate-fade-in">
                    
                    {/* Description */}
                    <div className="p-3.5 rounded-2xl bg-black/40 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                      <strong>Resumen Operacional:</strong> {table.description}
                    </div>

                    {/* Warning Alert if present */}
                    {table.warningAlert && (
                      <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200 flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-300 block">Atención Operativa / Requisito Crítico:</strong>
                          <span>{table.warningAlert}</span>
                        </div>
                      </div>
                    )}

                    {/* Actual HTML Table */}
                    <div className="overflow-x-auto rounded-2xl border border-slate-800 shadow-md">
                      <table className="w-full text-left text-xs border-collapse min-w-[650px]">
                        <thead>
                          <tr className="bg-[#09152b] border-b border-sky-500/30 text-sky-200 font-black">
                            {table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-3 font-mono text-[11px] uppercase tracking-wider">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/80">
                          {table.rows.map((row, rIdx) => (
                            <tr
                              key={rIdx}
                              className={`transition-colors ${
                                row.highlight
                                  ? 'bg-sky-950/20 hover:bg-sky-950/40'
                                  : 'bg-[#081022]/60 hover:bg-[#0c1833]'
                              }`}
                            >
                              <td className="p-3 font-semibold text-white">
                                <div className="space-y-1">
                                  <span>{row.col1}</span>
                                  {row.notes && (
                                    <span className="text-[10px] text-slate-400 block font-normal">
                                      ℹ️ {row.notes}
                                    </span>
                                  )}
                                </div>
                              </td>

                              <td className="p-3 font-mono font-bold text-emerald-300 whitespace-pre-line">
                                {row.col2}
                              </td>

                              {row.col3 !== undefined && (
                                <td className="p-3 text-slate-200 font-medium whitespace-pre-line">
                                  {row.col3}
                                </td>
                              )}

                              {row.col4 !== undefined && (
                                <td className="p-3 text-slate-300 font-medium whitespace-pre-line">
                                  {row.col4}
                                </td>
                              )}

                              {row.col5 !== undefined && (
                                <td className="p-3 text-slate-400 font-mono text-[11px] whitespace-pre-line">
                                  {row.col5}
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Extra Notes Footer */}
                    {table.extraNotes && table.extraNotes.length > 0 && (
                      <div className="p-3 rounded-2xl bg-black/30 border border-slate-800/60 space-y-1 text-[11px] text-slate-400 font-mono">
                        <strong className="text-slate-300 block font-bold">Notas de Aplicación:</strong>
                        <ul className="list-disc list-inside space-y-0.5">
                          {table.extraNotes.map((n, idx) => (
                            <li key={idx}>{n}</li>
                          ))}
                        </ul>
                      </div>
                    )}

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
