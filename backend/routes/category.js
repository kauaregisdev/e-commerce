const express = require('express');
const router = express.Router();
const authToken = require('../middlewares/auth');
const isAdmin = require('../middlewares/admin');
const {getCategories, createCategory} = require('../controllers/category');

router.get('/', authToken, getCategories);
router.post('/', authToken, isAdmin, createCategory);

module.exports = router;