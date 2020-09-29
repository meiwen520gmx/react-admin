import React, { Component } from "react";

import { Form, Input, Button, Radio, InputNumber, message } from "antd";

import { AddDepartment } from "../../api/department";

class AddPart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 },
      },
      loading: false,
    };
  }
  onSubmit = (values) => {
    this.setState({ loading: true });
    AddDepartment(values)
      .then((res) => {
        
        if (res.resCode === 0) {
          message.success(res.message);
        } else {
          message.warning(res.message);
        }
        this.setState({ loading: false });
        this.form.resetFields();//重置表单
      })
      .catch((error) => {
        message.error(error);
        this.setState({ loading: true });
      });
    console.log(values);
  };

  render() {
    const { formLayout, loading } = this.state;
    return (
      <Form
        ref={form => this.form = form}
        onFinish={this.onSubmit}
        {...formLayout}
        initialValues={{
          number: 0,
          status: false,
        }}
      >
        <Form.Item
          label="部门名称"
          name="name"
          rules={[
            {
              required: true,
              message: "部门不能为空！",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="人员数量"
          name="number"
          rules={[
            {
              required: true,
              message: "人员数量不能为空！",
            },
          ]}
        >
          <InputNumber min={1} max={100} />
        </Form.Item>
        <Form.Item label="禁启用" name="status">
          <Radio.Group>
            <Radio value={false}>禁用</Radio>
            <Radio value={true}>启用</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="描述"
          name="content"
          rules={[
            {
              required: true,
              message: "描述不能为空！",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default AddPart;
