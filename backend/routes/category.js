import express from 'express';
import {getCategories, getSingleCategory} from '../controllers/category.js';

export const router = express.Router();

router.get('/', getCategories);
router.get('/:id', getSingleCategory);