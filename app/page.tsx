import ListingContainer from "./_components/ListingContainer";

interface PropsType {
  params: {
    listingId: string;
  };
  searchParams: {
    category: string;
  };
}

export default function Home({ searchParams }: PropsType) {
  return <ListingContainer searchParams={searchParams} />;
}
