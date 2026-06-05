import { get, useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "../common/InputField"
import SelectField from "../common/SelectField";

import { blogSchema } from "../../features/blog/blogSchema";
import { createBlog } from "../../features/blog/blogPostSlice";
import { getCateories } from "../../features/category/categorySlice";



const BlogForm = () => {
    const dispatch = useDispatch();

    const { loading } = useSelector((state) => state.createBlog);
    const { categories } = useSelector((state) => state.category);
    const categoryList = categories?.categories || [];


    useEffect(() => {
        dispatch(getCateories());
    }, [dispatch])

    const {
        register, handleSubmit, reset, formState: { errors },
    } = useForm({
        resolver: zodResolver(blogSchema)
    });


    const onSubmit = () => {
        console.log("form submited")
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <InputField
                    label="Title"
                    type="text"
                    placeholder="Enter blog title"
                    {...register("title")}
                    error={errors.title?.message}
                />

                <SelectField
                    label="Category"
                    {...register("category")}
                    error={errors.category?.message}
                    options={categoryList}
                />
                
            </form>
        </div>
    )
}

export default BlogForm
