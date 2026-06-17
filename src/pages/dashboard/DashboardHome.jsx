import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDashboardStats } from "../../features/dashboard/userDashboardSlice";
import StatsCards from "../../components/dashboard/StatsCards";
import { FiBookOpen, FiCheckCircle, FiEdit2, FiHeart, FiMessageSquare, FiBookmark } from "react-icons/fi";

const DashboardHome = () => {
    const dispatch = useDispatch();
    const { loading, stats, error } = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(getDashboardStats());
    }, [dispatch]);

    const cardsConfig = [
        { label: "Total Blogs", value: stats?.totalBlogs, icon: FiBookOpen, color: "text-blue-600 bg-blue-50" },
        { label: "Published Blogs", value: stats?.publishedBlogs, icon: FiCheckCircle, color: "text-emerald-600 bg-emerald-50" },
        { label: "Draft Blogs", value: stats?.draftBlogs, icon: FiEdit2, color: "text-amber-600 bg-amber-50" },
        { label: "Total Likes", value: stats?.totallike, icon: FiHeart, color: "text-rose-600 bg-rose-50" },
        { label: "Total Comments", value: stats?.totalComment, icon: FiMessageSquare, color: "text-indigo-600 bg-indigo-50" },
        { label: "Total Bookmarks", value: stats?.totalBookmark, icon: FiBookmark, color: "text-purple-600 bg-purple-50" },
    ];

    return (
        <div className="space-y-6 text-left font-sans w-full">
            <div className="px-1 sm:px-0">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">Overview</h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                    Here is a breakdown of your content metrics and engagement data.
                </p>
            </div>

            <StatsCards
                cardsConfig={cardsConfig}
                loading={loading}
                error={error}
            />
        </div>
    );
};

export default DashboardHome;