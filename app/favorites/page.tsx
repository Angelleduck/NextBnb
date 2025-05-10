import { redirect } from "next/navigation";
import Container from "../_components/Container";
import getCurrentUser from "../actions/getCurrentUser";
import ListingCard from "../_components/ListingCard";
import { getFavoriteListing } from "../actions/listings";

export default async function Page() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/");
  }
  const favorites = await getFavoriteListing();
  return (
    <Container>
      <div className="mt-28 mb-24">
        <h3 className="text-2xl font-bold">Trips</h3>
        <p className="font-light text-neutral-500">
          Where you&apos;ve been and where you&apos;re going
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-7">
          {favorites?.map((favorite, idx) => (
            <ListingCard key={idx} user={currentUser} listing={favorite} />
          ))}
        </div>
      </div>
    </Container>
  );
}
