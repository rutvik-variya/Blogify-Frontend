import { z } from "zod";

export const editBlogSchema = z.object({
    title: z.string().min(5).max(100),
    category: z.string().min(1),
    content: z.string().min(50),
    featuredImage: z
        .instanceof(File)
        .optional()
        .or(z.null()),
});