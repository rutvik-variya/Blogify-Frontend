import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDashboardStats } from "../../features/dashboard/userDashboardSlice";
import StatsCards from "../../components/dashboard/StatsCards";

const DashboardHome = () => {
    const dispatch = useDispatch();
    const { loading, stats, error } = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(getDashboardStats());
    }, [dispatch]);

    return (
        <div className="space-y-6 text-left font-sans">
            <div>
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Overview</h2>
                <p className="text-sm text-slate-400 mt-1">
                    Here is a breakdown of your content metrics and engagement data.
                </p>
            </div>

            {/* Stats Components Grid Wrapper */}
            <StatsCards stats={stats} loading={loading} error={error} />
        </div>
    );
};

export default DashboardHome;