import React from "react";
import classes from "./ProfileImg.module.scss";

import userIcon from "../../assets/profile.svg";

const ProfileImg = (props) => {
  const { profileImgUrl, style, borderWidth } = props;

  return (
    <div className={classes.Img} style={style}>
      <img
        src={userIcon}
        alt="userIcon"
        style={{ borderWidth: borderWidth ? borderWidth : 0 }}
      />
      {profileImgUrl ? (
        <img
          src={profileImgUrl}
          alt={profileImgUrl}
          style={{ borderWidth: borderWidth ? borderWidth : 0 }}
        />
      ) : null}
    </div>
  );
};

export default ProfileImg;
