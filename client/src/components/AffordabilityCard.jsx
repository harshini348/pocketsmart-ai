import React, { useState } from 'react';
import { ShoppingBag, Sparkles, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import { api } from '../services/api';
import { Input } from './Input';
import { Button } from './Button';
import { formatCurrency } from '../utils/formatters';

export const AffordabilityCard = ({
  financialContext = {},
  currency = 'INR',
  currencySymbol = '₹'
}) => {
  const [itemName, setItemName] = useState('MacBook Air M3');
  const [itemPrice, setItemPrice] = useState('55000');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!itemName.trim() || !itemPrice || Number(itemPrice) <= 0) {
      setError('Please provide a valid item name and positive price.');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const res = await api.checkAffordability(itemName, Number(itemPrice), financialContext);
      setResult(res.data);
    } catch (err) {
      setError(err.message || 'Failed to analyze affordability.');
    } finally {
      setLoading(false);
    }
  };

  const statusIcons = {
    yes: { icon: CheckCircle, color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', title: 'Comfortably Affordable' },
    caution: { icon: AlertTriangle, color: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/10', title: 'Proceed With Planning' },
    not_recommended: { icon: XCircle, color: 'text-red-400', border: 'border-red-500/30', bg: 'bg-red-500/10', title: 'High Budget Strain' }
  };

  const statusInfo = result ? (statusIcons[result.canAfford] || statusIcons.caution) : null;

  return (
    <div className="p-6 rounded-2xl bg-[#121821] border border-[#1E2633] shadow-xl">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center shrink-0">
          <ShoppingBag className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Can I Afford This?
          </h3>
          <p className="text-xs text-slate-400">
            Real-time cash flow & savings goal impact analysis powered by AI
          </p>
        </div>
      </div>

      <form onSubmit={handleCheck} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Purchase Item / Goal"
            placeholder="e.g. Laptop, Mountain Bike, Vacation"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <Input
            label={`Estimated Cost (${currencySymbol})`}
            type="number"
            placeholder="55000"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
          />
        </div>

        {error && (
          <div className="text-xs text-red-400 p-2.5 rounded-lg bg-red-500/10 border border-red-500/30">
            {error}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          loading={loading}
          icon={Sparkles}
          className="w-full sm:w-auto"
        >
          {loading ? 'Evaluating Financial Impact...' : 'Evaluate Affordability'}
        </Button>
      </form>

      {/* Analysis Result */}
      {result && statusInfo && (
        <div className="mt-6 pt-5 border-t border-[#1E2633] space-y-4 animate-in fade-in duration-300">
          <div className={`p-4 rounded-xl border ${statusInfo.bg} ${statusInfo.border} flex items-start gap-3`}>
            <statusInfo.icon className={`w-5 h-5 shrink-0 mt-0.5 ${statusInfo.color}`} />
            <div>
              <div className={`text-sm font-bold ${statusInfo.color}`}>
                {result.verdictTitle || statusInfo.title}
              </div>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                {result.impactSummary}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#0B0F14]/70 border border-[#1E2633]">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Suggested Financing Approach
              </span>
              <p className="text-slate-300 leading-relaxed font-medium">
                {result.suggestedApproach}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0B0F14]/70 border border-[#1E2633]">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Recommended Budget Adjustment
              </span>
              <p className="text-slate-300 leading-relaxed font-medium">
                {result.savingAdjustment}
              </p>
            </div>
          </div>

          {result.disclaimer && (
            <div className="flex items-center gap-2 text-[11px] text-slate-400 px-1 italic">
              <Info className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>{result.disclaimer}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
