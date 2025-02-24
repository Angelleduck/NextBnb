"use client";

import Image from "next/image";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import UserItem from "./UserItem";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

interface currentUserProps {
  currentUser: User | null;
}
export default function UserMenu({ currentUser }: currentUserProps) {
  const [isOpen, SetIsOpen] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  return (
    <div className="flex items-center gap-4 relative">
      <h3 className="hidden min-[824px]:block cursor-pointer font-semibold py-3 px-4 hover:bg-gray-100 rounded-full text-sm">
        Nextbnb your home
      </h3>
      <div
        onClick={() => SetIsOpen((value) => !value)}
        className="p-4 flex items-center border rounded-full sm:py-1 sm:px-2 gap-3 cursor-pointer"
      >
        <AiOutlineMenu />

        <picture className="hidden sm:block">
          {currentUser ? (
            <div className="bg-red-600 h-[30px] w-[30px] rounded-full"></div>
          ) : (
            <Image
              src="/images/placeholder.jpg"
              alt="user"
              width={30}
              height={30}
              className="rounded-full"
            />
          )}
        </picture>
      </div>
      {isOpen && (
        <div className="absolute shadow-md right-0 top-12 w-[40vw] md:w-3/4 bg-white rounded-xl overflow-hidden text-sm font-semibold cursor-pointer">
          {currentUser ? (
            <>
              <UserItem onClick={() => {}}>trips</UserItem>
              <hr />
              <UserItem onClick={signOut}>Log out</UserItem>
            </>
          ) : (
            <>
              <UserItem
                onClick={() => {
                  loginModal.onOpen();
                  SetIsOpen(false);
                }}
              >
                Login
              </UserItem>
              <UserItem
                onClick={() => {
                  registerModal.onOpen();
                  SetIsOpen(false);
                }}
              >
                Sign up
              </UserItem>
            </>
          )}
        </div>
      )}
    </div>
  );
}
