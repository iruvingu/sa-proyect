import React, { Component } from 'react'
import GoogleMapReact, {google} from 'google-map-react'
import { MAP_API_KEY } from '../../../../constants/helpers'
import { CONVERT_DATE_TO_TIMESTAMP, CONVERT_TIMESTAMP } from '../../../../services'

import {CircleImagePose, SecondCircleImagePose} from '../../../maps/CircleImagePose'

class UserMap extends Component {

  static defaultProps = {
    center: {
      lat: 19.3911668,
      lng: -99.423815
    },
    zoom: 8
  };

  filterLocationsByDate = (worker, startDate, finalDate) => {
    return Object.keys(worker.details.location).filter(location => {
      console.log(`location: ${location}, finalDate: ${finalDate}`)
      return (location <= finalDate) && (location > startDate)
    })
  }

  checkPositions = (worker, newLocations) => {
    return newLocations.map(newLocation => {
      const convertNewLocationToDate = CONVERT_TIMESTAMP(newLocation)
      return {
        newWorker : {
          photoUri: worker.photoUri,
          locations: worker.details.location[newLocation],
          fecha: convertNewLocationToDate
        }
      }
    })
  }

  markerPosition = (newWorkers) => {
    return (newWorkers).map((newWorker,i) => {
      // console.log(newWorker.newWorker.locations)
      // console.log(i)
      if (i === 0)
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
      return (
        <div
          key={i}
          lat={newWorker.newWorker.locations.lat}
          lng={newWorker.newWorker.locations.lng}
          style={{cursor: 'pointer'}}
        >
          <CircleImagePose
            image={newWorker.newWorker.photoUri}
            title={newWorker.newWorker.fecha}
          />
        </div>
      )
    })
  }

  render() {
    const { worker, startDate, finalDate } = this.props
    const initDate = CONVERT_DATE_TO_TIMESTAMP(startDate)
    const finDate = CONVERT_DATE_TO_TIMESTAMP(finalDate)
    const newLocations = this.filterLocationsByDate(worker, initDate, finDate)
    const newUser = this.checkPositions(worker, newLocations)

    // console.log(newUser)

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: MAP_API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          hoverDistance={20}
        >
          {this.markerPosition(newUser, this.props)}
        </GoogleMapReact>
      </div>
    );
  }
}

export default UserMap
