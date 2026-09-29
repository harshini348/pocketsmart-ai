import { getStorage, saveStorage, resetStorage } from '../services/storageService.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = await getStorage();

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    // For prototype, accept credentials and provide user session profile
    const user = db.user || {
      id: 'user-1',
      name: 'Alex Sharma',
      email: email,
      monthlyIncome: 60000,
      currency: 'INR',
      currencySymbol: '₹'
    };

    // Return token and user
    res.json({
      success: true,
      message: 'Login successful.',
      token: `ps-token-${Date.now()}`,
      user
    });
  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json({ success: false, message: 'Login failed.' });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, monthlyIncome, currency } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
    }

    const db = await getStorage();
    const income = Number(monthlyIncome) || 60000;
    const curr = currency || 'INR';
    const symbol = curr === 'USD' ? '$' : curr === 'EUR' ? '€' : curr === 'GBP' ? '£' : '₹';

    db.user = {
      ...db.user,
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      monthlyIncome: income,
      currency: curr,
      currencySymbol: symbol
    };

    await saveStorage(db);

    res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      token: `ps-token-${Date.now()}`,
      user: db.user
    });
  } catch (err) {
    console.error('Error in register:', err);
    res.status(500).json({ success: false, message: 'Registration failed.' });
  }
};

export const getProfile = async (req, res) => {
  try {
    const db = await getStorage();
    res.json({
      success: true,
      user: db.user
    });
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve profile.' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, monthlyIncome, currency, currencySymbol, notifications, theme } = req.body;
    const db = await getStorage();

    db.user = {
      ...db.user,
      name: name !== undefined ? name.trim() : db.user.name,
      email: email !== undefined ? email.trim() : db.user.email,
      monthlyIncome: monthlyIncome !== undefined ? Number(monthlyIncome) : db.user.monthlyIncome,
      currency: currency || db.user.currency,
      currencySymbol: currencySymbol || (currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '₹'),
      notifications: notifications || db.user.notifications,
      theme: theme || db.user.theme
    };

    await saveStorage(db);

    res.json({
      success: true,
      message: 'Profile updated successfully.',
      user: db.user
    });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ success: false, message: 'Failed to update profile.' });
  }
};

export const resetData = async (req, res) => {
  try {
    const resetDb = await resetStorage();
    res.json({
      success: true,
      message: 'Demo dataset has been restored to default state.',
      user: resetDb.user
    });
  } catch (err) {
    console.error('Error resetting demo data:', err);
    res.status(500).json({ success: false, message: 'Failed to reset demo dataset.' });
  }
};
