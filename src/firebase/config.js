// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACsSRK2pekFHEqUgdG_UEjV68L116ZxBc",
  authDomain: "exhibit-4e82a.firebaseapp.com",
  projectId: "exhibit-4e82a",
  storageBucket: "exhibit-4e82a.appspot.com",
  messagingSenderId: "985503304593",
  appId: "1:985503304593:web:c2d9c846a447d8004d2830",
  measurementId: "G-776ZHBKJ9X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Banco de dados do Firebase
const db = getFirestore (app)
export {db};