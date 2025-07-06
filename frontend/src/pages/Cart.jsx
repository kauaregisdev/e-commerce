import { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

export default function Cart() {
    const { token } = useAuth();
    const { cartItems, setCartItems, removeFromCart, updateQuantity, clearCart, total } = useCart();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;
        setLoading(true);

        api.get('/cart', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            setCartItems(res.data.items);
        })
        .catch(err => {
            console.error(err);
        })
        .finally(() => setLoading(false));
    }, [token, setCartItems]);

    if (loading) return <p>Loading cart...</p>;

    if (Array.isArray(cartItems) && cartItems.length === 0) {
        return (
            <div className='text-center py-10'>
                <h2 className='text-2xl font-bold text-gray-700'>Your cart is empty.</h2>
                <Link to='/products' className='mt-4 inline-block text-red-600 hover:underline'>See products</Link>
            </div>
        );
    }

    return (
        <div className='max-w-4xl mx-auto py-8'>
            <h2 className='text-3xl font-bold mb-6 text-gray-800'>Your cart</h2>
            <ul className='space-y-6'>
                {Array.isArray(cartItems) && cartItems.map((item, index) => (
                    <li key={index} className='bg-white shadow rounded-lg p-4 flex justify-between items-center'>
                        <div>
                            <h3 className='text-lg font-semibold text-gray-700'>{item.product.title}</h3>
                            <p className='text-sm text-gray-500'>Price: R${item.product.price.toFixed(2)}</p>
                            <div className='flex items-center gap-2 mt-2'>
                                <label className='text-sm'>Quantity:</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={e => updateQuantity(item.product._id, Number(e.target.value))}
                                    className='w-16 border rounded px-2 py-1'
                                />
                            </div>
                        </div>
                        <button
                            onClick={() => removeFromCart(item.product._id)}
                            className='text-red-500 hover:text-red-700 font-medium'
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>

            <div className="mt-6 flex justify-between items-center">
                <strong className="text-xl">Total: R$ {total.toFixed(2)}</strong>
                <div className="flex gap-4">
                    <button
                        onClick={clearCart}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                    >
                        Clear cart
                    </button>
                    <Link
                        to="/checkout"
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Finish order
                    </Link>
                </div>
            </div>
        </div>
    );
}