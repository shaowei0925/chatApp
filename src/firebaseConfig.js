// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRnqWeH47b7YZzqnGoeC5UgwpS3NUCarE",
  authDomain: "my-tiktalk.firebaseapp.com",
  projectId: "my-tiktalk",
  storageBucket: "my-tiktalk.appspot.com",
  messagingSenderId: "830010911054",
  appId: "1:830010911054:web:fed1da4b5c26576683561f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
