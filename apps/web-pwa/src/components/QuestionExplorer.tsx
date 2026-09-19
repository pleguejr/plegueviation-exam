import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Bookmark, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Plane, 
  Play, 
  RotateCcw, 
  Sparkles, 
  BookOpen, 
  ArrowLeft, 
  Flame, 
  AlertTriangle, 
  Trash2, 
  Download, 
  ShieldAlert, 
  Calendar, 
  Zap,
  MessageSquare,
  Check
} from 'lucide-react';
import { Question, QuestionStats, BankManifest, DeletedQuestion, ReviewRequest } from '../types';
import { toggleQuestionFlag, getReviewRequests, deleteReviewRequest } from '../services/db';
import { deleteQuestionFromBank, restoreQuestionToBank, loadDeletedQuestions } from '../services/questionsService';
import { SpeedSummaryTable } from './SpeedSummaryTable';
import { PlanningMinimaTable } from './PlanningMinimaTable';
import { FormattedText } from './FormattedText';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { ReviewRequestModal } from './ReviewRequestModal';
import { getSpeedSummaryTableType, getPlanningMinimaTableType } from '../utils/aircraftRules';
import { isFlashcardEligible, getFlashcardBadge } from '../utils/flashcardFilter';

interface QuestionExplorerProps {
  questions: Question[];
  statsMap: Record<string, QuestionStats>;
  manifest: BankManifest | null;
  onRefreshStats: () => void;
  onStartCustomQuiz: (questionIds: string[]) => void;
  onStartFlashcards?: (params?: { category?: string }) => void;
  onGoToDashboard: () => void;
  initialSearchTerm?: string;
  initialCategory?: string;
  initialSubtopic?: string;
}

