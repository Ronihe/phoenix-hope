import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from '../../containers/LoginContainer';
import Signup from '../../containers/Signup';
import NoAuthRoute from '../../containers/NoAuthRoute';
import ProtectedRoute from '../../containers/ProtectedRoute';
import Homepage from '../../containers/Homepage';

class Landing extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <Switch>
          {/* NoAuthRoutes only let you go to them if you haven't authenticated */}
          <NoAuthRoute exact path="/login" component={Login} />
          <NoAuthRoute exact path="/signup" component={Signup} />
          {/* ProtectedRoutes only let you go to them if you are authenticated */}
          <ProtectedRoute path="/" component={Homepage} />
        </Switch>
      </div>
    );
  }
}

export default Landing;
