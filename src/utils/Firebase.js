import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

let config = {
    apiKey: "AIzaSyCurqpYq8AiD61wx99lqduUZd_CHNRtfZE",
    authDomain: "beauty-clinic-f04eb.firebaseapp.com",
    databaseURL: "https://beauty-clinic-f04eb.firebaseio.com",
    projectId: "beauty-clinic-f04eb",
    storageBucket: "beauty-clinic-f04eb.appspot.com",
    messagingSenderId: "155438243496",
    appId: "1:155438243496:web:5d5ed2ec8853eca5f9ec9d",
    measurementId: "G-VELF0J0MYT"
};

let firebaseApp = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
// let secondaryApp = firebase.initializeApp(config, "Secondary");

// export { firebaseApp, secondaryApp };
export { firebaseApp };