import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChyGEXPMNHVzKTwGelUCYWXc4d3BuiRyE",
  authDomain: "jaytl-80f45.firebaseapp.com",
  projectId: "jaytl-80f45",
  storageBucket: "jaytl-80f45.appspot.com",
  messagingSenderId: "872049423898",
  appId: "1:872049423898:web:cdc3cab0836c04629203a3",
  measurementId: "G-PMV1HN88LX"
};
  
  // Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)
