"use server";

import { prisma } from "@/libs/prisma";
import getCurrentUser from "./getCurrentUser";

//issue: handle the error

interface ReservationProps {
  listingId: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  totalPrice: number;
}

async function createReservation({
  listingId,
  startDate,
  endDate,
  totalPrice,
}: ReservationProps) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return;
  if (!startDate || !endDate) return;

  await prisma.reservation.create({
    data: {
      userId: currentUser.id,
      listingId,
      startDate,
      endDate,
      totalPrice,
    },
  });
}

async function getReservations(listingId: string) {
  return await prisma.reservation.findMany({
    where: {
      listingId,
    },
  });
}
export { createReservation, getReservations };
