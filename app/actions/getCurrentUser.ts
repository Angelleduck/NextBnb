"use server";

import { auth } from "@/auth";
import { prisma } from "@/libs/prisma";
import { User } from "@prisma/client";

export default async function getCurrentUser(): Promise<User | null> {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  return currentUser;
}
