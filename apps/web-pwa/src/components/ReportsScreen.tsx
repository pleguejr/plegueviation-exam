import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  BarChart3, 
  RotateCcw, 
  TrendingUp, 
  Award,
  Play,
  Flame,
  FileText
} from 'lucide-react';
import { Question, BankManifest, QuestionStats, ExamSession } from '../types';
import { getExamHistory, getAllStatsMap, db } from '../services/db';

interface ReportsScreenProps {
  questions: Question[];
  manifest: BankManifest | null;
  onGoToDashboard: () => void;
  onReviewExam: (session: ExamSession) => void;
  onRestartExam: (session: ExamSession) => void;
}

export const ReportsScreen: React.FC<ReportsScreenProps> = ({
  questions,
  manifest,
  onGoToDashboard,
  onReviewExam,
  onRestartExam
}) => {
  const [activeTab, setActiveTab] = useState<'history' | 'progress'>('history');
  const [history, setHistory] = useState<ExamSession[]>([]);
  const [statsMap, setStatsMap] = useState<Record<string, QuestionStats>>({});
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const [hist, sm] = await Promise.all([
      getExamHistory(50),
      getAllStatsMap()
    ]);
    setHistory(hist);
    setStatsMap(sm);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Cálculos de métricas globales estilo AviationExam
  const testsTaken = history.length;
  let uniqueQsSeen = 0;
  let allQsSeen = 0;
  let totalCorrect = 0;
  let totalIncorrect = 0;
  let totalSecondsSpent = 0;

  for (const q of questions) {
    const s = statsMap[q.id];
    if (s && s.timesAnswered > 0) {
      uniqueQsSeen++;
      allQsSeen += s.timesAnswered;
      totalCorrect += s.timesCorrect;
      totalIncorrect += s.timesIncorrect;
      for (const h of s.history || []) {
        totalSecondsSpent += h.timeSpentSeconds || 0;
      }
    }
  }

  const overallAvgScore = (totalCorrect + totalIncorrect) > 0
    ? Math.round((totalCorrect / (totalCorrect + totalIncorrect)) * 100)
    : 0;

  const formatHoursMinutes = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 font-sans animate-fade-in">
      
      {/* 1. Header estilo AviationExam: < Reports */}
      <div className="flex items-center justify-between py-1 border-b border-sky-500/20">
        <button
          onClick={onGoToDashboard}
          className="flex items-center gap-2 font-bold text-sky-400 hover:text-sky-300 text-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Reports</span>
        </button>

        <span className="text-xs font-mono text-slate-400">
          Base de Datos: <strong className="text-white">{questions.length}</strong> Reactivos
        </span>
      </div>

      {/* 2. Sub-tabs: Testing History | Progress */}
      <div className="flex items-center gap-6 text-sm font-semibold border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('history')}
          className={`pb-2 transition-all ${
            activeTab === 'history'
              ? 'text-white border-b-2 border-sky-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Testing History
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`pb-2 transition-all ${
            activeTab === 'progress'
              ? 'text-white border-b-2 border-sky-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Progress
        </button>
      </div>

      {/* 3. Top 5 KPI Boxes (IDÉNTICO A TU CAPTURA DE AVIATIONEXAM) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-2">
        
        {/* Box 1: Tests taken */}
        <div className="bg-[#0e1933] border border-sky-500/20 rounded-2xl p-5 text-center shadow-lg space-y-2">
          <div className="inline-block px-4 py-1.5 rounded-lg bg-slate-800/90 text-white font-mono text-xl font-extrabold border border-slate-700">
            {testsTaken}
          </div>
          <div className="text-xs text-slate-400 font-medium">Tests taken</div>
        </div>

        {/* Box 2: Unique qs seen */}
        <div className="bg-[#0e1933] border border-sky-500/20 rounded-2xl p-5 text-center shadow-lg space-y-2">
          <div className="inline-block px-4 py-1.5 rounded-lg bg-slate-800/90 text-white font-mono text-xl font-extrabold border border-slate-700">
            {uniqueQsSeen}
          </div>
          <div className="text-xs text-slate-400 font-medium">Unique qs seen</div>
        </div>

        {/* Box 3: All qs seen */}
        <div className="bg-[#0e1933] border border-sky-500/20 rounded-2xl p-5 text-center shadow-lg space-y-2">
          <div className="inline-block px-4 py-1.5 rounded-lg bg-slate-800/90 text-white font-mono text-xl font-extrabold border border-slate-700">
            {allQsSeen}
          </div>
          <div className="text-xs text-slate-400 font-medium">All qs seen</div>
        </div>

        {/* Box 4: Overall avg score */}
        <div className="bg-[#0e1933] border border-sky-500/20 rounded-2xl p-5 text-center shadow-lg space-y-2">
          <div className={`inline-block px-4 py-1.5 rounded-lg font-mono text-xl font-extrabold border ${
            overallAvgScore >= 75 
              ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40' 
              : 'bg-slate-800/90 text-slate-200 border-slate-700'
          }`}>
            {overallAvgScore} %
          </div>
          <div className="text-xs text-slate-400 font-medium">Overall avg score</div>
        </div>

        {/* Box 5: Time spent */}
        <div className="bg-[#0e1933] border border-sky-500/20 rounded-2xl p-5 text-center shadow-lg space-y-2 col-span-2 sm:col-span-1">
          <div className="inline-block px-4 py-1.5 rounded-lg bg-slate-800/90 text-sky-400 font-mono text-xl font-extrabold border border-slate-700">
            {formatHoursMinutes(totalSecondsSpent)}
          </div>
          <div className="text-xs text-slate-400 font-medium">Time spent</div>
        </div>

      </div>

      {/* 4. Tab 1: Testing History */}
      {activeTab === 'history' && (
        <div className="bg-[#0e1933] border border-sky-500/20 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-base font-bold text-white">Registro de Evaluaciones Anteriores</h2>

          {history.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <FileText className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="font-semibold text-sm">Aún no has completado ningún examen.</p>
              <p className="text-xs text-slate-500">Realiza un test desde el Dashboard para ver aquí tu histórico y desgloses.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono">
                    <th className="py-3 px-3">Fecha & Hora</th>
                    <th className="py-3 px-3">Modo</th>
                    <th className="py-3 px-3">Preguntas</th>
                    <th className="py-3 px-3 text-center">Puntuación</th>
                    <th className="py-3 px-3 text-center">Estado (EASA 75%)</th>
                    <th className="py-3 px-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {history.map((sess) => {
                    const dateStr = new Date(sess.startTime).toLocaleString('es-ES', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    });
                    const pct = sess.score?.percentage || 0;
                    const passed = sess.score?.passed;

                    return (
                      <tr key={sess.sessionId} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-3 font-mono text-slate-300">{dateStr}</td>
                        <td className="py-3 px-3">
                          <span className="font-semibold text-white capitalize">
                            {sess.config.mode === 'simulation' ? 'Simulacro 75%' : sess.config.mode === 'smart_review' ? 'Repaso Falladas' : 'Práctica'}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-300">
                          {sess.score?.correctCount}/{sess.questions.length}
                        </td>
                        <td className="py-3 px-3 text-center font-mono font-bold text-sm">
                          <span className={passed ? 'text-emerald-400' : 'text-rose-400'}>{pct}%</span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                            passed 
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}>
                            {passed ? 'APROBADO' : 'SUSPENSO'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => onReviewExam(sess)}
                            className="px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-[11px] transition-all"
                          >
                            Revisar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* 5. Tab 2: Progress (Desglose por Manuales) */}
      {activeTab === 'progress' && (
        <div className="bg-[#0e1933] border border-sky-500/20 rounded-2xl p-6 shadow-xl space-y-6">
          <h2 className="text-base font-bold text-white">Progreso y Cobertura por Manual / Asignatura</h2>

          <div className="space-y-4">
            {manifest?.categories.map((cat) => {
              const catQuestions = questions.filter((q) => q._category === cat.id);
              let correct = 0;
              let incorrect = 0;
              let answered = 0;

              for (const q of catQuestions) {
                const s = statsMap[q.id];
                if (s && s.timesAnswered > 0) {
                  answered++;
                  correct += s.timesCorrect;
                  incorrect += s.timesIncorrect;
                }
              }

              const accuracy = (correct + incorrect) > 0 ? Math.round((correct / (correct + incorrect)) * 100) : 0;
              const coverage = cat.total_questions > 0 ? Math.round((answered / cat.total_questions) * 100) : 0;

              return (
                <div key={cat.id} className="p-5 rounded-2xl bg-[#091224] border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-extrabold text-sm text-white">{cat.title}</h3>
                      <span className="text-xs font-mono text-slate-400">
                        {cat.total_questions} reactivos disponibles
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono">
                      <div>
                        <span className="text-slate-400">Acierto: </span>
                        <strong className={accuracy >= 75 ? 'text-emerald-400' : 'text-rose-400'}>{accuracy}%</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Cobertura: </span>
                        <strong className="text-sky-400">{answered}/{cat.total_questions} ({coverage}%)</strong>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div 
                      className="bg-gradient-to-r from-sky-500 to-emerald-400 h-2 rounded-full transition-all" 
                      style={{ width: `${coverage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
