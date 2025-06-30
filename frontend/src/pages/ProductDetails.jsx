import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        api.get(`/products/${id}`)
        .then(res => setProduct(res.data))
        .catch(err => console.error(err));
    }, [id]);

    if (!product) {
        return <div className="text-center text-gray-600">Loading...</div>
    }

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
            <h1 className="text-3xl font-bold text-red-600 mb-6">{product.title}</h1>
            {product.image && (
                <img src={product.image} alt={product.title} className="w-full h-64 object-cover rounded-lg mb-6" />
            )}
            <p className="text-lg text-gray-700 mb-4">{product.description}</p>
            <p className="text-xl font-semibold text-red-700 mb-6">R$ {product.price.toFixed(2)}</p>
            <div className="flex gap-4">
                <Link
                    to='/products'
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition"
                >
                    Go back
                </Link>
                <button
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                    disabled
                >
                    Add to cart
                </button>
            </div>
        </div>
    );
}