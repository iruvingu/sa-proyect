import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import { MAP_API_KEY } from '../../constants/helpers'
import { connect } from 'react-redux'

import {CircleImagePose} from './CircleImagePose'
import { K_SIZE } from './greatPlaceStyle'
import { hoverMarker } from '../../actions'
// import Marker from './Marker'

class MapContainer extends Component {
  static defaultProps = {
    center: {
      lat: 19.3911668,
      lng: -99.423815
    },
    zoom: 6
  };

  createMapOptions = (maps) => {
    return {
      styles: [{ stylers: [{ 'gamma': 0.8 }, { 'lightness': 4 }, { 'visibility': 'on' }] }]
    }
  }

  _onChildMouseEnter = (key, childProps) => {
    console.log(`Marcador con id = ${childProps.children.props.id}`)
    this.props.hoverMarker(childProps.children.props.id)
    // console.log(this.props)
  }

  _onChildMouseLeave = () => {
    this.props.hoverMarker(-1)
  }

  markerPosition = (workers, hoverUser) => {
    return Object.values(workers).map((worker,i) => {
      return (
        <div
          key={i}
          lat={worker.lat}
          lng={worker.lng}
          style={{cursor: 'pointer'}}
          hover={hoverUser === worker.id}
        >
          {(!worker.photoUri)
            ? <CircleImagePose image={'/images/faces/man.png'} title={worker.fecha} id={worker.id} />
            : <CircleImagePose image={worker.photoUri} title={worker.fecha} id={worker.id} />
          }
          {/* <CircleImagePose image={worker.photoUri} title={worker.fecha} id={worker.id} /> */}
        </div>
      )
    })
  }

  render() {
    const { workers, hoverUser } = this.props
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: MAP_API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          hoverDistance={K_SIZE / 2}
          options={this.createMapOptions}
          onChildMouseEnter={this._onChildMouseEnter}
          onChildMouseLeave={this._onChildMouseLeave}
        >
          {this.markerPosition(workers, hoverUser)}
        </GoogleMapReact>
      </div>
    );
  }
}


export default connect(null, { hoverMarker })(MapContainer)
