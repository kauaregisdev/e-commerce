import {Cart} from '../models/Cart.js';

export async function getCart(req, res) {
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

export async function syncCart(req, res) {
    const userId = req.user._id;
    const items = !!req.body.items ? req.body.items : [];

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

export async function updateCart(req, res) {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    if (!productId || typeof quantity !== 'number' || quantity < 1) {
        return res.status(400).json({
            error: 'Invalid product ID or quantity.'
        });
    }

    try {
        const cart = await Cart.findOne({
            user: userId
        });
        if (!cart) {
            return res.status(404).json({
                error: 'Cart not found.'
            });
        }

        const item = cart.items.find(i => i.product.toString() === productId);
        if (!item) {
            return res.status(404).json({
                error: 'Product not in cart.'
            });
        }

        item.quantity = quantity;
        await cart.save();
        await cart.populate('items.product');
        res.json(cart);
    } catch (err) {
        res.status(500).json({
            error: 'Failed to update cart item',
            details: err.message
        });
    }
}