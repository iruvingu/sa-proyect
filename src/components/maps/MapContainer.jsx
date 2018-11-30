import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import { MAP_API_KEY } from '../../constants/helpers'

import CircleImagePose from './CircleImagePose'

class MapContainer extends Component {
  static defaultProps = {
    center: {
      lat: 19.3911668,
      lng: -99.423815
    },
    zoom: 6
  };

  markerPosition = (workers) => {
    return Object.values(workers).map((worker,i) => {
      return (
        <div
          key={i}
          lat={worker.details.location.id.lat}
          lng={worker.details.location.id.lng}
          style={{cursor: 'pointer'}}
        >
          <CircleImagePose image={worker.photoUri} />
        </div>
      )
    })
  }

  render() {
    const { workers } = this.props
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: MAP_API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          hoverDistance={40}
        >
          {this.markerPosition(workers, this.props)}
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapContainer
