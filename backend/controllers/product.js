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

async function deleteProduct(req, res) {
    try {
        const product = await Product.findOneAndDelete({
            _id: req.params.id
        });
        if (!product) return res.status(404).json({error: 'Product not found.'});
        res.status(204).end();
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

module.exports = {getProducts, getSingleProduct, createProduct, deleteProduct};