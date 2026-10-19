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
  ChevronRight
} from 'lucide-react';
import { MathQuestion, generateMathQuestion } from './AonMathEngine';

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

interface MultitaskingSessionSummary {
  date: string;
  mode: 'dual-exam' | 'pure-math';
  durationSeconds: number;
  totalMathAnswered: number;
  mathCorrect: number;
  mathAccuracy: number;
  avgMathResponseTimeSec: number;
  flightScorePercent: number; // 0..100%
  collisions: number;
  passed: boolean;
}

interface Obstacle {
  id: number;
  y: number; // vertical position in canvas pixels
  gapX: number; // center of open gap (0..canvasWidth)
  gapWidth: number; // width of open gap
  passed: boolean;
}

export const AonMultitaskingScreen: React.FC<AonMultitaskingScreenProps> = ({ onBackToDashboard }) => {
  // Game states: 'intro' | 'playing' | 'results'
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'results'>('intro');
  // Submodes: 'dual-exam' (Vuelo + Mates 8 mins) | 'pure-math' (Solo Cálculo Mental)
  const [activeMode, setActiveMode] = useState<'dual-exam' | 'pure-math'>('dual-exam');

  // Exam Duration: 8 minutes (480s)
  const EXAM_DURATION_SECONDS = 8 * 60; // 480s
  const [timeLeft, setTimeLeft] = useState<number>(EXAM_DURATION_SECONDS);

  // Audio mute
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Math Task State
  const [currentMath, setCurrentMath] = useState<MathQuestion | null>(null);
  const [mathAnswers, setMathAnswers] = useState<MathAnswerRecord[]>([]);
  const [mathStartTime, setMathStartTime] = useState<number>(Date.now());
  const [mathFeedback, setMathFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Flight Task State
  const [planeX, setPlaneX] = useState<number>(150); // Canvas X position
  const [planeVelocity, setPlaneVelocity] = useState<number>(0);
  const [collisionsCount, setCollisionsCount] = useState<number>(0);
  const [cleanFrames, setCleanFrames] = useState<number>(0);
  const [totalFrames, setTotalFrames] = useState<number>(0);

  // Canvas ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const planePosRef = useRef<number>(150);
  const keyStateRef = useRef<{ left: boolean; right: boolean }>({ left: false, right: false });
  const timerRef = useRef<any>(null);

  // Historical data
  const [history, setHistory] = useState<MultitaskingSessionSummary[]>(() => {
    try {
      const saved = localStorage.getItem('plegueviation_aon_multitask_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sound Synthesizer via Web Audio API
  const playBeep = useCallback((type: 'correct' | 'wrong' | 'hit') => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'correct') {
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'wrong') {
        osc.frequency.setValueAtTime(260, ctx.currentTime);
        osc.frequency.setValueAtTime(220, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'hit') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch {}
  }, [isMuted]);

  // Cargar siguiente pregunta matemática
  const loadNextMath = useCallback(() => {
    // Progresión de dificultad: nivel 1 en primer minuto, nivel 2 estándar, nivel 3 avanzado
    const mathLevel = activeMode === 'pure-math' ? 2 : 2;
    const q = generateMathQuestion(mathLevel);
    setCurrentMath(q);
    setMathStartTime(Date.now());
    setMathFeedback(null);
  }, [activeMode]);

  // Iniciar partida
  const handleStartGame = (selectedMode: 'dual-exam' | 'pure-math') => {
    setActiveMode(selectedMode);
    setTimeLeft(EXAM_DURATION_SECONDS);
    setMathAnswers([]);
    setCollisionsCount(0);
    setCleanFrames(0);
    setTotalFrames(0);
    obstaclesRef.current = [];
    planePosRef.current = 150;
    setPlaneX(150);
    setGameState('playing');
    loadNextMath();
  };

  // Finalizar sesión
  const handleFinishSession = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);

    setGameState('results');

    setMathAnswers((prevMath) => {
      const totalMath = prevMath.length;
      const correctMath = prevMath.filter((m) => m.isCorrect).length;
      const mathAcc = totalMath > 0 ? Math.round((correctMath / totalMath) * 100) : 0;
      const totalTimeMs = prevMath.reduce((acc, m) => acc + m.timeSpentMs, 0);
      const avgTimeSec = totalMath > 0 ? Math.round((totalTimeMs / totalMath / 1000) * 10) / 10 : 0;

      // Cálculo de score de vuelo
      const flightAcc = activeMode === 'pure-math'
        ? 100
        : totalFrames > 0 
        ? Math.max(0, Math.round((cleanFrames / totalFrames) * 100))
        : 100;

      // Meta NetJets: En Multitasking Dual se exige >= 75% precisión matemática y >= 80% vuelo
      const passed = activeMode === 'pure-math'
        ? mathAcc >= 85 && totalMath >= 30
        : mathAcc >= 75 && flightAcc >= 80 && totalMath >= 25;

      const summary: MultitaskingSessionSummary = {
        date: new Date().toISOString(),
        mode: activeMode,
        durationSeconds: EXAM_DURATION_SECONDS - timeLeft,
        totalMathAnswered: totalMath,
        mathCorrect: correctMath,
        mathAccuracy: mathAcc,
        avgMathResponseTimeSec: avgTimeSec,
        flightScorePercent: flightAcc,
        collisions: collisionsCount,
        passed,
      };

      setHistory((prevHist) => {
        const updated = [summary, ...prevHist].slice(0, 30);
        try {
          localStorage.setItem('plegueviation_aon_multitask_history', JSON.stringify(updated));
        } catch {}
        return updated;
      });

      return prevMath;
    });
  }, [activeMode, cleanFrames, totalFrames, collisionsCount, timeLeft]);

  // Manejo de respuesta matemática del usuario: [ CORRECTO ] o [ INCORRECTO ]
  const handleAnswerMath = (userSaysCorrect: boolean) => {
    if (!currentMath) return;

    const timeSpent = Date.now() - mathStartTime;
    const isActuallyCorrect = userSaysCorrect === currentMath.isMathematicallyCorrect;

    const record: MathAnswerRecord = {
      questionId: currentMath.id,
      expression: currentMath.expression,
      isCorrect: isActuallyCorrect,
      userAnsweredCorrect: userSaysCorrect,
      timeSpentMs: timeSpent,
    };

    setMathAnswers((prev) => [...prev, record]);
    setMathFeedback(isActuallyCorrect ? 'correct' : 'wrong');
    playBeep(isActuallyCorrect ? 'correct' : 'wrong');

    // Breve pausa para micro-feedback de 180ms y pasar a la siguiente
    setTimeout(() => {
      loadNextMath();
    }, 180);
  };

  // Temporizador de 8 minutos
  useEffect(() => {
    if (gameState !== 'playing') return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleFinishSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, handleFinishSession]);

  // Teclado físico:
  // Flechas Izquierda / Derecha o A / D para mover el avión
  // Teclas '1' o 'C' = CORRECTO, '2' o 'I' = INCORRECTO
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keyStateRef.current.left = true;
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keyStateRef.current.right = true;
      } else if (e.key === '1' || e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        handleAnswerMath(true);
      } else if (e.key === '2' || e.key === 'i' || e.key === 'I') {
        e.preventDefault();
        handleAnswerMath(false);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keyStateRef.current.left = false;
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keyStateRef.current.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState, handleAnswerMath]);

  // Loop de animación del Canvas para el canal de vuelo y obstáculos
  useEffect(() => {
    if (gameState !== 'playing' || activeMode === 'pure-math') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const CANVAS_WIDTH = canvas.width;
    const CANVAS_HEIGHT = canvas.height;
    const PLANE_Y = CANVAS_HEIGHT - 65;
    const PLANE_WIDTH = 26;
    const SPEED = 2.6; // Velocidad de avance de obstáculos

    let lastObstacleSpawn = Date.now();
    let localCollisions = 0;

    const render = () => {
      // 1. Actualizar posición del avión
      const speed = 4.2;
      if (keyStateRef.current.left) {
        planePosRef.current = Math.max(20, planePosRef.current - speed);
      }
      if (keyStateRef.current.right) {
        planePosRef.current = Math.min(CANVAS_WIDTH - 20, planePosRef.current + speed);
      }
      setPlaneX(planePosRef.current);

      // 2. Generar obstáculos periódicamente
      const now = Date.now();
      if (now - lastObstacleSpawn > 1400) {
        lastObstacleSpawn = now;
        const gapWidth = 85; // Ancho del hueco para pasar
        const minGapX = gapWidth / 2 + 25;
        const maxGapX = CANVAS_WIDTH - gapWidth / 2 - 25;
        const gapX = minGapX + Math.random() * (maxGapX - minGapX);

        obstaclesRef.current.push({
          id: now,
          y: -20,
          gapX,
          gapWidth,
          passed: false,
        });
      }

      // 3. Mover y limpiar obstáculos
      for (const obs of obstaclesRef.current) {
        obs.y += SPEED;
      }
      obstaclesRef.current = obstaclesRef.current.filter((o) => o.y < CANVAS_HEIGHT + 40);

      // 4. Detección de colisiones
      let isCurrentlyColliding = false;
      for (const obs of obstaclesRef.current) {
        // Altura del obstáculo
        if (obs.y > PLANE_Y - 14 && obs.y < PLANE_Y + 14) {
          const leftBound = obs.gapX - obs.gapWidth / 2;
          const rightBound = obs.gapX + obs.gapWidth / 2;
          const planeLeft = planePosRef.current - PLANE_WIDTH / 2;
          const planeRight = planePosRef.current + PLANE_WIDTH / 2;

          // Si el avión no está completamente dentro del gap, hay colisión
          if (planeLeft < leftBound || planeRight > rightBound) {
            isCurrentlyColliding = true;
            if (!obs.passed) {
              obs.passed = true;
              localCollisions++;
              setCollisionsCount((prev) => prev + 1);
              playBeep('hit');
            }
          }
        }
      }

      setTotalFrames((prev) => prev + 1);
      if (!isCurrentlyColliding) {
        setCleanFrames((prev) => prev + 1);
      }

      // 5. Dibujar en el Canvas
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Fondo del canal de vuelo
      const bgGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
      bgGrad.addColorStop(0, '#040d1a');
      bgGrad.addColorStop(1, '#07162c');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Líneas de guía laterales (corredor)
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.25)';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.moveTo(15, 0);
      ctx.lineTo(15, CANVAS_HEIGHT);
      ctx.moveTo(CANVAS_WIDTH - 15, 0);
      ctx.lineTo(CANVAS_WIDTH - 15, CANVAS_HEIGHT);
      ctx.stroke();
      ctx.setLineDash([]);

      // Dibujar Obstáculos (barreras con puerta abierta)
      for (const obs of obstaclesRef.current) {
        const leftWidth = obs.gapX - obs.gapWidth / 2;
        const rightStart = obs.gapX + obs.gapWidth / 2;
        const rightWidth = CANVAS_WIDTH - rightStart;

        // Barrera izquierda
        ctx.fillStyle = '#f43f5e';
        ctx.fillRect(0, obs.y, leftWidth, 12);
        // Luz de baliza en borde izquierdo
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(leftWidth, obs.y + 6, 4, 0, Math.PI * 2);
        ctx.fill();

        // Barrera derecha
        ctx.fillStyle = '#f43f5e';
        ctx.fillRect(rightStart, obs.y, rightWidth, 12);
        // Luz de baliza en borde derecho
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(rightStart, obs.y + 6, 4, 0, Math.PI * 2);
        ctx.fill();

        // Indicador de senda verde transparente
        ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
        ctx.fillRect(leftWidth, obs.y - 10, obs.gapWidth, 32);
      }

      // Dibujar Avión (Aeronave triangular elegante)
      const currentX = planePosRef.current;
      ctx.save();
      ctx.translate(currentX, PLANE_Y);

      if (isCurrentlyColliding) {
        ctx.shadowColor = '#f43f5e';
        ctx.shadowBlur = 15;
      } else {
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 12;
      }

      // Fuselaje del avión
      ctx.fillStyle = isCurrentlyColliding ? '#f43f5e' : '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(0, -16); // Morro
      ctx.lineTo(14, 12); // Ala derecha
      ctx.lineTo(4, 8);   // Hendidura derecha
      ctx.lineTo(0, 14);  // Cola
      ctx.lineTo(-4, 8);  // Hendidura izquierda
      ctx.lineTo(-14, 12);// Ala izquierda
      ctx.closePath();
      ctx.fill();

      // Cabina
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(0, -4, 2.5, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [gameState, activeMode, playBeep]);

  // Formato mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // 1. PANTALLA INTRODUCCIÓN
  if (gameState === 'intro') {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in p-4 sm:p-6">
        <div className="flex items-center justify-between pb-4 border-b border-sky-500/20">
          <button
            onClick={onBackToDashboard}
            className="flex items-center gap-2 font-bold text-sky-400 hover:text-sky-300 text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Dashboard</span>
          </button>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
            AON / cut-e • NetJets Assessment Stage 1
          </span>
        </div>

        {/* Hero Card */}
        <div className="bg-gradient-to-br from-[#0c1c3d] via-[#09152b] to-[#060e1d] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-glow-emerald">
              <Zap className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                AON Multitasking & Mental Math
              </h1>
              <p className="text-xs sm:text-sm text-emerald-300 font-semibold">
                Simulador de Capacidad Multitarea Dual: Vuelo por Canal + Sumas y Restas Mentales
              </p>
            </div>
          </div>

          {/* Explicación de las dos tareas simultáneas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-black/40 border border-sky-500/20 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
                <Plane className="w-4 h-4" />
                <span>Tarea 1: Navegación de Vuelo (Canal)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Guía la aeronave a través de las puertas abiertas del canal vertical utilizando las flechas 
                <span className="font-mono text-sky-300 font-bold"> [←] [→]</span> (o teclas <span className="font-mono text-sky-300 font-bold">[A] [D]</span> o toques táctiles). Debes evitar rozar las barreras rojas.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <Calculator className="w-4 h-4" />
                <span>Tarea 2: Cálculo Mental Simultáneo</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                En la parte superior aparecerán operaciones rápidas de sumas y restas (ej: <span className="font-mono text-emerald-300 font-bold">14 - 6 + 5 = 13</span>). 
                Evalúa si la ecuación es <strong>CORRECTA</strong> o <strong>INCORRECTA</strong> sin dejar de pilotar.
              </p>
            </div>
          </div>

          {/* Botones de Inicio */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => handleStartGame('dual-exam')}
                className="w-full sm:w-auto flex-1 py-4 px-6 rounded-2xl font-black text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-glow-emerald transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>INICIAR SIMULACRO MULTITASKING (8 MINUTOS OFICIAL)</span>
              </button>

              <button
                onClick={() => handleStartGame('pure-math')}
                className="w-full sm:w-auto py-4 px-6 rounded-2xl font-bold text-xs bg-slate-800 hover:bg-slate-700 border border-slate-600 text-emerald-300 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Entrenamiento Puro de Cálculo Mental AON (Solo Operaciones)</span>
              </button>
            </div>
            <p className="text-[11px] text-center text-slate-400">
              💡 <em>Consejo de preparación NetJets:</em> Si te cuesta compaginar ambas tareas, entrena primero en el modo de «Solo Cálculo Mental» para automatizar las sumas/restas a 2-3 segundos por operación antes de pasar al simulacro completo de 8 minutos.
            </p>
          </div>
        </div>

        {/* Historial */}
        {history.length > 0 && (
          <div className="bg-[#09152b] border border-sky-500/20 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
                <BarChart3 className="w-4 h-4" />
                <span>Historial de Simulacros Multitasking</span>
              </div>
              <span className="text-[11px] text-slate-400">{history.length} sesiones registradas</span>
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
                      Mates: {item.mathAccuracy}% ({item.mathCorrect}/{item.totalMathAnswered})
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {item.mode === 'dual-exam' ? `Vuelo: ${item.flightScorePercent}% (${item.collisions} colisiones)` : 'Modo Solo Mates'}
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {item.avgMathResponseTimeSec}s/op
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
    const totalMath = mathAnswers.length;
    const correctMath = mathAnswers.filter((m) => m.isCorrect).length;
    const mathAcc = totalMath > 0 ? Math.round((correctMath / totalMath) * 100) : 0;
    const totalTimeMs = mathAnswers.reduce((acc, m) => acc + m.timeSpentMs, 0);
    const avgTimeSec = totalMath > 0 ? Math.round((totalTimeMs / totalMath / 1000) * 10) / 10 : 0;
    const flightAcc = activeMode === 'pure-math' ? 100 : totalFrames > 0 ? Math.max(0, Math.round((cleanFrames / totalFrames) * 100)) : 100;
    const passed = activeMode === 'pure-math' ? mathAcc >= 85 && totalMath >= 30 : mathAcc >= 75 && flightAcc >= 80 && totalMath >= 25;

    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in p-4 sm:p-6 text-center">
        <div className="bg-gradient-to-br from-[#0c1c3d] via-[#09152b] to-[#060e1d] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl shadow-lg border-2 bg-emerald-500/20 border-emerald-400 text-emerald-400 shadow-glow-emerald">
            {passed ? <Trophy className="w-10 h-10 text-emerald-400" /> : <Award className="w-10 h-10 text-amber-400" />}
          </div>

          <div>
            <span className={`inline-block text-xs font-black uppercase px-3 py-1 rounded-full mb-2 ${
              passed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
            }`}>
              {passed ? 'AON MULTITASKING: PASS PERFORMANCE GOAL' : 'AON MULTITASKING: REPASO REQUERIDO'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {passed ? '¡Objetivo Psicotécnico Alcanzado!' : 'Entrenamiento Finalizado'}
            </h2>
            <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
              {passed 
                ? 'Has coordinado exitosamente la carga motriz de vuelo con la resolución aritmética bajo el estándar NetJets.'
                : 'Se requiere mantener un mínimo de 75% en precisión aritmética y 80% en trayectoria de vuelo en el test de 8 minutos.'}
            </p>
          </div>

          {/* Cuadrícula de métricas */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-black/40 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Operaciones</span>
              <span className="text-2xl font-black text-white font-mono">{totalMath}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/40 border border-emerald-500/20">
              <span className="text-[10px] font-bold text-emerald-400 uppercase block">Aciertos Mates</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">{correctMath} ({mathAcc}%)</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/40 border border-sky-500/20">
              <span className="text-[10px] font-bold text-sky-400 uppercase block">Precisión Vuelo</span>
              <span className="text-2xl font-black text-sky-400 font-mono">{flightAcc}%</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/40 border border-rose-500/20">
              <span className="text-[10px] font-bold text-rose-400 uppercase block">Colisiones</span>
              <span className="text-2xl font-black text-rose-400 font-mono">{collisionsCount}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-around font-mono">
            <span>⏱️ Velocidad media cálculo: <strong>{avgTimeSec}s</strong></span>
            <span>✈️ Modo: <strong>{activeMode === 'dual-exam' ? 'Dual (Vuelo + Mates)' : 'Puro Mates'}</strong></span>
          </div>

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => handleStartGame(activeMode)}
              className="w-full sm:w-auto flex-1 py-3.5 px-5 rounded-xl font-black text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>REPETIR ENTRENAMIENTO</span>
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
  return (
    <div className="max-w-4xl mx-auto space-y-4 animate-fade-in p-3 sm:p-5 select-none">
      {/* Barra superior */}
      <div className="flex items-center justify-between bg-[#09152b] border border-sky-500/20 px-4 py-2.5 rounded-2xl shadow-md">
        <button
          onClick={() => {
            if (confirm('¿Deseas salir del simulador de multitasking?')) {
              if (timerRef.current) clearInterval(timerRef.current);
              setGameState('intro');
            }
          }}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Salir</span>
        </button>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
            Mates: {mathAnswers.filter((m) => m.isCorrect).length}/{mathAnswers.length}
          </span>
          {activeMode === 'dual-exam' && (
            <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30">
              Colisiones: {collisionsCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMuted((prev) => !prev)}
            className="text-slate-400 hover:text-white transition-colors"
            title={isMuted ? 'Activar Sonido' : 'Silenciar'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          <div className={`flex items-center gap-1.5 font-mono text-sm font-black px-3 py-1 rounded-xl border ${
            timeLeft < 60 
              ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse'
              : 'bg-black/40 border-emerald-500/30 text-emerald-400'
          }`}>
            <Timer className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* ÁREA DE JUEGO PRINCIPAL: LAYOUT DUAL (Vuelo a la izquierda, Mates arriba/derecha) */}
      <div className={`grid gap-4 ${activeMode === 'dual-exam' ? 'grid-cols-1 md:grid-cols-12' : 'grid-cols-1 max-w-xl mx-auto'}`}>
        
        {/* PANEL DE VUELO CON CANVAS (Solo en Dual-Exam) */}
        {activeMode === 'dual-exam' && (
          <div className="md:col-span-7 bg-[#050e1c] border border-sky-500/30 rounded-3xl p-4 flex flex-col items-center justify-between shadow-2xl relative overflow-hidden">
            <div className="w-full flex items-center justify-between pb-2 text-[11px] font-bold text-slate-400 border-b border-slate-800">
              <span className="flex items-center gap-1.5 text-sky-300">
                <Plane className="w-3.5 h-3.5" />
                <span>Canal de Obstáculos</span>
              </span>
              <span className="text-slate-400 font-mono">Teclas [←] [→] o botones inferiores</span>
            </div>

            {/* Canvas de vuelo vertical */}
            <div className="py-2 flex justify-center w-full">
              <canvas
                ref={canvasRef}
                width={300}
                height={380}
                className="rounded-2xl border-2 border-sky-500/40 shadow-inner bg-black"
              />
            </div>

            {/* Controles táctiles en pantalla para iPad / Móvil */}
            <div className="w-full flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onMouseDown={() => { keyStateRef.current.left = true; }}
                onMouseUp={() => { keyStateRef.current.left = false; }}
                onTouchStart={() => { keyStateRef.current.left = true; }}
                onTouchEnd={() => { keyStateRef.current.left = false; }}
                className="flex-1 py-3.5 rounded-2xl bg-sky-950/60 hover:bg-sky-900/80 active:bg-sky-600 border border-sky-500/40 text-white font-black text-sm flex items-center justify-center gap-1 shadow-lg transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>IZQUIERDA [←]</span>
              </button>

              <button
                type="button"
                onMouseDown={() => { keyStateRef.current.right = true; }}
                onMouseUp={() => { keyStateRef.current.right = false; }}
                onTouchStart={() => { keyStateRef.current.right = true; }}
                onTouchEnd={() => { keyStateRef.current.right = false; }}
                className="flex-1 py-3.5 rounded-2xl bg-sky-950/60 hover:bg-sky-900/80 active:bg-sky-600 border border-sky-500/40 text-white font-black text-sm flex items-center justify-center gap-1 shadow-lg transition-all"
              >
                <span>DERECHA [→]</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* PANEL DE CÁLCULO MENTAL */}
        <div className={`${activeMode === 'dual-exam' ? 'md:col-span-5' : 'col-span-1'} bg-gradient-to-br from-[#0c1c3d] via-[#09152b] to-[#071120] border border-emerald-500/40 rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-2xl space-y-6`}>
          
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
            <span className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-emerald-400">
              <Calculator className="w-4 h-4" />
              <span>Cálculo Mental Rápido</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              Reactivo #{mathAnswers.length + 1}
            </span>
          </div>

          {/* Operación destacada */}
          {currentMath ? (
            <div className={`p-6 sm:p-8 rounded-3xl bg-black/60 border-2 text-center transition-all ${
              mathFeedback === 'correct'
                ? 'border-emerald-400 shadow-glow-emerald bg-emerald-950/20'
                : mathFeedback === 'wrong'
                ? 'border-rose-400 shadow-glow-rose bg-rose-950/20'
                : 'border-emerald-500/40 shadow-inner'
            }`}>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                ¿Es correcta esta ecuación?
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-wider text-white">
                {currentMath.expression}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500">Cargando operación...</div>
          )}

          {/* Botones de decisión: [ CORRECTO ] o [ INCORRECTO ] */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleAnswerMath(true)}
                className="py-4 px-3 rounded-2xl bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 active:scale-95 text-slate-950 font-black text-sm sm:text-base flex flex-col items-center justify-center gap-1 shadow-glow-emerald border border-emerald-300 transition-all"
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>CORRECTO</span>
                </div>
                <span className="text-[10px] opacity-80 font-mono font-bold">[Tecla 1 o C]</span>
              </button>

              <button
                type="button"
                onClick={() => handleAnswerMath(false)}
                className="py-4 px-3 rounded-2xl bg-gradient-to-b from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 active:scale-95 text-white font-black text-sm sm:text-base flex flex-col items-center justify-center gap-1 shadow-glow-rose border border-rose-300 transition-all"
              >
                <div className="flex items-center gap-1.5">
                  <XCircle className="w-5 h-5" />
                  <span>INCORRECTO</span>
                </div>
                <span className="text-[10px] opacity-80 font-mono font-bold">[Tecla 2 o I]</span>
              </button>
            </div>

            <p className="text-[11px] text-center text-slate-400">
              💡 Puedes usar también el teclado: pulsa <span className="font-mono text-emerald-300 font-bold">1</span> para Correcto o <span className="font-mono text-rose-300 font-bold">2</span> para Incorrecto.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
