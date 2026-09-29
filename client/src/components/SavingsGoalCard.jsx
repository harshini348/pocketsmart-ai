import React from 'react';
import { Target, Calendar, PlusCircle, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';

export const SavingsGoalCard = ({
  goal,
  currency = 'INR',
  currencySymbol = '₹',
  onAddSavings,
  onEdit,
  onDelete
}) => {
  const { title, targetAmount = 60000, savedAmount = 32000, remaining = 28000, percent = 53, targetDate = '2027-03-31' } = goal;

  const isCompleted = percent >= 100;

  return (
    <div className="p-5 rounded-2xl bg-[#121821] border border-[#1E2633] hover:border-[#D4AF37]/40 transition-all duration-200 shadow-xl flex flex-col justify-between group">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">{title}</h4>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>Target: {formatDate(targetDate)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
            {onEdit && (
              <button
                onClick={() => onEdit(goal)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-[#D4AF37] hover:bg-white/5 transition-colors cursor-pointer"
                title="Edit Goal"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(goal.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
                title="Delete Goal"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Progress Display */}
        <div className="space-y-1.5 my-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Progress</span>
            <span className="font-extrabold text-[#D4AF37]">{percent}%</span>
          </div>

          <div className="w-full bg-[#0B0F14] h-2.5 rounded-full overflow-hidden border border-[#1E2633]">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                isCompleted ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]' : 'gold-gradient-bg shadow-[0_0_10px_rgba(212,175,55,0.4)]'
              }`}
              style={{ width: `${Math.min(100, percent)}%` }}
            />
          </div>
        </div>

        {/* Financial Details */}
        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-[#0B0F14]/70 border border-[#1E2633] text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-medium">Target</span>
            <span className="font-bold text-slate-200 mt-0.5 block">
              {formatCurrency(targetAmount, currency, currencySymbol)}
            </span>
          </div>

          <div className="text-center">
            <span className="text-[10px] text-slate-400 block uppercase font-medium">Saved</span>
            <span className="font-bold text-emerald-400 mt-0.5 block">
              {formatCurrency(savedAmount, currency, currencySymbol)}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase font-medium">Remaining</span>
            <span className="font-bold text-amber-400 mt-0.5 block">
              {formatCurrency(remaining, currency, currencySymbol)}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Deposit Action */}
      <div className="mt-4 pt-3 border-t border-[#1E2633]/60 flex items-center justify-between gap-2">
        <button
          onClick={() => onAddSavings && onAddSavings(goal, 1000)}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-[#17202C] hover:bg-[#D4AF37]/15 border border-[#1E2633] hover:border-[#D4AF37]/40 text-xs font-semibold text-slate-200 hover:text-[#D4AF37] transition-all cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Add +{currencySymbol}1,000</span>
        </button>

        <button
          onClick={() => onAddSavings && onAddSavings(goal, 5000)}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-[#17202C] hover:bg-[#D4AF37]/15 border border-[#1E2633] hover:border-[#D4AF37]/40 text-xs font-semibold text-slate-200 hover:text-[#D4AF37] transition-all cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Add +{currencySymbol}5,000</span>
        </button>
      </div>
    </div>
  );
};
