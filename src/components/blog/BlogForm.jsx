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

import { draftBlogSchema } from "../../features/blog/draftBlogSchema";
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
        reset,
        trigger,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            title: blog?.title || "",
            category: blog?.category?._id || "",
            content: blog?.content || "",
            featuredImage: null,
        },
        mode: "onChange",
    });


    const [preview, setPreview] = useState(blog?.featuredImage?.url || null);

    const submitBlog = async (data, status) => {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("category", data.category || "");
        formData.append("status", status);
        formData.append("content", data.content || "");

        if (data.featuredImage) {
            formData.append("featuredImage", data.featuredImage);
        }

        let result =
            mode === "create" ? await dispatch(createBlog(formData)) : await dispatch(
                editBlog({
                    blogId: blog._id,
                    formData,
                })
            );

        if (
            createBlog.fulfilled.match(result) ||
            editBlog.fulfilled.match(result)
        ) {
            toast.success(
                status === "published"
                    ? "Blog published successfully"
                    : "Draft saved successfully"
            );

            reset();
            setPreview(null);

            navigate("/dashboard/blogs");
        } else {
            toast.error(result.payload || "Something went wrong");
        }
    };

    const handlePublish = async () => {
        const isValid = await trigger();

        console.log("isValid", isValid)
        console.log(errors);
        console.log(getValues());


        if (!isValid) return;

        const data = getValues();

        submitBlog(data, "published");
    };

    const handleDraft = async () => {
        const data = getValues();

        const result = draftBlogSchema.safeParse({
            title: data.title,
        });

        if (!result.success) {
            toast.error("Title is required");
            return;
        }

        submitBlog(data, "draft");
    };

    return (
        <form className="space-y-6">
            <InputField
                label="Blog Title"
                type="text"
                placeholder="e.g., Mastering React Performance in 2026"
                {...register("title")}
                error={errors.title}
            />

            <div>
                <SelectField
                    label="Category"
                    {...register("category")}
                    error={errors.category}
                    options={categoryList}
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

            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row justify-between gap-4">
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-start gap-3">
                    <Button
                        variant="solid"
                        value={loading ? "Publishing..." : "Publish"}
                        onClick={handlePublish}
                        disabled={loading}
                    />

                    <Button
                        variant="ghost"
                        value={loading ? "Saving..." : "Save Draft"}
                        onClick={handleDraft}
                        disabled={loading}
                    />
                </div>
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