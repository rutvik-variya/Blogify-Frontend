import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecentActivity } from "../../features/dashboard/userDashboardSlice";
import { Link } from "react-router-dom";
import { FiMessageSquare, FiClock, FiArrowUpRight } from "react-icons/fi";

const Activity = () => {
    const dispatch = useDispatch();
    const { recentActivity, recentActivityLoading, error } = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(getRecentActivity());
    }, [dispatch]);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    if (error) {
        return (
            <div className="bg-violet-50 border border-violet-100 p-4 rounded-xl text-sm font-medium text-violet-600 text-center mx-4 my-6">
                Failed to load dashboard metrics: {error}
            </div>
        );
    }

    return (
        <div className="space-y-6 text-left font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
            <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">Recent Activity</h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
                    Track your recent interactions, comments.
                </p>
            </div>

            {recentActivityLoading ? (
                <div className="space-y-4">
                    {Array.from({ length: 2 }).map((_, idx) => (
                        <div key={idx} className="flex gap-4 p-4 sm:p-5 bg-white border border-slate-200/60 rounded-2xl animate-pulse shadow-sm">
                            <div className="w-9 h-9 bg-slate-100 rounded-full shrink-0"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-slate-100 rounded w-1/3"></div>
                                <div className="h-3 bg-slate-50 rounded w-2/3"></div>
                                <div className="h-5 bg-slate-100 rounded w-full mt-2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : recentActivity && recentActivity.length > 0 ? (
                <div className="space-y-4 sm:space-y-5">
                    {recentActivity.map((activity) => (
                        <div key={activity._id}>
                            <div className="bg-white border border-slate-200/60 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-slate-300/80 transition-all duration-300">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 bg-violet-50 text-violet-600 rounded-lg flex items-center justify-center shrink-0">
                                            <FiMessageSquare size={13} />
                                        </div>
                                        <p className="text-xs text-slate-400 font-medium">
                                            Posted a comment on
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 sm:self-center">
                                        <FiClock size={11} />
                                        <span>{formatDate(activity.createdAt)}</span>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <Link
                                        to={`/blog/${activity.blog?.slug}`}
                                        className="inline-flex items-center gap-1 group/link text-sm font-bold text-slate-700 hover:text-violet-600 transition-colors max-w-full"
                                    >
                                        <span className="truncate text-sm sm:text-base md:text-sm">{activity.blog?.title || "View Post"}</span>
                                        <FiArrowUpRight size={14} className="text-slate-300 group-hover/link:text-violet-500 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all shrink-0" />
                                    </Link>

                                    <div className="mt-2 bg-slate-50/60 rounded-xl p-3 border border-slate-100 text-slate-600 text-xs leading-relaxed italic">
                                        "{activity.content}"
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="w-full py-16 bg-white border border-slate-200/60 rounded-2xl text-center shadow-sm flex flex-col items-center justify-center p-6">
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-300 mb-3.5">
                        <FiMessageSquare size={20} />
                    </div>
                    <h3 className="font-bold text-slate-700 text-base">No Activity Found</h3>
                    <p className="text-xs text-slate-400 max-w-xs mt-1">
                        Your interaction logs are currently clean. Go read some posts and share your thoughts to populate this list!
                    </p>
                </div>
            )}
        </div>
    );
};

export default Activity;