"use server";

import { prisma } from "@/libs/prisma";

export default async function getListings() {
  const data = await prisma.listing.findMany();
  return data;
}
