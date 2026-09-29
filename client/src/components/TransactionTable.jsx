import React from 'react';
import {
  Utensils,
  Car,
  ShoppingBag,
  Receipt,
  Film,
  GraduationCap,
  HeartPulse,
  Tag,
  ArrowUpRight,
  ArrowDownRight,
  Edit2,
  Trash2,
  Plane,
  Briefcase
} from 'lucide-react';
import { formatCurrency, formatShortDate } from '../utils/formatters';
import { CATEGORY_COLORS } from '../utils/helpers';
import { Badge } from './Badge';

const categoryIcons = {
  Food: Utensils,
  Transport: Car,
  Shopping: ShoppingBag,
  Bills: Receipt,
  Entertainment: Film,
  Education: GraduationCap,
  Healthcare: HeartPulse,
  Travel: Plane,
  Salary: Briefcase,
  Freelance: Briefcase,
  Other: Tag
};

export const TransactionTable = ({
  transactions = [],
  currency = 'INR',
  currencySymbol = '₹',
  isCompact = false,
  onEdit = null,
  onDelete = null,
  onViewAll = null
}) => {
  const displayItems = isCompact ? transactions.slice(0, 5) : transactions;

  return (
    <div className="w-full bg-[#121821] border border-[#1E2633] rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      {isCompact && (
        <div className="px-6 py-4 border-b border-[#1E2633] flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Recent Transactions</h3>
            <p className="text-xs text-slate-400">Latest activity from your connected accounts</p>
          </div>
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="text-xs font-semibold text-[#D4AF37] hover:text-[#E5C158] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-[#1E2633] bg-[#0B0F14]/40 text-slate-400 font-medium uppercase text-[11px] tracking-wider">
              <th className="py-3 px-4 sm:px-6">Date</th>
              <th className="py-3 px-4 sm:px-6">Description</th>
              <th className="py-3 px-4 sm:px-6">Category</th>
              <th className="py-3 px-4 sm:px-6 text-right">Amount</th>
              {!isCompact && <th className="py-3 px-4 sm:px-6 text-center">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E2633]/60">
            {displayItems.length === 0 ? (
              <tr>
                <td colSpan={isCompact ? 4 : 5} className="py-8 text-center text-slate-400 text-xs">
                  No transactions found matching your criteria.
                </td>
              </tr>
            ) : (
              displayItems.map((tx) => {
                const IconComponent = categoryIcons[tx.category] || Tag;
                const catColor = CATEGORY_COLORS[tx.category] || '#64748B';
                const isIncome = tx.type === 'income';

                return (
                  <tr
                    key={tx.id}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    {/* Date */}
                    <td className="py-3.5 px-4 sm:px-6 text-slate-400 whitespace-nowrap text-xs font-medium">
                      {formatShortDate(tx.date)}
                    </td>

                    {/* Description */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border"
                          style={{
                            backgroundColor: `${catColor}15`,
                            borderColor: `${catColor}30`,
                            color: catColor
                          }}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-100 group-hover:text-white transition-colors">
                            {tx.description}
                          </div>
                          {tx.notes && (
                            <div className="text-[11px] text-slate-400 truncate max-w-xs sm:max-w-md">
                              {tx.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category Badge */}
                    <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
                        style={{
                          backgroundColor: `${catColor}12`,
                          color: catColor,
                          borderColor: `${catColor}30`
                        }}
                      >
                        {tx.category}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap font-bold">
                      <span className={isIncome ? 'text-emerald-400' : 'text-slate-100'}>
                        {isIncome ? '+' : '-'}
                        {formatCurrency(tx.amount, currency, currencySymbol)}
                      </span>
                    </td>

                    {/* Actions */}
                    {!isCompact && (
                      <td className="py-3.5 px-4 sm:px-6 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                          {onEdit && (
                            <button
                              onClick={() => onEdit(tx)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors cursor-pointer"
                              title="Edit transaction"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => onDelete(tx.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                              title="Delete transaction"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
