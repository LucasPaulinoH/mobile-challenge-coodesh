import { useEffect, useState } from "react";
import { firebaseServices } from "services/firebaseServices";

export const useGetFavoriteWords = (userId: string) => {
  const [favoriteWords, setFavoriteWords] = useState<number[] | null>(null);

  const fetchUserFavoriteWords = async () => {
    const favoriteWordsResponse =
      await firebaseServices.getUserFavoriteWords(userId);
    setFavoriteWords(favoriteWordsResponse?.favorites);
  };

  useEffect(() => {
    if (userId) fetchUserFavoriteWords();
  }, [userId]);

  return favoriteWords;
};
