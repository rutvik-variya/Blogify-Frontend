import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/public/HomePage";
import BlogPage from "../pages/public/BlogPage";
import BlogDetail from "../pages/public/BlogDetail";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import CreateBlog from "../pages/user/CreateBlog";
import ProfilePage from "../pages/user/ProfilePage";
import ChangePassword from "../components/profile/ChangePassword";
import UpdateProfile from "../components/profile/UpdateProfile";

import Admindashboard from "../pages/admin/Admindashboard";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
const AppRoutes = () => {
    return (
        <Routes>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<MainLayout />}>

                {/* public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />


                {/* protected routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/createBlog" element={<CreateBlog />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/updateProfile" element={<UpdateProfile />} />
                    <Route path="/changePassword" element={<ChangePassword />} />
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