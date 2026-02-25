"use client";

import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useCreateRentModal from "@/app/hooks/useCreateRentModal";
import UserLogo from "./UserLogo";
import UserItem from "./UserItem";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/logout";
import type { UserType } from "@/types/User";

interface currentUserProps {
  currentUser: UserType;
}
export default function UserMenu({ currentUser }: currentUserProps) {
  const [isOpen, SetIsOpen] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const CreateRentModal = useCreateRentModal();
  const router = useRouter();

  function onRent() {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    CreateRentModal.onOpen();
  }

  async function signOut() {
    await logout();
    router.refresh();
  }

  return (
    <div className="flex items-center gap-4 relative">
      <h3
        onClick={onRent}
        className="hidden min-[824px]:block cursor-pointer font-semibold py-3 px-4 hover:bg-gray-100 rounded-full text-sm"
      >
        Nextbnb your home
      </h3>
      <div
        onClick={() => SetIsOpen((value) => !value)}
        className="p-4 flex items-center border rounded-full sm:py-1 sm:px-2 gap-3 cursor-pointer"
      >
        <AiOutlineMenu />

        <picture className="hidden sm:block">
          <UserLogo />
        </picture>
      </div>
      {isOpen && (
        <div className="absolute shadow-md right-0 top-12 w-[40vw] md:w-3/4 bg-white rounded-xl overflow-hidden text-sm font-semibold cursor-pointer">
          {currentUser ? (
            <>
              <UserItem
                onClick={() => {
                  router.push("/trips");
                }}
              >
                trips
              </UserItem>
              <UserItem
                onClick={() => {
                  router.push("/favorites");
                }}
              >
                favorites
              </UserItem>
              <UserItem
                onClick={() => {
                  router.push("/properties");
                }}
              >
                properties
              </UserItem>
              <UserItem onClick={() => CreateRentModal.onOpen()}>
                Airbnb my home
              </UserItem>
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
