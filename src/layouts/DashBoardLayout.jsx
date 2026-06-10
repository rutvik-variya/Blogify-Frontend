import Sidebar from "../components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen max-w-7xl mx-auto my-10">
            <Sidebar />
            <main className="flex-1 bg-slate-50 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;