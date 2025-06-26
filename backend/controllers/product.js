const Product = require('../models/Product');

async function getProducts(req, res) {
    const products = await Product.find().populate('category');
    res.json(products);
}

async function getSingleProduct(req, res) {
    const product = await Product.findOne({
        _id: req.params.id
    }).populate('category');
    res.json(product);
}

async function createProduct(req, res) {
    const product = await Product.create(req.body);
    res.status(201).json(product);
}

module.exports = {getProducts, getSingleProduct, createProduct};