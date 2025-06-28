import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await login(formData);
            setMessage('User logged in successfully!');
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setMessage('Invalid credentials.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Login</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username:"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                        required
                    />
                </div>
                <div className="">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password:"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                        required
                    />
                </div>
                <button type="submit" className="mt-5 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
                    Sign in
                </button>
                {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
            </form>
        </div>
    );
}