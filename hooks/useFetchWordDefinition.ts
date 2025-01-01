import { useEffect, useState } from "react";
import { apiServices } from "services";

import useSelectedWord from "./useSelectedWord";

export const useFetchWordDefinition = () => {
  const { selectedWord } = useSelectedWord();
  const [wordDefinition, setWordDefinition] = useState<any | null>(null);

  const fetchWordDefinition = async () => {
    try {
      const definitionResponse = await apiServices.getWordDefinition(
        selectedWord!.toLowerCase(),
      );
      console.log(definitionResponse[0]);

      setWordDefinition(definitionResponse[0]);
    } catch (error) {
      console.error("error fetching word: ", error);
    }
  };

  useEffect(() => {
    if (selectedWord && selectedWord.length > 0) fetchWordDefinition();
  }, []);

  return { wordDefinition };
};
