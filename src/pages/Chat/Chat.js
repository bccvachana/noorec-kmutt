import React, { useState, useEffect, useContext } from "react";
import classes from "./Chat.module.scss";

import { Context } from "../../App";
import sendIcon from "../../assets/send.svg";
import adminIcon from "../../assets/web/Chat/admin.svg";
import { addChatByUser, readChatByUser } from "../../utils/firebase/firestore";
import { chatTime } from "../../utils/moment";

const Chat = (props) => {
  const { userChat, user } = useContext(Context);
  const [textAreaValue, setTextAreaValue] = useState("");

  const handleOnchange = (event) => {
    event.target.style.height = "0px";
    event.target.style.height = `${event.target.scrollHeight + 5}px`;
    setTextAreaValue(event.target.value);
  };

  useEffect(() => {
    document.body.style.minHeight = "0px";
    return () => {
      document.body.style.minHeight = "512px";
    };
  }, []);

  useEffect(() => {
    if (user && userChat && !userChat.userRead) readChatByUser(user.uid);
    if (user && userChat) {
      const bottom = document.getElementById("UserChatBox").scrollHeight;
      document.getElementById("UserChatBox").scrollTo(0, bottom);
    }
  }, [user, userChat]);

  return userChat || userChat === undefined ? (
    <div className={classes.Page}>
      <div className={classes.Container}>
        <div className={classes.TopBar}>
          <img src={adminIcon} alt="adminIcon" />
          <div>แอดมินหนูเรค</div>
        </div>
        <div id="UserChatBox" className={classes.ChatContainer}>
          {userChat && userChat.message
            ? userChat.message.map(
                ({ sender, message, createdAt: { seconds } }, index) => {
                  return sender !== "user" ? (
                    <div key={index} className={classes.Sender}>
                      <img src={adminIcon} alt="adminIcon" />
                      <span>{message}</span>
                      <div className={classes.Time}>{chatTime(seconds)}</div>
                    </div>
                  ) : (
                    <div key={index} className={classes.Receiver}>
                      <div className={classes.Time}>{chatTime(seconds)}</div>
                      <span>{message}</span>
                    </div>
                  );
                }
              )
            : null}
        </div>
        <div className={classes.Input}>
          <textarea
            onChange={handleOnchange}
            placeholder="พิมพ์ข้อความ..."
            value={textAreaValue}
          />
          <img
            className={classes.SendIcon}
            src={sendIcon}
            alt="sendIcon"
            onClick={() => {
              if (textAreaValue) {
                try {
                  addChatByUser(
                    user.uid,
                    textAreaValue,
                    userChat && userChat.adminUnread ? userChat.adminUnread : 0
                  );
                  setTextAreaValue("");
                  const bottom = document.getElementById("UserChatBox")
                    .scrollHeight;
                  document.getElementById("UserChatBox").scrollTo(0, bottom);
                } catch (error) {
                  console.log(error);
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default Chat;
