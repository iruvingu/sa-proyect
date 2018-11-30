import React, { Component } from 'react'
import MapContainer from './MapContainer'
import { connect } from 'react-redux'
import { fetchFirebaseDB } from '../../actions'

class MapTrack extends Component {
  componentDidMount() {
    this.props.fetchFirebaseDB()
  }

  render() {
    const { data } = this.props
    return (
      <MapContainer workers={data} />
    )
  }
}

const mapStateToProps = ({ data }) => {
  return ({ data })
}

export default connect(mapStateToProps, { fetchFirebaseDB })(MapTrack)