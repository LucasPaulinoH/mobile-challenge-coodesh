import { useState, useEffect } from "react";
import { firebaseServices } from "services/firebaseServices";

export const useGetWordsHistory = (userId: string) => {
  const [wordsHistory, setWordsHistory] = useState<number[] | null>(null);

  const fetchUserWordsHistory = async () => {
    const wordsHistoryResponse = await firebaseServices.getWordsHistory(userId);
    setWordsHistory(wordsHistoryResponse?.history);
  };

  useEffect(() => {
    if (userId) fetchUserWordsHistory();
  }, [userId]);

  return wordsHistory;
};
