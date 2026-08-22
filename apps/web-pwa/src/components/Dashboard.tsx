import React, { useEffect, useState } from 'react';
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
  BarChart3
} from 'lucide-react';
import { Question, BankManifest, QuestionStats, ExamSession, ExamMode, ExamSelectionStrategy } from '../types';
import { loadAllQuestions, loadManifest } from '../services/questionsService';
import { getAllStatsMap, getExamHistory, db } from '../services/db';
import { filterFlashcards } from '../utils/flashcardFilter';

interface DashboardProps {
  onStartConfiguredExam: (params: {
    category?: string;
    mode: ExamMode;
    strategy: ExamSelectionStrategy;
    count?: number;
  }) => void;
  onStartFlashcards: (params?: { category?: string }) => void;
  onOpenNewExam: () => void;
  onNavigateTab: (tab: 'explorer' | 'reports' | 'settings') => void;
  onOpenImporter: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onStartConfiguredExam,
  onStartFlashcards,
  onOpenNewExam,
  onNavigateTab,
  onOpenImporter
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [manifest, setManifest] = useState<BankManifest | null>(null);
  const [statsMap, setStatsMap] = useState<Record<string, QuestionStats>>({});
  const [history, setHistory] = useState<ExamSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMnemonicModal, setShowMnemonicModal] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [qs, mf, sm, hist] = await Promise.all([
        loadAllQuestions(),
        loadManifest(),
        getAllStatsMap(),
        getExamHistory(30)
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
      
      {/* 1. Web Update Announcement Banner (Estilo Binter Canarias) */}
      <div className="dashboard-announcement-banner bg-[#0b1426] border border-emerald-500/30 rounded-2xl p-5 text-center shadow-lg relative overflow-hidden">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-1">
            <RefreshCw className="w-6 h-6 animate-spin-slow" />
          </div>
          <h2 className="text-emerald-400 font-extrabold text-base tracking-tight">
            Plegueviation Exam — Sistema Operacional Binter Canarias
          </h2>
          <p className="text-slate-200 text-xs font-semibold">
            Binter Airlines (MOA/MOB) • Flota E195-E2 • C172N • P2010 TDI • Normativa EASA & SERA
          </p>
          <div className="flex items-center gap-3 pt-1 text-[11px] font-mono">
            <span className="text-amber-400 font-bold">⚠️ Modo Offline Habilitado (IndexedDB Local)</span>
            <span className="text-emerald-300 font-bold hidden sm:inline">• {totalQuestions} Reactivos Oficiales</span>
            <span className="text-sky-300 font-bold hidden sm:inline">• ⚡ Flashcards Activas</span>
          </div>
        </div>
      </div>

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

        {/* Central Historical Chart Area */}
        {history.length > 0 && (
          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold text-slate-300">Tendencia de los Últimos {Math.min(24, history.length)} Simulacros:</span>
              <span className="font-mono text-[11px]">{history.length} completados</span>
            </div>
            <div className="h-20 flex items-end gap-1.5 bg-black/40 p-2.5 rounded-2xl border border-slate-800">
              {history.slice(0, 24).reverse().map((h, i) => {
                const pct = h.score?.percentage || 0;
                const passed = pct >= 75;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                    <div 
                      className={`w-full rounded-t transition-all ${passed ? 'bg-[#008f45] shadow-glow-emerald' : 'bg-rose-600 shadow-glow-rose'}`}
                      style={{ height: `${Math.max(12, pct)}%` }}
                      title={`Simulacro #${i + 1}: ${pct}% (${passed ? 'APTO' : 'NO APTO'})`}
                    />
                  </div>
                );
              })}
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

          {/* 6. MNEMÓNICOS & SOPs */}
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
                      <span key={st.id} className="text-[10px] px-2 py-0.5 rounded bg-[#091224] text-slate-300 border border-slate-800">
                        {st.title} ({st.count})
                      </span>
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
