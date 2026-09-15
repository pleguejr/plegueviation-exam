import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  FileText,
  Trash2,
  Copy,
  Check,
  Upload,
  AlertTriangle,
  CheckCircle2,
  Mail,
  ChevronDown,
  ChevronUp,
  Loader2
} from 'lucide-react';
import { OperationalComunicado } from '../types/operationalComunicados';
import { buildComunicadosPrompt } from '../data/comunicadosPrompt';
import {
  deleteOperationalComunicado,
  importComunicadosQuestions,
  listOperationalComunicados,
  saveOperationalComunicado
} from '../services/comunicadosOpsService';
import { extractTextFromPdf, titleFromPdfFileName } from '../utils/pdfTextExtractLazy';

interface ComunicadosOpsPanelProps {
  onBankCreated?: (questionIds: string[]) => void;
}

const COLLAPSE_KEY = 'plegue_comunicados_panel_open';

export const ComunicadosOpsPanel: React.FC<ComunicadosOpsPanelProps> = ({ onBankCreated }) => {
  const [items, setItems] = useState<OperationalComunicado[]>([]);
  const [open, setOpen] = useState(() => {
    try {
      return localStorage.getItem(COLLAPSE_KEY) === '1';
    } catch {
      return false;
    }
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [jsonText, setJsonText] = useState('');
  const [extracting, setExtracting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const refresh = async () => {
    const rows = await listOperationalComunicados();
    setItems(rows);
    return rows;
  };

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(COLLAPSE_KEY, open ? '1' : '0');
    } catch {
      /* ignore */
    }
  }, [open]);

  const selected = useMemo(
    () => items.find((i) => i.id === selectedId) || items[0] || null,
    [items, selectedId]
  );

  const clipboardPayload = useMemo(() => {
    if (!selected) return '';
    return buildComunicadosPrompt({
      title: selected.title,
      reference: selected.reference,
      typeLabel: 'comunicado operativo',
      issuedAt: selected.issuedAt,
      documentText: selected.extractedText
    });
  }, [selected]);

  const handleToggle = () => setOpen((v) => !v);

  const handlePdf = async (file: File | null) => {
    if (!file) return;
    if (!/\.pdf$/i.test(file.name)) {
      setError('Solo se admiten archivos PDF.');
      return;
    }

    setExtracting(true);
    setError(null);
    setMessage(null);
    setOpen(true);

    try {
      const extracted = await extractTextFromPdf(file);
      const saved = await saveOperationalComunicado({
        title: titleFromPdfFileName(file.name),
        type: 'comunicado-ops',
        reference: '',
        issuedAt: new Date().toISOString().slice(0, 10),
        summary: extracted.truncated
          ? `Texto extraído (${extracted.pages} págs., truncado).`
          : `Texto extraído (${extracted.pages} págs.).`,
        sourceFileName: file.name,
        extractedText: extracted.text,
        extractedPages: extracted.pages
      });
      const rows = await refresh();
      setSelectedId(saved.id);
      setMessage(
        `PDF listo (${extracted.pages} pág.). Pulsa «Copiar para Gemini» → pega en Gemini → vuelve y pega el JSON.`
      );
      if (!rows.find((r) => r.id === saved.id)) {
        setSelectedId(saved.id);
      }
    } catch (err: any) {
      setError(err?.message || 'No se pudo leer el PDF.');
    } finally {
      setExtracting(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const handleCopyForGemini = async () => {
    if (!selected) {
      setError('Sube primero un PDF.');
      return;
    }
    if (!selected.extractedText) {
      setError('Este registro no tiene texto extraído. Vuelve a subir el PDF.');
      return;
    }
    try {
      await navigator.clipboard.writeText(clipboardPayload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setMessage('Copiado (prompt + texto). Pégalo en Gemini, espera el JSON y pégalo abajo.');
    } catch {
      setError('No se pudo copiar al portapapeles.');
    }
  };

  const handleImport = async () => {
    setImporting(true);
    setError(null);
    setMessage(null);
    try {
      const result = await importComunicadosQuestions(jsonText, selected?.id);
      await refresh();
      setJsonText('');
      setMessage(`Importadas ${result.count} pregunta(s) en Comunicados Ops.`);
      onBankCreated?.(result.questionIds);
    } catch (err: any) {
      setError(err?.message || 'Error al importar el JSON.');
    } finally {
      setImporting(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteOperationalComunicado(id);
    if (selectedId === id) setSelectedId(null);
    await refresh();
    setMessage('Comunicado eliminado del registro.');
  };

  return (
    <section className={`ops-com-panel rounded-2xl border shadow-lg overflow-hidden ${open ? '' : 'ops-com-panel-collapsed'}`}>
      <button type="button" className="ops-com-header w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3" onClick={handleToggle}>
        <div className="space-y-1 min-w-0">
          <p className="ops-com-kicker text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" />
            Comunicados & notificaciones
          </p>
          <h2 className="ops-com-title text-base sm:text-lg font-extrabold tracking-tight">
            Banco desde PDF de empresa
          </h2>
          <p className="ops-com-sub text-[11px] leading-relaxed">
            {items.length} registrado(s) · flujo rápido: subir PDF → copiar a Gemini → pegar JSON
          </p>
        </div>
        <span className="ops-com-chevron shrink-0 mt-1" aria-hidden>
          {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </span>
      </button>

      {open && (
        <div className="ops-com-body px-4 sm:px-5 pb-5 space-y-4 border-t">
          <p className="ops-com-sub text-[11px] leading-relaxed">
            Lo más eficiente <strong>sin conectar tu correo</strong>: 2 gestos en la app + 1 en Gemini. Subir el PDF aquí
            extrae el texto; «Copiar para Gemini» lleva prompt y documento juntos.
          </p>

          {(message || error) && (
            <div className={`ops-com-alert ${error ? 'ops-com-alert-error' : 'ops-com-alert-ok'}`}>
              {error ? <AlertTriangle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
              <span>{error || message}</span>
            </div>
          )}

          <div className="ops-com-fast-grid">
            <div className="ops-com-dropzone">
              <input
                ref={fileRef}
                type="file"
                accept="application/pdf,.pdf"
                className="hidden"
                onChange={(e) => handlePdf(e.target.files?.[0] || null)}
              />
              <button
                type="button"
                className="ops-com-drop-btn"
                disabled={extracting}
                onClick={() => fileRef.current?.click()}
              >
                {extracting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                <span className="font-black text-sm">{extracting ? 'Extrayendo texto…' : '1 · Subir PDF del correo'}</span>
                <span className="text-[11px] opacity-80">Se procesa solo en tu dispositivo</span>
              </button>
            </div>

            <button
              type="button"
              className="ops-com-btn ops-com-btn-copy ops-com-fast-btn"
              disabled={!selected?.extractedText || extracting}
              onClick={handleCopyForGemini}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copiado' : '2 · Copiar para Gemini'}
            </button>
          </div>

          <div className="ops-com-import-box rounded-xl border p-3 space-y-2">
            <h3 className="ops-com-section-title text-xs font-black uppercase tracking-wide">3 · Pegar JSON de Gemini</h3>
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              rows={6}
              className="ops-com-json"
              placeholder="Pega aquí el array JSON que te devolvió Gemini…"
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

          {items.length > 0 && (
            <div className="space-y-2">
              <h3 className="ops-com-section-title text-xs font-black uppercase tracking-wide">Registro reciente</h3>
              {items.map((item) => (
                <article
                  key={item.id}
                  className={`ops-com-card rounded-xl border p-3 space-y-1 ${
                    selected?.id === item.id ? 'ops-com-card-active' : ''
                  }`}
                  onClick={() => setSelectedId(item.id)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="ops-com-meta">{item.issuedAt}</span>
                        {item.sourceFileName && (
                          <span className="ops-com-meta flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {item.sourceFileName}
                          </span>
                        )}
                        {item.extractedPages ? <span className="ops-com-meta">{item.extractedPages} pág.</span> : null}
                        {item.importedQuestionCount > 0 && (
                          <span className="ops-com-badge ops-com-badge-imported">{item.importedQuestionCount} Qs</span>
                        )}
                      </div>
                      <h4 className="ops-com-card-title text-sm font-black leading-snug">{item.title}</h4>
                    </div>
                    <button
                      type="button"
                      className="ops-com-icon-btn ops-com-icon-btn-danger"
                      title="Eliminar"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
