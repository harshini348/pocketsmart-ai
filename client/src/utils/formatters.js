// Currency and date formatters for PocketSmart AI

export const formatCurrency = (amount, currency = 'INR', symbol = '₹') => {
  const num = Number(amount) || 0;
  try {
    if (currency === 'INR') {
      return `${symbol}${num.toLocaleString('en-IN')}`;
    }
    return `${symbol}${num.toLocaleString('en-US')}`;
  } catch (e) {
    return `${symbol}${num}`;
  }
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (e) {
    return dateStr;
  }
};

export const formatShortDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  } catch (e) {
    return dateStr;
  }
};

export const formatPercent = (val) => {
  const num = Number(val) || 0;
  return `${Math.round(num)}%`;
};
