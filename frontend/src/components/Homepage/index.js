import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import GoalForm from '../../containers/GoalFormContainer';
import { Row, Col, Button } from 'antd';
import GoalsList from '../GoalsList';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #dcdde1;
  margin: 0 auto !important;
  padding: 4rem;
  margin: ${props => props.margin || '0'};
  max-width: 800px;
`;

const Wrapper = styled.div`
  background-color: #dcdde1;
  padding: 4rem;
  margin: ${props => props.margin || '0'};
`;

const H1 = styled.h1`
  float: left;
  display: inline-block;
  color: #487eb0;
`;

const Quote = styled.div`
  display: flex;
  justify-content: center;
`;

const InlineWrapper = styled.div`
  float: right;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  margin: ${props => props.margin || '0'};
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
      <div>
        <Container>
          <Row>
            <Col>
              <H1>Goals</H1>
              <InlineWrapper>
                <Button onClick={this.props.logout}>Logout</Button>
              </InlineWrapper>
            </Col>
          </Row>
          <GoalsList goals={this.props.currentUser.goals} />
          <Div margin="1rem 0">
            <GoalForm />
          </Div>
        </Container>
        <Quote>
          <h3>
            "Success is the progressive realization of a worthy goal or ideal."
            —Earl Nightingale
          </h3>
        </Quote>
      </div>
    );
  }
}
