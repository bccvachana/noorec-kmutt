import React, { useState, useRef, useEffect, useContext } from "react";
import classes from "./AdminArticles.module.scss";
import { Link } from "react-router-dom";
import moment from "moment";

import { Context } from "../../../App";

import { fromNow } from "../../../utils/moment";

import viewIcon from "../../../assets/Admin/view.svg";
import editTcon from "../../../assets/Admin/edit.svg";
import deleteIcon from "../../../assets/Admin/delete.svg";
import update from "../../../assets/update.svg";
import noArticle from "../../../assets/Admin/noArticle.svg";

const AdminArticles = (props) => {
  const { article } = useContext(Context);
  const [sortArticle, setSortArticle] = useState(null);

  useEffect(() => {
    if (article || article === undefined) {
      if (article) {
        const temp = Object.keys(article).sort((a, b) =>
          moment(article[b].updatedAt).diff(moment(article[a].updatedAt))
        );
        setSortArticle(temp);
      } else {
        setSortArticle([]);
      }
    }
  }, [article]);

  useEffect(() => {
    if (sortArticle) props.delaySetIsLoadingFalse();
  }, [sortArticle]);

  return sortArticle && sortArticle.length > 0 ? (
    <React.Fragment>
      <div className="AdminTopBar" style={{ marginBottom: "1.7rem" }}>
        <div className="AdminTitle">บทความ</div>
        <div className="AdminTopBarContainer">
          <Link to="/admin/articles/add" className="Primary">
            บทความใหม่
          </Link>
        </div>
      </div>
      {sortArticle.map((key) => {
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
                <Link
                  to={`/admin/articles/api?mode=deleteArticle&articleId=${key}`}
                >
                  <img src={deleteIcon} alt="deleteIcon" />
                </Link>
              </div>
            </div>
            <div className={classes.Detail}>
              <img src={update} alt="update" />
              {fromNow(updatedAt)}
            </div>
          </div>
        );
      })}
    </React.Fragment>
  ) : (
    <React.Fragment>
      <div className={classes.NoArticle}>
        <img src={noArticle} alt="noArticle" />
        <div className={classes.Title}>ไม่มีบทความ</div>
        <div className="AdminTopBarContainer">
          <Link
            to="/admin/articles/add"
            className="Primary"
            style={{ marginLeft: 0 }}
          >
            บทความใหม่
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminArticles;
