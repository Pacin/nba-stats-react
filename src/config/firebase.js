import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// config
const firebaseConfig = {
  apiKey: "AIzaSyAgpf-TQtHDQC5H8snCljo-ezWMtxMOZIw",
  authDomain: "react-dummy-6f5a6.firebaseapp.com",
  databaseURL:
    "https://react-dummy-6f5a6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-dummy-6f5a6",
  storageBucket: "react-dummy-6f5a6.appspot.com",
  messagingSenderId: "23083937134",
  appId: "1:23083937134:web:5cfe5859dd5fd0c41f257f",
};

//init firebase app
initializeApp(firebaseConfig);

//init services
const auth = getAuth();

export {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
};
