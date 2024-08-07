import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController';
import protect from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/').get(protect, getProfile).put(protect, updateProfile);

export default router;
