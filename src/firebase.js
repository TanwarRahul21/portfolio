// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Init Firebase only when config is present
const hasFirebaseConfig = Boolean(firebaseConfig.apiKey);

const app = hasFirebaseConfig ? initializeApp(firebaseConfig) : null;

// Auth
export const auth = app ? getAuth(app) : null;
const provider = app ? new GoogleAuthProvider() : null;
export const loginWithGoogle = () =>
  app ? signInWithPopup(auth, provider) : Promise.resolve(null);
export const logout = () => (app ? signOut(auth) : Promise.resolve());

// Firestore
export const db = app ? getFirestore(app) : null;
