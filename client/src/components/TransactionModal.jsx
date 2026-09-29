import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Input, Select } from './Input';
import { Button } from './Button';
import { CATEGORIES } from '../utils/helpers';

export const TransactionModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  currencySymbol = '₹'
}) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        description: initialData.description || '',
        amount: initialData.amount || '',
        type: initialData.type || 'expense',
        category: initialData.category || 'Food',
        date: initialData.date || new Date().toISOString().split('T')[0],
        notes: initialData.notes || ''
      });
    } else {
      setFormData({
        description: '',
        amount: '',
        type: 'expense',
        category: 'Food',
        date: new Date().toISOString().split('T')[0],
        notes: ''
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validate = () => {
    const errs = {};
    if (!formData.description.trim()) {
      errs.description = 'Description is required';
    }
    const num = Number(formData.amount);
    if (!formData.amount || isNaN(num) || num <= 0) {
      errs.amount = 'Please enter a valid positive amount';
    }
    if (!formData.category) {
      errs.category = 'Category is required';
    }
    if (!formData.date) {
      errs.date = 'Date is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await onSubmit({
        ...formData,
        amount: Number(formData.amount)
      });
      onClose();
    } catch (err) {
      setErrors({ form: err.message || 'Failed to save transaction' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Transaction' : 'Record New Transaction'}
      subtitle="Log your income or expense to keep your budget health accurate"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.form && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400">
            {errors.form}
          </div>
        )}

        {/* Type Toggle: Expense / Income */}
        <div className="flex p-1 bg-[#0B0F14] border border-[#1E2633] rounded-xl">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, type: 'expense' })}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              formData.type === 'expense'
                ? 'bg-red-500/20 text-red-400 border border-red-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            💸 Expense
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, type: 'income' })}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              formData.type === 'income'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            💰 Income
          </button>
        </div>

        {/* Description */}
        <Input
          label="Description"
          placeholder="e.g. Swiggy, Amazon, Metro Recharge"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          error={errors.description}
          autoFocus
        />

        {/* Amount & Category in 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label={`Amount (${currencySymbol})`}
            type="number"
            step="any"
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            error={errors.amount}
          />

          <Select
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            options={
              formData.type === 'income'
                ? ['Salary', 'Freelance', 'Investments', 'Gift', 'Other']
                : CATEGORIES
            }
            error={errors.category}
          />
        </div>

        {/* Date */}
        <Input
          label="Date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          error={errors.date}
        />

        {/* Notes */}
        <Input
          label="Notes (Optional)"
          placeholder="Add tags or memo details..."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1E2633]">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            {initialData ? 'Update Transaction' : 'Save Transaction'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
