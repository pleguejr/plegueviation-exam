import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ArrowLeft, 
  Timer, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Play, 
  Layers, 
  Clock, 
  Volume2, 
  VolumeX, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Brain,
  Calculator,
  Hash,
  Trophy,
  Award,
  AlertTriangle
} from 'lucide-react';
import { generateMathQuestion, MathQuestion } from './AonMathEngine';
import { 
  generateTriangleTask, 
  generateNumberSequenceTask, 
  TriangleTaskQuestion, 
  NumberSequenceQuestion, 
  SilhouetteItem, 
  TriangleDirection 
} from './AonMultitaskingEngine';
import { 
  evaluateAonMultitaskingScore, 
  MultitaskingPsychometricReport 
} from './AonPsychometricsNorms';

interface AonMultitaskingScreenProps {
  onBackToDashboard: () => void;
}

export type MultitaskGameMode = 'triple-exam' | 'pure-triangle' | 'pure-math' | 'pure-numbers';

export interface MultitaskingSessionRecord {
  date: string;
  durationSeconds: number;
  mode: MultitaskGameMode;
  overallScore: number;
  stanine: number;
  percentile: number;
  zScore: number;
  passed: boolean;
  classification: string;
  triangleMetrics: {
    total: number;
    correct: number;
    wrong: number;
    timeouts: number;
    accuracy: number;
    stanine: number;
    percentile: number;
  };
  mathMetrics: {
    total: number;
    correct: number;
    wrong: number;
    accuracy: number;
    stanine: number;
    percentile: number;
  };
  numberMetrics: {
    total: number;
    correct: number;
    wrong: number;
    accuracy: number;
    stanine: number;
    percentile: number;
  };
}

