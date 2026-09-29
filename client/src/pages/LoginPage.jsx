import React, { useState } from 'react';
import { Mail, Lock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useToast } from '../components/Toast';

export const LoginPage = ({ onNavigateToRegister, onLoginSuccess }) => {
  const { loginUser } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState('alex@example.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide your email and password');
      return;
    }
    setError('');
    setLoading(true);

    try {
      await loginUser(email, password);
      showToast('Welcome back to PocketSmart AI!', 'success');
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('alex@example.com');
    setPassword('demo123');
    setLoading(true);
    try {
      await loginUser('alex@example.com', 'demo123');
      showToast('Logged in as demo user Alex Sharma!', 'success');
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] flex flex-col justify-center items-center p-4 selection:bg-[#D4AF37]/30">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#FFF0B3] items-center justify-center text-2xl shadow-xl shadow-[#D4AF37]/20 mb-3">
            💰
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Sign In to PocketSmart AI
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Access your intelligent budget dashboard & recommendations
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
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="w-full py-3"
              >
                Sign In
              </Button>
            </div>
          </form>

          {/* Quick Demo Login Option */}
          <div className="mt-5 pt-5 border-t border-[#1E2633] text-center">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 px-4 rounded-xl bg-[#17202C] hover:bg-[#D4AF37]/15 border border-[#1E2633] hover:border-[#D4AF37]/40 text-xs font-semibold text-slate-300 hover:text-[#D4AF37] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>1-Click Demo Login (Alex Sharma)</span>
            </button>
          </div>

          <div className="mt-5 text-center text-xs text-slate-400">
            Don't have an account?{' '}
            <button
              onClick={onNavigateToRegister}
              className="text-[#D4AF37] hover:underline font-semibold cursor-pointer"
            >
              Register here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
