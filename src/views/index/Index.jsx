import React, {Component} from "react";
import "./layout.scss";

import Aside from "./components/Aside";
import Head from "./components/Head";
import Container from "../../components/container/Index";

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
          <Header className="layout-header">
             <Head />
          </Header>
          <Content className="layout-main">
             <Container />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Index;