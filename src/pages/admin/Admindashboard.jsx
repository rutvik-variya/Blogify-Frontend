import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAdminStats } from "../../features/dashboard/adminDashboardSlice";
import StatsCards from "../../components/dashboard/StatsCards";
import {
    FiUsers,
    FiBookOpen,
    FiTag,
    FiMessageSquare,
    FiCheckCircle,
    FiEdit2
} from "react-icons/fi";

const Admindashboard = () => {
    const dispatch = useDispatch();
    const { stats, loading, error } = useSelector((state) => state.adminDashBoard);

    useEffect(() => {
        dispatch(getAdminStats());
    }, [dispatch]);

    const cardsConfig = [
        { label: "Total Users", value: stats?.totalUsers, icon: FiUsers, color: "text-violet-600 bg-violet-50" },
        { label: "Total Blogs", value: stats?.totalBlogs, icon: FiBookOpen, color: "text-blue-600 bg-blue-50" },
        { label: "Total Categories", value: stats?.totalCategories, icon: FiTag, color: "text-green-600 bg-green-50" },
        { label: "Total Comments", value: stats?.totalComments, icon: FiMessageSquare, color: "text-indigo-600 bg-indigo-50" },
        { label: "Total Published", value: stats?.publishBlogs, icon: FiCheckCircle, color: "text-emerald-600 bg-emerald-50" },
        { label: "Total Draft", value: stats?.draftBlogs, icon: FiEdit2, color: "text-amber-600 bg-amber-50" },
    ];

    return (
        <div className="space-y-6 text-left font-sans">
            {/* Typography matches User Overview exactly */}
            <div>
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Admin Overview</h2>
                <p className="text-sm text-slate-400 mt-1">
                    Global platform metrics, user distributions, and content engagement data.
                </p>
            </div>

            {/* Shared Reusable Grid Component */}
            <StatsCards
                cardsConfig={cardsConfig}
                loading={loading}
                error={error}
            />
        </div>
    );
};

export default Admindashboard;