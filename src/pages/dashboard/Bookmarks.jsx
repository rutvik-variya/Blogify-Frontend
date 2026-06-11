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
            <div className="bg-violet-50 border border-violet-100 p-4 rounded-xl text-sm font-medium text-violet-600 text-center">
                Failed to load dashboard metrics: {error}
            </div>
        );
    }
    return (
        <div className="space-y-6 text-left font-sans">
            <div>
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Saved Bookmarks</h2>
                <p className="text-sm text-slate-400 mt-1">
                    Manage and review all your curated platform articles in one place.
                </p>
            </div>

            <div className="w-full bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                <th className="py-4 px-6">Article Description</th>
                                <th className="py-4 px-4">Category</th>
                                <th className="py-4 px-4">Author</th>
                                <th className="py-4 px-4 text-center">Engagement</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 text-sm">
                            {bookmarkLoading ? (
                                Array.from({ length: 3 }).map((_, idx) => (
                                    <tr key={idx} className="animate-pulse">
                                        <td className="py-4 px-6 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-100 rounded-lg shrink-0"></div>
                                            <div className="space-y-2 flex-1">
                                                <div className="h-4 bg-slate-100 rounded w-2/3"></div>
                                                <div className="h-3 bg-slate-50 rounded w-1/3"></div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4"><div className="h-5 bg-slate-100 rounded-lg w-16"></div></td>
                                        <td className="py-4 px-4"><div className="h-4 bg-slate-100 rounded w-20"></div></td>
                                        <td className="py-4 px-4"><div className="h-5 bg-slate-100 rounded w-24 mx-auto"></div></td>
                                        <td className="py-4 px-6"><div className="h-8 bg-slate-100 rounded w-8 ml-auto"></div></td>
                                    </tr>
                                ))
                            ) : bookmarkBlogs && bookmarkBlogs.length > 0 ? (
                                bookmarkBlogs.map((blog) => (
                                    <tr key={blog._id} className="hover:bg-slate-50/30 transition-colors group">
                                        <td className="py-4 px-6 max-w-xs sm:max-w-sm md:max-w-md">
                                            <div className="flex items-center gap-3.5">
                                                <img
                                                    src={blog.featuredImage?.url}
                                                    alt={blog.title}
                                                    className="w-10 h-10 object-cover rounded-lg bg-slate-100 border border-slate-100/40 shrink-0"
                                                />
                                                <div className="min-w-0">
                                                    <h4 className="font-bold text-slate-700 truncate group-hover:text-violet-600 transition-colors">
                                                        {blog.title}
                                                    </h4>
                                                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                                                        Saved on {formatDate(blog.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-4 px-4 whitespace-nowrap">
                                            {blog.category?.name ? (
                                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200/30">
                                                    <FiTag className="text-slate-400" size={11} />
                                                    {blog.category.name}
                                                </span>
                                            ) : (
                                                <span className="text-xs font-medium text-slate-400 italic">None</span>
                                            )}
                                        </td>

                                        <td className="py-4 px-4 text-slate-500 font-semibold whitespace-nowrap capitalize">
                                            {blog.author?.name || "Anonymous"}
                                        </td>

                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <div className="flex items-center justify-center gap-3.5 text-xs font-bold text-slate-400">
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
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-14 text-center text-slate-400 font-medium bg-slate-50/10">
                                        <div className="flex flex-col items-center justify-center space-y-2">
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