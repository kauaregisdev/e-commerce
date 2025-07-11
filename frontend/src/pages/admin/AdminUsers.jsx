import { useEffect, useState } from "react";
import { api } from '../../services/api';
import UserCard from '../../components/UserCard';

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let token = localStorage.getItem('token');
        api.get('/admin/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => setUsers(res.data))
        .catch(err => {
            console.error(err);
            setUsers([]);
        })
        .finally(() => setLoading(false));
    }, []);

    const handleDelete = id => {
        if (!confirm('Are you sure of deleting this user?')) return;

        let token = localStorage.getItem('token');
        api.delete(`/admin/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            setUsers(users.filter(user => user._id !== id));
        })
        .catch(err => console.error(err));
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6 text-red-700">User management</h1>

            {loading ? (
                <p>Loading users...</p>
            ) : users.length === 0 ? (
                <p>No user found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {users.map(user => (
                        <div key={user._id} className="relative">
                            <UserCard user={user} />
                            <button
                                onClick={() => handleDelete(user._id)}
                                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}