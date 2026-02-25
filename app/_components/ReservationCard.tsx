import Image from "next/image";
import Link from "next/link";
import HeartIcon from "./HeartIcon";
import getCountries from "@/lib/countries";
import listingType from "@/types/Listing";
import type { UserType } from "@/types/User";
import { dateFormat } from "@/helper/dateFormat";
import CancelButton from "../trips/CancelButton";

interface ReservationCardProps {
  reservationId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  listing: listingType;
  user: UserType;
}

export default async function ReservationCard({
  listing,
  user,
  startDate,
  endDate,
  totalPrice,
  reservationId,
}: ReservationCardProps) {
  const { getByValue } = getCountries();
  //after change to locationValue inside the db since it's a bit confusing
  const location = getByValue(listing.location);
  return (
    <Link href={`listings/${listing.id}`} className=" space-y-1 cursor-pointer">
      <div className="relative rounded-xl aspect-square overflow-hidden">
        <picture className="block w-full h-full relative">
          <Image
            src={listing.imageSrc}
            alt="listing image"
            fill
            className="object-cover object-center hover:scale-110 transition"
          />
        </picture>

        <HeartIcon user={user} listing_Id={listing.id} />
      </div>
      <h4 className="font-semibold text-lg overflow-hidden text-ellipsis whitespace-nowrap">
        {location?.region}, {location?.label}
      </h4>
      <p className="font-light text-neutral-500">
        {dateFormat(startDate)} - {dateFormat(endDate)}
      </p>
      <p className="font-semibold">$ {totalPrice}</p>
      <CancelButton reservationId={reservationId} />
    </Link>
  );
}
