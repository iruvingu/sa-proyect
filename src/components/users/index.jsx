import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchFirebaseDB } from '../../actions'
import UserList from './UserList'

class SomeUsers extends Component {
    componentDidMount() {
      this.props.fetchFirebaseDB()
    }

    render() {
      const { data } = this.props
      return (
          <UserList users={data} />
      )
    }
}

const mapStateToProps = ({ data }) => {
  return { data }
}

export default connect(mapStateToProps, { fetchFirebaseDB })(SomeUsers)
