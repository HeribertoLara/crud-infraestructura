import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBN8fhA-XtuNLln2cXraBI8VtzKYebQQUQ",
  authDomain: "infraestructura-medica.firebaseapp.com",
  projectId: "infraestructura-medica",
  storageBucket: "infraestructura-medica.appspot.com",
  messagingSenderId: "1077371281498",
  appId: "1:1077371281498:web:57c4904428229880107863"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export{firebase}