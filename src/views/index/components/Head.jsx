import React, { Component, Fragment } from "react";
import { Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
class Head extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  toggle = () => {
    this.props.toggle();
  };

  render() {
    const { collapsed } = this.props;
    return (
      <Fragment>
        <Button type="primary" className="collapsed-btn" onClick={this.toggle}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
          )}
        </Button>
        头部
      </Fragment>
    );
  }
}

export default Head;
