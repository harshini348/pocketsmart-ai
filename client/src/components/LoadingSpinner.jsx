import React from 'react';
import { Sparkles, Inbox } from 'lucide-react';

export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      <div className={`${sizes[size]} border-2 border-[#1E2633] border-t-[#D4AF37] rounded-full animate-spin`} />
    </div>
  );
};

export const AILoadingIndicator = ({ text = "PocketSmart AI is analyzing your spending..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
      <div className="relative mb-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/30 flex items-center justify-center shadow-lg shadow-[#D4AF37]/10 animate-pulse">
          <Sparkles className="w-7 h-7 text-[#D4AF37]" />
        </div>
        <div className="absolute -inset-1 rounded-2xl bg-[#D4AF37]/20 blur-md -z-10 animate-pulse" />
      </div>
      <div className="flex items-center gap-1.5 text-base font-medium text-[#F8FAFC]">
        <span>{text}</span>
        <span className="flex gap-0.5 ml-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] pulse-dot-1" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] pulse-dot-2" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] pulse-dot-3" />
        </span>
      </div>
      <p className="text-xs text-slate-400 mt-2 max-w-sm">
        Synthesizing cash flow metrics, category variances, and personalized savings heuristics...
      </p>
    </div>
  );
};

export const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No items found',
  description = 'Get started by creating your first entry.',
  action = null
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center border border-dashed border-[#1E2633] rounded-2xl bg-[#121821]/40">
      <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-400 mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-base font-semibold text-slate-200">{title}</h4>
      <p className="text-xs text-slate-400 max-w-xs mt-1 mb-4">{description}</p>
      {action}
    </div>
  );
};
