import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./router";
import initReactFastclick from 'react-fastclick';
import "./styles/app.scss";

const App = function() {
  return (
    <div>
      <AppRouter />
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("app"));
initReactFastclick();