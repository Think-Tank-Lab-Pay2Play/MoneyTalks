import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "",
  authDomain: "moneytalks-da829.firebaseapp.com",
  projectId: "moneytalks-da829",
  storageBucket: "moneytalks-da829.firebasestorage.app",
  messagingSenderId: "346451503496",
  appId: "1:346451503496:web:eef0faa2eefb68a890323d",
  measurementId: "G-L2B2T22M6C"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };


export const imageDB = getStorage(app);

