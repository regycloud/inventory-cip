// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCUatiEi1QVQPOMuN-tu59D5qth0-5GmX8",
    authDomain: "inventory-259cc.firebaseapp.com",
    projectId: "inventory-259cc",
    storageBucket: "inventory-259cc.appspot.com",
    messagingSenderId: "75390818082",
    appId: "1:75390818082:web:eebe789bed1cfd974e777b"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
