const express = require('express');
const router = express.Router();
const authToken = require('../middlewares/auth');
const isAdmin = require('../middlewares/admin');
const {getCategories, createCategory} = require('../controllers/category');

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
 *
 *   post:
 *     summary: Cria uma nova categoria (Admin somente)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *       401:
 *         description: Não autorizado
 *       403:
 *         description: Acesso negado
 */

router.get('/', authToken, getCategories);
router.post('/', authToken, isAdmin, createCategory);

module.exports = router;