import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyBlogs, deleteBlog } from "../../features/dashboard/userDashboardSlice";
import { Link } from "react-router-dom";
import { FiEye, FiHeart, FiMessageSquare, FiEdit2, FiTrash2, FiFileText } from "react-icons/fi";
import toast from "react-hot-toast";

const MyBlogs = () => {
    const dispatch = useDispatch();
    const { myBlogs, myBlogsLoading, error } = useSelector((state) => state.dashboard);
    const [activeTab, setActiveTab] = useState("all");

    useEffect(() => {
        dispatch(getMyBlogs());
    }, [dispatch]);

    const handleDelete = async (blogId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this blog?"
        );

        if (!confirmDelete) return;

        try {
            await dispatch(deleteBlog(blogId));
            toast.success("Blog deleted successfully");
        } catch (error) {
            toast.error("Failed to delete blog", error);
        }
    };

    const handleEdit = (blogId) => {
        console.log("Edit ID:", blogId);
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
        <div className="space-y-6 text-left font-sans">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">My Blogs</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Manage and track your articles.</p>
                </div>
                <Link
                    to="/createBlog"
                    className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all"
                >
                    Create Post
                </Link>
            </div>


            <div className="flex border-b border-slate-200 gap-4">
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
                            className={`pb-2.5 px-1 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${isActive ? "border-violet-600 text-violet-600" : "border-transparent text-slate-400 hover:text-slate-600"
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


            <div className="w-full bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                <th className="py-3.5 px-6">Article</th>
                                <th className="py-3.5 px-4">Status</th>
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
                                        <td className="py-4 px-4"><div className="h-4 bg-slate-100 rounded w-12"></div></td>
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
                                                <h4 className="font-semibold text-slate-700 truncate">{blog.title}</h4>
                                            </div>
                                        </td>


                                        <td className="py-3.5 px-4 capitalize whitespace-nowrap">
                                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${blog.status === "published"
                                                ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                                                : "bg-amber-50 border-amber-100 text-amber-600"
                                                }`}>
                                                {blog.status || "draft"}
                                            </span>
                                        </td>


                                        <td className="py-3.5 px-4 whitespace-nowrap">
                                            <div className="flex items-center justify-center gap-3 text-slate-400">
                                                <div className="flex items-center gap-1"><FiEye size={12} /><span>{blog.views ?? 0}</span></div>
                                                <div className="flex items-center gap-1"><FiHeart size={12} /><span>{blog.totalLikes ?? 0}</span></div>
                                                <div className="flex items-center gap-1"><FiMessageSquare size={12} /><span>{blog.totalComments ?? 0}</span></div>
                                            </div>
                                        </td>


                                        <td className="py-3.5 px-6 text-right whitespace-nowrap">
                                            <div className="inline-flex items-center gap-1">
                                                <button onClick={() => handleEdit(blog._id)} className="p-1 text-slate-400 hover:text-violet-600 rounded transition-colors" title="Edit"><FiEdit2 size={13} /></button>
                                                <button onClick={() => handleDelete(blog._id)} className="p-1 text-slate-400 hover:text-rose-500 rounded transition-colors" title="Delete"><FiTrash2 size={13} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-slate-400 font-medium bg-slate-50/10">
                                        <div className="flex flex-col items-center justify-center space-y-1">
                                            <FiFileText size={16} className="text-slate-300" />
                                            <p className="text-xs font-semibold text-slate-500">No items found</p>
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

export default MyBlogs;