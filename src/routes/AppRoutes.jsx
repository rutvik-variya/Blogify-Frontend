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

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

import DashBoardLayout from "../layouts/DashBoardLayout";
import Activity from "../pages/dashboard/Activity";
import Bookmarks from "../pages/dashboard/Bookmarks";
import MyBlogs from "../pages/dashboard/MyBlogs"
import RecentBlogs from "../pages/dashboard/RecentBlogs"
import EditBlog from "../pages/user/EditBlog";


import Dashboard from "../pages/dashboard/Dashboard";
import Users from "../pages/admin/Users";
import Categories from "../pages/admin/Categories";
import AddCategory from "../pages/admin/AddCategory";
import EditCategory from "../pages/admin/EditCategory";

import Blogs from "../pages/admin/Blogs";
import Comments from "../pages/admin/Comments";

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
                    <Route path="/editBlog/:id" element={<EditBlog />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/updateProfile" element={<UpdateProfile />} />
                    <Route path="/changePassword" element={<ChangePassword />} />

                    <Route path="/dashboard" element={<DashBoardLayout />}>

                        <Route
                            index
                            element={<Dashboard />}
                        />

                        {/* User Routes */}

                        <Route
                            path="blogs"
                            element={<MyBlogs />}
                        />

                        <Route
                            path="recent"
                            element={<RecentBlogs />}
                        />

                        <Route
                            path="bookmarks"
                            element={<Bookmarks />}
                        />

                        <Route
                            path="activity"
                            element={<Activity />}
                        />

                        {/* Admin Routes */}
                        <Route element={<AdminRoute />}>
                            <Route
                                path="users"
                                element={<Users />}
                            />

                            <Route
                                path="categories"
                                element={<Categories />}
                            />

                            <Route
                                path="addcategory"
                                element={<AddCategory />}
                            />
                            <Route
                                path="editCategory/:id"
                                element={<EditCategory />}
                            />
                            <Route
                                path="my-blogs"
                                element={<Blogs />}
                            />

                            <Route
                                path="comments"
                                element={<Comments />}
                            />
                        </Route>

                    </Route>
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;