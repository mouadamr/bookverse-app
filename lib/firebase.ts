import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// --- Start of Configuration Check ---
console.log("Firebase lib: Loading configuration...");

const firebaseConfigString = process.env.NEXT_PUBLIC_FIREBASE_CONFIG;

if (!firebaseConfigString) {
    const errorMessage = "FATAL ERROR: Firebase config is missing from .env.local. The server MUST be restarted after editing this file.";
    console.error(errorMessage);
    throw new Error(errorMessage);
}

let firebaseConfig;
try {
    firebaseConfig = JSON.parse(firebaseConfigString);
    console.log("Firebase lib: Successfully parsed configuration.");
} catch (e) {
    const errorMessage = "FATAL ERROR: The Firebase config string in .env.local is not valid JSON.";
    console.error(errorMessage, e);
    console.error("The invalid string was:", firebaseConfigString);
    throw new Error(errorMessage);
}

if (!firebaseConfig.apiKey) {
    const errorMessage = "FATAL ERROR: The parsed Firebase config is missing the 'apiKey' property.";
    console.error(errorMessage);
    throw new Error(errorMessage);
}

console.log(`Firebase lib: Found API Key starting with "${firebaseConfig.apiKey.substring(0, 8)}..."`);
// --- End of Configuration Check ---


// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

console.log("Firebase lib: Firebase services initialized successfully.");

export { db, auth };
