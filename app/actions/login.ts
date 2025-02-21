"use server";
import { signIn } from "@/auth";

export default async function loginAction(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: "Invalid credentials" };
  }
}
