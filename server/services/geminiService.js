import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const SYSTEM_INSTRUCTION = `You are PocketSmart AI, a personal budgeting assistant. Analyze financial information and provide practical budgeting and saving suggestions. Do not provide regulated financial advice, investment recommendations, tax advice, or guarantees. Clearly explain that recommendations are educational and should be verified by the user. Always use Indian Rupee (₹) symbol when referring to currency amounts.`;

const getApiKey = () => {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key.trim() === '' || key === 'your_gemini_api_key_here') {
    return null;
  }
  return key.trim();
};

export const isGeminiConfigured = () => {
  return !!getApiKey();
};

let genAIInstance = null;
const getAIClient = () => {
  const key = getApiKey();
  if (!key) return null;
  if (!genAIInstance) {
    genAIInstance = new GoogleGenAI({ apiKey: key });
  }
  return genAIInstance;
};

// Fallback intelligent analyzer when Gemini API key is not configured
const generateFallbackAnalysis = (data) => {
  const { income = 60000, expenses = [], budgets = [], goals = [], healthScore = 72 } = data;
  
  // Calculate total spent per category
  const categoryTotals = {};
  expenses.forEach(e => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + Number(e.amount);
  });

  const alerts = [];
  const recommendations = [];

  // Check category variances
  budgets.forEach(b => {
    const spent = categoryTotals[b.category] || 0;
    if (b.allocated > 0) {
      const pct = Math.round((spent / b.allocated) * 100);
      if (pct > 100) {
        alerts.push({
          category: b.category,
          message: `You spent ${pct - 100}% more on ${b.category.toLowerCase()} this month compared with your planned budget of ₹${b.allocated.toLocaleString('en-IN')}.`,
          severity: 'danger'
        });
      } else if (pct >= 85) {
        alerts.push({
          category: b.category,
          message: `${b.category} spending is at ${pct}% of your monthly limit (₹${spent.toLocaleString('en-IN')} / ₹${b.allocated.toLocaleString('en-IN')}).`,
          severity: 'warning'
        });
      }
    }
  });

  if (alerts.length === 0) {
    alerts.push({
      category: 'General',
      message: 'Great discipline! All major expense categories are currently within their planned budget targets.',
      severity: 'success'
    });
  }

  // Recommendations
  if (categoryTotals['Food'] && categoryTotals['Food'] > 4000) {
    recommendations.push({
      title: 'Food & Dining Optimization',
      description: 'Reducing frequent online food delivery and opting for batch weekend cooking could save up to ₹1,500 monthly without sacrificing lifestyle.',
      estimatedMonthlySaving: 1500,
      priority: 'high'
    });
  }

  if (categoryTotals['Shopping'] && categoryTotals['Shopping'] > 4000) {
    recommendations.push({
      title: 'Shopping Impulse Buffer',
      description: 'Implement a 48-hour cooling rule on non-essential online retail purchases to curb impulse spending.',
      estimatedMonthlySaving: 2000,
      priority: 'medium'
    });
  }

  if (categoryTotals['Bills'] && categoryTotals['Bills'] > 5000) {
    recommendations.push({
      title: 'Subscription & Utility Audit',
      description: 'Review recurring OTT platforms, cellular plans, and broadband tiers to consolidate overlapping services.',
      estimatedMonthlySaving: 800,
      priority: 'low'
    });
  }

  const primaryGoal = goals[0] || { title: 'Savings Goal', targetAmount: 60000, savedAmount: 32000 };
  const goalRemaining = (primaryGoal.targetAmount || 60000) - (primaryGoal.savedAmount || 0);

  recommendations.push({
    title: `Accelerate ${primaryGoal.title}`,
    description: `Redirecting ₹2,000 in monthly savings towards your ${primaryGoal.title} goal will allow you to reach the ₹${goalRemaining.toLocaleString('en-IN')} target approximately 2.5 months earlier.`,
    estimatedMonthlySaving: 2000,
    priority: 'high'
  });

  const savingTips = [
    'Automate your savings: Set up an auto-debit of 20% of your income into your savings reserve immediately on payday.',
    'Use the 50/30/20 rule: Allocate 50% to essentials, 30% to personal discretionary, and at least 20% to savings and investments.',
    'Review recurring digital memberships every quarter to cancel unused streaming or app subscriptions.',
    'Track cash transactions daily to avoid invisible micro-expenditure leaks.'
  ];

  return {
    isDemo: true,
    engine: 'PocketSmart Intelligent Rule Engine (Gemini API key not configured)',
    summary: `Your estimated monthly budget health score is ${healthScore}/100. You are managing your core income effectively with a healthy savings buffer, but food and shopping categories have the highest variance and offer the easiest opportunities for optimization.`,
    budgetHealth: healthScore,
    alerts,
    recommendations,
    savingTips
  };
};

