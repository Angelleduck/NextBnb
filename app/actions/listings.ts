"use server";

import { getUser } from "@/actions/getUser";
import { prisma } from "@/lib/prisma";
import {
  getReservationNights,
  parseReservationDate,
} from "@/lib/reservationDates";
import type { Prisma } from "@/prisma/generated/prisma/client";
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

  if (
    !Number.isInteger(data.price) ||
    data.price < 1 ||
    ![data.guestCount, data.roomCount, data.bathroomCount].every(
      (count) => Number.isInteger(count) && count >= 1,
    )
  ) {
    throw new Error("A listing needs a valid price and capacity.");
  }

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
  const query: Prisma.ListingWhereInput = {};
  const {
    category,
    bathroomCount,
    guestCount,
    roomCount,
    location,
    startDate,
    endDate,
  } = data;
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

  if (startDate && endDate) {
    try {
      const checkIn = parseReservationDate(startDate);
      const checkOut = parseReservationDate(endDate);
      getReservationNights(checkIn, checkOut);
      query.reservations = {
        none: {
          startDate: { lt: checkOut },
          endDate: { gt: checkIn },
        },
      };
    } catch {
      // Ignore invalid dates in manually edited URLs.
    }
  }

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
    throw new Error("You must be logged in to delete a property.");
  }
  return await prisma.listing.deleteMany({
    where: {
      id: propertyId,
      userId: user.id,
    },
  });
}
