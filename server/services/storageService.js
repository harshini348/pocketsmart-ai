import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialData } from '../data/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, '../data/db.json');

// Memory cache with file sync
let dbCache = null;

export const initStorage = async () => {
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    dbCache = JSON.parse(data);
  } catch (err) {
    // If file doesn't exist, initialize with seedData
    dbCache = JSON.parse(JSON.stringify(initialData));
    await saveStorage(dbCache);
  }
  return dbCache;
};

export const getStorage = async () => {
  if (!dbCache) {
    await initStorage();
  }
  return dbCache;
};

export const saveStorage = async (data) => {
  dbCache = data;
  try {
    await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write database file:', err);
  }
  return dbCache;
};

export const resetStorage = async () => {
  dbCache = JSON.parse(JSON.stringify(initialData));
  await saveStorage(dbCache);
  return dbCache;
};

// Summary & analytics helper
export const calculateFinancialSummary = async () => {
  const db = await getStorage();
  const transactions = db.transactions || [];
  const budgets = db.budgets || [];
  const user = db.user || {};
  const monthlyIncome = user.monthlyIncome || 60000;

  // Calculate totals
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const effectiveIncome = totalIncome > 0 ? totalIncome : monthlyIncome;
  const balance = effectiveIncome - totalExpenses;
  const savings = Math.max(0, balance);
  const savingsRate = effectiveIncome > 0 ? Math.round((savings / effectiveIncome) * 100) : 0;

  // Total allocated budget
  const totalBudget = budgets.reduce((sum, b) => sum + Number(b.allocated), 0);
  const budgetUtilization = totalBudget > 0 ? Math.round((totalExpenses / totalBudget) * 100) : 0;

  // Category breakdowns
  const categoryExpenses = {};
  budgets.forEach(b => {
    categoryExpenses[b.category] = 0;
  });

  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      const cat = t.category || 'Other';
      categoryExpenses[cat] = (categoryExpenses[cat] || 0) + Number(t.amount);
    });

  const categoryAnalysis = budgets.map(b => {
    const spent = categoryExpenses[b.category] || 0;
    const remaining = b.allocated - spent;
    const percent = b.allocated > 0 ? Math.round((spent / b.allocated) * 100) : 0;
    let status = 'within';
    if (percent > 100) status = 'exceeded';
    else if (percent >= 80) status = 'near_limit';

    return {
      id: b.id,
      category: b.category,
      allocated: b.allocated,
      spent,
      remaining,
      percent,
      status,
      icon: b.icon,
      color: b.color
    };
  });

  // Calculate dynamic Budget Health Score (0 - 100)
  let healthScore = 100;

  // 1. Overall budget vs expenses penalty (up to -30)
  if (totalBudget > 0) {
    if (totalExpenses > totalBudget) {
      const overspendRatio = (totalExpenses - totalBudget) / totalBudget;
      healthScore -= Math.min(30, Math.round(overspendRatio * 40));
    } else {
      // Reward staying well under budget
      const unusedRatio = (totalBudget - totalExpenses) / totalBudget;
      healthScore += Math.min(5, Math.round(unusedRatio * 10));
    }
  }

  // 2. Savings rate impact (up to -25 or +5)
  if (savingsRate >= 30) {
    healthScore += 5;
  } else if (savingsRate >= 20) {
    healthScore -= 3;
  } else if (savingsRate >= 10) {
    healthScore -= 12;
  } else {
    healthScore -= 25;
  }

  // 3. Category overspending penalty
  const overspentCategories = categoryAnalysis.filter(c => c.status === 'exceeded');
  healthScore -= Math.min(25, overspentCategories.length * 8);

  // 4. Near limit penalty
  const nearLimitCategories = categoryAnalysis.filter(c => c.status === 'near_limit');
  healthScore -= Math.min(10, nearLimitCategories.length * 3);

  // Clamp healthScore between 20 and 98
  healthScore = Math.min(98, Math.max(20, Math.round(healthScore)));

  let healthStatus = "You're doing well";
  if (healthScore >= 85) healthStatus = "Excellent financial control";
  else if (healthScore >= 70) healthStatus = "You're doing well";
  else if (healthScore >= 55) healthStatus = "Fair, needs budget adjustments";
  else healthStatus = "High spending alert, action required";

  // Top spending category
  let topCategory = 'None';
  let topCategoryAmount = 0;
  Object.entries(categoryExpenses).forEach(([cat, amt]) => {
    if (amt > topCategoryAmount) {
      topCategoryAmount = amt;
      topCategory = cat;
    }
  });

  // Highest single expense
  const expensesOnly = transactions.filter(t => t.type === 'expense');
  const highestExpense = expensesOnly.reduce(
    (max, t) => (Number(t.amount) > Number(max.amount || 0) ? t : max),
    { amount: 0, description: 'None' }
  );

  // Average daily spending (assuming current month has 30 days)
  const averageDailySpending = Math.round(totalExpenses / 30);

  return {
    balance,
    effectiveIncome,
    totalExpenses,
    savings,
    savingsRate,
    totalBudget,
    budgetUtilization,
    healthScore,
    healthStatus,
    topCategory,
    topCategoryAmount,
    highestExpense,
    averageDailySpending,
    categoryAnalysis,
    categoryExpenses,
    overspentCategories: overspentCategories.map(c => c.category),
    nearLimitCategories: nearLimitCategories.map(c => c.category)
  };
};
