import { useQuery } from "@tanstack/react-query";
import {
  FIRESTORE_HISTORY_COLLECTION_NAME,
  firestoreServices,
} from "services/firestoreServices";

const fetchWordsHistory = async (userId: string) => {
  const wordsHistoryResponse = await firestoreServices.getCollection(
    userId,
    FIRESTORE_HISTORY_COLLECTION_NAME,
  );
  return wordsHistoryResponse?.history;
};

export const useGetWordsHistory = (userId: string) => {
  const { data } = useQuery({
    queryKey: ["wordsHistory", userId],
    queryFn: () => fetchWordsHistory(userId),
  });

  return { wordsHistory: data };
};
