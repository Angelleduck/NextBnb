"use server";

import getCurrentUser from "./getCurrentUser";
import { prisma } from "@/libs/prisma";

async function removeFromFavorite(id: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return;

  let favoriteIds = [...currentUser.favoriteIds];
  favoriteIds = favoriteIds.filter((currentIds) => currentIds !== id);

  //issue with !, prisma email set to null
  await prisma.user.update({
    where: {
      email: currentUser.email!,
    },
    data: {
      favoriteIds: favoriteIds,
    },
  });
}
async function addToFavorite(id: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return;

  const favoriteIds = [...currentUser.favoriteIds, id];

  //issue with !, prisma email set to null
  await prisma.user.update({
    where: {
      email: currentUser.email!,
    },
    data: {
      favoriteIds: favoriteIds,
    },
  });
}

export { addToFavorite, removeFromFavorite };
