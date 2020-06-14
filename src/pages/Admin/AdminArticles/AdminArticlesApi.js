import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";

import {
  addArticle,
  updateArticle,
  deleteArticle,
} from "../../../utils/firebase/firestore";

const AdminArticlesApi = (props) => {
  const { search, state } = useLocation();
  const { mode, articleId } = queryString.parse(search);
  const { push } = useHistory();

  const delayPush = (url) => {
    const timer = setTimeout(() => {
      push(url);
      clearTimeout(timer);
    }, 300);
  };

  const Check = async () => {
    try {
      switch (mode) {
        case "addArticle": {
          await addArticle(state.article);
          delayPush("/admin/articles");
          break;
        }
        case "updateArticle": {
          await updateArticle(articleId, state.article);
          delayPush("/admin/articles");
          break;
        }
        case "deleteArticle": {
          await deleteArticle(articleId);
          window.location.href = "/admin/articles";
          break;
        }
        default: {
          delayPush("/admin");
          break;
        }
      }
    } catch (error) {
      console.log(error);
      delayPush("/auth/error");
    }
  };

  useEffect(() => {
    Check();
  }, []);

  return null;
};

export default AdminArticlesApi;
