import React from 'react';
import {
  Sparkles,
  PlusCircle,
  ArrowUpRight,
  TrendingUp,
  Target,
  Bot,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { SummaryCard } from '../components/SummaryCard';
import { BudgetProgress } from '../components/BudgetProgress';
import { ExpenseChart } from '../components/ExpenseChart';
import { TransactionTable } from '../components/TransactionTable';
import { Button } from '../components/Button';
import { formatCurrency } from '../utils/formatters';

export const DashboardPage = ({
  summary = {},
  transactions = [],
  budgets = [],
  goals = [],
  onOpenAddTransaction,
  onNavigate,
  onRunAnalysis,
  aiAnalysis = null,
  currency = 'INR',
  currencySymbol = '₹'
}) => {
  const { user } = useAuth();

  // Dynamic greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const userName = user?.name ? user.name.split(' ')[0] : 'Alex';

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {getGreeting()}, {userName} 👋
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Here’s your financial overview.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('assistant')}
            icon={Bot}
          >
            Ask AI
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onOpenAddTransaction}
            icon={PlusCircle}
            className="shadow-lg shadow-[#D4AF37]/20"
          >
            Add Transaction
          </Button>
        </div>
      </div>

      {/* AI Smart Banner Highlight */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#17202C] via-[#121821] to-[#17202C] border border-[#D4AF37]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-[#D4AF37]">
                AI Recommendation Spotlight
              </span>
              <span className="text-[10px] bg-emerald-500/15 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                +₹2,000/mo Potential
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 mt-1">
              {aiAnalysis?.recommendations?.[0]?.description ||
                "Reducing discretionary online food orders and grocery delivery could save up to ₹1,500 monthly."}
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('recommendations')}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <span>View All AI Insights</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <SummaryCard
          title="Total Balance"
          amount={summary.balance !== undefined ? summary.balance : 42500}
          subtitle="Net liquid cash flow"
          type="balance"
          currency={currency}
          currencySymbol={currencySymbol}
          trend="+12.5%"
        />

        <SummaryCard
          title="Monthly Income"
          amount={summary.effectiveIncome || 60000}
          subtitle="Salary & Freelance"
          type="income"
          currency={currency}
          currencySymbol={currencySymbol}
          trend="+5.0%"
        />

        <SummaryCard
          title="Monthly Expenses"
          amount={summary.totalExpenses !== undefined ? summary.totalExpenses : 17500}
          subtitle="Calculated from transactions"
          type="expense"
          currency={currency}
          currencySymbol={currencySymbol}
          trend="-8.2%"
        />

        <SummaryCard
          title="Savings"
          amount={summary.savings !== undefined ? summary.savings : 42500}
          subtitle={`${summary.savingsRate || 0}% savings rate`}
          type="savings"
          currency={currency}
          currencySymbol={currencySymbol}
          trend="+14.0%"
        />
      </div>

      {/* Budget Health (Large Card) & Expense Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Budget Health */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <BudgetProgress
            score={summary.healthScore || 72}
            status={summary.healthStatus || "You're doing well"}
            summary={summary}
            onAskAI={() => onNavigate('assistant')}
          />
        </div>

        {/* Right Column: Recharts Expense Breakdown */}
        <div className="lg:col-span-7">
          <ExpenseChart
            categoryExpenses={summary.categoryExpenses || {}}
            transactions={transactions}
            currency={currency}
            currencySymbol={currencySymbol}
          />
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div className="space-y-4">
        <TransactionTable
          transactions={transactions}
          currency={currency}
          currencySymbol={currencySymbol}
          isCompact={true}
          onViewAll={() => onNavigate('transactions')}
        />
      </div>
    </div>
  );
};
