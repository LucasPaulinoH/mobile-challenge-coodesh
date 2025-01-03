import { useQuery } from "@tanstack/react-query";
import { apiServices } from "services/apiServices";

import useSelectedWord from "./useSelectedWord";

export const useFetchWordDefinition = () => {
  const { selectedWord } = useSelectedWord();

  const { data: wordDefinition, isLoading } = useQuery({
    queryKey: ["wordDefinition", selectedWord],
    queryFn: async () => {
      if (!selectedWord || selectedWord.length === 0) return null;

      const response = await apiServices.GetWordDefinition(
        selectedWord.toLowerCase(),
      );
      return response[0] || response[1];
    },
    retry: 1,
  });

  return { wordDefinition, isLoading };
};
