import Container from "./Container";
import ListingCard from "./ListingCard";
import { getListings } from "../actions/listings";
import EmptyState from "./EmptyState";
import { getUser } from "@/actions/getUser";

interface PropsType {
  searchParams: {
    category: string;
  };
}

export default async function ListingContainer({ searchParams }: PropsType) {
  const [listings, user] = await Promise.all([
    getListings(searchParams),
    getUser(),
  ]);

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

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
