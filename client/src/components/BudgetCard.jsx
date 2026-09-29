import React from 'react';
import {
  Utensils,
  Car,
  ShoppingBag,
  Receipt,
  Film,
  GraduationCap,
  HeartPulse,
  Tag,
  Edit3
} from 'lucide-react';
import { formatCurrency, formatPercent } from '../utils/formatters';
import { CATEGORY_COLORS, getStatusColor } from '../utils/helpers';

const categoryIcons = {
  Food: Utensils,
  Transport: Car,
  Shopping: ShoppingBag,
  Bills: Receipt,
  Entertainment: Film,
  Education: GraduationCap,
  Healthcare: HeartPulse,
  Other: Tag
};

export const BudgetCard = ({
  category,
  allocated = 0,
  spent = 0,
  remaining = 0,
  percent = 0,
  currency = 'INR',
  currencySymbol = '₹',
  onEdit = null
}) => {
  const IconComponent = categoryIcons[category] || Tag;
  const catColor = CATEGORY_COLORS[category] || '#D4AF37';
  const status = getStatusColor(percent);

  // Clamped width for progress bar display
  const barWidth = Math.min(100, Math.max(2, percent));

  return (
    <div className="p-5 rounded-2xl bg-[#121821] border border-[#1E2633] hover:border-[#D4AF37]/30 transition-all duration-200 shadow-xl group">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
            style={{
              backgroundColor: `${catColor}15`,
              borderColor: `${catColor}30`,
              color: catColor
            }}
          >
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">{category}</h4>
            <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full border mt-0.5 ${status.bg} ${status.text} ${status.border}`}>
              {status.label} ({percent}%)
            </span>
          </div>
        </div>

        {onEdit && (
          <button
            onClick={() => onEdit(category, allocated)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-[#D4AF37] hover:bg-white/5 transition-colors cursor-pointer"
            title="Edit Category Budget"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#0B0F14] h-2.5 rounded-full overflow-hidden mb-4 border border-[#1E2633]">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${barWidth}%`,
            backgroundColor: status.hex,
            boxShadow: `0 0 10px ${status.hex}40`
          }}
        />
      </div>

      {/* Numbers Grid */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#1E2633]/60 text-xs">
        <div>
          <span className="text-[10px] text-slate-400 block uppercase font-medium">Budget</span>
          <span className="font-bold text-slate-200 mt-0.5 block">
            {formatCurrency(allocated, currency, currencySymbol)}
          </span>
        </div>

        <div className="text-center">
          <span className="text-[10px] text-slate-400 block uppercase font-medium">Spent</span>
          <span className="font-bold text-slate-200 mt-0.5 block">
            {formatCurrency(spent, currency, currencySymbol)}
          </span>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 block uppercase font-medium">
            {remaining < 0 ? 'Over By' : 'Remaining'}
          </span>
          <span
            className={`font-bold mt-0.5 block ${
              remaining < 0 ? 'text-red-400' : 'text-emerald-400'
            }`}
          >
            {remaining < 0 ? `-${formatCurrency(Math.abs(remaining), currency, currencySymbol)}` : formatCurrency(remaining, currency, currencySymbol)}
          </span>
        </div>
      </div>
    </div>
  );
};
