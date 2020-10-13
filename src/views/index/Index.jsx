import React, { Component } from "react";
import "./layout.scss";

import Aside from "./components/Aside";
import Head from "./components/Head";
import Container from "@/components/container";

import { Layout } from "antd";
const { Header, Sider, Content } = Layout;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    const {collapsed} = this.state;
    return (
      <Layout className="layout-wrap">
        <Sider width="250px" collapsed={this.state.collapsed}>
          <Aside />
        </Sider>
        <Layout>
          <Header className="layout-header">
            <Head toggle={this.toggleCollapsed} collapsed={collapsed}/>
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
