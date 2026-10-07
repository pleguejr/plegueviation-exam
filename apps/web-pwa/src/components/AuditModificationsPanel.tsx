import React, { useEffect, useState } from 'react';
import {
  Wrench,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import {
  AuditModificationItem,
  TargetModule,
  ModificationPriority,
  getAuditModifications,
  saveAuditModification,
  deleteAuditModification,
  toggleAuditModificationStatus,
  clearCompletedModifications,
  generateAuditDirectivesMarkdown
} from '../services/auditModificationsService';

interface AuditModificationsPanelProps {
  onUpdate?: () => void;
}

export const AuditModificationsPanel: React.FC<AuditModificationsPanelProps> = ({ onUpdate }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<AuditModificationItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetModule, setTargetModule] = useState<TargetModule>('command-upgrade');
  const [priority, setPriority] = useState<ModificationPriority>('high');

  const refresh = () => {
    const list = getAuditModifications();
    setItems(list);
    onUpdate?.();
  };

  useEffect(() => {
    refresh();
  }, []);

  const pendingCount = items.filter((x) => x.status !== 'completed').length;
  const completedCount = items.filter((x) => x.status === 'completed').length;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    saveAuditModification({
      title: title.trim(),
      description: description.trim() || undefined,
      targetModule,
      priority,
      status: 'pending'
    });

    setTitle('');
    setDescription('');
    setShowForm(false);
    refresh();
  };

  const handleDelete = (id: string) => {
    deleteAuditModification(id);
    refresh();
  };

  const handleToggleStatus = (id: string) => {
    toggleAuditModificationStatus(id);
    refresh();
  };

  const handleClearCompleted = () => {
    clearCompletedModifications();
    refresh();
  };

  const handleCopyDirectives = () => {
    const md = generateAuditDirectivesMarkdown(items);
    navigator.clipboard.writeText(md).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const getModuleLabel = (mod: TargetModule) => {
    switch (mod) {
      case 'command-upgrade':
        return 'Command Upgrade';
      case 'fleet-e195e2':
        return 'Flota E195-E2';
      case 'netjets':
        return 'NetJets / EASA';
      case 'operational-tables':
        return 'Tablas Operativas';
      case 'p2010':
        return 'Tecnam P2010';
      case 'c172n':
        return 'Cessna 172N';
      default:
        return 'General';
    }
  };

  return (
    <section className={`audit-mod-panel rounded-2xl border shadow-lg overflow-hidden ${open ? '' : 'audit-mod-panel-collapsed'}`}>
      {/* Header Button */}
      <button
        type="button"
        className="audit-mod-header w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3"
        onClick={() => setOpen(!open)}
      >
        <div className="space-y-1 min-w-0">
          <p className="audit-mod-kicker text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
            <span>Peticiones & Auditoría Continua</span>
          </p>
          <h2 className="audit-mod-title text-base sm:text-lg font-extrabold tracking-tight">
            Modificaciones & Mejoras para la Auditoría
          </h2>
          <p className="audit-mod-sub text-[11px] leading-relaxed">
            {pendingCount} pendiente(s) · {completedCount} completada(s) · Las directrices anotadas aquí se integran automáticamente en la auditoría
          </p>
        </div>
        <span className="audit-mod-chevron shrink-0 mt-1" aria-hidden>
          {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </span>
      </button>

      {open && (
        <div className="audit-mod-body px-4 sm:px-5 pb-5 space-y-4 border-t">
          <p className="audit-mod-sub text-[11px] leading-relaxed pt-3">
            Añade aquí las <strong>correcciones, ampliaciones de preguntas o ajustes normativos</strong> que desees aplicar.
            Al pulsar <strong>«Copiar Directrices para Auditoría»</strong>, se genera un prompt estructurado para que el agente auditor las implemente de inmediato junto con la verificación regular.
          </p>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="audit-mod-btn audit-mod-btn-primary"
                onClick={() => setShowForm(!showForm)}
              >
                <Plus className="w-4 h-4" />
                <span>{showForm ? 'Ocultar Formulario' : 'Nueva Petición'}</span>
              </button>

              {completedCount > 0 && (
                <button
                  type="button"
                  className="audit-mod-btn audit-mod-btn-secondary text-xs"
                  onClick={handleClearCompleted}
                  title="Eliminar tareas completadas del listado"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Limpiar completadas ({completedCount})</span>
                </button>
              )}
            </div>

            <button
              type="button"
              className="audit-mod-btn audit-mod-btn-copy"
              onClick={handleCopyDirectives}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '¡Directrices Copiadas!' : 'Copiar Directrices para Auditoría'}</span>
            </button>
          </div>

          {/* New Item Form */}
          {showForm && (
            <form onSubmit={handleAdd} className="audit-mod-form rounded-xl border p-4 space-y-3">
              <h3 className="audit-mod-section-title text-xs font-black uppercase tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Definir Nueva Mejora / Modificación</span>
              </h3>

              <div>
                <label className="audit-mod-label block text-[11px] font-bold mb-1">
                  Título de la Petición / Modificación *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Añadir 20 preguntas de fallos de motor en despegue según QRH..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="audit-mod-input w-full px-3 py-2 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="audit-mod-label block text-[11px] font-bold mb-1">
                    Módulo / Banco Destino
                  </label>
                  <select
                    value={targetModule}
                    onChange={(e) => setTargetModule(e.target.value as TargetModule)}
                    className="audit-mod-input w-full px-3 py-2 rounded-lg text-xs"
                  >
                    <option value="command-upgrade">Command Upgrade (MOA / Binter)</option>
                    <option value="fleet-e195e2">Flota Embraer 195-E2</option>
                    <option value="netjets">NetJets & EASA Air Ops</option>
                    <option value="operational-tables">Tablas Operativas (SOP & Minima)</option>
                    <option value="p2010">Tecnam P2010 TDI</option>
                    <option value="c172n">Cessna 172N</option>
                    <option value="general">General / App</option>
                  </select>
                </div>

                <div>
                  <label className="audit-mod-label block text-[11px] font-bold mb-1">
                    Prioridad de Ejecución
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as ModificationPriority)}
                    className="audit-mod-input w-full px-3 py-2 rounded-lg text-xs"
                  >
                    <option value="urgent">🔴 Urgente (Primer orden en la auditoría)</option>
                    <option value="high">🟠 Alta (Prioridad estándar)</option>
                    <option value="normal">🟡 Normal (Mejora progresiva)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="audit-mod-label block text-[11px] font-bold mb-1">
                  Detalles, Capítulos del Manual o Instrucciones Adicionales (Opcional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ej: Enfocarse en MOA 8.2.1 respecto a interfonía y precauciones con pasaje a bordo..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="audit-mod-input w-full px-3 py-2 rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="audit-mod-btn audit-mod-btn-secondary text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="audit-mod-btn audit-mod-btn-primary text-xs"
                >
                  Guardar Petición
                </button>
              </div>
            </form>
          )}

          {/* List of Modification Items */}
          <div className="space-y-2 pt-1">
            {items.length === 0 ? (
              <div className="audit-mod-empty rounded-xl border p-6 text-center text-xs space-y-2">
                <Clock className="w-6 h-6 mx-auto text-slate-400 opacity-60" />
                <p className="font-bold">No hay modificaciones ni directrices anotadas.</p>
                <p className="text-[11px] opacity-80">
                  Pulsa en «Nueva Petición» para añadir mejoras que se incluirán en la auditoría.
                </p>
              </div>
            ) : (
              items.map((item) => {
                const isDone = item.status === 'completed';
                return (
                  <div
                    key={item.id}
                    className={`audit-mod-item rounded-xl border p-3.5 transition-all flex items-start justify-between gap-3 ${
                      isDone ? 'audit-mod-item-done opacity-75' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(item.id)}
                        className="mt-0.5 shrink-0 text-slate-400 hover:text-emerald-400 transition-colors"
                        title={isDone ? 'Marcar como pendiente' : 'Marcar como completada'}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-slate-500 hover:border-emerald-400" />
                        )}
                      </button>

                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span
                            className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${
                              item.priority === 'urgent'
                                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                : item.priority === 'high'
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                : 'bg-slate-700/50 text-slate-300 border-slate-600'
                            }`}
                          >
                            {item.priority === 'urgent' ? 'Urgente' : item.priority === 'high' ? 'Alta' : 'Normal'}
                          </span>

                          <span className="audit-mod-module-chip text-[9px] font-mono px-2 py-0.5 rounded-full border">
                            {getModuleLabel(item.targetModule)}
                          </span>

                          {isDone && (
                            <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                              Implementado ✓
                            </span>
                          )}
                        </div>

                        <h4 className={`text-xs font-bold leading-snug ${isDone ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                          {item.title}
                        </h4>

                        {item.description && (
                          <p className="audit-mod-item-desc text-[11px] leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="text-slate-500 hover:text-rose-400 p-1 rounded-lg transition-colors shrink-0"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </section>
  );
};
