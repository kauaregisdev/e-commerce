import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
    const { cart, total, removeFromCart, updateQuantity, clearCart } = useCart();

    return (
        <div className='container mx-auto px-4 py-6'>
            <h1 className='text-2xl font-bold mb-6 text-red-700'>Product Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className='space-y-4'>
                        {cart.map(item => (
                            <li key={item._id} className='bg-white p-4 shadow rounded-lg flex justify-between items-center'>
                                <div>
                                    <h3 className='text-lg font-semibold'>{item.title}</h3>
                                    <p className='text-gray-600'>Price: R$ {item.price}</p>
                                    <div className='flex items-center gap-2 mt-2'>
                                        <label className='text-sm'>Quantity:</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={e => updateQuantity(item._id, Number(e.target.value))}
                                            className='w-16 border rounded px-2 py-1'
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    className='text-red-500 hover:text-red-700'
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className='mt-6 flex justify-between items-center'>
                        <strong className='text-xl'>Total: R$ {total.toFixed(2)}</strong>
                        <div className='flex gap-4'>
                            <button
                                onClick={clearCart}
                                className='bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300'
                            >
                                Clear cart
                            </button>
                            <Link
                                to='/checkout'
                                className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700'
                            >
                                Finish order
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}