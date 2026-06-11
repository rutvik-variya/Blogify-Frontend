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
import { createBlog } from "../../features/blog/blogPostSlice";
import { getCateories } from "../../features/category/categorySlice";

const BlogForm = () => {
    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.createBlog);
    const { categories } = useSelector((state) => state.category);

    const categoryList = categories?.categories || [];

    const [preview, setPreview] = useState(null);

    useEffect(() => {
        dispatch(getCateories());
    }, [dispatch]);

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: "",
            category: "",
            status: "draft",
            content: "",
            featuredImage: null,
        },
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("category", data.category);
        formData.append("status", data.status);
        formData.append("content", data.content);

        if (data.featuredImage) {
            formData.append("featuredImage", data.featuredImage);
        }

        const result = await dispatch(createBlog(formData));

        if (createBlog.fulfilled.match(result)) {
            toast.success("Blog created successfully");
            reset();
            setPreview(null);
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
                    value={loading ? "Creating..." : "Create Post"}
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