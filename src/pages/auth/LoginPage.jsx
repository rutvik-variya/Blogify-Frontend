import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { loginSchema } from "../../features/auth/authSchema";
import { loginUser } from "../../features/auth/authSlice";

import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const { isLoading, error } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onLogin = async (data) => {
        const resultAction = await dispatch(loginUser(data));

        if (loginUser.fulfilled.match(resultAction)) {
            navigate("/");
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="flex min-h-screen flex-col items-center justify-center px-6 py-8 mx-auto">
                <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                        <div>
                            <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
                                Sign In
                            </h3>

                            <p className="text-gray-500 mt-2 dark:text-gray-400">
                                Welcome back! Please login to continue.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit(onLogin)}
                            className="space-y-5"
                        >
                            <InputField
                                label="Email"
                                type="email"
                                placeholder="Enter your email"
                                autoComplete="email"
                                error={errors.email}
                                {...register("email")}
                            />

                            {/* Password Field */}
                            <div className="relative">
                                <InputField
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
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

                            <div className="flex justify-end">
                                <Link
                                    to="/login"
                                    className="text-sm text-violet-600 hover:underline"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                value={
                                    isLoading
                                        ? "Loading..."
                                        : "Sign In"
                                }
                            />

                            {error && (
                                <p className="text-violet-500 text-sm text-center">
                                    {error}
                                </p>
                            )}
                        </form>

                        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                            Don&apos;t have an account?{" "}
                            <Link
                                to="/register"
                                className="text-violet-600 font-medium hover:underline"
                            >
                                Sign Up
                            </Link>
                        </p>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;