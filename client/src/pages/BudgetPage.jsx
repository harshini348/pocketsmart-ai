import React, { useState } from 'react';
import {
  PieChart,
  Target,
  PlusCircle,
  Sliders,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { BudgetCard } from '../components/BudgetCard';
import { SavingsGoalCard } from '../components/SavingsGoalCard';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { formatCurrency, formatPercent } from '../utils/formatters';

export const BudgetPage = ({
  budgets = [],
  categoryAnalysis = [],
  goals = [],
  income = 60000,
  onUpdateBudgets,
  onOpenAddGoal,
  onEditGoal,
  onDeleteGoal,
  onAddSavings,
  currency = 'INR',
  currencySymbol = '₹'
}) => {
  const [editingBudget, setEditingBudget] = useState(null);
  const [allocatedValue, setAllocatedValue] = useState('');
  const [savingLoading, setSavingLoading] = useState(false);

  // Compute total budgeted pool vs Income
  const totalBudgeted = budgets.reduce((sum, b) => sum + Number(b.allocated), 0);
  const unallocatedIncome = Math.max(0, income - totalBudgeted);
  const totalSpent = categoryAnalysis.reduce((sum, c) => sum + Number(c.spent), 0);

  const handleEditClick = (category, currentAllocated) => {
    setEditingBudget(category);
    setAllocatedValue(String(currentAllocated));
  };

  const handleSaveBudget = async (e) => {
    e.preventDefault();
    const num = Number(allocatedValue);
    if (isNaN(num) || num < 0) return;

    setSavingLoading(true);
    try {
      const updated = budgets.map((b) =>
        b.category.toLowerCase() === editingBudget.toLowerCase()
          ? { ...b, allocated: num }
          : b
      );
      await onUpdateBudgets(updated);
      setEditingBudget(null);
    } finally {
      setSavingLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Top Banner: Monthly Budget Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Budget Planner & Financial Goals
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Establish spending caps for categories and fund long-term savings ambitions
          </p>
        </div>

        <Button
          variant="primary"
          onClick={onOpenAddGoal}
          icon={PlusCircle}
          className="shadow-lg shadow-[#D4AF37]/20"
        >
          New Savings Goal
        </Button>
      </div>

      {/* Income & Allocation Overview Card */}
      <div className="p-6 rounded-2xl bg-[#121821] border border-[#1E2633] shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-bold text-[#D4AF37]">
              Current Monthly Income Baseline
            </span>
            <div className="text-3xl font-black text-white mt-1">
              {formatCurrency(income, currency, currencySymbol)}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {formatCurrency(totalBudgeted, currency, currencySymbol)} allocated across categories · {formatCurrency(unallocatedIncome, currency, currencySymbol)} discretionary buffer
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2.5 rounded-xl bg-[#0B0F14] border border-[#1E2633] text-left">
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Total Allocated</span>
              <span className="text-sm font-bold text-slate-200 mt-0.5 block">
                {formatCurrency(totalBudgeted, currency, currencySymbol)}
              </span>
            </div>

            <div className="px-4 py-2.5 rounded-xl bg-[#0B0F14] border border-[#1E2633] text-left">
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Actual Spent</span>
              <span className="text-sm font-bold text-red-400 mt-0.5 block">
                {formatCurrency(totalSpent, currency, currencySymbol)}
              </span>
            </div>

            <div className="px-4 py-2.5 rounded-xl bg-[#0B0F14] border border-[#1E2633] text-left">
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Remaining Budget</span>
              <span className="text-sm font-bold text-emerald-400 mt-0.5 block">
                {formatCurrency(Math.max(0, totalBudgeted - totalSpent), currency, currencySymbol)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Monthly Budget Categories */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="text-lg font-bold text-white tracking-tight">
              Category Budgets
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" /> &lt;80% Normal</span>
            <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> 80-100% Near Limit</span>
            <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400" /> &gt;100% Exceeded</span>
          </div>
        </div>

        {/* Grid of Budget Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(categoryAnalysis.length > 0 ? categoryAnalysis : budgets).map((item) => (
            <BudgetCard
              key={item.category}
              category={item.category}
              allocated={item.allocated}
              spent={item.spent || 0}
              remaining={item.remaining !== undefined ? item.remaining : item.allocated}
              percent={item.percent || 0}
              currency={currency}
              currencySymbol={currencySymbol}
              onEdit={handleEditClick}
            />
          ))}
        </div>
      </div>

      {/* Section 2: Smart Savings Goals */}
      <div className="space-y-4 pt-4 border-t border-[#1E2633]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Smart Savings Goals
              </h3>
              <p className="text-xs text-slate-400">
                Automated tracking with target dates and micro-contribution accelerators
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onOpenAddGoal}
            icon={PlusCircle}
          >
            Add Goal
          </Button>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {goals.map((goal) => (
            <SavingsGoalCard
              key={goal.id}
              goal={goal}
              currency={currency}
              currencySymbol={currencySymbol}
              onAddSavings={onAddSavings}
              onEdit={onEditGoal}
              onDelete={onDeleteGoal}
            />
          ))}
        </div>
      </div>

      {/* Edit Budget Modal */}
      {editingBudget && (
        <Modal
          isOpen={!!editingBudget}
          onClose={() => setEditingBudget(null)}
          title={`Edit ${editingBudget} Budget`}
          subtitle="Adjust the monthly allocation cap for this category"
        >
          <form onSubmit={handleSaveBudget} className="space-y-4">
            <Input
              label={`Monthly Budget Allocation (${currencySymbol})`}
              type="number"
              value={allocatedValue}
              onChange={(e) => setAllocatedValue(e.target.value)}
              placeholder="e.g. 6000"
              autoFocus
            />

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1E2633]">
              <Button type="button" variant="secondary" onClick={() => setEditingBudget(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" loading={savingLoading}>
                Update Allocation
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
