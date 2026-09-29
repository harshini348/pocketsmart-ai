import { getStorage, saveStorage, calculateFinancialSummary } from '../services/storageService.js';
import crypto from 'crypto';

export const getTransactions = async (req, res) => {
  try {
    const db = await getStorage();
    let transactions = [...(db.transactions || [])];

    const { search, category, type, sortBy, sortOrder } = req.query;

    if (search) {
      const q = search.toLowerCase();
      transactions = transactions.filter(t => 
        (t.description && t.description.toLowerCase().includes(q)) ||
        (t.category && t.category.toLowerCase().includes(q)) ||
        (t.notes && t.notes.toLowerCase().includes(q))
      );
    }

    if (category && category !== 'All') {
      transactions = transactions.filter(t => t.category.toLowerCase() === category.toLowerCase());
    }

    if (type && type !== 'all') {
      transactions = transactions.filter(t => t.type === type);
    }

    // Sort
    if (sortBy === 'amount') {
      transactions.sort((a, b) => sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount);
    } else {
      // Default: sort by date desc
      transactions.sort((a, b) => {
        const diff = new Date(b.date) - new Date(a.date);
        return sortOrder === 'asc' ? -diff : diff;
      });
    }

    const summary = await calculateFinancialSummary();

    res.json({
      success: true,
      count: transactions.length,
      transactions,
      summary
    });
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve transactions.' });
  }
};

export const addTransaction = async (req, res) => {
  try {
    const { description, amount, type, category, date, notes } = req.body;

    if (!description || !amount || !category) {
      return res.status(400).json({ success: false, message: 'Description, amount, and category are required.' });
    }

    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ success: false, message: 'Amount must be a positive number.' });
    }

    const db = await getStorage();
    const newTx = {
      id: `tx-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
      description: description.trim(),
      amount: numericAmount,
      type: type === 'income' ? 'income' : 'expense',
      category: category.trim(),
      date: date || new Date().toISOString().split('T')[0],
      notes: notes ? notes.trim() : ''
    };

    db.transactions.unshift(newTx);
    await saveStorage(db);

    const summary = await calculateFinancialSummary();

    res.status(201).json({
      success: true,
      message: 'Transaction recorded successfully.',
      transaction: newTx,
      summary
    });
  } catch (err) {
    console.error('Error adding transaction:', err);
    res.status(500).json({ success: false, message: 'Failed to record transaction.' });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, type, category, date, notes } = req.body;

    const db = await getStorage();
    const index = db.transactions.findIndex(t => t.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Transaction not found.' });
    }

    const numericAmount = amount !== undefined ? Number(amount) : db.transactions[index].amount;
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ success: false, message: 'Amount must be a valid positive number.' });
    }

    db.transactions[index] = {
      ...db.transactions[index],
      description: description !== undefined ? description.trim() : db.transactions[index].description,
      amount: numericAmount,
      type: type || db.transactions[index].type,
      category: category || db.transactions[index].category,
      date: date || db.transactions[index].date,
      notes: notes !== undefined ? notes.trim() : db.transactions[index].notes
    };

    await saveStorage(db);
    const summary = await calculateFinancialSummary();

    res.json({
      success: true,
      message: 'Transaction updated successfully.',
      transaction: db.transactions[index],
      summary
    });
  } catch (err) {
    console.error('Error updating transaction:', err);
    res.status(500).json({ success: false, message: 'Failed to update transaction.' });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await getStorage();
    const initialLen = db.transactions.length;

    db.transactions = db.transactions.filter(t => t.id !== id);

    if (db.transactions.length === initialLen) {
      return res.status(404).json({ success: false, message: 'Transaction not found.' });
    }

    await saveStorage(db);
    const summary = await calculateFinancialSummary();

    res.json({
      success: true,
      message: 'Transaction deleted successfully.',
      summary
    });
  } catch (err) {
    console.error('Error deleting transaction:', err);
    res.status(500).json({ success: false, message: 'Failed to delete transaction.' });
  }
};
