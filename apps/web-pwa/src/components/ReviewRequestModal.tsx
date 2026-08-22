import React, { useState } from 'react';
import { Search, X, CheckCircle2, AlertCircle, MessageSquare, BookOpen, ShieldAlert, Sparkles } from 'lucide-react';
import { Question } from '../types';
import { saveReviewRequest } from '../services/db';

interface ReviewRequestModalProps {
  question: Question | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
}

const REASON_CATEGORIES = [
  {
    id: 'numerical_error',
    label: '🔢 Errata en datos numéricos / límites / velocidades',
    desc: 'Cifras de velocidades, pesos, altitudes o tiempos discrepantes con el manual.'
  },
  {
    id: 'acronym_error',
    label: '🔤 Sigla, acrónimo o mnemónico inexacto o incompleto',
    desc: 'Desglose de mnemónico (RETSE, E-DALTA, IMFLOCC, TELSI) o término confuso.'
  },
  {
    id: 'distractor_ambiguity',
    label: '⚖️ Opciones o distractores ambiguos / poco claros',
    desc: 'Distractores casi idénticos, redactados confusamente o más de una opción válida.'
  },
  {
    id: 'manual_reference',
    label: '📖 Explicación o referencia documental incompleta',
    desc: 'Falta la tabla oficial en la explicación o cita un capítulo desactualizado.'
  },
  {
    id: 'fleet_not_applicable',
    label: '✈️ No aplicable a la operativa real (E195-E2 / Binter / P2010 / C172N)',
    desc: 'Procedimiento o sistema no correspondiente a la flota de la compañía.'
  },
  {
    id: 'other',
    label: '💬 Otro motivo / Sugerencia de mejora',
    desc: 'Cualquier otra observación para el equipo de auditoría técnica.'
  }
];

export const ReviewRequestModal: React.FC<ReviewRequestModalProps> = ({
  question,
  isOpen,
  onClose,
  onSubmitSuccess
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(REASON_CATEGORIES[0].id);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !question) return null;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const selectedCategoryObj = REASON_CATEGORIES.find((c) => c.id === selectedCategory);
      await saveReviewRequest(
        question,
        selectedCategoryObj ? selectedCategoryObj.label : selectedCategory,
        comment.trim() || undefined
      );
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setComment('');
        onClose();
        if (onSubmitSuccess) onSubmitSuccess();
      }, 1200);
    } catch (err) {
      console.warn('Error saving review request:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-sans">
      <div className="bg-[#0e1933] border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0 shadow-glow-amber">
            <Search className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <span>Reportar Pregunta para Revisión</span>
            </h2>
            <div className="flex items-center gap-2">
              <span className="font-mono text-amber-400 font-bold text-xs px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                {question.id}
              </span>
              <span className="text-slate-500 text-xs">•</span>
              <span className="text-slate-400 font-mono text-[11px] truncate max-w-[200px]">
                {question.learning_objective}
              </span>
            </div>
          </div>
        </div>

        {/* Question Preview */}
        <div className="p-3.5 rounded-2xl bg-black/40 border border-slate-800 space-y-1">
          <p className="text-xs text-slate-300 font-medium line-clamp-2 leading-relaxed">
            "{question.stem}"
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-2 animate-fade-in">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-sm font-bold text-white">¡Pregunta Registrada para Auditoría!</h3>
            <p className="text-xs text-emerald-200">
              Se ha guardado en la cola de revisión técnica para ser cotejada con el manual oficial.
            </p>
          </div>
        ) : (
          <>
            {/* Reason Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">
                Motivo principal de la revisión:
              </label>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {REASON_CATEGORIES.map((cat) => (
                  <label
                    key={cat.id}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-start gap-2.5 transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-amber-500/20 border-amber-400/60 text-white'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reviewCategory"
                      checked={selectedCategory === cat.id}
                      onChange={() => setSelectedCategory(cat.id)}
                      className="mt-0.5 text-amber-500 focus:ring-amber-400"
                    />
                    <div>
                      <p className="font-bold leading-tight">{cat.label}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{cat.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Comment Textarea */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>Observaciones del piloto <span className="text-slate-500 font-normal">(opcional)</span>:</span>
              </label>
              <textarea
                rows={2}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Ej: En la tabla del MOA 8.3 la altitud mínima es de 1000 ft en vez de 800 ft..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-amber-400 font-sans resize-none"
              />
            </div>

            {/* Auditoria Notice */}
            <div className="p-3.5 rounded-2xl bg-[#09152e] border border-sky-500/30 text-[11px] text-sky-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-sky-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Integración con Auditoría & Depuración</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[10px]">
                Esta solicitud se archiva en la base de datos local. Cuando mandes ejecutar <strong>"auditoría"</strong> en el chat del agente, se comprobarán todas las preguntas reportadas y se cotejarán con los manuales oficiales de Binter y el fabricante.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-glow-amber transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
              >
                <Search className="w-4 h-4" />
                <span>{isSubmitting ? 'Guardando...' : 'Guardar para Auditoría'}</span>
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
