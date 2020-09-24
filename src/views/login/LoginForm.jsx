import React, { Component, Fragment } from "react";

import { Form, Input, Button, Row, Col, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { validate_email } from "../../utils/validate";

import { Login, GetCode } from "../../api/account";

//验证码状态
const codeStatus = {
  get: "获取验证码",
  send: "发送中",
  fail: "重新获取",
};

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      isDisable: true,
      code_loadings: false,
      code_text: codeStatus.get,
    };
  }
  //点击登录按钮
  onFinish = (values) => {
    Login(values)
      .then((response) => {
        // console.log(response)
      })
      .catch((error) => {});
    console.log("Received values of form: ", values);
  };

  //获取验证码
  getCode = () => {
    // if(!this.state.username){
    //   message.warning("用户名不能为空！")
    // }
    this.setState({ code_loadings: true, code_text: codeStatus.send });
    const requestData = {
      username: this.state.username,
      module: "login",
    };
    GetCode(requestData)
      .then((res) => {
        //执行倒计时
        this.countDown();
      })
      .catch((error) => {
        this.setState({ code_loadings: false, code_text: codeStatus.fail });
      });
  };
  //倒计时
  countDown = () => {
    let timerId = null;
    let sec = 5;
    this.setState({
      code_loadings: false,
      code_text: `${sec}s`,
      isDisable: true,
    });
    timerId = setInterval(() => {
      sec--;
      if (sec === 0) {
        clearInterval(timerId);
        this.setState({
          code_text: codeStatus.fail,
          isDisable: false,
        });
        return false;
      }
      this.setState({
        code_text: `${sec}s`,
      });
    }, 1000);
  };
  //input输入处理
  changeName = (e) => {
    let value = e.target.value;
    this.setState({ username: value });
  };

  //切换登录注册
  toggle = () => {
    this.props.handleChange("register");
  };

  render() {
    const { username, isDisable, code_loadings, code_text } = this.state;
    const _this = this;
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
              name="username"
              rules={[
                {
                  required: true,
                  message: "请输入邮箱!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (validate_email(value)) {
                      _this.setState({ isDisable: false });
                      return Promise.resolve();
                    }
                    if (!value) {
                      return Promise.resolve();
                    }
                    _this.setState({ isDisable: true });
                    return Promise.reject("邮箱填写错误！");
                  },
                }),
                // {
                //   type: "email",
                //   message: "邮箱填写错误!",
                // },
                // ({ getFieldValue }) => ({
                //   //getFieldValue是从context上下文中解构出来的
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
                value={username}
                onChange={this.changeName}
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
            <Form.Item>
              <Row gutter={10}>
                <Col span={14}>
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
                <Col span={10}>
                  {/* 发送验证码有四种状态：获取验证码，发送中，60s，重新获取 */}
                  <Button
                    type="primary"
                    danger
                    block
                    onClick={this.getCode}
                    disabled={isDisable}
                    loading={code_loadings}
                  >
                    {code_text}
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
