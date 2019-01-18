import * as firebase from "firebase";

const database = 
  {
    apiKey: "AIzaSyBroCI9qCUUIt0_LgLs96LquaSqdUzyl2Y",
    authDomain: "sdk-project-app.firebaseapp.com",
    databaseURL: "https://sdk-project-app.firebaseio.com",
    projectId: "sdk-project-app",
    storageBucket: "sdk-project-app.appspot.com",
    messagingSenderId: "628531525880"
  }

firebase.initializeApp(database);

const databaseRef = firebase.database().ref();
export const testUsersRef = databaseRef.child("real_users");
export const realTimeUsersRef = databaseRef.child("realtime_users");
export const usersBranchRef = databaseRef.child("real_users");
export const timeRef = databaseRef.child("config");
export const authRef = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
