type UserType =
  | {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      email: string;
      emailVerified: boolean;
      name: string;
      image?: string | null | undefined;
      favoriteIds?: string[] | null | undefined;
    }
  | undefined;
export type { UserType };
