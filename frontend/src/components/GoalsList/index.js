import React, { Component } from 'react';
import { Collapse, Button } from 'antd';
import uuid from 'uuid/v4';
import moment from 'moment';
import EditGoalForm from '../../containers/EditGoalContainer';
import styled from 'styled-components';
import DeleteGoalButton from '../../containers/DeleteButtonContainer';

const Panel = Collapse.Panel;
const Div = styled.div`
  display: flex;
  margin: ${props => props.margin || '0'};
`;

class GoalsList extends Component {
  state = {};

  render() {
    const { goals } = this.props;
    return (
      <Collapse>
        {goals.map(goal => {
          return (
            <Panel header={`Goal: ${goal.title}`} key={uuid()}>
              <p>Description: {goal.description}</p>
              <p>Date: {moment(goal.due_date).format('MM/DD/YYYY')}</p>
              <p>Due: {moment(goal.due_date).fromNow()}</p>
              <Div>
                <EditGoalForm goal={goal} />
                <Div margin="0 1rem">
                  <DeleteGoalButton id={goal.id} />
                </Div>
              </Div>
            </Panel>
          );
        })}
      </Collapse>
    );
  }
}

export default GoalsList;
