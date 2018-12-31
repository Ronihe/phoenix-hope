import React, { Component } from 'react';
import { Button, Modal, Form, Input, DatePicker } from 'antd';
import moment from 'moment';

export const CollectionCreateForm = Form.create()(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form, goal } = this.props;
      const { getFieldDecorator } = form;
      const config = {
        rules: [
          { type: 'object', required: true, message: 'Please select time!' }
        ],
        initialValue: moment(goal.due_date)
      };
      return (
        <Modal
          visible={visible}
          title="Edit this goal"
          okText="Edit"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Title">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter a goal!'
                  }
                ],
                initialValue: goal.title
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Description">
              {getFieldDecorator('description', {
                initialValue: goal.description
              })(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="Due Date">
              {getFieldDecorator('due_date', config)(<DatePicker />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

export class EditGoalForm extends React.Component {
  state = {
    visible: false
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = async () => {
    const form = this.formRef.props.form;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      const payload = {
        ...values,
        due_date: values.due_date._d
      };

      await this.props.editGoalRequest(this.props.goal.id, payload);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button
          type="primary"
          onClick={this.showModal}
          shape="circle"
          icon="edit"
        />
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          goal={this.props.goal}
        />
      </div>
    );
  }
}
