const express = require('express');
const router = express.Router();
const authToken = require('../middlewares/auth');
const { getCart, syncCart, updateCart } = require('../controllers/cart');

router.get('/', authToken, getCart);
router.post('/sync', authToken, syncCart);
router.put('/update', authToken, updateCart);

module.exports = router;