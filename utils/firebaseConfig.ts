import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFq4R-MTKQQFA2zje0bDm5YMxflzhMMt0",
  authDomain: "namudictionary.firebaseapp.com",
  projectId: "namudictionary",
  storageBucket: "namudictionary.firebasestorage.app",
  messagingSenderId: "422894091379",
  appId: "1:422894091379:web:51f23e4f7b1bcf241b3e06",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
