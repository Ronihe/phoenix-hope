import React, { Component } from 'react';
import { Collapse } from 'antd';
import uuid from 'uuid/v4';
const Panel = Collapse.Panel;
function callback(key) {}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

class Goals extends Component {
  state = {};

  render() {
    const title = 'hey';
    console.log(this.props);
    return (
      <Collapse onChange={callback}>
        {this.props.goals.map(goal => {
          return (
            <Panel header={`Goal: ${goal.title}`} key={uuid()}>
              <p>Description: {goal.description}</p>
              <p>Due Date: {goal.due_date}</p>
              <p>State: {goal.state}</p>
            </Panel>
          );
        })}
      </Collapse>
    );
  }
}

export default Goals;
