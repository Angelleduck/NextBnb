import { redirect } from "next/navigation";
import Container from "../_components/Container";
import getCurrentUser from "../actions/getCurrentUser";
import ListingCard from "../_components/ListingCard";
import { getFavoriteListing } from "../actions/listings";
import EmptyState from "../_components/EmptyState";

export default async function Page() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/");
  }
  const favorites = await getFavoriteListing();
  if (favorites?.length == 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings."
      />
    );
  }
  return (
    <Container>
      <div className="mt-28 mb-24">
        <h3 className="text-2xl font-bold mb-1">Favorites</h3>
        <p className="font-light text-neutral-500 mb-8">
          List of places you have favorited!
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
