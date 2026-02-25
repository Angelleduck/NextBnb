"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from "../hooks/useFavorite";
import { UserType } from "@/types/User";

interface HeartIconProps {
  user: UserType;
  listing_Id: string;
}
export default function HeartIcon({ user, listing_Id }: HeartIconProps) {
  const { hasFavorited, handleFavorite } = useFavorite(user, listing_Id);

  return (
    <div
      onClick={(e) => {
        //Here we are not using stopPropagation because there is not other onclick
        //so event won't propagate but there is a link,to which I prevent beheavior
        //When I click on icon
        e.preventDefault();
        // e.stopPropagation();
        handleFavorite(listing_Id);
      }}
      className="absolute top-[14px] right-[14px]"
    >
      <div className="relative">
        {/* superposing 2 icons */}
        <AiOutlineHeart
          size={28}
          className="fill-white absolute left-[-2px] top-[-2px] z-10"
        />
        <AiFillHeart
          size={24}
          className={`${
            hasFavorited ? "fill-red-500" : "fill-neutral-500"
          } cursor-pointer opacity-80`}
        />
      </div>
    </div>
  );
}
