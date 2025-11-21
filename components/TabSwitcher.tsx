import React from 'react';
import { AppMode } from '../types';

interface TabSwitcherProps {
  currentMode: AppMode;
  onSwitch: (mode: AppMode) => void;
}

export const TabSwitcher: React.FC<TabSwitcherProps> = ({ currentMode, onSwitch }) => {
  return (
    <div className="flex p-1.5 space-x-1 bg-stone-200/50 backdrop-blur-md rounded-2xl mb-8 border border-white/40 max-w-sm mx-auto w-full shadow-sm">
      <button
        onClick={() => onSwitch(AppMode.ENCODE)}
        className={`flex-1 py-3 text-xs md:text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
          currentMode === AppMode.ENCODE
            ? 'bg-amber-600 text-white shadow-[0_4px_10px_rgba(217,119,6,0.3)]'
            : 'text-stone-500 hover:text-stone-700 hover:bg-white/30'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
        TRADUCTEUR
      </button>
      <button
        onClick={() => onSwitch(AppMode.DECODE)}
        className={`flex-1 py-3 text-xs md:text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
          currentMode === AppMode.DECODE
            ? 'bg-white text-amber-600 shadow-[0_4px_10px_rgba(0,0,0,0.05)]'
            : 'text-stone-500 hover:text-stone-700 hover:bg-white/30'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
        DÉCODEUR
      </button>
    </div>
  );
};