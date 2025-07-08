import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function Checkout() {
    const { token } = useAuth();
    const { cartItems, total, clearCart } = useCart();
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            await api.post("/orders", {
                address
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            clearCart();
            setMessage("Order placed successfully!");
            setTimeout(() => navigate("/dashboard"), 1500);
        } catch (err) {
            console.error(err);
            setMessage("Error placing order. Try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md text-center mt-10">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Your cart is empty.</h2>
                <a href="/products" className="text-red-600 hover:underline">See products</a>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md mt-10">
            <h1 className="text-3xl font-bold text-red-700 mb-6">Checkout</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Delivery address</label>
                    <textarea
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                        rows={3}
                        placeholder="Enter your address..."
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">Order summary</h2>
                    <ul className="divide-y divide-gray-200 mb-4">
                        {cartItems.map((item, idx) => (
                            <li key={idx} className="py-2 flex justify-between">
                                <span>{item.product.title} x {item.quantity}</span>
                                <span className="text-gray-700">R$ {(item.product.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span className="text-red-700">R$ {total.toFixed(2)}</span>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-semibold"
                >
                    {loading ? "Placing order..." : "Place order"}
                </button>
                {message && (
                    <div className="text-center mt-4 text-red-600 font-medium">{message}</div>
                )}
            </form>
        </div>
    );
}