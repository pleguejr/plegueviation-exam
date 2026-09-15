import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  RefreshCw, 
  Key, 
  Smartphone, 
  Tablet, 
  Monitor, 
  X, 
  Check, 
  AlertCircle, 
  BookOpen,
  HardDrive,
  Sparkles,
  ShieldCheck,
  Database
} from 'lucide-react';
import { 
  getStoredSyncPin, 
  setStoredSyncPin, 
  getLastSyncTimestamp, 
  getLastStorageBackend,
  syncWithCloud 
} from '../services/sync';

interface SyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSyncComplete?: () => void;
  totalQuestions?: number;
  onForceUpdate?: () => void;
  appVersion?: string;
}

export const SyncModal: React.FC<SyncModalProps> = ({
  isOpen,
  onClose,
  onSyncComplete,
  totalQuestions = 0,
  onForceUpdate,
  appVersion
}) => {
  const [pinInput, setPinInput] = useState('');
  const [currentPin, setCurrentPin] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<number | null>(null);
  const [storageBackend, setStorageBackend] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      const stored = getStoredSyncPin();
      setCurrentPin(stored);
      setPinInput(stored || '070707');
      setLastSync(getLastSyncTimestamp());
      setStorageBackend(getLastStorageBackend());
      setStatusMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveAndSync = async () => {
    const cleanPin = pinInput.trim().toLowerCase();
    if (!cleanPin) {
      setStatusMessage({ type: 'error', text: 'Por favor introduce un código PIN válido (ej: 070707).' });
      return;
    }

    setIsSyncing(true);
    setStatusMessage({ type: 'info', text: 'Sincronizando con la nube...' });

    setStoredSyncPin(cleanPin);
    setCurrentPin(cleanPin);

    const result = await syncWithCloud(cleanPin);
    setIsSyncing(false);

    if (result.success) {
      setLastSync(result.syncedAt || Date.now());
      setStorageBackend(result.storageBackend || getLastStorageBackend());
      setStatusMessage({ type: 'success', text: result.message || '✅ ¡Dispositivo enlazado y sincronizado con éxito!' });
      if (onSyncComplete) {
        onSyncComplete();
      }
    } else {
      setStatusMessage({ type: 'error', text: `❌ ${result.message}` });
    }
  };

  const handleForceSyncNow = async () => {
    if (!currentPin) return;
    setIsSyncing(true);
    setStatusMessage({ type: 'info', text: 'Sincronizando cambios con la nube...' });

    const result = await syncWithCloud(currentPin);
    setIsSyncing(false);

    if (result.success) {
      setLastSync(result.syncedAt || Date.now());
      setStorageBackend(result.storageBackend || getLastStorageBackend());
      setStatusMessage({ type: 'success', text: result.message || '✅ Sincronización completada.' });
      if (onSyncComplete) {
        onSyncComplete();
      }
    } else {
      setStatusMessage({ type: 'error', text: `❌ ${result.message}` });
    }
  };

  const handleUnlink = () => {
    if (confirm('¿Deseas desenlazar este dispositivo de la nube? Tus datos locales se conservarán intactos.')) {
      setStoredSyncPin('');
      setCurrentPin(null);
      setPinInput('');
      setStatusMessage({ type: 'info', text: 'Dispositivo desenlazado.' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-sans">
      <div className="bg-[#0e1933] border border-sky-500/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-500 flex items-center justify-center text-white shadow-glow-sky flex-shrink-0">
            <Cloud className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span>Sincronización Multi-Dispositivo</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                Cloud Sync
              </span>
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Enlaza tu iPad, iPhone y ordenador para compartir exámenes y progreso en tiempo real.
            </p>
          </div>
        </div>

        {/* System / PWA info (moved from dashboard hero) */}
        <div className="p-4 rounded-2xl bg-[#091224] border border-emerald-500/25 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-black text-emerald-300 leading-snug">
                Plegueviation Exam — Sistema Operacional Binter Canarias
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Binter Airlines (MOA/MOB) · Flota E195-E2 · C172N · P2010 TDI · EASA & SERA
                {appVersion ? ` · v${appVersion}` : ''}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] font-mono">
            <span className="px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold">
              ⚠️ Offline (IndexedDB)
            </span>
            <span className="px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold">
              {totalQuestions} Reactivos Oficiales
            </span>
            <span className="px-2 py-1 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-300 font-bold">
              ⚡ Flashcards Activas
            </span>
          </div>
          {onForceUpdate && (
            <button
              type="button"
              onClick={onForceUpdate}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-black shadow-md border border-emerald-400/30 active:scale-[0.98] transition-all"
              title="Limpiar caché de la PWA y forzar descarga de la última versión"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Actualizar PWA a la Última Versión
            </button>
          )}
        </div>

        {/* Question creation process */}
        <div className="sync-qcreate-card p-4 rounded-2xl bg-[#091224] border border-violet-500/30 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-violet-500/15 border border-violet-500/35 flex items-center justify-center text-violet-300 flex-shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-black text-violet-200 leading-snug">
                Flujo de creación de preguntas
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                Cómo entra un lote nuevo al banco oficial y llega a tus dispositivos (cero invención; solo manuales).
              </p>
            </div>
          </div>

          <ol className="space-y-2.5 text-[11px] text-slate-300 leading-relaxed">
            <li className="flex gap-2.5">
              <span className="sync-qcreate-step flex-shrink-0 w-6 h-6 rounded-lg bg-violet-500/20 border border-violet-500/40 text-violet-200 font-black flex items-center justify-center text-[10px]">1</span>
              <span>
                <HardDrive className="w-3 h-3 inline-block mr-1 text-violet-300 align-text-bottom" />
                <strong className="text-violet-100">Fuente:</strong> PDF del manual solo en Google Drive <span className="font-mono text-violet-200/90">Antigravity/manuales/</span> (nunca en GitHub).
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="sync-qcreate-step flex-shrink-0 w-6 h-6 rounded-lg bg-violet-500/20 border border-violet-500/40 text-violet-200 font-black flex items-center justify-center text-[10px]">2</span>
              <span>
                <Sparkles className="w-3 h-3 inline-block mr-1 text-violet-300 align-text-bottom" />
                <strong className="text-violet-100">Generar:</strong> NotebookLM/Gemini + Metaprompt (capítulo acotado) → JSON con 1 correcta + 3 distractores reales y cita con página.
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="sync-qcreate-step flex-shrink-0 w-6 h-6 rounded-lg bg-violet-500/20 border border-violet-500/40 text-violet-200 font-black flex items-center justify-center text-[10px]">3</span>
              <span>
                <ShieldCheck className="w-3 h-3 inline-block mr-1 text-violet-300 align-text-bottom" />
                <strong className="text-violet-100">Auditar:</strong> skills TRE (fidelidad + distractores) → Antigravity valida schema → carpeta <span className="font-mono text-violet-200/90">banks/</span>.
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="sync-qcreate-step flex-shrink-0 w-6 h-6 rounded-lg bg-violet-500/20 border border-violet-500/40 text-violet-200 font-black flex items-center justify-center text-[10px]">4</span>
              <span>
                <Database className="w-3 h-3 inline-block mr-1 text-violet-300 align-text-bottom" />
                <strong className="text-violet-100">Publicar:</strong> <span className="font-mono">build:banks</span> → push GitHub → Vercel → al abrir la app con el mismo PIN, el lote queda offline en IndexedDB (también flashcards numéricas/acrónimos).
              </span>
            </li>
          </ol>

          <p className="text-[10px] text-slate-500 leading-relaxed border-t border-violet-500/20 pt-2.5">
            Atajo en iPad: <strong className="text-slate-400">Importar IA</strong> / Comunicados pega JSON al banco personal. Para el catálogo oficial del repo, siempre el paso 3–4.
          </p>
        </div>

        {/* PIN Configuration Box */}
        <div className="p-5 rounded-2xl bg-[#091224] border border-sky-500/30 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5" />
              <span>Tu PIN / Código de Enlace</span>
            </label>
            {currentPin && (
              <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Enlazado</span>
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="Ej: 070707"
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 placeholder:text-slate-600"
            />
            <button
              onClick={handleSaveAndSync}
              disabled={isSyncing || !pinInput.trim()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold shadow-glow-sky disabled:opacity-40 transition-all flex items-center gap-1.5 active:scale-95"
            >
              {isSyncing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              <span>{currentPin ? 'Actualizar' : 'Vincular'}</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            💡 <strong>Instrucciones sencillas</strong>: Pon este mismo PIN en tu <strong>iPad</strong>, <strong>iPhone</strong> y <strong>PC</strong>. Cada vez que hagas un examen o abras la app, tus estadísticas se sincronizarán solas.
          </p>
        </div>

        {/* Sync Status & Force Sync Button */}
        {currentPin && (
          <div className="p-4 rounded-2xl bg-black/40 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-400 font-bold uppercase block">Última sincronización:</span>
                <span className="text-xs font-mono text-white font-semibold">
                  {lastSync ? new Date(lastSync).toLocaleString() : 'Pendiente de sincronizar'}
                </span>
              </div>

              <button
                onClick={handleForceSyncNow}
                disabled={isSyncing}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white border border-slate-700 text-xs font-bold transition-all flex items-center gap-2 active:scale-95 disabled:opacity-40"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-sky-400' : ''}`} />
                <span>Sincronizar Ahora</span>
              </button>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-slate-500 font-bold uppercase">Almacenamiento:</span>
              <span className={`font-bold ${
                storageBackend === 'kv'
                  ? 'text-emerald-400'
                  : storageBackend === 'memory'
                    ? 'text-amber-400'
                    : 'text-slate-400'
              }`}>
                {storageBackend === 'kv'
                  ? 'Persistente (KV / Upstash)'
                  : storageBackend === 'memory'
                    ? 'Memoria (temporal — configura KV)'
                    : 'Desconocido'}
              </span>
            </div>
          </div>
        )}

        {/* Status Alert */}
        {statusMessage && (
          <div className={`p-3.5 rounded-xl border text-xs font-medium leading-relaxed flex items-center gap-2.5 animate-fade-in ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
              : statusMessage.type === 'error'
              ? 'bg-rose-950/60 border-rose-500 text-rose-300'
              : 'bg-sky-950/60 border-sky-500 text-sky-300'
          }`}>
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Multi-device ecosystem illustration */}
        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
          <div className="p-3 rounded-xl bg-[#091224] border border-slate-800/80">
            <Tablet className="w-5 h-5 mx-auto text-sky-400 mb-1" />
            <span className="text-[11px] font-bold text-slate-300 block">iPad</span>
            <span className="text-[10px] text-slate-500">Estudio / Tests</span>
          </div>
          <div className="p-3 rounded-xl bg-[#091224] border border-slate-800/80">
            <Smartphone className="w-5 h-5 mx-auto text-emerald-400 mb-1" />
            <span className="text-[11px] font-bold text-slate-300 block">iPhone</span>
            <span className="text-[10px] text-slate-500">Repasos rápidos</span>
          </div>
          <div className="p-3 rounded-xl bg-[#091224] border border-slate-800/80">
            <Monitor className="w-5 h-5 mx-auto text-purple-400 mb-1" />
            <span className="text-[11px] font-bold text-slate-300 block">PC / Mac</span>
            <span className="text-[10px] text-slate-500">Dashboard</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
          {currentPin ? (
            <button
              onClick={handleUnlink}
              className="text-rose-400 hover:text-rose-300 transition-colors font-medium"
            >
              Desenlazar dispositivo
            </button>
          ) : <span />}

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
