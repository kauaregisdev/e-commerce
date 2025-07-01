import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return isAuthenticated ? children : <Navigate to='/login' />;
}