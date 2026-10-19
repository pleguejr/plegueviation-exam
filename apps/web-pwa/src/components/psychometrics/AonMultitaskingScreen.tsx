import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ArrowLeft, 
  Timer, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Play, 
  Trophy, 
  Zap, 
  Award, 
  BarChart3, 
  Plane, 
  Calculator, 
  ShieldAlert, 
  Volume2, 
  VolumeX,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Copy,
  Layers,
  HelpCircle,
  Clock
} from 'lucide-react';
import { MathQuestion, generateMathQuestion } from './AonMathEngine';
import { DuplicateQuestion, generateDuplicateQuestion } from './AonDuplicateEngine';

interface AonMultitaskingScreenProps {
  onBackToDashboard: () => void;
}

interface MathAnswerRecord {
  questionId: string;
  expression: string;
  isCorrect: boolean;
  userAnsweredCorrect: boolean;
  timeSpentMs: number;
}

interface DuplicateAnswerRecord {
  questionId: string;
  hasDuplicate: boolean;
  userAnsweredDuplicate: boolean;
  timeSpentMs: number;
}

interface MultitaskingSessionSummary {
  date: string;
  mode: 'triple-exam' | 'pure-arrows' | 'pure-math' | 'pure-duplicates';
  durationSeconds: number;
  // Flechas & Obstáculos
  totalWaves: number;
  wavesDodged: number;
  collisions: number;
  flightScorePercent: number;
  // Sumas y Restas
  totalMathAnswered: number;
  mathCorrect: number;
  mathAccuracy: number;
  avgMathResponseTimeSec: number;
  // Duplicados o No
  totalDuplicatesAnswered: number;
  duplicatesCorrect: number;
  duplicatesAccuracy: number;
  avgDuplicateResponseTimeSec: number;
  // Global
  overallScore: number;
  passed: boolean;
}

// Estructura de oleada de barreras con 4 carriles
interface BarrierWave {
  id: number;
  y: number; // Posición vertical en píxeles (0..canvasHeight)
  safeLane: number; // 0, 1, 2 o 3 (el carril abierto)
  passed: boolean;
  evaluated: boolean;
}

