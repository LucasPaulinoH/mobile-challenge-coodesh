import { SelectedWordContext } from "@/context/SelectedWord";
import { apiServices } from "@/services";
import { useContext, useEffect, useState } from "react";

export const useFetchWordDefinition = () => {
  const { selectedWord } = useContext(SelectedWordContext);
  const [wordDefinition, setWordDefinition] = useState<any | null>(null);

  const fetchWordDefinition = async () => {
    try {
      const definitionResponse = await apiServices.getWordDefinition(
        selectedWord!.toLowerCase()
      );
      setWordDefinition(definitionResponse[0]);
    } catch (error) {
      console.error("error fetching word: ", error);
    }
  };

  useEffect(() => {
    fetchWordDefinition();
  }, []);

  return { wordDefinition };
};
