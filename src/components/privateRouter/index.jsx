import React from "react";
import { Route, Redirect } from "react-router-dom";

import { getValue, AdminToken } from "../../utils/token";
const PrivateRouter = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        getValue(AdminToken) ? <Component {...routeProps} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRouter;
