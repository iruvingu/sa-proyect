import { testUsersRef, realTimeUsersRef, authRef, googleAuthProvider, usersBranchRef } from '../firebase_handler/firebase'
import { FETCH_USER, FETCH_FIREBASE_DB, SET_WORKER,
  FETCH_REALTIME_USER_DB, LISTEN_ADDED_DATA_TO_CHILD, SET_MARKER } from './type'
import { CONVERT_TIMESTAMP } from '../services'

// Hover a marker
export const woverMarker = (markerId) => dispatch => {
  dispatch({
    type: SET_MARKER,
    payload: markerId
  })
}

// Setting the User to view and getting the user's data
export const setWorker = (worker) => dispatch => {
  dispatch({
    type: SET_WORKER,
    payload: worker
  })
}

// Send the data of the users to the realtime_users
export const listenDataAddedChild = () => async dispatch => {
  testUsersRef.on('value', snapshot => {
    // console.log(snapshot.val())
    const workers = snapshot.val();

    const workersActualized = Object.values(workers).map(worker => {

      if(worker.photoUri === undefined) {
        console.log(`${worker.id} has no foto`)
        // const workerId = worker.id
        // testUsersRef.child(workerId).update({
        //   "photoUri" : "/images/faces/user.png"
        // })
      }

      const higherLocation = (Object.keys(worker.details.location))
      .reduce((prevLocation, location) => 
        (prevLocation > location)
          ? prevLocation
          : location
        );

      const convertLocationToDate = CONVERT_TIMESTAMP(higherLocation);

      const ObjectToUpdate = {
        [worker.id] : {
          "fecha" : convertLocationToDate,
          "lat" : worker.details.location[higherLocation].lat,
          "lng" : worker.details.location[higherLocation].lng,
          "photoUri" : (worker.photoUri),
          "id" : worker.id,
          "name" : worker.name
        }
      }

      realTimeUsersRef.update(ObjectToUpdate)

      return ObjectToUpdate;
    })

    dispatch({
      type: LISTEN_ADDED_DATA_TO_CHILD,
      payload: workersActualized
    })
  })
}

// Fetching realtimeUser's location and date in the realtime_users node
export const fecthRealTimeUsersLocationDB = () => async dispatch => {
  realTimeUsersRef.on('value', snapshot => {
    dispatch({
      type: FETCH_REALTIME_USER_DB,
      payload: snapshot.val()
    })
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
