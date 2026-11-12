"use client";

import { useState } from "react";
import { differenceInCalendarDays, format, parseISO } from "date-fns";
import Calendar from "../_components/Calendar";
import type { Range } from "react-date-range";
import { createReservation } from "../actions/reservation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import type { UserType } from "@/types/User";
import useLoginModal from "../hooks/useLoginModal";

interface ReservationProps {
  disabledDates: string[];
  price: number;
  listingId: string;
  currentUser: UserType;
}

export default function ReservationSection({
  disabledDates,
  price,
  listingId,
  currentUser,
}: ReservationProps) {
  const login = useLoginModal();
  const [totalPrice, setTotalPrice] = useState(0);
  const bookedDates = disabledDates.map((date) => parseISO(date));
  const router = useRouter();
  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  async function handleReservation() {
    if (!currentUser) {
      login.onOpen();
      return;
    }
    if (
      !state[0].startDate ||
      !state[0].endDate ||
      differenceInCalendarDays(state[0].endDate, state[0].startDate) < 1
    ) {
      toast.error("Please select at least one night.");
      return;
    }
    const toastId = toast.loading("Loading...");
    try {
      const obj = {
        listingId,
        startDate: format(state[0].startDate, "yyyy-MM-dd"),
        endDate: format(state[0].endDate, "yyyy-MM-dd"),
      };
      await createReservation(obj);
      toast.success("Booked !", {
        id: toastId,
      });
      router.push("/trips");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Please try again", {
        id: toastId,
      });
    }
  }
  return (
    <>
      <div className="flex p-4 gap-1 items-center">
        <p className="font-semibold text-2xl">$ {price}</p>
        <span className="font-light text-neutral-600">night</span>
      </div>
      <hr />
      <Calendar
        price={price}
        disabledDates={bookedDates}
        handleTotalPrice={setTotalPrice}
        state={state}
        setState={setState}
      />
      <hr />
      <div className="p-4">
        <button
          type="button"
          onClick={handleReservation}
          className="bg-[#64a7ff] w-full py-3 rounded-lg hover:opacity-80 text-white font-semibold transition"
        >
          Reserve
        </button>
      </div>
      <hr />
      <div className="flex justify-between p-4 font-semibold text-lg">
        <p>Total</p>
        <p>$ {totalPrice}</p>
      </div>
    </>
  );
}
