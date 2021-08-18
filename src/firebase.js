import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJcaqvKHuWayZGeuHUNAA4Zu96rHxenHc",
  authDomain: "utilities-app.firebaseapp.com",
  projectId: "utilities-app",
  storageBucket: "utilities-app.appspot.com",
  messagingSenderId: "844381749559",
  appId: "1:844381749559:web:9ee07dcc6a8ac110335ab2",
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
