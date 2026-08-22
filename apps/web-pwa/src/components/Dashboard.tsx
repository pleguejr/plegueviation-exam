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
  AlertCircle
} from 'lucide-react';
import { Question, BankManifest, QuestionStats, ExamSession, ExamMode, ExamSelectionStrategy } from '../types';
import { loadAllQuestions, loadManifest } from '../services/questionsService';
import { getAllStatsMap, getExamHistory, db } from '../services/db';

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
      
      {/* 1. Web Update Announcement Banner (Estilo AviationExam) */}
      <div className="bg-[#0b1220] border border-[#1d2d4d] rounded-2xl p-5 text-center shadow-lg relative overflow-hidden">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-1">
            <RefreshCw className="w-6 h-6 animate-spin-slow" />
          </div>
          <h2 className="text-emerald-400 font-bold text-base">
            Plegueviation Exam - Sistema Operacional Activo
          </h2>
          <p className="text-slate-200 text-xs font-semibold">
            Binter Airlines (MOA/MOB) • Flota E195-E2 • C172N • P2010 TDI • Normativa EASA & SERA
          </p>
          <div className="text-[11px] text-amber-400 font-mono flex items-center gap-1 mt-1">
            <span>⚠️ Modo Offline Habilitado (IndexedDB Local)</span>
          </div>
        </div>
      </div>

      {/* 2. Signature AviationExam Dashboard Blue Card */}
      <div className="bg-gradient-to-br from-[#77a6cb] via-[#6392b8] to-[#4c7ca3] text-[#0d2238] rounded-2xl p-6 shadow-xl border border-sky-300/40">
        
        {/* Top bar of card */}
        <div className="flex items-center justify-between pb-4 border-b border-sky-800/15">
          <h1 className="text-3xl font-extrabold text-[#091b2e] tracking-tight">
            Dashboard
          </h1>
          <div className="text-right">
            <span className="text-sm font-semibold text-[#133052]">Average score: </span>
            <span className="text-2xl font-black text-[#091b2e]">{overallAccuracy} %</span>
          </div>
        </div>

        {/* Central Chart / Grid Area */}
        <div className="py-8 my-2">
          {history.length >= 3 ? (
            <div className="space-y-3">
              <div className="h-28 flex items-end gap-2 bg-[#8bb4d4]/40 p-3 rounded-xl border border-sky-200/50">
                {history.slice(0, 20).reverse().map((h, i) => {
                  const pct = h.score?.percentage || 0;
                  const passed = pct >= 75;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                      <div 
                        className={`w-full rounded-t transition-all ${passed ? 'bg-emerald-600' : 'bg-rose-600'}`}
                        style={{ height: `${Math.max(10, pct)}%` }}
                      />
                      <span className="text-[9px] font-mono font-bold text-[#091b2e]">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-[#446d91] rounded-xl p-8 text-center bg-[#84afcf]/30">
              <p className="text-sm font-medium text-[#112942]">
                Here you will see your progress when you complete at least 3 tests
              </p>
              <div className="mt-3 flex items-center justify-center gap-2">
                <button
                  onClick={() => onStartConfiguredExam({ mode: 'practice', strategy: 'random', count: 10 })}
                  className="px-4 py-1.5 rounded-lg bg-[#0f2d4e] hover:bg-[#163e6b] text-white text-xs font-bold shadow-md transition-all active:scale-95"
                >
                  Iniciar Primer Test Ahora
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom bar of card */}
        <div className="flex items-center justify-between text-xs font-semibold text-[#112b45] pt-2 border-t border-sky-800/15">
          <span>Score of your last 30 tests</span>
          <span>{seenCount} Questions seen (de {totalQuestions})</span>
        </div>

      </div>

      {/* 3. AviationExam Circular Hub Navigation Grid (1:1 Réplica) */}
      <div className="bg-[#0e1933] border border-sky-500/20 rounded-3xl p-8 shadow-xl space-y-6">
        
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
                className="bg-[#0e1933] border border-sky-500/20 rounded-2xl p-5 flex flex-col justify-between shadow-lg hover:border-sky-500/40 transition-all group"
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

      {/* Modal Mnemónicos Binter */}
      {showMnemonicModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0c1833] border border-sky-500/40 rounded-3xl w-full max-w-xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <LifeBuoy className="w-5 h-5 text-sky-400" />
                <h3 className="font-black text-lg text-white">Mnemónicos y Flujos Binter</h3>
              </div>
              <button 
                onClick={() => setShowMnemonicModal(false)}
                className="text-xs font-bold text-slate-400 hover:text-white px-2 py-1 bg-slate-800 rounded-lg"
              >
                Cerrar ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-[#091224] border border-sky-500/20 space-y-1.5">
                <span className="font-black text-sky-400 text-sm">RETSE (Gestión de Emergencias)</span>
                <p className="text-slate-300 leading-relaxed">
                  <strong>R</strong>evisar situación • <strong>E</strong>legir plan de acción • <strong>T</strong>iempo disponible • <strong>S</strong>eleccionar alternativa • <strong>E</strong>jecutar y comunicar.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#091224] border border-sky-500/20 space-y-1.5">
                <span className="font-black text-emerald-400 text-sm">E-DALTA (Toma de Decisiones)</span>
                <p className="text-slate-300 leading-relaxed">
                  <strong>E</strong>xplore • <strong>D</strong>iagnose • <strong>A</strong>ssess risks • <strong>L</strong>ist options • <strong>T</strong>ake action • <strong>A</strong>ssign tasks.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#091224] border border-sky-500/20 space-y-1.5">
                <span className="font-black text-rose-400 text-sm">IMFLOCC (Briefing Operacional / Tripulación)</span>
                <p className="text-slate-300 leading-relaxed">
                  <strong>I</strong>ntention • <strong>M</strong>aintenance/MEL • <strong>F</strong>uel • <strong>L</strong>ogistics • <strong>O</strong>perations • <strong>C</strong>ommunications • <strong>C</strong>rew.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
