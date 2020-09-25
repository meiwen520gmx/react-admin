import React, { Component } from "react";
import PropTypes from "prop-types";
import { message } from 'antd';

import { GetCode } from "../../api/account";
import { validate_email } from "../../utils/validate";

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
      isDisable: false,
      code_loadings: false,
      code_text: codeStatus.get,
      module: props.module,
    };
  }

  //react16.3更新了生命周期函数，不建议使用componentWillReceiveProps、componentWillUpdate、componentWillMount
  // componentWillReceiveProps({username}) {
  //   this.setState({ username });
  // }
  static getDerivedStateFromProps(nextProps, prevState) {
    const { username } = nextProps;
    // 当传入的username发生变化的时候，更新state
    if (username !== prevState.username) {
      return { username };
    }
    // 否则，对于state不进行任何操作
    return null;
  }

  componentWillUnmount() {
    clearInterval(timerId); //组件销毁时消除定时器
  }

  // componentDidMount() {
  //   this.props.onRef(this);
  // }

  //获取验证码
  //this.props.username 每次都会去获取
  getCode = () => {
    let {username} = this.state;
    if(!username){
      message.warning("邮箱不能为空！");
      return false;
    }
    if(!validate_email(username)){
      message.warning("邮箱格式不正确！");
      return false;
    }
    this.setState({ code_loadings: true, code_text: codeStatus.send  });
    const requestData = {
      // username: this.props.username,每次都会去获取一次值，这样消耗性能,使用componentWillReceiveProps来解决
      username: this.state.username,
      module: this.state.module,
    };
    GetCode(requestData)
      .then((res) => {
        message.success(res.message)
        this.countDown(); //执行倒计时
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
  module: PropTypes.string.isRequired
};
export default Code;
