import React, { useState } from 'react';
import { User, Mail, Lock, IndianRupee, Globe, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Input, Select } from '../components/Input';
import { Button } from '../components/Button';
import { useToast } from '../components/Toast';

export const RegisterPage = ({ onNavigateToLogin, onRegisterSuccess }) => {
  const { registerUser } = useAuth();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    monthlyIncome: '60000',
    currency: 'INR'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      await registerUser({
        ...formData,
        monthlyIncome: Number(formData.monthlyIncome)
      });
      showToast('Account created successfully! Welcome to PocketSmart AI.', 'success');
      if (onRegisterSuccess) onRegisterSuccess();
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] flex flex-col justify-center items-center p-4 selection:bg-[#D4AF37]/30">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#FFF0B3] items-center justify-center text-2xl shadow-xl shadow-[#D4AF37]/20 mb-3">
            💰
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Create Your Account
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Personalize your AI financial advisor with your baseline metrics
          </p>
        </div>

        {/* Card */}
        <div className="p-8 rounded-3xl bg-[#121821] border border-[#1E2633] shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400">
                {error}
              </div>
            )}

            <Input
              label="Full Name"
              type="text"
              placeholder="e.g. Alex Sharma"
              icon={User}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="alex@example.com"
              icon={Mail}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Monthly Income"
                type="number"
                placeholder="60000"
                icon={IndianRupee}
                value={formData.monthlyIncome}
                onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                required
              />

              <Select
                label="Currency"
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                options={[
                  { value: 'INR', label: 'INR (₹)' },
                  { value: 'USD', label: 'USD ($)' },
                  { value: 'EUR', label: 'EUR (€)' },
                  { value: 'GBP', label: 'GBP (£)' }
                ]}
              />
            </div>

            <div className="pt-3">
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="w-full py-3"
              >
                Create Account & Go to Dashboard
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-[#1E2633] text-center text-xs text-slate-400">
            Already have an account?{' '}
            <button
              onClick={onNavigateToLogin}
              className="text-[#D4AF37] hover:underline font-semibold cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
