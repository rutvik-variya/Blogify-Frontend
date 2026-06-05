import { z } from "zod";

export const blogSchema = z.object({
    title: z
        .string()
        .min(5, "Title must be at least 5 characters")
        .max(100, "Title cannot exceed 100 characters"),

    category: z
        .string()
        .min(1, "Please select categories"),

    content: z
        .string()
        .min(50, "Content must be at least 50 characters"),

    status: z.enum(["draft", "published"]),

    featuredImage: z.
        any()
        .refine((file) => file?.length > 0, {
            message: "image is required",
        }),
})
