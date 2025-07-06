import {Category} from '../models/Category.js';

export async function getCategories(req, res) {
    const categories = await Category.find();
    res.json(categories);
}

export async function getSingleCategory(req, res) {
    const category = await Category.findOne({
        _id: req.params.id
    });
    res.json(category);
}

export async function createCategory(req, res) {
    const category = await Category.create(req.body);
    res.status(201).json(category);
}

export async function deleteCategory(req, res) {
    try {
        const category = await Category.findOneAndDelete({
            _id: req.params.id
        });
        if (!category) return res.status(404).json({error: 'Category not found.'});
        res.status(204).end();
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}