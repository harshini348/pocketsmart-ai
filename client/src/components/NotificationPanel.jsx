import React from 'react';
import { AlertTriangle, AlertCircle, CheckCircle2, TrendingDown, ArrowRight, X } from 'lucide-react';

export const NotificationPanel = ({
  isOpen,
  onClose,
  summary = {},
  goals = [],
  onNavigate
}) => {
  if (!isOpen) return null;

  // Generate dynamic notifications based on real data
  const notifications = [];

  // 1. Overspent categories
  if (summary.overspentCategories && summary.overspentCategories.length > 0) {
    summary.overspentCategories.forEach(cat => {
      notifications.push({
        id: `overspend-${cat}`,
        type: 'danger',
        icon: AlertCircle,
        title: `Budget Exceeded`,
        message: `You have exceeded your ${cat.toLowerCase()} budget.`,
        action: 'budget'
      });
    });
  }

  // 2. Near limit categories
  if (summary.nearLimitCategories && summary.nearLimitCategories.length > 0) {
    summary.nearLimitCategories.forEach(cat => {
      notifications.push({
        id: `near-${cat}`,
        type: 'warning',
        icon: AlertTriangle,
        title: `Category Alert`,
        message: `${cat} spending is close to your monthly limit.`,
        action: 'budget'
      });
    });
  }

  // 3. Savings goals
  const activeGoal = goals[0];
  if (activeGoal && activeGoal.percent >= 50) {
    notifications.push({
      id: 'goal-progress',
      type: 'success',
      icon: CheckCircle2,
      title: 'Goal Milestone',
      message: `You're on track for your savings goal: "${activeGoal.title}" (${activeGoal.percent}% completed).`,
      action: 'budget'
    });
  }

  // 4. Savings rate / trend
  if (summary.savingsRate >= 25) {
    notifications.push({
      id: 'savings-good',
      type: 'success',
      icon: TrendingDown,
      title: 'Strong Savings Rate',
      message: `Your current savings rate is ${summary.savingsRate}%, outperforming the standard 20% guideline.`,
      action: 'analytics'
    });
  } else {
    notifications.push({
      id: 'spending-trend',
      type: 'info',
      icon: TrendingDown,
      title: 'Spending Update',
      message: `Your average daily spending is ₹${(summary.averageDailySpending || 0).toLocaleString('en-IN')}.`,
      action: 'analytics'
    });
  }

  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#121821] border border-[#1E2633] rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
      <div className="px-4 py-3 border-b border-[#1E2633] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">Notifications</span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
            {notifications.length}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-[#1E2633]/60">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400">
            No active alerts at this moment. All metrics normal.
          </div>
        ) : (
          notifications.map((n) => {
            const Icon = n.icon;
            const colorClass =
              n.type === 'danger'
                ? 'text-red-400 bg-red-500/10 border-red-500/30'
                : n.type === 'warning'
                ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                : n.type === 'success'
                ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                : 'text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/30';

            return (
              <div
                key={n.id}
                onClick={() => {
                  if (onNavigate && n.action) onNavigate(n.action);
                  onClose();
                }}
                className="p-3.5 hover:bg-white/5 transition-colors cursor-pointer flex items-start gap-3"
              >
                <div className={`p-2 rounded-xl border shrink-0 ${colorClass}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-200">{n.title}</div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{n.message}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 mt-1 shrink-0" />
              </div>
            );
          })
        )}
      </div>

      <div className="px-4 py-2.5 border-t border-[#1E2633] bg-[#0B0F14]/60 text-center">
        <span className="text-[10px] text-slate-500">
          Generated automatically from live budget and transaction metrics
        </span>
      </div>
    </div>
  );
};
