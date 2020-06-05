import { useEffect, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";

import { Context } from "../../App";

import {
  signUp,
  signIn,
  signOut,
  verifyEmail,
  resendVerifyEmail,
  sendPasswordResetEmail,
  confirmResetPassword,
} from "../../utils/firebase/auth";

const Auth = (props) => {
  const { search, state } = useLocation();

  const { mode, oobCode } = queryString.parse(search);
  const { push } = useHistory();
  const { setIsSignUp, user } = useContext(Context);

  const delayPush = (url) => {
    const timer = setTimeout(() => {
      push(url);
      clearTimeout(timer);
    }, 200);
  };

  const AuthCheck = async () => {
    try {
      switch (mode) {
        case "signUp": {
          setIsSignUp(true);
          const { data, profileImg } = state ? state : {};
          await signUp(data, profileImg);
          setIsSignUp(false);
          delayPush(`/auth/success?mode=signUp&email=${data.email}`);
          break;
        }
        case "signIn": {
          const {
            data: { email, password },
          } = state ? state : {};
          await signIn(email, password);
          delayPush("/");
          break;
        }
        case "signOut": {
          signOut();
          delayPush("/");
          break;
        }
        case "verifyEmail": {
          await verifyEmail(oobCode);
          delayPush(`/auth/success?mode=verifyEmail&oobCode=${oobCode}`);
          break;
        }
        case "resendVerifyEmail": {
          await resendVerifyEmail();
          delayPush(`/auth/success?mode=resendVerifyEmail&email=${user.email}`);
          break;
        }
        case "forgotEmail": {
          const {
            data: { email },
          } = state ? state : {};
          await sendPasswordResetEmail(email);
          delayPush(`/auth/success?mode=forgotPassword&email=${email}`);
          break;
        }
        case "resetPassword": {
          delayPush(`/resetPassword?oobCode=${oobCode}`);
          break;
        }
        case "confirmResetPassword": {
          const {
            oobCode,
            data: { password },
          } = state ? state : {};
          await confirmResetPassword(oobCode, password);
          delayPush(`/auth/success?mode=resetPassword&oobCode=${oobCode}`);
          break;
        }
        default: {
          delayPush("/");
          break;
        }
      }
    } catch (error) {
      console.log(error);
      switch (mode) {
        case "signIn":
          delayPush("/signin?error=1");
          break;
        case "verifyEmail":
          delayPush("/auth/error?mode=verifyEmail");
          break;
        case "confirmResetPassword":
          delayPush("/auth/error?mode=resetPassword");
          break;
        default:
          signOut();
          delayPush("/auth/error");
          break;
      }
    }
  };

  useEffect(() => {
    AuthCheck();
  }, []);

  return null;
};

export default Auth;
