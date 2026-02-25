"use client";

import { useState } from "react";
import Calendar from "../_components/Calendar";
import type { Range } from "react-date-range";
import { createReservation } from "../actions/reservation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import type { UserType } from "@/types/User";
import useLoginModal from "../hooks/useLoginModal";

interface ReservationProps {
  disabledDates: Date[];
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
  const [totalPrice, setTotalPrice] = useState(price);
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
    const toastId = toast.loading("Loading...");
    try {
      const obj = {
        listingId,
        startDate: state[0].startDate,
        endDate: state[0].endDate,
        totalPrice,
      };
      await createReservation(obj);

      toast.success("Booked !", {
        id: toastId,
      });
      router.push("/trips");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("please try again", {
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
        disabledDates={disabledDates}
        handleTotalPrice={setTotalPrice}
        state={state}
        setState={setState}
      />
      <hr />
      <div className="p-4">
        <button
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
