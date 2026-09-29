import { useState, useEffect, createContext, useContext } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ps_user');
    return saved ? JSON.parse(saved) : {
      name: 'Alex Sharma',
      email: 'alex@example.com',
      monthlyIncome: 60000,
      currency: 'INR',
      currencySymbol: '₹'
    };
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Sync with backend profile
    api.getProfile()
      .then(res => {
        if (res.user) {
          setUser(res.user);
          localStorage.setItem('ps_user', JSON.stringify(res.user));
        }
      })
      .catch(err => {
        console.warn('Could not sync remote profile on boot, using cached profile:', err.message);
      });
  }, []);

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.login({ email, password });
      setUser(res.user);
      localStorage.setItem('ps_user', JSON.stringify(res.user));
      localStorage.setItem('ps_token', res.token);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (data) => {
    setLoading(true);
    try {
      const res = await api.register(data);
      setUser(res.user);
      localStorage.setItem('ps_user', JSON.stringify(res.user));
      localStorage.setItem('ps_token', res.token);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (data) => {
    setLoading(true);
    try {
      const res = await api.updateProfile(data);
      setUser(res.user);
      localStorage.setItem('ps_user', JSON.stringify(res.user));
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('ps_token');
    // keep default demo user for convenience
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, registerUser, updateUserProfile, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
