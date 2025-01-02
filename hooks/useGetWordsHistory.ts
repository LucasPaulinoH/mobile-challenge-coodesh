import { useState, useEffect } from "react";
import {
  FIRESTORE_HISTORY_COLLECTION_NAME,
  firestoreServices,
} from "services/firestoreServices";

export const useGetWordsHistory = (userId: string) => {
  const [wordsHistory, setWordsHistory] = useState<number[] | null>(null);

  const fetchUserWordsHistory = async () => {
    const wordsHistoryResponse = await firestoreServices.getCollection(
      userId,
      FIRESTORE_HISTORY_COLLECTION_NAME,
    );
    setWordsHistory(wordsHistoryResponse?.history);
  };

  useEffect(() => {
    if (userId) fetchUserWordsHistory();
  }, [userId]);

  return wordsHistory;
};
