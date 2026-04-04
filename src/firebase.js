// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithCredential,
  PhoneAuthProvider
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOUuJUbbjmEXGLE9NsE3ccBZItYpQzqtI",
  authDomain: "bloodhub-b9213.firebaseapp.com",
  projectId: "bloodhub-b9213",
  storageBucket: "bloodhub-b9213.firebasestorage.app",
  messagingSenderId: "284755581017",
  appId: "1:284755581017:web:038de59781148cb125b948",
  measurementId: "G-KCQXNY5VPT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithCredential,
  PhoneAuthProvider,
  googleProvider
};