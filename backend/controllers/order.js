import {Order} from '../models/Order.js';
import {Cart} from '../models/Cart.js';

export async function createOrder(req, res) {
    const userId = req.user._id;
    const { address } = req.body;

    if (!address) {
        return res.status(400).json({
            error: 'Address is required.'
        });
    }

    try {
        const cart = await Cart.findOne({
            user: userId
        }).populate('items.product');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                error: 'Cart is empty.'
            });
        }

        const total = cart.items.reduce(
            (sum, item) => sum + item.product.price * item.quantity, 0
        );

        const order = await Order.create({
            user: userId,
            items: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity
            })),
            total: total.toFixed(2),
            address
        });

        cart.items = [];
        await cart.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({
            error: 'Failed to create order.',
            details: err.message
        });
    }
}

export async function getOrders(req, res) {
    const userId = req.user._id;

    try {
        const orders = await Order.find({
            user: userId
        });
        res.json(orders);
    } catch (err) {
        res.status(500).json({
            error: 'Failed to retrieve orders.',
            details: err.message
        });
    }
}