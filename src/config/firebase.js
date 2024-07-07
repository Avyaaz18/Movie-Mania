import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)

// , GoogleAuthProvider, signInWithPopup, setPersistence, browserLocalPersistence
// const provider = new GoogleAuthProvider();

// setPersistence(auth, browserLocalPersistence)
//   .then(() => {
//     console.log("Persistence set successfully");
//   })
//   .catch((error) => {
//     console.error("Error setting persistence:", error.message);
//   });

// export { auth, provider, signInWithPopup };
