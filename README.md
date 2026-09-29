# 💰 PocketSmart AI

> **"Spend smarter. Save better."**  
> Your Smart Budget & Recommendation Assistant powered by Google Gemini AI.

---

## 🌟 Project Overview

**PocketSmart AI** is a modern, production-grade full-stack fintech web application engineered to transform personal budgeting. Built with a sleek dark-mode aesthetic (custom tailored `#0B0F14` background with metallic gold `#D4AF37` accents), it continuously tracks expenditures, analyzes spending velocity, calculates real-time **Budget Health scores**, and provides **actionable, structured recommendations powered by the official `@google/genai` SDK**.

Whether tracking every rupee on groceries, analyzing discretionary variances, testing purchase affordability, or chatting with your personal AI financial coach, PocketSmart AI provides immediate clarity and automated discipline.

---

## ✨ Features

- **Fintech Dashboard**: Real-time overview of Balance, Monthly Income, Monthly Expenses, and Net Savings calculated dynamically from live transactions.
- **Dynamic Budget Health Ring**: Interactive circular visualization rating financial posture out of 100 based on spending adherence, savings rates, and category overruns.
- **Interactive Recharts Visualization**: Seamlessly switch between Donut/Pie charts, Bar charts, and Monthly spending trajectories.
- **Transaction Manager**: Full CRUD capability with instant search, category filtering, income/expense filtering, and sorting by amount or date.
- **Budget Planner**: Track category caps (Food, Transport, Shopping, Bills, Entertainment, Education, Healthcare, Other) with instant visual indicators (Green: Within Budget, Yellow: Near Limit, Red: Exceeded).
- **Smart Savings Goals**: Track goals (e.g. *New Laptop*, *Emergency Fund*, *Vacation*) with target timelines, progress percentages, and 1-click contribution accelerators (+₹1,000 / +₹5,000).
- **AI Financial Insights**: Structured generative analysis powered by Google Gemini 2.5 Flash, providing root-cause alerts, prioritized recommendations with estimated monthly savings, and tactical saving tips.
- **Conversational AI Assistant**: Integrated chat coach answering contextual inquiries (*"Where am I spending the most?"*, *"How can I save ₹5,000 this month?"*, *"Why is my budget score low?"*).
- **Affordability Checker**: *"Can I afford this?"* evaluator projecting cash flow impacts and suggested sinking fund schedules with responsible financial disclaimers.
- **Smart Alerts & Notifications**: Real-time banner alerts for category variances, milestone achievements, and burn rate trends.
- **Zero-Friction Demo Mode**: The application works immediately out of the box with realistic seed data and fallback rule-based intelligence if no Gemini API key is provided.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite 8
- **Language**: JavaScript (ES Modules)
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design Tokens
- **Icons**: Lucide React
- **Data Visualization**: Recharts

### Backend
- **Runtime**: Node.js (v18+)
- **Server**: Express.js
- **Cross-Origin**: CORS enabled
- **Environment**: Dotenv

### Artificial Intelligence
- **SDK**: Official `@google/genai` (v2.24+)
- **Model**: `gemini-2.5-flash`
- **Fallback Engine**: Local Deterministic Rule Engine for instant offline execution

### Storage
- **Database**: Local atomic JSON persistence (`server/data/db.json`) initialized with realistic Indian Rupee (`₹`) seed data.

---

## 🏗️ Architecture & Folder Structure

