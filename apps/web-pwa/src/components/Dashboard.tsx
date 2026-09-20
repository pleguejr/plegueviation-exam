import React, { useEffect, useMemo, useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Plane, 
  Award, 
  Compass, 
  TrendingUp, 
  BookOpen, 
  Clock, 
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  Flame,
  RotateCcw,
  ShieldCheck,
  PlaneTakeoff,
  Gauge,
  PieChart,
  ListOrdered,
  Settings,
  Download,
  LifeBuoy,
  User,
  RefreshCw,
  AlertCircle,
  BarChart3,
  Cpu,
  Layers,
  FileText,
  Search,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Question, BankManifest, QuestionStats, ExamSession, ExamMode, ExamSelectionStrategy } from '../types';
import { loadAllQuestions, loadManifest } from '../services/questionsService';
import { getAllStatsMap, getExamHistory, db } from '../services/db';
import { filterFlashcards } from '../utils/flashcardFilter';
import { OperationalEventsPanel } from './OperationalEventsPanel';
import { ComunicadosOpsPanel } from './ComunicadosOpsPanel';

interface DashboardProps {
  onStartConfiguredExam: (params: {
    category?: string;
    subtopics?: string[];
    mode: ExamMode;
    strategy: ExamSelectionStrategy;
    count?: number;
  }) => void;
  onStartFlashcards: (params?: { category?: string }) => void;
  onOpenNewExam: () => void;
  onOpenProcedures: () => void;
  onOpenTables: () => void;
  onNavigateTab: (tab: 'explorer' | 'reports' | 'settings' | 'procedures' | 'tables') => void;
  onOpenImporter: () => void;
  onOpenQuestionSearch?: (term: string) => void;
  onPracticeQuestions?: (questionIds: string[], mode?: ExamMode) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onStartConfiguredExam,
  onStartFlashcards,
  onOpenNewExam,
  onOpenProcedures,
  onOpenTables,
  onNavigateTab,
  onOpenImporter,
  onOpenQuestionSearch,
  onPracticeQuestions
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [manifest, setManifest] = useState<BankManifest | null>(null);
  const [statsMap, setStatsMap] = useState<Record<string, QuestionStats>>({});
  const [history, setHistory] = useState<ExamSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMnemonicModal, setShowMnemonicModal] = useState(false);
  const [showStudyGuide, setShowStudyGuide] = useState(false);
  const [infoSearch, setInfoSearch] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [qs, mf, sm, hist] = await Promise.all([
        loadAllQuestions(),
        loadManifest(),
        getAllStatsMap(),
        getExamHistory(40)
      ]);
      setQuestions(qs || []);
      setManifest(mf);
      setStatsMap(sm || {});
      setHistory(hist || []);
    } catch (err) {
      console.warn('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const infoSearchHits = useMemo(() => {
    const q = infoSearch.trim().toLowerCase();
    if (q.length < 2) return [];
    return questions.filter((item) => {
      const hay = [
        item.stem,
        item.id,
        item.learning_objective,
        item._category || '',
        item.subject_id,
        item.explanation?.text || '',
        ...(item.explanation?.references || []),
        ...item.options.map((o) => o.text)
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [infoSearch, questions]);

  const infoSearchPreview = useMemo(() => infoSearchHits.slice(0, 12), [infoSearchHits]);

  const commandCourseQuestions = useMemo(() => {
    return questions.filter((q) => q._subtopic === 'examen-convocatoria-anterior');
  }, [questions]);

  const commandCourseStats = useMemo(() => {
    let answered = 0;
    let correct = 0;
    let incorrect = 0;
    for (const q of commandCourseQuestions) {
      const s = statsMap[q.id];
      if (s && s.timesAnswered > 0) {
        answered++;
        correct += s.timesCorrect;
        incorrect += s.timesIncorrect;
      }
    }
    const acc = (correct + incorrect) > 0 ? Math.round((correct / (correct + incorrect)) * 100) : 0;
    return {
      total: commandCourseQuestions.length,
      answered,
      correct,
      incorrect,
      accuracy: acc
    };
  }, [commandCourseQuestions, statsMap]);

  const handleResetStats = async () => {
    const confirmReset = window.confirm(
      '⚠️ ¿Deseas reiniciar todas las estadísticas e historial de exámenes?\n\nEsto pondrá los contadores a cero para comenzar con un registro limpio.'
    );
    if (confirmReset) {
      await db.questionStats.clear();
      await db.examSessions.clear();
      await loadData();
      alert('✅ Estadísticas e historial reiniciados correctamente a cero.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-full border-4 border-sky-500/20 border-t-sky-400 animate-spin flex items-center justify-center">
            <Plane className="w-6 h-6 text-sky-400" />
          </div>
          <p className="text-sm font-mono text-slate-300">Cargando base de datos operacional...</p>
        </div>
      </div>
    );
  }

  // Cálculos estadísticos globales
  const totalQuestions = questions.length;
  let totalAnswered = 0;
  let totalCorrect = 0;
  let totalIncorrect = 0;
  let unseenCount = 0;
  let flaggedCount = 0;
  let masteredCount = 0;

  for (const q of questions) {
    const s = statsMap[q.id];
    if (s && s.timesAnswered > 0) {
      totalAnswered++;
      totalCorrect += s.timesCorrect;
      totalIncorrect += s.timesIncorrect;
      if (s.isFlagged) flaggedCount++;
      const acc = s.timesCorrect / s.timesAnswered;
      if (s.timesAnswered >= 2 && acc >= 0.8) {
        masteredCount++;
      }
    } else {
      unseenCount++;
    }
  }

  const seenCount = totalQuestions - unseenCount;
  const overallAccuracy = (totalCorrect + totalIncorrect) > 0 
    ? Math.round((totalCorrect / (totalCorrect + totalIncorrect)) * 100)
    : 0;

  type ActivityPoint = {
    id: string;
    type: 'exam' | 'flashcard';
    timestamp: number;
    percentage: number;
    label: string;
  };

  const activityPoints: ActivityPoint[] = [];
  for (const sess of history) {
    if (!sess.isCompleted || sess.score == null) continue;
    activityPoints.push({
      id: sess.sessionId,
      type: 'exam',
      timestamp: sess.endTime || sess.startTime || 0,
      percentage: sess.score.percentage || 0,
      label: `Test ${sess.score.percentage ?? 0}%`
    });
  }
  for (const [qid, stats] of Object.entries(statsMap)) {
    for (const h of stats.history || []) {
      if (h.examMode !== 'smart_review') continue;
      const rating = h.selectedOptionId;
      const pct =
        rating === 'MASTERED' || rating === 'easy'
          ? 95
          : rating === 'REGULAR' || rating === 'medium'
            ? 65
            : 30;
      activityPoints.push({
        id: `${qid}_${h.timestamp}`,
        type: 'flashcard',
        timestamp: h.timestamp,
        percentage: pct,
        label: `Flash ${rating === 'MASTERED' ? 'fácil' : rating === 'REGULAR' ? 'media' : 'difícil'}`
      });
    }
  }
  activityPoints.sort((a, b) => b.timestamp - a.timestamp);
  const recentActivity = activityPoints.slice(0, 25).reverse();
  const examCount = recentActivity.filter((a) => a.type === 'exam').length;
  const flashCount = recentActivity.filter((a) => a.type === 'flashcard').length;

  // Temas de categoría
  const getCategoryTheme = (catId: string) => {
    switch (catId) {
      case 'binter-ops':
        return {
          icon: <PlaneTakeoff className="w-5 h-5" />,
          gradient: 'from-emerald-600 to-teal-500',
          badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
        };
      case 'fleet-e195e2':
        return {
          icon: <Plane className="w-5 h-5" />,
          gradient: 'from-sky-600 to-cyan-500',
          badgeBg: 'bg-sky-500/10 text-sky-400 border-sky-500/30'
        };
      case 'fleet-c172n':
        return {
          icon: <Compass className="w-5 h-5" />,
          gradient: 'from-amber-600 to-yellow-500',
          badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
        };
      case 'fleet-p2010tdi':
        return {
          icon: <Gauge className="w-5 h-5" />,
          gradient: 'from-indigo-600 to-blue-500',
          badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
        };
      case 'regulations-easa-sera':
        return {
          icon: <BookOpen className="w-5 h-5" />,
          gradient: 'from-purple-600 to-violet-500',
          badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
        };
      case 'simulador-e2':
        return {
          icon: <Cpu className="w-5 h-5" />,
          gradient: 'from-cyan-600 to-blue-500',
          badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
        };
      case 'command-upgrade':
      default:
        return {
          icon: <ShieldCheck className="w-5 h-5" />,
          gradient: 'from-rose-600 to-pink-500',
          badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
        };
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 font-sans">
      
      {/* 1. Buscador de información sobre el banco de preguntas */}
      <div className="dashboard-info-search rounded-2xl border p-4 sm:p-5 shadow-lg space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="dashboard-info-search-kicker text-[10px] font-black uppercase tracking-widest">Centro de información</p>
            <h2 className="dashboard-info-search-title text-base sm:text-lg font-extrabold tracking-tight">
              Buscar en el banco de preguntas
            </h2>
            <p className="dashboard-info-search-sub text-[11px] mt-0.5">
              Enunciados, objetivos, opciones y explicaciones · {totalQuestions} reactivos
            </p>
          </div>
        </div>
        <div className="relative">
          <Search className="dashboard-info-search-icon w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            value={infoSearch}
            onChange={(e) => setInfoSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && infoSearch.trim() && onOpenQuestionSearch) {
                onOpenQuestionSearch(infoSearch.trim());
              }
            }}
            placeholder="Ej: TELSI, V1, flap 5, circling, fuel leak, SERA..."
            className="dashboard-info-search-input w-full pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2"
          />
        </div>
        {infoSearch.trim().length >= 2 && (
          <div className="dashboard-info-search-results rounded-xl border overflow-hidden">
            <div className="dashboard-info-search-results-bar px-3 py-2 text-[10px] font-bold uppercase tracking-wider border-b flex items-center justify-between gap-2 flex-wrap">
              <span>
                {infoSearchHits.length} resultado{infoSearchHits.length === 1 ? '' : 's'}
                {infoSearchHits.length > 12 ? ' · vista previa 12' : ''}
              </span>
              <div className="flex items-center gap-3 normal-case tracking-normal">
                {infoSearchHits.length > 0 && onPracticeQuestions && (
                  <button
                    type="button"
                    onClick={() => onPracticeQuestions(infoSearchHits.map((q) => q.id))}
                    className="dashboard-info-search-test-btn text-xs font-black"
                  >
                    Test con {infoSearchHits.length} →
                  </button>
                )}
                {onOpenQuestionSearch && (
                  <button
                    type="button"
                    onClick={() => onOpenQuestionSearch(infoSearch.trim())}
                    className="dashboard-info-search-open-btn text-xs font-bold"
                  >
                    Abrir en Questions →
                  </button>
                )}
              </div>
            </div>
            <ul className="max-h-72 overflow-y-auto divide-y">
              {infoSearchPreview.map((q) => {
                const catTitle = manifest?.categories.find((c) => c.id === q._category)?.title || q._category || q.subject_id;
                return (
                  <li key={q.id}>
                    <button
                      type="button"
                      onClick={() => onPracticeQuestions?.([q.id])}
                      className="dashboard-info-search-hit w-full text-left px-3 py-2.5 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="dashboard-info-search-hit-id text-[10px] font-mono">{q.id}</span>
                        <span className="dashboard-info-search-hit-cat text-[10px] truncate">{catTitle}</span>
                      </div>
                      <p className="dashboard-info-search-hit-stem text-xs line-clamp-2 leading-relaxed">{q.stem}</p>
                    </button>
                  </li>
                );
              })}
              {infoSearchHits.length === 0 && (
                <li className="dashboard-info-search-empty px-3 py-4 text-xs text-center">
                  Sin coincidencias. Prueba otra palabra clave.
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      <OperationalEventsPanel
        onBankCreated={() => {
          loadData();
        }}
      />

      <ComunicadosOpsPanel
        onBankCreated={() => {
          loadData();
        }}
      />

      {/* 2. Signature Binter Performance Card con Gráfica de Precisión por Banco */}
      <div className="binter-performance-card bg-gradient-to-br from-[#0a1c36] via-[#08172e] to-[#050e1c] text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-emerald-500/30 space-y-6">
        
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-700/60 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-6 rounded-full bg-[#008f45]" />
              <span>Rendimiento Global</span>
            </h1>
            <p className="text-xs text-slate-300 font-medium pt-1">
              {seenCount} preguntas exploradas de {totalQuestions} ({totalQuestions > 0 ? Math.round((seenCount / totalQuestions) * 100) : 0}% del banco)
            </p>
          </div>

          <div className="flex items-center gap-3 bg-black/40 px-4 py-2.5 rounded-2xl border border-emerald-500/30 self-start sm:self-auto">
            <div className="text-right">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Average Score</span>
              <span className="text-2xl sm:text-3xl font-black text-[#00a651] font-mono">{overallAccuracy}%</span>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center font-black text-xs text-emerald-300">
              {overallAccuracy >= 75 ? '✓' : '!'}
            </div>
          </div>
        </div>

        {/* 📊 GRÁFICA DE RENDIMIENTO POR BANCO */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>Precisión y Cobertura por Banco de Preguntas:</span>
            </span>
            <span className="text-emerald-400 text-[11px] font-mono">Clic para test rápido</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {manifest?.categories.map((cat) => {
              const catQuestions = questions.filter((q) => q._category === cat.id);
              let catAnswered = 0;
              let catCorrect = 0;
              let catIncorrect = 0;

              for (const q of catQuestions) {
                const s = statsMap[q.id];
                if (s && s.timesAnswered > 0) {
                  catAnswered++;
                  catCorrect += s.timesCorrect;
                  catIncorrect += s.timesIncorrect;
                }
              }

              const catAcc = (catCorrect + catIncorrect) > 0
                ? Math.round((catCorrect / (catCorrect + catIncorrect)) * 100)
                : 0;
              const catSeenPct = catQuestions.length > 0
                ? Math.round((catAnswered / catQuestions.length) * 100)
                : 0;

              return (
                <div 
                  key={cat.id}
                  onClick={() => onStartConfiguredExam({ category: cat.id, mode: 'practice', strategy: 'random', count: 20 })}
                  className="p-3.5 rounded-2xl bg-black/40 hover:bg-black/60 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all space-y-2 group shadow-sm"
                  title={`Clic para iniciar test de 20 preguntas en ${cat.title}`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white group-hover:text-emerald-400 transition-colors truncate max-w-[180px] sm:max-w-xs">
                      {cat.title}
                    </span>
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="text-slate-400 text-[10px]">
                        {catAnswered}/{catQuestions.length} ({catSeenPct}%)
                      </span>
                      <span className={`font-black px-2 py-0.5 rounded text-xs ${
                        catAcc >= 75
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : catAcc > 0
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-500'
                      }`}>
                        {catAcc}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar with Binter Emerald & Atlantic Blue styling */}
                  <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        catAcc >= 75
                          ? 'bg-gradient-to-r from-[#008f45] to-[#00a651]'
                          : catAcc > 0
                          ? 'bg-gradient-to-r from-amber-600 to-amber-400'
                          : 'bg-slate-700'
                      }`}
                      style={{ width: `${Math.max(catAcc > 0 ? 5 : 0, catAcc)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Central Historical Chart Area — tests + flashcards */}
        {recentActivity.length > 0 && (
          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
              <span className="font-bold text-slate-300">
                Tendencia últimos {recentActivity.length} resultados (tests + flashcards):
              </span>
              <span className="font-mono text-[11px]">
                {examCount} tests · {flashCount} flash
              </span>
            </div>
            <div className="h-28 flex items-end gap-1 bg-black/40 p-2.5 rounded-2xl border border-slate-800 relative">
              {/* 75% pass line */}
              <div
                className="absolute left-2 right-2 border-t border-dashed border-emerald-500/40 pointer-events-none"
                style={{ bottom: `calc(0.625rem + 75% * (100% - 1.25rem) / 100)` }}
              />
              {recentActivity.map((point) => {
                const passed = point.percentage >= 75;
                const isFlash = point.type === 'flashcard';
                return (
                  <div key={point.id} className="flex-1 flex flex-col items-center gap-0.5 group relative min-w-0">
                    <div
                      className={`w-full max-w-[14px] mx-auto rounded-t transition-all ${
                        isFlash
                          ? passed
                            ? 'bg-sky-400'
                            : 'bg-amber-500'
                          : passed
                            ? 'bg-[#008f45] shadow-glow-emerald'
                            : 'bg-rose-600 shadow-glow-rose'
                      }`}
                      style={{ height: `${Math.max(10, point.percentage)}%` }}
                      title={`${point.label} · ${new Date(point.timestamp).toLocaleString()}`}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-3 text-[10px] text-slate-400 font-semibold">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#008f45]" /> Test ≥75%</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-rose-600" /> Test &lt;75%</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-sky-400" /> Flash fácil/media</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-amber-500" /> Flash difícil</span>
            </div>
          </div>
        )}

        {/* Bottom bar of card */}
        <div className="flex flex-wrap items-center justify-between text-xs font-semibold text-slate-400 pt-2 border-t border-slate-700/60 gap-2">
          <span>🎯 Mastered: <strong className="text-emerald-400">{masteredCount}</strong> preguntas</span>
          <span>🚩 Marcadas para repaso: <strong className="text-amber-400">{flaggedCount}</strong></span>
        </div>

      </div>

      {/* 3. AviationExam Circular Hub Navigation Grid (1:1 Réplica) */}
      <div className="hub-control-card bg-[#0e1933] border border-sky-500/20 rounded-3xl p-8 shadow-xl space-y-6">
        
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 rounded-full bg-sky-500" />
            <h2 className="text-lg font-black text-white">Centro de Control & Menú Principal</h2>
          </div>
          <button
            onClick={handleResetStats}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-500/40 text-xs font-bold transition-all"
            title="Poner contadores de examen a cero"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar Estadísticas</span>
          </button>
        </div>

        {/* Circular Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2">
          
          {/* 1. TEST */}
          <div 
            onClick={onOpenNewExam}
            className="flex flex-col items-center gap-3 cursor-pointer group"
          >
            <div className="w-20 h-20 rounded-full bg-white hover:bg-sky-50 text-[#162f59] shadow-xl flex items-center justify-center border-2 border-slate-200 group-hover:scale-105 group-hover:border-sky-400 transition-all duration-200">
              <CheckCircle2 className="w-9 h-9 text-sky-600" />
            </div>
            <span className="text-xs font-extrabold text-white tracking-wider uppercase group-hover:text-sky-300 transition-colors">
              TEST
            </span>
          </div>

          {/* 2. FLASHCARDS (Datos Numéricos & Siglas) */}
          <div 
            onClick={() => onStartFlashcards()}
            className="flex flex-col items-center gap-3 cursor-pointer group"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 shadow-glow-amber flex items-center justify-center border-2 border-amber-300 group-hover:scale-105 transition-all duration-200">
              <Zap className="w-9 h-9 fill-current text-slate-950" />
            </div>
            <span className="text-xs font-extrabold text-amber-300 tracking-wider uppercase group-hover:text-amber-200 transition-colors">
              FLASHCARDS
            </span>
          </div>

          {/* 3. REPORTS */}
          <div 
            onClick={() => onNavigateTab('reports')}
            className="flex flex-col items-center gap-3 cursor-pointer group"
          >
            <div className="w-20 h-20 rounded-full bg-white hover:bg-sky-50 text-[#162f59] shadow-xl flex items-center justify-center border-2 border-slate-200 group-hover:scale-105 group-hover:border-sky-400 transition-all duration-200">
              <PieChart className="w-9 h-9 text-sky-600" />
            </div>
            <span className="text-xs font-extrabold text-white tracking-wider uppercase group-hover:text-sky-300 transition-colors">
              REPORTS
            </span>
          </div>

          {/* 4. QUESTIONS */}
          <div 
            onClick={() => onNavigateTab('explorer')}
            className="flex flex-col items-center gap-3 cursor-pointer group"
          >
            <div className="w-20 h-20 rounded-full bg-white hover:bg-sky-50 text-[#162f59] shadow-xl flex items-center justify-center border-2 border-slate-200 group-hover:scale-105 group-hover:border-sky-400 transition-all duration-200">
              <ListOrdered className="w-9 h-9 text-sky-600" />
            </div>
            <span className="text-xs font-extrabold text-white tracking-wider uppercase group-hover:text-sky-300 transition-colors">
              QUESTIONS
            </span>
          </div>

          {/* 4. SETTINGS */}
          <div 
            onClick={() => onNavigateTab('settings')}
            className="flex flex-col items-center gap-3 cursor-pointer group"
          >
            <div className="w-20 h-20 rounded-full bg-white hover:bg-sky-50 text-[#162f59] shadow-xl flex items-center justify-center border-2 border-slate-200 group-hover:scale-105 group-hover:border-sky-400 transition-all duration-200">
              <Settings className="w-9 h-9 text-sky-600" />
            </div>
            <span className="text-xs font-extrabold text-white tracking-wider uppercase group-hover:text-sky-300 transition-colors">
              SETTINGS
            </span>
          </div>

          {/* 5. DOWNLOADS / OFFLINE */}
          <div 
            onClick={() => alert('✅ El sistema está 100% descargado y listo para usar sin conexión (IndexedDB + PWA Cache).')}
            className="flex flex-col items-center gap-3 cursor-pointer group"
          >
            <div className="w-20 h-20 rounded-full bg-white hover:bg-sky-50 text-[#162f59] shadow-xl flex items-center justify-center border-2 border-slate-200 group-hover:scale-105 group-hover:border-sky-400 transition-all duration-200">
              <Download className="w-9 h-9 text-sky-600" />
            </div>
            <span className="text-xs font-extrabold text-white tracking-wider uppercase group-hover:text-sky-300 transition-colors">
              OFFLINE / PWA
            </span>
          </div>

          {/* 6. TARJETAS DE PROCEDIMIENTOS (SOPs & EMERGENCIAS) */}
          <div 
            onClick={onOpenProcedures}
            className="flex flex-col items-center gap-3 cursor-pointer group"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-600 to-sky-600 text-white shadow-glow-emerald flex items-center justify-center border-2 border-emerald-400 group-hover:scale-105 transition-all duration-200">
              <Layers className="w-9 h-9 text-white" />
            </div>
            <span className="text-xs font-extrabold text-emerald-300 tracking-wider uppercase group-hover:text-emerald-200 transition-colors text-center">
              TARJETAS SOP
            </span>
          </div>

          {/* 7. TABLAS OPERACIONALES (MINIMOS / LIMITACIONES / MEMORY ITEMS) */}
          <div 
            onClick={onOpenTables}
            className="flex flex-col items-center gap-3 cursor-pointer group"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-sky-600 via-blue-700 to-indigo-700 text-white shadow-glow-sky flex items-center justify-center border-2 border-sky-400 group-hover:scale-105 transition-all duration-200">
              <FileText className="w-9 h-9 text-sky-200" />
            </div>
            <span className="text-xs font-extrabold text-sky-300 tracking-wider uppercase group-hover:text-sky-200 transition-colors text-center">
              TABLAS OPS
            </span>
          </div>

          {/* 7. MNEMÓNICOS & SOPs */}
          <div 
            onClick={() => setShowMnemonicModal(true)}
            className="flex flex-col items-center gap-3 cursor-pointer group"
          >
            <div className="w-20 h-20 rounded-full bg-[#162f59] text-white shadow-xl flex items-center justify-center border-2 border-sky-400 group-hover:scale-105 group-hover:bg-sky-700 transition-all duration-200">
              <LifeBuoy className="w-9 h-9 text-sky-300" />
            </div>
            <span className="text-xs font-extrabold text-white tracking-wider uppercase group-hover:text-sky-300 transition-colors">
              MNEMÓNICOS
            </span>
          </div>

          {/* 7. MY ACCOUNT / PILOTO */}
          <div 
            onClick={() => onNavigateTab('settings')}
            className="flex flex-col items-center gap-3 cursor-pointer group"
          >
            <div className="w-20 h-20 rounded-full bg-white hover:bg-sky-50 text-[#162f59] shadow-xl flex items-center justify-center border-2 border-slate-200 group-hover:scale-105 group-hover:border-sky-400 transition-all duration-200">
              <User className="w-9 h-9 text-sky-600" />
            </div>
            <span className="text-xs font-extrabold text-white tracking-wider uppercase group-hover:text-sky-300 transition-colors">
              MY ACCOUNT
            </span>
          </div>

          {/* 8. IMPORTAR IA */}
          <div 
            onClick={onOpenImporter}
            className="flex flex-col items-center gap-3 cursor-pointer group"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-sky-500 to-teal-400 text-white shadow-glow-sky flex items-center justify-center border-2 border-sky-300 group-hover:scale-105 transition-all duration-200">
              <Sparkles className="w-9 h-9 text-white" />
            </div>
            <span className="text-xs font-extrabold text-white tracking-wider uppercase group-hover:text-sky-300 transition-colors">
              IMPORTAR IA
            </span>
          </div>

        </div>

      </div>

      {/* 🌟 BANNER DESTACADO: COMMAND COURSE */}
      <div className="command-course-hero-card rounded-3xl bg-gradient-to-br from-[#1a0b2e] via-[#0f172a] to-[#070e1e] border-2 border-rose-500/40 p-6 sm:p-7 shadow-2xl space-y-5 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="command-course-badge px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-rose-400" />
                <span>25 Oficiales (en Inglés) + 65 Satélites = 90 Reactivos</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
              <ShieldCheck className="w-6 h-6 text-rose-400" />
              <span>Banco Especial - Command Course</span>
            </h2>
          </div>

          <div className="command-course-stats flex items-center gap-3 bg-black/50 px-4 py-3 rounded-2xl border border-rose-500/30 shrink-0">
            <div className="text-right">
              <span className="command-course-stats-label text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Progreso Banco</span>
              <span className="command-course-stats-value text-lg sm:text-xl font-black text-rose-400 font-mono">
                {commandCourseStats.answered} / {commandCourseStats.total}
              </span>
            </div>
            <div className="command-course-stats-divider text-right pl-3 border-l border-slate-800">
              <span className="command-course-stats-label text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Precisión</span>
              <span className={`command-course-stats-accuracy text-lg sm:text-xl font-black font-mono ${
                commandCourseStats.accuracy >= 75 ? 'text-emerald-400' : commandCourseStats.accuracy > 0 ? 'text-amber-400' : 'text-slate-400'
              }`}>
                {commandCourseStats.accuracy}%
              </span>
            </div>
          </div>
        </div>

        {/* Quick Launch Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10 pt-1">
          {/* 1. Test 25 Oficiales (En Inglés) */}
          <button
            type="button"
            onClick={() => {
              const officialIds = commandCourseQuestions.filter((q) => q.id.startsWith('CMD-EXAM26-')).map((q) => q.id);
              if (onPracticeQuestions && officialIds.length > 0) {
                onPracticeQuestions(officialIds);
              } else {
                onStartConfiguredExam({ category: 'command-upgrade', subtopics: ['examen-convocatoria-anterior'], count: 25, mode: 'simulation', strategy: 'random' });
              }
            }}
            className="command-course-action command-course-action-rose p-3.5 rounded-2xl bg-rose-950/40 hover:bg-rose-900/50 border border-rose-500/40 hover:border-rose-400 text-left transition-all group flex flex-col justify-between shadow-md active:scale-95"
          >
            <div className="command-course-action-title flex items-center justify-between text-xs font-black text-rose-300 mb-1">
              <span className="flex items-center gap-1.5">
                <Target className="w-4 h-4 text-rose-400" />
                <span>Examen Oficial (25)</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="command-course-action-desc text-[11px] text-slate-300">
              Las 25 preguntas originales en inglés del examen real de convocatoria.
            </p>
          </button>

          {/* 2. Banco Completo (90) */}
          <button
            type="button"
            onClick={() => onStartConfiguredExam({ category: 'command-upgrade', subtopics: ['examen-convocatoria-anterior'], count: 90, mode: 'practice', strategy: 'random' })}
            className="command-course-action command-course-action-sky p-3.5 rounded-2xl bg-sky-950/40 hover:bg-sky-900/50 border border-sky-500/40 hover:border-sky-400 text-left transition-all group flex flex-col justify-between shadow-md active:scale-95"
          >
            <div className="command-course-action-title flex items-center justify-between text-xs font-black text-sky-300 mb-1">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>Banco Completo (90)</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="command-course-action-desc text-[11px] text-slate-300">
              25 oficiales + 65 satélites con feedback y referencias inmediatas.
            </p>
          </button>

          {/* 3. Flashcards */}
          <button
            type="button"
            onClick={() => onStartFlashcards({ category: 'command-upgrade' })}
            className="command-course-action command-course-action-amber p-3.5 rounded-2xl bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/40 hover:border-amber-400 text-left transition-all group flex flex-col justify-between shadow-md active:scale-95"
          >
            <div className="command-course-action-title flex items-center justify-between text-xs font-black text-amber-300 mb-1">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400 fill-current" />
                <span>Flashcards Mando</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="command-course-action-desc text-[11px] text-slate-300">
              Memorización de datos clave de combustible, LVO, DDPM y límites.
            </p>
          </button>

          {/* 4. Explorar Reactivos */}
          <button
            type="button"
            onClick={() => {
              if (onOpenQuestionSearch) {
                onOpenQuestionSearch('CMD-EXAM26-');
              } else {
                onNavigateTab('explorer');
              }
            }}
            className="command-course-action command-course-action-emerald p-3.5 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 hover:border-emerald-400 text-left transition-all group flex flex-col justify-between shadow-md active:scale-95"
          >
            <div className="command-course-action-title flex items-center justify-between text-xs font-black text-emerald-300 mb-1">
              <span className="flex items-center gap-1.5">
                <Search className="w-4 h-4 text-emerald-400" />
                <span>Explorar las 25 / 90</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="command-course-action-desc text-[11px] text-slate-300">
              Ver enunciados, opciones y explicaciones detalladas del examen.
            </p>
          </button>
        </div>

        {/* 📚 GUÍA DE REFERENCIAS Y CAPÍTULOS DE ESTUDIO */}
        <div className="study-focus-card rounded-2xl bg-black/40 border border-rose-500/30 p-4 sm:p-5 space-y-3 relative z-10">
          <div 
            onClick={() => setShowStudyGuide(!showStudyGuide)}
            className="flex items-center justify-between cursor-pointer group select-none"
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-5 h-5 text-rose-400" />
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors">
                  Referencias y Capítulos de Manuales para Estudio (25 Preguntas Oficiales)
                </h3>
                <p className="text-[11px] text-slate-400">
                  Enfoque de estudio por manual (MOA 8.1–8.6, Cap. 7, Cap. 9, DDPM, MEL, SOPM, AFM)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/30">
              <span>{showStudyGuide ? 'Ocultar Guía' : 'Ver Capítulos de Estudio'}</span>
              {showStudyGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </div>
          </div>

          {showStudyGuide && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs border-t border-slate-800 animate-fade-in">
              
              {/* MOA 8.1 Planificación */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-rose-300 font-extrabold pb-1.5 border-b border-slate-800">
                  <span className="flex items-center gap-1.5">
                    <PlaneTakeoff className="w-4 h-4 text-rose-400" />
                    <span>MOA Cap. 8.1 · Planificación y Despacho</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">11 Preguntas</span>
                </div>
                <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <li>• <strong className="text-white">8.1.2.1 / 8.1.7.2.3.1:</strong> Distancia máx OEI 60 min (<span className="text-amber-300 font-mono font-bold">320 NM</span> E195-E2) <span className="text-rose-400 font-mono font-bold">[Q1]</span></li>
                  <li>• <strong className="text-white">8.1.2.2:</strong> Categoría RFFS (<span className="text-amber-300 font-mono font-bold">Cat 7</span> E195-E2) <span className="text-rose-400 font-mono font-bold">[Q6]</span></li>
                  <li>• <strong className="text-white">8.1.3.2:</strong> Mínimos Circling a velocidad superior (mínimos de categoría superior) <span className="text-rose-400 font-mono font-bold">[Q7]</span></li>
                  <li>• <strong className="text-white">8.1.3.5:</strong> Approach Ban (inicio permitido; prohibición continuar bajo FAF / 1.000 ft) <span className="text-rose-400 font-mono font-bold">[Q19]</span></li>
                  <li>• <strong className="text-white">8.1.7.1.2.3:</strong> Combustible contingencia absorbe rodaje prolongado <span className="text-rose-400 font-mono font-bold">[Q9]</span></li>
                  <li>• <strong className="text-white">8.1.7.2.1:</strong> Reserva Final turborreactores (<span className="text-amber-300 font-mono font-bold">30 min</span> a 1.500 ft) <span className="text-rose-400 font-mono font-bold">[Q8]</span></li>
                  <li>• <strong className="text-white">8.1.7.2.1:</strong> Componentes Alternate Fuel (frustrada destino + ascenso + crucero + descenso + toma) <span className="text-rose-400 font-mono font-bold">[Q11]</span></li>
                  <li>• <strong className="text-white">8.1.7.2.5 Tabla 1A:</strong> Mínimos Alternativo Plan Básico c/ Variaciones (<span className="text-amber-300 font-mono font-bold">+200 ft / +800 m</span>) <span className="text-rose-400 font-mono font-bold">[Q10]</span></li>
                  <li>• <strong className="text-white">8.1.7.3.5:</strong> Emergencia de combustible (<span className="text-rose-400 font-bold font-mono">MAYDAY FUEL</span> al peligrar reserva final) <span className="text-rose-400 font-mono font-bold">[Q25]</span></li>
                  <li>• <strong className="text-white">8.1.8 / 8.1.10:</strong> Tolerancia peso rampa OFP vs Hoja de carga (<span className="text-amber-300 font-mono font-bold">máx ±1.000 kg</span>) <span className="text-rose-400 font-mono font-bold">[Q14]</span></li>
                  <li>• <strong className="text-white">8.1.8.6:</strong> Procedimiento LMC combinados (pasaje + bodegas dentro de límite restrictivo) <span className="text-rose-400 font-mono font-bold">[Q13]</span></li>
                  <li>• <strong className="text-white">8.1.11:</strong> Registro ATL de anomalías transitorias autorrecuperadas (<span className="text-amber-300 font-mono font-bold">"Pilot Info"</span>) <span className="text-rose-400 font-mono font-bold">[Q4]</span></li>
                </ul>
              </div>

              {/* DDPM / MEL / CDL */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-rose-300 font-extrabold pb-1.5 border-b border-slate-800">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-rose-400" />
                    <span>DDPM / MEL / CDL · Despacho y Defectos</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">3 Preguntas</span>
                </div>
                <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <li>• <strong className="text-white">DDPM / CDL Generalidades:</strong> Definición operacional de penalización <span className="text-amber-300 font-mono font-bold">"Negligible"</span> (efecto muy pequeño pero real y acumulativo) <span className="text-rose-400 font-mono font-bold">[Q2]</span></li>
                  <li>• <strong className="text-white">MOA 8.6.1.4 / ORO.MLR.105:</strong> Plazos de rectificación MEL Cat B (<span className="text-amber-300 font-mono font-bold">3 días de calendario</span> excluyendo día hallazgo) <span className="text-rose-400 font-mono font-bold">[Q3]</span></li>
                  <li>• <strong className="text-white">MOA 8.6.1 / ORO.MLR.105:</strong> Autodespacho MEL por Comandante sin mantenimiento (sin peligro y <span className="text-amber-300 font-mono font-bold">sin procedimiento 'M'</span>) <span className="text-rose-400 font-mono font-bold">[Q24]</span></li>
                </ul>
              </div>

              {/* MOA 8.4 LVO */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-rose-300 font-extrabold pb-1.5 border-b border-slate-800">
                  <span className="flex items-center gap-1.5">
                    <Gauge className="w-4 h-4 text-rose-400" />
                    <span>MOA Cap. 8.4 · Operaciones LVO (CAT II / III)</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">2 Preguntas</span>
                </div>
                <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <li>• <strong className="text-white">MOA 8.4.1 / SPA.LVO.105:</strong> Obligación de registrar datos LVO en PFR para reporte regulatorio a AESA <span className="text-rose-400 font-mono font-bold">[Q5]</span></li>
                  <li>• <strong className="text-white">MOA 8.4.2:</strong> Mínimos transmisómetros RVR en CAT III (Midpoint mínimo <span className="text-amber-300 font-mono font-bold">125 m</span>) <span className="text-rose-400 font-mono font-bold">[Q20]</span></li>
                </ul>
              </div>

              {/* MOA 8.2 Rampa & SOPM */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-rose-300 font-extrabold pb-1.5 border-b border-slate-800">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-rose-400" />
                    <span>MOA Cap. 8.2 & SOPM · Rampa y Parada</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">2 Preguntas</span>
                </div>
                <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <li>• <strong className="text-white">MOA 8.2.1.2:</strong> Repostaje embarcando por L1 y R2 bloqueada (<span className="text-amber-300 font-mono font-bold">R1 y L2 libres</span> para evacuación) <span className="text-rose-400 font-mono font-bold">[Q15]</span></li>
                  <li>• <strong className="text-white">MOA 8.2.2 / SOPM:</strong> Beacon encendido ininterrumpidamente hasta parada total de ambos motores <span className="text-rose-400 font-mono font-bold">[Q16]</span></li>
                </ul>
              </div>

              {/* MOA 8.3 & MOB Vuelo */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-rose-300 font-extrabold pb-1.5 border-b border-slate-800">
                  <span className="flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-rose-400" />
                    <span>MOA Cap. 8.3 & MOB · Procedimientos de Vuelo</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">2 Preguntas</span>
                </div>
                <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <li>• <strong className="text-white">MOA 8.3.2.7:</strong> Política frustradas sucesivas (máximo 2; 3ª solo con mejora meteorológica manifiesta) <span className="text-rose-400 font-mono font-bold">[Q18]</span></li>
                  <li>• <strong className="text-white">MOB 3.1.0:</strong> Llamada PA "Tripulación de cabina permanezcan sentados" (anuncios y esperar orden) <span className="text-rose-400 font-mono font-bold">[Q22]</span></li>
                </ul>
              </div>

              {/* MOA Cap. 7 (FTL) & Cap. 9 (DGR) */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-rose-300 font-extrabold pb-1.5 border-b border-slate-800">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-rose-400" />
                    <span>MOA Cap. 7 (FTL) & Cap. 9 (DGR)</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">2 Preguntas</span>
                </div>
                <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <li>• <strong className="text-white">MOA 7 / FTL.205(f):</strong> Discreción Comandante en tierra fuera de base (<span className="text-amber-300 font-mono font-bold">hasta 2h</span> con consenso e informe en 72h) <span className="text-rose-400 font-mono font-bold">[Q12]</span></li>
                  <li>• <strong className="text-white">MOA 9 / IATA DGR:</strong> Baterías de litio extraídas de sillas (<span className="text-amber-300 font-mono font-bold">exclusivo en cabina</span> con bornes aislados) <span className="text-rose-400 font-mono font-bold">[Q17]</span></li>
                </ul>
              </div>

              {/* AFM / QRH E195-E2 */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 md:col-span-2">
                <div className="flex items-center justify-between text-rose-300 font-extrabold pb-1.5 border-b border-slate-800">
                  <span className="flex items-center gap-1.5">
                    <Plane className="w-4 h-4 text-rose-400" />
                    <span>AFM / AOM / QRH · Sistemas y Limitaciones Embraer 195-E2</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">2 Preguntas</span>
                </div>
                <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <li>• <strong className="text-white">QRH Sección 1:</strong> Memory Item Despresurización Rápida (<span className="text-amber-300 font-mono font-bold">Crew Oxy Masks al 100%</span>) <span className="text-rose-400 font-mono font-bold">[Q21]</span></li>
                  <li>• <strong className="text-white">AFM 2-03 / AOM 1-04:</strong> Límites de viento Autoland CAT II/III (<span className="text-amber-300 font-mono font-bold">Headwind 25 kt / Tailwind 10 kt / Crosswind 15 kt</span>) <span className="text-rose-400 font-mono font-bold">[Q23]</span></li>
                </ul>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* 4. Categorías de Manuales y Flota */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 rounded-full bg-emerald-500" />
            <h2 className="text-lg font-black text-white">Manuales de Compañía & Flota</h2>
          </div>
          
          <button 
            onClick={onOpenNewExam}
            className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
          >
            Configurar Test por Asignatura <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {manifest?.categories.map((cat) => {
            const catQuestions = questions.filter((q) => q._category === cat.id);
            const theme = getCategoryTheme(cat.id);
            let catAnswered = 0;
            let catCorrect = 0;
            let catIncorrect = 0;

            for (const q of catQuestions) {
              const s = statsMap[q.id];
              if (s && s.timesAnswered > 0) {
                catAnswered++;
                catCorrect += s.timesCorrect;
                catIncorrect += s.timesIncorrect;
              }
            }

            const catAccuracy = (catCorrect + catIncorrect) > 0
              ? Math.round((catCorrect / (catCorrect + catIncorrect)) * 100)
              : 0;

            return (
              <div 
                key={cat.id}
                className="category-overview-card bg-[#0e1933] border border-sky-500/20 rounded-2xl p-5 flex flex-col justify-between shadow-lg hover:border-sky-500/40 transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-white shadow-md`}>
                        {theme.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-white leading-snug">
                          {cat.title}
                        </h3>
                        <span className="text-xs font-mono text-slate-400">
                          {cat.total_questions} preguntas
                        </span>
                      </div>
                    </div>

                    {catAccuracy > 0 && (
                      <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                        catAccuracy >= 75 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {catAccuracy}%
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {Object.values(cat.subtopics || {}).map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => onStartConfiguredExam({ category: cat.id, subtopics: [st.id], mode: 'practice', strategy: 'random', count: Math.min(st.count, 25) })}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#091224] hover:bg-sky-950/80 text-slate-300 hover:text-sky-300 border border-slate-800 hover:border-sky-500/40 transition-all text-left"
                        title={`Hacer test de ${st.title} (${st.count} preguntas)`}
                      >
                        {st.title} ({st.count})
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    <strong className="text-emerald-400">{catCorrect}✓</strong> / <strong className="text-rose-400">{catIncorrect}✗</strong>
                  </span>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <button
                      onClick={() => onStartFlashcards({ category: cat.id })}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30 transition-colors flex items-center gap-1"
                      title="Repasar datos numéricos y siglas en modo flashcards"
                    >
                      <Zap className="w-3 h-3 fill-current" />
                      <span className="hidden sm:inline">Flashcards</span>
                    </button>
                    <button
                      onClick={() => onStartConfiguredExam({ category: cat.id, mode: 'practice', strategy: 'random', count: 10 })}
                      className="px-3 py-1 rounded-lg text-xs font-bold bg-[#14264d] text-sky-300 hover:bg-[#1a3366] transition-colors"
                    >
                      Práctica
                    </button>
                    <button
                      onClick={() => onStartConfiguredExam({ category: cat.id, mode: 'simulation', strategy: 'random', count: 10 })}
                      className="px-3 py-1 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white transition-colors"
                    >
                      Examen
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Mnemónicos Oficiales & Llamadas de Emergencia Binter Canarias */}
      {showMnemonicModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#0b162c] border border-emerald-500/40 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-gradient-to-r from-[#002f59] via-[#004b87] to-[#00522c] text-white">
              <div className="flex items-center gap-2.5">
                <LifeBuoy className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="font-black text-lg text-white">Mnemónicos & Comunicaciones de Emergencia Binter</h3>
                  <p className="text-[11px] text-emerald-200">Manual de Operaciones Parte A & Parte B (E195-E2 / SOPM)</p>
                </div>
              </div>
              <button 
                onClick={() => setShowMnemonicModal(false)}
                className="text-xs font-bold text-slate-300 hover:text-white px-3 py-1.5 bg-black/40 hover:bg-black/60 rounded-xl transition-all border border-slate-700"
              >
                Cerrar ✕
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-5 overflow-y-auto custom-scrollbar space-y-4 text-xs">
              
              {/* 1. SECCIÓN BRIEFINGS DE VUELO */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-sm text-sky-400 flex items-center gap-2 border-b border-slate-800 pb-1">
                  <PlaneTakeoff className="w-4 h-4" />
                  <span>Briefings de Despegue & Llegada (MOB 2.0.6)</span>
                </h4>

                {/* TWIN */}
                <div className="mnemonic-card-twin p-4 rounded-2xl bg-[#091224] border border-sky-500/30 space-y-1.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sky-300 text-sm">TWIN (Apertura de Briefing de Despegue y Llegada)</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40">MOB 2.0.6.1 / 2.0.6.2</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    <strong>T (Threats / TEM)</strong>: Amenazas operacionales, orografía, pájaros, estado de pista, viento cruzado.<br />
                    <strong>W (Weather)</strong>: METAR, TAF, viento, visibilidad, techos, cizalladura / Windshear.<br />
                    <strong>I (Inop Items)</strong>: MEL, CDL, DDPM aplicables a la salida o llegada.<br />
                    <strong>N (NOTAMs)</strong>: NOTAM y SNOWTAMs de salida, destino y alternativos.
                  </p>
                </div>

                {/* RETSE */}
                <div className="mnemonic-card-retse p-4 rounded-2xl bg-[#091224] border border-emerald-500/30 space-y-1.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-emerald-300 text-sm">RETSE (Takeoff Briefing en MCDU & LIDO)</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">MOB 2.0.6.1</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    <strong>R (Route)</strong>: MCDU RTE, PERF INIT, PROG, altitud de transición, nivel inicial de crucero.<br />
                    <strong>E (Engine Start & Push Back)</strong>: Procedimiento de arranque, pushback convencional o towbarless, cruce de líneas.<br />
                    <strong>T (Taxi)</strong>: Ruta de rodaje en carta LIDO, puntos calientes (Hot Spots), paradas intermedias.<br />
                    <strong>S (SID)</strong>: Salida instrumental, restricciones de altitud y velocidad, radioayudas de respaldo.<br />
                    <strong>E (EOSID / Emergency Briefing)</strong>: Fallo de motor antes/después de V1, RTO, ruta de escape en FIX INFO / PLAN.
                  </p>
                </div>

                {/* E-DALTA */}
                <div className="mnemonic-card-edalta p-4 rounded-2xl bg-[#091224] border border-amber-500/30 space-y-1.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-amber-300 text-sm">E-DALTA (Approach & Landing Briefing en MCDU & LIDO)</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">MOB 2.0.6.2</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    <strong>E (ePerf InFlight Landing)</strong>: Performance de aterrizaje en vuelo, peso, condición de pista, margen de parada.<br />
                    <strong>D (Descent)</strong>: Top of Descent, restricciones de altitud y velocidad, perfil vertical.<br />
                    <strong>A (Arrival)</strong>: STAR, aproximación frustrada (Missed Approach), altitudes de seguridad (MSA / MORA).<br />
                    <strong>L (Landing)</strong>: MCDU PERF: Flap 4 o Flap FULL, Autobrake LO/MED/HI, velocidades Vref/Vap/Vac/Vfs, MAP MIN.<br />
                    <strong>T (Taxi)</strong>: Ruta de salida de pista prevista, calles de rodaje activas.<br />
                    <strong>A (Apron)</strong>: Puesto de estacionamiento (Parking), guía de atraque, calzos.
                  </p>
                </div>
              </div>

              {/* 2. SECCIÓN EMERGENCIAS & TOMA DE DECISIONES */}
              <div className="space-y-3 pt-2">
                <h4 className="font-extrabold text-sm text-rose-400 flex items-center gap-2 border-b border-slate-800 pb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Emergencias & Desvíos Técnicos (MOB 3.0 / 3.1)</span>
                </h4>

                {/* TELSI */}
                <div className="mnemonic-card-telsi p-4 rounded-2xl bg-[#091224] border border-rose-500/40 space-y-1.5 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-rose-300 text-sm">TELSI (Briefing a Tripulación de Cabina — ¡NUNCA NITS!)</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">MOB 3.1.1 / 3.1.14</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    <strong>T (Tipo de Emergencia)</strong>: Prevista, Imprevista o Aterrizaje Inseguro.<br />
                    <strong>E (Estimated Time of Arrival)</strong>: Tiempo disponible hasta la toma de contacto.<br />
                    <strong>L (Lugar de Aterrizaje)</strong>: Pista de aeródromo, Tierra fuera de campo, Agua / Amerizaje (Ditching).<br />
                    <strong>S (Señales de Protección convenidas)</strong>: Callout por megafonía a 30 seg: <em>"PROTECCIÓN, PROTECCIÓN, PROTECCIÓN"</em>.<br />
                    <strong>I (Instrucciones Especiales)</strong>: Evacuación prevista sí/no, preparación de cabina, uso de salidas operativas.
                  </p>
                </div>

                {/* IMFLOCC */}
                <div className="mnemonic-card-imflocc p-4 rounded-2xl bg-[#091224] border border-indigo-500/30 space-y-1.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-indigo-300 text-sm">IMFLOCC (Toma de Decisiones en Desvíos Técnicos)</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">MOB 3.1.10</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    <strong>I (Inoperative Items / Incidents)</strong>: Naturaleza de la avería técnica o condición médica a bordo.<br />
                    <strong>M (Meteorological Report)</strong>: METAR/TAF y condiciones meteorológicas de alternativas.<br />
                    <strong>F (Fuel Management)</strong>: Combustible remanente sobre la alternativa vs reserva final.<br />
                    <strong>L (Landing Performance)</strong>: Cálculo ePerf con fallos de sistemas degradados.<br />
                    <strong>O (Options)</strong>: Aeródromos disponibles.<br />
                    <strong>C (Choose an Option)</strong>: Prioridad: 1° Origen/Destino de línea, 2° Red Binter con mantenimiento, 3° Adecuado más cercano.<br />
                    <strong>C (Communications)</strong>: ATC, Sobrecargo (TELSI), Megafonía Pasajeros (PA), ACARS (FREE TEXT &gt; EMR o INC___), VHF Operaciones.
                  </p>
                </div>

                {/* MEANA */}
                <div className="mnemonic-card-meana p-4 rounded-2xl bg-[#091224] border border-purple-500/30 space-y-1.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-purple-300 text-sm">MEANA (Orden de Aplicación de Listas de Chequeo)</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">MOB 3.1.0</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    <strong>1° M (Memo Items)</strong>: Acciones de memoria inmediatas.<br />
                    <strong>2° E (Emergency Checklist)</strong>: Listas de emergencia con recuadro rojo/gris.<br />
                    <strong>3° A (Abnormal Checklist)</strong>: Listas anormales principales.<br />
                    <strong>4° N (Normal Checklist)</strong>: Listas normales de la fase de vuelo.<br />
                    <strong>5° A (Abnormal Checklist restantes)</strong>: Lectura y seguimiento de notas de sistemas degradados.
                  </p>
                </div>
              </div>

              {/* 3. SECCIÓN LLAMADAS OFICIALES A TRIPULACIÓN DE CABINA */}
              <div className="space-y-3 pt-2">
                <h4 className="font-extrabold text-sm text-emerald-400 flex items-center gap-2 border-b border-slate-800 pb-1">
                  <LifeBuoy className="w-4 h-4" />
                  <span>Llamadas de Pilotos a Tripulación de Cabina en Emergencia (MOA 8.3 & MOB 3.0/3.1)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Descenso de emergencia */}
                  <div className="mnemonic-callout-card p-4 rounded-2xl bg-black/40 border border-slate-800 space-y-2 shadow-sm">
                    <span className="font-extrabold text-sky-300 text-xs flex items-center gap-1.5">
                      <span>📉</span>
                      <span>Descenso de Emergencia</span>
                    </span>
                    <div className="space-y-1.5 text-slate-300">
                      <p>
                        <span className="text-[11px] text-slate-400 font-bold block">Por Megafonía (PA):</span>
                        <strong className="font-mono text-xs text-white">"DESCENSO DE EMERGENCIA, DESCENSO DE EMERGENCIA, DESCENSO DE EMERGENCIA"</strong>
                      </p>
                      <p className="pt-1 border-t border-slate-800/80">
                        <span className="text-[11px] text-slate-400 font-bold block">Al nivelar seguro en altitud de respiración:</span>
                        <strong className="font-mono text-xs text-emerald-300">"TRIPULACIÓN DE CABINA, DESCENSO FINALIZADO"</strong>
                      </p>
                    </div>
                  </div>

                  {/* RTO */}
                  <div className="mnemonic-callout-card p-4 rounded-2xl bg-black/40 border border-slate-800 space-y-2 shadow-sm">
                    <span className="font-extrabold text-amber-300 text-xs flex items-center gap-1.5">
                      <span>🛑</span>
                      <span>Aborto de Despegue (RTO)</span>
                    </span>
                    <div className="space-y-1.5 text-slate-300">
                      <p>
                        <span className="text-[11px] text-slate-400 font-bold block">Evaluación de situación tras detenerse:</span>
                        <strong className="font-mono text-xs text-amber-300">"TRIPULACIÓN DE CABINA, ESPEREN INSTRUCCIONES"</strong>
                      </p>
                      <p className="pt-1 border-t border-slate-800/80">
                        <span className="text-[11px] text-slate-400 font-bold block">Situación controlada (sin peligro):</span>
                        <strong className="font-mono text-xs text-emerald-300">"TRIPULACIÓN DE CABINA, PERMANEZCAN SENTADOS"</strong>
                      </p>
                    </div>
                  </div>

                  {/* Ditching / Preparación */}
                  <div className="mnemonic-callout-card p-4 rounded-2xl bg-black/40 border border-slate-800 space-y-2 shadow-sm">
                    <span className="font-extrabold text-rose-300 text-xs flex items-center gap-1.5">
                      <span>🛡️</span>
                      <span>Aterrizaje Forzoso / Ditching</span>
                    </span>
                    <div className="space-y-1.5 text-slate-300">
                      <p>
                        <span className="text-[11px] text-slate-400 font-bold block">A 5 minutos de la toma de contacto:</span>
                        <strong className="font-mono text-xs text-white">"TRIPULACIÓN DE CABINA FINALIZAR PREPARACIÓN"</strong>
                      </p>
                      <p className="pt-1 border-t border-slate-800/80">
                        <span className="text-[11px] text-slate-400 font-bold block">A 30 segundos del impacto (Brace Position):</span>
                        <strong className="font-mono text-xs text-rose-400">"PROTECCIÓN, PROTECCIÓN, PROTECCIÓN"</strong>
                      </p>
                    </div>
                  </div>

                  {/* Evacuación & Turbulencia */}
                  <div className="mnemonic-callout-card p-4 rounded-2xl bg-black/40 border border-slate-800 space-y-2 shadow-sm">
                    <span className="font-extrabold text-purple-300 text-xs flex items-center gap-1.5">
                      <span>🚪</span>
                      <span>Evacuación & Turbulencia Severa</span>
                    </span>
                    <div className="space-y-1.5 text-slate-300">
                      <p>
                        <span className="text-[11px] text-slate-400 font-bold block">Evacuación ordenada en tierra (PA):</span>
                        <strong className="font-mono text-xs text-rose-400">"TRIPULACIÓN DE CABINA, EVACUACIÓN, EVACUACIÓN, EVACUACIÓN"</strong>
                      </p>
                      <p className="pt-1 border-t border-slate-800/80">
                        <span className="text-[11px] text-slate-400 font-bold block">Turbulencia Severa Inminente (PA):</span>
                        <strong className="font-mono text-xs text-amber-300">"TRIPULACIÓN DE CABINA, OCUPEN SUS ASIENTOS DE INMEDIATO"</strong>
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 bg-[#081022] flex items-center justify-between text-xs text-slate-400">
              <span>Binter Canarias Flight Operations Standards</span>
              <button
                onClick={() => setShowMnemonicModal(false)}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-glow-emerald"
              >
                Entendido
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
