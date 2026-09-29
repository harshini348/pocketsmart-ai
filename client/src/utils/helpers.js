export const CATEGORIES = [
  'Food',
  'Transport',
  'Shopping',
  'Bills',
  'Entertainment',
  'Education',
  'Healthcare',
  'Travel',
  'Other'
];

export const CATEGORY_COLORS = {
  Food: '#F59E0B',
  Transport: '#3B82F6',
  Shopping: '#EC4899',
  Bills: '#8B5CF6',
  Entertainment: '#10B981',
  Education: '#06B6D4',
  Healthcare: '#EF4444',
  Travel: '#F97316',
  Salary: '#22C55E',
  Freelance: '#14B8A6',
  Other: '#64748B'
};

export const getStatusColor = (percent) => {
  if (percent > 100) return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', hex: '#EF4444', label: 'Exceeded' };
  if (percent >= 80) return { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', hex: '#F59E0B', label: 'Near Limit' };
  return { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', hex: '#22C55E', label: 'Within Budget' };
};

export const getHealthGrade = (score) => {
  if (score >= 85) return { text: "Excellent", status: "You're in prime financial shape", color: "#22C55E", ring: "stroke-emerald-500" };
  if (score >= 70) return { text: "Good", status: "You're doing well", color: "#D4AF37", ring: "stroke-[#D4AF37]" };
  if (score >= 55) return { text: "Moderate", status: "Needs slight optimization", color: "#F59E0B", ring: "stroke-amber-500" };
  return { text: "Critical", status: "Immediate budget trimming required", color: "#EF4444", ring: "stroke-red-500" };
};
