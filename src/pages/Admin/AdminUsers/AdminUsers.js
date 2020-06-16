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
import filterIcon from "../../../assets/Admin/filter.svg";
import filterWhiteIcon from "../../../assets/Admin/filterWhite.svg";
import { ModalContext } from "../../../components/Web/ModalContainer/ModalContainer";
import { usersCritria } from "../../../utils/users";
import AdminFilter from "../../../components/Admin/AdminFilter/AdminFilter";

const AdminUsers = (props) => {
  const { users } = useContext(Context);
  const { openModal, closeModal } = useContext(ModalContext);
  const [usersArray, setUsersArray] = useState();
  const [view, setView] = useState(0);
  const [filter, setFilter] = useState(null);
  const [filterArray, setFilterArray] = useState(null);

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
    if (usersArray) {
      setFilterArray(usersArray);
      props.delaySetIsLoadingFalse();
    }
  }, [usersArray]);

  useEffect(() => {
    if (filter) {
      setFilterArray(
        usersArray.filter((id) => {
          const { ref, criteria } = filter;
          return (
            users[id][`${ref === "weightHeight" ? "bmi" : ref}Criteria`] ===
            criteria
          );
        })
      );
    } else setFilterArray(usersArray);
  }, [filter]);

  return usersArray && usersArray.length > 0 ? (
    <React.Fragment>
      <div className="AdminTopBar">
        <div className="AdminTitle">สมาชิก</div>
        <div className="AdminTopBarContainer">
          <div
            className={`${classes.Filter} ${filter ? classes.Active : ""}`}
            onClick={() => {
              openModal(
                <AdminFilter
                  filter={filter}
                  setFilter={setFilter}
                  criteriaData={usersCritria(users)}
                  closeModal={closeModal}
                />,
                true,
                "Filter"
              );
            }}
          >
            <div>
              <img
                className={`${classes.FilterIcon} ${
                  filter ? "" : classes.Active
                }`}
                src={filterIcon}
                alt="filterIcon"
              />
              <img
                className={`${classes.FilterIconWhite} ${
                  filter ? classes.Active : ""
                }`}
                src={filterWhiteIcon}
                alt="filterWhiteIcon"
              />
            </div>
            ตัวกรอง
          </div>
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
      </div>

      {filterArray && filterArray.length > 0 ? (
        view === 1 ? (
          <div className={classes.Table}>
            <div className={classes.TableProfile}>
              <div>ชื่อ-นามสกุล</div>
              {filterArray.map((userId) => (
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
              {filterArray.map((userId) => (
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
            {filterArray.map((userId) => (
              <Link
                key={userId}
                to={`/admin/users/${userId}`}
                className={classes.Card}
              >
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
                      <div key={type}>
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
        )
      ) : (
        <React.Fragment>
          <div className={classes.NotFound}>
            <img src={noUsers} alt="noUsers" />
            <div className={classes.Title}>ไม่พบข้อมูล</div>
          </div>
        </React.Fragment>
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
