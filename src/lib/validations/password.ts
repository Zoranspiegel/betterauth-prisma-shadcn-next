import z from "zod";

export const passwordFieldSchema = z
  .string()
  .min(1, { message: "Password is required" })
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/^\S*$/, "Password must not contain spaces")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, {
    message: "Password must contain at least one special character",
  });

export const resetPasswordFieldsSchema = z
  .object({
    newPassword: passwordFieldSchema,
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    error: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type ResetPasswordFields = z.infer<typeof resetPasswordFieldsSchema>;
