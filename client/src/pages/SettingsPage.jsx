import React, { useState } from 'react';
import {
  User,
  IndianRupee,
  Bell,
  Moon,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  Save,
  Info
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Input, Select } from '../components/Input';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { useToast } from '../components/Toast';

export const SettingsPage = ({
  aiStatus = {},
  onResetData,
  onProfileUpdated
}) => {
  const { user, updateUserProfile } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: user.name || 'Alex Sharma',
    email: user.email || 'alex@example.com',
    monthlyIncome: String(user.monthlyIncome || 60000),
    currency: user.currency || 'INR',
    notifications: {
      budgetAlerts: true,
      savingMilestones: true,
      monthlyReports: true,
      overspendingWarning: true,
      ...(user.notifications || {})
    }
  });

  const [saving, setSaving] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetting, setResetting] = useState(false);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const sym =
        formData.currency === 'USD' ? '$' :
        formData.currency === 'EUR' ? '€' :
        formData.currency === 'GBP' ? '£' : '₹';

      await updateUserProfile({
        name: formData.name,
        email: formData.email,
        monthlyIncome: Number(formData.monthlyIncome),
        currency: formData.currency,
        currencySymbol: sym,
        notifications: formData.notifications
      });
      showToast('Profile and preferences updated successfully!', 'success');
      if (onProfileUpdated) onProfileUpdated();
    } catch (err) {
      showToast(err.message || 'Failed to update preferences', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmReset = async () => {
    setResetting(true);
    try {
      await onResetData();
      setShowResetModal(false);
      showToast('Demo data restored to initial state!', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to reset demo dataset', 'error');
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-300">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Settings & Account
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage your personal profile, baseline cash metrics, and application configurations
        </p>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* Profile Details */}
        <div className="p-6 rounded-2xl bg-[#121821] border border-[#1E2633] shadow-xl space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#1E2633]">
            <User className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="text-base font-bold text-white">Profile Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        {/* Financial Preferences */}
        <div className="p-6 rounded-2xl bg-[#121821] border border-[#1E2633] shadow-xl space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#1E2633]">
            <IndianRupee className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="text-base font-bold text-white">Currency & Income Parameters</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Baseline Monthly Income"
              type="number"
              value={formData.monthlyIncome}
              onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
            />

            <Select
              label="Operating Currency"
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              options={[
                { value: 'INR', label: 'Indian Rupee (INR - ₹)' },
                { value: 'USD', label: 'US Dollar (USD - $)' },
                { value: 'EUR', label: 'Euro (EUR - €)' },
                { value: 'GBP', label: 'British Pound (GBP - £)' }
              ]}
            />
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="p-6 rounded-2xl bg-[#121821] border border-[#1E2633] shadow-xl space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#1E2633]">
            <Bell className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="text-base font-bold text-white">Notification Preferences</h3>
          </div>

          <div className="space-y-3">
            {[
              { key: 'budgetAlerts', label: 'Budget Ceiling Alerts', desc: 'Notify when categories hit 80% or exceed monthly allocation' },
              { key: 'savingMilestones', label: 'Savings Milestones', desc: 'Celebrate reaching 25%, 50%, and 100% of targets' },
              { key: 'overspendingWarning', label: 'Impulse Overspending Watch', desc: 'Warn when single transactions exceed 10% of monthly income' },
              { key: 'monthlyReports', label: 'AI Monthly Digest', desc: 'Generate high-level summaries on the 1st of every month' }
            ].map((item) => (
              <label
                key={item.key}
                className="flex items-start gap-3 p-3 rounded-xl bg-[#0B0F14]/60 border border-[#1E2633] hover:border-[#D4AF37]/30 transition-all cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={!!formData.notifications[item.key]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      notifications: {
                        ...formData.notifications,
                        [item.key]: e.target.checked
                      }
                    })
                  }
                  className="mt-0.5 rounded text-[#D4AF37] focus:ring-[#D4AF37] border-[#1E2633] bg-[#121821] accent-[#D4AF37]"
                />
                <div>
                  <div className="text-xs font-semibold text-white">{item.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Gemini AI Status Card */}
        <div className="p-6 rounded-2xl bg-[#121821] border border-[#1E2633] shadow-xl space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2633]">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="text-base font-bold text-white">Google Gemini Integration</h3>
            </div>
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                aiStatus.configured
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
              }`}
            >
              {aiStatus.configured ? '● Live API Connected' : '○ Demo Fallback Mode'}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {aiStatus.message}
          </p>

          {!aiStatus.configured && (
            <div className="p-3 rounded-xl bg-[#0B0F14] border border-[#1E2633] text-[11px] text-slate-400 space-y-1">
              <div className="font-semibold text-slate-200">How to activate live Gemini AI:</div>
              <div>1. Obtain a free API key from Google AI Studio (<a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="text-[#D4AF37] underline">aistudio.google.com</a>).</div>
              <div>2. Set <code className="bg-[#121821] px-1 py-0.5 rounded text-white font-mono">GEMINI_API_KEY=your_key_here</code> in <code className="bg-[#121821] px-1 py-0.5 rounded text-white font-mono">pocketsmart-ai/server/.env</code>.</div>
              <div>3. Restart the server. Live generative analysis will automatically engage!</div>
            </div>
          )}
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            loading={saving}
            icon={Save}
            className="px-6 py-2.5 shadow-lg shadow-[#D4AF37]/20 font-bold"
          >
            Save Preferences
          </Button>
        </div>
      </form>

      {/* Danger Zone: Data Reset */}
      <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/30 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 text-red-400">
          <ShieldAlert className="w-5 h-5" />
          <h3 className="text-base font-bold">Reset Demo Dataset</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Restore the demo transactions, category allocations, and savings goals back to their original factory demonstration values.
        </p>

        <Button
          type="button"
          variant="danger"
          onClick={() => setShowResetModal(true)}
          icon={RotateCcw}
        >
          Reset Demo Data
        </Button>
      </div>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Confirm Data Reset"
        subtitle="This action will restore all default seed transactions and budgets."
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed">
            Are you sure you want to reset your local data? Any transactions or goals you created manually will be restored to the initial demo configuration.
          </p>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1E2633]">
            <Button
              variant="secondary"
              onClick={() => setShowResetModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              loading={resetting}
              onClick={handleConfirmReset}
            >
              Yes, Reset Everything
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
