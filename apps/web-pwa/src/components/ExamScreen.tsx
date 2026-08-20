import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Bookmark, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  FileText,
  AlertTriangle,
  Award,
  Pin,
  TrendingUp,
  HelpCircle,
  Keyboard,
  RotateCcw,
  Zap
} from 'lucide-react';
import { Question, ExamSession, ExamSessionAnswer, Option, QuestionStats } from '../types';
import { recordAnswerStat, toggleQuestionFlag, getQuestionStat } from '../services/db';
import { SpeedSummaryTable } from './SpeedSummaryTable';
import { PlanningMinimaTable } from './PlanningMinimaTable';
import { FormattedText } from './FormattedText';

interface ExamScreenProps {
  session: ExamSession;
  onUpdateSession: (updated: ExamSession) => void;
  onFinishExam: () => void;
  onExitExam: () => void;
}

export const ExamScreen: React.FC<ExamScreenProps> = ({
  session,
  onUpdateSession,
  onFinishExam,
  onExitExam
}) => {
  const [currentIndex, setCurrentIndex] = useState(session.currentIndex || 0);
  const [activeTab, setActiveTab] = useState<'question' | 'explanation' | 'stats'>('question');
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(
    session.config.timeLimitMinutes ? session.config.timeLimitMinutes * 60 : null
  );
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [currentStat, setCurrentStat] = useState<QuestionStats | null>(null);
  
  // Auto-advance toggle (activo por defecto y persistente en localStorage)
  const [autoAdvance, setAutoAdvance] = useState<boolean>(() => {
    const saved = localStorage.getItem('plegue_auto_advance');
    return saved !== null ? saved === 'true' : true;
  });
  const autoAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentQuestion: Question | undefined = session.questions[currentIndex];
  const currentAnswer: ExamSessionAnswer | undefined = currentQuestion 
    ? session.answers[currentQuestion.id] 
    : undefined;

  const isPracticeMode = session.config.mode === 'practice' || session.config.mode === 'smart_review';
  const isAnswered = currentAnswer && currentAnswer.selectedOptionId !== null;

  const navigateTo = (newIndex: number) => {
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
    }
    setCurrentIndex(newIndex);
  };

  const handleToggleAutoAdvance = () => {
    const nextVal = !autoAdvance;
    setAutoAdvance(nextVal);
    localStorage.setItem('plegue_auto_advance', String(nextVal));
  };

  // Limpieza de timer al desmontar
  useEffect(() => {
    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
    };
  }, []);

  // Cargar estadísticas históricas de la pregunta actual
  useEffect(() => {
    if (currentQuestion) {
      getQuestionStat(currentQuestion.id).then(setCurrentStat);
    }
  }, [currentQuestion]);

  // Cronómetro
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
      if (session.config.mode === 'simulation' && secondsRemaining !== null) {
        setSecondsRemaining((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(interval);
            onFinishExam();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsRemaining, session.config.mode]);

  // Reset tab al cambiar de pregunta
  useEffect(() => {
    setActiveTab('question');
    setQuestionStartTime(Date.now());
  }, [currentIndex]);

  // Atajos de teclado (Keyboard shortcuts estilo AviationExam)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignorar si se escribe en un input o textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) navigateTo(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        if (currentIndex < session.questions.length - 1) navigateTo(currentIndex + 1);
      } else if (['1', '2', '3', '4', 'a', 'b', 'c', 'd', 'A', 'B', 'C', 'D'].includes(e.key)) {
        if (!currentQuestion) return;
        const keyMap: Record<string, number> = {
          '1': 0, 'a': 0, 'A': 0,
          '2': 1, 'b': 1, 'B': 1,
          '3': 2, 'c': 2, 'C': 2,
          '4': 3, 'd': 3, 'D': 3
        };
        const optIndex = keyMap[e.key];
        if (currentQuestion.options[optIndex]) {
          handleSelectOption(currentQuestion.options[optIndex]);
        }
      } else if (e.key === 'f' || e.key === 'F') {
        handleToggleFlag();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQuestion, isAnswered, session, autoAdvance]);

  if (!currentQuestion) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400">No hay preguntas disponibles en esta sesión.</p>
        <button onClick={onExitExam} className="mt-4 px-4 py-2 bg-sky-600 rounded-lg text-white">Volver al Dashboard</button>
      </div>
    );
  }

  const handleSelectOption = async (option: Option) => {
    if (isAnswered && isPracticeMode) return;

    const timeSpent = Math.max(1, Math.round((Date.now() - questionStartTime) / 1000));
    const correctOpt = currentQuestion.options.find((o) => o.is_correct);
    const isCorrect = correctOpt?.id === option.id;

    const newAnswer: ExamSessionAnswer = {
      questionId: currentQuestion.id,
      selectedOptionId: option.id,
      isCorrect: isPracticeMode ? isCorrect : null,
      timeSpentSeconds: (currentAnswer?.timeSpentSeconds || 0) + timeSpent,
      isFlagged: currentAnswer?.isFlagged || false
    };

    const updatedAnswers = {
      ...session.answers,
      [currentQuestion.id]: newAnswer
    };

    const updatedSession: ExamSession = {
      ...session,
      currentIndex,
      answers: updatedAnswers
    };

    onUpdateSession(updatedSession);

    // En modo práctica, registrar estadísticas
    if (isPracticeMode) {
      const updatedStat = await recordAnswerStat(
        currentQuestion.id,
        option.id,
        isCorrect,
        timeSpent,
        session.config.mode
      );
      setCurrentStat(updatedStat);
    }

    // Auto-advance automático a la siguiente pregunta:
    // Solo avanza si se acierta la pregunta o en modo simulación (sin feedback inmediato).
    // Si se falla en modo práctica/smart_review, NO avanza para permitir revisar el error y la explicación.
    const shouldAutoAdvance = autoAdvance && currentIndex < session.questions.length - 1 && (!isPracticeMode || isCorrect);

    if (shouldAutoAdvance) {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
      const delayMs = isPracticeMode ? 600 : 250;
      autoAdvanceTimerRef.current = setTimeout(() => {
        setCurrentIndex((prev) => {
          if (prev < session.questions.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, delayMs);
    }
  };

  const handleToggleFlag = async () => {
    const isFlagged = !currentAnswer?.isFlagged;
    const updatedAnswers = {
      ...session.answers,
      [currentQuestion.id]: {
        ...(currentAnswer || {
          questionId: currentQuestion.id,
          selectedOptionId: null,
          isCorrect: null,
          timeSpentSeconds: 0,
        }),
        isFlagged
      }
    };

    onUpdateSession({
      ...session,
      answers: updatedAnswers
    });

    await toggleQuestionFlag(currentQuestion.id);
  };

  const formatTimer = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    if (h > 0) {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.values(session.answers).filter((a) => a.selectedOptionId !== null).length;

  return (
    <div className="max-w-7xl mx-auto space-y-4 pb-20 animate-fade-in font-sans">
      
      {/* 1. Sub-Header estilo AviationExam: < Study Test / Modo / Auto-Advance Toggle */}
      <div className="flex flex-wrap items-center justify-between py-1 border-b border-sky-500/20 text-xs gap-2">
        <button
          onClick={onExitExam}
          className="flex items-center gap-1.5 font-bold text-sky-400 hover:text-sky-300 text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Study Test</span>
        </button>

        <div className="flex items-center gap-3 sm:gap-4 text-xs">
          {/* Botón Auto-Avanzar */}
          <button
            onClick={handleToggleAutoAdvance}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono font-bold transition-all ${
              autoAdvance
                ? 'bg-sky-500/20 border-sky-400/60 text-sky-300 shadow-sm'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title="Avanzar automáticamente solo al acertar (se detiene en caso de fallo para permitir estudiar la explicación)"
          >
            <Zap className={`w-3.5 h-3.5 ${autoAdvance ? 'text-sky-400 fill-sky-400' : 'text-slate-500'}`} />
            <span>Auto-avance: <strong className={autoAdvance ? 'text-sky-300' : 'text-slate-400'}>{autoAdvance ? 'ON' : 'OFF'}</strong></span>
          </button>

          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="font-mono text-slate-300 font-semibold uppercase tracking-wider hidden sm:inline">
            {session.config.mode === 'simulation' ? 'Simulacro Examen Oficial' : session.config.mode === 'smart_review' ? 'Repaso de Falladas' : 'Modo Práctica'}
          </span>
          <span className="text-slate-600">|</span>
          <span className="font-mono text-slate-400 font-bold">
            Respondidas: <strong className="text-emerald-400">{answeredCount}</strong> / {session.questions.length}
          </span>
        </div>
      </div>

      {/* 2. Main Grid: Question View (Left 8-9 cols) + Right 5-Column Question Matrix (Right 3-4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Question Area */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Question Header Bar */}
          <div className="bg-[#0e1933] border border-sky-500/20 rounded-2xl p-4 shadow-lg flex flex-wrap items-center justify-between gap-3">
            
            {/* Question Counter & Pin/Flag */}
            <div className="flex items-center gap-3">
              <span className="text-base font-extrabold text-white">
                Q {currentIndex + 1} <span className="text-slate-400 font-normal text-sm">/ {session.questions.length}</span>
              </span>

              <button
                onClick={handleToggleFlag}
                className={`p-1.5 rounded-lg border transition-colors ${
                  currentAnswer?.isFlagged
                    ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                    : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                }`}
                title="Marcar pregunta (Flag / Pin)"
              >
                <Bookmark className={`w-4 h-4 ${currentAnswer?.isFlagged ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Question ID & Marks */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-300">
                Nº <strong className="text-sky-400 font-bold">{currentQuestion.id}</strong> (1 mark)
              </span>

              {/* Timer */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 border border-slate-700/80 font-mono text-xs text-sky-400 font-bold">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                <span>{secondsRemaining !== null ? formatTimer(secondsRemaining) : formatTimer(elapsedSeconds)}</span>
              </div>
            </div>

          </div>

          {/* Sub-tabs: QUESTION | EXPLANATION | STATISTICS */}
          <div className="flex items-center gap-1 bg-[#091224] p-1.5 rounded-xl border border-sky-500/20 text-xs font-bold">
            <button
              onClick={() => setActiveTab('question')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'question'
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-glow-sky'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>► PREGUNTA</span>
            </button>

            <button
              onClick={() => setActiveTab('explanation')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'explanation'
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-glow-sky'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>EXPLICACIÓN</span>
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'stats'
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-glow-sky'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>ESTADÍSTICAS</span>
            </button>
          </div>

          {/* Tab 1: Question Stem & Options */}
          {activeTab === 'question' && (
            <div className="bg-[#0d1b38] border border-sky-500/20 rounded-2xl p-6 lg:p-8 shadow-xl space-y-6">
              
              {/* Learning Objective */}
              <div className="text-xs font-mono text-sky-400 uppercase tracking-wider font-bold">
                {currentQuestion.learning_objective}
              </div>

              {/* Stem */}
              <h2 className="text-base lg:text-lg font-bold text-white leading-relaxed">
                {currentQuestion.stem}
              </h2>

              {/* Annexes / Images */}
              {currentQuestion.annexes && currentQuestion.annexes.length > 0 && (
                <div className="space-y-3 p-4 rounded-xl bg-black/40 border border-slate-800">
                  {currentQuestion.annexes.map((annex) => (
                    <div key={annex.id} className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                        <FileText className="w-4 h-4" />
                        <span>{annex.title}</span>
                      </div>
                      <img 
                        src={annex.src} 
                        alt={annex.title} 
                        className="max-h-80 w-auto rounded-lg border border-slate-700 object-contain mx-auto shadow-md"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Options (AviationExam Style: Big Letter + Clear Option Text) */}
              <div className="space-y-3 pt-2">
                {currentQuestion.options.map((opt) => {
                  const isSelected = currentAnswer?.selectedOptionId === opt.id;
                  
                  // Colores estilo AviationExam
                  let cardStyle = 'bg-[#112347]/70 border-slate-800 text-slate-200 hover:border-sky-500/60 hover:bg-[#152a54]';
                  let letterStyle = 'text-sky-400 font-bold';
                  let textStyle = 'text-slate-200';

                  if (isPracticeMode && isAnswered) {
                    if (opt.is_correct) {
                      // Correct option in Green
                      cardStyle = 'bg-emerald-950/60 border-emerald-500 shadow-glow-emerald';
                      letterStyle = 'text-emerald-400 font-extrabold text-lg';
                      textStyle = 'text-emerald-300 font-medium';
                    } else if (isSelected && !opt.is_correct) {
                      // Wrong selected option in Red
                      cardStyle = 'bg-rose-950/60 border-rose-500 shadow-glow-rose';
                      letterStyle = 'text-rose-400 font-extrabold text-lg';
                      textStyle = 'text-rose-300 font-medium';
                    } else {
                      cardStyle = 'bg-black/30 border-slate-900 text-slate-500 opacity-40';
                    }
                  } else if (isSelected) {
                    cardStyle = 'bg-sky-950/70 border-sky-400 ring-2 ring-sky-400 shadow-glow-sky';
                    letterStyle = 'text-sky-300 font-extrabold text-lg';
                    textStyle = 'text-white font-bold';
                  }

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectOption(opt)}
                      className={`p-4 rounded-xl border flex items-start gap-4 cursor-pointer transition-all duration-150 active:scale-[0.99] ${cardStyle}`}
                    >
                      <div className={`text-base font-mono w-6 flex-shrink-0 pt-0.5 ${letterStyle}`}>
                        {opt.id}
                      </div>
                      <div className={`flex-1 text-sm lg:text-base leading-relaxed ${textStyle}`}>
                        {opt.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Feedback explicativo inline en modo práctica */}
              {isPracticeMode && isAnswered && !currentAnswer?.isCorrect && (
                <div className="mt-4 p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 space-y-3 animate-fade-in shadow-glow-rose">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                      <XCircle className="w-5 h-5 flex-shrink-0" />
                      <span>Respuesta incorrecta — Revisa la explicación</span>
                    </div>
                    <button
                      onClick={() => setActiveTab('explanation')}
                      className="px-3 py-1 bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/40 rounded-lg text-xs font-bold transition-all flex items-center gap-1 flex-shrink-0"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Ver Cuadros y Referencias</span>
                    </button>
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed border-t border-rose-500/20 pt-2 font-normal">
                    <FormattedText text={currentQuestion.explanation.text} />
                  </div>
                </div>
              )}

              {isPracticeMode && isAnswered && currentAnswer?.isCorrect && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between text-emerald-400 font-bold text-sm animate-fade-in shadow-glow-emerald">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span>¡Respuesta correcta! {autoAdvance && currentIndex < session.questions.length - 1 ? 'Avanzando a la siguiente...' : ''}</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('explanation')}
                    className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Ver Explicación</span>
                  </button>
                </div>
              )}

            </div>
          )}

          {/* Tab 2: Explanation View */}
          {activeTab === 'explanation' && (
            <div className="bg-[#0d1b38] border border-sky-500/20 rounded-2xl p-6 lg:p-8 shadow-xl space-y-5 animate-fade-in">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                <FileText className="w-5 h-5" />
                <span>Explicación & Referencias Oficiales</span>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-slate-800 text-slate-200 text-sm leading-relaxed space-y-3">
                <FormattedText text={currentQuestion.explanation.text} />

                {/* Cuadro de Mínimos de Planificación o Combustible si aplica */}
                {(currentQuestion.subject_id?.includes('aerodromos') ||
                  currentQuestion.subject_id?.includes('minimos') ||
                  currentQuestion.stem.toLowerCase().includes('mínimos de planificación') ||
                  currentQuestion.stem.toLowerCase().includes('plan básico con variaciones')) && (
                  <PlanningMinimaTable type="variaciones" />
                )}

                {(currentQuestion.subject_id?.includes('combustible') ||
                  currentQuestion.stem.toLowerCase().includes('minimum fuel') ||
                  currentQuestion.stem.toLowerCase().includes('mayday fuel') ||
                  currentQuestion.stem.toLowerCase().includes('reserva final')) && (
                  <PlanningMinimaTable type="fuel_calls" />
                )}

                {/* Cuadro Resumen de Velocidades si la pregunta es de velocidades o limitaciones */}
                {(currentQuestion.id.includes('SPD') ||
                  currentQuestion.subject_id?.includes('velocidad') ||
                  currentQuestion.subject_id?.includes('limitaciones') ||
                  currentQuestion.stem.toLowerCase().includes('kias') ||
                  currentQuestion.stem.toLowerCase().includes('velocidad') ||
                  currentQuestion.stem.toLowerCase().includes('planeo')) && (
                  <SpeedSummaryTable
                    aircraftType={
                      currentQuestion.id.startsWith('P2010') || currentQuestion.stem.includes('P2010') || currentQuestion.stem.includes('Tecnam')
                        ? 'p2010'
                        : currentQuestion.id.startsWith('C172') || currentQuestion.stem.includes('172') || currentQuestion.stem.includes('Cessna')
                        ? 'c172n'
                        : 'p2010'
                    }
                  />
                )}

                {currentQuestion.explanation.references && currentQuestion.explanation.references.length > 0 && (
                  <div className="pt-3 border-t border-slate-800 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Referencias Documentales:
                    </span>
                    <ul className="space-y-1.5">
                      {currentQuestion.explanation.references.map((ref, idx) => (
                        <li key={idx} className="text-xs font-mono text-sky-400 flex items-center gap-2 bg-[#091224] p-2 rounded-lg border border-sky-500/20">
                          <span>📌 {ref}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 3: Statistics View */}
          {activeTab === 'stats' && (
            <div className="bg-[#0d1b38] border border-sky-500/20 rounded-2xl p-6 lg:p-8 shadow-xl space-y-5 animate-fade-in">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                <TrendingUp className="w-5 h-5" />
                <span>Estadísticas de Rendimiento del Reactivo</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-4 rounded-xl bg-black/40 border border-slate-800">
                  <span className="text-xs text-slate-400 uppercase font-bold block">Veces Respondida</span>
                  <span className="text-2xl font-extrabold text-white mt-1 block">
                    {currentStat?.timesAnswered || 0}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                  <span className="text-xs text-emerald-400 uppercase font-bold block">Aciertos</span>
                  <span className="text-2xl font-extrabold text-emerald-400 mt-1 block">
                    {currentStat?.timesCorrect || 0}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30">
                  <span className="text-xs text-rose-400 uppercase font-bold block">Fallos</span>
                  <span className="text-2xl font-extrabold text-rose-400 mt-1 block">
                    {currentStat?.timesIncorrect || 0}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 font-mono">
                Última realización: {currentStat?.lastAnsweredAt ? new Date(currentStat.lastAnsweredAt).toLocaleString() : 'Nunca respondida'}
              </p>
            </div>
          )}

          {/* Prev / Next Footer Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => currentIndex > 0 && navigateTo(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#112347] text-slate-200 border border-slate-700 hover:bg-[#162d59] disabled:opacity-30 disabled:pointer-events-none transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            {currentIndex === session.questions.length - 1 ? (
              <button
                onClick={onFinishExam}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-glow-emerald transition-all active:scale-95"
              >
                <Check className="w-4 h-4" />
                <span>Finalizar Examen</span>
              </button>
            ) : (
              <button
                onClick={() => currentIndex < session.questions.length - 1 && navigateTo(currentIndex + 1)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-glow-sky transition-all active:scale-95"
              >
                <span>Siguiente</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

        {/* Right Column: 5-Column Question Grid Palette (EXACT AviationExam Style) */}
        <div className="lg:col-span-4 space-y-4 sticky top-16">
          
          <div className="bg-[#0e1933] border border-sky-500/25 rounded-2xl p-5 shadow-xl space-y-4">
            
            {/* Top Action Links: Save / Cancel / Finish */}
            <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
              <button onClick={onExitExam} className="hover:text-white transition-colors">
                Guardar y salir
              </button>
              <button onClick={onExitExam} className="hover:text-rose-400 transition-colors">
                Cancelar test
              </button>
            </div>

            {/* Big Finish Button */}
            <button
              onClick={onFinishExam}
              className="w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-slate-800 hover:bg-emerald-600 text-white border border-slate-700 hover:border-emerald-500 shadow-md transition-all active:scale-95"
            >
              FINISH TEST
            </button>

            {/* 5-Column Question Grid */}
            <div className="pt-2">
              <div className="grid grid-cols-5 gap-2 max-h-[380px] overflow-y-auto custom-scrollbar pr-1 p-1">
                {session.questions.map((q, idx) => {
                  const ans = session.answers[q.id];
                  const isCurrent = idx === currentIndex;
                  const isAns = ans && ans.selectedOptionId !== null;

                  // Estilo idéntico a AviationExam:
                  // - Fallada: Rojo / Naranja
                  // - Acertada: Verde
                  // - No respondida: Blanco / Gris claro
                  // - Actual: Borde remarcado
                  let cellStyle = 'bg-[#152547] text-slate-300 border-slate-700/80 hover:border-sky-400 hover:text-white';

                  if (isPracticeMode && isAns) {
                    if (ans.isCorrect === true) {
                      cellStyle = 'bg-emerald-500 text-white font-bold border-emerald-400 shadow-sm';
                    } else {
                      cellStyle = 'bg-rose-500 text-white font-bold border-rose-400 shadow-sm';
                    }
                  } else if (isAns) {
                    cellStyle = 'bg-sky-500 text-white font-bold border-sky-400';
                  }

                  if (isCurrent) {
                    cellStyle += ' ring-2 ring-sky-300 ring-offset-2 ring-offset-[#0e1933] font-black scale-105';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => navigateTo(idx)}
                      className={`h-9 rounded-lg border text-xs font-mono flex items-center justify-center transition-all duration-150 relative cursor-pointer ${cellStyle}`}
                      title={`Pregunta ${idx + 1}: ${q.id}`}
                    >
                      <span>{idx + 1}</span>
                      {ans?.isFlagged && (
                        <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-amber-400 ring-1 ring-black" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Keyboard shortcut hint */}
            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
              <Keyboard className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
              <span>Atajos: Teclas <strong>A-D</strong> / <strong>1-4</strong> para responder, <strong>← →</strong> navegar.</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
