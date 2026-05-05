"use client";

import { LoadingButton } from "@/components/loading-button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import PasswordInput from "@/components/ui/password-input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    error: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

type ResetPasswordFields = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm({ token }: { token: string }) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isValid, isSubmitted, isSubmitting },
  } = useForm<ResetPasswordFields>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  async function onSubmit(data: ResetPasswordFields) {
    const { error } = await authClient.resetPassword({
      newPassword: data.newPassword,
      token,
    });

    if (error) {
      setError("root", { message: error.message || "Something went wrong" });
    } else {
      setSuccessMessage("Password has been reset. You'll be redirected to sign-in...");
      setTimeout(() => router.push("/sign-in"), 2000);
      reset();
    }
  }

  return (
    <Card className="m-auto w-full max-w-md">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="reset-password-new">New password</FieldLabel>
              <PasswordInput
                id="reset-password-new"
                placeholder="Password"
                aria-invalid={!!errors.newPassword}
                {...register("newPassword")}
              />
              {errors.newPassword && (
                <FieldError>{errors.newPassword.message}</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="reset-password-confirm">
                Confirm new password
              </FieldLabel>
              <PasswordInput
                id="reset-password-confirm"
                placeholder="Password"
                aria-invalid={!!errors.confirmNewPassword}
                {...register("confirmNewPassword")}
              />
              {errors.confirmNewPassword && (
                <FieldError>{errors.confirmNewPassword.message}</FieldError>
              )}
              {errors.root && <FieldError>{errors.root.message}</FieldError>}
              {successMessage && (
                <div role="status" className="text-center text-green-600">
                  {successMessage}
                </div>
              )}
            </Field>
            <LoadingButton
              loading={isSubmitting}
              disabled={!isValid && isSubmitted}
            >
              Reset Password
            </LoadingButton>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
