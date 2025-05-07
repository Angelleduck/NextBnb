"use server";

import { prisma } from "@/libs/prisma";

export default async function getListingById(listingId: string) {
  const data = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
    include: {
      //Here need to include the user since we would need
      //to know who posted this listing
      user: true,
    },
  });
  return data;
}
