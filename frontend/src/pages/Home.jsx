import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-2xl mt-10">
            <h1 className="text-3xl font-bold text-red-700 mb-6">Welcome to our virtual store!</h1>

            <p className="mb-4 text-gray-700">
                Explore our products, sign up to buy and enjoy awesome offers.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
                <Link
                    to='/products'
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
                >
                    See products
                </Link>
                <Link
                    to='/login'
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg transition"
                >
                    Sign in
                </Link>
                <Link
                    to='/register'
                    className="bg-white border border-red-600 text-red-600 hover:bg-red-50 px-6 py-2 rounded-lg transition"
                >
                    Create account
                </Link>
            </div>
        </div>
    );
}