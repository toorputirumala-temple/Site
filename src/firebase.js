import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDleUbKlKYwQM3VbiaUNJPUaB_uv2OcV3Y",
  authDomain: "temple-7b3ad.firebaseapp.com",
  projectId: "temple-7b3ad",
  storageBucket: "temple-7b3ad.firebasestorage.app",
  messagingSenderId: "789265048119",
  appId: "1:789265048119:web:3bf2bc90d9cd9af8c515b2",
  measurementId: "G-PJFV1HQ0EN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics };
