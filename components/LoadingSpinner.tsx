import React from 'react';

export const LoadingSpinner: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 space-y-6">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-t-2 border-amber-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 border-r-2 border-orange-500 rounded-full animate-spin [animation-delay:0.2s]"></div>
        <div className="absolute inset-2 bg-amber-500/10 rounded-full blur-md animate-pulse"></div>
      </div>
      {message && (
        <p className="text-amber-700/70 animate-pulse text-xs tracking-[0.2em] uppercase font-medium text-center">
          {message}
        </p>
      )}
    </div>
  );
};