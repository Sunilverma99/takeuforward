import express from 'express';
import { signUp ,signIn, signOut} from '../controllers/auth.controller.js';
const router =express.Router();
router.post('/auth/signUp',signUp);
router.post('/auth/signIn',signIn);
router.get('/auth/signOut',signOut);
export default router;