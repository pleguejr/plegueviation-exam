import React, { useState } from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import { Question } from '../types';

interface DeleteConfirmModalProps {
  question: Question | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (question: Question, reason?: string) => Promise<void> | void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  question,
  isOpen,
  onClose,
  onConfirm
}) => {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !question) return null;

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      await onConfirm(question, reason.trim() || undefined);
      setReason('');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-sans">
      <div className="bg-[#0e1933] border border-rose-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 flex-shrink-0 shadow-glow-rose">
            <Trash2 className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <span>Eliminar Pregunta del Banco</span>
            </h2>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sky-400 font-bold text-xs px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20">
                {question.id}
              </span>
              <span className="text-slate-500 text-xs">•</span>
              <span className="text-slate-400 font-mono text-[11px] truncate max-w-[200px]">
                {question.learning_objective}
              </span>
            </div>
          </div>
        </div>

        {/* Question preview */}
        <div className="p-4 rounded-2xl bg-black/40 border border-slate-800 space-y-2">
          <p className="text-xs text-slate-300 font-medium line-clamp-3 leading-relaxed">
            "{question.stem}"
          </p>
        </div>

        {/* Operational Warning Notice */}
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 space-y-2 text-xs text-rose-200">
          <div className="flex items-center gap-2 font-bold text-rose-400">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>Exclusión permanente de exámenes</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-300">
            Esta pregunta <strong>no volverá a repetirse</strong> en ningún simulacro ni test posterior. Se guardará en tu registro de preguntas eliminadas y podrás consultarla o recuperarla en cualquier momento.
          </p>
        </div>

        {/* Reason / Feedback Input (Optional) */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">
            Motivo de descarte <span className="text-slate-500 font-normal">(opcional)</span>:
          </label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Ej: Errata en opciones, ambigua, no aplicable a E195-E2..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 font-sans"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-xl text-xs font-black bg-rose-600 hover:bg-rose-500 text-white shadow-glow-rose transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
            <span>{isSubmitting ? 'Eliminando...' : 'Eliminar Definitivamente'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
