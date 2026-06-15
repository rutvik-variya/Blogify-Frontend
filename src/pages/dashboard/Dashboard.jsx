import { useSelector } from "react-redux";
import DashboardHome from "./DashboardHome";
import Admindashboard from "../admin/Admindashboard";

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    return user?.role === "admin"
        ? <Admindashboard />
        : <DashboardHome />;
}

export default Dashboard
