import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "keyboard-sniper.firebaseapp.com",
  projectId: "keyboard-sniper",
  storageBucket: "keyboard-sniper.appspot.com",
  messagingSenderId: "642231972",
  appId: "1:642231972:web:be294f479c46d1640fc031",
  measurementId: "G-G083KFP9P9",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
