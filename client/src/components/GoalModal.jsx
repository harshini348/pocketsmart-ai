import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Input, Select } from './Input';
import { Button } from './Button';

export const GoalModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  currencySymbol = '₹'
}) => {
  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    savedAmount: '',
    targetDate: '2027-03-31',
    category: 'Electronics',
    priority: 'medium'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        targetAmount: initialData.targetAmount || '',
        savedAmount: initialData.savedAmount || '0',
        targetDate: initialData.targetDate || '2027-03-31',
        category: initialData.category || 'Electronics',
        priority: initialData.priority || 'medium'
      });
    } else {
      setFormData({
        title: '',
        targetAmount: '',
        savedAmount: '0',
        targetDate: '2027-03-31',
        category: 'Electronics',
        priority: 'medium'
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) {
      errs.title = 'Goal title is required';
    }
    const target = Number(formData.targetAmount);
    if (!formData.targetAmount || isNaN(target) || target <= 0) {
      errs.targetAmount = 'Please enter a valid target amount';
    }
    const saved = Number(formData.savedAmount);
    if (formData.savedAmount !== '' && (isNaN(saved) || saved < 0)) {
      errs.savedAmount = 'Saved amount cannot be negative';
    }
    if (!formData.targetDate) {
      errs.targetDate = 'Target date is required';
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
        targetAmount: Number(formData.targetAmount),
        savedAmount: Number(formData.savedAmount || 0)
      });
      onClose();
    } catch (err) {
      setErrors({ form: err.message || 'Failed to save savings goal' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Savings Goal' : 'Create New Savings Goal'}
      subtitle="Define a target, timeline, and track contributions toward what matters"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.form && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400">
            {errors.form}
          </div>
        )}

        {/* Title */}
        <Input
          label="Goal Title"
          placeholder="e.g. New Laptop, Emergency Fund, Vacation"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          error={errors.title}
          autoFocus
        />

        {/* Amounts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label={`Target Amount (${currencySymbol})`}
            type="number"
            placeholder="60000"
            value={formData.targetAmount}
            onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
            error={errors.targetAmount}
          />

          <Input
            label={`Currently Saved (${currencySymbol})`}
            type="number"
            placeholder="0"
            value={formData.savedAmount}
            onChange={(e) => setFormData({ ...formData, savedAmount: e.target.value })}
            error={errors.savedAmount}
          />
        </div>

        {/* Target Date & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Target Completion Date"
            type="date"
            value={formData.targetDate}
            onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
            error={errors.targetDate}
          />

          <Select
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            options={['Electronics', 'Safety', 'Travel', 'Vehicle', 'Education', 'Home', 'Investment', 'Other']}
          />
        </div>

        {/* Priority */}
        <Select
          label="Priority"
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
          options={[
            { value: 'critical', label: 'Critical (High Urgency)' },
            { value: 'high', label: 'High Priority' },
            { value: 'medium', label: 'Medium Priority' },
            { value: 'low', label: 'Flexible / Low Priority' }
          ]}
        />

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1E2633]">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            {initialData ? 'Update Goal' : 'Create Goal'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
