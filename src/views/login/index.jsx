import React, { Component } from "react";


import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

import "./index.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: 'login'
    };
  }
  changeFormType = (value) => {
    this.setState({formType: value})
  }
  
  render() {
    const {formType} = this.state;
    return (
      <div className="form-wrap">
        <div>
          {formType === 'login' ? <LoginForm handleChange={this.changeFormType}/> : <RegisterForm handleChange={this.changeFormType}/>}
        </div>
      </div>
    );
  }
}

export default Login;
