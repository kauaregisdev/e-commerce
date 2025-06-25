import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AdminRoute({ children }) {
    const { isAuthenticated, isAdmin } = useAuth();

    if (!isAuthenticated) return <Navigate to='/login' />;
    if (!isAdmin) return <Navigate to='/unauthorized' />;

    return children;
}