import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyBlogs, deleteBlog, updateBlogStatus } from "../../features/dashboard/userDashboardSlice";
import { Link } from "react-router-dom";
import { FiEye, FiHeart, FiMessageSquare, FiEdit2, FiTrash2, FiFileText, FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";
import ConfirmationModal from "../../components/common/ConfirmationModal";

const MyBlogs = () => {
    const dispatch = useDispatch();
    const { myBlogs, myBlogsLoading, error } = useSelector((state) => state.dashboard);
    const [activeTab, setActiveTab] = useState("all");

    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: null,
        blogId: null,
        statusToUpdate: "",
        title: "",
        confirmText: "",
        variant: "danger"
    });

    useEffect(() => {
        dispatch(getMyBlogs());
    }, [dispatch]);

    const openDeleteModal = (blogId) => {
        setModalConfig({
            isOpen: true,
            type: "delete",
            blogId,
            statusToUpdate: "",
            title: "Are you sure you want to delete this blog post permanently?",
            confirmText: "Yes, delete it",
            variant: "danger"
        });
    };

    const openStatusModal = (blogId, currentStatus) => {
        const nextStatus = currentStatus === "published" ? "draft" : "published";
        setModalConfig({
            isOpen: true,
            type: "status",
            blogId,
            statusToUpdate: nextStatus,
            title: `Are you sure you want to change this post's status to "${nextStatus}"?`,
            confirmText: `Yes, make it a ${nextStatus}`,
            variant: nextStatus === "published" ? "primary" : "danger"
        });
    };

    const handleModalConfirm = async () => {
        const { type, blogId, statusToUpdate } = modalConfig;
        if (!blogId) return;

        try {
            if (type === "delete") {
                await dispatch(deleteBlog(blogId)).unwrap();
                toast.success("Blog deleted successfully");
            } else if (type === "status") {
                await dispatch(updateBlogStatus({ blogId, status: statusToUpdate })).unwrap();
                toast.success(`Blog status updated to ${statusToUpdate}`);
            }
        } catch (err) {
            toast.error(`Action failed: ${err || "Something went wrong"}`);
        }

        closeModal();
    };

    const closeModal = () => {
        setModalConfig((prev) => ({ ...prev, isOpen: false }));
    };

    const counts = useMemo(() => {
        if (!myBlogs) return { all: 0, published: 0, draft: 0 };
        return {
            all: myBlogs.length,
            published: myBlogs.filter(b => b.status === "published").length,
            draft: myBlogs.filter(b => b.status === "draft").length
        };
    }, [myBlogs]);

    const filteredBlogs = useMemo(() => {
        if (!myBlogs) return [];
        if (activeTab === "all") return myBlogs;
        return myBlogs.filter(blog => blog.status?.toLowerCase() === activeTab);
    }, [myBlogs, activeTab]);

    if (error) {
        return (
            <div className="bg-violet-50 border border-violet-100 p-4 rounded-xl text-sm font-medium text-violet-600 text-center">
                Failed to load dashboard metrics: {error}
            </div>
        );
    }

    return (
        <div className="space-y-6 text-left font-sans w-full max-w-full overflow-hidden px-1 sm:px-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">My Blogs</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Manage and track your articles.</p>
                </div>
                <Link
                    to="/createBlog"
                    className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 self-start sm:self-auto w-full sm:w-auto shadow-xs"
                >
                    <FiPlus size={14} />
                    <span>Create Post</span>
                </Link>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x">
                {[
                    { id: "all", label: "All", count: counts.all },
                    { id: "published", label: "Published", count: counts.published },
                    { id: "draft", label: "Drafts", count: counts.draft },
                ].map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-2.5 px-1 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 shrink-0 snap-start ${isActive
                                ? "border-violet-600 text-violet-600"
                                : "border-transparent text-slate-400 hover:text-slate-600"
                                }`}
                        >
                            <span>{tab.label}</span>
                            <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${isActive ? "bg-violet-50 text-violet-600" : "bg-slate-100 text-slate-500"}`}>
                                {tab.count}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className="w-full bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-xs">
                {/* Desktop View Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                <th className="py-3.5 px-6">Article</th>
                                <th className="py-3.5 px-4">Status Change Button</th>
                                <th className="py-3.5 px-4 text-center">Analytics</th>
                                <th className="py-3.5 px-6 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 text-xs text-slate-600 font-medium">
                            {myBlogsLoading ? (
                                Array.from({ length: 3 }).map((_, idx) => (
                                    <tr key={idx} className="animate-pulse">
                                        <td className="py-4 px-6 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-100 rounded-lg shrink-0"></div>
                                            <div className="h-4 bg-slate-100 rounded w-2/3"></div>
                                        </td>
                                        <td className="py-4 px-4"><div className="h-6 bg-slate-100 rounded w-20"></div></td>
                                        <td className="py-4 px-4"><div className="h-4 bg-slate-100 rounded w-20 mx-auto"></div></td>
                                        <td className="py-4 px-6"><div className="h-4 bg-slate-100 rounded w-12 ml-auto"></div></td>
                                    </tr>
                                ))
                            ) : filteredBlogs.length > 0 ? (
                                filteredBlogs.map((blog) => (
                                    <tr key={blog._id} className="hover:bg-slate-50/30 transition-colors">
                                        <td className="py-3.5 px-6 max-w-xs md:max-w-md">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={blog.featuredImage?.url}
                                                    alt=""
                                                    className="w-10 h-10 object-cover rounded-lg bg-slate-100 border border-slate-100 shrink-0"
                                                    onError={(e) => {
                                                        e.target.src = "https://placehold.co/100x100?text=Blog";
                                                    }}
                                                />
                                                <h4 className="font-semibold text-slate-700 truncate hover:text-violet-600">
                                                    <a href={`/blog/${blog.slug}`}>{blog.title}</a>
                                                </h4>
                                            </div>
                                        </td>

                                        <td className="py-3.5 px-4 whitespace-nowrap">
                                            <button
                                                onClick={() => openStatusModal(blog._id, blog.status)}
                                                className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase transition-all shadow-2xs border cursor-pointer ${blog.status === "published"
                                                    ? "bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-700 hover:text-emerald-800"
                                                    : "bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-700 hover:text-amber-800"
                                                    }`}
                                                title={blog.status === "published" ? "Click to set back to draft" : "Click to publish this blog"}
                                            >
                                                {blog.status === "published" ? "Published" : "Draft"}
                                            </button>
                                        </td>

                                        <td className="py-3.5 px-4 whitespace-nowrap">
                                            <div className="flex items-center justify-center gap-3 text-slate-400">
                                                <div className="flex items-center gap-1" title="Views"><FiEye size={12} /><span>{blog.views ?? 0}</span></div>
                                                <div className="flex items-center gap-1" title="Likes"><FiHeart size={12} /><span>{blog.totalLikes ?? 0}</span></div>
                                                <div className="flex items-center gap-1" title="Comments"><FiMessageSquare size={12} /><span>{blog.totalComments ?? 0}</span></div>
                                            </div>
                                        </td>

                                        <td className="py-3.5 px-6 text-right whitespace-nowrap">
                                            <div className="inline-flex items-center gap-1">
                                                <Link
                                                    to={`/editBlog/${blog._id}`}
                                                    className="p-1.5 text-slate-400 hover:text-violet-600 rounded hover:bg-slate-50 transition-all"
                                                    title="Edit"
                                                >
                                                    <FiEdit2 size={13} />
                                                </Link>
                                                <button
                                                    onClick={() => openDeleteModal(blog._id)}
                                                    className="p-1.5 text-slate-400 hover:text-rose-500 rounded hover:bg-slate-50 transition-all"
                                                    title="Delete"
                                                >
                                                    <FiTrash2 size={13} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-slate-400 font-medium bg-slate-50/10">
                                        <div className="flex flex-col items-center justify-center space-y-1">
                                            <FiFileText size={18} className="text-slate-300" />
                                            <p className="text-xs font-semibold text-slate-500">No items found</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile View Responsive Blocks */}
                <div className="block md:hidden divide-y divide-slate-100">
                    {myBlogsLoading ? (
                        Array.from({ length: 3 }).map((_, idx) => (
                            <div key={idx} className="p-4 space-y-3 animate-pulse">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-slate-100 rounded-lg shrink-0"></div>
                                    <div className="space-y-1.5 w-full">
                                        <div className="h-3.5 bg-slate-100 rounded w-5/6"></div>
                                        <div className="h-3 bg-slate-100 rounded w-1/4"></div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                                    <div className="h-3.5 bg-slate-100 rounded w-24"></div>
                                    <div className="h-6 bg-slate-100 rounded w-16"></div>
                                </div>
                            </div>
                        ))
                    ) : filteredBlogs.length > 0 ? (
                        filteredBlogs.map((blog) => (
                            <div key={blog._id} className="p-4 space-y-3 hover:bg-slate-50/20 transition-colors">
                                <div className="flex items-start gap-3">
                                    <img
                                        src={blog.featuredImage?.url}
                                        alt=""
                                        className="w-12 h-12 object-cover rounded-lg bg-slate-100 border border-slate-100 shrink-0 mt-0.5"
                                        onError={(e) => {
                                            e.target.src = "https://placehold.co/100x100?text=Blog";
                                        }}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-slate-700 text-sm line-clamp-2 hover:text-violet-600 mb-2">
                                            <a href={`/blog/${blog.slug}`}>{blog.title}</a>
                                        </h4>

                                        {/* Mobile Button Toggle */}
                                        <button
                                            onClick={() => openStatusModal(blog._id, blog.status)}
                                            className={`px-2 py-0.5 rounded-md text-[9px] font-bold border uppercase tracking-wider transition-all cursor-pointer ${blog.status === "published"
                                                ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                                                : "bg-amber-50 border-amber-100 text-amber-600"
                                                }`}
                                        >
                                            {blog.status || "draft"}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-slate-100/70 text-slate-400">
                                    <div className="flex items-center gap-3 text-[11px]">
                                        <div className="flex items-center gap-1"><FiEye size={12} /><span>{blog.views ?? 0}</span></div>
                                        <div className="flex items-center gap-1"><FiHeart size={12} /><span>{blog.totalLikes ?? 0}</span></div>
                                        <div className="flex items-center gap-1"><FiMessageSquare size={12} /><span>{blog.totalComments ?? 0}</span></div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Link
                                            to={`/editBlog/${blog._id}`}
                                            className="p-2 text-slate-500 hover:text-violet-600 bg-slate-50 rounded-lg transition-all border border-slate-100"
                                            title="Edit"
                                        >
                                            <FiEdit2 size={13} />
                                        </Link>
                                        <button
                                            onClick={() => openDeleteModal(blog._id)}
                                            className="p-2 text-slate-500 hover:text-rose-500 bg-slate-50 rounded-lg transition-all border border-slate-100"
                                            title="Delete"
                                        >
                                            <FiTrash2 size={13} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-12 text-center text-slate-400 font-medium bg-slate-50/10">
                            <div className="flex flex-col items-center justify-center space-y-1">
                                <FiFileText size={20} className="text-slate-300" />
                                <p className="text-xs font-semibold text-slate-500">No items found</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Interactive Confirmation UI Portal */}
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

export default MyBlogs;