import axios from "axios";

const DICTIONARY_API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export const apiClient = axios.create({
  baseURL: DICTIONARY_API_URL,
});
