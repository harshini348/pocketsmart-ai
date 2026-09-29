// Centralized API service for PocketSmart AI
const API_BASE = '/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMsg = `HTTP ${response.status}: ${response.statusText}`;
    try {
      const errorJson = await response.json();
      if (errorJson && errorJson.message) {
        errorMsg = errorJson.message;
      }
    } catch (e) {
      // not JSON
    }
    throw new Error(errorMsg);
  }
  return response.json();
};

export const api = {
  // System Health & AI Status
  async getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    return handleResponse(res);
  },

  async getAIStatus() {
    const res = await fetch(`${API_BASE}/ai/status`);
    return handleResponse(res);
  },

  // Transactions
  async getTransactions(params = {}) {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.category && params.category !== 'All') query.append('category', params.category);
    if (params.type && params.type !== 'all') query.append('type', params.type);
    if (params.sortBy) query.append('sortBy', params.sortBy);
    if (params.sortOrder) query.append('sortOrder', params.sortOrder);

    const url = `${API_BASE}/transactions${query.toString() ? `?${query.toString()}` : ''}`;
    const res = await fetch(url);
    return handleResponse(res);
  },

  async addTransaction(data) {
    const res = await fetch(`${API_BASE}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  async updateTransaction(id, data) {
    const res = await fetch(`${API_BASE}/transactions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  async deleteTransaction(id) {
    const res = await fetch(`${API_BASE}/transactions/${id}`, {
      method: 'DELETE'
    });
    return handleResponse(res);
  },

  // Budget
  async getBudgets() {
    const res = await fetch(`${API_BASE}/budget`);
    return handleResponse(res);
  },

  async updateBudgets(data) {
    const res = await fetch(`${API_BASE}/budget`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  // Savings Goals
  async getGoals() {
    const res = await fetch(`${API_BASE}/goals`);
    return handleResponse(res);
  },

  async addGoal(data) {
    const res = await fetch(`${API_BASE}/goals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  async updateGoal(id, data) {
    const res = await fetch(`${API_BASE}/goals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  async deleteGoal(id) {
    const res = await fetch(`${API_BASE}/goals/${id}`, {
      method: 'DELETE'
    });
    return handleResponse(res);
  },

  // AI Endpoints
  async analyzeFinances(data = {}) {
    const res = await fetch(`${API_BASE}/ai/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  async chatAssistant(message, financialContext) {
    const res = await fetch(`${API_BASE}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, financialContext })
    });
    return handleResponse(res);
  },

  async checkAffordability(itemName, itemPrice, financialContext) {
    const res = await fetch(`${API_BASE}/ai/affordability`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemName, itemPrice, financialContext })
    });
    return handleResponse(res);
  },

  // Auth & Profile
  async login(credentials) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return handleResponse(res);
  },

  async register(userData) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return handleResponse(res);
  },

  async getProfile() {
    const res = await fetch(`${API_BASE}/user/profile`);
    return handleResponse(res);
  },

  async updateProfile(data) {
    const res = await fetch(`${API_BASE}/user/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  async resetDemoData() {
    const res = await fetch(`${API_BASE}/data/reset`, {
      method: 'POST'
    });
    return handleResponse(res);
  }
};
