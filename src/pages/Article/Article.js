import React, { useState, useEffect, useContext } from "react";
import classes from "./Article.module.scss";

import { Context } from "../../App";
import { filterArticle } from "../../utils/article";
import ArticleCard from "../../components/ArticleCard/ArticleCard";

const Article = (props) => {
  const { userData, article } = useContext(Context);
  const [articleArray, setArticleArray] = useState(null);

  useEffect(() => {
    if (userData && article) {
      setArticleArray(filterArticle(article, userData));
    }
  }, [userData, article]);

  useEffect(() => {
    if (articleArray) props.delaySetIsLoadingFalse();
  }, [articleArray]);

  return articleArray ? (
    <div className={classes.Article}>
      <div className={classes.Title}>บทความแนะนำสำหรับคุณ</div>
      <div className={classes.Container}>
        {articleArray.map((id) => (
          <ArticleCard key={id} path="Article" id={id} />
        ))}
      </div>
    </div>
  ) : null;
};

export default Article;
