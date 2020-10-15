import React, { Component, Fragment } from "react";
import { Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
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
        <div className="header-avator">{this.props.username || "管理员"}</div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return { username: state.userReducer.username }; //要什么取什么，不能多取，对性能不好
};

export default connect(mapStateToProps, null)(Head);
