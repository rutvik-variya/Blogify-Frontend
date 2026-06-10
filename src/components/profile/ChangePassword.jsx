import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "./changePasswordSchema";

import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../features/auth/authSlice";
import { useState } from "react";

import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, error } = useSelector((state) => state.auth);

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(changePasswordSchema),
    });

    const onSubmit = (data) => {
        dispatch(changePassword(data));
        toast.success("Set new password");
        navigate("/profile")
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-slate-50 p-4 font-sans">
            <div className="w-full max-w-sm bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">

                <div className="mb-6 text-left">
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">Security Settings</h2>
                    <p className="text-xs text-slate-400 mt-1">Update your password to keep your account secure.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
                    <div className="relative">
                        <InputField
                            label="Current Password"
                            type={showCurrentPassword ? "text" : "password"}
                            {...register("currentPassword")}
                            error={errors.currentPassword}
                            placeholder="Enter Current Password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrentPassword((prev) => !prev)}
                            className="absolute right-3 top-9.5 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                        >
                            {showCurrentPassword ? (
                                <FiEyeOff size={18} />
                            ) : (
                                <FiEye size={18} />
                            )}
                        </button>
                    </div>
                    <div className="relative">
                        <InputField
                            label="New Password"
                            type={showNewPassword ? "text" : "password"}
                            {...register("newPassword")}
                            error={errors.newPassword}
                            placeholder="Enter New Password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword((prev) => !prev)}
                            className="absolute right-3 top-9.5 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                        >
                            {showNewPassword ? (
                                <FiEyeOff size={18} />
                            ) : (
                                <FiEye size={18} />
                            )}
                        </button>
                    </div>

                    <div className="pt-2">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            value={isLoading ? "Changing..." : "Change Password"}
                            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2.5 rounded-xl transition duration-150"
                        />
                    </div>

                    {error && (
                        <p className="text-violet-500 text-xs font-medium text-center mt-2 bg-violet-50 border border-violet-100 py-2 rounded-lg">
                            {error}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;

