"use client";

import Image from "next/image";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import UserItem from "./UserItem";

export default function UserMenu() {
  const [active, SetActive] = useState(false);
  return (
    <div className="flex items-center gap-4 relative">
      <h3 className="hidden min-[824px]:block cursor-pointer font-semibold py-3 px-4 hover:bg-gray-100 rounded-full text-sm">
        Nextbnb your home
      </h3>
      <div
        onClick={() => SetActive((value) => !value)}
        className="p-4 flex items-center border rounded-full sm:py-1 sm:px-2 gap-3 cursor-pointer"
      >
        <AiOutlineMenu />

        <picture className="hidden sm:block ">
          <Image
            src="/images/placeholder.jpg"
            alt="user"
            width={30}
            height={30}
            className="rounded-full"
          />
        </picture>
      </div>
      {active && (
        <div className="absolute shadow-md right-0 top-12 w-[40vw] md:w-3/4 bg-white rounded-xl overflow-hidden text-sm font-semibold cursor-pointer">
          <UserItem>Login</UserItem>
          <UserItem>Sign up</UserItem>
        </div>
      )}
    </div>
  );
}
