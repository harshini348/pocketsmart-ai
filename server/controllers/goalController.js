import { getStorage, saveStorage } from '../services/storageService.js';
import crypto from 'crypto';

export const getGoals = async (req, res) => {
  try {
    const db = await getStorage();
    const goals = (db.goals || []).map(g => {
      const target = Number(g.targetAmount) || 1;
      const saved = Number(g.savedAmount) || 0;
      const remaining = Math.max(0, target - saved);
      const percent = Math.min(100, Math.round((saved / target) * 100));

      return {
        ...g,
        remaining,
        percent
      };
    });

    res.json({
      success: true,
      goals
    });
  } catch (err) {
    console.error('Error fetching goals:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve savings goals.' });
  }
};

export const addGoal = async (req, res) => {
  try {
    const { title, targetAmount, savedAmount, targetDate, category, priority } = req.body;

    if (!title || !targetAmount) {
      return res.status(400).json({ success: false, message: 'Goal title and target amount are required.' });
    }

    const numTarget = Number(targetAmount);
    const numSaved = Number(savedAmount || 0);

    if (isNaN(numTarget) || numTarget <= 0) {
      return res.status(400).json({ success: false, message: 'Target amount must be a positive number.' });
    }

    const db = await getStorage();
    const newGoal = {
      id: `goal-${Date.now()}-${crypto.randomBytes(2).toString('hex')}`,
      title: title.trim(),
      targetAmount: numTarget,
      savedAmount: Math.max(0, numSaved),
      targetDate: targetDate || '2027-12-31',
      category: category || 'General',
      priority: priority || 'medium',
      color: '#D4AF37'
    };

    db.goals.push(newGoal);
    await saveStorage(db);

    const remaining = Math.max(0, newGoal.targetAmount - newGoal.savedAmount);
    const percent = Math.min(100, Math.round((newGoal.savedAmount / newGoal.targetAmount) * 100));

    res.status(201).json({
      success: true,
      message: 'Savings goal created.',
      goal: { ...newGoal, remaining, percent }
    });
  } catch (err) {
    console.error('Error adding goal:', err);
    res.status(500).json({ success: false, message: 'Failed to create savings goal.' });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, targetAmount, savedAmount, addAmount, targetDate, category, priority } = req.body;

    const db = await getStorage();
    const index = db.goals.findIndex(g => g.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Savings goal not found.' });
    }

    const current = db.goals[index];
    let newSaved = current.savedAmount;

    // Support incremental savings deposit
    if (addAmount !== undefined && !isNaN(Number(addAmount))) {
      newSaved = Math.max(0, Number(newSaved) + Number(addAmount));
    } else if (savedAmount !== undefined && !isNaN(Number(savedAmount))) {
      newSaved = Math.max(0, Number(savedAmount));
    }

    let newTarget = current.targetAmount;
    if (targetAmount !== undefined && !isNaN(Number(targetAmount)) && Number(targetAmount) > 0) {
      newTarget = Number(targetAmount);
    }

    db.goals[index] = {
      ...current,
      title: title !== undefined ? title.trim() : current.title,
      targetAmount: newTarget,
      savedAmount: newSaved,
      targetDate: targetDate || current.targetDate,
      category: category || current.category,
      priority: priority || current.priority
    };

    await saveStorage(db);

    const updated = db.goals[index];
    const remaining = Math.max(0, updated.targetAmount - updated.savedAmount);
    const percent = Math.min(100, Math.round((updated.savedAmount / updated.targetAmount) * 100));

    res.json({
      success: true,
      message: 'Savings goal updated.',
      goal: { ...updated, remaining, percent }
    });
  } catch (err) {
    console.error('Error updating goal:', err);
    res.status(500).json({ success: false, message: 'Failed to update savings goal.' });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await getStorage();
    const len = db.goals.length;

    db.goals = db.goals.filter(g => g.id !== id);

    if (db.goals.length === len) {
      return res.status(404).json({ success: false, message: 'Savings goal not found.' });
    }

    await saveStorage(db);

    res.json({
      success: true,
      message: 'Savings goal deleted.'
    });
  } catch (err) {
    console.error('Error deleting goal:', err);
    res.status(500).json({ success: false, message: 'Failed to delete savings goal.' });
  }
};
