import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
 apiKey: "AIzaSyDVkD_m9AzMcPQNCLmmxzC0ME-8Bna6dxU",
  authDomain: "sareeshop-c2116.firebaseapp.com",
  projectId: "sareeshop-c2116",
  storageBucket: "sareeshop-c2116.firebasestorage.app",
  messagingSenderId: "552721656252",
  appId: "1:552721656252:web:60e247260b6b6560ee63b9",
  measurementId: "G-NYQB1KD4WC"
};

const app = initializeApp(firebaseConfig);
console.log("🔥 Firebase project ID:", app.options.projectId);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app); 

