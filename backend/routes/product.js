const express = require('express');
const router = express.Router();
const authToken = require('../middlewares/auth');
const isAdmin = require('../middlewares/admin');
const {getProducts, createProduct} = require('../controllers/product');

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
 *
 *   post:
 *     summary: Cria um novo produto (Admin somente)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - price
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado
 */

router.get('/', authToken, getProducts);
router.post('/', authToken, isAdmin, createProduct);

module.exports = router;