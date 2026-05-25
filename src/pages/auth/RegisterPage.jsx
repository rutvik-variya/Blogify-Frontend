import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { registerSchema } from "../../features/auth/authSchema";
import { registerUser } from "../../features/auth/authSlice";

import InputField from "../../components/common/InputField";
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
        <div className=" w-1/2">
            <h2 className="text-2xl font-bold mb-5">
                Register
            </h2>

            <form
                onSubmit={handleSubmit(onRegister)}
                className="space-y-4"
            >
                <InputField
                    label="Full Name"
                    type="text"
                    placeholder="Enter full name"
                    error={errors.name}
                    {...register("name")}
                />

                <InputField
                    label="Username"
                    type="text"
                    placeholder="Enter username"
                    error={errors.username}
                    {...register("username")}
                />

                <InputField
                    label="Email"
                    type="email"
                    placeholder="Enter email"
                    error={errors.email}
                    {...register("email")}
                />

                <InputField
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    error={errors.password}
                    {...register("password")}
                />

                <Button
                    type="submit"
                    disabled={isLoading}
                    value={
                        isLoading
                            ? "Creating Account..."
                            : "Register"
                    }
                />
                {error && (
                    <p className="text-red-500 text-sm">
                        {error}
                    </p>
                )}
            </form>
        </div>
    );
};

export default RegisterPage;