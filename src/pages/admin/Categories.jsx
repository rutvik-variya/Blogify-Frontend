import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategory } from "../../features/dashboard/adminDashboardSlice";
import { deleteCategory } from "../../features/dashboard/adminDashboardSlice";
import { FiEdit2, FiTrash2, FiFolder, FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";

const Categories = () => {
    const dispatch = useDispatch();
    const { categories, categoryLoading, error } = useSelector((state) => state.adminDashBoard);

    useEffect(() => {
        dispatch(fetchCategory());
    }, [dispatch]);

    const handleDelete = async (categoryId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (!confirmDelete) return;
        try {
            await dispatch(deleteCategory(categoryId)).unwrap();
            toast.success("Category deleted successfully");
        } catch (error) {
            toast.error("Failed to delete category", error);
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
                Failed to load categories: {error}
            </div>
        );
    }

    return (
        <div className="space-y-6 text-left font-sans">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">Categories</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Organize and manage your system blog categories.</p>
                </div>
                <Link
                    to="/dashboard/addcategory"
                    className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
                >
                    <FiPlus size={14} />
                    <span>Add Category</span>
                </Link>
            </div>

            <div className="w-full bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                <th className="py-3.5 px-6">Category Details</th>
                                <th className="py-3.5 px-4">Slug Identifier</th>
                                <th className="py-3.5 px-4 text-center">Created At</th>
                                <th className="py-3.5 px-6 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 text-xs text-slate-600 font-medium">
                            {categoryLoading ? (
                                Array.from({ length: 3 }).map((_, idx) => (
                                    <tr key={idx} className="animate-pulse">
                                        <td className="py-4 px-6 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-100 rounded-lg shrink-0"></div>
                                            <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                                        </td>
                                        <td className="py-4 px-4"><div className="h-4 bg-slate-100 rounded w-24"></div></td>
                                        <td className="py-4 px-4"><div className="h-4 bg-slate-100 rounded w-20 mx-auto"></div></td>
                                        <td className="py-4 px-6"><div className="h-4 bg-slate-100 rounded w-12 ml-auto"></div></td>
                                    </tr>
                                ))
                            ) : categories && categories.length > 0 ? (
                                categories.map((category) => (
                                    <tr key={category._id || category.id} className="hover:bg-slate-50/30 transition-colors">
                                        <td className="py-3.5 px-6 max-w-xs md:max-w-md">
                                            <div className="flex items-center gap-3">
                                                {category.image?.url ? (
                                                    <img
                                                        src={category.image.url}
                                                        alt=""
                                                        className="w-10 h-10 object-cover rounded-lg bg-slate-100 border border-slate-100 shrink-0"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 bg-violet-50 text-violet-600 rounded-lg border border-violet-100 shrink-0 flex items-center justify-center">
                                                        <FiFolder size={16} />
                                                    </div>
                                                )}
                                                <h4 className="font-semibold text-slate-700 truncate capitalize">
                                                    {category.name}
                                                </h4>
                                            </div>
                                        </td>

                                        <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                                            {category.slug || "n-a"}
                                        </td>

                                        <td className="py-3.5 px-4 text-center text-slate-500 whitespace-nowrap font-normal">
                                            {formatDate(category.createdAt)}
                                        </td>

                                        <td className="py-3.5 px-6 text-right whitespace-nowrap">
                                            <div className="inline-flex items-center gap-1.5">
                                                <Link
                                                    to={`/dashboard/editCategory/${category._id || category.id}`}
                                                    className="p-1.5 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
                                                    title="Edit Category"
                                                >
                                                    <FiEdit2 size={13} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(category._id || category.id)}
                                                    className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                                    title="Delete Category"
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
                                            <FiFolder size={18} className="text-slate-300" />
                                            <p className="text-xs font-semibold text-slate-500">No categories found</p>
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

export default Categories;