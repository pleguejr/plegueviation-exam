import React, { useState, useEffect } from 'react';
import { Plane, Compass, BarChart3, BookOpen, PlusCircle, Wifi, WifiOff, Sparkles, User, Settings, FileText } from 'lucide-react';

interface NavbarProps {
  currentTab: 'dashboard' | 'explorer' | 'reports' | 'settings';
  onSelectTab: (tab: 'dashboard' | 'explorer' | 'reports' | 'settings') => void;
  onOpenNewExam: () => void;
  onOpenImporter: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenNewExam,
  onOpenImporter
}) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#162f59] border-b border-[#21437d] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2.5 flex items-center justify-between">
        
        {/* Brand & Logo (Estilo AviationExam) */}
        <div 
          onClick={() => onSelectTab('dashboard')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white font-sans flex items-center gap-1.5">
              <span>Plegueviation</span>
              <span className="border-2 border-white px-1 py-0.2 rounded text-xs font-black bg-sky-600">Exam</span>
            </span>
            <span className="text-[10px] font-mono font-bold text-sky-200 border-l border-sky-400/40 pl-2">
              Binter Ops
            </span>
          </div>
        </div>

        {/* Navigation Links estilo AviationExam: Dashboard | Test | Questions | Reports */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`transition-colors py-1 ${
              currentTab === 'dashboard'
                ? 'text-white border-b-2 border-sky-400 font-bold'
                : 'text-sky-200 hover:text-white'
            }`}
          >
            Dashboard
          </button>
          
          <button
            onClick={onOpenNewExam}
            className="text-sky-200 hover:text-white transition-colors py-1"
          >
            Test
          </button>

          <button
            onClick={() => onSelectTab('explorer')}
            className={`transition-colors py-1 ${
              currentTab === 'explorer'
                ? 'text-white border-b-2 border-sky-400 font-bold'
                : 'text-sky-200 hover:text-white'
            }`}
          >
            Questions
          </button>

          <button
            onClick={() => onSelectTab('reports')}
            className={`transition-colors py-1 ${
              currentTab === 'reports'
                ? 'text-white border-b-2 border-sky-400 font-bold'
                : 'text-sky-200 hover:text-white'
            }`}
          >
            Reports & Qs
          </button>

          <button
            onClick={onOpenImporter}
            className="text-sky-200 hover:text-white transition-colors flex items-center gap-1 py-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Importar IA</span>
          </button>
        </nav>

        {/* User Profile & Offline Status */}
        <div className="flex items-center gap-3">
          
          {/* Offline Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#102447] text-[11px] font-mono text-sky-200 border border-sky-400/20">
            {isOnline ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>ONLINE</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>OFFLINE</span>
              </>
            )}
          </div>

          {/* Pilot User Profile */}
          <div 
            onClick={() => onSelectTab('settings')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a3869] hover:bg-[#204580] cursor-pointer transition-colors border border-sky-400/30 text-xs font-semibold"
          >
            <div className="w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center text-[11px] font-bold text-white">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="text-white">Pleguejr</span>
            <span className="text-sky-300 text-[10px]">▼</span>
          </div>

        </div>

      </div>
    </header>
  );
};
