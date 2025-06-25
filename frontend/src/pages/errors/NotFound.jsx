export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
            <h1 className="text-7xl font-extrabold text-red-600 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page not found.</h2>
            <p className="text-gray-600 mb-6">
                The page you are looking for does not exist or was moved.
            </p>
            <a
                href="/"
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
            >
                Go back to Home
            </a>
        </div>
    );
}