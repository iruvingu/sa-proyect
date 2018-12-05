import React, { Component } from 'react'
import MapContainer from './MapContainer'
import { connect } from 'react-redux'
import { fecthRealTimeUsersLocationDB } from '../../actions'

class MapTrack extends Component {
  componentDidMount() {
    this.props.fecthRealTimeUsersLocationDB()
  }

  render() {
    const { realtimeUser } = this.props
    return (
      <MapContainer workers={realtimeUser} />
    )
  }
}

const mapStateToProps = ({ realtimeUser }) => {
  return ({ realtimeUser })
}

export default connect(mapStateToProps, { fecthRealTimeUsersLocationDB })(MapTrack)