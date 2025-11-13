import admin from "firebase-admin";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const keyPath = path.resolve(process.env.FIREBASE_KEY_PATH);
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(keyPath),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

export const db = admin.firestore();
export const bucket = admin.storage().bucket();
