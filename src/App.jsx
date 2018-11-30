import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { connect } from 'react-redux'
import { fetchUser } from './actions'
/**
 * Components
 */
import HomePage from './components'
import requireAuth from './components/auth/authRequire'
import LoginContainer from './components/auth'
import UserDetail from './components/users/detalle/UserDetails'

class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Router history={createBrowserHistory()}>
        <Switch>
          <Route exact path="/login" component={LoginContainer} />
          <Route path="/user/detail" component={UserDetail} />
          <Route path="/" component={requireAuth(HomePage)} />
        </Switch>
      </Router>
    );
  }
}

export default connect(null, { fetchUser })(App);
