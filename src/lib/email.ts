import ResetPasswordEmailTemplate from "@/emails/reset-password-email-template";
import VerifyEmailTemplate from "@/emails/verify-email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailValues {
  to: string;
  subject: string;
  username: string;
  url: string;
}

export async function sendVerificationEmail({
  to,
  subject,
  username,
  url,
}: SendEmailValues) {
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
  await resend.emails.send({
    from: `noreply@${process.env.RESEND_DOMAIN}`,
    to,
    subject,
    react: ResetPasswordEmailTemplate({ username, url }),
  });
}
