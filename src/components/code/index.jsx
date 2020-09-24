import React, { Component } from "react";
import PropTypes from "prop-types";

import { GetCode } from "../../api/account";

import { Button } from "antd";

//验证码状态
const codeStatus = {
  get: "获取验证码",
  send: "发送中",
  fail: "重新获取",
};

//定时器
let timerId = null;

class Code extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username, //初始化默认值
      isDisable: true,
      code_loadings: false,
      code_text: codeStatus.get,
    };
  }

  componentWillReceiveProps({username}) {
    this.setState({ username });
  }

  componentWillUnmount(){
    clearInterval(timerId);//组件销毁时消除定时器
  }

  componentDidMount(){
    this.props.onRef(this)
  }

  //切换按钮禁用与否
  toggleStatus = (value) => {
    this.setState({isDisable: value})
  }

  //获取验证码
  //this.props.username 每次都会去获取
  getCode = () => {
    // if(!this.props.username){
    //   message.warning("用户名不能为空！")
    // }
    this.setState({ code_loadings: true, code_text: codeStatus.send });
    const requestData = {
      // username: this.props.username,每次都会去获取一次值，这样消耗性能,使用componentWillReceiveProps来解决
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
  render() {
    const { isDisable, code_loadings, code_text } = this.state;
    return (
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
    );
  }
}
Code.propTypes = {
  username: PropTypes.string.isRequired,
};
export default Code;
