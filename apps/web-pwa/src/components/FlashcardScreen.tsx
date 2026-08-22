import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Shuffle, 
  Trash2, 
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
  Filter
} from 'lucide-react';
import { Question, BankManifest, Option } from '../types';
import { filterFlashcards, getFlashcardBadge, getFlashcardType } from '../utils/flashcardFilter';
import { shuffle, deleteQuestionFromBank } from '../services/questionsService';
import { recordAnswerStat, getQuestionStat } from '../services/db';
import { DeleteConfirmModal } from './DeleteConfirmModal';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [deck, setDeck] = useState<Question[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [masteryMap, setMasteryMap] = useState<Record<string, 'easy' | 'medium' | 'hard'>>({});

  // Construir el mazo de flashcards según categoría y filtro
  const buildDeck = (cat: string, fType: 'all' | 'numerical' | 'acronym', randomize = false) => {
    const filtered = filterFlashcards(questions, cat, fType);
    const finalDeck = randomize ? shuffle(filtered) : filtered;
    setDeck(finalDeck);
    setCurrentIndex(0);
    setIsFlipped(false);
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
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteryMap({});
  };

  const handleRateMastery = async (rating: 'hard' | 'medium' | 'easy') => {
    if (!currentQuestion) return;
    
    setMasteryMap((prev) => ({
      ...prev,
      [currentQuestion.id]: rating
    }));

    const isCorrect = rating === 'easy' || rating === 'medium';
    await recordAnswerStat(
      currentQuestion.id,
      correctOption?.id || 'A',
      isCorrect,
      10,
      'smart_review'
    );

    // Avanzar automáticamente a la siguiente tarjeta tras calificar
    if (currentIndex < deck.length - 1) {
      handleNext();
    }
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
  }, [currentIndex, deck, isFlipped, currentQuestion, isDeleteModalOpen]);

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

          {currentQuestion && (
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-500/40 text-xs font-bold transition-all active:scale-95"
              title="Eliminar esta pregunta del banco permanente"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Eliminar</span>
            </button>
          )}
        </div>
      </div>

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
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {totalCards} tarjetas activas
                </span>
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

        {/* Secondary Filter: All vs Numerical vs Acronyms */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
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
      </div>

      {/* 3. Empty Deck State */}
      {totalCards === 0 ? (
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
        /* 4. Interactive Flashcard Deck */
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
              isFlipped 
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

              {/* Front Prompt */}
              {!isFlipped && (
                <div className="p-4 rounded-2xl bg-black/30 border border-dashed border-sky-500/30 text-center space-y-2">
                  <p className="text-xs text-sky-200 font-semibold flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Intenta recordar el dato, número o definición antes de voltear</span>
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Haz clic en cualquier parte de la tarjeta o pulsa <strong className="text-sky-300">[Espacio]</strong> para ver la respuesta
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
                        className="px-3 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-500/40 text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>[1] Difícil</span>
                      </button>

                      <button
                        onClick={() => handleRateMastery('medium')}
                        className="px-3 py-2 rounded-xl bg-amber-950/60 hover:bg-amber-900 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>[2] Regular</span>
                      </button>

                      <button
                        onClick={() => handleRateMastery('easy')}
                        className="px-3 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-1.5"
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
                [Espacio] Voltear • [←/→] Navegar
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
              disabled={currentIndex >= deck.length - 1}
              className="px-5 py-3 rounded-2xl bg-[#0e1933] hover:bg-slate-800 text-sky-300 border border-sky-500/30 text-xs font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 active:scale-95"
            >
              <span>Siguiente</span>
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

    </div>
  );
};
