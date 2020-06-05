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
import Result from "../../../pages/Result/Result";

import AuthVerifyEmail from "../../../pages/Auth/AuthVerifyEmail";

import { Context } from "../../../App";

const notSignInRoutes = [
  { path: "/", component: Landing },
  { path: "/signIn", component: SignInForm },
  { path: "/signUp", component: SignUpForm },
  { path: "/forgotPassword", component: ForgotPassword },
  { path: "/resetPassword", component: ResetPassword },
  { path: "/Result", component: Result },
];

const notVerifiedRoutes = [{ path: "/", component: AuthVerifyEmail }];

const verifiedRoutes = [
  { path: "/", component: Landing },
  { path: "/signIn", component: SignInForm },
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
  const { isSignIn, isVerified } = useContext(Context);
  const [routes, setRoutes] = useState(null);

  useEffect(() => {
    let checkRoutes = isSignIn
      ? isVerified
        ? verifiedRoutes
        : notVerifiedRoutes
      : notSignInRoutes;
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
  }, [isSignIn, isVerified]);

  return (
    <div className={classes.Page}>
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
