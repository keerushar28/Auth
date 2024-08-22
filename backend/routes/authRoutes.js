import express from 'express';
import { forgotPassword, login, logout, signUp, verifyemail } from '../controllers/authControllers.js';


const router = express.Router();

router.post('/register', signUp);
router.post('/login', login);
router.post('/logout', logout);
router.post('/verify-email', verifyemail)
router.post('/forgot-password', forgotPassword)


export default router;