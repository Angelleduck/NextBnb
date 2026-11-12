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
  guestCount?: string;
  roomCount?: string;
  bathroomCount?: string;
  startDate?: string;
  endDate?: string;
};
export type { ListingType, ListingFilter };
