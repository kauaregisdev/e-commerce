import express from 'express';
import authToken from '../middlewares/auth.js';
import { getLoggedUser, register, login } from '../controllers/auth.js';

export const router = express.Router();

router.get('/me', authToken, getLoggedUser);
router.post('/register', register);
router.post('/login', login);