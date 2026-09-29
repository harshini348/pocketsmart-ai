import React from 'react';
import {
  LayoutDashboard,
  ReceiptText,
  PieChart,
  Sparkles,
  BotMessageSquare,
  BarChart3,
  Settings,
  PlusCircle,
  ExternalLink,
  ShieldCheck,
  X
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Sidebar = ({
  activeTab,
  setActiveTab,
  onOpenAddModal,
  mobileOpen,
  setMobileOpen
}) => {
  const { user } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ReceiptText },
    { id: 'budget', label: 'Budget Planner', icon: PieChart },
    { id: 'recommendations', label: 'AI Insights', icon: Sparkles, badge: 'AI' },
    { id: 'assistant', label: 'Ask Assistant', icon: BotMessageSquare, badge: 'New' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#0B0F14] border-r border-[#1E2633] flex flex-col z-50 transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand / Logo Header */}
        <div className="p-5 border-b border-[#1E2633] flex items-center justify-between">
          <button
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-[#FFF0B3] flex items-center justify-center text-xl shadow-lg shadow-[#D4AF37]/20 group-hover:scale-105 transition-transform">
              💰
            </div>
            <div>
              <div className="font-bold text-base tracking-tight text-[#F8FAFC] flex items-center gap-1">
                PocketSmart <span className="text-[#D4AF37]">AI</span>
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                Spend smarter. Save better.
              </div>
            </div>
          </button>

          {/* Mobile close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action Button */}
        <div className="p-4 pb-2">
          <button
            onClick={() => {
              if (onOpenAddModal) onOpenAddModal();
              if (setMobileOpen) setMobileOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl gold-gradient-bg text-[#0B0F14] font-semibold text-xs uppercase tracking-wider shadow-lg shadow-[#D4AF37]/20 hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            Add Transaction
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-3 py-3 overflow-y-auto space-y-1">
          <div className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Core Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#121821] text-[#D4AF37] border border-[#D4AF37]/30 shadow-md shadow-black/40'
                    : 'text-slate-400 hover:text-white hover:bg-[#121821]/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#D4AF37]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${
                      isActive
                        ? 'bg-[#D4AF37]/20 text-[#D4AF37]'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-4 px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Public
          </div>
          <button
            onClick={() => handleNavClick('landing')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'landing'
                ? 'bg-[#121821] text-[#D4AF37] border border-[#D4AF37]/30'
                : 'text-slate-400 hover:text-white hover:bg-[#121821]/60'
            }`}
          >
            <ExternalLink className="w-4 h-4 text-slate-400" />
            <span>Landing Page</span>
          </button>
        </div>

        {/* User Profile / Status Footer */}
        <div className="p-3 border-t border-[#1E2633] bg-[#0B0F14]">
          <div
            onClick={() => handleNavClick('settings')}
            className="flex items-center justify-between p-2.5 rounded-xl bg-[#121821] border border-[#1E2633] hover:border-[#D4AF37]/30 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center font-bold text-xs text-[#D4AF37]">
                {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-white truncate max-w-[110px]">
                  {user.name || 'User'}
                </div>
                <div className="text-[10px] text-slate-400">
                  {user.currency || 'INR'} · ₹{(user.monthlyIncome || 60000).toLocaleString('en-IN')}/mo
                </div>
              </div>
            </div>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
        </div>
      </aside>
    </>
  );
};
