import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { ExamConfigModal } from './components/ExamConfigModal';
import { ExamScreen } from './components/ExamScreen';
import { ExamResults } from './components/ExamResults';
import { QuestionExplorer } from './components/QuestionExplorer';
import { ReportsScreen } from './components/ReportsScreen';
import { BankImporterModal } from './components/BankImporterModal';
import { Question, BankManifest, QuestionStats, ExamConfig, ExamSession, ExamMode, ExamSelectionStrategy } from './types';
import { loadAllQuestions, loadManifest, generateExamQuestions, randomizeQuestionOptions } from './services/questionsService';
import { getAllStatsMap, saveExamSession, recordAnswerStat, exportFullBackup, restoreFullBackup, db } from './services/db';
import { 
  User, 
  RotateCcw, 
  Trash2,
  ArrowLeft,
  Download,
  Upload
} from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'explorer' | 'reports' | 'settings' | 'exam' | 'results'>('dashboard');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [manifest, setManifest] = useState<BankManifest | null>(null);
  const [statsMap, setStatsMap] = useState<Record<string, QuestionStats>>({});
  
  // Modals state
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isImporterOpen, setIsImporterOpen] = useState(false);
  const [modalDefaults, setModalDefaults] = useState<{
    category?: string;
    mode?: ExamMode;
    strategy?: ExamSelectionStrategy;
  }>({});

  // Active Exam Session
  const [currentSession, setCurrentSession] = useState<ExamSession | null>(null);

  const refreshData = async () => {
    const [qs, mf, sm] = await Promise.all([
      loadAllQuestions(),
      loadManifest(),
      getAllStatsMap()
    ]);
    setQuestions(qs || []);
    setManifest(mf);
    setStatsMap(sm || {});
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Register service worker for offline PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch((err) => {
          console.warn('Service Worker registration error:', err);
        });
      });
    }
  }, []);

  const handleOpenConfigModal = (defaults?: {
    category?: string;
    mode?: ExamMode;
    strategy?: ExamSelectionStrategy;
  }) => {
    setModalDefaults(defaults || {});
    setIsConfigModalOpen(true);
  };

  const handleStartExam = async (config: ExamConfig) => {
    setIsConfigModalOpen(false);
    const examQuestions = await generateExamQuestions(config);

    if (examQuestions.length === 0) {
      alert('No se encontraron preguntas que coincidan con los filtros seleccionados.');
      return;
    }

    const newSession: ExamSession = {
      sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      config,
      startTime: Date.now(),
      endTime: null,
      currentIndex: 0,
      questions: examQuestions,
      answers: {},
      isCompleted: false,
      score: null
    };

    setCurrentSession(newSession);
    setCurrentView('exam');
  };

  const handleStartCustomQuiz = async (questionIds: string[]) => {
    const all = await loadAllQuestions();
    const selected = all.filter((q) => questionIds.includes(q.id));
    if (selected.length === 0) return;

    const config: ExamConfig = {
      categories: [],
      count: selected.length,
      mode: 'practice',
      strategy: 'random',
      passMarkPercentage: 75
    };

    const session: ExamSession = {
      sessionId: `custom_${Date.now()}`,
      config,
      startTime: Date.now(),
      endTime: null,
      currentIndex: 0,
      questions: selected.map(randomizeQuestionOptions),
      answers: {},
      isCompleted: false,
      score: null
    };

    setCurrentSession(session);
    setCurrentView('exam');
  };

  const handleFinishExam = async () => {
    if (!currentSession) return;

    const total = currentSession.questions.length;
    let correct = 0;
    let answered = 0;
    const passThreshold = currentSession.config.passMarkPercentage || 75;

    for (const q of currentSession.questions) {
      const ans = currentSession.answers[q.id];
      if (ans && ans.selectedOptionId !== null) {
        answered++;
        const correctOpt = q.options.find((o) => o.is_correct);
        const isCorrect = correctOpt?.id === ans.selectedOptionId;
        ans.isCorrect = isCorrect;

        if (isCorrect) correct++;

        if (currentSession.config.mode === 'simulation') {
          await recordAnswerStat(
            q.id,
            ans.selectedOptionId,
            isCorrect,
            ans.timeSpentSeconds || 30,
            currentSession.config.mode
          );
        }
      }
    }

    const pct = total > 0 ? Math.round((correct / total) * 1000) / 10 : 0;
    const passed = pct >= passThreshold;

    const completedSession: ExamSession = {
      ...currentSession,
      endTime: Date.now(),
      isCompleted: true,
      score: {
        totalQuestions: total,
        answeredQuestions: answered,
        correctCount: correct,
        incorrectCount: total - correct,
        percentage: pct,
        passed
      }
    };

    setCurrentSession(completedSession);
    await saveExamSession(completedSession);
    await refreshData();
    setCurrentView('results');
  };

  const handleRestartSameExam = () => {
    if (!currentSession) return;
    handleStartExam(currentSession.config);
  };

  const handleRetryFailedOnly = () => {
    if (!currentSession) return;
    const failedQuestions = currentSession.questions.filter((q) => {
      const ans = currentSession.answers[q.id];
      return ans?.isCorrect === false || !ans?.selectedOptionId;
    });

    if (failedQuestions.length === 0) return;

    const config: ExamConfig = {
      categories: currentSession.config.categories,
      count: failedQuestions.length,
      mode: 'practice',
      strategy: 'random',
      passMarkPercentage: 75
    };

    const newSession: ExamSession = {
      sessionId: `retry_failed_${Date.now()}`,
      config,
      startTime: Date.now(),
      endTime: null,
      currentIndex: 0,
      questions: failedQuestions.map(randomizeQuestionOptions),
      answers: {},
      isCompleted: false,
      score: null
    };

    setCurrentSession(newSession);
    setCurrentView('exam');
  };

  const handleResetAllData = async () => {
    if (confirm('⚠️ ¿Estás seguro de reiniciar todas las estadísticas y el historial de exámenes a cero?')) {
      await db.questionStats.clear();
      await db.examSessions.clear();
      await refreshData();
      alert('✅ Datos reiniciados con éxito.');
    }
  };

  return (
    <div className="min-h-screen bg-[#070e1e] text-slate-100 flex flex-col font-sans">
      {/* Top AviationExam Navbar */}
      <Navbar
        currentTab={currentView === 'explorer' ? 'explorer' : currentView === 'reports' ? 'reports' : currentView === 'settings' ? 'settings' : 'dashboard'}
        onSelectTab={(tab) => setCurrentView(tab)}
        onOpenNewExam={() => handleOpenConfigModal()}
        onOpenImporter={() => setIsImporterOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 px-4 lg:px-8 py-6 max-w-7xl w-full mx-auto">
        {currentView === 'dashboard' && (
          <Dashboard
            onStartConfiguredExam={(params) => handleStartExam({
              categories: params.category ? [params.category] : [],
              count: params.count || 20,
              mode: params.mode,
              strategy: params.strategy,
              passMarkPercentage: 75
            })}
            onOpenNewExam={() => handleOpenConfigModal()}
            onNavigateTab={(tab) => setCurrentView(tab)}
            onOpenImporter={() => setIsImporterOpen(true)}
          />
        )}

        {currentView === 'explorer' && (
          <QuestionExplorer
            questions={questions}
            statsMap={statsMap}
            manifest={manifest}
            onRefreshStats={refreshData}
            onStartCustomQuiz={handleStartCustomQuiz}
            onGoToDashboard={() => setCurrentView('dashboard')}
          />
        )}

        {currentView === 'reports' && (
          <ReportsScreen
            questions={questions}
            manifest={manifest}
            onGoToDashboard={() => setCurrentView('dashboard')}
            onReviewExam={(sess) => {
              setCurrentSession(sess);
              setCurrentView('results');
            }}
            onRestartExam={(sess) => {
              handleStartExam(sess.config);
            }}
          />
        )}

        {currentView === 'settings' && (
          <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
            <div className="flex items-center justify-between py-1 border-b border-sky-500/20">
              <button
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center gap-2 font-bold text-sky-400 hover:text-sky-300 text-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>My Account & Settings</span>
              </button>
            </div>

            <div className="bg-[#0e1933] border border-sky-500/20 rounded-2xl p-6 space-y-6 shadow-xl">
              <div className="flex items-center gap-4 pb-4 border-b border-slate-800">
                <div className="w-14 h-14 rounded-2xl bg-sky-600 flex items-center justify-center text-xl font-black text-white shadow-lg">
                  P
                </div>
                <div>
                  <h2 className="text-lg font-black text-white">Pleguejr</h2>
                  <p className="text-xs text-sky-300 font-semibold">Primer Oficial (F/O) Embraer 195-E2 • Candidato a Comandante Binter</p>
                </div>
              </div>

              {/* Copia de Seguridad y Sincronización Google Drive / Archivo */}
              <div className="p-5 rounded-2xl bg-[#091224] border border-sky-500/30 space-y-4">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                  <Download className="w-5 h-5" />
                  <span>Copia de Seguridad & Sincronización (Google Drive / Archivo)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Exporta tu historial de exámenes, aciertos, fallos y preguntas guardadas en un archivo JSON para tener una copia de respaldo en tu Google Drive o transferir tus datos a otro dispositivo (iPad, iPhone o PC).
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={async () => {
                      const jsonStr = await exportFullBackup();
                      const blob = new Blob([jsonStr], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      const dateStr = new Date().toISOString().split('T')[0];
                      a.href = url;
                      a.download = `plegueviation_backup_${dateStr}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-glow-sky transition-all active:scale-95 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Descargar Copia de Seguridad (.json)</span>
                  </button>

                  <label className="px-4 py-2.5 rounded-xl text-xs font-bold bg-cockpit-surface hover:bg-slate-800 text-sky-300 border border-sky-500/30 cursor-pointer transition-all active:scale-95 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span>Restaurar Copia desde Archivo</span>
                    <input
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const text = await file.text();
                        try {
                          const result = await restoreFullBackup(text);
                          await refreshData();
                          alert(`✅ Copia de seguridad restaurada con éxito:\n- ${result.statsCount} estadísticas de preguntas\n- ${result.sessionsCount} sesiones de examen\n- ${result.customCount} preguntas personalizadas`);
                        } catch (err) {
                          alert(`❌ Error al leer el archivo de copia de seguridad: ${err}`);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Botón de reinicio completo */}
              <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-500/30 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <RotateCcw className="w-5 h-5" />
                  <span>Zona de Reinicio de Estadísticas</span>
                </div>
                <p className="text-xs text-slate-300">
                  Usa este botón si deseas borrar todos los intentos de examen y estadísticas acumuladas para empezar un nuevo ciclo de estudio completamente limpio.
                </p>
                <button
                  onClick={handleResetAllData}
                  className="px-4 py-2 rounded-xl text-xs font-black bg-rose-600 hover:bg-rose-500 text-white shadow-glow-rose transition-all active:scale-95 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Reiniciar Todos los Datos a Cero</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'exam' && currentSession && (
          <ExamScreen
            session={currentSession}
            onUpdateSession={(updated) => setCurrentSession(updated)}
            onFinishExam={handleFinishExam}
            onExitExam={() => setCurrentView('dashboard')}
          />
        )}

        {currentView === 'results' && currentSession && (
          <ExamResults
            session={currentSession}
            onRestartSameExam={handleRestartSameExam}
            onRetryFailedOnly={handleRetryFailedOnly}
            onGoToDashboard={() => setCurrentView('dashboard')}
          />
        )}
      </main>

      {/* Modals */}
      <ExamConfigModal
        manifest={manifest}
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        onStartExam={handleStartExam}
        defaultCategory={modalDefaults.category}
        defaultMode={modalDefaults.mode}
        defaultStrategy={modalDefaults.strategy}
      />

      <BankImporterModal
        isOpen={isImporterOpen}
        onClose={() => setIsImporterOpen(false)}
        onImportSuccess={() => {
          refreshData();
        }}
      />
    </div>
  );
}

export default App;
