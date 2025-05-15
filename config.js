import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDpXPTw_r0dS2TXsddLYXJIFFVZGXki2rE",
  authDomain: "ncs-prep.firebaseapp.com",
  projectId: "ncs-prep",
  storageBucket: "ncs-prep.appspot.com",
  messagingSenderId: "122676239504",
  appId: "1:122676239504:web:6faa47f0c9d39de8428c15",
  measurementId: "G-BZM10J6BBH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const imageStorage = getStorage(app);
export const materialStorage = getStorage(app);
