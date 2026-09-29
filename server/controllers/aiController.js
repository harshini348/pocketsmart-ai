import {
  analyzeFinances,
  chatWithAssistant,
  checkAffordability,
  isGeminiConfigured
} from '../services/geminiService.js';
import { getStorage, calculateFinancialSummary } from '../services/storageService.js';

export const getAIStatus = async (req, res) => {
  const configured = isGeminiConfigured();
  res.json({
    success: true,
    configured,
    mode: configured ? 'live' : 'demo',
    model: configured ? 'Gemini 2.5 Flash' : 'PocketSmart Intelligent Rule Engine',
    message: configured
      ? 'Google Gemini API is configured and active.'
      : 'Gemini API key is not configured in .env. Running in intelligent Demo AI mode with realistic financial insights.'
  });
};

export const runAnalysis = async (req, res) => {
  try {
    const db = await getStorage();
    const summary = await calculateFinancialSummary();

    const income = req.body.income || db.user?.monthlyIncome || 60000;
    const expenses = req.body.expenses || db.transactions || [];
    const budgets = req.body.budgets || db.budgets || [];
    const goals = req.body.goals || db.goals || [];

    const result = await analyzeFinances({
      income,
      expenses,
      budgets,
      goals,
      healthScore: summary.healthScore
    });

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    console.error('Error in runAnalysis controller:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to process AI financial analysis.'
    });
  }
};

export const chatAssistant = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ success: false, message: 'Message content is required.' });
    }

    const db = await getStorage();
    const summary = await calculateFinancialSummary();

    const financialContext = req.body.financialContext || {
      income: db.user?.monthlyIncome || 60000,
      totalExpenses: summary.totalExpenses,
      savingsRate: summary.savingsRate,
      healthScore: summary.healthScore,
      topCategory: summary.topCategory,
      topCategoryAmount: summary.topCategoryAmount,
      overspentCategories: summary.overspentCategories,
      goals: db.goals || []
    };

    const response = await chatWithAssistant(message, financialContext);

    res.json({
      success: true,
      reply: response.reply,
      isDemo: response.isDemo,
      engine: response.engine
    });
  } catch (err) {
    console.error('Error in chatAssistant controller:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to generate chat response.'
    });
  }
};

export const checkPurchaseAffordability = async (req, res) => {
  try {
    const { itemName, itemPrice } = req.body;

    if (!itemName || itemPrice === undefined) {
      return res.status(400).json({ success: false, message: 'Item name and price are required.' });
    }

    const db = await getStorage();
    const summary = await calculateFinancialSummary();

    const financialContext = req.body.financialContext || {
      income: db.user?.monthlyIncome || 60000,
      totalExpenses: summary.totalExpenses,
      savings: summary.savings,
      healthScore: summary.healthScore,
      goals: db.goals || []
    };

    const result = await checkAffordability(itemName, itemPrice, financialContext);

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    console.error('Error in checkPurchaseAffordability:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to evaluate affordability.'
    });
  }
};
