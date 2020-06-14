import React, { useContext } from "react";
import classes from "./ViewerQuill.module.scss";
import ReactQuill from "react-quill";
import { useHistory } from "react-router-dom";

import { Context } from "../../../App";
import { fromNow } from "../../../utils/moment";

import update from "../../../assets/update.svg";

const ViewerQuill = (props) => {
  const { articleId } = props;
  const { article } = useContext(Context);
  const { push } = useHistory();

  let title, content, updatedAt;
  if (article) {
    if (article[articleId]) {
      title = article[articleId].title;
      content = article[articleId].content;
      updatedAt = article[articleId].createdAt;
    } else {
      push("/");
    }
  }

  return (
    <div className={classes.Container}>
      {/* <div className={classes.Title}>{title}</div>
      <div className={classes.Time}>
        <img src={update} alt="update" />
        {fromNow(updatedAt)}
      </div> */}
      <ReactQuill
        id="Quill"
        className="Viewer"
        modules={{ toolbar: false }}
        readOnly
        value={{ ...content }}
      />
    </div>
  );
};

export default ViewerQuill;
