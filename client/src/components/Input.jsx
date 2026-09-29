import React from 'react';

export const Input = ({
  label,
  error,
  icon: Icon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium text-slate-300">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          className={`w-full bg-[#0B0F14] border border-[#1E2633] rounded-xl px-3.5 py-2.5 text-sm text-[#F8FAFC] placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all duration-150 ${
            Icon ? 'pl-10' : ''
          } ${error ? 'border-red-500/70 focus:border-red-500' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-400 mt-0.5">{error}</span>}
    </div>
  );
};

export const Select = ({
  label,
  options = [],
  error,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-xs font-medium text-slate-300">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full bg-[#0B0F14] border border-[#1E2633] rounded-xl px-3.5 py-2.5 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all duration-150 cursor-pointer ${
          error ? 'border-red-500/70' : ''
        } ${className}`}
        {...props}
      >
        {options.map((opt) => {
          const val = typeof opt === 'object' ? opt.value : opt;
          const lbl = typeof opt === 'object' ? opt.label : opt;
          return (
            <option key={val} value={val} className="bg-[#121821] text-white">
              {lbl}
            </option>
          );
        })}
      </select>
      {error && <span className="text-xs text-red-400 mt-0.5">{error}</span>}
    </div>
  );
};

export const Badge = ({
  children,
  variant = 'neutral',
  className = ''
}) => {
  const variants = {
    gold: 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30',
    success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    danger: 'bg-red-500/15 text-red-400 border border-red-500/30',
    neutral: 'bg-slate-800 text-slate-300 border border-slate-700/50',
    info: 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
        variants[variant] || variants.neutral
      } ${className}`}
    >
      {children}
    </span>
  );
};
