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
  Zap, 
  Wifi, 
  Lock,
  ArrowRight
} from 'lucide-react';
import { 
  getStoredSyncPin, 
  setStoredSyncPin, 
  getLastSyncTimestamp, 
  syncWithCloud 
} from '../services/sync';

interface SyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSyncComplete?: () => void;
}

export const SyncModal: React.FC<SyncModalProps> = ({
  isOpen,
  onClose,
  onSyncComplete
}) => {
  const [pinInput, setPinInput] = useState('');
  const [currentPin, setCurrentPin] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<number | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      const stored = getStoredSyncPin();
      setCurrentPin(stored);
      setPinInput(stored || 'plegue-mando');
      setLastSync(getLastSyncTimestamp());
      setStatusMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveAndSync = async () => {
    const cleanPin = pinInput.trim().toLowerCase();
    if (!cleanPin) {
      setStatusMessage({ type: 'error', text: 'Por favor introduce un código PIN válido (ej: plegue-mando o tu nombre).' });
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
      setStatusMessage({ type: 'success', text: '✅ ¡Dispositivo enlazado y sincronizado con éxito!' });
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
      setStatusMessage({ type: 'success', text: '✅ Sincronización completada. Todos tus exámenes y estadísticas están al día.' });
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
      <div className="bg-[#0e1933] border border-sky-500/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        
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
              placeholder="Ej: plegue-mando o tu PIN"
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
          <div className="p-4 rounded-2xl bg-black/40 border border-slate-800 flex items-center justify-between gap-3">
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
