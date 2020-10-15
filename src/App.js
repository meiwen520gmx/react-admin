import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./views/login/index";
import Index from "./views/index/Index";
import { Provider } from "react-redux";
import store from "@/store";

import PrivateRouter from "./components/privateRouter";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          {/* <Route exact path="/index" component={Index}/> */}
          <PrivateRouter component={Index} path="/index" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
