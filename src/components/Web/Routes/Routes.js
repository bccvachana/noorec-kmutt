import React, { useEffect, useState, useContext } from "react";
import classes from "./Routes.module.scss";
import { Switch, Route, Redirect } from "react-router-dom";

import withLoading from "../../../hoc/withLoading/withLoading";

import Landing from "../../../pages/Landing/Landing";
import SignInForm from "../../Form/SignInForm";
import SignUpForm from "../../Form/SignUpForm";

import Auth from "../../../pages/Auth/Auth";
import AuthSuccess from "../../../pages/Auth/AuthSuccess";
import AuthError from "../../../pages/Auth/AuthError";
import ForgotPassword from "../../../components/Form/ForgotPassword";
import ResetPassword from "../../../components/Form/ResetPassword";

import Main from "../../../pages/Main/Main";
import Record from "../../../pages/Record/Record";
import Result from "../../../pages/Result/Result";
import Article from "../../../pages/Article/Article";

import AuthVerifyEmail from "../../../pages/Auth/AuthVerifyEmail";

import { Context } from "../../../App";

const defaultRoute = [
  { path: "/", component: Landing, withLoadingProps: { auto: false } },
];

const notSignInRoutes = [
  { path: "/", component: Landing },
  { path: "/signIn", component: SignInForm },
  { path: "/signUp", component: SignUpForm },
  { path: "/forgotPassword", component: ForgotPassword },
  { path: "/resetPassword", component: ResetPassword },
];

const notVerifiedRoutes = [{ path: "/", component: AuthVerifyEmail }];

const verifiedRoutes = [
  { path: "/", component: Main, withLoadingProps: { time: 700 } },
  { path: "/record", component: Record, withLoadingProps: { time: 700 } },
  { path: "/result", component: Result, withLoadingProps: { time: 1500 } },
  { path: "/article", component: Article },
];

const authRoute = [
  {
    path: "/auth/success",
    component: withLoading(AuthSuccess),
  },
  {
    path: "/auth/error",
    component: withLoading(AuthError),
  },
  {
    path: "/auth",
    component: withLoading(Auth, { auto: false }),
  },
];

const Routes = (props) => {
  const { userState } = useContext(Context);
  const [routes, setRoutes] = useState(null);

  useEffect(() => {
    let checkRoutes;
    switch (userState) {
      case "notVerified": {
        checkRoutes = notVerifiedRoutes;
        break;
      }
      case "verified": {
        checkRoutes = verifiedRoutes;
        break;
      }
      case "notSignIn": {
        checkRoutes = notSignInRoutes;
        break;
      }
      default: {
        checkRoutes = defaultRoute;
        break;
      }
    }
    setRoutes(
      checkRoutes.map(({ path, component, withLoadingProps }) => {
        return {
          path: path,
          component: withLoading(component, withLoadingProps),
        };
      })
    );
    return () => {
      checkRoutes = false;
    };
  }, [userState]);

  return (
    <div
      className={`${classes.Page} ${
        userState !== "notSignIn" ? classes.PageSignIn : ""
      }`}
    >
      {routes ? (
        <Switch>
          {routes.map(({ path, component }) => (
            <Route key={path} exact path={path} component={component} />
          ))}
          {authRoute.map(({ path, component }) => (
            <Route key={path} exact path={path} component={component} />
          ))}
          <Redirect to="/" />
        </Switch>
      ) : null}
    </div>
  );
};

export default Routes;
