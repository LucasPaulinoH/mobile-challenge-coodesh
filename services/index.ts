import { apiRequest } from "./apiProvider";

export const apiServices = {
  getWordDefinition: (word: string) => apiRequest.get(word),
};
