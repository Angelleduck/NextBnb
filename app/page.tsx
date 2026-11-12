import ListingContainer from "./_components/ListingContainer";
import type { ListingFilter } from "@/types/Listing";

interface PropsType {
  searchParams: Promise<ListingFilter>;
}

export default async function Home({ searchParams }: PropsType) {
  const data = await searchParams;
  return <ListingContainer searchParams={data} />;
}
