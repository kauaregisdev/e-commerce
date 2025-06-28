import { useEffect, useState } from "react";
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/products')
        .then(res => {
            setProducts(res.data);
        })
        .catch(err => {
            console.error(err);
            setProducts([]);
        })
        .finally(() => setLoading(false));
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-red-700 mb-6">Available products</h1>

            {loading ? (
                <p className="text-gray-600">Loading products...</p>
            ) : products.length === 0 ? (
                <p className="text-gray-500">No product registered yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}