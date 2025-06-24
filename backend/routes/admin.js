const express = require('express');
const router = express.Router();
const authToken = require('../middlewares/auth');
const isAdmin = require('../middlewares/admin');
const getUsers = require('../controllers/admin');

router.get('/all-users', authToken, isAdmin, getUsers);

module.exports = router;