export const AonMultitaskingScreen: React.FC<AonMultitaskingScreenProps> = ({ onBackToDashboard }) => {
  // Estados de navegación: 'intro' | 'playing' | 'results'
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'results'>('intro');
  const [activeMode, setActiveMode] = useState<MultitaskGameMode>('triple-exam');

  // Configuración de Duración (5 min oficial Aon, 3 min rápido, 8 min resistencia)
  const [examDuration, setExamDuration] = useState<number>(300); // 300s = 5m
  const [timeLeft, setTimeLeft] = useState<number>(300);

  // Audio sintetizado
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // ==========================================================================
  // ESTADOS DE LA TAREA 1: TRIÁNGULO IZQ / DER + BARRA TEMPORAL
  // ==========================================================================
  const TRIANGLE_TIMEOUT_MS = 5500; // 5.5 segundos oficiales AON / cut-e
  const [currentTriangleTask, setCurrentTriangleTask] = useState<TriangleTaskQuestion | null>(null);
  const [triangleTimeLeftMs, setTriangleTimeLeftMs] = useState<number>(TRIANGLE_TIMEOUT_MS);
  const [triangleCorrect, setTriangleCorrect] = useState<number>(0);
  const [triangleWrong, setTriangleWrong] = useState<number>(0);
  const [triangleTimeouts, setTriangleTimeouts] = useState<number>(0);
  const [triangleFeedback, setTriangleFeedback] = useState<'correct' | 'wrong' | 'timeout' | null>(null);
  const triangleTimerRef = useRef<any>(null);
  const triangleLastTickRef = useRef<number>(Date.now());

  // ==========================================================================
  // ESTADOS DE LA TAREA 2: CÁLCULO MENTAL (SUMAS Y RESTAS)
  // ==========================================================================
  const [currentMath, setCurrentMath] = useState<MathQuestion | null>(null);
  const [mathCorrect, setMathCorrect] = useState<number>(0);
  const [mathWrong, setMathWrong] = useState<number>(0);
  const [mathFeedback, setMathFeedback] = useState<'correct' | 'wrong' | null>(null);

  // ==========================================================================
  // ESTADOS DE LA TAREA 3: SECUENCIA NUMÉRICA (DUPLICADOS O NO)
  // ==========================================================================
  const [currentNumberTask, setCurrentNumberTask] = useState<NumberSequenceQuestion | null>(null);
  const [numCorrect, setNumCorrect] = useState<number>(0);
  const [numWrong, setNumWrong] = useState<number>(0);
  const [numberFeedback, setNumberFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Reporte psicométrico final
  const [psychometricReport, setPsychometricReport] = useState<MultitaskingPsychometricReport | null>(null);

  // Historial persistente en LocalStorage
  const [history, setHistory] = useState<MultitaskingSessionRecord[]>(() => {
    try {
      const saved = localStorage.getItem('plegueviation_aon_multitask_kura_v3');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Temporizadores
  const mainExamTimerRef = useRef<any>(null);

  // Inicializar Web Audio API
  const getAudioContext = useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playSuccessChime = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(1174, ctx.currentTime + 0.12); // D6
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } catch {}
  }, [isMuted, getAudioContext]);

  const playErrorBuzz = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch {}
  }, [isMuted, getAudioContext]);

  // ==========================================================================
  // GENERADORES DE REACTIVOS
  // ==========================================================================
  const loadNextTriangleTask = useCallback(() => {
    const nextQ = generateTriangleTask(7);
    setCurrentTriangleTask(nextQ);
    setTriangleTimeLeftMs(TRIANGLE_TIMEOUT_MS);
    triangleLastTickRef.current = Date.now();
  }, []);

  const loadNextMathTask = useCallback(() => {
    const nextQ = generateMathQuestion(2);
    setCurrentMath(nextQ);
  }, []);

  const loadNextNumberTask = useCallback(() => {
    const nextQ = generateNumberSequenceTask(7);
    setCurrentNumberTask(nextQ);
  }, []);

  // Iniciar Sesión de Prueba
  const startSession = (mode: MultitaskGameMode) => {
    setActiveMode(mode);
    setTimeLeft(examDuration);

    setTriangleCorrect(0);
    setTriangleWrong(0);
    setTriangleTimeouts(0);
    setTriangleFeedback(null);

    setMathCorrect(0);
    setMathWrong(0);
    setMathFeedback(null);

    setNumCorrect(0);
    setNumWrong(0);
    setNumberFeedback(null);

    loadNextTriangleTask();
    loadNextMathTask();
    loadNextNumberTask();

    setGameState('playing');
  };

  // Finalizar Sesión y procesar baremo psicométrico de pilotos
  const finishSession = useCallback(() => {
    if (mainExamTimerRef.current) clearInterval(mainExamTimerRef.current);
    if (triangleTimerRef.current) clearInterval(triangleTimerRef.current);

    setGameState('results');

    // Procesar reporte psicométrico con baremo normativo de pilotos
    const report = evaluateAonMultitaskingScore(
      triangleCorrect,
      triangleWrong,
      triangleTimeouts,
      mathCorrect,
      mathWrong,
      numCorrect,
      numWrong,
      examDuration
    );

    setPsychometricReport(report);

    const record: MultitaskingSessionRecord = {
      date: new Date().toLocaleDateString('es-ES', { 
        day: '2-digit', 
        month: 'short', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      durationSeconds: examDuration,
      mode: activeMode,
      overallScore: Math.round(report.overall.netScore),
      stanine: report.overall.stanine,
      percentile: report.overall.percentile,
      zScore: report.overall.zScore,
      passed: report.overall.easaPass,
      classification: report.overall.classification,
      triangleMetrics: {
        total: report.subtasks.triangle.total,
        correct: report.subtasks.triangle.correct,
        wrong: report.subtasks.triangle.wrong,
        timeouts: triangleTimeouts,
        accuracy: report.subtasks.triangle.accuracy,
        stanine: report.subtasks.triangle.stanine,
        percentile: report.subtasks.triangle.percentile,
      },
      mathMetrics: {
        total: report.subtasks.math.total,
        correct: report.subtasks.math.correct,
        wrong: report.subtasks.math.wrong,
        accuracy: report.subtasks.math.accuracy,
        stanine: report.subtasks.math.stanine,
        percentile: report.subtasks.math.percentile,
      },
      numberMetrics: {
        total: report.subtasks.numerical.total,
        correct: report.subtasks.numerical.correct,
        wrong: report.subtasks.numerical.wrong,
        accuracy: report.subtasks.numerical.accuracy,
        stanine: report.subtasks.numerical.stanine,
        percentile: report.subtasks.numerical.percentile,
      },
    };

    setHistory((prev) => {
      const updated = [record, ...prev].slice(0, 30);
      try {
        localStorage.setItem('plegueviation_aon_multitask_kura_v3', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, [
    activeMode, 
    examDuration, 
    triangleCorrect, 
    triangleWrong, 
    triangleTimeouts, 
    mathCorrect, 
    mathWrong, 
    numCorrect, 
    numWrong
  ]);

  // Temporizador Principal del Examen
  useEffect(() => {
    if (gameState !== 'playing') return;

    mainExamTimerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(mainExamTimerRef.current!);
          finishSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (mainExamTimerRef.current) clearInterval(mainExamTimerRef.current);
    };
  }, [gameState, finishSession]);

  // Bucle de cuenta atrás de la Barra Temporal Vertical de la Tarea 1
  useEffect(() => {
    if (gameState !== 'playing' || activeMode === 'pure-math' || activeMode === 'pure-numbers') {
      return;
    }

    triangleLastTickRef.current = Date.now();
    triangleTimerRef.current = setInterval(() => {
      const now = Date.now();
      const delta = now - triangleLastTickRef.current;
      triangleLastTickRef.current = now;

      setTriangleTimeLeftMs((prev) => {
        const nextVal = prev - delta;
        if (nextVal <= 0) {
          // Timeout en la barra vertical
          setTriangleTimeouts((t) => t + 1);
          playErrorBuzz();
          setTriangleFeedback('timeout');
          setTimeout(() => setTriangleFeedback(null), 250);
          loadNextTriangleTask();
          return TRIANGLE_TIMEOUT_MS;
        }
        return nextVal;
      });
    }, 50);

    return () => {
      if (triangleTimerRef.current) clearInterval(triangleTimerRef.current);
    };
  }, [gameState, activeMode, playErrorBuzz, loadNextTriangleTask]);

  // ==========================================================================
  // MANEJADORES DE ENTRADA
  // ==========================================================================

  // Manejador Tarea 1: Dirección del Triángulo (Left o Right)
  const handleTriangleAnswer = useCallback((direction: TriangleDirection) => {
    if (!currentTriangleTask || gameState !== 'playing') return;

    const isCorrect = direction === currentTriangleTask.targetDirection;
    if (isCorrect) {
      setTriangleCorrect((c) => c + 1);
      playSuccessChime();
      setTriangleFeedback('correct');
    } else {
      setTriangleWrong((w) => w + 1);
      playErrorBuzz();
      setTriangleFeedback('wrong');
    }

    setTimeout(() => setTriangleFeedback(null), 180);
    loadNextTriangleTask();
  }, [currentTriangleTask, gameState, playSuccessChime, playErrorBuzz, loadNextTriangleTask]);

  // Manejador Tarea 2: Cálculo Mental (Correcto o Incorrecto)
  const handleMathAnswer = useCallback((userAnswerCorrect: boolean) => {
    if (!currentMath || gameState !== 'playing') return;

    const isCorrect = userAnswerCorrect === currentMath.isMathematicallyCorrect;
    if (isCorrect) {
      setMathCorrect((c) => c + 1);
      playSuccessChime();
      setMathFeedback('correct');
    } else {
      setMathWrong((w) => w + 1);
      playErrorBuzz();
      setMathFeedback('wrong');
    }

    setTimeout(() => setMathFeedback(null), 180);
    loadNextMathTask();
  }, [currentMath, gameState, playSuccessChime, playErrorBuzz, loadNextMathTask]);

  // Manejador Tarea 3: Duplicados Numéricos (Duplicate o No Duplicate)
  const handleNumberAnswer = useCallback((userAnswerDuplicate: boolean) => {
    if (!currentNumberTask || gameState !== 'playing') return;

    const isCorrect = userAnswerDuplicate === currentNumberTask.hasDuplicate;
    if (isCorrect) {
      setNumCorrect((c) => c + 1);
      playSuccessChime();
      setNumberFeedback('correct');
    } else {
      setNumWrong((w) => w + 1);
      playErrorBuzz();
      setNumberFeedback('wrong');
    }

    setTimeout(() => setNumberFeedback(null), 180);
    loadNextNumberTask();
  }, [currentNumberTask, gameState, playSuccessChime, playErrorBuzz, loadNextNumberTask]);

  // Atajos de teclado físicos
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Tarea 1: Flechas Izq/Der o A/D
      if (activeMode === 'triple-exam' || activeMode === 'pure-triangle') {
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
          e.preventDefault();
          handleTriangleAnswer('left');
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
          e.preventDefault();
          handleTriangleAnswer('right');
        }
      }

      // Tarea 2: Teclas 1 (Correct) o 2 (Wrong)
      if (activeMode === 'triple-exam' || activeMode === 'pure-math') {
        if (e.key === '1') {
          e.preventDefault();
          handleMathAnswer(true);
        } else if (e.key === '2') {
          e.preventDefault();
          handleMathAnswer(false);
        }
      }

      // Tarea 3: Teclas 3 (Duplicate) o 4 (No Duplicate)
      if (activeMode === 'triple-exam' || activeMode === 'pure-numbers') {
        if (e.key === '3') {
          e.preventDefault();
          handleNumberAnswer(true);
        } else if (e.key === '4') {
          e.preventDefault();
          handleNumberAnswer(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    gameState, 
    activeMode, 
    handleTriangleAnswer, 
    handleMathAnswer, 
    handleNumberAnswer
  ]);

  // Formato mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  /**
   * Renderizador de siluetas geométricas negras de la Tarea 1
   * Exactamente como en los screenshots oficiales de Kura / Cut-E
   */
  const renderSilhouetteShape = (item: SilhouetteItem, sizeClass = 'w-9 h-9 sm:w-11 sm:h-11') => {
    const fillClass = 'fill-slate-900 dark:fill-slate-100';

    switch (item.type) {
      case 'triangle_left':
        return (
          <svg className={sizeClass} viewBox="0 0 100 100">
            <polygon points="80,18 20,50 80,82" className={fillClass} />
          </svg>
        );
      case 'triangle_right':
        return (
          <svg className={sizeClass} viewBox="0 0 100 100">
            <polygon points="20,18 80,50 20,82" className={fillClass} />
          </svg>
        );
      case 'triangle_up':
        return (
          <svg className={sizeClass} viewBox="0 0 100 100">
            <polygon points="50,16 85,84 15,84" className={fillClass} />
          </svg>
        );
      case 'triangle_down':
        return (
          <svg className={sizeClass} viewBox="0 0 100 100">
            <polygon points="15,16 85,16 50,84" className={fillClass} />
          </svg>
        );
      case 'hexagon':
        return (
          <svg className={sizeClass} viewBox="0 0 100 100">
            <polygon points="26,18 74,18 95,50 74,82 26,82 5,50" className={fillClass} />
          </svg>
        );
      case 'trapezoid':
        return (
          <svg className={sizeClass} viewBox="0 0 100 100">
            <polygon points="15,20 85,20 70,80 30,80" className={fillClass} />
          </svg>
        );
      case 'diamond':
        return (
          <svg className={sizeClass} viewBox="0 0 100 100">
            <polygon points="50,15 85,50 50,85 15,50" className={fillClass} />
          </svg>
        );
      case 'oval':
        return (
          <svg className={sizeClass} viewBox="0 0 100 100">
            <ellipse cx="50" cy="50" rx="42" ry="26" className={fillClass} />
          </svg>
        );
      case 'parallelogram':
        return (
          <svg className={sizeClass} viewBox="0 0 100 100">
            <polygon points="32,20 92,20 68,80 8,80" className={fillClass} />
          </svg>
        );
      case 'circle':
        return (
          <svg className={sizeClass} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="34" className={fillClass} />
          </svg>
        );
      default:
        return null;
    }
  };

  // ==========================================================================
  // 1. PANTALLA INTRODUCCIÓN / REGLAS & MODOS
  // ==========================================================================
  if (gameState === 'intro') {
    return (
      <div className="aon-multitask-screen space-y-6 max-w-4xl mx-auto p-4 sm:p-6 animate-fade-in">
        {/* Cabecera */}
        <div className="aon-multitask-header flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-700/60">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToDashboard}
              className="aon-multitask-back-btn p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors shadow-sm"
              title="Volver al Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase">
                  AON cut-e Assessment
                </span>
                <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Stage 2 NetJets Europe
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <Layers className="w-6 h-6 text-rose-400" />
                <span>Cut-E/AON: Multitasking Capability (Oficial)</span>
              </h1>
            </div>
          </div>

          {/* Sonido */}
          <button
            onClick={() => setIsMuted((m) => !m)}
            className={`aon-multitask-audio-btn p-2 rounded-lg border text-xs font-bold transition-all flex items-center gap-1.5 ${
              isMuted
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                : 'bg-slate-800/80 border-slate-700 text-emerald-300 hover:bg-slate-700'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isMuted ? 'Mudo' : 'Audio OK'}</span>
          </button>
        </div>

        {/* Tarjeta de Especificación Oficial Kura / NetJets */}
        <div className="aon-multitask-intro-card bg-gradient-to-br from-slate-900 via-aviation-950 to-slate-900 border border-rose-500/30 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-amber-600 flex items-center justify-center shrink-0 shadow-lg">
              <Layers className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wide">
                  Especificación Oficial Actualizada AON / Kura
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">
                Estructura de las Tres Tareas Simultáneas (5 Minutos)
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                El candidato debe resolver simultáneamente y sin pausas las 3 tareas cognitivas independientes divididas en pantalla:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="aon-multitask-intro-subcard p-3.5 rounded-xl bg-slate-800/70 border border-sky-500/30 space-y-1.5">
              <span className="font-bold text-sky-400 flex items-center gap-1.5">
                <ChevronLeft className="w-4 h-4" /><ChevronRight className="w-4 h-4 -ml-2" />
                <span>1. Orientación de Triángulo</span>
              </span>
              <p className="text-slate-300 leading-relaxed">
                Fila de 7 figuras: identifica si el triángulo apunta a la <strong>Izquierda [ ◀ ] o Derecha [ ▶ ]</strong> antes de que expire la <strong>barra azul vertical</strong>.
              </p>
            </div>

            <div className="aon-multitask-intro-subcard p-3.5 rounded-xl bg-slate-800/70 border border-amber-500/30 space-y-1.5">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Calculator className="w-4 h-4" />
                <span>2. Ecuación Aritmética</span>
              </span>
              <p className="text-slate-300 leading-relaxed">
                Cálculo mental rápido de 4 términos (sumas y restas). Decide si el resultado es <strong>Correcto [ 1 ] o Incorrecto [ 2 ]</strong>.
              </p>
            </div>

            <div className="aon-multitask-intro-subcard p-3.5 rounded-xl bg-slate-800/70 border border-purple-500/30 space-y-1.5">
              <span className="font-bold text-purple-400 flex items-center gap-1.5">
                <Hash className="w-4 h-4" />
                <span>3. Secuencia Numérica</span>
              </span>
              <p className="text-slate-300 leading-relaxed">
                Fila de 7 dígitos. Detecta si hay algún número <strong>Duplicado [ 3 ] o si son Únicos [ 4 ]</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Configuración de Duración del Examen */}
        <div className="aon-multitask-duration-card bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Duración del Examen:</span>
          </div>
          <div className="flex items-center gap-2">
            {[
              { label: '5 Minutos (Oficial Aon)', secs: 300 },
              { label: '8 Minutos (Resistencia)', secs: 480 },
              { label: '3 Minutos (Rápido)', secs: 180 }
            ].map((opt) => (
              <button
                key={opt.secs}
                onClick={() => {
                  setExamDuration(opt.secs);
                  setTimeLeft(opt.secs);
                }}
                className={`aon-multitask-duration-btn px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  examDuration === opt.secs
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selector de Modalidades */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Modo 1: Triple-Task Oficial AON */}
          <div 
            onClick={() => startSession('triple-exam')}
            className="aon-multitask-mode-card aon-multitask-mode-triple group p-5 rounded-xl bg-gradient-to-br from-slate-800/90 via-slate-900 to-rose-950/30 border-2 border-rose-500/50 hover:border-rose-400 cursor-pointer transition-all hover:scale-[1.01] shadow-xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-500 text-white uppercase tracking-wider">
                Recomendado NetJets
              </span>
              <Play className="w-5 h-5 text-rose-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-lg font-black text-white mb-2 flex items-center gap-2">
              <span>🏆 Examen Triple-Task Completo</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Las 3 tareas activas simultáneamente en pantalla dividida: <strong>Triángulo + Barra temporal + Cálculo mental + Secuencia de 7 dígitos</strong> con evaluación normativa en Stanine y Percentil de pilotos.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-300">
              <span>Comenzar Examen ({formatTime(examDuration)}) →</span>
            </div>
          </div>

          {/* Modo 2: Aislado - Solo Triángulo y Barra */}
          <div 
            onClick={() => startSession('pure-triangle')}
            className="aon-multitask-mode-card aon-multitask-mode-arrows p-5 rounded-xl bg-slate-900/90 border border-sky-500/40 hover:border-sky-400 cursor-pointer transition-all hover:scale-[1.01] shadow-md group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                Práctica Específica
              </span>
              <ChevronRight className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              🔺 Solo Orientación de Triángulo
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Entrena la discriminación visual en milisegundos detectando si el triángulo apunta a la izquierda o derecha antes del agotamiento de la barra azul.
            </p>
            <span className="text-xs font-bold text-sky-400">Entrenar Triángulo →</span>
          </div>

          {/* Modo 3: Aislado - Solo Cálculo Mental */}
          <div 
            onClick={() => startSession('pure-math')}
            className="aon-multitask-mode-card aon-multitask-mode-math p-5 rounded-xl bg-slate-900/90 border border-amber-500/40 hover:border-amber-400 cursor-pointer transition-all hover:scale-[1.01] shadow-md group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Práctica Específica
              </span>
              <Calculator className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              ➕ Solo Aritmética Mental
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Automatiza la verificación mental de sumas y restas rápidas en formato [CORRECTO / INCORRECTO] a máxima velocidad.
            </p>
            <span className="text-xs font-bold text-amber-400">Entrenar Mates →</span>
          </div>

          {/* Modo 4: Aislado - Solo Secuencia Numérica */}
          <div 
            onClick={() => startSession('pure-numbers')}
            className="aon-multitask-mode-card aon-multitask-mode-duplicates p-5 rounded-xl bg-slate-900/90 border border-purple-500/40 hover:border-purple-400 cursor-pointer transition-all hover:scale-[1.01] shadow-md group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Práctica Específica
              </span>
              <Hash className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              🔢 Solo Duplicados Numéricos (7 Dígitos)
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Afila tu escaneo visual sobre números de 7 dígitos para decidir al instante si hay repetición [DUPLICADO] o no [NO DUPLICADO].
            </p>
            <span className="text-xs font-bold text-purple-400">Entrenar Números →</span>
          </div>
        </div>

        {/* Historial con Stanine y Percentil */}
        {history.length > 0 && (
          <div className="aon-multitask-history-card bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Historial de Simulacros Multitarea (Baremo EASA)</span>
            </h3>
            <div className="space-y-2">
              {history.slice(0, 4).map((h, i) => (
                <div key={i} className="aon-multitask-history-item flex items-center justify-between p-2.5 rounded-lg bg-slate-800/60 text-xs">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded font-black ${
                      h.passed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}>
                      Stanine {h.stanine}
                    </span>
                    <span className="font-semibold text-slate-200">PR {h.percentile}%</span>
                    <span className="text-slate-400 font-mono text-[11px]">{h.date}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-300">
                    <span>Triángulo: <strong>{h.triangleMetrics.correct}</strong></span>
                    <span>Mates: <strong>{h.mathMetrics.correct}</strong></span>
                    <span>Números: <strong>{h.numberMetrics.correct}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================================================
  // 2. PANTALLA DE RESULTADOS & INFORME PSICOMÉTRICO NETJETS
  // ==========================================================================
  if (gameState === 'results' && psychometricReport) {
    const report = psychometricReport;

    return (
      <div className="aon-multitask-screen max-w-3xl mx-auto space-y-6 p-4 sm:p-6 animate-fade-in">
        <div className="aon-multitask-results-card bg-gradient-to-br from-slate-900 via-aviation-950 to-slate-900 border-2 border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl">
          {/* Cabecera del Veredicto */}
          <div className="text-center pb-6 border-b border-slate-800">
            <div className="inline-flex items-center justify-center p-3.5 rounded-2xl mb-3 shadow-lg bg-slate-800 border border-slate-700">
              {report.overall.easaPass ? (
                <Trophy className="w-12 h-12 text-amber-400 animate-bounce" />
              ) : (
                <AlertTriangle className="w-12 h-12 text-rose-400 animate-pulse" />
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {report.overall.easaPass ? '¡APTO PARA SELECCIÓN NETJETS EUROPE!' : 'SESIÓN DE ENTRENAMIENTO FINALIZADA'}
            </h2>
            <p className="text-xs text-slate-300 max-w-xl mx-auto mt-2 leading-relaxed">
              {report.overall.interpretation}
            </p>
          </div>

          {/* Tarjeta de Stanine y Percentil Global */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6 p-4 rounded-2xl bg-black/50 border border-rose-500/30">
            <div className="text-center p-3 rounded-xl bg-slate-900/80 border border-slate-700">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Stanine Compuesto (1 - 9)
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-amber-400">
                {report.overall.stanine} <span className="text-sm font-normal text-slate-400">/ 9</span>
              </div>
              <span className="text-[10px] font-bold text-amber-300">{report.overall.classification}</span>
            </div>

            <div className="text-center p-3 rounded-xl bg-slate-900/80 border border-slate-700">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Rango Percentil (Pilotos)
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-sky-400">
                PR {report.overall.percentile}%
              </div>
              <span className="text-[10px] font-bold text-sky-300">
                Superas al {report.overall.percentile}% del grupo normativo
              </span>
            </div>

            <div className="text-center p-3 rounded-xl bg-slate-900/80 border border-slate-700">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Puntuación Z Multitarea
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400">
                {report.overall.zScore > 0 ? `+${report.overall.zScore}` : report.overall.zScore}
              </div>
              <span className="text-[10px] font-bold text-slate-300">Punt. Neta: {report.overall.netScore}</span>
            </div>
          </div>

          {/* Barra Visual de Estaninos (Campana de Gauss) */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-left space-y-2 mb-6">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span>Posición en Escala Stanine (Grupo Normativo Multitarea):</span>
              <span className="font-mono text-amber-400">Corte NetJets = Stanine 6</span>
            </div>
            <div className="grid grid-cols-9 gap-1 h-7 rounded-lg overflow-hidden p-1 bg-black/60 border border-slate-700">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((st) => {
                const isUser = st === report.overall.stanine;
                const isPassZone = st >= 6;
                return (
                  <div
                    key={st}
                    className={`rounded flex items-center justify-center font-mono text-xs font-black transition-all ${
                      isUser
                        ? 'bg-amber-400 text-slate-950 ring-2 ring-white scale-105 z-10 shadow-lg'
                        : isPassZone
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {st}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desglose de las 3 tareas con Stanine Individual */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Tarea 1 */}
            <div className="aon-multitask-results-subcard p-4 rounded-xl bg-slate-800/70 border border-sky-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sky-400 font-bold text-xs uppercase">
                  <ChevronLeft className="w-4 h-4" />
                  <span>1. Triángulo</span>
                </div>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">
                  Stanine {report.subtasks.triangle.stanine}
                </span>
              </div>
              <div className="text-2xl font-black text-white">
                {report.subtasks.triangle.correct} aciertos
              </div>
              <div className="space-y-0.5 text-xs text-slate-300">
                <div>Precisión: <strong>{report.subtasks.triangle.accuracy}%</strong></div>
                <div>Percentil: <strong>PR {report.subtasks.triangle.percentile}%</strong></div>
                <div>Fallos/Timeouts: <strong>{triangleWrong + triangleTimeouts}</strong></div>
              </div>
            </div>

            {/* Tarea 2 */}
            <div className="aon-multitask-results-subcard p-4 rounded-xl bg-slate-800/70 border border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase">
                  <Calculator className="w-4 h-4" />
                  <span>2. Mates</span>
                </div>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                  Stanine {report.subtasks.math.stanine}
                </span>
              </div>
              <div className="text-2xl font-black text-white">
                {report.subtasks.math.correct} aciertos
              </div>
              <div className="space-y-0.5 text-xs text-slate-300">
                <div>Precisión: <strong>{report.subtasks.math.accuracy}%</strong></div>
                <div>Percentil: <strong>PR {report.subtasks.math.percentile}%</strong></div>
                <div>Fallos: <strong>{mathWrong}</strong></div>
              </div>
            </div>

            {/* Tarea 3 */}
            <div className="aon-multitask-results-subcard p-4 rounded-xl bg-slate-800/70 border border-purple-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-purple-400 font-bold text-xs uppercase">
                  <Hash className="w-4 h-4" />
                  <span>3. Números</span>
                </div>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                  Stanine {report.subtasks.numerical.stanine}
                </span>
              </div>
              <div className="text-2xl font-black text-white">
                {report.subtasks.numerical.correct} aciertos
              </div>
              <div className="space-y-0.5 text-xs text-slate-300">
                <div>Precisión: <strong>{report.subtasks.numerical.accuracy}%</strong></div>
                <div>Percentil: <strong>PR {report.subtasks.numerical.percentile}%</strong></div>
                <div>Fallos: <strong>{numWrong}</strong></div>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-slate-800">
            <button
              onClick={() => startSession(activeMode)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Repetir Sesión ({formatTime(examDuration)})</span>
            </button>
            <button
              onClick={() => setGameState('intro')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm transition-all border border-slate-700 flex items-center justify-center gap-2"
            >
              <span>Cambiar de Modo</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // 3. PANTALLA DE JUEGO (PLAYING) - LAYOUT OFICIAL KURA / CUT-E
  // ==========================================================================
  return (
    <div className="aon-multitask-screen space-y-4 max-w-6xl mx-auto p-3 sm:p-5 select-none animate-fade-in">
      {/* Cabecera de Estado y Temporizador */}
      <div className="aon-multitask-header flex items-center justify-between pb-3 border-b border-slate-700/60">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (confirm('¿Deseas salir de la sesión actual de multitarea?')) {
                if (mainExamTimerRef.current) clearInterval(mainExamTimerRef.current);
                if (triangleTimerRef.current) clearInterval(triangleTimerRef.current);
                setGameState('intro');
              }
            }}
            className="aon-multitask-back-btn p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors shadow-sm"
            title="Salir"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="hidden sm:block">
            <span className="text-xs font-mono font-bold text-amber-400">
              Cut-E / AON: Multitasking Capability
            </span>
          </div>
        </div>

        {/* Temporizador y Controles */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMuted((m) => !m)}
            className={`p-2 rounded-lg border text-xs font-bold transition-all ${
              isMuted
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                : 'bg-slate-800/80 border-slate-700 text-emerald-300 hover:bg-slate-700'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <div className="aon-multitask-timer-pill flex items-center gap-2 bg-slate-900/90 border border-amber-500/40 px-3.5 py-1.5 rounded-xl shadow-md">
            <Timer className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="font-mono text-base font-black text-amber-300">
              {formatTime(timeLeft)}
            </span>
          </div>

          <button
            onClick={finishSession}
            className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-black transition-all active:scale-95 shadow-sm"
          >
            Terminar
          </button>
        </div>
      </div>

      {/* Grid Principal en Pantalla Dividida (Estilo Oficial Aon / Kura) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch min-h-[500px]">

        {/* ================================================================== */}
        {/* PANEL IZQUIERDO: TAREA 1 (7 FIGURAS + BARRA AZUL + BOTONES ◀ / ▶) */}
        {/* ================================================================== */}
        {(activeMode === 'triple-exam' || activeMode === 'pure-triangle') && (
          <div className="aon-multitask-panel aon-multitask-panel-arrows bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-sky-500/30 rounded-2xl p-5 shadow-xl flex flex-col justify-between items-center text-slate-900 dark:text-white">
            
            <div className="w-full flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-black uppercase text-sky-600 dark:text-sky-400 tracking-wider flex items-center gap-1.5">
                <ChevronLeft className="w-4 h-4" /><ChevronRight className="w-4 h-4 -ml-2" />
                <span>1. Orientación del Triángulo</span>
              </span>
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                Aciertos: <strong className="text-emerald-600 dark:text-emerald-400">{triangleCorrect}</strong> / {triangleCorrect + triangleWrong + triangleTimeouts}
              </span>
            </div>

            {/* Fila de 7 Figuras Geométricas */}
            <div className="w-full my-4 py-3 px-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-around min-h-[70px]">
              {currentTriangleTask?.shapes.map((item) => (
                <div key={item.id} className="p-1 flex items-center justify-center">
                  {renderSilhouetteShape(item, 'w-8 h-8 sm:w-10 sm:h-10')}
                </div>
              ))}
            </div>

            {/* Barra Temporal Vertical Azul */}
            <div className="my-2 flex flex-col items-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Límite de Tiempo por Reactivo
              </span>
              <div className="w-6 sm:w-8 h-40 sm:h-48 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-950 p-1 flex flex-col justify-end overflow-hidden shadow-inner">
                <div 
                  className={`w-full rounded transition-all duration-75 ${
                    triangleTimeLeftMs < 1000 
                      ? 'bg-rose-500 animate-pulse' 
                      : 'bg-[#0284c7]'
                  }`}
                  style={{
                    height: `${Math.max(0, Math.min(100, (triangleTimeLeftMs / TRIANGLE_TIMEOUT_MS) * 100))}%`,
                  }}
                />
              </div>
            </div>

            {/* Feedback breve */}
            <div className="h-6 flex items-center justify-center">
              {triangleFeedback === 'correct' && (
                <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> ¡Correcto!
                </span>
              )}
              {triangleFeedback === 'wrong' && (
                <span className="text-xs font-bold text-rose-500 flex items-center gap-1">
                  <XCircle className="w-4 h-4" /> Dirección equivocada
                </span>
              )}
              {triangleFeedback === 'timeout' && (
                <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                  <Clock className="w-4 h-4" /> ¡Tiempo agotado!
                </span>
              )}
            </div>

            {/* Botones de Respuesta de Triángulo [ ◀ ] y [ ▶ ] */}
            <div className="w-full grid grid-cols-2 gap-3 mt-3">
              <button
                onClick={() => handleTriangleAnswer('left')}
                className="aon-multitask-steer-btn py-3.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-95 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-700 hover:border-sky-500 font-black text-sm transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <ChevronLeft className="w-5 h-5 fill-current" />
                <span>IZQUIERDA [← / A]</span>
              </button>

              <button
                onClick={() => handleTriangleAnswer('right')}
                className="aon-multitask-steer-btn py-3.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-95 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-700 hover:border-sky-500 font-black text-sm transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>DERECHA [→ / D]</span>
                <ChevronRight className="w-5 h-5 fill-current" />
              </button>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* PANEL DERECHO: TAREA 2 (MATES ARRIBA) Y TAREA 3 (NÚMEROS ABAJO) */}
        {/* ================================================================== */}
        <div className="flex flex-col gap-4">

          {/* TAREA 2: CÁLCULO MENTAL */}
          {(activeMode === 'triple-exam' || activeMode === 'pure-math') && (
            <div className="aon-multitask-panel aon-multitask-panel-math flex-1 bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-amber-500/30 rounded-2xl p-5 shadow-xl flex flex-col justify-between text-slate-900 dark:text-white">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800 mb-3">
                  <span className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider flex items-center gap-1.5">
                    <Calculator className="w-4 h-4" />
                    <span>2. Ecuación Aritmética</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                    Aciertos: <strong className="text-emerald-600 dark:text-emerald-400">{mathCorrect}</strong> / {mathCorrect + mathWrong}
                  </span>
                </div>

                {/* Ecuación Central */}
                <div className="my-4 py-4 px-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-2xl sm:text-3xl font-black font-mono tracking-wide">
                    {currentMath?.expression}
                  </span>
                </div>

                {/* Feedback breve */}
                <div className="h-5 flex items-center justify-center">
                  {mathFeedback === 'correct' && (
                    <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> ¡Correcto!
                    </span>
                  )}
                  {mathFeedback === 'wrong' && (
                    <span className="text-xs font-bold text-rose-500 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Error en cálculo
                    </span>
                  )}
                </div>
              </div>

              {/* Botones de Respuesta de Mates */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                <button
                  onClick={() => handleMathAnswer(true)}
                  className="py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-95 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-700 hover:border-emerald-500 font-black text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>CORRECT [ 1 ]</span>
                </button>

                <button
                  onClick={() => handleMathAnswer(false)}
                  className="py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-95 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-700 hover:border-rose-500 font-black text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <XCircle className="w-4 h-4 text-rose-500" />
                  <span>WRONG [ 2 ]</span>
                </button>
              </div>
            </div>
          )}

          {/* TAREA 3: DUPLICADOS NUMÉRICOS */}
          {(activeMode === 'triple-exam' || activeMode === 'pure-numbers') && (
            <div className="aon-multitask-panel aon-multitask-panel-duplicates flex-1 bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-purple-500/30 rounded-2xl p-5 shadow-xl flex flex-col justify-between text-slate-900 dark:text-white">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800 mb-3">
                  <span className="text-xs font-black uppercase text-purple-600 dark:text-purple-400 tracking-wider flex items-center gap-1.5">
                    <Hash className="w-4 h-4" />
                    <span>3. Secuencia Numérica (Duplicados)</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                    Aciertos: <strong className="text-emerald-600 dark:text-emerald-400">{numCorrect}</strong> / {numCorrect + numWrong}
                  </span>
                </div>

                {/* Secuencia Numérica Central (7 dígitos separados por espacio) */}
                <div className="my-4 py-4 px-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-3xl sm:text-4xl font-black font-mono tracking-[0.35em]">
                    {currentNumberTask?.digits.join(' ')}
                  </span>
                </div>

                {/* Feedback breve */}
                <div className="h-5 flex items-center justify-center">
                  {numberFeedback === 'correct' && (
                    <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> ¡Correcto!
                    </span>
                  )}
                  {numberFeedback === 'wrong' && (
                    <span className="text-xs font-bold text-rose-500 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Detección incorrecta
                    </span>
                  )}
                </div>
              </div>

              {/* Botones de Respuesta de Números */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                <button
                  onClick={() => handleNumberAnswer(true)}
                  className="py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-95 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-700 hover:border-purple-500 font-black text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>DUPLICATE [ 3 ]</span>
                </button>

                <button
                  onClick={() => handleNumberAnswer(false)}
                  className="py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-95 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-700 hover:border-sky-500 font-black text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>NO DUPLICATE [ 4 ]</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
