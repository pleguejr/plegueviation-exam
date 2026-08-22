import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Shuffle, 
  Trash2, 
  Search,
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Zap, 
  Eye, 
  EyeOff, 
  BookOpen, 
  HelpCircle, 
  AlertTriangle,
  Flame,
  Award,
  Layers,
  ChevronDown,
  Filter,
  Repeat,
  Trophy,
  Brain,
  List,
  Check
} from 'lucide-react';
import { Question, BankManifest, Option } from '../types';
import { filterFlashcards, getFlashcardBadge, getFlashcardType } from '../utils/flashcardFilter';
import { shuffle, deleteQuestionFromBank } from '../services/questionsService';
import { recordAnswerStat, getQuestionStat } from '../services/db';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { ReviewRequestModal } from './ReviewRequestModal';
import { FormattedText } from './FormattedText';
import { SpeedSummaryTable } from './SpeedSummaryTable';
import { PlanningMinimaTable } from './PlanningMinimaTable';
import { getSpeedSummaryTableType, getPlanningMinimaTableType } from '../utils/aircraftRules';

interface FlashcardScreenProps {
  questions: Question[];
  manifest: BankManifest | null;
  initialCategory?: string;
  onExit: () => void;
  onRefreshData: () => Promise<void> | void;
}

export const FlashcardScreen: React.FC<FlashcardScreenProps> = ({
  questions,
  manifest,
  initialCategory = 'all',
  onExit,
  onRefreshData
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [filterType, setFilterType] = useState<'all' | 'numerical' | 'acronym'>('all');
  const [studyMode, setStudyMode] = useState<'pure_recall' | 'with_options'>('pure_recall');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [deck, setDeck] = useState<Question[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isSessionCompleted, setIsSessionCompleted] = useState(false);

  // Estadísticas de la sesión actual
  const [sessionStats, setSessionStats] = useState<{
    easyCount: number;
    mediumCount: number;
    hardCount: number;
    requeuedCount: number;
    hardQuestionIds: Set<string>;
  }>({
    easyCount: 0,
    mediumCount: 0,
    hardCount: 0,
    requeuedCount: 0,
    hardQuestionIds: new Set()
  });

  const [lastRatedFeedback, setLastRatedFeedback] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Construir el mazo de flashcards según categoría y filtro
  const buildDeck = (cat: string, fType: 'all' | 'numerical' | 'acronym', randomize = false) => {
    const filtered = filterFlashcards(questions, cat, fType);
    const finalDeck = randomize ? shuffle(filtered) : filtered;
    setDeck(finalDeck);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionCompleted(false);
    setSessionStats({
      easyCount: 0,
      mediumCount: 0,
      hardCount: 0,
      requeuedCount: 0,
      hardQuestionIds: new Set()
    });
  };

  useEffect(() => {
    buildDeck(selectedCategory, filterType, false);
  }, [questions, selectedCategory, filterType]);

  const currentQuestion: Question | undefined = deck[currentIndex];
  const correctOption: Option | undefined = currentQuestion?.options.find((o) => o.is_correct);
  const badgeInfo = currentQuestion ? getFlashcardBadge(currentQuestion) : null;

  const totalCards = deck.length;
  const progressPct = totalCards > 0 ? Math.round(((currentIndex + 1) / totalCards) * 100) : 0;

  const handleNext = () => {
    if (currentIndex < deck.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    } else {
      // Fin del mazo alcanzado
      setIsSessionCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleShuffle = () => {
    setDeck((prev) => shuffle([...prev]));
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionCompleted(false);
  };

  const handleRestart = () => {
    buildDeck(selectedCategory, filterType, false);
  };

  const handleRetryHardOnly = () => {
    const hardQuestions = questions.filter((q) => sessionStats.hardQuestionIds.has(q.id));
    if (hardQuestions.length === 0) return;
    setDeck(shuffle(hardQuestions));
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsSessionCompleted(false);
    setSessionStats({
      easyCount: 0,
      mediumCount: 0,
      hardCount: 0,
      requeuedCount: 0,
      hardQuestionIds: new Set()
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleRateMastery = async (rating: 'hard' | 'medium' | 'easy') => {
    if (!currentQuestion) return;

    setLastRatedFeedback(rating);
    setTimeout(() => setLastRatedFeedback(null), 400);

    const isCorrect = rating === 'easy' || rating === 'medium';
    await recordAnswerStat(
      currentQuestion.id,
      correctOption?.id || 'A',
      isCorrect,
      10,
      'smart_review'
    );

    // Actualizar contadores de sesión
    setSessionStats((prev) => {
      const updatedHardIds = new Set(prev.hardQuestionIds);
      if (rating === 'hard') {
        updatedHardIds.add(currentQuestion.id);
      }
      return {
        ...prev,
        easyCount: rating === 'easy' ? prev.easyCount + 1 : prev.easyCount,
        mediumCount: rating === 'medium' ? prev.mediumCount + 1 : prev.mediumCount,
        hardCount: rating === 'hard' ? prev.hardCount + 1 : prev.hardCount,
        requeuedCount: rating === 'hard' ? prev.requeuedCount + 1 : prev.requeuedCount,
        hardQuestionIds: updatedHardIds
      };
    });

    // 🔁 DINÁMICA DE RE-ENCOLADO (Leitner Box / Spaced Repetition):
    // Si se califica como 'Difícil', se añade automáticamente al final del mazo para volver a verla
    if (rating === 'hard') {
      setDeck((prev) => [...prev, currentQuestion]);
      showToast('🔁 Tarjeta re-encolada al final para afianzar retención');
    }

    // Avanzar a la siguiente tarjeta tras breve pausa de feedback
    setTimeout(() => {
      handleNext();
    }, 150);
  };

  const handleDeleteConfirm = async (q: Question, reason?: string) => {
    await deleteQuestionFromBank(q, reason);
    const updatedDeck = deck.filter((item) => item.id !== q.id);
    setDeck(updatedDeck);

    if (updatedDeck.length === 0) {
      alert('Esta era la última tarjeta del mazo y ha sido eliminada. Volviendo al Dashboard.');
      onExit();
      return;
    }

    const newIndex = Math.min(currentIndex, updatedDeck.length - 1);
    setCurrentIndex(newIndex);
    setIsFlipped(false);
    await onRefreshData();
  };

  // Atajos de teclado estilo Anki / AviationExam
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (isSessionCompleted) {
        if (e.key === 'r' || e.key === 'R') handleRestart();
        if (e.key === 'Escape') onExit();
        return;
      }

      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleFlip();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === '1') {
        handleRateMastery('hard');
      } else if (e.key === '2') {
        handleRateMastery('medium');
      } else if (e.key === '3') {
        handleRateMastery('easy');
      } else if (e.key === 'Delete' || e.key === 'd' || e.key === 'D') {
        if (currentQuestion && !isDeleteModalOpen) {
          setIsDeleteModalOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, deck, isFlipped, currentQuestion, isDeleteModalOpen, isSessionCompleted]);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 animate-fade-in font-sans">
      
      {/* 1. Header & Back Bar */}
      <div className="flex flex-wrap items-center justify-between py-2 border-b border-sky-500/20 gap-3">
        <button
          onClick={onExit}
          className="flex items-center gap-2 font-bold text-sky-400 hover:text-sky-300 text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Dashboard</span>
        </button>

        {/* Action Controls: Shuffle, Restart, Delete Question */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 text-xs font-bold transition-all active:scale-95"
            title="Mezclar tarjetas aleatoriamente"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mezclar</span>
          </button>

          <button
            onClick={handleRestart}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-bold transition-all active:scale-95"
            title="Reiniciar mazo desde la primera tarjeta"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>

          {currentQuestion && !isSessionCompleted && (
            <>
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-bold transition-all active:scale-95"
                title="Reportar esta pregunta para revisión técnica / auditoría"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Revisión</span>
              </button>

              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-500/40 text-xs font-bold transition-all active:scale-95"
                title="Eliminar esta pregunta del banco permanente"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Eliminar</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Toast Notification (Feedback de re-encolado) */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-amber-500 text-slate-950 px-4 py-2.5 rounded-2xl font-black text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <Repeat className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2. Top Title & Filter Pills */}
      <div className="bg-[#0e1933] border border-sky-500/20 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 shadow-glow-amber">
              <Zap className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white flex items-center gap-2">
                <span>Modo Flashcards</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  {totalCards} en cola
                </span>
                {sessionStats.requeuedCount > 0 && (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold flex items-center gap-1">
                    <Repeat className="w-3 h-3" />
                    <span>+{sessionStats.requeuedCount} re-encoladas</span>
                  </span>
                )}
              </h1>
              <p className="text-xs text-slate-300 font-medium">
                Entrenamiento intensivo de retención: límites numéricos, velocidades, altitudes y mnemónicos operacionales.
              </p>
            </div>
          </div>

          {/* Category Dropdown Selector */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-slate-400 whitespace-nowrap">Banco / Manual:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-sky-500/30 text-xs font-bold text-sky-200 focus:outline-none focus:border-sky-400 max-w-[220px]"
            >
              <option value="all">Todos los Bancos ({questions.length})</option>
              {manifest?.categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title} ({cat.total_questions})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Secondary Filter & Study Mode Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
          
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === 'all'
                  ? 'bg-sky-600 text-white shadow-glow-sky'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              ⚡ Todas ({filterFlashcards(questions, selectedCategory, 'all').length})
            </button>

            <button
              onClick={() => setFilterType('numerical')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterType === 'numerical'
                  ? 'bg-amber-600 text-white shadow-glow-amber'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>🔢 Solo Datos Numéricos</span>
              <span className="text-[10px] opacity-80">({filterFlashcards(questions, selectedCategory, 'numerical').length})</span>
            </button>

            <button
              onClick={() => setFilterType('acronym')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterType === 'acronym'
                  ? 'bg-purple-600 text-white shadow-glow-purple'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>🔤 Solo Siglas y Acrónimos</span>
              <span className="text-[10px] opacity-80">({filterFlashcards(questions, selectedCategory, 'acronym').length})</span>
            </button>
          </div>

          {/* Study Mode: Pure Recall vs Options Mode */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setStudyMode('pure_recall')}
              className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
                studyMode === 'pure_recall'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Oculta las 4 opciones en el anverso para forzar recuerdo activo puro"
            >
              <Brain className="w-3.5 h-3.5" />
              <span>Recuerdo Activo</span>
            </button>
            <button
              onClick={() => setStudyMode('with_options')}
              className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
                studyMode === 'with_options'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Muestra las opciones en el anverso como pista"
            >
              <List className="w-3.5 h-3.5" />
              <span>Con Opciones</span>
            </button>
          </div>

        </div>
      </div>

      {/* 3. Session Complete Celebration Screen */}
      {isSessionCompleted ? (
        <div className="bg-[#0e1933] border border-emerald-500/40 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-glow-emerald">
            <Trophy className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white">¡Sesión de Flashcards Completada!</h2>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Has revisado todas las tarjetas del mazo actual, incluyendo las repeticiones espaciadas de los conceptos difíciles.
            </p>
          </div>

          {/* Session Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
            <div className="p-4 rounded-2xl bg-black/40 border border-slate-800 text-center space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Total Tarjetas</span>
              <p className="text-2xl font-black text-sky-400">{deck.length}</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-1">
              <span className="text-[10px] font-mono text-emerald-300 uppercase font-bold">🟢 Dominadas</span>
              <p className="text-2xl font-black text-emerald-400">{sessionStats.easyCount}</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-center space-y-1">
              <span className="text-[10px] font-mono text-amber-300 uppercase font-bold">🟡 Regulares</span>
              <p className="text-2xl font-black text-amber-400">{sessionStats.mediumCount}</p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-center space-y-1">
              <span className="text-[10px] font-mono text-rose-300 uppercase font-bold">🔁 Re-entrenadas</span>
              <p className="text-2xl font-black text-rose-400">{sessionStats.requeuedCount}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-800">
            {sessionStats.hardQuestionIds.size > 0 && (
              <button
                onClick={handleRetryHardOnly}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-black shadow-glow-rose transition-all active:scale-95 flex items-center gap-2"
              >
                <Flame className="w-4 h-4" />
                <span>Repetir Solo las Difíciles ({sessionStats.hardQuestionIds.size})</span>
              </button>
            )}

            <button
              onClick={handleRestart}
              className="px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-black shadow-glow-sky transition-all active:scale-95 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar Mazo Completo</span>
            </button>

            <button
              onClick={onExit}
              className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all active:scale-95"
            >
              Volver al Dashboard
            </button>
          </div>
        </div>
      ) : totalCards === 0 ? (
        /* 4. Empty Deck State */
        <div className="bg-[#0e1933] border border-sky-500/20 rounded-3xl p-12 text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">No se encontraron tarjetas con estos filtros</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Prueba a seleccionar otra categoría o restablece el filtro a "Todas" para explorar más reactivos.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setFilterType('all');
            }}
            className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-glow-sky"
          >
            Ver Todas las Flashcards
          </button>
        </div>
      ) : (
        /* 5. Interactive Flashcard Deck */
        <div className="space-y-4">
          
          {/* Progress Tracker Bar */}
          <div className="flex items-center justify-between text-xs font-mono px-2">
            <span className="text-slate-400">
              Tarjeta <strong className="text-sky-300 font-bold">{currentIndex + 1}</strong> de <strong className="text-white">{totalCards}</strong>
            </span>
            <span className="text-slate-400 font-bold">{progressPct}% completado</span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-sky-500 via-amber-400 to-emerald-400 transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* 3D Interactive Flip Card */}
          <div 
            onClick={handleFlip}
            className={`min-h-[420px] rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-300 shadow-2xl relative flex flex-col justify-between select-none border ${
              lastRatedFeedback === 'easy'
                ? 'border-emerald-400 bg-emerald-950/40 shadow-glow-emerald'
                : lastRatedFeedback === 'medium'
                ? 'border-amber-400 bg-amber-950/40 shadow-glow-amber'
                : lastRatedFeedback === 'hard'
                ? 'border-rose-400 bg-rose-950/40 shadow-glow-rose'
                : isFlipped 
                ? 'bg-gradient-to-br from-[#0a1f3d] via-[#09172e] to-[#06101f] border-emerald-500/40 shadow-glow-emerald' 
                : 'bg-gradient-to-br from-[#0e1933] via-[#0b1429] to-[#070e1e] border-sky-500/30 hover:border-sky-500/50 shadow-glow-sky'
            }`}
          >
            {/* Card Header */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-300 border border-sky-500/20">
                    {currentQuestion?.id}
                  </span>
                  
                  {badgeInfo && (
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${
                      badgeInfo.type === 'numerical'
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        : badgeInfo.type === 'acronym'
                        ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                        : 'bg-teal-500/10 text-teal-300 border-teal-500/30'
                    }`}>
                      {badgeInfo.label}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-400 bg-black/40 px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1">
                    {isFlipped ? <EyeOff className="w-3.5 h-3.5 text-emerald-400" /> : <Eye className="w-3.5 h-3.5 text-sky-400" />}
                    <span>{isFlipped ? 'Respuesta Visible' : 'Toca para Voltear'}</span>
                  </span>
                </div>
              </div>

              {/* Learning Objective / Reference */}
              <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                <span className="truncate">{currentQuestion?.learning_objective}</span>
              </div>
            </div>

            {/* Central Card Content (Front vs Back) */}
            <div className="py-6 my-auto space-y-5">
              
              {/* Question Stem (Visible in both Front and Back) */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-sky-400 font-mono">
                  Pregunta / Concepto Clave:
                </span>
                <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  <FormattedText text={currentQuestion?.stem || ''} />
                </h2>
              </div>

              {/* Front: With Options Mode if active */}
              {!isFlipped && studyMode === 'with_options' && currentQuestion && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
                  {currentQuestion.options.map((opt) => (
                    <div 
                      key={opt.id}
                      className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300 flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-md bg-slate-800 text-sky-300 font-mono font-bold flex items-center justify-center text-[11px] flex-shrink-0 border border-slate-700">
                        {opt.id}
                      </span>
                      <span className="leading-snug">{opt.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Front Prompt */}
              {!isFlipped && (
                <div className="p-4 rounded-2xl bg-black/30 border border-dashed border-sky-500/30 text-center space-y-2">
                  <p className="text-xs text-sky-200 font-semibold flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>{studyMode === 'pure_recall' ? 'Intenta recordar el dato, número o definición de memoria' : 'Analiza las opciones y selecciona mentalmente la correcta'}</span>
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Haz clic en la tarjeta o pulsa <strong className="text-sky-300">[Espacio]</strong> para revelar la respuesta
                  </p>
                </div>
              )}

              {/* Back: Revealed Answer & Structured Explanation */}
              {isFlipped && (
                <div className="space-y-4 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                  
                  {/* Correct Answer Highlight */}
                  <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 space-y-1.5 shadow-lg">
                    <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-wide">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Respuesta Correcta ({correctOption?.id})</span>
                    </div>
                    <div className="text-sm font-bold text-emerald-100 leading-relaxed pl-6">
                      <FormattedText text={correctOption?.text || ''} />
                    </div>
                  </div>

                  {/* Detailed Explanation / Markdown Tables */}
                  <div className="p-4 rounded-2xl bg-black/40 border border-slate-800 space-y-3 text-xs">
                    <div className="flex items-center gap-2 text-sky-400 font-bold">
                      <BookOpen className="w-4 h-4" />
                      <span>Fundamento Normativo y Explicación:</span>
                    </div>
                    
                    <div className="text-slate-200 leading-relaxed">
                      <FormattedText text={currentQuestion?.explanation.text || ''} />
                    </div>

                    {/* Reference Manual */}
                    {currentQuestion?.explanation.references && currentQuestion.explanation.references.length > 0 && (
                      <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-1 text-[11px] text-slate-400">
                        <strong className="text-sky-300">Fuente Oficial:</strong>
                        <span>{currentQuestion.explanation.references.join(' • ')}</span>
                      </div>
                    )}
                  </div>

                  {/* Special Tables for Speeds and Planning Minima if relevant */}
                  {currentQuestion && getSpeedSummaryTableType(currentQuestion) && (
                    <div className="p-4 rounded-2xl bg-slate-900 border border-sky-500/30">
                      <SpeedSummaryTable aircraftType={getSpeedSummaryTableType(currentQuestion)} />
                    </div>
                  )}

                  {currentQuestion && getPlanningMinimaTableType(currentQuestion) && (
                    <div className="p-4 rounded-2xl bg-slate-900 border border-sky-500/30">
                      <PlanningMinimaTable type={getPlanningMinimaTableType(currentQuestion)!} />
                    </div>
                  )}

                  {/* Self-Assessment Mastery Rating */}
                  <div className="pt-3 border-t border-slate-800 space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 block text-center">
                      ¿Cómo te ha resultado este dato?
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handleRateMastery('hard')}
                        className="px-3 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-500/40 text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-md"
                      >
                        <Repeat className="w-3.5 h-3.5" />
                        <span>[1] Difícil (Re-encolar)</span>
                      </button>

                      <button
                        onClick={() => handleRateMastery('medium')}
                        className="px-3 py-2.5 rounded-xl bg-amber-950/60 hover:bg-amber-900 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-md"
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>[2] Regular</span>
                      </button>

                      <button
                        onClick={() => handleRateMastery('easy')}
                        className="px-3 py-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-md"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>[3] Dominada</span>
                      </button>
                    </div>
                  </div>

                </div>
              )}

            </div>

            {/* Card Footer / Flip indicator */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>{isFlipped ? '💡 Clic para ocultar' : '💡 Clic para revelar respuesta'}</span>
              <span className="font-mono text-[11px] text-slate-500 hidden sm:inline">
                [Espacio] Voltear • [←/→] Navegar • [1/2/3] Calificar
              </span>
            </div>

          </div>

          {/* Bottom Deck Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-5 py-3 rounded-2xl bg-[#0e1933] hover:bg-slate-800 text-sky-300 border border-sky-500/30 text-xs font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <button
              onClick={handleFlip}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs font-extrabold shadow-glow-sky transition-all active:scale-95 flex items-center gap-2"
            >
              {isFlipped ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{isFlipped ? 'Ocultar Respuesta' : 'Revelar Respuesta'}</span>
            </button>

            <button
              onClick={handleNext}
              className="px-5 py-3 rounded-2xl bg-[#0e1933] hover:bg-slate-800 text-sky-300 border border-sky-500/30 text-xs font-bold transition-all flex items-center gap-2 active:scale-95"
            >
              <span>{currentIndex >= deck.length - 1 ? 'Finalizar' : 'Siguiente'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        question={currentQuestion || null}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />

      {/* Review Request Modal */}
      <ReviewRequestModal
        question={currentQuestion || null}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />

    </div>
  );
};
