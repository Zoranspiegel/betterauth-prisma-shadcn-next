"use client";

import z from "zod";
import { LoadingButton } from "@/components/loading-button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

const emailFieldSchema = z.object({
  email: z.email("Please enter a valid email"),
});

type EmailField = z.infer<typeof emailFieldSchema>;

export default function ForgotPasswordForm() {
  const [sucessMessage, setSucessMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitted, isValid },
  } = useForm<EmailField>({
    resolver: zodResolver(emailFieldSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: EmailField) {
    const { error } = await authClient.requestPasswordReset({
      email: data.email,
      redirectTo: "/reset-password",
    });

    if (error) {
      setError("root", { message: error.message || "Something went wrong" });
    } else {
      setSucessMessage(
        "If an account exists for this email, we've sent a password reset link.",
      );
    }
  }

  return (
    <Card className="m-auto w-full max-w-md">
      <CardContent>
        <form id="forgot-password-form" onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <FieldLabel htmlFor="forgot-password-email">Email</FieldLabel>
            <Input
              id="forgot-password-email"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            {errors.email && <FieldError>{errors.email?.message}</FieldError>}
            {errors.root && <FieldError>{errors.root?.message}</FieldError>}
            {sucessMessage && (
              <div role="status" className="text-center text-green-600">
                {sucessMessage}
              </div>
            )}
            <LoadingButton
              loading={isSubmitting}
              disabled={!isValid && isSubmitted}
            >
              Send reset link
            </LoadingButton>
          </Field>
        </form>
      </CardContent>
    </Card>
  );
}
