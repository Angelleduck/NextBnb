import ListingContainer from "./_components/ListingContainer";

interface PropsType {
  searchParams: Promise<{
    category: string;
  }>;
}

export default async function Home({ searchParams }: PropsType) {
  const data = await searchParams;
  return <ListingContainer searchParams={data} />;
}
