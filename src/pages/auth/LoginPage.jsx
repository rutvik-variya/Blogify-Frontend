import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginSchema } from "../../features/auth/authSchema";
import { loginUser } from "../../features/auth/authSlice";

import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, error } = useSelector((state) => state.auth);


    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onLogin = async (data) => {
        const resultAction = await dispatch(loginUser(data));
        if (loginUser.fulfilled.match(resultAction)) {
            navigate("/");
        }
    }

    return (
        <div className=" w-1/2">
            <h3 className="text-2xl font-bold mb-5">Login Page</h3>

            <form
                onSubmit={handleSubmit(onLogin)}
                className="space-y-4"
            >
                <InputField
                    label="Email"
                    type="email"
                    placeholder="Enter email"
                    autoComplete="email"
                    error={errors.email}
                    {...register("email")}
                />

                <InputField
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    autoComplete="current-password"
                    error={errors.password}
                    {...register("password")}
                />

                <Button
                    type="submit"
                    disabled={isLoading}
                    value={
                        isLoading
                            ? "Loading..."
                            : "Login"
                    }
                />

                {error && (
                    <p className="text-red-500 text-sm">
                        {error}
                    </p>
                )}
            </form>
        </div>
    )
}

export default LoginPage
