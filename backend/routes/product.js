const express = require('express');
const router = express.Router();
const {getProducts} = require('../controllers/product');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gerenciamento de produtos
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 */

router.get('/', getProducts);

module.exports = router;