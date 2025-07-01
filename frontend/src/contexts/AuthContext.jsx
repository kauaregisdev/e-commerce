import { createContext, useContext, useEffect, useState } from "react";
import { api } from '../services/api';
import { syncCart } from "../utils/syncCart";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            api.get('auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => setUser(res.data))
                .catch(() => logout())
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [token]);

    const login = async (credentials) => {
        const res = await api.post('/auth/login', credentials);
        const { token } = res.data;
        localStorage.setItem('token', token);
        setToken(token);
        await syncCart(JSON.parse(localStorage.getItem('cart')) || [], token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setToken('');
    };

    const isAuthenticated = !!user;
    const isAdmin = user?.role === 'admin';

    return (
        <AuthContext.Provider
        value={{ user, token, login, logout, loading, isAuthenticated, isAdmin }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}