import React from "react";
import classes from "./Form.module.scss";
import { useForm } from "react-hook-form";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import queryString from "query-string";

import FormInput from "./FormInput/FormInput";
import FormError from "./FormError/FormError";

const ResetPassword = (props) => {
  const { search } = useLocation();
  const { oobCode } = queryString.parse(search);
  const { push } = useHistory();

  const { register, errors, handleSubmit, getValues } = useForm();

  const onSubmit = (data) => {
    push({
      pathname: "/auth",
      search: "?mode=confirmResetPassword",
      state: { oobCode: oobCode, data: data },
    });
  };
  return (
    <React.Fragment>
      {oobCode ? (
        <form
          className={`${classes.Form} ${classes.SignIn}`}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div className={classes.Title}>รีเซ็ตรหัสผ่าน</div>
          กรอกรหัสผ่านใหม่ของคุณ
          <div className={classes.InputContainer}>
            <div className={classes.Input}>
              <FormInput
                type="password"
                register={register}
                registerRef={{
                  minLength: {
                    value: 8,
                    message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร",
                  },
                }}
                error={errors.password}
              />
              <FormError error={errors.password} />
            </div>
            <div className={classes.Input}>
              <FormInput
                type="reTypePassword"
                register={register}
                registerRef={{
                  validate: (value) => {
                    return getValues("password") === value
                      ? value.length >= 8
                        ? true
                        : "รหัสผ่านไม่ถูกต้อง"
                      : "รหัสผ่านไม่ตรงกัน";
                  },
                }}
                error={errors.reTypePassword}
              />
              <FormError error={errors.reTypePassword} />
            </div>
          </div>
          <button type="submit" className={classes.SubmitButton}>
            ถัดไป
          </button>
        </form>
      ) : (
        <Redirect to="/" />
      )}
    </React.Fragment>
  );
};

export default ResetPassword;
