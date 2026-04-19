// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

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
// Analytics can fail in some environments (localhost/incognito/blocked cookies).
// Auth should still work, so we guard it.
try {
  if (typeof window !== "undefined") {
    getAnalytics(app);
  }
} catch (err) {
  console.warn("Firebase analytics unavailable:", err?.message || err);
}
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  googleProvider
};