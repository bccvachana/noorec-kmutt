import React from "react";
import classes from "./Form.module.scss";
import { useForm } from "react-hook-form";
import { useLocation, useHistory, Link } from "react-router-dom";
import queryString from "query-string";

import FormInput from "./FormInput/FormInput";
import FormError from "./FormError/FormError";

const signInInput = [
  {
    type: "email",
    registerRef: {
      validate: (email) => {
        if (email === "admin") return true;
        else {
          const emailCheck = new RegExp(
            "^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$",
            "i"
          );
          return emailCheck.test(email) ? true : "รูปแบบอีเมลไม่ถูกต้อง";
        }
      },
    },
    autoComplete: "email",
  },
  { type: "password", autoComplete: "current-password" },
];

const SignInForm = (props) => {
  const { search } = useLocation();
  const { error: signInError } = queryString.parse(search);

  const { register, errors, handleSubmit } = useForm();
  const { push } = useHistory();

  const onSubmit = (data) => {
    push({ pathname: "/auth", search: "?mode=signIn", state: { data } });
  };

  return (
    <form
      className={`${classes.Form} ${classes.SignIn}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={classes.Title}>เข้าสู่ระบบ</div>
      {signInError ? (
        <FormError
          error={{ message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง โปรดลองใหม่อีกครั้ง" }}
        />
      ) : null}
      <div className={classes.InputContainer}>
        {signInInput.map(({ type, registerRef, autoComplete }) => (
          <div key={type} className={classes.Input}>
            <FormInput
              type={type}
              register={register}
              registerRef={registerRef}
              error={errors[type]}
              autoComplete={autoComplete}
            />
            <FormError error={errors[type]} />
          </div>
        ))}
      </div>
      <button type="submit" className={classes.SubmitButton}>
        เข้าสู่ระบบ
      </button>{" "}
      <div className={classes.ForgotRegister}>
        <Link to={"/forgotPassword"} className={classes.Link}>
          ลืมรหัสผ่าน
        </Link>{" "}
        |{" "}
        <Link to={"/signUp"} className={classes.Link}>
          สมัครสมาชิก
        </Link>
      </div>
      <div
        onClick={() => {
          push("/auth?mode=signOut");
        }}
        style={{ marginTop: "5rem" }}
      >
        logOut
      </div>
    </form>
  );
};

export default SignInForm;
