import { useEffect, lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth, onAuthStateChanged } from "./config/firebase";

import { login, logout, selectAuthenticate } from "./store/user/userSlice";
import { fetchTeams } from "./store/teams/teams-actions";

import PublicRoute from "./config/routes/PublicRoute";
import PrivateRoute from "./config/routes/PrivateRoute";
import ProtectedRoutes from "./config/routes/ProtectedRoutes";

import Layout from "./components/Layout/Layout";

import "./App.scss";

//lazy loading routes
const HomePage = lazy(() => import("./pages/Home/HomePage"));
const AuthPage = lazy(() => import("./pages/Auth/AuthPage"));
const PlayersListPage = lazy(() =>
  import("./pages/Players/List/PlayersListPage")
);
const PlayerDetailPage = lazy(() =>
  import("./pages/Players/Detail/PlayerDetailPage")
);

function App() {
  const isAuthenticated = useSelector(selectAuthenticate);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // user is logged in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <Layout>
      <Suspense>
        <Switch>
          <PrivateRoute path="/" exact isAuthenticated={isAuthenticated}>
            <HomePage />
          </PrivateRoute>
          <PublicRoute path="/register" isAuthenticated={isAuthenticated}>
            <AuthPage />
          </PublicRoute>
          <PublicRoute path="/login" isAuthenticated={isAuthenticated}>
            <AuthPage />
          </PublicRoute>
          <PrivateRoute path="/players" exact isAuthenticated={isAuthenticated}>
            <PlayersListPage />
          </PrivateRoute>
          <PrivateRoute
            path="/players/:playerId"
            exact
            isAuthenticated={isAuthenticated}
          >
            <PlayerDetailPage />
          </PrivateRoute>

          <ProtectedRoutes />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
