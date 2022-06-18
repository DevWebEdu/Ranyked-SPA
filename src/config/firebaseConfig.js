// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpbC1bp5E-ki3hFZv2NY3YAFJAHvohflQ",
  authDomain:"g7-store-edu-luna.firebaseapp.com",
  projectId:" g7-store-edu-luna",
  storageBucket: "g7-store-edu-luna.appspot.com",
  messagingSenderId: "421957804916",
  appId: "1:421957804916:web:fb4bf1ca521a76315ec221"
};

console.log({firebaseConfig})
console.log(firebaseConfig)
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app)
const auth = getAuth(app)


export{
    storage,
    auth
}