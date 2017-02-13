import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "XXX",
  authDomain: "XXX.firebaseapp.com",
  databaseURL: "https://XXX.firebaseio.com",
  storageBucket: "XXX.appspot.com",
  messagingSenderId: "XXX"
};

firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();

export default database;
