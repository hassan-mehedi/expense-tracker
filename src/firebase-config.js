import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAOMcu0dXbHXtczctrzWWHxiZnGWcKxK0g",
    authDomain: "expense-tracker-7bca2.firebaseapp.com",
    projectId: "expense-tracker-7bca2",
    storageBucket: "expense-tracker-7bca2.appspot.com",
    messagingSenderId: "1091808930869",
    appId: "1:1091808930869:web:c07f11ea58c79c52e0957c",
    measurementId: "G-8TP9PKW2EP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
