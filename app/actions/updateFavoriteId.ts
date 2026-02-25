"use server";

import { getUser } from "@/actions/getUser";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { cookies, headers } from "next/headers";

async function removeFromFavorite(id: string) {
  const user = await getUser();
  if (!user?.favoriteIds) return;

  let favoriteIds = [...user.favoriteIds];
  favoriteIds = favoriteIds.filter((currentIds) => currentIds !== id);

  //issue with !, prisma email set to null
  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      favoriteIds: favoriteIds,
    },
  });

  await deleteCookie();
}

async function addToFavorite(id: string) {
  try {
    const user = await getUser();
    if (!user?.favoriteIds) return;

    const favoriteIds = [...user.favoriteIds, id];

    //issue with !, prisma email set to null
    // await prisma.user.update({
    //   where: {
    //     email: user.email,
    //   },
    //   data: {
    //     favoriteIds: favoriteIds,
    //   },
    // });

    await auth.api.updateUser({
      headers: await headers(),
      body: {
        favoriteIds,
      },
    });
    await deleteCookie();
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("better-auth.session_data");
}

export { addToFavorite, removeFromFavorite };