export const analyzeFinances = async (financialData) => {
  const ai = getAIClient();

  if (!ai) {
    return generateFallbackAnalysis(financialData);
  }

  const prompt = `
Analyze this user's monthly financial data and generate actionable, structured budgeting insights.
Data:
Income: ₹${financialData.income || 60000}
Transactions: ${JSON.stringify(financialData.expenses?.slice(0, 30) || [])}
Budgets: ${JSON.stringify(financialData.budgets || [])}
Goals: ${JSON.stringify(financialData.goals || [])}
Calculated Health Score: ${financialData.healthScore || 72}

Return a valid JSON object matching EXACTLY this JSON structure:
{
  "summary": "2-3 concise sentences summarizing their current financial posture.",
  "budgetHealth": 72,
  "alerts": [
    {
      "category": "Food",
      "message": "Specific actionable alert with percentage or amount",
      "severity": "warning" // warning | danger | success
    }
  ],
  "recommendations": [
    {
      "title": "Clear action title",
      "description": "Specific realistic recommendation with numbers",
      "estimatedMonthlySaving": 1000,
      "priority": "high" // high | medium | low
    }
  ],
  "savingTips": [
    "Tip 1",
    "Tip 2",
    "Tip 3"
  ]
}
Do not include markdown backticks around JSON if responseMimeType is json. Return only valid JSON.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
      }
    });

    const text = response.text;
    const parsed = JSON.parse(text);
    return {
      ...parsed,
      isDemo: false,
      engine: 'Gemini 2.5 Flash'
    };
  } catch (err) {
    console.error('Error invoking Gemini API in analyzeFinances:', err.message);
    const fallback = generateFallbackAnalysis(financialData);
    fallback.errorNotice = `Gemini call encountered an error: ${err.message}. Showing computed insights.`;
    return fallback;
  }
};

// Chat assistant
export const chatWithAssistant = async (message, financialContext = {}) => {
  const ai = getAIClient();

  if (!ai) {
    // Intelligent contextual response
    return generateFallbackChatResponse(message, financialContext);
  }

  const prompt = `
The user has asked: "${message}"

Here is the user's current verified financial context:
- Monthly Income: ₹${financialContext.income || 60000}
- Total Expenses this month: ₹${financialContext.totalExpenses || 0}
- Current Savings Rate: ${financialContext.savingsRate || 0}%
- Budget Health Score: ${financialContext.healthScore || 72}/100
- Overspent Categories: ${(financialContext.overspentCategories || []).join(', ') || 'None'}
- Top Expense Category: ${financialContext.topCategory || 'N/A'} (₹${financialContext.topCategoryAmount || 0})
- Active Savings Goals: ${(financialContext.goals || []).map(g => `${g.title}: ₹${g.savedAmount}/₹${g.targetAmount}`).join('; ')}

Provide a friendly, concise, and highly practical reply.
Use bullet points where appropriate.
Always reference their actual numbers.
Include the reminder that your response is educational and not regulated financial advice.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION
      }
    });

    return {
      reply: response.text,
      isDemo: false,
      engine: 'Gemini 2.5 Flash'
    };
  } catch (err) {
    console.error('Error in chatWithAssistant:', err.message);
    const fallback = generateFallbackChatResponse(message, financialContext);
    fallback.reply += `\n\n*(Note: Gemini API reported: ${err.message}. Response generated via PocketSmart Smart Assistant fallback)*`;
    return fallback;
  }
};

