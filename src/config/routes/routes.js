import { lazy } from "react";

const routes = [
  {
    path: "",
    component: lazy(() => import("../../pages/Home/HomePage")),
    exact: true,
  },
  {
    path: "login",
    component: lazy(() => import("../../pages/Auth/AuthPage")),
  },
  {
    path: "register",
    component: lazy(() => import("../../pages/Auth/AuthPage")),
  },
  {
    path: "players",
    component: lazy(() => import("../../pages/Players/List/PlayersListPage")),
    exact: true,
  },
];

export default routes;
