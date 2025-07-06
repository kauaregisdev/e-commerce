import express from 'express';
import authToken from '../middlewares/auth.js';
import { createOrder, getOrders } from '../controllers/order.js';

export const router = express.Router();

router.post('/', authToken, createOrder);
router.get('/', authToken, getOrders);