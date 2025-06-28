import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const navigate = useNavigate();

    useEffect(() => {
    if (token) {
        api.get('auth/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }, })
            .then((res) => setUser(res.data))
            .catch(() => logout());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const login = async (credentials) => {
        const res = await api.post('/auth/login', credentials);
        const { token } = res.data;
        localStorage.setItem('token', token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setToken('');
        navigate('/login');
    };

    const isAuthenticated = !!user;
    const isAdmin = user?.role === 'admin';

    return (
        <AuthContext.Provider
        value={{ user, token, login, logout, isAuthenticated, isAdmin }}
        >
        {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}