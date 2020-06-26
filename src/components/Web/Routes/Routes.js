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
import ArticleView from "../../../pages/Article/ArticleView/ArticleView";
import EditProfile from "../../../components/Form/EditProfile";
import Chat from "../../../pages/Chat/Chat";

import AuthVerifyEmail from "../../../pages/Auth/AuthVerifyEmail";

import AdminMain from "../../../pages/Admin/AdminMain/AdminMain";
import AdminUser from "../../../pages/Admin/AdminUser/AdminUser";
import AdminUsers from "../../../pages/Admin/AdminUsers/AdminUsers";
import AdminArticles from "../../../pages/Admin/AdminArticles/AdminArticles";
import AdminArticlesEdit from "../../../pages/Admin/AdminArticles/AdminArticlesEdit";
import AdminArticlesApi from "../../../pages/Admin/AdminArticles/AdminArticlesApi";
import AdminArticle from "../../../pages/Admin/AdminArticle/AdminArticle";
import AdminChat from "../../../pages/Admin/AdminChat/AdminChat";

import ErrorRoute from "../../../pages/ErrorRoute/ErrorRoute";

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
  { path: "/", component: Main, withLoadingProps: { auto: false } },
  { path: "/record", component: Record, withLoadingProps: { time: 700 } },
  { path: "/result", component: Result, withLoadingProps: { auto: false } },
  { path: "/article", component: Article, withLoadingProps: { auto: false } },
  {
    path: "/article/:articleId",
    component: ArticleView,
    withLoadingProps: { auto: false },
  },
  {
    path: "/editProfile",
    component: EditProfile,
  },
  {
    path: "/chat",
    component: Chat,
  },
];

const adminRoutes = [
  {
    path: "/admin",
    component: AdminMain,
    withLoadingProps: { auto: false },
  },
  {
    path: "/admin/users",
    component: AdminUsers,
    withLoadingProps: { auto: false },
  },
  {
    path: "/admin/users/:userId",
    component: AdminUser,
    withLoadingProps: { auto: false },
  },
  {
    path: "/admin/articles",
    component: AdminArticles,
    withLoadingProps: { auto: false },
  },
  { path: "/admin/articles/add", component: AdminArticlesEdit },
  { path: "/admin/articles/edit/:articleId", component: AdminArticlesEdit },
  {
    path: "/admin/articles/api",
    component: AdminArticlesApi,
    withLoadingProps: { auto: false },
  },
  { path: "/admin/articles/:articleId", component: AdminArticle },
  {
    path: "/admin/chat",
    component: AdminChat,
    withLoadingProps: { auto: false },
  },
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
  {
    path: "/error",
    component: withLoading(ErrorRoute),
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
      case "admin": {
        checkRoutes = adminRoutes;
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
      } ${userState === "admin" ? classes.PageAdmin : classes.PageUser}`}
    >
      {routes ? (
        <Switch>
          {routes.map(({ path, component }) => (
            <Route key={path} exact path={path} component={component} />
          ))}
          {authRoute.map(({ path, component }) => (
            <Route key={path} exact path={path} component={component} />
          ))}
          {userState === "admin" ? <Redirect from="/" to="/admin" /> : null}
          <Redirect
            to={
              userState === "notVerified" || userState === "notSignIn"
                ? "/"
                : "/error"
            }
          />
        </Switch>
      ) : null}
    </div>
  );
};

export default Routes;
