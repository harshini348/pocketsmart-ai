export const initialData = {
  user: {
    id: "user-1",
    name: "Alex Sharma",
    email: "alex@example.com",
    monthlyIncome: 60000,
    currency: "INR",
    currencySymbol: "₹",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    theme: "dark",
    notifications: {
      budgetAlerts: true,
      savingMilestones: true,
      monthlyReports: true,
      overspendingWarning: true
    }
  },
  budgets: [
    { id: "b-1", category: "Food", allocated: 6000, icon: "Utensils", color: "#F59E0B" },
    { id: "b-2", category: "Transport", allocated: 4000, icon: "Car", color: "#3B82F6" },
    { id: "b-3", category: "Shopping", allocated: 5000, icon: "ShoppingBag", color: "#EC4899" },
    { id: "b-4", category: "Bills", allocated: 8000, icon: "Receipt", color: "#8B5CF6" },
    { id: "b-5", category: "Entertainment", allocated: 3000, icon: "Film", color: "#10B981" },
    { id: "b-6", category: "Education", allocated: 4000, icon: "GraduationCap", color: "#06B6D4" },
    { id: "b-7", category: "Healthcare", allocated: 2000, icon: "HeartPulse", color: "#EF4444" },
    { id: "b-8", category: "Other", allocated: 3000, icon: "Tag", color: "#64748B" }
  ],
  goals: [
    {
      id: "goal-1",
      title: "New Laptop",
      targetAmount: 60000,
      savedAmount: 32000,
      targetDate: "2027-03-31",
      category: "Electronics",
      priority: "high",
      icon: "Laptop",
      color: "#D4AF37"
    },
    {
      id: "goal-2",
      title: "Emergency Fund",
      targetAmount: 150000,
      savedAmount: 90000,
      targetDate: "2027-12-31",
      category: "Safety",
      priority: "critical",
      icon: "ShieldAlert",
      color: "#22C55E"
    },
    {
      id: "goal-3",
      title: "Japan Vacation",
      targetAmount: 180000,
      savedAmount: 45000,
      targetDate: "2027-10-15",
      category: "Travel",
      priority: "medium",
      icon: "Plane",
      color: "#38BDF8"
    }
  ],
  transactions: [
    {
      id: "tx-1",
      date: "2026-09-28",
      description: "Swiggy",
      category: "Food",
      amount: 420,
      type: "expense",
      notes: "Dinner delivery - biryani bowl"
    },
    {
      id: "tx-2",
      date: "2026-09-27",
      description: "Amazon",
      category: "Shopping",
      amount: 1299,
      type: "expense",
      notes: "Ergonomic wireless mouse"
    },
    {
      id: "tx-3",
      date: "2026-09-26",
      description: "Salary Credited",
      category: "Salary",
      amount: 60000,
      type: "income",
      notes: "TechCorp monthly salary"
    },
    {
      id: "tx-4",
      date: "2026-09-25",
      description: "Uber Ride",
      category: "Transport",
      amount: 340,
      type: "expense",
      notes: "Cab commute to Bangalore office"
    },
    {
      id: "tx-5",
      date: "2026-09-24",
      description: "Electricity Bill",
      category: "Bills",
      amount: 2450,
      type: "expense",
      notes: "BESCOM monthly utility bill"
    },
    {
      id: "tx-6",
      date: "2026-09-23",
      description: "Netflix & Spotify",
      category: "Entertainment",
      amount: 799,
      type: "expense",
      notes: "Monthly digital entertainment combo"
    },
    {
      id: "tx-7",
      date: "2026-09-22",
      description: "Nature's Basket Groceries",
      category: "Food",
      amount: 2850,
      type: "expense",
      notes: "Weekly fresh pantry and dairy items"
    },
    {
      id: "tx-8",
      date: "2026-09-20",
      description: "Zara Outfit",
      category: "Shopping",
      amount: 3400,
      type: "expense",
      notes: "Autumn casual blazer & shirt"
    },
    {
      id: "tx-9",
      date: "2026-09-18",
      description: "Shell Petrol Station",
      category: "Transport",
      amount: 1800,
      type: "expense",
      notes: "Full tank fuel refill"
    },
    {
      id: "tx-10",
      date: "2026-09-17",
      description: "Udemy Tech Course",
      category: "Education",
      amount: 1499,
      type: "expense",
      notes: "Advanced GenAI & Cloud Architecture"
    },
    {
      id: "tx-11",
      date: "2026-09-15",
      description: "Apollo Pharmacy",
      category: "Healthcare",
      amount: 850,
      type: "expense",
      notes: "Vitamins, first-aid and prescriptions"
    },
    {
      id: "tx-12",
      date: "2026-09-14",
      description: "Airtel Fiber Broadband",
      category: "Bills",
      amount: 1180,
      type: "expense",
      notes: "Gigabit home internet monthly charge"
    },
    {
      id: "tx-13",
      date: "2026-09-13",
      description: "Society Maintenance & Piped Gas",
      category: "Bills",
      amount: 3370,
      type: "expense",
      notes: "Building maintenance and cooking gas"
    },
    {
      id: "tx-14",
      date: "2026-09-12",
      description: "Social Restaurant & Bar",
      category: "Food",
      amount: 1930,
      type: "expense",
      notes: "Weekend dining with friends"
    },
    {
      id: "tx-15",
      date: "2026-09-10",
      description: "PVR IMAX Movie",
      category: "Entertainment",
      amount: 950,
      type: "expense",
      notes: "2 IMAX tickets + popcorn"
    },
    {
      id: "tx-16",
      date: "2026-09-08",
      description: "Finance Books - Strand Book Stall",
      category: "Education",
      amount: 1001,
      type: "expense",
      notes: "Psychology of Money + The Intelligent Investor"
    },
    {
      id: "tx-17",
      date: "2026-09-06",
      description: "Dental Cleaning & Checkup",
      category: "Healthcare",
      amount: 350,
      type: "expense",
      notes: "Routine dental checkup copay"
    },
    {
      id: "tx-18",
      date: "2026-09-05",
      description: "Airtel 5G Mobile Recharge",
      category: "Bills",
      amount: 719,
      type: "expense",
      notes: "84-day prepaid voice & data pack"
    },
    {
      id: "tx-19",
      date: "2026-09-03",
      description: "Myntra Sneakers",
      category: "Shopping",
      amount: 1701,
      type: "expense",
      notes: "Running shoes on seasonal clearance"
    },
    {
      id: "tx-20",
      date: "2026-09-02",
      description: "Namma Metro Card Recharge",
      category: "Transport",
      amount: 960,
      type: "expense",
      notes: "Metro smartcard monthly top-up"
    },
    {
      id: "tx-21",
      date: "2026-09-02",
      description: "Home Hardware & Cleaning Supplies",
      category: "Other",
      amount: 1000,
      type: "expense",
      notes: "Household essentials"
    },
    {
      id: "tx-22",
      date: "2026-09-01",
      description: "UI/UX Freelance Consulting",
      category: "Freelance",
      amount: 15000,
      type: "income",
      notes: "Fintech audit sprint payment"
    }
  ]
};
