"use client";

import GitHubBtn from "@/components/auth/GitHubBtn";
import GoogleBtn from "@/components/auth/GoogleBtn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";
import { signInSchema, type SigninFields } from "@/lib/validations/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SignInForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFields>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  function onSubmit(data: SigninFields) {
    toast("Logged In", {
      description: (
        <div className="pt-2">
          <p>
            <span className="font-bold">Email: </span>
            {data.email}
          </p>
          <p>
            <span className="font-bold">Password: </span>
            {data.password}
          </p>
          <p>
            <span className="font-bold">Remember me: </span>
            {data.rememberMe ? "True" : "False"}
          </p>
        </div>
      ),
    });
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="signin-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="signin-email">Email</FieldLabel>
              <Input
                id="signin-email"
                type="email"
                placeholder="your@email"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>

            <Field>
              <div className="flex justify-between">
                <FieldLabel htmlFor="signin-pasword">Password</FieldLabel>
                <Link
                  href="/sign-up"
                  className="text-muted-foreground underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <PasswordInput
                id="signin-pasword"
                placeholder="Password..."
                aria-invalid={!!errors.password}
                {...register("password")}
              />
              {errors.password && (
                <FieldError>{errors.password.message}</FieldError>
              )}
            </Field>

            <Controller
              control={control}
              name="rememberMe"
              render={({ field, fieldState }) => (
                <Field orientation="horizontal">
                  <Checkbox
                    id="signin-rememberme"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FieldLabel htmlFor="signin-rememberme">
                    Remember me
                  </FieldLabel>
                  {fieldState.invalid && (
                    <FieldError>{fieldState.error?.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Button form="signin-form">Login</Button>
            <Field>
              <GoogleBtn />
              <GitHubBtn />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-muted-foreground text-center text-xs">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
