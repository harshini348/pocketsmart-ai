import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, Sparkles, Calendar, ChevronRight } from 'lucide-react';
import { NotificationPanel } from './NotificationPanel';
import { useAuth } from '../hooks/useAuth';

export const Navbar = ({
  activeTab,
  setActiveTab,
  setMobileOpen,
  aiStatus = {},
  summary = {},
  goals = []
}) => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef(null);

  const pageTitles = {
    dashboard: 'Financial Dashboard',
    transactions: 'Transaction Manager',
    budget: 'Budget & Goals Planner',
    recommendations: 'AI Financial Insights',
    assistant: 'PocketSmart AI Assistant',
    analytics: 'Financial Analytics & Trends',
    settings: 'Settings & Preferences',
    landing: 'Home'
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const alertCount =
    (summary.overspentCategories?.length || 0) +
    (summary.nearLimitCategories?.length || 0) +
    1; // at least 1 milestone/status alert

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0B0F14]/90 backdrop-blur-md border-b border-[#1E2633] px-4 lg:px-8 flex items-center justify-between">
      {/* Left section: Hamburger + Page Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#121821] border border-transparent hover:border-[#1E2633] transition-colors cursor-pointer"
          aria-label="Open mobile navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 hidden sm:inline">PocketSmart</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 hidden sm:inline" />
          <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
            {pageTitles[activeTab] || 'Dashboard'}
          </h1>
        </div>
      </div>

      {/* Right section: AI Status Pill + Date + Notifications + User Avatar */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Gemini Engine Pill */}
        <div
          onClick={() => setActiveTab('recommendations')}
          className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border cursor-pointer transition-all hover:scale-105 ${
            aiStatus.configured
              ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30 shadow-sm shadow-[#D4AF37]/10'
              : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
          }`}
          title={aiStatus.message}
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-current" />
          <span>{aiStatus.configured ? 'Gemini 2.5 Flash' : 'Demo AI Engine'}</span>
        </div>

        {/* Date display */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 px-3 py-1 rounded-lg bg-[#121821] border border-[#1E2633]">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>{todayFormatted}</span>
        </div>

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl bg-[#121821] text-slate-300 hover:text-white border border-[#1E2633] hover:border-[#D4AF37]/40 transition-all cursor-pointer"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D4AF37] text-[#0B0F14] text-[10px] font-bold flex items-center justify-center animate-pulse">
                {alertCount}
              </span>
            )}
          </button>

          <NotificationPanel
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
            summary={summary}
            goals={goals}
            onNavigate={setActiveTab}
          />
        </div>

        {/* Quick User Avatar */}
        <button
          onClick={() => setActiveTab('settings')}
          className="flex items-center gap-2 p-1 pl-2 sm:pr-2.5 rounded-full bg-[#121821] border border-[#1E2633] hover:border-[#D4AF37]/40 transition-all cursor-pointer"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#B89628] text-[#0B0F14] font-bold text-xs flex items-center justify-center">
            {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <span className="text-xs font-semibold text-slate-200 hidden sm:inline max-w-[80px] truncate">
            {user.name?.split(' ')[0] || 'User'}
          </span>
        </button>
      </div>
    </header>
  );
};
