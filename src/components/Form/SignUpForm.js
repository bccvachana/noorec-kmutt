import React, { useState, useContext } from "react";
import classes from "./Form.module.scss";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import profileJpg from "../../assets/profile.jpg";
import edit from "../../assets/edit.svg";

import FormInput from "./FormInput/FormInput";
import FormError from "./FormError/FormError";

import { ModalContext } from "../Web/ModalContainer/ModalContainer";
import ProfileImgEditor from "../ProfileImgEditor/ProfileImgEditor";

import { checkUserExist } from "../../utils/firebase/auth";

const SignUpForm = (props) => {
  const [profileImg, setProfileImg] = useState(null);
  const { openModal } = useContext(ModalContext);
  const { register, errors, handleSubmit, getValues } = useForm();
  const { push } = useHistory();

  const signUpInput = [
    { type: "firstName" },
    { type: "lastName" },
    {
      type: "email",
      registerRef: {
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: "รูปแบบอีเมลไม่ถูกต้อง",
        },
        validate: async (email) => {
          const checked = await checkUserExist(email);
          return checked.length === 0 ? true : "อีเมลนี้มีผู้ใช้แล้ว";
        },
      },
    },
    {
      type: "password",
      registerRef: {
        minLength: {
          value: 8,
          message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร",
        },
      },
    },
    {
      type: "reTypePassword",
      registerRef: {
        validate: (value) => {
          return getValues("password") === value
            ? value.length >= 8
              ? true
              : "รหัสผ่านไม่ถูกต้อง"
            : "รหัสผ่านไม่ตรงกัน";
        },
      },
    },
  ];

  const onSubmit = (data) => {
    push({
      pathname: "/auth",
      search: "?mode=signUp",
      state: { data, profileImg },
    });
  };

  return (
    <form
      className={`${classes.Form} ${classes.SignUp}`}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <div className={classes.Title}>สมัครสมาชิก</div>

      <div className={classes.Profile}>
        <img src={profileImg ? profileImg : profileJpg} alt="profile" />
        <div
          className={classes.Edit}
          onClick={() =>
            openModal(
              <ProfileImgEditor
                img={profileImg ? profileImg : profileJpg}
                setImg={setProfileImg}
              />,
              false
            )
          }
        >
          <img src={edit} alt="edit" />
        </div>
      </div>

      <div className={classes.InputContainer}>
        {signUpInput.map(({ type, registerRef }) => (
          <div key={type} className={classes.Input}>
            <FormInput
              type={type}
              register={register}
              registerRef={registerRef}
              error={errors[type]}
            />
            <FormError error={errors[type]} />
          </div>
        ))}
      </div>

      <button type="submit" className={classes.SubmitButton}>
        สมัครสมาชิก
      </button>
    </form>
  );
};

export default SignUpForm;
