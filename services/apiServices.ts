import { AxiosResponse } from "axios";

import { apiClient } from "./apiProvider";

const responseData = (response: AxiosResponse) => response.data;

const requests = {
  get: async (url: string) => await apiClient.get(url).then(responseData),
};

export const apiServices = {
  GetWordDefinition: (word: string) => requests.get(word),
};
