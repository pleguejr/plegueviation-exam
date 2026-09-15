import React, { useEffect, useMemo, useState } from 'react';
import {
  BookMarked,
  NotebookPen,
  Plane,
  Plus,
  Trash2,
  Library,
  CheckCircle2,
  AlertTriangle,
  Pencil
} from 'lucide-react';
import {
  OPERATIONAL_EVENT_SOURCES,
  OperationalEvent,
  OperationalEventSource
} from '../types/operationalEvents';
import {
  createBankFromOperationalEvents,
  deleteOperationalEvent,
  listOperationalEvents,
  saveOperationalEvent
} from '../services/operationalEventsService';

interface OperationalEventsPanelProps {
  onBankCreated?: (questionIds: string[]) => void;
}

const emptyForm = () => ({
  id: undefined as string | undefined,
  title: '',
  source: 'vuelo-real' as OperationalEventSource,
  aircraft: 'Embraer 195-E2',
  occurredAt: new Date().toISOString().slice(0, 10),
  narrative: '',
  lesson: '',
  tagsText: ''
});

export const OperationalEventsPanel: React.FC<OperationalEventsPanelProps> = ({ onBankCreated }) => {
  const [events, setEvents] = useState<OperationalEvent[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [banking, setBanking] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const refresh = async () => {
    const rows = await listOperationalEvents();
    setEvents(rows);
  };

  useEffect(() => {
    refresh();
  }, []);

  const unlinkedCount = useMemo(() => events.filter((e) => !e.linkedQuestionId).length, [events]);

  const resetForm = () => {
    setForm(emptyForm());
    setShowForm(false);
    setError(null);
  };

  const handleEdit = (event: OperationalEvent) => {
    setForm({
      id: event.id,
      title: event.title,
      source: event.source,
      aircraft: event.aircraft,
      occurredAt: event.occurredAt,
      narrative: event.narrative,
      lesson: event.lesson,
      tagsText: event.tags.join(', ')
    });
    setShowForm(true);
    setMessage(null);
    setError(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      await saveOperationalEvent({
        id: form.id,
        title: form.title,
        source: form.source,
        aircraft: form.aircraft,
        occurredAt: form.occurredAt,
        narrative: form.narrative,
        lesson: form.lesson,
        tags: form.tagsText.split(/[,;#]/).map((t) => t.trim()).filter(Boolean)
      });
      await refresh();
      resetForm();
      setMessage(form.id ? 'Vivencia actualizada.' : 'Vivencia guardada en la bitácora.');
    } catch (err: any) {
      setError(err?.message || 'No se pudo guardar la vivencia.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteOperationalEvent(id);
    await refresh();
    setMessage('Vivencia eliminada.');
  };

  const handleCreateBank = async () => {
    setBanking(true);
    setError(null);
    setMessage(null);
    try {
      const result = await createBankFromOperationalEvents({ onlyUnlinked: true });
      await refresh();
      if (result.created === 0) {
        setMessage('No hay vivencias pendientes de convertir. Todas ya tienen reactivo vinculado.');
      } else {
        setMessage(`Banco actualizado: ${result.created} reactivo(s) en categoría Vivencias Ops.`);
        onBankCreated?.(result.questionIds);
      }
    } catch (err: any) {
      setError(err?.message || 'No se pudo crear el banco desde vivencias.');
    } finally {
      setBanking(false);
    }
  };

  const sourceLabel = (source: OperationalEventSource) =>
    OPERATIONAL_EVENT_SOURCES.find((s) => s.id === source)?.label || source;

  return (
    <section className="ops-events-panel rounded-2xl border p-4 sm:p-5 shadow-lg space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="ops-events-kicker text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
            <NotebookPen className="w-3.5 h-3.5" />
            Bitácora operativa
          </p>
          <h2 className="ops-events-title text-base sm:text-lg font-extrabold tracking-tight">
            Vivencias de vuelo y simulador
          </h2>
          <p className="ops-events-sub text-[11px] leading-relaxed max-w-2xl">
            Registra eventos reales o de simulador y conviértelos en un banco de preguntas personalizado
            (categoría <strong>Vivencias Ops</strong>).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setShowForm(true);
              setForm(emptyForm());
              setError(null);
              setMessage(null);
            }}
            className="ops-events-btn ops-events-btn-primary"
          >
            <Plus className="w-3.5 h-3.5" />
            Nueva vivencia
          </button>
          <button
            type="button"
            onClick={handleCreateBank}
            disabled={banking || unlinkedCount === 0}
            className="ops-events-btn ops-events-btn-bank"
            title={unlinkedCount === 0 ? 'No hay vivencias pendientes' : `Convertir ${unlinkedCount} vivencia(s)`}
          >
            <Library className="w-3.5 h-3.5" />
            {banking ? 'Creando…' : `Crear banco (${unlinkedCount})`}
          </button>
        </div>
      </div>

      {(message || error) && (
        <div className={`ops-events-alert ${error ? 'ops-events-alert-error' : 'ops-events-alert-ok'}`}>
          {error ? <AlertTriangle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
          <span>{error || message}</span>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSave} className="ops-events-form space-y-3 rounded-xl border p-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="ops-events-field sm:col-span-2">
              <span>Título del evento</span>
              <input
                required
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Ej: CABIN ALT HI en descenso a GCLP"
              />
            </label>
            <label className="ops-events-field">
              <span>Contexto</span>
              <select
                value={form.source}
                onChange={(e) => setForm((f) => ({ ...f, source: e.target.value as OperationalEventSource }))}
              >
                {OPERATIONAL_EVENT_SOURCES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="ops-events-field">
              <span>Fecha</span>
              <input
                type="date"
                value={form.occurredAt}
                onChange={(e) => setForm((f) => ({ ...f, occurredAt: e.target.value }))}
              />
            </label>
            <label className="ops-events-field sm:col-span-2">
              <span>Aeronave / flota</span>
              <input
                value={form.aircraft}
                onChange={(e) => setForm((f) => ({ ...f, aircraft: e.target.value }))}
                placeholder="Embraer 195-E2"
              />
            </label>
            <label className="ops-events-field sm:col-span-2">
              <span>Qué ocurrió</span>
              <textarea
                required
                rows={3}
                value={form.narrative}
                onChange={(e) => setForm((f) => ({ ...f, narrative: e.target.value }))}
                placeholder="Describe la situación, fase de vuelo, indicios y acciones tomadas…"
              />
            </label>
            <label className="ops-events-field sm:col-span-2">
              <span>Aprendizaje / acción clave (será la respuesta correcta del reactivo)</span>
              <textarea
                required
                rows={2}
                value={form.lesson}
                onChange={(e) => setForm((f) => ({ ...f, lesson: e.target.value }))}
                placeholder="Ej: Don masks 100%, comunicar y descender a 10.000 ft / MEA según Memory Items…"
              />
            </label>
            <label className="ops-events-field sm:col-span-2">
              <span>Tags (opcionales, separados por coma)</span>
              <input
                value={form.tagsText}
                onChange={(e) => setForm((f) => ({ ...f, tagsText: e.target.value }))}
                placeholder="presurización, memory items, GCLP"
              />
            </label>
          </div>
          <div className="flex flex-wrap gap-2 justify-end pt-1">
            <button type="button" onClick={resetForm} className="ops-events-btn">
              Cancelar
            </button>
            <button type="submit" disabled={saving} className="ops-events-btn ops-events-btn-primary">
              {saving ? 'Guardando…' : form.id ? 'Actualizar vivencia' : 'Guardar vivencia'}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-2.5">
        {events.length === 0 ? (
          <div className="ops-events-empty rounded-xl border px-4 py-6 text-center text-xs space-y-1">
            <BookMarked className="w-7 h-7 mx-auto opacity-50" />
            <p className="font-bold">Sin vivencias todavía</p>
            <p>Añade el primer evento de línea o simulador para empezar tu banco personal.</p>
          </div>
        ) : (
          events.map((event) => (
            <article key={event.id} className="ops-events-card rounded-xl border p-3.5 space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className={`ops-events-badge ops-events-badge-${event.source}`}>
                      {sourceLabel(event.source)}
                    </span>
                    <span className="ops-events-meta">{event.occurredAt}</span>
                    <span className="ops-events-meta flex items-center gap-1">
                      <Plane className="w-3 h-3" />
                      {event.aircraft}
                    </span>
                    {event.linkedQuestionId && (
                      <span className="ops-events-badge ops-events-badge-linked">En banco</span>
                    )}
                  </div>
                  <h3 className="ops-events-card-title text-sm font-black leading-snug">{event.title}</h3>
                  <p className="ops-events-card-body text-xs leading-relaxed">{event.narrative}</p>
                  <p className="ops-events-card-lesson text-xs leading-relaxed">
                    <strong>Clave:</strong> {event.lesson}
                  </p>
                  {event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {event.tags.map((tag) => (
                        <span key={tag} className="ops-events-tag">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button type="button" className="ops-events-icon-btn" title="Editar" onClick={() => handleEdit(event)}>
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    className="ops-events-icon-btn ops-events-icon-btn-danger"
                    title="Eliminar"
                    onClick={() => handleDelete(event.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};
