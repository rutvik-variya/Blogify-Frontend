import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, deleteComment } from "../../features/dashboard/adminDashboardSlice";
import { FiTrash2, FiMessageSquare, FiCalendar, FiChevronDown, FiChevronUp } from "react-icons/fi";
import toast from "react-hot-toast";
import ConfirmationModal from "../../components/common/ConfirmationModal";

const Comments = () => {
    const dispatch = useDispatch();
    const { comments, commentLoding, error } = useSelector((state) => state.adminDashBoard);

    // State to track which grouped user blocks are expanded
    const [expandedUsers, setExpandedUsers] = useState({});

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

    // Grouping logic: Consolidates comments left by the same user ID
    const groupedComments = useMemo(() => {
        if (!comments || comments.length === 0) return [];

        const groups = {};
        comments.forEach((comment) => {
            const userId = comment.user?._id || "anonymous_user";

            if (!groups[userId]) {
                groups[userId] = {
                    user: comment.user,
                    latestDate: comment.createdAt,
                    list: []
                };
            }

            groups[userId].list.push({
                _id: comment._id,
                content: comment.content,
                createdAt: comment.createdAt,
                blog: comment.blog || comment.postId
            });

            if (new Date(comment.createdAt) > new Date(groups[userId].latestDate)) {
                groups[userId].latestDate = comment.createdAt;
            }
        });

        return Object.values(groups).sort(
            (a, b) => new Date(b.latestDate) - new Date(a.latestDate)
        );
    }, [comments]);

    const openDeleteModal = (commentId) => {
        setModalConfig({
            isOpen: true,
            commentId,
            title: "Are you sure you want to delete this comment permanently?",
            confirmText: "Yes, delete it",
            variant: "danger"
        });
    };

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

    const toggleExpand = (userId) => {
        setExpandedUsers((prev) => ({
            ...prev,
            [userId]: !prev[userId]
        }));
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
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
                    <p className="text-xs sm:text-sm text-slate-400">Review, moderate, and manage consolidated interactions across articles.</p>
                </div>
            </div>

            <div className="space-y-4">
                {commentLoding ? (
                    Array.from({ length: 2 }).map((_, idx) => (
                        <div key={idx} className="flex gap-4 p-5 bg-white border border-slate-200/60 rounded-2xl animate-pulse shadow-xs">
                            <div className="w-9 h-9 bg-slate-100 rounded-full shrink-0"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-slate-100 rounded w-1/4"></div>
                                <div className="h-3 bg-slate-50 rounded w-1/2"></div>
                                <div className="h-10 bg-slate-100 rounded w-full mt-2"></div>
                            </div>
                        </div>
                    ))
                ) : groupedComments.length > 0 ? (
                    groupedComments.map((group) => {
                        const userId = group.user?._id || "anonymous_user";
                        const hasMultiple = group.list.length > 1;
                        const isExpanded = !!expandedUsers[userId];

                        return (
                            <div
                                key={userId}
                                className="bg-white border border-slate-200/60 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-300"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={group.user?.avtar?.url || group.user?.avatar?.url || ""}
                                            alt=""
                                            className="w-9 h-9 object-cover rounded-full bg-slate-100 border border-slate-100 shrink-0 shadow-xs"
                                            onError={(e) => {
                                                e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${group.user?.name || 'User'}`;
                                            }}
                                        />
                                        <div>
                                            <h4 className="font-bold text-slate-800 capitalize text-sm">
                                                {group.user?.name || "Anonymous User"}
                                            </h4>
                                            <p className="text-[11px] text-slate-400 font-medium">
                                                Total submitted interactions: <span className="font-bold text-violet-600">{group.list.length}</span>
                                            </p>
                                        </div>
                                    </div>

                                    {hasMultiple && (
                                        <button
                                            onClick={() => toggleExpand(userId)}
                                            className="flex items-center gap-1.5 text-xs font-semibold text-violet-600 hover:text-violet-700 transition-colors cursor-pointer bg-violet-50 px-3 py-1.5 rounded-xl border border-violet-100 self-start sm:self-auto"
                                        >
                                            <span>{isExpanded ? "Hide Comments" : `Show All (${group.list.length})`}</span>
                                            {isExpanded ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
                                        </button>
                                    )}
                                </div>

                                {!hasMultiple ? (
                                    <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/60 border border-slate-100/80 rounded-xl p-3.5 text-xs">
                                        <div className="space-y-1.5 flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold text-slate-400">
                                                <span className="flex items-center gap-1"><FiCalendar /> {formatDate(group.list[0].createdAt)}</span>
                                                <span className="text-slate-200">•</span>
                                                <span className="flex items-center gap-1 max-w-xs truncate">
                                                    On: <span className="text-slate-500 font-bold underline capitalize">{group.list[0].blog?.title || "View Post"}</span>
                                                </span>
                                            </div>
                                            <p className="text-slate-600 font-medium italic wrap-break-word">
                                                "{group.list[0].content}"
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => openDeleteModal(group.list[0]._id)}
                                            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all self-end sm:self-auto"
                                            title="Delete Comment"
                                        >
                                            <FiTrash2 size={14} />
                                        </button>
                                    </div>
                                ) : (
                                    isExpanded && (
                                        <div className="mt-3 pt-3 space-y-3 border-t border-dashed border-slate-100 animate-fadeIn">
                                            {group.list.map((comment) => (
                                                <div
                                                    key={comment._id}
                                                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/40 border border-slate-100/70 hover:bg-slate-50/80 rounded-xl p-3 text-xs transition-colors"
                                                >
                                                    <div className="space-y-1 flex-1 min-w-0">
                                                        <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold text-slate-400">
                                                            <span className="flex items-center gap-1"><FiCalendar /> {formatDate(comment.createdAt)}</span>
                                                            <span className="text-slate-200">•</span>
                                                            <span className="flex items-center gap-1 max-w-sm truncate">
                                                                On Post: <span className="text-slate-500 font-bold underline capitalize">{comment.blog?.title || "View Post"}</span>
                                                            </span>
                                                        </div>
                                                        <p className="text-slate-600 font-medium italic wrap-break-word">
                                                            "{comment.content}"
                                                        </p>
                                                    </div>

                                                    <button
                                                        onClick={() => openDeleteModal(comment._id)}
                                                        className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all self-end sm:self-auto"
                                                        title="Delete Comment"
                                                    >
                                                        <FiTrash2 size={13} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="w-full py-16 bg-white border border-slate-200/60 rounded-2xl text-center shadow-sm flex flex-col items-center justify-center p-6">
                        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-300 mb-3.5">
                            <FiMessageSquare size={20} />
                        </div>
                        <h3 className="font-bold text-slate-700 text-base">No Comments Found</h3>
                        <p className="text-xs text-slate-400 max-w-xs mt-1">
                            There are currently no active comments pending across the environment platform database logs.
                        </p>
                    </div>
                )}
            </div>

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