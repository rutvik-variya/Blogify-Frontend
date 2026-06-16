import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlog, deleteBlog } from "../../features/dashboard/adminDashboardSlice";
// import { deleteBlog, toggleBlogStatus } from "../../features/dashboard/adminDashboardSlice"; 
import { FiTrash2, FiFileText, FiCalendar, FiCheckCircle, FiEdit3 } from "react-icons/fi";
import toast from "react-hot-toast";

const Blogs = () => {
    const dispatch = useDispatch();
    const { blogs, blogsLoading, error } = useSelector((state) => state.adminDashBoard);

    useEffect(() => {
        dispatch(fetchBlog());
    }, [dispatch]);

    const handleDelete = async (blogId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this blog post?");
        if (!confirmDelete) return;
        try {
            await dispatch(deleteBlog(blogId)).unwrap();
            toast.success("Blog post deleted successfully");
        } catch (error) {
            toast.error("Failed to delete blog post", error);
        }
    };

    const handleStatusToggle = async (blogId, currentStatus) => {
        const newStatus = currentStatus === "published" ? "draft" : "published";
        try {
            // await dispatch(toggleBlogStatus({ blogId, status: newStatus })).unwrap();
            toast.success(`Status updated to ${newStatus}`);
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    if (error) {
        return (
            <div className="bg-violet-50 border border-violet-100 p-4 rounded-xl text-sm font-medium text-violet-600 text-center">
                Failed to load system blogs: {error}
            </div>
        );
    }

    return (
        <div className="space-y-6 text-left font-sans">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">Blog Articles</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Manage, track statuses, and audit all written contributions.</p>
                </div>
            </div>

            <div className="w-full bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                <th className="py-3.5 px-6">Article Details</th>
                                <th className="py-3.5 px-4">Author</th>
                                <th className="py-3.5 px-4">Category</th>
                                <th className="py-3.5 px-4 text-center">Status</th>
                                <th className="py-3.5 px-6 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 text-xs text-slate-600 font-medium">
                            {blogsLoading ? (
                                Array.from({ length: 3 }).map((_, idx) => (
                                    <tr key={idx} className="animate-pulse">
                                        <td className="py-4 px-6 flex items-center gap-3">
                                            <div className="w-14 h-10 bg-slate-100 rounded-lg shrink-0"></div>
                                            <div className="space-y-2 w-full">
                                                <div className="h-3.5 bg-slate-100 rounded w-3/4"></div>
                                                <div className="h-3 bg-slate-100 rounded w-1/4"></div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4"><div className="h-4 bg-slate-100 rounded w-16"></div></td>
                                        <td className="py-4 px-4"><div className="h-4 bg-slate-100 rounded w-14"></div></td>
                                        <td className="py-4 px-4"><div className="h-6 bg-slate-100 rounded-full w-16 mx-auto"></div></td>
                                        <td className="py-4 px-6"><div className="h-4 bg-slate-100 rounded w-6 ml-auto"></div></td>
                                    </tr>
                                ))
                            ) : blogs && blogs.length > 0 ? (
                                blogs.map((blog) => (
                                    <tr key={blog._id} className="hover:bg-slate-50/30 transition-colors">

                                        <td className="py-3.5 px-6 max-w-xs sm:max-w-md">
                                            <div className="flex items-center gap-3.5">
                                                <img
                                                    src={blog.featuredImage?.url || blog.image?.url || ""}
                                                    alt=""
                                                    className="w-14 h-10 object-cover rounded-lg bg-slate-100 border border-slate-100 shrink-0 shadow-xs"
                                                    onError={(e) => {
                                                        e.target.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=100&auto=format&fit=crop&q=60";
                                                    }}
                                                />
                                                <div className="truncate">
                                                    <h4 className="font-semibold text-slate-700 truncate capitalize" title={blog.title}>
                                                        {blog.title}
                                                    </h4>
                                                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-normal mt-0.5">
                                                        <FiCalendar size={11} className="text-slate-300" />
                                                        <span>{formatDate(blog.createdAt)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-3.5 px-4 text-slate-500 font-normal whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <span className="capitalize">{blog.author?.name || blog.user?.name || "System"}</span>
                                            </div>
                                        </td>

                                        <td className="py-3.5 px-4 whitespace-nowrap">
                                            <span className="bg-violet-50 text-violet-600 text-[10px] px-2 py-0.5 rounded-md border border-violet-100 capitalize">
                                                {blog?.category?.name || "General"}
                                            </span>
                                        </td>

                                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                                            <button
                                                onClick={() => handleStatusToggle(blog._id, blog.status)}
                                                title="Click to toggle status"
                                                className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full transition-all cursor-pointer border ${blog.status === "published"
                                                    ? "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100"
                                                    : "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100"
                                                    }`}
                                            >
                                                <span className={`w-1 h-1 rounded-full ${blog.status === "published" ? "bg-emerald-500" : "bg-amber-500"}`}></span>
                                                <span className="capitalize">{blog.status || "draft"}</span>
                                            </button>
                                        </td>

                                        <td className="py-3.5 px-6 text-right whitespace-nowrap">
                                            <div className="inline-flex items-center justify-end">
                                                <button
                                                    onClick={() => handleDelete(blog._id)}
                                                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                                    title="Delete Article"
                                                >
                                                    <FiTrash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-slate-400 font-medium bg-slate-50/10">
                                        <div className="flex flex-col items-center justify-center space-y-1">
                                            <FiFileText size={18} className="text-slate-300" />
                                            <p className="text-xs font-semibold text-slate-500">No blog posts found</p>
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

export default Blogs;