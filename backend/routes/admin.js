const express = require('express');
const router = express.Router();
const authToken = require('../middlewares/auth');
const isAdmin = require('../middlewares/admin');
const getUsers = require('../controllers/admin');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Rotas restritas a administradores
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   username:
 *                     type: string
 *                   role:
 *                     type: string
 *       401:
 *         description: Token JWT ausente ou inválido
 *       403:
 *         description: Acesso negado (usuário não é admin)
 */

router.get('/users', authToken, isAdmin, getUsers);

module.exports = router;