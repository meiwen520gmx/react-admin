import React, { Component } from "react";

import { Form, Input, Button, Radio, InputNumber } from "antd";

import { AddDepartment } from "../../api/department";

class AddPart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 },
      },
    };
  }
  onSubmit = (values) => {
    AddDepartment(values)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(values);
  };

  render() {
    const { formLayout } = this.state;
    return (
      <Form
        onFinish={this.onSubmit}
        {...formLayout}
        initialValues={{
          number: 0,
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
          <InputNumber min={0} max={100} />
        </Form.Item>
        <Form.Item
          label="禁启用"
          name="status"
          rules={[
            {
              required: true,
              message: "禁启用不能为空！",
            },
          ]}
        >
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
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default AddPart;
