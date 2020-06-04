import React from "react";
import classes from "./Form.module.scss";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import FormInput from "./FormInput/FormInput";
import FormError from "./FormError/FormError";

import { checkUserExist } from "../../utils/firebase/auth";

const ForgotPassword = (props) => {
  const { register, errors, handleSubmit } = useForm();
  const { push } = useHistory();

  const onSubmit = (data) => {
    push({ pathname: "/auth", search: "?mode=forgotEmail", state: { data } });
  };
  return (
    <form
      className={`${classes.Form} ${classes.SignIn}`}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <div className={classes.Title}>ลืมรหัสผ่าน</div>
      กรอกอีเมลของคุณเพื่อรับลิงค์รีเซ็ตรหัสผ่าน
      <div className={classes.InputContainer}>
        <div className={classes.Input}>
          <FormInput
            type="email"
            register={register}
            registerRef={{
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "รูปแบบอีเมลไม่ถูกต้อง",
              },
              validate: async (email) => {
                const checked = await checkUserExist(email);
                return checked.length === 0
                  ? "ไม่พบบัญชีที่ใช้ที่อยู่อีเมลนี้"
                  : true;
              },
            }}
            error={errors.email}
          />
          <FormError error={errors.email} />
        </div>
      </div>
      <button type="submit" className={classes.SubmitButton}>
        ถัดไป
      </button>
    </form>
  );
};

export default ForgotPassword;
