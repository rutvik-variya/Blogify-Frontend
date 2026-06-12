import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import TextAreaField from "../common/TextAreaField";
import FileUpload from "../common/FileUpload";
import Button from "../common/Button";

import { blogSchema } from "../../features/blog/blogSchema";
import { editBlogSchema } from "../../features/blog/editBlogSchema";
import { getCateories } from "../../features/category/categorySlice";

import { createBlog } from "../../features/blog/blogPostSlice";
import { editBlog } from "../../features/dashboard/userDashboardSlice";
import { useNavigate } from "react-router-dom";

const BlogForm = ({ mode, blog = null }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.createBlog);
    const { categories } = useSelector((state) => state.category);

    const categoryList = categories?.categories || [];

    useEffect(() => {
        dispatch(getCateories());
    }, [dispatch]);


    const schema = (mode === "create") ? blogSchema : editBlogSchema
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            title: blog?.title || "",
            category: blog?.category?._id || "",
            status: blog?.status || "draft",
            content: blog?.content || "",
            featuredImage: null,
        },
        mode: "onChange",
    });


    const [preview, setPreview] = useState(blog?.featuredImage?.url || null);

    const onSubmit = async (data) => {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("category", data.category);
        formData.append("status", data.status);
        formData.append("content", data.content);

        if (data.featuredImage) {
            formData.append("featuredImage", data.featuredImage);
        }

        let result = (mode === "create") ? await dispatch(createBlog(formData)) : await dispatch(editBlog({ blogId: blog._id, formData }));

        if (createBlog.fulfilled.match(result) || editBlog.fulfilled.match(result)) {
            toast.success(
                mode === "create"
                    ? "Blog created successfully"
                    : "Blog updated successfully"
            );
            reset();
            setPreview(null);
            navigate("/dashboard/blogs")
        } else {
            toast.error(result.payload || "Failed to create blog");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <InputField
                label="Blog Title"
                type="text"
                placeholder="e.g., Mastering React Performance in 2026"
                {...register("title")}
                error={errors.title}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField
                    label="Category"
                    {...register("category")}
                    error={errors.category}
                    options={categoryList}
                />

                <SelectField
                    label="Publication Status"
                    {...register("status")}
                    error={errors.status}
                    options={[
                        {
                            _id: "draft",
                            name: "Save as Draft",
                        },
                        {
                            _id: "published",
                            name: "Publish Immediately",
                        },
                    ]}
                />
            </div>

            <TextAreaField
                label="Content"
                row={12}
                placeholder="Unleash your creativity here..."
                {...register("content")}
                error={errors.content}
            />

            <div className="space-y-4">
                <Controller
                    name="featuredImage"
                    control={control}
                    render={({ field: { onChange } }) => (
                        <FileUpload
                            label="Featured Cover Image"
                            error={errors.featuredImage}
                            onChange={(e) => {
                                const file = e.target.files?.[0];

                                if (!file) {
                                    onChange(null);
                                    setPreview(null);
                                    return;
                                }

                                onChange(file);
                                setPreview(URL.createObjectURL(file));
                            }}
                        />
                    )}
                />

                {preview && (
                    <div className="relative group w-full max-w-md overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm bg-slate-50 dark:bg-slate-900 p-2">
                        <img
                            src={preview}
                            alt="preview"
                            className="w-full h-52 object-cover rounded-lg"
                        />

                        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                            Image Preview
                        </div>
                    </div>
                )}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                <Button
                    type="submit"
                    disabled={loading}
                    value={
                        loading
                            ? mode === "create"
                                ? "Creating..."
                                : "Updating..."
                            : mode === "create"
                                ? "Create Post"
                                : "Update Post"
                    }
                />
            </div>

            {error && (
                <div className="p-4 rounded-xl bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-900/50">
                    <p className="text-violet-600 dark:text-violet-400 text-sm font-medium">
                        {error}
                    </p>
                </div>
            )}
        </form>
    );
};

export default BlogForm;