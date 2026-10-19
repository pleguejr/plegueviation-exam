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
  Info
} from 'lucide-react';
import { 
  DeductivePuzzle, 
  DeductiveSymbol, 
  ShapeId, 
  SYMBOLS_LIST, 
  generateDeductivePuzzle 
} from './AonDeductiveGenerator';

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
  score: number;
  passed: boolean;
}

export const AonDeductiveScreen: React.FC<AonDeductiveScreenProps> = ({ onBackToDashboard }) => {
  // Modes: 'intro' | 'playing' | 'results'
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'results'>('intro');
  const [mode, setMode] = useState<'exam' | 'practice'>('exam');
  
  // Timer: 9 minutes (540 seconds) for exam mode
  const EXAM_DURATION_SECONDS = 9 * 60; // 540s
  const [timeLeft, setTimeLeft] = useState<number>(EXAM_DURATION_SECONDS);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Puzzle State
  const [currentPuzzle, setCurrentPuzzle] = useState<DeductivePuzzle | null>(null);
  const [currentLevel, setCurrentLevel] = useState<number>(1); // 1..5 = 4x4, 6+ = 5x5
  const [currentGridSize, setCurrentGridSize] = useState<4 | 5>(4);
  const [attempts, setAttempts] = useState<AttemptResult[]>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; chosen: ShapeId } | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Historical local storage
  const [history, setHistory] = useState<SessionSummary[]>(() => {
    try {
      const saved = localStorage.getItem('plegueviation_aon_deductive_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const timerRef = useRef<any>(null);

  // Iniciar puzzle
  const loadNextPuzzle = useCallback((targetLevel: number) => {
    const size: 4 | 5 = targetLevel <= 5 ? 4 : 5;
    let diff: 'basic_4x4' | 'intermediate_4x4' | 'advanced_5x5' = 'basic_4x4';
    if (size === 4 && targetLevel >= 3) diff = 'intermediate_4x4';
    if (size === 5) diff = 'advanced_5x5';

    setCurrentGridSize(size);
    const p = generateDeductivePuzzle(size, diff);
    setCurrentPuzzle(p);
    setFeedback(null);
    setShowHint(false);
    setStartTime(Date.now());
  }, []);

  // Iniciar partida
  const handleStartGame = (selectedMode: 'exam' | 'practice') => {
    setMode(selectedMode);
    setTimeLeft(EXAM_DURATION_SECONDS);
    setAttempts([]);
    setCurrentLevel(1);
    setCurrentGridSize(4);
    setGameState('playing');
    loadNextPuzzle(1);
  };

  // Finalizar examen
  const handleFinishExam = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState('results');

    // Calcular estadísticas
    setAttempts((prevAttempts) => {
      const total = prevAttempts.length;
      const correct = prevAttempts.filter((a) => a.isCorrect).length;
      const wrong = total - correct;
      const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
      const totalTimeMs = prevAttempts.reduce((acc, a) => acc + a.timeSpentMs, 0);
      const avgTime = total > 0 ? Math.round((totalTimeMs / total / 1000) * 10) / 10 : 0;
      
      // En cut-e, cada acierto suma 1 y fallo penaliza 0.5 (o net score)
      const netScore = Math.max(0, correct - Math.floor(wrong * 0.5));
      // Meta NetJets: >= 20 preguntas contestadas con >= 80% de aciertos
      const passed = total >= 18 && accuracy >= 80;

      const summary: SessionSummary = {
        date: new Date().toISOString(),
        mode,
        totalAnswered: total,
        correctCount: correct,
        wrongCount: wrong,
        accuracy,
        avgTimeSeconds: avgTime,
        score: netScore,
        passed,
      };

      setHistory((prevHist) => {
        const updated = [summary, ...prevHist].slice(0, 30);
        try {
          localStorage.setItem('plegueviation_aon_deductive_history', JSON.stringify(updated));
        } catch {}
        return updated;
      });

      return prevAttempts;
    });
  }, [mode]);

  // Manejador del temporizador
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

  // Manejo de respuesta del usuario
  const handleSelectShape = (shapeId: ShapeId) => {
    if (!currentPuzzle || feedback) return;

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

    if (mode === 'exam') {
      // En modo examen, avance instantáneo
      const nextLvl = isCorrect ? currentLevel + 1 : Math.max(1, currentLevel);
      setCurrentLevel(nextLvl);
      loadNextPuzzle(nextLvl);
    } else {
      // En modo práctica, mostrar feedback visual antes de pasar
      setFeedback({ isCorrect, chosen: shapeId });
    }
  };

  // Teclado físico: teclas 1..5 para los símbolos
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '5') {
        const idx = parseInt(e.key, 10) - 1;
        if (currentPuzzle && idx < currentPuzzle.availableSymbols.length) {
          handleSelectShape(currentPuzzle.availableSymbols[idx].id);
        }
      } else if (e.key === ' ' && mode === 'practice' && feedback) {
        // Espacio para continuar en modo práctica
        const nextLvl = feedback.isCorrect ? currentLevel + 1 : currentLevel;
        setCurrentLevel(nextLvl);
        loadNextPuzzle(nextLvl);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, currentPuzzle, feedback, mode, currentLevel, loadNextPuzzle]);

  // Formato mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Renderizar Símbolo SVG
  const renderShapeIcon = (shapeId: ShapeId, sizeClass = 'w-9 h-9 sm:w-11 sm:h-11') => {
    switch (shapeId) {
      case 'circle':
        return (
          <svg className={sizeClass} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="38" fill="#f59e0b" stroke="#d97706" strokeWidth="6" />
          </svg>
        );
      case 'square':
        return (
          <svg className={sizeClass} viewBox="0 0 100 100">
            <rect x="16" y="16" width="68" height="68" rx="8" fill="#0ea5e9" stroke="#0284c7" strokeWidth="6" />
          </svg>
        );
      case 'triangle':
        return (
          <svg className={sizeClass} viewBox="0 0 100 100">
            <polygon points="50,14 86,82 14,82" fill="#10b981" stroke="#059669" strokeWidth="6" strokeLinejoin="round" />
          </svg>
        );
      case 'cross':
        return (
          <svg className={sizeClass} viewBox="0 0 100 100">
            <path
              d="M38,12 L62,12 L62,38 L88,38 L88,62 L62,62 L62,88 L38,88 L38,62 L12,62 L12,38 L38,38 Z"
              fill="#f43f5e"
              stroke="#e11d48"
              strokeWidth="5"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'diamond':
        return (
          <svg className={sizeClass} viewBox="0 0 100 100">
            <polygon points="50,12 88,50 50,88 12,50" fill="#a855f7" stroke="#7e22ce" strokeWidth="6" strokeLinejoin="round" />
          </svg>
        );
      default:
        return null;
    }
  };

  // 1. PANTALLA INTRODUCCIÓN / REGLAS
  if (gameState === 'intro') {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in p-4 sm:p-6">
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
            AON / cut-e • NetJets Assessment
          </span>
        </div>

        {/* Hero Card */}
        <div className="bg-gradient-to-br from-[#0c1c3d] via-[#09152b] to-[#060e1d] border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
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
            <div className="p-4 rounded-2xl bg-black/40 border border-sky-500/20 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>1. Regla de Cuadrícula</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cada figura geométrica debe aparecer <strong>exactamente una vez</strong> en cada fila y en cada columna (sin diagonales).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                <span>2. Progresión 4×4 a 5×5</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Inicias en cuadrículas 4×4 con 4 símbolos. Al ir acertando, aumentará la dificultad y pasarás a 5×5 con 5 símbolos.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Timer className="w-4 h-4" />
                <span>3. Formato Examen NetJets</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>9 minutos</strong> oficiales de cuenta atrás. El objetivo es resolver la mayor cantidad posible con alta precisión ($\ge 80\%$).
              </p>
            </div>
          </div>

          {/* Símbolos del test */}
          <div className="p-4 rounded-2xl bg-black/30 border border-slate-800 space-y-2">
            <p className="text-xs font-bold text-slate-300">Símbolos utilizados en el test:</p>
            <div className="flex items-center justify-around sm:justify-start sm:gap-6 pt-1">
              {SYMBOLS_LIST.map((sym) => (
                <div key={sym.id} className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center p-1.5 shadow-md">
                    {renderShapeIcon(sym.id, 'w-8 h-8')}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{sym.name}</span>
                  <span className="text-[9px] font-mono text-sky-400 font-black">[{sym.keyNumber}]</span>
                </div>
              ))}
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

        {/* Historial de Intentos */}
        {history.length > 0 && (
          <div className="bg-[#09152b] border border-sky-500/20 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
                <BarChart3 className="w-4 h-4" />
                <span>Historial de Simulacros Recientes</span>
              </div>
              <span className="text-[11px] text-slate-400">{history.length} sesiones guardadas</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {history.slice(0, 6).map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      item.passed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {item.passed ? 'PASS NETJETS' : 'REVIEW'}
                    </span>
                    <p className="text-xs font-bold text-white mt-1">
                      {item.correctCount} / {item.totalAnswered} aciertos ({item.accuracy}%)
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {item.avgTimeSeconds}s por puzzle • {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-lg font-black font-mono text-amber-400">
                    +{item.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. PANTALLA DE RESULTADOS
  if (gameState === 'results') {
    const total = attempts.length;
    const correct = attempts.filter((a) => a.isCorrect).length;
    const wrong = total - correct;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    const totalTimeMs = attempts.reduce((acc, a) => acc + a.timeSpentMs, 0);
    const avgTime = total > 0 ? Math.round((totalTimeMs / total / 1000) * 10) / 10 : 0;
    const netScore = Math.max(0, correct - Math.floor(wrong * 0.5));
    const passed = total >= 18 && accuracy >= 80;

    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in p-4 sm:p-6">
        <div className="bg-gradient-to-br from-[#0c1c3d] via-[#09152b] to-[#060e1d] border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 text-center shadow-2xl">
          <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl shadow-lg border-2 ${
            passed ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400 shadow-glow-emerald' : 'bg-rose-500/20 border-rose-400 text-rose-400 shadow-glow-rose'
          }">
            {passed ? <Trophy className="w-10 h-10 text-emerald-400" /> : <Award className="w-10 h-10 text-amber-400" />}
          </div>

          <div>
            <span className={`inline-block text-xs font-black uppercase px-3 py-1 rounded-full mb-2 ${
              passed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
            }`}>
              {passed ? 'AON CUT-E: PASS PERFORMANCE GOAL' : 'AON CUT-E: REPASO REQUERIDO'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {passed ? '¡Excelente Rendimiento Lógico!' : 'Simulacro Completado'}
            </h2>
            <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
              {passed 
                ? 'Has alcanzado los estándares psicométricos exigidos por NetJets en razonamiento deductivo.'
                : 'Para asegurar el apto en la fase 1 de NetJets se recomienda superar 18 reactivos con un 80% o más de precisión.'}
            </p>
          </div>

          {/* Métricas clave */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-black/40 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Resueltas</span>
              <span className="text-2xl font-black text-white font-mono">{total}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/40 border border-emerald-500/20">
              <span className="text-[10px] font-bold text-emerald-400 uppercase block">Aciertos</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">{correct}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/40 border border-rose-500/20">
              <span className="text-[10px] font-bold text-rose-400 uppercase block">Fallos</span>
              <span className="text-2xl font-black text-rose-400 font-mono">{wrong}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/40 border border-sky-500/20">
              <span className="text-[10px] font-bold text-sky-400 uppercase block">Precisión</span>
              <span className="text-2xl font-black text-sky-400 font-mono">{accuracy}%</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-around font-mono">
            <span>⏱️ Tiempo medio: <strong>{avgTime}s</strong> / puzzle</span>
            <span>⭐ Puntuación Neta: <strong>+{netScore}</strong></span>
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

  // 3. PANTALLA DE JUEGO (PLAYING)
  if (!currentPuzzle) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-4 animate-fade-in p-3 sm:p-5 select-none">
      {/* Barra de Estado Superior */}
      <div className="flex items-center justify-between bg-[#09152b] border border-sky-500/20 px-4 py-2.5 rounded-2xl shadow-md">
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
      <div className="bg-gradient-to-br from-[#0c1c3d] via-[#09152b] to-[#071120] border border-sky-500/30 rounded-3xl p-4 sm:p-6 space-y-5 shadow-2xl flex flex-col items-center">
        
        {/* Instrucción visual breve */}
        <div className="text-center space-y-0.5">
          <p className="text-xs sm:text-sm font-bold text-slate-200">
            ¿Qué figura corresponde en la casilla incógnita <span className="text-amber-400 font-black font-mono">[ ? ]</span>?
          </p>
          <p className="text-[11px] text-slate-400">
            Cada símbolo aparece solo una vez por fila y por columna.
          </p>
        </div>

        {/* La Cuadrícula (Grid) */}
        <div 
          className="grid gap-2 sm:gap-2.5 p-3 rounded-2xl bg-black/60 border border-sky-500/40 shadow-inner"
          style={{
            gridTemplateColumns: `repeat(${currentGridSize}, minmax(0, 1fr))`,
          }}
        >
          {currentPuzzle.displayGrid.map((row, rIdx) =>
            row.map((cellShape, cIdx) => {
              const isTarget = rIdx === currentPuzzle.targetRow && cIdx === currentPuzzle.targetCol;
              const isRowColOfTarget = showHint && (rIdx === currentPuzzle.targetRow || cIdx === currentPuzzle.targetCol);

              return (
                <div
                  key={`${rIdx}-${cIdx}`}
                  className={`w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all ${
                    isTarget
                      ? 'bg-gradient-to-br from-amber-500/20 to-amber-600/30 border-2 border-amber-400 shadow-glow-amber scale-105'
                      : isRowColOfTarget
                      ? 'bg-sky-950/40 border border-sky-400/40'
                      : cellShape !== null
                      ? 'bg-slate-900/90 border border-slate-700/80 shadow-md'
                      : 'bg-black/30 border border-dashed border-slate-800'
                  }`}
                >
                  {isTarget ? (
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-2xl sm:text-3xl font-black text-amber-400 animate-pulse font-mono">
                        ?
                      </span>
                    </div>
                  ) : cellShape !== null ? (
                    <div className="p-1 sm:p-2">
                      {renderShapeIcon(cellShape)}
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-700">•</span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Botones de Selección de Símbolo (Keypad) */}
        <div className="w-full space-y-2 pt-2">
          <p className="text-[11px] font-bold text-center text-slate-400 uppercase tracking-wider">
            Selecciona la figura correcta (o pulsa teclas 1 - {currentPuzzle.availableSymbols.length}):
          </p>

          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            {currentPuzzle.availableSymbols.map((sym) => {
              const isChosenInFeedback = feedback?.chosen === sym.id;
              const isCorrectInFeedback = feedback && currentPuzzle.correctShape === sym.id;

              let btnStyle = 'bg-slate-900/90 border-slate-700 hover:border-sky-400 text-white';
              if (feedback) {
                if (isCorrectInFeedback) {
                  btnStyle = 'bg-emerald-950 border-emerald-400 text-emerald-300 ring-2 ring-emerald-400';
                } else if (isChosenInFeedback) {
                  btnStyle = 'bg-rose-950 border-rose-400 text-rose-300 ring-2 ring-rose-400';
                } else {
                  btnStyle = 'opacity-40 bg-slate-900 border-slate-800';
                }
              }

              return (
                <button
                  key={sym.id}
                  disabled={feedback !== null}
                  onClick={() => handleSelectShape(sym.id)}
                  className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl border transition-all active:scale-95 shadow-lg min-w-[70px] sm:min-w-[90px] ${btnStyle}`}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                    {renderShapeIcon(sym.id, 'w-8 h-8 sm:w-10 sm:h-10')}
                  </div>
                  <span className="text-[11px] font-extrabold mt-1">{sym.name}</span>
                  <span className="text-[9px] font-mono text-sky-400 font-bold">[{sym.keyNumber}]</span>
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
            ) : (
              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  onClick={() => setShowHint((prev) => !prev)}
                  className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showHint ? 'Ocultar Pista' : 'Ver Pista Lógica'}</span>
                </button>

                {showHint && (
                  <span className="text-[11px] text-slate-400 italic">
                    (Fila {currentPuzzle.targetRow + 1} y Columna {currentPuzzle.targetCol + 1} resaltadas)
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
