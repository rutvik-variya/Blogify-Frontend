import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { registerSchema } from "../../features/auth/authSchema";
import { registerUser } from "../../features/auth/authSlice";

import InputField from "../../components/common/InputField";
import CheckBox from "../../components/common/CheckBox";
import Button from "../../components/common/Button";

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, error } = useSelector((state) => state.auth);

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onRegister = async (data) => {
        const resultAction = await dispatch(registerUser(data));

        if (registerUser.fulfilled.match(resultAction)) {
            navigate("/login");
        }
    };

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>
                            <form onSubmit={handleSubmit(onRegister)} className="space-y-4 md:space-y-6">
                                <div>
                                    <InputField
                                        label="Full Name"
                                        type="text"
                                        placeholder="Enter Full Name"
                                        error={errors.name}
                                        {...register("name")}
                                    />
                                </div>
                                <div>
                                    <InputField
                                        label="Username"
                                        type="text"
                                        placeholder="Enter Username"
                                        error={errors.username}
                                        {...register("username")}
                                    />
                                </div>
                                <div>
                                    <InputField
                                        label="Email"
                                        type="email"
                                        placeholder="Enter Email"
                                        error={errors.email}
                                        {...register("email")}
                                    />
                                </div>
                                <div>
                                    <InputField
                                        label="Password"
                                        type="password"
                                        placeholder="Enter Password"
                                        error={errors.password}
                                        {...register("password")}
                                    />
                                </div>
                                <div>
                                    <CheckBox />
                                </div>

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
                                        className="font-medium text-violet-600 hover:underline dark:text-primary-500"
                                    >
                                        Login here
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
};

export default RegisterPage;