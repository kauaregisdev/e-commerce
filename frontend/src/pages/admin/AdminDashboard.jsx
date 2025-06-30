import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-red-700 mb-6">Admin dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link
                    to="/admin/users"
                    className="bg-white rounded-xl shadow p-6 hover:shadow-lg border-l-4 border-red-500 transition"
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Manage users</h2>
                    <p className="text-gray-600 text-sm">Visualize, edit or remove signed up users.</p>
                </Link>

                <Link
                    to="/admin/products"
                    className="bg-white rounded-xl shadow p-6 hover:shadow-lg border-l-4 border-red-500 transition"
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Manage products</h2>
                    <p className="text-gray-600 text-sm">Create, edit or remove products from system.</p>
                </Link>
                <Link
                    to="/admin/categories"
                    className="bg-white rounded-xl shadow p-6 hover:shadow-lg border-l-4 border-red-500 transition"
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Manage categories</h2>
                    <p className="text-gray-600 text-sm">Create, edit or remove categories from system.</p>
                </Link>
            </div>
        </div>
    );
}