export default function UserCard({ user }) {
    return (
        <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition w-full max-w-sm">
            <h3 className="text-lg font-bold text-gray-800">{user.username}</h3>
            <p className="text-gray-600">Function: <span className="font-medium">{user.role}</span></p>
            <p className="text-gray-400 text-sm mt-2">ID: {user._id}</p>
        </div>
    );
}