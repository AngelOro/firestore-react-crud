import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyAZYcHT2V2Q0JLS2je889ZFtmJGfMMIPrk",
    authDomain: "crud-firestore-d1176.firebaseapp.com",
    projectId: "crud-firestore-d1176",
    storageBucket: "crud-firestore-d1176.appspot.com",
    messagingSenderId: "710780289066",
    appId: "1:710780289066:web:758838cf90ca57399e4353",
    measurementId: "G-ECWWWZW89C"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  export const db = fb.firestore();