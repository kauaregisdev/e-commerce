import express from 'express';
import authToken from '../middlewares/auth.js';
import isAdmin from '../middlewares/admin.js';
import {createProduct, deleteProduct} from '../controllers/product.js';
import {createCategory, deleteCategory} from '../controllers/category.js';
import {getUsers, deleteUser} from '../controllers/user.js';

export const router = express.Router();

router.get('/users', authToken, isAdmin, getUsers);
router.post('/products', authToken, isAdmin, createProduct);
router.post('/categories', authToken, isAdmin, createCategory);
router.delete('/users/:id', authToken, isAdmin, deleteUser);
router.delete('/products/:id', authToken, isAdmin, deleteProduct);
router.delete('/categories/:id', authToken, isAdmin, deleteCategory);