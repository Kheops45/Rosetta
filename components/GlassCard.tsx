import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(120,53,15,0.05)] rounded-3xl p-6 ${className}`}>
      {children}
    </div>
  );
};