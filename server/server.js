import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import transactionRoutes from './routes/transactionRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import goalRoutes from './routes/goalRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { initStorage } from './services/storageService.js';
import { isGeminiConfigured } from './services/geminiService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow frontend Vite dev server
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'PocketSmart AI Backend',
    timestamp: new Date().toISOString(),
    geminiConfigured: isGeminiConfigured()
  });
});

// Mount Routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/user', userRoutes);
app.use('/api/data', userRoutes);

// 404 Handler
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API route ${req.originalUrl} not found.`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: 'An internal server error occurred. Please try again later.'
  });
});

// Start Server
const startServer = async () => {
  try {
    await initStorage();
    app.listen(PORT, () => {
      console.log(`\n======================================================`);
      console.log(`🚀 PocketSmart AI Server listening on http://localhost:${PORT}`);
      console.log(`🤖 Gemini Status: ${isGeminiConfigured() ? 'Active (Live API)' : 'Demo Mode (No API key found in .env)'}`);
      console.log(`======================================================\n`);
    });
  } catch (err) {
    console.error('Fatal: Failed to start PocketSmart AI server:', err);
    process.exit(1);
  }
};

startServer();
