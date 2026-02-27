import getCountries from "@/lib/countries";
import HeartIcon from "./HeartIcon";
import type { ListingType } from "@/types/Listing";
import Link from "next/link";
import type { UserType } from "@/types/User";

interface ListingProps {
  listing: ListingType;
  user?: UserType;
}

export default function ListingCard({ listing, user }: ListingProps) {
  const { getByValue } = getCountries();
  //after change to locationValue inside the db since it's a bit confusing
  const location = getByValue(listing.location);

  return (
    <Link href={`listings/${listing.id}`} className=" space-y-1 cursor-pointer">
      <div className="relative rounded-xl aspect-square overflow-hidden">
        <picture className="block w-full h-full relative">
          <img
            src={listing.imageSrc}
            alt="listing image"
            className="object-cover object-center h-full w-full hover:scale-110 transition"
          />
        </picture>

        <HeartIcon user={user} listing_Id={listing.id} />
      </div>
      <h4 className="font-semibold text-lg overflow-hidden text-ellipsis whitespace-nowrap">
        {location?.region}, {location?.label}
      </h4>
      <p className="text-neutral-400 font-thin">{listing.category}</p>
      <p className="font-semibold">
        $ {listing.price} <span className="font-thin">night</span>
      </p>
    </Link>
  );
}
