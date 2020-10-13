import React, { Component } from "react";
import { Switch } from "react-router-dom";
//拿到组件对象
import configRouters from "./components";

// import User from "../../views/user/Index";
// import AddUser from "../../views/user/AddUser";
// import PartList from "../../views/department/Index";
// import AddPart from "../../views/department/AddPart";

import PrivateRouter from "../privateRouter";


class Container extends Component {
  render() {
    return (
      <Switch>
        {
          configRouters.map((item, key) => <PrivateRouter exact path={item.path} component={item.component} key={key}/>)
        }
        {/* <PrivateRouter exact path="/index/user/index" component={User} />
        <PrivateRouter exact path="/index/user/adduser" component={AddUser} />
        <PrivateRouter exact path="/index/department/index" component={PartList} />
        <PrivateRouter exact path="/index/department/addpart" component={AddPart} /> */}
      </Switch>
    );
  }
}

export default Container;
