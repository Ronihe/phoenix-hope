import React, { Component } from 'react';
import { Collapse } from 'antd';
import EditGoalForm from '../../containers/EditGoalContainer';
import moment from 'moment';
import uuid from 'uuid/v4';
const Panel = Collapse.Panel;
const Goal = props => {
  const { goal } = props;
  return (
    <Panel header={`Goal: ${goal.title}`} key={uuid()}>
      <p>Description: {goal.description}</p>
      <p>Date: {moment(goal.due_date).format('MM/DD/YYYY')}</p>
      <p>Due: {moment(goal.due_date).fromNow()}</p>
      <EditGoalForm goal={goal} />
    </Panel>
  );
};

export default Goal;
