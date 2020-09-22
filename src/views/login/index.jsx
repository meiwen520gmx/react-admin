import React, { Component } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { UserOutlined,LockOutlined} from "@ant-design/icons";

import "./index.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  render() {
    return (
      <div className="form-wrap">
        <div>
          <div className="form-header">
            <h4 className="column">登录</h4>
            <span>账号注册</span>
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
                    message: "Please input your Username!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
							<Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
									prefix={<LockOutlined className="site-form-item-icon"/>}
									type="password"
                  placeholder="Password"
                />
              </Form.Item>
							<Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
               <Row gutter={10}>
								 <Col span={15}><Input placeholder="Code" /></Col>
								 <Col span={9}><Button type="primary" danger block>获取验证码</Button></Col>
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
        </div>
      </div>
    );
  }
}

export default Login;
