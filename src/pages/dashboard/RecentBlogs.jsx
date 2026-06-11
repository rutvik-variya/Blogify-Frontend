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

    // date  formate
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
            <div className="bg-violet-50 border border-violet-100 p-4 rounded-xl text-sm font-medium text-violet-600 text-center">
                Failed to load dashboard metrics: {error}
            </div>
        );
    }
    return (
        <div className="space-y-6 text-left font-sans">
            <div>
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Recent Blogs</h2>
                <p className="text-sm text-slate-400 mt-1">
                    Review, analyze, and manage your most recently updated or created blog articles.
                </p>
            </div>

            <div className="w-full bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">

                        <thead>
                            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                <th className="py-4 px-6">Blog Details</th>
                                <th className="py-4 px-4">Status</th>
                                <th className="py-4 px-4">Created At</th>
                                <th className="py-4 px-6 text-center">Engagement metrics</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 text-sm">
                            {recentLoading ? (
                                Array.from({ length: 3 }).map((_, idx) => (
                                    <tr key={idx} className="animate-pulse">
                                        <td className="py-4 px-6 flex items-center gap-3">
                                            <div className="w-12 h-12 bg-slate-100 rounded-lg shrink-0"></div>
                                            <div className="space-y-2 flex-1">
                                                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                                                <div className="h-3 bg-slate-50 rounded w-1/2"></div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4"><div className="h-6 bg-slate-100 rounded-full w-16"></div></td>
                                        <td className="py-4 px-4"><div className="h-4 bg-slate-100 rounded w-20"></div></td>
                                        <td className="py-4 px-6"><div className="h-5 bg-slate-100 rounded w-28 mx-auto"></div></td>
                                    </tr>
                                ))
                            ) : recentBlogs && recentBlogs.length > 0 ? (
                                recentBlogs.map((blog) => (
                                    <tr key={blog._id} className="hover:bg-slate-50/40 transition-colors group">

                                        <td className="py-4 px-6 max-w-xs md:max-w-md">
                                            <div className="flex items-center gap-3.5">
                                                <img
                                                    src={blog.featuredImage?.url}
                                                    alt={blog.title}
                                                    className="w-12 h-12 object-cover rounded-lg bg-slate-100 border border-slate-100 shrink-0 shadow-sm"
                                                />
                                                <div className="min-w-0">
                                                    <h4 className="font-bold text-slate-700 truncate group-hover:text-violet-600 transition-colors">
                                                        {blog.title}
                                                    </h4>
                                                    <p className="text-xs text-slate-400 truncate mt-0.5">
                                                        /{blog.slug}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide capitalize ${blog.status === "published"
                                                ? "bg-emerald-50 text-emerald-600"
                                                : "bg-amber-50 text-amber-600"
                                                }`}>
                                                {blog.status}
                                            </span>
                                        </td>

                                        <td className="py-4 px-4 text-slate-500 font-medium whitespace-nowrap">
                                            <div className="flex items-center gap-1.5 text-xs">
                                                <FiCalendar className="text-slate-350" />
                                                {formatDate(blog.createdAt)}
                                            </div>
                                        </td>

                                        <td className="py-4 px-6 whitespace-nowrap">
                                            <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-500">
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
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-12 text-center text-slate-400 font-medium bg-slate-50/20">
                                        No articles found. Start publishing to see metrics metrics!
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