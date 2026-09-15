import React, { useEffect, useMemo, useState } from 'react';
import {
  FileText,
  Plus,
  Trash2,
  Pencil,
  Copy,
  Check,
  Upload,
  AlertTriangle,
  CheckCircle2,
  Mail,
  Sparkles,
  Library
} from 'lucide-react';
import {
  COMUNICADO_TYPES,
  ComunicadoType,
  OperationalComunicado
} from '../types/operationalComunicados';
import { buildComunicadosPrompt } from '../data/comunicadosPrompt';
import {
  deleteOperationalComunicado,
  importComunicadosQuestions,
  listOperationalComunicados,
  saveOperationalComunicado
} from '../services/comunicadosOpsService';

interface ComunicadosOpsPanelProps {
  onBankCreated?: (questionIds: string[]) => void;
}

const emptyForm = () => ({
  id: undefined as string | undefined,
  title: '',
  type: 'comunicado-ops' as ComunicadoType,
  reference: '',
  issuedAt: new Date().toISOString().slice(0, 10),
  summary: ''
});

export const ComunicadosOpsPanel: React.FC<ComunicadosOpsPanelProps> = ({ onBankCreated }) => {
  const [items, setItems] = useState<OperationalComunicado[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [jsonText, setJsonText] = useState('');
  const [saving, setSaving] = useState(false);
  const [importing, setImporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    const rows = await listOperationalComunicados();
    setItems(rows);
  };

  useEffect(() => {
    refresh();
  }, []);

  const selected = useMemo(
    () => items.find((i) => i.id === selectedId) || null,
    [items, selectedId]
  );

  const typeLabel = (type: ComunicadoType) =>
    COMUNICADO_TYPES.find((t) => t.id === type)?.label || type;

  const promptText = useMemo(
    () =>
      buildComunicadosPrompt({
        title: selected?.title || form.title,
        reference: selected?.reference || form.reference,
        typeLabel: typeLabel((selected?.type || form.type) as ComunicadoType),
        issuedAt: selected?.issuedAt || form.issuedAt
      }),
    [selected, form]
  );

  const resetForm = () => {
    setForm(emptyForm());
    setShowForm(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const saved = await saveOperationalComunicado({
        id: form.id,
        title: form.title,
        type: form.type,
        reference: form.reference,
        issuedAt: form.issuedAt,
        summary: form.summary
      });
      await refresh();
      setSelectedId(saved.id);
      resetForm();
      setMessage('Comunicado registrado. Copia el prompt, genera el JSON con el PDF y pégalo abajo.');
    } catch (err: any) {
      setError(err?.message || 'No se pudo guardar el comunicado.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: OperationalComunicado) => {
    setForm({
      id: item.id,
      title: item.title,
      type: item.type,
      reference: item.reference,
      issuedAt: item.issuedAt,
      summary: item.summary
    });
    setSelectedId(item.id);
    setShowForm(true);
    setError(null);
    setMessage(null);
  };

  const handleDelete = async (id: string) => {
    await deleteOperationalComunicado(id);
    if (selectedId === id) setSelectedId(null);
    await refresh();
    setMessage('Comunicado eliminado del registro (los reactivos ya importados permanecen en el banco).');
  };

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setMessage('Prompt copiado. Pégalo en Gemini/NotebookLM junto con el PDF.');
    } catch {
      setError('No se pudo copiar al portapapeles.');
    }
  };

  const handleImport = async () => {
    setImporting(true);
    setError(null);
    setMessage(null);
    try {
      const result = await importComunicadosQuestions(jsonText, selectedId || undefined);
      await refresh();
      setJsonText('');
      setMessage(`Importadas ${result.count} pregunta(s) en el banco Comunicados Ops.`);
      onBankCreated?.(result.questionIds);
    } catch (err: any) {
      setError(err?.message || 'Error al importar el JSON.');
    } finally {
      setImporting(false);
    }
  };

  return (
    <section className="ops-com-panel rounded-2xl border p-4 sm:p-5 shadow-lg space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="ops-com-kicker text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" />
            Comunicados & notificaciones
          </p>
          <h2 className="ops-com-title text-base sm:text-lg font-extrabold tracking-tight">
            Banco desde PDF de empresa
          </h2>
          <p className="ops-com-sub text-[11px] leading-relaxed max-w-3xl">
            Flujo óptimo cada vez que te llegue un PDF al correo: guardar el archivo → copiar el prompt → Gemini/NotebookLM
            con el PDF → pegar el JSON aquí. La app <strong>no lee tu correo</strong> (más seguro y rápido); los reactivos
            van a <strong>Comunicados Ops</strong> y se sincronizan como el resto del banco personalizado.
          </p>
        </div>
        <button
          type="button"
          className="ops-com-btn ops-com-btn-primary shrink-0"
          onClick={() => {
            setShowForm(true);
            setForm(emptyForm());
            setError(null);
            setMessage(null);
          }}
        >
          <Plus className="w-3.5 h-3.5" />
          Registrar comunicado
        </button>
      </div>

      <ol className="ops-com-steps grid grid-cols-1 sm:grid-cols-4 gap-2 text-[11px]">
        <li>
          <strong>1.</strong> Guarda el PDF (Drive / carpeta Comunicados).
        </li>
        <li>
          <strong>2.</strong> Copia el prompt de esta ventana.
        </li>
        <li>
          <strong>3.</strong> Sube el PDF a Gemini o NotebookLM + pega el prompt.
        </li>
        <li>
          <strong>4.</strong> Pega el JSON y valida — listo para estudiar.
        </li>
      </ol>

      {(message || error) && (
        <div className={`ops-com-alert ${error ? 'ops-com-alert-error' : 'ops-com-alert-ok'}`}>
          {error ? <AlertTriangle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
          <span>{error || message}</span>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSave} className="ops-com-form space-y-3 rounded-xl border p-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="ops-com-field sm:col-span-2">
              <span>Título</span>
              <input
                required
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Ej: Cambio de mínimos RFFS en aeródromos canarios"
              />
            </label>
            <label className="ops-com-field">
              <span>Tipo</span>
              <select
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as ComunicadoType }))}
              >
                {COMUNICADO_TYPES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="ops-com-field">
              <span>Fecha</span>
              <input
                type="date"
                value={form.issuedAt}
                onChange={(e) => setForm((f) => ({ ...f, issuedAt: e.target.value }))}
              />
            </label>
            <label className="ops-com-field sm:col-span-2">
              <span>Referencia / nº (opcional)</span>
              <input
                value={form.reference}
                onChange={(e) => setForm((f) => ({ ...f, reference: e.target.value }))}
                placeholder="Ej: COM-OPS-2026-014"
              />
            </label>
            <label className="ops-com-field sm:col-span-2">
              <span>Resumen breve (opcional)</span>
              <textarea
                rows={2}
                value={form.summary}
                onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
                placeholder="Qué cambia y a quién aplica…"
              />
            </label>
          </div>
          <div className="flex flex-wrap gap-2 justify-end">
            <button type="button" className="ops-com-btn" onClick={resetForm}>
              Cancelar
            </button>
            <button type="submit" disabled={saving} className="ops-com-btn ops-com-btn-primary">
              {saving ? 'Guardando…' : form.id ? 'Actualizar' : 'Guardar registro'}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="ops-com-section-title text-xs font-black uppercase tracking-wide">Registro</h3>
            <span className="ops-com-meta">{items.length} comunicado(s)</span>
          </div>
          {items.length === 0 ? (
            <div className="ops-com-empty rounded-xl border px-4 py-5 text-center text-xs space-y-1">
              <FileText className="w-7 h-7 mx-auto opacity-50" />
              <p className="font-bold">Sin comunicados registrados</p>
              <p>Registra el primero cuando te llegue el PDF al correo.</p>
            </div>
          ) : (
            items.map((item) => (
              <article
                key={item.id}
                className={`ops-com-card rounded-xl border p-3 space-y-1.5 cursor-pointer ${
                  selectedId === item.id ? 'ops-com-card-active' : ''
                }`}
                onClick={() => setSelectedId(item.id)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`ops-com-badge ops-com-badge-${item.type}`}>{typeLabel(item.type)}</span>
                      <span className="ops-com-meta">{item.issuedAt}</span>
                      {item.reference && <span className="ops-com-meta">{item.reference}</span>}
                      {item.importedQuestionCount > 0 && (
                        <span className="ops-com-badge ops-com-badge-imported">
                          {item.importedQuestionCount} Qs
                        </span>
                      )}
                    </div>
                    <h4 className="ops-com-card-title text-sm font-black leading-snug">{item.title}</h4>
                    {item.summary && <p className="ops-com-card-body text-xs leading-relaxed">{item.summary}</p>}
                  </div>
                  <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button type="button" className="ops-com-icon-btn" title="Editar" onClick={() => handleEdit(item)}>
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      className="ops-com-icon-btn ops-com-icon-btn-danger"
                      title="Eliminar"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="space-y-3">
          <div className="ops-com-prompt-box rounded-xl border p-3 space-y-2">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h3 className="ops-com-section-title text-xs font-black uppercase tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Prompt para Gemini / NotebookLM
              </h3>
              <button type="button" className="ops-com-btn ops-com-btn-copy" onClick={handleCopyPrompt}>
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copiado' : 'Copiar prompt'}
              </button>
            </div>
            <p className="text-[11px] ops-com-hint">
              {selected
                ? `Contexto: ${selected.title}${selected.reference ? ` (${selected.reference})` : ''}`
                : 'Selecciona un comunicado del registro (o rellena el formulario) para personalizar el prompt.'}
            </p>
            <pre className="ops-com-prompt-pre text-[10px] leading-relaxed max-h-40 overflow-auto whitespace-pre-wrap">
              {promptText}
            </pre>
          </div>

          <div className="ops-com-import-box rounded-xl border p-3 space-y-2">
            <h3 className="ops-com-section-title text-xs font-black uppercase tracking-wide flex items-center gap-1.5">
              <Library className="w-3.5 h-3.5" />
              Pegar JSON e importar
            </h3>
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              rows={8}
              className="ops-com-json"
              placeholder={`[\n  {\n    "id": "BIN-COM-001",\n    "subject_id": "binter_comunicados",\n    "stem": "…",\n    "options": [ … ],\n    "explanation": { "text": "…", "references": ["…"] }\n  }\n]`}
            />
            <button
              type="button"
              className="ops-com-btn ops-com-btn-primary w-full justify-center"
              disabled={importing || !jsonText.trim()}
              onClick={handleImport}
            >
              <Upload className="w-3.5 h-3.5" />
              {importing ? 'Importando…' : 'Validar & guardar en Comunicados Ops'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
