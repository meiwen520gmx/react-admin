import React, { Component, Fragment } from "react";

import { Form, Input, Button, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import {validate_tel} from "../../utils/validate";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  toggle = () => {
    this.props.handleChange("register");
  };

  render() {
    return (
      <Fragment>
        <div className="form-header">
          <h4 className="column">登录</h4>
          <span onClick={this.toggle}>账号注册</span>
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
              name="telphone"
              rules={[
                {
                  required: true,
                  message: "请输入手机号!",
                },
                ({ getFieldValue }) => ({//getFieldValue是从context上下文中解构出来的
                  validator(rule, value) {
                    if (!value || validate_tel.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject("手机号填写错误！");
                  },
                }),
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="手机号"
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
            <Form.Item>
              <Row gutter={10}>
                <Col span={15}>
                  <Form.Item
                    name="captcha"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: "请输入验证码!",
                      },
                    ]}
                  >
                    <Input placeholder="验证码"/>
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
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Fragment>
    );
  }
}

export default LoginForm;
