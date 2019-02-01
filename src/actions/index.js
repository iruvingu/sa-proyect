import { testUsersRef, realTimeUsersRef, authRef,
  googleAuthProvider, usersBranchRef, timeRef } from '../firebase_handler/firebase'
import * as Type from './type'
import { CONVERT_TIMESTAMP } from '../services'

// Set time to firebase
export const setTimeToFB = (time) =>  async dispatch => {
  timeRef.child('time_location').push(time)
}

// Change the router location
export const setRouterLocation = (path) => dispatch => {
  dispatch({
    type: Type.SET_PATH,
    payload: path
  })
}

// Hover a marker
export const hoverMarker = (markerId) => dispatch => {
  dispatch({
    type: Type.SET_MARKER,
    payload: markerId
  })
}

// Setting the User to view and getting the user's data
export const setWorker = (worker) => dispatch => {
  dispatch({
    type: Type.SET_WORKER,
    payload: worker
  })
}

// Send the data of the users to the realtime_users
export const listenDataAddedChild = () => async dispatch => {
  testUsersRef.on('value', snapshot => {
    // console.log(snapshot.val())
    const workers = snapshot.val();

    const workersActualized = Object.values(workers).map(worker => {

      try{
        const higherLocation = (worker.details === undefined)
        ? 1
        : (Object.keys(worker.details.locations)).reduce((prevLocation, location) => 
          (prevLocation > location)
            ? prevLocation
            : location
          )
      
      const convertLocationToDate = CONVERT_TIMESTAMP(higherLocation);

      var ObjectToUpdate;

      if((worker.photoUri === undefined) && (worker.details !== undefined)) {
        // console.log(`${worker.id} has no foto`)
        const workerId = worker.id
        testUsersRef.child(workerId).update({
          "photoUri" : "/images/faces/man.png"
        })
        ObjectToUpdate = {
          [worker.id] : {
            "fecha" : convertLocationToDate,
            "lat" : worker.details.locations[higherLocation].lat,
            "lng" : worker.details.locations[higherLocation].lng,
            "photoUri" : "/images/faces/man.png",
            "id" : worker.id,
            "name" : worker.name
          }
        }
      }
      else if((worker.photoUri === undefined) && (worker.details === undefined)){
        const workerId = worker.id
        testUsersRef.child(workerId).update({
          "photoUri" : "/images/faces/man.png"
        })
        ObjectToUpdate = {
          [worker.id] : {
            "fecha" : convertLocationToDate,
            "lat" : 0,
            "lng" : 0,
            "photoUri" : "/images/faces/man.png",
            "id" : worker.id,
            "name" : worker.name
          }
        }
      }
      else if((worker.photoUri !== undefined) && (worker.details === undefined)){
        const workerId = worker.id
        testUsersRef.child(workerId).update({
          "details" : {
            "locations" : {
              "1" : {
                "lat" : 0,
                "lng" : 0
              }
            }
          }
        })
        ObjectToUpdate = {
          [worker.id] : {
            "fecha" : convertLocationToDate,
            "lat" : 0,
            "lng" : 0,
            "photoUri" : (worker.photoUri),
            "id" : worker.id,
            "name" : worker.name
          }
        }
      }
      else {
        ObjectToUpdate = {
          [worker.id] : {
            "fecha" : convertLocationToDate,
            "lat" : worker.details.locations[higherLocation].lat,
            "lng" : worker.details.locations[higherLocation].lng,
            "photoUri" : (worker.photoUri),
            "id" : worker.id,
            "name" : worker.name
          }
        }
      }

      realTimeUsersRef.update(ObjectToUpdate)

      return ObjectToUpdate;
      }catch(e){
        console.log(e)
      }
      
    })

    dispatch({
      type: Type.LISTEN_ADDED_DATA_TO_CHILD,
      payload: workersActualized
    })
  })
}

// Fetching realtimeUser's location and date in the realtime_users node
export const fecthRealTimeUsersLocationDB = () => async dispatch => {
  try{
    realTimeUsersRef.on('value', snapshot => {
        dispatch({
          type: Type.FETCH_REALTIME_USER_DB,
          payload: snapshot.val()
        })
      })
  }catch(e){
    console.log(e)
  }
  
}

// Fetching data from Firebase
export const fetchFirebaseDB = () => async dispatch => {
  try{
    testUsersRef.on('value', snapshot => {
        console.log(snapshot.val())
        dispatch({
          type: Type.FETCH_FIREBASE_DB,
          payload: snapshot.val()
        })
      })
  }catch(e){
    console.log(e)
  }
  
}

// Fetching User authenticated
export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    dispatch({
      type: Type.FETCH_USER,
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
