import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod";

import { updateProfileSchema } from "./updateProfileSchema";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../features/auth/authSlice";

import InputField from "../../components/common/InputField"
import Button from "../../components/common/Button"
const UpdateProfile = () => {
    const dispatch = useDispatch();
    const [preview, setPreview] = useState(null);

    const { isLoading, error, user } = useSelector((state) => state.auth)
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

    const onSubmit = (data) => {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("username", data.username);
        formData.append("email", data.email);

        if (data.avtar?.[0]) {
            formData.append("avtar", data.avtar[0]);
        }

        dispatch(updateProfile(formData));
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
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

                <input
                    type="file"
                    accept="image/*"
                    {...register("avtar")}
                    onChange={(e) => {
                        setPreview(URL.createObjectURL(e.target.files[0]));
                    }}
                />
                <img
                    src={preview || user?.avatar}
                    alt="avatar"
                    className="w-24 h-24 rounded-full object-cover"
                />

                <Button
                    type="submit"
                    disabled={isLoading}
                    value={
                        isLoading
                            ? "Updating..."
                            : "Update Profile"
                    }
                />

                {error && (
                    <p className="text-violet-500 text-sm text-center">
                        {error}
                    </p>
                )}
            </form>
        </div>
    )
}

export default UpdateProfile
