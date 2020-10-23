import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {AuthPage} from "./pages/AuthPage";
import {UsersPage} from "./pages/user/UsersPage";
import {UsersDetailPage} from "./pages/user/UserDetailPage";
import {MainPage} from "./pages/MainPage";

export const useRoutes = () => {

  const allRoutes = () => {
    return (
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/users" exact>
          <UsersPage />
        </Route>
        <Route path="/users/:id">
          <UsersDetailPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  const authRoutes = () => {
    return(
      <Switch>
        <Route path="/auth" exact>
          <AuthPage />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return { allRoutes, authRoutes }

}