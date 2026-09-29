import express from 'express';
import {
  login,
  register,
  getProfile,
  updateProfile,
  resetData
} from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/reset', resetData);

export default router;
