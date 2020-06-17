import React from "react";
import classes from "./AdminChatModal.module.scss";
import { valueStatic } from "../../../../utils/static/typeStatic";
import infoStatic from "../../../../pages/Result/static/infoStatic";
import ProfileImg from "../../../../components/ProfileImg/ProfileImg";
import { fromNow } from "../../../../utils/moment";
import update from "../../../../assets/update.svg";
import { Link } from "react-router-dom";

const AdminChatModal = (props) => {
  const { userId, users, closeModal } = props;

  return (
    <React.Fragment>
      <div className={classes.Profile}>
        <ProfileImg
          profileImgUrl={users[userId].profileImgUrl}
          style={{
            width: "4rem",
            height: "4rem",
            marginRight: "0.6rem",
          }}
          borderWidth="0.25rem"
        />
        <div className={classes.Title}>
          <div className={classes.Name}>
            {users[userId].firstName} {users[userId].lastName}
          </div>
          <div className={classes.Time}>
            <img src={update} alt="update" />
            {fromNow(users[userId].updatedAt)}
          </div>
        </div>
      </div>
      {valueStatic.map((type) => (
        <div key={type} className={classes.Value}>
          <div>{infoStatic[type].title}</div>
          <div>
            {type !== "bloodPressure"
              ? users[userId][type]
                ? users[userId][type]
                : "--"
              : users[userId].bloodPressureHigh
              ? `${users[userId].bloodPressureHigh}/${users[userId].bloodPressureLow}`
              : "--/--"}
            {` ${infoStatic[type].unit}`}
          </div>
        </div>
      ))}
      <Link
        to={`/admin/users/${userId}`}
        className="Link"
        style={{ marginTop: "1rem" }}
        onClick={() => {
          closeModal();
        }}
      >
        ดูเพิ่มเติม
      </Link>
    </React.Fragment>
  );
};

export default AdminChatModal;
