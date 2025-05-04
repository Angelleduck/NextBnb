import getListings from "../actions/getListings";
import Container from "./Container";
import getCurrentUser from "../actions/getCurrentUser";
import ListingCard from "./ListingCard";

export default async function ListingContainer() {
  const listings = await getListings();
  const user = await getCurrentUser();

  return (
    <Container>
      <div className="mt-[178px] grid grid-cols-6 gap-7">
        {listings.map((listing, idx) => (
          <ListingCard key={idx} listing={listing} user={user} />
        ))}
      </div>
    </Container>
  );
}
