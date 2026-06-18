import { z } from "zod";

export const blogSchema = z.object({
    title: z
        .string({ required_error: "Title is required" })
        .min(5, "Title must be at least 5 characters")
        .max(100, "Title cannot exceed 100 characters"),

    category: z
        .string({ required_error: "Please select a category" })
        .min(1, "Please select a category"),
    content: z
        .string({ required_error: "Content is required" })
        .min(50, "Content must be at least 50 characters"),

    featuredImage: z
        .instanceof(File, { message: "Image is required" })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: "Image must be less than 5MB",
        })
        .refine(
            (file) =>
                [
                    "image/jpeg",
                    "image/jpg",
                    "image/png",
                    "image/webp",
                ].includes(file.type),
            "Only JPG, PNG and WEBP files are allowed"
        )
});