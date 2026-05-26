import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/public/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ProfilePage from "../pages/user/ProfilePage";

import Admindashboard from "../pages/admin/Admindashboard";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
const AppRoutes = () => {
    return (
        <Routes>

            <Route element={<MainLayout />}>

                {/* public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* protected routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>


                {/* Admin routes */}
                <Route element={<AdminRoute />}>
                    <Route path="/admin/dashboard" element={<Admindashboard />}></Route>
                </Route>
            </Route>

        </Routes>
    );
};

export default AppRoutes;