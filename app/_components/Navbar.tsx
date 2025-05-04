import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import Logo from "./Logo";

import Categories from "./Categories";
import Container from "./Container";
import UserMenu from "./UserMenu";
import { User } from "@prisma/client";

interface currentUserProps {
  currentUser: User | null;
}

export default function Navbar({ currentUser }: currentUserProps) {
  return (
    <header className="shadow-sm fixed top-0 w-full bg-white z-20">
      <Container>
        <div className=" flex py-4 justify-between gap-3">
          <Logo />
          <div className="flex items-center border rounded-full py-2 cursor-pointer w-full min-[824px]:w-auto justify-between">
            <span className="text-sm font-semibold px-6">Anywhere</span>
            <span className="hidden sm:block text-sm font-semibold px-6 border-x flex-1 text-center">
              Any Week
            </span>
            <div className="flex items-center gap-3 pl-6 pr-2">
              <span className="hidden sm:block text-sm text-gray-600">
                Add Guests
              </span>
              <div className="bg-primary p-2 rounded-full text-white">
                <HiOutlineMagnifyingGlass />
              </div>
            </div>
          </div>

          <UserMenu currentUser={currentUser} />
        </div>
      </Container>
      <hr />
      <Categories />
    </header>
  );
}
