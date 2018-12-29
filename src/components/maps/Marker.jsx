import React, { Component } from 'react'

import {greatPlaceStyle, greatPlaceStyleHover} from './greatPlaceStyle'

class Marker extends Component {
  render() {
    const style = this.props.$hover ? greatPlaceStyleHover : greatPlaceStyle;
    console.log(this.props)
    return (
       <div style={style}>
          {this.props.text}
       </div>
    )
  }
}

export default Marker