import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './style.css';
const DEFAULT_STATE = {
  username: '',
  password: ''
};

export default class Login extends Component {
  state = DEFAULT_STATE;

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.props.clearError();
    let userCredentials = { ...this.state };
    // call redux
    try {
      await this.props.authRequest(
        'user',
        userCredentials.username,
        userCredentials.password
      );
      this.props.history.push('/');
    } catch (error) {
      return;
    }
  };

  render() {
    return (
      <div className="login-container">
        <div className="login-form-container">
          <h2>
            Welcome to Goal-Do-It, where you can totally like, keep track of
            your goals and stuff.
          </h2>
          <form onSubmit={this.handleSubmit}>
            <li className="login-form-row">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                onChange={this.handleChange}
                value={this.state.username}
              />
            </li>
            <li className="login-form-row">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </li>
            <li className="login-form-row">
              <button type="submit">Login</button>
            </li>
          </form>
          <div className="signup-link">
            <Link to="/signup">New to Goal-Do-It? Sign Up!</Link>
          </div>
        </div>
      </div>
    );
  }
}
