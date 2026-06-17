import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecentBlogs } from "../../features/dashboard/userDashboardSlice";
import { FiEye, FiHeart, FiMessageSquare, FiBookmark, FiCalendar } from "react-icons/fi";

const RecentBlogs = () => {
    const dispatch = useDispatch();
    const { recentBlogs, recentLoading, error } = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(getRecentBlogs());
    }, [dispatch]);

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
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
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">Recent Blogs</h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
                    Review, analyze, and manage your most recently updated or created blog articles.
                </p>
            </div>

            <div className="w-full bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse block md:table">
                        <thead className="hidden md:table-header-group">
                            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                <th className="py-4 px-6">Blog Details</th>
                                <th className="py-4 px-4">Status</th>
                                <th className="py-4 px-4">Created At</th>
                                <th className="py-4 px-6 text-center">Engagement metrics</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 text-sm block md:table-row-group">
                            {recentLoading ? (
                                Array.from({ length: 3 }).map((_, idx) => (
                                    <tr key={idx} className="animate-pulse flex flex-col md:table-row p-4 border-b md:border-b-0 gap-3 md:gap-0">
                                        <td className="py-2 md:py-4 px-2 md:px-6 flex items-center gap-3">
                                            <div className="w-12 h-12 bg-slate-100 rounded-lg shrink-0"></div>
                                            <div className="space-y-2 flex-1">
                                                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                                                <div className="h-3 bg-slate-50 rounded w-1/2"></div>
                                            </div>
                                        </td>
                                        <td className="py-1 md:py-4 px-2 md:px-4"><div className="h-6 bg-slate-100 rounded-full w-16"></div></td>
                                        <td className="py-1 md:py-4 px-2 md:px-4"><div className="h-4 bg-slate-100 rounded w-20"></div></td>
                                        <td className="py-2 md:py-4 px-2 md:px-6"><div className="h-5 bg-slate-100 rounded w-full md:w-28 mx-auto"></div></td>
                                    </tr>
                                ))
                            ) : recentBlogs && recentBlogs.length > 0 ? (
                                recentBlogs.map((blog) => (
                                    <tr
                                        key={blog._id}
                                        className="hover:bg-slate-50/40 transition-colors group flex flex-col md:table-row p-4 sm:p-5 md:p-0 border-b md:border-b-0 space-y-3.5 md:space-y-0"
                                    >
                                        <td className="p-0 md:py-4 md:px-6 w-full md:max-w-xs lg:max-w-md md:table-cell">
                                            <div className="flex items-center gap-3.5">
                                                <img
                                                    src={blog.featuredImage?.url}
                                                    alt={blog.title}
                                                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-12 md:h-12 object-cover rounded-lg bg-slate-100 border border-slate-100 shrink-0 shadow-sm"
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <h4 className="font-bold text-slate-700 truncate group-hover:text-violet-600 transition-colors text-sm sm:text-base md:text-sm">
                                                        {blog.title}
                                                    </h4>
                                                    <p className="text-xs text-slate-400 truncate mt-0.5">
                                                        /{blog.slug}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-0 md:py-4 md:px-4 whitespace-nowrap md:table-cell flex justify-between items-center">
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider md:hidden">Status</span>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide capitalize ${blog.status === "published"
                                                ? "bg-emerald-50 text-emerald-600"
                                                : "bg-amber-50 text-amber-600"
                                                }`}>
                                                {blog.status}
                                            </span>
                                        </td>

                                        <td className="p-0 md:py-4 md:px-4 text-slate-500 font-medium whitespace-nowrap md:table-cell flex justify-between items-center">
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider md:hidden">Created</span>
                                            <div className="flex items-center gap-1.5 text-xs">
                                                <FiCalendar className="text-slate-400" />
                                                {formatDate(blog.createdAt)}
                                            </div>
                                        </td>

                                        <td className="p-0 pt-2 md:pt-0 md:py-4 md:px-6 whitespace-nowrap md:table-cell border-t border-dashed border-slate-100 md:border-t-0">
                                            <div className="flex items-center justify-between sm:justify-start md:justify-center gap-4 text-xs font-semibold text-slate-500 py-2 md:py-0">
                                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider md:hidden">Metrics</span>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1" title="Total Views">
                                                        <FiEye className="text-slate-400" size={14} />
                                                        <span>{blog.views ?? 0}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1" title="Total Likes">
                                                        <FiHeart className="text-rose-400 fill-rose-50/10" size={14} />
                                                        <span>{blog.totalLikes ?? 0}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1" title="Total Comments">
                                                        <FiMessageSquare className="text-indigo-400" size={14} />
                                                        <span>{blog.totalComments ?? 0}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1" title="Total Bookmarks">
                                                        <FiBookmark className="text-purple-400" size={14} />
                                                        <span>{blog.totalBookmarks ?? 0}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr className="block md:table-row">
                                    <td colSpan="4" className="py-12 px-4 text-center text-slate-400 font-medium bg-slate-50/20 block md:table-cell">
                                        No articles found. Start publishing to see metrics!
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default RecentBlogs;