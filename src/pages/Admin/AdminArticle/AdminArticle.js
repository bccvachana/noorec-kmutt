import React, { useState, useRef, useContext } from "react";
import classes from "./AdminArticle.module.scss";

import ViewerQuill from "../../../components/Web/ViewerQuill/ViewerQuill";
import { Link, useParams, useHistory } from "react-router-dom";

import backIcon from "../../../assets/back.svg";
import editTcon from "../../../assets/Admin/edit.svg";
import deleteIcon from "../../../assets/Admin/delete.svg";

import { Context } from "../../../App";
import { fromNow } from "../../../utils/moment";
import update from "../../../assets/update.svg";

const AdminArticle = (props) => {
  const { articleId } = useParams();
  const { goBack } = useHistory();
  const { article } = useContext(Context);

  return article ? (
    <React.Fragment>
      <div className="AdminTopBar" style={{ marginBottom: "1.6rem" }}>
        <div className="AdminTitle">
          <div
            className="Back"
            onClick={() => {
              goBack();
            }}
          >
            <img src={backIcon} alt="backIcon" />
          </div>
        </div>
        <div className="ContentTitle">
          {article[articleId].title}
          <div className="Time">
            <img src={update} alt="update" />
            {fromNow(article[articleId].updatedAt)}
          </div>
        </div>
        <div className="AdminTopBarContainer">
          <Link to={`/admin/articles/edit/${articleId}`} className="Link">
            <img src={editTcon} alt="editTcon" />
          </Link>
          <Link
            to={`/admin/articles/api?mode=deleteArticle&articleId=${articleId}`}
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
  ) : null;
};

export default AdminArticle;
