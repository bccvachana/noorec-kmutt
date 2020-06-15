import React from "react";
import classes from "./FormInput.module.scss";

const inputStatic = {
  firstName: {
    inputType: "text",
    placeholder: "ชื่อ",
    ref: {
      required: "โปรดระบุชื่อ",
    },
  },
  lastName: {
    inputType: "text",
    placeholder: "นามสกุล",
    ref: {
      required: "โปรดระบุนามสกุล",
    },
  },
  email: {
    inputType: "email",
    placeholder: "อีเมล",
    ref: {
      required: "โปรดระบุอีเมล",
    },
  },
  password: {
    inputType: "password",
    placeholder: "รหัสผ่าน",
    ref: {
      required: "โปรดระบุรหัสผ่าน",
    },
  },
  reTypePassword: {
    inputType: "password",
    placeholder: "ยืนยันรหัสผ่าน",
    ref: {
      required: "โปรดยืนยันรหัสผ่าน",
    },
  },
};

const FormInput = (props) => {
  const { type, register, registerRef, autoComplete, error, value } = props;
  const { inputType, placeholder, ref } = type ? inputStatic[type] : {};

  return (
    <input
      type={inputType}
      name={type}
      placeholder={placeholder}
      defaultValue={value}
      autoComplete={autoComplete}
      ref={register({ ...ref, ...registerRef })}
      className={`${classes.FormInput} ${error ? classes.isError : ""}`}
    />
  );
};

export default FormInput;
