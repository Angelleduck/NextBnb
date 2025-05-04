import { useState } from "react";

export default function useFavorite(
  user_favoriteIds: string[] | undefined,
  listing_Id: string
) {
  const value = user_favoriteIds ? [...user_favoriteIds] : [];
  const [favoriteIds, setfavoriteIds] = useState(value);

  const handleFavorite = (id: string) => {
    if (favoriteIds.includes(id)) {
      setfavoriteIds((state) =>
        state.filter((existing_Id) => existing_Id !== id)
      );
    } else {
      setfavoriteIds((state) => [...state, id]);
    }
  };

  const hasFavorited = favoriteIds.includes(listing_Id);

  return { hasFavorited, handleFavorite };
}
