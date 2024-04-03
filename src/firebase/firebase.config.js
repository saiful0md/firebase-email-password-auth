// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAre5MRAqy1FFvMZoefd24Ppc6uKZntBb4",
  authDomain: "user-email-password-fire-1f4f8.firebaseapp.com",
  projectId: "user-email-password-fire-1f4f8",
  storageBucket: "user-email-password-fire-1f4f8.appspot.com",
  messagingSenderId: "13059609456",
  appId: "1:13059609456:web:519da9ccbb9195e5fab5b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;