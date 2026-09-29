import React from 'react';
import { ArrowUpRight, ArrowDownRight, Wallet, ArrowDownCircle, ArrowUpCircle, PiggyBank } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export const SummaryCard = ({
  title,
  amount,
  subtitle,
  type = 'neutral',
  currency = 'INR',
  currencySymbol = '₹',
  trend = null
}) => {
  const icons = {
    balance: Wallet,
    income: ArrowUpCircle,
    expense: ArrowDownCircle,
    savings: PiggyBank
  };

  const IconComponent = icons[type] || Wallet;

  const colorStyles = {
    balance: {
      border: 'hover:border-[#D4AF37]/50',
      iconBg: 'bg-[#D4AF37]/15 text-[#D4AF37] border-[#D4AF37]/30',
      badge: 'bg-[#D4AF37]/10 text-[#D4AF37]',
      glow: 'shadow-[#D4AF37]/5'
    },
    income: {
      border: 'hover:border-emerald-500/50',
      iconBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      badge: 'bg-emerald-500/10 text-emerald-400',
      glow: 'shadow-emerald-500/5'
    },
    expense: {
      border: 'hover:border-red-500/50',
      iconBg: 'bg-red-500/15 text-red-400 border-red-500/30',
      badge: 'bg-red-500/10 text-red-400',
      glow: 'shadow-red-500/5'
    },
    savings: {
      border: 'hover:border-[#38BDF8]/50',
      iconBg: 'bg-[#38BDF8]/15 text-[#38BDF8] border-[#38BDF8]/30',
      badge: 'bg-[#38BDF8]/10 text-[#38BDF8]',
      glow: 'shadow-sky-500/5'
    }
  };

  const style = colorStyles[type] || colorStyles.balance;

  return (
    <div
      className={`relative p-5 rounded-2xl bg-[#121821] border border-[#1E2633] ${style.border} transition-all duration-300 shadow-xl ${style.glow} hover:-translate-y-0.5 group`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <div className={`p-2.5 rounded-xl border ${style.iconBg} transition-transform group-hover:scale-110`}>
          <IconComponent className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <div className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
          {formatCurrency(amount, currency, currencySymbol)}
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-between text-xs">
        <span className="text-slate-400 truncate">{subtitle}</span>
        {trend && (
          <span className={`inline-flex items-center gap-0.5 font-medium px-2 py-0.5 rounded-md ${style.badge}`}>
            {trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};
