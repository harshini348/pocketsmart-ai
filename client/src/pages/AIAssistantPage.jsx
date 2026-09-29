import React, { useState } from 'react';
import { Bot, ShoppingBag, Sparkles, MessageSquare } from 'lucide-react';
import { AIChat } from '../components/AIChat';
import { AffordabilityCard } from '../components/AffordabilityCard';

export const AIAssistantPage = ({
  financialContext = {},
  currency = 'INR',
  currencySymbol = '₹'
}) => {
  const [activeMode, setActiveMode] = useState('chat'); // 'chat' | 'affordability'

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>24/7 Financial Guidance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Ask PocketSmart AI
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time chat coaching and intelligent purchase affordability evaluation
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex p-1 bg-[#121821] border border-[#1E2633] rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveMode('chat')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'chat'
                ? 'bg-[#0B0F14] text-[#D4AF37] border border-[#D4AF37]/30 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat Assistant</span>
          </button>

          <button
            onClick={() => setActiveMode('affordability')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'affordability'
                ? 'bg-[#0B0F14] text-[#D4AF37] border border-[#D4AF37]/30 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Can I Afford This?</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeMode === 'chat' ? (
        <AIChat financialContext={financialContext} />
      ) : (
        <div className="max-w-3xl mx-auto">
          <AffordabilityCard
            financialContext={financialContext}
            currency={currency}
            currencySymbol={currencySymbol}
          />
        </div>
      )}
    </div>
  );
};
