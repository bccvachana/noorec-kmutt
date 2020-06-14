import React, { useState, useContext, useEffect } from "react";
import classes from "./AdminMain.module.scss";
import { Link } from "react-router-dom";
import Box from "../../../components/UI/Box/Box";
import AdminMainChart from "../../../components/Admin/AdminMainChart/AdminMainChart";
import { Context } from "../../../App";
import { criteriaRefStatic } from "../../../utils/static/typeStatic";
import criteriaStatic from "../../Result/static/criteriaStatic";
import resultSlideStatic from "../../Result/static/resultSlideStatic";

import userIcon from "../../../assets/Admin/profileWhite.svg";
import articleIcon from "../../../assets/Admin/noArticleWhite.svg";

const AdminMain = (props) => {
  const { users, article } = useContext(Context);
  const [criteriaData, setCriteriaData] = useState(null);

  useEffect(() => {
    if (users && article) {
      let data;
      criteriaRefStatic.map((type) => {
        let criteria;
        Object.keys(criteriaStatic[type]).map((key) => {
          criteria = { ...criteria, [key]: 0 };
          return null;
        });
        const filterKey = Object.keys(users).filter((key) => {
          return users[key][`${type}Criteria`];
        });
        filterKey.map((key) => {
          criteria = {
            ...criteria,
            [users[key][`${type}Criteria`]]:
              criteria[users[key][`${type}Criteria`]] + 1,
          };
          return null;
        });
        data = {
          ...data,
          [type !== "bmi" ? type : "weightHeight"]: {
            userRecorded: filterKey.length,
            criteriaKey: Object.keys(criteria).map(
              (key) => criteriaStatic[type][key].title
            ),
            data: Object.keys(criteria).map((key) => criteria[key]),
          },
        };
        return null;
      });
      setCriteriaData(data);
    }
  }, [users, article]);

  useEffect(() => {
    if (criteriaData) props.delaySetIsLoadingFalse();
  }, [criteriaData]);

  return users && article && criteriaData ? (
    <React.Fragment>
      <div className="AdminTopBar">
        <div className="AdminTitle">ภาพรวม</div>
      </div>
      <div className={classes.Container}>
        <Link to="/admin/users" className={classes.Overview}>
          <img src={userIcon} alt="userIcon" />
          <div className={classes.Value}>{Object.keys(users).length}</div>สมาชิก
        </Link>
        <Link to="/admin/articles" className={classes.Overview}>
          <img src={articleIcon} alt="articleIcon" />
          <div className={classes.Value}>{Object.keys(article).length}</div>
          บทความ
        </Link>
        {Object.keys(criteriaData).map((type) => {
          const { userRecorded, criteriaKey, data } = criteriaData[type];
          return (
            <div className={classes.Chart}>
              {resultSlideStatic[type].title}
              <Box
                style={{ justifyContent: "flex-start", marginTop: "0.7rem" }}
              >
                <div className={classes.UserRecorded}>
                  ตรวจทั้งหมด<span>{userRecorded}</span>คน
                </div>
                <AdminMainChart criteriaKey={criteriaKey} data={data} />
              </Box>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  ) : null;
};

export default AdminMain;
