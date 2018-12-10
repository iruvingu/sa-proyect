import React, { Component } from 'react'
import MapContainer from './MapContainer'
import { connect } from 'react-redux'
import { fecthRealTimeUsersLocationDB, listenDataAddedChild } from '../../actions'

class MapTrack extends Component {
  componentDidMount() {
    this.props.listenDataAddedChild()
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

export default connect(mapStateToProps, { fecthRealTimeUsersLocationDB, listenDataAddedChild })(MapTrack)