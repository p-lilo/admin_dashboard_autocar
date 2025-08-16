import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDKdVzSScHgFoY2O1jKdsTAmAtI-LkXVCI",
  authDomain: "auto-car-45826.firebaseapp.com",
  projectId: "auto-car-45826",
  storageBucket: "auto-car-45826.firebasestorage.app",
  messagingSenderId: "606333234269",
  appId: "1:606333234269:web:02d940933eb76373baf1b4",
  measurementId: "G-7JMMDT39T9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
