import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {

};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };


export const imageDB = getStorage(app);

