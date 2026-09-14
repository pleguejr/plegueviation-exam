import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  Table as TableIcon,
  Compass,
  Flame,
  BookOpen,
  Sun,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Scale
} from 'lucide-react';
import { OPERATIONAL_TABLES, OperationalTable } from '../../data/operationalTablesData';

interface OperationalTablesScreenProps {
  onBackToDashboard: () => void;
}

type TableCategory = 'all' | 'alternates' | 'memory-items' | 'limitations' | 'moa' | 'vfr';

function parseMemorySteps(raw: string): string[] {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^\d+[\.\)]\s*/, '').trim())
    .filter(Boolean);
}

export const OperationalTablesScreen: React.FC<OperationalTablesScreenProps> = ({ onBackToDashboard }) => {
  const [selectedCategory, setSelectedCategory] = useState<TableCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTableIds, setExpandedTableIds] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    OPERATIONAL_TABLES.forEach((t) => {
      initial[t.id] = true;
    });
    return initial;
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedTableIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    OPERATIONAL_TABLES.forEach((t) => {
      all[t.id] = true;
    });
    setExpandedTableIds(all);
  };

  const collapseAll = () => {
    setExpandedTableIds({});
  };

  const handleCopyTable = (table: OperationalTable) => {
    const headerLine = table.headers.join(' | ');
    const rowLines = table.rows
      .map((r) => [r.col1, r.col2, r.col3, r.col4, r.col5].filter(Boolean).join(' | '))
      .join('\n');
    const fullText = `${table.title} (${table.manualRef})\n\n${headerLine}\n${rowLines}`;

    navigator.clipboard.writeText(fullText).then(() => {
      setCopiedId(table.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const filteredTables = useMemo(() => {
    return OPERATIONAL_TABLES.filter((t) => {
      if (selectedCategory !== 'all' && t.category !== selectedCategory) {
        return false;
      }

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const inTitle = t.title.toLowerCase().includes(q);
        const inSub = t.subtitle.toLowerCase().includes(q);
        const inRef = t.manualRef.toLowerCase().includes(q);
        const inDesc = t.description.toLowerCase().includes(q);
        const inHeaders = t.headers.some((h) => h.toLowerCase().includes(q));
        const inRows = t.rows.some(
          (r) =>
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

  const counts = useMemo(
    () => ({
      all: OPERATIONAL_TABLES.length,
      alternates: OPERATIONAL_TABLES.filter((t) => t.category === 'alternates').length,
      memoryItems: OPERATIONAL_TABLES.filter((t) => t.category === 'memory-items').length,
      limitations: OPERATIONAL_TABLES.filter((t) => t.category === 'limitations').length,
      moa: OPERATIONAL_TABLES.filter((t) => t.category === 'moa').length,
      vfr: OPERATIONAL_TABLES.filter((t) => t.category === 'vfr').length
    }),
    []
  );

  const getCategoryTheme = (cat: OperationalTable['category']) => {
    switch (cat) {
      case 'alternates':
        return {
          label: 'Planificación Alternativos',
          icon: <Compass className="w-3.5 h-3.5" />,
          badgeClass: 'ops-tables-badge-alternates',
          cardClass: 'ops-tables-card-alternates'
        };
      case 'memory-items':
        return {
          label: 'Memory Items E195-E2',
          icon: <Flame className="w-3.5 h-3.5" />,
          badgeClass: 'ops-tables-badge-memory',
          cardClass: 'ops-tables-card-memory'
        };
      case 'limitations':
        return {
          label: 'Limitaciones & Números',
          icon: <Scale className="w-3.5 h-3.5" />,
          badgeClass: 'ops-tables-badge-limitations',
          cardClass: 'ops-tables-card-limitations'
        };
      case 'moa':
        return {
          label: 'Estructura MOA',
          icon: <BookOpen className="w-3.5 h-3.5" />,
          badgeClass: 'ops-tables-badge-moa',
          cardClass: 'ops-tables-card-moa'
        };
      case 'vfr':
        return {
          label: 'Mínimos VFR & SERA',
          icon: <Sun className="w-3.5 h-3.5" />,
          badgeClass: 'ops-tables-badge-vfr',
          cardClass: 'ops-tables-card-vfr'
        };
    }
  };

  const tabs: Array<{ id: TableCategory; label: string; count: number; activeClass: string; icon?: React.ReactNode }> = [
    { id: 'all', label: 'Todas las Tablas', count: counts.all, activeClass: 'ops-tables-tab-active-all' },
    {
      id: 'alternates',
      label: 'Alternativos (Básico & Variaciones)',
      count: counts.alternates,
      activeClass: 'ops-tables-tab-active-alternates',
      icon: <Compass className="w-3.5 h-3.5" />
    },
    {
      id: 'memory-items',
      label: 'Memory Items E195-E2',
      count: counts.memoryItems,
      activeClass: 'ops-tables-tab-active-memory',
      icon: <Flame className="w-3.5 h-3.5" />
    },
    {
      id: 'limitations',
      label: 'Limitaciones E2',
      count: counts.limitations,
      activeClass: 'ops-tables-tab-active-limitations',
      icon: <Scale className="w-3.5 h-3.5" />
    },
    {
      id: 'moa',
      label: 'Capítulos MOA',
      count: counts.moa,
      activeClass: 'ops-tables-tab-active-moa',
      icon: <BookOpen className="w-3.5 h-3.5" />
    },
    {
      id: 'vfr',
      label: 'Mínimos VFR',
      count: counts.vfr,
      activeClass: 'ops-tables-tab-active-vfr',
      icon: <Sun className="w-3.5 h-3.5" />
    }
  ];

  const renderMemoryActions = (raw: string) => {
    const steps = parseMemorySteps(raw);
    if (steps.length <= 1) {
      return <span className="ops-tables-cell-value">{raw}</span>;
    }
    return (
      <ol className="ops-tables-memory-steps">
        {steps.map((step, idx) => (
          <li key={`${idx}-${step.slice(0, 24)}`} className="ops-tables-memory-step">
            <span className="ops-tables-memory-step-num" aria-hidden>
              {idx + 1}
            </span>
            <span className="ops-tables-memory-step-text">{step}</span>
          </li>
        ))}
      </ol>
    );
  };

  return (
    <div className="ops-tables-screen max-w-6xl mx-auto space-y-6 pb-24 font-sans animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sky-500/20">
        <button type="button" onClick={onBackToDashboard} className="ops-tables-breadcrumb flex items-center gap-2 self-start group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Volver al Centro de Control</span>
        </button>

        <div className="flex items-center gap-2">
          <button type="button" onClick={expandAll} className="ops-tables-toolbar-btn">
            Expandir Todas
          </button>
          <button type="button" onClick={collapseAll} className="ops-tables-toolbar-btn">
            Contraer Todas
          </button>
        </div>
      </div>

      <div className="ops-tables-hero rounded-3xl p-6 sm:p-8 space-y-3 relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="ops-tables-hero-icon w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner">
            <TableIcon className="w-6 h-6" />
          </div>
          <div>
            <span className="ops-tables-hero-kicker text-[11px] font-mono font-bold tracking-widest uppercase block">
              MOA • MOB • QRH • AFM • SERA
            </span>
            <h1 className="ops-tables-hero-title text-2xl sm:text-3xl font-black tracking-tight">
              Tablas Operacionales de Referencia Rápida
            </h1>
          </div>
        </div>

        <p className="ops-tables-hero-sub text-xs sm:text-sm max-w-3xl leading-relaxed">
          Consulta rápida de tablas oficiales de mínimos de planificación para aeródromos alternativos (Plan Básico y con
          Variaciones), acciones de memoria <strong>Memory Items del E195-E2</strong>, envolvente de limitaciones, índice
          normativo del <strong>MOA Binter</strong> y mínimos <strong>VFR / Special VFR</strong>.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCategory(tab.id)}
              className={`ops-tables-tab ${selectedCategory === tab.id ? tab.activeClass : ''}`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <span className="ops-tables-tab-count">{tab.count}</span>
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por tabla, número de limitación, memory item, mínimos de alternativo, capítulo del MOA, clase de espacio aéreo..."
            className="ops-tables-search"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {filteredTables.length === 0 ? (
          <div className="ops-tables-empty space-y-3">
            <Search className="w-10 h-10 text-slate-500 mx-auto" />
            <p className="text-base font-bold">No se encontraron tablas</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Prueba con otro término o selecciona otra categoría superior.
            </p>
          </div>
        ) : (
          filteredTables.map((table) => {
            const isExpanded = !!expandedTableIds[table.id];
            const theme = getCategoryTheme(table.category);
            const isMemoryTable = table.category === 'memory-items';

            return (
              <article key={table.id} className={`ops-tables-card ${theme.cardClass}`}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleExpand(table.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleExpand(table.id);
                    }
                  }}
                  className="ops-tables-card-header group"
                >
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`ops-tables-badge ${theme.badgeClass}`}>
                        {theme.icon}
                        <span>{theme.label}</span>
                      </span>
                      <span className="ops-tables-meta">📖 {table.manualRef}</span>
                      <span className="ops-tables-meta ops-tables-meta-muted">{table.rows.length} filas</span>
                    </div>

                    <div>
                      <h2 className="ops-tables-card-title group-hover:opacity-90 transition-opacity">{table.title}</h2>
                      <p className="ops-tables-card-subtitle">{table.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 mt-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyTable(table);
                      }}
                      className="ops-tables-icon-btn"
                      title="Copiar contenido de la tabla al portapapeles"
                    >
                      {copiedId === table.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-[10px] text-emerald-300 font-bold hidden sm:inline">¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-bold hidden sm:inline">Copiar</span>
                        </>
                      )}
                    </button>

                    <div className="ops-tables-chevron">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="ops-tables-card-body animate-fade-in">
                    <div className="ops-tables-summary">
                      <strong>Resumen Operacional:</strong> {table.description}
                    </div>

                    {table.warningAlert && (
                      <div className="ops-tables-warning">
                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block">Atención Operativa / Requisito Crítico:</strong>
                          <span>{table.warningAlert}</span>
                        </div>
                      </div>
                    )}

                    <div className="ops-tables-table-wrap">
                      <table className="ops-tables-table">
                        <thead>
                          <tr>
                            {table.headers.map((h, hIdx) => (
                              <th key={hIdx}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className={row.highlight ? 'ops-tables-row-highlight' : undefined}>
                              <td>
                                <div className="ops-tables-cell-primary space-y-1">
                                  <span>{row.col1}</span>
                                  {row.notes && <span className="ops-tables-cell-notes">ℹ️ {row.notes}</span>}
                                </div>
                              </td>

                              <td>{isMemoryTable ? renderMemoryActions(row.col2) : <span className="ops-tables-cell-value">{row.col2}</span>}</td>

                              {row.col3 !== undefined && (
                                <td>
                                  <span className="ops-tables-cell-muted">{row.col3}</span>
                                </td>
                              )}

                              {row.col4 !== undefined && (
                                <td>
                                  <span className="ops-tables-cell-muted">{row.col4}</span>
                                </td>
                              )}

                              {row.col5 !== undefined && (
                                <td>
                                  <span className="ops-tables-cell-muted font-mono text-[11px]">{row.col5}</span>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {table.extraNotes && table.extraNotes.length > 0 && (
                      <div className="ops-tables-notes space-y-1">
                        <strong className="block font-bold">Notas de Aplicación:</strong>
                        <ul className="list-disc list-inside space-y-0.5">
                          {table.extraNotes.map((n, idx) => (
                            <li key={idx}>{n}</li>
                          ))}
                        </ul>
                      </div>
                    )}
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
