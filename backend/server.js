import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import {router as adminRoutes} from './routes/admin.js';
import {router as authRoutes} from './routes/auth.js';
import {router as categoryRoutes} from './routes/category.js';
import {router as productRoutes} from './routes/product.js';
import {router as cartRoutes} from './routes/cart.js';
import { router as orderRoutes } from './routes/order.js';
import connectDatabase from './config/database.js';

const app = express();

(async () => {
    app.use(cors({
        origin: process.env.CORS_ALLOWED_ORIGINS,
        credentials: true
    }));
    app.use(express.json());
    app.use('/admin', adminRoutes);
    app.use('/auth', authRoutes);
    app.use('/categories', categoryRoutes);
    app.use('/products', productRoutes);
    app.use('/cart', cartRoutes);
    app.use('/orders', orderRoutes);

    console.log('Connecting database...');
    await connectDatabase();

    console.log('Running server...');
    app.listen(process.env.PORT, () => console.log('✅ Server running at http://localhost:3000'));
})();