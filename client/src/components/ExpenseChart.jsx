import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { PieChart as PieIcon, BarChart3, TrendingUp } from 'lucide-react';
import { CATEGORY_COLORS } from '../utils/helpers';
import { formatCurrency } from '../utils/formatters';

const CustomTooltip = ({ active, payload, label, currency = 'INR', currencySymbol = '₹' }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-[#121821] border border-[#1E2633] p-3 rounded-xl shadow-2xl shadow-black/80 text-xs">
        <div className="font-semibold text-slate-200 mb-1">
          {label || data.name}
        </div>
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: data.color || data.payload?.fill || '#D4AF37' }}
          />
          <span className="text-slate-400">Spent:</span>
          <span className="font-bold text-[#F8FAFC]">
            {formatCurrency(data.value, currency, currencySymbol)}
          </span>
        </div>
        {data.payload?.percent !== undefined && (
          <div className="text-[10px] text-slate-400 mt-1">
            {Math.round(data.payload.percent * 100)}% of total expenses
          </div>
        )}
      </div>
    );
  }
  return null;
};

export const ExpenseChart = ({
  categoryExpenses = {},
  transactions = [],
  currency = 'INR',
  currencySymbol = '₹'
}) => {
  const [chartType, setChartType] = useState('pie'); // 'pie' | 'bar' | 'line'

  // Prepare Category Data
  const categoriesList = [
    'Food',
    'Transport',
    'Shopping',
    'Bills',
    'Entertainment',
    'Education',
    'Healthcare',
    'Other'
  ];

  const chartData = categoriesList
    .map((cat) => ({
      name: cat,
      value: categoryExpenses[cat] || 0,
      color: CATEGORY_COLORS[cat] || '#64748B'
    }))
    .filter((d) => d.value > 0);

  // Fallback demo values if categoryExpenses is empty
  const displayData = chartData.length > 0 ? chartData : [
    { name: 'Food', value: 5200, color: CATEGORY_COLORS.Food },
    { name: 'Transport', value: 3100, color: CATEGORY_COLORS.Transport },
    { name: 'Shopping', value: 6400, color: CATEGORY_COLORS.Shopping },
    { name: 'Bills', value: 7000, color: CATEGORY_COLORS.Bills },
    { name: 'Entertainment', value: 2100, color: CATEGORY_COLORS.Entertainment },
    { name: 'Education', value: 2500, color: CATEGORY_COLORS.Education },
    { name: 'Healthcare', value: 1200, color: CATEGORY_COLORS.Healthcare },
    { name: 'Other', value: 1000, color: CATEGORY_COLORS.Other }
  ];

  // Prepare Monthly Trajectory Data for Area / Line
  const monthlyData = [
    { day: 'Sep 01-05', expenses: 5400, budget: 6000 },
    { day: 'Sep 06-10', expenses: 4800, budget: 5500 },
    { day: 'Sep 11-15', expenses: 6200, budget: 6000 },
    { day: 'Sep 16-20', expenses: 5100, budget: 5000 },
    { day: 'Sep 21-25', expenses: 4300, budget: 5500 },
    { day: 'Sep 26-30', expenses: 2700, budget: 4000 }
  ];

  const totalSpent = displayData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="p-6 rounded-2xl bg-[#121821] border border-[#1E2633] shadow-xl flex flex-col h-full">
      {/* Chart Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Expense Breakdown
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Total categorized: <span className="font-semibold text-slate-200">{formatCurrency(totalSpent, currency, currencySymbol)}</span>
          </p>
        </div>

        {/* Chart View Mode Selector */}
        <div className="flex items-center p-1 bg-[#0B0F14] border border-[#1E2633] rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setChartType('pie')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              chartType === 'pie'
                ? 'bg-[#121821] text-[#D4AF37] border border-[#D4AF37]/30 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5" />
            <span>Donut</span>
          </button>

          <button
            onClick={() => setChartType('bar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              chartType === 'bar'
                ? 'bg-[#121821] text-[#D4AF37] border border-[#D4AF37]/30 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Bar</span>
          </button>

          <button
            onClick={() => setChartType('line')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              chartType === 'line'
                ? 'bg-[#121821] text-[#D4AF37] border border-[#D4AF37]/30 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Trend</span>
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'pie' ? (
            <PieChart>
              <Pie
                data={displayData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
              >
                {displayData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="#121821"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip currency={currency} currencySymbol={currencySymbol} />} />
            </PieChart>
          ) : chartType === 'bar' ? (
            <BarChart data={displayData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2633" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                interval={0}
                angle={-25}
                textAnchor="end"
              />
              <YAxis
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `₹${v >= 1000 ? `${v / 1000}k` : v}`}
              />
              <Tooltip content={<CustomTooltip currency={currency} currencySymbol={currencySymbol} />} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {displayData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="expenseTrend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2633" vertical={false} />
              <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `₹${v / 1000}k`}
              />
              <Tooltip content={<CustomTooltip currency={currency} currencySymbol={currencySymbol} />} />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#D4AF37"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#expenseTrend)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Category Pills Legend */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4 pt-3 border-t border-[#1E2633]/60">
        {displayData.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#0B0F14]/50 border border-[#1E2633] text-[11px]"
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-slate-300 font-medium">{item.name}</span>
            <span className="text-slate-500 font-semibold">{formatCurrency(item.value, currency, currencySymbol)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
