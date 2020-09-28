import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

import {setValue, openKey, getValue} from "../../utils/token";

import Router from "../../router/index";
import { UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
const { SubMenu } = Menu;

class AsideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [],
      openKeys: [],
    };
  }
  //菜单高光(公共方法)
  selectMenuHigh = ({ selectedKeys, openKeys }) => {
    this.setState({
      selectedKeys,
      openKeys,
    });
  };
  componentDidMount() {
    const { pathname } = this.props.location;//拿到之前高亮的menupath
    // const patharr = pathname.split("/");
    // const openPath = patharr.slice(0, patharr.length-1).join("/");
    const openPath = JSON.parse(getValue(openKey))//获取之前打开的所有父级menu，数组格式
    const menuHign = {
      selectedKeys: [pathname],
      openKeys: openPath,
    };
    this.selectMenuHigh(menuHign);
  }
  //选择菜单
  selectMenu = ({ key, keyPath }) => {
    const menuHign = {
      selectedKeys: [key],
      // openKeys: [keyPath[keyPath.length - 1]], //数组的最后一项
      openKeys: keyPath,
    };
    setValue(openKey, JSON.stringify(keyPath))
    this.selectMenuHigh(menuHign);
  };
  //打开menu
  openMenu = (openKeys) => {
    this.setState({
      openKeys,
    });
    setValue(openKey, JSON.stringify(openKeys))
  };
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
    const { selectedKeys, openKeys } = this.state;
    return (
      <Fragment>
        <Menu
          theme="dark"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onClick={this.selectMenu}
          onOpenChange={this.openMenu}
          mode="inline"
        >
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

export default withRouter(AsideMenu);
