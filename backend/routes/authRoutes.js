import express from 'express';
import { forgotPassword, login, logout, signUp, verifyemail, resetPassword, checkAuth } from '../controllers/authControllers.js';
import { verifyToken } from '../middleware/verifyToken.js';


const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post('/register', signUp);
router.post('/login', login);
router.post('/logout', logout);
router.post('/verify-email', verifyemail)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)



export default router;