import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = product => {
        setCart(prev => {
            const existing = prev.find(item => item._id === product._id);
            if (existing) {
                return prev.map(item =>
                    item._id === product._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = productId => {
        setCart(prev => prev.filter(item => item._id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        setCart(prev =>
            prev.map(item =>
                item._id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setCart([]);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                total
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
    return useContext(CartContext);
}