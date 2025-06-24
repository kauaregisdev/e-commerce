const express = require('express');
const router = express.Router();
const authToken = require('../middlewares/auth');
const isAdmin = require('../middlewares/admin');
const {getProducts, createProduct} = require('../controllers/product');

router.get('/', authToken, getProducts);
router.post('/', authToken, isAdmin, createProduct);

module.exports = router;