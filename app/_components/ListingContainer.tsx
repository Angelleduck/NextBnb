import Container from "./Container";
import getCurrentUser from "../actions/getCurrentUser";
import ListingCard from "./ListingCard";
import { getListings } from "../actions/listings";

export default async function ListingContainer() {
  const listings = await getListings();
  const user = await getCurrentUser();

  return (
    <Container>
      <div className="mt-[200px] mb-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-7">
        {listings.map((listing, idx) => (
          <ListingCard key={idx} listing={listing} user={user} />
        ))}
      </div>
    </Container>
  );
}
