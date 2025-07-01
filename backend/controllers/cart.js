const Cart = require('../models/Cart');

async function getCart(req, res) {
    try {
        const cart = await Cart.findOne({
            user: req.user._id
        }).populate('items.product');
        res.json(cart || {
            items: []
        });
    } catch (err) {
        res.status(500).json({
            error: 'Error at seeking cart'
        });
    }
}

async function syncCart(req, res) {
    const userId = req.user._id;
    const items = req.body.items;

    if (!Array.isArray(items)) {
        return res.status(400).json({
            error: 'Items must be an array.'
        });
    }

    try {
        const updatedCart = await Cart.findOneAndUpdate(
            {
                user: userId
            }, {
                $set: {
                    items
                }
            }, {
                new: true,
                upsert: true
            }
        ).populate('items.product');

        res.json(updatedCart);
    } catch (err) {
        res.status(500).json({
            error: 'Failed to sync cart',
            details: err.message
        });
    }
}

module.exports = {
    getCart,
    syncCart
};