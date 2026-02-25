"use server";

import { getUser } from "@/actions/getUser";
import { prisma } from "@/lib/prisma";

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
  const currentUser = await getUser();

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

//reservation(s) this listing has bee booked many times
async function getReservationsForSingleListing(listingId: string) {
  return await prisma.reservation.findMany({
    where: {
      listingId,
    },
  });
}

async function getAllMyReservation() {
  const currentUser = await getUser();
  if (!currentUser) {
    return;
  }

  return await prisma.reservation.findMany({
    where: {
      userId: currentUser.id,
    },
    include: {
      listing: true,
    },
  });
}

async function cancelMyReservation(reservationId: string) {
  await prisma.reservation.delete({
    where: {
      id: reservationId,
    },
  });
}
export {
  createReservation,
  getReservationsForSingleListing,
  getAllMyReservation,
  cancelMyReservation,
};
