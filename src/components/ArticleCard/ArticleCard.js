import React, { useContext } from "react";
import classes from "./ArticleCard.module.scss";
import { Link } from "react-router-dom";

import { Context } from "../../App";
import { fromNow } from "../../utils/moment";
import update from "../../assets/updateWhite.svg";

const ArticleCard = (props) => {
  const { id, path } = props;
  const { article } = useContext(Context);
  const { title, image, updatedAt } = article[id];

  return (
    <Link
      to={`/article/${id}`}
      key={title}
      style={image ? { backgroundImage: `url("${image}")` } : null}
      className={`${classes.ArticleCard} ${classes[path]} ${
        image ? "" : classes.NoImage
      }`}
    >
      <div className={classes.CardInfo}>
        {title}
        <div className={classes.Time}>
          <img src={update} alt="update" />
          {fromNow(updatedAt)}
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
