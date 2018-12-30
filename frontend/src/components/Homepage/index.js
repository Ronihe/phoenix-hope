import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import CollectionsPage from '../../containers/GoalFormContainer';
import { Row, Col } from 'antd';
import Goals from '../Goals';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: lightgrey;
  padding: 4rem;
  margin: 2rem;
`;

const H1 = styled.h1`
  color: darkgray;
`;
export default class Homepage extends Component {
  state = { loading: true, redirect: false };

  async componentDidMount() {
    await this.props.fetchCurrentUser();
    console.log(this.props.currentUser);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }

    return (
      <Wrapper>
        <H1>Goals</H1>
        <Row>
          <Col>
            <Goals goals={this.props.currentUser.goals} />
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col>
            <CollectionsPage />
          </Col>
        </Row>
      </Wrapper>
    );
  }
}
