"use client";

import { useRouter } from "next/navigation";
import { cancelMyReservation } from "../actions/reservation";

interface CancelReservationProps {
  reservationId: string;
}

export default function CancelButton({
  reservationId,
}: CancelReservationProps) {
  const router = useRouter();
  return (
    <button
      onClick={async (e) => {
        e.preventDefault();
        await cancelMyReservation(reservationId);
        router.refresh();
      }}
      className="bg-primary w-full rounded-lg py-1 text-white"
    >
      Cancel reservation
    </button>
  );
}
