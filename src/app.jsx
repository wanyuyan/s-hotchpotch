import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./router";
import FullScreen from "Components/ui/FullScreen";
import initReactFastclick from 'react-fastclick';
import "./styles/app.scss";

const App = function() {
  return (
    <div>
      <AppRouter />
      <FullScreen />
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById("app"));
initReactFastclick();