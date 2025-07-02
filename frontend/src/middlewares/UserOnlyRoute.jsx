import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function UserOnlyRoute() {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    if (!isAuthenticated) return <Navigate to='/login' />;

    if (isAdmin) {
        if (location.pathname.startsWith('/cart') || location.pathname.startsWith('/checkout')) {
            return <Navigate to='/admin' replace />;
        }
    }

    return <Outlet />;
}