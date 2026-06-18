import { z } from "zod";
import { stripHtml } from "../../utils/stripHtml";

export const blogSchema = z.object({
    title: z
        .string()
        .min(5)
        .max(100),

    category: z
        .string()
        .min(1),

    content: z
        .string()
        .refine(
            (value) => stripHtml(value).length >= 50,
            {
                message:
                    "Content must be at least 50 characters",
            }
        ),

    featuredImage: z
        .instanceof(File)
        .refine(
            (file) => file.size <= 5 * 1024 * 1024,
            {
                message: "Image must be less than 5MB",
            }
        )
});