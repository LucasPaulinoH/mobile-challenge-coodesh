import { apiServices } from "@/services";

export const fetchWordDefinition = async (word: string) => {
  try {
    const response = await apiServices.getWordDefinition(word);
  } catch (error) {
    console.error("error fetching word: ", error);
  }
};
