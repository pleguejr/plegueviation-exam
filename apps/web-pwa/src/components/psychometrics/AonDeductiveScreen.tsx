import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ArrowLeft, 
  Timer, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Play, 
  HelpCircle, 
  Trophy, 
  Zap, 
  Award, 
  BarChart3, 
  ChevronRight, 
  Brain, 
  Layers,
  Sparkles,
  Info,
  Edit3,
  Trash2,
  TrendingUp,
  Target
} from 'lucide-react';
import { 
  DeductivePuzzle, 
  DeductiveSymbol, 
  ShapeId, 
  DeductiveDifficulty,
  SYMBOLS_LIST, 
  generateDeductivePuzzle 
} from './AonDeductiveGenerator';
import { 
  evaluateAonDeductiveScore, 
  PsychometricResult,
  DEDUCTIVE_NORM_MEAN,
  DEDUCTIVE_NORM_SD,
  DEDUCTIVE_STANINE_6_NET,
  DEDUCTIVE_STANINE_7_NET
} from './AonPsychometricsNorms';

interface AonDeductiveScreenProps {
  onBackToDashboard: () => void;
}

interface AttemptResult {
  puzzleId: string;
  gridSize: 4 | 5;
  chosen: ShapeId;
  correct: ShapeId;
  isCorrect: boolean;
  timeSpentMs: number;
}

interface SessionSummary {
  date: string;
  mode: 'exam' | 'practice';
  totalAnswered: number;
  correctCount: number;
  wrongCount: number;
  accuracy: number;
  avgTimeSeconds: number;
  netScore: number;
  stanine: number;
  percentile: number;
  zScore: number;
  classification: string;
  passed: boolean;
}

