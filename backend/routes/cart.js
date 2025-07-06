import express from 'express';
import authToken from '../middlewares/auth.js';
import { getCart, syncCart, updateCart } from '../controllers/cart.js';

export const router = express.Router();

router.get('/', authToken, getCart);
router.post('/sync', authToken, syncCart);
router.put('/update', authToken, updateCart);