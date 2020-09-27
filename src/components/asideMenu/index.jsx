import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import Router from "../../router/index";
import { UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
const { SubMenu } = Menu;

class AsideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //无子级菜单处理
  renderMenu = ({ title, key }) => {
    return (
      <Menu.Item key={key}>
        <Link to={key}>{title}</Link>
      </Menu.Item>
    );
  };
  //子级菜单处理
  renderSubMenu = ({ title, key, subs }) => {
    return (
      <SubMenu key={key} icon={<UserOutlined />} title={title}>
        {subs &&
          subs.map((item) => {
            return item.subs && item.subs.length > 0
              ? this.renderSubMenu(item)
              : this.renderMenu(item);
          })}
      </SubMenu>
    );
  };

  render() {
    return (
      <Fragment>
        <Menu theme="dark" defaultSelectedKeys={["/index"]} mode="inline">
          {Router &&
            Router.map((firstItem) => {
              return firstItem.subs && firstItem.subs.length > 0
                ? this.renderSubMenu(firstItem)
                : this.renderMenu(firstItem);
            })}
        </Menu>
      </Fragment>
    );
  }
}

export default AsideMenu;
