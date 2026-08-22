import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw, 
  ArrowLeft, 
  Clock, 
  FileText, 
  Bookmark, 
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Flame,
  Trash2
} from 'lucide-react';
import { SpeedSummaryTable } from './SpeedSummaryTable';
import { PlanningMinimaTable } from './PlanningMinimaTable';
import { FormattedText } from './FormattedText';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { deleteQuestionFromBank } from '../services/questionsService';
import { ExamSession, Question, Option } from '../types';
import { getSpeedSummaryTableType, getPlanningMinimaTableType } from '../utils/aircraftRules';

interface ExamResultsProps {
  session: ExamSession;
  onRestartSameExam: () => void;
  onRetryFailedOnly: () => void;
  onGoToDashboard: () => void;
}

export const ExamResults: React.FC<ExamResultsProps> = ({
  session,
  onRestartSameExam,
  onRetryFailedOnly,
  onGoToDashboard
}) => {
  const [filter, setFilter] = useState<'all' | 'failed' | 'flagged'>('all');
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());
  const [questionToDelete, setQuestionToDelete] = useState<Question | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  const score = session.score || {
    totalQuestions: session.questions.length,
    answeredQuestions: 0,
    correctCount: 0,
    incorrectCount: session.questions.length,
    percentage: 0,
    passed: false
  };

  const passThreshold = session.config.passMarkPercentage || 75;
  const isPassed = score.percentage >= passThreshold;

  const toggleExpand = (qId: string) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const failedQuestions = session.questions.filter((q: Question) => {
    const ans = session.answers[q.id];
    return ans?.isCorrect === false || !ans?.selectedOptionId;
  });

  const flaggedQuestions = session.questions.filter((q: Question) => session.answers[q.id]?.isFlagged);

  const displayedQuestions = session.questions.filter((q: Question) => {
    const ans = session.answers[q.id];
    if (filter === 'failed') return ans?.isCorrect === false || !ans?.selectedOptionId;
    if (filter === 'flagged') return ans?.isFlagged;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 animate-fade-in">
      
      {/* Top Banner with Pass/Fail Badge */}
      <div className={`rounded-3xl p-6 sm:p-8 border shadow-2xl relative overflow-hidden ${
        isPassed 
          ? 'bg-gradient-to-br from-emerald-950/40 via-slate-900/60 to-emerald-900/20 border-emerald-500/40 shadow-glow-emerald' 
          : 'bg-gradient-to-br from-rose-950/40 via-slate-900/60 to-rose-900/20 border-rose-500/40 shadow-glow-rose'
      }`}>
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          {isPassed ? <Award className="w-64 h-64 text-emerald-400" /> : <AlertTriangle className="w-64 h-64 text-rose-400" />}
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 relative z-10">
          <div className="text-center sm:text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-slate-800/80 border border-slate-700">
              {isPassed ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Examen Superado</span>
                </>
              ) : (
                <>
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-rose-400">No Superado</span>
                </>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Resultado: {score.percentage}%
            </h1>

            <p className="text-sm text-slate-300 max-w-md">
              {isPassed 
                ? '¡Excelente trabajo operacional! Has demostrado dominio de los procedimientos y limitaciones.' 
                : `Has obtenido un ${score.percentage}%, por debajo del umbral mínimo del ${passThreshold}%. Te recomendamos repasar los reactivos fallados.`}
            </p>
          </div>

          {/* Large circular stat */}
          <div className={`w-32 h-32 rounded-2xl flex flex-col items-center justify-center border-2 shadow-inner ${
            isPassed 
              ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' 
              : 'bg-rose-500/10 border-rose-500/50 text-rose-400'
          }`}>
            <span className="text-3xl font-black">{score.correctCount} / {score.totalQuestions}</span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mt-1">Aciertos</span>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Correctas</span>
            </div>
            <span className="text-lg font-bold text-white mt-1 block">{score.correctCount}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <XCircle className="w-3.5 h-3.5 text-rose-400" />
              <span>Incorrectas</span>
            </div>
            <span className="text-lg font-bold text-white mt-1 block">{score.incorrectCount}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              <span>Marcadas</span>
            </div>
            <span className="text-lg font-bold text-white mt-1 block">{flaggedQuestions.length}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>Tiempo</span>
            </div>
            <span className="text-lg font-bold text-white mt-1 block">
              {Math.round(((session.endTime || Date.now()) - session.startTime) / 60000)} min
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <button
            onClick={onRestartSameExam}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 text-white font-bold text-xs hover:bg-sky-400 transition-all shadow-glow-sky"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Repetir Examen Completo</span>
          </button>

          {failedQuestions.length > 0 && (
            <button
              onClick={onRetryFailedOnly}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-500 transition-all shadow-glow-rose"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Repetir Sólo Falladas ({failedQuestions.length})</span>
            </button>
          )}

          <button
            onClick={onGoToDashboard}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 hover:text-white transition-all border border-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Dashboard</span>
          </button>
        </div>
      </div>

      {/* Breakdown Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-sky-400" />
            <span>Revisión Detallada de Preguntas</span>
          </h2>

          {/* Filter Tabs */}
          <div className="flex items-center bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                filter === 'all' 
                  ? 'bg-sky-500 text-white shadow-glow-sky' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Todas ({session.questions.length})
            </button>
            <button
              onClick={() => setFilter('failed')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                filter === 'failed' 
                  ? 'bg-rose-500 text-white shadow-glow-rose' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Falladas ({failedQuestions.length})
            </button>
            <button
              onClick={() => setFilter('flagged')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                filter === 'flagged' 
                  ? 'bg-amber-500 text-white shadow-glow-amber' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Marcadas ({flaggedQuestions.length})
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {displayedQuestions.map((q: Question) => {
            const ans = session.answers[q.id];
            const isCorrect = ans?.isCorrect;
            const correctOpt = q.options.find((o: Option) => o.is_correct);
            const userOpt = q.options.find((o: Option) => o.id === ans?.selectedOptionId);
            const isExpanded = expandedQuestions[q.id] ?? true;

            return (
              <div 
                key={q.id}
                className="glass-panel rounded-2xl p-5 shadow-lg space-y-4 border-sky-500/20 transition-all"
              >
                <div 
                  onClick={() => toggleExpand(q.id)}
                  className="flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 shadow-md ${
                      isCorrect 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-glow-emerald' 
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-glow-rose'
                    }`}>
                      {isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-sky-400 font-bold">{q.id}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-xs font-mono text-slate-400">{q.learning_objective}</span>
                      </div>
                      <h3 className={`text-sm font-bold text-white mt-1 leading-snug ${deletedIds.has(q.id) ? 'line-through opacity-60' : ''}`}>
                        {q.stem}
                      </h3>
                      {deletedIds.has(q.id) && (
                        <span className="inline-block text-[10px] font-mono font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/40 mt-1">
                          ⚠️ ELIMINADA DEL BANCO
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {!deletedIds.has(q.id) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuestionToDelete(q);
                          setIsDeleteModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg border bg-slate-800/80 border-slate-700 text-slate-400 hover:text-rose-400 hover:border-rose-500/50 hover:bg-rose-950/40 transition-colors"
                        title="Eliminar del banco de preguntas"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    <button className="text-slate-400 hover:text-white p-1">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>


                {isExpanded && (
                  <div className="pt-3 border-t border-slate-800 space-y-3">
                    
                    {/* User vs Correct Answer */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className={`p-3.5 rounded-xl border ${
                        isCorrect 
                          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' 
                          : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                      }`}>
                        <span className="font-bold block mb-1">Tu Selección:</span>
                        <span>{userOpt ? `${userOpt.id}) ${userOpt.text}` : 'Sin responder'}</span>
                      </div>

                      {!isCorrect && (
                        <div className="p-3.5 rounded-xl border bg-emerald-950/40 border-emerald-500/40 text-emerald-200">
                          <span className="font-bold block mb-1">Opción Correcta:</span>
                          <span>{correctOpt ? `${correctOpt.id}) ${correctOpt.text}` : ''}</span>
                        </div>
                      )}
                    </div>

                    {/* Explanation */}
                    <div className="p-4 rounded-xl bg-aviation-950/90 border border-slate-800 text-xs space-y-3">
                      <span className="font-bold text-slate-300 uppercase tracking-wide text-[11px]">Explicación Técnica:</span>
                      <FormattedText text={q.explanation.text} />
                      
                      {/* Cuadro de Mínimos de Planificación o Combustible Binter MOA si aplica */}
                      {getPlanningMinimaTableType(q) === 'variaciones' && (
                        <PlanningMinimaTable type="variaciones" />
                      )}

                      {getPlanningMinimaTableType(q) === 'fuel_calls' && (
                        <PlanningMinimaTable type="fuel_calls" />
                      )}

                      {/* Cuadro Resumen de Velocidades estrictamente para flota ligera correspondiente */}
                      {getSpeedSummaryTableType(q) && (
                        <SpeedSummaryTable
                          aircraftType={getSpeedSummaryTableType(q)!}
                        />
                      )}

                      {q.explanation.references && (
                        <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2">
                          {q.explanation.references.map((ref: string, rIdx: number) => (
                            <span key={rIdx} className="text-[11px] font-mono text-sky-400 bg-cockpit-surface px-2.5 py-1 rounded-lg border border-sky-500/20">
                              {ref}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal de confirmación para eliminar reactivo */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        question={questionToDelete}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setQuestionToDelete(null);
        }}
        onConfirm={async (q, reason) => {
          await deleteQuestionFromBank(q, reason);
          setDeletedIds((prev) => new Set([...prev, q.id]));
        }}
      />

    </div>
  );
};

