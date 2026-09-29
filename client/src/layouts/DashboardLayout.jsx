import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';

export const DashboardLayout = ({
  activeTab,
  setActiveTab,
  onOpenAddModal,
  aiStatus = {},
  summary = {},
  goals = [],
  children
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#F8FAFC] flex selection:bg-[#D4AF37]/30 selection:text-white">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddModal={onOpenAddModal}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setMobileOpen={setMobileOpen}
          aiStatus={aiStatus}
          summary={summary}
          goals={goals}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-16">
          {children}
        </main>
      </div>
    </div>
  );
};
