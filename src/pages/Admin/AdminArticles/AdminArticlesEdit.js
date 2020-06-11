import React, { useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import AdminArticlesForm from "../../../components/Admin/AdminArticlesForm/AdminArticlesForm";
import { Context } from "../../../App";
import { extract } from "query-string";
import { useEffect } from "react";

const checkFalseType = (object) => {
  const result = Object.keys(object)
    .map((type) => {
      return object[type];
    })
    .every((type) => type === false);
  return result;
};

const handleType = (type) => {
  const array = Object.keys(type).filter((key) => {
    return type[key];
  });
  return array;
};

const extractArticle = (article) => {
  const { title, content } = article;
  const bmiStatic = [
    "underWeight",
    "normal",
    "overWeight",
    "obase",
    "extremeObase",
  ];
  const bloodPressureStatic = ["low", "normal", "over", "high"];
  let typeBmi, typeBloodPressure;
  bmiStatic.map((key) => {
    typeBmi = { ...typeBmi, [key]: article.typeBmi.includes(key) };
    return null;
  });
  bloodPressureStatic.map((key) => {
    typeBloodPressure = {
      ...typeBloodPressure,
      [key]: article.typeBloodPressure.includes(key),
    };
    return null;
  });
  return {
    title: title,
    content: content,
    typeBmi: typeBmi,
    typeBloodPressure: typeBloodPressure,
  };
};

const AdminArticlesEdit = (props) => {
  const { articleId } = useParams();
  const { article } = useContext(Context);
  const [oldArticle, setOldArticle] = useState(null);
  const [newArticle, setNewArticle] = useState(null);
  const [titleError, setTitleError] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const { push } = useHistory();

  useEffect(() => {
    if (article && articleId) {
      if (article[articleId]) setOldArticle(extractArticle(article[articleId]));
      else push("/");
    }
  }, [article]);

  useEffect(() => {
    console.log(newArticle);
  }, [newArticle]);

  return (
    <React.Fragment>
      <div className="AdminTopBar" style={{ marginBottom: "0.5rem" }}>
        <div className="AdminTitle">
          {articleId ? "แก้ไขบทความ" : "บทความใหม่"}
        </div>
        <div className="AdminTopBarContainer">
          <Link to="/admin/articles" className="Secondary">
            ละทิ้ง
          </Link>
          <div
            className="Primary"
            onClick={() => {
              const { title, content, typeBmi, typeBloodPressure } = newArticle;
              const falseTypeBmi = checkFalseType(typeBmi);
              const falseTypeBloodPressure = checkFalseType(typeBloodPressure);

              if (!title || (falseTypeBmi && falseTypeBloodPressure)) {
                if (!newArticle.title) {
                  setTitleError(true);
                }
                if (falseTypeBmi && falseTypeBloodPressure) {
                  setTypeError(true);
                }
              } else {
                push({
                  pathname: "/admin",
                  search: !articleId
                    ? "?mode=addArticle"
                    : `?mode=updateArticle&articleId=${articleId}`,
                  state: {
                    article: {
                      title: title,
                      content: content,
                      typeBmi: handleType(typeBmi),
                      typeBloodPressure: handleType(typeBloodPressure),
                    },
                  },
                });
              }
            }}
          >
            บันทึก
          </div>
        </div>
      </div>
      <AdminArticlesForm
        oldArticle={oldArticle}
        article={newArticle}
        setArticle={setNewArticle}
        titleError={titleError}
        setTitleError={setTitleError}
        typeError={typeError}
        setTypeError={setTypeError}
      />
    </React.Fragment>
  );
};

export default AdminArticlesEdit;
