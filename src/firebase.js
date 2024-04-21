import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyDGnhi0COdfzhH7iRXCt_rfU9sJlyj1548",
  authDomain: "wdfgyhjjmvj.firebaseapp.com",
  databaseURL: "https://wdfgyhjjmvj-default-rtdb.firebaseio.com",
  projectId: "wdfgyhjjmvj",
  storageBucket: "wdfgyhjjmvj.appspot.com",
  messagingSenderId: "1051382165813",
  appId: "1:1051382165813:web:85ce1128191198be519c7c",
  measurementId: "G-P4M63VWWGZ",
});
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);
