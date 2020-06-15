import React, { useState, useRef, useEffect } from "react";
import classes from "./AdminArticlesForm.module.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Prompt } from "react-router-dom";
import { useBeforeunload } from "react-beforeunload";
import LoadingDot from "../../UI/LoadingDot/LoadingDot";
import FormError from "../../Form/FormError/FormError";

import criteriaStatic from "../../../pages/Result/static/criteriaStatic";

const bmiStatic = [
  "underWeight",
  "normal",
  "overWeight",
  "obase",
  "extremeObase",
];

const bloodPressureStatic = ["low", "normal", "over", "high"];

const setTypeAll = (type, value) => {
  const array = type === "bmi" ? bmiStatic : bloodPressureStatic;
  let result;
  array.map((temp) => {
    result = { ...result, [temp]: value };
    return null;
  });
  return result;
};

const quillModules = (quill, setIsLoading) => {
  return {
    toolbar: {
      container: "#QuillToolBar",
      handlers: {
        image: () => {
          quillImageHandler(quill, setIsLoading);
        },
      },
    },
  };
};

const AdminArticlesForm = (props) => {
  const {
    oldArticle,
    article,
    setArticle,
    titleError,
    setTitleError,
    typeError,
    setTypeError,
  } = props;

  const quill = useRef();

  const [isBlocking, setIsBlocking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modules] = useState(quillModules(quill, setIsLoading));

  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [typeBmi, setTypeBmi] = useState(null);
  const [typeBloodPressure, setTypeBloodPressure] = useState(null);
  const [typeBmiAll, setTypeBmiAll] = useState(false);
  const [typeBloodPressureAll, setTypeBloodPressureAll] = useState(false);

  useBeforeunload((event) => event.preventDefault());

  useEffect(() => {
    if (oldArticle) {
      const { title, content, typeBmi, typeBloodPressure } = oldArticle;
      setTypeBmi(typeBmi);
      setTypeBloodPressure(typeBloodPressure);
      setTitle(title);
      setContent(content);
    } else {
      setTypeBmi(setTypeAll("bmi", false));
      setTypeBloodPressure(setTypeAll("bloodPressure", false));
    }
  }, [oldArticle]);

  const updateArticle = () => {
    setArticle({
      ...article,
      title: title,
      content: JSON.stringify(quill.current.getEditor().getContents()),
      typeBmi: typeBmi,
      typeBloodPressure: typeBloodPressure,
    });
  };

  useEffect(() => {
    const isContent = !(!content || content === "<p><br></p>");
    const isTitle = title && title.length > 0;
    setIsBlocking(!isContent && !isTitle ? false : true);
    updateArticle();
  }, [title, content]);

  useEffect(() => {
    if (typeBmi) {
      const array = Object.keys(typeBmi).map((type) => {
        return typeBmi[type];
      });
      if (typeError) setTypeError(!array.some((type) => type));
      setTypeBmiAll(array.every((type) => type));
      updateArticle();
    }
  }, [typeBmi]);

  useEffect(() => {
    if (typeBloodPressure) {
      const array = Object.keys(typeBloodPressure).map((type) => {
        return typeBloodPressure[type];
      });
      if (typeError) setTypeError(!array.some((type) => type));
      setTypeBloodPressureAll(array.every((type) => type));
      updateArticle();
    }
  }, [typeBloodPressure]);

  return (
    <div className={classes.Container}>
      <Prompt
        when={isBlocking}
        message={(location) => {
          return location.pathname === "/admin/articles/api"
            ? true
            : "คุณยังไม่ได้ทำการบันทึกบทความนี้ ดำเนินการต่อหรือไม่ ?";
        }}
      />

      <div className={classes.Error}>
        <FormError
          error={titleError ? { message: "โปรดระบุหัวเรื่อง" } : null}
        />
      </div>
      <form className={classes.QuillForm} autoComplete="off" noValidate>
        <input
          type="text"
          name="title"
          placeholder="หัวเรื่อง"
          maxLength={60}
          className={classes.TitleInput}
          value={title}
          onChange={(event) => {
            if (event.target.value.length > 0) setTitleError(false);
            setTitle(event.target.value);
          }}
        />
      </form>

      <div className={classes.TypeContainer}>
        <div className={classes.TypeContainerTitle}>
          บทความสำหรับ
          <div className={classes.Error}>
            <FormError
              error={typeError ? { message: "โปรดระบุประเภท" } : null}
            />
          </div>
        </div>
        <div>
          <div className={classes.TypeTitle}>BMI :</div>
          <div className={classes.Types}>
            {bmiStatic.map((bmi) => (
              <div
                key={bmi}
                className={`${classes.Type} ${
                  typeBmi ? (typeBmi[bmi] ? classes.TypeSelected : "") : ""
                }`}
                onClick={() => {
                  setTypeBmi({ ...typeBmi, [bmi]: !typeBmi[bmi] });
                }}
              >
                {criteriaStatic.bmi[bmi].title}
              </div>
            ))}
            <div
              className={`${classes.TypeAll} ${
                typeBmiAll ? classes.TypeAllSelected : ""
              }`}
              onClick={() => {
                setTypeBmi(setTypeAll("bmi", !typeBmiAll));
                setTypeBmiAll(!typeBmiAll);
              }}
            >
              เลือกทั้งหมด
            </div>
          </div>
        </div>
        <div>
          <div className={classes.TypeTitle}>ความดันโลหิต :</div>
          <div className={classes.Types}>
            {bloodPressureStatic.map((bp) => (
              <div
                key={bp}
                className={`${classes.Type} ${
                  typeBloodPressure
                    ? typeBloodPressure[bp]
                      ? classes.TypeSelected
                      : ""
                    : ""
                }`}
                onClick={() => {
                  setTypeBloodPressure({
                    ...typeBloodPressure,
                    [bp]: !typeBloodPressure[bp],
                  });
                }}
              >
                {criteriaStatic.bloodPressure[bp].title}
              </div>
            ))}
            <div
              className={`${classes.TypeAll} ${
                typeBloodPressureAll ? classes.TypeAllSelected : ""
              }`}
              onClick={() => {
                setTypeBloodPressure(
                  setTypeAll("bloodPressure", !typeBloodPressureAll)
                );
                setTypeBloodPressureAll(!typeBloodPressureAll);
              }}
            >
              เลือกทั้งหมด
            </div>
          </div>
        </div>
      </div>

      <div id="QuillToolBar">
        <button className="ql-header" value="1" />
        <button className="ql-align" value="" />
        <button className="ql-align" value="center" />
        <button className="ql-align" value="right" />
        <button className="ql-align" value="justify" />
        <div className="QuillToolBarSpace" />
        <button className="ql-blockquote" />
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
        <button className="ql-link" />
        <button className="ql-image" />
      </div>
      <div className={classes.QuillEditor}>
        <ReactQuill
          ref={quill}
          id="Quill"
          modules={modules}
          bounds="#Quill"
          placeholder="เนื้อหาบทความ"
          onChange={setContent}
          value={content}
        />
        <div
          className={classes.QuillLoading}
          style={{
            visibility: isLoading ? "visible" : "hidden",
            opacity: isLoading ? 1 : 0,
          }}
        >
          <div />
          <div>
            <LoadingDot width="6rem" color="#fa5458" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminArticlesForm;

const quillImageHandler = (quill, setIsLoading) => {
  const quillRef = quill.current.getEditor();
  const index = quillRef.getSelection().index;
  const fileInput = document.createElement("INPUT");
  fileInput.setAttribute("type", "file");
  fileInput.setAttribute("accept", "image/x-png,image/jpeg");
  fileInput.onchange = async (event) => {
    setIsLoading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const b64 = reader.result.replace(/^data:.+;base64,/, "");
      const formData = new FormData();
      formData.append("image", b64);
      fetch(
        "https://api.imgbb.com/1/upload?key=060454f16862ad3dd07feeae2df32687",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((result) => {
          setIsLoading(false);
          quillRef.insertEmbed(index, "image", result.data.url);
        });
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  fileInput.click();
};
