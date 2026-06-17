import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategory, deleteCategory } from "../../features/dashboard/adminDashboardSlice";
import { FiEdit2, FiTrash2, FiFolder, FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";
import ConfirmationModal from "../../components/common/ConfirmationModal";


const Categories = () => {
    const dispatch = useDispatch();
    const { categories, categoryLoading, error } = useSelector((state) => state.adminDashBoard);

    // Modal UI Interfacing States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [targetCategoryId, setTargetCategoryId] = useState(null);

    useEffect(() => {
        dispatch(fetchCategory());
    }, [dispatch]);

    // Triggers custom layout state variables instead of browser blocking alerts
    const openDeleteModal = (categoryId) => {
        setTargetCategoryId(categoryId);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!targetCategoryId) return;

        try {
            await dispatch(deleteCategory(targetCategoryId)).unwrap();
            toast.success("Category deleted successfully");
        } catch (error) {
            toast.error("Failed to delete category", error);
        } finally {
            setTargetCategoryId(null); // Structural state cleanup
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
            <div className="bg-violet-50 border border-violet-100 p-4 rounded-xl text-sm font-medium text-violet-600 text-center mx-4 my-6">
                Failed to load categories: {error}
            </div>
        );
    }

    return (
        <div className="space-y-6 text-left font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">Categories</h2>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">Organize and manage your system blog categories.</p>
                </div>
                <Link
                    to="/dashboard/addcategory"
                    className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm shrink-0 self-start sm:self-auto"
                >
                    <FiPlus size={14} />
                    <span>Add Category</span>
                </Link>
            </div>

            <div className="w-full bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse block md:table">
                        <thead className="hidden md:table-header-group">
                            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                <th className="py-4 px-6">Category Details</th>
                                <th className="py-4 px-4">Slug Identifier</th>
                                <th className="py-4 px-4 text-center">Created At</th>
                                <th className="py-4 px-6 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 text-sm block md:table-row-group">
                            {categoryLoading ? (
                                Array.from({ length: 3 }).map((_, idx) => (
                                    <tr key={idx} className="animate-pulse flex flex-col md:table-row p-4 border-b md:border-b-0 gap-3 md:gap-0">
                                        <td className="py-2 md:py-4 px-2 md:px-6 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-100 rounded-lg shrink-0"></div>
                                            <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                                        </td>
                                        <td className="py-1 md:py-4 px-2 md:px-4"><div className="h-4 bg-slate-100 rounded w-24"></div></td>
                                        <td className="py-1 md:py-4 px-2 md:px-4"><div className="h-4 bg-slate-100 rounded w-20 mx-auto"></div></td>
                                        <td className="py-2 md:py-4 px-2 md:px-6"><div className="h-4 bg-slate-100 rounded w-12 ml-auto"></div></td>
                                    </tr>
                                ))
                            ) : categories && categories.length > 0 ? (
                                categories.map((category) => (
                                    <tr
                                        key={category._id || category.id}
                                        className="hover:bg-slate-50/40 transition-colors flex flex-col md:table-row p-4 sm:p-5 md:p-0 border-b md:border-b-0 space-y-3 md:space-y-0 text-xs text-slate-600 font-medium"
                                    >
                                        {/* Category Details */}
                                        <td className="p-0 md:py-4 md:px-6 w-full md:max-w-xs lg:max-w-md md:table-cell">
                                            <div className="flex items-center gap-3">
                                                {category.image?.url ? (
                                                    <img
                                                        src={category.image.url}
                                                        alt=""
                                                        className="w-10 h-10 object-cover rounded-lg bg-slate-100 border border-slate-100 shadow-sm shrink-0"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 bg-violet-50 text-violet-600 rounded-lg border border-violet-100 shrink-0 flex items-center justify-center shadow-sm">
                                                        <FiFolder size={16} />
                                                    </div>
                                                )}
                                                <h4 className="font-bold text-slate-700 truncate capitalize text-sm sm:text-base md:text-sm">
                                                    {category.name}
                                                </h4>
                                            </div>
                                        </td>

                                        {/* Slug Identifier */}
                                        <td className="p-0 md:py-4 md:px-4 whitespace-nowrap md:table-cell flex justify-between items-center font-mono text-[11px]">
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider md:hidden font-sans">Slug Identifier</span>
                                            <span className="text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/40 md:bg-transparent md:border-none md:p-0">
                                                {category.slug || "n-a"}
                                            </span>
                                        </td>

                                        {/* Created At */}
                                        <td className="p-0 md:py-4 md:px-4 md:text-center whitespace-nowrap md:table-cell flex justify-between items-center text-xs md:text-sm">
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider md:hidden">Created At</span>
                                            <span className="text-slate-500 font-normal">{formatDate(category.createdAt)}</span>
                                        </td>

                                        {/* Actions */}
                                        <td className="p-0 pt-2 md:pt-0 md:py-4 md:px-6 whitespace-nowrap md:table-cell border-t border-dashed border-slate-100 md:border-t-0 text-right">
                                            <div className="flex items-center justify-between md:justify-end gap-2 py-1 md:py-0">
                                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider md:hidden">Actions</span>
                                                <div className="inline-flex items-center gap-1.5">
                                                    <Link
                                                        to={`/dashboard/editCategory/${category._id || category.id}`}
                                                        className="p-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-all duration-200"
                                                        title="Edit Category"
                                                    >
                                                        <FiEdit2 size={13} />
                                                    </Link>
                                                    <button
                                                        onClick={() => openDeleteModal(category._id || category.id)}
                                                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-200"
                                                        title="Delete Category"
                                                    >
                                                        <FiTrash2 size={13} />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="block md:table-row">
                                    <td colSpan="4" className="py-14 text-center text-slate-400 font-medium bg-slate-50/10 block md:table-cell">
                                        <div className="flex flex-col items-center justify-center space-y-2 mx-auto">
                                            <FiFolder size={18} className="text-slate-300" />
                                            <p className="text-sm font-semibold text-slate-500">No categories found</p>
                                            <p className="text-xs text-slate-400">System records do not display categories currently.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Custom Flowbite Centered Style Modal Integration */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Are you sure you want to delete this category permanently?"
                confirmText="Yes, I'm sure"
                cancelText="No, cancel"
                variant="danger"
            />
        </div>
    );
};

export default Categories;