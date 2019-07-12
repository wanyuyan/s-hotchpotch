import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import containers from "./routes";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={containers.Home} />
        <Route path="/rtc" component={containers.RTCDemo} />
        <Route path="/iframe" component={containers.IframeDemo} />
        <Route component={containers.NotFound} />
      </Switch>
    </Router>
  );
}

export default AppRouter;