// Fallback chat generator
const generateFallbackChatResponse = (message, context) => {
  const lower = message.toLowerCase();
  const income = context.income || 60000;
  const expenses = context.totalExpenses || 27000;
  const topCat = context.topCategory || 'Food';
  const topCatAmt = context.topCategoryAmount || 5200;
  const score = context.healthScore || 74;

  let reply = '';

  if (lower.includes('where am i spending') || lower.includes('most spending') || lower.includes('highest')) {
    reply = `Based on your recent transactions, your highest expenditure category is **${topCat}** at **₹${topCatAmt.toLocaleString('en-IN')}**, followed by your utility bills and shopping.\n\nTo optimize this, consider reviewing your discretionary dining and setting a daily spending cap for ${topCat.toLowerCase()}.`;
  } else if (lower.includes('save') && (lower.includes('5000') || lower.includes('5,000') || lower.includes('more'))) {
    reply = `Here is a practical 3-step blueprint to save an extra ₹5,000 this month:\n\n1. **Trim Food & Dining Delivery (Save ~₹2,000)**: Limit delivery apps to twice a month and prepare batch meals.\n2. **Delay Shopping Purchases (Save ~₹2,000)**: Enforce a mandatory 48-hour wait time on non-essential online carts.\n3. **Audit Subscriptions & Commutes (Save ~₹1,000)**: Consolidate streaming services and switch 2 weekly commutes to public transit or carpooling.\n\nRedirect this ₹5,000 directly to your emergency fund or savings goal!`;
  } else if (lower.includes('afford') || lower.includes('3000') || lower.includes('buy')) {
    const currentFreeCash = Math.max(0, income - expenses);
    reply = `With your current monthly income of ₹${income.toLocaleString('en-IN')} and expenses of ₹${expenses.toLocaleString('en-IN')}, you have approximately **₹${currentFreeCash.toLocaleString('en-IN')}** in monthly unallocated buffer.\n\nYou can comfortably afford a ₹3,000 purchase provided it doesn't push you past your discretionary budget. However, if this is non-essential, ensure your top priority savings goal remains fully funded first!`;
  } else if (lower.includes('score') || lower.includes('health') || lower.includes('low') || lower.includes('why')) {
    reply = `Your current **Budget Health Score is ${score}/100** ("You're doing well").\n\nThe score is computed based on 4 vital factors:\n- **Spending vs Budget**: You are currently staying within overall limits.\n- **Savings Rate**: Your savings margin is positive.\n- **Category Variances**: Any category overruns (such as shopping or dining) temporarily lower the score.\n- **Essential Bills Ratio**: Utility and living costs balance against discretionary spend.\n\nKeep all categories below 85% utilization this week to boost your score above 85!`;
  } else if (lower.includes('reduce') || lower.includes('ways to reduce') || lower.includes('tips')) {
    reply = `Here are 3 high-impact ways to reduce your expenses right away:\n\n1. **Automate the 24-Hour Rule**: For any purchase above ₹1,000, wait 24 hours. Over 60% of impulse buying evaporates with time.\n2. **Review Recurring Subscriptions**: Cancel unused memberships or switch to annual/family plans to save 20-30%.\n3. **Cook in Batches**: Cooking lunch at home 4 days a week can easily save ₹3,000-₹4,000 every single month.`;
  } else {
    reply = `Hello! I am **PocketSmart AI**, your personal budget assistant.\n\nCurrently, your monthly income is **₹${income.toLocaleString('en-IN')}**, total recorded expenses are **₹${expenses.toLocaleString('en-IN')}**, and your budget health score is **${score}/100**.\n\nYou can ask me questions like:\n- *"Where am I spending the most?"*\n- *"How can I save ₹5,000 this month?"*\n- *"Can I afford a ₹3,000 purchase?"*\n- *"Why is my budget score low?"*\n- *"Give me 3 ways to reduce my expenses."*`;
  }

  reply += `\n\n*Disclaimer: PocketSmart AI provides educational budgeting insights and does not constitute regulated financial or legal advice.*`;

  return {
    reply,
    isDemo: true,
    engine: 'PocketSmart Rule Engine'
  };
};

