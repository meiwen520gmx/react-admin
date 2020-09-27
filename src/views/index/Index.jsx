import React, {Component} from "react";
import "./layout.scss";

import Aside from "./components/Aside";

import { Layout } from "antd";
const {Header, Sider, Content } = Layout;






class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout className="layout-wrap">
        <Sider width="250px"><Aside /></Sider>
        <Layout>
          <Header className="layout-header"></Header>
          <Content className="layout-main">内容</Content>
        </Layout>
      </Layout>
    );
  }
}

export default Index;