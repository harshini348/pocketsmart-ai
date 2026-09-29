import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  PlusCircle,
  ArrowUpDown,
  Download,
  Receipt,
  ArrowDownCircle,
  ArrowUpCircle,
  Wallet
} from 'lucide-react';
import { TransactionTable } from '../components/TransactionTable';
import { Button } from '../components/Button';
import { CATEGORIES } from '../utils/helpers';
import { formatCurrency } from '../utils/formatters';

export const TransactionsPage = ({
  transactions = [],
  summary = {},
  onOpenAddModal,
  onEditTransaction,
  onDeleteTransaction,
  currency = 'INR',
  currencySymbol = '₹'
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('all'); // 'all' | 'expense' | 'income'
  const [sortBy, setSortBy] = useState('date'); // 'date' | 'amount'
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' | 'asc'

  // Filter and sort transactions client-side for instant UX
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch =
        search === '' ||
        (t.description && t.description.toLowerCase().includes(search.toLowerCase())) ||
        (t.category && t.category.toLowerCase().includes(search.toLowerCase())) ||
        (t.notes && t.notes.toLowerCase().includes(search.toLowerCase()));

      const matchesCat =
        selectedCategory === 'All' ||
        (t.category && t.category.toLowerCase() === selectedCategory.toLowerCase());

      const matchesType =
        selectedType === 'all' || t.type === selectedType;

      return matchesSearch && matchesCat && matchesType;
    }).sort((a, b) => {
      if (sortBy === 'amount') {
        const diff = Number(a.amount) - Number(b.amount);
        return sortOrder === 'asc' ? diff : -diff;
      } else {
        const diff = new Date(a.date) - new Date(b.date);
        return sortOrder === 'asc' ? diff : -diff;
      }
    });
  }, [transactions, search, selectedCategory, selectedType, sortBy, sortOrder]);

  const totalFilteredExpense = filteredTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalFilteredIncome = filteredTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Transaction Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Search, filter, track, and manage all your historical income and expenditures
          </p>
        </div>

        <Button
          variant="primary"
          onClick={onOpenAddModal}
          icon={PlusCircle}
          className="shadow-lg shadow-[#D4AF37]/20"
        >
          Add Transaction
        </Button>
      </div>

      {/* Mini Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-[#121821] border border-[#1E2633]">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Entries</div>
          <div className="text-lg font-bold text-white mt-1">
            {filteredTransactions.length} of {transactions.length}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#121821] border border-[#1E2633]">
          <div className="text-[10px] uppercase font-bold text-slate-400">Filtered Expenses</div>
          <div className="text-lg font-bold text-red-400 mt-1">
            -{formatCurrency(totalFilteredExpense, currency, currencySymbol)}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#121821] border border-[#1E2633]">
          <div className="text-[10px] uppercase font-bold text-slate-400">Filtered Income</div>
          <div className="text-lg font-bold text-emerald-400 mt-1">
            +{formatCurrency(totalFilteredIncome, currency, currencySymbol)}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#121821] border border-[#1E2633]">
          <div className="text-[10px] uppercase font-bold text-slate-400">Net Flow</div>
          <div className={`text-lg font-bold mt-1 ${totalFilteredIncome >= totalFilteredExpense ? 'text-[#D4AF37]' : 'text-red-400'}`}>
            {formatCurrency(totalFilteredIncome - totalFilteredExpense, currency, currencySymbol)}
          </div>
        </div>
      </div>

      {/* Search and Filters Toolbar */}
      <div className="p-4 rounded-2xl bg-[#121821] border border-[#1E2633] shadow-md flex flex-col lg:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search description, category, or notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0B0F14] border border-[#1E2633] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
          />
        </div>

        {/* Filter Badges & Selects */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#0B0F14] border border-[#1E2633] text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#D4AF37] cursor-pointer"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-[#0B0F14] border border-[#1E2633] text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#D4AF37] cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="expense">Expenses Only</option>
            <option value="income">Income Only</option>
          </select>

          {/* Sort By Filter */}
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [sb, so] = e.target.value.split('-');
              setSortBy(sb);
              setSortOrder(so);
            }}
            className="bg-[#0B0F14] border border-[#1E2633] text-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#D4AF37] cursor-pointer"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Amount: High to Low</option>
            <option value="amount-asc">Amount: Low to High</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <TransactionTable
        transactions={filteredTransactions}
        currency={currency}
        currencySymbol={currencySymbol}
        isCompact={false}
        onEdit={onEditTransaction}
        onDelete={onDeleteTransaction}
      />
    </div>
  );
};
