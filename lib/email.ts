import { EmailVerification } from "@/template/emailVerification";
import { ResetPassword } from "@/template/resetPassword";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

export async function emailVerification(email: string, url: string) {
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "Email verification",
    html: EmailVerification(url),
  });

  if (error) {
    throw new Error(error.message);
  }
}
export async function resetPasswordEmail(email: string, token: string) {
  const link = `${process.env.BETTER_AUTH_URL}/auth/new-password?token=${token}`;

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "Reset your password",
    html: ResetPassword(link),
  });

  if (error) {
    throw new Error(error.message);
  }
}
