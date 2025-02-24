"use server";

import { prisma } from "@/libs/prisma";
import bcrypt from "bcryptjs";

export default async function registerAction(formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;

  try {
    const isEmailExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isEmailExist) {
      throw new Error("Email already exists");
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedpassword,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: "email already exist" };
  }
}
