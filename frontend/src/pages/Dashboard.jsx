import { useAuth } from '../contexts/AuthContext';
import UserCard from '../components/UserCard';

export default function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <div className='flex flex-col items-center justify-start min-h-[60vh] px-4'>
            <h1 className='text-3xl font-bold text-red-600 mb-6'></h1>
            {user ? (
                <>
                    <UserCard user={user} />
                    <button
                        onClick={logout}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 mt-3 cursor-pointer rounded transition"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <p className='text-gray-600'>Loading user info...</p>
            )}
        </div>
    );
}