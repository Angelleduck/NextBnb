"use server";

import { getUser } from "@/actions/getUser";
import { prisma } from "@/lib/prisma";

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
}

async function addToFavorite(id: string) {
  try {
    const user = await getUser();
    if (!user?.favoriteIds) return;

    const favoriteIds = [...user.favoriteIds, id];

    // issue with !, prisma email set to null
    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        favoriteIds: favoriteIds,
      },
    });

    // await auth.api.updateUser({
    //   headers: await headers(),
    //   body: {
    //     favoriteIds,
    //   },
    // });
  } catch (error) {
    console.log(error);
  }
}

export { addToFavorite, removeFromFavorite };
