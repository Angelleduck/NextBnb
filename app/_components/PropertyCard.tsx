import getCountries from "@/libs/countries";
import Image from "next/image";
import Link from "next/link";
import HeartIcon from "./HeartIcon";
import listingType from "@/types/Listing";
import UserType from "@/types/User";
import DeletePropertiesButton from "../properties/DeletePropertiesButton";

interface ListingProps {
  listing: listingType;
  user: UserType;
  propertyId: string;
}
export default function PropertyCard({
  listing,
  user,
  propertyId,
}: ListingProps) {
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
      <h4 className="font-semibold text-lg">
        {location?.region}, {location?.label}
      </h4>
      <p className="text-neutral-400 font-thin">{listing.category}</p>
      <p className="font-semibold">
        $ {listing.price} <span className="font-thin">night</span>
      </p>
      <DeletePropertiesButton propertyId={propertyId} />
    </Link>
  );
}
