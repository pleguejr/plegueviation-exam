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
  Flame
} from 'lucide-react';
import { ExamSession, Question } from '../types';
import { SpeedSummaryTable } from './SpeedSummaryTable';
import { PlanningMinimaTable } from './PlanningMinimaTable';
import { FormattedText } from './FormattedText';

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

  const failedQuestions = session.questions.filter((q) => {
    const ans = session.answers[q.id];
    return ans?.isCorrect === false || !ans?.selectedOptionId;
  });

  const flaggedQuestions = session.questions.filter((q) => session.answers[q.id]?.isFlagged);

  const displayedQuestions = session.questions.filter((q) => {
    const ans = session.answers[q.id];
    if (filter === 'failed') return ans?.isCorrect === false || !ans?.selectedOptionId;
    if (filter === 'flagged') return ans?.isFlagged;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 animate-fade-in">
      
      {/* Top Banner with Pass/Fail Badge */}
      <div className={`relative overflow-hidden rounded-3xl border p-6 lg:p-8 shadow-2xl ${
        isPassed
          ? 'bg-gradient-to-br from-[#0a2318] via-[#0d2e20] to-[#071710] border-emerald-500/50 shadow-glow-emerald'
          : 'bg-gradient-to-br from-[#2a0e14] via-[#35121a] to-[#17060a] border-rose-500/50 shadow-glow-rose'
      }`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-5">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border shadow-xl ${
              isPassed
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-glow-emerald'
                : 'bg-rose-500/20 text-rose-400 border-rose-500/40 shadow-glow-rose'
            }`}>
              {isPassed ? <Award className="w-11 h-11" /> : <XCircle className="w-11 h-11" />}
            </div>

            <div>
              <div className="inline-flex items-center gap-2 mb-1.5">
                {isPassed ? (
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-300 bg-emerald-500/25 px-3 py-1 rounded-full border border-emerald-500/50 shadow-glow-emerald">
                    APROBADO (&ge; 75%)
                  </span>
                ) : (
                  <span className="text-xs font-black uppercase tracking-wider text-rose-300 bg-rose-500/25 px-3 py-1 rounded-full border border-rose-500/50 shadow-glow-rose">
                    NO SUPERADO (&lt; 75%)
                  </span>
                )}
              </div>
              <h1 className="text-2xl lg:text-3xl font-black text-white">
                {isPassed ? '¡Excelente Rendimiento Operacional!' : 'Evaluación por Debajo del Estándar'}
              </h1>
              <p className="text-xs text-slate-300 mt-1">
                {isPassed
                  ? 'Has alcanzado el estándar de conocimiento exigido por EASA y la compañía.'
                  : 'Revisa las preguntas falladas y refuerza los manuales de referencia citados.'}
              </p>
            </div>
          </div>

          {/* Big Score Card */}
          <div className="text-center md:text-right bg-aviation-950/80 p-5 rounded-2xl border border-slate-700/60 min-w-[170px] shadow-lg">
            <div className={`text-4xl lg:text-5xl font-black ${isPassed ? 'text-emerald-400' : 'text-rose-400'}`}>
              {score.percentage}%
            </div>
            <div className="text-xs font-mono text-slate-400 mt-1.5">
              <strong className="text-white">{score.correctCount}</strong> de {score.totalQuestions} aciertos
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onGoToDashboard}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-cockpit-surface hover:bg-aviation-800 text-slate-200 border border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Dashboard</span>
          </button>

          <div className="flex items-center gap-2.5">
            {failedQuestions.length > 0 && (
              <button
                onClick={onRetryFailedOnly}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-glow-rose transition-all active:scale-95"
              >
                <Flame className="w-4 h-4" />
                <span>Reintentar Solo Falladas ({failedQuestions.length})</span>
              </button>
            )}

            <button
              onClick={onRestartSameExam}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-glow-sky transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Repetir Examen Completo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Review Filter Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white">Revisión Detallada de Preguntas</h2>
          
          <div className="flex items-center gap-1 bg-[#0a142e] p-1.5 rounded-xl border border-sky-500/20 text-xs">
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
          {displayedQuestions.map((q) => {
            const ans = session.answers[q.id];
            const isCorrect = ans?.isCorrect;
            const correctOpt = q.options.find((o) => o.is_correct);
            const userOpt = q.options.find((o) => o.id === ans?.selectedOptionId);
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
                      <h3 className="text-sm font-bold text-white mt-1 leading-snug">
                        {q.stem}
                      </h3>
                    </div>
                  </div>

                  <button className="text-slate-400 hover:text-white p-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
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
                      
                      {/* Cuadro de Mínimos de Planificación o Combustible si aplica */}
                      {(q.subject_id?.includes('aerodromos') ||
                        q.subject_id?.includes('minimos') ||
                        q.stem.toLowerCase().includes('mínimos de planificación') ||
                        q.stem.toLowerCase().includes('plan básico con variaciones')) && (
                        <PlanningMinimaTable type="variaciones" />
                      )}

                      {(q.subject_id?.includes('combustible') ||
                        q.stem.toLowerCase().includes('minimum fuel') ||
                        q.stem.toLowerCase().includes('mayday fuel') ||
                        q.stem.toLowerCase().includes('reserva final')) && (
                        <PlanningMinimaTable type="fuel_calls" />
                      )}

                      {/* Cuadro Resumen de Velocidades si aplica */}
                      {(q.id.includes('SPD') ||
                        q.subject_id?.includes('velocidad') ||
                        q.subject_id?.includes('limitaciones') ||
                        q.stem.toLowerCase().includes('kias') ||
                        q.stem.toLowerCase().includes('velocidad') ||
                        q.stem.toLowerCase().includes('planeo')) && (
                        <SpeedSummaryTable
                          aircraftType={
                            q.id.startsWith('P2010') || q.stem.includes('P2010') || q.stem.includes('Tecnam')
                              ? 'p2010'
                              : q.id.startsWith('C172') || q.stem.includes('172') || q.stem.includes('Cessna')
                              ? 'c172n'
                              : 'p2010'
                          }
                        />
                      )}

                      {q.explanation.references && (
                        <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2">
                          {q.explanation.references.map((ref, rIdx) => (
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

    </div>
  );
};
