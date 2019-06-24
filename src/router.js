import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import containers from "./containers";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={containers.Home} />
        <Route path="/about" component={containers.About} />
        <Route path="/users" component={containers.Users} />
        <Route component={containers.NotFound} />
      </Switch>
    </Router>
  );
}

export default AppRouter;