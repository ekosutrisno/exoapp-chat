import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyDSvIHsjOKa5taDYKww-Bj3-iNKNY-XkkM",
  authDomain: "exoapps-a8e34.firebaseapp.com",
  projectId: "exoapps-a8e34",
  storageBucket: "exoapps-a8e34.appspot.com",
  messagingSenderId: "47564944098",
  appId: "1:47564944098:web:f356f38e6fce40b045e4bb",
};

const db = firebase.initializeApp(firebaseConfig);
const firestore = db.firestore();
const auth = db.auth();
const database = db.database();
const storage = db.storage();

//Set Auth language for Provider
auth.useDeviceLanguage();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { auth, firestore, database, storage, googleProvider, facebookProvider };
