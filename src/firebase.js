// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1Bp2PlXGcqsTkskhK9alhfK2V4UUaLA8",
  authDomain: "lost-people-8d86c.firebaseapp.com",
  projectId: "lost-people-8d86c",
  storageBucket: "lost-people-8d86c.appspot.com",
  messagingSenderId: "754775378344",
  appId: "1:754775378344:web:51b404dea58376a941b59d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app)
const db = getFirestore(app);
export default firebaseConfig;