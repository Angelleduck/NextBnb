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

export default async function createListing(data: DataProps) {
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
  console.log(data);
}
