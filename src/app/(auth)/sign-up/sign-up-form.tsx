"use client";

import { LoadingButton } from "@/components/loading-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";
import { authClient } from "@/lib/auth-client";
import {
  signupFieldsSchema,
  type SignupFields,
} from "@/lib/validations/sign-up";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SignUpForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitted, isSubmitting },
  } = useForm<SignupFields>({
    resolver: zodResolver(signupFieldsSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  async function onSubmit({ name, email, password }: SignupFields) {
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: "/email-verified",
    });

    if (error) {
      console.log(error);
      setError("root", { message: error.message || "Something went wrong" });
    } else {
      toast.success("Signed up successfully");
      router.push("/dashboard");
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="signup-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="signup-name">Name</FieldLabel>
              <Input
                {...register("name")}
                type="text"
                id="signup-name"
                aria-invalid={!!errors.name}
                placeholder="John Doe"
              />
              {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="submit-email">Email</FieldLabel>
              <Input
                {...register("email")}
                type="email"
                id="submit-email"
                aria-invalid={!!errors.email}
                placeholder="your@email.com"
              />
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="submit-password">Password</FieldLabel>
              <PasswordInput
                {...register("password")}
                id="submit-password"
                aria-invalid={!!errors.password}
                placeholder="Password..."
              />
              {errors.password && (
                <FieldError>{errors.password.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="submit-confirm-password">
                Confirm Password
              </FieldLabel>
              <PasswordInput
                {...register("passwordConfirmation")}
                id="submit-confirm-password"
                aria-invalid={!!errors.passwordConfirmation}
                placeholder="Confirm password..."
              />
              {errors.passwordConfirmation && (
                <FieldError>{errors.passwordConfirmation.message}</FieldError>
              )}
            </Field>

            <LoadingButton
              form="signup-form"
              loading={isSubmitting}
              disabled={!isValid && isSubmitted}
            >
              Submit
            </LoadingButton>

            {errors.root && (
              <FieldError className="text-center">
                {errors.root.message}
              </FieldError>
            )}
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-muted-foreground text-center text-xs">
          Already have an account?{" "}
          <Link href="/sign-in" className="underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
