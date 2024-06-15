// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuUcC8UlOddVQv_uIDFEZTk05A58NJ9nQ",
  authDomain: "fir-blog-1cac1.firebaseapp.com",
  projectId: "fir-blog-1cac1",
  storageBucket: "fir-blog-1cac1.appspot.com",
  messagingSenderId: "82893484837",
  appId: "1:82893484837:web:2aade5611d07fbbb63e0cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)