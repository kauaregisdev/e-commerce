import { useEffect, useState } from "react";
import { api } from '../../services/api';
import CategoryCard from "../../components/CategoryCard";

export default function AdminCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let token = localStorage.getItem('token');
        api.get('/categories', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => setCategories(res.data))
        .catch(err => {
            console.error(err);
            setCategories([]);
        })
        .finally(() => setLoading(false));
    }, []);

    const handleDelete = id => {
        if (!confirm('Are you sure of deleting this category?')) return;

        let token = localStorage.getItem('token');
        api.delete(`/admin/categories/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            setCategories(categories.filter(category => category._id !== id));
        })
        .catch(err => console.error(err));
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6 text-red-700">Category management</h1>

            {loading ? (
                <p>Loading categories...</p>
            ) : categories.length === 0 ? (
                <p>No categories found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {categories.map(category => (
                        <div key={category._id} className="relative">
                            <CategoryCard category={category} />
                            <button
                                onClick={() => handleDelete(category._id)}
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