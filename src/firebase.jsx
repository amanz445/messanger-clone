import firebase from "firebase/compat/app";
import "firebase/firestore"
import { getFirestore } from "firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBiPgHGob1MTvDj62VNMJLD30hLcuijUCc",
  authDomain: "messenger-clone-ec7d8.firebaseapp.com",
  projectId: "messenger-clone-ec7d8",
  storageBucket: "messenger-clone-ec7d8.appspot.com",
  messagingSenderId: "69095266345",
  appId: "1:69095266345:web:bc988c54ccc9f78ce6a438"
});

const database = getFirestore(firebaseApp);

export { database }