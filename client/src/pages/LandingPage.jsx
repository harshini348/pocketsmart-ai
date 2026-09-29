import React from 'react';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  PieChart,
  ShieldCheck,
  Bot,
  Zap,
  Target,
  CheckCircle2,
  Lock,
  ChevronRight,
  Receipt
} from 'lucide-react';
import { Button } from '../components/Button';

export const LandingPage = ({ onGetStarted, onExploreDashboard, onLogin }) => {
  const workflowSteps = [
    { step: '01', title: 'Track', desc: 'Log and categorize your daily income and expenditures seamlessly.' },
    { step: '02', title: 'Analyze', desc: 'Compute real-time Budget Health scores and category variances.' },
    { step: '03', title: 'Recommend', desc: 'Receive tailored Gemini AI insights on where to optimize and save.' },
    { step: '04', title: 'Save', desc: 'Watch your emergency funds and goal milestones accelerate.' },
  ];

  const features = [
    {
      icon: Receipt,
      title: 'Smart Expense Tracking',
      tagline: 'Track Every Rupee',
      desc: 'Understand exactly where your money goes with automatic category tagging and clean transaction management.'
    },
    {
      icon: Sparkles,
      title: 'AI Budget Recommendations',
      tagline: 'Get AI Insights',
      desc: 'Receive personalized suggestions from PocketSmart AI powered by Google Gemini to reduce leaks without painful sacrifice.'
    },
    {
      icon: PieChart,
      title: 'Spending Analytics',
      tagline: 'Plan Smarter',
      desc: 'Create realistic budgets based on your actual spending patterns, variance heatmaps, and cash flow trends.'
    },
    {
      icon: Target,
      title: 'Personalized Saving Tips',
      tagline: 'Reach Your Goals',
      desc: 'Turn your savings goals into actionable plans with automated projections and affordability evaluations.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#F8FAFC] selection:bg-[#D4AF37]/30 selection:text-white flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="border-b border-[#1E2633] bg-[#0B0F14]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-[#FFF0B3] flex items-center justify-center text-xl shadow-lg shadow-[#D4AF37]/20">
              💰
            </div>
            <div>
              <div className="font-bold text-lg tracking-tight text-white flex items-center gap-1">
                PocketSmart <span className="text-[#D4AF37]">AI</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Spend smarter. Save better.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onLogin}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <Button
              variant="primary"
              size="sm"
              onClick={onExploreDashboard}
              icon={ArrowRight}
            >
              Explore Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
          {/* Ambient Gold Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] mb-6 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Personal Finance Powered by Gemini AI</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            PocketSmart <span className="gold-gradient-text">AI</span>
          </h1>
          <p className="mt-4 text-xl sm:text-2xl font-semibold text-slate-200">
            “Your Smart Budget & Recommendation Assistant”
          </p>

          <p className="mt-5 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Take control of your money with intelligent expense tracking, personalized budgets, and AI-powered recommendations.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={onGetStarted}
              className="w-full sm:w-auto text-base px-8 py-3.5 shadow-xl shadow-[#D4AF37]/25"
            >
              Get Started Free
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={onExploreDashboard}
              icon={ChevronRight}
              className="w-full sm:w-auto text-base px-7 py-3.5 border-[#1E2633]"
            >
              Explore Dashboard Demo
            </Button>
          </div>

          {/* Interactive Metric Preview Banner */}
          <div className="mt-16 p-4 sm:p-6 rounded-3xl bg-[#121821] border border-[#1E2633] max-w-4xl mx-auto shadow-2xl relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left divide-y sm:divide-y-0 sm:divide-x divide-[#1E2633]">
              <div className="p-2 sm:px-4">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Total Balance</span>
                <div className="text-xl sm:text-2xl font-black text-white mt-1">₹42,500</div>
                <span className="text-[11px] text-emerald-400 font-medium">Healthy surplus</span>
              </div>
              <div className="p-2 sm:px-4">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Budget Health</span>
                <div className="text-xl sm:text-2xl font-black text-[#D4AF37] mt-1">72 / 100</div>
                <span className="text-[11px] text-[#D4AF37] font-medium">You're doing well</span>
              </div>
              <div className="p-2 sm:px-4">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Savings Rate</span>
                <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">29%</div>
                <span className="text-[11px] text-slate-400 font-medium">+9% vs target</span>
              </div>
              <div className="p-2 sm:px-4">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">AI Savings Found</span>
                <div className="text-xl sm:text-2xl font-black text-white mt-1">₹5,000/mo</div>
                <span className="text-[11px] text-slate-400 font-medium">3 active optimizations</span>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="py-16 bg-[#0E131A] border-y border-[#1E2633]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs uppercase font-bold text-[#D4AF37] tracking-wider">How It Works</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                Track → Analyze → Recommend → Save
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-lg mx-auto">
                A closed-loop smart financial engine designed to convert daily transactions into lifelong wealth.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {workflowSteps.map((ws, i) => (
                <div
                  key={ws.step}
                  className="p-6 rounded-2xl bg-[#121821] border border-[#1E2633] relative overflow-hidden group hover:border-[#D4AF37]/40 transition-all"
                >
                  <div className="text-3xl font-black text-[#D4AF37]/20 group-hover:text-[#D4AF37]/40 transition-colors mb-3">
                    {ws.step}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{ws.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{ws.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs uppercase font-bold text-[#D4AF37] tracking-wider">Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Engineered For Modern Financial Clarity
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="p-8 rounded-3xl bg-[#121821] border border-[#1E2633] hover:border-[#D4AF37]/40 transition-all duration-300 shadow-xl group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                      {feat.tagline}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1 mb-3">{feat.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#1E2633] flex items-center text-xs font-semibold text-slate-300 group-hover:text-[#D4AF37] transition-colors gap-1.5">
                    <span>Explore feature</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Call to action banner */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#121821] via-[#161F2C] to-[#121821] border border-[#D4AF37]/30 text-center relative overflow-hidden shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to take full command of your financial journey?
            </h3>
            <p className="text-sm text-slate-300 mt-3 max-w-xl mx-auto leading-relaxed">
              Launch your local dashboard with demo data or connect your Google Gemini API key for real-time generative financial analysis.
            </p>
            <div className="mt-8 flex justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={onExploreDashboard}
                className="px-8 shadow-xl shadow-[#D4AF37]/25 font-bold"
              >
                Launch Dashboard Now
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1E2633] bg-[#070A0E] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#1E2633]">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💰</span>
              <div>
                <div className="font-bold text-base text-white">PocketSmart AI</div>
                <div className="text-xs text-slate-400">
                  “Smart spending. Better planning. Confident decisions.”
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>

          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs text-slate-400">
            <p>© {new Date().getFullYear()} PocketSmart AI. All rights reserved.</p>
            <p className="max-w-xl text-[11px] leading-relaxed">
              Disclaimer: PocketSmart AI provides educational budgeting insights and does not constitute professional financial, investment, tax, or legal advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
