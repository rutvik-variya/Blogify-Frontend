import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../features/dashboard/adminDashboardSlice";
import { deleteUser } from "../../features/dashboard/adminDashboardSlice";
import { FiTrash2, FiUsers } from "react-icons/fi";
import toast from "react-hot-toast";

const Users = () => {
    const dispatch = useDispatch();
    const { users, userLoading, error } = useSelector((state) => state.adminDashBoard);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {
            await dispatch(deleteUser(userId)).unwrap();
            toast.success("User deleted successfully");
        } catch (error) {
            toast.error("Failed to delete user", error);
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
                Failed to load user management: {error}
            </div>
        );
    }

    return (
        <div className="space-y-6 text-left font-sans">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">User Management</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Manage and track registered system users.</p>
                </div>
            </div>

            <div className="w-full bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                <th className="py-3.5 px-6">User Details</th>
                                <th className="py-3.5 px-4">Username</th>
                                <th className="py-3.5 px-4">Role</th>
                                <th className="py-3.5 px-4 text-center">Joined Date</th>
                                <th className="py-3.5 px-6 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 text-xs text-slate-600 font-medium">
                            {userLoading ? (
                                Array.from({ length: 3 }).map((_, idx) => (
                                    <tr key={idx} className="animate-pulse">
                                        <td className="py-4 px-6 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-100 rounded-full shrink-0"></div>
                                            <div className="space-y-2 w-2/3">
                                                <div className="h-3.5 bg-slate-100 rounded w-3/4"></div>
                                                <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4"><div className="h-4 bg-slate-100 rounded w-16"></div></td>
                                        <td className="py-4 px-4"><div className="h-4 bg-slate-100 rounded w-12"></div></td>
                                        <td className="py-4 px-4"><div className="h-4 bg-slate-100 rounded w-20 mx-auto"></div></td>
                                        <td className="py-4 px-6"><div className="h-4 bg-slate-100 rounded w-6 ml-auto"></div></td>
                                    </tr>
                                ))
                            ) : users && users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user._id} className="hover:bg-slate-50/30 transition-colors">
                                        <td className="py-3.5 px-6 max-w-xs md:max-w-md">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={user.avtar?.url || user.profileImage}
                                                    alt=""
                                                    className="w-10 h-10 object-cover rounded-full bg-slate-100 border border-slate-100 shrink-0"
                                                    onError={(e) => {
                                                        e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${user.name || 'User'}`;
                                                    }}
                                                />
                                                <div className="truncate">
                                                    <h4 className="font-semibold text-slate-700 truncate capitalize">
                                                        {user.name}
                                                    </h4>
                                                    <p className="text-[11px] text-slate-400 font-normal truncate mt-0.5">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-3.5 px-4 text-slate-500 font-normal whitespace-nowrap">
                                            @{user.username || "username"}
                                        </td>

                                        <td className="py-3.5 px-4 capitalize whitespace-nowrap">
                                            <span className="text-slate-600 font-medium">
                                                {user.role || "user"}
                                            </span>
                                        </td>

                                        <td className="py-3.5 px-4 text-center text-slate-500 whitespace-nowrap font-normal">
                                            {formatDate(user.createdAt)}
                                        </td>

                                        <td className="py-3.5 px-6 text-right whitespace-nowrap">
                                            <div className="inline-flex items-center justify-end">
                                                <button
                                                    onClick={() => handleDelete(user._id)}
                                                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                                    title="Delete User"
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
                                            <FiUsers size={18} className="text-slate-300" />
                                            <p className="text-xs font-semibold text-slate-500">No users found</p>
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

export default Users;