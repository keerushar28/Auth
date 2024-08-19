import express from 'express';
import { login, logout, signUp } from '../controllers/authControllers.js';


const router = express.Router();

router.post('/register', signUp);
router.post('/login', login);
router.post('/logout', logout);


export default router;