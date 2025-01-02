import { getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "utils/firebaseConfig";

export const FIRESTORE_FAVORITES_COLLECTION_NAME = "user_favorites";
export const FIRESTORE_HISTORY_COLLECTION_NAME = "words_history";

export const firestoreServices = {
  getCollection: async (userId: string, collection: string) => {
    try {
      const docSnap = await getDoc(doc(FIRESTORE_DB, collection, userId));
      return docSnap.data();
    } catch (error) {
      console.error("Error getting collection from firestore: ", error);
    }
  },
  updateCollection: async (
    userId: string,
    collection: string,
    data: object,
  ) => {
    try {
      const documentRef = doc(FIRESTORE_DB, collection, userId);

      const docSnap = await getDoc(documentRef);

      if (docSnap.exists()) await updateDoc(documentRef, data);
      else await setDoc(documentRef, data);

      console.log("Success");
    } catch (error) {
      console.error("Error updating Firestore document: ", error);
    }
  },
};
