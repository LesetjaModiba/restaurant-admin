// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCBkTA7wuwYDdwavz7IABoK1wmTUNTyBEU",
    authDomain: "restaurant-app-7fe35.firebaseapp.com",
    projectId: "restaurant-app-7fe35",
    storageBucket: "restaurant-app-7fe35.appspot.com",
    messagingSenderId: "328887005134",
    appId: "1:328887005134:web:0d79803960c2c8ecd1859f",
    measurementId: "G-9XVS22GFNB"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)
const analytics = getAnalytics(app);
const storage = getStorage(app)

export {auth,db,storage,analytics}