// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRolyR8dEYCdActs4QsWL6gMzrxbnHyio",
  authDomain: "banking-app-92cee.firebaseapp.com",
  projectId: "banking-app-92cee",
  storageBucket: "banking-app-92cee.appspot.com",
  messagingSenderId: "669610844664",
  appId: "1:669610844664:web:06104e5c37cf1772ab360d",
  measurementId: "G-XKP9KYM83F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

export const auth = getAuth();

