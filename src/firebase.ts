import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCRig51IiB-pf6XpKQYaoo5OQpDNRb7Gow",
  authDomain: "clinica-elo.firebaseapp.com",
  databaseURL: "https://clinica-elo.firebaseio.com",
  projectId: "clinica-elo",
  storageBucket: "clinica-elo.appspot.com",
  messagingSenderId: "727283680343",
  appId: "1:727283680343:web:f1c12bebf981ceaa974f12",
};

export const app = firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// App temporário pra não desconectar o usuario atual ao mexer no auth
export const tempApp = firebase.initializeApp(config, "tempApp");
export const tempAuth = tempApp.auth();
