type ListingType = {
  id: string;
  userId: string;
  category: string;
  location: string;
  imageSrc: string;
  title: string;
  description: string;
  price: number;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
};

type ListingFilter = {
  category?: string;
  location?: string;
  guestCount?: number | { gte: number };
  roomCount?: number | { gte: number };
  bathroomCount?: number | { gte: number };
};
export type { ListingType, ListingFilter };
