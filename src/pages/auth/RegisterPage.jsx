import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { registerSchema } from "../../features/auth/authSchema";
import { registerUser } from "../../features/auth/authSlice";

import InputField from "../../components/common/InputField";
import CheckBox from "../../components/common/CheckBox";
import Button from "../../components/common/Button";

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const { isLoading, error } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onRegister = async (data) => {
        const resultAction = await dispatch(registerUser(data));

        if (registerUser.fulfilled.match(resultAction)) {
            navigate("/login");
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                        <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>

                        <form
                            onSubmit={handleSubmit(onRegister)}
                            className="space-y-4 md:space-y-6"
                        >
                            <InputField
                                label="Full Name"
                                type="text"
                                placeholder="Enter Full Name"
                                error={errors.name}
                                {...register("name")}
                            />

                            <InputField
                                label="Username"
                                type="text"
                                placeholder="Enter Username"
                                error={errors.username}
                                {...register("username")}
                            />

                            <InputField
                                label="Email"
                                type="email"
                                placeholder="Enter Email"
                                error={errors.email}
                                {...register("email")}
                            />

                            {/* 🔥 PASSWORD WITH EYE TOGGLE */}
                            <div className="relative">
                                <InputField
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter Password"
                                    error={errors.password}
                                    {...register("password")}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-10.5 text-gray-500"
                                >
                                    {showPassword ? (
                                        <FiEyeOff size={20} />
                                    ) : (
                                        <FiEye size={20} />
                                    )}
                                </button>
                            </div>

                            <CheckBox />

                            <Button
                                type="submit"
                                disabled={isLoading}
                                value={
                                    isLoading
                                        ? "Creating ..."
                                        : "Create an account"
                                }
                            />

                            {error && (
                                <p className="text-violet-500 text-sm">
                                    {error}
                                </p>
                            )}

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="font-medium text-violet-600 hover:underline"
                                >
                                    Login here
                                </Link>
                            </p>
                        </form>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;