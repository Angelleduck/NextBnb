"use server";

import { getUser } from "@/actions/getUser";
import { prisma } from "@/lib/prisma";
import type { ListingFilter } from "@/types/Listing";

interface DataProps {
  category: string;
  location: string;
  imageSrc: string;
  title: string;
  description: string;
  price: number;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
}

export async function createListing(data: DataProps) {
  const user = await getUser();

  if (!user) return;

  const {
    title,
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

export async function getListings(data: ListingFilter) {
  const query: ListingFilter = {};
  const { category, bathroomCount, guestCount, roomCount, location } = data;
  if (category) query.category = category;
  if (bathroomCount) {
    query.bathroomCount = {
      gte: +bathroomCount,
    };
  }
  if (guestCount) {
    query.guestCount = {
      gte: +guestCount,
    };
  }
  if (roomCount) {
    query.roomCount = {
      gte: +roomCount,
    };
  }
  if (location) query.location = location;

  return await prisma.listing.findMany({
    where: query,
  });
}

export async function getFavoriteListing() {
  const user = await getUser();
  if (!user) {
    return;
  }
  if (user?.favoriteIds?.length == 0) {
    return [];
  }

  const listings = await prisma.listing.findMany();
  const favorites = listings.filter((listing) =>
    user?.favoriteIds?.includes(listing.id),
  );
  return favorites;
}

export async function getProperties() {
  const user = await getUser();
  if (!user) {
    return;
  }
  return await prisma.listing.findMany({
    where: {
      userId: user.id,
    },
  });
}

export async function deleteProperty(propertyId: string) {
  const user = await getUser();
  if (!user) {
    return;
  }
  return await prisma.listing.delete({
    where: {
      id: propertyId,
    },
  });
}
