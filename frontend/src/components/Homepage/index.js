import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import GoalForm from '../../containers/GoalFormContainer';
import { Row, Col, Button } from 'antd';
import Goals from '../Goals';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: pink;
  padding: 4rem;
  margin: 2rem;
`;

const H1 = styled.h1`
  float: left;
  display: inline-block;
  color: darkgray;
`;

const InlineWrapper = styled.div`
  float: right;
`;
export default class Homepage extends Component {
  state = { loading: true, redirect: false };

  async componentDidMount() {
    await this.props.fetchCurrentUser();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }

    return (
      <Wrapper>
        <Row>
          <Col>
            <H1>Goals</H1>
            <InlineWrapper>
              <Button onClick={this.props.logout}>Logout</Button>
            </InlineWrapper>
          </Col>
        </Row>
        <Row>
          <Col>
            <Goals goals={this.props.currentUser.goals} />
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col>
            <GoalForm />
          </Col>
        </Row>
      </Wrapper>
    );
  }
}
