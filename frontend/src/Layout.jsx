import {Outlet, Link} from 'react-router-dom';
import {useAuth} from './contexts/AuthContext';

export default function Layout() {
    const {isAuthenticated, isAdmin, logout} = useAuth();

    return (
        <div className='min-h-screen flex flex-col bg-gray-50 text-gray-800'>
            <header className='bg-red-900 text-white shadow-md'>
                <nav className='container mx-auto flex justify-between items-center px-4 py-4'>
                    <h1 className='text-xl font-bold tracking-wider'>E-commerce</h1>
                    <ul className='flex gap-6 items-center text-white'>
                        <li>
                            <Link to='/' className='hover:text-red-300 transition'>Home</Link>
                        </li>
                        <li>
                            <Link to='/products' className='hover:text-red-300 transition'>Products</Link>
                        </li>
                        {isAuthenticated ? (
                            <>
                                <li>
                                    <Link to='/dashboard' className='hover:text-red-300 transition'>Dashboard</Link>
                                </li>
                                {isAdmin && (
                                    <li>
                                        <Link to='/admin' className='hover:text-red-300 transition'>Admin</Link>
                                    </li>
                                )}
                                <li>
                                    <button
                                        onClick={logout}
                                        className='text-white border-white rounded px-3 py-1 hover:bg-red-700 transition'
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to='/login' className='hover:text-red-300 transition'>Login</Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>

            <main className='flex-grow container mx-auto px-4 py-8'>
                <Outlet />
            </main>

            <footer className='bg-red-900 text-white py-4'>
                <div className='container mx-auto text-center text-sm'>
                    © 2025 - E-Commerce criado por Kauã Régis. Todos os direitos reservados.
                </div>
            </footer>
        </div>
    );
}