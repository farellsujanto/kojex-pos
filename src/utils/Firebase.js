import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

let config = {
    apiKey: "AIzaSyDSohEKTbbRCL_sq4a9tXLqaQj4Of7-ZJw",
    authDomain: "hollywoof-23265.firebaseapp.com",
    projectId: "hollywoof-23265",
    storageBucket: "hollywoof-23265.appspot.com",
    messagingSenderId: "210387137243",
    appId: "1:210387137243:web:c1f6d3e38df6b09221d2fe",
    measurementId: "G-CPHCCKXHVG"
};

let firebaseApp = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
// let secondaryApp = firebase.initializeApp(config, "Secondary");

// export { firebaseApp, secondaryApp };
export { firebaseApp };