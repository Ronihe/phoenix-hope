import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';
import './style.css';

export default class Homepage extends Component {
  state = { loading: true, redirect: false };

  async componentDidMount() {
    await this.props.fetchCurrentUser();
    await this.props.fetchJobsRequest();
    this.setState({ loading: false });
  }

  render() {
    const { jobs } = this.props;

    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <h1>Hey</h1>
      </div>
    );
  }
}

Homepage.propTypes = {
  currentUser: PropTypes.object,
  jobs: PropTypes.arrayOf(PropTypes.object)
};
