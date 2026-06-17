import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlog, deleteBlog, changeBlogStatus } from "../../features/dashboard/adminDashboardSlice";
import { FiTrash2, FiFileText, FiCalendar } from "react-icons/fi";
import toast from "react-hot-toast";
import ConfirmationModal from "../../components/common/ConfirmationModal";
const Blogs = () => {
    const dispatch = useDispatch();
    const { blogs, blogsLoading, error } = useSelector((state) => state.adminDashBoard);

    // Modal Configuration State
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: null, // "delete" or "status"
        blogId: null,
        currentStatus: null,
        title: "",
        confirmText: "",
        variant: "danger"
    });

    useEffect(() => {
        dispatch(fetchBlog());
    }, [dispatch]);

    // Trigger Modal for Deletion
    const openDeleteModal = (blogId) => {
        setModalConfig({
            isOpen: true,
            type: "delete",
            blogId,
            currentStatus: null,
            title: "Are you sure you want to delete this blog post permanently?",
            confirmText: "Yes, delete it",
            variant: "danger"
        });
    };

    // Trigger Modal for Status Toggle
    const openStatusModal = (blogId, currentStatus) => {
        const nextStatus = currentStatus === "published" ? "draft" : "published";
        setModalConfig({
            isOpen: true,
            type: "status",
            blogId,
            currentStatus,
            title: `Are you sure you want to change this article status to "${nextStatus}"?`,
            confirmText: `Yes, make it ${nextStatus}`,
            variant: "warning" // Uses amber warning styling
        });
    };

    // Consolidated Confirm Action Handler
    const handleModalConfirm = async () => {
        const { type, blogId, currentStatus } = modalConfig;
        if (!blogId) return;

        if (type === "delete") {
            try {
                await dispatch(deleteBlog(blogId)).unwrap();
                toast.success("Blog post deleted successfully");
            } catch (err) {
                toast.error(`Failed to delete blog post: ${err?.message || "Something went wrong"}`);
            }
        } else if (type === "status") {
            const newStatus = currentStatus === "published" ? "draft" : "published";
            try {
                await dispatch(changeBlogStatus({ blogId, status: { status: newStatus } })).unwrap();
                toast.success(`Status updated to ${newStatus}`);
            } catch (err) {
                toast.error(`Failed to update status: ${err?.message || "Something went wrong"}`);
            }
        }

        closeModal();
    };

    const closeModal = () => {
        setModalConfig((prev) => ({ ...prev, isOpen: false }));
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
            <div className="bg-violet-50 border border-violet-100 p-4 rounded-xl text-sm font-medium text-violet-600 text-center mx-4 my-6">
                Failed to load system blogs: {error}
            </div>
        );
    }

    return (
        <div className="space-y-6 text-left font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
            <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">Blog Articles</h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">Manage, track statuses, and audit all written contributions.</p>
            </div>

            <div className="w-full bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse block md:table">
                        <thead className="hidden md:table-header-group">
                            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                <th className="py-4 px-6">Article Details</th>
                                <th className="py-4 px-4">Author</th>
                                <th className="py-4 px-4">Category</th>
                                <th className="py-4 px-4 text-center">Status</th>
                                <th className="py-4 px-6 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 text-sm block md:table-row-group">
                            {blogsLoading ? (
                                Array.from({ length: 3 }).map((_, idx) => (
                                    <tr key={idx} className="animate-pulse flex flex-col md:table-row p-4 border-b md:border-b-0 gap-3 md:gap-0">
                                        <td className="py-2 md:py-4 px-2 md:px-6 flex items-center gap-3">
                                            <div className="w-14 h-10 bg-slate-100 rounded-lg shrink-0"></div>
                                            <div className="space-y-2 flex-1">
                                                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                                                <div className="h-3 bg-slate-50 rounded w-1/4"></div>
                                            </div>
                                        </td>
                                        <td className="py-1 md:py-4 px-2 md:px-4"><div className="h-4 bg-slate-100 rounded w-16"></div></td>
                                        <td className="py-1 md:py-4 px-2 md:px-4"><div className="h-4 bg-slate-100 rounded w-14"></div></td>
                                        <td className="py-1 md:py-4 px-2 md:px-4"><div className="h-6 bg-slate-100 rounded-full w-16 mx-auto"></div></td>
                                        <td className="py-2 md:py-4 px-2 md:px-6"><div className="h-4 bg-slate-100 rounded w-6 ml-auto"></div></td>
                                    </tr>
                                ))
                            ) : blogs && blogs.length > 0 ? (
                                blogs.map((blog) => (
                                    <tr
                                        key={blog._id}
                                        className="hover:bg-slate-50/40 transition-colors flex flex-col md:table-row p-4 sm:p-5 md:p-0 border-b md:border-b-0 space-y-3.5 md:space-y-0 text-xs text-slate-600 font-medium"
                                    >
                                        {/* Article Details */}
                                        <td className="p-0 md:py-4 md:px-6 w-full md:max-w-xs lg:max-w-md md:table-cell">
                                            <div className="flex items-center gap-3.5">
                                                <img
                                                    src={blog.featuredImage?.url || blog.image?.url || ""}
                                                    alt=""
                                                    className="w-14 h-10 object-cover rounded-lg bg-slate-100 border border-slate-100 shrink-0 shadow-sm"
                                                    onError={(e) => {
                                                        e.target.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=100&auto=format&fit=crop&q=60";
                                                    }}
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <h4 className="font-bold text-slate-700 truncate capitalize text-sm sm:text-base md:text-sm" title={blog.title}>
                                                        {blog.title}
                                                    </h4>
                                                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-normal mt-0.5">
                                                        <FiCalendar size={11} className="text-slate-300" />
                                                        <span>{formatDate(blog.createdAt)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Author */}
                                        <td className="p-0 md:py-4 md:px-4 whitespace-nowrap md:table-cell flex justify-between items-center text-xs md:text-sm">
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider md:hidden">Author</span>
                                            <span className="text-slate-500 font-normal capitalize">
                                                {blog.author?.name || blog.user?.name || "System"}
                                            </span>
                                        </td>

                                        {/* Category */}
                                        <td className="p-0 md:py-4 md:px-4 whitespace-nowrap md:table-cell flex justify-between items-center text-xs md:text-sm">
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider md:hidden">Category</span>
                                            <span className="bg-violet-50 text-violet-600 text-[10px] px-2 py-0.5 rounded-md border border-violet-100 capitalize font-semibold">
                                                {blog?.category?.name || "General"}
                                            </span>
                                        </td>

                                        {/* Status Toggle Interaction */}
                                        <td className="p-0 md:py-4 md:px-4 md:text-center whitespace-nowrap md:table-cell flex justify-between items-center">
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider md:hidden">Status</span>
                                            <button
                                                onClick={() => openStatusModal(blog._id, blog.status)}
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

                                        {/* Actions */}
                                        <td className="p-0 pt-2 md:pt-0 md:py-4 md:px-6 whitespace-nowrap md:table-cell border-t border-dashed border-slate-100 md:border-t-0 text-right">
                                            <div className="flex items-center justify-between md:justify-end gap-4 py-1 md:py-0">
                                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider md:hidden">Actions</span>
                                                <button
                                                    onClick={() => openDeleteModal(blog._id)}
                                                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-200"
                                                    title="Delete Article"
                                                >
                                                    <FiTrash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="block md:table-row">
                                    <td colSpan="5" className="py-14 text-center text-slate-400 font-medium bg-slate-50/10 block md:table-cell">
                                        <div className="flex flex-col items-center justify-center space-y-2 mx-auto">
                                            <FiFileText size={18} className="text-slate-300" />
                                            <p className="text-sm font-semibold text-slate-500">No blog posts found</p>
                                            <p className="text-xs text-slate-400">Platform contribution updates aren't available at the moment.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Shared Multi-purpose Flowbite Modal */}
            <ConfirmationModal
                isOpen={modalConfig.isOpen}
                onClose={closeModal}
                onConfirm={handleModalConfirm}
                title={modalConfig.title}
                confirmText={modalConfig.confirmText}
                cancelText="No, cancel"
                variant={modalConfig.variant}
            />
        </div>
    );
};

export default Blogs;