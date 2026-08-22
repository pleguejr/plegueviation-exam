import React, { useState, useEffect } from 'react';
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
  Calendar
} from 'lucide-react';
import { Question, QuestionStats, BankManifest, DeletedQuestion } from '../types';
import { toggleQuestionFlag } from '../services/db';
import { deleteQuestionFromBank, restoreQuestionToBank, loadDeletedQuestions } from '../services/questionsService';
import { SpeedSummaryTable } from './SpeedSummaryTable';
import { PlanningMinimaTable } from './PlanningMinimaTable';
import { FormattedText } from './FormattedText';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { getSpeedSummaryTableType, getPlanningMinimaTableType } from '../utils/aircraftRules';

interface QuestionExplorerProps {
  questions: Question[];
  statsMap: Record<string, QuestionStats>;
  manifest: BankManifest | null;
  onRefreshStats: () => void;
  onStartCustomQuiz: (questionIds: string[]) => void;
  onGoToDashboard: () => void;
}

export const QuestionExplorer: React.FC<QuestionExplorerProps> = ({
  questions,
  statsMap,
  manifest,
  onRefreshStats,
  onStartCustomQuiz,
  onGoToDashboard
}) => {
  const [activeTab, setActiveTab] = useState<'difficult' | 'search' | 'flagged' | 'unseen' | 'deleted'>('search');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  // Deleted questions state
  const [deletedList, setDeletedList] = useState<DeletedQuestion[]>([]);
  const [questionToDelete, setQuestionToDelete] = useState<Question | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchDeleted = async () => {
    const list = await loadDeletedQuestions();
    setDeletedList(list || []);
  };

  useEffect(() => {
    fetchDeleted();
  }, []);

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
    }

    // 2. Search term
    const matchesSearch = 
      q.stem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.learning_objective.toLowerCase().includes(searchTerm.toLowerCase());

    // 3. Category
    const matchesCategory = 
      selectedCategory === 'all' || 
      q._category === selectedCategory || 
      q.subject_id === selectedCategory;

    return matchesSearch && matchesCategory;
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

    return matchesSearch && matchesCategory;
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

        {activeTab !== 'deleted' && filteredQuestions.length > 0 && (
          <button
            onClick={() => onStartCustomQuiz(filteredQuestions.map((q) => q.id))}
            className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-glow-sky transition-all active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Practicar Selección ({filteredQuestions.length})</span>
          </button>
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

      {/* 2. Sub-tabs estilo AviationExam: Difficult | Search | Flagged | Unseen | Eliminadas */}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-sky-400" />
            <input
              type="text"
              placeholder={activeTab === 'deleted' ? 'Buscar en eliminadas por ID o motivo...' : 'Buscar por ID, palabra clave o tema...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#091224] border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-sky-400"
            />
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#091224] border border-slate-700 text-white text-xs focus:outline-none focus:border-sky-400"
            >
              <option value="all">
                {activeTab === 'deleted' ? `Todas las Categorías Eliminadas (${deletedList.length})` : `Todas las Categorías (${questions.length})`}
              </option>
              {manifest?.categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* 4. Questions List */}
      {activeTab === 'deleted' ? (
        <div className="space-y-3">
          {filteredDeleted.length === 0 ? (
            <div className="text-center py-14 bg-[#0e1933] border border-slate-800 rounded-2xl space-y-2">
              <Trash2 className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="font-semibold text-sm text-slate-300">No hay preguntas eliminadas registradas.</p>
              <p className="text-xs text-slate-500">Cuando descartes preguntas durante un examen o desde el explorador, se guardarán aquí.</p>
            </div>
          ) : (
            filteredDeleted.map((del) => {
              const q = del.question;
              const isExpanded = expandedId === q.id;
              const dateStr = new Date(del.deletedAt).toLocaleString('es-ES', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div 
                  key={q.id}
                  className="bg-[#0e1933] border border-rose-500/30 hover:border-rose-500/50 rounded-2xl p-5 shadow-md transition-all space-y-3"
                >
                  <div 
                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                    className="flex items-start justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-mono text-rose-400 font-bold px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/30">
                          {q.id}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400 font-mono text-[11px]">{q.learning_objective}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          <span>Eliminada: {dateStr}</span>
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-200 leading-snug pt-0.5 line-through opacity-80">
                        {q.stem}
                      </h3>

                      {del.reason && (
                        <div className="text-xs text-rose-300/90 font-medium bg-rose-950/40 p-2 rounded-lg border border-rose-500/20 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 text-rose-400" />
                          <span>Motivo: {del.reason}</span>
                        </div>
                      )}
                    </div>

                    {/* Restore Action Button */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={(e) => handleRestoreQuestion(q.id, e)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border bg-emerald-950/60 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900 text-xs font-bold transition-all shadow-sm active:scale-95"
                        title="Restaurar pregunta al banco activo"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restaurar</span>
                      </button>

                      <button className="text-slate-400 hover:text-white p-1">
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-rose-400" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details for Deleted Question */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-slate-800 space-y-3 text-xs animate-fade-in">
                      <div className="space-y-2">
                        {q.options.map((opt) => (
                          <div
                            key={opt.id}
                            className={`p-3 rounded-xl border flex items-start gap-3 ${
                              opt.is_correct
                                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
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
                  className="bg-[#0e1933] border border-sky-500/20 hover:border-sky-500/40 rounded-2xl p-5 shadow-md transition-all space-y-3"
                >
                  <div 
                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                    className="flex items-start justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-mono text-sky-400 font-bold px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20">
                          {q.id}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400 font-mono text-[11px]">{q.learning_objective}</span>
                      </div>

                      <h3 className="text-sm font-bold text-white leading-snug pt-0.5">
                        {q.stem}
                      </h3>
                    </div>

                    {/* Individual Question Stats Badge & Bookmark & Delete */}
                    <div className="flex items-center gap-2.5 flex-shrink-0">
                      {hasStats ? (
                        <div className="text-right">
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
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          NO VISTA
                        </span>
                      )}

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
                    <div className="pt-4 border-t border-slate-800 space-y-3 text-xs animate-fade-in">
                      <div className="space-y-2">
                        {q.options.map((opt) => (
                          <div
                            key={opt.id}
                            className={`p-3 rounded-xl border flex items-start gap-3 ${
                              opt.is_correct
                                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
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
                        
                        {/* Cuadro de Mínimos de Planificación o Combustible Binter MOA si aplica */}
                        {getPlanningMinimaTableType(q) === 'variaciones' && (
                          <PlanningMinimaTable type="variaciones" />
                        )}

                        {getPlanningMinimaTableType(q) === 'fuel_calls' && (
                          <PlanningMinimaTable type="fuel_calls" />
                        )}

                        {/* Cuadro Resumen de Velocidades estrictamente para flota ligera correspondiente */}
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

      {/* Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        question={questionToDelete}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setQuestionToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
      />

    </div>
  );
};