export const AonMultitaskingScreen: React.FC<AonMultitaskingScreenProps> = ({ onBackToDashboard }) => {
  // Game states: 'intro' | 'playing' | 'results'
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'results'>('intro');
  // Submodes: 'triple-exam' (Oficial 3-en-1) | 'pure-arrows' | 'pure-math' | 'pure-duplicates'
  const [activeMode, setActiveMode] = useState<'triple-exam' | 'pure-arrows' | 'pure-math' | 'pure-duplicates'>('triple-exam');

  // Exam Duration options: 300s (5m), 480s (8m), 180s (3m)
  const [examDuration, setExamDuration] = useState<number>(300); // Default 5 min oficial Aon
  const [timeLeft, setTimeLeft] = useState<number>(300);

  // Audio mute
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // ==========================================
  // TAREA 1: FLECHAS & OBSTÁCULOS (4 CARRILES)
  // ==========================================
  const NUM_LANES = 4;
  const [currentLane, setCurrentLane] = useState<number>(1); // Carriles: 0, 1, 2, 3 (empieza en 1)
  const [wavesTotal, setWavesTotal] = useState<number>(0);
  const [wavesDodged, setWavesDodged] = useState<number>(0);
  const [collisionsCount, setCollisionsCount] = useState<number>(0);
  const [laneFlash, setLaneFlash] = useState<'hit' | 'clear' | null>(null);

  // Refs de animación y simulación de carriles
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const currentLaneRef = useRef<number>(1);
  const wavesRef = useRef<BarrierWave[]>([]);
  const lastWaveTimeRef = useRef<number>(0);
  const collisionFlashTimerRef = useRef<any>(null);

  // ==========================================
  // TAREA 2: SUMAS Y RESTAS (MENTAL ARITHMETIC)
  // ==========================================
  const [currentMath, setCurrentMath] = useState<MathQuestion | null>(null);
  const [mathAnswers, setMathAnswers] = useState<MathAnswerRecord[]>([]);
  const [mathStartTime, setMathStartTime] = useState<number>(Date.now());
  const [mathFeedback, setMathFeedback] = useState<'correct' | 'wrong' | null>(null);

  // ==========================================
  // TAREA 3: DUPLICADOS O NO (PATTERNS)
  // ==========================================
  const [currentDuplicate, setCurrentDuplicate] = useState<DuplicateQuestion | null>(null);
  const [duplicateAnswers, setDuplicateAnswers] = useState<DuplicateAnswerRecord[]>([]);
  const [duplicateStartTime, setDuplicateStartTime] = useState<number>(Date.now());
  const [duplicateFeedback, setDuplicateFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Timer & History
  const timerRef = useRef<any>(null);
  const [history, setHistory] = useState<MultitaskingSessionSummary[]>(() => {
    try {
      const saved = localStorage.getItem('plegueviation_aon_multitask_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Audio Context Ref (Web Audio API)
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.15) => {
    if (isMuted) return;
    try {
      initAudio();
      if (!audioCtxRef.current) return;
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio fallback silencioso
    }
  }, [isMuted]);

  const playClearWaveSound = useCallback(() => {
    playTone(700, 0.08, 'sine', 0.12);
  }, [playTone]);

  const playCollisionSound = useCallback(() => {
    playTone(140, 0.35, 'sawtooth', 0.28);
  }, [playTone]);

  const playCorrectTaskSound = useCallback(() => {
    playTone(950, 0.1, 'triangle', 0.15);
  }, [playTone]);

  const playWrongTaskSound = useCallback(() => {
    playTone(280, 0.18, 'sawtooth', 0.18);
  }, [playTone]);

  // Sincronizar ref de carril para el bucle de renderizado a 60 FPS
  useEffect(() => {
    currentLaneRef.current = currentLane;
  }, [currentLane]);

  // ==========================================
  // MANEJO DE MOVIMIENTO DE FLECHAS (CARRILES)
  // ==========================================
  const moveLeft = useCallback(() => {
    if (gameState !== 'playing') return;
    setCurrentLane((prev) => {
      const next = Math.max(0, prev - 1);
      currentLaneRef.current = next;
      return next;
    });
  }, [gameState]);

  const moveRight = useCallback(() => {
    if (gameState !== 'playing') return;
    setCurrentLane((prev) => {
      const next = Math.min(NUM_LANES - 1, prev + 1);
      currentLaneRef.current = next;
      return next;
    });
  }, [gameState]);

  // ==========================================
  // MANEJO DE RESPUESTAS: SUMAS Y RESTAS
  // ==========================================
  const handleMathAnswer = useCallback((userThinksCorrect: boolean) => {
    if (!currentMath || gameState !== 'playing') return;

    const timeSpent = Date.now() - mathStartTime;
    const isActuallyCorrect = currentMath.isMathematicallyCorrect;
    const userGotItRight = userThinksCorrect === isActuallyCorrect;

    if (userGotItRight) {
      playCorrectTaskSound();
      setMathFeedback('correct');
    } else {
      playWrongTaskSound();
      setMathFeedback('wrong');
    }

    setMathAnswers((prev) => [
      ...prev,
      {
        questionId: currentMath.id,
        expression: currentMath.expression,
        isCorrect: isActuallyCorrect,
        userAnsweredCorrect: userThinksCorrect,
        timeSpentMs: timeSpent
      }
    ]);

    setTimeout(() => {
      setMathFeedback(null);
      setCurrentMath(generateMathQuestion());
      setMathStartTime(Date.now());
    }, 220);
  }, [currentMath, gameState, mathStartTime, playCorrectTaskSound, playWrongTaskSound]);

  // ==========================================
  // MANEJO DE RESPUESTAS: DUPLICADOS O NO
  // ==========================================
  const handleDuplicateAnswer = useCallback((userThinksDuplicate: boolean) => {
    if (!currentDuplicate || gameState !== 'playing') return;

    const timeSpent = Date.now() - duplicateStartTime;
    const isActuallyDuplicate = currentDuplicate.hasDuplicate;
    const userGotItRight = userThinksDuplicate === isActuallyDuplicate;

    if (userGotItRight) {
      playCorrectTaskSound();
      setDuplicateFeedback('correct');
    } else {
      playWrongTaskSound();
      setDuplicateFeedback('wrong');
    }

    setDuplicateAnswers((prev) => [
      ...prev,
      {
        questionId: currentDuplicate.id,
        hasDuplicate: isActuallyDuplicate,
        userAnsweredDuplicate: userThinksDuplicate,
        timeSpentMs: timeSpent
      }
    ]);

    setTimeout(() => {
      setDuplicateFeedback(null);
      setCurrentDuplicate(generateDuplicateQuestion(7));
      setDuplicateStartTime(Date.now());
    }, 240);
  }, [currentDuplicate, gameState, duplicateStartTime, playCorrectTaskSound, playWrongTaskSound]);

  // ==========================================
  // LISTENER DE TECLADO FÍSICO
  // ==========================================
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      // 1. Flechas y teclas de carril (← → o A/D)
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        moveLeft();
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        moveRight();
      }

      // 2. Tarea de Mates: Tecla 1 o C (Correcto), Tecla 2 o I (Incorrecto)
      if (activeMode === 'triple-exam' || activeMode === 'pure-math') {
        if (e.key === '1' || e.key === 'c' || e.key === 'C') {
          e.preventDefault();
          handleMathAnswer(true);
        } else if (e.key === '2' || e.key === 'i' || e.key === 'I') {
          e.preventDefault();
          handleMathAnswer(false);
        }
      }

      // 3. Tarea de Duplicados: Tecla 3 o D (Duplicado), Tecla 4 o U (Únicos)
      if (activeMode === 'triple-exam' || activeMode === 'pure-duplicates') {
        if (e.key === '3' || (e.key.toLowerCase() === 'd' && (activeMode as string) !== 'triple-exam')) {
          e.preventDefault();
          handleDuplicateAnswer(true);
        } else if (e.key === '4' || e.key === 'u' || e.key === 'U') {
          e.preventDefault();
          handleDuplicateAnswer(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, activeMode, moveLeft, moveRight, handleMathAnswer, handleDuplicateAnswer]);

  // ==========================================
  // INICIAR Y FINALIZAR SESIÓN
  // ==========================================
  const startSession = (mode: 'triple-exam' | 'pure-arrows' | 'pure-math' | 'pure-duplicates') => {
    initAudio();
    setActiveMode(mode);
    setTimeLeft(examDuration);
    setGameState('playing');

    // Resetear estados
    setCurrentLane(1);
    currentLaneRef.current = 1;
    setWavesTotal(0);
    setWavesDodged(0);
    setCollisionsCount(0);
    wavesRef.current = [];
    lastWaveTimeRef.current = Date.now();

    // Mates
    setMathAnswers([]);
    setCurrentMath(generateMathQuestion());
    setMathStartTime(Date.now());
    setMathFeedback(null);

    // Duplicados
    setDuplicateAnswers([]);
    setCurrentDuplicate(generateDuplicateQuestion(7));
    setDuplicateStartTime(Date.now());
    setDuplicateFeedback(null);
  };

  const finishSession = useCallback(() => {
    setGameState('results');

    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Cálculos estadísticos
    const totalM = mathAnswers.length;
    const correctM = mathAnswers.filter(a => (a.isCorrect && a.userAnsweredCorrect) || (!a.isCorrect && !a.userAnsweredCorrect)).length;
    const mathAcc = totalM > 0 ? Math.round((correctM / totalM) * 100) : 0;
    const avgMTime = totalM > 0 ? (mathAnswers.reduce((acc, a) => acc + a.timeSpentMs, 0) / totalM / 1000) : 0;

    const totalD = duplicateAnswers.length;
    const correctD = duplicateAnswers.filter(a => (a.hasDuplicate && a.userAnsweredDuplicate) || (!a.hasDuplicate && !a.userAnsweredDuplicate)).length;
    const dupAcc = totalD > 0 ? Math.round((correctD / totalD) * 100) : 0;
    const avgDTime = totalD > 0 ? (duplicateAnswers.reduce((acc, a) => acc + a.timeSpentMs, 0) / totalD / 1000) : 0;

    const flightScore = wavesTotal > 0 ? Math.max(0, Math.round(((wavesTotal - collisionsCount) / wavesTotal) * 100)) : 100;

    // Ponderación global oficial NetJets: 30% Flechas + 40% Mates + 30% Duplicados
    let overall = 0;
    if (activeMode === 'triple-exam') {
      overall = Math.round((flightScore * 0.3) + (mathAcc * 0.4) + (dupAcc * 0.3));
    } else if (activeMode === 'pure-arrows') {
      overall = flightScore;
    } else if (activeMode === 'pure-math') {
      overall = mathAcc;
    } else {
      overall = dupAcc;
    }

    const passed = overall >= 75 && collisionsCount <= 3;

    const summary: MultitaskingSessionSummary = {
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
      mode: activeMode,
      durationSeconds: examDuration - timeLeft,
      totalWaves: wavesTotal,
      wavesDodged: wavesDodged,
      collisions: collisionsCount,
      flightScorePercent: flightScore,
      totalMathAnswered: totalM,
      mathCorrect: correctM,
      mathAccuracy: mathAcc,
      avgMathResponseTimeSec: Math.round(avgMTime * 10) / 10,
      totalDuplicatesAnswered: totalD,
      duplicatesCorrect: correctD,
      duplicatesAccuracy: dupAcc,
      avgDuplicateResponseTimeSec: Math.round(avgDTime * 10) / 10,
      overallScore: overall,
      passed
    };

    setHistory(prev => {
      const next = [summary, ...prev].slice(0, 25);
      try {
        localStorage.setItem('plegueviation_aon_multitask_history', JSON.stringify(next));
      } catch {}
      return next;
    });
  }, [activeMode, collisionsCount, duplicateAnswers, examDuration, mathAnswers, timeLeft, wavesDodged, wavesTotal]);

  // ==========================================
  // CUENTA ATRÁS DEL TEMPORIZADOR
  // ==========================================
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            finishSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, finishSession]);

  // ==========================================
  // MOTOR CANVAS A 60 FPS: 4 CARRILES DE OBSTÁCULOS
  // ==========================================
  useEffect(() => {
    if (gameState !== 'playing' || activeMode === 'pure-math' || activeMode === 'pure-duplicates') {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;
    const width = canvas.width;
    const height = canvas.height;
    const laneWidth = width / NUM_LANES;
    const planeY = height - 55; // Posición vertical del avión fija cerca de la base

    // Frecuencia de oleadas: una cada ~1.8 segundos
    const WAVE_INTERVAL_MS = 1800;
    const WAVE_SPEED = 2.4; // Velocidad de descenso en píxeles por frame

    const loop = (timestamp: number) => {
      if (!isRunning) return;

      // 1. Generar nuevas oleadas periódicamente
      const now = Date.now();
      if (now - lastWaveTimeRef.current >= WAVE_INTERVAL_MS) {
        lastWaveTimeRef.current = now;
        const safe = Math.floor(Math.random() * NUM_LANES);
        wavesRef.current.push({
          id: now,
          y: -24,
          safeLane: safe,
          passed: false,
          evaluated: false
        });
        setWavesTotal(w => w + 1);
      }

      // 2. Limpiar fondo del Canvas
      ctx.fillStyle = '#070f1e'; // Fondo radar cockpit nocturno
      ctx.fillRect(0, 0, width, height);

      // 3. Dibujar líneas separadoras de carriles
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 6]);
      for (let i = 1; i < NUM_LANES; i++) {
        const x = i * laneWidth;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // 4. Dibujar línea de impacto / target line en planeY
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, planeY + 12);
      ctx.lineTo(width, planeY + 12);
      ctx.stroke();

      // 5. Mover y dibujar oleadas de obstáculos
      const currentWaves = wavesRef.current;
      for (let i = 0; i < currentWaves.length; i++) {
        const wave = currentWaves[i];
        wave.y += WAVE_SPEED;

        // Dibujar los bloques de peligro en los 3 carriles bloqueados
        for (let l = 0; l < NUM_LANES; l++) {
          const laneX = l * laneWidth;
          if (l === wave.safeLane) {
            // Carril seguro: Zona verde de escape
            ctx.fillStyle = 'rgba(16, 185, 129, 0.25)';
            ctx.fillRect(laneX + 2, wave.y - 12, laneWidth - 4, 24);
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 2;
            ctx.strokeRect(laneX + 2, wave.y - 12, laneWidth - 4, 24);

            // Icono de carril libre (flecha hacia abajo o punto seguro)
            ctx.fillStyle = '#34d399';
            ctx.font = 'bold 12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('LIBRE', laneX + laneWidth / 2, wave.y + 4);
          } else {
            // Carril bloqueado: Barrera de peligro roja
            ctx.fillStyle = 'rgba(239, 68, 68, 0.85)';
            ctx.fillRect(laneX + 2, wave.y - 12, laneWidth - 4, 24);
            ctx.strokeStyle = '#f87171';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(laneX + 2, wave.y - 12, laneWidth - 4, 24);

            // Franjas de advertencia amarillas dentro del bloque
            ctx.fillStyle = 'rgba(254, 240, 138, 0.4)';
            for (let stripe = 6; stripe < laneWidth - 8; stripe += 14) {
              ctx.fillRect(laneX + stripe, wave.y - 10, 6, 20);
            }
          }
        }

        // 6. Evaluación de colisión o evasión al cruzar planeY
        if (!wave.evaluated && wave.y >= planeY - 10 && wave.y <= planeY + 16) {
          wave.evaluated = true;
          const userLane = currentLaneRef.current;
          if (userLane === wave.safeLane) {
            // Evasión limpia
            setWavesDodged(d => d + 1);
            playClearWaveSound();
            setLaneFlash('clear');
            setTimeout(() => setLaneFlash(null), 180);
          } else {
            // Colisión con barrera
            setCollisionsCount(c => c + 1);
            playCollisionSound();
            setLaneFlash('hit');
            setTimeout(() => setLaneFlash(null), 250);
          }
        }

        if (wave.y > height + 30) {
          wave.passed = true;
        }
      }

      // Filtrar oleadas pasadas
      wavesRef.current = currentWaves.filter(w => !w.passed);

      // 7. Dibujar Aeronave del Candidato en currentLaneRef
      const targetLaneX = currentLaneRef.current * laneWidth;
      const planeCenterX = targetLaneX + laneWidth / 2;

      // Resplandor de carril seleccionado
      ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.fillRect(targetLaneX + 1, 0, laneWidth - 2, height);

      // Dibujar Avión estilizado
      ctx.save();
      ctx.translate(planeCenterX, planeY);

      // Sombra proyectada
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.ellipse(0, 8, 16, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Fuselaje del avión
      ctx.fillStyle = '#38bdf8'; // Sky blue
      ctx.beginPath();
      ctx.moveTo(0, -18); // Morro
      ctx.lineTo(5, -6);
      ctx.lineTo(20, 6);  // Punta ala der
      ctx.lineTo(7, 6);
      ctx.lineTo(5, 14);  // Cola der
      ctx.lineTo(10, 18);
      ctx.lineTo(-10, 18);
      ctx.lineTo(-5, 14); // Cola izq
      ctx.lineTo(-7, 6);
      ctx.lineTo(-20, 6); // Punta ala izq
      ctx.lineTo(-5, -6);
      ctx.closePath();
      ctx.fill();

      // Cabina / Cockpit
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.ellipse(0, -8, 2.5, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Luces de navegación en puntas de alas
      ctx.fillStyle = '#ef4444'; // Izq roja
      ctx.fillRect(-20, 5, 2, 2);
      ctx.fillStyle = '#22c55e'; // Der verde
      ctx.fillRect(18, 5, 2, 2);

      ctx.restore();

      // 8. Flash de impacto o evasión
      if (laneFlash === 'hit') {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.35)';
        ctx.fillRect(0, 0, width, height);
      } else if (laneFlash === 'clear') {
        ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
        ctx.fillRect(0, 0, width, height);
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [gameState, activeMode, laneFlash, playClearWaveSound, playCollisionSound]);

  // Formatear tiempo mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-6">
      {/* ======================================================== */}
      {/* 1. CABECERA PRINCIPAL */}
      {/* ======================================================== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-700/60">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDashboard}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors shadow-sm"
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
                <Sparkles className="w-3.5 h-3.5" /> Stage 1 NetJets
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Layers className="w-6 h-6 text-rose-400" />
              <span>AON Multitasking Capability (3-en-1)</span>
            </h1>
          </div>
        </div>

        {/* Controles de Sonido y Estado */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={() => setIsMuted(m => !m)}
            className={`p-2 rounded-lg border text-xs font-bold transition-all flex items-center gap-1.5 ${
              isMuted
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                : 'bg-slate-800/80 border-slate-700 text-emerald-300 hover:bg-slate-700'
            }`}
            title={isMuted ? 'Activar sonido sintetizado' : 'Silenciar sonido'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isMuted ? 'Mudo' : 'Audio OK'}</span>
          </button>

          {gameState === 'playing' && (
            <div className="flex items-center gap-2 bg-slate-900/90 border border-amber-500/40 px-3 py-1.5 rounded-lg shadow-sm">
              <Timer className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="font-mono text-base font-black text-amber-300">
                {formatTime(timeLeft)}
              </span>
            </div>
          )}

          {gameState === 'playing' && (
            <button
              onClick={finishSession}
              className="px-3 py-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-black transition-all active:scale-95 shadow-sm"
            >
              Terminar
            </button>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. PANTALLA INTRO: SELECCIÓN DE MODO Y BRIEFING */}
      {/* ======================================================== */}
      {gameState === 'intro' && (
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Tarjeta de Especificación Oficial NetJets */}
          <div className="bg-gradient-to-br from-slate-900 via-aviation-950 to-slate-900 border border-rose-500/30 rounded-2xl p-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-amber-600 flex items-center justify-center shrink-0 shadow-lg">
                <Layers className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-1">
                  Estructura Oficial del Test Multitarea AON (scales mt)
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  En la convocatoria de NetJets Europe y aerolíneas líderes, la prueba psicotécnica evalúa tu capacidad para gestionar <strong className="text-rose-300">tres tareas simultáneas</strong> en una sola pantalla sin pausas:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 text-xs">
                  <div className="p-3 rounded-xl bg-slate-800/70 border border-sky-500/30">
                    <span className="font-bold text-sky-400 flex items-center gap-1.5 mb-1">
                      <Plane className="w-4 h-4" /> 1. Flechas (Carriles)
                    </span>
                    <p className="text-slate-300">
                      Oleadas de obstáculos que caen continuamente. Mueve el avión con las <strong>flechas [←][→]</strong> al único carril libre antes del impacto.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/70 border border-amber-500/30">
                    <span className="font-bold text-amber-400 flex items-center gap-1.5 mb-1">
                      <Calculator className="w-4 h-4" /> 2. Sumas y Restas
                    </span>
                    <p className="text-slate-300">
                      Cálculo mental rápido. Decide en milisegundos si la ecuación dada es <strong>Correcta [1] o Incorrecta [2]</strong>.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/70 border border-purple-500/30">
                    <span className="font-bold text-purple-400 flex items-center gap-1.5 mb-1">
                      <Copy className="w-4 h-4" /> 3. Duplicados o No
                    </span>
                    <p className="text-slate-300">
                      Fila de 7 figuras retina. Identifica si hay algún símbolo <strong>Duplicado [3] o son Únicos [4]</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Configuración de Duración del Examen */}
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Duración del Examen:</span>
            </div>
            <div className="flex items-center gap-2">
              {[
                { label: '5 Minutos (Oficial)', secs: 300 },
                { label: '8 Minutos (Resistencia)', secs: 480 },
                { label: '3 Minutos (Rápido)', secs: 180 }
              ].map(opt => (
                <button
                  key={opt.secs}
                  onClick={() => {
                    setExamDuration(opt.secs);
                    setTimeLeft(opt.secs);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
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

          {/* Selector de Modalidades de Juego */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Modo 1: Triple-Task Oficial AON */}
            <div 
              onClick={() => startSession('triple-exam')}
              className="group p-5 rounded-xl bg-gradient-to-br from-slate-800/90 via-slate-900 to-rose-950/30 border-2 border-rose-500/50 hover:border-rose-400 cursor-pointer transition-all hover:scale-[1.01] shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-500 text-white uppercase tracking-wider">
                  Recomendado NetJets
                </span>
                <Play className="w-5 h-5 text-rose-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-lg font-black text-white mb-2 flex items-center gap-2">
                <span>🏆 Examen Triple-Task Oficial</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Las 3 tareas activas simultáneamente en pantalla dividida: <strong>Flechas en 4 carriles + Cálculo mental + Duplicados</strong> con evaluación ponderada (30% / 40% / 30%).
              </p>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-300">
                <span>Comenzar Examen ({formatTime(examDuration)}) →</span>
              </div>
            </div>

            {/* Modo 2: Aislado - Solo Flechas y Carriles */}
            <div 
              onClick={() => startSession('pure-arrows')}
              className="p-5 rounded-xl bg-slate-900/90 border border-sky-500/40 hover:border-sky-400 cursor-pointer transition-all hover:scale-[1.01] shadow-md group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  Práctica Específica
                </span>
                <Plane className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                🛩️ Solo Flechas & Carriles de Obstáculos
              </h3>
              <p className="text-xs text-slate-400 mb-3">
                Entrena tus reflejos y reflejo de anclaje con las flechas [←][→] esquivando oleadas continuas en los 4 carriles sin distracción de texto.
              </p>
              <span className="text-xs font-bold text-sky-400">Entrenar Carriles →</span>
            </div>

            {/* Modo 3: Aislado - Solo Sumas y Restas */}
            <div 
              onClick={() => startSession('pure-math')}
              className="p-5 rounded-xl bg-slate-900/90 border border-amber-500/40 hover:border-amber-400 cursor-pointer transition-all hover:scale-[1.01] shadow-md group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Práctica Específica
                </span>
                <Calculator className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                ➕ Solo Cálculo Mental (Sumas y Restas)
              </h3>
              <p className="text-xs text-slate-400 mb-3">
                Automatiza la verificación mental de sumas y restas rápidas en formato [CORRECTO / INCORRECTO] a máxima velocidad.
              </p>
              <span className="text-xs font-bold text-amber-400">Entrenar Mates →</span>
            </div>

            {/* Modo 4: Aislado - Solo Duplicados o No */}
            <div 
              onClick={() => startSession('pure-duplicates')}
              className="p-5 rounded-xl bg-slate-900/90 border border-purple-500/40 hover:border-purple-400 cursor-pointer transition-all hover:scale-[1.01] shadow-md group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Práctica Específica
                </span>
                <Copy className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                🔍 Solo Detección de Duplicados
              </h3>
              <p className="text-xs text-slate-400 mb-3">
                Afila tu agudeza visual para escanear filas de 7 símbolos e identificar al instante si hay repeticiones (2X) o son únicos (1X).
              </p>
              <span className="text-xs font-bold text-purple-400">Entrenar Duplicados →</span>
            </div>
          </div>

          {/* Historial de Intentos Previos */}
          {history.length > 0 && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
              <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Tus Mejores Sesiones de Multitarea Registradas</span>
              </h3>
              <div className="space-y-2">
                {history.slice(0, 4).map((h, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/60 text-xs">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded font-black ${
                        h.passed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}>
                        {h.overallScore}%
                      </span>
                      <span className="font-semibold text-slate-200">{h.mode}</span>
                      <span className="text-slate-400 font-mono text-[11px]">{h.date}</span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-300">
                      <span>Colisiones: <strong className={h.collisions === 0 ? 'text-emerald-400' : 'text-rose-400'}>{h.collisions}</strong></span>
                      <span>Mates: <strong>{h.mathAccuracy}%</strong></span>
                      <span>Duplicados: <strong>{h.duplicatesAccuracy}%</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. PANTALLA DE JUEGO EN VIVO: LAYOUT TRIPLE (3-EN-1) */}
      {/* ======================================================== */}
      {gameState === 'playing' && (
        <div className="space-y-4 max-w-7xl mx-auto">
          {/* Grid de 3 Columnas para Triple-Task (o columna centrada si es modo aislado) */}
          <div className={`grid gap-4 items-start ${
            activeMode === 'triple-exam' 
              ? 'grid-cols-1 lg:grid-cols-3' 
              : 'grid-cols-1 max-w-2xl mx-auto'
          }`}>

            {/* ======================================================== */}
            {/* PANEL 1: FLECHAS & OBSTÁCULOS (4 CARRILES) */}
            {/* ======================================================== */}
            {(activeMode === 'triple-exam' || activeMode === 'pure-arrows') && (
              <div className="bg-slate-900/90 border border-sky-500/30 rounded-2xl p-4 shadow-xl flex flex-col items-center">
                <div className="w-full flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Plane className="w-4 h-4 text-sky-400" />
                    <span className="text-xs font-black uppercase text-sky-300 tracking-wider">
                      1. Flechas (Carriles)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-emerald-400">Evadidos: {wavesDodged}/{wavesTotal}</span>
                    <span className="text-rose-400">Impactos: {collisionsCount}</span>
                  </div>
                </div>

                {/* Canvas de los 4 carriles */}
                <div className="relative border-2 border-slate-700 rounded-xl overflow-hidden shadow-inner bg-[#070f1e]">
                  <canvas
                    ref={canvasRef}
                    width={320}
                    height={380}
                    className="w-full h-auto block select-none"
                  />
                </div>

                {/* Controles táctiles de Flechas para iPad / Teclado */}
                <div className="w-full mt-3 grid grid-cols-2 gap-3">
                  <button
                    onClick={moveLeft}
                    className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-sky-600 active:scale-95 text-sky-300 hover:text-white border border-sky-500/40 text-sm font-black transition-all flex items-center justify-center gap-2 shadow-md select-none"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span>IZQUIERDA [← / A]</span>
                  </button>
                  <button
                    onClick={moveRight}
                    className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-sky-600 active:scale-95 text-sky-300 hover:text-white border border-sky-500/40 text-sm font-black transition-all flex items-center justify-center gap-2 shadow-md select-none"
                  >
                    <span>DERECHA [→ / D]</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-[11px] text-slate-400 mt-1">Usa las flechas del teclado o los botones táctiles</span>
              </div>
            )}

            {/* ======================================================== */}
            {/* PANEL 2: SUMAS Y RESTAS (CÁLCULO MENTAL) */}
            {/* ======================================================== */}
            {(activeMode === 'triple-exam' || activeMode === 'pure-math') && (
              <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 shadow-xl flex flex-col justify-between min-h-[460px]">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-black uppercase text-amber-300 tracking-wider">
                        2. Sumas y Restas
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      Respondidas: {mathAnswers.length}
                    </span>
                  </div>

                  {/* Tarjeta de Ecuación Central */}
                  <div className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center justify-center min-h-[170px] ${
                    mathFeedback === 'correct'
                      ? 'bg-emerald-500/20 border-emerald-500 shadow-emerald-500/20 shadow-lg scale-[1.02]'
                      : mathFeedback === 'wrong'
                      ? 'bg-rose-500/20 border-rose-500 shadow-rose-500/20 shadow-lg scale-[0.98]'
                      : 'bg-slate-800/80 border-slate-700 shadow-inner'
                  }`}>
                    {currentMath ? (
                      <div className="text-center">
                        <span className="text-xs font-mono uppercase text-slate-400 tracking-widest block mb-2">
                          ¿Es correcto el resultado?
                        </span>
                        <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white select-none">
                          {currentMath.expression}
                        </div>
                      </div>
                    ) : (
                      <div className="text-slate-400 text-sm">Cargando ecuación...</div>
                    )}
                  </div>

                  {/* Feedback en tiempo real */}
                  <div className="h-6 flex items-center justify-center mt-2">
                    {mathFeedback === 'correct' && (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 animate-bounce">
                        <CheckCircle2 className="w-4 h-4" /> ¡CORRECTO!
                      </span>
                    )}
                    {mathFeedback === 'wrong' && (
                      <span className="text-xs font-bold text-rose-400 flex items-center gap-1 animate-shake">
                        <XCircle className="w-4 h-4" /> ¡INCORRECTO!
                      </span>
                    )}
                  </div>
                </div>

                {/* Botones de Respuesta de Mates */}
                <div className="space-y-2 mt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleMathAnswer(true)}
                      className="py-4 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-black text-sm transition-all shadow-lg flex flex-col items-center justify-center gap-1 border border-emerald-400/40 select-none"
                    >
                      <CheckCircle2 className="w-5 h-5 text-white" />
                      <span>CORRECTO</span>
                      <span className="text-[10px] font-mono text-emerald-200">[ Tecla 1 ]</span>
                    </button>
                    <button
                      onClick={() => handleMathAnswer(false)}
                      className="py-4 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-black text-sm transition-all shadow-lg flex flex-col items-center justify-center gap-1 border border-rose-400/40 select-none"
                    >
                      <XCircle className="w-5 h-5 text-white" />
                      <span>INCORRECTO</span>
                      <span className="text-[10px] font-mono text-rose-200">[ Tecla 2 ]</span>
                    </button>
                  </div>
                  <div className="text-center text-[11px] text-slate-400">
                    Aciertos: {mathAnswers.filter(a => (a.isCorrect && a.userAnsweredCorrect) || (!a.isCorrect && !a.userAnsweredCorrect)).length} ({
                      mathAnswers.length > 0 
                        ? Math.round((mathAnswers.filter(a => (a.isCorrect && a.userAnsweredCorrect) || (!a.isCorrect && !a.userAnsweredCorrect)).length / mathAnswers.length) * 100) 
                        : 0
                    }%)
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* PANEL 3: DUPLICADOS O NO (PATTERNS & SYMBOLS) */}
            {/* ======================================================== */}
            {(activeMode === 'triple-exam' || activeMode === 'pure-duplicates') && (
              <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-4 shadow-xl flex flex-col justify-between min-h-[460px]">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Copy className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-black uppercase text-purple-300 tracking-wider">
                        3. Duplicados o No
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      Respondidas: {duplicateAnswers.length}
                    </span>
                  </div>

                  {/* Fila de 7 figuras retina */}
                  <div className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center min-h-[170px] ${
                    duplicateFeedback === 'correct'
                      ? 'bg-purple-500/20 border-purple-500 shadow-purple-500/20 shadow-lg scale-[1.02]'
                      : duplicateFeedback === 'wrong'
                      ? 'bg-rose-500/20 border-rose-500 shadow-rose-500/20 shadow-lg scale-[0.98]'
                      : 'bg-slate-800/80 border-slate-700 shadow-inner'
                  }`}>
                    <span className="text-xs font-mono uppercase text-slate-400 tracking-widest block mb-3 text-center">
                      ¿Hay algún símbolo repetido en la fila?
                    </span>

                    {currentDuplicate ? (
                      <div className="flex items-center justify-center gap-1.5 sm:gap-2 w-full select-none">
                        {currentDuplicate.items.map((item, idx) => {
                          const isDuplicatedSlot = currentDuplicate.hasDuplicate && 
                            currentDuplicate.duplicateIndices && 
                            (currentDuplicate.duplicateIndices[0] === idx || currentDuplicate.duplicateIndices[1] === idx);

                          return (
                            <div
                              key={item.id}
                              className={`w-9 h-11 sm:w-10 sm:h-12 rounded-lg flex items-center justify-center text-xl sm:text-2xl font-bold transition-all ${
                                duplicateFeedback && isDuplicatedSlot
                                  ? 'ring-2 ring-purple-400 scale-105 shadow-md shadow-purple-500/40'
                                  : 'border border-slate-600/60'
                              }`}
                              style={{ 
                                color: item.color, 
                                backgroundColor: item.bgColor 
                              }}
                              title={item.name}
                            >
                              {item.symbol}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-slate-400 text-sm">Cargando símbolos...</div>
                    )}
                  </div>

                  {/* Feedback en tiempo real */}
                  <div className="h-6 flex items-center justify-center mt-2">
                    {duplicateFeedback === 'correct' && (
                      <span className="text-xs font-bold text-purple-400 flex items-center gap-1 animate-bounce">
                        <CheckCircle2 className="w-4 h-4" /> ¡CORRECTO!
                      </span>
                    )}
                    {duplicateFeedback === 'wrong' && (
                      <span className="text-xs font-bold text-rose-400 flex items-center gap-1 animate-shake">
                        <XCircle className="w-4 h-4" /> ¡INCORRECTO!
                      </span>
                    )}
                  </div>
                </div>

                {/* Botones de Respuesta de Duplicados */}
                <div className="space-y-2 mt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleDuplicateAnswer(true)}
                      className="py-4 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-black text-sm transition-all shadow-lg flex flex-col items-center justify-center gap-1 border border-purple-400/40 select-none"
                    >
                      <Copy className="w-5 h-5 text-white" />
                      <span>DUPLICADO (2X)</span>
                      <span className="text-[10px] font-mono text-purple-200">[ Tecla 3 ]</span>
                    </button>
                    <button
                      onClick={() => handleDuplicateAnswer(false)}
                      className="py-4 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 active:scale-95 text-white font-black text-sm transition-all shadow-lg flex flex-col items-center justify-center gap-1 border border-sky-400/40 select-none"
                    >
                      <CheckCircle2 className="w-5 h-5 text-white" />
                      <span>ÚNICOS (1X)</span>
                      <span className="text-[10px] font-mono text-sky-200">[ Tecla 4 ]</span>
                    </button>
                  </div>
                  <div className="text-center text-[11px] text-slate-400">
                    Aciertos: {duplicateAnswers.filter(a => (a.hasDuplicate && a.userAnsweredDuplicate) || (!a.hasDuplicate && !a.userAnsweredDuplicate)).length} ({
                      duplicateAnswers.length > 0 
                        ? Math.round((duplicateAnswers.filter(a => (a.hasDuplicate && a.userAnsweredDuplicate) || (!a.hasDuplicate && !a.userAnsweredDuplicate)).length / duplicateAnswers.length) * 100) 
                        : 0
                    }%)
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. PANTALLA DE RESULTADOS & BAREMO NETJETS */}
      {/* ======================================================== */}
      {gameState === 'results' && (
        <div className="max-w-3xl mx-auto space-y-6">
          {(() => {
            const lastSession = history[0];
            if (!lastSession) return null;

            return (
              <div className="bg-gradient-to-br from-slate-900 via-aviation-950 to-slate-900 border-2 border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl">
                {/* Cabecera del Veredicto */}
                <div className="text-center pb-6 border-b border-slate-800">
                  <div className="inline-flex items-center justify-center p-3 rounded-2xl mb-3 shadow-lg bg-slate-800 border border-slate-700">
                    {lastSession.passed ? (
                      <Trophy className="w-12 h-12 text-amber-400 animate-bounce" />
                    ) : (
                      <ShieldAlert className="w-12 h-12 text-rose-400 animate-pulse" />
                    )}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    {lastSession.passed ? '¡APTO PARA SELECCIÓN NETJETS EUROPE!' : 'SESIÓN DE ENTRENAMIENTO FINALIZADA'}
                  </h2>
                  <p className="text-sm text-slate-300 mt-1">
                    {lastSession.passed 
                      ? 'Has demostrado una excelente división de atención y velocidad cognitiva bajo alta presión.'
                      : 'El estándar de corte NetJets exige ≥75% de puntuación ponderada y un máximo de 3 colisiones en carriles.'}
                  </p>

                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-base font-black border"
                    style={{
                      backgroundColor: lastSession.passed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)',
                      borderColor: lastSession.passed ? '#10b981' : '#f43f5e',
                      color: lastSession.passed ? '#34d399' : '#fb7185'
                    }}
                  >
                    <span>Puntuación Global Ponderada: {lastSession.overallScore}%</span>
                  </div>
                </div>

                {/* Desglose de las 3 tareas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                  {/* Tarea 1: Flechas / Obstáculos */}
                  <div className="p-4 rounded-xl bg-slate-800/70 border border-sky-500/30">
                    <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase mb-2">
                      <Plane className="w-4 h-4" /> 1. Flechas (Carriles)
                    </div>
                    <div className="text-2xl font-black text-white mb-1">
                      {lastSession.flightScorePercent}%
                    </div>
                    <div className="space-y-1 text-xs text-slate-300">
                      <div>Evadidos: <strong>{lastSession.wavesDodged}/{lastSession.totalWaves}</strong></div>
                      <div>Colisiones: <strong className={lastSession.collisions === 0 ? 'text-emerald-400' : 'text-rose-400'}>{lastSession.collisions}</strong></div>
                    </div>
                  </div>

                  {/* Tarea 2: Sumas y Restas */}
                  <div className="p-4 rounded-xl bg-slate-800/70 border border-amber-500/30">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase mb-2">
                      <Calculator className="w-4 h-4" /> 2. Sumas y Restas
                    </div>
                    <div className="text-2xl font-black text-white mb-1">
                      {lastSession.mathAccuracy}%
                    </div>
                    <div className="space-y-1 text-xs text-slate-300">
                      <div>Respondidas: <strong>{lastSession.totalMathAnswered}</strong> ({lastSession.mathCorrect} aciertos)</div>
                      <div>Tiempo medio: <strong>{lastSession.avgMathResponseTimeSec}s</strong></div>
                    </div>
                  </div>

                  {/* Tarea 3: Duplicados */}
                  <div className="p-4 rounded-xl bg-slate-800/70 border border-purple-500/30">
                    <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase mb-2">
                      <Copy className="w-4 h-4" /> 3. Duplicados o No
                    </div>
                    <div className="text-2xl font-black text-white mb-1">
                      {lastSession.duplicatesAccuracy}%
                    </div>
                    <div className="space-y-1 text-xs text-slate-300">
                      <div>Respondidas: <strong>{lastSession.totalDuplicatesAnswered}</strong> ({lastSession.duplicatesCorrect} aciertos)</div>
                      <div>Tiempo medio: <strong>{lastSession.avgDuplicateResponseTimeSec}s</strong></div>
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
                    <span>Repetir Sesión</span>
                  </button>
                  <button
                    onClick={() => setGameState('intro')}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm transition-all border border-slate-700 flex items-center justify-center gap-2"
                  >
                    <span>Cambiar de Modo</span>
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
