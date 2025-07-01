const express = require('express');
const router = express.Router();
const authToken = require('../middlewares/auth');
const { getCart, syncCart } = require('../controllers/cart');

router.get('/', authToken, getCart);
router.post('/sync', authToken, syncCart);

module.exports = router;