import express from 'express';
import {
  getAIStatus,
  runAnalysis,
  chatAssistant,
  checkPurchaseAffordability
} from '../controllers/aiController.js';

const router = express.Router();

router.get('/status', getAIStatus);
router.post('/analyze', runAnalysis);
router.post('/chat', chatAssistant);
router.post('/affordability', checkPurchaseAffordability);

export default router;
