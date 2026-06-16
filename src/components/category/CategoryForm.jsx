import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import InputField from "../common/InputField";
import Button from "../common/Button";

import { categorySchema } from "./CategorySchema";
import { addCategory, editCategory } from "../../features/dashboard/adminDashboardSlice";

const CategoryForm = ({ mode, category = null }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { categoryLoading, error } = useSelector(
        (state) => state.adminDashBoard
    );

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: category?.name || "",
        },
    });

    useEffect(() => {
        if (category) {
            reset({ name: category.name });
        }
    }, [category, reset]);

    const onSubmit = async (data) => {
        const result = (mode === "create")
            ? await dispatch(addCategory({ name: data.name }))
            : await dispatch(editCategory({ categoryId: category?._id, formData: { name: data.name } }));

        if (addCategory.fulfilled.match(result) || editCategory.fulfilled.match(result)) {
            toast.success(
                mode === "create"
                    ? "Category created successfully"
                    : "Category updated successfully"
            );
            reset();
            navigate("/dashboard/categories");
        } else {
            toast.error(result.payload || `Failed to ${mode} category`);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Input Field Container */}
            <div className="text-xs font-medium text-slate-600">
                <InputField
                    label="Category Name"
                    type="text"
                    placeholder="e.g., Traveling, Tech, Food"
                    {...register("name")}
                    error={errors.name}
                />
            </div>

            {error && (
                <div className="p-3.5 rounded-xl bg-violet-50/70 border border-violet-100 text-left">
                    <p className="text-violet-600 text-xs font-medium">
                        {error}
                    </p>
                </div>
            )}

            {/* Form Footer Action */}
            <div className="pt-4 border-t border-slate-100 w-full flex justify-end">
                <div className="w-full sm:w-auto sm:min-w-35">
                    <Button
                        type="submit"
                        disabled={categoryLoading}
                        value={
                            categoryLoading
                                ? mode === "create"
                                    ? "Creating..."
                                    : "Updating..."
                                : mode === "create"
                                    ? "Create Category"
                                    : "Update Category"
                        }
                    />
                </div>
            </div>
        </form>
    );
};

export default CategoryForm;