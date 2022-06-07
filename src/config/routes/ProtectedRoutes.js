import { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "./routes";

const ProtectedRoutes = () => (
  <Switch>
    <Suspense>
      {routes.map(({ component: Component, path, exact }) => (
        <Route path={`/${path}`} key={path} exact={exact}>
          <Component />
        </Route>
      ))}
    </Suspense>
  </Switch>
);

export default ProtectedRoutes;
