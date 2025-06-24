require('dotenv').config();

const express = require('express');
const app = express();
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const connectDatabase = require('./config/database');

(async () => {
    app.use(express.json());
    app.use('/admin', adminRoutes);
    app.use('/auth', authRoutes);
    app.use('/categories', categoryRoutes);
    app.use('/products', productRoutes);

    console.log('Connecting database...');
    await connectDatabase();

    console.log('Running server...');
    app.listen(process.env.PORT, () => console.log('✅ Server running at http://localhost:3000'));
})();