import React, { Component } from 'react'
import GoogleMapReact, {google} from 'google-map-react'
import { MAP_API_KEY } from '../../../../constants/helpers'

import CircleImagePose from '../../../maps/CircleImagePose'

class UserMap extends Component {
  static defaultProps = {
    center: {
      lat: 19.3911668,
      lng: -99.423815
    },
    zoom: 8
  };

  markerPosition = (worker) => {
    return Object.values(worker.details.location).map((location,i) => {
      return (
        <div
          key={i}
          lat={location.lat}
          lng={location.lng}
          style={{cursor: 'pointer'}}
        >
          <CircleImagePose image={worker.photoUri} />
        </div>
      )
    })
  }

  render() {
    const { worker } = this.props
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: MAP_API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          hoverDistance={20}
        >
          {this.markerPosition(worker, this.props)}
        </GoogleMapReact>
      </div>
    );
  }
}

export default UserMap
