import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import CollectionsPage from '../../containers/GoalFormContainer';
import { Row, Col } from 'antd';
export default class Homepage extends Component {
  state = { loading: true, redirect: false };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }

    return (
      <Row type="flex" justify="center">
        <Col>
          <CollectionsPage />
        </Col>
      </Row>
    );
  }
}

Homepage.propTypes = {
  currentUser: PropTypes.object,
  jobs: PropTypes.arrayOf(PropTypes.object)
};
