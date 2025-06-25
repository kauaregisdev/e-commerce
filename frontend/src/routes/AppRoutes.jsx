import { Routes, Route } from 'react-router-dom';
import Layout from '../Layout';
import ProtectedRoute from '../middlewares/ProtectedRoute';
import AdminRoute from '../middlewares/AdminRoute';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';
import Dashboard from '../pages/Dashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UsersList from '../pages/admin/UsersList';
import NotFound from '../pages/errors/NotFound';
import Unauthorized from '../pages/errors/Unauthorized';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>

                <Route index element={<Home />} />
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='products' element={<Products />} />
                <Route path='products/:id' element={<ProductDetails />} />
                <Route path='unauthorized' element={<Unauthorized />} />

                <Route path='dashboard' element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                
                <Route path='admin' element={
                    <AdminRoute>
                        <AdminDashboard />
                    </AdminRoute>
                } />
                <Route path='admin/users' element={
                    <AdminRoute>
                        <UsersList />
                    </AdminRoute>
                } />

                <Route path='*' element={<NotFound />} />
            </Route>
        </Routes>
    )
}