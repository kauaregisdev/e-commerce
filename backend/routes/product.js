import express from 'express';
import {getProducts, getSingleProduct} from '../controllers/product.js';

export const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getSingleProduct);