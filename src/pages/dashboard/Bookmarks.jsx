import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookmarkBlogs } from "../../features/dashboard/userDashboardSlice";
import { FiEye, FiHeart, FiMessageSquare, FiBookmark, FiTag } from "react-icons/fi";

const Bookmarks = () => {
    const dispatch = useDispatch();
    const { bookmarkBlogs, bookmarkLoading, error } = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(getBookmarkBlogs());
    }, [dispatch]);

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
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
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">Saved Bookmarks</h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
                    Manage and review all your curated platform articles in one place.
                </p>
            </div>

            <div className="w-full bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse block md:table">
                        <thead className="hidden md:table-header-group">
                            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                <th className="py-4 px-6">Article Description</th>
                                <th className="py-4 px-4">Category</th>
                                <th className="py-4 px-4">Author</th>
                                <th className="py-4 px-6 text-center">Engagement</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 text-sm block md:table-row-group">
                            {bookmarkLoading ? (
                                Array.from({ length: 3 }).map((_, idx) => (
                                    <tr key={idx} className="animate-pulse flex flex-col md:table-row p-4 border-b md:border-b-0 gap-3 md:gap-0">
                                        <td className="py-2 md:py-4 px-2 md:px-6 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-100 rounded-lg shrink-0"></div>
                                            <div className="space-y-2 flex-1">
                                                <div className="h-4 bg-slate-100 rounded w-2/3"></div>
                                                <div className="h-3 bg-slate-50 rounded w-1/3"></div>
                                            </div>
                                        </td>
                                        <td className="py-1 md:py-4 px-2 md:px-4"><div className="h-6 bg-slate-100 rounded-lg w-16"></div></td>
                                        <td className="py-1 md:py-4 px-2 md:px-4"><div className="h-4 bg-slate-100 rounded w-20"></div></td>
                                        <td className="py-2 md:py-4 px-2 md:px-6"><div className="h-5 bg-slate-100 rounded w-full md:w-24 mx-auto"></div></td>
                                    </tr>
                                ))
                            ) : bookmarkBlogs && bookmarkBlogs.length > 0 ? (
                                bookmarkBlogs.map((blog) => (
                                    <tr
                                        key={blog._id}
                                        className="hover:bg-slate-50/40 transition-colors group flex flex-col md:table-row p-4 sm:p-5 md:p-0 border-b md:border-b-0 space-y-3.5 md:space-y-0"
                                    >
                                        {/* Column 1: Details */}
                                        <td className="p-0 md:py-4 md:px-6 w-full md:max-w-xs lg:max-w-md md:table-cell">
                                            <div className="flex items-center gap-3.5">
                                                <img
                                                    src={blog.featuredImage?.url}
                                                    alt={blog.title}
                                                    className="w-10 h-10 object-cover rounded-lg bg-slate-100 border border-slate-100/40 shrink-0 shadow-sm"
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <h4 className="font-bold text-slate-700 truncate group-hover:text-violet-600 transition-colors text-sm sm:text-base md:text-sm">
                                                        {blog.title}
                                                    </h4>
                                                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                                                        Saved on {formatDate(blog.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Column 2: Category */}
                                        <td className="p-0 md:py-4 md:px-4 whitespace-nowrap md:table-cell flex justify-between items-center">
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider md:hidden">Category</span>
                                            {blog.category?.name ? (
                                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200/30">
                                                    <FiTag className="text-slate-400" size={11} />
                                                    {blog.category.name}
                                                </span>
                                            ) : (
                                                <span className="text-xs font-medium text-slate-400 italic">None</span>
                                            )}
                                        </td>

                                        {/* Column 3: Author */}
                                        <td className="p-0 md:py-4 md:px-4 text-slate-500 font-semibold whitespace-nowrap capitalize md:table-cell flex justify-between items-center">
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider md:hidden">Author</span>
                                            <span className="text-slate-600 font-medium md:font-semibold">{blog.author?.name || "Anonymous"}</span>
                                        </td>

                                        {/* Column 4: Engagement Metrics */}
                                        <td className="p-0 pt-2 md:pt-0 md:py-4 md:px-6 whitespace-nowrap md:table-cell border-t border-dashed border-slate-100 md:border-t-0">
                                            <div className="flex items-center justify-between sm:justify-start md:justify-center gap-4 text-xs font-semibold text-slate-500 py-2 md:py-0">
                                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider md:hidden">Engagement</span>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1" title="Views">
                                                        <FiEye size={13} className="text-slate-400" />
                                                        <span>{blog.views ?? 0}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1" title="Likes">
                                                        <FiHeart size={13} className="text-rose-400 fill-rose-50/10" />
                                                        <span>{blog.totalLikes ?? 0}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1" title="Comments">
                                                        <FiMessageSquare size={13} className="text-indigo-400" />
                                                        <span>{blog.totalComments ?? 0}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="block md:table-row">
                                    <td colSpan="4" className="py-14 text-center text-slate-400 font-medium bg-slate-50/10 block md:table-cell">
                                        <div className="flex flex-col items-center justify-center space-y-2 mx-auto">
                                            <FiBookmark size={18} className="text-slate-300" />
                                            <p className="text-sm font-semibold text-slate-500">Your collection is empty</p>
                                            <p className="text-xs text-slate-400">Articles you save will display in this dashboard system tab.</p>
                                        </div>
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

export default Bookmarks;