export const QuestionExplorer: React.FC<QuestionExplorerProps> = ({
  questions,
  statsMap,
  manifest,
  onRefreshStats,
  onStartCustomQuiz,
  onStartFlashcards,
  onGoToDashboard,
  initialSearchTerm = '',
  initialCategory = 'all',
  initialSubtopic = 'all'
}) => {
  const [activeTab, setActiveTab] = useState<'difficult' | 'search' | 'flagged' | 'unseen' | 'flashcards' | 'review' | 'deleted'>('search');
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>(initialSubtopic);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  // Deleted questions state
  const [deletedList, setDeletedList] = useState<DeletedQuestion[]>([]);
  const [questionToDelete, setQuestionToDelete] = useState<Question | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Review requests state
  const [reviewList, setReviewList] = useState<ReviewRequest[]>([]);
  const [questionToReview, setQuestionToReview] = useState<Question | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const fetchDeleted = async () => {
    const list = await loadDeletedQuestions();
    setDeletedList(list || []);
  };

  const fetchReviews = async () => {
    const list = await getReviewRequests();
    setReviewList(list || []);
  };

  useEffect(() => {
    fetchDeleted();
    fetchReviews();
  }, []);

  useEffect(() => {
    if (initialSearchTerm) {
      setSearchTerm(initialSearchTerm);
      setActiveTab('search');
    }
  }, [initialSearchTerm]);

  const availableSubtopics = useMemo(() => {
    if (!manifest) return [];
    if (selectedCategory === 'all') {
      const allSubs: { id: string; title: string; count: number; categoryTitle?: string }[] = [];
      for (const cat of manifest.categories) {
        if (cat.subtopics) {
          for (const st of Object.values(cat.subtopics)) {
            allSubs.push({ ...st, categoryTitle: cat.title });
          }
        }
      }
      return allSubs;
    }
    const cat = manifest.categories.find((c) => c.id === selectedCategory);
    return cat && cat.subtopics ? Object.values(cat.subtopics) : [];
  }, [manifest, selectedCategory]);

  const handleDeleteConfirm = async (q: Question, reason?: string) => {
    await deleteQuestionFromBank(q, reason);
    await fetchDeleted();
    onRefreshStats();
  };

  const handleRestoreQuestion = async (qId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const success = await restoreQuestionToBank(qId);
    if (success) {
      await fetchDeleted();
      onRefreshStats();
    }
  };

  const handleRemoveReview = async (reviewId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteReviewRequest(reviewId);
    await fetchReviews();
  };

  const handleExportDeleted = () => {
    const jsonStr = JSON.stringify(deletedList, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    a.href = url;
    a.download = `preguntas_eliminadas_${dateStr}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportReviews = () => {
    const jsonStr = JSON.stringify(reviewList, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    a.href = url;
    a.download = `preguntas_a_revisar_${dateStr}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filtrado según la sub-pestaña seleccionada (estilo AviationExam)
  const filteredQuestions = questions.filter((q) => {
    const stats = statsMap[q.id];

    // 1. Tab filter
    if (activeTab === 'difficult') {
      const isDifficult = (stats && stats.timesIncorrect > 0) || (q.metadata?.difficulty && q.metadata.difficulty >= 0.7);
      if (!isDifficult) return false;
    } else if (activeTab === 'flagged') {
      if (!stats || !stats.isFlagged) return false;
    } else if (activeTab === 'unseen') {
      if (stats && stats.timesAnswered > 0) return false;
    } else if (activeTab === 'flashcards') {
      if (!isFlashcardEligible(q)) return false;
    }

    // 2. Search term (stem, id, LO, options, explanation)
    const qLower = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm.trim() ||
      q.stem.toLowerCase().includes(qLower) ||
      q.id.toLowerCase().includes(qLower) ||
      q.learning_objective.toLowerCase().includes(qLower) ||
      (q.explanation?.text || '').toLowerCase().includes(qLower) ||
      q.options.some((o) => o.text.toLowerCase().includes(qLower));

    // 3. Category & Subtopic
    const matchesCategory = 
      selectedCategory === 'all' || 
      q._category === selectedCategory || 
      q.subject_id === selectedCategory;

    const matchesSubtopic =
      selectedSubtopic === 'all' ||
      q._subtopic === selectedSubtopic;

    return matchesSearch && matchesCategory && matchesSubtopic;
  });

  const filteredDeleted = deletedList.filter((d) => {
    const q = d.question;
    const matchesSearch = 
      q.stem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.learning_objective.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (d.reason && d.reason.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = 
      selectedCategory === 'all' || 
      q._category === selectedCategory || 
      q.subject_id === selectedCategory;

    const matchesSubtopic =
      selectedSubtopic === 'all' ||
      q._subtopic === selectedSubtopic;

    return matchesSearch && matchesCategory && matchesSubtopic;
  });

  const filteredReviews = reviewList.filter((r) => {
    const q = r.question;
    const matchesSearch = 
      q.stem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.learning_objective.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.reasonCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.comment && r.comment.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = 
      selectedCategory === 'all' || 
      q._category === selectedCategory || 
      q.subject_id === selectedCategory;

    const matchesSubtopic =
      selectedSubtopic === 'all' ||
      q._subtopic === selectedSubtopic;

    return matchesSearch && matchesCategory && matchesSubtopic;
  });

  const handleToggleFlag = async (qId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await toggleQuestionFlag(qId);
    onRefreshStats();
  };

  const handleOpenDeleteModal = (q: Question, e: React.MouseEvent) => {
    e.stopPropagation();
    setQuestionToDelete(q);
    setIsDeleteModalOpen(true);
  };

  const handleOpenReviewModal = (q: Question, e: React.MouseEvent) => {
    e.stopPropagation();
    setQuestionToReview(q);
    setIsReviewModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 font-sans animate-fade-in">
      
      {/* 1. Header estilo AviationExam: < Questions */}
      <div className="flex items-center justify-between py-1 border-b border-sky-500/20">
        <button
          onClick={onGoToDashboard}
          className="flex items-center gap-2 font-bold text-sky-400 hover:text-sky-300 text-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Questions</span>
        </button>

        {activeTab !== 'deleted' && activeTab !== 'review' && filteredQuestions.length > 0 && (
          <div className="flex items-center gap-2">
            {onStartFlashcards && (
              <button
                onClick={() => onStartFlashcards({ category: selectedCategory !== 'all' ? selectedCategory : undefined })}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-glow-amber transition-all active:scale-95"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Modo Flashcards</span>
              </button>
            )}
            <button
              onClick={() => onStartCustomQuiz(filteredQuestions.map((q) => q.id))}
              className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-glow-sky transition-all active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Practicar Selección ({filteredQuestions.length})</span>
            </button>
          </div>
        )}

        {activeTab === 'review' && reviewList.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportReviews}
              className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 shadow-md transition-all active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar para Auditoría ({reviewList.length})</span>
            </button>
            <button
              onClick={() => onStartCustomQuiz(filteredReviews.map((r) => r.question.id))}
              className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-glow-amber transition-all active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Practicar ({filteredReviews.length})</span>
            </button>
          </div>
        )}

        {activeTab === 'deleted' && deletedList.length > 0 && (
          <button
            onClick={handleExportDeleted}
            className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/40 shadow-md transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar Eliminadas ({deletedList.length})</span>
          </button>
        )}
      </div>

      {/* 2. Sub-tabs: Difficult | Search | Flashcards | Flagged | Unseen | A Revisar | Eliminadas */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-semibold border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('difficult')}
          className={`pb-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'difficult'
              ? 'text-white border-b-2 border-sky-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Flame className="w-4 h-4 text-rose-400" />
          <span>Difficult</span>
        </button>

        <button
          onClick={() => setActiveTab('search')}
          className={`pb-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'search'
              ? 'text-white border-b-2 border-sky-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Search className="w-4 h-4 text-sky-400" />
          <span>Search</span>
        </button>

        <button
          onClick={() => setActiveTab('flashcards')}
          className={`pb-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'flashcards'
              ? 'text-amber-300 border-b-2 border-amber-400 font-bold'
              : 'text-slate-400 hover:text-amber-300'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-400 fill-current" />
          <span>Flashcards</span>
        </button>

        <button
          onClick={() => setActiveTab('flagged')}
          className={`pb-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'flagged'
              ? 'text-white border-b-2 border-sky-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bookmark className="w-4 h-4 text-amber-400" />
          <span>Flagged</span>
        </button>

        <button
          onClick={() => setActiveTab('unseen')}
          className={`pb-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'unseen'
              ? 'text-white border-b-2 border-sky-400 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>No Vistas</span>
        </button>

        <button
          onClick={() => setActiveTab('review')}
          className={`pb-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'review'
              ? 'text-amber-300 border-b-2 border-amber-400 font-bold'
              : 'text-slate-400 hover:text-amber-300'
          }`}
        >
          <Search className="w-4 h-4 text-amber-400" />
          <span>A Revisar ({reviewList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('deleted')}
          className={`pb-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'deleted'
              ? 'text-rose-300 border-b-2 border-rose-500 font-bold'
              : 'text-slate-400 hover:text-rose-300'
          }`}
        >
          <Trash2 className="w-4 h-4 text-rose-400" />
          <span>Eliminadas ({deletedList.length})</span>
        </button>
      </div>

      {/* 3. Filter & Search Controls */}
      <div className="bg-[#0e1933] border border-sky-500/20 rounded-2xl p-4 shadow-lg space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-sky-400" />
            <input
              type="text"
              placeholder={
                activeTab === 'deleted'
                  ? 'Buscar en eliminadas...'
                  : activeTab === 'review'
                  ? 'Buscar en a revisar...'
                  : 'Buscar ID, palabra clave...'
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#091224] border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-sky-400"
            />
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubtopic('all');
              }}
              className="w-full px-3.5 py-2 rounded-xl bg-[#091224] border border-slate-700 text-white text-xs focus:outline-none focus:border-sky-400 truncate"
            >
              <option value="all">
                {activeTab === 'deleted'
                  ? `Todas las categorías (${deletedList.length})`
                  : activeTab === 'review'
                  ? `Todas las categorías (${reviewList.length})`
                  : `Todos los Bancos (${questions.length})`}
              </option>
              {manifest?.categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title} ({cat.total_questions})
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedSubtopic}
              onChange={(e) => setSelectedSubtopic(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#091224] border border-slate-700 text-white text-xs focus:outline-none focus:border-sky-400 truncate"
            >
              <option value="all">Todos los Subtemas ({availableSubtopics.reduce((acc, s) => acc + s.count, 0)})</option>
              {availableSubtopics.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.title} ({st.count})
                </option>
              ))}
            </select>
          </div>
        </div>

        {activeTab === 'search' && searchTerm.trim().length >= 2 && filteredQuestions.length > 0 && (
          <div className="explorer-search-test-banner flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-sky-400/40 bg-gradient-to-r from-sky-950/80 to-emerald-950/50 px-4 py-3">
            <div className="min-w-0">
              <p className="text-xs font-black text-sky-200 uppercase tracking-wide">
                Resultados de búsqueda
              </p>
              <p className="text-[11px] text-slate-300 mt-0.5">
                {filteredQuestions.length} pregunta{filteredQuestions.length === 1 ? '' : 's'} coinciden con «{searchTerm.trim()}»
              </p>
            </div>
            <button
              type="button"
              onClick={() => onStartCustomQuiz(filteredQuestions.map((q) => q.id))}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-400 hover:to-sky-500 text-white shadow-md active:scale-95 transition-all shrink-0"
            >
              <Play className="w-4 h-4 fill-current" />
              Hacer test con estas {filteredQuestions.length}
            </button>
          </div>
        )}

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <span>
            Mostrando <strong className="text-sky-400">
              {activeTab === 'deleted'
                ? filteredDeleted.length
                : activeTab === 'review'
                ? filteredReviews.length
                : filteredQuestions.length}
            </strong> elementos encontrados
          </span>
          <span className="font-mono text-[11px] text-slate-500">
            {activeTab === 'deleted' 
              ? 'Preguntas excluidas permanentemente de exámenes' 
              : activeTab === 'review'
              ? 'Preguntas reportadas para auditoría técnica de manuales'
              : 'Haz clic en una pregunta para expandir opciones y fundamentos'}
          </span>
        </div>
      </div>

      {/* 4. Questions List */}
      {activeTab === 'deleted' ? (
        /* Lista de Eliminadas */
        <div className="space-y-3">
          {filteredDeleted.length === 0 ? (
            <div className="text-center py-14 bg-[#0e1933] border border-slate-800 rounded-2xl space-y-2">
              <ShieldAlert className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="font-semibold text-sm text-slate-300">No hay preguntas eliminadas en este criterio.</p>
            </div>
          ) : (
            filteredDeleted.map((del) => {
              const q = del.question;
              const isExpanded = expandedId === del.id;
              const dateStr = new Date(del.deletedAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={del.id}
                  onClick={() => setExpandedId(isExpanded ? null : del.id)}
                  className={`bg-[#0e1933] border rounded-2xl p-4 transition-all duration-200 cursor-pointer shadow-md ${
                    isExpanded ? 'border-rose-500/50 bg-[#0f1d3d]' : 'border-rose-500/20 hover:border-rose-500/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-rose-400 font-bold text-xs px-2.5 py-0.5 rounded-lg bg-rose-500/10 border border-rose-500/30">
                          {q.id}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400 font-mono text-[11px]">{q.learning_objective}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-500 text-[10px] flex items-center gap-1 font-mono">
                          <Calendar className="w-3 h-3" />
                          <span>{dateStr}</span>
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-200 leading-snug pt-0.5">
                        {q.stem}
                      </h3>

                      {del.reason && (
                        <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-300 space-y-0.5">
                          <span className="font-bold text-[10px] uppercase tracking-wider text-rose-400 font-mono">Motivo de eliminación:</span>
                          <p className="leading-snug">{del.reason}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={(e) => handleRestoreQuestion(del.id, e)}
                        className="px-3 py-1.5 rounded-xl border bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900 text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5"
                        title="Restaurar al banco activo"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restaurar</span>
                      </button>

                      <button className="text-slate-400 hover:text-white p-1">
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-rose-400" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="pt-4 mt-3 border-t border-slate-800 space-y-3 text-xs animate-fade-in" onClick={(e) => e.stopPropagation()}>
                      <div className="grid grid-cols-1 gap-2">
                        {q.options.map((opt) => (
                          <div
                            key={opt.id}
                            className={`p-3 rounded-xl border flex items-start gap-3 ${
                              opt.is_correct
                                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                                : 'bg-[#091224] border-slate-800 text-slate-400'
                            }`}
                          >
                            <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                              opt.is_correct ? 'bg-emerald-500 text-white shadow-sm' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {opt.id}
                            </span>
                            <span className="pt-0.5 text-sm">{opt.text}</span>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-3">
                        <span className="font-bold text-slate-300 uppercase tracking-wide text-[11px]">Explicación:</span>
                        <FormattedText text={q.explanation.text} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      ) : activeTab === 'review' ? (
        /* Lista de Preguntas Reportadas para Auditoría */
        <div className="space-y-3">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-14 bg-[#0e1933] border border-slate-800 rounded-2xl space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <p className="font-semibold text-sm text-slate-300">¡No hay preguntas pendientes de revisión!</p>
              <p className="text-xs text-slate-500">Puedes reportar cualquier reactivo usando el botón "Revisión" durante tests o flashcards.</p>
            </div>
          ) : (
            filteredReviews.map((rev) => {
              const q = rev.question;
              const isExpanded = expandedId === rev.id;
              const dateStr = new Date(rev.requestedAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={rev.id}
                  onClick={() => setExpandedId(isExpanded ? null : rev.id)}
                  className={`bg-[#0e1933] border rounded-2xl p-4 transition-all duration-200 cursor-pointer shadow-md ${
                    isExpanded ? 'border-amber-500/50 bg-[#16203b]' : 'border-amber-500/30 hover:border-amber-500/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-amber-400 font-bold text-xs px-2.5 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/30">
                          {q.id}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400 font-mono text-[11px]">{q.learning_objective}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-500 text-[10px] flex items-center gap-1 font-mono">
                          <Calendar className="w-3 h-3" />
                          <span>{dateStr}</span>
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-white leading-snug pt-0.5">
                        {q.stem}
                      </h3>

                      {/* Reason & Observation Badge */}
                      <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-amber-300 text-[11px]">
                          <span>{rev.reasonCategory}</span>
                        </div>
                        {rev.comment && (
                          <p className="text-slate-300 text-[11px] leading-relaxed italic">
                            "{rev.comment}"
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={(e) => handleRemoveReview(rev.id, e)}
                        className="px-3 py-1.5 rounded-xl border bg-slate-800/80 border-slate-700 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5"
                        title="Marcar como resuelta / Quitar de la lista de revisión"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Resolver</span>
                      </button>

                      <button className="text-slate-400 hover:text-white p-1">
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-amber-400" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="pt-4 mt-3 border-t border-slate-800 space-y-3 text-xs animate-fade-in" onClick={(e) => e.stopPropagation()}>
                      <div className="grid grid-cols-1 gap-2">
                        {q.options.map((opt) => (
                          <div
                            key={opt.id}
                            className={`p-3 rounded-xl border flex items-start gap-3 ${
                              opt.is_correct
                                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                                : 'bg-[#091224] border-slate-800 text-slate-400'
                            }`}
                          >
                            <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                              opt.is_correct ? 'bg-emerald-500 text-white shadow-sm' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {opt.id}
                            </span>
                            <span className="pt-0.5 text-sm">{opt.text}</span>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-3">
                        <span className="font-bold text-slate-300 uppercase tracking-wide text-[11px]">Explicación Actual:</span>
                        <FormattedText text={q.explanation.text} />
                        {q.explanation.references && (
                          <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2">
                            {q.explanation.references.map((ref, idx) => (
                              <span key={idx} className="font-mono text-[11px] text-sky-400 bg-[#091224] px-2.5 py-1 rounded-lg border border-sky-500/20">
                                📌 {ref}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      ) : (
        /* Lista General de Preguntas Activas */
        <div className="space-y-3">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-14 bg-[#0e1933] border border-slate-800 rounded-2xl space-y-2">
              <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="font-semibold text-sm text-slate-300">No se encontraron preguntas en esta categoría/filtro.</p>
              <p className="text-xs text-slate-500">Prueba cambiando la pestaña o el término de búsqueda.</p>
            </div>
          ) : (
            filteredQuestions.map((q) => {
              const stats = statsMap[q.id];
              const isExpanded = expandedId === q.id;
              const hasStats = stats && stats.timesAnswered > 0;
              const accuracy = hasStats 
                ? Math.round((stats.timesCorrect / stats.timesAnswered) * 100) 
                : null;

              return (
                <div 
                  key={q.id}
                  onClick={() => setExpandedId(isExpanded ? null : q.id)}
                  className={`bg-[#0e1933] border rounded-2xl p-4 transition-all duration-200 cursor-pointer shadow-md ${
                    isExpanded ? 'border-sky-400/50 bg-[#0f1d3d]' : 'border-sky-500/20 hover:border-sky-500/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-sky-400 font-bold text-xs px-2.5 py-0.5 rounded-lg bg-sky-500/10 border border-sky-500/20">
                          {q.id}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400 font-mono text-[11px]">{q.learning_objective}</span>
                        {isFlashcardEligible(q) && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                            ⚡ Flashcard
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-white leading-snug pt-0.5">
                        {q.stem}
                      </h3>
                    </div>

                    {/* Individual Question Stats Badge & Actions (Review, Flag, Delete) */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {hasStats ? (
                        <div className="text-right mr-1">
                          <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                            accuracy! >= 75
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                          }`}>
                            {accuracy}%
                          </span>
                          <div className="text-[11px] font-mono text-slate-400 mt-1">
                            <span className="text-emerald-400 font-bold">{stats.timesCorrect}✓</span> / <span className="text-rose-400 font-bold">{stats.timesIncorrect}✗</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 mr-1">
                          NO VISTA
                        </span>
                      )}

                      <button
                        onClick={(e) => handleOpenReviewModal(q, e)}
                        className="p-2 rounded-xl border bg-[#091224] border-slate-700 text-slate-400 hover:text-amber-300 hover:border-amber-500/50 hover:bg-amber-950/40 transition-colors"
                        title="Reportar pregunta para revisión / auditoría técnica"
                      >
                        <Search className="w-4 h-4" />
                      </button>

                      <button
                        onClick={(e) => handleToggleFlag(q.id, e)}
                        className={`p-2 rounded-xl border transition-colors ${
                          stats?.isFlagged
                            ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                            : 'bg-[#091224] border-slate-700 text-slate-400 hover:text-white'
                        }`}
                        title="Marcar pregunta"
                      >
                        <Bookmark className={`w-4 h-4 ${stats?.isFlagged ? 'fill-current' : ''}`} />
                      </button>

                      <button
                        onClick={(e) => handleOpenDeleteModal(q, e)}
                        className="p-2 rounded-xl border bg-[#091224] border-slate-700 text-slate-400 hover:text-rose-400 hover:border-rose-500/50 hover:bg-rose-950/40 transition-colors"
                        title="Eliminar del banco de preguntas"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <button className="text-slate-400 hover:text-white p-1">
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-sky-400" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-slate-800 space-y-3 text-xs animate-fade-in" onClick={(e) => e.stopPropagation()}>
                      <div className="grid grid-cols-1 gap-2">
                        {q.options.map((opt) => (
                          <div 
                            key={opt.id}
                            className={`p-3 rounded-xl border flex items-start gap-3 ${
                              opt.is_correct
                                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                                : 'bg-[#091224] border-slate-800 text-slate-300'
                            }`}
                          >
                            <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                              opt.is_correct ? 'bg-emerald-500 text-white shadow-sm' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {opt.id}
                            </span>
                            <span className="pt-0.5 text-sm">{opt.text}</span>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-3">
                        <span className="font-bold text-slate-300 uppercase tracking-wide text-[11px]">Explicación Técnica:</span>
                        <FormattedText text={q.explanation.text} />

                        {getPlanningMinimaTableType(q) && (
                          <PlanningMinimaTable type={getPlanningMinimaTableType(q)!} />
                        )}

                        {getSpeedSummaryTableType(q) && (
                          <SpeedSummaryTable
                            aircraftType={getSpeedSummaryTableType(q)}
                          />
                        )}

                        {q.explanation.references && (
                          <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2">
                            {q.explanation.references.map((ref, idx) => (
                              <span key={idx} className="font-mono text-[11px] text-sky-400 bg-[#091224] px-2.5 py-1 rounded-lg border border-sky-500/20">
                                📌 {ref}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        question={questionToDelete}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setQuestionToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
      />

      {/* Review Request Modal */}
      <ReviewRequestModal
        isOpen={isReviewModalOpen}
        question={questionToReview}
        onClose={() => {
          setIsReviewModalOpen(false);
          setQuestionToReview(null);
        }}
        onSubmitSuccess={() => {
          fetchReviews();
        }}
      />

    </div>
  );
};
