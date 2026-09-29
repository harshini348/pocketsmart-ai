import React, { useState, useEffect, useCallback } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { ToastProvider, useToast } from './components/Toast';
import { api } from './services/api';
import { DashboardLayout } from './layouts/DashboardLayout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { BudgetPage } from './pages/BudgetPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { TransactionModal } from './components/TransactionModal';
import { GoalModal } from './components/GoalModal';

const AppContent = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  // Navigation tab state: 'landing' | 'login' | 'register' | 'dashboard' | 'transactions' | 'budget' | 'recommendations' | 'assistant' | 'analytics' | 'settings'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Core Data States
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [categoryAnalysis, setCategoryAnalysis] = useState([]);
  const [goals, setGoals] = useState([]);
  const [summary, setSummary] = useState({});
  const [aiStatus, setAiStatus] = useState({ configured: false, mode: 'demo' });
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Modals
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const currency = user?.currency || 'INR';
  const currencySymbol = user?.currencySymbol || '₹';

  // Load initial data from backend
  const loadAllData = useCallback(async () => {
    try {
      const [txRes, bgtRes, goalsRes, statusRes] = await Promise.all([
        api.getTransactions(),
        api.getBudgets(),
        api.getGoals(),
        api.getAIStatus()
      ]);

      if (txRes.transactions) setTransactions(txRes.transactions);
      if (txRes.summary) setSummary(txRes.summary);
      if (bgtRes.budgets) setBudgets(bgtRes.budgets);
      if (bgtRes.categoryAnalysis) setCategoryAnalysis(bgtRes.categoryAnalysis);
      if (goalsRes.goals) setGoals(goalsRes.goals);
      if (statusRes) setAiStatus(statusRes);

      // Trigger initial AI analysis
      runAIAnalysis(txRes.transactions, bgtRes.budgets, goalsRes.goals, txRes.summary);
    } catch (err) {
      console.warn('Initial data load warning:', err.message);
      showToast('Connecting to local server...', 'info');
    } finally {
      setInitialLoading(false);
    }
  }, []);

  const runAIAnalysis = async (txs = transactions, bgts = budgets, gls = goals, smm = summary) => {
    setLoadingAI(true);
    try {
      const res = await api.analyzeFinances({
        income: user?.monthlyIncome || 60000,
        expenses: txs,
        budgets: bgts,
        goals: gls,
        healthScore: smm.healthScore
      });
      if (res.data) {
        setAiAnalysis(res.data);
      }
    } catch (err) {
      console.error('Failed to run AI analysis:', err);
    } finally {
      setLoadingAI(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Transaction Handlers
  const handleSaveTransaction = async (txData) => {
    try {
      if (editingTransaction) {
        const res = await api.updateTransaction(editingTransaction.id, txData);
        setTransactions((prev) =>
          prev.map((t) => (t.id === editingTransaction.id ? res.transaction : t))
        );
        if (res.summary) setSummary(res.summary);
        showToast('Transaction updated successfully', 'success');
      } else {
        const res = await api.addTransaction(txData);
        setTransactions((prev) => [res.transaction, ...prev]);
        if (res.summary) setSummary(res.summary);
        showToast('Transaction recorded successfully', 'success');
      }
      setIsTransactionModalOpen(false);
      setEditingTransaction(null);
      // Refresh budgets/categories analysis
      const bgtRes = await api.getBudgets();
      if (bgtRes.categoryAnalysis) setCategoryAnalysis(bgtRes.categoryAnalysis);
    } catch (err) {
      showToast(err.message || 'Error saving transaction', 'error');
      throw err;
    }
  };

  const handleDeleteTransaction = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) return;
    try {
      const res = await api.deleteTransaction(id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      if (res.summary) setSummary(res.summary);
      showToast('Transaction deleted', 'info');
      const bgtRes = await api.getBudgets();
      if (bgtRes.categoryAnalysis) setCategoryAnalysis(bgtRes.categoryAnalysis);
    } catch (err) {
      showToast(err.message || 'Failed to delete transaction', 'error');
    }
  };

  // Budget Handlers
  const handleUpdateBudgets = async (updatedBudgets) => {
    try {
      const res = await api.updateBudgets({ budgets: updatedBudgets });
      setBudgets(res.budgets);
      if (res.summary) {
        setSummary(res.summary);
        setCategoryAnalysis(res.summary.categoryAnalysis);
      }
      showToast('Budget allocations saved successfully', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to update budgets', 'error');
    }
  };

  // Goal Handlers
  const handleSaveGoal = async (goalData) => {
    try {
      if (editingGoal) {
        const res = await api.updateGoal(editingGoal.id, goalData);
        setGoals((prev) =>
          prev.map((g) => (g.id === editingGoal.id ? res.goal : g))
        );
        showToast('Savings goal updated', 'success');
      } else {
        const res = await api.addGoal(goalData);
        setGoals((prev) => [...prev, res.goal]);
        showToast('New savings goal created!', 'success');
      }
      setIsGoalModalOpen(false);
      setEditingGoal(null);
    } catch (err) {
      showToast(err.message || 'Failed to save goal', 'error');
      throw err;
    }
  };

  const handleDeleteGoal = async (id) => {
    if (!window.confirm('Delete this savings goal?')) return;
    try {
      await api.deleteGoal(id);
      setGoals((prev) => prev.filter((g) => g.id !== id));
      showToast('Savings goal deleted', 'info');
    } catch (err) {
      showToast(err.message || 'Failed to delete goal', 'error');
    }
  };

  const handleAddSavingsToGoal = async (goal, amount) => {
    try {
      const res = await api.updateGoal(goal.id, { addAmount: amount });
      setGoals((prev) =>
        prev.map((g) => (g.id === goal.id ? res.goal : g))
      );
      showToast(`Added ${currencySymbol}${amount.toLocaleString('en-IN')} to "${goal.title}"!`, 'success');
    } catch (err) {
      showToast(err.message || 'Failed to add savings', 'error');
    }
  };

  // Reset Demo Dataset Handler
  const handleResetDemoData = async () => {
    await api.resetDemoData();
    await loadAllData();
  };

  // Render Public / Auth pages if selected
  if (activeTab === 'landing') {
    return (
      <LandingPage
        onGetStarted={() => setActiveTab('dashboard')}
        onExploreDashboard={() => setActiveTab('dashboard')}
        onLogin={() => setActiveTab('login')}
      />
    );
  }

  if (activeTab === 'login') {
    return (
      <LoginPage
        onNavigateToRegister={() => setActiveTab('register')}
        onLoginSuccess={() => setActiveTab('dashboard')}
      />
    );
  }

  if (activeTab === 'register') {
    return (
      <RegisterPage
        onNavigateToLogin={() => setActiveTab('login')}
        onRegisterSuccess={() => setActiveTab('dashboard')}
      />
    );
  }

  // Dashboard & Authenticated View
  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onOpenAddModal={() => {
        setEditingTransaction(null);
        setIsTransactionModalOpen(true);
      }}
      aiStatus={aiStatus}
      summary={summary}
      goals={goals}
    >
      {activeTab === 'dashboard' && (
        <DashboardPage
          summary={summary}
          transactions={transactions}
          budgets={budgets}
          goals={goals}
          onOpenAddTransaction={() => {
            setEditingTransaction(null);
            setIsTransactionModalOpen(true);
          }}
          onNavigate={setActiveTab}
          onRunAnalysis={() => runAIAnalysis()}
          aiAnalysis={aiAnalysis}
          currency={currency}
          currencySymbol={currencySymbol}
        />
      )}

      {activeTab === 'transactions' && (
        <TransactionsPage
          transactions={transactions}
          summary={summary}
          onOpenAddModal={() => {
            setEditingTransaction(null);
            setIsTransactionModalOpen(true);
          }}
          onEditTransaction={(tx) => {
            setEditingTransaction(tx);
            setIsTransactionModalOpen(true);
          }}
          onDeleteTransaction={handleDeleteTransaction}
          currency={currency}
          currencySymbol={currencySymbol}
        />
      )}

      {activeTab === 'budget' && (
        <BudgetPage
          budgets={budgets}
          categoryAnalysis={categoryAnalysis}
          goals={goals}
          income={user?.monthlyIncome || 60000}
          onUpdateBudgets={handleUpdateBudgets}
          onOpenAddGoal={() => {
            setEditingGoal(null);
            setIsGoalModalOpen(true);
          }}
          onEditGoal={(goal) => {
            setEditingGoal(goal);
            setIsGoalModalOpen(true);
          }}
          onDeleteGoal={handleDeleteGoal}
          onAddSavings={handleAddSavingsToGoal}
          currency={currency}
          currencySymbol={currencySymbol}
        />
      )}

      {activeTab === 'recommendations' && (
        <RecommendationsPage
          aiData={aiAnalysis}
          aiStatus={aiStatus}
          loading={loadingAI}
          onRefresh={() => runAIAnalysis()}
          currency={currency}
          currencySymbol={currencySymbol}
        />
      )}

      {activeTab === 'assistant' && (
        <AIAssistantPage
          financialContext={{
            income: user?.monthlyIncome || 60000,
            totalExpenses: summary.totalExpenses,
            savingsRate: summary.savingsRate,
            healthScore: summary.healthScore,
            topCategory: summary.topCategory,
            topCategoryAmount: summary.topCategoryAmount,
            overspentCategories: summary.overspentCategories,
            goals: goals
          }}
          currency={currency}
          currencySymbol={currencySymbol}
        />
      )}

      {activeTab === 'analytics' && (
        <AnalyticsPage
          summary={summary}
          budgets={budgets}
          transactions={transactions}
          currency={currency}
          currencySymbol={currencySymbol}
        />
      )}

      {activeTab === 'settings' && (
        <SettingsPage
          aiStatus={aiStatus}
          onResetData={handleResetDemoData}
          onProfileUpdated={loadAllData}
        />
      )}

      {/* Reusable Transaction Modal */}
      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => {
          setIsTransactionModalOpen(false);
          setEditingTransaction(null);
        }}
        onSubmit={handleSaveTransaction}
        initialData={editingTransaction}
        currencySymbol={currencySymbol}
      />

      {/* Reusable Goal Modal */}
      <GoalModal
        isOpen={isGoalModalOpen}
        onClose={() => {
          setIsGoalModalOpen(false);
          setEditingGoal(null);
        }}
        onSubmit={handleSaveGoal}
        initialData={editingGoal}
        currencySymbol={currencySymbol}
      />
    </DashboardLayout>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AuthProvider>
  );
}
