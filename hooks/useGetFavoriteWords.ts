import { firebaseServices } from "@/services";
import { useEffect, useState } from "react";

export const useGetFavoriteWords = (userId: string) => {
  const [favoriteWords, setFavoriteWords] = useState<number[]>([]);

  const fetchUserFavoriteWords = async () => {
    const favoriteWordsRespons = await firebaseServices.getUserFavoriteWords(
      userId
    );
    setFavoriteWords(favoriteWordsRespons?.favorites);
  };

  useEffect(() => {
    if (userId) fetchUserFavoriteWords();
  }, [userId]);

  return favoriteWords;
};
