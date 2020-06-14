import React, { useState, useContext, useEffect } from "react";
import classes from "./AdminUsers.module.scss";
import { Link } from "react-router-dom";
import moment from "moment";
import { Context } from "../../../App";
import Switch from "../../../components/Result/Switch/Switch";

import userIcon from "../../../assets/profile.svg";
import table from "../../../assets/Admin/table.svg";
import tableWhite from "../../../assets/Admin/tableWhite.svg";
import grid from "../../../assets/Admin/grid.svg";
import gridWhite from "../../../assets/Admin/gridWhite.svg";
import infoStatic from "../../../pages/Result/static/infoStatic";
import update from "../../../assets/update.svg";
import { fromNow } from "../../../utils/moment";
import noUsers from "../../../assets/Admin/profile.svg";
import { valueStatic } from "../../../utils/static/typeStatic";

const AdminUsers = (props) => {
  const { users } = useContext(Context);
  const [usersArray, setUsersArray] = useState();
  const [view, setView] = useState(0);

  useEffect(() => {
    if (users || users === undefined) {
      if (users) {
        const temp = Object.keys(users).sort((a, b) =>
          moment(users[b].updatedAt).diff(moment(users[a].updatedAt))
        );
        setUsersArray(temp);
      } else {
        setUsersArray([]);
      }
    }
  }, [users]);

  useEffect(() => {
    if (usersArray) props.delaySetIsLoadingFalse();
  }, [usersArray]);

  return usersArray && usersArray.length > 0 ? (
    <React.Fragment>
      <div className="AdminTopBar">
        <div className="AdminTitle">สมาชิก</div>
        <Switch
          switches={[
            {
              icon: <img src={grid} alt="grid" />,
              whiteIcon: <img src={gridWhite} alt="gridWhite" />,
            },
            {
              icon: <img src={table} alt="table" />,
              whiteIcon: <img src={tableWhite} alt="tableWhite" />,
            },
          ]}
          switchIndex={view}
          setSwitchIndex={setView}
          activeColor="#fa5458"
          type="adminUsers"
        />
      </div>

      {view === 1 ? (
        <div className={classes.Table}>
          <div className={classes.TableProfile}>
            <div>ชื่อ-นามสกุล</div>
            {usersArray.map((userId) => (
              <Link to={`/admin/users/${userId}`}>
                <div className={classes.Img}>
                  <img src={userIcon} alt="userIcon" />
                  {users[userId].profileImgUrl ? (
                    <img src={users[userId].profileImgUrl} alt={userId} />
                  ) : null}
                </div>
                <div className={classes.Name}>
                  <div>
                    {users[userId].firstName} {users[userId].lastName}
                  </div>
                  <div className={classes.Time}>
                    <img src={update} alt="update" />
                    {fromNow(users[userId].updatedAt)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className={classes.TableValue}>
            <div className={classes.Header}>
              <div>น้ำหนัก</div>
              <div>ส่วนสูง</div>
              <div>BMI</div>
              <div>อุณหภูมิ</div>
              <div>ความดัน</div>
              <div>ชีพจร</div>
              <div>ออกซิเจน</div>
            </div>
            {usersArray.map((userId) => (
              <div className={classes.Value}>
                {valueStatic.map((type) => (
                  <div>
                    {type !== "bloodPressure"
                      ? users[userId][type]
                        ? users[userId][type]
                        : "--"
                      : users[userId].bloodPressureHigh
                      ? `${users[userId].bloodPressureHigh}/${users[userId].bloodPressureLow}`
                      : "--/--"}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={classes.Grid}>
          {usersArray.map((userId) => (
            <Link to={`/admin/users/${userId}`} className={classes.Card}>
              <div>
                <div className={classes.Profile}>
                  <div className={classes.Img}>
                    <img src={userIcon} alt="userIcon" />
                    {users[userId].profileImgUrl ? (
                      <img src={users[userId].profileImgUrl} alt={userId} />
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
                <div className={classes.Value}>
                  {valueStatic.map((type) => (
                    <div>
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </React.Fragment>
  ) : (
    <React.Fragment>
      <div className={classes.NoUsers}>
        <img src={noUsers} alt="noUsers" />
        <div className={classes.Title}>ไม่มีสมาชิก</div>
      </div>
    </React.Fragment>
  );
};

export default AdminUsers;
