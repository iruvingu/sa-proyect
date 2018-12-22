import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchFirebaseDB } from '../../actions'
import UserList from './UserList'

class SomeUsers extends Component {

  state = {
    users: {
      user: {
        name: '',
        id: ''
      }
    }
  }

  componentDidMount() {
    this.props.fetchFirebaseDB()
  }

  render() {
    const { data } = this.props
    if(!data) {
      return (
        <UserList users={this.state.users} />
      )
    } else {
      return (
        <UserList users={data} />
    )
    }
    
  }
}

const mapStateToProps = ({ data }) => {
  return { data }
}

export default connect(mapStateToProps, { fetchFirebaseDB })(SomeUsers)
