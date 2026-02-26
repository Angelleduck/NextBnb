import type { UserType } from "@/types/User";
import { useEffect, useState } from "react";
import useLoginModal from "./useLoginModal";
import { addToFavorite, removeFromFavorite } from "../actions/updateFavoriteId";
import { useRouter } from "next/navigation";

export default function useFavorite(user: UserType, listing_Id: string) {
  const user_favoriteIds = user?.favoriteIds;

  const value = user_favoriteIds ? [...user_favoriteIds] : [];
  const [favoriteIds, setFavoriteIds] = useState(value);
  const [disable, setDisable] = useState(false);
  const loginModal = useLoginModal();
  const router = useRouter();

  useEffect(() => {
    setFavoriteIds(user?.favoriteIds ? [...user.favoriteIds] : []);
  }, [user]);

  const handleFavorite = async (id: string) => {
    if (!user) {
      loginModal.onOpen();
      return;
    }
    if (disable) return;
    if (favoriteIds.includes(id)) {
      //

      setDisable(true);
      setFavoriteIds((state) =>
        state.filter((existing_Id) => existing_Id !== id),
      );
      await removeFromFavorite(id);
      router.refresh();

      setDisable(false);

      //
    } else {
      //

      setDisable(true);

      setFavoriteIds((state) => [...state, id]);
      await addToFavorite(id);
      router.refresh();

      setDisable(false);
    }
  };

  const hasFavorited = favoriteIds.includes(listing_Id);

  return { hasFavorited, handleFavorite };
}
