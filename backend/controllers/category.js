const Category = require('../models/Category');

async function getCategories(req, res) {
    const categories = await Category.find();
    res.json(categories);
}

async function createCategory(req, res) {
    const category = await Category.create(req.body);
    res.status(201).json(category);
}

module.exports = {getCategories, createCategory};