import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import classes from "./AdminUser.module.scss";
import AdminResultChart from "./AdminUserChart/AdminResultChart";
import { getRecord } from "../../../utils/result/filter";

import { Context } from "../../../App";
import backIcon from "../../../assets/back.svg";
import resultSlideStatic from "../../Result/static/resultSlideStatic";
import userIcon from "../../../assets/profile.svg";
import update from "../../../assets/update.svg";
import { fromNow } from "../../../utils/moment";
import { typeStatic } from "../../../utils/static/typeStatic";

const AdminUser = (props) => {
  const { userId } = useParams();
  const { users } = useContext(Context);

  useEffect(() => {
    if (users) props.delaySetIsLoadingFalse();
  }, [users]);

  return users && users[userId] ? (
    <React.Fragment>
      <div className="AdminTopBar FlexStart" style={{ marginBottom: "0rem" }}>
        <Link to="/admin/users" className="Link">
          <img src={backIcon} alt="backIcon" />
        </Link>
        <div className="ContentTitle" style={{ top: "-1.3rem" }}>
          <div className={classes.Profile}>
            <div className={classes.Img}>
              <img src={userIcon} alt="userIcon" />
              {users[userId].profileImgUrl ? (
                <div>
                  <img src={users[userId].profileImgUrl} alt={userId} />
                </div>
              ) : null}
            </div>
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
        </div>
      </div>
      <div className={classes.UserContainer}>
        <div className={classes.Grid}>
          {typeStatic.map((type) => (
            <div className={classes.Container}>
              {resultSlideStatic[type].title}
              <div className={classes.ChartContainer}>
                <AdminResultChart
                  type={type}
                  record={getRecord(users[userId].record)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  ) : null;
};

export default AdminUser;
