import React from 'react';

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
