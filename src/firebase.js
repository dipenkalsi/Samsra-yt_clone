// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_xrl0eQy8_76x_qAKHPO8_DWIiee4cA8",
  authDomain: "yt-clone-real.firebaseapp.com",
  projectId: "yt-clone-real",
  storageBucket: "yt-clone-real.appspot.com",
  messagingSenderId: "319198925797",
  appId: "1:319198925797:web:f5f8cf9cef31a2195ad50c"
};


// Initialize Firebase
const App = initializeApp(firebaseConfig);
export const auth = getAuth(App);
export const db = getFirestore(App);