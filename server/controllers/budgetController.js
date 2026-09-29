import { getStorage, saveStorage, calculateFinancialSummary } from '../services/storageService.js';

export const getBudgets = async (req, res) => {
  try {
    const db = await getStorage();
    const summary = await calculateFinancialSummary();

    res.json({
      success: true,
      budgets: db.budgets || [],
      income: db.user?.monthlyIncome || 60000,
      categoryAnalysis: summary.categoryAnalysis,
      totalBudget: summary.totalBudget,
      totalExpenses: summary.totalExpenses,
      budgetUtilization: summary.budgetUtilization,
      healthScore: summary.healthScore,
      healthStatus: summary.healthStatus
    });
  } catch (err) {
    console.error('Error fetching budgets:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve budgets.' });
  }
};

export const updateBudgets = async (req, res) => {
  try {
    const { budgets, monthlyIncome } = req.body;
    const db = await getStorage();

    if (monthlyIncome && !isNaN(Number(monthlyIncome)) && Number(monthlyIncome) > 0) {
      db.user.monthlyIncome = Number(monthlyIncome);
    }

    if (Array.isArray(budgets)) {
      budgets.forEach(incoming => {
        const index = db.budgets.findIndex(b => b.category.toLowerCase() === incoming.category?.toLowerCase() || b.id === incoming.id);
        if (index !== -1 && incoming.allocated !== undefined) {
          const val = Number(incoming.allocated);
          if (!isNaN(val) && val >= 0) {
            db.budgets[index].allocated = val;
          }
        }
      });
    }

    await saveStorage(db);
    const summary = await calculateFinancialSummary();

    res.json({
      success: true,
      message: 'Budgets updated successfully.',
      budgets: db.budgets,
      summary
    });
  } catch (err) {
    console.error('Error updating budgets:', err);
    res.status(500).json({ success: false, message: 'Failed to update budgets.' });
  }
};
