import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlIi0bvxqxF3NjEd3Ie3-pMrvD_2fhWp8",
  authDomain: "moviemania-566f7.firebaseapp.com",
  projectId: "moviemania-566f7",
  storageBucket: "moviemania-566f7.appspot.com",
  messagingSenderId: "51108527646",
  appId: "1:51108527646:web:fb8c88e877ce67d531780f",
  measurementId: "G-H8T2ZTKV6B"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
