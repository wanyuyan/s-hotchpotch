import { Route, Switch } from "react-router-dom";
import appRoutes from "./routes";
import loadable from "@loadable/component";
import Loading from "./Loading";

const loadFallback = {fallback: Loading};

export default router = (
  <Switch>
    {appRoutes.map((route, i) => {
      <Route
        key={i}
        exact={route.exact}
        path={route.path}
        component={loadable(() => import(route.containerPath), loadFallback)}
      />
    })}
    <Route component={loadable(() => import("./404"), loadFallback)} />
  </Switch>
);
