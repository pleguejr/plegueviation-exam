import React, { useState } from 'react';
import { X, Play, BookOpen, Clock, Award, Target, AlertTriangle, Shuffle, Bookmark, Check, Sparkles, Flame } from 'lucide-react';
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
  const [mode, setMode] = useState<ExamMode>(defaultMode);
  const [strategy, setStrategy] = useState<ExamSelectionStrategy>(defaultStrategy);
  const [count, setCount] = useState<number>(20);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(20);

  if (!isOpen) return null;

  const categories = manifest?.categories || [];

  const toggleCategory = (catId: string) => {
    setSelectedSubtopics([]); // Reset subtopic filter when changing categories
    if (selectedCategories.includes(catId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== catId));
    } else {
      setSelectedCategories([...selectedCategories, catId]);
    }
  };

  const selectAllCategories = () => {
    setSelectedCategories(categories.map((c) => c.id));
    setSelectedSubtopics([]);
  };

  const clearCategories = () => {
    setSelectedCategories([]);
    setSelectedSubtopics([]);
  };

  const handleApplyPreset = (preset: 'command_course' | 'command_all' | 'fleet_e2' | 'all') => {
    if (preset === 'command_course') {
      setSelectedCategories(['command-upgrade']);
      setSelectedSubtopics(['command-course', 'examen-convocatoria-anterior']);
      setCount(50);
    } else if (preset === 'command_all') {
      setSelectedCategories(['command-upgrade']);
      setSelectedSubtopics([]);
      setCount(30);
    } else if (preset === 'fleet_e2') {
      setSelectedCategories(['fleet-e195e2']);
      setSelectedSubtopics([]);
      setCount(30);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="exam-config-modal-card bg-[#0b142b] border border-sky-500/30 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden shadow-glow-sky">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-[#080f21]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-sky-600 to-teal-400 text-white shadow-glow-sky">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">Configurar Evaluación</h2>
              <p className="text-xs text-slate-400">Personaliza los temas, modo y algoritmo de selección</p>
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

          {/* 3. Selección de Asignaturas / Manuales */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-sky-400">
                3. Manuales y Temas ({selectedCategories.length === 0 ? 'Todos seleccionados' : `${selectedCategories.length} seleccionados`})
              </label>
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
                onClick={() => handleApplyPreset('command_course')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                  selectedCategories.includes('command-upgrade') && selectedSubtopics.includes('examen-convocatoria-anterior')
                    ? 'bg-rose-500/20 text-rose-300 border-rose-400 shadow-glow-rose'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>Command Course (90q)</span>
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('command_all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  selectedCategories.length === 1 && selectedCategories.includes('command-upgrade') && selectedSubtopics.length === 0
                    ? 'bg-rose-500/20 text-rose-300 border-rose-400 shadow-glow-rose'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                Prueba Mando Completa
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
                onClick={() => handleApplyPreset('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  selectedCategories.length === 0
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                Todo el Banco
              </button>
            </div>

            {selectedSubtopics.length > 0 && (
              <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-200 flex items-center justify-between">
                <span>Filtro específico: <strong>Command Course / Examen Convocatoria Anterior</strong> (90 preguntas)</span>
                <button
                  type="button"
                  onClick={() => setSelectedSubtopics([])}
                  className="text-[10px] font-bold underline text-rose-400 hover:text-rose-300"
                >
                  Quitar filtro subtema
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {categories.map((cat) => {
                const isSelected = selectedCategories.includes(cat.id) || selectedCategories.length === 0;
                return (
                  <div
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      selectedCategories.includes(cat.id)
                        ? 'bg-sky-500/20 border-sky-400 text-white shadow-glow-sky'
                        : selectedCategories.length === 0
                        ? 'bg-cockpit-surface/60 border-slate-800 text-slate-200 hover:border-slate-700'
                        : 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-50'
                    }`}
                  >
                    <span className="text-xs font-bold pr-2 truncate">{cat.title}</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-lg bg-slate-800 text-sky-400 font-extrabold flex-shrink-0 border border-slate-700">
                      {cat.total_questions}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Cantidad de Preguntas y Tiempo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Cantidad de Preguntas
              </label>
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
