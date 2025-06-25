export default function Unauthorized() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
            <h1 className="text-7xl font-extrabold text-yellow-500 mb-4">403</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Access denied.</h2>
            <p className="text-gray-600 mb-6">
                You are not allowed to access this page.
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