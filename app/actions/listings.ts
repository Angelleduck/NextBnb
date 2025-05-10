"use server";

import { prisma } from "@/libs/prisma";
import getCurrentUser from "./getCurrentUser";

interface DataProps {
  category: string;
  location: string;
  imageSrc: string;
  titleInput: string;
  description: string;
  price: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
}

export async function createListing(data: DataProps) {
  const user = await getCurrentUser();

  if (!user) return;

  const {
    titleInput: title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = data;

  await prisma.listing.create({
    data: {
      userId: user.id,
      category,
      bathroomCount,
      imageSrc,
      title,
      description,
      guestCount,
      location,
      roomCount,
      price,
    },
  });
}

export async function getListingById(listingId: string) {
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

export async function getListings(category: string) {
  if (category) {
    return await prisma.listing.findMany({
      where: {
        category,
      },
    });
  }
  return await prisma.listing.findMany();
}

export async function getFavoriteListing() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return;
  }
  if (currentUser.favoriteIds.length == 0) {
    return [];
  }

  const listings = await prisma.listing.findMany();
  const favorites = listings.filter((listing) =>
    currentUser.favoriteIds.includes(listing.id)
  );
  return favorites;
}

export async function getProperties() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return;
  }
  return await prisma.listing.findMany({
    where: {
      userId: currentUser.id,
    },
  });
}

export async function deleteProperty(propertyId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return;
  }
  return await prisma.listing.delete({
    where: {
      id: propertyId,
    },
  });
}
