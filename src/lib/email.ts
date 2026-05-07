import ResetPasswordEmailTemplate from "@/emails/reset-password-email-template";
import VerifyEmailTemplate from "@/emails/verify-email-template";
import { Resend } from "resend";

interface SendEmailValues {
  to: string;
  subject: string;
  username: string;
  url: string;
}

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY");
  }

  return new Resend(apiKey);
}

export async function sendVerificationEmail({
  to,
  subject,
  username,
  url,
}: SendEmailValues) {
  const resend = getResend();

  await resend.emails.send({
    from: `noreply@${process.env.RESEND_DOMAIN}`,
    to,
    subject,
    react: VerifyEmailTemplate({ username, url }),
  });
}

export async function sendResetPasswordEmail({
  to,
  subject,
  username,
  url,
}: SendEmailValues) {
  const resend = getResend();

  await resend.emails.send({
    from: `noreply@${process.env.RESEND_DOMAIN}`,
    to,
    subject,
    react: ResetPasswordEmailTemplate({ username, url }),
  });
}
