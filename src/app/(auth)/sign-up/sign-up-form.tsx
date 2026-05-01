"use client";

import { Button } from "@/components/ui/button";
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
import {
  signupFieldsSchema,
  type SignupFields,
} from "@/lib/validations/sign-up";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFields>({
    resolver: zodResolver(signupFieldsSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  function onSubmit(data: SignupFields) {
    toast(`Username: ${data.name}`);
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
        <form id="submit-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="signup-name">Name</FieldLabel>
              <Input
                {...register("name")}
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

            <Button type="submit" form="submit-form">
              Submit
            </Button>
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
