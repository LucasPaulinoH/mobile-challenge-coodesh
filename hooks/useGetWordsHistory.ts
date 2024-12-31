import { firebaseServices } from "@/services";
import { useState, useEffect } from "react";

export const useGetWordsHistory = (userId: string) => {
  const [wordsHistory, setWordsHistory] = useState<number[]>([]);

  const fetchUserWordsHistory = async () => {
    const wordsHistoryResponse = await firebaseServices.getWordsHistory(userId);
    setWordsHistory(wordsHistoryResponse?.history);
  };

  useEffect(() => {
    if (userId) fetchUserWordsHistory();
  }, [userId]);

  return wordsHistory;
};
