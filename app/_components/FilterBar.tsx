"use client";

import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useFilterModal } from "../hooks/useFilterModal";
import getCountries from "@/lib/countries";
import { useSearchParams } from "next/navigation";

export function FilterBar() {
  const searchParams = useSearchParams();

  const valueLocation = searchParams.get("location") || "";
  const guestCount = searchParams.get("guestroomCount");

  const { onOpen } = useFilterModal();
  const { getByValue } = getCountries();

  const location = getByValue(valueLocation);

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
        Any Week
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
