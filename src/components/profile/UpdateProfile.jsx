import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { updateProfileSchema } from "./updateProfileSchema";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../features/auth/authSlice";

import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    const { isLoading, error, user } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
        },
    });

    useEffect(() => {
        if (user) {
            reset({
                name: user.name,
                username: user.username,
                email: user.email,
            });
        }
    }, [user, reset]);

    const onSubmit = async (data) => {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("username", data.username);
        formData.append("email", data.email);

        if (data.avtar?.[0]) {
            formData.append("avtar", data.avtar[0]);
        }

        const result = await dispatch(updateProfile(formData));

        if (updateProfile.fulfilled.match(result)) {
            toast.success("Profile Updated");
            reset();
            setPreview(null);
            navigate("/profile");
        }
    };

    const { onChange, ...avatarRegister } = register("avtar");

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
        onChange(e);
    };

    const defaultAvatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80";

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-slate-50 p-4 font-sans">
            <div className="w-full max-w-sm bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                <div className="mb-6 text-left">
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">Edit Profile</h2>
                    <p className="text-xs text-slate-400 mt-1">Update your account credentials and avatar.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
                    <div className="flex items-center gap-4 bg-slate-50/60 p-3 rounded-xl border border-slate-100 mb-2">
                        <img
                            src={preview || user?.avtar?.url || defaultAvatar}
                            alt="avatar preview"
                            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm bg-slate-100"
                        />
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold text-slate-700">Profile Picture</span>
                            <label className="text-xs text-violet-600 font-medium hover:text-violet-700 cursor-pointer transition-colors">
                                Upload new picture
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    {...avatarRegister}
                                    onChange={handleAvatarChange}
                                />
                            </label>
                        </div>
                    </div>

                    <InputField
                        label="Name"
                        type="text"
                        {...register("name")}
                        error={errors.name}
                    />

                    <InputField
                        label="Username"
                        type="text"
                        {...register("username")}
                        error={errors.username}
                    />

                    <InputField
                        label="Email"
                        type="email"
                        {...register("email")}
                        error={errors.email}
                    />

                    <div className="pt-2">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            value={isLoading ? "Updating..." : "Update Profile"}
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

export default UpdateProfile;   