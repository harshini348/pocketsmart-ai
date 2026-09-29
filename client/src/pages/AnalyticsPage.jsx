import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  TrendingUp,
  BarChart3,
  PieChart as PieIcon,
  Flame,
  ArrowUpRight,
  ShieldCheck,
  AlertCircle,
  Lightbulb,
  Wallet,
  Clock
} from 'lucide-react';
import { formatCurrency, formatPercent } from '../utils/formatters';
import { CATEGORY_COLORS } from '../utils/helpers';

const CustomChartTooltip = ({ active, payload, label, currencySymbol = '₹' }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#121821] border border-[#1E2633] p-3 rounded-xl shadow-2xl text-xs space-y-1">
        <div className="font-bold text-slate-200 border-b border-[#1E2633] pb-1 mb-1">{label}</div>
        {payload.map((item, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              {item.name}:
            </span>
            <span className="font-bold text-white">
              {currencySymbol}{Number(item.value).toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const AnalyticsPage = ({
  summary = {},
  budgets = [],
  transactions = [],
  currency = 'INR',
  currencySymbol = '₹'
}) => {
  // Chart 1: Income vs Expenses Multi-Month Comparison
  const incomeVsExpenseData = [
    { month: 'May', income: 55000, expenses: 24000, savings: 31000 },
    { month: 'Jun', income: 58000, expenses: 26500, savings: 31500 },
    { month: 'Jul', income: 60000, expenses: 29000, savings: 31000 },
    { month: 'Aug', income: 60000, expenses: 23500, savings: 36500 },
    { month: 'Sep (Current)', income: summary.effectiveIncome || 60000, expenses: summary.totalExpenses || 17500, savings: summary.savings || 42500 }
  ];

  // Chart 2: Daily/Weekly Monthly Spending Velocity
  const spendingVelocityData = [
    { period: 'Week 1', amount: 8200, cumulative: 8200 },
    { period: 'Week 2', amount: 7600, cumulative: 15800 },
    { period: 'Week 3', amount: 6400, cumulative: 22200 },
    { period: 'Week 4', amount: 4800, cumulative: 27000 }
  ];

  // Chart 3: Category Breakdown
  const categoryChartData = Object.entries(summary.categoryExpenses || {})
    .filter(([_, amt]) => amt > 0)
    .map(([cat, amt]) => ({
      name: cat,
      value: amt,
      color: CATEGORY_COLORS[cat] || '#64748B'
    }));

  const displayCategoryData = categoryChartData.length > 0 ? categoryChartData : [
    { name: 'Food', value: 5200, color: CATEGORY_COLORS.Food },
    { name: 'Transport', value: 3100, color: CATEGORY_COLORS.Transport },
    { name: 'Shopping', value: 6400, color: CATEGORY_COLORS.Shopping },
    { name: 'Bills', value: 7000, color: CATEGORY_COLORS.Bills },
    { name: 'Entertainment', value: 2100, color: CATEGORY_COLORS.Entertainment },
    { name: 'Education', value: 2500, color: CATEGORY_COLORS.Education },
    { name: 'Healthcare', value: 1200, color: CATEGORY_COLORS.Healthcare },
    { name: 'Other', value: 1000, color: CATEGORY_COLORS.Other }
  ];

  // Chart 4: Cumulative Savings Growth
  const savingsTrendData = [
    { month: 'Apr', balance: 140000 },
    { month: 'May', balance: 171000 },
    { month: 'Jun', balance: 202500 },
    { month: 'Jul', balance: 233500 },
    { month: 'Aug', balance: 270000 },
    { month: 'Sep', balance: 312500 }
  ];

  const highestTx = summary.highestExpense || { amount: 3400, description: 'Zara Outfit' };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Financial Analytics & Trends
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Historical cash flow ratios, predictive projections, and category distribution intelligence
        </p>
      </div>

      {/* KPI Cards Row (7 Key Indicators) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="p-3.5 rounded-xl bg-[#121821] border border-[#1E2633]">
          <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">Monthly Income</span>
          <div className="text-base font-extrabold text-white mt-1">
            {formatCurrency(summary.effectiveIncome || 60000, currency, currencySymbol)}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#121821] border border-[#1E2633]">
          <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">Monthly Expenses</span>
          <div className="text-base font-extrabold text-red-400 mt-1">
            {formatCurrency(summary.totalExpenses || 17500, currency, currencySymbol)}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#121821] border border-[#1E2633]">
          <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">Net Savings</span>
          <div className="text-base font-extrabold text-emerald-400 mt-1">
            {formatCurrency(summary.savings || 42500, currency, currencySymbol)}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#121821] border border-[#1E2633]">
          <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">Savings Rate</span>
          <div className="text-base font-extrabold text-[#D4AF37] mt-1">
            {summary.savingsRate || 0}%
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#121821] border border-[#1E2633]">
          <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">Top Category</span>
          <div className="text-base font-extrabold text-white mt-1 truncate">
            {summary.topCategory || 'Shopping'}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#121821] border border-[#1E2633]">
          <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">Daily Average</span>
          <div className="text-base font-extrabold text-white mt-1">
            {formatCurrency(summary.averageDailySpending || 0, currency, currencySymbol)}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#121821] border border-[#1E2633] col-span-2 sm:col-span-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">Budget Used</span>
          <div className="text-base font-extrabold text-sky-400 mt-1">
            {summary.budgetUtilization || 0}%
          </div>
        </div>
      </div>

      {/* 4 Recharts Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Income vs Expenses Comparison */}
        <div className="p-6 rounded-2xl bg-[#121821] border border-[#1E2633] shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                1. Income vs Expenses Comparison
              </h3>
              <p className="text-xs text-slate-400">Monthly surplus and cash accumulation</p>
            </div>
            <BarChart3 className="w-4 h-4 text-[#D4AF37]" />
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incomeVsExpenseData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2633" vertical={false} />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip content={<CustomChartTooltip currencySymbol={currencySymbol} />} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="income" name="Income" fill="#22C55E" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" name="Expenses" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Monthly Spending Velocity */}
        <div className="p-6 rounded-2xl bg-[#121821] border border-[#1E2633] shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                2. Monthly Spending Velocity
              </h3>
              <p className="text-xs text-slate-400">Cumulative burn rate throughout the billing cycle</p>
            </div>
            <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spendingVelocityData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="velocityGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2633" vertical={false} />
                <XAxis dataKey="period" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip content={<CustomChartTooltip currencySymbol={currencySymbol} />} />
                <Area type="monotone" dataKey="cumulative" name="Cumulative Spend" stroke="#D4AF37" strokeWidth={2.5} fill="url(#velocityGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Category Breakdown */}
        <div className="p-6 rounded-2xl bg-[#121821] border border-[#1E2633] shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                3. Category Breakdown
              </h3>
              <p className="text-xs text-slate-400">Relative allocation across living and discretionary</p>
            </div>
            <PieIcon className="w-4 h-4 text-[#D4AF37]" />
          </div>

          <div className="w-full h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={displayCategoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  innerRadius={45}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {displayCategoryData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} stroke="#121821" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip content={<CustomChartTooltip currencySymbol={currencySymbol} />} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Savings Growth Trend */}
        <div className="p-6 rounded-2xl bg-[#121821] border border-[#1E2633] shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                4. Cumulative Savings Trajectory
              </h3>
              <p className="text-xs text-slate-400">Compound liquidity & reserve accumulation</p>
            </div>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={savingsTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2633" vertical={false} />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip content={<CustomChartTooltip currencySymbol={currencySymbol} />} />
                <Line type="monotone" dataKey="balance" name="Savings Balance" stroke="#22C55E" strokeWidth={3} dot={{ r: 4, fill: '#22C55E' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Section 19: Smart Heuristic Insights */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white tracking-tight">
          Smart Financial Diagnostics
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[#121821] border border-[#1E2633]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4" />
              <span>Highest Spending Category</span>
            </div>
            <div className="text-xl font-black text-white">
              {summary.topCategory || 'Shopping'}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Consuming {formatCurrency(summary.topCategoryAmount || 6400, currency, currencySymbol)} this month.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#121821] border border-[#1E2633]">
            <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider mb-2">
              <AlertCircle className="w-4 h-4" />
              <span>Highest Single Expense</span>
            </div>
            <div className="text-xl font-black text-white truncate">
              {highestTx.description || 'Zara Outfit'}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Single transaction value: {formatCurrency(highestTx.amount || 3400, currency, currencySymbol)}.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#121821] border border-[#1E2633]">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
              <Lightbulb className="w-4 h-4" />
              <span>Potential Optimization</span>
            </div>
            <div className="text-xl font-black text-emerald-400">
              +{currencySymbol}4,300/mo
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Identified across food delivery trimming, subscription consolidation, and impulse buffering.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
