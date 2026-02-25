import ListingContainer from "./_components/ListingContainer";

interface PropsType {
  params: {
    listingId: string;
  };
  searchParams: Promise<{
    category: string;
  }>;
}

export default async function Home({ searchParams }: PropsType) {
  const params = await searchParams;
  return <ListingContainer searchParams={params} />;
}
