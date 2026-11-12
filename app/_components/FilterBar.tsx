"use client";

import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useFilterModal } from "../hooks/useFilterModal";
import getCountries from "@/lib/countries";
import { useSearchParams } from "next/navigation";
import { format, isValid, parseISO } from "date-fns";

export function FilterBar() {
  const searchParams = useSearchParams();

  const valueLocation = searchParams.get("location") || "";
  const guestCount = searchParams.get("guestCount");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const { onOpen } = useFilterModal();
  const { getByValue } = getCountries();

  const location = getByValue(valueLocation);
  const checkIn = startDate ? parseISO(startDate) : null;
  const checkOut = endDate ? parseISO(endDate) : null;
  const dates =
    startDate &&
    endDate &&
    /^\d{4}-\d{2}-\d{2}$/.test(startDate) &&
    /^\d{4}-\d{2}-\d{2}$/.test(endDate) &&
    checkIn &&
    checkOut &&
    isValid(checkIn) &&
    isValid(checkOut) &&
    checkOut > checkIn
      ? `${format(
          checkIn,
          checkIn.getFullYear() === checkOut.getFullYear() ? "MMM d" : "MMM d, yyyy",
        )} - ${format(checkOut, "MMM d, yyyy")}`
      : "Any Week";

  return (
    <div
      onClick={onOpen}
      className="flex items-center border rounded-full py-2 shadow-sm hover:shadow-md transition
    cursor-pointer w-full min-[824px]:w-auto justify-between"
    >
      <span className="text-sm font-semibold px-6">
        {location ? location.label : "Anywhere"}
      </span>
      <span className="hidden sm:block text-sm font-semibold px-6 border-x flex-1 text-center">
        {dates}
      </span>
      <div className="flex items-center gap-3 pl-6 pr-2">
        <span className="hidden sm:block text-sm text-gray-600">
          {guestCount ? `${guestCount} Guests` : "Add Guests"}
        </span>
        <div className="bg-primary p-2 rounded-full text-white">
          <HiOutlineMagnifyingGlass />
        </div>
      </div>
    </div>
  );
}
