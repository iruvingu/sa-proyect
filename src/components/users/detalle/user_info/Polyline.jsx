import React, { Component } from 'react'

class Polyline extends Component {

  state = {
    path: {}
  } 

  componentDidMount() {
    if (this.props.newUser === []){
      this.setState({path: lat)
    }
  }

  getPaths() {
    const { worker, newUser } = this.props

    if(newUser === undefined){
      console.log('No hay newUser')
    }

    return Object.values(worker.details.locations).map(location => {
      return (
        {lat: location.lat, lng: location.lng}
      )
    })
  }

  render() {
    const Polyline = this.props.maps.Polyline
    const renderedPolyline = this.renderPolyline()
    const paths = { path: this.getPaths() }
    // console.log(paths)
    console.log(this.props.newUser)
    console.log(this.props.worker)

    this.line = new Polyline(Object.assign({}, renderedPolyline, paths))

    this.line.setMap(this.props.map)

    return null
  }

  renderPolyline() {
    throw new Error('No hay mapa')
  }
}

class Normal extends Polyline {

  renderPolyline() {
    return {
      geodesic: true,
      strokeColor: this.props.color || '#030518',
      strokeOpacity: 1,
      strokeWeight: 4
    }
  }
}

export default Normal