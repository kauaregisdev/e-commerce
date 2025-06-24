import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function getToken(username, password) {
    const res = await axios.post(VITE_API_URL + 'auth/login', {
        username,
        password
    });
    return res.data.token;
}

export const api = axios.create({
    baseURL: VITE_API_URL
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (err) => Promise.reject(err)
);

api.interceptors.response.use(
    (response) => response,
    async (err) => {
        const originalRequest = err.config;
        if (
            err.response &&
            err.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                const res = await axios.post(VITE_API_URL + 'auth/login', {
                    username: 'admin',
                    password: 'admin123'
                });
                localStorage.setItem('token', res.data.token);
                originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
                return api(originalRequest);
            } catch (refreshError) {
                alert('Erro de autenticação.');
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(err);
    }
);