import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from './AuthContext';
import { api } from "../services/api";
import { syncCart } from "../utils/syncCart";

const CartContext = createContext();

export function CartProvider({ children }) {
    const { token, isAuthenticated } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            const localCart = JSON.parse(localStorage.getItem('cartItems')) || [];
            if (localCart.length > 0) {
                syncCart(localCart, token)
                .then(() => {
                    localStorage.removeItem('cartItems');
                    api.get('/cart', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then(res => setCartItems(res.data.items))
                    .catch(err => console.error(err))
                    .finally(() => setLoading(false));
                });
            } else {
                api.get('/cart', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res => setCartItems(res.data.items))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
            }
        } else {
            const localCart = JSON.parse(localStorage.getItem('cartItems')) || [];
            setCartItems(localCart);
            setLoading(false);
        }
    }, [isAuthenticated, token]);

    useEffect(() => {
        if (!isAuthenticated) {
            setCartItems([]);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (!isAuthenticated && Array.isArray(cartItems)) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }, [cartItems, isAuthenticated]);

    const addToCart = (product, quantity = 1) => {
        const existing = cartItems.find(item => item.product._id === product._id);
        if (existing) {
            setCartItems(prev =>
                prev.map(item =>
                    item.product._id === product._id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
                )
            );
        } else {
            setCartItems(prev => [...prev, {
                product, quantity
            }]);
        }
    };

    const removeFromCart = productId => {
        setCartItems(prev => prev.filter(item => item.product._id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        setCartItems(prev =>
            prev.map(item =>
                item.product._id === productId ? { ...item, quantity } : item
            )
        );
        if (isAuthenticated) {
            api.put('/cart/sync', {
                productId, quantity
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .catch(err => console.error(err));
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const total = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    : 0;

    const value = {
        cartItems,
        setCartItems,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
    return useContext(CartContext);
}