export const AonDeductiveScreen: React.FC<AonDeductiveScreenProps> = ({ onBackToDashboard }) => {
  // Estados de navegación: 'intro' | 'playing' | 'results'
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'results'>('intro');
  const [mode, setMode] = useState<'exam' | 'practice'>('exam');
  // Perfil de dificultad calibrado a KURA y PASS-Pilot
  const [difficultyProfile, setDifficultyProfile] = useState<'kura_standard' | 'hardcore_5x5' | 'pure_4x4'>('kura_standard');
  
  // Temporizador oficial: 9 minutos (540 segundos)
  const EXAM_DURATION_SECONDS = 9 * 60; // 540s
  const [timeLeft, setTimeLeft] = useState<number>(EXAM_DURATION_SECONDS);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Estados del puzzle activo
  const [currentPuzzle, setCurrentPuzzle] = useState<DeductivePuzzle | null>(null);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [currentGridSize, setCurrentGridSize] = useState<4 | 5>(4);
  const [attempts, setAttempts] = useState<AttemptResult[]>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; chosen: ShapeId } | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Sistema de figuras rayadas de ayuda (Pencil Marks / Draft notes oficiales de Aon)
  const [draftMarks, setDraftMarks] = useState<Record<string, ShapeId>>({});
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);

  // Historial en LocalStorage con métricas psicométricas (Stanine + Percentil)
  const [history, setHistory] = useState<SessionSummary[]>(() => {
    try {
      const saved = localStorage.getItem('plegueviation_aon_deductive_history_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const timerRef = useRef<any>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
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
  }, [getAudioContext]);

  const playErrorBuzz = useCallback(() => {
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
  }, [getAudioContext]);

  // Cargar siguiente puzzle calibrado a estándares KURA / PASS
  const loadNextPuzzle = useCallback((targetLevel: number, profileOverride?: 'kura_standard' | 'hardcore_5x5' | 'pure_4x4') => {
    const activeProfile = profileOverride || difficultyProfile;
    let size: 4 | 5 = 5;
    let diff: DeductiveDifficulty = 'kura_5x5';
    let minDepth = 2;

    if (activeProfile === 'pure_4x4') {
      size = 4;
      diff = 'kura_4x4';
      minDepth = 2;
    } else if (activeProfile === 'hardcore_5x5') {
      size = 5;
      diff = 'hardcore_5x5';
      minDepth = 2;
    } else {
      // kura_standard (Oficial):
      // Level 1: warmup 4x4 (8-10 vacías, profundidad >= 2)
      // Level >= 2: 100% 5x5 matrices con 14-17 vacías y profundidad >= 2
      if (targetLevel === 1) {
        size = 4;
        diff = 'kura_4x4';
        minDepth = 2;
      } else {
        size = 5;
        diff = targetLevel >= 8 ? 'hardcore_5x5' : 'kura_5x5';
        minDepth = 2;
      }
    }

    setCurrentGridSize(size);
    const p = generateDeductivePuzzle(size, diff, minDepth);
    setCurrentPuzzle(p);
    setFeedback(null);
    setShowHint(false);
    setDraftMarks({});
    setSelectedCell({ r: p.targetRow, c: p.targetCol }); // Por defecto se enfoca la incógnita [?]
    setStartTime(Date.now());
  }, [difficultyProfile]);

  // Iniciar partida
  const handleStartGame = (selectedMode: 'exam' | 'practice') => {
    setMode(selectedMode);
    setTimeLeft(EXAM_DURATION_SECONDS);
    setAttempts([]);
    setCurrentLevel(1);
    setCurrentGridSize(difficultyProfile === 'pure_4x4' ? 4 : (difficultyProfile === 'hardcore_5x5' ? 5 : 4));
    setGameState('playing');
    loadNextPuzzle(1);
  };

  // Finalizar examen y procesar baremo psicométrico de pilotos
  const handleFinishExam = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState('results');

    setAttempts((prevAttempts) => {
      const total = prevAttempts.length;
      const correct = prevAttempts.filter((a) => a.isCorrect).length;
      const wrong = total - correct;
      const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
      const totalTimeMs = prevAttempts.reduce((acc, a) => acc + a.timeSpentMs, 0);
      const avgTime = total > 0 ? Math.round((totalTimeMs / total / 1000) * 10) / 10 : 0;
      
      const wrong4x4 = prevAttempts.filter((a) => !a.isCorrect && a.gridSize === 4).length;
      const wrong5x5 = prevAttempts.filter((a) => !a.isCorrect && a.gridSize === 5).length;

      // Evaluación psicométrica estandarizada en grupo normativo de pilotos comerciales
      const psycho = evaluateAonDeductiveScore(total, correct, wrong, 540, wrong4x4, wrong5x5);

      const summary: SessionSummary = {
        date: new Date().toISOString(),
        mode,
        totalAnswered: total,
        correctCount: correct,
        wrongCount: wrong,
        accuracy,
        avgTimeSeconds: avgTime,
        netScore: psycho.netScore,
        stanine: psycho.stanine,
        percentile: psycho.percentile,
        zScore: psycho.zScore,
        classification: psycho.classification,
        passed: psycho.easaPass,
      };

      setHistory((prevHist) => {
        const updated = [summary, ...prevHist].slice(0, 30);
        try {
          localStorage.setItem('plegueviation_aon_deductive_history_v2', JSON.stringify(updated));
        } catch {}
        return updated;
      });

      return prevAttempts;
    });
  }, [mode]);

  // Temporizador de cuenta atrás (9 min en modo examen)
  useEffect(() => {
    if (gameState !== 'playing' || mode !== 'exam' || isPaused) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleFinishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, mode, isPaused, handleFinishExam]);

  // Manejo de entrada de figura (teclado o botón)
  const handleShapeInput = (shapeId: ShapeId) => {
    if (!currentPuzzle || feedback) return;

    const isTargetSelected = !selectedCell || (selectedCell.r === currentPuzzle.targetRow && selectedCell.c === currentPuzzle.targetCol);

    if (isTargetSelected) {
      // 1. Resuelve la incógnita [?]
      const timeSpent = Date.now() - startTime;
      const isCorrect = shapeId === currentPuzzle.correctShape;

      const newAttempt: AttemptResult = {
        puzzleId: currentPuzzle.id,
        gridSize: currentPuzzle.gridSize,
        chosen: shapeId,
        correct: currentPuzzle.correctShape,
        isCorrect,
        timeSpentMs: timeSpent,
      };

      setAttempts((prev) => [...prev, newAttempt]);

      if (isCorrect) {
        playSuccessChime();
        setFeedback({ isCorrect: true, chosen: shapeId });
        const nextLvl = currentLevel + 1;
        // Pasa automáticamente al siguiente puzzle tras breve confirmación visual
        setTimeout(() => {
          setCurrentLevel(nextLvl);
          loadNextPuzzle(nextLvl);
        }, mode === 'exam' ? 200 : 350);
      } else {
        playErrorBuzz();
        if (mode === 'exam') {
          setFeedback({ isCorrect: false, chosen: shapeId });
          const nextLvl = Math.max(1, currentLevel);
          setTimeout(() => {
            setCurrentLevel(nextLvl);
            loadNextPuzzle(nextLvl);
          }, 300);
        } else {
          // En modo práctica muestra la explicación del error
          setFeedback({ isCorrect: false, chosen: shapeId });
        }
      }
    } else {
      // 2. Coloca o conmuta figura rayada de ayuda en celda vacía seleccionada
      const cellKey = `${selectedCell.r}-${selectedCell.c}`;
      setDraftMarks((prev) => {
        if (prev[cellKey] === shapeId) {
          const next = { ...prev };
          delete next[cellKey];
          return next;
        }
        return { ...prev, [cellKey]: shapeId };
      });
      // Vuelve a enfocar automáticamente la incógnita [?] para que la siguiente pulsación resuelva directamente
      setSelectedCell({ r: currentPuzzle.targetRow, c: currentPuzzle.targetCol });
    }
  };

  // Teclado físico: teclas 1..5 para símbolos, Delete/Backspace para borrar nota
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '5') {
        const idx = parseInt(e.key, 10) - 1;
        if (currentPuzzle && idx < currentPuzzle.availableSymbols.length) {
          handleShapeInput(currentPuzzle.availableSymbols[idx].id);
        }
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        if (selectedCell && (selectedCell.r !== currentPuzzle?.targetRow || selectedCell.c !== currentPuzzle?.targetCol)) {
          const cellKey = `${selectedCell.r}-${selectedCell.c}`;
          setDraftMarks((prev) => {
            const next = { ...prev };
            delete next[cellKey];
            return next;
          });
        }
      } else if (e.key === 'Escape') {
        if (currentPuzzle) {
          setSelectedCell({ r: currentPuzzle.targetRow, c: currentPuzzle.targetCol });
        }
      } else if (e.key === ' ' && mode === 'practice' && feedback) {
        const nextLvl = feedback.isCorrect ? currentLevel + 1 : currentLevel;
        setCurrentLevel(nextLvl);
        loadNextPuzzle(nextLvl);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, currentPuzzle, feedback, mode, currentLevel, selectedCell, loadNextPuzzle]);

  // Formato mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  /**
   * Renderizador SVG oficial de símbolos AON con soporte para modo sólido o RAYADO (hatched)
   * Colores oficiales:
   * - Triángulo: Amarillo (#eab308)
   * - Círculo: Verde (#65a30d)
   * - Cuadrado: Rojo (#dc2626)
   * - Cruz: Azul (#0284c7)
   * - Rombo: Púrpura (#9333ea)
   */
  const renderShapeIcon = (
    shapeId: ShapeId, 
    sizeClass = 'w-9 h-9 sm:w-11 sm:h-11', 
    isHatched = false, 
    idSuffix = ''
  ) => {
    const hatchId = `hatch-${shapeId}-${idSuffix || Math.floor(Math.random() * 100000)}`;

    switch (shapeId) {
      case 'triangle': {
        const baseColor = '#eab308';
        const strokeColor = '#ca8a04';
        return (
          <svg className={sizeClass} viewBox="0 0 100 100">
            {isHatched && (
              <defs>
                <pattern id={hatchId} width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <rect width="10" height="10" fill={baseColor} />
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#ffffff" strokeWidth="3.5" />
                </pattern>
              </defs>
            )}
            <polygon 
              points="50,14 86,82 14,82" 
              fill={isHatched ? `url(#${hatchId})` : baseColor} 
              stroke={strokeColor} 
              strokeWidth="6" 
              strokeLinejoin="round" 
            />
          </svg>
        );
      }
      case 'circle': {
        const baseColor = '#65a30d';
        const strokeColor = '#4d7c0f';
        return (
          <svg className={sizeClass} viewBox="0 0 100 100">
            {isHatched && (
              <defs>
                <pattern id={hatchId} width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <rect width="10" height="10" fill={baseColor} />
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#ffffff" strokeWidth="3.5" />
                </pattern>
              </defs>
            )}
            <circle 
              cx="50" 
              cy="50" 
              r="38" 
              fill={isHatched ? `url(#${hatchId})` : baseColor} 
              stroke={strokeColor} 
              strokeWidth="6" 
            />
          </svg>
        );
      }
      case 'square': {
        const baseColor = '#dc2626';
        const strokeColor = '#b91c1c';
        return (
          <svg className={sizeClass} viewBox="0 0 100 100">
            {isHatched && (
              <defs>
                <pattern id={hatchId} width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <rect width="10" height="10" fill={baseColor} />
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#ffffff" strokeWidth="3.5" />
                </pattern>
              </defs>
            )}
            <rect 
              x="16" 
              y="16" 
              width="68" 
              height="68" 
              rx="8" 
              fill={isHatched ? `url(#${hatchId})` : baseColor} 
              stroke={strokeColor} 
              strokeWidth="6" 
            />
          </svg>
        );
      }
      case 'cross': {
        const baseColor = '#0284c7';
        const strokeColor = '#0369a1';
        return (
          <svg className={sizeClass} viewBox="0 0 100 100">
            {isHatched && (
              <defs>
                <pattern id={hatchId} width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <rect width="10" height="10" fill={baseColor} />
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#ffffff" strokeWidth="3.5" />
                </pattern>
              </defs>
            )}
            <path
              d="M38,12 L62,12 L62,38 L88,38 L88,62 L62,62 L62,88 L38,88 L38,62 L12,62 L12,38 L38,38 Z"
              fill={isHatched ? `url(#${hatchId})` : baseColor}
              stroke={strokeColor}
              strokeWidth="5"
              strokeLinejoin="round"
            />
          </svg>
        );
      }
      case 'diamond': {
        const baseColor = '#9333ea';
        const strokeColor = '#7e22ce';
        return (
          <svg className={sizeClass} viewBox="0 0 100 100">
            {isHatched && (
              <defs>
                <pattern id={hatchId} width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <rect width="10" height="10" fill={baseColor} />
                  <line x1="0" y1="0" x2="0" y2="10" stroke="#ffffff" strokeWidth="3.5" />
                </pattern>
              </defs>
            )}
            <polygon 
              points="50,12 88,50 50,88 12,50" 
              fill={isHatched ? `url(#${hatchId})` : baseColor} 
              stroke={strokeColor} 
              strokeWidth="6" 
              strokeLinejoin="round" 
            />
          </svg>
        );
      }
      default:
        return null;
    }
  };

  // ==========================================================================
  // 1. PANTALLA INTRODUCCIÓN / REGLAS & BAREMO PSICOMÉTRICO
  // ==========================================================================
  if (gameState === 'intro') {
    return (
      <div className="aon-deductive-screen max-w-4xl mx-auto space-y-6 animate-fade-in p-4 sm:p-6">
        {/* Cabecera */}
        <div className="flex items-center justify-between pb-4 border-b border-sky-500/20">
          <button
            onClick={onBackToDashboard}
            className="flex items-center gap-2 font-bold text-sky-400 hover:text-sky-300 text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Dashboard</span>
          </button>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
            AON cut-e • NetJets Pilot Assessment
          </span>
        </div>

        {/* Hero Card */}
        <div className="aon-deductive-intro-card bg-gradient-to-br from-[#0c1c3d] via-[#09152b] to-[#060e1d] border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-glow-amber">
                <Brain className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  AON Deductive Logical Reasoning
                </h1>
                <p className="text-xs sm:text-sm text-amber-300 font-semibold">
                  Simulador psicotécnico oficial AON / cut-e "scales sx" (Sudoku / Cuadrado Latino)
                </p>
              </div>
            </div>
          </div>

          {/* Reglas de la prueba */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="aon-deductive-subcard p-4 rounded-2xl bg-black/40 border border-sky-500/20 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>1. Regla de Cuadrícula</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cada figura geométrica debe aparecer <strong>exactamente una vez</strong> en cada fila y en cada columna (sin diagonales).
              </p>
            </div>

            <div className="aon-deductive-subcard p-4 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <Edit3 className="w-4 h-4" />
                <span>2. Figuras Rayadas de Ayuda</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pulsa cualquier celda vacía para colocar <strong>figuras rayadas de lápiz</strong> y anotar tus deducciones intermedias antes de resolver la incógnita [ ? ].
              </p>
            </div>

            <div className="aon-deductive-subcard p-4 rounded-2xl bg-black/40 border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>3. Baremo Stanine & Percentil</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>9 minutos</strong> oficiales. Evaluación bajo modelos TCT y TRI con baremo de pilotos: corte NetJets en <strong>Stanine ≥ 6 (Percentil ≥ 60%)</strong>.
              </p>
            </div>
          </div>

          {/* Símbolos del test con colores oficiales AON */}
          <div className="aon-deductive-symbols-card p-4 rounded-2xl bg-black/30 border border-slate-800 space-y-2">
            <p className="text-xs font-bold text-slate-300">Símbolos y códigos oficiales AON / cut-e:</p>
            <div className="flex items-center justify-around sm:justify-start sm:gap-6 pt-1">
              {SYMBOLS_LIST.map((sym) => (
                <div key={sym.id} className="flex flex-col items-center gap-1">
                  <div className="aon-deductive-symbol-box w-12 h-12 rounded-xl bg-white border border-slate-300 flex items-center justify-center p-1.5 shadow-md">
                    {renderShapeIcon(sym.id, 'w-8 h-8', false, `intro-solid-${sym.id}`)}
                  </div>
                  <span className="text-[10px] font-bold text-slate-300">{sym.name}</span>
                  <span className="text-[9px] font-mono text-sky-400 font-black">[{sym.keyNumber}]</span>
                </div>
              ))}
            </div>
          </div>

          {/* Selector de Nivel de Calibración KURA / PASS */}
          <div className="p-4 rounded-2xl bg-black/50 border border-amber-500/30 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-4 h-4 text-amber-400" />
                <span>Calibración de Dificultad (Estándar Oficial KURA / PASS)</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">
                Profundidad deductiva forzada (sin resolución directa en 1 paso)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setDifficultyProfile('kura_standard')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  difficultyProfile === 'kura_standard'
                    ? 'bg-amber-500/20 border-amber-400 text-white shadow-glow-amber ring-1 ring-amber-400'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-300">Oficial KURA / PASS</span>
                  {difficultyProfile === 'kura_standard' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                </div>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                  1 puzzle 4×4 warmup y luego <strong>100% 5×5 multi-paso</strong> (14-17 celdas vacías, profundidad ≥ 2).
                </p>
              </button>

              <button
                type="button"
                onClick={() => setDifficultyProfile('hardcore_5x5')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  difficultyProfile === 'hardcore_5x5'
                    ? 'bg-rose-500/20 border-rose-400 text-white shadow-glow-rose ring-1 ring-rose-400'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-rose-300">Hardcore 5×5 (Máx.)</span>
                  {difficultyProfile === 'hardcore_5x5' && <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />}
                </div>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                  <strong>100% 5×5</strong> con 16-19 celdas vacías (solo 6-9 pistas) y deducción encadenada profunda obligatoria.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setDifficultyProfile('pure_4x4')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  difficultyProfile === 'pure_4x4'
                    ? 'bg-sky-500/20 border-sky-400 text-white shadow-glow-sky ring-1 ring-sky-400'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-sky-300">Entrenamiento 4×4</span>
                  {difficultyProfile === 'pure_4x4' && <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />}
                </div>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                  Cuadrículas 4×4 profundas (8-10 celdas vacías, profundidad ≥ 2) para entrenar velocidad de descarte.
                </p>
              </button>
            </div>
          </div>

          {/* Botones de lanzamiento */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => handleStartGame('exam')}
              className="w-full sm:w-auto flex-1 py-4 px-6 rounded-2xl font-black text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-glow-amber transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>INICIAR SIMULACRO OFICIAL (9 MINUTOS)</span>
            </button>

            <button
              onClick={() => handleStartGame('practice')}
              className="w-full sm:w-auto py-4 px-6 rounded-2xl font-bold text-xs bg-slate-800 hover:bg-slate-700 border border-slate-600 text-sky-300 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Modo Práctica (Sin tiempo + Pistas Lógicas)</span>
            </button>
          </div>
        </div>

        {/* Historial con Stanine y Percentil */}
        {history.length > 0 && (
          <div className="aon-deductive-history-card bg-[#09152b] border border-sky-500/20 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
                <BarChart3 className="w-4 h-4" />
                <span>Historial de Simulacros (Baremo Pilotos EASA)</span>
              </div>
              <span className="text-[11px] text-slate-400">{history.length} sesiones guardadas</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {history.slice(0, 6).map((item, idx) => (
                <div key={idx} className="aon-deductive-history-item p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                        item.passed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}>
                        {item.passed ? 'APTO NETJETS' : 'NO COMPETITIVO'}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-amber-400">
                        Stanine {item.stanine}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-white mt-1">
                      {item.correctCount} / {item.totalAnswered} aciertos ({item.accuracy}%)
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Percentil {item.percentile}% • Net: {item.netScore} pts
                    </p>
                  </div>
                  <span className="text-lg font-black font-mono text-sky-400">
                    PR {item.percentile}%
                  </span>
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
  if (gameState === 'results') {
    const total = attempts.length;
    const correct = attempts.filter((a) => a.isCorrect).length;
    const wrong = total - correct;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    const totalTimeMs = attempts.reduce((acc, a) => acc + a.timeSpentMs, 0);
    const avgTime = total > 0 ? Math.round((totalTimeMs / total / 1000) * 10) / 10 : 0;

    // Evaluación psicométrica estandarizada
    const psycho = evaluateAonDeductiveScore(total, correct, wrong, 540);

    return (
      <div className="aon-deductive-screen max-w-3xl mx-auto space-y-6 animate-fade-in p-4 sm:p-6">
        <div className="aon-deductive-results-card bg-gradient-to-br from-[#0c1c3d] via-[#09152b] to-[#060e1d] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 text-center shadow-2xl">
          <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl shadow-lg border-2 ${
            psycho.easaPass ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400 shadow-glow-emerald' : 'bg-rose-500/20 border-rose-400 text-rose-400 shadow-glow-rose'
          }`}>
            {psycho.easaPass ? <Trophy className="w-10 h-10 text-emerald-400" /> : <Award className="w-10 h-10 text-rose-400" />}
          </div>

          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className={`text-xs font-black uppercase px-3.5 py-1 rounded-full border ${
                psycho.easaPass 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400' 
                  : 'bg-rose-500/20 text-rose-300 border-rose-400'
              }`}>
                {psycho.easaPass ? 'APTO SELECCIÓN NETJETS EUROPE (STANINE ≥ 6)' : 'NO APTO / REQUIERE ENTRENAMIENTO'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {psycho.easaPass ? '¡Rendimiento Psicométrico Competitivo!' : 'Sesión Finalizada'}
            </h2>
            <p className="text-xs text-slate-300 max-w-xl mx-auto mt-2 leading-relaxed">
              {psycho.interpretation}
            </p>
          </div>

          {/* Tarjeta de Stanine y Percentil Destacada */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-black/50 border border-sky-500/30">
            <div className="text-center p-3 rounded-xl bg-slate-900/80 border border-slate-700">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Escala Típica Stanine (1 - 9)
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-amber-400">
                {psycho.stanine} <span className="text-sm font-normal text-slate-400">/ 9</span>
              </div>
              <span className="text-[10px] font-bold text-amber-300">{psycho.classification}</span>
            </div>

            <div className="text-center p-3 rounded-xl bg-slate-900/80 border border-slate-700">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Rango Percentil (Pilotos)
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-sky-400">
                PR {psycho.percentile}%
              </div>
              <span className="text-[10px] font-bold text-sky-300">
                Superas al {psycho.percentile}% de aspirantes
              </span>
            </div>

            <div className="text-center p-3 rounded-xl bg-slate-900/80 border border-slate-700">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Puntuación Z (TCT / TRI)
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400">
                {psycho.zScore > 0 ? `+${psycho.zScore}` : psycho.zScore}
              </div>
              <span className="text-[10px] font-bold text-slate-300">Net Score: {psycho.netScore} pts</span>
            </div>
          </div>

          {/* Barra Visual de Estaninos (Campana de Gauss Estandarizada) */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-left space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span>Posición en Escala Stanine (Grupo Normativo Pilotos):</span>
              <span className="font-mono text-amber-400">Corte NetJets = Stanine 6</span>
            </div>
            <div className="grid grid-cols-9 gap-1 h-7 rounded-lg overflow-hidden p-1 bg-black/60 border border-slate-700">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((st) => {
                const isUser = st === psycho.stanine;
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
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Stanine 1 (PR &lt; 4%)</span>
              <span>Stanine 5 (Promedio PR 50%)</span>
              <span>Stanine 9 (PR &gt; 96%)</span>
            </div>
          </div>

          {/* Métricas clave */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="aon-deductive-metric-box p-3 rounded-xl bg-black/40 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Resueltas</span>
              <span className="text-2xl font-black text-white font-mono">{total}</span>
            </div>
            <div className="aon-deductive-metric-box p-3 rounded-xl bg-black/40 border border-emerald-500/20">
              <span className="text-[10px] font-bold text-emerald-400 uppercase block">Aciertos</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">{correct}</span>
            </div>
            <div className="aon-deductive-metric-box p-3 rounded-xl bg-black/40 border border-rose-500/20">
              <span className="text-[10px] font-bold text-rose-400 uppercase block">Fallos</span>
              <span className="text-2xl font-black text-rose-400 font-mono">{wrong}</span>
            </div>
            <div className="aon-deductive-metric-box p-3 rounded-xl bg-black/40 border border-sky-500/20">
              <span className="text-[10px] font-bold text-sky-400 uppercase block">Precisión</span>
              <span className="text-2xl font-black text-sky-400 font-mono">{accuracy}%</span>
            </div>
          </div>

          <div className="aon-deductive-time-box p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-around font-mono flex-wrap gap-2">
            <span>⏱️ Ritmo medio: <strong>{avgTime}s</strong> / reactivo</span>
            <span>🎯 Pacing objetivo: <strong>≤ 26s</strong></span>
            <span>📐 Fórmula: <strong>C - (W₄/3) - (W₅/4)</strong></span>
          </div>

          {/* Desglose Científico de la Puntuación Oficial AON / cut-e */}
          <div className="p-4 rounded-2xl bg-black/60 border border-slate-700 text-left space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-amber-400" />
                <span>Fundamento Psicométrico Oficial AON / cut-e (scales sx)</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-sky-400">
                Grupo Normativo: Airline Pilot Applicants EASA
              </span>
            </div>
            <div className="text-[11px] text-slate-300 space-y-2 leading-relaxed">
              <p>
                • <strong>Fórmula de Corrección por Adivinanza (TCT Formula Scoring):</strong> Se aplica la penalización oficial de AON / cut-e donde cada fallo resta según las opciones disponibles (<span className="font-mono text-amber-300 font-bold">W₄ / 3</span> en 4×4 y <span className="font-mono text-amber-300 font-bold">W₅ / 4</span> en 5×5). Adivinar a ciegas tiene un valor esperado de 0 puntos netos.
              </p>
              <p>
                • <strong>Baremo Científico de Aspirantes a Piloto de Aerolínea:</strong> Baremos empíricos oficiales de <em>European Commercial Airline Pilot Applicants</em> (ATPL/CPL) para el test estándar de 9 minutos: Media <span className="font-mono text-sky-300 font-bold">µ = {DEDUCTIVE_NORM_MEAN}</span> puntos netos, Desviación típica <span className="font-mono text-sky-300 font-bold">σ = {DEDUCTIVE_NORM_SD}</span>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-[10px]">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-amber-400 font-bold block">Umbral Mínimo Apto (NetJets):</span>
                  <span>Stanine ≥ 6 (Percentil ≥ 60%) ➔ <strong>≥ {DEDUCTIVE_STANINE_6_NET} pts netos</strong></span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-emerald-400 font-bold block">Nivel Competitivo Superior:</span>
                  <span>Stanine ≥ 7 (Percentil ≥ 77%) ➔ <strong>≥ {DEDUCTIVE_STANINE_7_NET} pts netos</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => handleStartGame('exam')}
              className="w-full sm:w-auto flex-1 py-3.5 px-5 rounded-xl font-black text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>REPETIR SIMULACRO (9 MIN)</span>
            </button>
            <button
              onClick={() => setGameState('intro')}
              className="w-full sm:w-auto py-3.5 px-5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all active:scale-95"
            >
              Volver al Menú
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // 3. PANTALLA DE JUEGO (PLAYING)
  // ==========================================================================
  if (!currentPuzzle) return null;

  return (
    <div className="aon-deductive-screen max-w-2xl mx-auto space-y-4 animate-fade-in p-3 sm:p-5 select-none">
      {/* Barra de Estado Superior */}
      <div className="aon-deductive-play-header flex items-center justify-between bg-[#09152b] border border-sky-500/20 px-4 py-2.5 rounded-2xl shadow-md">
        <button
          onClick={() => {
            if (confirm('¿Deseas salir del simulador actual?')) {
              if (timerRef.current) clearInterval(timerRef.current);
              setGameState('intro');
            }
          }}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Salir</span>
        </button>

        {/* Nivel y Cuadrícula */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 font-bold">
            Reactivo #{attempts.length + 1}
          </span>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
            {currentGridSize}×{currentGridSize} ({currentPuzzle.availableSymbols.length} símbolos)
          </span>
        </div>

        {/* Temporizador */}
        {mode === 'exam' ? (
          <div className={`flex items-center gap-1.5 font-mono text-sm font-black px-3 py-1 rounded-xl border ${
            timeLeft < 60 
              ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse'
              : 'bg-black/40 border-amber-500/30 text-amber-400'
          }`}>
            <Timer className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        ) : (
          <span className="text-[11px] font-bold text-emerald-400 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            Modo Práctica
          </span>
        )}
      </div>

      {/* Contenedor Principal del Tablero */}
      <div className="aon-deductive-grid-card bg-gradient-to-br from-[#0c1c3d] via-[#09152b] to-[#071120] border border-sky-500/30 rounded-3xl p-4 sm:p-6 space-y-5 shadow-2xl flex flex-col items-center">
        
        {/* Barra de Complejidad y Profundidad del Puzzle */}
        <div className="w-full flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-sky-500/20 text-[10px] font-mono">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2 py-0.5 rounded font-black bg-sky-500/20 text-sky-300 border border-sky-500/30">
              Matriz {currentGridSize}×{currentGridSize}
            </span>
            <span className="px-2 py-0.5 rounded font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Profundidad: {currentPuzzle.depth} pasos ({currentPuzzle.intermediateDeductions} celdas previas)
            </span>
            <span className="px-2 py-0.5 rounded font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {currentPuzzle.emptyCellsCount}/{currentPuzzle.totalCellsCount} vacías ({Math.round((currentPuzzle.emptyCellsCount / currentPuzzle.totalCellsCount) * 100)}%)
            </span>
          </div>

          {mode === 'practice' && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setDifficultyProfile('kura_standard');
                  loadNextPuzzle(currentLevel, 'kura_standard');
                }}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  difficultyProfile === 'kura_standard'
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                KURA Oficial
              </button>
              <button
                type="button"
                onClick={() => {
                  setDifficultyProfile('hardcore_5x5');
                  loadNextPuzzle(currentLevel, 'hardcore_5x5');
                }}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  difficultyProfile === 'hardcore_5x5'
                    ? 'bg-rose-500 text-white font-black'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Hardcore 5×5
              </button>
            </div>
          )}
        </div>

        {/* Cabecera del Tablero */}
        <div className="w-full flex items-center justify-between">
          <div className="text-left space-y-0.5">
            <p className="text-xs sm:text-sm font-bold text-slate-200">
              {selectedCell && (selectedCell.r !== currentPuzzle.targetRow || selectedCell.c !== currentPuzzle.targetCol) ? (
                <span className="text-sky-300 font-bold">
                  Editando figura rayada en fila {selectedCell.r + 1}, columna {selectedCell.c + 1}:
                </span>
              ) : (
                <span>
                  ¿Qué figura corresponde en la incógnita <span className="text-amber-400 font-black font-mono">[ ? ]</span>?
                </span>
              )}
            </p>
            <p className="text-[11px] text-slate-400">
              Pulsa cualquier casilla vacía para anotar figuras rayadas. Pulsa [ ? ] para resolver.
            </p>
          </div>

          {/* Botón Pista / Bombilla */}
          <button
            onClick={() => setShowHint((prev) => !prev)}
            title="Pistas lógicas: resalta fila y columna de la incógnita"
            className={`p-2.5 rounded-xl border transition-all flex items-center gap-1 text-xs font-bold ${
              showHint
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-glow-amber animate-pulse'
                : 'bg-slate-800 text-amber-400 border-amber-500/40 hover:bg-slate-700'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Pista</span>
          </button>
        </div>

        {/* La Cuadrícula (Grid) - Diseño Oficial AON */}
        <div 
          className="aon-deductive-grid-board grid gap-2 sm:gap-2.5 p-3 rounded-2xl bg-black/60 border border-sky-500/40 shadow-inner"
          style={{
            gridTemplateColumns: `repeat(${currentGridSize}, minmax(0, 1fr))`,
          }}
        >
          {currentPuzzle.displayGrid.map((row, rIdx) =>
            row.map((cellShape, cIdx) => {
              const isTarget = rIdx === currentPuzzle.targetRow && cIdx === currentPuzzle.targetCol;
              const isSelected = selectedCell?.r === rIdx && selectedCell?.c === cIdx;
              const isRowColOfTarget = showHint && (rIdx === currentPuzzle.targetRow || cIdx === currentPuzzle.targetCol);
              const draftShape = draftMarks[`${rIdx}-${cIdx}`];
              const isClue = cellShape !== null;

              return (
                <div
                  key={`${rIdx}-${cIdx}`}
                  onClick={() => {
                    if (feedback) return;
                    if (isTarget) {
                      setSelectedCell({ r: rIdx, c: cIdx });
                    } else if (!isClue) {
                      setSelectedCell({ r: rIdx, c: cIdx });
                    }
                  }}
                  className={`aon-deductive-cell w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all cursor-pointer select-none relative ${
                    isSelected
                      ? 'ring-4 ring-sky-400 scale-[1.03] shadow-lg z-10'
                      : ''
                  } ${
                    isTarget
                      ? feedback
                        ? feedback.isCorrect
                          ? 'bg-emerald-500/30 border-2 border-emerald-400 shadow-glow-emerald scale-105 z-20'
                          : 'bg-rose-500/30 border-2 border-rose-400 shadow-glow-rose'
                        : 'bg-gradient-to-br from-amber-500/20 to-amber-600/30 border-2 border-amber-400 shadow-glow-amber'
                      : isRowColOfTarget
                      ? 'bg-sky-950/40 border border-sky-400/40'
                      : isClue
                      ? 'bg-slate-900/90 border border-slate-700/80 shadow-md'
                      : 'bg-black/30 border border-slate-800 hover:border-slate-600'
                  }`}
                >
                  {isTarget ? (
                    feedback ? (
                      <div className="flex flex-col items-center justify-center p-1 sm:p-2 animate-scale-up">
                        {renderShapeIcon(
                          feedback.chosen,
                          'w-8 h-8 sm:w-10 sm:h-10',
                          false,
                          `target-feedback-${rIdx}-${cIdx}`
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-2xl sm:text-3xl font-black text-amber-400 animate-pulse font-mono">
                          ?
                        </span>
                      </div>
                    )
                  ) : isClue ? (
                    <div className="p-1 sm:p-2 pointer-events-none">
                      {renderShapeIcon(cellShape, 'w-8 h-8 sm:w-10 sm:h-10', false, `clue-${rIdx}-${cIdx}`)}
                    </div>
                  ) : draftShape ? (
                    <div className="p-1 sm:p-2 pointer-events-none relative flex items-center justify-center">
                      {renderShapeIcon(draftShape, 'w-8 h-8 sm:w-10 sm:h-10', true, `draft-${rIdx}-${cIdx}`)}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-700 select-none">•</span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Barra Azul Inferior de Selección de Símbolo (Keypad Oficial AON) */}
        <div className="w-full space-y-2 pt-1">
          <div className="flex items-center justify-between px-2 text-xs">
            <span className="text-[11px] font-bold text-slate-300">
              {selectedCell && (selectedCell.r !== currentPuzzle.targetRow || selectedCell.c !== currentPuzzle.targetCol) ? (
                <span className="text-sky-400 font-mono flex items-center gap-1">
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Celda ({selectedCell.r + 1}, {selectedCell.c + 1}): pulsa para figura rayada</span>
                </span>
              ) : (
                <span className="text-amber-400 font-mono font-bold flex items-center gap-1">
                  <Target className="w-3.5 h-3.5" />
                  <span>Incógnita [ ? ] activa: pulsa para enviar respuesta final</span>
                </span>
              )}
            </span>

            {selectedCell && (selectedCell.r !== currentPuzzle.targetRow || selectedCell.c !== currentPuzzle.targetCol) && (
              <div className="flex items-center gap-2">
                {draftMarks[`${selectedCell.r}-${selectedCell.c}`] && (
                  <button
                    onClick={() => {
                      const cellKey = `${selectedCell.r}-${selectedCell.c}`;
                      setDraftMarks((prev) => {
                        const next = { ...prev };
                        delete next[cellKey];
                        return next;
                      });
                    }}
                    className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 transition-all font-bold flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Borrar</span>
                  </button>
                )}
                <button
                  onClick={() => setSelectedCell({ r: currentPuzzle.targetRow, c: currentPuzzle.targetCol })}
                  className="text-[10px] px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40 hover:bg-sky-500/30 transition-all font-bold"
                >
                  Ir a [ ? ]
                </button>
              </div>
            )}
          </div>

          {/* Barra Azul Oficial */}
          <div className="aon-deductive-keypad-bar p-3 sm:p-4 rounded-2xl bg-[#0284c7] shadow-xl flex items-center justify-around gap-2 sm:gap-4">
            {currentPuzzle.availableSymbols.map((sym) => {
              const isChosenInFeedback = feedback?.chosen === sym.id;
              const isCorrectInFeedback = feedback && currentPuzzle.correctShape === sym.id;

              let cardStyle = 'bg-white hover:bg-slate-50 text-slate-900 border-2 border-transparent hover:border-amber-400';
              if (feedback) {
                if (isCorrectInFeedback) {
                  cardStyle = 'bg-emerald-100 border-2 border-emerald-500 text-emerald-950 ring-2 ring-emerald-400';
                } else if (isChosenInFeedback) {
                  cardStyle = 'bg-rose-100 border-2 border-rose-500 text-rose-950 ring-2 ring-rose-400';
                } else {
                  cardStyle = 'opacity-40 bg-white/70 border-slate-300';
                }
              }

              return (
                <button
                  key={sym.id}
                  disabled={feedback !== null}
                  onClick={() => handleShapeInput(sym.id)}
                  className={`aon-deductive-keypad-btn flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all active:scale-95 shadow-md min-w-[65px] sm:min-w-[85px] ${cardStyle}`}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                    {renderShapeIcon(sym.id, 'w-8 h-8 sm:w-10 sm:h-10', false, `keypad-${sym.id}`)}
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-black text-slate-800 mt-1">{sym.name}</span>
                  <span className="text-[9px] font-mono text-slate-500 font-bold">[{sym.keyNumber}]</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback y Explicación en Modo Práctica */}
        {mode === 'practice' && (
          <div className="w-full space-y-2 pt-1">
            {feedback ? (
              <div className={`p-4 rounded-2xl border text-xs space-y-2 animate-fade-in ${
                feedback.isCorrect 
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
              }`}>
                <div className="flex items-center justify-between font-bold text-sm">
                  <span className="flex items-center gap-1.5">
                    {feedback.isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}
                    <span>{feedback.isCorrect ? '¡Correcto!' : 'Incorrecto'}</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Solución: {SYMBOLS_LIST.find((s) => s.id === currentPuzzle.correctShape)?.name}
                  </span>
                </div>

                <div className="text-[11px] text-slate-300 space-y-1">
                  {currentPuzzle.logicExplanation.map((step, idx) => (
                    <p key={idx}>• {step}</p>
                  ))}
                </div>

                <button
                  onClick={() => {
                    const nextLvl = feedback.isCorrect ? currentLevel + 1 : currentLevel;
                    setCurrentLevel(nextLvl);
                    loadNextPuzzle(nextLvl);
                  }}
                  className="w-full py-2.5 rounded-xl font-black text-xs bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all flex items-center justify-center gap-1.5 mt-2"
                >
                  <span>Siguiente Puzzle</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
