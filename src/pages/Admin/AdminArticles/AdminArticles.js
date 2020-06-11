import React, { useState, useRef, useEffect, useContext } from "react";
import classes from "./AdminArticles.module.scss";
import { Link } from "react-router-dom";
import moment from "moment";

import { Context } from "../../../App";

import { fromNow } from "../../../utils/moment";

import viewIcon from "../../../assets/Admin/view.svg";
import editTcon from "../../../assets/Admin/edit.svg";
import deleteIcon from "../../../assets/Admin/delete.svg";
import timeIcon from "../../../assets/time.svg";

const AdminArticles = (props) => {
  const { article } = useContext(Context);
  const [sortArticle, setSortArticle] = useState(null);

  useEffect(() => {
    if (article) {
      const temp = Object.keys(article).sort((a, b) =>
        moment(article[b].updatedAt).diff(moment(article[a].updatedAt))
      );
      setSortArticle(temp);
    } else {
      setSortArticle([]);
    }
  }, [article]);

  useEffect(() => {
    if (sortArticle) props.delaySetIsLoadingFalse();
  }, [sortArticle]);

  return (
    <React.Fragment>
      <div
        className={`AdminTopBar ${classes.TopBar}`}
        style={{ marginBottom: "1.7rem" }}
      >
        <div className="AdminTitle">บทความ</div>
        <div className="AdminTopBarContainer">
          <Link to="/admin/articles/add" className="Primary">
            บทความใหม่
          </Link>
        </div>
      </div>
      {sortArticle
        ? sortArticle.map((key) => {
            const { title, updatedAt } = article[key];
            return (
              <div key={title} className={classes.Article}>
                <div className={classes.TitleBar}>
                  <Link className={classes.Title} to={`/admin/articles/${key}`}>
                    {title}
                  </Link>

                  <div className={classes.LinkContainer}>
                    <Link to={`/admin/articles/${key}`}>
                      <img src={viewIcon} alt="viewIcon" />
                    </Link>
                    <Link to={`/admin/articles/edit/${key}`}>
                      <img src={editTcon} alt="editTcon" />
                    </Link>
                    <Link to={`/admin?mode=deleteArticle&articleId=${key}`}>
                      <img src={deleteIcon} alt="deleteIcon" />
                    </Link>
                  </div>
                </div>
                <div className={classes.Detail}>
                  <img src={timeIcon} alt="timeIcon" />
                  {fromNow(updatedAt)}
                </div>
              </div>
            );
          })
        : null}
    </React.Fragment>
  );
};

export default AdminArticles;
