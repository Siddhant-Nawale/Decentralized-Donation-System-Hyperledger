import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBytglrATHyDalOG1YZlW8iT65MrI8WMNU",
  authDomain: "smileshare-24db2.firebaseapp.com",
  projectId: "smileshare-24db2",
  storageBucket: "smileshare-24db2.appspot.com",
  messagingSenderId: "1087726213805",
  appId: "1:1087726213805:web:b5e05402a179d2b2654424",
  measurementId: "G-PBSWK6KW88"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)