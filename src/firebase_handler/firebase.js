import * as firebase from "firebase";

const database = 
  {
    apiKey: "AIzaSyCcepJWym8FiUx2ogpN8UYu4vloPvwJQ2Q",
    authDomain: "sa-project-sdk.firebaseapp.com",
    databaseURL: "https://sa-project-sdk.firebaseio.com",
    projectId: "sa-project-sdk",
    storageBucket: "sa-project-sdk.appspot.com",
    messagingSenderId: "272186930580"
  }

firebase.initializeApp(database);

const databaseRef = firebase.database().ref();
export const testUsersRef = databaseRef.child("real_users");
export const realTimeUsersRef = databaseRef.child("realtime_users");
export const usersBranchRef = databaseRef.child("real_users");
export const authRef = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
