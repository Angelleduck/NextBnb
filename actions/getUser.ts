"use server";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { cache } from "react";

const getUser = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user;
});

export { getUser };
