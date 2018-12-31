import React, { Component } from 'react';
import { Collapse, Button } from 'antd';
import uuid from 'uuid/v4';
import moment from 'moment';
import EditGoalForm from '../../containers/EditGoalContainer';
const Panel = Collapse.Panel;

class Goals extends Component {
  state = {};

  render() {
    return (
      <Collapse>
        {this.props.goals.map(goal => {
          return (
            <Panel header={`Goal: ${goal.title}`} key={uuid()}>
              <p>Description: {goal.description}</p>
              <p>Date: {moment(goal.due_date).format('MM/DD/YYYY')}</p>
              <p>Due: {moment(goal.due_date).fromNow()}</p>
              <EditGoalForm goal={goal} />
            </Panel>
          );
        })}
      </Collapse>
    );
  }
}

export default Goals;
