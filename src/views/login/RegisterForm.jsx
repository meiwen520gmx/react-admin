import React, { Component, Fragment } from "react";

import { Form, Input, Button, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

// import {validate_tel} from "../../utils/validate";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  toggle = () => {
    this.props.handleChange("login");
  };

  render() {
    return (
      <Fragment>
        <div className="form-header">
          <h4 className="column">注册</h4>
          <span onClick={this.toggle}>账号登录</span>
        </div>
        <div className="form-content">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "请输入邮箱!",
                },
                {
                  type: 'email',
                  message: "邮箱填写错误!",
                },
                // ({ getFieldValue }) => ({
                //   validator(rule, value) {
                //     if (!value || validate_tel.test(value)) {
                //       return Promise.resolve();
                //     }
                //     return Promise.reject("手机号填写错误！");
                //   },
                // }),
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="邮箱"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入密码!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item
              name="repassword"
              rules={[
                {
                  required: true,
                  message: "请输入确认密码!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("输入的密码不一致!");
                  },
                }),
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="确认密码"
              />
            </Form.Item>
            <Form.Item>
              <Row gutter={10}>
                <Col span={15}>
                  <Form.Item
                    name="code"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "请输入验证码!",
                      },
                    ]}
                  >
                    <Input placeholder="验证码" />
                  </Form.Item>
                </Col>
                <Col span={9}>
                  <Button type="primary" danger block>
                    获取验证码
                  </Button>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
              >
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Fragment>
    );
  }
}

export default RegisterForm;