```
pocketsmart-ai/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AffordabilityCard.jsx
│   │   │   ├── AIChat.jsx
│   │   │   ├── AIRecommendationCard.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── BudgetCard.jsx
│   │   │   ├── BudgetProgress.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── ExpenseChart.jsx
│   │   │   ├── GoalModal.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── NotificationPanel.jsx
│   │   │   ├── SavingsGoalCard.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── SummaryCard.jsx
│   │   │   ├── Toast.jsx
│   │   │   └── TransactionTable.jsx
│   │   ├── hooks/
│   │   │   └── useAuth.jsx
│   │   ├── layouts/
│   │   │   └── DashboardLayout.jsx
│   │   ├── pages/
│   │   │   ├── AIAssistantPage.jsx
│   │   │   ├── AnalyticsPage.jsx
│   │   │   ├── BudgetPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RecommendationsPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── SettingsPage.jsx
│   │   │   └── TransactionsPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   ├── formatters.js
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   │   ├── aiController.js
│   │   ├── authController.js
│   │   ├── budgetController.js
│   │   ├── goalController.js
│   │   └── transactionController.js
│   ├── data/
│   │   ├── seedData.js
│   │   └── db.json (auto-generated)
│   ├── routes/
│   │   ├── aiRoutes.js
│   │   ├── budgetRoutes.js
│   │   ├── goalRoutes.js
│   │   ├── transactionRoutes.js
│   │   └── userRoutes.js
│   ├── services/
│   │   ├── geminiService.js
│   │   └── storageService.js
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## ⚡ Quick Start & Installation

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)

### 2. Clone or Enter the Project
```bash
cd pocketsmart-ai
```

### 3. Install All Dependencies
Install dependencies across root, server, and client with a single command:
```bash
npm run install:all
```
*(Or install individually: `npm install`, `cd server && npm install`, `cd ../client && npm install`)*

---

## 🔑 Gemini API Setup (Optional)

The application works **immediately out-of-the-box in Demo AI Mode** even without an API key!

To activate live **Google Gemini 2.5 Flash** generative responses:
1. Get a free API key from [Google AI Studio](https://aistudio.google.com/).
2. Open `pocketsmart-ai/server/.env` (or copy from `.env.example`).
3. Set your key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=5000
```
4. Restart the server. The badge in the UI will instantly switch to **"⚡ Powered by Gemini 2.5 Flash"**!

> **Security Note:** The `GEMINI_API_KEY` is exclusively read on the Express backend server and is **never** bundled or exposed to frontend client code.

---

## 🚀 Running Locally

### Option A: Start Both Server and Client Concurrently (Recommended)
From the `pocketsmart-ai` root directory:
```bash
npm run dev
```
- **Backend API**: `http://localhost:5000`
- **Frontend App**: `http://localhost:5173`

### Option B: Run Services Separately

**Backend Server:**
```bash
cd server
npm run dev
```

**Frontend Vite Client:**
```bash
cd client
npm run dev
```

---

## 🌐 API Routes Reference

### System & AI
| Method | Route | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status & Gemini readiness check |
| `GET` | `/api/ai/status` | Gemini configuration and model indicator |
| `POST` | `/api/ai/analyze` | Generates structured financial recommendations & alerts |
| `POST` | `/api/ai/chat` | Conversational financial coaching with context |
| `POST` | `/api/ai/affordability` | Purchase impact evaluator |

### Transactions
| Method | Route | Description |
|---|---|---|
| `GET` | `/api/transactions` | Retrieve all transactions with search, category & type filters |
| `POST` | `/api/transactions` | Record a new income or expense transaction |
| `PUT` | `/api/transactions/:id` | Update an existing transaction |
| `DELETE` | `/api/transactions/:id`| Remove a transaction and recalculate balances |

### Budgets & Goals
| Method | Route | Description |
|---|---|---|
| `GET` | `/api/budget` | Retrieve budget category targets and actual spending |
| `PUT` | `/api/budget` | Update category caps and monthly income baseline |
| `GET` | `/api/goals` | Retrieve active savings goals and completion rates |
| `POST` | `/api/goals` | Create a new savings goal target |
| `PUT` | `/api/goals/:id` | Update a goal or add incremental savings |
| `DELETE` | `/api/goals/:id` | Delete a savings goal |

### Auth & Data
| Method | Route | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Prototype session sign-in (quick 1-click available) |
| `POST` | `/api/auth/register` | Create prototype user account |
| `GET` | `/api/user/profile` | Retrieve user profile & preferences |
| `PUT` | `/api/user/profile` | Update profile, income, and notification settings |
| `POST` | `/api/data/reset` | Restore demo dataset to factory state |

---

## 🎨 Design Theme Specifications

| Token | Hex Value | Application |
|---|---|---|
| **Background** | `#0B0F14` | Primary viewport background |
| **Card Main** | `#121821` | Elevated container surfaces |
| **Card Border** | `#1E2633` | Subtle glassmorphic separators |
| **Primary Accent** | `#D4AF37` | Warm metallic gold for focal highlights & brand |
| **Text Primary** | `#F8FAFC` | Crisp typography |
| **Text Secondary** | `#94A3B8` | Descriptive labels and subheaders |
| **Success** | `#22C55E` | Income, positive cash flow, healthy budget adherence |
| **Warning** | `#F59E0B` | Near-limit budget warnings (80%-100%) |
| **Danger** | `#EF4444` | Exceeded category caps, expenses, deletions |

---

## 🛡️ Disclaimer

PocketSmart AI provides educational budgeting analysis and does not constitute certified financial, tax, or investment advice. Always verify projections before making major financial commitments.
