import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import ProtectedRoute from '../middlewares/ProtectedRoute';
import AdminRoute from '../middlewares/AdminRoute';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';
import Dashboard from '../pages/Dashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminCategories from '../pages/admin/AdminCategories';
import AdminProducts from '../pages/admin/AdminProducts';
import AdminUsers from '../pages/admin/AdminUsers';
import NotFound from '../pages/errors/NotFound';
import Unauthorized from '../pages/errors/Unauthorized';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>

                {/* public */}
                <Route index element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/products' element={<Products />} />
                <Route path='/products/:id' element={<ProductDetails />} />

                {/* users */}
                <Route path='/dashboard' element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                
                {/* admin */}
                <Route path='/admin' element={<AdminRoute />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path='categories' element={<AdminCategories />} />
                    <Route path='products' element={<AdminProducts />} />
                    <Route path='users' element={<AdminUsers />} />
                </Route>

                {/* errors */}
                <Route path='/unauthorized' element={<Unauthorized />} />
                <Route path='*' element={<NotFound />} />
            </Route>
        </Routes>
    )
}