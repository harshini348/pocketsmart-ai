import React, { useState } from 'react';
import {
  Sparkles,
  RefreshCw,
  Lightbulb,
  AlertTriangle,
  Target,
  ShieldCheck,
  TrendingUp,
  Info,
  CheckCircle2,
  Zap
} from 'lucide-react';
import { AIAlertCard, AIRecommendationCard } from '../components/AIRecommendationCard';
import { AILoadingIndicator } from '../components/LoadingSpinner';
import { Button } from '../components/Button';
import { formatCurrency } from '../utils/formatters';

export const RecommendationsPage = ({
  aiData = null,
  aiStatus = {},
  loading = false,
  onRefresh,
  currency = 'INR',
  currencySymbol = '₹'
}) => {
  const alerts = aiData?.alerts || [];
  const recommendations = aiData?.recommendations || [];
  const savingTips = aiData?.savingTips || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-bold tracking-wider text-[#D4AF37]">
              Generative Intelligence
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                aiStatus.configured
                  ? 'bg-[#D4AF37]/15 text-[#D4AF37] border-[#D4AF37]/30'
                  : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
              }`}
            >
              {aiStatus.configured ? '⚡ Powered by Gemini 2.5 Flash' : '💡 Demo AI Mode (Key not set)'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            AI Financial Insights
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Deep algorithmic & generative analysis of your cash flow, habits, and target goals
          </p>
        </div>

        <Button
          variant="primary"
          onClick={onRefresh}
          loading={loading}
          icon={RefreshCw}
          className="shadow-lg shadow-[#D4AF37]/20"
        >
          {loading ? 'Analyzing...' : 'Re-Analyze Finances'}
        </Button>
      </div>

      {/* AI Key Notice Banner if Demo Mode */}
      {!aiStatus.configured && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold text-amber-300">Demo AI Mode Active: </span>
            A Google Gemini API key has not been configured in <code className="bg-black/40 px-1.5 py-0.5 rounded text-amber-100">server/.env</code>. The application is running using PocketSmart's built-in intelligent rule engine. Add your <code className="bg-black/40 px-1.5 py-0.5 rounded text-amber-100">GEMINI_API_KEY</code> anytime to unlock live Gemini 2.5 Flash models.
          </div>
        </div>
      )}

      {/* Loading Animation during analysis */}
      {loading ? (
        <div className="p-12 rounded-3xl bg-[#121821] border border-[#1E2633] shadow-2xl">
          <AILoadingIndicator text="PocketSmart AI is analyzing your spending..." />
        </div>
      ) : (
        <>
          {/* Executive Summary Card */}
          {aiData?.summary && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#121821] via-[#161F2C] to-[#121821] border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs uppercase font-bold text-[#D4AF37] tracking-wider">
                      Executive Financial Health Summary
                    </span>
                    {aiData.budgetHealth && (
                      <span className="text-xs font-bold text-white bg-[#0B0F14] px-2 py-0.5 rounded-md border border-[#1E2633]">
                        Score: {aiData.budgetHealth}/100
                      </span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                    {aiData.summary}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section: Alerts & Variances */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h3 className="text-lg font-bold text-white tracking-tight">
                Spending Alerts & Anomaly Detections
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {alerts.length === 0 ? (
                <div className="col-span-2 p-6 rounded-2xl bg-[#121821] border border-[#1E2633] text-center text-xs text-slate-400">
                  No spending alerts detected. Your categories are adhering to their planned targets.
                </div>
              ) : (
                alerts.map((alert, idx) => (
                  <AIAlertCard
                    key={idx}
                    alert={alert}
                    currencySymbol={currencySymbol}
                  />
                ))
              )}
            </div>
          </div>

          {/* Section: Actionable Recommendations */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#D4AF37]" />
              <h3 className="text-lg font-bold text-white tracking-tight">
                Actionable Optimization Recommendations
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {recommendations.map((rec, idx) => (
                <AIRecommendationCard
                  key={idx}
                  recommendation={rec}
                  currency={currency}
                  currencySymbol={currencySymbol}
                />
              ))}
            </div>
          </div>

          {/* Section: Personalized Saving Tips */}
          {savingTips.length > 0 && (
            <div className="p-6 rounded-2xl bg-[#121821] border border-[#1E2633] shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-400" />
                <h3 className="text-base font-bold text-white tracking-tight">
                  High-Impact Financial Discipline Tips
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {savingTips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0B0F14]/70 border border-[#1E2633] flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer Footer */}
          <div className="p-4 rounded-xl bg-[#0B0F14]/40 border border-[#1E2633] text-center text-[11px] text-slate-400">
            PocketSmart AI provides educational budgeting analysis and does not constitute certified financial, tax, or investment advice. Always review projections before making major financial commitments.
          </div>
        </>
      )}
    </div>
  );
};
