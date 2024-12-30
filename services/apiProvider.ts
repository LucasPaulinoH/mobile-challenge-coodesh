import axios from "axios";
import { type AxiosResponse } from "axios";

const DICTIONARY_API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const apiClient = axios.create({
  baseURL: DICTIONARY_API_URL,
});

const responseData = (response: AxiosResponse) => response.data;

export const apiRequest = {
  get: async (url: string) => await apiClient.get(url).then(responseData),
};