// Affordability checker
export const checkAffordability = async (itemName, itemPrice, financialContext = {}) => {
  const price = Number(itemPrice) || 0;
  const income = Number(financialContext.income) || 60000;
  const expenses = Number(financialContext.totalExpenses) || 27000;
  const monthlySavings = Math.max(0, income - expenses);
  const ai = getAIClient();

  if (!ai) {
    return generateFallbackAffordability(itemName, price, income, expenses, monthlySavings, financialContext.goals);
  }

  const prompt = `
Analyze if the user can afford the following purchase:
- Item / Purchase Name: "${itemName}"
- Purchase Price: ₹${price}
- Monthly Income: ₹${income}
- Current Monthly Expenses: ₹${expenses}
- Monthly Net Savings: ₹${monthlySavings}
- Active Savings Goals: ${JSON.stringify(financialContext.goals || [])}

Provide an educational, neutral analysis. Do NOT make guaranteed financial decisions for the user.
Use neutral wording like "Based on the information provided...".
Return JSON with this exact structure:
{
  "canAfford": "yes" | "caution" | "not_recommended",
  "verdictTitle": "Short verdict title",
  "impactSummary": "Detailed financial impact of this purchase on cash flow and goals.",
  "suggestedApproach": "Step-by-step approach on how to finance or adjust budgets for this.",
  "savingAdjustment": "Specific category adjustments or timeline recommendations.",
  "monthsToSave": 2,
  "disclaimer": "Based on the information provided, this is an educational projection and not professional financial advice."
}
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json'
      }
    });

    const parsed = JSON.parse(response.text);
    return {
      ...parsed,
      isDemo: false,
      engine: 'Gemini 2.5 Flash'
    };
  } catch (err) {
    console.error('Error in checkAffordability Gemini call:', err.message);
    const fallback = generateFallbackAffordability(itemName, price, income, expenses, monthlySavings, financialContext.goals);
    return fallback;
  }
};

const generateFallbackAffordability = (itemName, price, income, expenses, monthlySavings, goals = []) => {
  let canAfford = 'yes';
  let verdictTitle = 'Affordable with existing cash flow';
  let impactSummary = '';
  let suggestedApproach = '';
  let savingAdjustment = '';
  const monthsToSave = monthlySavings > 0 ? Math.ceil(price / monthlySavings) : 6;

  if (price > monthlySavings * 2) {
    canAfford = 'caution';
    verdictTitle = 'Requires planned savings timeline';
    impactSummary = `Based on the information provided, purchasing ${itemName} for ₹${price.toLocaleString('en-IN')} exceeds your single-month free cash flow (₹${monthlySavings.toLocaleString('en-IN')}). Paying for this outright in one go could disrupt your emergency reserve.`;
    suggestedApproach = `Instead of an immediate one-time expense, allocate ₹${Math.round(price / Math.max(2, monthsToSave)).toLocaleString('en-IN')} per month across ${Math.max(2, monthsToSave)} months into a dedicated sinking fund.`;
    savingAdjustment = `Temporarily trim discretionary shopping and entertainment by 15-20% to accelerate the savings target by 30 days.`;
  } else if (price > monthlySavings) {
    canAfford = 'caution';
    verdictTitle = 'Affordable with minor budget adjustment';
    impactSummary = `Purchasing ${itemName} (₹${price.toLocaleString('en-IN')}) will consume roughly ${Math.round((price / (monthlySavings || 1)) * 100)}% of your monthly surplus of ₹${monthlySavings.toLocaleString('en-IN')}.`;
    suggestedApproach = `Split the purchase across this month and next, or use 50% from savings and 50% from discretionary buffer.`;
    savingAdjustment = `Pause other non-urgent shopping for the next 20 days to replenish the buffer.`;
  } else {
    canAfford = 'yes';
    verdictTitle = 'Within comfortable budget limits';
    impactSummary = `Based on the information provided, ${itemName} at ₹${price.toLocaleString('en-IN')} represents only ${Math.round((price / (income || 1)) * 100)}% of your monthly income and is well within your monthly savings margin of ₹${monthlySavings.toLocaleString('en-IN')}.`;
    suggestedApproach = `You can proceed while keeping an eye on your remaining category budgets for the month.`;
    savingAdjustment = `Ensure you log this transaction under its appropriate category immediately to maintain accurate tracking.`;
  }

  return {
    canAfford,
    verdictTitle,
    impactSummary,
    suggestedApproach,
    savingAdjustment,
    monthsToSave,
    isDemo: true,
    engine: 'PocketSmart Affordability Analyzer',
    disclaimer: 'Based on the information provided, this is an educational projection and does not constitute certified financial or purchasing advice.'
  };
};
