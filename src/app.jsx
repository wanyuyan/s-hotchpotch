import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Button, Switch, Tag } from "antd-mobile";
import "./style/reset.scss";

function App() {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));