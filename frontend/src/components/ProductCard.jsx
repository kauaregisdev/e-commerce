import {Link} from 'react-router-dom';

export default function ProductCard({product}) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition w-full max-w-sm">
            {product.image && (
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-48 w-full object-cover"
                />
            )}
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">R$ {product.price.toFixed(2)}</p>
                <Link
                    to={`/products/${product._id}`}
                    className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                    See details
                </Link>
            </div>
        </div>
    );
}