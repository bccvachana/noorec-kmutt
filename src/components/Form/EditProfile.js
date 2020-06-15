import React, { useState, useContext, useEffect } from "react";
import classes from "./Form.module.scss";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import profileSvg from "../../assets/profile.svg";
import edit from "../../assets/edit.svg";

import FormInput from "./FormInput/FormInput";
import FormError from "./FormError/FormError";

import { ModalContext } from "../Web/ModalContainer/ModalContainer";
import ProfileImgEditor from "../ProfileImgEditor/ProfileImgEditor";

import { Context } from "../../App";

const EditProfile = (props) => {
  const [profileImg, setProfileImg] = useState(null);
  const { openModal } = useContext(ModalContext);
  const { userData } = useContext(Context);
  const { register, errors, handleSubmit } = useForm();
  const { push } = useHistory();

  const signUpInput = [
    { type: "firstName", value: "firstName" },
    { type: "lastName", value: "lastName" },
  ];

  const onSubmit = (data) => {
    push({
      pathname: "/auth",
      search: "?mode=editProfile",
      state: {
        data,
        profileImg:
          profileImg !== userData.profileImgUrl && profileImg !== ""
            ? profileImg
            : null,
        profileImgName: userData.profileImgName,
      },
    });
  };

  useEffect(() => {
    if (userData && userData.profileImgUrl) {
      setProfileImg(userData.profileImgUrl);
    }
  }, [userData]);

  return userData ? (
    <form
      className={`${classes.Form} ${classes.SignUp}`}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      noValidate
    >
      <div className={classes.Title}>แก้ไขข้อมูล</div>

      <div className={classes.Profile}>
        <img src={profileImg ? profileImg : profileSvg} alt="profile" />
        <div
          className={classes.Edit}
          onClick={() =>
            openModal(
              <ProfileImgEditor
                img={profileImg ? profileImg : profileSvg}
                setImg={setProfileImg}
              />,
              false,
              "SignUp"
            )
          }
        >
          <img src={edit} alt="edit" />
        </div>
      </div>

      <div className={classes.InputContainer}>
        {signUpInput.map(({ type, value }) => (
          <div key={type} className={classes.Input}>
            <FormInput
              type={type}
              register={register}
              value={userData[value]}
              error={errors[type]}
            />
            <FormError error={errors[type]} />
          </div>
        ))}
      </div>

      <button type="submit" className={classes.SubmitButton}>
        บันทึก
      </button>
    </form>
  ) : null;
};

export default EditProfile;
