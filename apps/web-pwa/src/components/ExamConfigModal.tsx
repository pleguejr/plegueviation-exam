import React, { useState, useEffect } from 'react';
import { X, Play, BookOpen, Clock, Award, Target, AlertTriangle, Shuffle, Bookmark, Check, Sparkles, Flame, ChevronDown, ChevronRight, Layers, CheckSquare, Square } from 'lucide-react';
import { BankManifest, ExamConfig, ExamMode, ExamSelectionStrategy } from '../types';

interface ExamConfigModalProps {
  manifest: BankManifest | null;
  isOpen: boolean;
  onClose: () => void;
  onStartExam: (config: ExamConfig) => void;
  defaultCategory?: string;
  defaultSubtopics?: string[];
  defaultMode?: ExamMode;
  defaultStrategy?: ExamSelectionStrategy;
}

export const ExamConfigModal: React.FC<ExamConfigModalProps> = ({
  manifest,
  isOpen,
  onClose,
  onStartExam,
  defaultCategory,
  defaultSubtopics,
  defaultMode = 'practice',
  defaultStrategy = 'random'
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    defaultCategory ? [defaultCategory] : []
  );
  const [selectedSubtopics, setSelectedSubtopics] = useState<string[]>(
    defaultSubtopics ? defaultSubtopics : []
  );
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(() => {
    return defaultCategory ? { [defaultCategory]: true } : {};
  });
  const [mode, setMode] = useState<ExamMode>(defaultMode);
  const [strategy, setStrategy] = useState<ExamSelectionStrategy>(defaultStrategy);
  const [count, setCount] = useState<number>(20);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(20);

  // Sync state whenever modal is opened with new defaults
  useEffect(() => {
    if (isOpen) {
      setSelectedCategories(defaultCategory ? [defaultCategory] : []);
      setSelectedSubtopics(defaultSubtopics ? defaultSubtopics : []);
      setExpandedCategories(defaultCategory ? { [defaultCategory]: true } : {});
      setMode(defaultMode);
      setStrategy(defaultStrategy);
    }
  }, [isOpen, defaultCategory, defaultSubtopics, defaultMode, defaultStrategy]);

  if (!isOpen) return null;

  const categories = manifest?.categories || [];

  const toggleCategory = (catId: string) => {
    if (selectedCategories.includes(catId)) {
      // Deseleccionar categoría: removemos la categoría y sus subtemas
      const nextCategories = selectedCategories.filter((id) => id !== catId);
      setSelectedCategories(nextCategories);
      
      const cat = categories.find((c) => c.id === catId);
      if (cat && cat.subtopics) {
        const catSubIds = Object.keys(cat.subtopics);
        setSelectedSubtopics(selectedSubtopics.filter((subId) => !catSubIds.includes(subId)));
      }
    } else {
      // Seleccionar categoría
      setSelectedCategories([...selectedCategories, catId]);
      // Auto-expandir para que el usuario pueda ver/seleccionar subdivisiones inmediatamente
      setExpandedCategories((prev) => ({ ...prev, [catId]: true }));
    }
  };

  const toggleCategoryExpand = (catId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCategories((prev) => ({ ...prev, [catId]: !prev[catId] }));
  };

  const toggleSubtopic = (subId: string, catId: string) => {
    // Si la categoría no está seleccionada, al elegir un subtema seleccionamos la categoría
    if (!selectedCategories.includes(catId)) {
      setSelectedCategories([...selectedCategories, catId]);
    }

    if (selectedSubtopics.includes(subId)) {
      setSelectedSubtopics(selectedSubtopics.filter((id) => id !== subId));
    } else {
      setSelectedSubtopics([...selectedSubtopics, subId]);
    }
  };

  const selectAllSubtopicsOfCategory = (catId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const cat = categories.find((c) => c.id === catId);
    if (!cat || !cat.subtopics) return;
    
    if (!selectedCategories.includes(catId)) {
      setSelectedCategories([...selectedCategories, catId]);
    }

    const subIds = Object.keys(cat.subtopics);
    // Unir sin duplicados
    const newSubtopics = Array.from(new Set([...selectedSubtopics, ...subIds]));
    setSelectedSubtopics(newSubtopics);
  };

  const clearSubtopicsOfCategory = (catId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const cat = categories.find((c) => c.id === catId);
    if (!cat || !cat.subtopics) return;

    const subIds = Object.keys(cat.subtopics);
    setSelectedSubtopics(selectedSubtopics.filter((id) => !subIds.includes(id)));
  };

  const selectAllCategories = () => {
    setSelectedCategories(categories.map((c) => c.id));
    setSelectedSubtopics([]);
  };

  const clearCategories = () => {
    setSelectedCategories([]);
    setSelectedSubtopics([]);
  };

  const handleApplyPreset = (preset: 'command_course' | 'command_all' | 'fleet_e2' | 'fleet_c172f' | 'fleet_da40d' | 'netjets_stage2' | 'all') => {
    if (preset === 'command_course') {
      setSelectedCategories(['command-upgrade']);
      setSelectedSubtopics(['command-course', 'examen-convocatoria-anterior']);
      setExpandedCategories({ 'command-upgrade': true });
      setCount(50);
    } else if (preset === 'command_all') {
      setSelectedCategories(['command-upgrade']);
      setSelectedSubtopics([]);
      setExpandedCategories({ 'command-upgrade': true });
      setCount(30);
    } else if (preset === 'fleet_e2') {
      setSelectedCategories(['fleet-e195e2']);
      setSelectedSubtopics([]);
      setExpandedCategories({ 'fleet-e195e2': true });
      setCount(20);
    } else if (preset === 'fleet_c172f') {
      setSelectedCategories(['fleet-c172f']);
      setSelectedSubtopics([]);
      setExpandedCategories({ 'fleet-c172f': true });
      setCount(30);
    } else if (preset === 'fleet_da40d') {
      setSelectedCategories(['fleet-da40d']);
      setSelectedSubtopics([]);
      setExpandedCategories({ 'fleet-da40d': true });
      setCount(30);
    } else if (preset === 'netjets_stage2') {
      setSelectedCategories(['netjets-interview']);
      setSelectedSubtopics([]);
      setExpandedCategories({ 'netjets-interview': true });
      setCount(25);
    } else {
      setSelectedCategories([]);
      setSelectedSubtopics([]);
      setCount(20);
    }
  };

  const handleStart = () => {
    const config: ExamConfig = {
      categories: selectedCategories,
      subtopics: selectedSubtopics.length > 0 ? selectedSubtopics : undefined,
      count,
      mode,
      strategy,
      timeLimitMinutes: mode === 'simulation' ? timeLimitMinutes : undefined,
      passMarkPercentage: 75
    };
    onStartExam(config);
  };

  // Calcular cantidad estimada de preguntas disponibles con el filtro actual
  let availableQuestionPool = 0;
  for (const cat of categories) {
    const isCatSelected = selectedCategories.length === 0 || selectedCategories.includes(cat.id);
    if (!isCatSelected) continue;

    if (cat.subtopics) {
      const subEntries = Object.entries(cat.subtopics);
      const activeSubsInCat = subEntries.filter(([subId]) => selectedSubtopics.includes(subId));
      if (selectedSubtopics.length > 0) {
        // Si hay subtemas seleccionados en general, sumar solo los subtemas activos de esta cat
        for (const [, subInfo] of activeSubsInCat) {
          availableQuestionPool += subInfo.count || 0;
        }
      } else {
        // Si no hay filtro de subtemas, suma todo el total
        availableQuestionPool += cat.total_questions || 0;
      }
    } else {
      if (selectedSubtopics.length === 0) {
        availableQuestionPool += cat.total_questions || 0;
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="exam-config-modal-card bg-[#0b142b] border border-sky-500/30 rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden shadow-glow-sky">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-[#080f21]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-sky-600 to-teal-400 text-white shadow-glow-sky">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">Configurar Evaluación</h2>
              <p className="text-xs text-slate-400">Selecciona bancos, subdivisiones temáticas y modo de examen</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
          
          {/* 1. Modo de Estudio */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <span>1. Modo de Estudio</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              <button
                type="button"
                onClick={() => setMode('practice')}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  mode === 'practice'
                    ? 'bg-sky-950/60 border-sky-400 text-white ring-2 ring-sky-400 shadow-glow-sky'
                    : 'bg-cockpit-surface/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-sky-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Práctica
                  </span>
                  {mode === 'practice' && <Check className="w-4 h-4 text-sky-400" />}
                </div>
                <p className="mt-2 text-xs text-slate-300">
                  Feedback y explicaciones inmediatas con referencias al manual.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setMode('simulation')}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  mode === 'simulation'
                    ? 'bg-emerald-950/60 border-emerald-400 text-white ring-2 ring-emerald-400 shadow-glow-emerald'
                    : 'bg-cockpit-surface/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-emerald-400 flex items-center gap-1.5">
                    <Award className="w-4 h-4" /> Examen Oficial
                  </span>
                  {mode === 'simulation' && <Check className="w-4 h-4 text-emerald-400" />}
                </div>
                <p className="mt-2 text-xs text-slate-300">
                  Cronometrado, sin feedback hasta terminar y umbral del 75% (EASA).
                </p>
              </button>

              <button
                type="button"
                onClick={() => setMode('smart_review')}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  mode === 'smart_review'
                    ? 'bg-rose-950/60 border-rose-400 text-white ring-2 ring-rose-400 shadow-glow-rose'
                    : 'bg-cockpit-surface/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-rose-400 flex items-center gap-1.5">
                    <Flame className="w-4 h-4" /> Modo Revisión & Falladas
                  </span>
                  {mode === 'smart_review' && <Check className="w-4 h-4 text-rose-400" />}
                </div>
                <p className="mt-2 text-xs text-slate-300">
                  Enfocado exclusivamente en tus errores, dudas y puntos débiles.
                </p>
              </button>

            </div>
          </div>

          {/* 2. Estrategia de Selección */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <span>2. Algoritmo de Selección</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              
              <button
                type="button"
                onClick={() => setStrategy('random')}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  strategy === 'random'
                    ? 'bg-sky-500/20 border-sky-400 text-white shadow-glow-sky'
                    : 'bg-cockpit-surface/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Shuffle className="w-4 h-4 text-sky-400" />
                Aleatorio
              </button>

              <button
                type="button"
                onClick={() => setStrategy('unseen')}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  strategy === 'unseen'
                    ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-glow-emerald'
                    : 'bg-cockpit-surface/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
                title="No dejar preguntas atrás"
              >
                <Target className="w-4 h-4 text-emerald-400" />
                No Vistas
              </button>

              <button
                type="button"
                onClick={() => setStrategy('most_failed')}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  strategy === 'most_failed'
                    ? 'bg-rose-500/20 border-rose-400 text-white shadow-glow-rose'
                    : 'bg-cockpit-surface/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                Más Falladas
              </button>

              <button
                type="button"
                onClick={() => setStrategy('flagged')}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  strategy === 'flagged'
                    ? 'bg-amber-500/20 border-amber-400 text-white shadow-glow-amber'
                    : 'bg-cockpit-surface/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Bookmark className="w-4 h-4 text-amber-400" />
                Marcadas
              </button>

            </div>
          </div>

          {/* 3. Selección de Asignaturas, Flotas y Subdivisiones */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>3. Bancos y Subdivisiones ({selectedCategories.length === 0 ? 'Todos los bancos' : `${selectedCategories.length} banco(s)`})</span>
                </label>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Haz clic en el banco para seleccionarlo, o despliega sus <strong>subdivisiones</strong> (ej. Emergencias, Limitaciones, Operación Normal, Sistemas).
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold">
                <button 
                  type="button" 
                  onClick={selectAllCategories}
                  className="text-sky-400 hover:underline"
                >
                  Seleccionar Todos
                </button>
                <span className="text-slate-700">|</span>
                <button 
                  type="button" 
                  onClick={clearCategories}
                  className="text-slate-400 hover:underline"
                >
                  Limpiar
                </button>
              </div>
            </div>

            {/* Quick Presets Bar */}
            <div className="flex flex-wrap gap-2 pb-1">
              <button
                type="button"
                onClick={() => handleApplyPreset('fleet_c172f')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  selectedCategories.length === 1 && selectedCategories.includes('fleet-c172f') && selectedSubtopics.length === 0
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-glow-amber'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                Cessna 172F (EC-NNX)
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('fleet_da40d')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  selectedCategories.length === 1 && selectedCategories.includes('fleet-da40d') && selectedSubtopics.length === 0
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-glow-cyan'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                Diamond DA40 TDI (EC-OKC)
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('command_course')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                  selectedCategories.includes('command-upgrade') && selectedSubtopics.includes('command-course')
                    ? 'bg-rose-500/20 text-rose-300 border-rose-400 shadow-glow-rose'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>Command Course (90q)</span>
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('fleet_e2')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  selectedCategories.length === 1 && selectedCategories.includes('fleet-e195e2')
                    ? 'bg-sky-500/20 text-sky-300 border-sky-400 shadow-glow-sky'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                Flota E195-E2
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('netjets_stage2')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  selectedCategories.length === 1 && selectedCategories.includes('netjets-interview') && selectedSubtopics.length === 0
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-glow-amber'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                NetJets Stage 2
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  selectedCategories.length === 0 && selectedSubtopics.length === 0
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                Todo el Banco
              </button>
            </div>

            {/* Aviso de subtemas seleccionados */}
            {selectedSubtopics.length > 0 && (
              <div className="p-3 rounded-2xl bg-sky-950/40 border border-sky-500/40 text-xs text-sky-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>
                    Filtro activo por <strong>{selectedSubtopics.length} subdivisión(es)</strong> específica(s).
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSubtopics([])}
                  className="text-[11px] font-black underline text-sky-400 hover:text-sky-300 px-2 py-0.5 rounded"
                >
                  Quitar filtros y evaluar banco completo
                </button>
              </div>
            )}

            {/* Lista de Bancos con Acordeón de Subdivisiones */}
            <div className="space-y-2.5">
              {categories.map((cat) => {
                const isCatSelected = selectedCategories.includes(cat.id) || selectedCategories.length === 0;
                const isExpanded = !!expandedCategories[cat.id];
                const subtopicsList = cat.subtopics ? Object.values(cat.subtopics) : [];
                
                // Contar cuántos subtemas de esta categoría están marcados
                const catSubIds = subtopicsList.map((s) => s.id);
                const selectedInCatCount = catSubIds.filter((sId) => selectedSubtopics.includes(sId)).length;
                const hasPartialSubtopics = selectedInCatCount > 0 && selectedInCatCount < catSubIds.length;
                const hasAllSubtopics = catSubIds.length > 0 && selectedInCatCount === catSubIds.length;

                return (
                  <div
                    key={cat.id}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      selectedCategories.includes(cat.id)
                        ? 'bg-[#0e1b38] border-sky-400/80 shadow-glow-sky'
                        : selectedCategories.length === 0
                        ? 'bg-cockpit-surface/60 border-slate-800 text-slate-200 hover:border-slate-700'
                        : 'bg-slate-950/30 border-slate-900 text-slate-500 opacity-60'
                    }`}
                  >
                    {/* Fila Principal de la Categoría */}
                    <div 
                      onClick={() => toggleCategory(cat.id)}
                      className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        {subtopicsList.length > 0 && (
                          <button
                            type="button"
                            onClick={(e) => toggleCategoryExpand(cat.id, e)}
                            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            title={isExpanded ? 'Ocultar subdivisiones' : 'Ver subdivisiones'}
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-sky-400" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            )}
                          </button>
                        )}
                        <span className="text-xs font-extrabold text-white truncate">
                          {cat.title}
                        </span>
                        {selectedInCatCount > 0 && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40">
                            {selectedInCatCount}/{catSubIds.length} subtemas
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-lg bg-slate-800 text-sky-400 font-extrabold border border-slate-700">
                          {cat.total_questions}q
                        </span>
                        <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                          selectedCategories.includes(cat.id)
                            ? 'bg-sky-500 border-sky-400 text-white'
                            : 'border-slate-700 bg-slate-900/50 text-transparent'
                        }`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    </div>

                    {/* Subdivisiones Temáticas (Acordeón desplegable) */}
                    {isExpanded && subtopicsList.length > 0 && (
                      <div className="px-4 py-3 bg-[#081024] border-t border-slate-800/80 space-y-2.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <span>Subdivisiones disponibles ({subtopicsList.length}):</span>
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={(e) => selectAllSubtopicsOfCategory(cat.id, e)}
                              className="text-sky-400 hover:text-sky-300 font-bold hover:underline"
                            >
                              Marcar todas
                            </button>
                            <span className="text-slate-700">·</span>
                            <button
                              type="button"
                              onClick={(e) => clearSubtopicsOfCategory(cat.id, e)}
                              className="text-slate-400 hover:text-slate-300 font-bold hover:underline"
                            >
                              Desmarcar
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {subtopicsList.map((st) => {
                            const isSubSelected = selectedSubtopics.includes(st.id);
                            return (
                              <button
                                key={st.id}
                                type="button"
                                onClick={() => toggleSubtopic(st.id, cat.id)}
                                className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                                  isSubSelected
                                    ? 'bg-sky-500/20 border-sky-400 text-white shadow-sm'
                                    : 'bg-slate-900/80 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0 pr-1.5">
                                  <div className={`w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 transition-all ${
                                    isSubSelected
                                      ? 'bg-sky-500 border-sky-400 text-white'
                                      : 'border-slate-700 bg-slate-950 text-transparent'
                                  }`}>
                                    <Check className="w-3 h-3 stroke-[3]" />
                                  </div>
                                  <span className="text-xs font-bold truncate">
                                    {st.title}
                                  </span>
                                </div>
                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-bold flex-shrink-0">
                                  {st.count}q
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Cantidad de Preguntas y Tiempo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  Cantidad de Preguntas
                </label>
                {availableQuestionPool > 0 && (
                  <span className="text-[11px] text-slate-400 font-mono">
                    Pool: <strong className="text-sky-400">{availableQuestionPool}</strong> disp.
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {[10, 20, 30, 50].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setCount(num)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-black border transition-all ${
                      count === num
                        ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white border-sky-400 shadow-glow-sky'
                        : 'bg-cockpit-surface text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {mode === 'simulation' && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  Límite de Tiempo (Minutos)
                </label>
                <div className="flex items-center gap-2">
                  {[15, 20, 30, 45].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setTimeLimitMinutes(mins)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-black border transition-all ${
                        timeLimitMinutes === mins
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400 shadow-glow-emerald'
                          : 'bg-cockpit-surface text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-[#080f21] flex items-center justify-between">
          <div className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Umbral EASA: <strong className="text-emerald-400">75%</strong></span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleStart}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white shadow-glow-sky active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Comenzar Evaluación</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
