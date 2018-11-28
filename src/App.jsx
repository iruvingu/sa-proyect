import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUser } from './actions'
/**
 * Components
 */
import HomePage from './components'
import requireAuth from './components/auth/authRequire'
import SignIn from './components/auth'

class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route exact path="/sa-app/login" component={SignIn} />
          <Route path="/sa-app/home" component={requireAuth(HomePage)} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, { fetchUser })(App);
