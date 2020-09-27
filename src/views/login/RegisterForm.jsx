import React, { Component, Fragment } from "react";
import CryptoJs from 'crypto-js';

import { Form, Input, Button, Row, Col, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import Code from "../../components/code/index";

import { validate_email } from "../../utils/validate";

import { Register } from "../../api/account";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      module: "register"
    };
  }
  onFinish = (values) => {
    values.password = CryptoJs.MD5(values.password).toString();//加密
    values.repassword = CryptoJs.MD5(values.repassword).toString();
    Register(values).then((res) => {
      message.success(res.message);
      if(res.resCode === 0){//注册成功切换去登录页面
        this.toggle();
      }
    }).catch((error) => {});
  };
  toggle = () => {
    this.props.handleChange("login");
  };
  //input输入处理
  changeName = (e) => {
    let value = e.target.value;
    this.setState({ username: value });
  };

  render() {
    const {username, module} = this.state;
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
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || validate_email(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject("邮箱格式不正确！");
                  },
                }),
              ]}
            >
            <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="邮箱"
                value={username}
                onChange={this.changeName}   
            />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入密码!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    let repwd = getFieldValue("repassword");
                    if (repwd && value !== repwd) {
                      return Promise.reject("两次密码不一致!");
                    }
                    return Promise.resolve();
                  },
                }),
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
                    return Promise.reject("两次密码不一致!");
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
                      {
                        len:6,
                        message: "请输入长度为6位的验证码!"
                      },
                    ]}
                  >
                    <Input placeholder="验证码" />
                  </Form.Item>
                </Col>
                <Col span={9}>
                   <Code username={username} module={module} />
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
