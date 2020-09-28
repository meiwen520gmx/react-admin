import React, { Component } from "react";
import { Switch } from "react-router-dom";

import User from "../../views/user/Index";
import AddUser from "../../views/user/Add";

import PrivateRouter from "../privateRouter/Index";
class Container extends Component {
  render() {
    return (
      <Switch>
        <PrivateRouter exact path="/index/user/list" component={User} />
        <PrivateRouter exact path="/index/user/addUser" component={AddUser} />
      </Switch>
    );
  }
}

export default Container;
