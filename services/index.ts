import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "utils/firebaseConfig";

import { apiRequest } from "./apiProvider";

export const apiServices = {
  getWordDefinition: (word: string) => apiRequest.get(word),
};

const FIRESTORE_FAVORITES_COLLECTION_NAME = "user_favorites";
const FIRESTORE_HISTORY_COLLECTION_NAME = "words_history";

export const firebaseServices = {
  getUserFavoriteWords: async (userId: string) => {
    try {
      const docSnap = await getDoc(
        doc(FIRESTORE_DB, FIRESTORE_FAVORITES_COLLECTION_NAME, userId),
      );

      return docSnap.data();
    } catch (error) {
      console.error(
        "Error getting user's favorite words from firestore: ",
        error,
      );
    }
  },

  getWordsHistory: async (userId: string) => {
    try {
      const docSnap = await getDoc(
        doc(FIRESTORE_DB, FIRESTORE_HISTORY_COLLECTION_NAME, userId),
      );

      return docSnap.data();
    } catch (error) {
      console.error(
        "Error getting user's words history from firestore: ",
        error,
      );
    }
  },
};
