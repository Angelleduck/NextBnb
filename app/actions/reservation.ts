"use server";

import { getUser } from "@/actions/getUser";
import { prisma } from "@/lib/prisma";
import { getReservationNights, parseReservationDate } from "@/lib/reservationDates";

interface ReservationProps {
  listingId: string;
  startDate: string;
  endDate: string;
}

async function createReservation({
  listingId,
  startDate: startDay,
  endDate: endDay,
}: ReservationProps) {
  const currentUser = await getUser();

  if (!currentUser) throw new Error("You must be logged in to book a stay.");
  const startDate = parseReservationDate(startDay);
  const endDate = parseReservationDate(endDay);
  const nights = getReservationNights(startDate, endDate);

  // The local date can be yesterday in UTC when it is already today for a guest.
  const now = new Date();
  const earliestDay = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() - 1,
  );
  if (startDate.getTime() < earliestDay) {
    throw new Error("Please select future dates.");
  }

  return await prisma.$transaction(async (tx) => {
    // Serialize reservations for this listing before checking availability.
    await tx.$queryRaw`SELECT pg_advisory_xact_lock(hashtext(${listingId}))`;

    const listing = await tx.listing.findUnique({ where: { id: listingId } });
    if (!listing) throw new Error("This listing is no longer available.");
    if (!Number.isInteger(listing.price) || listing.price < 1) {
      throw new Error("This listing has an invalid nightly price.");
    }
    if (listing.userId === currentUser.id) {
      throw new Error("You cannot book your own property.");
    }

    const conflict = await tx.reservation.findFirst({
      where: {
        listingId,
        startDate: { lt: endDate },
        endDate: { gt: startDate },
      },
    });
    if (conflict) throw new Error("These dates are no longer available.");

    return await tx.reservation.create({
      data: {
        userId: currentUser.id,
        listingId,
        startDate,
        endDate,
        totalPrice: listing.price * nights,
      },
    });
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
  const currentUser = await getUser();
  if (!currentUser) {
    throw new Error("You must be logged in to cancel a reservation.");
  }

  return await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      userId: currentUser.id,
    },
  });
}
export {
  createReservation,
  getReservationsForSingleListing,
  getAllMyReservation,
  cancelMyReservation,
};
