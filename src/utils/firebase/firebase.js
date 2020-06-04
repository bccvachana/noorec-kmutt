import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCt59t1mwV9iBxSfzNP15R8j-66zemKe4Y",
  authDomain: "noorec-kmutt.firebaseapp.com",
  databaseURL: "https://noorec-kmutt.firebaseio.com",
  projectId: "noorec-kmutt",
  storageBucket: "noorec-kmutt.appspot.com",
  messagingSenderId: "588089431620",
  appId: "1:588089431620:web:e74d7ef7ee127c2ddd8e11",
  measurementId: "G-SXW9WH6TK0",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const firestore = firebase.firestore;
export const db = firebase.firestore();
