import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as firebase from "firebase";

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
// var database = firebase.database();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);