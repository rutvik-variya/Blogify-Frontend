import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUser } from "../../features/dashboard/adminDashboardSlice";
import { FiTrash2, FiUsers } from "react-icons/fi";
import toast from "react-hot-toast";
import ConfirmationModal from "../../components/common/ConfirmationModal";

const Users = () => {
    const dispatch = useDispatch();
    const { users, userLoading, error } = useSelector((state) => state.adminDashBoard);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [targetUserId, setTargetUserId] = useState(null);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const openDeleteModal = (userId) => {
        setTargetUserId(userId);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!targetUserId) return;
        try {
            await dispatch(deleteUser(targetUserId)).unwrap();
            toast.success("User deleted successfully");
        } catch (error) {
            toast.error("Failed to delete user", error);
        } finally {
            setTargetUserId(null);
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
                Failed to load user management: {error}
            </div>
        );
    }

    return (
        <div className="space-y-6 text-left font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
            <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">User Management</h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">Manage and track registered system users.</p>
            </div>

            <div className="w-full bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse block md:table">
                        <thead className="hidden md:table-header-group">
                            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                <th className="py-4 px-6">User Details</th>
                                <th className="py-4 px-4">Username</th>
                                <th className="py-4 px-4">Role</th>
                                <th className="py-4 px-4 text-center">Joined Date</th>
                                <th className="py-4 px-6 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 text-sm block md:table-row-group">
                            {userLoading ? (
                                Array.from({ length: 3 }).map((_, idx) => (
                                    <tr key={idx} className="animate-pulse flex flex-col md:table-row p-4 border-b md:border-b-0 gap-3 md:gap-0">
                                        <td className="py-2 md:py-4 px-2 md:px-6 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-100 rounded-full shrink-0"></div>
                                            <div className="space-y-2 flex-1">
                                                <div className="h-4 bg-slate-100 rounded w-2/3"></div>
                                                <div className="h-3 bg-slate-50 rounded w-1/3"></div>
                                            </div>
                                        </td>
                                        <td className="py-1 md:py-4 px-2 md:px-4"><div className="h-4 bg-slate-100 rounded w-20"></div></td>
                                        <td className="py-1 md:py-4 px-2 md:px-4"><div className="h-4 bg-slate-100 rounded w-14"></div></td>
                                        <td className="py-1 md:py-4 px-2 md:px-4"><div className="h-4 bg-slate-100 rounded w-24 mx-auto"></div></td>
                                        <td className="py-2 md:py-4 px-2 md:px-6"><div className="h-6 bg-slate-100 rounded-lg w-8 ml-auto"></div></td>
                                    </tr>
                                ))
                            ) : users && users.length > 0 ? (
                                users.map((user) => (
                                    <tr
                                        key={user._id}
                                        className="hover:bg-slate-50/40 transition-colors flex flex-col md:table-row p-4 sm:p-5 md:p-0 border-b md:border-b-0 space-y-3 md:space-y-0 text-slate-600 font-medium"
                                    >
                                        <td className="p-0 md:py-4 md:px-6 w-full md:max-w-xs lg:max-w-md md:table-cell">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={user.avtar?.url || user.profileImage}
                                                    alt=""
                                                    className="w-10 h-10 object-cover rounded-full bg-slate-100 border border-slate-100 shadow-sm shrink-0"
                                                    onError={(e) => {
                                                        e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${user.name || 'User'}`;
                                                    }}
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <h4 className="font-bold text-slate-700 truncate capitalize text-sm sm:text-base md:text-sm">
                                                        {user.name}
                                                    </h4>
                                                    <p className="text-[11px] text-slate-400 font-normal truncate mt-0.5">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-0 md:py-4 md:px-4 whitespace-nowrap md:table-cell flex justify-between items-center text-xs md:text-sm">
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider md:hidden">Username</span>
                                            <span className="text-slate-500 font-normal">@{user.username || "username"}</span>
                                        </td>

                                        <td className="p-0 md:py-4 md:px-4 capitalize whitespace-nowrap md:table-cell flex justify-between items-center text-xs md:text-sm">
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider md:hidden">Role</span>
                                            <span className="text-slate-600 font-semibold bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/40 md:bg-transparent md:border-none md:p-0">
                                                {user.role || "user"}
                                            </span>
                                        </td>

                                        <td className="p-0 md:py-4 md:px-4 md:text-center whitespace-nowrap md:table-cell flex justify-between items-center text-xs md:text-sm">
                                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider md:hidden">Joined Date</span>
                                            <span className="text-slate-500 font-normal">{formatDate(user.createdAt)}</span>
                                        </td>

                                        <td className="p-0 pt-2 md:pt-0 md:py-4 md:px-6 whitespace-nowrap md:table-cell border-t border-dashed border-slate-100 md:border-t-0 text-right">
                                            <div className="flex items-center justify-between md:justify-end gap-4 py-1 md:py-0">
                                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider md:hidden">Actions</span>
                                                <button
                                                    onClick={() => openDeleteModal(user._id)}
                                                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-200"
                                                    title="Delete User"
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
                                            <FiUsers size={18} className="text-slate-300" />
                                            <p className="text-sm font-semibold text-slate-500">No users found</p>
                                            <p className="text-xs text-slate-400">System records do not display matching profiles currently.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Custom Dynamic Flowbite Style Confirmation Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Are you sure you want to delete this user profile permanently?"
                confirmText="Yes, I'm sure"
                cancelText="No, cancel"
                variant="danger"
            />
        </div>
    );
};

export default Users;