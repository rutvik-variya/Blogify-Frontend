import { z } from "zod";

export const changePasswordSchema = z
    .object({
        currentPassword: z
            .string()
            .min(8, "Current password is required"),

        newPassword: z
            .string()
            .min(8, "Password must be at least 6 characters"),

        confirmPassword: z
            .string()
            .min(8, "Confirm password is required"),
    })
    .refine(
        (data) => data.newPassword === data.confirmPassword,
        {
            path: ["confirmPassword"],
            message: "Passwords do not match",
        }
    );