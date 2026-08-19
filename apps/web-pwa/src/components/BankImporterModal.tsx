import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, AlertTriangle, FileText, Upload, Play } from 'lucide-react';
import { Question } from '../types';
import { importCustomQuestions } from '../services/questionsService';

interface BankImporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (count: number) => void;
}

export const BankImporterModal: React.FC<BankImporterModalProps> = ({
  isOpen,
  onClose,
  onImportSuccess
}) => {
  const [rawText, setRawText] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successCount, setSuccessCount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleValidateAndImport = async () => {
    setErrorMsg(null);
    setSuccessCount(null);
    setIsProcessing(true);

    try {
      let cleaned = rawText.trim();
      // Remove markdown code block fences if present
      const match = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (match) {
        cleaned = match[1].trim();
      }

      if (!cleaned) {
        throw new Error('Por favor pega el código JSON antes de importar.');
      }

      const parsed = JSON.parse(cleaned);
      const items: Question[] = Array.isArray(parsed) ? parsed : [parsed];

      if (items.length === 0) {
        throw new Error('No se encontraron preguntas en el JSON proporcionado.');
      }

      // Validar campos requeridos y estructura mínima
      for (let i = 0; i < items.length; i++) {
        const q = items[i];
        if (!q.id || !q.stem || !q.options || !q.explanation) {
          throw new Error(`Pregunta #${i + 1} está incompleta (requiere id, stem, options, explanation).`);
        }
        const correctCount = q.options.filter((o) => o.is_correct === true).length;
        if (correctCount !== 1) {
          throw new Error(`Pregunta '${q.id}' tiene ${correctCount} opciones correctas (debe tener exactamente 1).`);
        }
      }

      // Guardar en base de datos local
      const savedCount = await importCustomQuestions(items);
      setSuccessCount(savedCount);
      onImportSuccess(savedCount);

    } catch (err: any) {
      setErrorMsg(err.message || 'Error de sintaxis JSON inválido.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-aviation-900 border border-aviation-700 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-aviation-800 flex items-center justify-between bg-aviation-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Importador Directo de Reactivos IA</h2>
              <p className="text-xs text-slate-400">Pega la salida JSON generada por Gemini o NotebookLM</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-aviation-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          
          <div className="p-3.5 rounded-xl bg-aviation-950 border border-aviation-800 text-xs text-slate-300 space-y-1">
            <span className="font-semibold text-sky-400">💡 Instrucciones rápidas:</span>
            <p>
              Copia el bloque JSON devuelto por Gemini o NotebookLM con el <strong>Metaprompt Maestro</strong> y pégalo a continuación. Se validará la estructura, opciones y referencias automáticamente.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              JSON de Preguntas:
            </label>
            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder={`[\n  {\n    "id": "BIN-MOA-001",\n    "subject_id": "binter_moa",\n    "learning_objective": "MOA 8.1",\n    "stem": "¿...?",\n    "options": [\n      { "id": "A", "text": "...", "is_correct": true },\n      { "id": "B", "text": "...", "is_correct": false }\n    ],\n    "explanation": { "text": "...", "references": ["MOA Cap 8"] }\n  }\n]`}
              rows={12}
              className="w-full p-4 rounded-xl bg-aviation-950 border border-aviation-700/80 text-white font-mono text-xs focus:outline-none focus:border-sky-500 custom-scrollbar"
            />
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successCount !== null && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>¡Se importaron y validaron <strong>{successCount}</strong> preguntas exitosamente! Ya están disponibles para estudio.</span>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-aviation-800 bg-aviation-950/80 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Cerrar
          </button>
          
          <button
            type="button"
            onClick={handleValidateAndImport}
            disabled={isProcessing || !rawText.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 disabled:opacity-50 text-white shadow-lg shadow-sky-500/25 active:scale-95 transition-all"
          >
            <Upload className="w-4 h-4" />
            <span>{isProcessing ? 'Validando...' : 'Validar & Guardar Reactivos'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
