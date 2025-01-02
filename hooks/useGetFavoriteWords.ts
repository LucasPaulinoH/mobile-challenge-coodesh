import { useEffect, useState } from "react";
import {
  FIRESTORE_FAVORITES_COLLECTION_NAME,
  firestoreServices,
} from "services/firestoreServices";

export const useGetFavoriteWords = (userId: string) => {
  const [favoriteWords, setFavoriteWords] = useState<number[] | null>(null);

  const fetchUserFavoriteWords = async () => {
    const favoriteWordsResponse = await firestoreServices.getCollection(
      userId,
      FIRESTORE_FAVORITES_COLLECTION_NAME,
    );
    setFavoriteWords(favoriteWordsResponse?.favorites!);
  };

  useEffect(() => {
    if (userId) fetchUserFavoriteWords();
  }, [userId]);

  return favoriteWords;
};
