import Logo from "./Logo";

import Categories from "./Categories";
import Container from "./Container";
import UserMenu from "./User/UserMenu";
import { FilterBar } from "./FilterBar";
import { Suspense } from "react";

export default async function Navbar() {
  return (
    <header className="shadow-sm fixed top-0 w-full bg-white z-20">
      <Container>
        <div className=" flex py-4 justify-between gap-3">
          <Logo />
          <Suspense fallback={null}>
            <FilterBar />
          </Suspense>
          <UserMenu />
        </div>
      </Container>
      <hr />
      <Suspense fallback={null}>
        <Categories />
      </Suspense>
    </header>
  );
}
