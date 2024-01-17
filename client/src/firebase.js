import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAKK8j-0P2iuQXW_kO5JFPb9h_kzjHgPBg",
  authDomain: "reactcrud-f4e51.firebaseapp.com",
  projectId: "reactcrud-f4e51",
  storageBucket: "reactcrud-f4e51.appspot.com",
  messagingSenderId: "113029850957",
  appId: "1:113029850957:web:b8a99c7d98cba65f423904",
  measurementId: "G-1VBZZDN2WF"
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);