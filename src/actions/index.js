import { testUsersRef, authRef, googleAuthProvider } from '../firebase_handler/firebase'
import { FETCH_USER, FETCH_FIREBASE_DB, SET_WORKER } from './type'

// Setting the User to view
export const setWorker = (worker) => dispatch => {
  dispatch({
    type: SET_WORKER,
    payload: worker
  })
}

// Fetching data from Firebase
export const fetchFirebaseDB = () => async dispatch => {
  testUsersRef.on('value', snapshot => {
    dispatch({
      type: FETCH_FIREBASE_DB,
      payload: snapshot.val()
    })
  })
}

// Fetching User authenticated
export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    dispatch({
      type: FETCH_USER,
      payload: user
    })
  });
};

// Logging with GooglePopUp
export const signIn = () => dispatch => {
  authRef
    .signInWithPopup(googleAuthProvider)
    .then(result => {
      console.log(result);
      console.log('Success... Google Account Linked');
    })  
    .catch(error => {
      console.log(error);
    });
};

// Signing out
export const signOut = () => dispatch => {
  authRef
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log('Sign-out successful...');
    })
    .catch(error => {
      console.log(error);
    });
};
