import { useQuery } from "@tanstack/react-query";
import {
  FIRESTORE_FAVORITES_COLLECTION_NAME,
  firestoreServices,
} from "services/firestoreServices";

const fetchFavoriteWords = async (userId: string) => {
  const favoriteWordsResponse = await firestoreServices.getCollection(
    userId,
    FIRESTORE_FAVORITES_COLLECTION_NAME,
  );
  return favoriteWordsResponse?.favorites;
};

export const useGetFavoriteWords = (userId: string) => {
  const { data } = useQuery({
    queryKey: ["favoriteWords", userId],
    queryFn: () => fetchFavoriteWords(userId),
    retry: 1,
  });

  return { favoriteWords: data };
};
