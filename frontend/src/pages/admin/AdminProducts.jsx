import { useEffect, useState } from "react";
import { api } from "../../services/api";
import ProductCard from '../../components/ProductCard';

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/products')
        .then(res => setProducts(res.data))
        .catch(err => {
            console.error(err);
            setProducts([]);
        })
        .finally(() => setLoading(false));
    }, []);

    const handleDelete = id => {
        if (!confirm('Are you sure of deleting this product?')) return;

        let token = localStorage.getItem('token');
        api.delete(`/admin/products/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            setProducts(products.filter(product => product._id !== product));
        })
        .catch(err => console.error(err));
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6 text-red-700">Product management</h1>

            {loading ? (
                <p>Loading products...</p>
            ) : products.length === 0 ? (
                <p>No product found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map(product => (
                        <div key={product._id} className="relative">
                            <ProductCard product={product} />
                            <button
                                onClick={() => handleDelete(product._id)}
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