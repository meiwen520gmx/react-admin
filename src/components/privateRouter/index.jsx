import React from "react";
import { Route, Redirect } from "react-router-dom";

import { getToken } from "../../utils/token";
const PrivateRouter = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        getToken() ? <Component {...routeProps} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRouter;
