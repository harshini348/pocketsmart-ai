import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';

export const AIChat = ({ financialContext = {} }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 'msg-init',
      sender: 'assistant',
      text: `Hello ${user?.name ? user.name.split(' ')[0] : 'there'}! 👋 I'm **PocketSmart AI**, your personal budget advisor.\n\nI have loaded your live financial context (Income: ₹${(financialContext.income || 60000).toLocaleString('en-IN')}, Expenses: ₹${(financialContext.totalExpenses || 27000).toLocaleString('en-IN')}, Health Score: ${financialContext.healthScore || 72}/100).\n\nHow can I help you optimize your spending or reach your savings goals today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    'Where am I spending the most?',
    'How can I save ₹5,000 this month?',
    'Can I afford a ₹3,000 purchase?',
    'Why is my budget score low?',
    'Give me 3 ways to reduce my expenses.'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (questionText = null) => {
    const textToSend = questionText || input;
    if (!textToSend.trim() || loading) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!questionText) setInput('');
    setLoading(true);

    try {
      const response = await api.chatAssistant(textToSend.trim(), financialContext);
      const aiReply = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: response.reply,
        engine: response.engine,
        isDemo: response.isDemo,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      const errorReply = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `I'm currently unable to connect to the AI service. Please make sure the server is running. (${err.message})`,
        isError: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[650px] bg-[#121821] border border-[#1E2633] rounded-2xl shadow-2xl overflow-hidden">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-[#1E2633] bg-[#0B0F14]/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-[#FFF0B3] text-[#0B0F14] flex items-center justify-center font-bold shadow-md shadow-[#D4AF37]/20">
            🤖
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Ask PocketSmart AI</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[11px] text-slate-400">
              Personalized budgeting heuristics & conversational financial coaching
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: 'msg-init-reset',
                sender: 'assistant',
                text: `Chat restarted. Live financial context reloaded. What would you like to explore?`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]);
          }}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          title="Reset conversation"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Suggested Questions Pills */}
      <div className="px-5 py-2.5 bg-[#0B0F14]/30 border-b border-[#1E2633]/60 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[11px] text-[#D4AF37] font-semibold shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Quick Prompts:
        </span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            disabled={loading}
            className="text-[11px] font-medium px-3 py-1 rounded-full bg-[#17202C] hover:bg-[#D4AF37]/15 text-slate-300 hover:text-[#D4AF37] border border-[#1E2633] hover:border-[#D4AF37]/30 transition-all shrink-0 cursor-pointer disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-[#1E2633] text-slate-200'
                    : 'bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-[#D4AF37] text-[#0B0F14] font-medium shadow-md shadow-[#D4AF37]/10'
                    : 'bg-[#0B0F14] border border-[#1E2633] text-slate-200 shadow-md'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div
                  className={`text-[10px] mt-2 text-right ${
                    isUser ? 'text-[#0B0F14]/70 font-semibold' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {/* AI Loading State */}
        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-4 rounded-2xl bg-[#0B0F14] border border-[#1E2633] text-xs text-slate-300 flex items-center gap-2">
              <span className="text-[#D4AF37] font-semibold">PocketSmart AI is analyzing your spending</span>
              <span className="flex gap-1 ml-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] pulse-dot-1" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] pulse-dot-2" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] pulse-dot-3" />
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-[#1E2633] bg-[#0B0F14]/60">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask anything about your expenses, budgets, or savings goals..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            className="flex-1 bg-[#121821] border border-[#1E2633] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-2.5 rounded-xl gold-gradient-bg text-[#0B0F14] hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer shadow-md shadow-[#D4AF37]/20"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="text-[10px] text-slate-400 mt-2 text-center">
          PocketSmart AI provides educational budgeting advice and should be verified for personal decisions.
        </div>
      </div>
    </div>
  );
};
