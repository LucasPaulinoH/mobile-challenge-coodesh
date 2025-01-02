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
  updateWordHistory: async (userId: string, history: number[]) => {
    try {
      const documentRef = doc(
        FIRESTORE_DB,
        FIRESTORE_HISTORY_COLLECTION_NAME,
        userId,
      );

      const docSnap = await getDoc(documentRef);

      if (docSnap.exists()) await updateDoc(documentRef, { history });
      else await setDoc(documentRef, { history: [] }, { merge: true });

      console.log("Documento atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar documento no Firestore: ", error);
    }
  },
};
