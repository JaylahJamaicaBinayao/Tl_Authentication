import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB8zSqPjMgqIPLElO1-VXgG9NH-laLPfWg",
    authDomain: "tl-authentication-b9aef.firebaseapp.com",
    projectId: "tl-authentication-b9aef",
    storageBucket: "tl-authentication-b9aef.appspot.com",
    messagingSenderId: "231015995773",
    appId: "1:231015995773:web:20f5fb67cdc2b830595414",
    measurementId: "G-0R9C3QLMMK"
  };
  
  // Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)
