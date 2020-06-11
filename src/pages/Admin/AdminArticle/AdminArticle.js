import React, { useState, useRef } from "react";
import classes from "./AdminArticle.module.scss";

import ViewerQuill from "../../../components/Web/ViewerQuill/ViewerQuill";
import { Link, useParams } from "react-router-dom";

import backIcon from "../../../assets/back.svg";
import editTcon from "../../../assets/Admin/edit.svg";
import deleteIcon from "../../../assets/Admin/delete.svg";

const AdminArticle = (props) => {
  const { articleId } = useParams();

  return (
    <React.Fragment>
      <div className={`AdminTopBar ${classes.TopBar}`}>
        <div className="AdminTitle">
          <Link to="/admin/articles" className="Link">
            <img src={backIcon} alt="backIcon" />
          </Link>
        </div>
        <div className="AdminTopBarContainer">
          <Link to={`/admin/articles/edit/${articleId}`} className="Link">
            <img src={editTcon} alt="editTcon" />
          </Link>
          <Link
            to={`/admin?mode=deleteArticle&articleId=${articleId}`}
            className="Link"
          >
            <img src={deleteIcon} alt="deleteIcon" />
          </Link>
        </div>
      </div>
      <div className={classes.Container}>
        <ViewerQuill articleId={articleId} />
      </div>
    </React.Fragment>
  );
};

export default AdminArticle;
