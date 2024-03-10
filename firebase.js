// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCacyo_LLZyCLmSq1okecZaIcrUN5Me79c",
  authDomain: "farmersupermarket-8abbc.firebaseapp.com",
  projectId: "farmersupermarket-8abbc",
  storageBucket: "farmersupermarket-8abbc.appspot.com",
  messagingSenderId: "490748707948",
  appId: "1:490748707948:web:361740a745c5565f334449",
  measurementId: "G-F1EQCGBSZ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);