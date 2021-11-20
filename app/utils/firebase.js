import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxkW2uLSsAvtS9ZBB1blBihtNkfDe1XPc",
  authDomain: "sice-760f8.firebaseapp.com",
  projectId: "sice-760f8",
  storageBucket: "sice-760f8.appspot.com",
  messagingSenderId: "1056109842956",
  appId: "1:1056109842956:web:957055925aa0c68be0d429",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
