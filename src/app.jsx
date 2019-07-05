import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./router";
import initReactFastclick from 'react-fastclick';
import "./styles/app.scss";

ReactDOM.render(<AppRouter />, document.getElementById("app"));
initReactFastclick();