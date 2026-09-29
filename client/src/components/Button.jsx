import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon: Icon,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0B0F14] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5'
  };

  const variants = {
    primary: 'bg-[#D4AF37] hover:bg-[#E5C158] text-[#0B0F14] font-semibold shadow-lg shadow-[#D4AF37]/15 focus:ring-[#D4AF37]',
    secondary: 'bg-[#17202C] hover:bg-[#1E2B3C] text-[#F8FAFC] border border-[#1E2633] focus:ring-slate-500',
    outline: 'bg-transparent border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 focus:ring-[#D4AF37]',
    danger: 'bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/30 focus:ring-red-500',
    ghost: 'bg-transparent hover:bg-white/5 text-slate-300 hover:text-white'
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      {children}
    </button>
  );
};
