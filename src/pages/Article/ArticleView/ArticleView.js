import React, { useState, useEffect, useContext } from "react";
import classes from "./ArticleView.module.scss";
import { Link, useParams, useHistory, Redirect } from "react-router-dom";

import { Context } from "../../../App";
import Article from "../Article";
import backIcon from "../../../assets/back.svg";
import { fromNow } from "../../../utils/moment";
import update from "../../../assets/update.svg";
import ViewerQuill from "../../../components/Web/ViewerQuill/ViewerQuill";

const ArticleView = (props) => {
  const { article } = useContext(Context);
  const { articleId } = useParams();
  const { goBack, push } = useHistory();

  useEffect(() => {
    if (article) {
      if (article[articleId]) {
        props.delaySetIsLoadingFalse();
      } else {
        push("/error");
      }
    }
  }, [article]);

  const { title, updatedAt } =
    article && article[articleId] ? article[articleId] : {};

  return article && article[articleId] ? (
    <div className={classes.ArticleView}>
      <div className={classes.TopBar}>
        <div
          className="Back"
          onClick={() => {
            goBack();
          }}
        >
          <img src={backIcon} alt="backIcon" />
        </div>
        <div className="ContentTitle">
          {title}
          <div className="Time">
            <img src={update} alt="update" />
            {fromNow(updatedAt)}
          </div>
        </div>
      </div>
      <ViewerQuill articleId={articleId} />
    </div>
  ) : null;
};

export default ArticleView;
