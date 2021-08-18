import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDWz4cP2JEtGJ8z78419NUQBQuRAa6iVog",
  authDomain: "utilities-app-efe5b.firebaseapp.com",
  projectId: "utilities-app-efe5b",
  storageBucket: "utilities-app-efe5b.appspot.com",
  messagingSenderId: "126631788524",
  appId: "1:126631788524:web:6db0e0abfaf6ca1ee78ac9",
};

// firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
export default firebase;
export const firebaseRef = firebase;
export const auth = firebase.auth;
export const firestore = firebase.firestore();
export const storageRef = firebase.storage().ref();
