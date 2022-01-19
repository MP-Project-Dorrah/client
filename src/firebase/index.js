import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBxNBBfz3Z5H2WC1xz9YbAkBowQroEaE_k",
  authDomain: "finalproject-80d02.firebaseapp.com",
  databaseUrl: "gs://finalproject-80d02.appspot.com",
  projectId: "finalproject-80d02",
  storageBucket: "finalproject-80d02.appspot.com",
  messagingSenderId: "420324758640",
  appId: "1:420324758640:web:7f44ffa2df465f28c8d0b5",
  measurementId: "G-JVK0JLVVKP",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as defult };
