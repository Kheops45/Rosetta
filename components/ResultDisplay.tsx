import React from 'react';
import { TranslationResult } from '../types';
import { GlassCard } from './GlassCard';

interface ResultDisplayProps {
  result: TranslationResult;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  return (
    <GlassCard className="mt-6 animate-[fadeIn_0.6s_ease-out] !p-0 overflow-hidden border-t border-white/60">
      {/* Header Bar */}
      <div className="bg-stone-50/50 p-4 flex items-center justify-between border-b border-stone-200/50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]"></span>
          <span className="text-xs font-bold tracking-widest uppercase text-stone-500">Résultat de l'analyse</span>
        </div>
      </div>

      <div className="p-6 space-y-8 text-center">
        
        {/* Hieroglyphs (Modern Large Display) */}
        {result.hieroglyphs && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 blur-xl rounded-full"></div>
            <p className="relative text-6xl md:text-7xl leading-normal font-medium text-transparent bg-clip-text bg-gradient-to-r from-stone-800 to-amber-900">
              {result.hieroglyphs}
            </p>
          </div>
        )}

        {/* Translation */}
        <div className="space-y-2">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700">Traduction</h3>
          <p className="text-xl md:text-2xl font-medium text-stone-800 leading-relaxed">
            {result.translation}
          </p>
        </div>

        <div className="h-px w-1/2 mx-auto bg-gradient-to-r from-transparent via-stone-300 to-transparent" />

        {/* Transliteration */}
        {result.transliteration && (
          <div className="bg-stone-100/80 rounded-lg py-2 px-4 inline-block border border-stone-200">
            <p className="text-sm font-mono text-stone-600 tracking-wide">
              /{result.transliteration}/
            </p>
          </div>
        )}

        {/* Context */}
        {result.historicalContext && (
          <div className="text-left mt-6 bg-orange-50/50 rounded-xl p-5 border border-orange-100">
            <h3 className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              Contexte Historique
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {result.historicalContext}
            </p>
          </div>
        )}
      </div>
    </GlassCard>
  );
};