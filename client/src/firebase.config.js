import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDx8i9ZYA8Al4-Q9RM5E9215FwQhP5YleM",
  authDomain: "dropshop-adbb6.firebaseapp.com",
  projectId: "dropshop-adbb6",
  storageBucket: "dropshop-adbb6.appspot.com",
  messagingSenderId: "415481796636",
  appId: "1:415481796636:web:cd56b47941b9ee095727d9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
