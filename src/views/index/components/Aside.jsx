import React, { Component, Fragment } from "react";
import "./aside.scss";

import AsideMenu from "@/components/asideMenu/Index";

class Aside extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <h1 className="logo">
          <span>LOGO</span>
        </h1>
        {/* 把侧边栏单独生成一个组件 */}
        <AsideMenu />
        {/* <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            Option 1
          </Menu.Item>

          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>

        </Menu> */}
      </Fragment>
    );
  }
}

export default Aside;
