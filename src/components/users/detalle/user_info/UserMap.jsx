import React, { Component } from 'react'
import GoogleMapReact, {google} from 'google-map-react'
import { MAP_API_KEY } from '../../../../constants/helpers'
import { CONVERT_DATE_TO_TIMESTAMP, CONVERT_TIMESTAMP } from '../../../../services'

import {CircleImagePose, SecondCircleImagePose, ThirdCirclePose} from '../../../maps/CircleImagePose'
import Polyline from './Polyline'

class UserMap extends Component {

  state = {
    map: {},
    maps: {},
    mapLoaded: false,
    newUser: {}
  } 

  static defaultProps = {
    center: {
      lat: 19.3911668,
      lng: -99.423815
    },
    zoom: 8
  };

  componentDidMount() {
    
  }

  // Returns the new locations as the key name, not the entire object
  filterLocationsByDate = (worker, startDate, finalDate) => {
    return Object.keys(worker.details.locations).filter(location => {
      // console.log(`location: ${location}, finalDate: ${finalDate}`)
      return (location <= finalDate) && (location > startDate)
    })
  }

  // Returns the new worker Object with 3 childrens photoUri, locations and fecha
  checkPositions = (worker, newLocations) => {
    return newLocations.map(newLocation => {
      const convertNewLocationToDate = CONVERT_TIMESTAMP(newLocation)
      return {
        newWorker : {
          photoUri: worker.photoUri,
          locations: worker.details.locations[newLocation],
          fecha: convertNewLocationToDate
        }
      }
    })
  }

  markerPosition = (newWorkers) => {
    const newWorkersLen = newWorkers.length;
    return (newWorkers).map((newWorker,i) => {
      // console.log(newWorker.newWorker.locations)
      if (i === 0 || i === (newWorkersLen - 1))
         { 
         return (<div
            key={i}
            lat={newWorker.newWorker.locations.lat}
            lng={newWorker.newWorker.locations.lng}
            style={{cursor: 'pointer'}}
          >
            <SecondCircleImagePose
              image={newWorker.newWorker.photoUri}
              title={newWorker.newWorker.fecha}
            />
          </div>)
      }
      return (<div
        key={i}
        lat={newWorker.newWorker.locations.lat}
        lng={newWorker.newWorker.locations.lng}
        style={{cursor: 'pointer'}}
      >
        <ThirdCirclePose
          title={newWorker.newWorker.fecha}
        />
      </div>)
    })
  }

  render() {
    const { worker, startDate, finalDate } = this.props
    console.log(startDate)
    console.log(finalDate)
    // Converting the date into timeStamp (This might not be necessary tho)
    const initDate = CONVERT_DATE_TO_TIMESTAMP(startDate)
    const finDate = CONVERT_DATE_TO_TIMESTAMP(finalDate)
    console.log(initDate)
    console.log(finDate)
    // Filter locations by specific dates by giving the worker's locations
    // and the initial and final date.
    const newLocations = this.filterLocationsByDate(worker, initDate, finDate)
    console.log('newLocations');
    console.log(newLocations)
    // Asigning a new user with the new positions to use
    const newUser = this.checkPositions(worker, newLocations)

    console.log(newUser)
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: MAP_API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          hoverDistance={20}
          onGoogleApiLoaded={({map, maps}) => {this.setState({map, maps, mapLoaded: true })}}
          yesIWantToUseGoogleMapApiInternals
        >
          {this.markerPosition(newUser)}
        </GoogleMapReact>
      </div>
    );
  }
}

export default UserMap
