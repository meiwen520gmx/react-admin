import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store";
console.log(store.getState())
const render = () => ReactDOM.render(<App />, document.getElementById("root"));

render()

store.subscribe(render)