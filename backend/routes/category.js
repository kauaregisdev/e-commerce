const express = require('express');
const router = express.Router();
const {getCategories, getSingleCategory} = require('../controllers/category');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Gerenciamento de categorias de produtos
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso
 */

router.get('/', getCategories);
router.get('/:id', getSingleCategory);

module.exports = router;