import {Link} from 'react-router-dom';

export default function ProductCard({product}) {
    return (
        <div className="border rounded-xl shadow-md p-4 bg-white hover:shadow-lg transition">
            {product.image && (
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-48 w-full object-cover"
                />
            )}
            <div className="p-4">
                <h2 className="text-xl font-semibold text-red-700">{product.title}</h2>
                {product.description && (
                    <p className='text-gray-600 mt-1 mb-2'>{product.description}</p>
                )}
                <span className="text-red-800 font-bold text-lg">R$ {product.price.toFixed(2)}</span>
                <Link
                    to={`/products/${product._id}`}
                    className="inline-block bg-red-600 text-white px-5 py-2 rounded-lg shadow hover:bg-red-700 transition"
                >
                    See details
                </Link>
            </div>
        </div>
    );
}