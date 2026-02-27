import Logo from "./Logo";

import Categories from "./Categories";
import Container from "./Container";
import UserMenu from "./User/UserMenu";
import { getUser } from "@/actions/getUser";
import { FilterBar } from "./FilterBar";

export default async function Navbar() {
  const currentUser = await getUser();

  return (
    <header className="shadow-sm fixed top-0 w-full bg-white z-20">
      <Container>
        <div className=" flex py-4 justify-between gap-3">
          <Logo />
          <FilterBar />
          <UserMenu currentUser={currentUser} />
        </div>
      </Container>
      <hr />
      <Categories />
    </header>
  );
}
