import express from 'express';
import { getBudgets, updateBudgets } from '../controllers/budgetController.js';

const router = express.Router();

router.get('/', getBudgets);
router.put('/', updateBudgets);

export default router;
