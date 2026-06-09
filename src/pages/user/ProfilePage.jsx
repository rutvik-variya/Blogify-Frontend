import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    const defaultAvatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80";

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-slate-50 p-4 font-sans">
            <div className="w-full max-w-sm bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <img
                        src={user?.avtar?.url || defaultAvatar}
                        alt={user?.name || "User Profile"}
                        className="w-16 h-16 rounded-full object-cover bg-slate-100"
                    />
                    <div className="text-left">
                        <h2 className="text-xl font-bold text-slate-800 leading-tight">
                            {user?.name || "Blogify User"}
                        </h2>
                        <p className="text-sm text-slate-400 mt-0.5">
                            @{user?.username || "username"}
                        </p>
                    </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 text-left text-sm">
                    <div className="flex justify-between items-center py-1">
                        <span className="text-slate-400">Email</span>
                        <span className="font-medium text-slate-700 break-all max-w-50">
                            {user?.email || "N/A"}
                        </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                        <span className="text-slate-400">Role</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md capitalize">
                            {user?.role || "user"}
                        </span>
                    </div>
                </div>

                <div className="mt-6 space-y-2">
                    <Link
                        to="/updateProfile"
                        className="block w-full text-center bg-violet-600 text-white text-sm font-semibold py-2.5 rounded-xl"
                    >
                        Update Profile
                    </Link>

                    <Link
                        to="/changePassword"
                        className="block w-full text-center bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 text-sm font-semibold py-2.5 rounded-xl"
                    >
                        Change Password
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;