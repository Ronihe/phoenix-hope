import React, { Component } from 'react';
import { Button } from 'antd';

class DeleteGoalButton extends Component {
  handleDelete = async () => {
    await this.props.deleteGoalRequest(this.props.id);
  };
  render() {
    return (
      <Button onClick={this.handleDelete} type="danger" icon="delete">
        Delete
      </Button>
    );
  }
}

export default DeleteGoalButton;
