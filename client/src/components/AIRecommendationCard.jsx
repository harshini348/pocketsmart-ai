import React from 'react';
import {
  AlertTriangle,
  Lightbulb,
  Target,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export const AIAlertCard = ({ alert, currencySymbol = '₹' }) => {
  const { category, message, severity = 'warning' } = alert;

  const severityStyles = {
    danger: {
      border: 'border-red-500/30',
      bg: 'bg-red-500/10',
      text: 'text-red-400',
      icon: ShieldAlert,
      tag: 'Budget Overrun'
    },
    warning: {
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      icon: AlertTriangle,
      tag: 'Spending Alert'
    },
    success: {
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      icon: CheckCircle2,
      tag: 'On Track'
    }
  };

  const current = severityStyles[severity] || severityStyles.warning;
  const Icon = current.icon;

  return (
    <div className={`p-5 rounded-2xl bg-[#121821] border ${current.border} shadow-xl flex items-start gap-4 transition-all hover:-translate-y-0.5`}>
      <div className={`p-3 rounded-xl ${current.bg} ${current.text} shrink-0 border ${current.border}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${current.bg} ${current.text}`}>
            {current.tag}
          </span>
          <span className="text-xs font-semibold text-slate-300">{category}</span>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed font-medium">
          {message}
        </p>
      </div>
    </div>
  );
};

export const AIRecommendationCard = ({ recommendation, currency = 'INR', currencySymbol = '₹' }) => {
  const { title, description, estimatedMonthlySaving = 0, priority = 'medium' } = recommendation;

  const priorityColors = {
    high: 'bg-red-500/15 text-red-400 border-red-500/30',
    medium: 'bg-[#D4AF37]/15 text-[#D4AF37] border-[#D4AF37]/30',
    low: 'bg-blue-500/15 text-blue-400 border-blue-500/30'
  };

  return (
    <div className="p-6 rounded-2xl bg-[#121821] border border-[#1E2633] hover:border-[#D4AF37]/40 shadow-xl flex flex-col justify-between transition-all hover:-translate-y-0.5 group">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Lightbulb className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-base text-white group-hover:text-[#D4AF37] transition-colors">
              {title}
            </h4>
          </div>

          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${priorityColors[priority] || priorityColors.medium}`}>
            {priority} Priority
          </span>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
          {description}
        </p>
      </div>

      {/* Savings Metric Footer */}
      {estimatedMonthlySaving > 0 && (
        <div className="mt-4 pt-4 border-t border-[#1E2633] flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">Potential Monthly Savings:</span>
          <span className="text-sm font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
            +{formatCurrency(estimatedMonthlySaving, currency, currencySymbol)}/mo
          </span>
        </div>
      )}
    </div>
  );
};
