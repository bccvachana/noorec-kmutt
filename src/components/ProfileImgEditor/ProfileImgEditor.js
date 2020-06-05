import React, { useState, useEffect, useRef } from "react";
import classes from "./ProfileImgEditor.module.scss";
import AvatarEditor from "react-avatar-editor";
import withDeviceDetect from "../../hoc/withDeviceDetect";
import Draggable from "react-draggable";

import imageIcon from "../../assets/image.svg";
import move from "../../assets/move.svg";
import zoomIn from "../../assets/web/zoomIn.svg";
import zoomOut from "../../assets/web/zoomOut.svg";
import rotateLeft from "../../assets/web/ProfileImgEditor/rotateLeft.svg";
import rotateRight from "../../assets/web/ProfileImgEditor/rotateRight.svg";

const ProfileImgEditor = (props) => {
  const { img, setImg, device, closeModal } = props;
  const editor = useRef();

  const [tempImg, setTempImg] = useState(img);
  const [editorColor, setEditorColor] = useState([242, 242, 242, 1]);
  const [isImg, setIsImg] = useState(false);
  const [dragWidth, setDragWidth] = useState(0);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      setTempImg(URL.createObjectURL(e.target.files[0]));
      setEditorColor([59, 66, 81, 0.65]);
      setIsImg(true);
      setScale(1);
      setRotate(0);
      setDragPosition({ x: 0, y: 0 });
    }
  };

  const handleSave = () => {
    if (tempImg !== img) {
      const canvas = document.createElement("canvas");
      canvas.width = 200;
      canvas.height = 200;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        editor.current.getImage(),
        0,
        0,
        canvas.width,
        canvas.height
      );
      setImg(ctx.canvas.toDataURL(editor.current.getImage()));
    }
    closeModal();
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      const dragSize = device === "Mobile" ? 1.4 * 14 : 1.4 * 16;
      setDragWidth(
        document.getElementById("ProfileDragLine").clientWidth - dragSize
      );
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [device]);

  return (
    <React.Fragment>
      <div className={classes.AvatarEditorContainer}>
        <AvatarEditor
          ref={editor}
          image={tempImg}
          width={device === "Mobile" ? 180 : 220}
          height={device === "Mobile" ? 180 : 220}
          border={20}
          borderRadius={200}
          color={editorColor}
          scale={scale}
          rotate={rotate}
        />
        <div
          className={classes.Move}
          style={{ visibility: isImg ? "visible" : "hidden" }}
        >
          <div>
            <img src={move} alt="move" />
          </div>
        </div>
      </div>
      <div className={classes.Rotate} style={{ opacity: isImg ? 1 : 0.4 }}>
        <div
          onClick={
            isImg
              ? () => {
                  setRotate(rotate - 90);
                }
              : null
          }
        >
          <img src={rotateLeft} alt="rotateLeft" />
        </div>
        <div
          onClick={
            isImg
              ? () => {
                  setRotate(rotate + 90);
                }
              : null
          }
        >
          <img src={rotateRight} alt="rotateRight" />
        </div>
      </div>
      <div className={classes.ZoomDrag} style={{ opacity: isImg ? 1 : 0.4 }}>
        <img src={zoomOut} alt="zoomOut" />
        <div className={classes.DragContainer}>
          <div id="ProfileDragLine" className={classes.DragLine}></div>
          <Draggable
            axis="x"
            bounds="parent"
            onDrag={(e, data) => {
              setScale(1 + (data.x * 1) / dragWidth);
            }}
            disabled={!isImg}
            position={dragPosition}
            onStop={(e, data) => {
              setDragPosition({ x: data.x, y: 0 });
            }}
          >
            <div className={classes.Drag}></div>
          </Draggable>
        </div>
        <img src={zoomIn} alt="zoomIn" />
      </div>
      <div className={classes.UploadButton}>
        <div>
          <img src={imageIcon} alt="imageIcon" /> เลือกรูป
        </div>
        <input
          type="file"
          name="img"
          accept="image/*"
          onChange={handleUpload}
        />
      </div>
      <div className={classes.ButtonContainer}>
        <div className={classes.Cancel} onClick={closeModal}>
          ยกเลิก
        </div>
        <div className={classes.Save} onClick={handleSave}>
          บันทึก
        </div>
      </div>
    </React.Fragment>
  );
};

export default withDeviceDetect(ProfileImgEditor);
