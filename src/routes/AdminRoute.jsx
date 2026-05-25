import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const role = user.role;

    // console.log("isAuthenticated:", isAuthenticated);
    // console.log("role:", role);

    if (isAuthenticated && role == "admin") {
        return <Outlet />;
    }
    return <Navigate to="/" replace />;
};

export default AdminRoute;