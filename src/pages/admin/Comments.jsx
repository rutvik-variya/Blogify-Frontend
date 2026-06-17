import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, deleteComment } from "../../features/dashboard/adminDashboardSlice";
import { FiTrash2, FiMessageSquare, FiCalendar, FiExternalLink } from "react-icons/fi";
import toast from "react-hot-toast";
import ConfirmationModal from "../../components/common/ConfirmationModal";
const Comments = () => {
    const dispatch = useDispatch();
    const { comments, commentLoding, error } = useSelector((state) => state.adminDashBoard);

    // Modal State Management
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        commentId: null,
        title: "",
        confirmText: "",
        variant: "danger"
    });

    useEffect(() => {
        dispatch(fetchComments());
    }, [dispatch]);

    // Open confirmation modal instead of window.confirm
    const openDeleteModal = (commentId) => {
        setModalConfig({
            isOpen: true,
            commentId,
            title: "Are you sure you want to delete this comment permanently?",
            confirmText: "Yes, delete it",
            variant: "danger" // Triggers the red delete/danger styling
        });
    };

    // Execute the actual dispatch logic upon confirmation
    const handleModalConfirm = async () => {
        const { commentId } = modalConfig;
        if (!commentId) return;

        try {
            await dispatch(deleteComment(commentId)).unwrap();
            toast.success("Comment deleted successfully");
        } catch (err) {
            toast.error(`Failed to delete comment: ${err?.message || "Something went wrong"}`);
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
                Failed to load comments: {error}
            </div>
        );
    }

    return (
        <div className="space-y-6 text-left font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">User Comments</h2>
                    <p className="text-xs sm:text-sm text-slate-400">Review, moderate, and delete interactions across articles.</p>
                </div>
            </div>

            <div className="w-full bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse block md:table">
                        <thead className="hidden md:table-header-group">
                            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                <th className="py-4 px-6">User</th>
                                <th className="py-4 px-4">Comment</th>
                                <th className="py-4 px-4">On Post</th>
                                <th className="py-4 px-4 text-center">Date</th>
                                <th className="py-4 px-6 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 text-sm block md:table-row-group">
                            {commentLoding ? (
                                Array.from({ length: 3 }).map((_, idx) => (
                                    <tr key={idx} className="animate-pulse flex flex-col md:table-row p-4 border-b md:border-b-0 gap-3 md:gap-0">
                                        <td className="py-2 md:py-4 px-2 md:px-6 flex items-center gap-3">
                                            <div className="w-8 h-8 bg-slate-100 rounded-full shrink-0"></div>
                                            <div className="h-4 bg-slate-100 rounded w-20"></div>
                                        </td>
                                        <td className="py-1 md:py-4 px-2 md:px-4"><div className="h-4 bg-slate-100 rounded w-48"></div></td>
                                        <td className="py-1 md:py-4 px-2 md:px-4"><div className="h-4 bg-slate-100 rounded w-32"></div></td>
                                        <td className="py-1 md:py-4 px-2 md:px-4"><div className="h-4 bg-slate-100 rounded w-16 mx-auto"></div></td>
                                        <td className="py-2 md:py-4 px-2 md:px-6"><div className="h-4 bg-slate-100 rounded w-6 ml-auto"></div></td>
                                    </tr>
                                ))
                            ) : comments && comments.length > 0 ? (
                                comments.map((comment) => (
                                    <tr
                                        key={comment._id}
                                        className="hover:bg-slate-50/40 transition-colors flex flex-col md:table-row p-4 sm:p-5 md:p-0 border-b md:border-b-0 space-y-3.5 md:space-y-0 text-xs text-slate-600 font-medium"
                                    >
                                        {/* User Column */}
                                        <td className="p-0 md:py-4 md:px-6 whitespace-nowrap md:table-cell">
                                            <div className="flex items-center gap-2.5">
                                                <img
                                                    src={comment.user?.avtar?.url || comment.user?.avatar?.url || ""}
                                                    alt=""
                                                    className="w-8 h-8 object-cover rounded-full bg-slate-100 border border-slate-100 shrink-0 shadow-sm"
                                                    onError={(e) => {
                                                        e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${comment.user?.name || 'User'}`;
                                                    }}
                                                />
                                                <span className="font-bold text-slate-700 capitalize text-sm md:text-xs">
                                                    {comment.user?.name || "Anonymous"}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Comment Column */}
                                        <td className="p-0 md:py-4 md:px-4 max-w-xs md:max-w-sm lg:max-w-md md:table-cell flex flex-col gap-1 md:block">
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider md:hidden">Comment</span>
                                            <p
                                                className="text-slate-600 font-normal truncate line-clamp-1 break-all text-xs sm:text-sm md:text-xs"
                                                title={comment.content}
                                            >
                                                {comment.content}
                                            </p>
                                        </td>

                                        {/* Post Anchor Link */}
                                        <td className="p-0 md:py-4 md:px-4 max-w-40 md:max-w-55 md:table-cell flex justify-between items-center text-xs md:text-sm">
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider md:hidden">On Post</span>
                                            <div className="flex items-center gap-1.5 text-slate-500 font-normal min-w-0">
                                                <span className="truncate capitalize" title={comment.blog?.title || comment.postId?.title}>
                                                    {comment.blog?.title || comment.postId?.title || "View Post"}
                                                </span>
                                                <FiExternalLink size={11} className="text-slate-300 shrink-0" />
                                            </div>
                                        </td>

                                        {/* Created At Timestamp */}
                                        <td className="p-0 md:py-4 md:px-4 md:text-center whitespace-nowrap md:table-cell flex justify-between items-center">
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider md:hidden">Date</span>
                                            <div className="flex items-center justify-center gap-1 text-slate-400 font-normal">
                                                <FiCalendar size={11} className="text-slate-300" />
                                                <span>{formatDate(comment.createdAt)}</span>
                                            </div>
                                        </td>

                                        {/* Interactive Tool Actions */}
                                        <td className="p-0 pt-2 md:pt-0 md:py-4 md:px-6 whitespace-nowrap md:table-cell border-t border-dashed border-slate-100 md:border-t-0 text-right">
                                            <div className="flex items-center justify-between md:justify-end gap-4 py-1 md:py-0">
                                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider md:hidden">Actions</span>
                                                <button
                                                    onClick={() => openDeleteModal(comment._id)}
                                                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-200"
                                                    title="Delete Comment"
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
                                            <FiMessageSquare size={18} className="text-slate-300" />
                                            <p className="text-sm font-semibold text-slate-500">No comments found</p>
                                            <p className="text-xs text-slate-400">There are no user comment tracking updates at the moment.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Custom UI Portal Modal */}
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

export default Comments;