import { testUsersRef, authRef, googleAuthProvider } from '../firebase_handler/firebase'
import { FETCH_USER } from './type'

export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user
      });
    } else {
      dispatch({
        type: FETCH_USER,
        payload: null
      });
    }
  });
};

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
