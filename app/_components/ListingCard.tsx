import getCountries from "@/libs/countries";
import Image from "next/image";
import HeartIcon from "./HeartIcon";
import UserType from "@/types/User";
import listingType from "@/types/Listing";

interface ListingProps {
  listing: listingType;
  user: UserType;
}

export default function ListingCard({ listing, user }: ListingProps) {
  const { getByValue } = getCountries();
  //after change to locationValue since it's a bit confusing
  const location = getByValue(listing.location);

  return (
    <div className=" space-y-1 cursor-pointer">
      <div className="bg-blue-400 relative rounded-xl aspect-square overflow-hidden">
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
    </div>
  );
}
