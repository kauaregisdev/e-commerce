import { useAuth } from "../contexts/AuthContext";

export default function UserCard({ user }) {
    const { logout } = useAuth();

    return (
        <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition w-full max-w-sm">
            <h3 className="text-lg font-bold text-gray-800">{user.username}</h3>
            <p className="text-gray-600">Function: <span className="font-medium">{user.role}</span></p>
            <p className="text-gray-400 text-sm mt-2">ID: {user._id}</p>
            <button onClick={logout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 mt-5 cursor-pointer rounded transition">Logout</button>
        </div>
    );
}