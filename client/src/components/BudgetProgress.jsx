import React from 'react';
import { ShieldCheck, Activity, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';
import { getHealthGrade } from '../utils/helpers';

export const BudgetProgress = ({
  score = 72,
  status = "You're doing well",
  summary = {},
  onAskAI
}) => {
  const grade = getHealthGrade(score);

  // SVG Circular Ring parameters
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#121821] via-[#121821] to-[#161F2C] border border-[#1E2633] hover:border-[#D4AF37]/40 transition-all duration-300 shadow-2xl shadow-black/50 overflow-hidden">
      {/* Background ambient gold aura */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Left Information */}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Smart Financial Health</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Budget Health
          </h3>
          <p className="text-sm text-slate-400 mt-1 max-w-md">
            Dynamic heuristic computed from budget adherence, savings rate ({summary.savingsRate || 0}%), and category ceilings.
          </p>

          {/* Sub-metrics badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-5">
            <div className="p-2.5 rounded-xl bg-[#0B0F14]/70 border border-[#1E2633]">
              <div className="text-[10px] uppercase font-bold text-slate-400">Savings Rate</div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">
                {summary.savingsRate || 0}%
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#0B0F14]/70 border border-[#1E2633]">
              <div className="text-[10px] uppercase font-bold text-slate-400">Budget Used</div>
              <div className="text-sm font-bold text-[#D4AF37] mt-0.5">
                {summary.budgetUtilization || 0}%
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#0B0F14]/70 border border-[#1E2633] col-span-2 sm:col-span-1">
              <div className="text-[10px] uppercase font-bold text-slate-400">Over-Limit Cats</div>
              <div className="text-sm font-bold text-red-400 mt-0.5">
                {summary.overspentCategories?.length || 0}
              </div>
            </div>
          </div>

          {onAskAI && (
            <button
              onClick={onAskAI}
              className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] hover:text-[#E5C158] transition-colors cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
              <span>Ask PocketSmart AI how to boost this score</span>
            </button>
          )}
        </div>

        {/* Right Circular Ring Visualization */}
        <div className="shrink-0 flex flex-col items-center">
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* SVG Ring */}
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
              {/* Background Track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-[#1E2633]"
                strokeWidth="12"
                fill="transparent"
              />
              {/* Animated Progress Ring */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={grade.color}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{
                  transition: 'stroke-dashoffset 1s ease-in-out',
                  filter: `drop-shadow(0 0 6px ${grade.color}40)`
                }}
              />
            </svg>

            {/* Inner Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {score}
              </span>
              <span className="text-xs font-medium text-slate-400 -mt-1">
                / 100
              </span>
            </div>
          </div>

          {/* Status Badge below ring */}
          <div className="mt-2 text-center">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold border"
              style={{
                backgroundColor: `${grade.color}15`,
                color: grade.color,
                borderColor: `${grade.color}40`
              }}
            >
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
